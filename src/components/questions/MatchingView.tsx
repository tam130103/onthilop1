import { useState, useCallback, useRef, useEffect } from 'react';
import { getAudioManager } from '@/core/audio-manager';
import styles from './MatchingView.module.css';

export interface MatchingItem {
  id: string;
  label: string;
  image?: string;
  audio?: string;
  isPhonemeOrWord?: boolean;
}

export interface MatchingPair {
  leftId: string;
  rightId: string;
}

export interface MatchingViewProps {
  prompt: string;
  leftColumn: MatchingItem[];
  rightColumn: MatchingItem[];
  correctPairs: MatchingPair[];
  explanation?: string;
  showAnswer: boolean;
  onAnswer?: (pairs: MatchingPair[], isCorrect: boolean) => void;
  initialPairs?: MatchingPair[];
  hidePrompt?: boolean;
}

const PAIR_COLORS = ['#38bdf8', '#f472b6', '#a78bfa', '#fb923c', '#4ade80', '#fbbf24'];

export function MatchingView({
  prompt,
  leftColumn,
  rightColumn,
  correctPairs,
  explanation,
  showAnswer,
  onAnswer,
  initialPairs = [],
  hidePrompt = false,
}: MatchingViewProps) {
  const [pairs, setPairs] = useState<MatchingPair[]>(initialPairs);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rightItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [lineCoords, setLineCoords] = useState<
    Array<{ x1: number; y1: number; x2: number; y2: number; color: string; isCorrect?: boolean }>
  >([]);

  useEffect(() => {
    if (initialPairs.length > 0) {
      setPairs(initialPairs);
    }
  }, [initialPairs]);

  const checkCorrectness = useCallback(
    (currentPairs: MatchingPair[]): boolean => {
      if (currentPairs.length !== correctPairs.length) return false;
      for (const pair of currentPairs) {
        const match = correctPairs.some(
          (cp) => cp.leftId === pair.leftId && cp.rightId === pair.rightId
        );
        if (!match) return false;
      }
      return true;
    },
    [correctPairs]
  );

  const playAudio = useCallback((audioPath?: string) => {
    if (audioPath) {
      getAudioManager().play(audioPath);
    }
  }, []);

  // Update line coordinates
  const updateLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newLines = pairs.map((pair, index) => {
      const leftEl = leftItemRefs.current.get(pair.leftId);
      const rightEl = rightItemRefs.current.get(pair.rightId);
      const color = PAIR_COLORS[index % PAIR_COLORS.length] || '#38bdf8';

      let isCorrect: boolean | undefined = undefined;
      if (showAnswer) {
        isCorrect = correctPairs.some(
          (cp) => cp.leftId === pair.leftId && cp.rightId === pair.rightId
        );
      }

      if (!leftEl || !rightEl) {
        return { x1: 0, y1: 0, x2: 0, y2: 0, color, isCorrect };
      }

      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      return {
        x1: leftRect.right - containerRect.left,
        y1: leftRect.top + leftRect.height / 2 - containerRect.top,
        x2: rightRect.left - containerRect.left,
        y2: rightRect.top + rightRect.height / 2 - containerRect.top,
        color: showAnswer ? (isCorrect ? '#22c55e' : '#ef4444') : color,
        isCorrect,
      };
    });

    setLineCoords(newLines);
  }, [pairs, showAnswer, correctPairs]);

  useEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [updateLines]);

  const connectItems = useCallback(
    (leftId: string, rightId: string) => {
      setPairs((prev) => {
        // Remove any existing pair containing either leftId or rightId
        const filtered = prev.filter(
          (p) => p.leftId !== leftId && p.rightId !== rightId
        );
        const next = [...filtered, { leftId, rightId }];
        const isCorrect = checkCorrectness(next);
        onAnswer?.(next, isCorrect);
        return next;
      });
      setSelectedLeft(null);
      setSelectedRight(null);
    },
    [checkCorrectness, onAnswer]
  );

  const handleLeftClick = useCallback(
    (id: string) => {
      if (showAnswer) return;
      const item = leftColumn.find((it) => it.id === id);
      playAudio(item?.audio);

      // If already connected, clicking unconnects it
      const existingPair = pairs.find((p) => p.leftId === id);
      if (existingPair && selectedRight === null) {
        const next = pairs.filter((p) => p.leftId !== id);
        setPairs(next);
        onAnswer?.(next, checkCorrectness(next));
        return;
      }

      if (selectedRight) {
        connectItems(id, selectedRight);
      } else {
        setSelectedLeft(selectedLeft === id ? null : id);
      }
    },
    [showAnswer, leftColumn, playAudio, pairs, selectedRight, selectedLeft, connectItems, onAnswer, checkCorrectness]
  );

  const handleRightClick = useCallback(
    (id: string) => {
      if (showAnswer) return;
      const item = rightColumn.find((it) => it.id === id);
      playAudio(item?.audio);

      // If already connected, clicking unconnects it
      const existingPair = pairs.find((p) => p.rightId === id);
      if (existingPair && selectedLeft === null) {
        const next = pairs.filter((p) => p.rightId !== id);
        setPairs(next);
        onAnswer?.(next, checkCorrectness(next));
        return;
      }

      if (selectedLeft) {
        connectItems(selectedLeft, id);
      } else {
        setSelectedRight(selectedRight === id ? null : id);
      }
    },
    [showAnswer, rightColumn, playAudio, pairs, selectedLeft, selectedRight, connectItems, onAnswer, checkCorrectness]
  );

  return (
    <div className={styles.container} ref={containerRef} data-testid="matching-container">
      {!hidePrompt && <div className={styles.prompt}>{prompt}</div>}

      <div className={styles.columnsWrapper}>
        {/* Left Column */}
        <div className={styles.column}>
          {leftColumn.map((item) => {
            const pairIndex = pairs.findIndex((p) => p.leftId === item.id);
            const isConnected = pairIndex >= 0;
            const isSelected = selectedLeft === item.id;
            const color = isConnected ? PAIR_COLORS[pairIndex % PAIR_COLORS.length] : undefined;

            let cardClass = styles.card;
            if (isSelected) cardClass += ` ${styles.cardSelected}`;
            else if (isConnected) cardClass += ` ${styles.cardConnected}`;

            if (showAnswer && isConnected) {
              const pair = pairs[pairIndex];
              const isCorrect = pair && correctPairs.some(
                (cp) => cp.leftId === pair.leftId && cp.rightId === pair.rightId
              );
              cardClass += isCorrect ? ` ${styles.cardCorrect}` : ` ${styles.cardIncorrect}`;
            }

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) leftItemRefs.current.set(item.id, el);
                }}
                data-testid={`match-left-${item.id}`}
                className={cardClass}
                onClick={() => handleLeftClick(item.id)}
              >
                <div className={styles.cardContent}>
                  {item.image && (
                    <img src={item.image} alt="" className={styles.cardImage} />
                  )}
                  <span className={styles.cardLabel}>{item.label}</span>
                </div>
                {isConnected && (
                  <span className={styles.badge} style={{ background: color }}>
                    {pairIndex + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* SVG lines overlay */}
        <svg className={styles.svgOverlay}>
          {lineCoords.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.color}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={line.isCorrect === false ? '8 8' : undefined}
            />
          ))}
        </svg>

        {/* Right Column */}
        <div className={styles.column}>
          {rightColumn.map((item) => {
            const pairIndex = pairs.findIndex((p) => p.rightId === item.id);
            const isConnected = pairIndex >= 0;
            const isSelected = selectedRight === item.id;
            const color = isConnected ? PAIR_COLORS[pairIndex % PAIR_COLORS.length] : undefined;

            let cardClass = styles.card;
            if (isSelected) cardClass += ` ${styles.cardSelected}`;
            else if (isConnected) cardClass += ` ${styles.cardConnected}`;

            if (showAnswer && isConnected) {
              const pair = pairs[pairIndex];
              const isCorrect = pair && correctPairs.some(
                (cp) => cp.leftId === pair.leftId && cp.rightId === pair.rightId
              );
              cardClass += isCorrect ? ` ${styles.cardCorrect}` : ` ${styles.cardIncorrect}`;
            }

            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) rightItemRefs.current.set(item.id, el);
                }}
                data-testid={`match-right-${item.id}`}
                className={cardClass}
                onClick={() => handleRightClick(item.id)}
              >
                {isConnected && (
                  <span className={styles.badge} style={{ background: color }}>
                    {pairIndex + 1}
                  </span>
                )}
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{item.label}</span>
                  {item.image && (
                    <img src={item.image} alt="" className={styles.cardImage} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!hidePrompt && showAnswer && explanation && (
        <div className={styles.explanation}>{explanation}</div>
      )}
    </div>
  );
}

