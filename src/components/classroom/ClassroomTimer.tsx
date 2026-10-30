import type { ClassroomTimerState } from '@/core/classroom-store';
import styles from './ClassroomTimer.module.css';

export interface ClassroomTimerProps {
  timer: ClassroomTimerState;
  isPresenter?: boolean;
  onStart?: (seconds: number) => void;
  onStop?: () => void;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function ClassroomTimer({
  timer,
  isPresenter = false,
  onStart,
  onStop,
}: ClassroomTimerProps) {
  if (isPresenter) {
    return (
      <div className={styles.presenterCard} data-testid="presenter-timer-controls">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>
            ⏱️ ĐỒNG HỒ ĐẾM NGƯỢC
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 800, color: timer.isRunning ? '#38bdf8' : '#64748b' }}>
            {formatTime(timer.remainingSeconds)}
          </span>
        </div>

        <div className={styles.presetGrid}>
          <button className={styles.presetBtn} onClick={() => onStart?.(15)}>
            15s
          </button>
          <button className={styles.presetBtn} onClick={() => onStart?.(30)}>
            30s
          </button>
          <button className={styles.presetBtn} onClick={() => onStart?.(60)}>
            1 phút
          </button>
          <button className={styles.presetBtn} onClick={() => onStart?.(120)}>
            2 phút
          </button>
        </div>

        {timer.isRunning && (
          <button className={styles.stopBtn} onClick={onStop}>
            ⏹️ Dừng đồng hồ
          </button>
        )}
      </div>
    );
  }

  // TV Display
  if (!timer.isRunning && timer.remainingSeconds === 0) return null;

  const isUrgent = timer.isRunning && timer.remainingSeconds <= 5 && timer.remainingSeconds > 0;

  return (
    <div
      className={`${styles.timerContainer} ${timer.isRunning ? styles.timerRunning : ''} ${isUrgent ? styles.timerUrgent : ''}`}
      data-testid="tv-classroom-timer"
    >
      <span style={{ fontSize: '24px' }}>⏱️</span>
      <span className={styles.clockDisplay} style={{ color: isUrgent ? '#ef4444' : '#f8fafc' }}>
        {formatTime(timer.remainingSeconds)}
      </span>
    </div>
  );
}

