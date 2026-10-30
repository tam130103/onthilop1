import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { LessonSchema } from '../src/schemas/content.schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = resolve(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content', 'lessons');
const PUBLIC_DIR = join(ROOT, 'public');

function validateMediaPaths(data: Record<string, unknown>, filePath: string): string[] {
  const errors: string[] = [];
  const json = JSON.stringify(data);

  // Check for forbidden .wav files anywhere in JSON
  const wavPattern = /"[^"]*\.wav"/gi;
  let wavMatch: RegExpExecArray | null;
  while ((wavMatch = wavPattern.exec(json)) !== null) {
    errors.push(`[${filePath}] Cấm dùng file .wav: ${wavMatch[0]}. Tất cả audio phải dùng định dạng .mp3.`);
  }

  // Find all string values that look like media paths
  const mediaPattern = /media\/[^"]+/g;
  let match: RegExpExecArray | null;
  while ((match = mediaPattern.exec(json)) !== null) {
    const mediaPath = match[0];
    const fullPath = join(PUBLIC_DIR, mediaPath);
    if (!existsSync(fullPath)) {
      errors.push(`[${filePath}] Missing media: ${mediaPath} (expected at ${fullPath})`);
    }
  }
  return errors;
}

function validateDistinctAudioLabels(data: unknown, filePath: string): string[] {
  const errors: string[] = [];

  function isExemptPraiseOrUtility(audio: string): boolean {
    const lower = audio.toLowerCase();
    return (
      lower.includes('explanation') ||
      lower.includes('congrats') ||
      lower.includes('khen') ||
      lower.includes('timer-chime') ||
      lower.includes('chime') ||
      lower.includes('prompt-')
    );
  }

  function checkItems(
    items: Array<{ label?: unknown; text?: unknown; frontText?: unknown; audio?: unknown }>,
    location: string
  ) {
    const audioMap = new Map<string, string>(); // audio -> label
    for (const item of items) {
      if (!item || typeof item !== 'object') continue;
      const rawLabel = item.label ?? item.text ?? item.frontText;
      const audio = item.audio;
      if (typeof rawLabel === 'string' && typeof audio === 'string' && audio.trim() !== '') {
        const normLabel = rawLabel.trim().toLowerCase();
        const normAudio = audio.trim().toLowerCase();
        if (isExemptPraiseOrUtility(normAudio)) continue;

        if (audioMap.has(normAudio)) {
          const prevLabel = audioMap.get(normAudio)!;
          if (prevLabel.trim().toLowerCase() !== normLabel) {
            errors.push(
              `[${filePath}] ${location}: Cấm hai nhãn khác nhau ('${prevLabel}' và '${rawLabel}') dùng chung file audio '${audio}'!`
            );
          }
        } else {
          audioMap.set(normAudio, rawLabel);
        }
      }
    }
  }

  // Traverse slides and questions
  if (data && typeof data === 'object' && 'slides' in data && Array.isArray((data as Record<string, unknown>).slides)) {
    const slides = (data as Record<string, unknown>).slides as Array<Record<string, unknown>>;
    slides.forEach((slide, sIdx) => {
      const slideId = String(slide.id || `slide[${sIdx}]`);
      if (slide.type === 'flashcard-slide' && Array.isArray(slide.cards)) {
        checkItems(
          slide.cards as Array<{ label?: unknown; text?: unknown; frontText?: unknown; audio?: unknown }>,
          `Slide '${slideId}' (flashcards)`
        );
      }
      if (slide.type === 'question-slide' && slide.question && typeof slide.question === 'object') {
        const q = slide.question as Record<string, unknown>;
        const qId = String(q.id || `question in slide '${slideId}'`);
        if (Array.isArray(q.options)) {
          checkItems(
            q.options as Array<{ label?: unknown; text?: unknown; audio?: unknown }>,
            `Câu hỏi '${qId}' (options)`
          );
        }
        if (Array.isArray(q.items)) {
          checkItems(
            q.items as Array<{ label?: unknown; text?: unknown; audio?: unknown }>,
            `Câu hỏi '${qId}' (items)`
          );
        }
        if (Array.isArray(q.leftColumn) || Array.isArray(q.rightColumn)) {
          const combined = [
            ...(Array.isArray(q.leftColumn) ? q.leftColumn : []),
            ...(Array.isArray(q.rightColumn) ? q.rightColumn : []),
          ] as Array<{ label?: unknown; text?: unknown; audio?: unknown }>;
          checkItems(combined, `Câu hỏi '${qId}' (matching columns)`);
        }
      }
    });
  }

  return errors;
}

