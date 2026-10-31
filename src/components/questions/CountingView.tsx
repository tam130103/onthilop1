import { useState, useCallback, useMemo } from 'react';
import styles from './CountingView.module.css';

interface CountingItem {
  image: string;
  alt: string;
}

interface CountingViewProps {
  prompt: string;
  illustration?: string;
  items: CountingItem[];
  correctCount: number;
  numberRange: { min: number; max: number };
  explanation?: string;
  showAnswer: boolean;
  onAnswer: (selectedCount: number, isCorrect: boolean) => void;
  hidePrompt?: boolean;
}

export function CountingView({
  prompt,
  items,
  correctCount,
  numberRange,
  explanation,
  showAnswer,
  onAnswer,
  hidePrompt = false,
}: CountingViewProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const numbers = useMemo(() => {
    const nums: number[] = [];
    for (let i = numberRange.min; i <= numberRange.max; i++) {
      nums.push(i);
    }
    return nums;
  }, [numberRange]);

  const handleSelect = useCallback(
    (num: number) => {
      if (selectedNumber !== null) return;
      setSelectedNumber(num);
      onAnswer(num, num === correctCount);
    },
    [selectedNumber, correctCount, onAnswer]
  );

  const getNumberClass = (num: number): string => {
    const classes = [styles.numberBtn];
    if (selectedNumber === num) {
      classes.push(styles.selected ?? '');
    }
    if (showAnswer) {
      if (num === correctCount) {
        classes.push(styles.correct ?? '');
      } else if (selectedNumber === num) {
        classes.push(styles.incorrect ?? '');
      }
    }
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className={styles.container}>
      {!hidePrompt && <div className={styles.prompt}>{prompt}</div>}
      <div className={styles.itemsGrid}>
        {items.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <img src={item.image} alt={item.alt} className={styles.itemImage} />
          </div>
        ))}
      </div>
      <div className={styles.numberSelector}>
        {numbers.map((num) => (
          <button
            key={num}
            className={getNumberClass(num)}
            onClick={() => handleSelect(num)}
          >
            {num}
          </button>
        ))}
      </div>
      {!hidePrompt && showAnswer && explanation && (
        <div className={styles.explanation}>{explanation}</div>
      )}
    </div>
  );
}
