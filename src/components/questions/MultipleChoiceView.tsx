import { useState, useCallback } from 'react';
import styles from './MultipleChoiceView.module.css';

interface MultipleChoiceOption {
  id: string;
  label: string;
  image?: string;
}

interface MultipleChoiceViewProps {
  prompt: string;
  illustration?: string;
  options: MultipleChoiceOption[];
  correctOptionId: string;
  explanation?: string;
  showAnswer: boolean;
  onAnswer: (optionId: string, isCorrect: boolean) => void;
}

export function MultipleChoiceView({
  prompt,
  illustration,
  options,
  correctOptionId,
  explanation,
  showAnswer,
  onAnswer,
}: MultipleChoiceViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (optionId: string) => {
      if (selectedId !== null) return; // already answered
      setSelectedId(optionId);
      const isCorrect = optionId === correctOptionId;
      onAnswer(optionId, isCorrect);
    },
    [selectedId, correctOptionId, onAnswer]
  );

  const getOptionClass = (optionId: string): string => {
    const classes = [styles.option];
    if (selectedId === optionId) {
      classes.push(styles.selected);
    }
    if (showAnswer) {
      if (optionId === correctOptionId) {
        classes.push(styles.correct ?? '');
      } else if (selectedId === optionId) {
        classes.push(styles.incorrect ?? '');
      }
    }
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>{prompt}</div>
      {illustration && (
        <img src={illustration} alt="" className={styles.illustration} />
      )}
      <div className={styles.optionsGrid}>
        {options.map((option) => (
          <button
            key={option.id}
            className={getOptionClass(option.id)}
            onClick={() => handleSelect(option.id)}
            disabled={selectedId !== null && !showAnswer}
          >
            {option.image && (
              <img src={option.image} alt="" className={styles.optionImage} />
            )}
            <span className={styles.optionLabel}>{option.label}</span>
          </button>
        ))}
      </div>
      {showAnswer && explanation && (
        <div className={styles.explanation}>{explanation}</div>
      )}
    </div>
  );
}
