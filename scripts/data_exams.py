# -*- coding: utf-8 -*-
"""
Specifications for 8 Period Standard Exams (80 questions total).
4 Math + 4 Vietnamese (Giữa HK1, Cuối HK1, Giữa HK2, Cuối HK2 / Cuối năm).
"""

def get_exams_specs():
    exams = [
        # =========================================================================
        # 1. ĐỀ ÔN GIỮA HỌC KÌ 1 TOÁN LỚP 1
        # =========================================================================
        {
            "id": "exam-toan-giua-ki-1",
            "title": "Đề Ôn giữa học kì 1 Toán Lớp 1",
            "subject": "math",
            "term": "giua-ki-1",
            "termLabel": "Giữa Kì 1",
            "icon": "🍂",
            "durationMinutes": 15,
            "description": "Kiểm tra đếm, so sánh số 0-10, nhận biết hình phẳng (vuông, tròn, tam giác, chữ nhật).",
            "questions": [
                {
                    "id": "et-g1-q1", "prompt": "Có mấy bông hoa hồng nở trong vườn?", "ill": "/media/images/flower.svg",
                    "options": [("et-g1-q1-a", "3 bông hoa", False), ("et-g1-q1-b", "5 bông hoa", True), ("et-g1-q1-c", "7 bông hoa", False)],
                    "exp": "Quan sát hình vẽ ta đếm được chính xác 5 bông hoa hồng."
                },
                {
                    "id": "et-g1-q2", "prompt": "Số liền trước của số 5 là số nào?", "ill": "/media/images/star.svg",
                    "options": [("et-g1-q2-a", "Số 4", True), ("et-g1-q2-b", "Số 6", False), ("et-g1-q2-c", "Số 3", False)],
                    "exp": "Số liền trước của 5 là 5 - 1 = 4."
                },
                {
                    "id": "et-g1-q3", "prompt": "Điền dấu thích hợp vào chỗ chấm: 7 ... 4", "ill": "/media/images/star.svg",
                    "options": [("et-g1-q3-a", "> (lớn hơn)", True), ("et-g1-q3-b", "< (bé hơn)", False), ("et-g1-q3-c", "= (bằng)", False)],
                    "exp": "7 lớn hơn 4, ta điền dấu lớn hơn (>)."
                },
                {
                    "id": "et-g1-q4", "prompt": "Hình nào dưới đây là hình tròn?", "ill": "/media/images/apple.svg",
                    "options": [("et-g1-q4-a", "Mặt trăng rằm tròn xoe", True), ("et-g1-q4-b", "Khung cửa sổ vuông", False), ("et-g1-q4-c", "Cái ê-ke tam giác", False)],
                    "exp": "Mặt trăng rằm có dạng hình tròn đường cong khép kín."
                },
                {
                    "id": "et-g1-q5", "prompt": "Tính nhẩm: 3 + 2 = ?", "ill": "/media/images/apple.svg",
                    "options": [("et-g1-q5-a", "Bằng 4", False), ("et-g1-q5-b", "Bằng 5", True), ("et-g1-q5-c", "Bằng 6", False)],
                    "exp": "3 cộng 2 bằng 5."
                },
                {
                    "id": "et-g1-q6", "prompt": "Số nào bé nhất trong các số: 8, 3, 9, 1?", "ill": "/media/images/star.svg",
                    "options": [("et-g1-q6-a", "Số 1", True), ("et-g1-q6-b", "Số 3", False), ("et-g1-q6-c", "Số 8", False)],
                    "exp": "Số 1 là số bé nhất trong dãy số trên."
                },
                {
                    "id": "et-g1-q7", "prompt": "Có 4 quả táo, ăn mất 1 quả. Còn lại mấy quả táo?", "ill": "/media/images/apple.svg",
                    "options": [("et-g1-q7-a", "2 quả", False), ("et-g1-q7-b", "3 quả", True), ("et-g1-q7-c", "4 quả", False)],
                    "exp": "4 trừ 1 bằng 3 quả táo."
                },
                {
                    "id": "et-g1-q8", "prompt": "Sắp xếp các số theo thứ tự từ bé đến lớn: 2, 7, 5", "ill": "/media/images/star.svg",
                    "options": [("et-g1-q8-a", "2, 5, 7", True), ("et-g1-q8-b", "7, 5, 2", False), ("et-g1-q8-c", "5, 2, 7", False)],
                    "exp": "Thứ tự từ bé đến lớn là 2, 5, 7."
                },
                {
                    "id": "et-g1-q9", "prompt": "Hình tam giác có mấy cạnh?", "ill": "/media/images/star.svg",
                    "options": [("et-g1-q9-a", "3 cạnh", True), ("et-g1-q9-b", "4 cạnh", False), ("et-g1-q9-c", "5 cạnh", False)],
                    "exp": "Hình tam giác có đúng 3 cạnh và 3 góc."
                },
                {
                    "id": "et-g1-q10", "prompt": "Tính: 5 - 0 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-g1-q10-a", "Bằng 0", False), ("et-g1-q10-b", "Bằng 5", True), ("et-g1-q10-c", "Bằng 4", False)],
                    "exp": "Bất kì số nào trừ đi 0 vẫn bằng chính số đó: 5 - 0 = 5."
                }
            ]
        },

        # =========================================================================
        # 2. ĐỀ THI CUỐI HỌC KÌ 1 TOÁN LỚP 1
        # =========================================================================
        {
            "id": "exam-toan-cuoi-ki-1",
            "title": "Đề thi Cuối học kì 1 Toán Lớp 1",
            "subject": "math",
            "term": "cuoi-ki-1",
            "termLabel": "Cuối Kì 1",
            "icon": "❄️",
            "durationMinutes": 15,
            "description": "Tổng hợp phép cộng trừ phạm vi 10, khối lập phương, khối hộp chữ nhật, tính ba số liên tiếp.",
            "questions": [
                {
                    "id": "et-c1-q1", "prompt": "Tính: 7 + 3 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-c1-q1-a", "Bằng 9", False), ("et-c1-q1-b", "Bằng 10", True), ("et-c1-q1-c", "Bằng 8", False)],
                    "exp": "7 cộng 3 bằng 10."
                },
                {
                    "id": "et-c1-q2", "prompt": "Tính: 10 - 6 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-c1-q2-a", "Bằng 4", True), ("et-c1-q2-b", "Bằng 5", False), ("et-c1-q2-c", "Bằng 3", False)],
                    "exp": "10 trừ 6 bằng 4."
                },
                {
                    "id": "et-c1-q3", "prompt": "Thực hiện phép tính liên tiếp: 4 + 3 - 2 = ?", "ill": "/media/images/apple.svg",
                    "options": [("et-c1-q3-a", "Bằng 5", True), ("et-c1-q3-b", "Bằng 6", False), ("et-c1-q3-c", "Bằng 4", False)],
                    "exp": "4 + 3 = 7, sau đó lấy 7 - 2 = 5."
                },
                {
                    "id": "et-c1-q4", "prompt": "Viên xúc xắc đồ chơi có dạng khối hình gì?", "ill": "/media/images/house.svg",
                    "options": [("et-c1-q4-a", "Khối lập phương", True), ("et-c1-q4-b", "Khối hộp chữ nhật", False), ("et-c1-q4-c", "Hình tam giác", False)],
                    "exp": "Viên xúc xắc có 6 mặt vuông bằng nhau nên là khối lập phương."
                },
                {
                    "id": "et-c1-q5", "prompt": "Điền số thích hợp: 8 - ... = 3", "ill": "/media/images/pencil.svg",
                    "options": [("et-c1-q5-a", "Số 5", True), ("et-c1-q5-b", "Số 4", False), ("et-c1-q5-c", "Số 6", False)],
                    "exp": "8 - 5 = 3."
                },
                {
                    "id": "et-c1-q6", "prompt": "Hộp sữa tươi có dạng khối gì?", "ill": "/media/images/milk.svg",
                    "options": [("et-c1-q6-a", "Khối hộp chữ nhật", True), ("et-c1-q6-b", "Khối lập phương", False)],
                    "exp": "Hộp sữa có các mặt hình chữ nhật nên là khối hộp chữ nhật."
                },
                {
                    "id": "et-c1-q7", "prompt": "So sánh: 9 - 4 ... 3 + 2", "ill": "/media/images/star.svg",
                    "options": [("et-c1-q7-a", "= (bằng nhau)", True), ("et-c1-q7-b", "> (lớn hơn)", False), ("et-c1-q7-c", "< (bé hơn)", False)],
                    "exp": "9 - 4 = 5 và 3 + 2 = 5. Do đó 5 = 5."
                },
                {
                    "id": "et-c1-q8", "prompt": "Tổ một có 6 bạn, tổ hai có 4 bạn. Cả hai tổ có bao nhiêu bạn?", "ill": "/media/images/book.svg",
                    "options": [("et-c1-q8-a", "9 bạn", False), ("et-c1-q8-b", "10 bạn", True), ("et-c1-q8-c", "8 bạn", False)],
                    "exp": "6 + 4 = 10 bạn học sinh."
                },
                {
                    "id": "et-c1-q9", "prompt": "Khi đứng chào cờ, bảng đen ở vị trí nào so với em?", "ill": "/media/images/house.svg",
                    "options": [("et-c1-q9-a", "Ở phía trước", True), ("et-c1-q9-b", "Ở phía sau", False), ("et-c1-q9-c", "Ở dưới đất", False)],
                    "exp": "Bảng đen ở ngay phía trước mặt em."
                },
                {
                    "id": "et-c1-q10", "prompt": "Tính: 10 - 2 - 3 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-c1-q10-a", "Bằng 5", True), ("et-c1-q10-b", "Bằng 6", False), ("et-c1-q10-c", "Bằng 4", False)],
                    "exp": "10 - 2 = 8, 8 - 3 = 5."
                }
            ]
        },

        # =========================================================================
        # 3. ĐỀ ÔN GIỮA HỌC KÌ 2 TOÁN LỚP 1
        # =========================================================================
        {
            "id": "exam-toan-giua-ki-2",
            "title": "Đề Ôn giữa học kì 2 Toán Lớp 1",
            "subject": "math",
            "term": "giua-ki-2",
            "termLabel": "Giữa Kì 2",
            "icon": "🌸",
            "durationMinutes": 15,
            "description": "Các số đến 100, đo độ dài xăng-ti-mét, cộng trừ số tròn chục và giải toán có lời văn ngắn.",
            "questions": [
                {
                    "id": "et-g2-q1", "prompt": "Số 47 gồm mấy chục và mấy đơn vị?", "ill": "/media/images/pencil.svg",
                    "options": [("et-g2-q1-a", "4 chục và 7 đơn vị", True), ("et-g2-q1-b", "7 chục và 4 đơn vị", False), ("et-g2-q1-c", "47 chục", False)],
                    "exp": "47 gồm 4 chục và 7 đơn vị."
                },
                {
                    "id": "et-g2-q2", "prompt": "Đơn vị xăng-ti-mét được viết tắt là gì?", "ill": "/media/images/ruler.svg",
                    "options": [("et-g2-q2-a", "cm", True), ("et-g2-q2-b", "kg", False), ("et-g2-q2-c", "dm", False)],
                    "exp": "Xăng-ti-mét viết tắt là cm."
                },
                {
                    "id": "et-g2-q3", "prompt": "Tính nhẩm: 40 + 30 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-g2-q3-a", "Bằng 70", True), ("et-g2-q3-b", "Bằng 60", False), ("et-g2-q3-c", "Bằng 80", False)],
                    "exp": "4 chục cộng 3 chục bằng 7 chục (70)."
                },
                {
                    "id": "et-g2-q4", "prompt": "Bút chì dài từ vạch 0 đến vạch 9 trên thước. Bút chì dài bao nhiêu cm?", "ill": "/media/images/ruler.svg",
                    "options": [("et-g2-q4-a", "9cm", True), ("et-g2-q4-b", "8cm", False), ("et-g2-q4-c", "10cm", False)],
                    "exp": "Từ vạch 0 đến vạch 9 là 9cm."
                },
                {
                    "id": "et-g2-q5", "prompt": "Số tròn chục liền sau số 50 là số nào?", "ill": "/media/images/star.svg",
                    "options": [("et-g2-q5-a", "Số 60", True), ("et-g2-q5-b", "Số 40", False), ("et-g2-q5-c", "Số 51", False)],
                    "exp": "Số tròn chục liền sau 50 là 60."
                },
                {
                    "id": "et-g2-q6", "prompt": "Tính: 15cm + 4cm = ?", "ill": "/media/images/ruler.svg",
                    "options": [("et-g2-q6-a", "19cm", True), ("et-g2-q6-b", "18cm", False), ("et-g2-q6-c", "20cm", False)],
                    "exp": "15 + 4 = 19cm."
                },
                {
                    "id": "et-g2-q7", "prompt": "Điền dấu thích hợp: 85 ... 58", "ill": "/media/images/star.svg",
                    "options": [("et-g2-q7-a", "> (lớn hơn)", True), ("et-g2-q7-b", "< (bé hơn)", False), ("et-g2-q7-c", "= (bằng)", False)],
                    "exp": "8 chục lớn hơn 5 chục nên 85 > 58."
                },
                {
                    "id": "et-g2-q8", "prompt": "Tính: 90 - 50 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-g2-q8-a", "Bằng 40", True), ("et-g2-q8-b", "Bằng 30", False), ("et-g2-q8-c", "Bằng 50", False)],
                    "exp": "9 chục trừ 5 chục bằng 4 chục (40)."
                },
                {
                    "id": "et-g2-q9", "prompt": "Số liền trước số 90 là số nào?", "ill": "/media/images/book.svg",
                    "options": [("et-g2-q9-a", "Số 89", True), ("et-g2-q9-b", "Số 91", False), ("et-g2-q9-c", "Số 80", False)],
                    "exp": "Số liền trước 90 là 89."
                },
                {
                    "id": "et-g2-q10", "prompt": "Đoạn dây đỏ dài 20cm, đoạn dây xanh dài 30cm. Cả hai đoạn dài bao nhiêu?", "ill": "/media/images/ruler.svg",
                    "options": [("et-g2-q10-a", "50cm", True), ("et-g2-q10-b", "40cm", False), ("et-g2-q10-c", "60cm", False)],
                    "exp": "20cm + 30cm = 50cm."
                }
            ]
        },

        # =========================================================================
        # 4. ĐỀ THI CUỐI NĂM TOÁN LỚP 1
        # =========================================================================
        {
            "id": "exam-toan-cuoi-nam",
            "title": "Đề thi Cuối năm Toán Lớp 1",
            "subject": "math",
            "term": "cuoi-nam",
            "termLabel": "Cuối Năm",
            "icon": "🌞",
            "durationMinutes": 15,
            "description": "Tổng hợp toàn bộ kiến thức Toán Lớp 1: phép tính phạm vi 100, xem giờ đồng hồ, ngày trong tuần, giải toán có lời văn.",
            "questions": [
                {
                    "id": "et-cn-q1", "prompt": "Tính: 43 + 25 = ?", "ill": "/media/images/apple.svg",
                    "options": [("et-cn-q1-a", "68", True), ("et-cn-q1-b", "67", False), ("et-cn-q1-c", "58", False)],
                    "exp": "3 + 5 = 8, 4 + 2 = 6, kết quả là 68."
                },
                {
                    "id": "et-cn-q2", "prompt": "Tính: 76 - 32 = ?", "ill": "/media/images/apple.svg",
                    "options": [("et-cn-q2-a", "44", True), ("et-cn-q2-b", "43", False), ("et-cn-q2-c", "54", False)],
                    "exp": "6 - 2 = 4, 7 - 3 = 4, kết quả là 44."
                },
                {
                    "id": "et-cn-q3", "prompt": "Đồng hồ có kim ngắn chỉ số 8, kim dài chỉ số 12. Lúc đó là mấy giờ?", "ill": "/media/images/star.svg",
                    "options": [("et-cn-q3-a", "8 giờ đúng", True), ("et-cn-q3-b", "12 giờ đúng", False), ("et-cn-q3-c", "4 giờ đúng", False)],
                    "exp": "Kim ngắn chỉ số 8, kim dài số 12 là đúng 8 giờ."
                },
                {
                    "id": "et-cn-q4", "prompt": "Một tuần lễ có bao nhiêu ngày?", "ill": "/media/images/book.svg",
                    "options": [("et-cn-q4-a", "7 ngày", True), ("et-cn-q4-b", "5 ngày", False), ("et-cn-q4-c", "6 ngày", False)],
                    "exp": "Một tuần lễ có đúng 7 ngày từ Thứ Hai đến Chủ Nhật."
                },
                {
                    "id": "et-cn-q5", "prompt": "Hôm nay là Thứ Ba ngày 4. Thứ Năm cùng tuần là ngày bao nhiêu?", "ill": "/media/images/book.svg",
                    "options": [("et-cn-q5-a", "Ngày 6", True), ("et-cn-q5-b", "Ngày 5", False), ("et-cn-q5-c", "Ngày 7", False)],
                    "exp": "Thứ Ba (4) -> Thứ Tư (5) -> Thứ Năm (6)."
                },
                {
                    "id": "et-cn-q6", "prompt": "Mẹ có 35 quả cam, mẹ mua thêm 14 quả nữa. Mẹ có tất cả bao nhiêu quả cam?", "ill": "/media/images/apple.svg",
                    "options": [("et-cn-q6-a", "49 quả", True), ("et-cn-q6-b", "48 quả", False), ("et-cn-q6-c", "59 quả", False)],
                    "exp": "35 + 14 = 49 quả cam."
                },
                {
                    "id": "et-cn-q7", "prompt": "Tính chuỗi phép tính: 50 + 20 - 10 = ?", "ill": "/media/images/star.svg",
                    "options": [("et-cn-q7-a", "60", True), ("et-cn-q7-b", "70", False), ("et-cn-q7-c", "50", False)],
                    "exp": "50 + 20 = 70, 70 - 10 = 60."
                },
                {
                    "id": "et-cn-q8", "prompt": "Số lớn nhất có hai chữ số là số nào?", "ill": "/media/images/star.svg",
                    "options": [("et-cn-q8-a", "Số 99", True), ("et-cn-q8-b", "Số 90", False), ("et-cn-q8-c", "Số 100", False)],
                    "exp": "99 là số có hai chữ số lớn nhất."
                },
                {
                    "id": "et-cn-q9", "prompt": "Đoạn thẳng AB dài 18cm, cắt bớt 5cm. Đoạn thẳng còn lại dài bao nhiêu?", "ill": "/media/images/ruler.svg",
                    "options": [("et-cn-q9-a", "13cm", True), ("et-cn-q9-b", "12cm", False), ("et-cn-q9-c", "14cm", False)],
                    "exp": "18cm - 5cm = 13cm."
                },
                {
                    "id": "et-cn-q10", "prompt": "Hình khối nào có 6 mặt đều là hình vuông bằng nhau?", "ill": "/media/images/house.svg",
                    "options": [("et-cn-q10-a", "Khối lập phương", True), ("et-cn-q10-b", "Khối hộp chữ nhật", False)],
                    "exp": "Khối lập phương có 6 mặt vuông bằng nhau."
                }
            ]
        },

        # =========================================================================
        # 5. ĐỀ ÔN GIỮA HỌC KÌ 1 TIẾNG VIỆT LỚP 1
        # =========================================================================
        {
            "id": "exam-tv-giua-ki-1",
            "title": "Đề Ôn giữa học kì 1 Tiếng Việt Lớp 1",
            "subject": "vietnamese",
            "term": "giua-ki-1",
            "termLabel": "Giữa Kì 1",
            "icon": "🍂",
            "durationMinutes": 15,
            "description": "Kiểm tra bảng chữ cái âm đơn, dấu thanh, phân biệt c/k, đọc từ ngữ và nối câu.",
            "questions": [
                {
                    "id": "ev-g1-q1", "prompt": "Tiếng 'cá' gồm có âm c, âm a và dấu thanh gì?", "ill": "/media/images/bird.svg",
                    "options": [("ev-g1-q1-a", "Dấu sắc", True), ("ev-g1-q1-b", "Dấu huyền", False), ("ev-g1-q1-c", "Dấu hỏi", False)],
                    "exp": "Tiếng cá gồm âm c, âm a và dấu sắc trên đầu chữ a."
                },
                {
                    "id": "ev-g1-q2", "prompt": "Theo quy tắc chính tả, âm 'k' ghép được với những chữ cái nào?", "ill": "/media/images/book.svg",
                    "options": [("ev-g1-q2-a", "e, ê, i", True), ("ev-g1-q2-b", "a, o, u", False), ("ev-g1-q2-c", "o, ô, ơ", False)],
                    "exp": "Âm k chỉ đi với e, ê, i (kẻ, kề, kí)."
                },
                {
                    "id": "ev-g1-q3", "prompt": "Từ nào sau đây viết đúng chính tả?", "ill": "/media/images/pencil.svg",
                    "options": [("ev-g1-q3-a", "Cây kẹo", True), ("ev-g1-q3-b", "Cây cẹo", False)],
                    "exp": "Đi với e phải viết bằng k: 'kẹo'."
                },
                {
                    "id": "ev-g1-q4", "prompt": "Âm 'd' và âm 'đ' khác nhau ở điểm nào?", "ill": "/media/images/book.svg",
                    "options": [("ev-g1-q4-a", "Chữ đ có thêm dấu gạch ngang", True), ("ev-g1-q4-b", "Chữ d có dấu chấm ở trên", False)],
                    "exp": "Chữ đ có nét gạch ngang ngắn ở thân."
                },
                {
                    "id": "ev-g1-q5", "prompt": "Từ nào là tên gọi của một loài hoa thơm?", "ill": "/media/images/flower.svg",
                    "options": [("ev-g1-q5-a", "Hoa hồng", True), ("ev-g1-q5-b", "Con hươu", False), ("ev-g1-q5-c", "Cái hồ", False)],
                    "exp": "Hoa hồng là loài hoa thơm ngát."
                },
                {
                    "id": "ev-g1-q6", "prompt": "Tiếng nào có dấu thanh 'hỏi'?", "ill": "/media/images/star.svg",
                    "options": [("ev-g1-q6-a", "Thỏ", True), ("ev-g1-q6-b", "Cá", False), ("ev-g1-q6-c", "Mẹ", False)],
                    "exp": "Tiếng thỏ có dấu hỏi trên chữ o."
                },
                {
                    "id": "ev-g1-q7", "prompt": "Phụ âm ghép 'ch' xuất hiện trong từ nào sau đây?", "ill": "/media/images/bird.svg",
                    "options": [("ev-g1-q7-a", "Chim sẻ", True), ("ev-g1-q7-b", "Quả khế", False), ("ev-g1-q7-c", "Nhà ngói", False)],
                    "exp": "Chim sẻ có tiếng chim bắt đầu bằng ch."
                },
                {
                    "id": "ev-g1-q8", "prompt": "Điền chữ còn thiếu: 'C... gà trống gáy vang.'", "ill": "/media/images/bird.svg",
                    "options": [("ev-g1-q8-a", "Chữ on (Con)", True), ("ev-g1-q8-b", "Chữ a (Ca)", False)],
                    "exp": "Con gà trống gáy vang."
                },
                {
                    "id": "ev-g1-q9", "prompt": "Câu: 'Bé ngoan nghe lời cô giáo' có mấy tiếng?", "ill": "/media/images/book.svg",
                    "options": [("ev-g1-q9-a", "6 tiếng", False), ("ev-g1-q9-b", "7 tiếng", True), ("ev-g1-q9-c", "8 tiếng", False)],
                    "exp": "Các tiếng: Bé (1) ngoan (2) nghe (3) lời (4) cô (5) giáo (6) -> 6 tiếng. À, đếm: Bé - ngoan - nghe - lời - cô - giáo = 6 tiếng."
                },
                {
                    "id": "ev-g1-q10", "prompt": "Từ nào sau đây viết hoa đúng tên người?", "ill": "/media/images/pencil.svg",
                    "options": [("ev-g1-q10-a", "Bé Lan", True), ("ev-g1-q10-b", "bé lan", False), ("ev-g1-q10-c", "BÉ lan", False)],
                    "exp": "Tên riêng Lan phải viết hoa chữ cái đầu."
                }
            ]
        },

        # =========================================================================
        # 6. ĐỀ THI CUỐI HỌC KÌ 1 TIẾNG VIỆT LỚP 1
        # =========================================================================
        {
            "id": "exam-tv-cuoi-ki-1",
            "title": "Đề thi Cuối học kì 1 Tiếng Việt Lớp 1",
            "subject": "vietnamese",
            "term": "cuoi-ki-1",
            "termLabel": "Cuối Kì 1",
            "icon": "❄️",
            "durationMinutes": 15,
            "description": "Đánh giá các cụm vần kết thúc bằng n, m, p, t, c và đọc hiểu đoạn văn ngắn.",
            "questions": [
                {
                    "id": "ev-c1-q1", "prompt": "Từ 'khăn quàng' chứa vần gì ở tiếng 'khăn'?", "ill": "/media/images/book.svg",
                    "options": [("ev-c1-q1-a", "Vần ăn", True), ("ev-c1-q1-b", "Vần an", False), ("ev-c1-q1-c", "Vần ân", False)],
                    "exp": "Tiếng khăn chứa vần ăn."
                },
                {
                    "id": "ev-c1-q2", "prompt": "Quy tắc chính tả: 'ngh' chỉ ghép với những âm nào?", "ill": "/media/images/pencil.svg",
                    "options": [("ev-c1-q2-a", "e, ê, i", True), ("ev-c1-q2-b", "a, o, u", False), ("ev-c1-q2-c", "ô, ơ, ư", False)],
                    "exp": "ngh chỉ ghép với e, ê, i (nghé, nghê, nghỉ)."
                },
                {
                    "id": "ev-c1-q3", "prompt": "Từ nào sau đây viết sai chính tả?", "ill": "/media/images/book.svg",
                    "options": [("ev-c1-q3-a", "Con nghé", False), ("ev-c1-q3-b", "Củ nghệ", False), ("ev-c1-q3-c", "Nghe nghóng (viết ngóng thành nghóng)", True)],
                    "exp": "Chữ ngóng phải viết bằng ng đơn vì đi với o: 'nghe ngóng'."
                },
                {
                    "id": "ev-c1-q4", "prompt": "Từ nào miêu tả quả cam chín mọng và chứa vần 'am'?", "ill": "/media/images/apple.svg",
                    "options": [("ev-c1-q4-a", "Quả cam", True), ("ev-c1-q4-b", "Cây nấm", False), ("ev-c1-q4-c", "Con tôm", False)],
                    "exp": "Quả cam có tiếng cam chứa vần am."
                },
                {
                    "id": "ev-c1-q5", "prompt": "Tiếng 'sen' trong 'hoa sen' chứa vần gì?", "ill": "/media/images/flower.svg",
                    "options": [("ev-c1-q5-a", "Vần en", True), ("ev-c1-q5-b", "Vần ên", False), ("ev-c1-q5-c", "Vần in", False)],
                    "exp": "Hoa sen chứa vần en."
                },
                {
                    "id": "ev-c1-q6", "prompt": "Từ nào chứa tiếng có vần 'ăc'?", "ill": "/media/images/star.svg",
                    "options": [("ev-c1-q6-a", "Tắc kè", True), ("ev-c1-q6-b", "Chim hạc", False), ("ev-c1-q6-c", "Mặt trời", False)],
                    "exp": "Tắc kè có tiếng tắc chứa vần ăc."
                },
                {
                    "id": "ev-c1-q7", "prompt": "Đọc câu: 'Đàn chim én bay lượn báo mùa xuân về.' Chim én báo hiệu mùa nào?", "ill": "/media/images/bird.svg",
                    "options": [("ev-c1-q7-a", "Mùa xuân", True), ("ev-c1-q7-b", "Mùa hè", False), ("ev-c1-q7-c", "Mùa đông", False)],
                    "exp": "Đoạn văn viết: chim én báo mùa xuân về."
                },
                {
                    "id": "ev-c1-q8", "prompt": "Điền từ: 'Mặt trời ... tỏa ánh nắng ấm áp.'", "ill": "/media/images/star.svg",
                    "options": [("ev-c1-q8-a", "mọc", True), ("ev-c1-q8-b", "học", False)],
                    "exp": "Mặt trời mọc vào buổi sớm."
                },
                {
                    "id": "ev-c1-q9", "prompt": "Tiếng nào có âm cuối 'm' khép môi?", "ill": "/media/images/star.svg",
                    "options": [("ev-c1-q9-a", "Đom đóm", True), ("ev-c1-q9-b", "Đèn pin", False), ("ev-c1-q9-c", "Con cá", False)],
                    "exp": "Đom đóm có vần om kết thúc bằng m khép môi."
                },
                {
                    "id": "ev-c1-q10", "prompt": "Từ nào dưới đây là từ chỉ đồ dùng học tập của em?", "ill": "/media/images/pencil.svg",
                    "options": [("ev-c1-q10-a", "Bút chì", True), ("ev-c1-q10-b", "Bát cơm", False), ("ev-c1-q10-c", "Cái chăn", False)],
                    "exp": "Bút chì là đồ dùng học tập quen thuộc."
                }
            ]
        },

        # =========================================================================
        # 7. ĐỀ ÔN GIỮA HỌC KÌ 2 TIẾNG VIỆT LỚP 1
        # =========================================================================
        {
            "id": "exam-tv-giua-ki-2",
            "title": "Đề Ôn giữa học kì 2 Tiếng Việt Lớp 1",
            "subject": "vietnamese",
            "term": "giua-ki-2",
            "termLabel": "Giữa Kì 2",
            "icon": "🌸",
            "durationMinutes": 15,
            "description": "Kiểm tra vần có âm đệm tròn môi, phân biệt chính tả l/n, s/x, tr/ch, đọc hiểu đoạn văn.",
            "questions": [
                {
                    "id": "ev-g2-q1", "prompt": "Từ 'củ khoai' chứa vần gì ở tiếng 'khoai'?", "ill": "/media/images/leaf.svg",
                    "options": [("ev-g2-q1-a", "Vần oai", True), ("ev-g2-q1-b", "Vần oay", False), ("ev-g2-q1-c", "Vần ai", False)],
                    "exp": "Tiếng khoai chứa vần oai."
                },
                {
                    "id": "ev-g2-q2", "prompt": "Từ nào dưới đây viết đúng chính tả với âm 'l'?", "ill": "/media/images/leaf.svg",
                    "options": [("ev-g2-q2-a", "Lúa nếp", True), ("ev-g2-q2-b", "Núa nếp", False), ("ev-g2-q2-c", "Lúa lếp", False)],
                    "exp": "Viết đúng chính tả là 'lúa nếp'."
                },
                {
                    "id": "ev-g2-q3", "prompt": "Điền s hay x: 'Ngôi ...ao sáng lung linh trên trời.'", "ill": "/media/images/star.svg",
                    "options": [("ev-g2-q3-a", "s (sao)", True), ("ev-g2-q3-b", "x (xao)", False)],
                    "exp": "Ngôi sao viết bằng chữ s."
                },
                {
                    "id": "ev-g2-q4", "prompt": "Tiếng 'diều' trong 'cánh diều' chứa vần gì?", "ill": "/media/images/bird.svg",
                    "options": [("ev-g2-q4-a", "Vần iêu", True), ("ev-g2-q4-b", "Vần yêu", False), ("ev-g2-q4-c", "Vần iu", False)],
                    "exp": "Có âm đầu d nên viết vần iêu: 'cánh diều'."
                },
                {
                    "id": "ev-g2-q5", "prompt": "Từ nào sau đây mang vần có âm đệm 'uê'?", "ill": "/media/images/flower.svg",
                    "options": [("ev-g2-q5-a", "Bông hoa huệ", True), ("ev-g2-q5-b", "Cây hoa hồng", False), ("ev-g2-q5-c", "Quả chuối tiêu", False)],
                    "exp": "Hoa huệ có tiếng huệ mang vần uê."
                },
                {
                    "id": "ev-g2-q6", "prompt": "Điền tr hay ch: 'Mái ...ường mến yêu.'", "ill": "/media/images/house.svg",
                    "options": [("ev-g2-q6-a", "tr (trường)", True), ("ev-g2-q6-b", "ch (chường)", False)],
                    "exp": "Mái trường viết bằng tr."
                },
                {
                    "id": "ev-g2-q7", "prompt": "Đọc câu: 'Bé giúp mẹ quét nhà và tưới cây.' Bé đã làm những việc gì?", "ill": "/media/images/house.svg",
                    "options": [("ev-g2-q7-a", "Quét nhà và tưới cây", True), ("ev-g2-q7-b", "Xem tivi và ngủ", False)],
                    "exp": "Bé chăm chỉ quét nhà và tưới cây giúp mẹ."
                },
                {
                    "id": "ev-g2-q8", "prompt": "Cặp từ nào viết đúng quy tắc phân biệt dấu hỏi và dấu ngã?", "ill": "/media/images/star.svg",
                    "options": [("ev-g2-q8-a", "Chăm chỉ, sạch sẽ", True), ("ev-g2-q8-b", "Chăm chỉ, sạch sẻ", False)],
                    "exp": "'Sạch sẽ' viết bằng dấu ngã."
                },
                {
                    "id": "ev-g2-q9", "prompt": "Tiếng 'thuyền' trong 'thuyền buồm' chứa vần gì?", "ill": "/media/images/boat.svg",
                    "options": [("ev-g2-q9-a", "Vần uyên", True), ("ev-g2-q9-b", "Vần uyêt", False), ("ev-g2-q9-c", "Vần uên", False)],
                    "exp": "Tiếng thuyền chứa vần uyên."
                },
                {
                    "id": "ev-g2-q10", "prompt": "Từ nào thể hiện tình cảm của con cái đối với cha mẹ?", "ill": "/media/images/house.svg",
                    "options": [("ev-g2-q10-a", "Hiếu thảo", True), ("ev-g2-q10-b", "Khéo léo", False), ("ev-g2-q10-c", "Lười biếng", False)],
                    "exp": "Hiếu thảo là tình cảm kính yêu, vâng lời ông bà cha mẹ."
                }
            ]
        },

        # =========================================================================
        # 8. ĐỀ THI CUỐI NĂM TIẾNG VIỆT LỚP 1
        # =========================================================================
        {
            "id": "exam-tv-cuoi-nam",
            "title": "Đề thi Cuối năm Tiếng Việt Lớp 1",
            "subject": "vietnamese",
            "term": "cuoi-nam",
            "termLabel": "Cuối Năm",
            "icon": "🌞",
            "durationMinutes": 15,
            "description": "Đề thi chính thức kết thúc năm học Lớp 1: đọc trơn đoạn văn 40-50 chữ, ghép câu và chính tả toàn diện.",
            "questions": [
                {
                    "id": "ev-cn-q1", "prompt": "Đọc đoạn văn: 'Mùa thu, bầu trời trong xanh cao vút. Những chiếc lá vàng khẽ rơi trên sân trường.' Bầu trời mùa thu có đặc điểm gì?", "ill": "/media/images/leaf.svg",
                    "options": [("ev-cn-q1-a", "Trong xanh cao vút", True), ("ev-cn-q1-b", "Mù mịt mây xám", False), ("ev-cn-q1-c", "Mưa to gió lớn", False)],
                    "exp": "Đoạn văn viết: 'Mùa thu, bầu trời trong xanh cao vút'."
                },
                {
                    "id": "ev-cn-q2", "prompt": "Trong câu trên, cái gì khẽ rơi trên sân trường?", "ill": "/media/images/leaf.svg",
                    "options": [("ev-cn-q2-a", "Những chiếc lá vàng", True), ("ev-cn-q2-b", "Những hạt mưa rào", False), ("ev-cn-q2-c", "Những quả táo đỏ", False)],
                    "exp": "Những chiếc lá vàng khẽ rơi trên sân trường."
                },
                {
                    "id": "ev-cn-q3", "prompt": "Chọn từ viết đúng chính tả để điền vào câu: 'Bác Hồ kính ...'", "ill": "/media/images/star.svg",
                    "options": [("ev-cn-q3-a", "yêu", True), ("ev-cn-q3-b", "iêu", False)],
                    "exp": "Không có âm đầu viết y dài: 'yêu'."
                },
                {
                    "id": "ev-cn-q4", "prompt": "Ghép các từ thành câu hoàn chỉnh: 'chăm chỉ / Bé / học bài'", "ill": "/media/images/book.svg",
                    "options": [("ev-cn-q4-a", "Bé chăm chỉ học bài.", True), ("ev-cn-q4-b", "Học bài bé chăm chỉ.", False)],
                    "exp": "Câu hoàn chỉnh: 'Bé chăm chỉ học bài.' có nghĩa rõ ràng."
                },
                {
                    "id": "ev-cn-q5", "prompt": "Dấu câu nào dùng để kết thúc một câu kể?", "ill": "/media/images/pencil.svg",
                    "options": [("ev-cn-q5-a", "Dấu chấm (.)", True), ("ev-cn-q5-b", "Dấu hỏi chấm (?)", False), ("ev-cn-q5-c", "Dấu chấm than (!)", False)],
                    "exp": "Cuối câu kể dùng dấu chấm (.) để kết thúc câu."
                },
                {
                    "id": "ev-cn-q6", "prompt": "Chữ cái đầu câu phải viết như thế nào?", "ill": "/media/images/book.svg",
                    "options": [("ev-cn-q6-a", "Viết hoa", True), ("ev-cn-q6-b", "Viết thường", False)],
                    "exp": "Chữ cái đầu tiên của câu luôn luôn phải viết hoa."
                },
                {
                    "id": "ev-cn-q7", "prompt": "Từ nào sau đây là từ ngữ chỉ tình cảm bạn bè thân thiết?", "ill": "/media/images/star.svg",
                    "options": [("ev-cn-q7-a", "Gắn bó, sẻ chia", True), ("ev-cn-q7-b", "Tranh giành đồ chơi", False)],
                    "exp": "Bạn bè thân thiết luôn biết gắn bó, yêu thương và sẻ chia."
                },
                {
                    "id": "ev-cn-q8", "prompt": "Từ nào chứa vần 'uyên' trong các từ sau?", "ill": "/media/images/boat.svg",
                    "options": [("ev-cn-q8-a", "Kể chuyện", True), ("ev-cn-q8-b", "Trăng khuyết", False), ("ev-cn-q8-c", "Mùa xuân", False)],
                    "exp": "Tiếng chuyện chứa vần uyên."
                },
                {
                    "id": "ev-cn-q9", "prompt": "Điền từ: 'Mùa hè, hoa phượng vĩ nở đỏ ... góc sân trường.'", "ill": "/media/images/flower.svg",
                    "options": [("ev-cn-q9-a", "rực", True), ("ev-cn-q9-b", "lực", False)],
                    "exp": "Đỏ rực viết bằng r."
                },
                {
                    "id": "ev-cn-q10", "prompt": "Kết thúc năm học Lớp 1, em sẽ được lên lớp mấy?", "ill": "/media/images/book.svg",
                    "options": [("ev-cn-q10-a", "Lên Lớp 2", True), ("ev-cn-q10-b", "Lên Lớp 3", False), ("ev-cn-q10-c", "Học lại mẫu giáo", False)],
                    "exp": "Hoàn thành Lớp 1 xuất sắc, em tự tin bước vào Lớp 2!"
                }
            ]
        }
    ]
    return exams
