import { useEffect, useReducer, useCallback, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { playerReducer, createInitialState, getCurrentSlide } from '@/core/player-reducer';
import { SyncChannel, type PresentationSnapshot } from '@/core/sync-channel';
import {
  getClassroomStore,
  type ClassroomData,
} from '@/core/classroom-store';
import { TeamScoreboard } from '@/components/classroom/TeamScoreboard';
import { ClassroomTimer } from '@/components/classroom/ClassroomTimer';
import { LessonSchema, type Slide } from '@/schemas/content.schema';
import styles from './PresenterPage.module.css';

const LESSON_URLS = [
  '/content/lessons/math-lesson-01.json',
  '/content/lessons/math-lesson-02.json',
  '/content/lessons/vn-lesson-01.json',
  '/content/lessons/vn-lesson-02.json',
];

function getSlideLabel(slide: Slide): string {
  switch (slide.type) {
    case 'title-slide':
      return slide.title;
    case 'content-slide':
      return slide.title;
    case 'phonics-slide':
      return `🔤 ${slide.title}`;
    case 'flashcard-slide':
      return `🃏 ${slide.title}`;
    case 'question-slide':
      return slide.question.prompt.slice(0, 40);
  }
}

function getSlideTypeLabel(slide: Slide): string {
  switch (slide.type) {
    case 'title-slide':
      return '📌 Tiêu đề';
    case 'content-slide':
      return '📄 Nội dung';
    case 'phonics-slide':
      return '🔤 Ghép Vần';
    case 'flashcard-slide':
      return '🃏 Flashcard';
    case 'question-slide':
      return `❓ ${slide.question.type}`;
  }
}

export function PresenterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lessonId = searchParams.get('lesson');
  const [state, dispatch] = useReducer(playerReducer, createInitialState());
  const channelRef = useRef<SyncChannel | null>(null);
  const stateRef = useRef(state);
  const [offlineStatus, setOfflineStatus] = useState<string | null>(null);

  const [classroomData, setClassroomData] = useState<ClassroomData>(
    getClassroomStore().getData()
  );

  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  // Keep stateRef updated
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Load lesson
  useEffect(() => {
    if (!lessonId) return;
    async function loadLesson() {
      for (const url of LESSON_URLS) {
        try {
          const resp = await fetch(url);
          const json: unknown = await resp.json();
          const parsed = LessonSchema.safeParse(json);
          if (parsed.success && parsed.data.id === lessonId) {
            dispatch({ type: 'LOAD_LESSON', lesson: parsed.data });
            dispatch({ type: 'START_SESSION' });
            return;
          }
        } catch {
          // continue
        }
      }
    }
    loadLesson();
  }, [lessonId]);

  // Gửi snapshot đồng bộ sang /present (TUYỆT ĐỐI KHÔNG chứa teacherNote)
  const sendSnapshot = useCallback(() => {
    const cur = stateRef.current;
    const cData = getClassroomStore().getData();

    const snapshot: PresentationSnapshot = {
      currentSlideIndex: cur.currentSlideIndex,
      showAnswer: cur.showAnswer,
      blackout: cur.blackout,
      phase: cur.phase,
      wrongAnswerQueue: cur.wrongAnswerQueue,
      answeredCorrectly: Array.from(cur.answeredCorrectly),
      answeredIncorrectly: Array.from(cur.answeredIncorrectly),
      tapPlaceMapping: cur.tapPlaceMapping,
      matchingPairs: cur.matchingPairs,
      teams: cData.teams,
      timer: cData.timer,
      pickerActive: cData.pickerActive,
      pickedStudent: cData.pickedStudent,
    };

    channelRef.current?.send('STATE_SNAPSHOT', snapshot as unknown as Record<string, unknown>);
  }, []);

  // Broadcast classroom updates
  const broadcastClassroom = useCallback(() => {
    const cData = getClassroomStore().getData();
    channelRef.current?.send('CLASSROOM_UPDATE', {
      teams: cData.teams,
      timer: cData.timer,
      pickerActive: cData.pickerActive,
      pickedStudent: cData.pickedStudent,
    });
  }, []);

  const syncSlide = useCallback((index: number) => {
    channelRef.current?.send('SLIDE_CHANGE', { index });
  }, []);

  const handleNext = useCallback(() => {
    const cur = stateRef.current;
    if (cur.phase !== 'playing') return;
    const next = cur.currentSlideIndex + 1;
    dispatch({ type: 'NEXT_SLIDE' });
    syncSlide(next);
  }, [syncSlide]);

  const handlePrev = useCallback(() => {
    const cur = stateRef.current;
    const prev = Math.max(0, cur.currentSlideIndex - 1);
    dispatch({ type: 'PREV_SLIDE' });
    syncSlide(prev);
  }, [syncSlide]);

  const handleGoTo = useCallback(
    (index: number) => {
      dispatch({ type: 'GO_TO_SLIDE', index });
      syncSlide(index);
    },
    [syncSlide]
  );

  const handleReveal = useCallback(() => {
    dispatch({ type: 'REVEAL_ANSWER' });
    channelRef.current?.send('ANSWER_REVEAL', {});
  }, []);

  const handleToggleBlackout = useCallback(() => {
    const cur = stateRef.current;
    const nextBlackout = !cur.blackout;
    dispatch({ type: 'TOGGLE_BLACKOUT' });
    channelRef.current?.send('BLACKOUT_TOGGLE', { blackout: nextBlackout });
  }, []);

  const currentSlide = getCurrentSlide(state);

  const handleAnswerChoice = useCallback(
    (choice: 'correct' | 'incorrect') => {
      const cur = stateRef.current;
      const slide = getCurrentSlide(cur);
      if (!slide || slide.type !== 'question-slide') return;
      if (choice === 'correct') {
        dispatch({ type: 'ANSWER_CORRECT', questionId: slide.question.id });
      } else {
        dispatch({
          type: 'ANSWER_INCORRECT',
          slideIndex: cur.currentSlideIndex,
          question: slide.question,
          givenAnswer: 'wrong-answer-test',
        });
      }
      setTimeout(sendSnapshot, 20);
    },
    [sendSnapshot]
  );

  // Init sync channel and respond to HELLO from /present + handle student actions
  useEffect(() => {
    const channel = new SyncChannel('presenter', lessonId || undefined);
    channelRef.current = channel;

    const unsubs = [
      channel.on('HELLO', () => {
        sendSnapshot();
      }),
      channel.on('STUDENT_ANSWER', (msg) => {
        const payload = msg.payload as {
          questionId: string;
          isCorrect: boolean;
          givenAnswer: string;
          slideIndex: number;
        };
        const cur = stateRef.current;
        const slide = getCurrentSlide(cur);
        if (slide?.type === 'question-slide') {
          if (payload.isCorrect) {
            dispatch({ type: 'ANSWER_CORRECT', questionId: payload.questionId });
          } else {
            dispatch({
              type: 'ANSWER_INCORRECT',
              slideIndex: payload.slideIndex ?? cur.currentSlideIndex,
              question: slide.question,
              givenAnswer: payload.givenAnswer,
            });
          }
          setTimeout(sendSnapshot, 20);
        }
      }),
      channel.on('REQ_NEXT_SLIDE', () => {
        handleNext();
      }),
      channel.on('REQ_PREV_SLIDE', () => {
        handlePrev();
      }),
      channel.on('REQ_TAP_PLACE', (msg) => {
        const payload = msg.payload as { mapping: Record<string, string> };
        dispatch({ type: 'SET_TAP_PLACE_MAPPING', mapping: payload.mapping });
        setTimeout(sendSnapshot, 20);
      }),
      channel.on('REQ_MATCHING', (msg) => {
        const payload = msg.payload as { pairs: Array<{ leftId: string; rightId: string }> };
        dispatch({ type: 'SET_MATCHING_PAIRS', pairs: payload.pairs });
        setTimeout(sendSnapshot, 20);
      }),
      channel.on('BLACKOUT_TOGGLE', () => {
        handleToggleBlackout();
      }),
    ];

    return () => {
      unsubs.forEach((u) => u());
      channel.dispose();
      channelRef.current = null;
    };
  }, [lessonId, sendSnapshot, handleNext, handlePrev, handleToggleBlackout]);

  // Classroom Tool handlers
  const handleRandomPick = useCallback(() => {
    const student = getClassroomStore().pickRandomStudent();
    if (student) {
      broadcastClassroom();
    }
  }, [broadcastClassroom]);

  const handleAddScore = useCallback(
    (teamId: string, delta: number) => {
      getClassroomStore().addScore(teamId, delta);
      broadcastClassroom();
    },
    [broadcastClassroom]
  );

  const handleResetScores = useCallback(() => {
    getClassroomStore().resetScores();
    broadcastClassroom();
  }, [broadcastClassroom]);

  const handleStartTimer = useCallback(
    (seconds: number) => {
      getClassroomStore().startTimer(seconds);
      broadcastClassroom();
    },
    [broadcastClassroom]
  );

  const handleStopTimer = useCallback(() => {
    getClassroomStore().stopTimer();
    broadcastClassroom();
  }, [broadcastClassroom]);

  // Nút "Kiểm tra & tải offline"
  const handleCacheOffline = useCallback(async () => {
    setOfflineStatus('Đang kiểm tra & nạp offline...');
    try {
      const cache = await caches.open('trinh-chieu-media-v1');
      const urlsToCache: string[] = [...LESSON_URLS];

      // Extract all media urls from loaded lesson
      if (state.lesson) {
        state.lesson.slides.forEach((s) => {
          if ('backgroundImage' in s && typeof s.backgroundImage === 'string' && s.backgroundImage) urlsToCache.push(s.backgroundImage);
          if ('illustration' in s && typeof s.illustration === 'string' && s.illustration) urlsToCache.push(s.illustration);
          if ('audio' in s && typeof s.audio === 'string' && s.audio) urlsToCache.push(s.audio);
          if (s.type === 'question-slide') {
            const q = s.question;
            if (q.promptAudio) urlsToCache.push(q.promptAudio);
            if (q.illustration) urlsToCache.push(q.illustration);
            if (q.explanationAudio) urlsToCache.push(q.explanationAudio);
            if ('options' in q && Array.isArray(q.options)) {
              q.options.forEach((opt) => {
                if (opt.image) urlsToCache.push(opt.image);
                if (opt.audio) urlsToCache.push(opt.audio);
              });
            }
          }
        });
      }

      const unique = Array.from(new Set(urlsToCache));
      let successCount = 0;
      for (const url of unique) {
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            await cache.put(url, resp);
            successCount++;
          }
        } catch {
          // ignore individual fetch errors
        }
      }
      setOfflineStatus(`✅ Đã nạp thành công ${successCount}/${unique.length} tệp vào bộ nhớ offline!`);
    } catch {
      setOfflineStatus('Không thể mở Cache Storage (hỗ trợ trên localhost/HTTPS)');
    }
  }, [state.lesson]);

  // Keyboard navigation: Chặn F5 (clicker), giữ Escape, phím B bật tắt blackout
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // 1. Chặn F5 (laser clicker gửi F5)
      if (e.key === 'F5') {
        e.preventDefault();
        return;
      }
      // 2. Giữ phím Escape để thoát fullscreen bình thường
      if (e.key === 'Escape') {
        return;
      }
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        handleToggleBlackout();
        return;
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'r':
        case 'R':
          handleReveal();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleNext, handlePrev, handleReveal, handleToggleBlackout]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.lessonTitle}>
            {state.lesson?.title ?? 'Chưa tải bài học'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleCacheOffline}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                background: '#334155',
                color: '#e2e8f0',
                border: '1px solid #475569',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
              title="Kiểm tra và nạp sẵn tất cả tài nguyên vào bộ nhớ đệm offline"
            >
              📥 Tải offline
            </button>
            <span className={styles.slideCounter} data-testid="presenter-slide-counter">
              {state.lesson
                ? `Slide ${state.currentSlideIndex + 1} / ${state.totalSlides}`
                : ''}
            </span>
          </div>
        </div>

        {offlineStatus && (
          <div
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              color: '#86efac',
              background: '#064e3b',
              borderBottom: '1px solid #059669',
            }}
          >
            {offlineStatus}
          </div>
        )}

        {/* Preview Box */}
        <div className={styles.previewBox}>
          <div className={styles.previewText} data-testid="slide-preview-text">
            {currentSlide ? (
              <div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#f8fafc',
                    marginBottom: '8px',
                  }}
                >
                  {currentSlide.type === 'question-slide'
                    ? currentSlide.question.prompt
                    : currentSlide.title}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {getSlideTypeLabel(currentSlide)}
                </div>
              </div>
            ) : (
              <span style={{ color: '#64748b' }}>Chưa có slide</span>
            )}
          </div>
        </div>

        {/* Slide Controls */}
        <div className={styles.controls}>
          <button
            className={`${styles.controlBtn} ${styles.prevBtn}`}
            onClick={handlePrev}
            disabled={state.currentSlideIndex <= 0}
            data-testid="prev-btn"
          >
            ◀ Trước
          </button>
          <button
            className={`${styles.controlBtn} ${styles.nextBtn}`}
            onClick={handleNext}
            disabled={state.phase !== 'playing'}
            data-testid="next-btn"
          >
            Tiếp ▶
          </button>
          {currentSlide?.type === 'question-slide' && (
            <>
              <button
                className={`${styles.controlBtn} ${styles.revealBtn}`}
                onClick={handleReveal}
                disabled={state.showAnswer}
                data-testid="reveal-btn"
              >
                👁 Đáp án (R)
              </button>
              <button
                className={`${styles.controlBtn}`}
                style={{ background: '#22c55e', color: '#fff' }}
                onClick={() => handleAnswerChoice('correct')}
                data-testid="correct-btn"
              >
                ✅ Đúng
              </button>
              <button
                className={`${styles.controlBtn}`}
                style={{ background: '#ef4444', color: '#fff' }}
                onClick={() => handleAnswerChoice('incorrect')}
                data-testid="incorrect-btn"
              >
                ❌ Sai
              </button>
            </>
          )}
          <button
            className={`${styles.controlBtn} ${styles.blackoutBtn}`}
            onClick={handleToggleBlackout}
            data-testid="blackout-btn"
          >
            {state.blackout ? '☀️ Bật màn (B)' : '⬛ Tối màn (B)'}
          </button>
        </div>

        {/* Teacher Notes - Chỉ hiện trên màn hình laptop của giáo viên */}
        <div className={styles.notesBox}>
          <div className={styles.notesTitle}>📝 Ghi chú sư phạm (Chỉ giáo viên thấy)</div>
          <div className={styles.notesContent}>
            {currentSlide?.teacherNote ? (
              <p style={{ color: '#fef08a', fontWeight: 500 }}>{currentSlide.teacherNote}</p>
            ) : (
              currentSlide?.type === 'question-slide' && currentSlide.question.explanation ? (
                <p>{currentSlide.question.explanation}</p>
              ) : (
                <p style={{ color: '#64748b', fontStyle: 'italic' }}>
                  Không có ghi chú cho slide này.
                </p>
              )
            )}
          </div>
        </div>

        {/* Wrong Answer Queue */}
        {state.wrongAnswerQueue.length > 0 && (
          <div className={styles.queueBox}>
            <div className={styles.queueTitle}>
              🔄 Hàng đợi làm lại ({state.wrongAnswerQueue.length} câu)
            </div>
            <div className={styles.queueList}>
              {state.wrongAnswerQueue.map((item, idx) => (
                <span key={idx} className={styles.queueItem}>
                  Câu {item.slideIndex + 1}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Classroom Management Tools */}
        <div className={styles.classroomTools}>
          <div className={styles.toolsHeader}>
            <span style={{ fontWeight: 700, fontSize: '14px', color: '#e2e8f0' }}>
              🛠️ Bộ công cụ lớp học
            </span>
            <button
              onClick={handleRandomPick}
              style={{
                background: '#4f46e5',
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '13px',
              }}
              data-testid="picker-btn"
            >
              🎲 Bốc thăm ngẫu nhiên
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
            <TeamScoreboard
              teams={classroomData.teams}
              isPresenter
              onAddScore={handleAddScore}
              onResetScores={handleResetScores}
            />
            <ClassroomTimer
              timer={classroomData.timer}
              isPresenter
              onStart={handleStartTimer}
              onStop={handleStopTimer}
            />
          </div>
        </div>
      </div>

      {/* Slide Navigation List */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span>Danh sách Slide</span>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Trang chủ ✕
          </button>
        </div>
        <div className={styles.slideList}>
          {state.lesson?.slides.map((s, idx) => {
            const isCurrent = idx === state.currentSlideIndex;
            return (
              <div
                key={s.id}
                className={`${styles.slideThumb} ${isCurrent ? styles.activeThumb : ''}`}
                onClick={() => handleGoTo(idx)}
                data-testid={`slide-thumb-${idx}`}
              >
                <div className={styles.thumbNumber}>{idx + 1}</div>
                <div className={styles.thumbContent}>
                  <div className={styles.thumbLabel}>{getSlideLabel(s)}</div>
                  <div className={styles.thumbType}>{getSlideTypeLabel(s)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
