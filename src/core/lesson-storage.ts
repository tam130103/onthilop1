import { LessonSchema, type Lesson } from '@/schemas/content.schema';
import { getMistakeTracker } from './mistake-tracker';
import { findCurriculumLessonMeta, createInteractiveCurriculumLesson } from '@/data/onthi-curriculum';

export const BUILTIN_LESSON_URLS = [
  '/content/lessons/math-lesson-01.json',
  '/content/lessons/math-lesson-02.json',
  '/content/lessons/math-lesson-03.json',
  '/content/lessons/math-lesson-04.json',
  '/content/lessons/math-lesson-05.json',
  '/content/lessons/math-lesson-06.json',
  '/content/lessons/vn-lesson-01.json',
  '/content/lessons/vn-lesson-02.json',
  '/content/lessons/vn-lesson-03.json',
  '/content/lessons/vn-lesson-04.json',
  '/content/lessons/vn-lesson-05.json',
  '/content/lessons/vn-lesson-06.json',
];

const STORAGE_KEY = 'trinh_chieu_custom_lessons_v1';

export function getCustomLessons(): Lesson[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const valid: Lesson[] = [];
    for (const item of parsed) {
      const res = LessonSchema.safeParse(item);
      if (res.success) {
        valid.push(res.data);
      }
    }
    return valid;
  } catch {
    return [];
  }
}

export function saveCustomLesson(lesson: Lesson): { success: boolean; error?: string } {
  const parseResult = LessonSchema.safeParse(lesson);
  if (!parseResult.success) {
    const msg = parseResult.error.issues.map((i) => `[${i.path.join('.')}] ${i.message}`).join(', ');
    return { success: false, error: msg };
  }

  try {
    const current = getCustomLessons();
    const existingIndex = current.findIndex((l) => l.id === lesson.id);

    let updated: Lesson[];
    if (existingIndex >= 0) {
      updated = current.map((l, idx) => (idx === existingIndex ? parseResult.data : l));
    } else {
      updated = [parseResult.data, ...current];
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export function setCustomLessons(lessons: Lesson[]): void {
  if (typeof localStorage === 'undefined') return;
  const valid: Lesson[] = [];
  for (const item of lessons) {
    const res = LessonSchema.safeParse(item);
    if (res.success) {
      valid.push(res.data);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
}

export function deleteCustomLesson(lessonId: string): boolean {
  try {
    const current = getCustomLessons();
    const filtered = current.filter((l) => l.id !== lessonId);
    if (filtered.length === current.length) return false;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    return true;
  } catch {
    return false;
  }
}

export async function getLessonById(lessonId: string): Promise<Lesson | null> {
  // 0. Check for review mistakes session
  if (lessonId === 'review-mistakes-session') {
    return getMistakeTracker().buildReviewLesson();
  }

  // 1. Search in custom lessons first
  const customList = getCustomLessons();
  const customFound = customList.find((l) => l.id === lessonId);
  if (customFound) return customFound;

  // 2. Search in built-in lessons
  for (const url of BUILTIN_LESSON_URLS) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const json: unknown = await resp.json();
        const parsed = LessonSchema.safeParse(json);
        if (parsed.success && parsed.data.id === lessonId) {
          return parsed.data;
        }
      }
    } catch {
      // continue
    }
  }

  // 3. Search in Grade-1 onthi curriculum database
  const currMeta = findCurriculumLessonMeta(lessonId);
  if (currMeta) {
    return createInteractiveCurriculumLesson(currMeta);
  }

  return null;
}

export async function getAllLessons(): Promise<Lesson[]> {
  const loaded: Lesson[] = [];

  // Built-in lessons
  for (const url of BUILTIN_LESSON_URLS) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const json: unknown = await resp.json();
        const parsed = LessonSchema.safeParse(json);
        if (parsed.success) {
          loaded.push(parsed.data);
        }
      }
    } catch {
      // continue
    }
  }

  // Custom teacher lessons
  const customList = getCustomLessons();
  return [...loaded, ...customList];
}

export function importLessonFromJson(jsonStr: string): { success: boolean; lesson?: Lesson; error?: string } {
  try {
    const parsed: unknown = JSON.parse(jsonStr);
    const result = LessonSchema.safeParse(parsed);
    if (result.success) {
      saveCustomLesson(result.data);
      return { success: true, lesson: result.data };
    } else {
      const errorMsg = result.error.issues.map((i) => `[${i.path.join('.')}] ${i.message}`).join('\n');
      return { success: false, error: errorMsg };
    }
  } catch (e) {
    return { success: false, error: `Lỗi định dạng JSON: ${String(e)}` };
  }
}

export function exportLessonAsJson(lesson: Lesson): void {
  const jsonStr = JSON.stringify(lesson, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${lesson.id || 'lesson'}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
