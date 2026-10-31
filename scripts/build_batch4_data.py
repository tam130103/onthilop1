# -*- coding: utf-8 -*-
"""
Full Builder for Math & Vietnamese Batch 4 (Lessons 21 to 30).
Generates lessons_math_batch4.py and lessons_vn_batch4.py
"""
import os
import sys
import json

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ROOT)

# 1. Import initial 3 math lessons (21-23)
import lessons_math_batch4
math_lessons = lessons_math_batch4.get_math_lessons_batch4()
print(f"Loaded {len(math_lessons)} existing math batch 4 lessons (21-23)")

# Add Math 24 to 30
math_batch4_specs = [
    # MATH 24: Đo độ dài & Đơn vị Xăng-ti-mét (cm)
    {
        "id": "math-24-xang-ti-met", "num": 24, "title": "Bài 24: Đo độ dài & Đơn vị Xăng-ti-mét",
        "desc": "Làm quen thước kẻ có vạch chia xăng-ti-mét (cm), tập đo độ dài và làm phép tính đo lường.",
        "note": "Hướng dẫn đặt vạch số 0 trùng với một đầu của vật cần đo.",
        "intro_title": "Đơn vị Xăng-ti-mét (cm)",
        "intro_body": "Xăng-ti-mét là đơn vị đo độ dài, viết tắt là cm. Trên thước kẻ, khoảng cách giữa hai vạch số liên tiếp là 1cm.",
        "bullets": ["Xăng-ti-mét viết tắt là cm", "Khi đo, đặt vạch 0 trùng đầu vật", "Cộng trừ số đo kèm đơn vị cm: 5cm + 3cm = 8cm"],
        "questions": [
            {
                "type": "multiple_choice", "id": "m24-q1", "prompt": "Đơn vị xăng-ti-mét được viết tắt là gì?", "ill": "/media/images/ruler.svg",
                "options": [("m24-opt-cm", "cm", True), ("m24-opt-kg", "kg", False), ("m24-opt-dm", "dm", False)],
                "exp": "Xăng-ti-mét viết tắt là cm."
            },
            {
                "type": "number_select", "id": "m24-q2", "prompt": "Bút chì đặt từ vạch 0 đến vạch 8 trên thước kẻ. Bút chì dài bao nhiêu xăng-ti-mét?", "ill": "/media/images/ruler.svg",
                "expr": "Bút chì dài: ? cm", "choices": [6, 7, 8, 9], "ans": 8,
                "exp": "Từ vạch 0 đến vạch 8 tương ứng độ dài 8cm."
            },
            {
                "type": "matching", "id": "m24-q3", "prompt": "Nối phép tính đo độ dài với kết quả đúng:", "ill": "/media/images/star.svg",
                "pairs": [("m24-l1", "5cm + 3cm", "m24-r1", "Bằng 8cm"), ("m24-l2", "9cm - 4cm", "m24-r2", "Bằng 5cm"), ("m24-l3", "20cm + 10cm", "m24-r3", "Bằng 30cm")],
                "exp": "5cm+3cm=8cm; 9cm-4cm=5cm; 20cm+10cm=30cm."
            },
            {
                "type": "tap_place", "id": "m24-q4", "prompt": "Chọn kết quả thích hợp điền vào chỗ chấm: 7cm + 2cm = ...", "ill": "/media/images/ruler.svg",
                "target": ("m24-t1", "...", "7cm + 2cm = ", ""), "items": [("m24-i1", "9cm"), ("m24-i2", "8cm")], "correct_item": "m24-i1",
                "exp": "7cm cộng 2cm bằng 9cm."
            },
            {
                "type": "counting", "id": "m24-q5", "prompt": "Đếm xem có bao nhiêu vạch chia trên đoạn thước?", "ill": "/media/images/ruler.svg",
                "count": 5, "img": "/media/images/pencil.svg", "exp": "Có đúng 5 đoạn khoảng cách xăng-ti-mét."
            },
            {
                "type": "number_select", "id": "m24-q6", "prompt": "Tính: 15cm - 5cm = ?", "ill": "/media/images/ruler.svg",
                "expr": "15cm - 5cm = ?", "choices": [8, 9, 10, 12], "ans": 10,
                "exp": "15 trừ 5 bằng 10, kết quả là 10cm."
            }
        ]
    },

    # MATH 25: Đếm thêm 2, thêm 5, thêm 10
    {
        "id": "math-25-dem-them-2-5-10", "num": 25, "title": "Bài 25: Đếm thêm 2, thêm 5, thêm 10",
        "desc": "Nhận biết quy luật dãy số cách đều: đếm thêm 2, thêm 5, thêm 10 và điền số còn thiếu vào dãy.",
        "note": "Rèn tư duy phát hiện khoảng cách giữa các số liên tiếp.",
        "intro_title": "Quy luật đếm cách đều",
        "intro_body": "Đếm thêm 2: 2, 4, 6, 8, 10. Đếm thêm 5: 5, 10, 15, 20. Đếm thêm 10: 10, 20, 30, 40, 50. Cùng luyện tập đếm thật nhanh nhé!",
        "bullets": ["Đếm thêm 2: cộng thêm 2 đơn vị", "Đếm thêm 5: cộng thêm 5 đơn vị", "Đếm thêm 10: cộng thêm 1 chục"],
        "questions": [
            {
                "type": "tap_place", "id": "m25-q1", "prompt": "Điền số tiếp theo vào dãy số đếm thêm 2: 2, 4, 6, 8, ...", "ill": "/media/images/star.svg",
                "target": ("m25-t1", "...", "2, 4, 6, 8, ", ""), "items": [("m25-i1", "10"), ("m25-i2", "9")], "correct_item": "m25-i1",
                "exp": "8 cộng thêm 2 bằng 10."
            },
            {
                "type": "number_select", "id": "m25-q2", "prompt": "Số tiếp theo trong dãy đếm thêm 5: 5, 10, 15, ? là số nào?", "ill": "/media/images/star.svg",
                "expr": "5, 10, 15, ?", "choices": [18, 19, 20, 25], "ans": 20,
                "exp": "15 cộng thêm 5 bằng 20."
            },
            {
                "type": "matching", "id": "m25-q3", "prompt": "Nối quy luật đếm ở cột trái với dãy số tương ứng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("m25-l1", "Đếm thêm 2", "m25-r1", "2, 4, 6, 8, 10"), ("m25-l2", "Đếm thêm 5", "m25-r2", "5, 10, 15, 20, 25"), ("m25-l3", "Đếm thêm 10", "m25-r3", "10, 20, 30, 40, 50")],
                "exp": "Rất chuẩn xác! Bé đã nhận biết đúng cả 3 quy luật đếm."
            },
            {
                "type": "multiple_choice", "id": "m25-q4", "prompt": "Trong dãy số 10, 20, 30, 40, ... số tiếp theo là số nào?", "ill": "/media/images/ten-rod.svg",
                "options": [("m25-opt-50", "Số 50", True), ("m25-opt-45", "Số 45", False), ("m25-opt-60", "Số 60", False)],
                "correctOptionId": "m25-opt-50",
                "exp": "Dãy số tròn chục đếm thêm 10, sau 40 là 50."
            },
            {
                "type": "counting", "id": "m25-q5", "prompt": "Đếm các quả táo trên màn hình (gồm 3 cặp quả táo):", "ill": "/media/images/apple.svg",
                "count": 6, "img": "/media/images/apple.svg", "exp": "Có tất cả 6 quả táo (2, 4, 6 quả)."
            },
            {
                "type": "tap_place", "id": "m25-q6", "prompt": "Điền số tiếp theo vào dãy số tròn chục: 30, 40, 50, ...", "ill": "/media/images/ten-rod.svg",
                "target": ("m25-t2", "...", "30, 40, 50, ", ""), "items": [("m25-i3", "60"), ("m25-i4", "55")], "correct_item": "m25-i3",
                "exp": "50 cộng thêm 10 bằng 60."
            }
        ]
    },

    # MATH 26: Tìm số còn thiếu trong phép tính
    {
        "id": "math-26-tim-so-con-thieu", "num": 26, "title": "Bài 26: Tìm số còn thiếu",
        "desc": "Tìm số thích hợp điền vào chỗ trống trong các phép tính cộng, trừ có khuyết số.",
        "note": "Hướng dẫn dựa vào bảng cộng trừ và tách gộp để tìm số chưa biết.",
        "intro_title": "Tìm số còn thiếu",
        "intro_body": "Khi phép tính bị khuyết một số: 40 + ? = 47. Ta nhận thấy 47 gồm 40 và 7, vậy số cần tìm chính là 7!",
        "bullets": ["40 + 7 = 47, vậy số còn thiếu là 7", "55 - 5 = 50, vậy số còn thiếu là 5", "Dựa vào cấu tạo chục và đơn vị để tìm nhanh"],
        "questions": [
            {
                "type": "number_select", "id": "m26-q1", "prompt": "Số nào thích hợp điền vào dấu hỏi chấm: 40 + ? = 47", "ill": "/media/images/apple.svg",
                "expr": "40 + ? = 47", "choices": [5, 6, 7, 8], "ans": 7,
                "exp": "40 cộng 7 bằng 47, vậy số cần điền là 7."
            },
            {
                "type": "number_select", "id": "m26-q2", "prompt": "Số nào thích hợp điền vào ô trống: ? + 5 = 55", "ill": "/media/images/star.svg",
                "expr": "? + 5 = 55", "choices": [45, 50, 52, 60], "ans": 50,
                "exp": "50 cộng 5 bằng 55, số cần tìm là 50."
            },
            {
                "type": "tap_place", "id": "m26-q3", "prompt": "Chọn số thích hợp đặt vào chỗ trống: 68 - ... = 60", "ill": "/media/images/apple.svg",
                "target": ("m26-t1", "...", "68 - ", " = 60"), "items": [("m26-i1", "8"), ("m26-i2", "6")], "correct_item": "m26-i1",
                "exp": "68 bớt đi 8 đơn vị thì còn 60."
            },
            {
                "type": "matching", "id": "m26-q4", "prompt": "Nối phép tính khuyết ở cột trái với số cần điền ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("m26-l1", "20 + ? = 25", "m26-r1", "Điền số 5"), ("m26-l2", "34 - ? = 30", "m26-r2", "Điền số 4"), ("m26-l3", "70 + ? = 79", "m26-r3", "Điền số 9")],
                "exp": "20+5=25; 34-4=30; 70+9=79."
            },
            {
                "type": "multiple_choice", "id": "m26-q5", "prompt": "Phép tính nào dưới đây có số thích hợp điền vào ô trống là số 4?", "ill": "/media/images/pencil.svg",
                "options": [("m26-opt-1", "50 + ... = 54", True), ("m26-opt-2", "30 + ... = 35", False), ("m26-opt-3", "70 + ... = 78", False)],
                "correctOptionId": "m26-opt-1",
                "exp": "50 + 4 = 54 nên số cần điền là 4."
            },
            {
                "type": "counting", "id": "m26-q6", "prompt": "Đếm xem có bao nhiêu chú cá đang bơi?", "ill": "/media/images/fish.svg",
                "count": 7, "img": "/media/images/fish.svg", "exp": "Có đúng 7 chú cá trên màn hình."
            }
        ]
    },

    # MATH 27: Tính ba số trong phạm vi 100
    {
        "id": "math-27-tinh-ba-so-100", "num": 27, "title": "Bài 27: Tính ba số trong phạm vi 100",
        "desc": "Thực hiện chuỗi hai phép tính liên tiếp với các số tròn chục và số có hai chữ số trong phạm vi 100.",
        "note": "Rèn tính nhẩm nhanh từng cặp số từ trái qua phải.",
        "intro_title": "Tính ba số đến 100",
        "intro_body": "Khi tính chuỗi ba số: 30 + 20 + 10 = ? Ta lấy 30 + 20 = 50, rồi 50 + 10 = 60. Rất đơn giản và nhanh chóng!",
        "bullets": ["30 + 20 + 10 = 50 + 10 = 60", "70 - 20 + 5 = 50 + 5 = 55", "Luôn thực hiện lần lượt từ trái sang phải"],
        "questions": [
            {
                "type": "number_select", "id": "m27-q1", "prompt": "Tính: 30 + 20 + 10 = ?", "ill": "/media/images/ten-rod.svg",
                "expr": "30 + 20 + 10 = ?", "choices": [50, 60, 70, 80], "ans": 60,
                "exp": "30 + 20 = 50, 50 + 10 = 60."
            },
            {
                "type": "number_select", "id": "m27-q2", "prompt": "Tính: 70 - 20 + 5 = ?", "ill": "/media/images/apple.svg",
                "expr": "70 - 20 + 5 = ?", "choices": [50, 52, 55, 60], "ans": 55,
                "exp": "70 - 20 = 50, 50 + 5 = 55."
            },
            {
                "type": "tap_place", "id": "m27-q3", "prompt": "Điền kết quả vào chỗ chấm: 45 + 3 - 2 = ...", "ill": "/media/images/star.svg",
                "target": ("m27-t1", "...", "45 + 3 - 2 = ", ""), "items": [("m27-i1", "46"), ("m27-i2", "47")], "correct_item": "m27-i1",
                "exp": "45 + 3 = 48, 48 - 2 = 46."
            },
            {
                "type": "matching", "id": "m27-q4", "prompt": "Nối phép tính 3 số với kết quả chính xác:", "ill": "/media/images/star.svg",
                "pairs": [("m27-l1", "10 + 40 + 20", "m27-r1", "Bằng 70"), ("m27-l2", "80 - 30 - 10", "m27-r2", "Bằng 40"), ("m27-l3", "62 + 5 - 2", "m27-r3", "Bằng 65")],
                "exp": "10+40+20=70; 80-30-10=40; 62+5-2=65."
            },
            {
                "type": "multiple_choice", "id": "m27-q5", "prompt": "Kết quả của phép tính 50 + 30 - 40 là bao nhiêu?", "ill": "/media/images/ten-rod.svg",
                "options": [("m27-opt-40", "Bằng 40", True), ("m27-opt-50", "Bằng 50", False), ("m27-opt-60", "Bằng 60", False)],
                "correctOptionId": "m27-opt-40",
                "exp": "50 + 30 = 80, 80 - 40 = 40."
            },
            {
                "type": "counting", "id": "m27-q6", "prompt": "Đếm xem có bao nhiêu ngôi sao may mắn?", "ill": "/media/images/star.svg",
                "count": 5, "img": "/media/images/star.svg", "exp": "Có đúng 5 ngôi sao may mắn."
            }
        ]
    },

    # MATH 28: Bài toán có lời văn: Viết phép tính
    {
        "id": "math-28-giai-toan-loi-van", "num": 28, "title": "Bài 28: Giải toán có lời văn",
        "desc": "Đọc hiểu đề bài toán bằng lời văn, nhận diện từ khóa 'thêm vào' hoặc 'bớt đi' để viết phép tính thích hợp.",
        "note": "Rèn kỹ năng đọc kĩ câu hỏi: 'tất cả' là cộng, 'còn lại' là trừ.",
        "intro_title": "Giải toán có lời văn",
        "intro_body": "Khi giải toán có lời văn: Đọc kĩ đề -> Tìm điều bài toán cho biết -> Xác định bài toán hỏi gì -> Viết phép tính và câu trả lời.",
        "bullets": ["Thêm vào, có tất cả: làm phép cộng (+)", "Bớt đi, bay đi, cho đi: làm phép trừ (-)", "Viết phép tính kèm kết quả chính xác"],
        "questions": [
            {
                "type": "multiple_choice", "id": "m28-q1", "prompt": "Nam có 12 viên bi, Nam mua thêm 3 viên bi nữa. Hỏi Nam có tất cả bao nhiêu viên bi? Phép tính đúng là:", "ill": "/media/images/ball.svg",
                "options": [("m28-opt-1", "12 + 3 = 15", True), ("m28-opt-2", "12 - 3 = 9", False), ("m28-opt-3", "12 + 3 = 16", False)],
                "correctOptionId": "m28-opt-1",
                "exp": "Nam mua thêm nên ta làm phép tính cộng: 12 + 3 = 15 viên bi."
            },
            {
                "type": "number_select", "id": "m28-q2", "prompt": "Trên cành có 18 con chim, 5 con chim bay đi. Hỏi trên cành còn lại bao nhiêu con chim?", "ill": "/media/images/bird.svg",
                "expr": "18 - 5 = ?", "choices": [11, 12, 13, 14], "ans": 13,
                "exp": "5 con bay đi nên ta lấy 18 trừ 5 bằng 13 con chim."
            },
            {
                "type": "tap_place", "id": "m28-q3", "prompt": "Lan có 20 bông hoa, Mai có 10 bông hoa. Cả hai bạn có ... bông hoa.", "ill": "/media/images/flower.svg",
                "target": ("m28-t1", "...", "Cả hai bạn có ", " bông hoa."), "items": [("m28-i1", "30"), ("m28-i2", "25")], "correct_item": "m28-i1",
                "exp": "Cả hai bạn có: 20 + 10 = 30 bông hoa."
            },
            {
                "type": "matching", "id": "m28-q4", "prompt": "Nối bài toán ở cột trái với phép tính tương ứng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("m28-l1", "Có 25 quả cam, bán đi 5 quả", "m28-r1", "25 - 5 = 20"), ("m28-l2", "Lớp có 30 bạn, thêm 4 bạn mới", "m28-r2", "30 + 4 = 34"), ("m28-l3", "Có 48 chiếc kẹo, bớt 8 chiếc", "m28-r3", "48 - 8 = 40")],
                "exp": "Bán đi, bớt đi là trừ; thêm vào là cộng."
            },
            {
                "type": "multiple_choice", "id": "m28-q5", "prompt": "Bài toán hỏi 'Có tất cả bao nhiêu?' thì chúng mình thường dùng phép tính gì?", "ill": "/media/images/apple.svg",
                "options": [("m28-q5-cong", "Phép tính cộng (+)", True), ("m28-q5-tru", "Phép tính trừ (-)", False), ("m28-q5-nhan", "Phép nhân (x)", False)],
                "correctOptionId": "m28-q5-cong",
                "exp": "Gộp lại để tìm tất cả thì làm phép tính cộng."
            },
            {
                "type": "counting", "id": "m28-q6", "prompt": "Đếm xem có bao nhiêu quả táo trong giỏ?", "ill": "/media/images/apple.svg",
                "count": 4, "img": "/media/images/apple.svg", "exp": "Trong giỏ có đúng 4 quả táo."
            }
        ]
    },

    # MATH 29: Buổi sáng, trưa, chiều, tối & Thời gian
    {
        "id": "math-29-thoi-gian-trong-ngay", "num": 29, "title": "Bài 29: Các buổi trong ngày & Thời gian",
        "desc": "Nhận biết các thời điểm sáng, trưa, chiều, tối trong ngày; xem giờ đúng và nhận biết 7 ngày trong tuần.",
        "note": "Liên hệ với thời gian biểu sinh hoạt hàng ngày của học sinh.",
        "intro_title": "Một ngày của em",
        "intro_body": "Một ngày gồm các buổi: Sáng (mặt trời mọc, em đi học), Trưa (ăn cơm, nghỉ ngơi), Chiều (tan học vui chơi), Tối (học bài và đi ngủ).",
        "bullets": ["Buổi sáng: 7 giờ em vào lớp", "Buổi trưa: 11 giờ ăn bán trú", "Buổi tối: 8 giờ em học bài", "Một tuần lễ có 7 ngày"],
        "questions": [
            {
                "type": "multiple_choice", "id": "m29-q1", "prompt": "Em thường đến trường học bài vào buổi nào trong ngày?", "ill": "/media/images/school.svg",
                "options": [("m29-opt-sang", "Buổi sáng", True), ("m29-opt-toi", "Buổi tối", False), ("m29-opt-dem", "Nửa đêm", False)],
                "correctOptionId": "m29-opt-sang",
                "exp": "Học sinh đến trường học bài vào buổi sáng sớm."
            },
            {
                "type": "matching", "id": "m29-q2", "prompt": "Nối thời điểm ở cột trái với hoạt động phù hợp ở cột phải:", "ill": "/media/images/clock.svg",
                "pairs": [("m29-l1", "6 giờ sáng", "m29-r1", "Bé thức dậy tập thể dục"), ("m29-l2", "11 giờ trưa", "m29-r2", "Bé ăn cơm trưa tại trường"), ("m29-l3", "8 giờ tối", "m29-r3", "Bé ngồi học bài ở nhà")],
                "exp": "Sáng thức dậy, trưa ăn cơm, tối học bài rất khoa học."
            },
            {
                "type": "multiple_choice", "id": "m29-q3", "prompt": "Khi đồng hồ chỉ 7 giờ đúng, kim dài luôn chỉ vào số nào?", "ill": "/media/images/clock.svg",
                "options": [("m29-opt-12", "Chỉ số 12", True), ("m29-opt-6", "Chỉ số 6", False), ("m29-opt-1", "Chỉ số 1", False)],
                "correctOptionId": "m29-opt-12",
                "exp": "Khi đồng hồ chỉ giờ đúng, kim dài luôn chỉ thẳng vào số 12."
            },
            {
                "type": "tap_place", "id": "m29-q4", "prompt": "Điền từ thích hợp: Mặt trời mọc vào buổi ..., lặn vào buổi chiều.", "ill": "/media/images/sun.svg",
                "target": ("m29-t1", "...", "Mặt trời mọc vào buổi ", "."), "items": [("m29-i1", "sáng"), ("m29-i2", "tối")], "correct_item": "m29-i1",
                "exp": "Mặt trời mọc ở hướng Đông vào buổi sáng."
            },
            {
                "type": "counting", "id": "m29-q5", "prompt": "Đếm số ngày em đi học từ thứ Hai đến thứ Sáu:", "ill": "/media/images/calendar.svg",
                "count": 5, "img": "/media/images/book.svg", "exp": "Em đi học 5 ngày: thứ Hai, Ba, Tư, Năm, Sáu."
            },
            {
                "type": "number_select", "id": "m29-q6", "prompt": "Một tuần lễ có bao nhiêu ngày?", "ill": "/media/images/calendar.svg",
                "expr": "Một tuần = ? ngày", "choices": [5, 6, 7, 8], "ans": 7,
                "exp": "Một tuần lễ có đúng 7 ngày từ thứ Hai đến Chủ nhật."
            }
        ]
    },

    # MATH 30: Đấu trường Rung chuông vàng Toán Lớp 1
    {
        "id": "math-30-dau-truong-toan-1", "num": 30, "title": "Bài 30: Đấu trường Rung chuông vàng",
        "desc": "Tổng kết và thi đua toàn diện: Số học, Phép tính 2 chữ số, Đo lường và Giải toán có lời văn.",
        "note": "Tổ chức trò chơi thi đua 4 đội hào hứng, bấm giờ cho mỗi câu đố.",
        "intro_title": "Đấu trường Rung chuông vàng",
        "intro_body": "Chào mừng các em đến với Đấu trường Rung chuông vàng Toán Lớp 1! Cùng nhau chinh phục các thử thách toán học hấp dẫn nhất!",
        "bullets": ["Tính nhanh chính xác phép tính 2 chữ số", "Giải toán có lời văn thông minh", "Tự tin chiến thắng và giành cúp vàng"],
        "questions": [
            {
                "type": "multiple_choice", "id": "m30-q1", "prompt": "Số liền trước của số 60 là số nào?", "ill": "/media/images/star.svg",
                "options": [("m30-opt-59", "Số 59", True), ("m30-opt-61", "Số 61", False), ("m30-opt-58", "Số 58", False)],
                "correctOptionId": "m30-opt-59",
                "exp": "Số liền trước của 60 là 59."
            },
            {
                "type": "number_select", "id": "m30-q2", "prompt": "Tính: 35 + 24 = ?", "ill": "/media/images/apple.svg",
                "expr": "35 + 24 = ?", "choices": [57, 58, 59, 60], "ans": 59,
                "exp": "5 cộng 4 bằng 9, 3 cộng 2 bằng 5. Kết quả là 59."
            },
            {
                "type": "number_select", "id": "m30-q3", "prompt": "Tính: 87 - 35 = ?", "ill": "/media/images/pencil.svg",
                "expr": "87 - 35 = ?", "choices": [50, 51, 52, 53], "ans": 52,
                "exp": "7 trừ 5 bằng 2, 8 trừ 3 bằng 5. Kết quả là 52."
            },
            {
                "type": "matching", "id": "m30-q4", "prompt": "Nối phép tính với kết quả chính xác:", "ill": "/media/images/star.svg",
                "pairs": [("m30-l1", "42 + 6", "m30-r1", "Bằng 48"), ("m30-l2", "69 - 7", "m30-r2", "Bằng 62"), ("m30-l3", "50 + 30", "m30-r3", "Bằng 80")],
                "exp": "42+6=48; 69-7=62; 50+30=80."
            },
            {
                "type": "tap_place", "id": "m30-q5", "prompt": "Chọn dấu thích hợp điền vào ô trống: 40 + 30 ... 80", "ill": "/media/images/star.svg",
                "target": ("m30-t1", "...", "40 + 30 ", " 80"), "items": [("m30-i1", "<"), ("m30-i2", ">")], "correct_item": "m30-i1",
                "exp": "40 + 30 = 70, vì 70 bé hơn 80 nên điền dấu <."
            },
            {
                "type": "counting", "id": "m30-q6", "prompt": "Đếm xem có bao nhiêu quả bóng trên màn hình đấu trường?", "ill": "/media/images/ball.svg",
                "count": 9, "img": "/media/images/ball.svg", "exp": "Có đúng 9 quả bóng trên màn hình."
            }
        ]
    }
]

