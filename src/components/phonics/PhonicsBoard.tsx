import { useState, useCallback, useMemo } from 'react';
import { getAudioManager } from '@/core/audio-manager';
import styles from './PhonicsBoard.module.css';

export interface PhonicsBoardProps {
  initials?: string[];
  rhymes?: string[];
  tones?: string[];
  onCombine?: (result: string) => void;
}

const DEFAULT_INITIALS = ['b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x', 'th', 'ch', 'nh'];
const DEFAULT_RHYMES = ['a', 'o', 'ô', 'ơ', 'e', 'ê', 'i', 'u', 'ư', 'ai', 'ao', 'an', 'ang'];
const TONE_LIST = [
  { id: 'ngang', label: '—', name: 'Ngang' },
  { id: 'huyen', label: 'ˋ', name: 'Huyền' },
  { id: 'sac', label: 'ˊ', name: 'Sắc' },
  { id: 'hoi', label: '̉', name: 'Hỏi' },
  { id: 'nga', label: '˜', name: 'Ngã' },
  { id: 'nang', label: '̣', name: 'Nặng' },
];

// Tone mapping table for common Grade 1 vowels
const TONE_MAP: Record<string, Record<string, string>> = {
  a: { ngang: 'a', huyen: 'à', sac: 'á', hoi: 'ả', nga: 'ã', nang: 'ạ' },
  o: { ngang: 'o', huyen: 'ò', sac: 'ó', hoi: 'ỏ', nga: 'õ', nang: 'ọ' },
  ô: { ngang: 'ô', huyen: 'ồ', sac: 'ố', hoi: 'ổ', nga: 'ỗ', nang: 'ộ' },
  ơ: { ngang: 'ơ', huyen: 'ờ', sac: 'ớ', hoi: 'ở', nga: 'ỡ', nang: 'ợ' },
  e: { ngang: 'e', huyen: 'è', sac: 'é', hoi: 'ẻ', nga: 'ẽ', nang: 'ẹ' },
  ê: { ngang: 'ê', huyen: 'ề', sac: 'ế', hoi: 'ể', nga: 'ễ', nang: 'ệ' },
  i: { ngang: 'i', huyen: 'ì', sac: 'í', hoi: 'ỉ', nga: 'ĩ', nang: 'ị' },
  u: { ngang: 'u', huyen: 'ù', sac: 'ú', hoi: 'ủ', nga: 'ũ', nang: 'ụ' },
  ư: { ngang: 'ư', huyen: 'ừ', sac: 'ứ', hoi: 'ử', nga: 'ữ', nang: 'ự' },
};

function combinePhonemes(initial: string, rhyme: string, toneId: string): string {
  // If single vowel in table, apply tone directly
  const firstVowel = rhyme[0] || '';
  const toneChar = TONE_MAP[firstVowel]?.[toneId];

  if (toneChar) {
    const combinedRhyme = toneChar + rhyme.slice(1);
    return `${initial}${combinedRhyme}`;
  }

  // Fallback for compound rhymes
  return `${initial}${rhyme}`;
}

