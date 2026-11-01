import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllLessons, getLessonById } from '@/core/lesson-storage';
import { getMistakeTracker, type MistakeEntry } from '@/core/mistake-tracker';
import type { Lesson, Question } from '@/schemas/content.schema';
import styles from './WorksheetPrintPage.module.css';

// Pre-defined writing templates for Vietnamese Primary School Grade 1
const HANDWRITING_PRESETS = [
  {
    id: 'letters-lower',
    title: 'Bảng chữ cái thường (a, b, c, d, đ, e, ê...)',
    items: ['a', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y'],
  },
  {
    id: 'numbers',
    title: 'Chữ số từ 0 đến 9 (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)',
    items: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  },
  {
    id: 'digraphs',
    title: 'Phụ âm ghép (ch, gh, kh, ng, ngh, nh, ph, qu, th, tr)',
    items: ['ch', 'gh', 'kh', 'ng', 'ngh', 'nh', 'ph', 'qu', 'th', 'tr'],
  },
  {
    id: 'rhymes',
    title: 'Các vần thông dụng (an, am, ac, at, ai, ao, au, en, in, on, un)',
    items: ['an', 'am', 'ac', 'at', 'ai', 'ao', 'au', 'en', 'in', 'on', 'un'],
  },
  {
    id: 'words',
    title: 'Từ ngữ ứng dụng (ba ba, cá cờ, bé ngoan, đi học, bông hoa)',
    items: ['ba ba', 'cá cờ', 'bé ngoan', 'đi học', 'bông hoa', 'chăm chỉ', 'mẹ yêu', 'bút chì'],
  },
  {
    id: 'custom',
    title: '✏️ Tự nhập chữ/từ tùy ý...',
    items: [],
  },
];

export function WorksheetPrintPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sourceParam = searchParams.get('source') || 'math-01-counting';

  // Mode: 'worksheet' (Phiếu bài tập) | 'handwriting' (Phiếu tập viết ô ly)
  const [printMode, setPrintMode] = useState<'worksheet' | 'handwriting'>('worksheet');

  // Worksheet state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [customTitle, setCustomTitle] = useState('');

  // Handwriting (Ô ly) state
  const [selectedPresetId, setSelectedPresetId] = useState<string>('letters-lower');
  const [customWritingText, setCustomWritingText] = useState<string>('a b c d đ e ê');
  const [linesCount, setLinesCount] = useState<number>(8);
  const [showDottedTrace, setShowDottedTrace] = useState<boolean>(true);
  const [showStartDots, setShowStartDots] = useState<boolean>(true);

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

  // Handwriting text list based on selected preset
  const handwritingItems = useMemo(() => {
    if (selectedPresetId === 'custom') {
      return customWritingText
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    const preset = HANDWRITING_PRESETS.find((p) => p.id === selectedPresetId);
    return preset ? preset.items : ['a', 'b', 'c'];
  }, [selectedPresetId, customWritingText]);

  return (
    <div className={styles.container}>
      {/* TOOLBAR */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => navigate('/')}
          >
            ← Về trang chủ
          </button>

          {/* MODE TABS */}
          <div className={styles.modeTabs}>
            <button
              type="button"
              className={`${styles.modeTab} ${printMode === 'worksheet' ? styles.modeTabActive : ''}`}
              onClick={() => setPrintMode('worksheet')}
            >
              📝 Phiếu Bài Tập Tự Luận
            </button>
            <button
              type="button"
              className={`${styles.modeTab} ${printMode === 'handwriting' ? styles.modeTabActive : ''}`}
              onClick={() => setPrintMode('handwriting')}
            >
              ✍️ Phiếu Tập Viết Ô Ly A4
            </button>
          </div>

          {/* WORKSHEET CONTROLS */}
          {printMode === 'worksheet' && (
            <>
              <select
                className={styles.select}
                value={sourceParam}
                onChange={(e) => handleSourceChange(e.target.value)}
              >
                <optgroup label="Học liệu trọng tâm">
                  {mistakes.length > 0 && (
                    <option value="mistakes">
                      ⚠️ Ôn tập câu hay sai ({mistakes.length} câu)
                    </option>
                  )}
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.subject === 'math' ? '🔢' : '🔤'} {l.title}
                    </option>
                  ))}
                </optgroup>
              </select>

              <input
                type="text"
                className={styles.select}
                style={{ width: '280px' }}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Tiêu đề phiếu bài tập..."
              />
            </>
          )}

          {/* HANDWRITING CONTROLS */}
          {printMode === 'handwriting' && (
            <div className={styles.oliToolbarRow}>
              <select
                className={styles.select}
                value={selectedPresetId}
                onChange={(e) => setSelectedPresetId(e.target.value)}
              >
                {HANDWRITING_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>

              {selectedPresetId === 'custom' && (
                <input
                  type="text"
                  className={styles.select}
                  style={{ width: '220px' }}
                  value={customWritingText}
                  onChange={(e) => setCustomWritingText(e.target.value)}
                  placeholder="Nhập chữ mẫu, cách nhau bởi dấu cách..."
                />
              )}

              <select
                className={styles.select}
                value={linesCount}
                onChange={(e) => setLinesCount(Number(e.target.value))}
              >
                <option value={6}>6 dòng ô ly</option>
                <option value={8}>8 dòng ô ly (chuẩn)</option>
                <option value={10}>10 dòng ô ly</option>
                <option value={12}>12 dòng ô ly</option>
              </select>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showDottedTrace}
                  onChange={(e) => setShowDottedTrace(e.target.checked)}
                />
                Hiện chữ nét đứt tô mẫu
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showStartDots}
                  onChange={(e) => setShowStartDots(e.target.checked)}
                />
                Hiện chấm đặt bút
              </label>
            </div>
          )}
        </div>

        <div className={styles.toolbarRight}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => window.print()}
          >
            🖨️ In ngay (Khổ A4)
          </button>
        </div>
      </div>

      {/* PRINTABLE PAGE WRAPPER */}
      <div className={styles.pageWrapper}>
        {/* =========================================================================
            MODE 1: HANDWRITING Ô LY A4
           ========================================================================= */}
        {printMode === 'handwriting' ? (
          <div className={styles.oliSheet}>
            {/* HEADER */}
            <div className={styles.oliHeader}>
              <div className={styles.oliHeaderLeft}>
                <div><strong>Trường Tiểu học:</strong> ............................................................................</div>
                <div style={{ marginTop: '4px' }}>
                  <strong>Lớp:</strong> 1...... · <strong>Họ và tên học sinh:</strong> ............................................................................
                </div>
              </div>
              <div className={styles.oliScoreBox}>
                <div style={{ fontWeight: 800 }}>ĐIỂM CHỮ VIẾT</div>
                <div style={{ height: '24px' }}></div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Lời nhận xét của cô giáo</div>
              </div>
            </div>

            {/* TITLE */}
            <h1 className={styles.oliMainTitle}>
              PHIẾU TẬP VIẾT CHỮ VÀ SỐ — KẺ Ô LY CHUẨN TIỂU HỌC
            </h1>
            <div className={styles.oliSubtitle}>
              Khổ chuẩn 4 ô ly vuông tiểu học (độ cao 2 li, nét thanh nét đậm)
            </div>

            {/* Ô LY SVG LINES */}
            <div className={styles.oliLinesList}>
              {Array.from({ length: linesCount }).map((_, lineIdx) => {
                const sampleChar = handwritingItems[lineIdx % handwritingItems.length] || 'a';
                const isFirstRow = lineIdx === 0;

                return (
                  <div key={lineIdx} className={styles.oliRowWrapper}>
                    <svg
                      viewBox="0 0 720 64"
                      className={styles.oliSvg}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Background ô ly grid */}
                      <defs>
                        <pattern id={`grid-${lineIdx}`} width="16" height="16" patternUnits="userSpaceOnUse">
                          {/* Inner sub-lines (nét đứt ở giữa) */}
                          <line x1="0" y1="8" x2="16" y2="8" stroke="#dbeafe" strokeWidth="0.5" strokeDasharray="1,1" />
                          <line x1="8" y1="0" x2="8" y2="16" stroke="#dbeafe" strokeWidth="0.5" strokeDasharray="1,1" />
                          {/* Grid boundaries */}
                          <line x1="0" y1="16" x2="16" y2="16" stroke="#93c5fd" strokeWidth="0.6" />
                          <line x1="16" y1="0" x2="16" y2="16" stroke="#93c5fd" strokeWidth="0.6" />
                        </pattern>
                      </defs>

                      {/* Fill 4-ô-ly height (16px * 4 = 64px) */}
                      <rect x="0" y="0" width="720" height="64" fill={`url(#grid-${lineIdx})`} />

                      {/* Main baseline (Đường kẻ đậm nơi chân chữ đứng - dòng số 1 tại y=48) */}
                      <line x1="0" y1="48" x2="720" y2="48" stroke="#1d4ed8" strokeWidth="1.6" />

                      {/* Top boundary (Đỉnh ô ly cao 3 tầng tại y=0) */}
                      <line x1="0" y1="0" x2="720" y2="0" stroke="#3b82f6" strokeWidth="1" />

                      {/* Bottom line for descenders like g, y, p at y=64 */}
                      <line x1="0" y1="64" x2="720" y2="64" stroke="#3b82f6" strokeWidth="0.8" />

                      {/* Row Label */}
                      <text x="4" y="46" fontSize="10" fill="#94a3b8" fontWeight="bold">
                        {lineIdx + 1}
                      </text>

                      {/* Sample Letter on Left (Mẫu cô viết) */}
                      <text
                        x="28"
                        y="48"
                        fontSize="26"
                        fontWeight="bold"
                        fill="#0f172a"
                        fontFamily="'Nunito', 'Segoe UI', Arial, sans-serif"
                      >
                        {sampleChar}
                      </text>

                      {/* Tracing Dotted Characters & Pen Start Dots */}
                      {[110, 200, 290, 380, 470, 560, 650].map((posX, posIdx) => (
                        <g key={posIdx}>
                          {/* Dotted trace guide for student (Tô theo nét đứt) */}
                          {showDottedTrace && (isFirstRow || lineIdx % 2 === 0) && (
                            <text
                              x={posX}
                              y="48"
                              fontSize="26"
                              fontWeight="normal"
                              fill="#94a3b8"
                              stroke="#94a3b8"
                              strokeWidth="0.6"
                              strokeDasharray="2,2"
                              fontFamily="'Nunito', 'Segoe UI', Arial, sans-serif"
                            >
                              {sampleChar}
                            </text>
                          )}

                          {/* Start dot (Dấu chấm đặt bút) */}
                          {showStartDots && (
                            <circle
                              cx={posX - 4}
                              cy="36"
                              r="2.2"
                              fill="#ef4444"
                            />
                          )}
                        </g>
                      ))}
                    </svg>
                  </div>
                );
              })}
            </div>

            {/* FOOTER NOTE */}
            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #cbd5e1', fontSize: '11px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
              <span>💡 Hướng dẫn: Đặt bút từ chấm đỏ, viết đúng độ cao và khoảng cách giữa các chữ là 1 ô ly.</span>
              <span>Trang 1 / 1</span>
            </div>
          </div>
        ) : (
          /* =========================================================================
              MODE 2: WORKSHEET BÀI TẬP (EXISTING FEATURE)
             ========================================================================= */
          <>
            {/* SHEET 1: ĐỀ BÀI TẬP DÀNH CHO HỌC SINH */}
            <div className={styles.sheet}>
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <div className={styles.schoolName}>TRƯỜNG TIỂU HỌC: ....................................................</div>
                  <div className={styles.studentInfo}>
                    <span>Lớp: 1......</span>
                    <span style={{ marginLeft: '24px' }}>Họ và tên: ................................................................</span>
                  </div>
                </div>

                <div className={styles.scoreBox}>
                  <div className={styles.scoreTitle}>ĐIỂM SỐ</div>
                  <div className={styles.scorePlaceholder}></div>
                  <div className={styles.teacherNoteBox}>Lời phê của cô giáo</div>
                </div>
              </div>

              <div className={styles.titleSection}>
                <h1 className={styles.mainTitle}>{customTitle}</h1>
                <p className={styles.subTitle}>
                  {currentLesson?.description || 'Học sinh đọc kĩ đề bài và hoàn thành các bài tập dưới đây'}
                </p>
              </div>

              {/* QUESTIONS LIST */}
              <div className={styles.questionsContainer}>
                {questions.map((q, idx) => (
                  <div key={q.id} className={styles.questionItem}>
                    <div className={styles.questionPrompt}>
                      <span className={styles.qNumber}>Bài {idx + 1}:</span>
                      <span>{q.prompt}</span>
                    </div>

                    {/* Multiple choice */}
                    {(q.type === 'multiple_choice' || q.type === 'multiple-choice') && (
                      <div className={styles.mcOptions}>
                        {q.options.map((opt, oIdx) => (
                          <div key={opt.id} className={styles.mcOption}>
                            <span className={styles.optionCircle}>{String.fromCharCode(65 + oIdx)}</span>
                            <span>{opt.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Counting */}
                    {q.type === 'counting' && (
                      <div className={styles.countingBox}>
                        <div className={styles.itemsGrid}>
                          {q.items.map((it, iIdx) => (
                            <img
                              key={iIdx}
                              src={it.image}
                              alt={it.alt}
                              className={styles.itemThumb}
                            />
                          ))}
                        </div>
                        <div className={styles.writeAnswerLine}>
                          Trả lời: Có tất cả ............ {q.items[0]?.alt || 'đồ vật'}.
                        </div>
                      </div>
                    )}

                    {/* Number select */}
                    {(q.type === 'number_select' || q.type === 'number-select') && (
                      <div className={styles.mathBox}>
                        <div className={styles.mathExpression}>{q.expression}</div>
                        <div className={styles.choicesRow}>
                          {q.choices.map((c, cIdx) => (
                            <div key={cIdx} className={styles.choiceBox}>
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tap place */}
                    {q.type === 'tap_place' && (
                      <div className={styles.tapPlaceBox}>
                        <div className={styles.wordBank}>
                          <span>Từ / Chữ cần điền:</span>
                          {q.items.map((it) => (
                            <span key={it.id} className={styles.wordChip}>
                              {it.label}
                            </span>
                          ))}
                        </div>
                        <div className={styles.targetsList}>
                          {q.targets.map((tgt) => (
                            <div key={tgt.id} className={styles.targetSentence}>
                              <span>{tgt.prefixText || ''}</span>
                              <span className={styles.blankLine}></span>
                              <span>{tgt.suffixText || ''}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matching */}
                    {q.type === 'matching' && (
                      <div className={styles.matchingBox}>
                        <div className={styles.matchingCol}>
                          {q.leftColumn.map((col) => (
                            <div key={col.id} className={styles.matchingNode}>
                              <span>{col.label}</span>
                              <span className={styles.dot}></span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.matchingDivider}></div>
                        <div className={styles.matchingCol}>
                          {q.rightColumn.map((col) => (
                            <div key={col.id} className={styles.matchingNode}>
                              <span className={styles.dot}></span>
                              <span>{col.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className={styles.sheetFooter}>
                <span>Trình Chiếu Lớp 1 — Học tập ngoại tuyến</span>
                <span>Chúc các con làm bài thật tốt! ✨</span>
              </div>
            </div>

            {/* SHEET 2: ĐÁP ÁN & HƯỚNG DẪN DÀNH CHO GIÁO VIÊN */}
            <div className={`${styles.sheet} ${styles.teacherPage}`}>
              <div style={{ borderBottom: '2px solid #000000', paddingBottom: '8px' }}>
                <h2 className={styles.teacherHeaderTitle}>
                  HƯỚNG DẪN CHẤM & ĐÁP ÁN CHI TIẾT
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
          </>
        )}
      </div>
    </div>
  );
}
