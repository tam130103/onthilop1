import { useEffect, useState } from 'react';
import styles from './StarRewardOverlay.module.css';

export interface StarRewardOverlayProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
  subMessage?: string;
}

export function StarRewardOverlay({
  show,
  onComplete,
  message = '⭐ BÉ GIỎI LẮM! ⭐',
  subMessage = 'Trả lời hoàn toàn chính xác!',
}: StarRewardOverlayProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} data-testid="star-reward-overlay">
      <div className={styles.content}>
        <div className={styles.starIcon}>🌟</div>
        <h2 className={styles.text}>{message}</h2>
        <p className={styles.subtext}>{subMessage}</p>
      </div>
    </div>
  );
}
