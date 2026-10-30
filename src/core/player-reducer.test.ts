import { describe, it, expect } from 'vitest';
import {
  playerReducer,
  createInitialState,
  getCurrentSlide,
  type PlayerState,
} from './player-reducer';
import type { Lesson } from '@/schemas/content.schema';

const mockLesson: Lesson = {
  status: 'draft',
  mode: 'draft',
  id: 'test-lesson',
  title: 'Bài học thử nghiệm',
  subject: 'math',
  grade: 1,
  slides: [
    {
      type: 'title-slide',
      id: 's1',
      title: 'Tiêu đề 1',
    },
    {
      type: 'content-slide',
      id: 's2',
      title: 'Nội dung 2',
      body: 'Giải thích',
    },
    {
      type: 'question-slide',
      id: 's3',
      question: {
        type: 'multiple-choice',
        id: 'q1',
        prompt: '1 + 1 = ?',
        promptAudio: '',
        illustration: '',
        options: [
          { id: 'opt1', label: '1' },
          { id: 'opt2', label: '2' },
        ],
        correctOptionId: 'opt2',
      },
      timeLimitSeconds: 30,
      showRetryOnWrong: true,
    },
  ],
};

describe('playerReducer State Machine', () => {
  it('initializes with idle phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('idle');
    expect(state.currentSlideIndex).toBe(0);
    expect(state.wrongAnswerQueue).toHaveLength(0);
  });

  it('loads lesson and transitions to ready phase', () => {
    const state = createInitialState();
    const nextState = playerReducer(state, { type: 'LOAD_LESSON', lesson: mockLesson });
    expect(nextState.phase).toBe('ready');
    expect(nextState.totalSlides).toBe(3);
    expect(nextState.lesson).toEqual(mockLesson);
  });

  it('starts session and transitions to playing phase', () => {
    const readyState: PlayerState = {
      ...createInitialState(),
      phase: 'ready',
      lesson: mockLesson,
      totalSlides: 3,
    };
    const playingState = playerReducer(readyState, { type: 'START_SESSION' });
    expect(playingState.phase).toBe('playing');
    expect(playingState.currentSlideIndex).toBe(0);
  });

  it('navigates next and previous slides correctly', () => {
    let state: PlayerState = {
      ...createInitialState(),
      phase: 'playing',
      lesson: mockLesson,
      totalSlides: 3,
      currentSlideIndex: 0,
    };

    state = playerReducer(state, { type: 'NEXT_SLIDE' });
    expect(state.currentSlideIndex).toBe(1);

    state = playerReducer(state, { type: 'NEXT_SLIDE' });
    expect(state.currentSlideIndex).toBe(2);

    state = playerReducer(state, { type: 'PREV_SLIDE' });
    expect(state.currentSlideIndex).toBe(1);

    state = playerReducer(state, { type: 'PREV_SLIDE' });
    expect(state.currentSlideIndex).toBe(0);

    // Cannot go below 0
    state = playerReducer(state, { type: 'PREV_SLIDE' });
    expect(state.currentSlideIndex).toBe(0);
  });

  it('enqueues wrong answers and transitions to review phase on lesson finish', () => {
    let state: PlayerState = {
      ...createInitialState(),
      phase: 'playing',
      lesson: mockLesson,
      totalSlides: 3,
      currentSlideIndex: 2,
    };

    const question = mockLesson.slides[2] && mockLesson.slides[2].type === 'question-slide'
      ? mockLesson.slides[2].question
      : null;
    expect(question).not.toBeNull();

    if (question) {
      state = playerReducer(state, {
        type: 'ANSWER_INCORRECT',
        slideIndex: 2,
        question,
        givenAnswer: 'opt1',
      });
      expect(state.wrongAnswerQueue).toHaveLength(1);
      expect(state.answeredIncorrectly.has('q1')).toBe(true);

      // Now advancing past the last slide enters review phase because queue has wrong answers
      state = playerReducer(state, { type: 'NEXT_SLIDE' });
      expect(state.phase).toBe('review');
      expect(state.isReviewingWrongAnswers).toBe(true);
      expect(state.reviewIndex).toBe(0);
    }
  });

  it('removes corrected answers from wrongAnswerQueue', () => {
    const question = mockLesson.slides[2] && mockLesson.slides[2].type === 'question-slide'
      ? mockLesson.slides[2].question
      : null;
    if (!question) throw new Error('Question not found');

    let state: PlayerState = {
      ...createInitialState(),
      phase: 'playing',
      lesson: mockLesson,
      totalSlides: 3,
      currentSlideIndex: 2,
      wrongAnswerQueue: [
        {
          slideIndex: 2,
          question,
          givenAnswer: 'opt1',
          attemptCount: 1,
        },
      ],
      answeredIncorrectly: new Set(['q1']),
    };

    state = playerReducer(state, { type: 'ANSWER_CORRECT', questionId: 'q1' });
    expect(state.wrongAnswerQueue).toHaveLength(0);
    expect(state.answeredCorrectly.has('q1')).toBe(true);
  });

  it('handles timer lifecycle (start, tick, stop)', () => {
    let state: PlayerState = {
      ...createInitialState(),
      phase: 'playing',
    };

    state = playerReducer(state, { type: 'START_TIMER', seconds: 10 });
    expect(state.timerRunning).toBe(true);
    expect(state.timerSeconds).toBe(10);

    state = playerReducer(state, { type: 'TICK_TIMER' });
    expect(state.timerSeconds).toBe(9);

    state = playerReducer(state, { type: 'STOP_TIMER' });
    expect(state.timerRunning).toBe(false);
  });

  it('handles reveal/hide answer', () => {
    let state = createInitialState();
    state = playerReducer(state, { type: 'REVEAL_ANSWER' });
    expect(state.showAnswer).toBe(true);

    state = playerReducer(state, { type: 'HIDE_ANSWER' });
    expect(state.showAnswer).toBe(false);
  });

  it('getCurrentSlide retrieves the correct slide for regular and review mode', () => {
    const state: PlayerState = {
      ...createInitialState(),
      phase: 'playing',
      lesson: mockLesson,
      totalSlides: 3,
      currentSlideIndex: 1,
    };

    const current = getCurrentSlide(state);
    expect(current?.id).toBe('s2');

    // Review mode
    const question = mockLesson.slides[2] && mockLesson.slides[2].type === 'question-slide'
      ? mockLesson.slides[2].question
      : null;
    if (!question) throw new Error('Question not found');

    const reviewState: PlayerState = {
      ...state,
      isReviewingWrongAnswers: true,
      reviewIndex: 0,
      wrongAnswerQueue: [
        {
          slideIndex: 2,
          question,
          givenAnswer: 'opt1',
          attemptCount: 1,
        },
      ],
    };
    const reviewSlide = getCurrentSlide(reviewState);
    expect(reviewSlide?.id).toBe('s3');
  });
});

