# Kế Hoạch Từng Bước Xây Dựng Công Cụ Trình Chiếu Lớp 1 (Cá Nhân - Offline - Laptop sang TV)

> **Mục tiêu:** Hoàn thiện bộ công cụ trình chiếu giảng dạy thực chiến dành riêng cho giáo viên Lớp 1: gọn nhẹ, không tài khoản, không đám mây, 100% offline, điều khiển 1 chạm từ laptop chiếu sang TV.
> **Kiến trúc:** 
> - Màn laptop (`/presenter`): Trung tâm điều khiển duy nhất (Single Source of Truth), phím tắt 1 tay, xem trước slide tiếp theo, ghi chú bài dạy.
> - Màn TV (`/present`): Sân khấu 16:9 sắc nét, chữ cực lớn, hiệu ứng thưởng sao, âm thanh giọng cô giáo đọc rõ ràng.
> - Quản lý lớp học: Lưu trữ cục bộ trên máy qua IndexedDB, hỗ trợ bốc thăm ngẫu nhiên không trùng, bảng cộng điểm 4 tổ.

---

## Giai đoạn 1: Nâng cấp Bảng điều khiển Laptop (`/presenter`) & Khởi chạy 2 màn hình 1-Click

### Task 1: Nút "Bắt đầu giảng dạy" 1-Click từ Trang chủ (`HomePage.tsx`)
- **Mục đích:** Giáo viên chỉ cần bấm 1 nút trên laptop $\rightarrow$ Hệ thống tự mở cửa sổ TV (`/present`) để kéo sang TV/máy chiếu ngoài, đồng thời tab hiện tại tự vào trang điều khiển (`/presenter`).
- **File tác động:**
  - `src/pages/HomePage.tsx`
  - `src/pages/HomePage.module.css`
- **Các bước thực hiện:**
  1. Thêm hàm `handleStartPresentation(lessonId)` sử dụng `window.open('/present?lesson=' + lessonId, 'TvWindow', 'width=1280,height=720')`.
  2. Tự động chuyển hướng tab hiện tại sang `/presenter?lesson=` + lessonId.
  3. Thêm nút nổi bật "🚀 Chiếu bài dạy (Mở 2 màn hình)" cạnh nút "Xem thử".

### Task 2: Khung "Xem trước câu tiếp theo" (Next Slide Preview) trên `/presenter`
- **Mục đích:** Cô giáo cầm clicker trên bục giảng luôn biết trước câu hỏi tiếp theo và ghi chú sư phạm mà không cần quay lưng nhìn lên màn hình TV.
- **File tác động:**
  - `src/pages/PresenterPage.tsx`
  - `src/pages/PresenterPage.module.css`
- **Các bước thực hiện:**
  1. Tính toán `nextSlide = state.lesson?.slides[state.currentSlideIndex + 1]`.
  2. Thiết kế khung "Slide tiếp theo": hiển thị dạng thu nhỏ gồm tiêu đề/nội dung câu hỏi và `teacherNote` của slide kế tiếp.
  3. Khi ở slide cuối cùng, hiển thị thông báo "Slide kết thúc buổi học".

### Task 3: Bộ phím tắt điều khiển 1 tay chuyên dụng cho giáo viên
- **Mục đích:** Thao tác cực nhanh bằng bàn phím laptop hoặc nút clicker mà không cần rê chuột.
- **File tác động:**
  - `src/pages/PresenterPage.tsx`
- **Các bước thực hiện:**
  1. Mở rộng bộ lắng nghe sự kiện `keydown` trên `PresenterPage`:
     - `Space` / `Enter` / `PageDown` / `ArrowRight`: Chuyển slide kế tiếp.
     - `PageUp` / `ArrowLeft`: Lùi slide trước.
     - `A`: Hiện đáp án (`handleReveal`) & phát âm thanh giải thích.
     - `C`: Chấm Đúng (`ANSWER_CORRECT`) $\rightarrow$ phát tín hiệu thưởng sao sang TV.
     - `X`: Chấm Sai (`ANSWER_INCORRECT`) $\rightarrow$ đẩy vào hàng đợi ôn tập cuối giờ.
     - `R`: Bốc thăm ngẫu nhiên học sinh lên bảng (`handleRandomPick`).
     - `1`, `2`, `3`, `4`: Cộng điểm nhanh cho Tổ 1, 2, 3, 4 (`addTeamStar`).
     - `B`: Tắt/Bật màn hình đen (`handleToggleBlackout`).
  2. Bổ sung bảng hướng dẫn phím tắt trực quan dạng Tooltip/Modal nhỏ ở góc màn hình laptop để cô giáo tiện tra cứu.

---

## Giai đoạn 2: Quản lý Danh sách học sinh & Tổ thi đua cục bộ

### Task 4: Giao diện Quản lý Học sinh theo Lớp (`ClassroomManagerModal.tsx`)
- **Mục đích:** Cô giáo có thể dạy nhiều lớp (1A1, 1A2...) và dán nhanh danh sách học sinh từ Excel vào máy mà không cần nhập tay từng bé.
- **File tác động:**
  - Tạo mới: `src/components/classroom/ClassroomManagerModal.tsx`
  - Tạo mới: `src/components/classroom/ClassroomManagerModal.module.css`
  - Sửa đổi: `src/core/classroom-store.ts`
