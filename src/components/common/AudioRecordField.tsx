import { useState, useRef, useEffect, useCallback } from 'react';
import { audioRecorder } from '@/core/audio-recorder';
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

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  const handleToggleRecord = useCallback(async () => {
    setError(null);
    if (!isRecording) {
      try {
        await audioRecorder.start();
        setIsRecording(true);
        setRecordSeconds(0);
        timerRef.current = window.setInterval(() => {
          setRecordSeconds((s) => s + 1);
        }, 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể kết nối mic');
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      try {
        const result = await audioRecorder.stop();
        setIsRecording(false);
        onChange(result.dataUrl);
      } catch (err) {
        setIsRecording(false);
        setError(err instanceof Error ? err.message : 'Lỗi khi dừng thu âm');
      }
    }
  }, [isRecording, onChange]);

  const handleTogglePlay = useCallback(() => {
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
      const audio = new Audio(value);
      audioPlayerRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setError('Không thể phát âm thanh này.');
      };

      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        setIsPlaying(false);
        setError('Lỗi khi phát audio: ' + (e instanceof Error ? e.message : String(e)));
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tạo audio');
    }
  }, [value, isPlaying]);

  const isDataUrl = value.startsWith('data:audio');

  if (compact) {
    return (
      <div className={styles.compactContainer}>
        <button
          type="button"
          onClick={handleToggleRecord}
          className={`${styles.compactBtn} ${isRecording ? styles.btnRecording : styles.btnRecord}`}
          title={isRecording ? 'Bấm để dừng thu âm' : 'Bấm để thu âm bằng micro'}
        >
          {isRecording ? `⏹️ ${recordSeconds}s` : '🎙️ Thu'}
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

        {isDataUrl && <span className={styles.badgeRecorded}>Đã ghi âm</span>}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          <span>{label}</span>
          {isDataUrl && <span className={styles.badgeRecorded}>Đã thu âm cục bộ</span>}
        </label>
      )}

      <div className={styles.controlRow}>
        <input
          type="text"
          className={styles.input}
          value={isDataUrl ? '[Đã ghi âm giọng nói qua micro]' : value}
          onChange={(e) => {
            if (!isDataUrl) onChange(e.target.value);
          }}
          placeholder={placeholder}
          readOnly={isDataUrl}
        />

        <button
          type="button"
          onClick={handleToggleRecord}
          className={`${styles.btn} ${isRecording ? styles.btnRecording : styles.btnRecord}`}
        >
          {isRecording ? `⏹️ Dừng thu (${recordSeconds}s)` : '🎙️ Thu âm'}
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
            title="Xóa file âm thanh"
          >
            🗑️ Xóa
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessage}>⚠️ {error}</div>}
    </div>
  );
}
