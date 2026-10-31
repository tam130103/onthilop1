import { getAudioObjectUrl } from './audio-storage';

type AudioState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

interface AudioManagerEvents {
  stateChange: (state: AudioState) => void;
  progress: (currentTime: number, duration: number) => void;
  ended: () => void;
  error: (error: Error) => void;
}

/**
 * SessionAudioManager manages audio playback for the presentation session.
 * 
 * Rules:
 * - Nạp audio theo đúng buổi học đang dạy (loadSessionAudio), giải phóng bộ nhớ khi buổi học kết thúc (releaseSessionAudio).
 * - Cung cấp cơ chế unlock AudioContext khi người dùng bấm nút "Bắt đầu" ở /present để vượt qua chính sách autoplay của trình duyệt.
 * - Hạn chế tối đa rò rỉ bộ nhớ qua URL.revokeObjectURL().
 */
export class SessionAudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private cache: Map<string, string> = new Map(); // url -> objectURL
  private state: AudioState = 'idle';
  private listeners = new Map<keyof AudioManagerEvents, Set<unknown>>();
  private currentUrl: string | null = null;

  constructor() {
    // AudioContext will be initialized or resumed on user gesture (unlock)
  }

  private setState(newState: AudioState): void {
    this.state = newState;
    this.emit('stateChange', newState);
  }

  getState(): AudioState {
    return this.state;
  }

  on<K extends keyof AudioManagerEvents>(event: K, handler: AudioManagerEvents[K]): () => void {
    let handlers = this.listeners.get(event);
    if (!handlers) {
      handlers = new Set();
      this.listeners.set(event, handlers);
    }
    handlers.add(handler);
    return () => {
      handlers?.delete(handler);
    };
  }

  private emit<K extends keyof AudioManagerEvents>(event: K, ...args: Parameters<AudioManagerEvents[K]>): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      for (const handler of handlers) {
        try {
          (handler as (...a: Parameters<AudioManagerEvents[K]>) => void)(...args);
        } catch (e) {
          console.error(`[AudioManager] Error in ${event} handler:`, e);
        }
      }
    }
  }

  /**
   * Unlock AudioContext on first user interaction (e.g. click "Bắt đầu buổi học")
   */
  async unlock(): Promise<void> {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.audioContext = new AudioCtx();
        }
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    } catch (e) {
      console.warn('[AudioManager] Failed to unlock audio context:', e);
    }
  }

  /**
   * Chỉ nạp audio của buổi đang dạy, dọn dẹp audio của buổi học cũ trước
   */
  async loadSessionAudio(urls: string[]): Promise<void> {
    // 1. Giải phóng cache cũ trước khi nạp buổi mới
    this.releaseSessionAudio();

    // 2. Chỉ nạp danh sách URLs của buổi này
    const uniqueUrls = Array.from(new Set(urls.filter((u) => typeof u === 'string' && u.trim().length > 0)));
    const promises = uniqueUrls.map(async (url) => {
      try {
        if (url.startsWith('idb://')) {
          const objectUrl = await getAudioObjectUrl(url);
          if (objectUrl) {
            this.cache.set(url, objectUrl);
          }
          return;
        }
        const response = await fetch(url);
        if (!response.ok) return;
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        this.cache.set(url, objectUrl);
      } catch (e) {
        console.warn(`[AudioManager] Failed to preload session audio: ${url}`, e);
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Giải phóng toàn bộ tài nguyên audio của buổi học đã kết thúc
   */
  releaseSessionAudio(): void {
    this.stop();
    for (const objectUrl of this.cache.values()) {
      if (objectUrl.startsWith('blob:')) {
        URL.revokeObjectURL(objectUrl);
      }
    }
    this.cache.clear();
    this.setState('idle');
  }

  async play(url: string): Promise<void> {
    try {
      this.stop();
      this.currentUrl = url;
      this.setState('loading');

      let src = this.cache.get(url);
      if (!src && url.startsWith('idb://')) {
        const objectUrl = await getAudioObjectUrl(url);
        if (objectUrl) {
          this.cache.set(url, objectUrl);
          src = objectUrl;
        }
      }
      src = src ?? url;
      this.audioElement = new Audio(src);
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('playing', () => {
        this.setState('playing');
      });

      this.audioElement.addEventListener('pause', () => {
        if (this.state === 'playing') {
          this.setState('paused');
        }
      });

      this.audioElement.addEventListener('ended', () => {
        this.setState('idle');
        this.emit('ended');
      });

      this.audioElement.addEventListener('error', () => {
        const err = new Error(`Failed to play audio: ${url}`);
        this.setState('error');
        this.emit('error', err);
      });

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioElement) {
          this.emit('progress', this.audioElement.currentTime, this.audioElement.duration || 0);
        }
      });

      await this.audioElement.play();
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      this.setState('error');
      this.emit('error', err);
    }
  }

  pause(): void {
    if (this.audioElement && this.state === 'playing') {
      this.audioElement.pause();
      this.setState('paused');
    }
  }

  resume(): void {
    if (this.audioElement && this.state === 'paused') {
      this.audioElement.play().catch((e) => {
        const err = e instanceof Error ? e : new Error(String(e));
        this.setState('error');
        this.emit('error', err);
      });
    }
  }

  stop(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement.load();
      this.audioElement = null;
    }
    this.currentUrl = null;
    this.setState('idle');
  }

  setVolume(volume: number): void {
    const clamped = Math.max(0, Math.min(1, volume));
    if (this.audioElement) {
      this.audioElement.volume = clamped;
    }
  }

  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  /**
   * Tổng hợp âm thanh tức thì qua Web Audio API Oscillator (Không cần tải file mạng)
   */
  playSynthesizedSfx(type: 'correct' | 'wrong' | 'timer'): void {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (!this.audioContext) return;
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch(() => {});
      }

      const now = this.audioContext.currentTime;
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.audioContext.destination);

      if (type === 'correct') {
        // Pentatonic joyful arpeggio: C5 -> E5 -> G5 -> C6
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          if (!this.audioContext) return;
          const osc = this.audioContext.createOscillator();
          const noteGain = this.audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          noteGain.gain.setValueAtTime(0.18, now + idx * 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
          osc.connect(noteGain);
          noteGain.connect(gainNode);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.35);
        });
      } else if (type === 'wrong') {
        // Gentle soft buzz
        const osc = this.audioContext.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(196, now + 0.15);
        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'timer') {
        // Two-tone bell
        const osc = this.audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1760, now + 0.1);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch {
      // ignore
    }
  }

  /**
   * Đọc văn bản tiếng Việt qua Web Speech Synthesis (Trợ giảng AI trực tiếp trên web)
   */
  speakText(text: string, lang: string = 'vi-VN'): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.88; // Tốc độ chuẩn chậm rãi, dễ nghe cho học sinh lớp 1
      utterance.pitch = 1.05;
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find((v) => v.lang.includes('vi') || v.lang.includes('VIE'));
      if (viVoice) utterance.voice = viVoice;

      utterance.onstart = () => this.setState('playing');
      utterance.onend = () => {
        this.setState('idle');
        this.emit('ended');
      };
      utterance.onerror = () => {
        this.setState('idle');
      };
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }

  dispose(): void {
    this.releaseSessionAudio();
    this.listeners.clear();
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
  }
}

// Singleton for the app
let instance: SessionAudioManager | null = null;
export function getAudioManager(): SessionAudioManager {
  if (!instance) {
    instance = new SessionAudioManager();
  }
  return instance;
}
