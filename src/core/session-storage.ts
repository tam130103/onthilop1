/**
 * Teaching Session Storage (Kịch bản Buổi dạy liên hoàn)
 * Ghép nối các hoạt động liên tiếp trong một tiết học 35 phút của Lớp 1:
 * Khởi động (warmup) -> Ghép vần (phonics) -> Bài mới (lesson) -> Thi đua (game) -> Tổng kết (summary).
 */

export type SessionStepType = 'warmup' | 'phonics' | 'lesson' | 'game' | 'summary';

export interface SessionStep {
  id: string;
  type: SessionStepType;
  title: string;
  description: string;
  durationMinutes: number;
  lessonId?: string;
  config?: {
    timerSeconds?: number;
    targetScore?: number;
    initials?: string[];
    rhymes?: string[];
  };
}

export interface TeachingSession {
  id: string;
  title: string;
  subject: 'math' | 'vietnamese' | 'english';
  grade: 1;
  description: string;
  estimatedDurationMinutes: number;
  steps: SessionStep[];
  isCustom?: boolean;
}

const STORAGE_KEY = 'trinh_chieu_teaching_sessions_v1';

export const BUILTIN_SESSIONS: TeachingSession[] = [
  {
    id: 'session-math-01',
    title: 'Toán Lớp 1 — Tiết 1: Đếm số & Đấu trường Phép cộng',
    subject: 'math',
    grade: 1,
    description: 'Kịch bản trọn vẹn 35 phút: Gọi tên khởi động -> Bài học tương tác đếm táo/cá -> Thi đua 4 đội tính nhẩm nhanh -> Tuyên dương đội thắng cuộc.',
    estimatedDurationMinutes: 35,
    steps: [
      {
        id: 'step-m1-warmup',
        type: 'warmup',
        title: '1. Khởi động: Vòng quay gọi tên & Đố vui đếm số',
        description: 'Bấm phím P để quay gọi ngẫu nhiên 3 học sinh lên bảng tham gia đố vui đếm nhanh.',
        durationMinutes: 5,
        config: { timerSeconds: 60 },
      },
      {
        id: 'step-m1-lesson',
        type: 'lesson',
        title: '2. Bài học tương tác: Đếm số và so sánh trong phạm vi 10',
        description: 'Trình chiếu các câu hỏi đếm số quả táo, số chú cá và so sánh 4 hay 2.',
        durationMinutes: 15,
        lessonId: 'math-01-counting',
      },
      {
        id: 'step-m1-game',
        type: 'game',
        title: '3. Đấu trường 4 Đội: Thi đua tính nhanh có bấm giờ',
        description: 'Cô bấm giờ 45 giây. Đội nào đưa bảng đáp án đúng nhanh nhất được cộng điểm (Phím 1-4).',
        durationMinutes: 10,
        config: { timerSeconds: 45, targetScore: 10 },
      },
      {
        id: 'step-m1-summary',
        type: 'summary',
        title: '4. Củng cố & Tổng kết: Bảng điểm & Sao khen thưởng',
        description: 'Vinh danh đội chiến thắng, trao huy hiệu sao vàng cho cả lớp.',
        durationMinutes: 5,
      },
    ],
  },
  {
    id: 'session-vn-01',
    title: 'Tiếng Việt Lớp 1 — Tiết 2: Âm a, b, c & Thử thách ghép từ',
    subject: 'vietnamese',
    grade: 1,
    description: 'Kịch bản toàn diện: Ôn câu hay nhầm tiết trước -> Ghép tiếng mới trên Bảng tương tác -> Bài giảng âm chữ -> Trò chơi nối từ -> Nhận xét.',
    estimatedDurationMinutes: 35,
    steps: [
      {
        id: 'step-v1-warmup',
        type: 'warmup',
        title: '1. Khởi động: Ôn tập nhanh các câu cả lớp hay sai',
        description: 'Tự động lấy các câu hỏi học sinh hay nhầm lẫn nhất ở buổi trước để khắc sâu kiến thức.',
        durationMinutes: 5,
        lessonId: 'review-mistakes-session',
      },
      {
        id: 'step-v1-phonics',
        type: 'phonics',
        title: '2. Khám phá: Bảng Ghép Vần Tương Tác (b, c ghép a, o)',
        description: 'Thao tác kéo/chạm âm đầu và dấu thanh để tạo tiếng: ba, bá, ca, cá.',
        durationMinutes: 10,
        config: {
          initials: ['b', 'c'],
          rhymes: ['a', 'o'],
        },
      },
      {
        id: 'step-v1-lesson',
        type: 'lesson',
        title: '3. Thực hành: Bài học nhận biết chữ cái & Từ ứng dụng',
        description: 'Luyện tập câu hỏi nối chữ B với bóng, C với cá, điền từ vào chỗ trống.',
        durationMinutes: 10,
        lessonId: 'vn-01-phonics',
      },
      {
        id: 'step-v1-game',
        type: 'game',
        title: '4. Thi đua 4 Đội: Thử thách ghép tiếng nhanh',
        description: 'Bấm giờ 30 giây cho mỗi lượt chọn đáp án đúng. Đội nhanh nhất giành điểm.',
        durationMinutes: 6,
        config: { timerSeconds: 30 },
      },
      {
        id: 'step-v1-summary',
        type: 'summary',
        title: '5. Đọc đồng thanh & Tuyên dương thi đua',
        description: 'Cả lớp đọc to các từ đã học, cô tổng kết điểm thi đua của 4 tổ.',
        durationMinutes: 4,
      },
    ],
  },
];

export function getCustomSessions(): TeachingSession[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TeachingSession[];
  } catch {
    return [];
  }
}

export function getAllTeachingSessions(): TeachingSession[] {
  const custom = getCustomSessions();
  return [...BUILTIN_SESSIONS, ...custom];
}

export function getTeachingSessionById(id: string): TeachingSession | null {
  const all = getAllTeachingSessions();
  return all.find((s) => s.id === id) || null;
}

export function saveCustomSession(session: TeachingSession): void {
  if (typeof localStorage === 'undefined') return;
  const current = getCustomSessions();
  const index = current.findIndex((s) => s.id === session.id);
  session.isCustom = true;

  let updated: TeachingSession[];
  if (index >= 0) {
    updated = current.map((s, idx) => (idx === index ? session : s));
  } else {
    updated = [session, ...current];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteCustomSession(id: string): boolean {
  if (typeof localStorage === 'undefined') return false;
  const current = getCustomSessions();
  const filtered = current.filter((s) => s.id !== id);
  if (filtered.length === current.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function setCustomSessions(sessions: TeachingSession[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}
