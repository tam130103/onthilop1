# -*- coding: utf-8 -*-
"""
Specifications for Math Lessons 31 to 48 (18 lessons completing the 48-lesson Math curriculum).
"""

def get_math_batch5_specs():
    specs = [
        # 31. Khối lập phương và Khối hộp chữ nhật
        {
            "num": 31, "id": "math-31-khoi-lap-phuong-hop", "title": "Bài 31: Khối lập phương & Khối hộp chữ nhật",
            "desc": "Nhận diện khối lập phương (viên xúc xắc, hộp quà vuông) và khối hộp chữ nhật (hộp sữa, hộp bánh).",
            "note": "Cho học sinh quan sát đồ vật thật và chỉ ra các mặt phẳng của khối hình.",
            "intro_title": "Khối lập phương và Khối hộp chữ nhật",
            "intro_body": "Viên xúc xắc có dạng khối lập phương. Hộp sữa, viên gạch có dạng khối hộp chữ nhật. Chúng mình cùng tìm thêm các đồ vật xung quanh nhé!",
            "bullets": ["Khối lập phương: 6 mặt hình vuông bằng nhau", "Khối hộp chữ nhật: các mặt là hình chữ nhật", "Ví dụ: hộp quà vuông, hộp sữa tươi"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m31-q1", "prompt": "Viên xúc xắc đồ chơi có dạng khối hình gì?", "ill": "/media/images/star.svg",
                    "options": [("m31-opt-lp", "Khối lập phương", True), ("m31-opt-hcn", "Khối hộp chữ nhật", False), ("m31-opt-tron", "Khối hình cầu", False)],
                    "exp": "Viên xúc xắc có các mặt vuông bằng nhau nên có dạng khối lập phương."
                },
                {
                    "type": "multiple_choice", "id": "m31-q2", "prompt": "Hộp sữa tươi cô giáo hay uống có dạng khối gì?", "ill": "/media/images/milk.svg",
                    "options": [("m31-opt2-hcn", "Khối hộp chữ nhật", True), ("m31-opt2-lp", "Khối lập phương", False), ("m31-opt2-tam", "Hình tam giác", False)],
                    "exp": "Hộp sữa tươi có dạng khối hộp chữ nhật."
                },
                {
                    "type": "matching", "id": "m31-q3", "prompt": "Nối đồ vật với tên khối hình tương ứng:", "ill": "/media/images/house.svg",
                    "pairs": [
                        ("m31-l1", "Hộp quà vuông", "m31-r1", "Dạng khối lập phương"),
                        ("m31-l2", "Hộp bánh quy chữ nhật", "m31-r2", "Dạng khối hộp chữ nhật"),
                        ("m31-l3", "Viên gạch xây nhà", "m31-r3", "Khối hộp chữ nhật")
                    ],
                    "exp": "Hộp quà vuông là khối lập phương; hộp bánh và viên gạch là khối hộp chữ nhật."
                },
                {
                    "type": "tap_place", "id": "m31-q4", "prompt": "Điền từ thích hợp: 'Khối ... có 6 mặt hình vuông bằng nhau.'", "ill": "/media/images/star.svg",
                    "target": ("m31-t1", "...", "Khối ", " có 6 mặt vuông."),
                    "items": [("m31-i1", "lập phương"), ("m31-i2", "hộp chữ nhật")], "correct_item": "m31-i1",
                    "exp": "Khối lập phương có các mặt là hình vuông bằng nhau."
                },
                {
                    "type": "counting", "id": "m31-q5", "prompt": "Đếm xem có bao nhiêu khối lập phương trên hình?", "ill": "/media/images/star.svg",
                    "count": 4, "img": "/media/images/star.svg", "exp": "Có đúng 4 khối hình lập phương."
                },
                {
                    "type": "number_select", "id": "m31-q6", "prompt": "Bé Nam xếp 3 khối hộp chữ nhật và 2 khối lập phương. Hỏi bé có tất cả mấy khối?", "ill": "/media/images/star.svg",
                    "expr": "3 + 2 = ?", "choices": [4, 5, 6, 7], "ans": 5,
                    "exp": "3 cộng 2 bằng 5 khối hình tất cả."
                }
            ]
        },

        # 32. Vị trí không gian: Trên – dưới, trước – sau, trái – phải
        {
            "num": 32, "id": "math-32-vi-tri-khong-gian", "title": "Bài 32: Định hướng Vị trí không gian",
            "desc": "Xác định chính xác vị trí các vật thể: ở trên, ở dưới, phía trước, phía sau, bên trái, bên phải.",
            "note": "Rèn luyện khả năng quan sát từ góc nhìn của bản thân và người đối diện.",
            "intro_title": "Vị trí trong không gian",
            "intro_body": "Chim hót trên cành cây, thỏ gặm cỏ dưới đất. Tay phải cầm bút, tay trái giữ vở. Nắm vững vị trí giúp chúng mình làm mọi việc thật chuẩn xác!",
            "bullets": ["Trên — dưới: chim ở trên, hoa ở dưới", "Trước — sau: cô giáo phía trước, bảng phía sau", "Trái — phải: tay trái giữ vở, tay phải cầm bút"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m32-q1", "prompt": "Khi viết bài, em cầm bút bằng tay nào?", "ill": "/media/images/pencil.svg",
                    "options": [("m32-opt-phai", "Tay phải", True), ("m32-opt-trai", "Tay trái", False)],
                    "exp": "Chúng mình cầm bút viết bằng tay phải và giữ vở bằng tay trái."
                },
                {
                    "type": "tap_place", "id": "m32-q2", "prompt": "Chọn từ điền vào chỗ chấm: 'Mặt trời ở ... cao tỏa nắng.'", "ill": "/media/images/star.svg",
                    "target": ("m32-t1", "...", "Mặt trời ở ", " cao."),
                    "items": [("m32-i1", "trên"), ("m32-i2", "dưới")], "correct_item": "m32-i1",
                    "exp": "Mặt trời ở trên cao tỏa ánh nắng ấm áp."
                },
                {
                    "type": "matching", "id": "m32-q3", "prompt": "Nối đồ vật với vị trí phù hợp trong phòng học:", "ill": "/media/images/house.svg",
                    "pairs": [
                        ("m32-l1", "Quạt trần", "m32-r1", "Ở trên trần nhà"),
                        ("m32-l2", "Sàn lớp học", "m32-r2", "Ở dưới chân em"),
                        ("m32-l3", "Bảng đen", "m32-r3", "Ở phía trước lớp")
                    ],
                    "exp": "Quạt ở trên trần, sàn ở dưới chân, bảng đen ở phía trước."
                },
                {
                    "type": "multiple_choice", "id": "m32-q4", "prompt": "Mèo nằm dưới gầm bàn. Bàn ở vị trí nào so với mèo?", "ill": "/media/images/cat.svg",
                    "options": [("m32-opt4-tren", "Ở trên mèo", True), ("m32-opt4-duoi", "Ở dưới mèo", False), ("m32-opt4-sau", "Ở phía sau mèo", False)],
                    "exp": "Mèo ở dưới bàn thì bàn ở phía trên mèo."
                },
                {
                    "type": "counting", "id": "m32-q5", "prompt": "Đếm xem có mấy chú chim bay ở phía bên trái ngọn cây?", "ill": "/media/images/bird.svg",
                    "count": 3, "img": "/media/images/bird.svg", "exp": "Có đúng 3 chú chim bên trái ngọn cây."
                },
                {
                    "type": "number_select", "id": "m32-q6", "prompt": "Bên trái có 4 bông hoa, bên phải có 3 bông hoa. Cả hai bên có mấy bông hoa?", "ill": "/media/images/flower.svg",
                    "expr": "4 + 3 = ?", "choices": [6, 7, 8, 9], "ans": 7,
                    "exp": "4 cộng 3 bằng 7 bông hoa."
                }
            ]
        },

        # 33. Xếp hình bằng khối
        {
            "num": 33, "id": "math-33-xep-hinh-khoi", "title": "Bài 33: Thực hành Xếp hình bằng khối",
            "desc": "Tạo hình tòa tháp, ngôi nhà, cây cầu bằng cách kết hợp khối lập phương và khối hộp chữ nhật.",
            "note": "Phát triển tư duy hình học không gian và sự khéo léo của đôi tay.",
            "intro_title": "Sáng tạo với khối hình",
            "intro_body": "Các kiến trúc sư nhí hãy dùng khối hình để xây dựng những công trình thật đẹp nhé! Khối phẳng giúp đứng vững, xếp chồng tạo thành tòa tháp cao.",
            "bullets": ["Đặt khối to ở dưới để đứng vững", "Xếp chồng các khối tạo thành tòa tháp", "Ghép hai khối ngang tạo thành cây cầu"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m33-q1", "prompt": "Để xây tòa tháp đứng thật vững, em nên đặt khối nào ở dưới cùng?", "ill": "/media/images/house.svg",
                    "options": [("m33-opt-to", "Khối to và phẳng", True), ("m33-opt-nho", "Khối nhỏ xíu", False), ("m33-opt-nghieng", "Khối đặt nghiêng", False)],
                    "exp": "Đặt khối to, phẳng ở đáy giúp tòa tháp giữ thăng bằng tốt nhất."
                },
                {
                    "type": "number_select", "id": "m33-q2", "prompt": "Tòa tháp gồm 2 khối hộp chữ nhật làm chân và 3 khối lập phương chồng lên. Tháp có mấy khối?", "ill": "/media/images/house.svg",
                    "expr": "2 + 3 = ?", "choices": [4, 5, 6, 7], "ans": 5,
                    "exp": "2 cộng 3 bằng 5 khối tất cả."
                },
                {
                    "type": "matching", "id": "m33-q3", "prompt": "Nối công trình với cách ghép khối phù hợp:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m33-l1", "Tòa tháp cao", "m33-r1", "Xếp chồng các khối lên nhau"),
                        ("m33-l2", "Bức tường dài", "m33-r2", "Xếp các khối nối tiếp nằm ngang"),
                        ("m33-l3", "Mái nhà tam giác", "m33-r3", "Đặt khối mái lên trên cùng")
                    ],
                    "exp": "Tòa tháp xếp chồng, bức tường xếp ngang, mái nhà đặt trên cùng."
                },
                {
                    "type": "counting", "id": "m33-q4", "prompt": "Đếm xem có bao nhiêu khối lập phương màu đỏ trong mô hình?", "ill": "/media/images/star.svg",
                    "count": 5, "img": "/media/images/star.svg", "exp": "Có đúng 5 khối lập phương màu đỏ."
                },
                {
                    "type": "tap_place", "id": "m33-q5", "prompt": "Điền từ thích hợp: 'Xếp các khối nằm ngang cạnh nhau tạo thành bức ...'", "ill": "/media/images/house.svg",
                    "target": ("m33-t1", "...", "Tạo thành bức ", " kiên cố."),
                    "items": [("m33-i1", "tường"), ("m33-i2", "cột")], "correct_item": "m33-i1",
                    "exp": "Xếp ngang cạnh nhau tạo thành bức tường kiên cố."
                },
                {
                    "type": "number_select", "id": "m33-q6", "prompt": "Bé có 8 khối gỗ, bé đã dùng 5 khối để xây cầu. Còn lại mấy khối gỗ?", "ill": "/media/images/star.svg",
                    "expr": "8 - 5 = ?", "choices": [2, 3, 4, 5], "ans": 3,
                    "exp": "8 trừ 5 bằng 3 khối gỗ."
                }
            ]
        },

        # 34. BOSS: Ôn tập học kì 1
        {
            "num": 34, "id": "math-34-boss-hk1", "title": "Bài 34: BOSS Thử Thách Ôn Tập Học Kì 1",
            "desc": "Tổng hợp kiến thức trọng tâm Học kì 1: số đếm 0-10, phép cộng trừ phạm vi 10 và nhận diện hình học.",
            "note": "Khích lệ học sinh tự tin hoàn thành đấu trường vượt chướng ngại vật cuối kì 1.",
            "intro_title": "Đấu trường Học kì 1",
            "intro_body": "Chúc mừng các em đã đến chặng tổng kết Học kì 1! Hãy vận dụng thật tốt trí nhớ và sự nhanh nhẹn để giải cứu ngôi sao vàng nhé!",
            "bullets": ["Đếm và so sánh số 0 đến 10", "Cộng trừ nhẩm nhanh trong phạm vi 10", "Phân biệt khối hình phẳng và hình khối"],
            "questions": [
                {
                    "type": "number_select", "id": "m34-q1", "prompt": "Tính nhẩm: 6 + 4 = ?", "ill": "/media/images/star.svg",
                    "expr": "6 + 4 = ?", "choices": [8, 9, 10, 11], "ans": 10,
                    "exp": "6 cộng 4 bằng 10."
                },
                {
                    "type": "number_select", "id": "m34-q2", "prompt": "Tính nhẩm: 10 - 7 = ?", "ill": "/media/images/star.svg",
                    "expr": "10 - 7 = ?", "choices": [2, 3, 4, 5], "ans": 3,
                    "exp": "10 trừ 7 bằng 3."
                },
                {
                    "type": "multiple_choice", "id": "m34-q3", "prompt": "Số nào lớn nhất trong các số sau: 4, 9, 2, 7?", "ill": "/media/images/star.svg",
                    "options": [("m34-opt-9", "Số 9", True), ("m34-opt-7", "Số 7", False), ("m34-opt-4", "Số 4", False)],
                    "exp": "Trong các số trên, 9 là số lớn nhất."
                },
                {
                    "type": "matching", "id": "m34-q4", "prompt": "Nối phép tính với kết quả đúng:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m34-l1", "5 + 3", "m34-r1", "Bằng 8"),
                        ("m34-l2", "9 - 2", "m34-r2", "Bằng 7"),
                        ("m34-l3", "3 + 3", "m34-r3", "Bằng 6")
                    ],
                    "exp": "5+3=8; 9-2=7; 3+3=6."
                },
                {
                    "type": "tap_place", "id": "m34-q5", "prompt": "Chọn dấu thích hợp điền vào ô trống: 8 ... 5 + 2", "ill": "/media/images/star.svg",
                    "target": ("m34-t1", "...", "8 ", " 5 + 2"),
                    "items": [("m34-i1", ">"), ("m34-i2", "<"), ("m34-i3", "=")], "correct_item": "m34-i1",
                    "exp": "5 + 2 = 7; vì 8 lớn hơn 7 nên 8 > 5 + 2."
                },
                {
                    "type": "counting", "id": "m34-q6", "prompt": "Đếm xem có bao nhiêu ngôi sao chiến thắng?", "ill": "/media/images/star.svg",
                    "count": 10, "img": "/media/images/star.svg", "exp": "Có đủ 10 ngôi sao hoàn hảo!"
                }
            ]
        },

        # 35. Các số từ 11 đến 20
        {
            "num": 35, "id": "math-35-so-11-den-20", "title": "Bài 35: Các số từ 11 đến 20",
            "desc": "Đọc, viết, đếm và phân tích cấu tạo chục – đơn vị các số từ 11 đến 20.",
            "note": "Nhấn mạnh số gồm 1 chục và các đơn vị lẻ tương ứng (VD: 14 gồm 1 chục và 4 đơn vị).",
            "intro_title": "Số có hai chữ số: 11 đến 20",
            "intro_body": "10 que tính bó thành 1 chục. Thêm 1 que tính là 11 (mười một), thêm 2 que tính là 12 (mười hai). Cứ như vậy đến 20 (hai mươi).",
            "bullets": ["Số 10 là 1 chục", "15 gồm 1 chục và 5 đơn vị", "Thứ tự: 11, 12, 13, 14, 15, 16, 17, 18, 19, 20"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m35-q1", "prompt": "Số 16 gồm mấy chục và mấy đơn vị?", "ill": "/media/images/book.svg",
                    "options": [("m35-opt-1c6d", "1 chục và 6 đơn vị", True), ("m35-opt-6c1d", "6 chục và 1 đơn vị", False), ("m35-opt-16c", "16 chục", False)],
                    "exp": "Số 16 gồm 1 chục và 6 đơn vị."
                },
                {
                    "type": "number_select", "id": "m35-q2", "prompt": "Số liền sau số 14 là số nào?", "ill": "/media/images/book.svg",
                    "expr": "Số liền sau 14 là: ?", "choices": [13, 15, 16, 17], "ans": 15,
                    "exp": "Số liền sau 14 là 15."
                },
                {
                    "type": "tap_place", "id": "m35-q3", "prompt": "Điền số thích hợp vào dãy: 11, 12, ..., 14, 15", "ill": "/media/images/book.svg",
                    "target": ("m35-t1", "...", "11, 12, ", ", 14, 15"),
                    "items": [("m35-i1", "13"), ("m35-i2", "16")], "correct_item": "m35-i1",
                    "exp": "Dãy số liên tiếp là 11, 12, 13, 14, 15."
                },
                {
                    "type": "matching", "id": "m35-q4", "prompt": "Nối cách đọc với số viết đúng:", "ill": "/media/images/book.svg",
                    "pairs": [
                        ("m35-l1", "Mười một", "m35-r1", "Số 11"),
                        ("m35-l2", "Mười lăm", "m35-r2", "Số 15"),
                        ("m35-l3", "Hai mươi", "m35-r3", "Số 20")
                    ],
                    "exp": "Mười một là 11, mười lăm là 15, hai mươi là 20."
                },
                {
                    "type": "counting", "id": "m35-q5", "prompt": "Đếm xem có bao nhiêu cuốn sách trong giá sách?", "ill": "/media/images/book.svg",
                    "count": 12, "img": "/media/images/book.svg", "exp": "Có đúng 12 cuốn sách."
                },
                {
                    "type": "number_select", "id": "m35-q6", "prompt": "Tính: 10 + 7 = ?", "ill": "/media/images/book.svg",
                    "expr": "10 + 7 = ?", "choices": [15, 16, 17, 18], "ans": 17,
                    "exp": "10 cộng 7 bằng 17."
                }
            ]
        },

        # 36. Các số tròn chục
        {
            "num": 36, "id": "math-36-so-tron-chuc", "title": "Bài 36: Các số tròn chục đến 90",
            "desc": "Đọc, viết các số tròn chục 10, 20, 30, 40, 50, 60, 70, 80, 90 và cộng trừ số tròn chục.",
            "note": "Số tròn chục có chữ số hàng đơn vị bằng 0.",
            "intro_title": "Thế giới các số tròn chục",
            "intro_body": "Mỗi bó có 10 que tính. 1 bó là 10 (mười), 2 bó là 20 (hai mươi), 3 bó là 30 (ba mươi)... đến 9 bó là 90 (chín mươi).",
            "bullets": ["Các số tròn chục: 10, 20, 30, 40, 50, 60, 70, 80, 90", "Chữ số tận cùng luôn là 0", "Cộng nhẩm: 20 + 30 = 50"],
            "questions": [
                {
                    "type": "number_select", "id": "m36-q1", "prompt": "Tính nhẩm: 30 + 20 = ?", "ill": "/media/images/star.svg",
                    "expr": "30 + 20 = ?", "choices": [40, 50, 60, 70], "ans": 50,
                    "exp": "3 chục cộng 2 chục bằng 5 chục (50)."
                },
                {
                    "type": "number_select", "id": "m36-q2", "prompt": "Tính nhẩm: 70 - 40 = ?", "ill": "/media/images/star.svg",
                    "expr": "70 - 40 = ?", "choices": [20, 30, 40, 50], "ans": 30,
                    "exp": "7 chục trừ 4 chục bằng 3 chục (30)."
                },
                {
                    "type": "multiple_choice", "id": "m36-q3", "prompt": "Số nào dưới đây là số tròn chục?", "ill": "/media/images/star.svg",
                    "options": [("m36-opt-40", "Số 40", True), ("m36-opt-45", "Số 45", False), ("m36-opt-34", "Số 34", False)],
                    "exp": "Số 40 có chữ số hàng đơn vị là 0 nên là số tròn chục."
                },
                {
                    "type": "matching", "id": "m36-q4", "prompt": "Nối phép tính tròn chục với kết quả đúng:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m36-l1", "10 + 40", "m36-r1", "Bằng 50"),
                        ("m36-l2", "80 - 20", "m36-r2", "Bằng 60"),
                        ("m36-l3", "50 + 40", "m36-r3", "Bằng 90")
                    ],
                    "exp": "10+40=50; 80-20=60; 50+40=90."
                },
                {
                    "type": "tap_place", "id": "m36-q5", "prompt": "Điền số tròn chục thích hợp: 50 + ... = 80", "ill": "/media/images/star.svg",
                    "target": ("m36-t1", "...", "50 + ", " = 80"),
                    "items": [("m36-i1", "30"), ("m36-i2", "20")], "correct_item": "m36-i1",
                    "exp": "50 cộng 30 bằng 80."
                },
                {
                    "type": "multiple_choice", "id": "m36-q6", "prompt": "Số tròn chục lớn nhất có hai chữ số là số nào?", "ill": "/media/images/star.svg",
                    "options": [("m36-opt-90", "Số 90", True), ("m36-opt-99", "Số 99", False), ("m36-opt-100", "Số 100", False)],
                    "exp": "90 là số tròn chục có 2 chữ số lớn nhất (100 có 3 chữ số)."
                }
            ]
        },

        # 37. Số có hai chữ số
        {
            "num": 37, "id": "math-37-so-hai-chu-so", "title": "Bài 37: Đọc và Viết số có hai chữ số",
            "desc": "Nhận biết các số từ 21 đến 99, quy tắc đọc đuôi 'mốt', 'lăm', 'mười'.",
            "note": "Lưu ý quy tắc đọc: hai mươi mốt (21), hai mươi lăm (25), ba mươi (30).",
            "intro_title": "Đọc viết số có hai chữ số",
            "intro_body": "Số có hai chữ số gồm chữ số hàng chục đứng trước và chữ số hàng đơn vị đứng sau. Đọc từ trái sang phải: chục rồi đến đơn vị.",
            "bullets": ["21 đọc là hai mươi mốt", "35 đọc là ba mươi lăm", "Cấu tạo: 47 gồm 4 chục và 7 đơn vị"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m37-q1", "prompt": "Số 25 được đọc là gì?", "ill": "/media/images/pencil.svg",
                    "options": [("m37-opt-25", "Hai mươi lăm", True), ("m37-opt-25b", "Hai mươi năm", False), ("m37-opt-25c", "Hai lăm", False)],
                    "exp": "Số 25 đọc chuẩn là hai mươi lăm."
                },
                {
                    "type": "multiple_choice", "id": "m37-q2", "prompt": "Số 'bốn mươi mốt' được viết là số nào?", "ill": "/media/images/pencil.svg",
                    "options": [("m37-opt-41", "41", True), ("m37-opt-14", "14", False), ("m37-opt-40", "40", False)],
                    "exp": "Bốn mươi mốt viết là 41."
                },
                {
                    "type": "matching", "id": "m37-q3", "prompt": "Nối số với cấu tạo số tương ứng:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m37-l1", "Số 38", "m37-r1", "Gồm 3 chục và 8 đơn vị"),
                        ("m37-l2", "Số 62", "m37-r2", "Gồm 6 chục và 2 đơn vị"),
                        ("m37-l3", "Số 70", "m37-r3", "Gồm 7 chục và 0 đơn vị")
                    ],
                    "exp": "38 gồm 3 chục 8 đơn vị; 62 gồm 6 chục 2 đơn vị; 70 gồm 7 chục."
                },
                {
                    "type": "tap_place", "id": "m37-q4", "prompt": "Điền số thích hợp: Số liền trước số 50 là ...", "ill": "/media/images/pencil.svg",
                    "target": ("m37-t1", "...", "Số liền trước 50 là ", "."),
                    "items": [("m37-i1", "49"), ("m37-i2", "51")], "correct_item": "m37-i1",
                    "exp": "Số liền trước số 50 là số 49."
                },
                {
                    "type": "number_select", "id": "m37-q5", "prompt": "Số gồm 8 chục và 3 đơn vị là số nào?", "ill": "/media/images/pencil.svg",
                    "expr": "8 chục + 3 đơn vị = ?", "choices": [38, 80, 83, 85], "ans": 83,
                    "exp": "8 chục và 3 đơn vị ghép lại là số 83."
                },
                {
                    "type": "counting", "id": "m37-q6", "prompt": "Đếm xem có bao nhiêu chiếc bút chì màu?", "ill": "/media/images/pencil.svg",
                    "count": 14, "img": "/media/images/pencil.svg", "exp": "Có đúng 14 chiếc bút chì."
                }
            ]
        },

        # 38. So sánh số đến 100
        {
            "num": 38, "id": "math-38-so-sanh-so-100", "title": "Bài 38: So sánh các số đến 100",
            "desc": "So sánh hai số có hai chữ số: so sánh chữ số hàng chục trước, nếu bằng nhau thì so sánh hàng đơn vị.",
            "note": "Rèn quy tắc so sánh từ hàng chục rồi mới đến hàng đơn vị.",
            "intro_title": "Quy tắc so sánh số đến 100",
            "intro_body": "Bước 1: So sánh chữ số hàng chục. Số nào có chữ số hàng chục lớn hơn thì lớn hơn. Bước 2: Nếu hàng chục bằng nhau, so sánh chữ số hàng đơn vị.",
            "bullets": ["Ví dụ: 45 > 39 vì 4 chục > 3 chục", "Ví dụ: 58 > 52 vì 8 đơn vị > 2 đơn vị", "Nếu bằng nhau cả hai hàng: 64 = 64"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m38-q1", "prompt": "Điền dấu thích hợp: 63 ... 59", "ill": "/media/images/star.svg",
                    "options": [("m38-opt-lon", "> (lớn hơn)", True), ("m38-opt-be", "< (bé hơn)", False), ("m38-opt-bang", "= (bằng)", False)],
                    "exp": "Vì 6 chục lớn hơn 5 chục nên 63 > 59."
                },
                {
                    "type": "multiple_choice", "id": "m38-q2", "prompt": "Điền dấu thích hợp: 42 ... 47", "ill": "/media/images/star.svg",
                    "options": [("m38-opt2-be", "< (bé hơn)", True), ("m38-opt2-lon", "> (lớn hơn)", False), ("m38-opt2-bang", "= (bằng)", False)],
                    "exp": "Hàng chục đều là 4, so sánh hàng đơn vị: 2 < 7 nên 42 < 47."
                },
                {
                    "type": "matching", "id": "m38-q3", "prompt": "Nối cặp số với dấu so sánh đúng:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m38-l1", "75 và 72", "m38-r1", "75 > 72"),
                        ("m38-l2", "34 và 81", "m38-r2", "34 < 81"),
                        ("m38-l3", "90 và 90", "m38-r3", "90 = 90")
                    ],
                    "exp": "75 > 72; 34 < 81; 90 = 90."
                },
                {
                    "type": "tap_place", "id": "m38-q4", "prompt": "Chọn số lớn nhất trong các số: 38, 71, 65", "ill": "/media/images/star.svg",
                    "target": ("m38-t1", "...", "Số lớn nhất là ", "."),
                    "items": [("m38-i1", "71"), ("m38-i2", "65"), ("m38-i3", "38")], "correct_item": "m38-i1",
                    "exp": "71 có 7 chục là lớn nhất trong 3 số."
                },
                {
                    "type": "number_select", "id": "m38-q5", "prompt": "Tìm số bé nhất trong các số: 82, 19, 45, 60", "ill": "/media/images/star.svg",
                    "expr": "Số bé nhất là: ?", "choices": [19, 45, 60, 82], "ans": 19,
                    "exp": "19 có 1 chục nên là số bé nhất."
                },
                {
                    "type": "multiple_choice", "id": "m38-q6", "prompt": "Sắp xếp theo thứ tự từ bé đến lớn: 28, 54, 15", "ill": "/media/images/star.svg",
                    "options": [("m38-opt6-dung", "15, 28, 54", True), ("m38-opt6-sai1", "54, 28, 15", False), ("m38-opt6-sai2", "28, 15, 54", False)],
                    "exp": "Thứ tự từ bé đến lớn là: 15, 28, 54."
                }
            ]
        },

        # 39. Bảng các số từ 1 đến 100
        {
            "num": 39, "id": "math-39-bang-so-1-100", "title": "Bài 39: Bảng các số từ 1 đến 100",
            "desc": "Khám phá quy luật hàng ngang và cột dọc trên bảng số 1-100.",
            "note": "Theo hàng ngang: hơn kém nhau 1 đơn vị. Theo cột dọc: hơn kém nhau 1 chục (10 đơn vị).",
            "intro_title": "Bảng số kỳ diệu 1 đến 100",
            "intro_body": "Bảng có 10 hàng và 10 cột. Sang phải 1 ô: cộng thêm 1. Xuống dưới 1 ô: cộng thêm 10. Tìm hiểu bảng số giúp tính nhẩm siêu tốc!",
            "bullets": ["Các số cùng một hàng có cùng chữ số hàng chục", "Các số cùng một cột có cùng chữ số hàng đơn vị", "Số 100 là số có 3 chữ số nhỏ nhất"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m39-q1", "prompt": "Trong bảng số, ô liền ngay bên phải số 35 là số nào?", "ill": "/media/images/book.svg",
                    "options": [("m39-opt-36", "Số 36", True), ("m39-opt-34", "Số 34", False), ("m39-opt-45", "Số 45", False)],
                    "exp": "Ô liền bên phải số 35 là 35 + 1 = 36."
                },
                {
                    "type": "multiple_choice", "id": "m39-q2", "prompt": "Trong bảng số, ô liền ngay phía dưới số 42 là số nào?", "ill": "/media/images/book.svg",
                    "options": [("m39-opt2-52", "Số 52", True), ("m39-opt2-43", "Số 43", False), ("m39-opt2-32", "Số 32", False)],
                    "exp": "Ô liền phía dưới số 42 là 42 + 10 = 52."
                },
                {
                    "type": "matching", "id": "m39-q3", "prompt": "Nối vị trí với quy luật biến đổi số:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m39-l1", "Sang phải 1 ô", "m39-r1", "Cộng thêm 1 đơn vị"),
                        ("m39-l2", "Sang trái 1 ô", "m39-r2", "Bớt đi 1 đơn vị"),
                        ("m39-l3", "Xuống dưới 1 ô", "m39-r3", "Cộng thêm 1 chục")
                    ],
                    "exp": "Sang phải cộng 1, sang trái trừ 1, xuống dưới cộng 10."
                },
                {
                    "type": "tap_place", "id": "m39-q4", "prompt": "Số nhỏ nhất có 3 chữ số trong bảng số là số ...", "ill": "/media/images/star.svg",
                    "target": ("m39-t1", "...", "Số nhỏ nhất có 3 chữ số là ", "."),
                    "items": [("m39-i1", "100"), ("m39-i2", "99")], "correct_item": "m39-i1",
                    "exp": "Số 100 là số có 3 chữ số nhỏ nhất."
                },
                {
                    "type": "number_select", "id": "m39-q5", "prompt": "Số nào nằm ngay trước số 100 trên bảng số?", "ill": "/media/images/book.svg",
                    "expr": "Số liền trước 100 là: ?", "choices": [90, 98, 99, 101], "ans": 99,
                    "exp": "Số liền trước số 100 là 99."
                },
                {
                    "type": "counting", "id": "m39-q6", "prompt": "Đếm xem có bao nhiêu số tròn chục trong bảng từ 1 đến 100?", "ill": "/media/images/star.svg",
                    "count": 10, "img": "/media/images/star.svg", "exp": "Có 10 số tròn chục: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100."
                }
            ]
        },

        # 40. Phép cộng trong phạm vi 100 (không nhớ)
        {
            "num": 40, "id": "math-40-cong-pham-vi-100", "title": "Bài 40: Phép cộng trong phạm vi 100 (Không nhớ)",
            "desc": "Cộng hai số có hai chữ số: cộng hàng đơn vị với hàng đơn vị, cộng hàng chục với hàng chục.",
            "note": "Cộng theo cột dọc: thẳng hàng đơn vị và thẳng hàng chục.",
            "intro_title": "Cộng không nhớ đến 100",
            "intro_body": "Để tính 34 + 23: Lấy 4 + 3 = 7, viết 7 ở hàng đơn vị. Lấy 3 + 2 = 5, viết 5 ở hàng chục. Kết quả là 57.",
            "bullets": ["Cộng từ phải sang trái (đơn vị trước, chục sau)", "4 + 3 = 7 đơn vị", "3 + 2 = 5 chục -> 57"],
            "questions": [
                {
                    "type": "number_select", "id": "m40-q1", "prompt": "Tính: 34 + 23 = ?", "ill": "/media/images/apple.svg",
                    "expr": "34 + 23 = ?", "choices": [55, 56, 57, 58], "ans": 57,
                    "exp": "4 + 3 = 7, 3 + 2 = 5, kết quả là 57."
                },
                {
                    "type": "number_select", "id": "m40-q2", "prompt": "Tính: 41 + 16 = ?", "ill": "/media/images/apple.svg",
                    "expr": "41 + 16 = ?", "choices": [55, 57, 58, 67], "ans": 57,
                    "exp": "1 + 6 = 7, 4 + 1 = 5, kết quả là 57."
                },
                {
                    "type": "matching", "id": "m40-q3", "prompt": "Nối phép tính với kết quả đúng:", "ill": "/media/images/apple.svg",
                    "pairs": [
                        ("m40-l1", "52 + 14", "m40-r1", "Bằng 66"),
                        ("m40-l2", "30 + 25", "m40-r2", "Bằng 55"),
                        ("m40-l3", "61 + 27", "m40-r3", "Bằng 88")
                    ],
                    "exp": "52+14=66; 30+25=55; 61+27=88."
                },
                {
                    "type": "tap_place", "id": "m40-q4", "prompt": "Chọn kết quả điền vào chỗ chấm: 20 + 35 = ...", "ill": "/media/images/apple.svg",
                    "target": ("m40-t1", "...", "20 + 35 = ", ""),
                    "items": [("m40-i1", "55"), ("m40-i2", "65")], "correct_item": "m40-i1",
                    "exp": "20 cộng 35 bằng 55."
                },
                {
                    "type": "multiple_choice", "id": "m40-q5", "prompt": "Phép tính nào có kết quả bằng 79?", "ill": "/media/images/apple.svg",
                    "options": [("m40-opt-dung", "45 + 34", True), ("m40-opt-sai1", "40 + 35", False), ("m40-opt-sai2", "50 + 28", False)],
                    "exp": "45 + 34 = 79."
                },
                {
                    "type": "counting", "id": "m40-q6", "prompt": "Đếm xem có bao nhiêu quả táo đỏ?", "ill": "/media/images/apple.svg",
                    "count": 6, "img": "/media/images/apple.svg", "exp": "Có đúng 6 quả táo đỏ."
                }
            ]
        },

        # 41. Phép trừ trong phạm vi 100 (không nhớ)
        {
            "num": 41, "id": "math-41-tru-pham-vi-100", "title": "Bài 41: Phép trừ trong phạm vi 100 (Không nhớ)",
            "desc": "Trừ hai số có hai chữ số: trừ hàng đơn vị cho hàng đơn vị, trừ hàng chục cho hàng chục.",
            "note": "Trừ từ phải sang trái, thẳng hàng đơn vị và thẳng hàng chục.",
            "intro_title": "Trừ không nhớ đến 100",
            "intro_body": "Để tính 58 - 25: Lấy 8 - 5 = 3 ở hàng đơn vị. Lấy 5 - 2 = 3 ở hàng chục. Kết quả là 33.",
            "bullets": ["Trừ đơn vị trước: 8 - 5 = 3", "Trừ chục sau: 5 - 2 = 3", "58 - 25 = 33"],
            "questions": [
                {
                    "type": "number_select", "id": "m41-q1", "prompt": "Tính: 58 - 25 = ?", "ill": "/media/images/apple.svg",
                    "expr": "58 - 25 = ?", "choices": [31, 32, 33, 34], "ans": 33,
                    "exp": "8 - 5 = 3, 5 - 2 = 3, kết quả là 33."
                },
                {
                    "type": "number_select", "id": "m41-q2", "prompt": "Tính: 79 - 46 = ?", "ill": "/media/images/apple.svg",
                    "expr": "79 - 46 = ?", "choices": [23, 33, 35, 43], "ans": 33,
                    "exp": "9 - 6 = 3, 7 - 4 = 3, kết quả là 33."
                },
                {
                    "type": "matching", "id": "m41-q3", "prompt": "Nối phép tính trừ với kết quả đúng:", "ill": "/media/images/apple.svg",
                    "pairs": [
                        ("m41-l1", "67 - 32", "m41-r1", "Bằng 35"),
                        ("m41-l2", "85 - 15", "m41-r2", "Bằng 70"),
                        ("m41-l3", "49 - 20", "m41-r3", "Bằng 29")
                    ],
                    "exp": "67-32=35; 85-15=70; 49-20=29."
                },
                {
                    "type": "tap_place", "id": "m41-q4", "prompt": "Điền kết quả vào chỗ chấm: 96 - 54 = ...", "ill": "/media/images/apple.svg",
                    "target": ("m41-t1", "...", "96 - 54 = ", ""),
                    "items": [("m41-i1", "42"), ("m41-i2", "44")], "correct_item": "m41-i1",
                    "exp": "6 - 4 = 2, 9 - 5 = 4, kết quả là 42."
                },
                {
                    "type": "multiple_choice", "id": "m41-q5", "prompt": "Mẹ có 48 quả trứng, mẹ dùng 12 quả làm bánh. Còn lại bao nhiêu quả trứng?", "ill": "/media/images/apple.svg",
                    "options": [("m41-opt-36", "36 quả trứng", True), ("m41-opt-35", "35 quả trứng", False), ("m41-opt-40", "40 quả trứng", False)],
                    "exp": "48 - 12 = 36 quả trứng."
                },
                {
                    "type": "number_select", "id": "m41-q6", "prompt": "Tính: 64 - 24 = ?", "ill": "/media/images/apple.svg",
                    "expr": "64 - 24 = ?", "choices": [30, 40, 44, 50], "ans": 40,
                    "exp": "4 - 4 = 0, 6 - 2 = 4, kết quả là 40."
                }
            ]
        },

        # 42. Bài toán: viết phép tính
        {
            "num": 42, "id": "math-42-viet-phep-tinh", "title": "Bài 42: Bài toán — Viết phép tính phù hợp",
            "desc": "Đọc hiểu tình huống thực tế và lựa chọn phép tính cộng hoặc trừ tương ứng.",
            "note": "'Thêm vào, tất cả' -> Phép cộng (+). 'Bớt đi, cho đi, còn lại' -> Phép trừ (-).",
            "intro_title": "Nhận diện phép tính từ tình huống",
            "intro_body": "Khi bài toán cho thêm hoặc hỏi có tất cả: dùng phép cộng (+). Khi bài toán bớt đi, bay đi, cho bạn: dùng phép trừ (-).",
            "bullets": ["Thêm vào, bay đến -> Dùng dấu cộng (+)", "Bớt đi, ăn mất, cho bạn -> Dùng dấu trừ (-)", "Viết phép tính kèm kết quả chính xác"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m42-q1", "prompt": "Trên cành có 5 con chim, 3 con chim bay đến đậu cùng. Phép tính nào đúng?", "ill": "/media/images/bird.svg",
                    "options": [("m42-opt-cong", "5 + 3 = 8", True), ("m42-opt-tru", "5 - 3 = 2", False), ("m42-opt-nhan", "5 + 5 = 10", False)],
                    "exp": "Bay đến là thêm vào nên dùng phép cộng: 5 + 3 = 8."
                },
                {
                    "type": "multiple_choice", "id": "m42-q2", "prompt": "Đĩa có 9 quả táo, bé ăn mất 4 quả. Phép tính tìm số quả táo còn lại là:", "ill": "/media/images/apple.svg",
                    "options": [("m42-opt2-tru", "9 - 4 = 5", True), ("m42-opt2-cong", "9 + 4 = 13", False), ("m42-opt2-sai", "9 - 5 = 4", False)],
                    "exp": "Ăn mất là bớt đi nên dùng phép trừ: 9 - 4 = 5."
                },
                {
                    "type": "matching", "id": "m42-q3", "prompt": "Nối tình huống với phép tính phù hợp:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m42-l1", "Có 6 bông hoa, cắm thêm 2 bông", "m42-r1", "Phép tính: 6 + 2 = 8"),
                        ("m42-l2", "Có 8 quả bóng, vỡ mất 3 quả", "m42-r2", "Phép tính: 8 - 3 = 5"),
                        ("m42-l3", "Có 10 viên kẹo, cho bạn 4 viên", "m42-r3", "Phép tính: 10 - 4 = 6")
                    ],
                    "exp": "Cắm thêm là cộng; vỡ mất và cho bạn là phép trừ."
                },
                {
                    "type": "tap_place", "id": "m42-q4", "prompt": "Điền dấu phép tính: 'Có 7 quả cam, mẹ mua thêm 3 quả: 7 ... 3 = 10'", "ill": "/media/images/apple.svg",
                    "target": ("m42-t1", "...", "7 ", " 3 = 10"),
                    "items": [("m42-i1", "+"), ("m42-i2", "-")], "correct_item": "m42-i1",
                    "exp": "Mua thêm nên dùng dấu cộng (+)."
                },
                {
                    "type": "number_select", "id": "m42-q5", "prompt": "Lớp có 20 bạn nam và 15 bạn nữ. Cả lớp có bao nhiêu bạn?", "ill": "/media/images/book.svg",
                    "expr": "20 + 15 = ?", "choices": [25, 30, 35, 40], "ans": 35,
                    "exp": "20 + 15 = 35 bạn học sinh."
                },
                {
                    "type": "counting", "id": "m42-q6", "prompt": "Đếm xem có bao nhiêu chú chim đang đậu trên cành?", "ill": "/media/images/bird.svg",
                    "count": 7, "img": "/media/images/bird.svg", "exp": "Có đúng 7 chú chim."
                }
            ]
        },

        # 43. Bài toán: nêu câu trả lời
        {
            "num": 43, "id": "math-43-neu-cau-tra-loi", "title": "Bài 43: Bài toán — Nêu câu trả lời hoàn chỉnh",
            "desc": "Rèn kỹ năng trả lời bài toán có lời văn đầy đủ thành phần: câu trả lời, phép tính và đơn vị (đáp số).",
            "note": "Hướng dẫn bỏ từ 'Hỏi' và thay 'bao nhiêu/mấy' bằng từ 'số'.",
            "intro_title": "Nêu câu trả lời hoàn chỉnh",
            "intro_body": "Khi giải toán, chúng mình viết câu trả lời thật rõ ràng. Ví dụ: 'Số con gà có tất cả là:', sau đó viết phép tính '5 + 3 = 8 (con)'.",
            "bullets": ["Bỏ chữ Hỏi, thêm chữ Số ở đầu", "Viết phép tính kèm đơn vị trong ngoặc", "Đáp số: ghi rõ kết quả"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m43-q1", "prompt": "Bài toán hỏi: 'Hỏi đàn gà có tất cả mấy con?'. Câu trả lời đúng là:", "ill": "/media/images/bird.svg",
                    "options": [("m43-opt-dung", "Đàn gà có tất cả số con là:", True), ("m43-opt-sai1", "Gà có con là:", False), ("m43-opt-sai2", "Mấy con gà là:", False)],
                    "exp": "Câu trả lời chuẩn mực là: 'Đàn gà có tất cả số con là:'."
                },
                {
                    "type": "tap_place", "id": "m43-q2", "prompt": "Điền từ thích hợp vào câu trả lời: '... bông hoa trong vườn có là:'", "ill": "/media/images/flower.svg",
                    "target": ("m43-t1", "...", "", " bông hoa trong vườn có là:"),
                    "items": [("m43-i1", "Số"), ("m43-i2", "Mấy")], "correct_item": "m43-i1",
                    "exp": "Đầu câu trả lời dùng từ 'Số'."
                },
                {
                    "type": "number_select", "id": "m43-q3", "prompt": "Hà có 12 viên bi, Nam cho Hà thêm 5 viên. Hà có tất cả mấy viên bi?", "ill": "/media/images/star.svg",
                    "expr": "12 + 5 = ?", "choices": [15, 16, 17, 18], "ans": 17,
                    "exp": "12 + 5 = 17 viên bi. Đáp số: 17 viên bi."
                },
                {
                    "type": "matching", "id": "m43-q4", "prompt": "Nối các bước giải bài toán có lời văn:", "ill": "/media/images/book.svg",
                    "pairs": [
                        ("m43-l1", "Bước 1", "m43-r1", "Viết câu lời giải"),
                        ("m43-l2", "Bước 2", "m43-r2", "Viết phép tính kèm đơn vị"),
                        ("m43-l3", "Bước 3", "m43-r3", "Ghi đáp số")
                    ],
                    "exp": "3 bước giải toán: Lời giải -> Phép tính -> Đáp số."
                },
                {
                    "type": "multiple_choice", "id": "m43-q5", "prompt": "Vườn có 26 cây chuối, bố chặt bớt 6 cây già. Vườn còn lại bao nhiêu cây chuối?", "ill": "/media/images/leaf.svg",
                    "options": [("m43-opt-20", "20 cây chuối", True), ("m43-opt-22", "22 cây chuối", False), ("m43-opt-32", "32 cây chuối", False)],
                    "exp": "26 - 6 = 20 cây chuối."
                },
                {
                    "type": "counting", "id": "m43-q6", "prompt": "Đếm xem có bao nhiêu chiếc lá xanh?", "ill": "/media/images/leaf.svg",
                    "count": 8, "img": "/media/images/leaf.svg", "exp": "Có đúng 8 chiếc lá xanh."
                }
            ]
        },

        # 44. Xem giờ đúng
        {
            "num": 44, "id": "math-44-xem-gio-dung", "title": "Bài 44: Xem đồng hồ — Giờ đúng",
            "desc": "Nhận biết kim ngắn chỉ giờ, kim dài chỉ phút. Xem đồng hồ khi kim phút chỉ thẳng số 12 (giờ đúng).",
            "note": "Kim ngắn chỉ số mấy là bấy nhiêu giờ (khi kim dài chỉ đúng số 12).",
            "intro_title": "Chiếc đồng hồ thân yêu",
            "intro_body": "Đồng hồ có kim ngắn chỉ giờ, kim dài chỉ phút. Khi kim dài chỉ đúng số 12, kim ngắn chỉ vào số nào thì đồng hồ chỉ đúng bấy nhiêu giờ.",
            "bullets": ["Kim ngắn chỉ giờ, kim dài chỉ phút", "Kim dài chỉ số 12: giờ đúng", "Ví dụ: kim ngắn số 8, kim dài số 12 -> 8 giờ"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m44-q1", "prompt": "Kim ngắn chỉ số 7, kim dài chỉ đúng số 12. Đồng hồ chỉ mấy giờ?", "ill": "/media/images/star.svg",
                    "options": [("m44-opt-7g", "7 giờ", True), ("m44-opt-12g", "12 giờ", False), ("m44-opt-6g", "6 giờ", False)],
                    "exp": "Kim ngắn chỉ số 7, kim dài số 12 là đúng 7 giờ."
                },
                {
                    "type": "multiple_choice", "id": "m44-q2", "prompt": "Khi đồng hồ chỉ đúng 10 giờ, kim dài chỉ vào số nào?", "ill": "/media/images/star.svg",
                    "options": [("m44-opt2-12", "Số 12", True), ("m44-opt2-10", "Số 10", False), ("m44-opt2-6", "Số 6", False)],
                    "exp": "Giờ đúng thì kim dài luôn luôn chỉ vào số 12."
                },
                {
                    "type": "matching", "id": "m44-q3", "prompt": "Nối hoạt động trong ngày với giờ phù hợp:", "ill": "/media/images/house.svg",
                    "pairs": [
                        ("m44-l1", "Bé thức dậy buổi sáng", "m44-r1", "Lúc 6 giờ sáng"),
                        ("m44-l2", "Bé vào lớp học bài", "m44-r2", "Lúc 8 giờ sáng"),
                        ("m44-l3", "Bé đi ngủ buổi tối", "m44-r3", "Lúc 9 giờ tối")
                    ],
                    "exp": "6 giờ sáng dậy, 8 giờ học bài, 9 giờ tối ngủ."
                },
                {
                    "type": "tap_place", "id": "m44-q4", "prompt": "Điền từ: 'Trên mặt đồng hồ, kim ngắn chỉ ..., kim dài chỉ phút.'", "ill": "/media/images/star.svg",
                    "target": ("m44-t1", "...", "Kim ngắn chỉ ", "."),
                    "items": [("m44-i1", "giờ"), ("m44-i2", "giây")], "correct_item": "m44-i1",
                    "exp": "Kim ngắn dùng để chỉ giờ."
                },
                {
                    "type": "number_select", "id": "m44-q5", "prompt": "Bé bắt đầu học lúc 8 giờ, sau 2 giờ bé được nghỉ giải lao. Lúc đó là mấy giờ?", "ill": "/media/images/star.svg",
                    "expr": "8 + 2 = ?", "choices": [9, 10, 11, 12], "ans": 10,
                    "exp": "8 cộng 2 bằng 10 giờ."
                },
                {
                    "type": "counting", "id": "m44-q6", "prompt": "Đếm xem có bao nhiêu số trên mặt đồng hồ kim?", "ill": "/media/images/star.svg",
                    "count": 12, "img": "/media/images/star.svg", "exp": "Mặt đồng hồ có đúng 12 số từ 1 đến 12."
                }
            ]
        },

        # 45. Các ngày trong tuần
        {
            "num": 45, "id": "math-45-cac-ngay-trong-tuan", "title": "Bài 45: Các ngày trong tuần",
            "desc": "Nhận biết một tuần lễ có 7 ngày: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ Nhật.",
            "note": "Thứ Hai đến Thứ Sáu: ngày đi học. Thứ Bảy và Chủ Nhật: ngày nghỉ cuối tuần.",
            "intro_title": "Một tuần lễ có 7 ngày",
            "intro_body": "Một tuần có 7 ngày: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật. Bé đi học 5 ngày và nghỉ cuối tuần 2 ngày.",
            "bullets": ["Một tuần lễ có 7 ngày", "Thứ Hai là ngày đầu tuần đi học", "Thứ Bảy và Chủ Nhật là ngày nghỉ"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m45-q1", "prompt": "Một tuần lễ có bao nhiêu ngày?", "ill": "/media/images/book.svg",
                    "options": [("m45-opt-7", "7 ngày", True), ("m45-opt-5", "5 ngày", False), ("m45-opt-6", "6 ngày", False)],
                    "exp": "Một tuần lễ có đúng 7 ngày."
                },
                {
                    "type": "multiple_choice", "id": "m45-q2", "prompt": "Ngày đầu tiên em đi học trong tuần là thứ mấy?", "ill": "/media/images/book.svg",
                    "options": [("m45-opt2-hai", "Thứ Hai", True), ("m45-opt2-ba", "Thứ Ba", False), ("m45-opt2-cn", "Chủ Nhật", False)],
                    "exp": "Thứ Hai là ngày đầu tuần đến trường."
                },
                {
                    "type": "matching", "id": "m45-q3", "prompt": "Nối các ngày liên tiếp trong tuần:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("m45-l1", "Sau Thứ Hai là", "m45-r1", "Thứ Ba"),
                        ("m45-l2", "Sau Thứ Tư là", "m45-r2", "Thứ Năm"),
                        ("m45-l3", "Sau Thứ Bảy là", "m45-r3", "Chủ Nhật")
                    ],
                    "exp": "Thứ Hai đến Thứ Ba; Thứ Tư đến Thứ Năm; Thứ Bảy đến Chủ Nhật."
                },
                {
                    "type": "tap_place", "id": "m45-q4", "prompt": "Điền từ: 'Hai ngày nghỉ cuối tuần là Thứ Bảy và ...'", "ill": "/media/images/house.svg",
                    "target": ("m45-t1", "...", "Thứ Bảy và ", "."),
                    "items": [("m45-i1", "Chủ Nhật"), ("m45-i2", "Thứ Sáu")], "correct_item": "m45-i1",
                    "exp": "Hai ngày nghỉ cuối tuần là Thứ Bảy và Chủ Nhật."
                },
                {
                    "type": "number_select", "id": "m45-q5", "prompt": "Trong một tuần, em đi học 5 ngày. Em được nghỉ mấy ngày cuối tuần?", "ill": "/media/images/book.svg",
                    "expr": "7 - 5 = ?", "choices": [1, 2, 3, 4], "ans": 2,
                    "exp": "7 - 5 = 2 ngày nghỉ cuối tuần."
                },
                {
                    "type": "multiple_choice", "id": "m45-q6", "prompt": "Hôm nay là Thứ Tư, ngày mai là thứ mấy?", "ill": "/media/images/book.svg",
                    "options": [("m45-opt6-nam", "Thứ Năm", True), ("m45-opt6-ba", "Thứ Ba", False), ("m45-opt6-sau", "Thứ Sáu", False)],
                    "exp": "Ngày mai của Thứ Tư là Thứ Năm."
                }
            ]
        },

        # 46. Đọc thời khóa biểu
        {
            "num": 46, "id": "math-46-doc-thoi-khoa-bieu", "title": "Bài 46: Đọc thời khóa biểu lớp học",
            "desc": "Tra cứu môn học theo thứ trong tuần và theo từng tiết học trong ngày.",
            "note": "Rèn luyện tính tự lập, chuẩn bị sách vở đúng theo thời khóa biểu.",
            "intro_title": "Thời khóa biểu của em",
            "intro_body": "Thời khóa biểu giúp em biết hôm nay học những môn gì để soạn sách vở. Hàng ngang là các tiết học, cột dọc là các ngày trong tuần.",
            "bullets": ["Cột dọc: Thứ Hai, Thứ Ba...", "Hàng ngang: Tiết 1, Tiết 2, Tiết 3...", "Chuẩn bị sách vở trước khi đến lớp"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m46-q1", "prompt": "Thời khóa biểu giúp ích cho học sinh việc gì?", "ill": "/media/images/book.svg",
                    "options": [("m46-opt-dung", "Biết môn học để soạn sách vở", True), ("m46-opt-sai", "Xem phim hoạt hình", False)],
                    "exp": "Thời khóa biểu giúp em biết môn học để chuẩn bị sách vở đầy đủ."
                },
                {
                    "type": "number_select", "id": "m46-q2", "prompt": "Buổi sáng em học 4 tiết, buổi chiều học 3 tiết. Cả ngày em học mấy tiết?", "ill": "/media/images/book.svg",
                    "expr": "4 + 3 = ?", "choices": [5, 6, 7, 8], "ans": 7,
                    "exp": "4 + 3 = 7 tiết học mỗi ngày."
                },
                {
                    "type": "matching", "id": "m46-q3", "prompt": "Nối môn học với đồ dùng học tập tương ứng:", "ill": "/media/images/pencil.svg",
                    "pairs": [
                        ("m46-l1", "Tiết Toán", "m46-r1", "Vở bài tập Toán và thước kẻ"),
                        ("m46-l2", "Tiết Mỹ thuật", "m46-r2", "Hộp bút màu sáp"),
                        ("m46-l3", "Tiết Tập viết", "m46-r3", "Vở ô ly và bút chì")
                    ],
                    "exp": "Môn Toán dùng thước kẻ, Mỹ thuật dùng màu sáp, Tập viết dùng vở ô ly."
                },
                {
                    "type": "tap_place", "id": "m46-q4", "prompt": "Điền từ: 'Mỗi buổi tối em xem ... để soạn sách vở ngày mai.'", "ill": "/media/images/book.svg",
                    "target": ("m46-t1", "...", "Xem ", " để soạn sách vở."),
                    "items": [("m46-i1", "thời khóa biểu"), ("m46-i2", "đồng hồ")], "correct_item": "m46-i1",
                    "exp": "Xem thời khóa biểu để chuẩn bị sách vở."
                },
                {
                    "type": "counting", "id": "m46-q5", "prompt": "Đếm xem bé đã chuẩn bị bao nhiêu cuốn sách trong cặp?", "ill": "/media/images/book.svg",
                    "count": 5, "img": "/media/images/book.svg", "exp": "Bé đã chuẩn bị 5 cuốn sách."
                },
                {
                    "type": "multiple_choice", "id": "m46-q6", "prompt": "Nếu hôm nay có tiết Thể dục, em nên mặc trang phục gì?", "ill": "/media/images/star.svg",
                    "options": [("m46-opt-thethao", "Quần áo thể thao và giày bata", True), ("m46-opt-vay", "Váy dạ hội và giày cao gót", False)],
                    "exp": "Tiết thể dục cần mặc đồ thể thao gọn gàng và đi giày thể thao."
                }
            ]
        },

        # 47. Thực hành xem lịch và giờ
        {
            "num": 47, "id": "math-47-thuc-hanh-xem-lich", "title": "Bài 47: Thực hành Xem lịch và Giờ",
            "desc": "Kết hợp xem tờ lịch ngày (thứ, ngày, tháng) và mặt đồng hồ kim trong sinh hoạt hàng ngày.",
            "note": "Quan sát tờ lịch treo tường: số to ở giữa là ngày, chữ ở trên là thứ.",
            "intro_title": "Tờ lịch và chiếc đồng hồ",
            "intro_body": "Tờ lịch bóc mỗi ngày cho em biết hôm nay là thứ mấy, ngày bao nhiêu. Kết hợp với đồng hồ giúp em sắp xếp thời gian biểu thật khoa học!",
            "bullets": ["Số lớn ở giữa tờ lịch là ngày trong tháng", "Chữ phía trên là thứ trong tuần", "Đồng hồ chỉ giờ làm việc và học tập"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "m47-q1", "prompt": "Trên tờ lịch ngày, chữ số to nhất ở chính giữa chỉ điều gì?", "ill": "/media/images/book.svg",
                    "options": [("m47-opt-ngay", "Ngày trong tháng", True), ("m47-opt-thu", "Thứ trong tuần", False), ("m47-opt-gio", "Giờ trong ngày", False)],
                    "exp": "Số to nhất ở giữa tờ lịch chỉ ngày trong tháng."
                },
                {
                    "type": "matching", "id": "m47-q2", "prompt": "Nối mốc thời gian với hoạt động ý nghĩa:", "ill": "/media/images/flower.svg",
                    "pairs": [
                        ("m47-l1", "Ngày 20 tháng 11", "m47-r1", "Ngày Nhà giáo Việt Nam"),
                        ("m47-l2", "Ngày 1 tháng 6", "m47-r2", "Ngày Quốc tế Thiếu nhi"),
                        ("m47-l3", "Ngày 2 tháng 9", "m47-r3", "Ngày Quốc khánh Việt Nam")
                    ],
                    "exp": "20/11: Ngày Nhà giáo; 1/6: Thiếu nhi; 2/9: Quốc khánh."
                },
                {
                    "type": "tap_place", "id": "m47-q3", "prompt": "Điền từ: 'Hôm nay là ngày 15, ngày mai sẽ là ngày ...'", "ill": "/media/images/book.svg",
                    "target": ("m47-t1", "...", "Ngày mai là ngày ", "."),
                    "items": [("m47-i1", "16"), ("m47-i2", "14")], "correct_item": "m47-i1",
                    "exp": "Ngày mai là ngày liền sau: 15 + 1 = 16."
                },
                {
                    "type": "number_select", "id": "m47-q4", "prompt": "Đồng hồ chỉ 3 giờ chiều, bé học đàn trong 1 giờ. Bé học xong lúc mấy giờ?", "ill": "/media/images/star.svg",
                    "expr": "3 + 1 = ?", "choices": [4, 5, 6, 7], "ans": 4,
                    "exp": "3 + 1 = 4 giờ chiều."
                },
                {
                    "type": "counting", "id": "m47-q5", "prompt": "Đếm xem có bao nhiêu tờ lịch trên bàn?", "ill": "/media/images/book.svg",
                    "count": 7, "img": "/media/images/book.svg", "exp": "Có đúng 7 tờ lịch tượng trưng cho 7 ngày."
                },
                {
                    "type": "multiple_choice", "id": "m47-q6", "prompt": "Mỗi ngày chúng mình xé mấy tờ lịch ngày?", "ill": "/media/images/book.svg",
                    "options": [("m47-opt-1to", "1 tờ lịch", True), ("m47-opt-2to", "2 tờ lịch", False)],
                    "exp": "Mỗi ngày trôi qua chúng mình bóc 1 tờ lịch."
                }
            ]
        },

        # 48. BOSS: Hình học và Đo lường cuối năm
        {
            "num": 48, "id": "math-48-boss-hinh-do-luong", "title": "Bài 48: BOSS Đấu Trường Hình Học & Đo Lường",
            "desc": "Tổng kết toàn diện học phần Hình học, Độ dài xăng-ti-mét và Thời gian lớp 1.",
            "note": "Bài học khép lại toàn bộ 48 bài giảng Toán Lớp 1 chuẩn GDPT 2018.",
            "intro_title": "Đấu trường Vua Hình học",
            "intro_body": "Chúc mừng các dũng sĩ nhí đã đi đến chặng cuối cùng của môn Toán Lớp 1! Hãy vượt qua thử thách này để nhận Huy hiệu Toán học Xuất sắc nhé!",
            "bullets": ["Đo độ dài chính xác bằng thước cm", "Xem giờ đồng hồ thành thạo", "Phân biệt khối hình phẳng và hình khối"],
            "questions": [
                {
                    "type": "number_select", "id": "m48-q1", "prompt": "Đoạn dây dài 30cm, cắt bớt 10cm. Đoạn dây còn lại dài bao nhiêu cm?", "ill": "/media/images/ruler.svg",
                    "expr": "30 - 10 = ?", "choices": [15, 20, 25, 30], "ans": 20,
                    "exp": "30cm - 10cm = 20cm."
                },
                {
                    "type": "multiple_choice", "id": "m48-q2", "prompt": "Đồng hồ chỉ đúng 12 giờ trưa. Kim ngắn và kim dài ở vị trí nào?", "ill": "/media/images/star.svg",
                    "options": [("m48-opt-chapp", "Cả 2 kim cùng chỉ vào số 12", True), ("m48-opt-lech", "Kim ngắn số 12, kim dài số 6", False)],
                    "exp": "Đúng 12 giờ thì cả kim ngắn và kim dài đều chỉ số 12 trùng nhau."
                },
                {
                    "type": "matching", "id": "m48-q3", "prompt": "Nối đơn vị đo với đại lượng tương ứng:", "ill": "/media/images/ruler.svg",
                    "pairs": [
                        ("m48-l1", "Xăng-ti-mét (cm)", "m48-r1", "Đo độ dài vật thể"),
                        ("m48-l2", "Giờ", "m48-r2", "Đo thời gian trong ngày"),
                        ("m48-l3", "Khối lập phương", "m48-r3", "Hình khối có 6 mặt vuông")
                    ],
                    "exp": "cm đo độ dài, giờ đo thời gian, khối lập phương có 6 mặt vuông."
                },
                {
                    "type": "tap_place", "id": "m48-q4", "prompt": "Tính: 40cm + 25cm = ...", "ill": "/media/images/ruler.svg",
                    "target": ("m48-t1", "...", "40cm + 25cm = ", ""),
                    "items": [("m48-i1", "65cm"), ("m48-i2", "60cm")], "correct_item": "m48-i1",
                    "exp": "40cm + 25cm = 65cm."
                },
                {
                    "type": "counting", "id": "m48-q5", "prompt": "Đếm xem có bao nhiêu chiếc cúp vinh quang?", "ill": "/media/images/star.svg",
                    "count": 5, "img": "/media/images/star.svg", "exp": "Có đúng 5 chiếc cúp vinh quang dành tặng bé!"
                },
                {
                    "type": "number_select", "id": "m48-q6", "prompt": "Hôm nay là Thứ Hai ngày 10, vậy Thứ Tư cùng tuần là ngày bao nhiêu?", "ill": "/media/images/book.svg",
                    "expr": "10 + 2 = ?", "choices": [11, 12, 13, 14], "ans": 12,
                    "exp": "Từ Thứ Hai đến Thứ Tư cách 2 ngày: 10 + 2 = ngày 12."
                }
            ]
        }
    ]
    return specs