export function PhonicsBoard({
  initials = DEFAULT_INITIALS,
  rhymes = DEFAULT_RHYMES,
  tones = ['ngang', 'huyen', 'sac', 'hoi', 'nga', 'nang'],
  onCombine,
}: PhonicsBoardProps) {
  const [selectedInitial, setSelectedInitial] = useState(initials[0] || 'b');
  const [selectedRhyme, setSelectedRhyme] = useState(rhymes[0] || 'a');
  const [selectedTone, setSelectedTone] = useState(tones[0] || 'ngang');

  const combinedWord = useMemo(() => {
    const result = combinePhonemes(selectedInitial, selectedRhyme, selectedTone);
    onCombine?.(result);
    return result;
  }, [selectedInitial, selectedRhyme, selectedTone, onCombine]);

  const currentToneObj = TONE_LIST.find((t) => t.id === selectedTone) || TONE_LIST[0]!;

  const playSound = useCallback((type: 'initial' | 'rhyme' | 'spell' | 'word') => {
    // Attempt to play phoneme file if present in /media/phonemes/
    let wordAudio = `/media/phonemes/${combinedWord}.mp3`;
    if (combinedWord === 'bá') wordAudio = '/media/phonemes/ba-sac.mp3';
    if (combinedWord === 'cá') wordAudio = '/media/phonemes/ca-sac.mp3';

    const phonemeMap: Record<string, string> = {
      initial: `/media/phonemes/${selectedInitial}.mp3`,
      rhyme: `/media/phonemes/${selectedRhyme}.mp3`,
      word: wordAudio,
    };

    const targetUrl = phonemeMap[type];
    if (targetUrl) {
      getAudioManager().play(targetUrl);
    }
  }, [selectedInitial, selectedRhyme, combinedWord]);

  return (
    <div className={styles.container} data-testid="phonics-board">
      <h2 className={styles.title}>🔤 Bảng Ghép Vần Tiếng Việt</h2>

      {/* Big Visual Separated-Combined Model */}
      <div className={styles.equationBox}>
        {/* Âm đầu */}
        <div className={styles.partBox}>
          <span className={styles.partLabel}>Âm đầu</span>
          <div
            className={`${styles.partValue} ${styles.initialColor}`}
            onClick={() => playSound('initial')}
            title="Bấm để nghe âm đầu"
          >
            {selectedInitial}
          </div>
        </div>

        <span className={styles.operator}>+</span>

        {/* Vần */}
        <div className={styles.partBox}>
          <span className={styles.partLabel}>Vần</span>
          <div
            className={`${styles.partValue} ${styles.rhymeColor}`}
            onClick={() => playSound('rhyme')}
            title="Bấm để nghe vần"
          >
            {selectedRhyme}
          </div>
        </div>

        <span className={styles.operator}>+</span>

        {/* Thanh */}
        <div className={styles.partBox}>
          <span className={styles.partLabel}>Thanh</span>
          <div className={`${styles.partValue} ${styles.toneColor}`}>
            {currentToneObj.label}
          </div>
        </div>

        <span className={styles.operator}>=</span>

        {/* Tiếng Ghép */}
        <div className={styles.partBox}>
          <span className={styles.partLabel}>Tiếng ghép</span>
          <div
            className={styles.resultBox}
            onClick={() => playSound('word')}
            title="Bấm để đọc trơn"
            data-testid="phonics-result-word"
          >
            {combinedWord}
          </div>
        </div>
      </div>

      {/* Selectors rows */}
      <div className={styles.selectorsSection}>
        {/* Initials row */}
        <div className={styles.selectorRow}>
          <span className={styles.rowTitle}>Âm đầu:</span>
          <div className={styles.pillList}>
            {initials.map((init) => (
              <button
                key={init}
                className={`${styles.pill} ${selectedInitial === init ? styles.pillActive : ''}`}
                onClick={() => setSelectedInitial(init)}
              >
                {init}
              </button>
            ))}
          </div>
        </div>

        {/* Rhymes row */}
        <div className={styles.selectorRow}>
          <span className={styles.rowTitle}>Vần:</span>
          <div className={styles.pillList}>
            {rhymes.map((rhyme) => (
              <button
                key={rhyme}
                className={`${styles.pill} ${selectedRhyme === rhyme ? styles.pillActive : ''}`}
                onClick={() => setSelectedRhyme(rhyme)}
              >
                {rhyme}
              </button>
            ))}
          </div>
        </div>

        {/* Tones row */}
        <div className={styles.selectorRow}>
          <span className={styles.rowTitle}>Dấu thanh:</span>
          <div className={styles.pillList}>
            {TONE_LIST.map((tone) => (
              <button
                key={tone.id}
                className={`${styles.pill} ${selectedTone === tone.id ? styles.pillActive : ''}`}
                onClick={() => setSelectedTone(tone.id)}
              >
                {tone.name} ({tone.label})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sound action buttons */}
      <div className={styles.soundControls}>
        <button className={styles.soundBtn} onClick={() => playSound('initial')}>
          🔊 Âm đầu ({selectedInitial})
        </button>
        <button className={styles.soundBtn} onClick={() => playSound('rhyme')}>
          🔊 Vần ({selectedRhyme})
        </button>
        <button
          className={styles.soundBtn}
          style={{ background: '#059669' }}
          onClick={() => playSound('word')}
        >
          🗣️ Đọc trơn ({combinedWord})
        </button>
      </div>
    </div>
  );
}

