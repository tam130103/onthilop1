# 🌟 Ứng Dụng Trình Chiếu & Học Tập Lớp 1 (Offline-First PWA)

Ứng dụng web tiến bộ (Progressive Web App - PWA) chuyên biệt phục vụ công tác giảng dạy, ôn tập và trình chiếu trên lớp học Lớp 1 theo Chương trình Giáo dục Phổ thông 2018. Hệ thống được thiết kế theo tư duy **Offline-First**, hoạt động mượt mà 100% không cần kết nối Internet ngay trên laptop của giáo viên kết nối trực tiếp với TV hoặc máy chiếu phòng học.

---

## 📌 Điểm Nổi Bật & Tính Năng Chính

### 1. Kho Học Liệu Chuẩn 88 Bài Học Toàn Diện
- **48 Bài học Toán Lớp 1**: Bao phủ toàn bộ kiến thức từ hình học trực quan, định hướng không gian, đo độ dài xăng-ti-mét đến các số phạm vi 100, bảng số 1-100, phép tính cộng/trừ 2 chữ số không nhớ và giải toán có lời văn.
- **40 Bài học Tiếng Việt Lớp 1**: Bao phủ bảng chữ cái, thanh điệu, phụ âm ghép, quy tắc chính tả ($c/k, g/gh, ng/ngh$), hệ thống toàn bộ vần đơn đến nguyên âm đôi và luyện đọc hiểu đoạn văn chủ đề gia đình, quê hương.
- **Đạt chuẩn xuất bản nghiêm ngặt (`status: "publish"`)**:
  - 100% câu hỏi có file âm thanh phát âm mẫu chuẩn Tiếng Việt định dạng `.mp3` (tuyệt đối không dùng `.wav`).
  - Mỗi nhãn chữ có file audio phát âm riêng biệt, không dùng chung âm giữa các chữ/tiếng khác nhau.
  - Tích hợp đa dạng 5 kiểu câu hỏi tương tác: `multiple_choice`, `counting`, `number_select`, `tap_place`, `matching`.

### 2. Phân Hệ Đề Thi Định Kỳ 15 Phút (`/exam`)
- **8 Đề thi chuẩn 4 kỳ học**:
  - *Toán Lớp 1*: Giữa Kì 1, Cuối Kì 1, Giữa Kì 2, Cuối Năm.
  - *Tiếng Việt Lớp 1*: Giữa Kì 1, Cuối Kì 1, Giữa Kì 2, Cuối Năm.
- Đồng hồ đếm ngược 15 phút với cảnh báo màu trực quan (Xanh $\to$ Vàng $\to$ Đỏ).
- Thanh điều hướng câu hỏi 1–10, hỗ trợ chạm nghe đọc câu hỏi.
- Chấm điểm tự động thang điểm 10, phân loại kết quả (*Xuất sắc, Giỏi, Khá, Cần cố gắng*).
- Xem lại đáp án kèm lời giải chi tiết và phát audio giảng giải.
- Tự động lưu các câu làm sai vào bộ theo dõi lỗi để luyện tập củng cố.

### 3. Đồng Bộ Hai Màn Hình Một Chiều (1-Way BroadcastChannel Sync)
- **Màn hình Laptop Giáo viên (`/presenter`)**: Nắm toàn bộ quyền điều khiển tiết học, hiển thị ghi chú sư phạm nhắc bài (`teacherNote`), danh sách học sinh, hàng đợi câu sai và bảng điểm thi đua.
- **Màn hình TV / Máy chiếu Học sinh (`/present`)**: Đóng vai trò hiển thị thuần túy, tuyệt đối bảo mật ghi chú của cô, tự động nhận snapshot qua `BroadcastChannel` khi vừa bật TV.
- **Phím tắt điều khiển một tay tiện lợi**:
  - `Mũi tên Phải` / `Space` / `Enter`: Chuyển slide kế tiếp.
  - `Mũi tên Trái`: Quay lại slide trước.
  - `B` (*Blackout*): Bật / tắt màn hình đen 100vw x 100vh để học sinh lập tức tập trung chú ý về phía cô giáo.
  - `P` (*Picker*): Kích hoạt vòng quay gọi tên học sinh ngẫu nhiên không lặp lại trên TV.
  - `T` (*Timer*): Bật / dừng đồng hồ đếm ngược hoạt động nhóm.
  - Phím `1`, `2`, `3`, `4`: Cộng điểm nhanh cho 4 đội thi đua (Xanh dương, Đỏ, Vàng, Xanh lá).

