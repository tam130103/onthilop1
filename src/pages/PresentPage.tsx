import { useEffect, useReducer, useCallback, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stage16x9 } from '@/components/Stage16x9';
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
  type Team,
  type Student,
  type ClassroomTimerState,
} from '@/core/classroom-store';
import { LessonSchema, type Lesson } from '@/schemas/content.schema';
import { getLessonById } from '@/core/lesson-storage';
import { getTeachingSessionById } from '@/core/session-storage';

const LESSON_URLS = [
  '/content/lessons/math-lesson-01.json',
  '/content/lessons/math-lesson-02.json',
  '/content/lessons/vn-lesson-01.json',
  '/content/lessons/vn-lesson-02.json',
];

export function PresentPage() {
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

  const [classroomData, setClassroomData] = useState<ClassroomData>(
    getClassroomStore().getData()
  );

  // Subscribe to classroom store
  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  // Hiệu ứng thưởng sao khi học sinh trả lời đúng
  useEffect(() => {
    if (state.answeredCorrectly.size > prevCorrectSize.current) {
      setShowStarReward(true);
      getAudioManager().play('/media/tts/timer-chime.mp3');
    }
    prevCorrectSize.current = state.answeredCorrectly.size;
  }, [state.answeredCorrectly.size]);

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

  // Sync channel - /present chỉ hiển thị, nhận STATE_SNAPSHOT từ /presenter
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
          teams?: Team[];
          timer?: ClassroomTimerState;
          pickerActive?: boolean;
          pickedStudent?: Student | null;
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
      channel.on('LESSON_CHANGE', async (msg) => {
        const newLessonId = msg.payload['lessonId'];
        if (typeof newLessonId === 'string') {
          const found = await getLessonById(newLessonId);
          if (found) {
            dispatch({ type: 'LOAD_LESSON', lesson: found });
            dispatch({ type: 'START_SESSION' });
            isLoadedRef.current = true;
          }
        }
      }),
      channel.on('SLIDE_CHANGE', (msg) => {
        const index = msg.payload['index'];
        if (typeof index === 'number') {
          dispatch({ type: 'GO_TO_SLIDE', index });
        }
      }),
      channel.on('ANSWER_REVEAL', () => {
        dispatch({ type: 'REVEAL_ANSWER' });
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

  // Load lesson & Nạp audio chỉ của buổi đang dạy
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

          // Trích xuất audio của đúng buổi học đang dạy để nạp vào SessionAudioManager
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

          // Gửi HELLO xin state mới nhất
          channelRef.current?.send('HELLO', {});
          return;
        }
        dispatch({ type: 'SET_ERROR', error: `Bài học "${targetLessonId}" không tồn tại` });
      } catch (e) {
        dispatch({ type: 'SET_ERROR', error: String(e) });
      }
    }

    loadLesson();

    // Dọn dẹp & giải phóng bộ nhớ audio khi kết thúc buổi học hoặc đổi bài
    return () => {
      isCancelled = true;
      getAudioManager().releaseSessionAudio();
    };
  }, [lessonId, sessionId]);

  // Keyboard: Chặn F5 (clicker), giữ Escape, điều hướng mũi tên
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // 1. Chặn F5 (clicker hay ấn F5)
      if (e.key === 'F5') {
        e.preventDefault();
        return;
      }
      // 2. Giữ phím Escape: Không chặn e.preventDefault() để thoát Fullscreen tự nhiên
      if (e.key === 'Escape') {
        return;
      }
      // 3. Mũi tên điều hướng cục bộ (cho phép bấm clicker/bàn phím trực tiếp trên màn present)
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
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
  }, []);

  const currentSlide = getCurrentSlide(state);

  const handleToggleBlackout = useCallback(() => {
    dispatch({ type: 'SET_BLACKOUT', blackout: !state.blackout });
  }, [state.blackout]);

  // Nút "Bắt đầu buổi học" trên TV: mở khóa AudioContext và gỡ màn chờ
  const handleStartSession = useCallback(() => {
    getAudioManager().unlock();
    setHasStarted(true);
    channelRef.current?.send('HELLO', {});
  }, []);

  const renderSlide = useMemo(() => {
    if (!currentSlide) {
      return (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '48px', color: '#94a3b8' }}>
            {state.error ?? 'Đang tải bài học...'}
          </p>
        </div>
      );
    }

    switch (currentSlide.type) {
      case 'title-slide':
        return (
          <div
            style={{
              textAlign: 'center',
              background: '#ffffff',
              padding: '60px 80px',
              borderRadius: '40px',
              border: '3px solid #e2e8f0',
              borderBottom: '10px solid #cbd5e1',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              maxWidth: '1200px',
            }}
            data-testid="title-slide"
          >
            <div style={{ fontSize: '54px', marginBottom: '16px' }}>⭐</div>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#0f172a',
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              {currentSlide.title}
            </h1>
            {currentSlide.subtitle && (
              <p
                style={{
                  fontSize: '34px',
                  fontWeight: 700,
                  color: '#7c3aed',
                  background: '#f5f3ff',
                  padding: '10px 28px',
                  borderRadius: '20px',
                  display: 'inline-block',
                }}
              >
                {currentSlide.subtitle}
              </p>
            )}
          </div>
        );

      case 'content-slide':
        return (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 60px',
              background: '#ffffff',
              borderRadius: '36px',
              border: '3px solid #e2e8f0',
              borderBottom: '8px solid #cbd5e1',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              maxWidth: '1200px',
            }}
            data-testid="content-slide"
          >
            <h2
              style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#0f172a',
                marginBottom: '24px',
                letterSpacing: '-0.5px',
              }}
            >
              {currentSlide.title}
            </h2>
            {currentSlide.body && (
              <p style={{ fontSize: '34px', color: '#334155', lineHeight: 1.6, fontWeight: 600 }}>
                {currentSlide.body}
              </p>
            )}
            {currentSlide.illustration && (
              <img
                src={currentSlide.illustration}
                alt=""
                style={{
                  maxWidth: '540px',
                  maxHeight: '360px',
                  borderRadius: '24px',
                  marginTop: '20px',
                  border: '3px solid #e2e8f0',
                }}
              />
            )}
            {currentSlide.bullets && (
              <ul style={{ listStyle: 'none', marginTop: '20px' }}>
                {currentSlide.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{ fontSize: '32px', color: '#1e293b', padding: '8px 0', fontWeight: 600 }}
                  >
                    ▸ {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'phonics-slide':
        return (
          <PhonicsBoard
            initials={currentSlide.initials}
            rhymes={currentSlide.rhymes}
            tones={currentSlide.tones}
          />
        );

      case 'flashcard-slide':
        return (
          <PhonicsFlashcard
            cards={currentSlide.cards}
            title={currentSlide.title}
          />
        );

      case 'question-slide': {
        const q = currentSlide.question;
        switch (q.type) {
          case 'multiple_choice':
          case 'multiple-choice':
            return (
              <div data-testid="multiple-choice-view">
                <MultipleChoiceView
                  prompt={q.prompt}
                  illustration={q.illustration || undefined}
                  options={q.options.map((o) => ({
                    id: o.id,
                    label: o.label,
                    image: o.image,
                  }))}
                  correctOptionId={q.correctOptionId}
                  explanation={q.explanation}
                  showAnswer={state.showAnswer}
                  onAnswer={() => {}}
                />
              </div>
            );
          case 'counting':
            return (
              <div data-testid="counting-view">
                <CountingView
                  prompt={q.prompt}
                  items={q.items.map((it) => ({
                    image: it.image,
                    alt: it.alt,
                  }))}
                  correctCount={q.correctCount}
                  numberRange={q.numberRange}
                  explanation={q.explanation}
                  showAnswer={state.showAnswer}
                  onAnswer={() => {}}
                />
              </div>
            );
          case 'number_select':
          case 'number-select':
            return (
              <div data-testid="number-select-view">
                <NumberSelectView
                  prompt={q.prompt}
                  expression={q.expression}
                  illustration={q.illustration || undefined}
                  choices={q.choices}
                  correctAnswer={q.correctAnswer}
                  explanation={q.explanation}
                  showAnswer={state.showAnswer}
                  onAnswer={() => {}}
                />
              </div>
            );
          case 'tap_place':
            return (
              <TapPlaceView
                prompt={q.prompt}
                targets={q.targets}
                items={q.items}
                correctMapping={q.correctMapping}
                explanation={q.explanation}
                showAnswer={state.showAnswer}
                initialMapping={state.tapPlaceMapping}
                onAnswer={() => {}}
              />
            );
          case 'matching':
            return (
              <MatchingView
                prompt={q.prompt}
                leftColumn={q.leftColumn}
                rightColumn={q.rightColumn}
                correctPairs={q.correctPairs}
                explanation={q.explanation}
                showAnswer={state.showAnswer}
                initialPairs={state.matchingPairs}
                onAnswer={() => {}}
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
  ]);

  const slideInfo = state.lesson
    ? `${state.currentSlideIndex + 1} / ${state.totalSlides}`
    : '';

  return (
    <Stage16x9
      blackout={state.blackout}
      onToggleBlackout={handleToggleBlackout}
    >
      {/* Nút "Bắt đầu buổi học" để kích hoạt âm thanh trên TV khi mới mở trang */}
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
              padding: '60px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '64px' }}>⭐</div>
            <div style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Sân khấu Trình chiếu Lớp 1
            </div>
            <p style={{ fontSize: '20px', color: '#64748b', fontWeight: 600, maxWidth: '520px' }}>
              Chạm vào màn hình hoặc bấm nút bên dưới để kết nối TV và mở khóa âm thanh
            </p>
            <button
              onClick={handleStartSession}
              data-testid="start-btn"
              style={{
                marginTop: '12px',
                padding: '18px 48px',
                fontSize: '26px',
                fontWeight: 900,
                color: '#ffffff',
                backgroundColor: '#58CC02',
                border: 'none',
                borderBottom: '6px solid #45A300',
                borderRadius: '24px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(88, 204, 2, 0.35)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.08s ease',
              }}
            >
              ▶ BẮT ĐẦU BUỔI HỌC
            </button>
          </div>
        </div>
      )}

      {/* Top Header Classroom Tools Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <TeamScoreboard teams={classroomData.teams} />
        <ClassroomTimer timer={classroomData.timer} />
      </div>

      {renderSlide}

      {/* Hiệu ứng thưởng sao khi trả lời đúng */}
      <StarRewardOverlay
        show={showStarReward}
        onComplete={() => setShowStarReward(false)}
      />

      {/* Slide Counter */}
      {slideInfo && (
        <div
          data-testid="slide-counter"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '40px',
            fontSize: '24px',
            color: 'rgba(148, 163, 184, 0.5)',
            fontWeight: 600,
          }}
        >
          {slideInfo}
        </div>
      )}

      {/* Finished view */}
      {state.phase === 'finished' && (
        <div style={{ textAlign: 'center' }} data-testid="finish-view">
          <h1
            style={{
              fontSize: '72px',
              color: '#22c55e',
              marginBottom: '16px',
            }}
          >
            🎉 Hoàn thành!
          </h1>
          <p style={{ fontSize: '32px', color: '#94a3b8' }}>
            Đúng: {state.answeredCorrectly.size} · Sai:{' '}
            {state.answeredIncorrectly.size}
          </p>
        </div>
      )}

      {/* Random Picker Overlay */}
      <RandomPickerOverlay
        active={classroomData.pickerActive}
        pickedStudent={classroomData.pickedStudent}
        allStudents={classroomData.students}
        onClose={() => getClassroomStore().closePicker()}
      />
    </Stage16x9>
  );
}
