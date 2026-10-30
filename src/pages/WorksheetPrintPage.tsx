import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllLessons, getLessonById } from '@/core/lesson-storage';
import { getMistakeTracker, type MistakeEntry } from '@/core/mistake-tracker';
import type { Lesson, Question } from '@/schemas/content.schema';
import styles from './WorksheetPrintPage.module.css';

export function WorksheetPrintPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sourceParam = searchParams.get('source') || 'math-01-counting';

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [customTitle, setCustomTitle] = useState('');

  // Load available lessons and mistakes
  useEffect(() => {
    async function loadData() {
      const all = await getAllLessons();
      setLessons(all);
      const mList = getMistakeTracker().getMistakes();
      setMistakes(mList);

      if (sourceParam === 'mistakes') {
        const review = getMistakeTracker().buildReviewLesson(10);
        setCurrentLesson(review);
        setCustomTitle('PHIẾU ÔN TẬP CỦNG CỐ KIẾN THỨC CUỐI TUẦN');
      } else {
        const found = await getLessonById(sourceParam);
        setCurrentLesson(found || all[0] || null);
        if (found) {
          setCustomTitle(`PHIẾU BÀI TẬP: ${found.title.toUpperCase()}`);
        }
      }
    }
    loadData();
  }, [sourceParam]);

  // Extract questions from current lesson
  const questions: Question[] = useMemo(() => {
    if (!currentLesson) return [];
    const list: Question[] = [];
    for (const slide of currentLesson.slides) {
      if (slide.type === 'question-slide') {
        list.push(slide.question);
      }
    }
    return list;
  }, [currentLesson]);

  const handleSourceChange = useCallback(
    async (newSource: string) => {
      setSearchParams({ source: newSource });
    },
    [setSearchParams]
  );

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className={styles.container}>
      {/* Control Toolbar (Only visible on screen) */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => navigate('/')}
          >
            ← Trang chủ
          </button>

          <label style={{ fontSize: '14px', fontWeight: 600 }}>Nguồn bài tập:</label>
          <select
            className={styles.select}
            value={sourceParam}
            onChange={(e) => handleSourceChange(e.target.value)}
          >
            <optgroup label="Ôn tập chuyên đề">
              <option value="mistakes">
                🔥 Danh sách câu cả lớp hay sai ({mistakes.length} câu)
              </option>
            </optgroup>
            <optgroup label="Bài giảng Lớp 1">
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.subject === 'math' ? '🧮 [Toán]' : '📖 [Tiếng Việt]'} {l.title}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className={styles.toolbarRight}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Tổng số: <strong>{questions.length} câu hỏi</strong>
          </span>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handlePrint}
            data-testid="print-btn"
          >
            🖨️ In Phiếu A4 (Ctrl + P)
          </button>
        </div>
      </div>

      {/* Printable Pages */}
      <div className={styles.pageWrapper}>
        {/* Page 1: Student Worksheet */}
        <div className={styles.sheet}>
          <div className={styles.sheetHeader}>
            <div className={styles.headerInfo}>
              <div>Trường Tiểu học: <span className={styles.dottedLine} style={{ minWidth: '150px' }}></span></div>
              <div>Lớp: 1...... &nbsp;&nbsp;&nbsp;&nbsp; Ngày: ...... / ...... / 202...</div>
              <div>Họ và tên học sinh: <span className={styles.dottedLine} style={{ minWidth: '180px' }}></span></div>
            </div>

            <div className={styles.sheetTitleSection}>
              <h1 className={styles.sheetMainTitle}>{customTitle || 'PHIẾU BÀI TẬP LỚP 1'}</h1>
              <p className={styles.sheetSubtitle}>
                Môn: {currentLesson?.subject === 'math' ? 'TOÁN LỚP 1' : 'TIẾNG VIỆT LỚP 1'} — Thời gian: 25 phút
              </p>
            </div>

            <div className={styles.scoreBox}>
              <div className={styles.scoreHeader}>ĐIỂM SỐ</div>
              <div className={styles.scoreBody}></div>
            </div>
          </div>

          {/* Questions Container */}
          <div className={styles.questionsList}>
            {questions.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px 0' }}>
                Chưa có câu hỏi nào trong mục này. Vui lòng chọn bài học khác.
              </p>
            ) : (
              questions.map((q, idx) => (
                <div key={q.id} className={styles.questionItem} data-testid={`worksheet-question-${idx + 1}`}>
                  <div className={styles.questionTitle}>
                    <span>Câu {idx + 1}:</span> {q.prompt}
                  </div>

                  {/* 1. Multiple Choice */}
                  {(q.type === 'multiple_choice' || q.type === 'multiple-choice') && (
                    <div className={styles.mcGrid}>
                      {q.options.map((opt, optIndex) => {
                        const optLetter = String.fromCharCode(65 + optIndex);
                        return (
                          <div key={opt.id} className={styles.mcOption}>
                            <span className={styles.bubble}></span>
                            <strong>{optLetter}.</strong>
                            <span>{opt.label}</span>
                            {opt.image && (
                              <img
                                src={opt.image}
                                alt={opt.label}
                                style={{ width: '24px', height: '24px', filter: 'grayscale(100%)' }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 2. Counting */}
                  {q.type === 'counting' && (
                    <div>
                      <div className={styles.countingRow}>
                        {q.items.map((it, itemIdx) => (
                          <img
                            key={itemIdx}
                            src={it.image}
                            alt={it.alt}
                            className={styles.countingImg}
                          />
                        ))}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600 }}>
                        Em đếm được tất cả: <span className={styles.answerBlankBox}></span> {q.items[0]?.alt || 'vật'}.
                      </div>
                    </div>
                  )}

                  {/* 3. Number Select / Phép tính */}
                  {(q.type === 'number_select' || q.type === 'number-select') && (
                    <div className={styles.expressionBox}>
                      <span>{q.expression.replace('?', '')}</span>
                      <span className={styles.mathFillBox}></span>
                    </div>
                  )}

                  {/* 4. Tap Place / Ghép từ */}
                  {q.type === 'tap_place' && (
                    <div>
                      <div className={styles.wordBank}>
                        <span style={{ fontSize: '13px', color: '#475569' }}>Các âm cần điền:</span>
                        {q.items.map((item) => (
                          <span key={item.id} className={styles.wordCard}>
                            {item.label}
                          </span>
                        ))}
                      </div>
                      <div className={styles.fillWordArea}>
                        {q.targets.map((tgt) => (
                          <div key={tgt.id}>
                            {tgt.prefixText && <span>{tgt.prefixText} </span>}
                            <span className={styles.answerBlankBox} style={{ width: '48px' }}></span>
                            {tgt.suffixText && <span> {tgt.suffixText}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Matching */}
                  {q.type === 'matching' && (
                    <div className={styles.matchingColumns}>
                      <div>
                        {q.leftColumn.map((col) => (
                          <div key={col.id} className={styles.matchingColItem}>
                            <span>{col.label}</span>
                            <span className={styles.dot}></span>
                          </div>
                        ))}
                      </div>
                      <div>
                        {q.rightColumn.map((col) => (
                          <div key={col.id} className={styles.matchingColItem}>
                            <span className={styles.dot}></span>
                            <span>{col.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Page 2 (Break before page): Teacher Answer Key */}
        <div className={`${styles.sheet} ${styles.teacherPage}`}>
          <div className={styles.answerKeyHeader}>
            <h2 className={styles.answerKeyTitle}>
              PHIẾU ĐÁP ÁN & HƯỚNG DẪN CHẤM (DÀNH CHO GIÁO VIÊN)
            </h2>
            <p style={{ fontSize: '13px', margin: '4px 0 0 0', color: '#475569' }}>
              Bài học: {currentLesson?.title} — Thang điểm chuẩn: 10 điểm
            </p>
          </div>

          <table className={styles.answerTable}>
            <thead>
              <tr>
                <th style={{ width: '55px' }}>Câu</th>
                <th style={{ width: '130px' }}>Kiểu câu hỏi</th>
                <th style={{ width: '170px' }}>Đáp án đúng</th>
                <th>Lời giải thích & Hướng dẫn chấm</th>
                <th style={{ width: '65px' }}>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, idx) => {
                let correctAnswerDisplay = '';

                if (q.type === 'multiple_choice' || q.type === 'multiple-choice') {
                  const correctOpt = q.options.find((o) => o.id === q.correctOptionId);
                  correctAnswerDisplay = correctOpt ? correctOpt.label : q.correctOptionId;
                } else if (q.type === 'counting') {
                  correctAnswerDisplay = `${q.correctCount} (quả / vật)`;
                } else if (q.type === 'number_select' || q.type === 'number-select') {
                  correctAnswerDisplay = `Kết quả = ${q.correctAnswer}`;
                } else if (q.type === 'tap_place') {
                  correctAnswerDisplay = Object.entries(q.correctMapping)
                    .map(([iId, tId]) => {
                      const item = q.items.find((i) => i.id === iId);
                      const target = q.targets.find((t) => t.id === tId);
                      return `${item?.label || iId} ➔ ${target?.prefixText || ''}...${target?.suffixText || ''}`;
                    })
                    .join('; ');
                } else if (q.type === 'matching') {
                  correctAnswerDisplay = q.correctPairs
                    .map((pair) => {
                      const left = q.leftColumn.find((l) => l.id === pair.leftId);
                      const right = q.rightColumn.find((r) => r.id === pair.rightId);
                      return `${left?.label || pair.leftId} ➔ ${right?.label || pair.rightId}`;
                    })
                    .join('; ');
                }

                const points = questions.length > 0 ? (10 / questions.length).toFixed(1) : '1.0';

                return (
                  <tr key={q.id}>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{idx + 1}</td>
                    <td>{q.type}</td>
                    <td style={{ fontWeight: 700 }}>{correctAnswerDisplay}</td>
                    <td>{q.explanation || 'Đọc to kết quả chính xác cho học sinh đối chiếu.'}</td>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{points} đ</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: '24px', fontSize: '13px', lineHeight: 1.6, color: '#334155' }}>
            <strong>📌 Ghi chú sư phạm dành cho cô giáo:</strong>
            <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
              <li>Với học sinh Lớp 1 chưa thạo dùng thước kẻ ở bài nối, cô có thể hướng dẫn vẽ đường thẳng nối giữa 2 chấm tròn.</li>
              <li>Các bài tập đếm đồ vật khuyến khích học sinh dùng bút gạch nhẹ từng hình để tránh đếm trùng lặp hoặc bỏ sót.</li>
              <li>Học sinh làm sai từ 2 câu trở lên nên được đưa vào danh sách ôn tập đầu giờ của tiết học tiếp theo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