### 4. Công Cụ In Ấn Khổ Giấy A4 Chuẩn Tiểu Học (`/print-worksheet`)
- **Phiếu Bài Tập Tự Luận & Trắc Nghiệm**: Tự động chuyển đổi bất kỳ bài học hoặc đề thi nào thành phiếu bài tập in ấn A4 sắc nét, có kèm trang Hướng dẫn chấm & Đáp án chi tiết dành riêng cho giáo viên.
- **Phiếu Tập Viết Chữ & Số Kẻ Ô Ly A4**:
  - Lưới kẻ SVG 4 ô ly x 4 ô vuông chuẩn Bộ GD&ĐT Việt Nam (đường cơ bản `baseline` đậm nét, đường kẻ phụ đứt nét).
  - Kho mẫu viết phong phú: Chữ cái thường (`a -> y`), chữ số (`0 -> 9`), phụ âm ghép (`ch, gh, kh, ng, ngh...`), vần thông dụng, từ ngữ ứng dụng hoặc tự nhập chữ bất kỳ.
  - Dòng đầu có chữ mẫu nét đứt mờ để học sinh tô theo; các dòng sau để trống kèm dấu chấm đặt bút đúng tọa độ.

### 5. Bộ Theo Dõi Lỗi Sai & Kịch Bản Buổi Dạy Liên Hoàn
- **`mistake-tracker`**: Tự động ghi nhận mọi câu trả lời sai trong buổi học hoặc bài thi, cho phép cô giáo kích hoạt buổi học "Ôn tập củng cố câu hay sai" chỉ với một click.
- **Kịch bản Tiết học 35 phút**: Chuỗi hoạt động Khởi động $\to$ Học âm/vần/số $\to$ Luyện tập $\to$ Thi đua bảng điểm $\to$ Tuyên dương.
- **Sao lưu & Khôi phục toàn diện**: Xuất/nhập file backup JSON chứa danh sách học sinh, điểm số, bài soạn và bản ghi âm giọng nói.

---

## 🛠️ Kiến Trúc Kỹ Thuật

- **Frontend Core**: React 19 + TypeScript (Chế độ `strict: true`, tuyệt đối không dùng `any`).
- **Bundler & PWA**: Vite 8 + `vite-plugin-pwa` + Workbox.
  - **Tối ưu hóa Cache ngoại tuyến**: Giữ gói precache khởi động gọn nhẹ (**185 entries ~ 2.3 MB**) gồm HTML, CSS, JS core, icons SVG.
  - Hơn **8.900 file âm thanh TTS `.mp3`** được phân bổ lưu trữ qua cơ chế `workbox.runtimeCaching` với chiến lược `CacheFirst`, tự động nạp đệm vĩnh viễn khi mở bài học mà không làm nghẽn lần tải trang đầu tiên.
- **Schema Validation**: Zod Schema Engine quản lý bài giảng thông qua Discriminated Union giữa hai chế độ `draft` và `publish`, kiểm tra tính toàn vẹn của liên kết media trên ổ đĩa vật lý.
- **Web Audio API**: `SessionAudioManager` nạp và giải phóng bộ nhớ âm thanh theo từng buổi học; cơ chế unlock AudioContext thân thiện với chính sách âm thanh của trình duyệt; hỗ trợ ghi âm trực tiếp qua `MediaRecorder`.
- **Database & Cloud Sync**: Supabase Database với Row-Level Security (RLS) bảo vệ dữ liệu giáo viên, hỗ trợ đồng bộ hai chiều mượt mà giữa IndexedDB nội bộ và Cloud.

---

## 🚀 Hướng Dẫn Cài Đặt & Sử Dụng

### Yêu Cầu Môi Trường
- **Node.js**: Phiên bản 20.x trở lên.
- **npm**: Phiên bản 10.x trở lên.
- **Trình duyệt**: Google Chrome, Microsoft Edge hoặc các trình duyệt nhân Chromium hỗ trợ PWA và Web Audio API.

