import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EXAMS_DATA, getExamById, type ExamData } from '@/data/exam-data';
import { getMistakeTracker } from '@/core/mistake-tracker';
import type { Question } from '@/schemas/content.schema';
import styles from './ExamPage.module.css';

export function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  // Find the selected exam, default to first exam if not found
  const exam: ExamData = useMemo(() => {
    if (examId) {
      const found = getExamById(examId);
      if (found) return found;
    }
    return EXAMS_DATA[0]!;
  }, [examId]);

  // Exam state
  const totalQuestions = exam.questions.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 900 seconds
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Audio helper
  const playAudio = useCallback((audioPath?: string) => {
    if (!audioPath) return;
    try {
      const audio = new Audio(audioPath);
      audio.play().catch((err) => {
        console.warn('Audio playback prevented or failed:', err);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer color class
  const timerClass = useMemo(() => {
    if (timeLeft <= 60) return `${styles.timerBadge} ${styles.timerCritical}`;
    if (timeLeft <= 300) return `${styles.timerBadge} ${styles.timerWarning}`;
    return `${styles.timerBadge} ${styles.timerNormal}`;
  }, [timeLeft]);

  const currentQ: Question = exam.questions[currentIndex]!;

  // Answer handler
  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  // Number of answered questions
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  // Submit test
  const handleSubmitExam = useCallback(() => {
    setShowConfirmModal(false);
    setIsSubmitted(true);

    // Record mistakes
    const mistakeTracker = getMistakeTracker();
    exam.questions.forEach((q) => {
      if (q.type === 'multiple_choice' || q.type === 'multiple-choice') {
        const studentAns = answers[q.id];
        if (studentAns !== q.correctOptionId) {
          mistakeTracker.recordMistake(exam.id, exam.title, exam.subject, q);
        }
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [answers, exam]);

  // Calculate score
  const scoreResult = useMemo(() => {
    if (!isSubmitted) return { score: 0, correctCount: 0, wrongCount: 0 };
    let correct = 0;
    exam.questions.forEach((q) => {
      if (q.type === 'multiple_choice' || q.type === 'multiple-choice') {
        if (answers[q.id] === q.correctOptionId) {
          correct += 1;
        }
      }
    });
    // 10 questions -> each question is 1 point (out of 10)
    const score = Math.round((correct / totalQuestions) * 10);
    return {
      score,
      correctCount: correct,
      wrongCount: totalQuestions - correct,
    };
  }, [answers, exam.questions, isSubmitted, totalQuestions]);

  // Performance tier
  const performanceTier = useMemo(() => {
    const s = scoreResult.score;
    if (s >= 9) {
      return {
        badge: 'Xuất sắc! 🌟',
        message: 'Bé nắm kiến thức rất vững vàng và hoàn thành bài thi một cách tuyệt vời!',
        trophy: '🏆',
      };
    }
    if (s >= 7) {
      return {
        badge: 'Hoàn thành tốt! 👏',
        message: 'Cô khen bé làm bài tốt, chỉ cần chú ý thêm một vài chi tiết nhỏ thôi nhé!',
        trophy: '⭐',
      };
    }
    if (s >= 5) {
      return {
        badge: 'Hoàn thành! 📖',
        message: 'Bé đã vượt qua bài kiểm tra. Hãy xem lại các câu chưa đúng để nhớ lâu hơn nhé!',
        trophy: '🌱',
      };
    }
    return {
      badge: 'Cần cố gắng thêm! 💪',
      message: 'Đừng buồn nhé! Hãy xem lời giải chi tiết bên dưới và luyện tập lại cùng cô nhé!',
      trophy: '🎯',
    };
  }, [scoreResult.score]);

  // Reset exam
  const handleRestart = () => {
    setAnswers({});
    setTimeLeft(15 * 60);
    setElapsedSeconds(0);
    setIsSubmitted(false);
    setCurrentIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.pageWrapper}>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/')}
          >
            ← Về trang chủ
          </button>

          <div className={styles.titleArea}>
            <span className={styles.termBadge}>
              {exam.termLabel} · {exam.subject === 'math' ? 'Toán Lớp 1' : 'Tiếng Việt Lớp 1'}
            </span>
            <h1 className={styles.examTitle}>{exam.title}</h1>
          </div>

          <div className={timerClass}>
            <span>⏱️</span>
            <span>{isSubmitted ? '00:00' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className={styles.mainContainer}>
        {/* IF SUBMITTED: RESULT VIEW */}
        {isSubmitted ? (
          <>
            <div className={styles.resultHeader}>
              <div className={styles.resultTrophy}>{performanceTier.trophy}</div>
              <div className={styles.resultScore}>
                {scoreResult.score} / 10 Điểm
              </div>
              <div className={styles.resultTier}>{performanceTier.badge}</div>
              <p className={styles.resultSub}>{performanceTier.message}</p>

              <div style={{ marginTop: '8px', fontSize: '14px', opacity: 0.9 }}>
                Đúng: {scoreResult.correctCount}/10 câu · Thời gian làm bài: {formatTime(elapsedSeconds)}
              </div>

              <div className={styles.resultActions}>
                <button
                  type="button"
                  className={styles.resultActionBtn}
                  style={{ background: '#ffffff', color: '#4f46e5' }}
                  onClick={() => navigate(`/print-worksheet?source=${exam.id}`)}
                >
                  🖨️ In bài thi này (A4)
                </button>
                {scoreResult.wrongCount > 0 && (
                  <button
                    type="button"
                    className={styles.resultActionBtn}
                    style={{ background: '#fef08a', color: '#854d0e' }}
                    onClick={() => navigate('/print-worksheet?source=mistakes')}
                  >
                    📝 In phiếu ôn câu sai ({scoreResult.wrongCount})
                  </button>
                )}
                <button
                  type="button"
                  className={styles.resultActionBtn}
                  style={{ background: '#10b981', color: '#ffffff' }}
                  onClick={handleRestart}
                >
                  🔄 Làm lại đề thi
                </button>
                <button
                  type="button"
                  className={styles.resultActionBtn}
                  style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
                  onClick={() => navigate('/')}
                >
                  🏠 Về trang chủ
                </button>
              </div>
            </div>

            {/* REVIEW SECTION */}
            <div className={styles.reviewSection}>
              <h2 className={styles.reviewTitle}>
                📋 Xem lại lời giải chi tiết 10 câu hỏi
              </h2>

              {exam.questions.map((q, idx) => {
                if (q.type !== 'multiple_choice' && q.type !== 'multiple-choice') return null;
                const studentAnsId = answers[q.id];
                const isCorrect = studentAnsId === q.correctOptionId;
                const studentOpt = q.options.find((o) => o.id === studentAnsId);
                const correctOpt = q.options.find((o) => o.id === q.correctOptionId);

                return (
                  <div
                    key={q.id}
                    className={`${styles.reviewCard} ${
                      isCorrect ? styles.reviewCardCorrect : styles.reviewCardWrong
                    }`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, color: '#64748b', fontSize: '14px' }}>
                        Câu {idx + 1}
                      </span>
                      <span
                        className={`${styles.reviewStatusBadge} ${
                          isCorrect ? styles.badgeCorrect : styles.badgeWrong
                        }`}
                      >
                        {isCorrect ? '✅ Trả lời đúng (+1 điểm)' : '❌ Chưa chính xác (0 điểm)'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <button
                        type="button"
                        className={styles.speakerBtn}
                        style={{ width: '36px', height: '36px', fontSize: '16px' }}
                        onClick={() => playAudio(q.promptAudio)}
                        title="Nghe câu hỏi"
                      >
                        🔊
                      </button>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: '16px', color: '#0f172a' }}>
                        {q.prompt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '48px' }}>
                      <div>
                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                          Đáp án của bé:{' '}
                        </span>
                        <strong style={{ color: isCorrect ? '#059669' : '#dc2626' }}>
                          {studentOpt ? studentOpt.label : 'Chưa chọn'}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                            Đáp án đúng:{' '}
                          </span>
                          <strong style={{ color: '#059669' }}>
                            {correctOpt?.label}
                          </strong>
                        </div>
                      )}
                    </div>

                    {q.explanation && (
                      <div className={styles.explanationBox} style={{ marginLeft: '48px' }}>
                        <button
                          type="button"
                          className={styles.speakerBtn}
                          style={{ width: '32px', height: '32px', fontSize: '14px', background: '#059669' }}
                          onClick={() => playAudio(q.explanationAudio)}
                          title="Nghe cô giải thích"
                        >
                          📢
                        </button>
                        <p className={styles.explanationText}>
                          <strong>Lời giải của cô:</strong> {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* ACTIVE EXAM TAKING VIEW */
          <>
            {/* NAVIGATION PILLS 1 - 10 */}
            <div className={styles.navBar}>
              <div className={styles.navBarHeader}>
                <span>Bảng câu hỏi ({answeredCount}/{totalQuestions} câu đã làm)</span>
                <span>Thời gian: 15 phút</span>
              </div>

              <div className={styles.navButtonsGrid}>
                {exam.questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isActive = idx === currentIndex;
                  let cls = styles.navBtn;
                  if (isAnswered) cls += ` ${styles.navBtnAnswered}`;
                  if (isActive) cls += ` ${styles.navBtnActive}`;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={cls}
                      onClick={() => setCurrentIndex(idx)}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUESTION CARD */}
            {currentQ && (currentQ.type === 'multiple_choice' || currentQ.type === 'multiple-choice') && (
              <div className={styles.questionCard}>
                <div className={styles.questionMeta}>
                  <span className={styles.questionBadge}>
                    Câu hỏi {currentIndex + 1} / {totalQuestions}
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                    {answers[currentQ.id] ? '✅ Đã chọn đáp án' : '⭕ Chưa trả lời'}
                  </span>
                </div>

                <div className={styles.promptRow}>
                  <button
                    type="button"
                    className={styles.speakerBtn}
                    onClick={() => playAudio(currentQ.promptAudio)}
                    title="Nghe câu hỏi"
                  >
                    🔊
                  </button>
                  <p className={styles.promptText}>{currentQ.prompt}</p>
                </div>

                {currentQ.illustration && (
                  <div className={styles.illustrationBox}>
                    <img
                      src={currentQ.illustration}
                      alt="Minh họa"
                      className={styles.illustrationImg}
                    />
                  </div>
                )}

                {/* OPTIONS */}
                <div
                  className={`${styles.optionsGrid} ${
                    currentQ.options.length <= 4 ? styles.optionsGridCols2 : ''
                  }`}
                >
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = answers[currentQ.id] === opt.id;
                    const letter = String.fromCharCode(65 + oIdx); // A, B, C, D

                    return (
                      <div
                        key={opt.id}
                        className={`${styles.optionCard} ${
                          isSelected ? styles.optionSelected : ''
                        }`}
                        onClick={() => {
                          handleSelectOption(opt.id);
                          playAudio(opt.audio);
                        }}
                      >
                        <div className={styles.optionIndex}>{letter}</div>
                        <span className={styles.optionLabel}>{opt.label}</span>
                        {opt.audio && (
                          <button
                            type="button"
                            style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '18px',
                              cursor: 'pointer',
                              opacity: 0.7,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(opt.audio);
                            }}
                            title="Nghe lựa chọn"
                          >
                            🔈
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ACTIONS */}
                <div className={styles.actionBar}>
                  <button
                    type="button"
                    className={styles.prevBtn}
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  >
                    ← Câu trước
                  </button>

                  <button
                    type="button"
                    className={styles.submitBtn}
                    onClick={() => {
                      if (unansweredCount > 0) {
                        setShowConfirmModal(true);
                      } else {
                        handleSubmitExam();
                      }
                    }}
                  >
                    📝 Nộp bài thi
                  </button>

                  <button
                    type="button"
                    className={styles.nextBtn}
                    onClick={() => {
                      if (currentIndex < totalQuestions - 1) {
                        setCurrentIndex((prev) => prev + 1);
                      } else {
                        if (unansweredCount > 0) {
                          setShowConfirmModal(true);
                        } else {
                          handleSubmitExam();
                        }
                      }
                    }}
                  >
                    {currentIndex < totalQuestions - 1 ? 'Câu tiếp theo →' : 'Nộp bài 🏁'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* CONFIRMATION MODAL IF UNANSWERED QUESTIONS */}
      {showConfirmModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <div style={{ fontSize: '48px' }}>⚠️</div>
            <h3 className={styles.modalTitle}>Bé có muốn nộp bài ngay không?</h3>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
              Bé còn <strong>{unansweredCount} câu hỏi</strong> chưa chọn đáp án. Các câu chưa làm sẽ không được tính điểm.
            </p>
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.prevBtn}
                onClick={() => setShowConfirmModal(false)}
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleSubmitExam}
              >
                Vẫn nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
