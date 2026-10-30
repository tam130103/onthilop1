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
          const combinedErrors = [...mediaErrors, ...phonemeErrors];

          if (combinedErrors.length > 0) {
            for (const err of combinedErrors) {
              console.log(`   ⚠️  ${err}`);
              totalErrors++;
            }
          } else {
            console.log(`   ✅ All media & phoneme audio files verified on disk`);
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
