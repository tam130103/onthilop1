import { useState, useCallback, useEffect } from 'react';
import { getAudioManager } from '@/core/audio-manager';
import styles from './TapPlaceView.module.css';

export interface TapPlaceTarget {
  id: string;
  label: string;
  x?: number;
  y?: number;
  prefixText?: string;
  suffixText?: string;
}

export interface TapPlaceItem {
  id: string;
  label: string;
  image?: string;
  audio?: string;
  isPhonemeOrWord?: boolean;
}

export interface TapPlaceViewProps {
  prompt: string;
  targets: TapPlaceTarget[];
  items: TapPlaceItem[];
  correctMapping: Record<string, string>; // itemId -> targetId
  explanation?: string;
  showAnswer: boolean;
  onAnswer?: (mapping: Record<string, string>, isCorrect: boolean) => void;
  initialMapping?: Record<string, string>;
  hidePrompt?: boolean;
}

export function TapPlaceView({
  prompt,
  targets,
  items,
  correctMapping,
  explanation,
  showAnswer,
  onAnswer,
  initialMapping = {},
  hidePrompt = false,
}: TapPlaceViewProps) {
  // mapping: targetId -> itemId (which item is placed in which target slot)
  const [placedItems, setPlacedItems] = useState<Record<string, string>>(initialMapping);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Sync with initialMapping if it changes
  useEffect(() => {
    if (Object.keys(initialMapping).length > 0) {
      setPlacedItems(initialMapping);
    }
  }, [initialMapping]);

  // Audio helper
  const playItemAudio = useCallback((audioPath?: string) => {
    if (audioPath) {
      getAudioManager().play(audioPath);
    }
  }, []);

  // Check correctness helper
  const checkCorrectness = useCallback(
    (currentPlaced: Record<string, string>): boolean => {
      // correctMapping is itemId -> targetId
      // currentPlaced is targetId -> itemId
      const requiredItemIds = Object.keys(correctMapping);
      for (const itemId of requiredItemIds) {
        const expectedTarget = correctMapping[itemId];
        if (!expectedTarget || currentPlaced[expectedTarget] !== itemId) {
          return false;
        }
      }
      return true;
    },
    [correctMapping]
  );

  // Tap-Tap 1: Click item in bottom pool
  const handleSelectItem = useCallback(
    (itemId: string) => {
      if (showAnswer) return;
      const item = items.find((it) => it.id === itemId);
      playItemAudio(item?.audio);

      if (selectedItemId === itemId) {
        setSelectedItemId(null); // deselect
      } else {
        setSelectedItemId(itemId);
      }
    },
    [selectedItemId, showAnswer, items, playItemAudio]
  );

  // Tap-Tap 2: Click target slot
  const handleSlotClick = useCallback(
    (targetId: string) => {
      if (showAnswer) return;

      setPlacedItems((prev) => {
        const next = { ...prev };
        const existingItemId = next[targetId];

        // Case A: A bottom item is currently selected -> place it in this slot
        if (selectedItemId) {
          // If this selected item was already in another slot, remove from there
          for (const tId of Object.keys(next)) {
            if (next[tId] === selectedItemId) {
              delete next[tId];
            }
          }
          next[targetId] = selectedItemId;
          setSelectedItemId(null);
        } else if (existingItemId) {
          // Case B: No item selected, but slot is filled -> clicking removes it back to pool
          delete next[targetId];
        }

        const isCorrect = checkCorrectness(next);
        onAnswer?.(next, isCorrect);
        return next;
      });
    },
    [selectedItemId, showAnswer, checkCorrectness, onAnswer]
  );

  // Drag and Drop handlers
  const handleDragStart = useCallback(
    (e: React.DragEvent, itemId: string) => {
      e.dataTransfer.setData('text/plain', itemId);
      setSelectedItemId(itemId);
      const item = items.find((it) => it.id === itemId);
      playItemAudio(item?.audio);
    },
    [items, playItemAudio]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData('text/plain') || selectedItemId;
      if (!itemId) return;

      setPlacedItems((prev) => {
        const next = { ...prev };
        for (const tId of Object.keys(next)) {
          if (next[tId] === itemId) {
            delete next[tId];
          }
        }
        next[targetId] = itemId;
        setSelectedItemId(null);
        const isCorrect = checkCorrectness(next);
        onAnswer?.(next, isCorrect);
        return next;
      });
    },
    [selectedItemId, checkCorrectness, onAnswer]
  );

  // Keyboard 1-9 shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= items.length) {
        const targetItem = items[num - 1];
        if (!targetItem) return;

        // Find first empty target slot
        const emptyTarget = targets.find((t) => !placedItems[t.id]);
        if (emptyTarget) {
          setPlacedItems((prev) => {
            const next = { ...prev, [emptyTarget.id]: targetItem.id };
            const isCorrect = checkCorrectness(next);
            onAnswer?.(next, isCorrect);
            return next;
          });
          playItemAudio(targetItem.audio);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, targets, placedItems, checkCorrectness, onAnswer, playItemAudio]);

  const placedItemIds = new Set(Object.values(placedItems));

  return (
    <div className={styles.container} data-testid="tap-place-container">
      {!hidePrompt && <div className={styles.prompt}>{prompt}</div>}

      {/* Target slots with prefix/suffix text */}
      <div className={styles.slotsContainer}>
        {targets.map((target) => {
          const placedId = placedItems[target.id];
          const placedItem = items.find((it) => it.id === placedId);

          let slotStateClass = '';
          if (showAnswer) {
            // Find expected item for this target
            const expectedItemId = Object.keys(correctMapping).find(
              (id) => correctMapping[id] === target.id
            );
            if (placedId === expectedItemId) {
              slotStateClass = styles.slotBoxCorrect ?? '';
            } else {
              slotStateClass = styles.slotBoxIncorrect ?? '';
            }
          } else if (placedItem) {
            slotStateClass = styles.slotBoxFilled ?? '';
          } else if (selectedItemId) {
            slotStateClass = styles.slotBoxActive ?? '';
          }

          return (
            <div key={target.id} className={styles.slotWrapper}>
              {target.prefixText && (
                <span className={styles.prefixText}>{target.prefixText}</span>
              )}

              <div
                data-testid={`slot-${target.id}`}
                className={`${styles.slotBox} ${slotStateClass}`}
                onClick={() => handleSlotClick(target.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, target.id)}
                title={placedItem ? 'Chạm để tháo thẻ ra' : 'Chạm để đặt thẻ vào'}
              >
                {placedItem ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {placedItem.image && (
                      <img src={placedItem.image} alt="" className={styles.itemImage} />
                    )}
                    <span className={styles.itemLabel}>{placedItem.label}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: '24px', color: '#64748b' }}>
                    {target.label || '...'}
                  </span>
                )}
              </div>

              {target.suffixText && (
                <span className={styles.suffixText}>{target.suffixText}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Items pool at bottom */}
      <div className={styles.itemsPool}>
        {items.map((item, index) => {
          const isPlaced = placedItemIds.has(item.id);
          const isSelected = selectedItemId === item.id;

          let cardClass = styles.itemCard;
          if (isSelected) cardClass += ` ${styles.itemCardSelected}`;
          if (isPlaced) cardClass += ` ${styles.itemCardDisabled}`;

          return (
            <div
              key={item.id}
              data-testid={`pool-item-${item.id}`}
              className={cardClass}
              onClick={() => !isPlaced && handleSelectItem(item.id)}
              draggable={!isPlaced}
              onDragStart={(e) => handleDragStart(e, item.id)}
              style={{ position: 'relative' }}
            >
              {item.image && (
                <img src={item.image} alt="" className={styles.itemImage} />
              )}
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.keyHint}>{index + 1}</span>
            </div>
          );
        })}
      </div>

      {!hidePrompt && showAnswer && explanation && (
        <div className={styles.explanation}>{explanation}</div>
      )}
    </div>
  );
}
