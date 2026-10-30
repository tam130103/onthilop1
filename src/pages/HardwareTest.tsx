import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HardwareTest.module.css';

interface KeyEvent {
  key: string;
  code: string;
  timestamp: number;
}

export function HardwareTestPage() {
  const navigate = useNavigate();
  const [resolution, setResolution] = useState({ w: 0, h: 0 });
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const [keyLog, setKeyLog] = useState<KeyEvent[]>([]);
  const [audioTestStatus, setAudioTestStatus] = useState<'idle' | 'playing' | 'done'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Resolution detection
  useEffect(() => {
    const update = () => {
      setResolution({ w: window.screen.width, h: window.screen.height });
      setDevicePixelRatio(window.devicePixelRatio);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Key logger for clicker testing
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeyLog((prev) => [
        { key: e.key, code: e.code, timestamp: Date.now() },
        ...prev.slice(0, 49),
      ]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Audio test with oscillator (no file needed)
  const playTestTone = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 2);
      setAudioTestStatus('playing');
      setTimeout(() => {
        setAudioTestStatus('done');
        ctx.close();
      }, 2000);
    } catch (e) {
      console.error('Audio test failed:', e);
    }
  }, []);

  const is1080p = resolution.w >= 1920 && resolution.h >= 1080;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔧 Kiểm Tra Phần Cứng</h1>

      {/* Resolution Test */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📺 Độ phân giải màn hình</h2>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Màn hình:</span>
            <span className={styles.value}>{resolution.w} × {resolution.h}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Viewport:</span>
            <span className={styles.value}>{window.innerWidth} × {window.innerHeight}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Device Pixel Ratio:</span>
            <span className={styles.value}>{devicePixelRatio}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Tương thích 1080p:</span>
            <span className={styles.value} style={{ color: is1080p ? '#22c55e' : '#ef4444' }}>
              {is1080p ? '✅ Đạt' : '⚠️ Thấp hơn 1080p'}
            </span>
          </div>
        </div>
        <div className={styles.testPattern}>
          <div className={styles.colorBlock} style={{ background: '#ef4444', color: '#fff' }}>R</div>
          <div className={styles.colorBlock} style={{ background: '#22c55e', color: '#fff' }}>G</div>
          <div className={styles.colorBlock} style={{ background: '#3b82f6', color: '#fff' }}>B</div>
          <div className={styles.colorBlock} style={{ background: '#fff', color: '#000' }}>W</div>
        </div>
      </section>

      {/* Audio Test */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🔊 Kiểm tra âm thanh</h2>
        <p className={styles.info}>
          Phát tín hiệu 440Hz (nốt La) trong 2 giây. Hãy kiểm tra TV có phát được âm thanh không.
        </p>
        <button
          className={`${styles.btn} ${audioTestStatus === 'done' ? styles.btnSuccess : ''}`}
          onClick={playTestTone}
          disabled={audioTestStatus === 'playing'}
          style={{ marginTop: '16px' }}
        >
          {audioTestStatus === 'idle'
            ? '▶️ Phát thử âm thanh'
            : audioTestStatus === 'playing'
            ? '🔊 Đang phát...'
            : '✅ Đã phát xong'}
        </button>
      </section>

      {/* Clicker / Keyboard Test */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>⌨️ Kiểm tra bút trình chiếu / phím</h2>
        <p className={styles.info}>
          Nhấn các nút trên bút trình chiếu (Clicker) hoặc bàn phím. Phím sẽ hiện ở dưới.
          <br />
          Clicker thường gửi: <strong>ArrowRight</strong> (Next), <strong>ArrowLeft</strong> (Prev),{' '}
          <strong>F5 / Escape</strong>
        </p>
        <div className={styles.keyLog}>
          {keyLog.length === 0 ? (
            <div className={styles.keyEntry}>Chưa có phím nào được nhấn...</div>
          ) : (
            keyLog.map((entry, i) => (
              <div key={i} className={styles.keyEntry}>
                [{new Date(entry.timestamp).toLocaleTimeString()}] key=&quot;{entry.key}&quot; code=&quot;{entry.code}&quot;
              </div>
            ))
          )}
        </div>
      </section>

      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Quay lại trang chủ
      </button>
    </div>
  );
}
