export type SyncMessageType =
  | 'SLIDE_CHANGE'
  | 'ANSWER_REVEAL'
  | 'TIMER_START'
  | 'TIMER_STOP'
  | 'AUDIO_PLAY'
  | 'AUDIO_STOP'
  | 'SESSION_START'
  | 'SESSION_END'
  | 'PING'
  | 'PONG'
  | 'HELLO'
  | 'STATE_SNAPSHOT'
  | 'BLACKOUT_TOGGLE'
  | 'CLASSROOM_UPDATE'
  | 'PICKER_START'
  | 'PICKER_CLOSE'
  | 'LESSON_CHANGE';

export interface PresentationSnapshot {
  currentSlideIndex: number;
  showAnswer: boolean;
  blackout: boolean;
  phase: string;
  wrongAnswerQueue: unknown[];
  answeredCorrectly: string[];
  answeredIncorrectly: string[];
  tapPlaceMapping?: Record<string, string>;
  matchingPairs?: Array<{ leftId: string; rightId: string }>;
  teams?: Array<{ id: string; name: string; color: string; score: number }>;
  timer?: { durationSeconds: number; remainingSeconds: number; isRunning: boolean };
  pickerActive?: boolean;
  pickedStudent?: { id: string; name: string; isAbsent: boolean; callCount: number } | null;
  // NOTE: teacherNote is strictly excluded from PresentationSnapshot
}

export interface SyncMessage {
  type: SyncMessageType;
  payload: Record<string, unknown>;
  timestamp: number;
  source: 'presenter' | 'present';
}

export type SyncHandler = (message: SyncMessage) => void;

const CHANNEL_NAME = 'trinh-chieu-lop1-sync';

export class SyncChannel {
  private channel: BroadcastChannel;
  private handlers: Map<SyncMessageType, Set<SyncHandler>> = new Map();
  private source: 'presenter' | 'present';

  constructor(source: 'presenter' | 'present', lessonId?: string) {
    this.source = source;
    const name = lessonId ? `trinh-chieu-sync-${lessonId}` : CHANNEL_NAME;
    this.channel = new BroadcastChannel(name);
    this.channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      const msg = event.data;
      // Don't process own messages
      if (msg.source === this.source) return;
      const handlers = this.handlers.get(msg.type);
      if (handlers) {
        handlers.forEach((h) => {
          try {
            h(msg);
          } catch (e) {
            console.error(`[SyncChannel] Error in handler for ${msg.type}:`, e);
          }
        });
      }
    };
  }

  send(type: SyncMessageType, payload: Record<string, unknown>): void {
    const message: SyncMessage = {
      type,
      payload,
      timestamp: Date.now(),
      source: this.source,
    };
    try {
      this.channel.postMessage(message);
    } catch (e) {
      console.warn(`[SyncChannel] Failed to postMessage:`, e);
    }
  }

  on(type: SyncMessageType, handler: SyncHandler): () => void {
    let handlers = this.handlers.get(type);
    if (!handlers) {
      handlers = new Set();
      this.handlers.set(type, handlers);
    }
    handlers.add(handler);
    return () => {
      handlers?.delete(handler);
    };
  }

  dispose(): void {
    this.channel.close();
    this.handlers.clear();
  }
}
