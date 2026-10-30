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
const MANIFEST_PATH = join(ROOT, 'scripts', 'tts-manifest.json');

let ttsManifest: Record<string, string> = {};
if (existsSync(MANIFEST_PATH)) {
  try {
    ttsManifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch (e) {
    console.warn('⚠️  Could not parse scripts/tts-manifest.json:', e);
  }
}

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

        // Tuyệt đối không miễn trừ theo tên file
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

/**
 * So sánh chữ hiển thị trên slide/câu hỏi/đáp án với giọng đọc trong manifest (generate-tts.py)
 */
function validateAudioContentMatching(data: unknown, filePath: string): string[] {
  const errors: string[] = [];
  if (Object.keys(ttsManifest).length === 0) return errors;

  const numMap: Record<string, string> = {
    '0': 'không', '1': 'một', '2': 'hai', '3': 'ba', '4': 'bốn',
    '5': 'năm', '6': 'sáu', '7': 'bảy', '8': 'tám', '9': 'chín', '10': 'mười',
  };
  const phonemeMap: Record<string, string> = {
    'b': 'bờ', 'c': 'cờ', 'd': 'dờ', 'đ': 'đờ', 'g': 'gờ',
  };

  function norm(text: string): string[] {
    let s = text.toLowerCase();
    for (const [k, v] of Object.entries(numMap)) {
      s = s.replace(new RegExp(`\\b${k}\\b`, 'g'), v);
    }
    s = s.replace(/\+/g, ' cộng ').replace(/-/g, ' trừ ').replace(/=/g, ' bằng ');
    s = s.replace(/[^a-z0-9à-ỹ\s]/gi, ' ');
    const tokens = s.trim().split(/\s+/).filter(Boolean);
    const res: string[] = [];
    for (const t of tokens) {
      res.push(t);
      if (phonemeMap[t]) res.push(phonemeMap[t]);
    }
    return res;
  }

  function checkMatch(displayed: string, audio: string, location: string) {
    if (!audio || typeof audio !== 'string' || audio.trim() === '') return;
    const cleanAudio = audio.startsWith('/') ? audio : `/${audio}`;
    const spoken = ttsManifest[cleanAudio] || ttsManifest[audio] || ttsManifest[`public${cleanAudio}`];

    if (!spoken) {
      // Audio file not found in manifest
      errors.push(`[${filePath}] ${location}: File âm thanh "${audio}" không có trong manifest generate-tts.py!`);
      return;
    }

    const dToks = norm(displayed);
    const sToks = norm(spoken);
    const sSet = new Set(sToks);
    const dSet = new Set(dToks);

    const overlap = dToks.filter((t) => sSet.has(t)).length;
    const ratio = overlap / Math.max(1, dToks.length);
    const revOverlap = sToks.filter((t) => dSet.has(t)).length;
    const revRatio = revOverlap / Math.max(1, sToks.length);

    const cleanD = displayed.toLowerCase().replace(/[^a-z0-9à-ỹ]/gi, '');
    const cleanS = spoken.toLowerCase().replace(/[^a-z0-9à-ỹ]/gi, '');

    const isMatch =
      ratio >= 0.25 ||
      revRatio >= 0.25 ||
      overlap >= 1 ||
      cleanS.includes(cleanD) ||
      cleanD.includes(cleanS);

    if (!isMatch) {
      errors.push(
        `[${filePath}] ${location}: Chữ hiển thị và giọng đọc không khớp nhau!\n` +
          `       👉 Chữ hiển thị: "${displayed}"\n` +
          `       🎙️ Giọng đọc TTS: "${spoken}" (audio: ${audio})`
      );
    }
  }

  if (data && typeof data === 'object' && 'slides' in data && Array.isArray((data as Record<string, unknown>).slides)) {
    const slides = (data as Record<string, unknown>).slides as Array<Record<string, unknown>>;
    slides.forEach((slide, sIdx) => {
      const slideId = String(slide.id || `slide[${sIdx}]`);

      // Title & Content slides audio
      if (typeof slide.title === 'string' && typeof slide.audio === 'string' && slide.audio.trim() !== '') {
        const fullDisp = `${slide.title} ${String(slide.body || '')} ${String(slide.subtitle || '')}`;
        checkMatch(fullDisp, slide.audio, `Slide '${slideId}' (audio lời dẫn)`);
      }

      // Flashcards
      if (slide.type === 'flashcard-slide' && Array.isArray(slide.cards)) {
        slide.cards.forEach((card: Record<string, unknown>, cIdx) => {
          const cardId = String(card.id || `card[${cIdx}]`);
          const label = String(card.frontText || card.phoneme || '');
          if (label && typeof card.audio === 'string') {
            checkMatch(label, card.audio, `Slide '${slideId}' Thẻ '${cardId}'`);
          }
        });
      }

      // Questions
      if (slide.type === 'question-slide' && slide.question && typeof slide.question === 'object') {
        const q = slide.question as Record<string, unknown>;
        const qId = String(q.id || `q[${sIdx}]`);

        // Prompt audio
        if (typeof q.prompt === 'string' && typeof q.promptAudio === 'string') {
          checkMatch(q.prompt, q.promptAudio, `Câu hỏi '${qId}' (promptAudio)`);
        }

        // Explanation audio
        if (typeof q.explanation === 'string' && typeof q.explanationAudio === 'string') {
          checkMatch(q.explanation, q.explanationAudio, `Câu hỏi '${qId}' (explanationAudio)`);
        }

        // Options
        if (Array.isArray(q.options)) {
          q.options.forEach((opt: Record<string, unknown>, oIdx) => {
            const optId = String(opt.id || `opt[${oIdx}]`);
            if (typeof opt.label === 'string' && typeof opt.audio === 'string') {
              checkMatch(opt.label, opt.audio, `Câu hỏi '${qId}' Đáp án '${optId}'`);
            }
          });
        }

        // Items (tap_place)
        if (Array.isArray(q.items)) {
          q.items.forEach((item: Record<string, unknown>, iIdx) => {
            const itemId = String(item.id || `item[${iIdx}]`);
            if (typeof item.label === 'string' && typeof item.audio === 'string') {
              checkMatch(item.label, item.audio, `Câu hỏi '${qId}' Thẻ ghép '${itemId}'`);
            }
          });
        }

        // Matching columns
        if (Array.isArray(q.leftColumn)) {
          q.leftColumn.forEach((col: Record<string, unknown>, lIdx) => {
            const colId = String(col.id || `left[${lIdx}]`);
            if (typeof col.label === 'string' && typeof col.audio === 'string') {
              checkMatch(col.label, col.audio, `Câu hỏi '${qId}' Mục nối trái '${colId}'`);
            }
          });
        }
        if (Array.isArray(q.rightColumn)) {
          q.rightColumn.forEach((col: Record<string, unknown>, rIdx) => {
            const colId = String(col.id || `right[${rIdx}]`);
            if (typeof col.label === 'string' && typeof col.audio === 'string') {
              checkMatch(col.label, col.audio, `Câu hỏi '${qId}' Mục nối phải '${colId}'`);
            }
          });
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
          const matchErrors = validateAudioContentMatching(json, file);
          const combinedErrors = [...mediaErrors, ...phonemeErrors, ...distinctAudioErrors, ...matchErrors];

          if (combinedErrors.length > 0) {
            for (const err of combinedErrors) {
              console.log(`   ⚠️  ${err}`);
              totalErrors++;
            }
          } else {
            console.log(`   ✅ All media & audio integrity verified (no .wav, audio matches displayed text, no shared audio across different labels)`);
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
