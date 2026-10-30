import { useEffect, useState } from 'react';
import type { Student } from '@/core/classroom-store';
import styles from './RandomPickerOverlay.module.css';

export interface RandomPickerOverlayProps {
  active: boolean;
  pickedStudent: Student | null;
  allStudents?: Student[];
  onClose: () => void;
}

export function RandomPickerOverlay({
  active,
  pickedStudent,
  allStudents = [],
  onClose,
}: RandomPickerOverlayProps) {
  const [displayName, setDisplayName] = useState<string>('');
  const [isRolling, setIsRolling] = useState(true);

  useEffect(() => {
    if (!active) {
      setIsRolling(true);
      return;
    }

    if (!pickedStudent) return;

    // Rolling animation for 1.5 seconds
    const presentPool = allStudents.filter((s) => !s.isAbsent);
    const pool = presentPool.length > 0 ? presentPool : [pickedStudent];

    setIsRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      const random = pool[Math.floor(Math.random() * pool.length)];
      if (random) setDisplayName(random.name);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setDisplayName(pickedStudent.name);
        setIsRolling(false);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [active, pickedStudent, allStudents]);

  if (!active) return null;

  return (
    <div className={styles.backdrop} data-testid="random-picker-overlay">
      <div className={styles.modal}>
        <div className={styles.title}>🎲 Bốc Thăm Học Sinh Trả Lời</div>

        <div className={styles.nameBox}>
          <div
            className={`${styles.studentName} ${isRolling ? styles.rolling : styles.winnerEffect}`}
            data-testid="picked-student-name"
          >
            {displayName || 'Đang quay số...'}
          </div>
        </div>

        {!isRolling && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            data-testid="picker-close-btn"
          >
            Tiếp tục bài giảng ➔
          </button>
        )}
      </div>
    </div>
  );
}

