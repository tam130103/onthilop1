import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonSchema, type Lesson } from '@/schemas/content.schema';
import { getClassroomStore, type ClassroomData } from '@/core/classroom-store';
import { ClassroomManagerModal } from '@/components/classroom/ClassroomManagerModal';
import styles from './HomePage.module.css';

const LESSON_MANIFEST = [
  '/content/lessons/math-lesson-01.json',
  '/content/lessons/math-lesson-02.json',
  '/content/lessons/vn-lesson-01.json',
  '/content/lessons/vn-lesson-02.json',
];

interface OfflineStatus {
  status: 'idle' | 'downloading' | 'ready' | 'error';
  total: number;
  cached: number;
  missing: string[];
}

export function HomePage() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [offlineReady, setOfflineReady] = useState(false);
  const [offlineStatuses, setOfflineStatuses] = useState<Record<string, OfflineStatus>>({});
  const [globalOfflineMsg, setGlobalOfflineMsg] = useState<string | null>(null);
  const [classroomData, setClassroomData] = useState<ClassroomData>(getClassroomStore().getData());
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);

  useEffect(() => {
    return getClassroomStore().subscribe(setClassroomData);
  }, []);

  useEffect(() => {
    async function loadLessons() {
      const loaded: Lesson[] = [];
      for (const url of LESSON_MANIFEST) {
        try {
          const resp = await fetch(url);
          const json: unknown = await resp.json();
          const parsed = LessonSchema.safeParse(json);
          if (parsed.success) {
            loaded.push(parsed.data);
          } else {
            console.warn(`Invalid lesson ${url}:`, parsed.error.issues);
          }
        } catch (e) {
          console.warn(`Failed to load ${url}:`, e);
        }
      }
      setLessons(loaded);
      setLoading(false);
    }
    loadLessons();
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
      const cache = await caches.open('media-cache');
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
      const cache = await caches.open('media-cache');
      const allUrls = new Set<string>(LESSON_MANIFEST);

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
      // Mở màn TV ở cửa sổ riêng để giáo viên kéo sang màn TV / máy chiếu ngoài
      window.open(
        `/present?lesson=${lessonId}`,
        'tv_presentation_screen',
        'width=1280,height=720,menubar=no,toolbar=no,location=no'
      );
      // Chuyển tab hiện tại của laptop thành Bảng điều khiển
      navigate(`/presenter?lesson=${lessonId}`);
    },
    [navigate]
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Trình Chiếu Lớp 1</h1>
        <p className={styles.subtitle}>Công cụ giảng dạy tương tác Toán & Tiếng Việt — Offline PWA</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
          <div className={styles.statusBar}>
            <span
              className={`${styles.statusDot} ${offlineReady ? styles.statusOnline : styles.statusOffline}`}
            />
            <span className={styles.statusText}>
              {offlineReady ? 'PWA Service Worker: Sẵn sàng' : 'PWA: Đang tải...'}
            </span>
          </div>
          <button
            onClick={handleCacheAllOffline}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
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
            📥 Kiểm tra & tải offline toàn bộ
          </button>
          <button
            onClick={() => setIsClassroomModalOpen(true)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
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
                <h2 className={styles.lessonTitle}>{lesson.title}</h2>
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
                    style={{ background: '#0284c7', color: '#fff' }}
                    onClick={() => handleCacheLesson(lesson)}
                    title="Tải toàn bộ media vào bộ nhớ đệm offline"
                  >
                    💾 Tải sẵn Offline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
