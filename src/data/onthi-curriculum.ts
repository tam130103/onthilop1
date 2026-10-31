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
      { id: 'math-01-counting', code: 'B1', title: 'Đếm đến 3', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Tập đếm và nhận biết nhóm có 1, 2, 3 đồ vật, con vật sinh động.', isSampleAvailable: true },
      { id: 'math-02-addition', code: 'B2', title: 'Đếm đến 6', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Đếm thành thạo các số từ 1 đến 6 và làm quen phép gộp.', isSampleAvailable: true },
      { id: 'math-b3-dem-den-10', code: 'B3', title: 'Đếm đến 10', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Đếm các đồ vật từ 1 đến 10, cấu tạo số 10.' },
      { id: 'math-b4-so-0', code: 'B4', title: 'Số 0', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Khái niệm không có gì và vị trí số 0 trên tia số.' },
      { id: 'math-b5-nhieu-hon-it-hon', code: 'B5', title: 'Nhiều hơn, ít hơn', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'So sánh số lượng hai nhóm đồ vật bằng cách ghép cặp 1-1.' },
      { id: 'math-b6-them-cho-du', code: 'B6', title: 'Thêm cho đủ', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Bổ sung thêm đồ vật để được số lượng yêu cầu.' },
      { id: 'math-b7-so-sanh-so', code: 'B7', title: 'So sánh số', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Dấu lớn hơn (>), bé hơn (<) và bằng (=) trong phạm vi 10.' },
      { id: 'math-b8-may-va-may', code: 'B8', title: 'Mấy và mấy', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Tách và gộp số lượng (ví dụ: 5 gồm 3 và 2).' },
      { id: 'math-b9-tia-so-thu-tu', code: 'B9', title: 'Tia số, thứ tự', stageTitle: 'Các số 0 – 10', stageNumber: 1, subject: 'math', description: 'Xác định thứ tự trước, sau, liền kề trên tia số 0-10.' },
    ],
  },
  {
    id: 'math-stage-2',
    number: 2,
    icon: '🔷',
    title: 'Chặng 2: Hình phẳng',
    subject: 'math',
    lessons: [
      { id: 'math-b10-hinh-phang', code: 'B10', title: 'Hình vuông, tròn, tam giác', stageTitle: 'Hình phẳng', stageNumber: 2, subject: 'math', description: 'Nhận diện hình vuông, tròn, tam giác và chữ nhật trong đời sống.' },
      { id: 'math-b11-ghep-hinh', code: 'B11', title: 'Ghép hình, xếp hình', stageTitle: 'Hình phẳng', stageNumber: 2, subject: 'math', description: 'Dùng các mảnh hình cơ bản ghép thành ngôi nhà, con thuyền, cánh buồm.' },
      { id: 'math-b12-quy-luat-hinh', code: 'B12', title: 'Hình nào tiếp theo?', stageTitle: 'Hình phẳng', stageNumber: 2, subject: 'math', description: 'Tìm quy luật sắp xếp chuỗi hình màu sắc lặp lại.' },
    ],
  },
  {
    id: 'math-stage-3',
    number: 3,
    icon: '➕',
    title: 'Chặng 3: Phép cộng phạm vi 10',
    subject: 'math',
    lessons: [
      { id: 'math-b13-gop-lai-la-cong', code: 'B13', title: 'Gộp lại là cộng', stageTitle: 'Phép cộng phạm vi 10', stageNumber: 3, subject: 'math', description: 'Ý nghĩa của dấu cộng (+) qua thao tác gộp hai nhóm lại.' },
      { id: 'math-b14-cong-pham-vi-6', code: 'B14', title: 'Phép cộng trong phạm vi 6', stageTitle: 'Phép cộng phạm vi 10', stageNumber: 3, subject: 'math', description: 'Bảng cộng các số trong phạm vi 6.' },
      { id: 'math-b15-cong-pham-vi-10', code: 'B15', title: 'Phép cộng trong phạm vi 10', stageTitle: 'Phép cộng phạm vi 10', stageNumber: 3, subject: 'math', description: 'Thực hành các phép tính cộng có kết quả đến 10.' },
      { id: 'math-b16-cong-voi-0', code: 'B16', title: 'Cộng với 0', stageTitle: 'Phép cộng phạm vi 10', stageNumber: 3, subject: 'math', description: 'Tính chất bất kỳ số nào cộng với 0 đều bằng chính nó.' },
    ],
  },
  {
    id: 'math-stage-4',
    number: 4,
    icon: '➖',
    title: 'Chặng 4: Phép trừ phạm vi 10',
    subject: 'math',
    lessons: [
      { id: 'math-b17-bot-di-la-tru', code: 'B17', title: 'Bớt đi là trừ', stageTitle: 'Phép trừ phạm vi 10', stageNumber: 4, subject: 'math', description: 'Ý nghĩa của dấu trừ (-) qua thao tác bớt đi hoặc tách ra.' },
      { id: 'math-b18-tru-pham-vi-6', code: 'B18', title: 'Phép trừ trong phạm vi 6', stageTitle: 'Phép trừ phạm vi 10', stageNumber: 4, subject: 'math', description: 'Bảng trừ các số trong phạm vi 6.' },
      { id: 'math-b19-tru-pham-vi-10', code: 'B19', title: 'Phép trừ trong phạm vi 10', stageTitle: 'Phép trừ phạm vi 10', stageNumber: 4, subject: 'math', description: 'Thực hành các phép trừ trong phạm vi 10.' },
      { id: 'math-b20-bang-cong-tru-10', code: 'B20', title: 'Bảng cộng, bảng trừ trong phạm vi 10', stageTitle: 'Phép trừ phạm vi 10', stageNumber: 4, subject: 'math', description: 'Hệ thống hóa mối quan hệ giữa phép cộng và phép trừ.' },
      { id: 'math-b21-tinh-ba-so', code: 'B21', title: 'Tính ba số', stageTitle: 'Phép trừ phạm vi 10', stageNumber: 4, subject: 'math', description: 'Thực hiện chuỗi hai phép tính liên tiếp từ trái sang phải.' },
      { id: 'math-b22-so-sanh-phep-tinh', code: 'B22', title: 'So sánh với phép tính', stageTitle: 'Phép trừ phạm vi 10', stageNumber: 4, subject: 'math', description: 'So sánh kết quả phép tính với một số hoặc giữa hai phép tính.' },
    ],
  },
  {
    id: 'math-stage-5',
    number: 5,
    icon: '🧊',
    title: 'Chặng 5: Hình khối & Vị trí',
    subject: 'math',
    lessons: [
      { id: 'math-b23-khoi-lap-phuong', code: 'B23', title: 'Khối lập phương, khối hộp', stageTitle: 'Hình khối & Vị trí', stageNumber: 5, subject: 'math', description: 'Nhận biết khối lập phương và khối hộp chữ nhật trong thực tế.' },
      { id: 'math-b24-vi-tri-khong-gian', code: 'B24', title: 'Trên — dưới, trái — phải', stageTitle: 'Hình khối & Vị trí', stageNumber: 5, subject: 'math', description: 'Định hướng vị trí không gian: trước sau, ở giữa, trên dưới, trái phải.' },
      { id: 'math-b25-xep-hinh-khoi', code: 'B25', title: 'Xếp hình bằng khối', stageTitle: 'Hình khối & Vị trí', stageNumber: 5, subject: 'math', description: 'Xếp các khối hình thành tòa tháp, ngôi nhà, cây cầu.' },
    ],
  },
  {
    id: 'math-stage-6',
    number: 6,
    icon: '👑',
    title: 'Chặng 6: Ôn tập học kì 1',
    subject: 'math',
    lessons: [
      { id: 'math-b26-boss-hk1', code: 'B26', title: 'BOSS: Ôn tập học kì 1', stageTitle: 'Ôn tập học kì 1', stageNumber: 6, subject: 'math', description: 'Đấu trường thử thách toàn bộ kiến thức Toán Học kì 1.' },
    ],
  },
  {
    id: 'math-stage-7',
    number: 7,
    icon: '💯',
    title: 'Chặng 7: Các số đến 100',
    subject: 'math',
    lessons: [
      { id: 'math-b27-so-11-den-20', code: 'B27', title: 'Các số từ 11 đến 20', stageTitle: 'Các số đến 100', stageNumber: 7, subject: 'math', description: 'Đọc, viết và phân tích số hàng chục, hàng đơn vị từ 11 đến 20.' },
      { id: 'math-b28-so-tron-chuc', code: 'B28', title: 'Các số tròn chục', stageTitle: 'Các số đến 100', stageNumber: 7, subject: 'math', description: 'Nhận biết 10, 20, 30, ..., 90 và cộng trừ số tròn chục.' },
      { id: 'math-b29-so-hai-chu-so', code: 'B29', title: 'Số có hai chữ số', stageTitle: 'Các số đến 100', stageNumber: 7, subject: 'math', description: 'Đọc, viết các số có hai chữ số từ 21 đến 99.' },
      { id: 'math-b30-so-sanh-so-100', code: 'B30', title: 'So sánh số đến 100', stageTitle: 'Các số đến 100', stageNumber: 7, subject: 'math', description: 'So sánh chữ số hàng chục và hàng đơn vị của hai số.' },
      { id: 'math-b31-bang-so-1-100', code: 'B31', title: 'Bảng các số từ 1 đến 100', stageTitle: 'Các số đến 100', stageNumber: 7, subject: 'math', description: 'Khám phá quy luật hàng và cột trong bảng số 100.' },
      { id: 'math-b32-dem-them-2-5-10', code: 'B32', title: 'Đếm thêm 2, thêm 5, thêm 10', stageTitle: 'Các số đến 100', stageNumber: 7, subject: 'math', description: 'Đếm nhảy bước 2, 5, 10 trên bảng số.' },
    ],
  },
  {
    id: 'math-stage-8',
    number: 8,
    icon: '📏',
    title: 'Chặng 8: Độ dài',
    subject: 'math',
    lessons: [
      { id: 'math-b33-dai-hon-ngan-hon', code: 'B33', title: 'Dài hơn, ngắn hơn', stageTitle: 'Độ dài', stageNumber: 8, subject: 'math', description: 'So sánh độ dài trực tiếp bằng mắt và thước đo trực quan.' },
      { id: 'math-b34-xang-ti-met', code: 'B34', title: 'Xăng-ti-mét (cm)', stageTitle: 'Độ dài', stageNumber: 8, subject: 'math', description: 'Đơn vị đo độ dài cm, cách đặt thước đo từ vạch số 0.' },
    ],
  },
  {
    id: 'math-stage-9',
    number: 9,
    icon: '🚀',
    title: 'Chặng 9: Cộng trừ phạm vi 100',
    subject: 'math',
    lessons: [
      { id: 'math-b35-cong-pham-vi-100', code: 'B35', title: 'Phép cộng trong phạm vi 100', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Cộng số có hai chữ số với số có một chữ số (không nhớ).' },
      { id: 'math-b36-tru-pham-vi-100', code: 'B36', title: 'Phép trừ trong phạm vi 100', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Trừ số có hai chữ số cho số có một chữ số (không nhớ).' },
      { id: 'math-b37-tim-chu-so-thieu', code: 'B37', title: 'Tìm chữ số còn thiếu', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Điền số thích hợp vào ô trống trong phép tính.' },
      { id: 'math-b38-tinh-ba-so-100', code: 'B38', title: 'Tính ba số trong phạm vi 100', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Thực hiện biểu thức có hai dấu cộng hoặc trừ.' },
      { id: 'math-b39-giai-toan-loi-van', code: 'B39', title: 'Nghe cô kể, giải toán', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Nhận biết đề bài toán có lời văn và tóm tắt bài toán.' },
      { id: 'math-b40-viet-phep-tinh', code: 'B40', title: 'Bài toán: viết phép tính', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Viết phép tính tương ứng với tình huống bài toán.' },
      { id: 'math-b41-neu-cau-tra-loi', code: 'B41', title: 'Bài toán: nêu câu trả lời', stageTitle: 'Cộng trừ phạm vi 100', stageNumber: 9, subject: 'math', description: 'Hoàn thành câu trả lời hoàn chỉnh kèm đơn vị.' },
    ],
  },
  {
    id: 'math-stage-10',
    number: 10,
    icon: '🕐',
    title: 'Chặng 10: Thời gian',
    subject: 'math',
    lessons: [
      { id: 'math-b42-xem-gio-dung', code: 'B42', title: 'Xem giờ đúng', stageTitle: 'Thời gian', stageNumber: 10, subject: 'math', description: 'Nhận biết kim giờ, kim phút và đọc đồng hồ đúng giờ.' },
      { id: 'math-b43-sang-trua-chieu-toi', code: 'B43', title: 'Sáng, trưa, chiều, tối', stageTitle: 'Thời gian', stageNumber: 10, subject: 'math', description: 'Các buổi trong ngày và sinh hoạt tương ứng của bé.' },
      { id: 'math-b44-cac-ngay-trong-tuan', code: 'B44', title: 'Các ngày trong tuần', stageTitle: 'Thời gian', stageNumber: 10, subject: 'math', description: 'Thứ Hai đến Chủ Nhật, ngày đi học và ngày nghỉ cuối tuần.' },
      { id: 'math-b45-doc-thoi-khoa-bieu', code: 'B45', title: 'Đọc thời khóa biểu', stageTitle: 'Thời gian', stageNumber: 10, subject: 'math', description: 'Tra cứu môn học theo thứ và tiết học.' },
      { id: 'math-b46-thuc-hanh-xem-lich', code: 'B46', title: 'Thực hành xem lịch và giờ', stageTitle: 'Thời gian', stageNumber: 10, subject: 'math', description: 'Xem tờ lịch ngày, tháng và đồng hồ treo tường.' },
    ],
  },
  {
    id: 'math-stage-11',
    number: 11,
    icon: '🏆',
    title: 'Chặng 11: Ôn tập cuối năm',
    subject: 'math',
    lessons: [
      { id: 'math-b47-boss-so-phep-tinh', code: 'B47', title: 'BOSS: Số và phép tính', stageTitle: 'Ôn tập cuối năm', stageNumber: 11, subject: 'math', description: 'Tổng ôn tập toàn bộ số học lớp 1.' },
      { id: 'math-b48-boss-hinh-do-luong', code: 'B48', title: 'BOSS: Hình và đo lường', stageTitle: 'Ôn tập cuối năm', stageNumber: 11, subject: 'math', description: 'Tổng ôn tập hình học, độ dài, thời gian lớp 1.' },
    ],
  },
];

// ==========================================
// 2. TIẾNG VIỆT LỚP 1 (132 BÀI - 17 CHẶNG)
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
      { id: 'vn-02-reading', code: 'B2', title: 'Bài 2: Âm d, đ và thanh hỏi, ngã', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Nhận biết âm d, đ, thanh hỏi, thanh ngã và đọc câu ngắn.', isSampleAvailable: true },
      { id: 'vn-b3-am-c-sac', code: 'B3', title: 'Bài 3: c, dấu sắc', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Nhận diện âm c, thanh sắc và ghép tiếng ca, cá.' },
      { id: 'vn-b4-am-e-e', code: 'B4', title: 'Bài 4: e ê', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Phân biệt âm e, ê và đọc tiếng be, bê.' },
      { id: 'vn-b5-on-tap-ke-chuyen', code: 'B5', title: 'Bài 5: Ôn tập và kể chuyện', stageTitle: 'Làm quen chữ cái', stageNumber: 1, subject: 'vietnamese', description: 'Ôn tập 5 bài đầu và nghe cô kể chuyện tranh tương tác.' },
    ],
  },
  {
    id: 'vn-stage-2',
    number: 2,
    icon: '🏡',
    title: 'Chặng 2: Chữ quanh nhà',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b6-am-o-hoi', code: 'B6', title: 'Bài 6: o, dấu hỏi', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Nhận biết âm o, thanh hỏi và ghép tiếng bò, cỏ.' },
      { id: 'vn-b7-am-o-nang', code: 'B7', title: 'Bài 7: ô, dấu nặng', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Nhận biết âm ô, thanh nặng và ghép tiếng cộ, đỗ.' },
      { id: 'vn-b8-am-d-d', code: 'B8', title: 'Bài 8: d đ', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Phân biệt chữ d và đ trong từ da dẻ, đỏ đắn.' },
      { id: 'vn-b9-am-o-nga', code: 'B9', title: 'Bài 9: ơ, dấu ngã', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Âm ơ, thanh ngã và tiếng bơ, mỡ.' },
      { id: 'vn-b10-on-tap', code: 'B10', title: 'Bài 10: Ôn tập và kể chuyện', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Tổng kết âm tuần 2 và kể chuyện Cáo và Cò.' },
      { id: 'vn-b11-boss-tuan-1-2', code: 'B11', title: 'Boss tuần 1–2', stageTitle: 'Chữ quanh nhà', stageNumber: 2, subject: 'vietnamese', description: 'Thử thách vượt chướng ngại vật tuần 1 và 2.' },
    ],
  },
  {
    id: 'vn-stage-3',
    number: 3,
    icon: '🌈',
    title: 'Chặng 3: Chữ muôn nơi',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b12-am-i', code: 'B12', title: 'Bài 11a: i', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Âm i và tiếng bi, chì.' },
      { id: 'vn-b13-am-k', code: 'B13', title: 'Bài 11b: k', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Quy tắc chính tả k đi với i, e, ê.' },
      { id: 'vn-b14-am-h', code: 'B14', title: 'Bài 12a: h', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Âm h và tiếng hoa, hồ.' },
      { id: 'vn-b15-am-l', code: 'B15', title: 'Bài 12b: l', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Âm l và phân biệt l - n.' },
      { id: 'vn-b16-am-u-u', code: 'B16', title: 'Bài 13: u ư', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Cặp âm u - ư và tiếng đu đủ, chữ thư.' },
      { id: 'vn-b17-am-ch', code: 'B17', title: 'Bài 14a: ch', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Âm đôi ch và tiếng chợ, chó.' },
      { id: 'vn-b18-am-kh', code: 'B18', title: 'Bài 14b: kh', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Âm đôi kh và tiếng khỉ, kho.' },
      { id: 'vn-b19-on-tap', code: 'B19', title: 'Bài 15: Ôn tập và kể chuyện', stageTitle: 'Chữ muôn nơi', stageNumber: 3, subject: 'vietnamese', description: 'Ôn tập tuần 3 và câu chuyện Ba chú lợn con.' },
    ],
  },
  {
    id: 'vn-stage-4',
    number: 4,
    icon: '🤝',
    title: 'Chặng 4: Chữ nắm tay',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b20-am-m', code: 'B20', title: 'Bài 16a: m', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Âm m và tiếng mẹ, mèo.' },
      { id: 'vn-b21-am-n', code: 'B21', title: 'Bài 16b: n', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Âm n và tiếng nơ, nấm.' },
      { id: 'vn-b22-am-g', code: 'B22', title: 'Bài 17a: g', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Âm đơn g và tiếng gà, gỗ.' },
      { id: 'vn-b23-am-gi', code: 'B23', title: 'Bài 17b: gi', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Âm gi và tiếng gió, giỏ.' },
      { id: 'vn-b24-am-gh', code: 'B24', title: 'Bài 18a: gh', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Quy tắc gh ghép với e, ê, i.' },
      { id: 'vn-b25-am-nh', code: 'B25', title: 'Bài 18b: nh', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Âm nh và tiếng nhà, nho.' },
      { id: 'vn-b26-am-ng-ngh', code: 'B26', title: 'Bài 19: ng ngh', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Phân biệt chính tả ng và ngh.' },
      { id: 'vn-b27-on-tap', code: 'B27', title: 'Bài 20: Ôn tập và kể chuyện', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Ôn tập tuần 4.' },
      { id: 'vn-b28-boss-tuan-3-4', code: 'B28', title: 'Boss tuần 3–4', stageTitle: 'Chữ nắm tay', stageNumber: 4, subject: 'vietnamese', description: 'Đấu boss tổng hợp âm ghép tuần 3 và 4.' },
    ],
  },
  {
    id: 'vn-stage-5',
    number: 5,
    icon: '✨',
    title: 'Chặng 5: Chữ tài hoa',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b29-am-r', code: 'B29', title: 'Bài 21a: r', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Âm r và tiếng rùa, rơm.' },
      { id: 'vn-b30-am-s', code: 'B30', title: 'Bài 21b: s', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Âm s và phân biệt s - x.' },
      { id: 'vn-b31-am-t', code: 'B31', title: 'Bài 22a: t', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Âm t và tiếng tổ, táo.' },
      { id: 'vn-b32-am-tr', code: 'B32', title: 'Bài 22b: tr', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Âm tr và phân biệt tr - ch.' },
      { id: 'vn-b33-am-th', code: 'B33', title: 'Bài 23a: th', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Âm th và tiếng thỏ, thìa.' },
      { id: 'vn-b34-am-ia', code: 'B34', title: 'Bài 23b: ia', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Vần ia và tiếng mía, thìa.' },
      { id: 'vn-b35-am-ua-ua', code: 'B35', title: 'Bài 24: ua ưa', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Cặp vần ua - ưa trong từ quả dừa, con rùa.' },
      { id: 'vn-b36-on-tap', code: 'B36', title: 'Bài 25: Ôn tập và kể chuyện', stageTitle: 'Chữ tài hoa', stageNumber: 5, subject: 'vietnamese', description: 'Ôn tập tuần 5.' },
    ],
  },
  {
    id: 'vn-stage-6',
    number: 6,
    icon: '✍️',
    title: 'Chặng 6: Hết bảng chữ cái',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b37-am-ph', code: 'B37', title: 'Bài 26a: ph', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Âm ph và tiếng phố, phở.' },
      { id: 'vn-b38-am-qu', code: 'B38', title: 'Bài 26b: qu', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Âm qu và tiếng quà, quạt.' },
      { id: 'vn-b39-am-v', code: 'B39', title: 'Bài 27a: v', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Âm v và tiếng vẹt, voi.' },
      { id: 'vn-b40-am-x', code: 'B40', title: 'Bài 27b: x', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Âm x và tiếng xe, xoài.' },
      { id: 'vn-b41-am-y', code: 'B41', title: 'Bài 28: y', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Chữ y và phân biệt y - i.' },
      { id: 'vn-b42-luyen-chinh-ta', code: 'B42', title: 'Bài 29: Luyện tập chính tả', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Quy tắc c/k, g/gh, ng/ngh.' },
      { id: 'vn-b43-on-tap', code: 'B43', title: 'Bài 30: Ôn tập và kể chuyện', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Hoàn thành trọn vẹn bảng chữ cái tiếng Việt.' },
      { id: 'vn-b44-boss-tuan-5-6', code: 'B44', title: 'Boss tuần 5–6', stageTitle: 'Hết bảng chữ cái', stageNumber: 6, subject: 'vietnamese', description: 'Đấu boss kiểm tra bảng chữ cái.' },
    ],
  },
  {
    id: 'vn-stage-7',
    number: 7,
    icon: '🔔',
    title: 'Chặng 7: Cụm vần có n và m',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b45-van-an', code: 'B45', title: 'Bài 31a: an', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần an trong từ cái bàn, bạn bè.' },
      { id: 'vn-b46-van-an-2', code: 'B46', title: 'Bài 31b: ăn', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần ăn trong từ khăn quàng, con trăn.' },
      { id: 'vn-b47-van-an-3', code: 'B47', title: 'Bài 31c: ân', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần ân trong từ sân chơi, cân đĩa.' },
      { id: 'vn-b48-van-on', code: 'B48', title: 'Bài 32a: on', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần on trong từ con cá, hòn bi.' },
      { id: 'vn-b49-van-on-on', code: 'B49', title: 'Bài 32b: ôn ơn', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Cặp vần ôn - ơn trong cơn mưa, sơn ca.' },
      { id: 'vn-b50-van-en-en', code: 'B50', title: 'Bài 33a: en ên', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần en, ên trong đèn pin, mũi tên.' },
      { id: 'vn-b51-van-in-un', code: 'B51', title: 'Bài 33b: in un', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần in, un trong quả cau, con giun.' },
      { id: 'vn-b52-van-am', code: 'B52', title: 'Bài 34a: am', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần am trong quả cam, con tằm.' },
      { id: 'vn-b53-van-am-2', code: 'B53', title: 'Bài 34b: ăm', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần ăm trong hàm răng, chăm chỉ.' },
      { id: 'vn-b54-van-am-3', code: 'B54', title: 'Bài 34c: âm', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Vần âm trong cây nấm, tiếng mầm.' },
      { id: 'vn-b55-on-tap', code: 'B55', title: 'Bài 35: Ôn tập và kể chuyện', stageTitle: 'Cụm vần có n và m', stageNumber: 7, subject: 'vietnamese', description: 'Ôn tập cụm vần kết thúc bằng n và m.' },
    ],
  },
  {
    id: 'vn-stage-8',
    number: 8,
    icon: '🍊',
    title: 'Chặng 8: Vần đuôi i và vần kết thúc m',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b56-van-om-om', code: 'B56', title: 'Bài 36a: om ôm', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần om, ôm trong chòm xóm, ôm ấp.' },
      { id: 'vn-b57-van-om', code: 'B57', title: 'Bài 36b: ơm', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần ơm trong hạt cơm, đống rơm.' },
      { id: 'vn-b58-van-em-em', code: 'B58', title: 'Bài 37a: em êm', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần em, êm trong que kem, đệm êm.' },
      { id: 'vn-b59-van-im-um', code: 'B59', title: 'Bài 37b: im um', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần im, um trong chim câu, quả chùm ruột.' },
      { id: 'vn-b60-van-ai', code: 'B60', title: 'Bài 38a: ai', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần ai trong hoa mai, củ cải.' },
      { id: 'vn-b61-van-ay-ay', code: 'B61', title: 'Bài 38b: ay ây', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần ay, ây trong bàn tay, cây xanh.' },
      { id: 'vn-b62-van-oi', code: 'B62', title: 'Bài 39a: oi', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần oi trong quả ổi, còi xe.' },
      { id: 'vn-b63-van-oi-oi', code: 'B63', title: 'Bài 39b: ôi ơi', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Vần ôi, ơi trong quả đồi, bơi lội.' },
      { id: 'vn-b64-on-tap', code: 'B64', title: 'Bài 40: Ôn tập và kể chuyện', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Ôn tập tuần 8.' },
      { id: 'vn-b65-boss-tuan-7-8', code: 'B65', title: 'Boss tuần 7–8', stageTitle: 'Vần đuôi i và vần kết thúc m', stageNumber: 8, subject: 'vietnamese', description: 'Đấu boss cụm vần đuôi i và m.' },
    ],
  },
  {
    id: 'vn-stage-9',
    number: 9,
    icon: '🌙',
    title: 'Chặng 9: Vần đuôi i, o, u',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b66-van-ui-ui', code: 'B66', title: 'Bài 41: ui ưi', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Vần ui, ưi trong túi vải, quả bưởi.' },
      { id: 'vn-b67-van-ao', code: 'B67', title: 'Bài 42a: ao', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Vần ao trong ngôi sao, bờ ao.' },
      { id: 'vn-b68-van-eo', code: 'B68', title: 'Bài 42b: eo', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Vần eo trong chú mèo, cái kẹo.' },
      { id: 'vn-b69-van-au', code: 'B69', title: 'Bài 43a: au', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Vần au trong cây cau, tàu hỏa.' },
      { id: 'vn-b70-van-au-eu', code: 'B70', title: 'Bài 43b: âu êu', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Vần âu, êu trong bồ câu, cái lều.' },
      { id: 'vn-b71-van-iu-uu', code: 'B71', title: 'Bài 44: iu ưu', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Vần iu, ưu trong quả lựu, cừu con.' },
      { id: 'vn-b72-on-tap', code: 'B72', title: 'Bài 45: Ôn tập và kể chuyện', stageTitle: 'Vần đuôi i, o, u', stageNumber: 9, subject: 'vietnamese', description: 'Ôn tập vần đuôi i, o, u.' },
    ],
  },
  {
    id: 'vn-stage-10',
    number: 10,
    icon: '🌊',
    title: 'Chặng 10: Cụm vần có c và t',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b73-van-ac', code: 'B73', title: 'Bài 46a: ac', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần ac trong con hạc, đàn vạc.' },
      { id: 'vn-b74-van-ac-ac', code: 'B74', title: 'Bài 46b: ăc âc', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần ăc, âc trong quả gấc, bậc thang.' },
      { id: 'vn-b75-van-oc-oc', code: 'B75', title: 'Bài 47a: oc ôc', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần oc, ôc trong con cóc, con ốc.' },
      { id: 'vn-b76-van-uc-uc', code: 'B76', title: 'Bài 47b: uc ưc', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần uc, ưc trong hoa cúc, lọ mực.' },
      { id: 'vn-b77-van-at', code: 'B77', title: 'Bài 48a: at', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần at trong bãi cát, con hát.' },
      { id: 'vn-b78-van-at-at', code: 'B78', title: 'Bài 48b: ăt ât', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần ăt, ât trong mặt trời, đất cát.' },
      { id: 'vn-b79-van-ot-ot', code: 'B79', title: 'Bài 49a: ot ôt', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần ot, ôt trong quả ớt, cột cờ.' },
      { id: 'vn-b80-van-ot', code: 'B80', title: 'Bài 49b: ơt', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Vần ơt trong quả ớt đỏ.' },
      { id: 'vn-b81-on-tap', code: 'B81', title: 'Bài 50: Ôn tập và kể chuyện', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Ôn tập tuần 10.' },
      { id: 'vn-b82-boss-tuan-9-10', code: 'B82', title: 'Boss tuần 9–10', stageTitle: 'Cụm vần có c và t', stageNumber: 10, subject: 'vietnamese', description: 'Đấu boss cụm vần có c và t.' },
    ],
  },
  {
    id: 'vn-stage-11',
    number: 11,
    icon: '🍉',
    title: 'Chặng 11: Cụm vần có t và p',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b83-van-et-et', code: 'B83', title: 'Bài 51a: et êt', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần et, êt trong sấm sét, tết đến.' },
      { id: 'vn-b84-van-it', code: 'B84', title: 'Bài 51b: it', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần it trong quả mít, trái quýt.' },
      { id: 'vn-b85-van-ut-ut', code: 'B85', title: 'Bài 52: ut ưt', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần ut, ưt trong cây bút, mứt tết.' },
      { id: 'vn-b86-van-ap-ap', code: 'B86', title: 'Bài 53a: ap ăp', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần ap, ăp trong múa sạp, bắp ngô.' },
      { id: 'vn-b87-van-ap', code: 'B87', title: 'Bài 53b: âp', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần âp trong cá mập, đập lúa.' },
      { id: 'vn-b88-van-op-op', code: 'B88', title: 'Bài 54a: op ôp', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần op, ôp trong con cọp, cái hộp.' },
      { id: 'vn-b89-van-op', code: 'B89', title: 'Bài 54b: ơp', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Vần ơp trong lớp học, lợp nhà.' },
      { id: 'vn-b90-on-tap', code: 'B90', title: 'Bài 55: Ôn tập và kể chuyện', stageTitle: 'Cụm vần có t và p', stageNumber: 11, subject: 'vietnamese', description: 'Ôn tập tuần 11.' },
    ],
  },
  {
    id: 'vn-stage-12',
    number: 12,
    icon: '🎒',
    title: 'Chặng 12: Cụm vần có p, nh, ch, ng',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b91-van-ep-ep', code: 'B91', title: 'Bài 56a: ep êp', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần ep, êp trong kẹp tóc, bếp lửa.' },
      { id: 'vn-b92-van-ip-up', code: 'B92', title: 'Bài 56b: ip up', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần ip, up trong búp bê, bắt nhịp.' },
      { id: 'vn-b93-van-anh-enh', code: 'B93', title: 'Bài 57a: anh ênh', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần anh, ênh trong cành chanh, bập bênh.' },
      { id: 'vn-b94-van-inh', code: 'B94', title: 'Bài 57b: inh', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần inh trong máy tính, thông minh.' },
      { id: 'vn-b95-van-ach', code: 'B95', title: 'Bài 58a: ach', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần ach trong cuốn sách, sạch sẽ.' },
      { id: 'vn-b96-van-ech-ich', code: 'B96', title: 'Bài 58b: êch ich', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần êch, ich trong chú ếch, tờ lịch.' },
      { id: 'vn-b97-van-ang-ang', code: 'B97', title: 'Bài 59a: ang ăng', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần ang, ăng trong mặt trăng, con hoẵng.' },
      { id: 'vn-b98-van-ang', code: 'B98', title: 'Bài 59b: âng', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Vần âng trong vâng lời, hoa tầng.' },
      { id: 'vn-b99-on-tap', code: 'B99', title: 'Bài 60: Ôn tập và kể chuyện', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Ôn tập tuần 12.' },
      { id: 'vn-b100-boss-tuan-11-12', code: 'B100', title: 'Boss tuần 11–12', stageTitle: 'Cụm vần có p, nh, ch, ng', stageNumber: 12, subject: 'vietnamese', description: 'Đấu boss tổng hợp tuần 11–12.' },
    ],
  },
  {
    id: 'vn-stage-13',
    number: 13,
    icon: '🌟',
    title: 'Chặng 13: Nhà vần iê',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b101-van-ong-ong', code: 'B101', title: 'Bài 61a: ong ông', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần ong, ông trong con ong, ông bà.' },
      { id: 'vn-b102-van-ung-ung', code: 'B102', title: 'Bài 61b: ung ưng', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần ung, ưng trong quả sung, rừng cây.' },
      { id: 'vn-b103-van-iec-ien', code: 'B103', title: 'Bài 62a: iêc iên', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần iêc, iên trong cô tiên, xem xiếc.' },
      { id: 'vn-b104-van-iep', code: 'B104', title: 'Bài 62b: iêp', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần iêp trong thiệp chúc mừng, điệp khúc.' },
      { id: 'vn-b105-van-ieng-iem', code: 'B105', title: 'Bài 63a: iêng iêm', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần iêng, iêm trong tiếng ve, que diêm.' },
      { id: 'vn-b106-van-yen', code: 'B106', title: 'Bài 63b: yên', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần yên trong chim yến, bình yên.' },
      { id: 'vn-b107-van-iet', code: 'B107', title: 'Bài 64a: iêt', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần iêt trong viết chữ, thời tiết.' },
      { id: 'vn-b108-van-ieu-yeu', code: 'B108', title: 'Bài 64b: iêu yêu', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Vần iêu, yêu trong cánh diều, yêu thương.' },
      { id: 'vn-b109-on-tap', code: 'B109', title: 'Bài 65: Ôn tập và kể chuyện', stageTitle: 'Nhà vần iê', stageNumber: 13, subject: 'vietnamese', description: 'Ôn tập tuần 13.' },
    ],
  },
  {
    id: 'vn-stage-14',
    number: 14,
    icon: '🐉',
    title: 'Chặng 14: Nhà vần uô',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b110-van-uoi-uom', code: 'B110', title: 'Bài 66: uôi uôm', stageTitle: 'Nhà vần uô', stageNumber: 14, subject: 'vietnamese', description: 'Vần uôi, uôm trong quả chuối, cánh buồm.' },
      { id: 'vn-b111-van-uoc-uot', code: 'B111', title: 'Bài 67: uôc uôt', stageTitle: 'Nhà vần uô', stageNumber: 14, subject: 'vietnamese', description: 'Vần uôc, uôt trong con cuốc, chuột con.' },
      { id: 'vn-b112-van-uon-uong', code: 'B112', title: 'Bài 68: uôn uông', stageTitle: 'Nhà vần uô', stageNumber: 14, subject: 'vietnamese', description: 'Vần uôn, uông trong chuồn chuồn, uống nước.' },
      { id: 'vn-b113-van-uoi-uou', code: 'B113', title: 'Bài 69: ươi ươu', stageTitle: 'Nhà vần uô', stageNumber: 14, subject: 'vietnamese', description: 'Vần ươi, ươu trong con hươu, quả bưởi.' },
      { id: 'vn-b114-on-tap', code: 'B114', title: 'Bài 70: Ôn tập và kể chuyện', stageTitle: 'Nhà vần uô', stageNumber: 14, subject: 'vietnamese', description: 'Ôn tập tuần 14.' },
      { id: 'vn-b115-boss-tuan-13-14', code: 'B115', title: 'Boss tuần 13–14', stageTitle: 'Nhà vần uô', stageNumber: 14, subject: 'vietnamese', description: 'Đấu boss cụm vần uô và ươ.' },
    ],
  },
  {
    id: 'vn-stage-15',
    number: 15,
    icon: '🌼',
    title: 'Chặng 15: Nhà vần ươ',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b116-van-uoc-uot', code: 'B116', title: 'Bài 71: ươc ươt', stageTitle: 'Nhà vần ươ', stageNumber: 15, subject: 'vietnamese', description: 'Vần ươc, ươt trong rước đèn, ướt át.' },
      { id: 'vn-b117-van-uom-uop', code: 'B117', title: 'Bài 72: ươm ươp', stageTitle: 'Nhà vần ươ', stageNumber: 15, subject: 'vietnamese', description: 'Vần ươm, ươp trong bướm hoa, quả mướp.' },
      { id: 'vn-b118-van-uon-uong', code: 'B118', title: 'Bài 73: ươn ương', stageTitle: 'Nhà vần ươ', stageNumber: 15, subject: 'vietnamese', description: 'Vần ươn, ương trong con vượn, quê hương.' },
      { id: 'vn-b119-van-oa-oe', code: 'B119', title: 'Bài 74: oa oe', stageTitle: 'Nhà vần ươ', stageNumber: 15, subject: 'vietnamese', description: 'Vần oa, oe trong hoa loa kèn, mắt tròn xoe.' },
      { id: 'vn-b120-on-tap', code: 'B120', title: 'Bài 75: Ôn tập và kể chuyện', stageTitle: 'Nhà vần ươ', stageNumber: 15, subject: 'vietnamese', description: 'Ôn tập tuần 15.' },
    ],
  },
  {
    id: 'vn-stage-16',
    number: 16,
    icon: '🎓',
    title: 'Chặng 16: Vần có âm đệm',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b121-van-oan-oan', code: 'B121', title: 'Bài 76a: oan oăn', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Vần oan, oăn trong bé ngoan, tóc xoăn.' },
      { id: 'vn-b122-van-oat-oat', code: 'B122', title: 'Bài 76b: oat oăt', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Vần oat, oăt trong hoạt hình, thoăn thoắt.' },
      { id: 'vn-b123-van-oai', code: 'B123', title: 'Bài 77a: oai', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Vần oai trong củ khoai, điện thoại.' },
      { id: 'vn-b124-van-ue-uy', code: 'B124', title: 'Bài 77b: uê uy', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Vần uê, uy trong cây vạn tuế, tàu thủy.' },
      { id: 'vn-b125-van-uan-uat', code: 'B125', title: 'Bài 78: uân uât', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Vần uân, uât trong mùa xuân, sản xuất.' },
      { id: 'vn-b126-van-uyen-uyet', code: 'B126', title: 'Bài 79: uyên uyêt', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Vần uyên, uyêt trong chim khuyên, vầng trăng khuyết.' },
      { id: 'vn-b127-on-tap', code: 'B127', title: 'Bài 80: Ôn tập và kể chuyện', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Ôn tập tuần 16.' },
      { id: 'vn-b128-boss-tuan-15-16', code: 'B128', title: 'Boss tuần 15–16', stageTitle: 'Vần có âm đệm', stageNumber: 16, subject: 'vietnamese', description: 'Đấu boss các vần có âm đệm.' },
    ],
  },
  {
    id: 'vn-stage-17',
    number: 17,
    icon: '🏆',
    title: 'Chặng 17: Tổng ôn học kì 1',
    subject: 'vietnamese',
    lessons: [
      { id: 'vn-b129-on-tap-81', code: 'B129', title: 'Bài 81: Ôn tập đọc từ & câu', stageTitle: 'Tổng ôn học kì 1', stageNumber: 17, subject: 'vietnamese', description: 'Luyện đọc đoạn văn và trả lời câu hỏi đọc hiểu.' },
      { id: 'vn-b130-on-tap-82', code: 'B130', title: 'Bài 82: Ôn tập chính tả', stageTitle: 'Tổng ôn học kì 1', stageNumber: 17, subject: 'vietnamese', description: 'Phân biệt phụ âm đầu và điền vần chính xác.' },
      { id: 'vn-b131-on-tap-83', code: 'B131', title: 'Bài 83: Ôn tập toàn diện', stageTitle: 'Tổng ôn học kì 1', stageNumber: 17, subject: 'vietnamese', description: 'Luyện tập tổng hợp các kỹ năng nghe, đọc, ghép vần.' },
      { id: 'vn-b132-danh-gia-hk1', code: 'B132', title: 'Đánh giá cuối học kì 1', stageTitle: 'Tổng ôn học kì 1', stageNumber: 17, subject: 'vietnamese', description: 'Bài thi đánh giá năng lực Tiếng Việt Học kì 1.' },
    ],
  },
];

// ==========================================
// 3. TIẾNG ANH LỚP 1 (16 UNIT - GLOBAL SUCCESS)
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

