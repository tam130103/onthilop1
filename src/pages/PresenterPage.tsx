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
import { ClassroomManagerModal } from '@/components/classroom/ClassroomManagerModal';
import { getLessonById, BUILTIN_LESSON_URLS } from '@/core/lesson-storage';
import { getMistakeTracker } from '@/core/mistake-tracker';
import { getAudioManager } from '@/core/audio-manager';
import {
  getTeachingSessionById,
  type TeachingSession,
} from '@/core/session-storage';
import { LessonSchema, type Slide } from '@/schemas/content.schema';
import { APP_CACHE_NAME } from '@/core/cache-config';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { getAuthState, subscribeAuth, type AuthState } from '@/core/auth-service';
import styles from './PresenterPage.module.css';

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

function getQuestionAnswerSummary(slide: Slide): string {
  if (slide.type !== 'question-slide') return '';
  const q = slide.question;
  switch (q.type) {
    case 'multiple_choice':
    case 'multiple-choice': {
      const opt = q.options.find((o) => o.id === q.correctOptionId);
      return `Đáp án đúng: ${opt?.label ?? ''}`;
    }
    case 'counting':
      return `Số lượng đúng: ${q.correctCount}`;
    case 'number_select':
    case 'number-select':
      return `Kết quả đúng: ${q.correctAnswer}`;
    case 'tap_place':
      return 'Bài tập điền chỗ trống';
    case 'matching':
      return 'Bài tập nối hai cột';
  }
}