for spec in math_batch4_specs:
    num = spec["num"]
    slides = [
        {
            "type": "title-slide",
            "id": f"m{num}-title-slide",
            "title": spec["title"],
            "subtitle": "Toán Lớp 1 — Bài học tương tác",
            "teacherNote": spec["note"],
            "backgroundImage": "/media/images/star.svg",
            "audio": f"/media/tts/m{num}-title.mp3"
        },
        {
            "type": "content-slide",
            "id": f"m{num}-intro-slide",
            "title": spec["intro_title"],
            "body": spec["intro_body"],
            "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
            "illustration": "/media/images/apple.svg",
            "audio": f"/media/tts/m{num}-intro.mp3",
            "bullets": spec["bullets"]
        }
    ]

    for q_idx, q in enumerate(spec["questions"], start=1):
        qtype = q["type"]
        qid = q["id"]
        if qtype == "multiple_choice":
            q_obj = {
                "type": "multiple_choice",
                "id": f"{qid}-mc",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "options": [
                    {"id": opt_id, "label": opt_lbl, "audio": f"/media/tts/{qid}-opt{idx}.mp3"}
                    for idx, (opt_id, opt_lbl, is_corr) in enumerate(q["options"])
                ],
                "correctOptionId": [opt_id for opt_id, opt_lbl, is_corr in q["options"] if is_corr][0],
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }
        elif qtype == "number_select":
            q_obj = {
                "type": "number_select",
                "id": f"{qid}-num",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "expression": q["expr"],
                "choices": q["choices"],
                "correctAnswer": q["ans"],
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }
        elif qtype == "tap_place":
            q_obj = {
                "type": "tap_place",
                "id": f"{qid}-tap",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "targets": [
                    {"id": q["target"][0], "label": q["target"][1], "prefixText": q["target"][2], "suffixText": q["target"][3]}
                ],
                "items": [
                    {"id": it_id, "label": it_lbl, "audio": f"/media/tts/{qid}-it{idx}.mp3"}
                    for idx, (it_id, it_lbl) in enumerate(q["items"])
                ],
                "correctMapping": {q["correct_item"]: q["target"][0]},
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }
        elif qtype == "matching":
            q_obj = {
                "type": "matching",
                "id": f"{qid}-match",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "leftColumn": [
                    {"id": p[0], "label": p[1], "audio": f"/media/tts/{qid}-l{idx}.mp3"}
                    for idx, p in enumerate(q["pairs"])
                ],
                "rightColumn": [
                    {"id": p[2], "label": p[3], "audio": f"/media/tts/{qid}-r{idx}.mp3", **({"image": p[4]} if len(p) > 4 else {})}
                    for idx, p in enumerate(q["pairs"])
                ],
                "correctPairs": [
                    {"leftId": p[0], "rightId": p[2]} for p in q["pairs"]
                ],
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }
        elif qtype == "counting":
            q_obj = {
                "type": "counting",
                "id": f"{qid}-count",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "items": [
                    {"image": q.get("img", "/media/images/apple.svg"), "alt": f"Item {i+1}"}
                    for i in range(q["count"])
                ],
                "correctCount": q["count"],
                "numberRange": {"min": 1, "max": max(10, q["count"] + 3)},
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }

        slides.append({
            "type": "question-slide",
            "id": f"m{num}-slide-q{q_idx}",
            "teacherNote": f"Câu hỏi {q_idx}: {q['prompt'][:40]}",
            "question": q_obj,
            "timeLimitSeconds": 25 if qtype != "matching" else 30,
            "showRetryOnWrong": True
        })

    lesson = {
        "status": "publish",
        "mode": "publish",
        "id": spec["id"],
        "title": spec["title"],
        "subject": "math",
        "grade": 1,
        "description": spec["desc"],
        "totalDurationMinutes": 25,
        "slides": slides
    }
    math_lessons.append(lesson)