function validatePhonemeAudio(data: unknown, filePath: string): string[] {
  const errors: string[] = [];

  function walk(node: unknown, pathStr: string) {
    if (!node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      node.forEach((item, idx) => walk(item, `${pathStr}[${idx}]`));
      return;
    }

    const obj = node as Record<string, unknown>;

    // If marked as phoneme or word in publish mode, require audio and physical presence
    if (obj['isPhonemeOrWord'] === true) {
      const audio = obj['audio'];
      if (!audio || typeof audio !== 'string' || audio.trim() === '') {
        errors.push(
          `[${filePath}] Item at ${pathStr} has isPhonemeOrWord: true but is missing audio path`
        );
      } else {
        const cleanPath = audio.startsWith('/') ? audio.slice(1) : audio;
        const fullPath = join(PUBLIC_DIR, cleanPath);
        if (!existsSync(fullPath)) {
          errors.push(
            `[${filePath}] Item at ${pathStr} audio file not found on disk: ${audio} (expected ${fullPath})`
          );
        }
      }
    }

    for (const [key, val] of Object.entries(obj)) {
      walk(val, `${pathStr}.${key}`);
    }
  }

  walk(data, 'root');
  return errors;
}

function main(): void {
  console.log('🔍 Validating lesson content...\n');

  if (!existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = readdirSync(CONTENT_DIR).filter((f: string) => f.endsWith('.json'));
  if (files.length === 0) {
    console.warn('⚠️  No JSON files found in content/lessons/');
    process.exit(0);
  }

  let totalErrors = 0;

  for (const file of files) {
    const filePath = join(CONTENT_DIR, file);
    console.log(`📄 ${file}`);

    try {
      const raw = readFileSync(filePath, 'utf-8');
      const json: unknown = JSON.parse(raw);
      const result = LessonSchema.safeParse(json);

      if (!result.success) {
        console.log(`   ❌ Schema validation failed:`);
        for (const issue of result.error.issues) {
          console.log(`      - [${issue.path.join('.')}] ${issue.message}`);
          totalErrors++;
        }
      } else {
        console.log(`   ✅ Schema valid (status: ${result.data.status}, subject: ${result.data.subject})`);

        // Check media paths for publish mode
        if (result.data.status === 'publish') {
          const mediaErrors = validateMediaPaths(
            json as Record<string, unknown>,
            file
          );
          const phonemeErrors = validatePhonemeAudio(json, file);
          const distinctAudioErrors = validateDistinctAudioLabels(json, file);
          const combinedErrors = [...mediaErrors, ...phonemeErrors, ...distinctAudioErrors];

          if (combinedErrors.length > 0) {
            for (const err of combinedErrors) {
              console.log(`   ⚠️  ${err}`);
              totalErrors++;
            }
          } else {
            console.log(`   ✅ All media & audio integrity verified (no .wav, no shared audio across different labels)`);
          }
        } else {
          console.log(`   ℹ️  Draft mode: skipping media check`);
        }
      }
    } catch (e) {
      console.log(`   ❌ JSON parse error: ${e instanceof Error ? e.message : String(e)}`);
      totalErrors++;
    }

    console.log('');
  }

  console.log(`\n${'='.repeat(50)}`);
  if (totalErrors > 0) {
    console.log(`❌ ${totalErrors} error(s) found`);
    process.exit(1);
  } else {
    console.log(`✅ All ${files.length} lesson(s) valid!`);
  }
}

main();
