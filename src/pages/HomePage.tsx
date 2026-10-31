import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Lesson } from '@/schemas/content.schema';
import { getClassroomStore, type ClassroomData } from '@/core/classroom-store';
import { ClassroomManagerModal } from '@/components/classroom/ClassroomManagerModal';
import {
  getAllLessons,
  deleteCustomLesson,
  getCustomLessons,
  BUILTIN_LESSON_URLS,
} from '@/core/lesson-storage';
import { getMistakeTracker, type MistakeEntry } from '@/core/mistake-tracker';
import {
  getAllTeachingSessions,
  type TeachingSession,
} from '@/core/session-storage';
import {
  checkAndRequestStoragePersistence,
  downloadBackupFile,
  importFullBackup,
  type StoragePersistenceStatus,
} from '@/core/backup-manager';
import { APP_CACHE_NAME } from '@/core/cache-config';
import styles from './HomePage.module.css';

interface OfflineStatus {
  status: 'idle' | 'downloading' | 'ready' | 'error';
  total: number;
  cached: number;
  missing: string[];
}

export function HomePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [sessions, setSessions] = useState<TeachingSession[]>([]);
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineReady, setOfflineReady] = useState(false);
  const [persistenceStatus, setPersistenceStatus] = useState<StoragePersistenceStatus | null>(null);
  const [offlineStatuses, setOfflineStatuses] = useState<Record<string, OfflineStatus>>({});
  const [globalOfflineMsg, setGlobalOfflineMsg] = useState<string | null>(null);
  const [classroomData, setClassroomData] = useState<ClassroomData>(getClassroomStore().getData());
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);

  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    const [allLessons, allSessions] = await Promise.all([
      getAllLessons(),
      Promise.resolve(getAllTeachingSessions()),
    ]);
    setLessons(allLessons);
    setSessions(allSessions);
    setMistakes(getMistakeTracker().getMistakes());
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Check and request storage persistence on startup
  useEffect(() => {
    checkAndRequestStoragePersistence().then((status) => {
      setPersistenceStatus(status);
    });
  }, []);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => {
          setOfflineReady(true);
        })
        .catch(() => {});
    }
  }, []);

  // Offline preloader for a specific lesson
  const handleCacheLesson = useCallback(async (lesson: Lesson) => {
    const jsonStr = JSON.stringify(lesson);
    const mediaPattern = /\/media\/[^"]+/g;
    const mediaUrls = Array.from(new Set(jsonStr.match(mediaPattern) || []));

    setOfflineStatuses((prev) => ({
      ...prev,
      [lesson.id]: {
        status: 'downloading',
        total: mediaUrls.length,
        cached: 0,
        missing: [],
      },
    }));

    if (typeof caches === 'undefined') {
      setOfflineStatuses((prev) => ({
        ...prev,
        [lesson.id]: {
          status: 'error',
          total: mediaUrls.length,
          cached: 0,
          missing: ['Cache API không hỗ trợ trên trình duyệt này'],
        },
      }));
      return;
    }

    try {
      const cache = await caches.open(APP_CACHE_NAME);
      let cachedCount = 0;
      const missingList: string[] = [];

      for (const url of mediaUrls) {
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            await cache.put(url, resp);
            cachedCount++;
          } else {
            missingList.push(url);
          }
        } catch {
          missingList.push(url);
        }
      }

      setOfflineStatuses((prev) => ({
        ...prev,
        [lesson.id]: {
          status: missingList.length === 0 ? 'ready' : 'error',
          total: mediaUrls.length,
          cached: cachedCount,
          missing: missingList,
        },
      }));
    } catch (e) {
      setOfflineStatuses((prev) => ({
        ...prev,
        [lesson.id]: {
          status: 'error',
          total: mediaUrls.length,
          cached: 0,
          missing: [String(e)],
        },
      }));
    }
  }, []);

  // Nút "Kiểm tra & tải offline" toàn bộ hệ thống
  const handleCacheAllOffline = useCallback(async () => {
    setGlobalOfflineMsg('Đang kiểm tra và nạp trước toàn bộ tài nguyên offline...');
    try {
      if (typeof caches === 'undefined') {
        setGlobalOfflineMsg('⚠️ Cache Storage không được hỗ trợ trên trình duyệt này');
        return;
      }
      const cache = await caches.open(APP_CACHE_NAME);
      const allUrls = new Set<string>(BUILTIN_LESSON_URLS);

      lessons.forEach((les) => {
        const jsonStr = JSON.stringify(les);
        const matches = jsonStr.match(/\/media\/[^"]+/g) || [];
        matches.forEach((m) => allUrls.add(m));
      });

      let loaded = 0;
      const urlList = Array.from(allUrls);
      for (const url of urlList) {
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            await cache.put(url, resp);
            loaded++;
          }
        } catch {
          // ignore individual fetch errors
        }
      }
      setGlobalOfflineMsg(`✅ Đã nạp thành công ${loaded}/${urlList.length} tài nguyên vào bộ đệm! Sẵn sàng dạy khi không có mạng.`);
    } catch (e) {
      setGlobalOfflineMsg(`⚠️ Lỗi kiểm tra offline: ${String(e)}`);
    }
  }, [lessons]);

  const handlePresent = useCallback(
    (lessonId: string) => {
      navigate(`/present?lesson=${lessonId}`);
    },
    [navigate]
  );

  const handlePresenter = useCallback(
    (lessonId: string) => {
      navigate(`/presenter?lesson=${lessonId}`);
    },
    [navigate]
  );

  // Khởi chạy 2 màn hình 1-Click: Mở TV popup và chuyển tab laptop sang Presenter
  const handleStartClassroom = useCallback(
    (lessonId: string) => {
      window.open(
        `/present?lesson=${lessonId}`,
        'tv_presentation_screen',
        'width=1280,height=720,menubar=no,toolbar=no,location=no'
      );
      navigate(`/presenter?lesson=${lessonId}`);
    },
    [navigate]
  );

  // Khởi chạy Buổi dạy (Teaching Session) 2 Màn hình
  const handleStartSession = useCallback(
    (session: TeachingSession) => {
      const firstLessonId = session.steps.find((s) => s.lessonId)?.lessonId;
      const lessonQuery = firstLessonId ? `&lesson=${firstLessonId}` : '';
      window.open(
        `/present?session=${session.id}${lessonQuery}`,
        'tv_presentation_screen',
        'width=1280,height=720,menubar=no,toolbar=no,location=no'
      );
      navigate(`/presenter?session=${session.id}${lessonQuery}`);
    },
    [navigate]
  );

  // Ôn tập câu hay sai
  const handleStartMistakesReview = useCallback(() => {
    window.open(
      `/present?lesson=review-mistakes-session`,
      'tv_presentation_screen',
      'width=1280,height=720,menubar=no,toolbar=no,location=no'
    );
    navigate(`/presenter?lesson=review-mistakes-session`);
  }, [navigate]);

  const handleClearAllMistakes = useCallback(() => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử câu hay sai không? (Cả lớp đã nắm vững bài)')) {
      getMistakeTracker().clearAll();
      setMistakes([]);
    }
  }, []);

  // Sao lưu & Phục hồi
  const handleExportBackup = useCallback(async () => {
    try {
      await downloadBackupFile();
    } catch (e) {
      alert(`Lỗi xuất file sao lưu: ${String(e)}`);
    }
  }, []);

  const handleImportBackupFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const result = await importFullBackup(text);
      if (result.success && result.stats) {
        const stats = result.stats;
        alert(
          `🎉 Khôi phục dữ liệu thành công!\n` +
            `• Học sinh: ${stats.studentsCount}\n` +
            `• Bài soạn: ${stats.lessonsCount}\n` +
            `• Câu hay sai: ${stats.mistakesCount}\n` +
            `• Buổi dạy: ${stats.sessionsCount}\n` +
            `• Bản ghi âm giọng: ${stats.audioCount}`
        );
        refreshData();
      } else {
        alert(`⚠️ Không thể nhập file sao lưu: ${result.error || 'Lỗi không xác định'}`);
      }
    } catch (err) {
      alert(`⚠️ Không thể nhập file sao lưu: ${String(err)}`);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [refreshData]);

  return (
    <div className={styles.pageWrapper}>
      {/* 1. TOP NAVBAR CHUẨN ONTHI.APP */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.brand} onClick={() => navigate('/')}>
            <div className={styles.brandLogo}>⭐</div>
            <span className={styles.brandName}>
              <span className={styles.brandOn}>Ôn</span>
              <span className={styles.brandThi}>Thi</span>
            </span>
          </div>

          <nav className={styles.navLinks}>
            <button className={`${styles.navLink} ${styles.navLinkActive}`} onClick={() => navigate('/')}>
              Học theo lớp
            </button>
            <button className={styles.navLink} onClick={() => navigate('/print-worksheet')}>
              Công cụ miễn phí
            </button>
            <button className={styles.navLink} onClick={() => navigate('/editor')}>
              Soạn bài
            </button>
            <button className={styles.navLink} onClick={() => setIsClassroomModalOpen(true)}>
              Lớp & Thi đua
            </button>
            <a href="/onthi-preview.html" target="_blank" rel="noreferrer" className={styles.navLink} title="Xem bản mẫu thiết kế Stitch">
              Bản mẫu Stitch ↗
            </a>
          </nav>

          <div className={styles.navRight}>
            <div className={styles.userPill}>
              <div className={styles.avatar}>T</div>
              <span>Tâm Nguyễn</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className={styles.mainContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <span>Trang chủ</span>
          <span>›</span>
          <span className={styles.breadcrumbCurrent}>Lớp 1</span>
        </div>

        {/* Hero Lớp 1 */}
        <section className={styles.heroSection}>
          <div className={styles.classBadge}>1</div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Lớp 1 <span className={styles.gdptTag}>Chuẩn GDPT 2018</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Học theo bản đồ · Thi theo kì · Công cụ đúng lớp · Trình chiếu TV & Bảng tương tác
            </p>
          </div>
        </section>

        {/* Orange Action Banner */}
        <section
          className={styles.orangeBanner}
          onClick={() => {
            const first = lessons[0];
            if (first) handleStartClassroom(first.id);
          }}
          title="Bấm để bắt đầu chiếu bài học đầu tiên"
        >
          <div className={styles.orangeBannerLeft}>
            <div className={styles.orangeBannerIcon}>🎮</div>
            <div>
              <div className={styles.orangeBannerTag}>Thử thách ngay hôm nay</div>
              <div className={styles.orangeBannerTitle}>
                Bé làm thử bài này - Con làm bài đếm số, nhận diện hình ảnh & ghép vần
              </div>
            </div>
          </div>
          <span style={{ fontSize: '24px', fontWeight: 900 }}>➔</span>
        </section>

        {/* Top Status & Storage Utility Bar */}
        <div className={styles.topUtilityBar}>
          <div className={styles.statusBar}>
            <span className={`${styles.statusDot} ${offlineReady ? styles.statusOnline : styles.statusOffline}`} />
            <span className={styles.statusText}>
              {offlineReady ? 'PWA Offline: Đã sẵn sàng' : 'PWA: Đang khởi tạo...'}
            </span>
            {persistenceStatus && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: persistenceStatus.isPersisted ? '#059669' : '#d97706',
                  backgroundColor: persistenceStatus.isPersisted ? '#ecfdf5' : '#fef3c7',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: `1px solid ${persistenceStatus.isPersisted ? '#a7f3d0' : '#fde68a'}`,
                }}
                title={persistenceStatus.isPersisted ? 'Trình duyệt cam kết bảo vệ dữ liệu vĩnh viễn' : 'Dữ liệu lưu tạm thời'}
              >
                {persistenceStatus.isPersisted ? '🛡️ Dữ liệu an toàn' : '⚠️ Tiêu chuẩn'}
              </span>
            )}
          </div>

          <div className={styles.utilityActions}>
            <button onClick={handleCacheAllOffline} className={styles.utilityBtn} title="Tải trước toàn bộ âm thanh, hình ảnh vào bộ nhớ đệm">
              📥 Nạp Offline toàn bộ
            </button>
            <button onClick={handleExportBackup} className={styles.utilityBtn} data-testid="export-backup-btn" title="Xuất file sao lưu .json">
              💾 Xuất sao lưu (.json)
            </button>
            <button onClick={() => fileInputRef.current?.click()} className={styles.utilityBtn} data-testid="import-backup-btn" title="Khôi phục sao lưu">
              📥 Khôi phục sao lưu
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImportBackupFile} accept=".json" style={{ display: 'none' }} />
          </div>
        </div>

        {globalOfflineMsg && (
          <div
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: '#ecfdf5',
              color: '#065f46',
              fontSize: '13px',
              fontWeight: 700,
              border: '1px solid #a7f3d0',
            }}
          >
            {globalOfflineMsg}
          </div>
        )}

        {/* SECTION 1: Lịch sử câu hay sai & Ôn tập đầu giờ */}
        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '20px 24px',
            border: '2px solid #e0e7ff',
            borderBottom: '5px solid #c7d2fe',
            boxShadow: '0 2px 8px rgba(79, 70, 229, 0.05)',
          }}
          data-testid="mistakes-section"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1e1b4b', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🎯 Ôn tập câu cả lớp hay sai ({mistakes.length} câu)
              </h2>
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                Tự động ghi nhận câu hỏi học sinh trả lời nhầm lẫn trong các tiết trước để củng cố 5 phút đầu giờ.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleStartMistakesReview}
                disabled={mistakes.length === 0}
                style={{
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: 800,
                  backgroundColor: mistakes.length > 0 ? '#4f46e5' : '#cbd5e1',
                  color: '#ffffff',
                  border: 'none',
                  borderBottom: mistakes.length > 0 ? '4px solid #3730a3' : 'none',
                  borderRadius: '12px',
                  cursor: mistakes.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                data-testid="review-mistakes-now-btn"
              >
                🚀 Chiếu ôn tập ngay
              </button>
              <button
                onClick={() => navigate('/print-worksheet?source=mistakes')}
                disabled={mistakes.length === 0}
                style={{
                  padding: '9px 14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  backgroundColor: '#ffffff',
                  color: mistakes.length > 0 ? '#0284c7' : '#94a3b8',
                  border: '2px solid #bae6fd',
                  borderBottom: '4px solid #7dd3fc',
                  borderRadius: '12px',
                  cursor: mistakes.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                🖨️ In phiếu ôn tập
              </button>
              {mistakes.length > 0 && (
                <button
                  onClick={handleClearAllMistakes}
                  style={{
                    padding: '9px 12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: '#f8fafc',
                    color: '#64748b',
                    border: '1px solid #e2e8f0',
                    borderBottom: '3px solid #cbd5e1',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  ✅ Lớp đã nắm vững
                </button>
              )}
            </div>
          </div>

          {mistakes.length === 0 && (
            <div style={{ marginTop: '12px', color: '#059669', fontSize: '13px', fontWeight: 600 }}>
              ✨ Tuyệt vời! Hiện không có câu nào bị sai nhiều. Cả lớp nắm bài rất vững.
            </div>
          )}
        </section>

        {/* SECTION 2: Kịch bản Buổi dạy liên hoàn (Teaching Sessions) */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>⏱️</span> Kịch bản Buổi dạy liên hoàn (Tiết 35 phút)
            </h2>
            <span className={styles.sectionSubtitle}>Khởi động → Học vần/Số → Làm bài tập → Thi đua</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {sessions.map((session) => (
              <div
                key={session.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '22px',
                  border: '2px solid #e2e8f0',
                  borderBottom: '5px solid #cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                data-testid={`session-card-${session.id}`}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {session.subject === 'math' ? '🧮' : '📖'} {session.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '11px',
                        backgroundColor: '#ecfdf5',
                        color: '#065f46',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: 800,
                      }}
                    >
                      {session.estimatedDurationMinutes} phút
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4, marginBottom: '12px' }}>
                    {session.description}
                  </p>

                  <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Tiến trình {session.steps.length} hoạt động:
                    </span>
                    <ol style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '12px', color: '#334155', lineHeight: 1.6 }}>
                      {session.steps.map((st) => (
                        <li key={st.id}>
                          <strong>{st.title}</strong> ({st.durationMinutes}p)
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSession(session)}
                  className={styles.btnDual}
                  style={{ fontSize: '14px', padding: '11px 16px' }}
                  data-testid={`start-session-btn-${session.id}`}
                >
                  🚀 Bắt đầu buổi dạy (2 Màn hình)
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Bài học độc lập (Học theo bản đồ) */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>🎮</span> Học theo bản đồ · Danh mục bài giảng Lớp 1
            </h2>
            <span className={styles.sectionSubtitle}>
              Toán 48 bài · Tiếng Việt 132 bài · Giọng cô giáo đọc từng câu
            </span>
          </div>

          {loading ? (
            <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>Đang tải bài học...</p>
          ) : lessons.length === 0 ? (
            <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>Không tìm thấy bài học nào.</p>
          ) : (
            <div className={styles.lessonGrid}>
              {lessons.map((lesson) => {
                const offline = offlineStatuses[lesson.id];
                const isVietnamese = lesson.subject === 'vietnamese';
                const isCustom = getCustomLessons().some((cl) => cl.id === lesson.id);

                return (
                  <div key={lesson.id} className={styles.lessonCard}>
                    <div>
                      <div className={styles.lessonCardTop}>
                        <div
                          className={`${styles.cardIcon} ${
                            isCustom ? styles.cardIconCustom : isVietnamese ? styles.cardIconVn : styles.cardIconMath
                          }`}
                        >
                          {isCustom ? '⭐' : isVietnamese ? 'ba' : '1+1'}
                        </div>
                        <div>
                          <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                          <div className={styles.lessonMeta}>
                            <span className={`${styles.badge} ${isVietnamese ? styles.badgeVn : styles.badgeMath}`}>
                              {isVietnamese ? 'Tiếng Việt 1' : 'Toán 1'}
                            </span>
                            <span>{lesson.slides.length} slide</span>
                            <span style={{ color: lesson.status === 'publish' ? '#059669' : '#d97706' }}>
                              {lesson.status === 'publish' ? '● Xuất bản' : '○ Bản nháp'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {lesson.description && <p className={styles.lessonDesc}>{lesson.description}</p>}

                      {/* Offline Status Report */}
                      {offline && (
                        <div style={{ marginBottom: '14px', fontSize: '12px' }}>
                          {offline.status === 'downloading' && (
                            <span style={{ color: '#0284c7' }}>⏳ Đang tải file ({offline.cached}/{offline.total})...</span>
                          )}
                          {offline.status === 'ready' && (
                            <span style={{ color: '#059669', fontWeight: 700 }}>
                              ✅ Đã sẵn sàng Offline ({offline.cached}/{offline.total} file)
                            </span>
                          )}
                          {offline.status === 'error' && (
                            <div style={{ color: '#dc2626', fontWeight: 600 }}>
                              ⚠️ Thiếu {offline.missing.length} file:
                              <ul style={{ margin: '2px 0 0 16px', fontSize: '11px' }}>
                                {offline.missing.map((m, i) => (
                                  <li key={i}>{m}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={styles.actions}>
                      <button
                        className={styles.btnDual}
                        onClick={() => handleStartClassroom(lesson.id)}
                        title="Mở màn hình TV riêng để chiếu và chuyển tab này sang Bảng điều khiển"
                        data-testid={`start-lesson-${lesson.id}`}
                      >
                        🚀 Chiếu bài dạy (Mở 2 màn hình)
                      </button>

                      <div className={styles.secondaryRow}>
                        <button className={styles.btnTv} onClick={() => handlePresent(lesson.id)} title="Chỉ mở màn hình hiển thị TV">
                          📺 Xem TV
                        </button>
                        <button className={styles.btnTeacher} onClick={() => handlePresenter(lesson.id)} title="Chỉ mở Bảng điều khiển giáo viên">
                          🎛️ Điều khiển
                        </button>
                      </div>

                      <div className={styles.secondaryRow}>
                        <button
                          className={styles.btnTeacher}
                          onClick={() => navigate(`/print-worksheet?source=${lesson.id}`)}
                          title="In phiếu bài tập A4 cho bài này"
                        >
                          🖨️ In phiếu A4
                        </button>
                        <button
                          className={styles.btnTeacher}
                          onClick={() => handleCacheLesson(lesson)}
                          title="Tải toàn bộ media vào bộ nhớ đệm offline"
                        >
                          💾 Nạp Offline
                        </button>
                      </div>

                      {isCustom && (
                        <div className={styles.secondaryRow}>
                          <button
                            className={styles.btnTeacher}
                            onClick={() => navigate(`/editor?lesson=${lesson.id}`)}
                            title="Chỉnh sửa nội dung bài này"
                          >
                            ✏️ Sửa bài
                          </button>
                          <button
                            className={styles.btnTeacher}
                            style={{ color: '#dc2626' }}
                            onClick={() => {
                              if (confirm(`Bạn có chắc chắn muốn xóa bài "${lesson.title}" không?`)) {
                                deleteCustomLesson(lesson.id);
                                refreshData();
                              }
                            }}
                            title="Xóa bài này khỏi bộ nhớ máy"
                          >
                            🗑️ Xóa
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4: Công cụ lớp 1 miễn phí */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>🛠️</span> Công cụ Lớp 1 miễn phí
            </h2>
            <span className={styles.sectionSubtitle}>Dành cho giáo viên và phụ huynh đồng hành cùng con</span>
          </div>

          <div className={styles.toolsGrid}>
            <div className={styles.toolCard} onClick={() => navigate('/print-worksheet')} data-testid="nav-print-worksheet">
              <div className={styles.toolIcon} style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>🖨️</div>
              <div>
                <div className={styles.toolTitle}>In Phiếu bài tập A4</div>
                <div className={styles.toolSubtitle}>Chuẩn khổ A4 kèm đáp án chi tiết</div>
              </div>
            </div>

            <div className={styles.toolCard} onClick={() => navigate('/editor')}>
              <div className={styles.toolIcon} style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>✏️</div>
              <div>
                <div className={styles.toolTitle}>Soạn bài giảng mới</div>
                <div className={styles.toolSubtitle}>Tạo câu hỏi trắc nghiệm, nối từ, đếm số</div>
              </div>
            </div>

            <div className={styles.toolCard} onClick={() => setIsClassroomModalOpen(true)}>
              <div className={styles.toolIcon} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>⚙️</div>
              <div>
                <div className={styles.toolTitle}>Quản lý Lớp & 4 Tổ</div>
                <div className={styles.toolSubtitle}>Danh sách học sinh, vòng quay gọi tên</div>
              </div>
            </div>

            <div className={styles.toolCard} onClick={() => navigate('/hardware-test')}>
              <div className={styles.toolIcon} style={{ backgroundColor: '#dcfce7', color: '#059669' }}>🔧</div>
              <div>
                <div className={styles.toolTitle}>Kiểm tra âm thanh & TV</div>
                <div className={styles.toolSubtitle}>Test loa, micro, audio context</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ClassroomManagerModal
        isOpen={isClassroomModalOpen}
        onClose={() => setIsClassroomModalOpen(false)}
        students={classroomData.students}
        teams={classroomData.teams}
      />

      <footer className={styles.footer}>
        <div>© 2025 Ôn Thi Lớp 1 (onthi.app clone) · Hoạt động 100% Offline trên laptop giáo viên</div>
        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
          Tối ưu cho TV & Bảng thông minh 16:9 · Trình điều khiển 1 chạm cho giáo viên
        </div>
      </footer>
    </div>
  );
}
