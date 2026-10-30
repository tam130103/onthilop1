import type { Lesson, Slide, Question } from '@/schemas/content.schema';

// ---- State Types ----
export type SessionPhase = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'review' | 'finished';

export interface WrongAnswerEntry {
  slideIndex: number;
  question: Question;
  givenAnswer: string;
  attemptCount: number;
}

export interface PlayerState {
  phase: SessionPhase;
  lesson: Lesson | null;
  currentSlideIndex: number;
  totalSlides: number;
  wrongAnswerQueue: WrongAnswerEntry[];
  isReviewingWrongAnswers: boolean;
  reviewIndex: number;
  answeredCorrectly: Set<string>; // question IDs
  answeredIncorrectly: Set<string>; // question IDs
  showAnswer: boolean;
  timerRunning: boolean;
  timerSeconds: number;
  error: string | null;
  blackout: boolean;
  tapPlaceMapping: Record<string, string>;
  matchingPairs: Array<{ leftId: string; rightId: string }>;
}

// ---- Actions ----
export type PlayerAction =
  | { type: 'LOAD_LESSON'; lesson: Lesson }
  | { type: 'START_SESSION' }
  | { type: 'NEXT_SLIDE' }
  | { type: 'PREV_SLIDE' }
  | { type: 'GO_TO_SLIDE'; index: number }
  | { type: 'ANSWER_CORRECT'; questionId: string }
  | { type: 'ANSWER_INCORRECT'; slideIndex: number; question: Question; givenAnswer: string }
  | { type: 'REVEAL_ANSWER' }
  | { type: 'HIDE_ANSWER' }
  | { type: 'START_TIMER'; seconds: number }
  | { type: 'TICK_TIMER' }
  | { type: 'STOP_TIMER' }
  | { type: 'PAUSE_SESSION' }
  | { type: 'RESUME_SESSION' }
  | { type: 'START_REVIEW' }
  | { type: 'NEXT_REVIEW' }
  | { type: 'FINISH_SESSION' }
  | { type: 'RESET' }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'TOGGLE_BLACKOUT' }
  | { type: 'SET_BLACKOUT'; blackout: boolean }
  | { type: 'SET_TAP_PLACE_MAPPING'; mapping: Record<string, string> }
  | { type: 'SET_MATCHING_PAIRS'; pairs: Array<{ leftId: string; rightId: string }> }
  | {
      type: 'APPLY_SNAPSHOT';
      payload: {
        currentSlideIndex?: number;
        showAnswer?: boolean;
        blackout?: boolean;
        phase?: SessionPhase;
        wrongAnswerQueue?: WrongAnswerEntry[];
        answeredCorrectly?: string[];
        answeredIncorrectly?: string[];
        tapPlaceMapping?: Record<string, string>;
        matchingPairs?: Array<{ leftId: string; rightId: string }>;
      };
    };

// ---- Initial State ----
export function createInitialState(): PlayerState {
  return {
    phase: 'idle',
    lesson: null,
    currentSlideIndex: 0,
    totalSlides: 0,
    wrongAnswerQueue: [],
    isReviewingWrongAnswers: false,
    reviewIndex: 0,
    answeredCorrectly: new Set(),
    answeredIncorrectly: new Set(),
    showAnswer: false,
    timerRunning: false,
    timerSeconds: 0,
    error: null,
    blackout: false,
    tapPlaceMapping: {},
    matchingPairs: [],
  };
}

