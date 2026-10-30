# AGENTS.md – Trình Chiếu Lớp 1

## Project Overview
Offline-first Progressive Web App (PWA) phục vụ giảng dạy và trình chiếu trên lớp học Lớp 1. Hệ thống hoạt động hoàn toàn ngoại tuyến trên laptop của giáo viên kết nối trực tiếp với màn hình TV/máy chiếu phòng học.

## Architecture & Tech Stack
- **Vite + React 19 + TypeScript** (chế độ `strict: true`, tuyệt đối không dùng `any`).
- **Zod Schema Engine**: Quản lý nội dung bài giảng thông qua Discriminated Union giữa hai chế độ `draft` và `publish`.
- **Vite PWA (`vite-plugin-pwa`)**: Service worker tự động nạp trước và lưu đệm toàn bộ ứng dụng (`trinh-chieu-media-v1` và `trinh-chieu-content-v1`).
- **Web Audio API (`SessionAudioManager`)**: Nạp và giải phóng tài nguyên âm thanh theo từng buổi học; cơ chế unlock AudioContext khi bắt đầu tiết học; hỗ trợ phát âm thanh qua micro (`MediaRecorder`).
- **BroadcastChannel API (`SyncChannel`)**: Đồng bộ 1 chiều giữa màn hình điều khiển của cô (`/presenter`) và màn hình TV học sinh (`/present`).
- **State Machine (`playerReducer`)**: Quản lý chuyển slide, trả lời câu hỏi, hiệu ứng sao khen thưởng, và làm tối màn hình (blackout).
- **Classroom Store (IndexedDB + localStorage)**: Lưu danh sách học sinh theo lớp, vòng quay gọi tên ngẫu nhiên không lặp lại, bảng điểm 4 đội (Xanh dương, Đỏ, Vàng, Xanh lá), và đồng hồ đếm ngược.

---

## 5 Kiểu Câu Hỏi Tương Tác Lớp 1
1. **`multiple_choice` / `multiple-choice` (Trắc nghiệm hình ảnh & chữ cái)**:
   - Tối đa 2 đến 4 phương án lựa chọn.
   - Mỗi phương án có nhãn chữ, hình ảnh minh họa và file audio phát âm riêng biệt.
2. **`counting` (Tập đếm đồ vật / con vật)**:
   - Hiển thị từ 1 đến 20 hình ảnh trực quan (táo, cá, ngôi sao...).
   - Học sinh đếm và chọn số lượng đúng trong phạm vi đã định (`numberRange`).
3. **`number_select` / `number-select` (Phép tính toán học)**:
   - Hiển thị phép toán (ví dụ: `2 + 1 = ?` hoặc `4 - 2 = ?`).
   - Các nút bấm chọn số kết quả, kích thước lớn phù hợp học sinh tiểu học.
4. **`tap_place` (Ghép âm vào chỗ trống / Điền từ)**:
   - Danh sách các đích cần điền (`targets`) có tiền tố/hậu tố (ví dụ: `Con ... á`).
   - Các thẻ chữ cái/âm cần kéo hoặc chạm (`items`).
   - Kiểm tra `correctMapping` chặt chẽ 1-1 giữa item và target.
5. **`matching` (Nối cột hai vế tương ứng)**:
   - Cột trái (`leftColumn`) và cột phải (`rightColumn`) từ 2 đến 6 mục.
   - Nối chữ với hình ảnh minh họa hoặc từ ứng dụng.
   - Kiểm tra ghép cặp một-một thông qua `correctPairs`.

---

## Luật Xuất Bản (Publish Rules)
Khi bài học ở trạng thái `status: "publish"`, hệ thống áp dụng các quy chuẩn sư phạm nghiêm ngặt:
1. **Bắt buộc Audio cho mọi nội dung chữ**:
   - Mọi slide tiêu đề và slide nội dung đều phải có `audio`.
   - Tất cả các phương án trắc nghiệm, thẻ âm, mục nối có nhãn chữ đều phải có audio phát âm chuẩn.
   - Câu hỏi có lời giải thích (`explanation`) bắt buộc phải có `explanationAudio`.
2. **Tuyệt đối cấm định dạng `.wav`**:
   - Tất cả các file âm thanh trong dự án bắt buộc phải dùng định dạng `.mp3`.
   - File `.wav` bị cấm hoàn toàn ở cả Zod Schema và CLI Validator.
3. **Quy tắc phân định âm thanh (Unique Audio per Text Label)**:
   - Cấm hai nhãn chữ khác nhau trong cùng một câu hỏi dùng chung một file audio.
   - Mỗi tiếng/âm phải có file phát âm chuẩn riêng (ví dụ: "bá" dùng `ba-sac.mp3`, khác với "ba" dùng `ba.mp3`; "cá" dùng `ca-sac.mp3`, khác với "ca" dùng `ca.mp3`).
   - *Ngoại lệ duy nhất*: Các âm thanh lời khen/giải thích chung hoặc âm thanh tiện ích hệ thống (như `explanation-*.mp3`, `math-congrats.mp3`, `timer-chime.mp3`).
4. **Kiểm tra sự tồn tại vật lý trên ổ đĩa**:
   - Mọi đường dẫn media (audio, ảnh SVG, PNG) phải tồn tại thực tế trong thư mục `public/`.

---

## Quy Tắc Đồng Bộ Hai Màn Hình (1-Way Sync)
1. **Single Source of Truth (`/presenter`)**:
   - Màn hình laptop của giáo viên (`/presenter`) nắm toàn bộ quyền điều khiển phiên học và trạng thái reducer.
2. **Pure Display Client (`/present`)**:
   - Màn hình TV (`/present`) chỉ đóng vai trò hiển thị thuần túy, nhận lệnh và snapshot qua `BroadcastChannel`.
   - Khi TV được bật hoặc tải lại, TV tự động phát tín hiệu `HELLO`; `/presenter` phản hồi ngay lập tức bằng `STATE_SNAPSHOT`.
3. **Bảo mật ghi chú sư phạm (`teacherNote`)**:
   - `teacherNote` chỉ hiển thị trên laptop giáo viên để nhắc bài và tiến trình giảng dạy, **tuyệt đối không bao giờ được gửi sang màn hình TV**.
4. **Tập trung chú ý tức thì (`Blackout B`)**:
   - Phím tắt `B` trên laptop cô giáo kích hoạt màn hình đen 100vw x 100vh trên TV để thu hút toàn bộ sự chú ý của học sinh về phía cô.
5. **Điều khiển một tay và Phím tắt thuận tiện**:
   - Mũi tên Phải / Enter / Space: Chuyển slide kế tiếp.
   - Mũi tên Trái: Quay lại slide trước.
   - `P`: Bật / tắt vòng quay gọi học sinh ngẫu nhiên.
   - `T`: Bật / dừng đồng hồ đếm ngược.
   - Phím 1, 2, 3, 4: Cộng điểm nhanh cho 4 đội tương ứng.

---

## Testing & Validation Commands
- `npm test`: Chạy toàn bộ 43+ unit tests Vitest (schemas, reducer, classroom store, lesson storage).
- `npm run validate`: Chạy CLI validator kiểm tra tính hợp lệ của toàn bộ bài giảng JSON trong `content/lessons/`.
- `npm run typecheck`: Kiểm tra tính toàn vẹn kiểu dữ liệu TypeScript (`tsc --noEmit`).
- `npm run build`: Đóng gói ứng dụng thành phẩm cho môi trường PWA offline.
