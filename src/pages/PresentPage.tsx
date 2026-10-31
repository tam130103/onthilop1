import { useEffect, useReducer, useCallback, useMemo, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MultipleChoiceView } from '@/components/questions/MultipleChoiceView';
import { CountingView } from '@/components/questions/CountingView';
import { NumberSelectView } from '@/components/questions/NumberSelectView';
import { TapPlaceView } from '@/components/questions/TapPlaceView';
import { MatchingView } from '@/components/questions/MatchingView';
import { PhonicsBoard } from '@/components/phonics/PhonicsBoard';
import { PhonicsFlashcard } from '@/components/phonics/PhonicsFlashcard';
import { TeamScoreboard } from '@/components/classroom/TeamScoreboard';
import { ClassroomTimer } from '@/components/classroom/ClassroomTimer';
import { RandomPickerOverlay } from '@/components/classroom/RandomPickerOverlay';
import { StarRewardOverlay } from '@/components/common/StarRewardOverlay';
import {
  playerReducer,
  createInitialState,
  getCurrentSlide,
} from '@/core/player-reducer';
import { SyncChannel } from '@/core/sync-channel';
import { getAudioManager } from '@/core/audio-manager';
import {
  getClassroomStore,
  type ClassroomData,
} from '@/core/classroom-store';
import { type Lesson } from '@/schemas/content.schema';
import { getLessonById } from '@/core/lesson-storage';
import { getTeachingSessionById } from '@/core/session-storage';
import { getMistakeTracker } from '@/core/mistake-tracker';
import styles from './PresentPage.module.css';

