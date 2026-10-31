/**
 * Mistake Tracker (Lịch sử câu cả lớp hay sai & Chế độ Ôn tập đầu giờ)
 * Ghi nhận các câu hỏi học sinh trả lời sai trong suốt quá trình học
 * và tự động tổng hợp thành bài ôn tập ngắn 5-10 phút đầu tiết học tiếp theo.
 */

import type { Question, Lesson, Slide } from '@/schemas/content.schema';

const STORAGE_KEY = 'trinh_chieu_mistakes_v1';

export interface MistakeEntry {
  questionId: string;
  lessonId: string;
  lessonTitle: string;
  subject: 'math' | 'vietnamese' | 'english';
  question: Question;
  wrongCount: number;
  lastWrongAt: number;
  notes?: string;
}

export class MistakeTracker {
  private cache: Map<string, MistakeEntry> = new Map();
  private loaded: boolean = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as MistakeEntry[];
        this.cache.clear();
        for (const item of items) {
          if (item && item.questionId) {
            this.cache.set(item.questionId, item);
          }
        }
      }
      this.loaded = true;
    } catch (e) {
      console.warn('[MistakeTracker] Failed to load mistakes from localStorage:', e);
    }
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const list = Array.from(this.cache.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('[MistakeTracker] Failed to persist mistakes:', e);
    }
  }

  /**
   * Ghi nhận một câu hỏi bị trả lời sai
   */
  recordMistake(
    lessonId: string,
    lessonTitle: string,
    subject: 'math' | 'vietnamese' | 'english',
    question: Question
  ): void {
    const existing = this.cache.get(question.id);
    if (existing) {
      existing.wrongCount += 1;
      existing.lastWrongAt = Date.now();
      existing.question = question; // Cập nhật nội dung mới nhất
    } else {
      this.cache.set(question.id, {
        questionId: question.id,
        lessonId,
        lessonTitle,
        subject,
        question,
        wrongCount: 1,
        lastWrongAt: Date.now(),
      });
    }
    this.persist();
  }

  /**
   * Ghi nhận danh sách các câu sai khi kết thúc bài học
   */
  recordMistakesFromLesson(lesson: Lesson, wrongQuestionIds: string[]): void {
    if (!wrongQuestionIds || wrongQuestionIds.length === 0) return;

    for (const slide of lesson.slides) {
      if (slide.type === 'question-slide' && wrongQuestionIds.includes(slide.question.id)) {
        this.recordMistake(lesson.id, lesson.title, lesson.subject, slide.question);
      }
    }
  }

  /**
   * Lấy toàn bộ danh sách câu hay sai, sắp xếp theo số lần sai giảm dần và thời gian mới nhất
   */
  getMistakes(): MistakeEntry[] {
    if (!this.loaded) this.loadFromStorage();
    return Array.from(this.cache.values()).sort((a, b) => {
      if (b.wrongCount !== a.wrongCount) {
        return b.wrongCount - a.wrongCount;
      }
      return b.lastWrongAt - a.lastWrongAt;
    });
  }

  /**
   * Đếm tổng số câu trong danh sách cần ôn tập
   */
  getCount(): number {
    return this.cache.size;
  }

  /**
   * Kiểm tra câu hỏi có đang nằm trong danh sách sai không
   */
  hasMistake(questionId: string): boolean {
    if (!this.loaded) this.loadFromStorage();
    return this.cache.has(questionId);
  }

  /**
   * Đánh dấu lớp đã nắm vững (xóa câu hỏi khỏi danh sách sai)
   */
  removeMistake(questionId: string): void {
    this.cache.delete(questionId);
    this.persist();
  }

  /**
   * Xóa toàn bộ danh sách câu hỏi hay sai
   */
  clearAll(): void {
    this.cache.clear();
    this.persist();
  }

  /**
   * Gán danh sách câu sai (dùng khi khôi phục dữ liệu từ file sao lưu)
   */
  setMistakes(entries: MistakeEntry[]): void {
    this.cache.clear();
    for (const e of entries) {
      if (e && e.questionId) {
        this.cache.set(e.questionId, e);
      }
    }
    this.persist();
  }

  /**
   * Gom các câu hay sai thành một bài trình chiếu hoàn chỉnh (mini Lesson) để ôn tập đầu giờ
   */
  buildReviewLesson(limit: number = 8): Lesson {
    const mistakes = this.getMistakes().slice(0, limit);
    const subject = mistakes[0]?.subject || 'math';
    const totalQuestions = mistakes.length;

    const slides: Slide[] = [];

    // 1. Slide tiêu đề mở đầu ôn tập
    slides.push({
      type: 'title-slide',
      id: 'review-title',
      title: 'Khởi Động: Ôn Tập Đầu Giờ',
      subtitle: `Cùng làm lại ${totalQuestions} câu hỏi cả lớp cần chú ý`,
      teacherNote: 'Dành 5 phút đầu giờ cho cả lớp xung phong sửa các câu hay nhầm lẫn của tiết trước.',
      audio: '',
    });

    // 2. Các câu hỏi hay sai
    mistakes.forEach((item, index) => {
      slides.push({
        type: 'question-slide',
        id: `review-q-${index + 1}`,
        teacherNote: `Câu từ bài: ${item.lessonTitle}. Cả lớp đã trả lời sai ${item.wrongCount} lần.`,
        question: item.question,
        timeLimitSeconds: 30,
        showRetryOnWrong: true,
      });
    });

    // 3. Slide kết thúc ôn tập
    slides.push({
      type: 'content-slide',
      id: 'review-finish',
      title: 'Hoàn Thành Phần Ôn Tập!',
      body: 'Tuyệt vời! Cả lớp đã cùng nhau khắc phục và nắm vững toàn bộ các câu hỏi khó.',
      teacherNote: 'Khen ngợi tinh thần học tập của cả lớp trước khi bước sang bài học mới.',
      bullets: [
        'Đã vượt qua toàn bộ các câu hỏi hay nhầm lẫn',
        'Tự tin bước vào bài học mới hôm nay',
        'Cộng 1 điểm thi đua cho tất cả các đội',
      ],
      audio: '',
    });

    return {
      status: 'draft',
      mode: 'draft',
      id: 'review-mistakes-session',
      title: `Ôn tập câu hay sai (${totalQuestions} câu)`,
      subject,
      grade: 1,
      description: 'Bài ôn tập đầu giờ tự động tổng hợp từ các câu hỏi học sinh hay trả lời sai.',
      totalDurationMinutes: 10,
      slides,
    };
  }
}

let singletonInstance: MistakeTracker | null = null;

export function getMistakeTracker(): MistakeTracker {
  if (!singletonInstance) {
    singletonInstance = new MistakeTracker();
  }
  return singletonInstance;
}