### 1. Cài đặt Dependencies
```bash
git clone https://github.com/tam130103/onthilop1.git
cd onthilop1
npm install
```

### 2. Khởi chạy Môi trường Phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:5173`

### 3. Kiểm tra Tính Toàn Vẹn Học Liệu (Validator CLI)
Kiểm tra toàn bộ 88 bài giảng JSON, xác thực cấu trúc Zod Schema và kiểm tra từng đường dẫn file âm thanh `.mp3` tồn tại thực tế:
```bash
npm run validate
```

### 4. Kiểm tra Kiểu Dữ Liệu TypeScript
```bash
npm run typecheck
```

### 5. Chạy Kiểm Thử Đơn Vị (Vitest Unit Tests)
Chạy toàn bộ 66+ unit tests bao phủ Reducer, Classroom Store, Audio Storage, Lesson Storage, Backup Manager và Mistakes Tracker:
```bash
npm test
```

### 6. Chạy Kiểm Thử Tự Động Đầu Cuối (Playwright E2E Tests)
Kiểm tra luồng đồng bộ 2 màn hình, phím tắt B, vòng quay học sinh, phân hệ Đề thi và In phiếu ô ly:
```bash
npm run test:e2e
```

### 7. Đóng Gói Ứng Dụng Thành Phẩm (Production PWA Build)
```bash
npm run build
npm run preview
```

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
onthi-clone/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI pipeline tự động
├── content/
│   └── lessons/                 # 88 bài học chuẩn JSON (48 Toán + 40 Tiếng Việt)
├── public/
│   └── media/
│       ├── images/              # Hình ảnh minh họa vector SVG chuẩn Lớp 1
│       ├── phonemes/            # Âm vị chữ cái cơ bản .mp3
│       └── tts/                 # ~8.900 file âm thanh câu hỏi, phương án, giải thích
├── scripts/
│   ├── e2e-test.ts              # Playwright E2E Test Runner chính
│   ├── validate-content.ts      # CLI xác thực Zod Schema & media integrity
│   └── tts-manifest.json        # Bản đồ ánh xạ văn bản - file âm thanh phát âm
├── src/
│   ├── core/
│   │   ├── audio-storage.ts     # Web Audio API SessionAudioManager
│   │   ├── auth-service.ts      # Xác thực người dùng & Supabase Auth
│   │   ├── backup-manager.ts    # Xuất / nhập sao lưu dữ liệu toàn diện
│   │   ├── classroom-store.ts   # Quản lý lớp, điểm số 4 đội & vòng quay học sinh
│   │   ├── lesson-storage.ts    # Bộ điều phối tải học liệu & bài học ảo
│   │   ├── mistake-tracker.ts   # Lưu trữ và xây dựng bài ôn tập từ câu sai
│   │   └── player-reducer.ts    # Máy trạng thái đồng bộ trình chiếu slide
│   ├── data/
│   │   ├── exam-data.ts         # Dữ liệu 8 đề kiểm tra định kỳ 15 phút
│   │   └── onthi-curriculum.ts  # Mục lục phân phối chương trình GDPT 2018
│   ├── pages/
│   │   ├── ExamPage.tsx         # Phân hệ Đề thi định kỳ tương tác 15 phút
│   │   ├── HomePage.tsx         # Trang chủ điều hướng học liệu & công cụ
│   │   ├── PresenterPage.tsx    # Màn hình điều khiển của cô giáo
│   │   ├── PresentPage.tsx      # Màn hình trình chiếu TV học sinh
│   │   └── WorksheetPrintPage.tsx # In phiếu bài tập & Phiếu tập viết ô ly A4
│   └── schemas/
│       └── content.schema.ts    # Zod Discriminated Union Schema Engine
└── tests/
    └── e2e/                     # Kịch bản kiểm thử Playwright E2E
```

---

## 📄 Bản Quyền & Giấy Phép
Dự án được xây dựng phục vụ cộng đồng giáo viên Tiểu học Việt Nam. Phát hành dưới giấy phép mã nguồn mở ISC License.
