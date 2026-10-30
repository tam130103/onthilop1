import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  LessonSchema,
  type Lesson,
  type Slide,
} from '@/schemas/content.schema';
import {
  saveCustomLesson,
  getLessonById,
  exportLessonAsJson,
  importLessonFromJson,
} from '@/core/lesson-storage';
import styles from './LessonEditorPage.module.css';

const DEFAULT_NEW_LESSON: Lesson = {
  status: 'draft',
  mode: 'draft',
  id: `custom-lesson-${Date.now()}`,
  title: 'Bài học mới Lớp 1',
  subject: 'math',
  grade: 1,
  description: 'Mô tả bài học do giáo viên tự soạn.',
  totalDurationMinutes: 20,
  slides: [
    {
      type: 'title-slide',
      id: 'slide-title',
      title: 'Bé vui học Toán',
      subtitle: 'Toán Lớp 1 — Bài học khởi động',
      teacherNote: 'Giới thiệu mục tiêu bài học.',
    },
    {
      type: 'content-slide',
      id: 'slide-intro',
      title: 'Khởi động',
      body: 'Các con cùng quan sát và lắng nghe cô giáo nhé!',
      bullets: ['Lắng nghe câu hỏi', 'Tập trung quan sát', 'Xung phong trả lời'],
    },
    {
      type: 'question-slide',
      id: 'slide-q1',
      timeLimitSeconds: 30,
      showRetryOnWrong: true,
      question: {
        type: 'multiple_choice',
        id: 'q-mc-1',
        prompt: '1 cộng 1 bằng mấy?',
        promptAudio: '',
        illustration: '',
        options: [
          { id: 'opt-1', label: 'Số 1' },
          { id: 'opt-2', label: 'Số 2' },
          { id: 'opt-3', label: 'Số 3' },
        ],
        correctOptionId: 'opt-2',
        explanation: '1 + 1 = 2.',
      },
    },
  ],
};

