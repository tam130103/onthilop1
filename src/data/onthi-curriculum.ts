import type { Lesson } from '@/schemas/content.schema';

export interface CurriculumLessonMeta {
  id: string;
  code: string;
  title: string;
  stageTitle: string;
  stageNumber: number;
  subject: 'math' | 'vietnamese' | 'english';
  description: string;
  tags?: string[];
  totalQuestions?: number;
  isSampleAvailable?: boolean;
}

export interface CurriculumStage {
  id: string;
  number: number;
  icon: string;
  title: string;
  subject: 'math' | 'vietnamese' | 'english';
  lessons: CurriculumLessonMeta[];
}

export interface ExamMeta {
  id: string;
  title: string;
  subject: 'math' | 'vietnamese' | 'english';
  term: 'giua-ki-1' | 'cuoi-ki-1' | 'giua-ki-2' | 'cuoi-nam';
  termLabel: string;
  icon: string;
  description: string;
  durationMinutes: number;
}

export interface ToolMeta {
  id: string;
  icon: string;
  title: string;
  description: string;
  route: string;
  badge?: string;
}

// ==========================================
// 1. TOÁN LỚP 1 (48 BÀI - 11 CHẶNG KẾT NỐI TRI THỨC)
// ==========================================
export const MATH_STAGES: CurriculumStage[] = [
  {
    id: 'math-stage-1',
    number: 1,
    icon: '🌱',
    title: 'Chặng 1: Các số 0 – 10',
    subject: 'math',
    lessons: [
      { id: 'math-01-counting', code: 'B1', title: 'Đếm các số 1 đến 5', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Tập đếm và nhận biết nhóm có 1, 2, 3, 4, 5 đồ vật, con vật sinh động.', isSampleAvailable: true },
      { id: 'math-02-comparison-6-10', code: 'B2', title: 'So sánh & Số 6 đến 10', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'So sánh nhiều hơn, ít hơn và đếm thành thạo các số từ 6 đến 10.', isSampleAvailable: true },
      { id: 'math-03-addition-within-5', code: 'B3', title: 'Tách – Gộp & Cộng phạm vi 5', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Thao tác tách - gộp số lượng và bảng cộng trong phạm vi 5.', isSampleAvailable: true },
      { id: 'math-04-subtraction-within-5', code: 'B4', title: 'Phép trừ phạm vi 5 & Số 0', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Bớt đi là trừ và ý nghĩa thực tế của số 0.', isSampleAvailable: true },
      { id: 'math-05-add-sub-within-10', code: 'B5', title: 'Cộng & trừ trong phạm vi 10', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Nâng cao tính nhẩm cộng trừ thành thạo đến 10.', isSampleAvailable: true },
      { id: 'math-06-shapes-and-patterns', code: 'B6', title: 'Hình phẳng & Quy luật sắp xếp', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Hình tròn, vuông, tam giác, chữ nhật và chuỗi quy luật.', isSampleAvailable: true },
      { id: 'math-07-compare-10', code: 'B7', title: 'So sánh các số trong phạm vi 10', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Dấu lớn hơn (>), bé hơn (<) và bằng (=) trong phạm vi 10.', isSampleAvailable: true },
      { id: 'math-08-decompose-10', code: 'B8', title: 'Tách – Gộp các số trong phạm vi 10', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Tách và gộp số lượng (ví dụ: 5 gồm 3 và 2).', isSampleAvailable: true },
      { id: 'math-09-number-line-10', code: 'B9', title: 'Tia số & Thứ tự các số đến 10', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Xác định thứ tự trước, sau, liền kề trên tia số 0-10.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-2',
    number: 2,
    icon: '🔷',
    title: 'Chặng 2: Hình phẳng & Hình khối',
    subject: 'math',
    lessons: [
      { id: 'math-10-3d-shapes', code: 'B10', title: 'Khối lập phương & Khối hộp chữ nhật', stageTitle: 'Hình phẳng & Hình khối', stageNumber: 2, subject: 'math', description: 'Nhận diện hình khối lập phương, khối hộp chữ nhật trong đời sống.', isSampleAvailable: true },
      { id: 'math-11-spatial-orientation', code: 'B11', title: 'Định hướng không gian (Trước - sau, trên - dưới, trái - phải)', stageTitle: 'Hình phẳng & Hình khối', stageNumber: 2, subject: 'math', description: 'Xác định phương hướng và vị trí các đồ vật quanh em.', isSampleAvailable: true },
      { id: 'math-12-review-term1', code: 'B12', title: 'Ôn tập học kì 1 Toán Lớp 1', stageTitle: 'Hình phẳng & Hình khối', stageNumber: 2, subject: 'math', description: 'Tổng ôn tập phép cộng trừ trong phạm vi 10 và nhận dạng hình học HK1.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-3',
    number: 3,
    icon: '➕',
    title: 'Chặng 3: Số tròn chục & Các số đến 100',
    subject: 'math',
    lessons: [
      { id: 'math-13-tron-chuc', code: 'B13', title: 'Các số tròn chục (10 đến 90) & Phép tính', stageTitle: 'Phép cộng & Số tròn chục', stageNumber: 3, subject: 'math', description: 'Đọc, viết các số tròn chục và cộng trừ số tròn chục.', isSampleAvailable: true },
      { id: 'math-14-den-100', code: 'B14', title: 'Các số đến 100 (Đọc, viết & cấu tạo số)', stageTitle: 'Phép cộng & Số tròn chục', stageNumber: 3, subject: 'math', description: 'Đọc, viết và cấu tạo hàng chục, hàng đơn vị các số đến 100.', isSampleAvailable: true },
      { id: 'math-15-so-sanh-100', code: 'B15', title: 'So sánh các số có hai chữ số & Thứ tự', stageTitle: 'Phép cộng & Số tròn chục', stageNumber: 3, subject: 'math', description: 'So sánh các số có hai chữ số và sắp xếp dãy số thứ tự.', isSampleAvailable: true },
      { id: 'math-16-cong-2cs-1cs', code: 'B16', title: 'Phép cộng số có hai chữ số với số có một chữ số', stageTitle: 'Phép cộng & Số tròn chục', stageNumber: 3, subject: 'math', description: 'Thực hiện phép tính cộng không nhớ: 24 + 5, 61 + 7.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-4',
    number: 4,
    icon: '➖',
    title: 'Chặng 4: Phép tính & Thời gian',
    subject: 'math',
    lessons: [
      { id: 'math-17-cong-2cs-2cs', code: 'B17', title: 'Phép cộng số có hai chữ số với số có hai chữ số', stageTitle: 'Phép trừ & Phép cộng nâng cao', stageNumber: 4, subject: 'math', description: 'Cộng hai số có hai chữ số không nhớ: 32 + 15, 40 + 28.', isSampleAvailable: true },
      { id: 'math-18-tru-2cs-khong-nho', code: 'B18', title: 'Phép trừ số có hai chữ số (không nhớ)', stageTitle: 'Phép trừ & Phép cộng nâng cao', stageNumber: 4, subject: 'math', description: 'Trừ hai số có hai chữ số không nhớ: 48 - 6, 57 - 23.', isSampleAvailable: true },
      { id: 'math-19-dong-ho-thoi-gian', code: 'B19', title: 'Xem đồng hồ (Giờ đúng) & Ngày trong tuần', stageTitle: 'Phép trừ & Phép cộng nâng cao', stageNumber: 4, subject: 'math', description: 'Làm quen mặt đồng hồ kim, giờ đúng và các ngày trong tuần.', isSampleAvailable: true },
      { id: 'math-20-on-tap-tong-hop', code: 'B20', title: 'Ôn tập tổng hợp cuối năm Toán Lớp 1', stageTitle: 'Phép trừ & Phép cộng nâng cao', stageNumber: 4, subject: 'math', description: 'Phép tính liên tiếp 3 số và giải toán có lời văn ngắn.', isSampleAvailable: true },
      { id: 'math-21-tinh-ba-so', code: 'B21', title: 'Bài 21: Tính ba số liên tiếp', stageTitle: 'Phép trừ & Phép cộng nâng cao', stageNumber: 4, subject: 'math', description: 'Thực hiện chuỗi hai phép tính liên tiếp từ trái sang phải trong phạm vi 10 và 20.', isSampleAvailable: true },
      { id: 'math-22-so-sanh-phep-tinh', code: 'B22', title: 'Bài 22: So sánh với phép tính', stageTitle: 'Phép trừ & Phép cộng nâng cao', stageNumber: 4, subject: 'math', description: 'So sánh kết quả phép tính với một số hoặc giữa hai phép tính.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-5',
    number: 5,
    icon: '🧊',
    title: 'Chặng 5: Khối hình & Độ dài',
    subject: 'math',
    lessons: [
      { id: 'math-23-dai-ngan-so-sanh', code: 'B23', title: 'Bài 23: Dài hơn, ngắn hơn', stageTitle: 'Độ dài', stageNumber: 5, subject: 'math', description: 'So sánh độ dài trực tiếp bằng mắt và thước đo trực quan.', isSampleAvailable: true },
      { id: 'math-24-xang-ti-met', code: 'B24', title: 'Bài 24: Đo độ dài & Xăng-ti-mét (cm)', stageTitle: 'Độ dài', stageNumber: 5, subject: 'math', description: 'Đơn vị đo độ dài cm, cách đặt thước đo từ vạch số 0.', isSampleAvailable: true },
      { id: 'math-25-dem-them-2-5-10', code: 'B25', title: 'Bài 25: Đếm thêm 2, thêm 5, thêm 10', stageTitle: 'Các số đến 100', stageNumber: 5, subject: 'math', description: 'Đếm nhảy bước 2, 5, 10 trên bảng số.', isSampleAvailable: true },
      { id: 'math-26-tim-so-con-thieu', code: 'B26', title: 'Bài 26: Tìm số còn thiếu', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 5, subject: 'math', description: 'Điền số thích hợp vào ô trống trong phép tính.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-6',
    number: 6,
    icon: '👑',
    title: 'Chặng 6: Phép tính & Đấu trường 100',
    subject: 'math',
    lessons: [
      { id: 'math-27-tinh-ba-so-100', code: 'B27', title: 'Bài 27: Tính ba số trong phạm vi 100', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 6, subject: 'math', description: 'Thực hiện biểu thức có hai dấu cộng hoặc trừ.', isSampleAvailable: true },
      { id: 'math-28-giai-toan-loi-van', code: 'B28', title: 'Bài 28: Giải bài toán có lời văn', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 6, subject: 'math', description: 'Nhận biết đề bài toán có lời văn và tóm tắt bài toán.', isSampleAvailable: true },
      { id: 'math-29-thoi-gian-trong-ngay', code: 'B29', title: 'Bài 29: Thời gian trong ngày & Xem đồng hồ', stageTitle: 'Thời gian', stageNumber: 6, subject: 'math', description: 'Các buổi trong ngày và sinh hoạt tương ứng của bé.', isSampleAvailable: true },
      { id: 'math-30-dau-truong-toan-1', code: 'B30', title: 'Bài 30: Đấu trường Toán Lớp 1 (Tổng kết)', stageTitle: 'Ôn tập cuối năm', stageNumber: 6, subject: 'math', description: 'Tổng ôn tập toàn bộ số học lớp 1.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-7',
    number: 7,
    icon: '📐',
    title: 'Chặng 7: Hình khối & Định hướng thực hành',
    subject: 'math',
    lessons: [
      { id: 'math-31-khoi-lap-phuong-hop', code: 'B31', title: 'Bài 31: Khối lập phương & Khối hộp chữ nhật', stageTitle: 'Hình khối & Định hướng thực hành', stageNumber: 7, subject: 'math', description: 'Nhận biết khối lập phương và khối hộp chữ nhật trong thực tế.', isSampleAvailable: true },
      { id: 'math-32-vi-tri-khong-gian', code: 'B32', title: 'Bài 32: Định hướng Vị trí không gian', stageTitle: 'Hình khối & Định hướng thực hành', stageNumber: 7, subject: 'math', description: 'Định hướng vị trí không gian: trước sau, ở giữa, trên dưới, trái phải.', isSampleAvailable: true },
      { id: 'math-33-xep-hinh-khoi', code: 'B33', title: 'Bài 33: Thực hành Xếp hình bằng khối', stageTitle: 'Hình khối & Định hướng thực hành', stageNumber: 7, subject: 'math', description: 'Xếp các khối hình thành tòa tháp, ngôi nhà, cây cầu.', isSampleAvailable: true },
      { id: 'math-34-boss-hk1', code: 'B34', title: 'Bài 34: BOSS Thử Thách Ôn Tập Học Kì 1', stageTitle: 'Hình khối & Định hướng thực hành', stageNumber: 7, subject: 'math', description: 'Đấu trường thử thách toàn bộ kiến thức Toán Học kì 1.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-8',
    number: 8,
    icon: '💯',
    title: 'Chặng 8: Cấu tạo số & Bảng số 100',
    subject: 'math',
    lessons: [
      { id: 'math-35-so-11-den-20', code: 'B35', title: 'Bài 35: Các số từ 11 đến 20', stageTitle: 'Cấu tạo số & Bảng số 100', stageNumber: 8, subject: 'math', description: 'Đọc, viết và phân tích số hàng chục, hàng đơn vị từ 11 đến 20.', isSampleAvailable: true },
      { id: 'math-36-so-tron-chuc', code: 'B36', title: 'Bài 36: Các số tròn chục đến 90', stageTitle: 'Cấu tạo số & Bảng số 100', stageNumber: 8, subject: 'math', description: 'Nhận biết 10, 20, 30, ..., 90 và cộng trừ số tròn chục.', isSampleAvailable: true },
      { id: 'math-37-so-hai-chu-so', code: 'B37', title: 'Bài 37: Đọc và Viết số có hai chữ số', stageTitle: 'Cấu tạo số & Bảng số 100', stageNumber: 8, subject: 'math', description: 'Đọc, viết các số có hai chữ số từ 21 đến 99.', isSampleAvailable: true },
      { id: 'math-38-so-sanh-so-100', code: 'B38', title: 'Bài 38: So sánh các số đến 100', stageTitle: 'Cấu tạo số & Bảng số 100', stageNumber: 8, subject: 'math', description: 'So sánh chữ số hàng chục và hàng đơn vị của hai số.', isSampleAvailable: true },
      { id: 'math-39-bang-so-1-100', code: 'B39', title: 'Bài 39: Bảng các số từ 1 đến 100', stageTitle: 'Cấu tạo số & Bảng số 100', stageNumber: 8, subject: 'math', description: 'Khám phá quy luật hàng và cột trong bảng số 100.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-9',
    number: 9,
    icon: '🚀',
    title: 'Chặng 9: Cộng trừ không nhớ & Giải toán',
    subject: 'math',
    lessons: [
      { id: 'math-40-cong-pham-vi-100', code: 'B40', title: 'Bài 40: Phép cộng trong phạm vi 100 (Không nhớ)', stageTitle: 'Cộng trừ không nhớ & Giải toán', stageNumber: 9, subject: 'math', description: 'Cộng số có hai chữ số với số có hai chữ số không nhớ.', isSampleAvailable: true },
      { id: 'math-41-tru-pham-vi-100', code: 'B41', title: 'Bài 41: Phép trừ trong phạm vi 100 (Không nhớ)', stageTitle: 'Cộng trừ không nhớ & Giải toán', stageNumber: 9, subject: 'math', description: 'Trừ số có hai chữ số cho số có hai chữ số không nhớ.', isSampleAvailable: true },
      { id: 'math-42-viet-phep-tinh', code: 'B42', title: 'Bài 42: Bài toán — Viết phép tính phù hợp', stageTitle: 'Cộng trừ không nhớ & Giải toán', stageNumber: 9, subject: 'math', description: 'Viết phép tính tương ứng với tình huống bài toán.', isSampleAvailable: true },
      { id: 'math-43-neu-cau-tra-loi', code: 'B43', title: 'Bài 43: Bài toán — Nêu câu trả lời hoàn chỉnh', stageTitle: 'Cộng trừ không nhớ & Giải toán', stageNumber: 9, subject: 'math', description: 'Hoàn thành câu trả lời hoàn chỉnh kèm đơn vị.', isSampleAvailable: true },
    ],
  },
  {
    id: 'math-stage-10',
    number: 10,
    icon: '🕐',
    title: 'Chặng 10: Thời gian, Đồng hồ & Lịch',
    subject: 'math',
    lessons: [
      { id: 'math-44-xem-gio-dung', code: 'B44', title: 'Bài 44: Xem đồng hồ — Giờ đúng', stageTitle: 'Thời gian, Đồng hồ & Lịch', stageNumber: 10, subject: 'math', description: 'Nhận biết kim giờ, kim phút và đọc đồng hồ đúng giờ.', isSampleAvailable: true },
      { id: 'math-45-cac-ngay-trong-tuan', code: 'B45', title: 'Bài 45: Các ngày trong tuần', stageTitle: 'Thời gian, Đồng hồ & Lịch', stageNumber: 10, subject: 'math', description: 'Thứ Hai đến Chủ Nhật, ngày đi học và ngày nghỉ cuối tuần.', isSampleAvailable: true },
      { id: 'math-46-doc-thoi-khoa-bieu', code: 'B46', title: 'Bài 46: Đọc thời khóa biểu lớp học', stageTitle: 'Thời gian, Đồng hồ & Lịch', stageNumber: 10, subject: 'math', description: 'Tra cứu môn học theo thứ và tiết học.', isSampleAvailable: true },
      { id: 'math-47-thuc-hanh-xem-lich', code: 'B47', title: 'Bài 47: Thực hành Xem lịch và Giờ', stageTitle: 'Thời gian, Đồng hồ & Lịch', stageNumber: 10, subject: 'math', description: 'Xem tờ lịch ngày, tháng và đồng hồ treo tường.', isSampleAvailable: true },
      { id: 'math-48-boss-hinh-do-luong', code: 'B48', title: 'Bài 48: BOSS Đấu Trường Hình Học & Đo Lường', stageTitle: 'Thời gian, Đồng hồ & Lịch', stageNumber: 10, subject: 'math', description: 'Tổng ôn tập toàn diện hình học, độ dài và thời gian Lớp 1.', isSampleAvailable: true },
    ],
  },
];

// ==========================================
// 2. TIẾNG VIỆT LỚP 1 (40 BÀI - 10 CHẶNG CHUẨN)
// ==========================================
export const VIETNAMESE_STAGES: CurriculumStage[] = [
  {
    id: 'vn-stage-1',
    number: 1,
    icon: '🔤',
    title: 'Chặng 1: Làm quen chữ cái',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-01-phonics', code: 'B1', title: 'Bài 1: Âm a, b, c và dấu thanh', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Làm quen âm a, chữ b, c, dấu huyền, dấu sắc.', isSampleAvailable: true },
      { id: 'vn-02-blending', code: 'B2', title: 'Bài 2: Âm d, đ, e, ê & Tiếng ghép', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Nhận biết âm d, đ, e, ê và đọc tiếng dê, đò, me, bê.', isSampleAvailable: true },
      { id: 'vn-03-i-k-l-h', code: 'B3', title: 'Bài 3: Âm i, k, l, h & Tiếng mẫu', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Nhận diện âm i, k, l, h và ghép tiếng bi, kì, lá, hồ.', isSampleAvailable: true },
      { id: 'vn-04-m-n-u-uw', code: 'B4', title: 'Bài 4: Âm m, n, u, ư & Từ ứng dụng', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Phát âm m, n, u, ư và từ ứng dụng mẹ yêu, cái nơ, cá mú.', isSampleAvailable: true },
      { id: 'vn-05-digraphs-ch-kh-nh-th-tr', code: 'B5', title: 'Bài 5: Phụ âm ghép ch, kh, nh, th, tr', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Làm quen 5 phụ âm ghép ch, kh, nh, th, tr qua từ quen thuộc.', isSampleAvailable: true },
      { id: 'vn-06-spelling-rules-c-k-g-gh-ng-ngh', code: 'B6', title: 'Bài 6: Quy tắc chính tả c/k, g/gh, ng/ngh', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Quy tắc vàng phân biệt c/k, g/gh, ng/ngh trong tiếng Việt.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-2',
    number: 2,
    icon: '🏡',
    title: 'Chặng 2: Chữ quanh nhà',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-07-o-o-o', code: 'B7', title: 'Bài 7: Âm o, ô, ơ và tiếng ghép', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Làm quen các nguyên âm tròn môi o, ô, ơ và tiếng cô giáo, cờ đỏ.', isSampleAvailable: true },
      { id: 'vn-08-u-u-y', code: 'B8', title: 'Bài 8: Âm u, ư, y và tiếng ghép', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Phát âm u, ư, y và phân biệt i ngắn - y dài qua từ y tá, quả đu đủ.', isSampleAvailable: true },
      { id: 'vn-09-p-ph-qu-r-s-x', code: 'B9', title: 'Bài 9: Các phụ âm p, ph, qu, r, s, x', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Khám phá phụ âm đơn và ghép: phố thị, quà quê, rùa vàng, xe ca.', isSampleAvailable: true },
      { id: 'vn-10-van-m-n', code: 'B10', title: 'Bài 10: Các vần kết thúc bằng m, n', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Vần an, at, am, ap và tiếng thơm tho, con tằm, bạn bè.', isSampleAvailable: true },
      { id: 'vn-11-van-t-c', code: 'B11', title: 'Bài 11: Các vần kết thúc bằng t, c', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Vần ac, at, oc, ot và từ ngữ ứng dụng con hạc, hạt thóc, cột cờ.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-3',
    number: 3,
    icon: '🌈',
    title: 'Chặng 3: Chữ muôn nơi',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-12-review-sem1', code: 'B12', title: 'Bài 12: Ôn tập học kì 1 Tiếng Việt', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Ôn tập tổng hợp bảng chữ cái, âm đầu, vần và đọc câu ngắn HK1.', isSampleAvailable: true },
      { id: 'vn-13-van-ng-nh', code: 'B13', title: 'Bài 13: Các vần kết thúc bằng ng, nh', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Vần ang, anh, ăng, inh, ênh, uynh và từ măng tre, bình hoa.', isSampleAvailable: true },
      { id: 'vn-14-van-p', code: 'B14', title: 'Bài 14: Các vần kết thúc bằng p', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Vần ăp, âp, op, ôp, ơp, ep, êp, ip, up và từ cặp sách, cá chép.', isSampleAvailable: true },
      { id: 'vn-15-nguyen-am-doi', code: 'B15', title: 'Bài 15: Các vần nguyên âm đôi', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Vần iêu, yêu, uôi, ươi, ươu và từ cánh diều, nải chuối, quả bưởi.', isSampleAvailable: true },
      { id: 'vn-16-am-dem-tron-moi', code: 'B16', title: 'Bài 16: Các vần có âm đệm tròn môi', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Vần oai, oay, uê, uy, uya, uyên, uyêt và từ củ khoai, hoa huệ.', isSampleAvailable: true },
      { id: 'vn-17-doc-hieu-gia-dinh', code: 'B17', title: 'Bài 17: Đọc hiểu Gia đình & Nhà trường', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Luyện đọc hiểu câu và đoạn văn ngắn về gia đình và thầy cô.', isSampleAvailable: true },
      { id: 'vn-18-doc-hieu-thien-nhien', code: 'B18', title: 'Bài 18: Đọc hiểu Thiên nhiên & Loài vật', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Luyện đọc hiểu đoạn văn ngắn về thiên nhiên và bảo vệ môi trường.', isSampleAvailable: true },
      { id: 'vn-19-chinh-ta-nang-cao', code: 'B19', title: 'Bài 19: Chính tả nâng cao l/n, hỏi/ngã', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Quy tắc chính tả phân biệt l/n, hỏi/ngã, an/ang, in/inh.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-4',
    number: 4,
    icon: '🤝',
    title: 'Chặng 4: Chữ nắm tay & Ghép phụ âm',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-20-review-final', code: 'B20', title: 'Bài 20: Ôn tập Tiếng Việt cuối năm', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Ghép từ thành câu hoàn chỉnh, đọc hiểu đoạn văn và lên lớp 2.', isSampleAvailable: true },
      { id: 'vn-21-am-g-gi', code: 'B21', title: 'Bài 21: Âm g, gi và tiếng ghép', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Âm g, gi và tiếng gà, gỗ, gió, giỏ.', isSampleAvailable: true },
      { id: 'vn-22-am-gh-nh', code: 'B22', title: 'Bài 22: Phụ âm ghép gh, nh', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Quy tắc gh ghép với e, ê, i và phụ âm nh.', isSampleAvailable: true },
      { id: 'vn-23-am-ng-ngh', code: 'B23', title: 'Bài 23: Âm ng, ngh', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Phân biệt chính tả ng và ngh.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-5',
    number: 5,
    icon: '✨',
    title: 'Chặng 5: Chữ tài hoa & Cặp vần',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-24-van-ia-ua-ua', code: 'B24', title: 'Bài 24: Vần ia, ua, ưa', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Các vần ia, ua, ưa trong từ quả dừa, con rùa, cây mía.', isSampleAvailable: true },
      { id: 'vn-25-van-oi-ai-oi-ui', code: 'B25', title: 'Bài 25: Vần oi, ai, ôi, ơi, ui', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Chùm vần kết thúc bằng i: quả ổi, nải chuối, thổi còi, chú bộ đội.', isSampleAvailable: true },
      { id: 'vn-26-van-ao-eo-au-au', code: 'B26', title: 'Bài 26: Vần ao, eo, au, âu', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Chùm vần kết thúc bằng o/u: ngôi sao, con mèo, quả cau, bồ câu.', isSampleAvailable: true },
      { id: 'vn-27-van-iu-uu', code: 'B27', title: 'Bài 27: Vần iu, ưu', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Luyện phát âm iu, ưu trong từ con cừu, chim hót líu lo.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-6',
    number: 6,
    icon: '✍️',
    title: 'Chặng 6: Đọc hiểu & Trạng nguyên',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-28-doc-hieu-ong-ba-cha-me', code: 'B28', title: 'Bài 28: Đọc hiểu Ông bà & Cha mẹ', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Luyện đọc hiểu đoạn văn về gia đình, ông bà, bố mẹ.', isSampleAvailable: true },
      { id: 'vn-29-doc-hieu-truong-lop-ban-be', code: 'B29', title: 'Bài 29: Đọc hiểu Trường lớp & Bạn bè', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Luyện đọc hiểu câu và đoạn văn ngắn về thầy cô, mái trường.', isSampleAvailable: true },
      { id: 'vn-30-dau-truong-trang-nguyen-vn', code: 'B30', title: 'Bài 30: Đấu trường Trạng Nguyên Tiếng Việt 1', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Đấu trường tổng hợp âm vần, chính tả và đọc hiểu Lớp 1.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-7',
    number: 7,
    icon: '🔔',
    title: 'Chặng 7: Vần có âm cuối n',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-31-van-an-an-an', code: 'B31', title: 'Bài 31: Các vần an, ăn, ân', stageTitle: 'Vần có âm cuối n', stageNumber: 7, subject: 'vietnamese', description: 'Vần an, ăn, ân trong từ cái bàn, khăn quàng, sân trường.', isSampleAvailable: true },
      { id: 'vn-32-van-on-on-on', code: 'B32', title: 'Bài 32: Các vần on, ôn, ơn', stageTitle: 'Vần có âm cuối n', stageNumber: 7, subject: 'vietnamese', description: 'Vần on, ôn, ơn trong nón lá, ôn bài, sơn ca, cảm ơn.', isSampleAvailable: true },
      { id: 'vn-33-van-en-en-in', code: 'B33', title: 'Bài 33: Các vần en, ên, in', stageTitle: 'Vần có âm cuối n', stageNumber: 7, subject: 'vietnamese', description: 'Vần en, ên, in trong hoa sen, mũi tên, đèn pin sáng rực.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-8',
    number: 8,
    icon: '🍊',
    title: 'Chặng 8: Vần có âm cuối m',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-34-van-am-am-am', code: 'B34', title: 'Bài 34: Các vần am, ăm, âm', stageTitle: 'Vần có âm cuối m', stageNumber: 8, subject: 'vietnamese', description: 'Vần am, ăm, âm trong quả cam, chăm chỉ, cây nấm nhỏ.', isSampleAvailable: true },
      { id: 'vn-35-van-om-om-em', code: 'B35', title: 'Bài 35: Các vần om, ôm, em', stageTitle: 'Vần có âm cuối m', stageNumber: 8, subject: 'vietnamese', description: 'Vần om, ôm, em trong đom đóm, con tôm, que kem mát lạnh.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-9',
    number: 9,
    icon: '🌊',
    title: 'Chặng 9: Vần có âm cuối c và t',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-36-van-ac-at', code: 'B36', title: 'Bài 36: Các vần ac, ăc, at, ăt', stageTitle: 'Vần có âm cuối c và t', stageNumber: 9, subject: 'vietnamese', description: 'Vần ac, ăc, at, ăt trong chim hạc, tắc kè, hạt thóc, mặt trời.', isSampleAvailable: true },
      { id: 'vn-37-van-oc-ot', code: 'B37', title: 'Bài 37: Các vần oc, ôc, ot, ôt', stageTitle: 'Vần có âm cuối c và t', stageNumber: 9, subject: 'vietnamese', description: 'Vần oc, ôc, ot, ôt trong con cóc, đi học, con ốc, cột cờ.', isSampleAvailable: true },
    ],
  },
  {
    id: 'vn-stage-10',
    number: 10,
    icon: '🌟',
    title: 'Chặng 10: Vần nâng cao & Đọc hiểu quê hương',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-38-van-ang-anh', code: 'B38', title: 'Bài 38: Các vần ang, ăng, anh, inh', stageTitle: 'Vần nâng cao & Đọc hiểu', stageNumber: 10, subject: 'vietnamese', description: 'Vần ngân vang ang, ăng, anh, inh trong măng tre, bình hoa.', isSampleAvailable: true },
      { id: 'vn-39-van-iec-ieu', code: 'B39', title: 'Bài 39: Các vần iêc, iên, iêu, yêu', stageTitle: 'Vần nâng cao & Đọc hiểu', stageNumber: 10, subject: 'vietnamese', description: 'Vần nguyên âm đôi cánh diều, cô tiên, làm việc, yêu thương.', isSampleAvailable: true },
      { id: 'vn-40-doc-hieu-que-huong', code: 'B40', title: 'Bài 40: Đọc hiểu Đoạn văn — Quê hương tươi đẹp', stageTitle: 'Vần nâng cao & Đọc hiểu', stageNumber: 10, subject: 'vietnamese', description: 'Đoạn văn đọc hiểu ngợi ca vẻ đẹp quê hương làng xóm và Tổ quốc.', isSampleAvailable: true },
    ],
  },
];

// ==========================================
// 3. TIẾNG ANH LỚP 1 (GLOBAL SUCCESS)
// ==========================================
export const ENGLISH_STAGES: CurriculumStage[] = [
  {
    id: 'en-stage-1',
    number: 1,
    icon: '🏫',
    title: 'Unit 1–4: Welcome & School Life',
    subject: 'english',
    lessons: [
      { id: 'en-starter-hello', code: 'U0', title: 'Starter: Hello!', stageTitle: 'Welcome & School Life', stageNumber: 1, subject: 'english', description: 'Greetings: Hello, Goodbye, Stand up, Sit down.' },
      { id: 'en-u1-playground', code: 'U1', title: 'Unit 1: In the school playground', stageTitle: 'Welcome & School Life', stageNumber: 1, subject: 'english', description: 'Ball, bike, book. Phonics Letter B b. Sentence: "Hi, I\'m Bill."' },
      { id: 'en-u2-dining-room', code: 'U2', title: 'Unit 2: In the dining room', stageTitle: 'Welcome & School Life', stageNumber: 1, subject: 'english', description: 'Cake, car, cat, cup. Phonics Letter C c. Sentence: "I have a car."' },
      { id: 'en-u3-street-market', code: 'U3', title: 'Unit 3: At the street market', stageTitle: 'Welcome & School Life', stageNumber: 1, subject: 'english', description: 'Apple, bag, can, hat. Phonics Letter A a. Sentence: "This is my bag."' },
      { id: 'en-u4-bedroom', code: 'U4', title: 'Unit 4: In the bedroom', stageTitle: 'Welcome & School Life', stageNumber: 1, subject: 'english', description: 'Desk, dog, door, duck. Phonics Letter D d. Sentence: "This is a dog."' },
    ],
  },
  {
    id: 'en-stage-2',
    number: 2,
    icon: '🍎',
    title: 'Unit 5–8: Food, Classroom & Outdoors',
    subject: 'english',
    lessons: [
      { id: 'en-u5-fish-chips', code: 'U5', title: 'Unit 5: At the fish and chip shop', stageTitle: 'Food, Classroom & Outdoors', stageNumber: 2, subject: 'english', description: 'Chicken, chips, fish, milk. Phonics Letter I i. Sentence: "I like milk."' },
      { id: 'en-u6-classroom', code: 'U6', title: 'Unit 6: In the classroom', stageTitle: 'Food, Classroom & Outdoors', stageNumber: 2, subject: 'english', description: 'Bell, pen, pencil, red. Phonics Letter E e. Sentence: "It\'s a red pen."' },
      { id: 'en-u7-garden', code: 'U7', title: 'Unit 7: In the garden', stageTitle: 'Food, Classroom & Outdoors', stageNumber: 2, subject: 'english', description: 'Garden, gate, girl, goat. Phonics Letter G g. Sentence: "There\'s a garden."' },
      { id: 'en-u8-park', code: 'U8', title: 'Unit 8: In the park', stageTitle: 'Food, Classroom & Outdoors', stageNumber: 2, subject: 'english', description: 'Hair, hand, head, horse. Phonics Letter H h. Sentence: "Touch your hair."' },
    ],
  },
  {
    id: 'en-stage-3',
    number: 3,
    icon: '🦁',
    title: 'Unit 9–12: Animals & Community',
    subject: 'english',
    lessons: [
      { id: 'en-u9-shop', code: 'U9', title: 'Unit 9: In the shop', stageTitle: 'Animals & Community', stageNumber: 3, subject: 'english', description: 'Ink, insect. Phonics Letter I i. Asking for things.' },
      { id: 'en-u10-zoo', code: 'U10', title: 'Unit 10: At the zoo', stageTitle: 'Animals & Community', stageNumber: 3, subject: 'english', description: 'Monkey, mouse, mother. Phonics Letter M m. Sentence: "I see a monkey."' },
      { id: 'en-u11-bus-stop', code: 'U11', title: 'Unit 11: At the bus stop', stageTitle: 'Animals & Community', stageNumber: 3, subject: 'english', description: 'Bus, sun, truck, umbrella. Phonics Letter U u. Getting on the bus.' },
      { id: 'en-u12-lake', code: 'U12', title: 'Unit 12: At the lake', stageTitle: 'Animals & Community', stageNumber: 3, subject: 'english', description: 'Lake, leaf, lemon. Phonics Letter L l. Look at the lake!' },
    ],
  },
  {
    id: 'en-stage-4',
    number: 4,
    icon: '⚽',
    title: 'Unit 13–16: Play, Sports & Family',
    subject: 'english',
    lessons: [
      { id: 'en-u13-canteen', code: 'U13', title: 'Unit 13: In the school canteen', stageTitle: 'Play, Sports & Family', stageNumber: 4, subject: 'english', description: 'Juice, jelly, jam. Phonics Letter J j. "Do you want some juice?"' },
      { id: 'en-u14-toy-shop', code: 'U14', title: 'Unit 14: In the toy shop', stageTitle: 'Play, Sports & Family', stageNumber: 4, subject: 'english', description: 'Kite, kitten. Phonics Letter K k. "Look at my kite!"' },
      { id: 'en-u15-football', code: 'U15', title: 'Unit 15: At the football match', stageTitle: 'Play, Sports & Family', stageNumber: 4, subject: 'english', description: 'Football, father. Phonics Letter F f. Playing sports.' },
      { id: 'en-u16-home', code: 'U16', title: 'Unit 16: At home', stageTitle: 'Play, Sports & Family', stageNumber: 4, subject: 'english', description: 'Bed, box. Comprehensive review of Units 1–16.' },
    ],
  },
];

// ==========================================
// 4. ĐỀ THI 4 KỲ CHUẨN (TOÁN & TIẾNG VIỆT)
// ==========================================
export const EXAMS_LIST: ExamMeta[] = [
  {
    id: 'exam-toan-giua-ki-1',
    title: 'Đề Ôn giữa học kì 1 Toán Lớp 1',
    subject: 'math',
    term: 'giua-ki-1',
    termLabel: 'Giữa Kì 1',
    icon: '🍂',
    description: 'Kiểm tra đếm, so sánh số 0-10, nhận biết hình phẳng (vuông, tròn, tam giác). Có đáp án & chấm điểm tự động.',
    durationMinutes: 20,
  },
  {
    id: 'exam-toan-cuoi-ki-1',
    title: 'Đề thi Cuối học kì 1 Toán Lớp 1',
    subject: 'math',
    term: 'cuoi-ki-1',
    termLabel: 'Cuối Kì 1',
    icon: '❄️',
    description: 'Tổng hợp phép cộng, trừ phạm vi 10, khối lập phương, khối hộp, tính ba số. Chuẩn ma trận đề GDPT 2018.',
    durationMinutes: 35,
  },
  {
    id: 'exam-toan-giua-ki-2',
    title: 'Đề Ôn giữa học kì 2 Toán Lớp 1',
    subject: 'math',
    term: 'giua-ki-2',
    termLabel: 'Giữa Kì 2',
    icon: '🌸',
    description: 'Các số từ 11 đến 100, đo độ dài xăng-ti-mét, cộng trừ số tròn chục.',
    durationMinutes: 25,
  },
  {
    id: 'exam-toan-cuoi-nam',
    title: 'Đề thi Cuối năm Toán Lớp 1',
    subject: 'math',
    term: 'cuoi-nam',
    termLabel: 'Cuối Năm',
    icon: '🌞',
    description: 'Đề thi chính thức tổng hợp toàn bộ chương trình Toán Lớp 1, xem giờ đồng hồ và bài toán có lời văn.',
    durationMinutes: 40,
  },
  {
    id: 'exam-tv-giua-ki-1',
    title: 'Đề Ôn giữa học kì 1 Tiếng Việt Lớp 1',
    subject: 'vietnamese',
    term: 'giua-ki-1',
    termLabel: 'Giữa Kì 1',
    icon: '🍂',
    description: 'Kiểm tra bảng chữ cái, phân biệt dấu thanh, đọc từ ngữ và nối chữ tương ứng.',
    durationMinutes: 20,
  },
  {
    id: 'exam-tv-cuoi-ki-1',
    title: 'Đề thi Cuối học kì 1 Tiếng Việt Lớp 1',
    subject: 'vietnamese',
    term: 'cuoi-ki-1',
    termLabel: 'Cuối Kì 1',
    icon: '❄️',
    description: 'Đánh giá các cụm vần đã học (an, am, ac, at, iê, uô, ươ), đọc hiểu câu chuyện ngắn.',
    durationMinutes: 35,
  },
  {
    id: 'exam-tv-giua-ki-2',
    title: 'Đề Ôn giữa học kì 2 Tiếng Việt Lớp 1',
    subject: 'vietnamese',
    term: 'giua-ki-2',
    termLabel: 'Giữa Kì 2',
    icon: '🌸',
    description: 'Kiểm tra vần có âm đệm (oan, uê, uyên), phân biệt chính tả l/n, s/x, tr/ch.',
    durationMinutes: 25,
  },
  {
    id: 'exam-tv-cuoi-nam',
    title: 'Đề thi Cuối năm Tiếng Việt Lớp 1',
    subject: 'vietnamese',
    term: 'cuoi-nam',
    termLabel: 'Cuối Năm',
    icon: '🌞',
    description: 'Đề thi chuẩn kết thúc năm học Lớp 1, đọc trơn đoạn văn 40-50 từ và điền từ vào chỗ trống.',
    durationMinutes: 40,
  },
];

// ==========================================
// 5. CÔNG CỤ CHO LỚP 1
// ==========================================
export const TOOLS_LIST: ToolMeta[] = [
  {
    id: 'tool-worksheet-print',
    icon: '🗓️',
    title: 'Phiếu Toán theo tuần (35 tuần)',
    description: 'In khổ giấy A4 dọc sắc nét kèm lời phê và trang đáp án chi tiết dành riêng cho giáo viên.',
    route: '/print-worksheet?subject=math',
    badge: 'In A4',
  },
  {
    id: 'tool-worksheet-vn',
    icon: '🔤',
    title: 'Phiếu Tiếng Việt theo tuần',
    description: '18 tuần học vần bám sát SGK, bài tập nối chữ và ghép âm vào chỗ trống.',
    route: '/print-worksheet?subject=vietnamese',
    badge: 'In A4',
  },
  {
    id: 'tool-word-problems',
    icon: '🧮',
    title: 'Bài toán có lời văn',
    description: 'Rèn luyện tư duy thêm, bớt, viết phép tính và câu trả lời hoàn chỉnh có cô đọc đề.',
    route: '/present?lesson=math-02-addition',
    badge: 'Có lời giải',
  },
  {
    id: 'tool-phonics-board',
    icon: '🧩',
    title: 'Bảng ghép vần tương tác',
    description: 'Âm đầu + Vần + Dấu thanh sinh động, bé tự chạm vào thẻ âm cô giáo đọc mẫu ngay.',
    route: '/present?lesson=vn-01-phonics',
    badge: 'Tương tác',
  },
  {
    id: 'tool-editor',
    icon: '✍️',
    title: 'Soạn bài giảng tương tác mới',
    description: 'Tự tạo slide, câu hỏi trắc nghiệm, ghép âm, nối chữ có thu âm giọng cô giáo thật.',
    route: '/editor',
    badge: 'Giáo viên',
  },
  {
    id: 'tool-hardware-test',
    icon: '🔊',
    title: 'Kiểm tra Âm thanh & TV',
    description: 'Kiểm tra loa TV lớp học, micro giáo viên và độ phân giải màn hình 16:9.',
    route: '/hardware-test',
    badge: 'Hệ thống',
  },
];

// Helper: Tự động tạo cấu trúc bài học hoàn chỉnh để chơi ngay nếu bài học chưa có file JSON cụ thể
export function createInteractiveCurriculumLesson(meta: CurriculumLessonMeta): Lesson {
  const isMath = meta.subject === 'math';
  const isEnglish = meta.subject === 'english';

  if (isEnglish) {
    return {
      status: 'publish',
      mode: 'publish',
      id: meta.id,
      title: meta.title,
      subject: 'english',
      grade: 1,
      description: meta.description,
      totalDurationMinutes: 20,
      slides: [
        {
          type: 'title-slide',
          id: `${meta.id}-title`,
          title: meta.title,
          subtitle: `Tiếng Anh Lớp 1 — ${meta.stageTitle}`,
          backgroundImage: '/media/images/star.svg',
          audio: '/media/tts/vn1-title.mp3',
        },
        {
          type: 'content-slide',
          id: `${meta.id}-vocab`,
          title: 'Vocabulary & Key Words',
          body: meta.description,
          illustration: '/media/images/pencil.svg',
          audio: '/media/tts/vn1-content-intro.mp3',
          bullets: ['Listen carefully to the teacher', 'Look at the pictures', 'Repeat after the teacher'],
        },
        {
          type: 'question-slide',
          id: `${meta.id}-q1`,
          teacherNote: 'Hướng dẫn bé lắng nghe và chọn từ vựng đúng',
          timeLimitSeconds: 30,
          showRetryOnWrong: true,
          question: {
            type: 'multiple_choice',
            id: `${meta.id}-q1-mc`,
            prompt: `Listen and choose the correct answer for: ${meta.title}`,
            promptAudio: '/media/tts/vn1-q3-prompt.mp3',
            illustration: '/media/images/ball.svg',
            options: [
              { id: 'opt-a', label: 'Cat 🐱', audio: '/media/tts/ca.mp3' },
              { id: 'opt-b', label: 'Ball ⚽', audio: '/media/tts/ba.mp3' },
              { id: 'opt-c', label: 'Book 📖', audio: '/media/tts/ba-sac.mp3' },
            ],
            correctOptionId: 'opt-b',
            explanation: 'Well done! That is a ball!',
            explanationAudio: '/media/tts/vn1-q3-explanation.mp3',
          },
        },
      ],
    };
  }

  if (isMath) {
    return {
      status: 'publish',
      mode: 'publish',
      id: meta.id,
      title: meta.title,
      subject: 'math',
      grade: 1,
      description: meta.description,
      totalDurationMinutes: 25,
      slides: [
        {
          type: 'title-slide',
          id: `${meta.id}-title`,
          title: meta.title,
          subtitle: `Toán Lớp 1 — ${meta.stageTitle}`,
          backgroundImage: '/media/images/star.svg',
          audio: '/media/tts/math1-title.mp3',
        },
        {
          type: 'content-slide',
          id: `${meta.id}-content`,
          title: `Khám phá bài học: ${meta.title}`,
          body: meta.description,
          illustration: '/media/images/pencil.svg',
          audio: '/media/tts/math1-intro.mp3',
          bullets: ['Quan sát kỹ hình vẽ', 'Đếm to rõ ràng cùng cô', 'Bấm nút kiểm tra sau khi chọn'],
        },
        {
          type: 'question-slide',
          id: `${meta.id}-q1`,
          teacherNote: 'Cho học sinh lên bảng bấm hoặc cô giáo tương tác',
          timeLimitSeconds: 30,
          showRetryOnWrong: true,
          question: {
            type: 'counting',
            id: `${meta.id}-q1-count`,
            prompt: `Đếm xem trong hình có bao nhiêu quả táo đỏ? (${meta.title})`,
            promptAudio: '/media/tts/math1-q1-prompt.mp3',
            illustration: '/media/images/apple.svg',
            items: [
              { image: '/media/images/apple.svg', alt: 'Quả táo' },
              { image: '/media/images/apple.svg', alt: 'Quả táo' },
              { image: '/media/images/apple.svg', alt: 'Quả táo' },
            ],
            correctCount: 3,
            numberRange: { min: 1, max: 5 },
            explanation: 'Có tất cả 3 quả táo đỏ. Chúng mình cùng đếm: 1, 2, 3!',
            explanationAudio: '/media/tts/math1-q1-explanation.mp3',
          },
        },
      ],
    };
  }

  // Vietnamese
  return {
    status: 'publish',
    mode: 'publish',
    id: meta.id,
    title: meta.title,
    subject: 'vietnamese',
    grade: 1,
    description: meta.description,
    totalDurationMinutes: 30,
    slides: [
      {
        type: 'title-slide',
        id: `${meta.id}-title`,
        title: meta.title,
        subtitle: `Tiếng Việt Lớp 1 — ${meta.stageTitle}`,
        backgroundImage: '/media/images/star.svg',
        audio: '/media/tts/vn1-title.mp3',
      },
      {
        type: 'phonics-slide',
        id: `${meta.id}-phonics`,
        title: `Ghép vần bài học: ${meta.title}`,
        initials: ['b', 'c', 'd', 'đ'],
        rhymes: ['a', 'o', 'e', 'ê'],
        tones: ['none', 'acute', 'grave', 'hook'],
      },
      {
        type: 'question-slide',
        id: `${meta.id}-q1`,
        teacherNote: 'Hướng dẫn học sinh phân biệt âm đầu và ghép vần',
        timeLimitSeconds: 30,
        showRetryOnWrong: true,
        question: {
          type: 'multiple_choice',
          id: `${meta.id}-q1-mc`,
          prompt: `Tiếng nào dưới đây có âm được nhắc tới trong "${meta.title}"?`,
          promptAudio: '/media/tts/vn1-q3-prompt.mp3',
          illustration: '/media/images/star.svg',
          options: [
            { id: 'opt-ba', label: 'ba', audio: '/media/tts/ba.mp3' },
            { id: 'opt-ca', label: 'ca', audio: '/media/tts/ca.mp3' },
            { id: 'opt-ba-sac', label: 'bá', audio: '/media/tts/ba-sac.mp3' },
          ],
          correctOptionId: 'opt-ba',
          explanation: 'Chính xác! Bé đã nắm rất vững âm chữ cái!',
          explanationAudio: '/media/tts/vn1-q3-explanation.mp3',
        },
      },
    ],
  };
}

export function getAllCurriculumLessons(): CurriculumLessonMeta[] {
  const all: CurriculumLessonMeta[] = [];
  for (const s of [...MATH_STAGES, ...VIETNAMESE_STAGES, ...ENGLISH_STAGES]) {
    all.push(...s.lessons);
  }
  return all;
}

export function findCurriculumLessonMeta(lessonId: string): CurriculumLessonMeta | undefined {
  return getAllCurriculumLessons().find((l) => l.id === lessonId);
}

