import { useState, useCallback, useEffect } from 'react';
import { getAudioManager } from '@/core/audio-manager';
import styles from './PhonicsFlashcard.module.css';

export interface FlashcardData {
  id: string;
  frontText: string;
  backText?: string;
  phoneme?: string;
  image?: string;
  audio?: string;
}

export interface PhonicsFlashcardProps {
  cards: FlashcardData[];
  title?: string;
}

export function PhonicsFlashcard({ cards, title = 'Thẻ Học Vần' }: PhonicsFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const playCardAudio = useCallback(() => {
    if (currentCard?.audio) {
      getAudioManager().play(currentCard.audio);
    }
  }, [currentCard]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    playCardAudio();
  }, [playCardAudio]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // Space flips card, leaving ArrowRight/ArrowLeft for global slide navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) {
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleFlip]);

  if (!currentCard) return null;

  return (
    <div className={styles.container} data-testid="phonics-flashcard">
      <div className={styles.title}>{title}</div>

      <div
        className={styles.cardOuter}
        onClick={handleFlip}
        title="Bấm hoặc nhấn Space để lật thẻ"
        data-testid="flashcard-click-area"
      >
        <div className={`${styles.cardInner} ${isFlipped ? styles.cardFlipped : ''}`}>
          {/* Front */}
          <div className={styles.cardFront}>
            <div className={styles.bigLetter}>{currentCard.frontText}</div>
            {currentCard.phoneme && (
              <div className={styles.subLetter}>/{currentCard.phoneme}/</div>
            )}
            <div style={{ color: '#64748b', fontSize: '18px' }}>Chạm để lật mặt sau</div>
          </div>

          {/* Back */}
          <div className={styles.cardBack}>
            {currentCard.image && (
              <img src={currentCard.image} alt="" className={styles.cardImage} />
            )}
            <div className={styles.wordText}>
              {currentCard.backText || currentCard.frontText}
            </div>
            <div style={{ color: '#bae6fd', fontSize: '18px' }}>🔊 Đang phát âm</div>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={handlePrev}>
          ◀ Thẻ trước
        </button>
        <button
          className={styles.btn}
          style={{ background: '#2563eb' }}
          onClick={playCardAudio}
        >
          🔊 Phát âm
        </button>
        <button className={styles.btn} onClick={handleNext}>
          Thẻ sau ▶
        </button>
      </div>
    </div>
  );
}

