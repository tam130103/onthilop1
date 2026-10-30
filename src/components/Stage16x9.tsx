import { useRef, useEffect, useCallback, useState, type ReactNode } from 'react';
import styles from './Stage16x9.module.css';

interface Stage16x9Props {
  children: ReactNode;
  debugSafeArea?: boolean;
  blackout?: boolean;
  onToggleBlackout?: () => void;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export function Stage16x9({
  children,
  debugSafeArea = false,
  blackout = false,
  onToggleBlackout,
}: Stage16x9Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scaleX = vw / DESIGN_WIDTH;
    const scaleY = vh / DESIGN_HEIGHT;
    setScale(Math.min(scaleX, scaleY));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // Handle global F5 prevention, B blackout toggle, and preserve Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // 1. Chặn F5 (tránh reload do clicker bấm nhầm)
      if (e.key === 'F5') {
        e.preventDefault();
        return;
      }
      // 2. Giữ phím Escape: Không chặn e.preventDefault() để trình duyệt thoát Fullscreen hoặc đóng dialog tự nhiên
      if (e.key === 'Escape') {
        return;
      }
      // 3. Phím B: bật/tắt blackout
      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        onToggleBlackout?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onToggleBlackout]);

  // Fullscreen on double-click
  const handleDoubleClick = useCallback(() => {
    const el = stageRef.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen().catch(() => {});
    }
  }, []);

  return (
    <div className={styles.backdrop}>
      <div
        ref={stageRef}
        className={styles.stage}
        style={{ transform: `scale(${scale})` }}
        onDoubleClick={handleDoubleClick}
      >
        <div className={`${styles.safeArea} ${debugSafeArea ? styles.safeAreaDebug : ''}`}>
          {children}
        </div>
      </div>

      {/* Blackout phủ kín toàn bộ 100vw x 100vh của viewport, không chỉ riêng khung 16:9 */}
      {blackout && (
        <div
          data-testid="blackout-overlay"
          className={styles.blackoutOverlay}
          onClick={onToggleBlackout}
          title="Màn hình đang phủ đen. Nhấn phím B hoặc chạm chuột để tiếp tục buổi học"
        />
      )}
    </div>
  );
}