export function PresentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lesson');
  const sessionId = searchParams.get('session');
  const [state, dispatch] = useReducer(playerReducer, createInitialState());
  const channelRef = useRef<SyncChannel | null>(null);
  const isLoadedRef = useRef(false);
  const pendingSnapshotRef = useRef<Record<string, unknown> | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showStarReward, setShowStarReward] = useState(false);
  const prevCorrectSize = useRef(0);

  // Local student interaction states
  const [selectedAnswer, setSelectedAnswer] = useState<{ isCorrect: boolean; answer: string } | null>(null);
  const [showTeamsDropdown, setShowTeamsDropdown] = useState(false);

  const [classroomData, setClassroomData] = useState<ClassroomData>(
    getClassroomStore().getData()
  );

  // Subscribe to classroom store
  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  // Hiệu ứng thưởng sao khi trả lời đúng
  useEffect(() => {
    if (state.answeredCorrectly.size > prevCorrectSize.current) {
      setShowStarReward(true);
      getAudioManager().play('/media/tts/timer-chime.mp3');
    }
    prevCorrectSize.current = state.answeredCorrectly.size;
  }, [state.answeredCorrectly.size]);

  // Reset selected answer when slide changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [state.currentSlideIndex]);

  // Timer interval on TV
  useEffect(() => {
    if (!classroomData.timer.isRunning) return;

    const interval = setInterval(() => {
      const isFinished = getClassroomStore().tickTimer();
      if (isFinished) {
        getAudioManager().play('/media/tts/timer-chime.mp3');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [classroomData.timer.isRunning]);

  // Sync channel - nhận STATE_SNAPSHOT từ /presenter
  useEffect(() => {
    const syncId = lessonId || sessionId || undefined;
    const channel = new SyncChannel('present', syncId);
    channelRef.current = channel;

    const unsubs = [
      channel.on('STATE_SNAPSHOT', (msg) => {
        if (isLoadedRef.current) {
          dispatch({
            type: 'APPLY_SNAPSHOT',
            payload: msg.payload as Parameters<typeof dispatch>[0] extends {
              type: 'APPLY_SNAPSHOT';
              payload: infer P;
            }
              ? P
              : Record<string, unknown>,
          });
        } else {
          pendingSnapshotRef.current = msg.payload;
        }
        // Đồng bộ dữ liệu lớp học nếu có trong snapshot
        const p = msg.payload as {
          teams?: import('@/core/classroom-store').Team[];
          timer?: import('@/core/classroom-store').ClassroomTimerState;
          pickerActive?: boolean;
          pickedStudent?: import('@/core/classroom-store').Student | null;
        };
        if (p.teams) getClassroomStore().getData().teams = p.teams;
        if (p.timer) getClassroomStore().getData().timer = p.timer;
        if (p.pickerActive !== undefined) getClassroomStore().getData().pickerActive = p.pickerActive;
        if (p.pickedStudent !== undefined) getClassroomStore().getData().pickedStudent = p.pickedStudent;
        setClassroomData({ ...getClassroomStore().getData() });
      }),
      channel.on('CLASSROOM_UPDATE', (msg) => {
        const payload = msg.payload as Partial<ClassroomData>;
        if (payload.teams) getClassroomStore().getData().teams = payload.teams;
        if (payload.timer) getClassroomStore().getData().timer = payload.timer;
        if (payload.pickerActive !== undefined) getClassroomStore().getData().pickerActive = payload.pickerActive;
        if (payload.pickedStudent !== undefined) getClassroomStore().getData().pickedStudent = payload.pickedStudent ?? null;
        setClassroomData({ ...getClassroomStore().getData() });
      }),
      channel.on('BLACKOUT_TOGGLE', (msg) => {
        if (typeof msg.payload['blackout'] === 'boolean') {
          dispatch({ type: 'SET_BLACKOUT', blackout: msg.payload['blackout'] });
        } else {
          dispatch({ type: 'TOGGLE_BLACKOUT' });
        }
      }),
      channel.on('AUDIO_PLAY', (msg) => {
        const url = msg.payload['url'];
        if (typeof url === 'string') {
          getAudioManager().play(url);
        }
      }),
      channel.on('AUDIO_STOP', () => {
        getAudioManager().stop();
      }),
    ];

    // Gửi HELLO khi mở trang để xin state ban đầu từ /presenter
    channel.send('HELLO', {});

    return () => {
      unsubs.forEach((fn) => fn());
      channel.dispose();
      channelRef.current = null;
    };
  }, [lessonId, sessionId]);

  // Load lesson & Nạp audio
  useEffect(() => {
    const targetLessonId =
      lessonId ||
      (sessionId
        ? getTeachingSessionById(sessionId)?.steps.find((s) => s.lessonId)?.lessonId
        : undefined);

    if (!targetLessonId) return;
    let isCancelled = false;

    async function loadLesson() {
      try {
        if (!targetLessonId) return;
        const found = await getLessonById(targetLessonId);
        if (found) {
          if (isCancelled) return;
          const lesson: Lesson = found;
          dispatch({ type: 'LOAD_LESSON', lesson });
          dispatch({ type: 'START_SESSION' });
          isLoadedRef.current = true;

          // Trích xuất audio của đúng buổi học đang dạy
          const sessionAudioUrls: string[] = [];
          lesson.slides.forEach((s) => {
            if ('audio' in s && typeof s.audio === 'string' && s.audio) {
              sessionAudioUrls.push(s.audio);
            }
            if (s.type === 'question-slide') {
              const q = s.question;
              if (q.promptAudio) sessionAudioUrls.push(q.promptAudio);
              if (q.explanationAudio) sessionAudioUrls.push(q.explanationAudio);
              if ('options' in q && Array.isArray(q.options)) {
                q.options.forEach((opt) => {
                  if (opt.audio) sessionAudioUrls.push(opt.audio);
                });
              }
            }
          });
          getAudioManager().loadSessionAudio(sessionAudioUrls);

          if (pendingSnapshotRef.current) {
            dispatch({
              type: 'APPLY_SNAPSHOT',
              payload: pendingSnapshotRef.current as Parameters<typeof dispatch>[0] extends {
                type: 'APPLY_SNAPSHOT';
                payload: infer P;
              }
                ? P
                : Record<string, unknown>,
            });
            pendingSnapshotRef.current = null;
          }

          channelRef.current?.send('HELLO', {});
          return;
        }
        dispatch({ type: 'SET_ERROR', error: `Bài học "${targetLessonId}" không tồn tại` });
      } catch (e) {
        dispatch({ type: 'SET_ERROR', error: String(e) });
      }
    }

    loadLesson();

    return () => {
      isCancelled = true;
      getAudioManager().releaseSessionAudio();
    };
  }, [lessonId, sessionId]);

  // Keyboard controls: F5 chặn, Escape giữ, B blackout, Space/Mũi tên
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'F5') {
        e.preventDefault();
        return;
      }
      if (e.key === 'Escape') return;

      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        dispatch({ type: 'SET_BLACKOUT', blackout: !state.blackout });
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          dispatch({ type: 'NEXT_SLIDE' });
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          dispatch({ type: 'PREV_SLIDE' });
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.blackout]);

  const currentSlide = getCurrentSlide(state);

  const handleToggleBlackout = useCallback(() => {
    dispatch({ type: 'SET_BLACKOUT', blackout: !state.blackout });
  }, [state.blackout]);

  const handleStartSession = useCallback(() => {
    getAudioManager().unlock();
    setHasStarted(true);
    channelRef.current?.send('HELLO', {});
  }, []);

  // Audio playback handler for "Nghe cô đọc" button
  const handlePlayCurrentAudio = useCallback(() => {
    if (!currentSlide) return;
    let audioUrl: string | undefined;
    if ('audio' in currentSlide && typeof currentSlide.audio === 'string') {
      audioUrl = currentSlide.audio;
    } else if (currentSlide.type === 'question-slide') {
      audioUrl = currentSlide.question.promptAudio;
    }
    if (audioUrl) {
      getAudioManager().play(audioUrl);
    }
  }, [currentSlide]);

  // Handle student answer selection
  const handleAnswerSelect = useCallback((answerId: string, isCorrect: boolean) => {
    setSelectedAnswer({ isCorrect, answer: answerId });
  }, []);

  // Check answer button (KIỂM TRA)
  const handleCheckAnswer = useCallback(() => {
    if (!selectedAnswer || !currentSlide) return;
    dispatch({ type: 'REVEAL_ANSWER' });

    if (currentSlide.type === 'question-slide') {
      const q = currentSlide.question;
      if (selectedAnswer.isCorrect) {
        dispatch({ type: 'ANSWER_CORRECT', questionId: q.id });
        setShowStarReward(true);
        if (q.explanationAudio) {
          getAudioManager().play(q.explanationAudio);
        } else {
          getAudioManager().play('/media/tts/timer-chime.mp3');
        }
      } else {
        dispatch({
          type: 'ANSWER_INCORRECT',
          slideIndex: state.currentSlideIndex,
          question: q,
          givenAnswer: selectedAnswer.answer,
        });
        if (state.lesson) {
          getMistakeTracker().recordMistake(
            state.lesson.id,
            state.lesson.title,
            state.lesson.subject,
            q
          );
        }
      }
    }
  }, [selectedAnswer, currentSlide, state.currentSlideIndex, state.lesson]);

  // Next slide button (TIẾP TỤC)
  const handleNextSlide = useCallback(() => {
    dispatch({ type: 'NEXT_SLIDE' });
  }, []);

  const handlePrevSlide = useCallback(() => {
    dispatch({ type: 'PREV_SLIDE' });
  }, []);

  // Calculations
  const progressPercent = state.totalSlides > 0
    ? Math.min(100, Math.round(((state.currentSlideIndex + 1) / state.totalSlides) * 100))
    : 0;

  const xpScore = state.answeredCorrectly.size * 10 + 20;

  const isQuestionSlide = currentSlide?.type === 'question-slide';
  const isAnsweredOrRevealed = state.showAnswer;
  const isLastSlide = state.totalSlides > 0 && state.currentSlideIndex === state.totalSlides - 1;

  const slideInfo = state.lesson
    ? `${state.currentSlideIndex + 1} / ${state.totalSlides}`
    : '';

  // Render Slide Content
  const renderSlide = useMemo(() => {
    if (!currentSlide) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '28px', color: '#64748b', fontWeight: 700 }}>
            {state.error ?? 'Đang tải bài học...'}
          </p>
        </div>
      );
    }

    switch (currentSlide.type) {
      case 'title-slide':
        return (
          <div className={styles.cardFrame} data-testid="title-slide">
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⭐</div>
            <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', marginBottom: '16px', textAlign: 'center' }}>
              {currentSlide.title}
            </h1>
            {currentSlide.subtitle && (
              <p style={{ fontSize: '22px', fontWeight: 800, color: '#7c3aed', background: '#f5f3ff', padding: '10px 24px', borderRadius: '18px' }}>
                {currentSlide.subtitle}
              </p>
            )}
          </div>
        );

      case 'content-slide':
        return (
          <div className={styles.cardFrame} data-testid="content-slide">
            <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', marginBottom: '20px', textAlign: 'center' }}>
              {currentSlide.title}
            </h2>
            {currentSlide.body && (
              <p style={{ fontSize: '24px', color: '#334155', lineHeight: 1.6, fontWeight: 700, textAlign: 'center', maxWidth: '800px' }}>
                {currentSlide.body}
              </p>
            )}
            {currentSlide.illustration && (
              <img
                src={currentSlide.illustration}
                alt=""
                style={{ maxWidth: '420px', maxHeight: '280px', borderRadius: '24px', marginTop: '16px', border: '3px solid #e2e8f0' }}
              />
            )}
            {currentSlide.bullets && (
              <ul style={{ listStyle: 'none', marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentSlide.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: '22px', color: '#1e293b', fontWeight: 700 }}>
                    ▸ {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'phonics-slide':
        return (
          <div style={{ width: '100%', maxWidth: '900px' }}>
            <PhonicsBoard
              initials={currentSlide.initials}
              rhymes={currentSlide.rhymes}
              tones={currentSlide.tones}
            />
          </div>
        );

      case 'flashcard-slide':
        return (
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <PhonicsFlashcard
              cards={currentSlide.cards}
              title={currentSlide.title}
            />
          </div>
        );

      case 'question-slide': {
        const q = currentSlide.question;
        switch (q.type) {
          case 'multiple_choice':
          case 'multiple-choice':
            return (
              <div data-testid="multiple-choice-view" style={{ width: '100%' }}>
                <MultipleChoiceView
                  prompt={q.prompt}
                  hidePrompt={true}
                  illustration={q.illustration || undefined}
                  options={q.options.map((o) => ({
                    id: o.id,
                    label: o.label,
                    image: o.image,
                  }))}
                  correctOptionId={q.correctOptionId}
                  explanation={q.explanation}
                  showAnswer={state.showAnswer}
                  onAnswer={(optId, isCorrect) => handleAnswerSelect(optId, isCorrect)}
                />
              </div>
            );
          case 'counting':
            return (
              <div data-testid="counting-view" style={{ width: '100%' }}>
                <CountingView
                  prompt={q.prompt}
                  hidePrompt={true}
                  items={q.items.map((it) => ({
                    image: it.image,
                    alt: it.alt,
                  }))}
                  correctCount={q.correctCount}
                  numberRange={q.numberRange}
                  explanation={q.explanation}
                  showAnswer={state.showAnswer}
                  onAnswer={(count, isCorrect) => handleAnswerSelect(String(count), isCorrect)}
                />
              </div>
            );
          case 'number_select':
          case 'number-select':
            return (
              <div data-testid="number-select-view" style={{ width: '100%' }}>
                <NumberSelectView
                  prompt={q.prompt}
                  hidePrompt={true}
                  expression={q.expression}
                  illustration={q.illustration || undefined}
                  choices={q.choices}
                  correctAnswer={q.correctAnswer}
                  explanation={q.explanation}
                  showAnswer={state.showAnswer}
                  onAnswer={(choice, isCorrect) => handleAnswerSelect(String(choice), isCorrect)}
                />
              </div>
            );
          case 'tap_place':
            return (
              <TapPlaceView
                prompt={q.prompt}
                hidePrompt={true}
                targets={q.targets}
                items={q.items}
                correctMapping={q.correctMapping}
                explanation={q.explanation}
                showAnswer={state.showAnswer}
                initialMapping={state.tapPlaceMapping}
                onAnswer={(mapping, isCorrect) => handleAnswerSelect(JSON.stringify(mapping), isCorrect)}
              />
            );
          case 'matching':
            return (
              <MatchingView
                prompt={q.prompt}
                hidePrompt={true}
                leftColumn={q.leftColumn}
                rightColumn={q.rightColumn}
                correctPairs={q.correctPairs}
                explanation={q.explanation}
                showAnswer={state.showAnswer}
                initialPairs={state.matchingPairs}
                onAnswer={(pairs, isCorrect) => handleAnswerSelect(JSON.stringify(pairs), isCorrect)}
              />
            );
        }
      }
    }
  }, [
    currentSlide,
    state.showAnswer,
    state.error,
    state.tapPlaceMapping,
    state.matchingPairs,
    handleAnswerSelect,
  ]);

  return (
    <div className={styles.viewport}>
      {/* 1. TOP HEADER (onthi.app & Duolingo style) */}
      <header className={styles.header}>
        {/* Nút Đóng [X] */}
        <button
          onClick={() => navigate('/')}
          className={styles.closeBtn}
          title="Trở về trang chủ"
        >
          ✕
        </button>

        {/* Thanh tiến trình Progress Bar */}
        <div className={styles.progressBarTrack} title={`Tiến độ bài học: ${progressPercent}%`}>
          <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }}>
            <div className={styles.progressBarGloss} />
          </div>
        </div>

        {/* Cụm điểm năng lượng & điểm đội thi đua */}
        <div className={styles.headerRight}>
          <div className={styles.xpBadge} title="Điểm kinh nghiệm tích lũy">
            <span style={{ fontSize: '18px' }}>⚡</span>
            <span>{xpScore} XP</span>
          </div>

          <div
            className={styles.teamSummaryPill}
            onClick={() => setShowTeamsDropdown(!showTeamsDropdown)}
            title="Bấm để xem/ẩn bảng điểm 4 đội"
            style={{ cursor: 'pointer' }}
          >
            <span>🏆</span>
            <span>4 Đội thi đua</span>
          </div>
        </div>
      </header>

      {/* Floating Team Scoreboard & Timer if toggled */}
      {showTeamsDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            right: '24px',
            zIndex: 40,
            background: '#ffffff',
            borderRadius: '24px',
            padding: '16px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <TeamScoreboard teams={classroomData.teams} />
          <ClassroomTimer timer={classroomData.timer} />
        </div>
      )}

      {/* 2. MAIN STAGE CONTENT CONTAINER */}
      <main className={styles.mainStage}>
        {state.phase === 'finished' ? (
          <div className={styles.cardFrame} data-testid="finish-view" style={{ textAlign: 'center', margin: 'auto' }}>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>🏆</div>
            <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#58CC02', marginBottom: '12px' }}>
              Hoàn Thành Bài Học!
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', fontWeight: 700, marginBottom: '20px' }}>
              Bé đã nhận được <span style={{ color: '#d97706', fontWeight: 900 }}>+{xpScore} XP</span> tích lũy!
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ padding: '16px 24px', background: '#f0fdf4', borderRadius: '18px', border: '2px solid #86efac' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#15803d' }}>{state.answeredCorrectly.size}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a' }}>Câu đúng</div>
              </div>
              <div style={{ padding: '16px 24px', background: '#fef2f2', borderRadius: '18px', border: '2px solid #fca5a5' }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#dc2626' }}>{state.answeredIncorrectly.size}</div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444' }}>Cần ôn lại</div>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '16px 40px',
                fontSize: '18px',
                fontWeight: 900,
                color: '#ffffff',
                backgroundColor: '#58CC02',
                border: 'none',
                borderBottom: '5px solid #45A300',
                borderRadius: '18px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(88, 204, 2, 0.3)',
              }}
            >
              TIẾP TỤC HỌC BÀI TIẾP THEO ➔
            </button>
          </div>
        ) : (
          <>
            {/* Audio Prompt Bar & Question Prompt Title */}
            {currentSlide && ('audio' in currentSlide || currentSlide.type === 'question-slide') && (
              <div className={styles.promptBar}>
                <button
                  onClick={handlePlayCurrentAudio}
                  className={styles.audioBtn}
                  title="Bấm để nghe cô giáo đọc"
                >
                  <span style={{ fontSize: '20px' }}>🔊</span>
                  <span>Nghe cô đọc</span>
                </button>
                {isQuestionSlide && (
                  <h1 className={styles.promptTitle}>
                    {currentSlide.question.prompt}
                  </h1>
                )}
              </div>
            )}

            {/* Slide View */}
            {renderSlide}
          </>
        )}

        {/* Slide Counter Indicator */}
        {slideInfo && (
          <div data-testid="slide-counter" style={{ display: 'none' }}>
            {slideInfo}
          </div>
        )}
      </main>

      {/* 3. BOTTOM ACTION DOCK (onthi.app & Duolingo style) */}
      {state.phase !== 'finished' && (
        <footer
          className={`${styles.bottomDock} ${
          isAnsweredOrRevealed
            ? selectedAnswer?.isCorrect
              ? styles.bottomDockCorrect
              : styles.bottomDockIncorrect
            : ''
        }`}
      >
        <div className={styles.bottomDockInner}>
          {/* Thông báo kết quả phản hồi phong cách Duolingo / onthi.app */}
          {isAnsweredOrRevealed ? (
            <div className={styles.toastFeedback}>
              <div className={styles.toastEmoji}>
                {selectedAnswer?.isCorrect ? '🥳' : '💡'}
              </div>
              <div>
                <div
                  className={`${styles.toastTitle} ${
                    selectedAnswer?.isCorrect
                      ? styles.toastTitleCorrect
                      : styles.toastTitleIncorrect
                  }`}
                >
                  {selectedAnswer?.isCorrect
                    ? 'Chính xác! Tuyệt vời lắm bé ơi!'
                    : 'Chưa chính xác rồi bé ơi!'}
                  {selectedAnswer?.isCorrect && (
                    <span
                      style={{
                        marginLeft: '10px',
                        fontSize: '12px',
                        fontWeight: 900,
                        backgroundColor: '#facc15',
                        color: '#78350f',
                        padding: '2px 8px',
                        borderRadius: '12px',
                      }}
                    >
                      +10 XP
                    </span>
                  )}
                </div>
                <div className={styles.toastSubtext}>
                  {currentSlide?.type === 'question-slide' && currentSlide.question.explanation
                    ? currentSlide.question.explanation
                    : selectedAnswer?.isCorrect
                    ? 'Bé đã chọn đáp án hoàn toàn chính xác!'
                    : 'Cố gắng quan sát kỹ hơn ở câu sau nhé!'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
              {isQuestionSlide ? '👉 Bé hãy chọn đáp án đúng rồi bấm KIỂM TRA nhé!' : '📖 Cùng cô đọc và khám phá bài học!'}
            </div>
          )}

          {/* Group nút điều hướng & hành động */}
          <div className={styles.dockButtons}>
            {/* Nút quay lại slide trước */}
            <button
              onClick={handlePrevSlide}
              disabled={state.currentSlideIndex === 0}
              className={styles.backBtn}
              title="Quay lại câu trước"
              style={{ opacity: state.currentSlideIndex === 0 ? 0.3 : 1 }}
            >
              ◀
            </button>

            {/* Nút mở giấy nháp */}
            <button
              onClick={() => alert('Bé có thể dùng bảng con hoặc giấy nháp bên cạnh để tính toán nhé!')}
              className={styles.scratchpadBtn}
              title="Mở giấy nháp"
            >
              <span>✏️</span>
              <span>Mở giấy nháp</span>
            </button>

            {/* Nút Hành động chính */}
            {isQuestionSlide && !isAnsweredOrRevealed ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className={`${styles.actionBtn} ${
                  selectedAnswer ? styles.actionBtnActive : styles.actionBtnDisabled
                }`}
              >
                KIỂM TRA
              </button>
            ) : (
              <button
                onClick={handleNextSlide}
                className={`${styles.actionBtn} ${styles.actionBtnActive}`}
              >
                <span>{isLastSlide ? 'HOÀN THÀNH' : 'TIẾP TỤC'}</span>
                <span style={{ fontSize: '22px' }}>➔</span>
              </button>
            )}
          </div>
        </div>
      </footer>
      )}

      {/* OVERLAYS */}
      {/* 1. Màn hình chờ mở khóa âm thanh khi mới vào trang */}
      {!hasStarted && (
        <div
          data-testid="start-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '36px',
              border: '3px solid #e2e8f0',
              borderBottom: '10px solid #cbd5e1',
              padding: '50px 70px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              maxWidth: '750px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '56px' }}>⭐</div>
            <div style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Vào Học Cùng Ôn Thi Lớp 1
            </div>
            <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 600, maxWidth: '480px' }}>
              Chạm vào màn hình để mở khóa giọng đọc của cô giáo và bắt đầu bài học
            </p>
            <button
              onClick={handleStartSession}
              data-testid="start-btn"
              style={{
                marginTop: '10px',
                padding: '16px 44px',
                fontSize: '22px',
                fontWeight: 900,
                color: '#ffffff',
                backgroundColor: '#58CC02',
                border: 'none',
                borderBottom: '6px solid #45A300',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(88, 204, 2, 0.35)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              ▶ BẮT ĐẦU BUỔI HỌC
            </button>
          </div>
        </div>
      )}

      {/* 2. Hiệu ứng thưởng sao khi trả lời đúng */}
      <StarRewardOverlay
        show={showStarReward}
        onComplete={() => setShowStarReward(false)}
      />

      {/* 3. Blackout Overlay (Phím B) */}
      {state.blackout && (
        <div
          data-testid="blackout-overlay"
          onClick={handleToggleBlackout}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            zIndex: 999999,
            cursor: 'pointer',
          }}
          title="Màn hình đang phủ đen. Nhấn phím B hoặc chạm chuột để tiếp tục buổi học"
        />
      )}

      {/* 4. Random Picker Overlay */}
      <RandomPickerOverlay
        active={classroomData.pickerActive}
        pickedStudent={classroomData.pickedStudent}
        allStudents={classroomData.students}
        onClose={() => getClassroomStore().closePicker()}
      />
    </div>
  );
}
