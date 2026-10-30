import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveCustomLesson,
  getCustomLessons,
  deleteCustomLesson,
  importLessonFromJson,
  getLessonById,
} from './lesson-storage';
import type { Lesson } from '@/schemas/content.schema';

const sampleLesson: Lesson = {
  status: 'draft',
  mode: 'draft',
  id: 'custom-math-lesson-99',
  title: 'Bài tập đố vui toán học',
  subject: 'math',
  grade: 1,
  description: 'Bài toán do cô giáo tự soạn.',
  totalDurationMinutes: 15,
  slides: [
    {
      type: 'title-slide',
      id: 'title-1',
      title: 'Đố vui Toán học',
      subtitle: 'Dành cho Lớp 1A',
    },
    {
      type: 'question-slide',
      id: 'q-1',
      timeLimitSeconds: 30,
      showRetryOnWrong: true,
      question: {
        type: 'number_select',
        id: 'q-ns-1',
        prompt: '1 + 1 bằng mấy?',
        promptAudio: '',
        illustration: '',
        expression: '1 + 1 = ?',
        choices: [1, 2, 3],
        correctAnswer: 2,
      },
    },
  ],
};

describe('LessonStorage (Offline Custom Lesson Store)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves a valid custom lesson to storage and retrieves it', () => {
    const res = saveCustomLesson(sampleLesson);
    expect(res.success).toBe(true);

    const customList = getCustomLessons();
    expect(customList).toHaveLength(1);
    expect(customList[0]?.id).toBe('custom-math-lesson-99');
    expect(customList[0]?.title).toBe('Bài tập đố vui toán học');
  });

  it('retrieves custom lesson by ID', async () => {
    saveCustomLesson(sampleLesson);
    const found = await getLessonById('custom-math-lesson-99');
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Bài tập đố vui toán học');
  });

  it('deletes a custom lesson from storage', () => {
    saveCustomLesson(sampleLesson);
    expect(getCustomLessons()).toHaveLength(1);

    const deleted = deleteCustomLesson('custom-math-lesson-99');
    expect(deleted).toBe(true);
    expect(getCustomLessons()).toHaveLength(0);
  });

  it('imports a valid JSON lesson string', () => {
    const jsonStr = JSON.stringify(sampleLesson);
    const result = importLessonFromJson(jsonStr);
    expect(result.success).toBe(true);
    expect(result.lesson?.id).toBe('custom-math-lesson-99');
  });

  it('rejects invalid JSON string on import', () => {
    const invalidJson = '{ "title": "Thiếu các trường bắt buộc" }';
    const result = importLessonFromJson(invalidJson);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
