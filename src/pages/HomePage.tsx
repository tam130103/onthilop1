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
import { subscribeAuth, signOut, getAuthState, type AuthState } from '@/core/auth-service';
import {
  MATH_STAGES,
  VIETNAMESE_STAGES,
  ENGLISH_STAGES,
  EXAMS_LIST,
  TOOLS_LIST,
  type CurriculumStage,
  type CurriculumLessonMeta,
} from '@/data/onthi-curriculum';
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
  const [activeSubjectTab, setActiveSubjectTab] = useState<'math' | 'vietnamese' | 'english' | 'custom'>('math');
  const [searchQuery, setSearchQuery] = useState('');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [popupBlockedLessonId, setPopupBlockedLessonId] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>(getAuthState());

  useEffect(() => {
    const unsub = subscribeAuth(setAuthState);
    return unsub;
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = useCallback(async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice?.outcome === 'accepted') {
      setInstallPrompt(null);
    }
  }, [installPrompt]);

  const handleCopyLessonLink = useCallback((id: string) => {
    const url = `${window.location.origin}/present?lesson=${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert(`🔗 Đã sao chép link trình chiếu bài học:\n${url}`);
      }).catch(() => {});
    }
  }, []);

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
      const tvWin = window.open(
        `/present?lesson=${lessonId}`,
        'tv_presentation_screen',
        'width=1280,height=720,menubar=no,toolbar=no,location=no'
      );
      if (!tvWin || tvWin.closed || typeof tvWin.closed === 'undefined') {
        setPopupBlockedLessonId(lessonId);
      }
      navigate(`/presenter?lesson=${lessonId}`);
    },
    [navigate]
  );

  // Khởi chạy Buổi dạy (Teaching Session) 2 Màn hình
  const handleStartSession = useCallback(
    (session: TeachingSession) => {
      const firstLessonId = session.steps.find((s) => s.lessonId)?.lessonId;
      const lessonQuery = firstLessonId ? `&lesson=${firstLessonId}` : '';
      const tvWin = window.open(
        `/present?session=${session.id}${lessonQuery}`,
        'tv_presentation_screen',
        'width=1280,height=720,menubar=no,toolbar=no,location=no'
      );
      if (!tvWin || tvWin.closed || typeof tvWin.closed === 'undefined') {
        setPopupBlockedLessonId(firstLessonId || session.id);
      }
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
            <button
              className={styles.navLink}
              onClick={() => navigate('/admin')}
              style={{ fontWeight: 800, color: '#2563eb' }}
              title="Trang quản trị toàn diện hệ thống: User, Bài giảng, Lớp học, Supabase"
            >
              ⚙️ Quản trị Admin
            </button>
            <a href="/onthi-preview.html" target="_blank" rel="noreferrer" className={styles.navLink} title="Xem bản mẫu thiết kế Stitch">
              Bản mẫu Stitch ↗
            </a>
          </nav>

          <div className={styles.navRight}>
            {installPrompt && (
              <button
                onClick={handleInstallApp}
                className={styles.utilityBtn}
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderBottom: '3px solid #059669',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
                title="Cài đặt ứng dụng trực tiếp vào máy tính/máy tính bảng"
              >
                📥 Cài App vào máy
              </button>
            )}
            {authState.isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  className={styles.userPill}
                  onClick={() => navigate('/admin')}
                  style={{ cursor: 'pointer' }}
                  title="Đã kết nối Supabase Cloud. Bấm để vào Admin"
                >
                  <div className={styles.avatar}>
                    {authState.user?.user_metadata?.full_name?.charAt(0) || authState.user?.email?.charAt(0).toUpperCase() || 'T'}
                  </div>
                  <span>
                    {authState.user?.user_metadata?.full_name || authState.user?.email?.split('@')[0] || 'Cô giáo'}
                  </span>
                  <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '2px 6px', borderRadius: '10px', fontWeight: 800 }}>
                    Cloud 🟢
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className={styles.utilityBtn}
                  style={{ padding: '6px 10px', fontSize: '13px', cursor: 'pointer' }}
                  title="Đăng xuất khỏi tài khoản Cloud"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={styles.utilityBtn}
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  border: 'none',
                  borderBottom: '3px solid #d97706',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                title="Đăng nhập để đồng bộ dữ liệu với Supabase Cloud"
              >
                <span>☁️</span> Đăng nhập Cloud
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className={styles.mainContainer}>
        {/* Popup Blocked Alert if applicable */}
        {popupBlockedLessonId && (
          <div
            style={{
              padding: '14px 20px',
              borderRadius: '16px',
              backgroundColor: '#fffbeb',
              color: '#b45309',
              border: '2px solid #fde68a',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <strong>⚠️ Trình duyệt chặn mở cửa sổ mới:</strong> Vui lòng cho phép popup để TV mở tự động, hoặc bấm nút bên dưới:
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={`/present?lesson=${popupBlockedLessonId}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                📺 Mở màn hình TV ngay
              </a>
              <button
                onClick={() => setPopupBlockedLessonId(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  color: '#92400e',
                  fontSize: '16px',
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

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

        {/* SECTION 3: HỌC THEO BẢN ĐỒ - TOÀN BỘ CHƯƠNG TRÌNH ONTHI.APP */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>🗺️</span> Học theo bản đồ · Chương trình Lớp 1 chuẩn onthi.app
            </h2>
            <span className={styles.sectionSubtitle}>
              Toán (48 bài · 11 chặng) · Tiếng Việt (132 bài · 17 chặng) · Tiếng Anh (16 Unit)
            </span>
          </div>

          {/* Subject Switcher Tabs */}
          <div className={styles.curriculumNav}>
            <button
              className={`${styles.subjectTab} ${activeSubjectTab === 'math' ? styles.subjectTabActiveMath : ''}`}
              onClick={() => setActiveSubjectTab('math')}
              data-testid="tab-math"
            >
              <span>🔢</span>
              <span>Toán Lớp 1</span>
              <span className={styles.tabPill}>48 bài · 11 chặng</span>
            </button>

            <button
              className={`${styles.subjectTab} ${activeSubjectTab === 'vietnamese' ? styles.subjectTabActiveVn : ''}`}
              onClick={() => setActiveSubjectTab('vietnamese')}
              data-testid="tab-vietnamese"
            >
              <span>📖</span>
              <span>Tiếng Việt Lớp 1</span>
              <span className={styles.tabPill}>132 bài · 17 chặng</span>
            </button>

            <button
              className={`${styles.subjectTab} ${activeSubjectTab === 'english' ? styles.subjectTabActiveEn : ''}`}
              onClick={() => setActiveSubjectTab('english')}
              data-testid="tab-english"
            >
              <span>🇬🇧</span>
              <span>Tiếng Anh Lớp 1</span>
              <span className={styles.tabPill}>16 Unit · Global Success</span>
            </button>

            <button
              className={`${styles.subjectTab} ${activeSubjectTab === 'custom' ? styles.subjectTabActiveCustom : ''}`}
              onClick={() => setActiveSubjectTab('custom')}
              data-testid="tab-custom"
            >
              <span>⭐</span>
              <span>Bài của cô</span>
              <span className={styles.tabPill}>{getCustomLessons().length} bài</span>
            </button>
          </div>

          {/* Search Box */}
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="🔍 Tìm nhanh bài học (vd: đếm số, phép cộng, âm o, vần an, unit 1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className={styles.btnPrintSmall}
                onClick={() => setSearchQuery('')}
                style={{ padding: '0 16px', borderRadius: '16px' }}
              >
                ✕ Xóa tìm kiếm
              </button>
            )}
          </div>

          {/* Render Curriculum Content */}
          {activeSubjectTab === 'custom' ? (
            /* Tab: Bài giáo viên tự soạn & bài mẫu tích hợp */
            loading ? (
              <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>Đang tải bài học...</p>
            ) : lessons.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>Chưa có bài soạn nào.</p>
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
                          </div>
                        )}
                      </div>

                      <div className={styles.actions}>
                        <button
                          className={styles.btnDual}
                          onClick={() => handleStartClassroom(lesson.id)}
                          data-testid={`start-lesson-${lesson.id}`}
                        >
                          🚀 Chiếu bài dạy (Mở 2 màn hình)
                        </button>

                        <div className={styles.secondaryRow}>
                          <button className={styles.btnTv} onClick={() => handlePresent(lesson.id)}>
                            📺 Xem TV
                          </button>
                          <button className={styles.btnTeacher} onClick={() => handlePresenter(lesson.id)}>
                            🎛️ Điều khiển
                          </button>
                        </div>

                        <div className={styles.secondaryRow}>
                          <button
                            className={styles.btnTeacher}
                            onClick={() => navigate(`/print-worksheet?source=${lesson.id}`)}
                          >
                            🖨️ In phiếu A4
                          </button>
                          <button
                            className={styles.btnTeacher}
                            onClick={() => handleCacheLesson(lesson)}
                          >
                            💾 Nạp Offline
                          </button>
                        </div>

                        {isCustom && (
                          <div className={styles.secondaryRow}>
                            <button
                              className={styles.btnTeacher}
                              onClick={() => navigate(`/editor?lesson=${lesson.id}`)}
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
            )
          ) : (
            /* Tab: Toán / Tiếng Việt / Tiếng Anh theo Chặng onthi.app */
            <div>
              {(activeSubjectTab === 'math'
                ? MATH_STAGES
                : activeSubjectTab === 'vietnamese'
                ? VIETNAMESE_STAGES
                : ENGLISH_STAGES
              )
                .map((stage) => {
                  const filteredLessons = stage.lessons.filter((l) => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase().trim();
                    return (
                      l.title.toLowerCase().includes(q) ||
                      l.description.toLowerCase().includes(q) ||
                      l.code.toLowerCase().includes(q)
                    );
                  });

                  if (filteredLessons.length === 0) return null;

                  return (
                    <div key={stage.id} className={styles.stageSection}>
                      <div className={styles.stageSectionHeader}>
                        <div className={styles.stageLeft}>
                          <div className={styles.stageIcon}>{stage.icon}</div>
                          <div>
                            <h3 className={styles.stageTitle}>
                              {stage.title}
                            </h3>
                            <span className={styles.stageCount}>
                              {filteredLessons.length} bài học tương tác có âm thanh
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.curriculumGrid}>
                        {filteredLessons.map((item) => (
                          <div key={item.id} className={styles.curriculumItem}>
                            <div>
                              <div className={styles.currItemTop}>
                                <span className={styles.codeBadge}>{item.code}</span>
                                <div>
                                  <div className={styles.currTitle}>{item.title}</div>
                                  <div className={styles.currDesc}>{item.description}</div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <button
                                className={styles.btnDual}
                                style={{ width: '100%', marginBottom: '8px', fontSize: '13px', padding: '10px' }}
                                onClick={() => handleStartClassroom(item.id)}
                                title="Bắt đầu chiếu với 2 màn hình (TV + Laptop giáo viên)"
                              >
                                🚀 Chiếu 2 Màn hình
                              </button>

                              <div className={styles.currActions}>
                                <button
                                  className={styles.btnTv}
                                  style={{ flex: 1, padding: '7px 8px', fontSize: '12px' }}
                                  onClick={() => handlePresent(item.id)}
                                  title="Chỉ mở màn hình TV học sinh"
                                >
                                  📺 TV
                                </button>
                                <button
                                  className={styles.btnTeacher}
                                  style={{ flex: 1, padding: '7px 8px', fontSize: '12px' }}
                                  onClick={() => handlePresenter(item.id)}
                                  title="Chỉ mở màn hình điều khiển cô giáo"
                                >
                                  🎛️ Bàn cô
                                </button>
                                <button
                                  className={styles.btnPrintSmall}
                                  onClick={() => navigate(`/print-worksheet?source=${item.id}`)}
                                  title="In phiếu bài tập A4"
                                >
                                  🖨️
                                </button>
                                <button
                                  className={styles.btnPrintSmall}
                                  onClick={() => handleCopyLessonLink(item.id)}
                                  title="Sao chép link trình chiếu bài học này"
                                >
                                  🔗
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </section>

        {/* SECTION: ĐỀ THI 4 KÌ CHUẨN (ONTHI.APP) */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>🏆</span> Đề thi 4 kì chuẩn GDPT 2018 (onthi.app)
            </h2>
            <span className={styles.sectionSubtitle}>
              Toán & Tiếng Việt · Đề Giữa HK1, Cuối HK1, Giữa HK2, Cuối năm có chấm điểm tức thì
            </span>
          </div>

          <div className={styles.examsGrid}>
            {EXAMS_LIST.map((exam) => (
              <div key={exam.id} className={styles.examCard}>
                <div>
                  <div className={styles.examHeader}>
                    <div className={styles.examIcon}>{exam.icon}</div>
                    <div>
                      <div className={styles.examTerm}>{exam.termLabel} · {exam.durationMinutes} phút</div>
                      <div className={styles.examTitle}>{exam.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '10px 0 0 0', lineHeight: 1.4 }}>
                    {exam.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    className={styles.btnDual}
                    style={{ flex: 1, fontSize: '13px', padding: '10px' }}
                    onClick={() => handleStartClassroom(exam.id)}
                  >
                    🚀 Bắt đầu làm bài thi
                  </button>
                  <button
                    className={styles.btnPrintSmall}
                    onClick={() => navigate(`/print-worksheet?source=${exam.id}`)}
                    title="In đề thi A4"
                  >
                    🖨️ In đề A4
                  </button>
                  <button
                    className={styles.btnPrintSmall}
                    onClick={() => handleCopyLessonLink(exam.id)}
                    title="Sao chép link đề thi"
                  >
                    🔗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Công cụ lớp 1 miễn phí (onthi.app) */}
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <span>🛠️</span> Công cụ Lớp 1 miễn phí (onthi.app)
            </h2>
            <span className={styles.sectionSubtitle}>
              Trợ giảng đắc lực cho giáo viên & học sinh lớp 1 tại lớp học
            </span>
          </div>

          <div className={styles.toolsGrid}>
            {TOOLS_LIST.map((tool) => (
              <div
                key={tool.id}
                className={styles.toolCard}
                onClick={() => {
                  if (tool.route.startsWith('/present')) {
                    const match = tool.route.match(/lesson=([^&]+)/);
                    if (match && match[1]) {
                      handleStartClassroom(match[1]);
                      return;
                    }
                  }
                  navigate(tool.route);
                }}
              >
                <div className={styles.toolIcon} style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}>
                  {tool.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={styles.toolTitle}>{tool.title}</span>
                    {tool.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          backgroundColor: '#fef3c7',
                          color: '#d97706',
                          padding: '1px 6px',
                          borderRadius: '8px',
                        }}
                      >
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <div className={styles.toolSubtitle}>{tool.description}</div>
                </div>
              </div>
            ))}

            <div className={styles.toolCard} onClick={() => setIsClassroomModalOpen(true)}>
              <div className={styles.toolIcon} style={{ backgroundColor: '#fef3c7', color: '#d97706' }}>
                ⚙️
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={styles.toolTitle}>Quản lý Lớp & 4 Tổ</span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      padding: '1px 6px',
                      borderRadius: '8px',
                    }}
                  >
                    Thi đua
                  </span>
                </div>
                <div className={styles.toolSubtitle}>Danh sách học sinh, vòng quay gọi tên ngẫu nhiên</div>
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
