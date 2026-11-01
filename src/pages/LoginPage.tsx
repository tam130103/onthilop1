import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signInWithPassword, setOfflineMode } from '@/core/auth-service';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  const defaultTeacherEmail = import.meta.env.VITE_TEACHER_EMAIL || 'cothutam@tieuhoc.edu.vn';
  const defaultAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@tieuhoc.edu.vn';
  const defaultParentEmail = import.meta.env.VITE_PARENT_EMAIL || 'phuhuynh@tieuhoc.edu.vn';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setLoading(true);

    try {
      const res = await signInWithPassword(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      } else {
        setSuccessMessage('Đăng nhập thành công! Đang chuyển hướng...');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 600);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối đến máy chủ xác thực.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (targetEmail: string) => {
    setEmail(targetEmail);
    // In local dev mode only, auto-fill demo password for quick testing convenience.
    // In production build, import.meta.env.DEV is false and dead-code eliminated.
    if (import.meta.env.DEV) {
      if (targetEmail === defaultAdminEmail) setPassword('Admin@123');
      else if (targetEmail === defaultTeacherEmail) setPassword('Giaovien@123');
      else if (targetEmail === defaultParentEmail) setPassword('Phuhuynh@123');
      else setPassword('');
    } else {
      setPassword('');
    }
    setErrorMessage(null);
  };

  const handleContinueOffline = () => {
    setOfflineMode(true);
    navigate(from, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <ThemeToggle showLabel={false} />
        </div>
        <div className={styles.brandHeader}>
          <div className={styles.brandIcon}>
            <span>🎓</span>
          </div>
          <h1 className={styles.title}>Trình Chiếu Lớp 1</h1>
          <p className={styles.subtitle}>
            Đăng nhập tài khoản giáo viên để đồng bộ dữ liệu với Supabase Cloud
          </p>
        </div>

        {/* Quick account email fill; passwords are never shipped to the browser. */}
        <div className={styles.quickAccounts}>
          <span className={styles.quickLabel}>Điền nhanh email tài khoản:</span>
          <div className={styles.quickBtnGroup}>
            <button
              type="button"
              className={styles.quickBtn}
              onClick={() => handleQuickFill(defaultTeacherEmail)}
              title="Điền nhanh tài khoản Giáo viên"
            >
              👩‍🏫 Cô Thu Tâm
            </button>
            <button
              type="button"
              className={styles.quickBtn}
              onClick={() => handleQuickFill(defaultAdminEmail)}
              title="Điền nhanh tài khoản Admin (Phân quyền)"
            >
              🛡️ Quản Trị Viên
            </button>
            <button
              type="button"
              className={styles.quickBtn}
              onClick={() => handleQuickFill(defaultParentEmail)}
              title="Điền nhanh tài khoản Phụ huynh (Chỉ học tập)"
            >
              👨‍👩‍👧 Phụ Huynh
            </button>
          </div>
          {import.meta.env.DEV && (
            <p style={{ margin: '8px 0 0', fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
              💡 <em>Chế độ Dev: Chọn tài khoản sẽ tự động điền sẵn mật khẩu mẫu.</em>
            </p>
          )}
        </div>

        {errorMessage && (
          <div className={styles.alertError} role="alert">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className={styles.alertSuccess} role="status">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email giáo viên:
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="cothutam@tieuhoc.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Mật khẩu:
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập Đồng Bộ Cloud'}
          </button>
        </form>

        <div className={styles.divider}>
          <span>HOẶC</span>
        </div>

        <div className={styles.offlineCard}>
          <div className={styles.offlineTitle}>
            <span>📶</span> Dạy học Ngoại tuyến (Offline Mode)
          </div>
          <div className={styles.offlineDesc}>
            Không cần Internet. Toàn bộ bài giảng, điểm số và học sinh sẽ lưu an toàn trong trình duyệt (IndexedDB).
          </div>
          <button
            type="button"
            className={styles.offlineBtn}
            onClick={handleContinueOffline}
          >
            Vào dạy Offline ngay
          </button>
        </div>

        <Link to="/" className={styles.backHomeLink}>
          ← Quay lại Trang chủ
        </Link>
      </div>
    </div>
  );
}
export default LoginPage;
