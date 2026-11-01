import { LessonSchema, type Lesson } from '@/schemas/content.schema';
import { getMistakeTracker } from './mistake-tracker';
import { findCurriculumLessonMeta, createInteractiveCurriculumLesson } from '@/data/onthi-curriculum';
import { getExamById } from '@/data/exam-data';

export const BUILTIN_LESSON_URLS = [
  // Math Lessons 01 - 48 (Complete Grade 1 GDPT 2018 Curriculum)
  '/content/lessons/math-lesson-01.json',
  '/content/lessons/math-lesson-02.json',
  '/content/lessons/math-lesson-03.json',
  '/content/lessons/math-lesson-04.json',
  '/content/lessons/math-lesson-05.json',
  '/content/lessons/math-lesson-06.json',
  '/content/lessons/math-lesson-07.json',
  '/content/lessons/math-lesson-08.json',
  '/content/lessons/math-lesson-09.json',
  '/content/lessons/math-lesson-10.json',
  '/content/lessons/math-lesson-11.json',
  '/content/lessons/math-lesson-12.json',
  '/content/lessons/math-lesson-13.json',
  '/content/lessons/math-lesson-14.json',
  '/content/lessons/math-lesson-15.json',
  '/content/lessons/math-lesson-16.json',
  '/content/lessons/math-lesson-17.json',
  '/content/lessons/math-lesson-18.json',
  '/content/lessons/math-lesson-19.json',
  '/content/lessons/math-lesson-20.json',
  '/content/lessons/math-lesson-21.json',
  '/content/lessons/math-lesson-22.json',
  '/content/lessons/math-lesson-23.json',
  '/content/lessons/math-lesson-24.json',
  '/content/lessons/math-lesson-25.json',
  '/content/lessons/math-lesson-26.json',
  '/content/lessons/math-lesson-27.json',
  '/content/lessons/math-lesson-28.json',
  '/content/lessons/math-lesson-29.json',
  '/content/lessons/math-lesson-30.json',
  '/content/lessons/math-lesson-31.json',
  '/content/lessons/math-lesson-32.json',
  '/content/lessons/math-lesson-33.json',
  '/content/lessons/math-lesson-34.json',
  '/content/lessons/math-lesson-35.json',
  '/content/lessons/math-lesson-36.json',
  '/content/lessons/math-lesson-37.json',
  '/content/lessons/math-lesson-38.json',
  '/content/lessons/math-lesson-39.json',
  '/content/lessons/math-lesson-40.json',
  '/content/lessons/math-lesson-41.json',
  '/content/lessons/math-lesson-42.json',
  '/content/lessons/math-lesson-43.json',
  '/content/lessons/math-lesson-44.json',
  '/content/lessons/math-lesson-45.json',
  '/content/lessons/math-lesson-46.json',
  '/content/lessons/math-lesson-47.json',
  '/content/lessons/math-lesson-48.json',

  // Vietnamese Lessons 01 - 40 (Complete Phonics, Blends, Rhymes & Reading Comprehension)
  '/content/lessons/vn-lesson-01.json',
  '/content/lessons/vn-lesson-02.json',
  '/content/lessons/vn-lesson-03.json',
  '/content/lessons/vn-lesson-04.json',
  '/content/lessons/vn-lesson-05.json',
  '/content/lessons/vn-lesson-06.json',
  '/content/lessons/vn-lesson-07.json',
  '/content/lessons/vn-lesson-08.json',
  '/content/lessons/vn-lesson-09.json',
  '/content/lessons/vn-lesson-10.json',
  '/content/lessons/vn-lesson-11.json',
  '/content/lessons/vn-lesson-12.json',
  '/content/lessons/vn-lesson-13.json',
  '/content/lessons/vn-lesson-14.json',
  '/content/lessons/vn-lesson-15.json',
  '/content/lessons/vn-lesson-16.json',
  '/content/lessons/vn-lesson-17.json',
  '/content/lessons/vn-lesson-18.json',
  '/content/lessons/vn-lesson-19.json',
  '/content/lessons/vn-lesson-20.json',
  '/content/lessons/vn-lesson-21.json',
  '/content/lessons/vn-lesson-22.json',
  '/content/lessons/vn-lesson-23.json',
  '/content/lessons/vn-lesson-24.json',
  '/content/lessons/vn-lesson-25.json',
  '/content/lessons/vn-lesson-26.json',
  '/content/lessons/vn-lesson-27.json',
  '/content/lessons/vn-lesson-28.json',
  '/content/lessons/vn-lesson-29.json',
  '/content/lessons/vn-lesson-30.json',
  '/content/lessons/vn-lesson-31.json',
  '/content/lessons/vn-lesson-32.json',
  '/content/lessons/vn-lesson-33.json',
  '/content/lessons/vn-lesson-34.json',
  '/content/lessons/vn-lesson-35.json',
  '/content/lessons/vn-lesson-36.json',
  '/content/lessons/vn-lesson-37.json',
  '/content/lessons/vn-lesson-38.json',
  '/content/lessons/vn-lesson-39.json',
  '/content/lessons/vn-lesson-40.json',
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
  const normalizedId = lessonId === 'vn-01-alphabet' ? 'vn-01-phonics' : lessonId;

  // 0. Check for review mistakes session
  if (normalizedId === 'review-mistakes-session') {
    return getMistakeTracker().buildReviewLesson();
  }

  // 0b. Check for period standard exams
  if (normalizedId.startsWith('exam-')) {
    const exam = getExamById(normalizedId);
    if (exam) {
      return {
        id: exam.id,
        title: exam.title,
        subject: exam.subject,
        grade: 1,
        description: exam.description,
        totalDurationMinutes: exam.durationMinutes,
        status: 'publish',
        mode: 'publish',
        slides: exam.questions.map((q, idx) => ({
          type: 'question-slide' as const,
          id: `exam-slide-${idx + 1}`,
          teacherNote: `Câu ${idx + 1}`,
          timeLimitSeconds: 60,
          showRetryOnWrong: true,
          question: q,
        })),
      };
    }
  }

  // 1. Search in custom lessons first
  const customList = getCustomLessons();
  const customFound = customList.find((l) => l.id === normalizedId);
  if (customFound) return customFound;

  // 2. Search in built-in lessons
  for (const url of BUILTIN_LESSON_URLS) {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const json: unknown = await resp.json();
        const parsed = LessonSchema.safeParse(json);
        if (parsed.success && parsed.data.id === normalizedId) {
          return parsed.data;
        }
      }
    } catch {
      // continue
    }
  }

  // 3. Search in Grade-1 onthi curriculum database
  const currMeta = findCurriculumLessonMeta(lessonId) || findCurriculumLessonMeta(normalizedId);
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
