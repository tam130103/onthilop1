import { useState, useCallback } from 'react';
import styles from './NumberSelectView.module.css';

interface NumberSelectViewProps {
  prompt: string;
  expression: string;
  illustration?: string;
  choices: number[];
  correctAnswer: number;
  explanation?: string;
  showAnswer: boolean;
  onAnswer: (selected: number, isCorrect: boolean) => void;
}

export function NumberSelectView({
  prompt,
  expression,
  illustration,
  choices,
  correctAnswer,
  explanation,
  showAnswer,
  onAnswer,
}: NumberSelectViewProps) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleSelect = useCallback(
    (choice: number) => {
      if (selectedChoice !== null) return;
      setSelectedChoice(choice);
      onAnswer(choice, choice === correctAnswer);
    },
    [selectedChoice, correctAnswer, onAnswer]
  );

  const getChoiceClass = (choice: number): string => {
    const classes = [styles.choiceBtn];
    if (selectedChoice === choice) {
      classes.push(styles.selected ?? '');
    }
    if (showAnswer) {
      if (choice === correctAnswer) {
        classes.push(styles.correct ?? '');
      } else if (selectedChoice === choice) {
        classes.push(styles.incorrect ?? '');
      }
    }
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className={styles.container}>
      <div className={styles.prompt}>{prompt}</div>
      <div className={styles.expression}>{expression}</div>
      {illustration && (
        <img src={illustration} alt="" className={styles.illustration} />
      )}
      <div className={styles.choicesGrid}>
        {choices.map((choice) => (
          <button
            key={choice}
            className={getChoiceClass(choice)}
            onClick={() => handleSelect(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {showAnswer && explanation && (
        <div className={styles.explanation}>{explanation}</div>
      )}
    </div>
  );
}