// ---- Reducer ----
export function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'LOAD_LESSON':
      return {
        ...createInitialState(),
        phase: 'ready',
        lesson: action.lesson,
        totalSlides: action.lesson.slides.length,
      };

    case 'START_SESSION':
      if (state.phase !== 'ready') return state;
      return { ...state, phase: 'playing', currentSlideIndex: 0 };

    case 'NEXT_SLIDE': {
      if (state.phase !== 'playing') return state;
      const nextIndex = state.currentSlideIndex + 1;
      if (nextIndex >= state.totalSlides) {
        // Check if there are wrong answers to review
        if (state.wrongAnswerQueue.length > 0) {
          return { ...state, phase: 'review', isReviewingWrongAnswers: true, reviewIndex: 0, showAnswer: false };
        }
        return { ...state, phase: 'finished' };
      }
      return { ...state, currentSlideIndex: nextIndex, showAnswer: false, timerRunning: false, timerSeconds: 0 };
    }

    case 'PREV_SLIDE': {
      if (state.phase !== 'playing') return state;
      const prevIndex = Math.max(0, state.currentSlideIndex - 1);
      return { ...state, currentSlideIndex: prevIndex, showAnswer: false, timerRunning: false, timerSeconds: 0 };
    }

    case 'GO_TO_SLIDE': {
      if (state.phase !== 'playing' && state.phase !== 'paused') return state;
      const idx = Math.max(0, Math.min(action.index, state.totalSlides - 1));
      return { ...state, currentSlideIndex: idx, showAnswer: false, timerRunning: false, timerSeconds: 0 };
    }

    case 'ANSWER_CORRECT': {
      const newCorrect = new Set(state.answeredCorrectly);
      newCorrect.add(action.questionId);
      // Remove from wrong queue if re-answered correctly
      const newQueue = state.wrongAnswerQueue.filter(
        (entry) => entry.question.id !== action.questionId
      );
      return { ...state, answeredCorrectly: newCorrect, wrongAnswerQueue: newQueue };
    }

    case 'ANSWER_INCORRECT': {
      const newIncorrect = new Set(state.answeredIncorrectly);
      newIncorrect.add(action.question.id);
      // Add or update in wrong answer queue
      const existingIdx = state.wrongAnswerQueue.findIndex(
        (e) => e.question.id === action.question.id
      );
      const newQueue = [...state.wrongAnswerQueue];
      if (existingIdx >= 0) {
        const existing = newQueue[existingIdx];
        if (existing) {
          newQueue[existingIdx] = { ...existing, givenAnswer: action.givenAnswer, attemptCount: existing.attemptCount + 1 };
        }
      } else {
        newQueue.push({
          slideIndex: action.slideIndex,
          question: action.question,
          givenAnswer: action.givenAnswer,
          attemptCount: 1,
        });
      }
      return { ...state, answeredIncorrectly: newIncorrect, wrongAnswerQueue: newQueue };
    }

    case 'REVEAL_ANSWER':
      return { ...state, showAnswer: true };

    case 'HIDE_ANSWER':
      return { ...state, showAnswer: false };

    case 'START_TIMER':
      return { ...state, timerRunning: true, timerSeconds: action.seconds };

    case 'TICK_TIMER': {
      if (!state.timerRunning || state.timerSeconds <= 0) {
        return { ...state, timerRunning: false, timerSeconds: 0 };
      }
      return { ...state, timerSeconds: state.timerSeconds - 1 };
    }

    case 'STOP_TIMER':
      return { ...state, timerRunning: false };

    case 'PAUSE_SESSION':
      if (state.phase !== 'playing') return state;
      return { ...state, phase: 'paused' };

    case 'RESUME_SESSION':
      if (state.phase !== 'paused') return state;
      return { ...state, phase: 'playing' };

    case 'START_REVIEW':
      if (state.wrongAnswerQueue.length === 0) {
        return { ...state, phase: 'finished' };
      }
      return { ...state, phase: 'review', isReviewingWrongAnswers: true, reviewIndex: 0, showAnswer: false };

    case 'NEXT_REVIEW': {
      const nextReview = state.reviewIndex + 1;
      if (nextReview >= state.wrongAnswerQueue.length) {
        return { ...state, phase: 'finished', isReviewingWrongAnswers: false };
      }
      return { ...state, reviewIndex: nextReview, showAnswer: false };
    }

    case 'TOGGLE_BLACKOUT':
      return { ...state, blackout: !state.blackout };

    case 'SET_BLACKOUT':
      return { ...state, blackout: action.blackout };

    case 'SET_TAP_PLACE_MAPPING':
      return { ...state, tapPlaceMapping: action.mapping };

    case 'SET_MATCHING_PAIRS':
      return { ...state, matchingPairs: action.pairs };

    case 'APPLY_SNAPSHOT': {
      const p = action.payload;
      return {
        ...state,
        ...(p.currentSlideIndex !== undefined && { currentSlideIndex: p.currentSlideIndex }),
        ...(p.showAnswer !== undefined && { showAnswer: p.showAnswer }),
        ...(p.blackout !== undefined && { blackout: p.blackout }),
        ...(p.phase !== undefined && { phase: p.phase }),
        ...(p.wrongAnswerQueue !== undefined && { wrongAnswerQueue: p.wrongAnswerQueue }),
        ...(p.tapPlaceMapping !== undefined && { tapPlaceMapping: p.tapPlaceMapping }),
        ...(p.matchingPairs !== undefined && { matchingPairs: p.matchingPairs }),
        ...(p.answeredCorrectly !== undefined && {
          answeredCorrectly: new Set(p.answeredCorrectly),
        }),
        ...(p.answeredIncorrectly !== undefined && {
          answeredIncorrectly: new Set(p.answeredIncorrectly),
        }),
      };
    }

    case 'FINISH_SESSION':
      return { ...state, phase: 'finished', timerRunning: false };

    case 'RESET':
      return createInitialState();

    case 'SET_ERROR':
      return { ...state, error: action.error };

    default:
      return state;
  }
}

// ---- Helper: get current slide ----
export function getCurrentSlide(state: PlayerState): Slide | null {
  if (!state.lesson) return null;
  if (state.isReviewingWrongAnswers) {
    const entry = state.wrongAnswerQueue[state.reviewIndex];
    if (!entry) return null;
    return state.lesson.slides[entry.slideIndex] ?? null;
  }
  return state.lesson.slides[state.currentSlideIndex] ?? null;
}
