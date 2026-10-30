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

const LESSON_URLS = [
  '/content/lessons/math-lesson-01.json',
  '/content/lessons/math-lesson-02.json',
  '/content/lessons/vn-lesson-01.json',
  '/content/lessons/vn-lesson-02.json',
];

export function PresentPage() {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('lesson');
  const [state, dispatch] = useReducer(playerReducer, createInitialState());
  const channelRef = useRef<SyncChannel | null>(null);
  const isLoadedRef = useRef(false);
  const pendingSnapshotRef = useRef<Record<string, unknown> | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const [classroomData, setClassroomData] = useState<ClassroomData>(
    getClassroomStore().getData()
  );

  // Subscribe to classroom store
  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  // Timer interval on TV
  useEffect(() => {
    if (!classroomData.timer.isRunning) return;

    const interval = setInterval(() => {
      const isFinished = getClassroomStore().tickTimer();
      if (isFinished) {
        getAudioManager().play('/media/tts/timer-chime.wav');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [classroomData.timer.isRunning]);

  // Sync channel - /present chỉ hiển thị, nhận STATE_SNAPSHOT từ /presenter
  useEffect(() => {
    const channel = new SyncChannel('present', lessonId || undefined);
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
  }, [lessonId]);

  // Load lesson & Nạp audio chỉ của buổi đang dạy
  useEffect(() => {
    if (!lessonId) return;
    let isCancelled = false;

    async function loadLesson() {
      try {
        for (const url of LESSON_URLS) {
          try {
            const resp = await fetch(url);
            const json: unknown = await resp.json();
            const parsed = LessonSchema.safeParse(json);
            if (parsed.success && parsed.data.id === lessonId) {
              if (isCancelled) return;
              const lesson: Lesson = parsed.data;
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
          } catch {
            // continue
          }
        }
        dispatch({ type: 'SET_ERROR', error: `Bài học "${lessonId}" không tồn tại` });
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
  }, [lessonId]);

  // Keyboard navigation: Chặn F5 (clicker), giữ Escape
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
      // 3. Mũi tên điều hướng: chuyển slide và gửi yêu cầu sang /presenter
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          channelRef.current?.send('REQ_NEXT_SLIDE', {});
          dispatch({ type: 'NEXT_SLIDE' });
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          channelRef.current?.send('REQ_PREV_SLIDE', {});
          dispatch({ type: 'PREV_SLIDE' });
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const currentSlide = getCurrentSlide(state);

  const handleToggleBlackout = useCallback(() => {
    const next = !state.blackout;
    dispatch({ type: 'SET_BLACKOUT', blackout: next });
    channelRef.current?.send('BLACKOUT_TOGGLE', { blackout: next });
  }, [state.blackout]);

  // Học sinh tương tác chạm trên TV: gửi STUDENT_ANSWER sang /presenter để cập nhật state duy nhất
  const handleAnswer = useCallback(
    (answerId: string, isCorrect: boolean) => {
      if (!currentSlide || currentSlide.type !== 'question-slide') return;
      channelRef.current?.send('STUDENT_ANSWER', {
        questionId: currentSlide.question.id,
        isCorrect,
        givenAnswer: answerId,
        slideIndex: state.currentSlideIndex,
      });
    },
    [currentSlide, state.currentSlideIndex]
  );

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
          <div style={{ textAlign: 'center' }} data-testid="title-slide">
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 800,
                color: '#f8fafc',
                marginBottom: '16px',
              }}
            >
              {currentSlide.title}
            </h1>
            {currentSlide.subtitle && (
              <p style={{ fontSize: '36px', color: '#94a3b8' }}>
                {currentSlide.subtitle}
              </p>
            )}
          </div>
        );

      case 'content-slide':
        return (
          <div
            style={{ textAlign: 'center', padding: '20px' }}
            data-testid="content-slide"
          >
            <h2
              style={{
                fontSize: '64px',
                fontWeight: 700,
                color: '#f8fafc',
                marginBottom: '24px',
              }}
            >
              {currentSlide.title}
            </h2>
            {currentSlide.body && (
              <p style={{ fontSize: '36px', color: '#cbd5e1', lineHeight: 1.6 }}>
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
                  borderRadius: '16px',
                  marginTop: '20px',
                }}
              />
            )}
            {currentSlide.bullets && (
              <ul style={{ listStyle: 'none', marginTop: '20px' }}>
                {currentSlide.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{ fontSize: '32px', color: '#e2e8f0', padding: '8px 0' }}
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
                  onAnswer={handleAnswer}
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
                  onAnswer={(count, isCorrect) => handleAnswer(String(count), isCorrect)}
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
                  onAnswer={(num, isCorrect) => handleAnswer(String(num), isCorrect)}
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
                onAnswer={(m, isCorrect) => {
                  channelRef.current?.send('REQ_TAP_PLACE', { mapping: m });
                  handleAnswer(JSON.stringify(m), isCorrect);
                }}
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
                onAnswer={(p, isCorrect) => {
                  channelRef.current?.send('REQ_MATCHING', { pairs: p });
                  handleAnswer(JSON.stringify(p), isCorrect);
                }}
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
    handleAnswer,
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
            background: 'rgba(15, 23, 42, 0.95)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#f8fafc' }}>
            📺 Màn chiếu Lớp 1
          </div>
          <p style={{ fontSize: '24px', color: '#94a3b8' }}>
            Nhấp chuột hoặc chạm màn hình để kết nối và mở khóa âm thanh
          </p>
          <button
            onClick={handleStartSession}
            data-testid="start-btn"
            style={{
              padding: '18px 48px',
              fontSize: '32px',
              fontWeight: 800,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '24px',
              cursor: 'pointer',
              boxShadow: '0 12px 28px rgba(34, 197, 94, 0.4)',
              transition: 'transform 0.15s ease',
            }}
          >
            ▶ BẮT ĐẦU BUỔI HỌC
          </button>
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
