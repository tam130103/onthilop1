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
    setGlobalOfflineMsg('Đang kiểm tra và tải trước toàn bộ tài nguyên offline...');
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Trình Chiếu Lớp 1</h1>
        <p className={styles.subtitle}>Công cụ giảng dạy tương tác Toán & Tiếng Việt — Offline PWA</p>

        {/* Status Bar & Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
          <div className={styles.statusBar}>
            <span
              className={`${styles.statusDot} ${offlineReady ? styles.statusOnline : styles.statusOffline}`}
            />
            <span className={styles.statusText}>
              {offlineReady ? 'PWA Offline: Sẵn sàng' : 'PWA: Đang tải...'}
            </span>
            {persistenceStatus && (
              <span
                style={{
                  fontSize: '12px',
                  color: persistenceStatus.isPersisted ? '#86efac' : '#fcd34d',
                  marginLeft: '8px',
                  background: '#1e293b',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                }}
                title={persistenceStatus.isPersisted ? 'Trình duyệt cam kết bảo vệ dữ liệu vĩnh viễn' : 'Dữ liệu lưu tạm thời'}
              >
                {persistenceStatus.isPersisted ? '🛡️ Dữ liệu: Đã khóa an toàn' : '⚠️ Dữ liệu: Tiêu chuẩn'}
              </span>
            )}
          </div>

          <button
            onClick={handleCacheAllOffline}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#047857',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            📥 Nạp Offline toàn bộ
          </button>
          <button
            onClick={() => setIsClassroomModalOpen(true)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#4338ca',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ⚙️ Danh sách lớp & Thi đua
          </button>
          <button
            onClick={() => navigate('/editor')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ✏️ Soạn bài mới
          </button>
          <button
            onClick={() => navigate('/print-worksheet')}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#0891b2',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            data-testid="nav-print-worksheet"
          >
            🖨️ In Phiếu Bài tập A4
          </button>
          <button
            onClick={handleExportBackup}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#7c3aed',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            data-testid="export-backup-btn"
          >
            💾 Xuất sao lưu (.json)
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 700,
              background: '#475569',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            data-testid="import-backup-btn"
          >
            📥 Khôi phục sao lưu
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportBackupFile}
            accept=".json"
            style={{ display: 'none' }}
          />
        </div>

        {globalOfflineMsg && (
          <div
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#064e3b',
              color: '#86efac',
              fontSize: '14px',
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            {globalOfflineMsg}
          </div>
        )}
      </header>

      {/* SECTION 1: Lịch sử câu hay sai & Ôn tập đầu giờ */}
      <section
        style={{
          width: '100%',
          maxWidth: '1200px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #1e293b 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          border: '2px solid #4338ca',
          boxShadow: '0 8px 32px rgba(67, 56, 202, 0.25)',
        }}
        data-testid="mistakes-section"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎯 Ôn tập câu cả lớp hay sai ({mistakes.length} câu)
            </h2>
            <p style={{ color: '#c7d2fe', fontSize: '14px', margin: 0 }}>
              Hệ thống tự động ghi nhận các câu hỏi học sinh trả lời nhầm lẫn trong các tiết trước để củng cố 5 phút đầu giờ.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleStartMistakesReview}
              disabled={mistakes.length === 0}
              style={{
                padding: '10px 18px',
                fontSize: '14px',
                fontWeight: 700,
                background: mistakes.length > 0 ? '#4f46e5' : '#475569',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                cursor: mistakes.length > 0 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: mistakes.length > 0 ? '0 4px 14px rgba(79, 70, 229, 0.4)' : 'none',
              }}
              data-testid="review-mistakes-now-btn"
            >
              🚀 Chiếu ôn tập ngay
            </button>
            <button
              onClick={() => navigate('/print-worksheet?source=mistakes')}
              disabled={mistakes.length === 0}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                fontWeight: 600,
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
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
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: '#334155',
                  color: '#94a3b8',
                  border: '1px solid #475569',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                ✅ Lớp đã nắm vững (Xóa)
              </button>
            )}
          </div>
        </div>

        {mistakes.length === 0 && (
          <div style={{ marginTop: '16px', color: '#86efac', fontSize: '14px', fontWeight: 500 }}>
            ✨ Tuyệt vời! Hiện không có câu nào bị sai nhiều. Cả lớp nắm bài rất vững.
          </div>
        )}
      </section>

      {/* SECTION 2: Kịch bản Buổi dạy liên hoàn (Teaching Sessions) */}
      <section style={{ width: '100%', maxWidth: '1200px', marginBottom: '36px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⏱️ Kịch bản Buổi dạy liên hoàn (Tiết 35 phút)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {sessions.map((session) => (
            <div
              key={session.id}
              style={{
                background: '#1e293b',
                borderRadius: '14px',
                padding: '24px',
                border: '2px solid #334155',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              data-testid={`session-card-${session.id}`}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                    {session.subject === 'math' ? '🧮' : '📖'} {session.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '12px',
                      background: '#065f46',
                      color: '#a7f3d0',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {session.estimatedDurationMinutes} phút
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.4, marginBottom: '14px' }}>
                  {session.description}
                </p>

                {/* Steps List */}
                <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    Tiến trình {session.steps.length} hoạt động:
                  </span>
                  <ol style={{ margin: '6px 0 0 18px', padding: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    {session.steps.map((st) => (
                      <li key={st.id}>
                        <strong>{st.title}</strong> ({st.durationMinutes}p)
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleStartSession(session)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  }}
                  data-testid={`start-session-btn-${session.id}`}
                >
                  🚀 Bắt đầu buổi dạy (2 Màn hình)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Bài học độc lập */}
      <section style={{ width: '100%', maxWidth: '1200px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '16px' }}>
          📖 Danh mục Bài giảng độc lập
        </h2>

        {loading ? (
          <p style={{ color: '#94a3b8', fontSize: '20px' }}>Đang tải bài học...</p>
        ) : lessons.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '20px' }}>Không tìm thấy bài học nào.</p>
        ) : (
          <div className={styles.lessonGrid}>
            {lessons.map((lesson) => {
              const offline = offlineStatuses[lesson.id];
              const isVietnamese = lesson.subject === 'vietnamese';

              return (
                <div key={lesson.id} className={styles.lessonCard}>
                  <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                  <p className={styles.lessonMeta}>
                    {isVietnamese ? '📖 Tiếng Việt' : '🧮 Toán'} · Lớp {lesson.grade} ·{' '}
                    {lesson.slides.length} slide ·{' '}
                    <span
                      style={{
                        color: lesson.status === 'publish' ? '#22c55e' : '#f59e0b',
                        fontWeight: 700,
                      }}
                    >
                      {lesson.status === 'publish' ? 'Xuất bản (Publish)' : 'Bản nháp (Draft)'}
                    </span>
                  </p>
                  {lesson.description && (
                    <p className={styles.lessonDesc}>{lesson.description}</p>
                  )}

                  {/* Offline Status Report */}
                  {offline && (
                    <div style={{ marginTop: '14px', fontSize: '13px' }}>
                      {offline.status === 'downloading' && (
                        <span style={{ color: '#38bdf8' }}>⏳ Đang tải file ({offline.cached}/{offline.total})...</span>
                      )}
                      {offline.status === 'ready' && (
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>
                          ✅ Đã sẵn sàng Offline (Đủ {offline.cached}/{offline.total} file)
                        </span>
                      )}
                      {offline.status === 'error' && (
                        <div style={{ color: '#ef4444', fontWeight: 600 }}>
                          ⚠️ Thiếu {offline.missing.length} file:
                          <ul style={{ margin: '4px 0 0 16px', fontSize: '12px' }}>
                            {offline.missing.map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.actions}>
                    <button
                      className={styles.btnDual}
                      onClick={() => handleStartClassroom(lesson.id)}
                      title="Mở màn hình TV riêng để chiếu và chuyển tab này sang Bảng điều khiển"
                      data-testid={`start-lesson-${lesson.id}`}
                    >
                      🚀 Bắt đầu dạy học (Mở 2 màn hình)
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={() => handlePresent(lesson.id)}
                      title="Chỉ mở màn hình hiển thị TV"
                    >
                      📺 Xem TV
                    </button>
                    <button
                      className={`${styles.btn} ${styles.btnSecondary}`}
                      onClick={() => handlePresenter(lesson.id)}
                      title="Chỉ mở Bảng điều khiển giáo viên"
                    >
                      🎛️ Điều khiển
                    </button>
                    <button
                      className={`${styles.btn}`}
                      style={{ background: '#0891b2', color: '#fff' }}
                      onClick={() => navigate(`/print-worksheet?source=${lesson.id}`)}
                      title="In phiếu bài tập A4 cho bài này"
                    >
                      🖨️ In phiếu A4
                    </button>
                    <button
                      className={`${styles.btn}`}
                      style={{ background: '#0284c7', color: '#fff' }}
                      onClick={() => handleCacheLesson(lesson)}
                      title="Tải toàn bộ media vào bộ nhớ đệm offline"
                    >
                      💾 Nạp Offline
                    </button>
                    {getCustomLessons().some((cl) => cl.id === lesson.id) && (
                      <>
                        <button
                          className={`${styles.btn}`}
                          style={{ background: '#4f46e5', color: '#fff' }}
                          onClick={() => navigate(`/editor?lesson=${lesson.id}`)}
                          title="Chỉnh sửa nội dung bài này"
                        >
                          ✏️ Sửa bài
                        </button>
                        <button
                          className={`${styles.btn}`}
                          style={{ background: '#dc2626', color: '#fff' }}
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
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <ClassroomManagerModal
        isOpen={isClassroomModalOpen}
        onClose={() => setIsClassroomModalOpen(false)}
        students={classroomData.students}
        teams={classroomData.teams}
      />

      <div className={styles.footer}>
        <button
          className={`${styles.btn} ${styles.btnTest}`}
          onClick={() => navigate('/hardware-test')}
        >
          🔧 Kiểm tra phần cứng
        </button>
      </div>
    </div>
  );
}
