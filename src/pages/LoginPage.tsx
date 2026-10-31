import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signInWithPassword, signUpWithPassword, setOfflineMode } from '@/core/auth-service';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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

    if (password.length < 6) {
      setErrorMessage('Mật khẩu cần có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await signInWithPassword(email, password);
        if (!res.success) {
          setErrorMessage(res.error || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
        } else {
          setSuccessMessage('Đăng nhập thành công! Đang chuyển hướng...');
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 800);
        }
      } else {
        if (!fullName.trim()) {
          setErrorMessage('Vui lòng nhập Họ và Tên của cô giáo.');
          setLoading(false);
          return;
        }

        const res = await signUpWithPassword(email, password, fullName);
        if (!res.success) {
          setErrorMessage(res.error || 'Đăng ký tài khoản không thành công.');
        } else if (res.requireEmailConfirmation) {
          setSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra hòm thư email để xác nhận tài khoản.');
        } else {
          setSuccessMessage('Tạo tài khoản thành công! Đang vào hệ thống...');
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 800);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối đến máy chủ xác thực.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueOffline = () => {
    setOfflineMode(true);
    navigate(from, { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.brandHeader}>
          <div className={styles.brandIcon}>
            <span>🎓</span>
          </div>
          <h1 className={styles.title}>Trình Chiếu Lớp 1</h1>
          <p className={styles.subtitle}>
            Hệ thống bài giảng tương tác & Quản lý lớp học thông minh
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${mode === 'signin' ? styles.tabActive : ''}`}
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${mode === 'signup' ? styles.tabActive : ''}`}
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
          >
            Đăng ký cô giáo mới
          </button>
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
          {mode === 'signup' && (
            <div className={styles.inputGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Họ và Tên cô giáo:
              </label>
              <input
                id="fullName"
                type="text"
                className={styles.input}
                placeholder="Ví dụ: Cô Nguyễn Thu Tâm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email đăng nhập:
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="giaovien@school.edu.vn"
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
              placeholder="Ít nhất 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : mode === 'signin' ? 'Đăng Nhập Đồng Bộ Cloud' : 'Tạo Tài Khoản Giáo Viên'}
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