export function PresenterPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lessonId = searchParams.get('lesson');
  const sessionId = searchParams.get('session');
  const [teachingSession, setTeachingSession] = useState<TeachingSession | null>(null);
  const [authState, setAuthState] = useState<AuthState>(getAuthState());
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [mistakeToast, setMistakeToast] = useState<string | null>(null);

  const [state, dispatch] = useReducer(playerReducer, createInitialState());
  const channelRef = useRef<SyncChannel | null>(null);
  const stateRef = useRef(state);
  const [offlineStatus, setOfflineStatus] = useState<string | null>(null);
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);

  const [classroomData, setClassroomData] = useState<ClassroomData>(
    getClassroomStore().getData()
  );

  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  useEffect(() => subscribeAuth(setAuthState), []);

  // Wait for async auth initialization before applying the parent guard.
  useEffect(() => {
    if (authState.isLoading) return;
    if (authState.role === 'parent') {
      const q = lessonId ? `?lesson=${lessonId}` : sessionId ? `?session=${sessionId}` : '';
      navigate(`/present${q}`, { replace: true });
    }
  }, [authState.isLoading, authState.role, lessonId, sessionId, navigate]);

  // Keep stateRef updated
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

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
      pickedStudent: cData.pickedStudent
        ? {
            id: cData.pickedStudent.id,
            name: cData.pickedStudent.name,
            isAbsent: cData.pickedStudent.isAbsent,
            callCount: cData.pickedStudent.callCount,
          }
        : null,
    };

    channelRef.current?.send('STATE_SNAPSHOT', snapshot as unknown as Record<string, unknown>);
  }, []);

  useEffect(() => {
    sendSnapshot();
  }, [state, sendSnapshot]);

  // Tải một bài học cụ thể và đồng bộ sang /present
  const loadSpecificLesson = useCallback(
    async (id: string) => {
      const found = await getLessonById(id);
      if (found) {
        dispatch({ type: 'LOAD_LESSON', lesson: found });
        dispatch({ type: 'START_SESSION' });
        channelRef.current?.send('LESSON_CHANGE', { lessonId: id });
        setTimeout(sendSnapshot, 40);
      }
    },
    [sendSnapshot]
  );

  const handleOpenTvPopup = useCallback(() => {
    const params = new URLSearchParams();
    if (sessionId) params.set('session', sessionId);
    if (lessonId) params.set('lesson', lessonId);
    const query = params.toString();
    window.open(
      `/present${query ? `?${query}` : ''}`,
      'tv_presentation_screen',
      'width=1280,height=720,menubar=no,toolbar=no,location=no'
    );
  }, [lessonId, sessionId]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Load session or lesson
  useEffect(() => {
    if (sessionId) {
      const s = getTeachingSessionById(sessionId);
      if (s) {
        setTeachingSession(s);
        if (lessonId) {
          const stepIdx = s.steps.findIndex((st) => st.lessonId === lessonId);
          if (stepIdx >= 0) {
            setCurrentStepIndex(stepIdx);
          }
        } else if (s.steps[0]?.lessonId) {
          loadSpecificLesson(s.steps[0].lessonId);
        }
      }
    }
  }, [sessionId, lessonId, loadSpecificLesson]);

  useEffect(() => {
    if (!lessonId) return;
    loadSpecificLesson(lessonId);
  }, [lessonId, loadSpecificLesson]);

  // Broadcast classroom updates
  const broadcastClassroom = useCallback(() => {
    const cData = getClassroomStore().getData();
    channelRef.current?.send('CLASSROOM_UPDATE', {
      teams: cData.teams,
      timer: cData.timer,
      pickerActive: cData.pickerActive,
      pickedStudent: cData.pickedStudent
        ? {
            id: cData.pickedStudent.id,
            name: cData.pickedStudent.name,
            isAbsent: cData.pickedStudent.isAbsent,
            callCount: cData.pickedStudent.callCount,
          }
        : null,
    });
  }, []);

  // The presenter owns the classroom timer; the TV only renders these updates.
  useEffect(() => {
    if (!classroomData.timer.isRunning) return;

    const interval = window.setInterval(() => {
      const finished = getClassroomStore().tickTimer();
      broadcastClassroom();
      if (finished) getAudioManager().play('/media/tts/timer-chime.mp3');
    }, 1000);

    return () => window.clearInterval(interval);
  }, [classroomData.timer.isRunning, broadcastClassroom]);

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
  const nextSlide = state.lesson?.slides[state.currentSlideIndex + 1];

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
        if (cur.lesson) {
          getMistakeTracker().recordMistake(
            cur.lesson.id,
            cur.lesson.title,
            cur.lesson.subject,
            slide.question
          );
        }
      }
      setTimeout(sendSnapshot, 20);
    },
    [sendSnapshot]
  );

  // Init sync channel and respond to HELLO from /present
  useEffect(() => {
    const syncId = sessionId || lessonId || undefined;
    const channel = new SyncChannel('presenter', syncId);
    channelRef.current = channel;

    const unsubs = [
      channel.on('HELLO', () => {
        sendSnapshot();
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
  }, [lessonId, sessionId, sendSnapshot, handleToggleBlackout]);

  // Classroom Tool handlers
  const handleRandomPick = useCallback(() => {
    const store = getClassroomStore();
    if (store.getData().pickerActive) store.closePicker();
    else store.pickRandomStudent();
    broadcastClassroom();
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

  const handleToggleTimer = useCallback(() => {
    const timer = getClassroomStore().getData().timer;
    if (timer.isRunning) {
      handleStopTimer();
    } else {
      handleStartTimer(timer.remainingSeconds > 0 ? timer.remainingSeconds : timer.durationSeconds || 60);
    }
  }, [handleStartTimer, handleStopTimer]);

  const handleSelectStep = useCallback(
    (index: number) => {
      if (!teachingSession || index < 0 || index >= teachingSession.steps.length) return;
      const step = teachingSession.steps[index];
      if (!step) return;
      setCurrentStepIndex(index);
      if (step.lessonId) {
        if (stateRef.current.lesson?.id !== step.lessonId) {
          loadSpecificLesson(step.lessonId);
        }
      }
      if (step.config?.timerSeconds) {
        getClassroomStore().startTimer(step.config.timerSeconds);
        broadcastClassroom();
      }
      if (step.type === 'warmup') {
        broadcastClassroom();
      }
    },
    [teachingSession, loadSpecificLesson, broadcastClassroom]
  );

  // Nút "Kiểm tra & tải offline"
  const handleCacheOffline = useCallback(async () => {
    setOfflineStatus('Đang kiểm tra & nạp offline...');
    try {
      const cache = await caches.open(APP_CACHE_NAME);
      const urlsToCache: string[] = [...BUILTIN_LESSON_URLS];

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

      const unique = Array.from(new Set(urlsToCache.filter((u) => typeof u === 'string' && u.startsWith('/'))));
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

  // Keyboard navigation: Chặn F5 (clicker), giữ Escape, phím tắt 1 tay điều khiển
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) {
        return;
      }
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
        case ' ':
        case 'Enter':
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
        case 'a':
        case 'A':
          e.preventDefault();
          handleReveal();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          handleAnswerChoice('correct');
          break;
        case 'x':
        case 'X':
          e.preventDefault();
          handleAnswerChoice('incorrect');
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          handleRandomPick();
          break;
        case 't':
        case 'T':
          e.preventDefault();
          handleToggleTimer();
          break;
        case '1':
        case '2':
        case '3':
        case '4': {
          const idx = parseInt(e.key, 10) - 1;
          const teams = getClassroomStore().getData().teams;
          if (teams[idx]) {
            e.preventDefault();
            handleAddScore(teams[idx].id, 1);
          }
          break;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    handleNext,
    handlePrev,
    handleReveal,
    handleAnswerChoice,
    handleRandomPick,
    handleToggleTimer,
    handleAddScore,
    handleToggleBlackout,
  ]);

  if (authState.isLoading) {
    return <div className={styles.container} aria-busy="true">Đang xác thực...</div>;
  }
  if (authState.role === 'parent') return null;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <span className={styles.lessonTitle}>
            {state.lesson?.title ?? 'Chưa tải bài học'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleOpenTvPopup}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                background: '#0284c7',
                color: '#ffffff',
                border: '1px solid #0369a1',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              title="Mở cửa sổ màn hình TV hiển thị cho học sinh"
            >
              📺 Mở TV Popup
            </button>
            <button
              onClick={toggleFullscreen}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                background: '#334155',
                color: '#e2e8f0',
                border: '1px solid #475569',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
              title="Bật/Tắt Toàn màn hình (F11)"
            >
              ⛶ Toàn màn hình
            </button>
            <button
              onClick={() => setIsClassroomModalOpen(true)}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                background: '#4338ca',
                color: '#e2e8f0',
                border: '1px solid #4f46e5',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
              title="Quản lý danh sách học sinh và điểm thi đua các tổ"
            >
              ⚙️ Lớp học
            </button>
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
            <button
              onClick={() => navigate('/')}
              style={{
                fontSize: '12px',
                padding: '4px 8px',
                background: '#1e293b',
                color: '#94a3b8',
                border: '1px solid #334155',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
              title="Trở về Trang chủ"
            >
              🏠 Về trang chủ
            </button>
            <ThemeToggle showLabel={false} />
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

        {mistakeToast && (
          <div
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              color: '#86efac',
              background: '#064e3b',
              borderBottom: '1px solid #059669',
            }}
          >
            {mistakeToast}
          </div>
        )}

        {/* Teaching Session Stepper Bar */}
        {teachingSession && (
          <div
            style={{
              background: '#0f172a',
              borderBottom: '2px solid #334155',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
            data-testid="session-stepper"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#38bdf8' }}>
                ⏱️ {teachingSession.title}
              </span>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                (Hoạt động {currentStepIndex + 1}/{teachingSession.steps.length})
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {teachingSession.steps.map((st, idx) => {
                const isActive = idx === currentStepIndex;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleSelectStep(idx)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      background: isActive ? '#4f46e5' : '#1e293b',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      border: isActive ? '1px solid #818cf8' : '1px solid #334155',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{st.title}</span>
                    <span style={{ opacity: 0.7, fontSize: '11px' }}>({st.durationMinutes}p)</span>
                  </button>
                );
              })}
            </div>

            {currentStepIndex < teachingSession.steps.length - 1 && (
              <button
                onClick={() => handleSelectStep(currentStepIndex + 1)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Bước tiếp ➡️
              </button>
            )}
          </div>
        )}

        {/* Previews Grid: Current Slide & Next Slide Preview */}
        <div className={styles.previewsGrid}>
          {/* Current Slide */}
          <div className={styles.currentSlideCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className={`${styles.cardBadge} ${styles.currentBadge}`}>
                📺 Đang chiếu trên TV · Slide {state.currentSlideIndex + 1}/{state.totalSlides}
              </span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {currentSlide ? getSlideTypeLabel(currentSlide) : ''}
              </span>
            </div>
            <div className={styles.previewText} data-testid="slide-preview-text">
              {currentSlide ? (
                <div>
                  <div
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    {currentSlide.type === 'question-slide'
                      ? currentSlide.question.prompt
                      : currentSlide.title}
                  </div>
                  {currentSlide.type === 'question-slide' && (
                    <div style={{ fontSize: '14px', color: 'var(--accent-primary, #4f46e5)', fontWeight: 600 }}>
                      {getQuestionAnswerSummary(currentSlide)}
                    </div>
                  )}
                  {currentSlide.type === 'question-slide' && currentSlide.question.illustration && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={currentSlide.question.illustration}
                        alt="Minh họa trên TV"
                        style={{
                          height: '50px',
                          maxWidth: '100px',
                          objectFit: 'contain',
                          background: 'var(--bg-subtle)',
                          borderRadius: '6px',
                          border: '1px solid var(--border-subtle)',
                          padding: '4px',
                        }}
                      />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        🖼️ Hình minh họa đang chiếu trên TV
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>Chưa có slide</span>
              )}
            </div>
          </div>

          {/* Next Slide Preview */}
          <div className={styles.nextSlideCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className={`${styles.cardBadge} ${styles.nextBadge}`}>
                🔜 Xem trước câu tiếp theo
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {nextSlide ? `Slide ${state.currentSlideIndex + 2}` : 'Hết bài'}
              </span>
            </div>
            <div>
              {nextSlide ? (
                <div>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    {nextSlide.type === 'question-slide'
                      ? nextSlide.question.prompt
                      : nextSlide.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Loại: {getSlideTypeLabel(nextSlide)}
                  </div>
                  {nextSlide.teacherNote && (
                    <div
                      style={{
                        padding: '8px 12px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderLeft: '4px solid var(--accent-amber)',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        borderRadius: '6px',
                        lineHeight: 1.5,
                      }}
                    >
                      💡 <strong>Chuẩn bị:</strong> {nextSlide.teacherNote}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ color: '#10b981', fontSize: '14px', fontWeight: 600, padding: '12px 0' }}>
                  🎉 Đây là slide cuối cùng! Chúc mừng cả lớp.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shortcut Cheat Sheet Bar */}
        <div className={styles.shortcutBar}>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>Space / ▶</span>
            <span>Tiếp</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>◀</span>
            <span>Lùi</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>A</span>
            <span>Hiện đáp án</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>C</span>
            <span>Đúng</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>X</span>
            <span>Sai</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>R</span>
            <span>Bốc thăm</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>1–4</span>
            <span>+1 sao tổ</span>
          </div>
          <div className={styles.shortcutItem}>
            <span className={styles.keyKbd}>B</span>
            <span>Tối/Bật màn</span>
          </div>
        </div>

        {/* Slide Controls */}
        <div className={styles.controls}>
          {/* Navigation & Presentation Group */}
          <div className={styles.controlsGroup}>
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
              <button
                className={`${styles.controlBtn} ${styles.revealBtn}`}
                onClick={handleReveal}
                disabled={state.showAnswer}
                data-testid="reveal-btn"
              >
                👁 Đáp án (A)
              </button>
            )}
            <button
              className={`${styles.controlBtn} ${styles.blackoutBtn}`}
              onClick={handleToggleBlackout}
              data-testid="blackout-btn"
            >
              {state.blackout ? '☀️ Bật màn (B)' : '⬛ Tối màn (B)'}
            </button>
          </div>

          {/* Student Evaluation Group */}
          {currentSlide?.type === 'question-slide' && (
            <div className={styles.controlsGroup}>
              <button
                className={`${styles.controlBtn}`}
                style={{ background: '#16a34a', color: '#fff' }}
                onClick={() => handleAnswerChoice('correct')}
                data-testid="correct-btn"
              >
                ✅ Đúng (C)
              </button>
              <button
                className={`${styles.controlBtn}`}
                style={{ background: '#dc2626', color: '#fff' }}
                onClick={() => handleAnswerChoice('incorrect')}
                data-testid="incorrect-btn"
              >
                ❌ Sai (X)
              </button>
              {(getMistakeTracker().hasMistake(currentSlide.question.id) ||
                state.lesson?.id === 'review-mistakes-session') && (
                <button
                  className={`${styles.controlBtn}`}
                  style={{ background: '#059669', color: '#fff' }}
                  onClick={() => {
                    getMistakeTracker().removeMistake(currentSlide.question.id);
                    setMistakeToast('✅ Lớp đã nắm vững! Đã xóa câu này khỏi danh sách sai.');
                    setTimeout(() => setMistakeToast(null), 3000);
                  }}
                  data-testid="mark-mastered-btn"
                  title="Đánh dấu lớp đã nắm vững, xóa câu này khỏi danh sách câu hay sai"
                >
                  🌟 Đã nắm vững (Xóa)
                </button>
              )}
            </div>
          )}
        </div>

        {/* Teacher Notes - Chỉ hiện trên màn hình laptop của giáo viên */}
        <div className={styles.notesBox}>
          <div className={styles.notesTitle}>📝 Ghi chú sư phạm (Chỉ giáo viên thấy)</div>
          <div className={styles.notesContent}>
            {currentSlide?.teacherNote ? (
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                {currentSlide.teacherNote}
              </p>
            ) : (
              currentSlide?.type === 'question-slide' && currentSlide.question.explanation ? (
                <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {currentSlide.question.explanation}
                </p>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
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
            <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
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

      <ClassroomManagerModal
        isOpen={isClassroomModalOpen}
        onClose={() => setIsClassroomModalOpen(false)}
        students={classroomData.students}
        teams={classroomData.teams}
      />
    </div>
  );
}