print(f"Total Math lessons in batch 4: {len(math_lessons)} (Lessons 21 to 30)")

m_out = os.path.join(ROOT, "lessons_math_batch4.py")
with open(m_out, "w", encoding="utf-8") as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""Math Lessons 21-30 for Grade 1"""\n\n')
    f.write("true = True\nfalse = False\nnull = None\n\n")
    f.write("MATH_LESSONS_BATCH4 = " + json.dumps(math_lessons, ensure_ascii=False, indent=2) + "\n\n")
    f.write("def get_math_lessons_batch4():\n")
    f.write("    return MATH_LESSONS_BATCH4\n")
print(f"Successfully wrote {m_out}")

# =============================================================================
# VIETNAMESE BATCH 4 DEFINITIONS (VN 21 to 30)
# =============================================================================
vn_batch4_specs = [
    # VN 21: Âm g, gi
    {
        "id": "vn-21-am-g-gi", "num": 21, "title": "Bài 21: Âm g, gi và tiếng ghép",
        "desc": "Làm quen âm đơn g, âm đôi gi và luyện đọc các từ con gà, đồ gỗ, gió mát, giỏ cá qua 6 câu hỏi tương tác.",
        "note": "Hướng dẫn phân biệt cách viết và đọc g đơn và gi.",
        "intro_title": "Làm quen âm G và GI",
        "intro_body": "Hôm nay các em học âm g và gi. Cùng đọc các tiếng: gà, gỗ, gió, giỏ cá nhé!",
        "bullets": ["g — gà (chú gà trống gáy vang)", "g — gỗ (bộ bàn ghế gỗ)", "gi — gió (gió thổi mát rượi)", "gi — giỏ (chiếc giỏ mây đi chợ)"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn21-q1", "prompt": "Tiếng 'gà' bắt đầu bằng âm nào dưới đây?", "ill": "/media/images/bird.svg",
                "options": [("vn21-opt-g", "Âm g", True), ("vn21-opt-gi", "Âm gi", False), ("vn21-opt-c", "Âm c", False)],
                "exp": "Tiếng gà bắt đầu bằng âm g: g - a - ga - huyền - gà."
            },
            {
                "type": "tap_place", "id": "vn21-q2", "prompt": "Điền âm thích hợp để tạo thành từ gió mát:", "ill": "/media/images/leaf.svg",
                "target": ("vn21-t1", "...", "", "ó mát"), "items": [("vn21-i1", "Gi"), ("vn21-i2", "G")], "correct_item": "vn21-i1",
                "exp": "Gió mát bắt đầu bằng âm gi."
            },
            {
                "type": "matching", "id": "vn21-q3", "prompt": "Nối tiếng ở cột trái với từ tương ứng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn21-l1", "con gà", "vn21-r1", "chú gà trống"), ("vn21-l2", "đồ gỗ", "vn21-r2", "bàn ghế gỗ"), ("vn21-l3", "giỏ cá", "vn21-r3", "chiếc giỏ mây")],
                "exp": "Gà trống, bàn ghế gỗ, giỏ mây."
            },
            {
                "type": "multiple_choice", "id": "vn21-q4", "prompt": "Từ nào dưới đây có chứa âm 'gi'?", "ill": "/media/images/tree.svg",
                "options": [("vn21-q4-gio", "cơn gió", True), ("vn21-q4-ga", "con gà", False), ("vn21-q4-go", "khúc gỗ", False)],
                "correctOptionId": "vn21-q4-gio",
                "exp": "Từ cơn gió có tiếng gió bắt đầu bằng âm gi."
            },
            {
                "type": "tap_place", "id": "vn21-q5", "prompt": "Điền âm g hoặc gi vào chỗ trống: Chú ...à trống", "ill": "/media/images/bird.svg",
                "target": ("vn21-t2", "...", "Chú ", "à trống"), "items": [("vn21-i3", "g"), ("vn21-i4", "gi")], "correct_item": "vn21-i3",
                "exp": "Gà viết bằng âm g đơn."
            },
            {
                "type": "matching", "id": "vn21-q6", "prompt": "Nối âm với phần vần để tạo tiếng có nghĩa:", "ill": "/media/images/star.svg",
                "pairs": [("vn21-l2-g", "g", "vn21-r2-a", "à (gà)"), ("vn21-l2-gi", "gi", "vn21-r2-o", "ó (gió)"), ("vn21-l2-go", "g", "vn21-r2-o2", "ỗ (gỗ)")],
                "exp": "g ghép à thành gà; gi ghép ó thành gió; g ghép ỗ thành gỗ."
            }
        ]
    },

    # VN 22: Âm gh, nh
    {
        "id": "vn-22-am-gh-nh", "num": 22, "title": "Bài 22: Âm gh, nh và tiếng ghép",
        "desc": "Làm quen âm gh, nh và luyện đọc các từ ghế gỗ, nhà ga, chùm nho qua 6 câu hỏi tương tác.",
        "note": "Nhắc quy tắc gh chỉ đi với e, ê, i.",
        "intro_title": "Làm quen âm GH và NH",
        "intro_body": "Âm gh ghép với e, ê, i tạo tiếng: ghế, ghen, ghi. Âm nh tạo tiếng: nhà, nho, nhạn. Cùng luyện đọc nhé!",
        "bullets": ["gh — ghế (chiếc ghế tựa)", "nh — nhà (ngôi nhà thân yêu)", "nh — nho (chùm nho tím ngọt)"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn22-q1", "prompt": "Tiếng 'ghế' bắt đầu bằng âm nào?", "ill": "/media/images/chair.svg",
                "options": [("vn22-opt-gh", "Âm gh", True), ("vn22-opt-g", "Âm g", False), ("vn22-opt-nh", "Âm nh", False)],
                "exp": "Vì đứng trước âm ê nên phải viết bằng gh."
            },
            {
                "type": "tap_place", "id": "vn22-q2", "prompt": "Điền âm thích hợp để có từ chùm nho:", "ill": "/media/images/apple.svg",
                "target": ("vn22-t1", "...", "Chùm ", "o"), "items": [("vn22-i1", "nh"), ("vn22-i2", "gh")], "correct_item": "vn22-i1",
                "exp": "Tiếng nho bắt đầu bằng âm nh: nh - o - nho."
            },
            {
                "type": "matching", "id": "vn22-q3", "prompt": "Nối từ ở cột trái với ý tương ứng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn22-l1", "ghế gỗ", "vn22-r1", "chiếc ghế tựa"), ("vn22-l2", "ngôi nhà", "vn22-r2", "mái ấm gia đình"), ("vn22-l3", "chùm nho", "vn22-r3", "quả nho ngọt lịm")],
                "exp": "Ghế tựa, mái ấm gia đình, quả nho ngọt lịm."
            },
            {
                "type": "multiple_choice", "id": "vn22-q4", "prompt": "Âm 'gh' đi được với những chữ cái nào?", "ill": "/media/images/book.svg",
                "options": [("vn22-q4-eei", "e, ê, i", True), ("vn22-q4-ao", "a, o, u", False), ("vn22-q4-ou", "o, ô, ơ", False)],
                "correctOptionId": "vn22-q4-eei",
                "exp": "Quy tắc chính tả: gh luôn đi với ba âm e, ê, i."
            },
            {
                "type": "tap_place", "id": "vn22-q5", "prompt": "Điền từ thích hợp vào chỗ trống: Ngôi ... em ở", "ill": "/media/images/house.svg",
                "target": ("vn22-t2", "...", "Ngôi ", " em ở"), "items": [("vn22-i3", "nhà"), ("vn22-i4", "ghế")], "correct_item": "vn22-i3",
                "exp": "Ngôi nhà em ở."
            },
            {
                "type": "matching", "id": "vn22-q6", "prompt": "Nối từ với hình minh họa thích hợp:", "ill": "/media/images/star.svg",
                "pairs": [("vn22-l2-ghe", "cái ghế", "vn22-r2-ghe", "chiếc ghế ngồi", "/media/images/chair.svg"), ("vn22-l2-nha", "ngôi nhà", "vn22-r2-nha", "ngôi nhà ngói đỏ", "/media/images/house.svg"), ("vn22-l2-cay", "cây xanh", "vn22-r2-cay", "bóng mát sân trường", "/media/images/tree.svg")],
                "exp": "Nối rất chính xác! Cái ghế, ngôi nhà và cây xanh."
            }
        ]
    },

    # VN 23: Âm ng, ngh
    {
        "id": "vn-23-am-ng-ngh", "num": 23, "title": "Bài 23: Âm ng, ngh và tiếng ghép",
        "desc": "Phân biệt quy tắc viết ng và ngh qua các từ bắp ngô, con nghé, nghệ vàng, ngỗng trắng.",
        "note": "Nhắc lại quy tắc ngh ghép với e, ê, i; ng ghép với các âm còn lại.",
        "intro_title": "Quy tắc chính tả NG và NGH",
        "intro_body": "Tương tự g và gh, ngh luôn đi cùng e, ê, i (nghé, nghệ, nghi). Còn ng đi cùng a, o, ô, ơ, u, ư (ngô, ngỗng, ngã).",
        "bullets": ["ngh đi với: e, ê, i (con nghé, củ nghệ)", "ng đi với: a, o, ô, ơ, u, ư (bắp ngô, ngỗng con)", "Phát âm hai âm này giống nhau"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn23-q1", "prompt": "Từ 'con nghé' viết bằng âm 'ng' hay 'ngh'?", "ill": "/media/images/cat.svg",
                "options": [("vn23-opt-ngh", "Âm ngh", True), ("vn23-opt-ng", "Âm ng", False)],
                "correctOptionId": "vn23-opt-ngh",
                "exp": "Vì đứng trước âm é nên phải viết là ngh: con nghé."
            },
            {
                "type": "tap_place", "id": "vn23-q2", "prompt": "Điền 'ng' hoặc 'ngh' vào chỗ trống: Bắp ...ô non", "ill": "/media/images/apple.svg",
                "target": ("vn23-t1", "...", "Bắp ", "ô non"), "items": [("vn23-i1", "ng"), ("vn23-i2", "ngh")], "correct_item": "vn23-i1",
                "exp": "Âm ô đi với ng đơn: bắp ngô."
            },
            {
                "type": "matching", "id": "vn23-q3", "prompt": "Nối từ ở cột trái với cách viết đúng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn23-l1", "củ nghệ", "vn23-r1", "ngh đi với ê"), ("vn23-l2", "ngỗng trắng", "vn23-r2", "ng đi với ô"), ("vn23-l3", "nghỉ ngơi", "vn23-r3", "ngh đi với i")],
                "exp": "Quy tắc: ngh đi với e, ê, i; ng đi với a, o, ô, ơ, u, ư."
            },
            {
                "type": "multiple_choice", "id": "vn23-q4", "prompt": "Từ nào dưới đây viết SAI chính tả?", "ill": "/media/images/book.svg",
                "options": [("vn23-q4-sai", "nghe ngóng (viết ng-e sai)", True), ("vn23-q4-dung1", "con nghé", False), ("vn23-q4-dung2", "bắp ngô", False)],
                "correctOptionId": "vn23-q4-sai",
                "exp": "Đi với e phải viết là 'nghe' (ngh), viết 'nge' là sai."
            },
            {
                "type": "tap_place", "id": "vn23-q5", "prompt": "Điền âm thích hợp để có từ củ nghệ:", "ill": "/media/images/apple.svg",
                "target": ("vn23-t2", "...", "Củ ", "ệ"), "items": [("vn23-i3", "ngh"), ("vn23-i4", "ng")], "correct_item": "vn23-i3",
                "exp": "Củ nghệ có âm ngh đứng trước âm ê."
            },
            {
                "type": "matching", "id": "vn23-q6", "prompt": "Nối tiếng ở hai cột để tạo từ ghép đúng:", "ill": "/media/images/star.svg",
                "pairs": [("vn23-l2-nghi", "nghỉ", "vn23-r2-ngoi", "ngơi"), ("vn23-l2-nghe", "lắng", "vn23-r2-nghe", "nghe"), ("vn23-l2-ngo", "bắp", "vn23-r2-ngo", "ngô")],
                "exp": "Nghỉ ngơi, lắng nghe, bắp ngô."
            }
        ]
    },

    # VN 24: Các vần ia, ua, ưa
    {
        "id": "vn-24-van-ia-ua-ua", "num": 24, "title": "Bài 24: Các vần ia, ua, ưa",
        "desc": "Làm quen với các vần nguyên âm ia, ua, ưa và luyện đọc các từ cây mía, con cua, quả dừa, chú ngựa.",
        "note": "Rèn phát âm lướt từ âm đầu sang âm a.",
        "intro_title": "Các vần IA, UA, ƯA",
        "intro_body": "Các vần ia, ua, ưa xuất hiện trong rất nhiều từ thân quen: cây mía, con cua, quả dừa, chú ngựa. Cùng đọc với cô nhé!",
        "bullets": ["ia — mía (cây mía ngọt lịm)", "ua — cua (con cua tám cẳng hai càng)", "ưa — dừa (quả dừa xiêm mát lành)"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn24-q1", "prompt": "Tiếng 'mía' có chứa vần gì?", "ill": "/media/images/apple.svg",
                "options": [("vn24-opt-ia", "Vần ia", True), ("vn24-opt-ua", "Vần ua", False), ("vn24-opt-uwa", "Vần ưa", False)],
                "correctOptionId": "vn24-opt-ia",
                "exp": "Tiếng mía gồm âm m ghép với vần ia và dấu sắc: m - ia - mia - sắc - mía."
            },
            {
                "type": "tap_place", "id": "vn24-q2", "prompt": "Điền vần thích hợp để có từ con cua:", "ill": "/media/images/fish.svg",
                "target": ("vn24-t1", "...", "Con c", ""), "items": [("vn24-i1", "ua"), ("vn24-i2", "ưa")], "correct_item": "vn24-i1",
                "exp": "Tiếng cua gồm âm c ghép với vần ua: c - ua - cua."
            },
            {
                "type": "matching", "id": "vn24-q3", "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn24-l1", "cây mía", "vn24-r1", "mía ngọt thơm"), ("vn24-l2", "con cua", "vn24-r2", "cua bò ngang"), ("vn24-l3", "quả dừa", "vn24-r3", "nước dừa ngọt mát")],
                "exp": "Mía ngọt thơm, cua bò ngang, nước dừa ngọt mát."
            },
            {
                "type": "multiple_choice", "id": "vn24-q4", "prompt": "Từ nào dưới đây có chứa vần 'ưa'?", "ill": "/media/images/tree.svg",
                "options": [("vn24-q4-dua", "quả dừa", True), ("vn24-q4-mia", "cây mía", False), ("vn24-q4-cua", "con cua", False)],
                "correctOptionId": "vn24-q4-dua",
                "exp": "Tiếng dừa có âm d ghép với vần ưa và dấu huyền."
            },
            {
                "type": "tap_place", "id": "vn24-q5", "prompt": "Điền vần thích hợp vào từ chú ngựa:", "ill": "/media/images/star.svg",
                "target": ("vn24-t2", "...", "Chú ng", ""), "items": [("vn24-i3", "ựa"), ("vn24-i4", "ụa")], "correct_item": "vn24-i3",
                "exp": "Tiếng ngựa có vần ưa: ng - ưa - ngưa - nặng - ngựa."
            },
            {
                "type": "matching", "id": "vn24-q6", "prompt": "Nối từ với hình ảnh minh họa thích hợp:", "ill": "/media/images/star.svg",
                "pairs": [("vn24-l2-rua", "con rùa", "vn24-r2-rua", "chú rùa chậm chạp", "/media/images/turtle.svg"), ("vn24-l2-cay", "cây dừa", "vn24-r2-cay", "cây dừa trĩu quả", "/media/images/tree.svg"), ("vn24-l2-thuyen", "con thuyền", "vn24-r2-thuyen", "thuyền trôi trên sông", "/media/images/boat.svg")],
                "exp": "Con rùa có vần ua, cây dừa có vần ưa."
            }
        ]
    },

    # VN 25: Các vần oi, ai, ơi, ôi, ui, ưi
    {
        "id": "vn-25-van-oi-ai-oi-ui", "num": 25, "title": "Bài 25: Các vần kết thúc bằng i",
        "desc": "Học các vần oi, ai, ơi, ôi, ui, ưi và luyện đọc quả ổi, cái túi, gửi quà, quả bưởi, ngày hội.",
        "note": "Rèn phát âm âm cuối i kéo nhẹ khóe môi sang hai bên.",
        "intro_title": "Các vần có âm cuối I",
        "intro_body": "Các vần oi, ai, ơi, ôi, ui, ưi kết thúc bằng âm i. Cùng đọc các từ: quả ổi, cái túi, gửi thư, bơi lội nhé!",
        "bullets": ["oi — ổi (quả ổi giòn ngọt)", "ai — hai (số hai)", "ui — túi (chiếc túi xinh)", "ơi — bơi (bé tập bơi lội)"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn25-q1", "prompt": "Tiếng 'ổi' trong 'quả ổi' có vần gì?", "ill": "/media/images/apple.svg",
                "options": [("vn25-opt-oi", "Vần oi", True), ("vn25-opt-ai", "Vần ai", False), ("vn25-opt-ui", "Vần ui", False)],
                "correctOptionId": "vn25-opt-oi",
                "exp": "Tiếng ổi có vần oi: o - i - oi - hỏi - ổi."
            },
            {
                "type": "tap_place", "id": "vn25-q2", "prompt": "Điền vần thích hợp để có từ cái túi:", "ill": "/media/images/book.svg",
                "target": ("vn25-t1", "...", "Cái t", ""), "items": [("vn25-i1", "úi"), ("vn25-i2", "ái")], "correct_item": "vn25-i1",
                "exp": "Tiếng túi có âm t ghép với vần ui và dấu sắc."
            },
            {
                "type": "matching", "id": "vn25-q3", "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn25-l1", "bơi lội", "vn25-r1", "bé tập bơi dưới nước"), ("vn25-l2", "gửi thư", "vn25-r2", "gửi thư cho bà"), ("vn25-l3", "ngày hội", "vn25-r3", "ngày hội trường em")],
                "exp": "Bơi lội dưới nước, gửi thư cho bà, ngày hội trường em."
            },
            {
                "type": "multiple_choice", "id": "vn25-q4", "prompt": "Từ nào có chứa vần 'ai'?", "ill": "/media/images/star.svg",
                "options": [("vn25-q4-hoa", "hoa mai", True), ("vn25-q4-tui", "cái túi", False), ("vn25-q4-boi", "bơi lội", False)],
                "correctOptionId": "vn25-q4-hoa",
                "exp": "Hoa mai có tiếng mai mang vần ai."
            },
            {
                "type": "tap_place", "id": "vn25-q5", "prompt": "Điền vần thích hợp vào từ gửi thư:", "ill": "/media/images/book.svg",
                "target": ("vn25-t2", "...", "G", " thư"), "items": [("vn25-i3", "ửi"), ("vn25-i4", "ỏi")], "correct_item": "vn25-i3",
                "exp": "Tiếng gửi có vần ưi: g - ưi - gưi - hỏi - gửi."
            },
            {
                "type": "matching", "id": "vn25-q6", "prompt": "Nối vần ở cột trái với từ chứa vần đó ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn25-l2-oi", "vần ơi", "vn25-r2-oi", "bơi lội"), ("vn25-l2-ui", "vần ui", "vn25-r2-ui", "túi xách"), ("vn25-l2-ai", "vần ai", "vn25-r2-ai", "hoa mai")],
                "exp": "Bơi lội có vần ơi, túi xách có vần ui, hoa mai có vần ai."
            }
        ]
    },

    # VN 26: Các vần ao, eo, au, âu
    {
        "id": "vn-26-van-ao-eo-au-au", "num": 26, "title": "Bài 26: Các vần kết thúc bằng o, u",
        "desc": "Học các vần ao, eo, au, âu và luyện đọc ngôi sao, chú mèo, cây cau, quả dâu tây.",
        "note": "Rèn tròn môi khi phát âm các vần có âm cuối là o hoặc u.",
        "intro_title": "Các vần AO, EO, AU, ÂU",
        "intro_body": "Các vần ao, eo, au, âu giúp chúng mình đọc được nhiều từ đẹp: ngôi sao, chú mèo con, cây cau, con bồ câu.",
        "bullets": ["ao — sao (ngôi sao năm cánh)", "eo — mèo (chú mèo mướp)", "au — cau (cây cau cao vút)", "âu — câu (con chim bồ câu)"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn26-q1", "prompt": "Tiếng 'sao' trong 'ngôi sao' có vần gì?", "ill": "/media/images/star.svg",
                "options": [("vn26-opt-ao", "Vần ao", True), ("vn26-opt-eo", "Vần eo", False), ("vn26-opt-au", "Vần au", False)],
                "correctOptionId": "vn26-opt-ao",
                "exp": "Tiếng sao có âm s ghép với vần ao: s - ao - sao."
            },
            {
                "type": "tap_place", "id": "vn26-q2", "prompt": "Điền vần thích hợp để có từ chú mèo:", "ill": "/media/images/cat.svg",
                "target": ("vn26-t1", "...", "Chú m", ""), "items": [("vn26-i1", "èo"), ("vn26-i2", "ào")], "correct_item": "vn26-i1",
                "exp": "Tiếng mèo có âm m ghép với vần eo và dấu huyền."
            },
            {
                "type": "matching", "id": "vn26-q3", "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn26-l1", "ngôi sao", "vn26-r1", "ngôi sao lấp lánh"), ("vn26-l2", "chú mèo", "vn26-r2", "mèo con bắt chuột"), ("vn26-l3", "bồ câu", "vn26-r3", "chim bồ câu trắng")],
                "exp": "Ngôi sao lấp lánh, mèo con bắt chuột, chim bồ câu trắng."
            },
            {
                "type": "multiple_choice", "id": "vn26-q4", "prompt": "Từ nào dưới đây có chứa vần 'âu'?", "ill": "/media/images/bird.svg",
                "options": [("vn26-q4-bocau", "chim bồ câu", True), ("vn26-q4-ngoisao", "ngôi sao", False), ("vn26-q4-chumeo", "chú mèo", False)],
                "correctOptionId": "vn26-q4-bocau",
                "exp": "Tiếng câu trong bồ câu có chứa vần âu: c - âu - câu."
            },
            {
                "type": "tap_place", "id": "vn26-q5", "prompt": "Điền vần thích hợp vào từ cây cau:", "ill": "/media/images/tree.svg",
                "target": ("vn26-t2", "...", "Cây c", ""), "items": [("vn26-i3", "au"), ("vn26-i4", "âu")], "correct_item": "vn26-i3",
                "exp": "Tiếng cau có vần au: c - au - cau."
            },
            {
                "type": "matching", "id": "vn26-q6", "prompt": "Nối từ với hình minh họa thích hợp:", "ill": "/media/images/star.svg",
                "pairs": [("vn26-l2-sao", "ngôi sao", "vn26-r2-sao", "ngôi sao vàng", "/media/images/star.svg"), ("vn26-l2-meo", "con mèo", "vn26-r2-meo", "chú mèo con", "/media/images/cat.svg"), ("vn26-l2-chim", "con chim", "vn26-r2-chim", "chú chim sẻ", "/media/images/bird.svg")],
                "exp": "Ngôi sao vàng, chú mèo con, chú chim sẻ."
            }
        ]
    },

    # VN 27: Các vần iu, ưu
    {
        "id": "vn-27-van-iu-uu", "num": 27, "title": "Bài 27: Các vần iu, ưu",
        "desc": "Làm quen với vần iu và ưu, luyện đọc các từ chim hót líu lo, chú cừu non, quả lựu đỏ qua 6 câu hỏi tương tác.",
        "note": "Rèn khẩu hình chuyển từ i/ư sang u tròn môi.",
        "intro_title": "Các vần IU và ƯU",
        "intro_body": "Vần iu và ưu xuất hiện trong những tiếng rất vui tai: chim hót líu lo, chú cừu non, quả lựu chín đỏ.",
        "bullets": ["iu — líu lo (chim hót líu lo)", "ưu — cừu (chú cừu lông trắng)", "ưu — lựu (quả lựu đỏ au)"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn27-q1", "prompt": "Tiếng 'líu' trong 'líu lo' có chứa vần gì?", "ill": "/media/images/bird.svg",
                "options": [("vn27-opt-iu", "Vần iu", True), ("vn27-opt-uu", "Vần ưu", False), ("vn27-opt-ui", "Vần ui", False)],
                "correctOptionId": "vn27-opt-iu",
                "exp": "Tiếng líu gồm âm l ghép với vần iu và dấu sắc: l - iu - liu - sắc - líu."
            },
            {
                "type": "tap_place", "id": "vn27-q2", "prompt": "Điền vần thích hợp để có từ chú cừu:", "ill": "/media/images/rabbit.svg",
                "target": ("vn27-t1", "...", "Chú c", ""), "items": [("vn27-i1", "ừu"), ("vn27-i2", "ìu")], "correct_item": "vn27-i1",
                "exp": "Tiếng cừu có vần ưu: c - ưu - cưu - huyền - cừu."
            },
            {
                "type": "matching", "id": "vn27-q3", "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn27-l1", "chim hót", "vn27-r1", "líu lo trên cành"), ("vn27-l2", "chú cừu", "vn27-r2", "bộ lông trắng tinh"), ("vn27-l3", "quả lựu", "vn27-r3", "hạt lựu đỏ tươi")],
                "exp": "Chim hót líu lo, chú cừu lông trắng, quả lựu hạt đỏ."
            },
            {
                "type": "multiple_choice", "id": "vn27-q4", "prompt": "Từ nào dưới đây có chứa vần 'ưu'?", "ill": "/media/images/apple.svg",
                "options": [("vn27-q4-luu", "quả lựu", True), ("vn27-q4-liu", "líu lo", False), ("vn27-q4-chum", "chùm nho", False)],
                "correctOptionId": "vn27-q4-luu",
                "exp": "Tiếng lựu có âm l ghép với vần ưu và dấu nặng."
            },
            {
                "type": "tap_place", "id": "vn27-q5", "prompt": "Điền vần thích hợp vào từ quả lựu:", "ill": "/media/images/apple.svg",
                "target": ("vn27-t2", "...", "Quả l", ""), "items": [("vn27-i3", "ựu"), ("vn27-i4", "ịu")], "correct_item": "vn27-i3",
                "exp": "Tiếng lựu mang vần ưu."
            },
            {
                "type": "matching", "id": "vn27-q6", "prompt": "Nối vần ở cột trái với từ chứa vần đó ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn27-l2-iu", "vần iu", "vn27-r2-iu", "líu lo"), ("vn27-l2-uu1", "vần ưu", "vn27-r2-uu1", "chú cừu"), ("vn27-l2-uu2", "vần ưu", "vn27-r2-uu2", "quả lựu")],
                "exp": "Bé nối rất chính xác! Líu lo có vần iu, chú cừu và quả lựu có vần ưu."
            }
        ]
    },

    # VN 28: Đọc hiểu: Vâng lời cha mẹ & Kính yêu ông bà
    {
        "id": "vn-28-doc-hieu-ong-ba-cha-me", "num": 28, "title": "Bài 28: Đọc hiểu: Kính yêu ông bà, cha mẹ",
        "desc": "Luyện đọc đoạn văn ngắn về tình cảm gia đình, trả lời câu hỏi và bồi dưỡng lòng hiếu thảo.",
        "note": "Rèn đọc diễn cảm, ngắt nghỉ đúng dấu câu.",
        "intro_title": "Gia đình mến thương",
        "intro_body": "Đoạn văn: 'Bé Lan rất yêu bà. Mỗi khi đi học về, Lan lễ phép chào bà, rồi rót nước mời bà uống. Bà âu yếm xoa đầu khen Lan ngoan.'",
        "bullets": ["Lan lễ phép chào bà khi đi học về", "Lan rót nước mời bà uống", "Bà khen Lan là cô bé hiếu thảo"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn28-q1", "prompt": "Khi đi học về, bạn Lan đã làm gì đầu tiên?", "ill": "/media/images/house.svg",
                "options": [("vn28-opt-chao", "Lễ phép chào bà", True), ("vn28-opt-xemti", "Bật ti vi xem hoạt hình", False), ("vn28-opt-di-choi", "Chạy đi chơi ngay", False)],
                "correctOptionId": "vn28-opt-chao",
                "exp": "Lan là bé ngoan, vừa về nhà đã lễ phép chào bà."
            },
            {
                "type": "tap_place", "id": "vn28-q2", "prompt": "Điền từ thích hợp: Lan rót ... mời bà uống.", "ill": "/media/images/milk.svg",
                "target": ("vn28-t1", "...", "Lan rót ", " mời bà uống."), "items": [("vn28-i1", "nước"), ("vn28-i2", "sữa")], "correct_item": "vn28-i1",
                "exp": "Lan rót nước mời bà uống mát lòng."
            },
            {
                "type": "matching", "id": "vn28-q3", "prompt": "Nối hành động ở cột trái với ý nghĩa tốt đẹp ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn28-l1", "Chào hỏi lễ phép", "vn28-r1", "kính trọng người lớn"), ("vn28-l2", "Giúp mẹ quét nhà", "vn28-r2", "chăm chỉ, đỡ đần cha mẹ"), ("vn28-l3", "Vâng lời thầy cô", "vn28-r3", "học sinh chăm ngoan")],
                "exp": "Chào hỏi lễ phép, giúp mẹ quét nhà, vâng lời thầy cô."
            },
            {
                "type": "multiple_choice", "id": "vn28-q4", "prompt": "Thấy Lan ngoan ngoãn, bà đã làm gì?", "ill": "/media/images/house.svg",
                "options": [("vn28-q4-xoadau", "Âu yếm xoa đầu khen Lan", True), ("vn28-q4-trach", "Trách phạt Lan", False), ("vn28-q4-khong", "Không nói gì cả", False)],
                "correctOptionId": "vn28-q4-xoadau",
                "exp": "Bà rất vui và âu yếm xoa đầu khen Lan ngoan."
            },
            {
                "type": "tap_place", "id": "vn28-q5", "prompt": "Điền từ thích hợp vào câu ca dao: 'Công cha như núi Thái Sơn, ... mẹ như nước trong nguồn chảy ra.'", "ill": "/media/images/star.svg",
                "target": ("vn28-t2", "...", "", " mẹ như nước trong nguồn."), "items": [("vn28-i3", "Nghĩa"), ("vn28-i4", "Tình")], "correct_item": "vn28-i3",
                "exp": "Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra."
            },
            {
                "type": "matching", "id": "vn28-q6", "prompt": "Nối từ ở cột trái với từ ở cột phải tạo từ chỉ tình cảm:", "ill": "/media/images/star.svg",
                "pairs": [("vn28-l2-yeu", "yêu", "vn28-r2-quy", "quý"), ("vn28-l2-hieu", "hiếu", "vn28-r2-thao", "thảo"), ("vn28-l2-biet", "biết", "vn28-r2-on", "ơn")],
                "exp": "Yêu quý, hiếu thảo, biết ơn."
            }
        ]
    },

    # VN 29: Đọc hiểu: Giữ gìn trường lớp xanh sạch & Tình bạn thân thiết
    {
        "id": "vn-29-doc-hieu-truong-lop-ban-be", "num": 29, "title": "Bài 29: Đọc hiểu: Trường lớp xanh sạch",
        "desc": "Đọc hiểu đoạn văn về giờ ra chơi, giữ gìn vệ sinh lớp học và tình bạn đoàn kết, giúp đỡ nhau.",
        "note": "Rèn ý thức bảo vệ môi trường học đường và tinh thần đoàn kết.",
        "intro_title": "Mái trường mến yêu",
        "intro_body": "Đoạn văn: 'Giờ ra chơi, sân trường rộn rã tiếng cười. Các bạn cùng nhau tưới hoa và nhặt rác bỏ vào thùng. Lớp học luôn sạch đẹp, ngăn nắp.'",
        "bullets": ["Sân trường vui tươi trong giờ ra chơi", "Cùng nhau tưới hoa và giữ vệ sinh", "Trường học thân thiện, học sinh tích cực"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn29-q1", "prompt": "Trong giờ ra chơi, các bạn học sinh đã cùng nhau làm gì?", "ill": "/media/images/school.svg",
                "options": [("vn29-opt-tuoihoa", "Tưới hoa và nhặt rác", True), ("vn29-opt-vutrac", "Vứt rác bừa bãi", False), ("vn29-opt-behoa", "Bẻ cành hái hoa", False)],
                "correctOptionId": "vn29-opt-tuoihoa",
                "exp": "Các bạn cùng nhau tưới hoa và nhặt rác bỏ vào thùng."
            },
            {
                "type": "tap_place", "id": "vn29-q2", "prompt": "Điền từ thích hợp: Giữ gìn trường lớp xanh, sạch, ...", "ill": "/media/images/school.svg",
                "target": ("vn29-t1", "...", "Giữ gìn trường lớp xanh, sạch, ", "."), "items": [("vn29-i1", "đẹp"), ("vn29-i2", "xấu")], "correct_item": "vn29-i1",
                "exp": "Khẩu hiệu trường học thân thiện: Xanh - Sạch - Đẹp."
            },
            {
                "type": "matching", "id": "vn29-q3", "prompt": "Nối hành động ở cột trái với kết quả tích cực ở cột phải:", "ill": "/media/images/star.svg",
                "pairs": [("vn29-l1", "Tưới nước cho cây", "vn29-r1", "cây xanh tươi tốt"), ("vn29-l2", "Bỏ rác vào thùng", "vn29-r2", "sân trường sạch sẽ"), ("vn29-l3", "Kê bàn ghế ngay ngắn", "vn29-r3", "lớp học gọn gàng")],
                "exp": "Cây tươi tốt, sân trường sạch sẽ, lớp học gọn gàng."
            },
            {
                "type": "multiple_choice", "id": "vn29-q4", "prompt": "Khi thấy bạn làm rơi hộp bút, em nên làm gì?", "ill": "/media/images/pencil.svg",
                "options": [("vn29-q4-giup", "Nhặt lên giúp bạn", True), ("vn29-q4-che", "Cười chê bạn", False), ("vn29-q4-lo", "Bỏ đi không quan tâm", False)],
                "correctOptionId": "vn29-q4-giup",
                "exp": "Bạn bè tốt luôn sẵn lòng giúp đỡ lẫn nhau."
            },
            {
                "type": "tap_place", "id": "vn29-q5", "prompt": "Điền từ thích hợp: Mỗi ngày đến trường là một ngày ...", "ill": "/media/images/star.svg",
                "target": ("vn29-t2", "...", "Mỗi ngày đến trường là một ngày ", "."), "items": [("vn29-i3", "vui"), ("vn29-i4", "buồn")], "correct_item": "vn29-i3",
                "exp": "Mỗi ngày đến trường là một ngày vui."
            },
            {
                "type": "matching", "id": "vn29-q6", "prompt": "Nối từ ở cột trái với từ ở cột phải tạo từ ghép về trường học:", "ill": "/media/images/star.svg",
                "pairs": [("vn29-l2-truong", "trường", "vn29-r2-lop", "lớp"), ("vn29-l2-ban", "bạn", "vn29-r2-be", "bè"), ("vn29-l2-thay", "thầy", "vn29-r2-co", "cô")],
                "exp": "Trường lớp, bạn bè, thầy cô."
            }
        ]
    },

    # VN 30: Đấu trường Trạng nguyên Tiếng Việt Lớp 1
    {
        "id": "vn-30-dau-truong-trang-nguyen-vn", "num": 30, "title": "Bài 30: Đấu trường Trạng nguyên Tiếng Việt",
        "desc": "Tổng kết năm học: Đố vui ghép vần nhanh, kiểm tra chính tả, đọc hiểu và vinh danh Trạng nguyên Lớp 1.",
        "note": "Tổ chức trò chơi thi đua sôi nổi, trao huy hiệu khen thưởng.",
        "intro_title": "Đấu trường Trạng nguyên Nhí",
        "intro_body": "Chào mừng các sĩ tử nhí đến với Đấu trường Trạng nguyên Tiếng Việt Lớp 1! Cùng nhau chinh phục các câu đố vần và chính tả để giành vòng nguyệt quế nhé!",
        "bullets": ["Đọc thông viết thạo âm vần tiếng Việt", "Hiểu đúng nghĩa câu văn và đoạn văn", "Giành danh hiệu Trạng nguyên Lớp 1"],
        "questions": [
            {
                "type": "multiple_choice", "id": "vn30-q1", "prompt": "Từ nào dưới đây viết ĐÚNG chính tả?", "ill": "/media/images/star.svg",
                "options": [("vn30-opt-dung", "nón lá", True), ("vn30-opt-sai1", "lón lá", False), ("vn30-opt-sai2", "nón ná", False)],
                "correctOptionId": "vn30-opt-dung",
                "exp": "Nón lá viết đúng: nón bắt đầu bằng n, lá bắt đầu bằng l."
            },
            {
                "type": "tap_place", "id": "vn30-q2", "prompt": "Sắp xếp từ để tạo câu hoàn chỉnh: Em yêu trường em.", "ill": "/media/images/school.svg",
                "target": ("vn30-t1", "...", "Em yêu ", "."), "items": [("vn30-i1", "trường em"), ("vn30-i2", "lớp em")], "correct_item": "vn30-i1",
                "exp": "Câu hoàn chỉnh: Em yêu trường em."
            },
            {
                "type": "matching", "id": "vn30-q3", "prompt": "Nối hai vế để tạo thành câu tục ngữ, ca dao đúng:", "ill": "/media/images/star.svg",
                "pairs": [("vn30-l1", "Ăn quả", "vn30-r1", "nhớ kẻ trồng cây"), ("vn30-l2", "Uống nước", "vn30-r2", "nhớ nguồn"), ("vn30-l3", "Học thầy", "vn30-r3", "không tày học bạn")],
                "exp": "Ăn quả nhớ kẻ trồng cây, uống nước nhớ nguồn, học thầy không tày học bạn."
            },
            {
                "type": "multiple_choice", "id": "vn30-q4", "prompt": "Đoạn thơ: 'Trường em ngói mới đỏ hồng / Mọc lên tươi thắm giữa đồng lúa xanh.' Đoạn thơ miêu tả trường em ở đâu?", "ill": "/media/images/school.svg",
                "options": [("vn30-q4-donglua", "Giữa cánh đồng lúa xanh", True), ("vn30-q4-trenbien", "Ở trên mặt biển", False), ("vn30-q4-trongrung", "Ở sâu trong hang đá", False)],
                "correctOptionId": "vn30-q4-donglua",
                "exp": "Trường mọc lên tươi thắm giữa cánh đồng lúa xanh ngát."
            },
            {
                "type": "tap_place", "id": "vn30-q5", "prompt": "Điền từ thích hợp: Chúc mừng các em tự tin bước vào lớp ...", "ill": "/media/images/star.svg",
                "target": ("vn30-t2", "...", "Tự tin bước vào lớp ", "!"), "items": [("vn30-i3", "hai"), ("vn30-i4", "ba")], "correct_item": "vn30-i3",
                "exp": "Hoàn thành Lớp 1, các em vững bước lên Lớp 2!"
            },
            {
                "type": "matching", "id": "vn30-q6", "prompt": "Nối các danh hiệu với phẩm chất tương ứng:", "ill": "/media/images/star.svg",
                "pairs": [("vn30-l2-trang", "Trạng nguyên", "vn30-r2-trang", "thông minh xuất sắc"), ("vn30-l2-hoa", "Bông hoa điểm 10", "vn30-r2-hoa", "chăm chỉ học giỏi"), ("vn30-l2-sao", "Ngôi sao chăm ngoan", "vn30-r2-sao", "lễ phép vâng lời")],
                "exp": "Chúc mừng tất cả các em đều là những ngôi sao chăm ngoan, học giỏi!"
            }
        ]
    }
]

# Write out full lessons_vn_batch4.py
vn_lessons = []
for spec in vn_batch4_specs:
    num = spec["num"]
    slides = [
        {
            "type": "title-slide",
            "id": f"vn{num}-title-slide",
            "title": spec["title"],
            "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
            "teacherNote": spec["note"],
            "backgroundImage": "/media/images/star.svg",
            "audio": f"/media/tts/vn{num}-title.mp3"
        },
        {
            "type": "content-slide",
            "id": f"vn{num}-intro-slide",
            "title": spec["intro_title"],
            "body": spec["intro_body"],
            "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
            "illustration": "/media/images/book.svg",
            "audio": f"/media/tts/vn{num}-intro.mp3",
            "bullets": spec["bullets"]
        }
    ]

    for q_idx, q in enumerate(spec["questions"], start=1):
        qtype = q["type"]
        qid = q["id"]
        if qtype == "multiple_choice":
            q_obj = {
                "type": "multiple_choice",
                "id": f"{qid}-mc",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "options": [
                    {"id": opt_id, "label": opt_lbl, "audio": f"/media/tts/{qid}-opt{idx}.mp3"}
                    for idx, (opt_id, opt_lbl, is_corr) in enumerate(q["options"])
                ],
                "correctOptionId": [opt_id for opt_id, opt_lbl, is_corr in q["options"] if is_corr][0],
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }
        elif qtype == "tap_place":
            q_obj = {
                "type": "tap_place",
                "id": f"{qid}-tap",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "targets": [
                    {"id": q["target"][0], "label": q["target"][1], "prefixText": q["target"][2], "suffixText": q["target"][3]}
                ],
                "items": [
                    {"id": it_id, "label": it_lbl, "audio": f"/media/tts/{qid}-it{idx}.mp3"}
                    for idx, (it_id, it_lbl) in enumerate(q["items"])
                ],
                "correctMapping": {q["correct_item"]: q["target"][0]},
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }
        elif qtype == "matching":
            q_obj = {
                "type": "matching",
                "id": f"{qid}-match",
                "prompt": q["prompt"],
                "promptAudio": f"/media/tts/{qid}-prompt.mp3",
                "illustration": q["ill"],
                "leftColumn": [
                    {"id": p[0], "label": p[1], "audio": f"/media/tts/{qid}-l{idx}.mp3"}
                    for idx, p in enumerate(q["pairs"])
                ],
                "rightColumn": [
                    {"id": p[2], "label": p[3], "audio": f"/media/tts/{qid}-r{idx}.mp3", **({"image": p[4]} if len(p) > 4 else {})}
                    for idx, p in enumerate(q["pairs"])
                ],
                "correctPairs": [
                    {"leftId": p[0], "rightId": p[2]} for p in q["pairs"]
                ],
                "explanation": q["exp"],
                "explanationAudio": f"/media/tts/{qid}-exp.mp3"
            }

        slides.append({
            "type": "question-slide",
            "id": f"vn{num}-slide-q{q_idx}",
            "teacherNote": f"Câu hỏi {q_idx}: {q['prompt'][:40]}",
            "question": q_obj,
            "timeLimitSeconds": 25 if qtype != "matching" else 30,
            "showRetryOnWrong": True
        })

    lesson = {
        "status": "publish",
        "mode": "publish",
        "id": spec["id"],
        "title": spec["title"],
        "subject": "vietnamese",
        "grade": 1,
        "description": spec["desc"],
        "totalDurationMinutes": 25,
        "slides": slides
    }
    vn_lessons.append(lesson)

print(f"Total VN lessons in batch 4: {len(vn_lessons)} (Lessons 21 to 30)")

v_out = os.path.join(ROOT, "lessons_vn_batch4.py")
with open(v_out, "w", encoding="utf-8") as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""Vietnamese Lessons 21-30 for Grade 1"""\n\n')
    f.write("true = True\nfalse = False\nnull = None\n\n")
    f.write("VN_LESSONS_BATCH4 = " + json.dumps(vn_lessons, ensure_ascii=False, indent=2) + "\n\n")
    f.write("def get_vn_lessons_batch4():\n")
    f.write("    return VN_LESSONS_BATCH4\n")
print(f"Successfully wrote {v_out}")
