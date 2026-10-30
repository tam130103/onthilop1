import { useState, useRef, useEffect, useCallback } from 'react';
import { audioRecorder, MAX_RECORD_SECONDS } from '@/core/audio-recorder';
import { getAudioObjectUrl } from '@/core/audio-storage';
import styles from './AudioRecordField.module.css';

export interface AudioRecordFieldProps {
  label?: string;
  value?: string;
  onChange: (newAudio: string) => void;
  placeholder?: string;
  compact?: boolean;
}

export function AudioRecordField({
  label,
  value = '',
  onChange,
  placeholder = 'Đường dẫn /media/... hoặc thu âm',
  compact = false,
}: AudioRecordFieldProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const currentObjectUrlRef = useRef<string | null>(null);

  // Stop playback & cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (currentObjectUrlRef.current) {
        URL.revokeObjectURL(currentObjectUrlRef.current);
        currentObjectUrlRef.current = null;
      }
    };
  }, []);

  const stopAndSave = useCallback(async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    try {
      const result = await audioRecorder.stop();
      setIsRecording(false);
      onChange(result.refUri);
    } catch (err) {
      setIsRecording(false);
      const msg = err instanceof Error ? err.message : 'Lỗi khi lưu âm thanh vào IndexedDB';
      setError(`⚠️ Lỗi lưu thu âm: ${msg}`);
    }
  }, [onChange]);

  const handleToggleRecord = useCallback(async () => {
    setError(null);
    if (!isRecording) {
      try {
        await audioRecorder.start(() => {
          // Reached max limit (15s)
          stopAndSave();
        });
        setIsRecording(true);
        setRecordSeconds(0);
        timerRef.current = window.setInterval(() => {
          setRecordSeconds((s) => {
            if (s + 1 >= MAX_RECORD_SECONDS) {
              stopAndSave();
              return MAX_RECORD_SECONDS;
            }
            return s + 1;
          });
        }, 1000);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Không thể kết nối microphone';
        setError(msg);
      }
    } else {
      await stopAndSave();
    }
  }, [isRecording, stopAndSave]);

  const handleTogglePlay = useCallback(async () => {
    if (!value) return;

    if (isPlaying && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }

      let playSrc = value;
      if (value.startsWith('idb://')) {
        const objUrl = await getAudioObjectUrl(value);
        if (!objUrl) {
          setError('Không tìm thấy file âm thanh thu âm trong IndexedDB.');
          return;
        }
        if (currentObjectUrlRef.current) {
          URL.revokeObjectURL(currentObjectUrlRef.current);
        }
        currentObjectUrlRef.current = objUrl;
        playSrc = objUrl;
      }

      const audio = new Audio(playSrc);
      audioPlayerRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setError('Không thể phát âm thanh này.');
      };

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      setIsPlaying(false);
      setError('Lỗi khi phát audio: ' + (err instanceof Error ? err.message : String(err)));
    }
  }, [value, isPlaying]);

  const isIndexedDb = value.startsWith('idb://');

  if (compact) {
    return (
      <div className={styles.compactContainer}>
        <button
          type="button"
          onClick={handleToggleRecord}
          className={`${styles.compactBtn} ${isRecording ? styles.btnRecording : styles.btnRecord}`}
          title={isRecording ? `Dừng thu âm (${recordSeconds}/${MAX_RECORD_SECONDS}s)` : 'Bấm để thu âm qua micro (tối đa 15s)'}
        >
          {isRecording ? `⏹️ ${recordSeconds}s/15s` : '🎙️ Thu'}
        </button>

        {value && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`${styles.compactBtn} ${styles.btnPlay}`}
            title="Nghe thử âm thanh"
          >
            {isPlaying ? '⏹️' : '▶️'}
          </button>
        )}

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className={`${styles.compactBtn} ${styles.btnDelete}`}
            title="Xóa âm thanh này"
          >
            ✕
          </button>
        )}

        {isIndexedDb && <span className={styles.badgeRecorded}>IDB (≤15s)</span>}
        {error && <span className={styles.errorMessage} style={{ fontSize: '11px' }}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          <span>{label}</span>
          {isIndexedDb && <span className={styles.badgeRecorded}>Lưu IndexedDB (≤15s)</span>}
        </label>
      )}

      <div className={styles.controlRow}>
        <input
          type="text"
          className={styles.input}
          value={isIndexedDb ? `[Bản ghi IndexedDB: ${value}]` : value}
          onChange={(e) => {
            if (!isIndexedDb) onChange(e.target.value);
          }}
          placeholder={placeholder}
          readOnly={isIndexedDb}
        />

        <button
          type="button"
          onClick={handleToggleRecord}
          className={`${styles.btn} ${isRecording ? styles.btnRecording : styles.btnRecord}`}
          title={isRecording ? 'Bấm để dừng thu và lưu vào IndexedDB' : 'Bắt đầu thu âm bằng micro (tối đa 15 giây)'}
        >
          {isRecording ? `⏹️ Dừng thu (${recordSeconds}s / ${MAX_RECORD_SECONDS}s)` : '🎙️ Thu âm (≤15s)'}
        </button>

        {value && (
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`${styles.btn} ${styles.btnPlay}`}
          >
            {isPlaying ? '⏹️ Dừng nghe' : '▶️ Nghe thử'}
          </button>
        )}

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className={`${styles.btn} ${styles.btnDelete}`}
            title="Xóa âm thanh này"
          >
            🗑️ Xóa
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
