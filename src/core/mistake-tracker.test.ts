import { describe, it, expect, beforeEach } from 'vitest';
import { MistakeTracker } from './mistake-tracker';
import type { Question } from '@/schemas/content.schema';

describe('MistakeTracker (Lịch sử câu sai & Bài ôn tập)', () => {
  let tracker: MistakeTracker;

  const mockQuestion1: Question = {
    type: 'multiple_choice',
    id: 'q-mc-1',
    prompt: '2 + 1 bằng mấy?',
    promptAudio: '',
    illustration: '',
    options: [
      { id: 'opt-1', label: '2' },
      { id: 'opt-2', label: '3' },
    ],
    correctOptionId: 'opt-2',
    explanation: '2 + 1 = 3',
  };

  const mockQuestion2: Question = {
    type: 'counting',
    id: 'q-count-2',
    prompt: 'Đếm số quả táo',
    promptAudio: '',
    illustration: '',
    items: [{ image: '/media/images/apple.svg', alt: 'Táo' }],
    correctCount: 1,
    numberRange: { min: 1, max: 5 },
  };

  beforeEach(() => {
    localStorage.clear();
    tracker = new MistakeTracker();
  });

  it('records new mistake with count 1', () => {
    tracker.recordMistake('lesson-1', 'Bài 1', 'math', mockQuestion1);
    const list = tracker.getMistakes();

    expect(list).toHaveLength(1);
    expect(list[0]?.questionId).toBe('q-mc-1');
    expect(list[0]?.wrongCount).toBe(1);
    expect(list[0]?.lessonTitle).toBe('Bài 1');
  });

  it('increments wrongCount when same question is answered wrong again', () => {
    tracker.recordMistake('lesson-1', 'Bài 1', 'math', mockQuestion1);
    tracker.recordMistake('lesson-1', 'Bài 1', 'math', mockQuestion1);

    const list = tracker.getMistakes();
    expect(list).toHaveLength(1);
    expect(list[0]?.wrongCount).toBe(2);
  });

  it('sorts mistakes by wrongCount descending', () => {
    tracker.recordMistake('lesson-1', 'Bài 1', 'math', mockQuestion1);
    tracker.recordMistake('lesson-2', 'Bài 2', 'math', mockQuestion2);
    tracker.recordMistake('lesson-2', 'Bài 2', 'math', mockQuestion2); // mockQuestion2 has 2 wrong counts

    const list = tracker.getMistakes();
    expect(list).toHaveLength(2);
    expect(list[0]?.questionId).toBe('q-count-2');
    expect(list[1]?.questionId).toBe('q-mc-1');
  });

  it('removes question when class masters it', () => {
    tracker.recordMistake('lesson-1', 'Bài 1', 'math', mockQuestion1);
    expect(tracker.getCount()).toBe(1);

    tracker.removeMistake('q-mc-1');
    expect(tracker.getCount()).toBe(0);
  });

  it('builds a playable review Lesson from mistaken questions', () => {
    tracker.recordMistake('lesson-1', 'Bài 1', 'math', mockQuestion1);
    tracker.recordMistake('lesson-2', 'Bài 2', 'math', mockQuestion2);

    const reviewLesson = tracker.buildReviewLesson(5);
    expect(reviewLesson.id).toBe('review-mistakes-session');
    // Title slide + 2 question slides + finish slide = 4 slides
    expect(reviewLesson.slides).toHaveLength(4);
    expect(reviewLesson.slides[0]?.type).toBe('title-slide');
    expect(reviewLesson.slides[1]?.type).toBe('question-slide');
    expect(reviewLesson.slides[2]?.type).toBe('question-slide');
    expect(reviewLesson.slides[3]?.type).toBe('content-slide');
  });
});