export function LessonEditorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editLessonId = searchParams.get('lesson');

  const [lesson, setLesson] = useState<Lesson>(DEFAULT_NEW_LESSON);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  // Load existing lesson if editLessonId provided
  useEffect(() => {
    if (!editLessonId) return;
    async function fetchLesson() {
      if (!editLessonId) return;
      const found = await getLessonById(editLessonId);
      if (found) {
        setLesson(found);
      }
    }
    fetchLesson();
  }, [editLessonId]);

  const currentSlide = lesson.slides[selectedSlideIndex];

  // Validation report
  const validationResult = useMemo(() => {
    return LessonSchema.safeParse(lesson);
  }, [lesson]);

  const handleSave = useCallback(() => {
    const result = saveCustomLesson(lesson);
    if (result.success) {
      setSaveMessage('✅ Đã lưu bài dạy thành công vào bộ nhớ máy!');
      setTimeout(() => setSaveMessage(null), 3500);
    } else {
      setSaveMessage(`⚠️ Lỗi khi lưu: ${result.error}`);
    }
  }, [lesson]);

  const handleExport = useCallback(() => {
    exportLessonAsJson(lesson);
  }, [lesson]);

  const handleImportJsonFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importLessonFromJson(content);
        if (res.success && res.lesson) {
          setLesson(res.lesson);
          setSelectedSlideIndex(0);
          setImportError(null);
          setSaveMessage('✅ Đã nạp thành công bài dạy từ file JSON!');
          setTimeout(() => setSaveMessage(null), 3500);
        } else {
          setImportError(res.error || 'File không hợp lệ');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handlePlayLesson = useCallback(() => {
    // Save first then launch
    saveCustomLesson(lesson);
    window.open(
      `/present?lesson=${lesson.id}`,
      'tv_presentation_screen',
      'width=1280,height=720,menubar=no,toolbar=no,location=no'
    );
    navigate(`/presenter?lesson=${lesson.id}`);
  }, [lesson, navigate]);

  // Slide mutators
  const updateCurrentSlide = useCallback((updated: Slide) => {
    setLesson((prev) => ({
      ...prev,
      slides: prev.slides.map((s, idx) => (idx === selectedSlideIndex ? updated : s)),
    }));
  }, [selectedSlideIndex]);

  const handleDeleteSlide = useCallback((index: number) => {
    if (lesson.slides.length <= 1) {
      alert('Bài học phải có ít nhất 1 slide!');
      return;
    }
    setLesson((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, idx) => idx !== index),
    }));
    setSelectedSlideIndex((prev) => Math.max(0, prev - 1));
  }, [lesson.slides.length]);

  const handleAddSlide = useCallback((type: 'title-slide' | 'content-slide' | 'mc' | 'counting' | 'ns') => {
    const newId = `slide-${Date.now()}`;
    let newSlide: Slide;

    switch (type) {
      case 'title-slide':
        newSlide = {
          type: 'title-slide',
          id: newId,
          title: 'Tiêu đề slide mới',
          subtitle: 'Phụ đề bài học',
        };
        break;
      case 'content-slide':
        newSlide = {
          type: 'content-slide',
          id: newId,
          title: 'Nội dung kiến thức',
          body: 'Các con chú ý quan sát nhé!',
          bullets: ['Ý 1', 'Ý 2'],
        };
        break;
      case 'mc':
        newSlide = {
          type: 'question-slide',
          id: newId,
          timeLimitSeconds: 30,
          showRetryOnWrong: true,
          question: {
            type: 'multiple_choice',
            id: `q-mc-${Date.now()}`,
            prompt: 'Câu hỏi trắc nghiệm mới?',
            promptAudio: '',
            illustration: '',
            options: [
              { id: 'opt-a', label: 'Đáp án A' },
              { id: 'opt-b', label: 'Đáp án B' },
            ],
            correctOptionId: 'opt-a',
          },
        };
        break;
      case 'counting':
        newSlide = {
          type: 'question-slide',
          id: newId,
          timeLimitSeconds: 30,
          showRetryOnWrong: true,
          question: {
            type: 'counting',
            id: `q-count-${Date.now()}`,
            prompt: 'Đếm xem có bao nhiêu hình?',
            promptAudio: '',
            illustration: '/media/images/apple.svg',
            items: [
              { image: '/media/images/apple.svg', alt: 'Hình 1' },
              { image: '/media/images/apple.svg', alt: 'Hình 2' },
              { image: '/media/images/apple.svg', alt: 'Hình 3' },
            ],
            correctCount: 3,
            numberRange: { min: 1, max: 5 },
          },
        };
        break;
      case 'ns':
        newSlide = {
          type: 'question-slide',
          id: newId,
          timeLimitSeconds: 30,
          showRetryOnWrong: true,
          question: {
            type: 'number_select',
            id: `q-ns-${Date.now()}`,
            prompt: 'Bé hãy tính phép tính:',
            promptAudio: '',
            illustration: '',
            expression: '2 + 2 = ?',
            choices: [2, 3, 4, 5],
            correctAnswer: 4,
          },
        };
        break;
    }

    setLesson((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    setSelectedSlideIndex(lesson.slides.length);
  }, [lesson.slides.length]);

  return (
    <div className={styles.container}>
      {/* Top Navigation Bar */}
      <div className={styles.topBar}>
        <div className={styles.pageTitle}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => navigate('/')}
            title="Quay lại danh sách bài học"
          >
            ◀ Trang Chủ
          </button>
          <span>✏️ Soạn Bài Dạy Lớp 1</span>
        </div>

        <div className={styles.actions}>
          <label className={`${styles.btn} ${styles.btnSecondary}`} style={{ cursor: 'pointer' }}>
            📥 Nhập JSON
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportJsonFile}
            />
          </label>
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleExport}>
            📤 Xuất file JSON
          </button>
          <button className={`${styles.btn} ${styles.btnSuccess}`} onClick={handleSave}>
            💾 Lưu bài dạy
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handlePlayLesson}>
            🚀 Chiếu thử (Mở TV)
          </button>
        </div>
      </div>

      {saveMessage && (
        <div style={{ background: '#064e3b', color: '#86efac', padding: '10px 24px', fontSize: '14px', fontWeight: 600 }}>
          {saveMessage}
        </div>
      )}

      {importError && (
        <div style={{ background: '#450a0a', color: '#fca5a5', padding: '10px 24px', fontSize: '14px', fontWeight: 600 }}>
          ⚠️ Lỗi nhập file: {importError}
        </div>
      )}

      {/* Main Layout Grid */}
      <div className={styles.mainGrid}>
        {/* Left Sidebar: Slide Navigator */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span>DANH SÁCH SLIDE ({lesson.slides.length})</span>
          </div>

          <div className={styles.slideList}>
            {lesson.slides.map((s, idx) => {
              const isActive = idx === selectedSlideIndex;
              let label = '';
              let badge = '';

              switch (s.type) {
                case 'title-slide':
                  label = s.title;
                  badge = 'Tiêu đề';
                  break;
                case 'content-slide':
                  label = s.title;
                  badge = 'Kiến thức';
                  break;
                case 'question-slide':
                  label = s.question.prompt;
                  badge = s.question.type;
                  break;
                case 'phonics-slide':
                  label = s.title;
                  badge = 'Ghép vần';
                  break;
                case 'flashcard-slide':
                  label = s.title;
                  badge = 'Flashcard';
                  break;
              }

              return (
                <div
                  key={s.id}
                  className={`${styles.slideItem} ${isActive ? styles.slideItemActive : ''}`}
                  onClick={() => setSelectedSlideIndex(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>
                      {idx + 1}.
                    </span>
                    <span className={styles.slideItemTitle}>{label || '(Chưa có tiêu đề)'}</span>
                  </div>
                  <span className={styles.slideItemBadge}>{badge}</span>
                </div>
              );
            })}
          </div>

          {/* Add Slide Quick Menu */}
          <div className={styles.addSlideSection}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>➕ THÊM SLIDE MỚI:</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ fontSize: '12px', padding: '6px' }}
                onClick={() => handleAddSlide('title-slide')}
              >
                + Tiêu đề
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ fontSize: '12px', padding: '6px' }}
                onClick={() => handleAddSlide('content-slide')}
              >
                + Kiến thức
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ fontSize: '12px', padding: '6px' }}
                onClick={() => handleAddSlide('mc')}
              >
                + Trắc nghiệm
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ fontSize: '12px', padding: '6px' }}
                onClick={() => handleAddSlide('counting')}
              >
                + Tập đếm
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ fontSize: '12px', padding: '6px', gridColumn: 'span 2' }}
                onClick={() => handleAddSlide('ns')}
              >
                + Phép tính (Number Select)
              </button>
            </div>
          </div>
        </div>

        {/* Center Content: Slide Editor */}
        <div className={styles.contentArea}>
          {/* Lesson Meta Card */}
          <div className={styles.sectionCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className={styles.sectionTitle}>📚 Thông Tin Bài Học</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Trạng thái:</span>
                <select
                  className={styles.select}
                  value={lesson.status}
                  onChange={(e) =>
                    setLesson((prev) => ({
                      ...prev,
                      status: e.target.value as 'draft' | 'publish',
                      mode: e.target.value as 'draft' | 'publish',
                    }))
                  }
                >
                  <option value="draft">Bản nháp (Draft)</option>
                  <option value="publish">Xuất bản (Publish)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tên bài học:</label>
                <input
                  type="text"
                  className={styles.input}
                  value={lesson.title}
                  onChange={(e) => setLesson((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Môn học:</label>
                <select
                  className={styles.select}
                  value={lesson.subject}
                  onChange={(e) =>
                    setLesson((prev) => ({
                      ...prev,
                      subject: e.target.value as 'math' | 'vietnamese',
                    }))
                  }
                >
                  <option value="math">🧮 Toán Lớp 1</option>
                  <option value="vietnamese">📖 Tiếng Việt Lớp 1</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Thời lượng (phút):</label>
                <input
                  type="number"
                  className={styles.input}
                  value={lesson.totalDurationMinutes}
                  onChange={(e) =>
                    setLesson((prev) => ({
                      ...prev,
                      totalDurationMinutes: parseInt(e.target.value, 10) || 20,
                    }))
                  }
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Mô tả bài học:</label>
              <textarea
                className={styles.textarea}
                value={lesson.description || ''}
                onChange={(e) => setLesson((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Nhập ghi chú hoặc mô tả bài dạy..."
              />
            </div>
          </div>

          {/* Current Slide Editor Card */}
          {currentSlide && (
            <div className={styles.sectionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={styles.sectionTitle}>
                  🖼️ Chỉnh Sửa Slide {selectedSlideIndex + 1} ({currentSlide.type})
                </h3>
                <button
                  className={`${styles.btn}`}
                  style={{ background: '#ef4444', color: '#fff', fontSize: '12px' }}
                  onClick={() => handleDeleteSlide(selectedSlideIndex)}
                >
                  🗑️ Xóa Slide này
                </button>
              </div>

              {/* Title Slide Editor */}
              {currentSlide.type === 'title-slide' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tiêu đề lớn:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentSlide.title}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, title: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phụ đề:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentSlide.subtitle || ''}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, subtitle: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ghi chú cho giáo viên:</label>
                    <textarea
                      className={styles.textarea}
                      value={currentSlide.teacherNote || ''}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, teacherNote: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Content Slide Editor */}
              {currentSlide.type === 'content-slide' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tiêu đề phần kiến thức:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentSlide.title}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, title: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Lời dẫn / Nội dung:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentSlide.body}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, body: e.target.value })
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Các ý chính (mỗi dòng một ý):</label>
                    <textarea
                      className={styles.textarea}
                      value={currentSlide.bullets?.join('\n') || ''}
                      onChange={(e) =>
                        updateCurrentSlide({
                          ...currentSlide,
                          bullets: e.target.value.split('\n').filter((l) => l.trim()),
                        })
                      }
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ghi chú cho giáo viên:</label>
                    <textarea
                      className={styles.textarea}
                      value={currentSlide.teacherNote || ''}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, teacherNote: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Question Slide Editor */}
              {currentSlide.type === 'question-slide' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Đề bài / Câu hỏi:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentSlide.question.prompt}
                      onChange={(e) => {
                        const q = { ...currentSlide.question, prompt: e.target.value };
                        updateCurrentSlide({ ...currentSlide, question: q });
                      }}
                    />
                  </div>

                  {/* Multiple Choice specific */}
                  {(currentSlide.question.type === 'multiple_choice' ||
                    currentSlide.question.type === 'multiple-choice') && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className={styles.formLabel}>Các phương án lựa chọn (Chọn đáp án đúng):</label>
                      {currentSlide.question.options.map((opt, optIdx) => (
                        <div key={opt.id} className={styles.optionItemRow}>
                          <input
                            type="radio"
                            name="correctOpt"
                            checked={
                              (currentSlide.question as { correctOptionId: string })
                                .correctOptionId === opt.id
                            }
                            onChange={() => {
                              if (currentSlide.type === 'question-slide' && (currentSlide.question.type === 'multiple_choice' || currentSlide.question.type === 'multiple-choice')) {
                                updateCurrentSlide({
                                  ...currentSlide,
                                  question: {
                                    ...currentSlide.question,
                                    correctOptionId: opt.id,
                                  },
                                });
                              }
                            }}
                            title="Đánh dấu đây là đáp án Đúng"
                          />
                          <input
                            type="text"
                            className={styles.input}
                            style={{ flex: 1 }}
                            value={opt.label}
                            onChange={(e) => {
                              if (currentSlide.type === 'question-slide' && (currentSlide.question.type === 'multiple_choice' || currentSlide.question.type === 'multiple-choice')) {
                                const newOpts = currentSlide.question.options.map((o, i) =>
                                  i === optIdx ? { ...o, label: e.target.value } : o
                                );
                                updateCurrentSlide({
                                  ...currentSlide,
                                  question: {
                                    ...currentSlide.question,
                                    options: newOpts,
                                  },
                                });
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Number Select specific */}
                  {(currentSlide.question.type === 'number_select' ||
                    currentSlide.question.type === 'number-select') && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phép tính hiển thị:</label>
                        <input
                          type="text"
                          className={styles.input}
                          value={currentSlide.question.expression}
                          onChange={(e) => {
                            if (currentSlide.type === 'question-slide' && (currentSlide.question.type === 'number_select' || currentSlide.question.type === 'number-select')) {
                              updateCurrentSlide({
                                ...currentSlide,
                                question: { ...currentSlide.question, expression: e.target.value },
                              });
                            }
                          }}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Kết quả đúng:</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={currentSlide.question.correctAnswer}
                          onChange={(e) => {
                            if (currentSlide.type === 'question-slide' && (currentSlide.question.type === 'number_select' || currentSlide.question.type === 'number-select')) {
                              updateCurrentSlide({
                                ...currentSlide,
                                question: {
                                  ...currentSlide.question,
                                  correctAnswer: parseInt(e.target.value, 10) || 0,
                                },
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Counting specific */}
                  {currentSlide.question.type === 'counting' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Số lượng đúng:</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={currentSlide.question.correctCount}
                          onChange={(e) => {
                            if (currentSlide.type === 'question-slide' && currentSlide.question.type === 'counting') {
                              updateCurrentSlide({
                                ...currentSlide,
                                question: {
                                  ...currentSlide.question,
                                  correctCount: parseInt(e.target.value, 10) || 1,
                                },
                              });
                            }
                          }}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phạm vi đếm tối đa:</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={currentSlide.question.numberRange.max}
                          onChange={(e) => {
                            if (currentSlide.type === 'question-slide' && currentSlide.question.type === 'counting') {
                              updateCurrentSlide({
                                ...currentSlide,
                                question: {
                                  ...currentSlide.question,
                                  numberRange: {
                                    ...currentSlide.question.numberRange,
                                    max: parseInt(e.target.value, 10) || 5,
                                  },
                                },
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Lời giải thích khi hiện đáp án:</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentSlide.question.explanation || ''}
                      onChange={(e) => {
                        const q = { ...currentSlide.question, explanation: e.target.value };
                        updateCurrentSlide({ ...currentSlide, question: q });
                      }}
                      placeholder="Nhập lời khen hoặc giải thích ngắn gọn..."
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Ghi chú cho giáo viên:</label>
                    <textarea
                      className={styles.textarea}
                      value={currentSlide.teacherNote || ''}
                      onChange={(e) =>
                        updateCurrentSlide({ ...currentSlide, teacherNote: e.target.value })
                      }
                      placeholder="Lời nhắc giảng dạy (chỉ hiện trên laptop của cô)..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Validation Feedback Status */}
          <div
            className={`${styles.statusNotice} ${
              validationResult.success ? styles.statusSuccess : styles.statusError
            }`}
          >
            {validationResult.success ? (
              <span>✅ Bài học hoàn toàn hợp lệ! Sẵn sàng trình chiếu trên lớp.</span>
            ) : (
              <div>
                <span>⚠️ Một số nội dung cần hoàn thiện trước khi xuất bản:</span>
                <ul style={{ margin: '6px 0 0 16px', fontSize: '13px' }}>
                  {validationResult.error.issues.map((iss, i) => (
                    <li key={i}>{iss.message} ({iss.path.join('.')})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
