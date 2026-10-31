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
  {
    id: 'session-math-02',
    title: 'Toán Lớp 1 — Tiết 2: So sánh & Số 6 đến 10',
    subject: 'math',
    grade: 1,
    description: 'Kịch bản 35 phút: Khởi động gọi tên -> Bài học so sánh số lượng và đếm đồ vật 6-10 -> Thi đua tính nhanh -> Tổng kết điểm 4 đội.',
    estimatedDurationMinutes: 35,
    steps: [
      {
        id: 'step-m2-warmup',
        type: 'warmup',
        title: '1. Khởi động: Vòng quay gọi tên & Đố vui so sánh',
        description: 'Phím P quay gọi ngẫu nhiên học sinh lên bảng so sánh số quả táo và bóng.',
        durationMinutes: 5,
        config: { timerSeconds: 60 },
      },
      {
        id: 'step-m2-lesson',
        type: 'lesson',
        title: '2. Bài học tương tác: So sánh nhiều hơn, ít hơn & Số 6 đến 10',
        description: 'Trình chiếu 7 câu hỏi tương tác nhận biết số lượng từ 6 đến 10.',
        durationMinutes: 18,
        lessonId: 'math-02-comparison-6-10',
      },
      {
        id: 'step-m2-game',
        type: 'game',
        title: '3. Thi đua 4 Đội: Nối số nhanh có tính giờ',
        description: 'Bấm giờ 40 giây cho mỗi câu đố. Đội nhanh nhất được cộng điểm.',
        durationMinutes: 8,
        config: { timerSeconds: 40, targetScore: 10 },
      },
      {
        id: 'step-m2-summary',
        type: 'summary',
        title: '4. Trao sao & Khen thưởng cuối tiết',
        description: 'Tuyên dương tinh thần học tập hăng hái của cả lớp.',
        durationMinutes: 4,
      },
    ],
  },
  {
    id: 'session-vn-02',
    title: 'Tiếng Việt Lớp 1 — Tiết 2: Âm d, đ, e, ê & Ghép tiếng',
    subject: 'vietnamese',
    grade: 1,
    description: 'Kịch bản 35 phút: Ôn tập câu sai -> Khám phá âm d, đ, e, ê -> Thực hành đọc tiếng dê, đò, me, bê -> Thi đua nối từ -> Tổng kết.',
    estimatedDurationMinutes: 35,
    steps: [
      {
        id: 'step-v2-warmup',
        type: 'warmup',
        title: '1. Khởi động: Trò chơi tìm chữ cái nhanh',
        description: 'Bấm phím P gọi học sinh lên phân biệt chữ d và đ trên màn hình.',
        durationMinutes: 5,
        config: { timerSeconds: 60 },
      },
      {
        id: 'step-v2-lesson',
        type: 'lesson',
        title: '2. Bài học tương tác: Âm d, đ, e, ê và tiếng ghép',
        description: 'Luyện đọc các tiếng: dê, đò, me, bê và trả lời câu hỏi tương tác.',
        durationMinutes: 18,
        lessonId: 'vn-02-blending',
      },
      {
        id: 'step-v2-game',
        type: 'game',
        title: '3. Thi đua ghép âm: Chạm & Đặt tiếng đúng',
        description: 'Thi đua giữa 4 tổ: điền âm thích hợp vào chỗ trống có bấm giờ.',
        durationMinutes: 8,
        config: { timerSeconds: 30 },
      },
      {
        id: 'step-v2-summary',
        type: 'summary',
        title: '4. Đọc đồng thanh & Tuyên dương tổ xuất sắc',
        description: 'Cả lớp đọc to các từ ứng dụng vừa học, cô trao sao thi đua.',
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