- **Các bước thực hiện:**
  1. Cho phép cô nhập tên lớp (ví dụ: "Lớp 1A1") và dán danh sách học sinh (mỗi dòng 1 tên).
  2. Tự động chuẩn hóa tên (bỏ khoảng trắng thừa, viết hoa chữ cái đầu).
  3. Cung cấp checkbox đánh dấu học sinh vắng mặt hôm nay (để vòng quay không bốc trúng bé vắng).
  4. Nút "Làm mới lượt gọi" để reset danh sách các bé đã lên bảng trong buổi dạy.

### Task 5: Nâng cấp Bảng điểm thi đua các Tổ (Team Scoreboard)
- **Mục đích:** Hỗ trợ từ 2 đến 4 tổ với tên gọi thân thiện (Tổ 1: Vàng, Tổ 2: Đỏ, Tổ 3: Xanh, Tổ 4: Cam).
- **File tác động:**
  - `src/components/classroom/TeamScoreboard.tsx`
  - `src/components/classroom/TeamScoreboard.module.css`
- **Các bước thực hiện:**
  1. Cho phép đổi tên tổ tùy ý (hoặc chọn mẫu: Sao Vàng, Măng Non, Tia Chớp, Sơn Ca).
  2. Nút cộng sao (`+1`, `+5`) và trừ sao (`-1`) trên Presenter; hiển thị huy hiệu sao vàng rực rỡ ở góc trên màn hình TV.
  3. Đồng bộ tức thời qua `STATE_SNAPSHOT`.

---

## Giai đoạn 3: Tối ưu Sân khấu TV & Hiệu ứng Thưởng sao (`/present`)

### Task 6: Hiệu ứng Thưởng sao rực rỡ khi trả lời Đúng
- **Mục đích:** Tạo sự hào hứng, phấn khích cho học sinh lớp 1 mỗi khi giải đúng câu hỏi.
- **File tác động:**
  - Tạo mới: `src/components/common/StarRewardOverlay.tsx`
  - `src/pages/PresentPage.tsx`
- **Các bước thực hiện:**
  1. Tạo component hiệu ứng sao rơi / pháo hoa sao nhẹ nhàng bằng CSS Canvas/Keyframes (không cần thư viện nặng ngoài).
  2. Kích hoạt hiệu ứng trên TV khi nhận được hành động `ANSWER_CORRECT` từ giáo viên kèm âm thanh ting ting ngắn vui nhộn.
  3. Tự động biến mất sau 1.5 giây để không làm gián đoạn bài học.

### Task 7: Màn hình Tổng kết & Khen ngợi cuối buổi học
- **Mục đích:** Tuyên dương tổ chiến thắng và ôn tập lại các câu hỏi học sinh còn làm sai trong giờ.
- **File tác động:**
  - `src/pages/PresentPage.tsx`
  - `src/pages/PresenterPage.tsx`
- **Các bước thực hiện:**
  1. Nếu còn câu hỏi trong `wrongAnswerQueue`, giáo viên có nút "Cùng ôn tập lại X câu chưa đúng" để ôn tập nhanh trước khi kết thúc.
  2. Khi hoàn thành bài, hiển thị bảng vinh danh tổ có nhiều sao nhất kèm hiệu ứng pháo hoa chúc mừng.

---

## Giai đoạn 4: Hoàn thiện Bộ Bài Giảng Mẫu Chuẩn SGK Lớp 1 (Toán & Tiếng Việt)

### Task 8: Hoàn thiện Bài Tiếng Việt số 2 (`vn-lesson-02.json`) sang chuẩn `publish`
- **Nội dung:** Bài thực hành ghép vần nâng cao (`ba, ca, ba ba, cá cờ`), câu hỏi nối cột (`matching`) và chạm đặt vần (`tap_place`).
- **File tác động:**
  - `content/lessons/vn-lesson-02.json`
  - Chạy `python scripts/generate-tts.py` để sinh âm thanh giọng đọc Tiếng Việt thật cho toàn bộ từ và câu hỏi bài 2.
  - Chạy `npm run validate` để bảo đảm 100% hợp lệ.

### Task 9: Hoàn thiện Bài Toán số 2 (`math-lesson-02.json`) sang chuẩn `publish`
- **Nội dung:** Bài học nhận biết hình phẳng (Hình vuông, Hình tròn, Hình tam giác, Hình chữ nhật) và so sánh nhiều hơn - ít hơn với hình vẽ SVG tươi sáng.
- **File tác động:**
  - Tạo hình SVG: `public/media/images/square.svg`, `circle.svg`, `triangle.svg`, `rectangle.svg`
  - `content/lessons/math-lesson-02.json`
  - Sinh âm thanh bài toán số 2 và kiểm tra hợp lệ.

### Task 10: Kiểm thử toàn diện & Đóng gói bản phát hành
- **Các bước kiểm tra:**
  1. Chạy `npm run typecheck` $\rightarrow$ 0 lỗi TypeScript.
  2. Chạy `npm test` $\rightarrow$ 100% unit tests passed.
  3. Chạy `npm run validate` $\rightarrow$ 4/4 bài đạt chuẩn `publish`.
  4. Chạy `npm run build` $\rightarrow$ Service Worker nạp đủ 100% tài nguyên offline.
  5. Chạy `npm run test:e2e` $\rightarrow$ E2E browser tests pass 100%.
  6. Commit & Push lên GitHub `origin main`.
