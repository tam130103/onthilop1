/**
 * Audio recording & IndexedDB integration for Lesson Editor
 * Enforces a strict 15-second limit per audio clip and saves Blobs directly into IndexedDB,
 * returning a compact reference URI (`idb://...`) for the lesson JSON.
 */
import { saveAudioBlob } from './audio-storage';

export const MAX_RECORD_SECONDS = 15;

export interface RecordedAudioResult {
  refUri: string;
  blob: Blob;
  durationMs: number;
}

class AudioRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private startTime: number = 0;
  private stream: MediaStream | null = null;
  private autoStopTimer: number | null = null;

  async start(onMaxLimitReached?: () => void): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Trình duyệt không hỗ trợ microphone hoặc thiết bị không có micro.');
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          throw new Error('Bạn đã từ chối quyền truy cập Microphone. Vui lòng cho phép quyền micro trên trình duyệt.');
        }
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          throw new Error('Không tìm thấy thiết bị microphone nào được kết nối với máy tính.');
        }
      }
      throw new Error(`Không thể khởi động microphone: ${err instanceof Error ? err.message : String(err)}`);
    }

    this.audioChunks = [];
    this.startTime = Date.now();

    // Prefer webm/opus or mp4
    let mimeType = 'audio/webm';
    if (!MediaRecorder.isTypeSupported('audio/webm')) {
      if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        mimeType = 'audio/ogg';
      } else {
        mimeType = '';
      }
    }

    this.mediaRecorder = mimeType
      ? new MediaRecorder(this.stream, { mimeType })
      : new MediaRecorder(this.stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    // Auto-stop at 15 seconds limit
    this.autoStopTimer = window.setTimeout(() => {
      if (this.isRecording()) {
        onMaxLimitReached?.();
      }
    }, MAX_RECORD_SECONDS * 1000);

    this.mediaRecorder.start(100);
  }

  stop(): Promise<RecordedAudioResult> {
    if (this.autoStopTimer) {
      clearTimeout(this.autoStopTimer);
      this.autoStopTimer = null;
    }

    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Chưa bắt đầu thu âm hoặc tiến trình thu âm đã dừng.'));
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const durationMs = Date.now() - this.startTime;
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.audioChunks, { type: mimeType });

        // Turn off microphone light
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
          this.stream = null;
        }

        // Validate 15s limit
        if (durationMs > (MAX_RECORD_SECONDS + 1) * 1000) {
          reject(new Error(`Đoạn thu âm vượt quá giới hạn tối đa ${MAX_RECORD_SECONDS} giây!`));
          return;
        }

        // Save Blob into IndexedDB and retrieve compact URI
        try {
          const refUri = await saveAudioBlob(blob, durationMs);
          resolve({
            refUri,
            blob,
            durationMs,
          });
        } catch (saveErr) {
          reject(saveErr instanceof Error ? saveErr : new Error(String(saveErr)));
        }
      };

      this.mediaRecorder.stop();
    });
  }

  isRecording(): boolean {
    return this.mediaRecorder !== null && this.mediaRecorder.state === 'recording';
  }
}

export const audioRecorder = new AudioRecorderService();
