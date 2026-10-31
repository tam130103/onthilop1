# -*- coding: utf-8 -*-
"""
Math Lessons 09 to 20 definitions.
All answers mathematically exact; rich interactive Grade 1 gameplay.
"""

def get_math_lessons_part2():
    lessons = []

    # =========================================================================
    # MATH 09: Tia số và thứ tự các số đến 10
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-09-number-line-10",
        "title": "Tia số và thứ tự các số đến 10",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Làm quen với tia số, xác định số liền trước, số liền sau và thứ tự các số từ 0 đến 10.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m9-slide-title",
                "title": "Tia số và thứ tự các số đến 10",
                "subtitle": "Toán Lớp 1 — Bài học tương tác",
                "teacherNote": "Chỉ trên tia số để học sinh thấy các số tăng dần từ trái sang phải.",
                "backgroundImage": "/media/images/star.svg",
                "audio": "/media/tts/m9-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m9-slide-intro",
                "title": "Tia số là gì?",
                "body": "Tia số bắt đầu từ vạch số 0. Từ trái sang phải, các số lớn dần: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                "teacherNote": "Số đứng ngay trước gọi là số liền trước, số đứng ngay sau gọi là số liền sau.",
                "illustration": "/media/images/pencil.svg",
                "audio": "/media/tts/m9-intro.mp3",
                "bullets": [
                    "Số liền trước của 5 là 4",
                    "Số liền sau của 5 là 6",
                    "Số 0 là số bé nhất trên tia số"
                ]
            },
            {
                "type": "question-slide",
                "id": "m9-slide-q1",
                "teacherNote": "Số liền sau của 7",
                "question": {
                    "type": "number_select",
                    "id": "m9-q1-ns",
                    "prompt": "Số liền sau của số 7 là số nào?",
                    "promptAudio": "/media/tts/m9-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "expression": "7 + 1 = ?",
                    "choices": [6, 7, 8, 9],
                    "correctAnswer": 8,
                    "explanation": "Số liền sau của 7 là 8.",
                    "explanationAudio": "/media/tts/m9-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m9-slide-q2",
                "teacherNote": "Số liền trước của 4",
                "question": {
                    "type": "number_select",
                    "id": "m9-q2-ns",
                    "prompt": "Số liền trước của số 4 là số nào?",
                    "promptAudio": "/media/tts/m9-q2-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "expression": "4 - 1 = ?",
                    "choices": [2, 3, 4, 5],
                    "correctAnswer": 3,
                    "explanation": "Số liền trước của 4 là 3.",
                    "explanationAudio": "/media/tts/m9-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m9-slide-q3",
                "teacherNote": "Điền số còn thiếu trên tia số",
                "question": {
                    "type": "tap_place",
                    "id": "m9-q3-tap",
                    "prompt": "Điền số thích hợp vào chỗ trống trên dãy số: 4, 5, ..., 7",
                    "promptAudio": "/media/tts/m9-q3-prompt.mp3",
                    "targets": [
                        { "id": "m9-t1", "prefix": "4, 5, ", "suffix": ", 7", "label": "Số ở giữa" }
                    ],
                    "items": [
                        { "id": "m9-i1", "text": "6", "audio": "/media/tts/m9-num-6.mp3" },
                        { "id": "m9-i2", "text": "8", "audio": "/media/tts/m9-num-8.mp3" },
                        { "id": "m9-i3", "text": "9", "audio": "/media/tts/m9-num-9.mp3" }
                    ],
                    "correctMapping": { "m9-t1": "m9-i1" },
                    "explanation": "Dãy số liên tiếp là 4, 5, 6, 7.",
                    "explanationAudio": "/media/tts/m9-q3-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m9-slide-q4",
                "teacherNote": "Nối số liền trước và liền sau",
                "question": {
                    "type": "matching",
                    "id": "m9-q4-matching",
                    "prompt": "Nối số với số liền sau của nó:",
                    "promptAudio": "/media/tts/m9-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m9-l1", "text": "Số 2", "audio": "/media/tts/m9-lbl-so2.mp3" },
                        { "id": "m9-l2", "text": "Số 5", "audio": "/media/tts/m9-lbl-so5.mp3" },
                        { "id": "m9-l3", "text": "Số 9", "audio": "/media/tts/m9-lbl-so9.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m9-r1", "text": "Liền sau là 3", "audio": "/media/tts/m9-lbl-ls3.mp3" },
                        { "id": "m9-r2", "text": "Liền sau là 6", "audio": "/media/tts/m9-lbl-ls6.mp3" },
                        { "id": "m9-r3", "text": "Liền sau là 10", "audio": "/media/tts/m9-lbl-ls10.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m9-l1", "rightId": "m9-r1" },
                        { "leftId": "m9-l2", "rightId": "m9-r2" },
                        { "leftId": "m9-l3", "rightId": "m9-r3" }
                    ],
                    "explanation": "Liền sau của 2 là 3, của 5 là 6, của 9 là 10.",
                    "explanationAudio": "/media/tts/m9-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m9-slide-q5",
                "teacherNote": "Sắp xếp từ bé đến lớn",
                "question": {
                    "type": "multiple_choice",
                    "id": "m9-q5-mc",
                    "prompt": "Dãy số nào được xếp theo thứ tự từ bé đến lớn?",
                    "promptAudio": "/media/tts/m9-q5-prompt.mp3",
                    "illustration": "/media/images/tree.svg",
                    "options": [
                        { "id": "m9-opt-a", "label": "2, 4, 7, 9", "audio": "/media/tts/m9-opt-day-dung.mp3", "isCorrect": True },
                        { "id": "m9-opt-b", "label": "9, 7, 4, 2", "audio": "/media/tts/m9-opt-day-sai1.mp3", "isCorrect": False },
                        { "id": "m9-opt-c", "label": "4, 2, 7, 9", "audio": "/media/tts/m9-opt-day-sai2.mp3", "isCorrect": False }
                    ],
                    "explanation": "Dãy số 2, 4, 7, 9 được xếp từ bé đến lớn.",
                    "explanationAudio": "/media/tts/m9-q5-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m9-slide-q6",
                "teacherNote": "Đếm bút chì",
                "question": {
                    "type": "counting",
                    "id": "m9-q6-counting",
                    "prompt": "Đếm xem có bao nhiêu chiếc bút chì?",
                    "promptAudio": "/media/tts/m9-q6-prompt.mp3",
                    "illustration": "/media/images/pencil.svg",
                    "items": [
                        { "image": "/media/images/pencil.svg", "alt": "Bút 1" },
                        { "image": "/media/images/pencil.svg", "alt": "Bút 2" },
                        { "image": "/media/images/pencil.svg", "alt": "Bút 3" },
                        { "image": "/media/images/pencil.svg", "alt": "Bút 4" },
                        { "image": "/media/images/pencil.svg", "alt": "Bút 5" },
                        { "image": "/media/images/pencil.svg", "alt": "Bút 6" }
                    ],
                    "correctCount": 6,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có đúng 6 chiếc bút chì xinh xắn.",
                    "explanationAudio": "/media/tts/m9-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 10: Khối lập phương & Khối hộp chữ nhật
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-10-3d-shapes",
        "title": "Khối lập phương & Khối hộp chữ nhật",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Làm quen hình khối không gian, phân biệt khối lập phương và khối hộp chữ nhật trong thực tế.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m10-slide-title",
                "title": "Khối lập phương & Khối hộp chữ nhật",
                "subtitle": "Toán Lớp 1 — Hình học không gian",
                "teacherNote": "Cho học sinh quan sát con xúc xắc và hộp sữa.",
                "backgroundImage": "/media/images/square.svg",
                "audio": "/media/tts/m10-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m10-slide-intro",
                "title": "Nhận biết các hình khối",
                "body": "Con xúc xắc có dạng khối lập phương với các mặt là hình vuông. Hộp sữa, viên gạch có dạng khối hộp chữ nhật.",
                "teacherNote": "Nhấn mạnh sự khác nhau giữa mặt hình vuông và mặt hình chữ nhật.",
                "illustration": "/media/images/milk.svg",
                "audio": "/media/tts/m10-intro.mp3",
                "bullets": [
                    "Con xúc xắc: Khối lập phương",
                    "Hộp sữa: Khối hộp chữ nhật",
                    "Hộp bánh: Khối hộp chữ nhật"
                ]
            },
            {
                "type": "question-slide",
                "id": "m10-slide-q1",
                "teacherNote": "Đồ vật dạng khối lập phương",
                "question": {
                    "type": "multiple_choice",
                    "id": "m10-q1-mc",
                    "prompt": "Đồ vật nào dưới đây có dạng khối lập phương?",
                    "promptAudio": "/media/tts/m10-q1-prompt.mp3",
                    "illustration": "/media/images/square.svg",
                    "options": [
                        { "id": "m10-opt-xucxac", "label": "Con xúc xắc", "audio": "/media/tts/m10-opt-xuc-xac.mp3", "isCorrect": True },
                        { "id": "m10-opt-hopsua", "label": "Hộp sữa tươi", "audio": "/media/tts/m10-opt-hop-sua.mp3", "isCorrect": False },
                        { "id": "m10-opt-quabong", "label": "Quả bóng đá", "audio": "/media/tts/m10-opt-qua-bong.mp3", "isCorrect": False }
                    ],
                    "explanation": "Con xúc xắc có các mặt đều là hình vuông, đó là khối lập phương.",
                    "explanationAudio": "/media/tts/m10-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m10-slide-q2",
                "teacherNote": "Đồ vật dạng khối hộp chữ nhật",
                "question": {
                    "type": "multiple_choice",
                    "id": "m10-q2-mc",
                    "prompt": "Hộp sữa tươi có dạng hình khối gì?",
                    "promptAudio": "/media/tts/m10-q2-prompt.mp3",
                    "illustration": "/media/images/milk.svg",
                    "options": [
                        { "id": "m10-opt-hhcn", "label": "Khối hộp chữ nhật", "audio": "/media/tts/m10-opt-hhcn.mp3", "isCorrect": True },
                        { "id": "m10-opt-klp", "label": "Khối lập phương", "audio": "/media/tts/m10-opt-klp.mp3", "isCorrect": False },
                        { "id": "m10-opt-ht", "label": "Hình tròn", "audio": "/media/tts/m10-opt-htron.mp3", "isCorrect": False }
                    ],
                    "explanation": "Hộp sữa tươi có dạng khối hộp chữ nhật.",
                    "explanationAudio": "/media/tts/m10-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m10-slide-q3",
                "teacherNote": "Nối đồ vật với dạng hình khối",
                "question": {
                    "type": "matching",
                    "id": "m10-q3-matching",
                    "prompt": "Nối đồ vật với hình khối tương ứng:",
                    "promptAudio": "/media/tts/m10-q3-prompt.mp3",
                    "leftColumn": [
                        { "id": "m10-l1", "text": "Khối ru-bích", "audio": "/media/tts/m10-lbl-rubik.mp3" },
                        { "id": "m10-l2", "text": "Bao diêm", "audio": "/media/tts/m10-lbl-baodiem.mp3" },
                        { "id": "m10-l3", "text": "Quyển sách", "audio": "/media/tts/m10-lbl-quyensach.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m10-r1", "text": "Khối lập phương", "audio": "/media/tts/m10-lbl-klp.mp3" },
                        { "id": "m10-r2", "text": "Khối hộp chữ nhật", "audio": "/media/tts/m10-lbl-khcn.mp3" },
                        { "id": "m10-r3", "text": "Dạng hộp chữ nhật", "audio": "/media/tts/m10-lbl-dhcn.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m10-l1", "rightId": "m10-r1" },
                        { "leftId": "m10-l2", "rightId": "m10-r2" },
                        { "leftId": "m10-l3", "rightId": "m10-r3" }
                    ],
                    "explanation": "Khối rubik là khối lập phương, bao diêm và quyển sách là khối hộp chữ nhật.",
                    "explanationAudio": "/media/tts/m10-q3-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m10-slide-q4",
                "teacherNote": "Điền từ còn thiếu",
                "question": {
                    "type": "tap_place",
                    "id": "m10-q4-tap",
                    "prompt": "Chọn tên khối thích hợp điền vào câu sau:",
                    "promptAudio": "/media/tts/m10-q4-prompt.mp3",
                    "targets": [
                        { "id": "m10-t1", "prefix": "Con xúc xắc có dạng khối ", "suffix": ".", "label": "Tên khối" }
                    ],
                    "items": [
                        { "id": "m10-i1", "text": "lập phương", "audio": "/media/tts/m10-word-lap-phuong.mp3" },
                        { "id": "m10-i2", "text": "chữ nhật", "audio": "/media/tts/m10-word-chu-nhat.mp3" },
                        { "id": "m10-i3", "text": "hình tròn", "audio": "/media/tts/m10-word-hinh-tron.mp3" }
                    ],
                    "correctMapping": { "m10-t1": "m10-i1" },
                    "explanation": "Con xúc xắc có dạng khối lập phương.",
                    "explanationAudio": "/media/tts/m10-q4-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m10-slide-q5",
                "teacherNote": "Đếm số khối lập phương",
                "question": {
                    "type": "counting",
                    "id": "m10-q5-counting",
                    "prompt": "Đếm xem có bao nhiêu khối hình vuông trên màn hình?",
                    "promptAudio": "/media/tts/m10-q5-prompt.mp3",
                    "illustration": "/media/images/square.svg",
                    "items": [
                        { "image": "/media/images/square.svg", "alt": "Khối 1" },
                        { "image": "/media/images/square.svg", "alt": "Khối 2" },
                        { "image": "/media/images/square.svg", "alt": "Khối 3" },
                        { "image": "/media/images/square.svg", "alt": "Khối 4" },
                        { "image": "/media/images/square.svg", "alt": "Khối 5" }
                    ],
                    "correctCount": 5,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có tất cả 5 khối hình vuông.",
                    "explanationAudio": "/media/tts/m10-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m10-slide-q6",
                "teacherNote": "Đếm số mặt",
                "question": {
                    "type": "number_select",
                    "id": "m10-q6-ns",
                    "prompt": "Khối lập phương có tất cả mấy mặt?",
                    "promptAudio": "/media/tts/m10-q6-prompt.mp3",
                    "illustration": "/media/images/square.svg",
                    "expression": "4 + 2 = ?",
                    "choices": [4, 5, 6, 8],
                    "correctAnswer": 6,
                    "explanation": "Khối lập phương có đúng 6 mặt bằng nhau.",
                    "explanationAudio": "/media/tts/m10-q6-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 11: Vị trí & Định hướng không gian
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-11-spatial-orientation",
        "title": "Vị trí & Định hướng không gian",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Xác định vị trí trên – dưới, phải – trái, trước – sau và ở giữa.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m11-slide-title",
                "title": "Vị trí và Định hướng không gian",
                "subtitle": "Toán Lớp 1 — Bài học tương tác",
                "teacherNote": "Dạy học sinh phân biệt tay phải, tay trái và đồ vật xung quanh.",
                "backgroundImage": "/media/images/flag.svg",
                "audio": "/media/tts/m11-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m11-slide-intro",
                "title": "Phải, Trái, Trên, Dưới",
                "body": "Tay phải cầm bút, tay trái giữ vở. Đèn trần ở phía trên, sàn nhà ở phía dưới. Cùng cô xác định vị trí đồ vật nhé!",
                "teacherNote": "Cho cả lớp cùng giơ tay phải, rồi giơ tay trái.",
                "illustration": "/media/images/flag.svg",
                "audio": "/media/tts/m11-intro.mp3",
                "bullets": [
                    "Tay phải cầm bút viết bài",
                    "Tay trái đặt nhẹ giữ trang vở",
                    "Phía trên và phía dưới"
                ]
            },
            {
                "type": "question-slide",
                "id": "m11-slide-q1",
                "teacherNote": "Xác định vị trí trên",
                "question": {
                    "type": "multiple_choice",
                    "id": "m11-q1-mc",
                    "prompt": "Mặt trời ở phía nào so với mặt đất?",
                    "promptAudio": "/media/tts/m11-q1-prompt.mp3",
                    "illustration": "/media/images/sun.svg",
                    "options": [
                        { "id": "m11-opt-tren", "label": "Ở phía trên", "audio": "/media/tts/m11-opt-phia-tren.mp3", "isCorrect": True },
                        { "id": "m11-opt-duoi", "label": "Ở phía dưới", "audio": "/media/tts/m11-opt-phia-duoi.mp3", "isCorrect": False },
                        { "id": "m11-opt-sau", "label": "Ở phía sau", "audio": "/media/tts/m11-opt-phia-sau.mp3", "isCorrect": False }
                    ],
                    "explanation": "Mặt trời chiếu sáng trên bầu trời cao, tức là ở phía trên.",
                    "explanationAudio": "/media/tts/m11-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m11-slide-q2",
                "teacherNote": "Nối vị trí đối nghịch",
                "question": {
                    "type": "matching",
                    "id": "m11-q2-matching",
                    "prompt": "Nối các cặp từ chỉ vị trí đối nhau:",
                    "promptAudio": "/media/tts/m11-q2-prompt.mp3",
                    "leftColumn": [
                        { "id": "m11-l1", "text": "Bên phải", "audio": "/media/tts/m11-lbl-ben-phai.mp3" },
                        { "id": "m11-l2", "text": "Phía trên", "audio": "/media/tts/m11-lbl-phia-tren.mp3" },
                        { "id": "m11-l3", "text": "Đằng trước", "audio": "/media/tts/m11-lbl-dang-truoc.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m11-r1", "text": "Bên trái", "audio": "/media/tts/m11-lbl-ben-trai.mp3" },
                        { "id": "m11-r2", "text": "Phía dưới", "audio": "/media/tts/m11-lbl-phia-duoi.mp3" },
                        { "id": "m11-r3", "text": "Đằng sau", "audio": "/media/tts/m11-lbl-dang-sau.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m11-l1", "rightId": "m11-r1" },
                        { "leftId": "m11-l2", "rightId": "m11-r2" },
                        { "leftId": "m11-l3", "rightId": "m11-r3" }
                    ],
                    "explanation": "Phải đối với trái, trên đối với dưới, trước đối với sau.",
                    "explanationAudio": "/media/tts/m11-q2-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m11-slide-q3",
                "teacherNote": "Điền từ chỉ vị trí",
                "question": {
                    "type": "tap_place",
                    "id": "m11-q3-tap",
                    "prompt": "Chọn từ thích hợp điền vào câu: Em cầm bút bằng tay ...",
                    "promptAudio": "/media/tts/m11-q3-prompt.mp3",
                    "targets": [
                        { "id": "m11-t1", "prefix": "Em cầm bút bằng tay ", "suffix": ".", "label": "Tên tay" }
                    ],
                    "items": [
                        { "id": "m11-i1", "text": "phải", "audio": "/media/tts/m11-word-phai.mp3" },
                        { "id": "m11-i2", "text": "trái", "audio": "/media/tts/m11-word-trai.mp3" },
                        { "id": "m11-i3", "text": "dưới", "audio": "/media/tts/m11-word-duoi.mp3" }
                    ],
                    "correctMapping": { "m11-t1": "m11-i1" },
                    "explanation": "Học sinh thuận tay phải cầm bút bằng tay phải.",
                    "explanationAudio": "/media/tts/m11-q3-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m11-slide-q4",
                "teacherNote": "Đếm chim bay trên cây",
                "question": {
                    "type": "counting",
                    "id": "m11-q4-counting",
                    "prompt": "Đếm xem có bao nhiêu chú chim đang bay phía trên cành cây?",
                    "promptAudio": "/media/tts/m11-q4-prompt.mp3",
                    "illustration": "/media/images/bird.svg",
                    "items": [
                        { "image": "/media/images/bird.svg", "alt": "Chim 1" },
                        { "image": "/media/images/bird.svg", "alt": "Chim 2" },
                        { "image": "/media/images/bird.svg", "alt": "Chim 3" },
                        { "image": "/media/images/bird.svg", "alt": "Chim 4" }
                    ],
                    "correctCount": 4,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có đúng 4 chú chim đang bay lượn.",
                    "explanationAudio": "/media/tts/m11-q4-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m11-slide-q5",
                "teacherNote": "Xác định đồ vật ở giữa",
                "question": {
                    "type": "multiple_choice",
                    "id": "m11-q5-mc",
                    "prompt": "Trong ba bạn: An, Bình, Cúc xếp hàng từ trái sang phải, bạn nào ở giữa?",
                    "promptAudio": "/media/tts/m11-q5-prompt.mp3",
                    "illustration": "/media/images/chair.svg",
                    "options": [
                        { "id": "m11-opt-binh", "label": "Bạn Bình", "audio": "/media/tts/m11-opt-ban-binh.mp3", "isCorrect": True },
                        { "id": "m11-opt-an", "label": "Bạn An", "audio": "/media/tts/m11-opt-ban-an.mp3", "isCorrect": False },
                        { "id": "m11-opt-cuc", "label": "Bạn Cúc", "audio": "/media/tts/m11-opt-ban-cuc.mp3", "isCorrect": False }
                    ],
                    "explanation": "Bạn Bình đứng giữa bạn An và bạn Cúc.",
                    "explanationAudio": "/media/tts/m11-q5-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m11-slide-q6",
                "teacherNote": "Tính nhẩm vị trí",
                "question": {
                    "type": "number_select",
                    "id": "m11-q6-ns",
                    "prompt": "Bên phải có 3 bạn, bên trái có 2 bạn. Có tất cả mấy bạn?",
                    "promptAudio": "/media/tts/m11-q6-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "expression": "3 + 2 = ?",
                    "choices": [4, 5, 6, 7],
                    "correctAnswer": 5,
                    "explanation": "Ba bạn cộng hai bạn là năm bạn. 3 + 2 = 5.",
                    "explanationAudio": "/media/tts/m11-q6-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 12: Ôn tập học kỳ 1 (Cộng trừ phạm vi 10 & Hình học)
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-12-review-term1",
        "title": "Ôn tập học kỳ 1: Cộng trừ phạm vi 10 & Hình học",
        "subject": "math",
        "grade": 1,
        "description": "Bài ôn tập tổng kết học kỳ 1: Củng cố bảng cộng trừ trong phạm vi 10 và nhận biết các hình đã học.",
        "totalDurationMinutes": 30,
        "slides": [
            {
                "type": "title-slide",
                "id": "m12-slide-title",
                "title": "Ôn tập học kỳ 1: Toán Lớp 1",
                "subtitle": "Bảng cộng trừ phạm vi 10 & Hình học",
                "teacherNote": "Tổng kết kiến thức học kỳ 1 cho cả lớp.",
                "backgroundImage": "/media/images/star.svg",
                "audio": "/media/tts/m12-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m12-slide-intro",
                "title": "Cùng Chinh Phục Học Kỳ 1",
                "body": "Chúng mình đã học đếm đến 10, cộng trừ thành thạo và nhận biết hình vuông, tròn, tam giác, chữ nhật. Hãy cùng vượt qua các thử thách hôm nay nhé!",
                "teacherNote": "Khích lệ tinh thần thi đua giữa 4 đội.",
                "illustration": "/media/images/flag.svg",
                "audio": "/media/tts/m12-intro.mp3",
                "bullets": [
                    "Cộng trừ nhanh trong phạm vi 10",
                    "Nhận diện đúng các hình phẳng và hình khối",
                    "Giải toán có lời văn đơn giản"
                ]
            },
            {
                "type": "question-slide",
                "id": "m12-slide-q1",
                "teacherNote": "Tính 4 + 6",
                "question": {
                    "type": "number_select",
                    "id": "m12-q1-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m12-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "expression": "4 + 6 = ?",
                    "choices": [8, 9, 10, 7],
                    "correctAnswer": 10,
                    "explanation": "Bốn cộng sáu bằng mười.",
                    "explanationAudio": "/media/tts/m12-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m12-slide-q2",
                "teacherNote": "Tính 10 - 7",
                "question": {
                    "type": "number_select",
                    "id": "m12-q2-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m12-q2-prompt.mp3",
                    "illustration": "/media/images/fish.svg",
                    "expression": "10 - 7 = ?",
                    "choices": [2, 3, 4, 5],
                    "correctAnswer": 3,
                    "explanation": "Mười trừ bảy bằng ba.",
                    "explanationAudio": "/media/tts/m12-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m12-slide-q3",
                "teacherNote": "Hình có 3 cạnh",
                "question": {
                    "type": "multiple_choice",
                    "id": "m12-q3-mc",
                    "prompt": "Hình nào có đúng 3 cạnh và 3 đỉnh?",
                    "promptAudio": "/media/tts/m12-q3-prompt.mp3",
                    "illustration": "/media/images/triangle.svg",
                    "options": [
                        { "id": "m12-opt-tamgiac", "label": "Hình tam giác", "audio": "/media/tts/m12-opt-tam-giac.mp3", "isCorrect": True },
                        { "id": "m12-opt-vuong", "label": "Hình vuông", "audio": "/media/tts/m12-opt-hinh-vuong.mp3", "isCorrect": False },
                        { "id": "m12-opt-tron", "label": "Hình tròn", "audio": "/media/tts/m12-opt-hinh-tron.mp3", "isCorrect": False }
                    ],
                    "explanation": "Hình tam giác có đúng 3 cạnh và 3 đỉnh.",
                    "explanationAudio": "/media/tts/m12-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m12-slide-q4",
                "teacherNote": "Nối phép tính có cùng kết quả",
                "question": {
                    "type": "matching",
                    "id": "m12-q4-matching",
                    "prompt": "Nối phép tính với kết quả đúng:",
                    "promptAudio": "/media/tts/m12-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m12-l1", "text": "5 + 3", "audio": "/media/tts/m12-lbl-5cong3.mp3" },
                        { "id": "m12-l2", "text": "9 - 5", "audio": "/media/tts/m12-lbl-9tru5.mp3" },
                        { "id": "m12-l3", "text": "7 + 2", "audio": "/media/tts/m12-lbl-7cong2.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m12-r1", "text": "Bằng 8", "audio": "/media/tts/m12-lbl-bang-8.mp3" },
                        { "id": "m12-r2", "text": "Bằng 4", "audio": "/media/tts/m12-lbl-bang-4.mp3" },
                        { "id": "m12-r3", "text": "Bằng 9", "audio": "/media/tts/m12-lbl-bang-9.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m12-l1", "rightId": "m12-r1" },
                        { "leftId": "m12-l2", "rightId": "m12-r2" },
                        { "leftId": "m12-l3", "rightId": "m12-r3" }
                    ],
                    "explanation": "5 + 3 = 8, 9 - 5 = 4, 7 + 2 = 9.",
                    "explanationAudio": "/media/tts/m12-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m12-slide-q5",
                "teacherNote": "Điền số vào phép tính liên tiếp",
                "question": {
                    "type": "tap_place",
                    "id": "m12-q5-tap",
                    "prompt": "Tính: 3 + 4 + 2 = ?",
                    "promptAudio": "/media/tts/m12-q5-prompt.mp3",
                    "targets": [
                        { "id": "m12-t1", "prefix": "3 + 4 + 2 = ", "suffix": "", "label": "Kết quả" }
                    ],
                    "items": [
                        { "id": "m12-i1", "text": "9", "audio": "/media/tts/m12-num-9.mp3" },
                        { "id": "m12-i2", "text": "8", "audio": "/media/tts/m12-num-8.mp3" },
                        { "id": "m12-i3", "text": "10", "audio": "/media/tts/m12-num-10.mp3" }
                    ],
                    "correctMapping": { "m12-t1": "m12-i1" },
                    "explanation": "3 cộng 4 bằng 7, 7 cộng 2 bằng 9.",
                    "explanationAudio": "/media/tts/m12-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m12-slide-q6",
                "teacherNote": "Đếm ngôi sao thưởng",
                "question": {
                    "type": "counting",
                    "id": "m12-q6-counting",
                    "prompt": "Đếm xem có bao nhiêu ngôi sao vàng trên màn hình?",
                    "promptAudio": "/media/tts/m12-q6-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "items": [
                        { "image": "/media/images/star.svg", "alt": "Sao 1" },
                        { "image": "/media/images/star.svg", "alt": "Sao 2" },
                        { "image": "/media/images/star.svg", "alt": "Sao 3" },
                        { "image": "/media/images/star.svg", "alt": "Sao 4" },
                        { "image": "/media/images/star.svg", "alt": "Sao 5" },
                        { "image": "/media/images/star.svg", "alt": "Sao 6" },
                        { "image": "/media/images/star.svg", "alt": "Sao 7" },
                        { "image": "/media/images/star.svg", "alt": "Sao 8" },
                        { "image": "/media/images/star.svg", "alt": "Sao 9" },
                        { "image": "/media/images/star.svg", "alt": "Sao 10" }
                    ],
                    "correctCount": 10,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có tất cả 10 ngôi sao vàng tỏa sáng rực rỡ!",
                    "explanationAudio": "/media/tts/m12-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 13: Các số tròn chục (10 đến 90) và Cộng trừ số tròn chục
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-13-tron-chuc",
        "title": "Các số tròn chục và Cộng trừ số tròn chục",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Làm quen các số tròn chục từ 10 đến 90 và thực hành cộng trừ các số tròn chục nhanh chóng.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m13-slide-title",
                "title": "Các số tròn chục (10 đến 90)",
                "subtitle": "Toán Lớp 1 — Bài học tương tác",
                "teacherNote": "Dùng thanh 10 khối lập phương để minh họa 1 chục, 2 chục...",
                "backgroundImage": "/media/images/ten-rod.svg",
                "audio": "/media/tts/m13-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m13-slide-intro",
                "title": "Khám phá các số tròn chục",
                "body": "10 là một chục, 20 là hai chục, 30 là ba chục, ..., 90 là chín chục. Muốn cộng trừ các số tròn chục, ta cộng trừ chữ số hàng chục và thêm số 0 ở sau!",
                "teacherNote": "Ví dụ: 2 chục + 3 chục = 5 chục (20 + 30 = 50).",
                "illustration": "/media/images/ten-rod.svg",
                "audio": "/media/tts/m13-intro.mp3",
                "bullets": [
                    "Các số tròn chục: 10, 20, 30, 40, 50, 60, 70, 80, 90",
                    "20 + 30 = 50 (2 chục + 3 chục = 5 chục)",
                    "70 - 20 = 50 (7 chục - 2 chục = 5 chục)"
                ]
            },
            {
                "type": "question-slide",
                "id": "m13-slide-q1",
                "teacherNote": "Đếm số thanh tròn chục",
                "question": {
                    "type": "counting",
                    "id": "m13-q1-counting",
                    "prompt": "Mỗi thanh có 10 khối. Có tất cả bao nhiêu khối lập phương?",
                    "promptAudio": "/media/tts/m13-q1-prompt.mp3",
                    "illustration": "/media/images/ten-rod.svg",
                    "items": [
                        { "image": "/media/images/ten-rod.svg", "alt": "Thanh 10 thứ 1" },
                        { "image": "/media/images/ten-rod.svg", "alt": "Thanh 10 thứ 2" },
                        { "image": "/media/images/ten-rod.svg", "alt": "Thanh 10 thứ 3" }
                    ],
                    "correctCount": 3,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có 3 thanh mười khối, tức là có 30 khối lập phương.",
                    "explanationAudio": "/media/tts/m13-q1-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m13-slide-q2",
                "teacherNote": "Phép cộng 20 + 30",
                "question": {
                    "type": "number_select",
                    "id": "m13-q2-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m13-q2-prompt.mp3",
                    "illustration": "/media/images/ten-rod.svg",
                    "expression": "20 + 30 = ?",
                    "choices": [40, 50, 60, 70],
                    "correctAnswer": 50,
                    "explanation": "Hai mươi cộng ba mươi bằng năm mươi.",
                    "explanationAudio": "/media/tts/m13-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m13-slide-q3",
                "teacherNote": "Phép trừ tròn chục",
                "question": {
                    "type": "multiple_choice",
                    "id": "m13-q3-mc",
                    "prompt": "80 bớt 30 còn lại bao nhiêu?",
                    "promptAudio": "/media/tts/m13-q3-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "options": [
                        { "id": "m13-opt-50", "label": "Còn 50", "audio": "/media/tts/m13-opt-con-50.mp3", "isCorrect": True },
                        { "id": "m13-opt-40", "label": "Còn 40", "audio": "/media/tts/m13-opt-con-40.mp3", "isCorrect": False },
                        { "id": "m13-opt-60", "label": "Còn 60", "audio": "/media/tts/m13-opt-con-60.mp3", "isCorrect": False }
                    ],
                    "explanation": "8 chục trừ 3 chục còn 5 chục. 80 - 30 = 50.",
                    "explanationAudio": "/media/tts/m13-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m13-slide-q4",
                "teacherNote": "Nối phép tính tròn chục với kết quả",
                "question": {
                    "type": "matching",
                    "id": "m13-q4-matching",
                    "prompt": "Nối phép tính với kết quả đúng:",
                    "promptAudio": "/media/tts/m13-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m13-l1", "text": "10 + 40", "audio": "/media/tts/m13-lbl-10cong40.mp3" },
                        { "id": "m13-l2", "text": "60 - 20", "audio": "/media/tts/m13-lbl-60tru20.mp3" },
                        { "id": "m13-l3", "text": "30 + 30", "audio": "/media/tts/m13-lbl-30cong30.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m13-r1", "text": "Bằng 50", "audio": "/media/tts/m13-lbl-bang-50.mp3" },
                        { "id": "m13-r2", "text": "Bằng 40", "audio": "/media/tts/m13-lbl-bang-40.mp3" },
                        { "id": "m13-r3", "text": "Bằng 60", "audio": "/media/tts/m13-lbl-bang-60.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m13-l1", "rightId": "m13-r1" },
                        { "leftId": "m13-l2", "rightId": "m13-r2" },
                        { "leftId": "m13-l3", "rightId": "m13-r3" }
                    ],
                    "explanation": "10 + 40 = 50, 60 - 20 = 40, 30 + 30 = 60.",
                    "explanationAudio": "/media/tts/m13-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m13-slide-q5",
                "teacherNote": "Phép tính 90 - 40",
                "question": {
                    "type": "number_select",
                    "id": "m13-q5-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m13-q5-prompt.mp3",
                    "illustration": "/media/images/circle.svg",
                    "expression": "90 - 40 = ?",
                    "choices": [40, 50, 60, 30],
                    "correctAnswer": 50,
                    "explanation": "Chín mươi trừ bốn mươi bằng năm mươi.",
                    "explanationAudio": "/media/tts/m13-q5-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m13-slide-q6",
                "teacherNote": "Điền số tròn chục vào chỗ trống",
                "question": {
                    "type": "tap_place",
                    "id": "m13-q6-tap",
                    "prompt": "Tìm số tròn chục thích hợp để: 40 + ... = 70",
                    "promptAudio": "/media/tts/m13-q6-prompt.mp3",
                    "targets": [
                        { "id": "m13-t1", "prefix": "40 + ", "suffix": " = 70", "label": "Số tròn chục" }
                    ],
                    "items": [
                        { "id": "m13-i1", "text": "30", "audio": "/media/tts/m13-num-30.mp3" },
                        { "id": "m13-i2", "text": "20", "audio": "/media/tts/m13-num-20.mp3" },
                        { "id": "m13-i3", "text": "40", "audio": "/media/tts/m13-num-40.mp3" }
                    ],
                    "correctMapping": { "m13-t1": "m13-i1" },
                    "explanation": "Bốn mươi cộng ba mươi bằng bảy mươi.",
                    "explanationAudio": "/media/tts/m13-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 14: Các số đến 100 (Đọc, viết và cấu tạo chục – đơn vị)
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-14-den-100",
        "title": "Các số đến 100: Cấu tạo Chục – Đơn vị",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Làm quen các số đến 100, hiểu cấu tạo số gồm hàng chục và hàng đơn vị.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m14-slide-title",
                "title": "Các số đến 100: Cấu tạo Chục – Đơn vị",
                "subtitle": "Toán Lớp 1 — Bài học tương tác",
                "teacherNote": "Phân tích số có hai chữ số: chữ số đứng trước là hàng chục, chữ số đứng sau là hàng đơn vị.",
                "backgroundImage": "/media/images/ten-rod.svg",
                "audio": "/media/tts/m14-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m14-slide-intro",
                "title": "Chục và Đơn vị",
                "body": "Số 54 gồm 5 chục và 4 đơn vị. Số 100 gồm 10 chục, đọc là một trăm. 100 là số có ba chữ số bé nhất!",
                "teacherNote": "Cho học sinh đọc to các số có hai chữ số tận cùng là 1 (mốt), 4 (tư), 5 (lăm).",
                "illustration": "/media/images/book.svg",
                "audio": "/media/tts/m14-intro.mp3",
                "bullets": [
                    "54 gồm 5 chục và 4 đơn vị",
                    "71 đọc là bảy mươi mốt",
                    "85 đọc là tám mươi lăm",
                    "Số 100 gồm 10 chục"
                ]
            },
            {
                "type": "question-slide",
                "id": "m14-slide-q1",
                "teacherNote": "Cấu tạo số 54",
                "question": {
                    "type": "multiple_choice",
                    "id": "m14-q1-mc",
                    "prompt": "Số 54 gồm mấy chục và mấy đơn vị?",
                    "promptAudio": "/media/tts/m14-q1-prompt.mp3",
                    "illustration": "/media/images/book.svg",
                    "options": [
                        { "id": "m14-opt-5c4d", "label": "5 chục và 4 đơn vị", "audio": "/media/tts/m14-opt-5c4d.mp3", "isCorrect": True },
                        { "id": "m14-opt-4c5d", "label": "4 chục và 5 đơn vị", "audio": "/media/tts/m14-opt-4c5d.mp3", "isCorrect": False },
                        { "id": "m14-opt-5c0d", "label": "5 chục và 0 đơn vị", "audio": "/media/tts/m14-opt-5c0d.mp3", "isCorrect": False }
                    ],
                    "explanation": "Số 54 có chữ số 5 ở hàng chục và chữ số 4 ở hàng đơn vị.",
                    "explanationAudio": "/media/tts/m14-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m14-slide-q2",
                "teacherNote": "Viết số từ chục và đơn vị",
                "question": {
                    "type": "number_select",
                    "id": "m14-q2-ns",
                    "prompt": "3 chục và 8 đơn vị viết thành số nào?",
                    "promptAudio": "/media/tts/m14-q2-prompt.mp3",
                    "illustration": "/media/images/ten-rod.svg",
                    "expression": "30 + 8 = ?",
                    "choices": [38, 83, 30, 80],
                    "correctAnswer": 38,
                    "explanation": "3 chục và 8 đơn vị viết là số 38.",
                    "explanationAudio": "/media/tts/m14-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m14-slide-q3",
                "teacherNote": "Số liền sau của 99",
                "question": {
                    "type": "multiple_choice",
                    "id": "m14-q3-mc",
                    "prompt": "Số liền sau của số 99 là số nào?",
                    "promptAudio": "/media/tts/m14-q3-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "options": [
                        { "id": "m14-opt-100", "label": "Số 100", "audio": "/media/tts/m14-opt-so-100.mp3", "isCorrect": True },
                        { "id": "m14-opt-98", "label": "Số 98", "audio": "/media/tts/m14-opt-so-98.mp3", "isCorrect": False },
                        { "id": "m14-opt-90", "label": "Số 90", "audio": "/media/tts/m14-opt-so-90.mp3", "isCorrect": False }
                    ],
                    "explanation": "Số liền sau của 99 là số 100, tức là một trăm.",
                    "explanationAudio": "/media/tts/m14-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m14-slide-q4",
                "teacherNote": "Nối số với cách đọc",
                "question": {
                    "type": "matching",
                    "id": "m14-q4-matching",
                    "prompt": "Nối số với cách đọc tương ứng:",
                    "promptAudio": "/media/tts/m14-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m14-l1", "text": "Số 45", "audio": "/media/tts/m14-lbl-so45.mp3" },
                        { "id": "m14-l2", "text": "Số 71", "audio": "/media/tts/m14-lbl-so71.mp3" },
                        { "id": "m14-l3", "text": "Số 84", "audio": "/media/tts/m14-lbl-so84.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m14-r1", "text": "Bốn mươi lăm", "audio": "/media/tts/m14-lbl-bonmuoilam.mp3" },
                        { "id": "m14-r2", "text": "Bảy mươi mốt", "audio": "/media/tts/m14-lbl-baymuoimot.mp3" },
                        { "id": "m14-r3", "text": "Tám mươi tư", "audio": "/media/tts/m14-lbl-tammuoitu.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m14-l1", "rightId": "m14-r1" },
                        { "leftId": "m14-l2", "rightId": "m14-r2" },
                        { "leftId": "m14-l3", "rightId": "m14-r3" }
                    ],
                    "explanation": "45 đọc là bốn mươi lăm, 71 là bảy mươi mốt, 84 là tám mươi tư.",
                    "explanationAudio": "/media/tts/m14-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m14-slide-q5",
                "teacherNote": "Ghép số chục và đơn vị",
                "question": {
                    "type": "tap_place",
                    "id": "m14-q5-tap",
                    "prompt": "Chọn số thích hợp: 7 chục và 2 đơn vị là số mấy?",
                    "promptAudio": "/media/tts/m14-q5-prompt.mp3",
                    "targets": [
                        { "id": "m14-t1", "prefix": "7 chục và 2 đơn vị là số ", "suffix": ".", "label": "Số cần tìm" }
                    ],
                    "items": [
                        { "id": "m14-i1", "text": "72", "audio": "/media/tts/m14-num-72.mp3" },
                        { "id": "m14-i2", "text": "27", "audio": "/media/tts/m14-num-27.mp3" },
                        { "id": "m14-i3", "text": "70", "audio": "/media/tts/m14-num-70.mp3" }
                    ],
                    "correctMapping": { "m14-t1": "m14-i1" },
                    "explanation": "7 chục và 2 đơn vị là số 72.",
                    "explanationAudio": "/media/tts/m14-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m14-slide-q6",
                "teacherNote": "Đếm số quyển sách",
                "question": {
                    "type": "counting",
                    "id": "m14-q6-counting",
                    "prompt": "Đếm xem có bao nhiêu quyển sách trên giá?",
                    "promptAudio": "/media/tts/m14-q6-prompt.mp3",
                    "illustration": "/media/images/book.svg",
                    "items": [
                        { "image": "/media/images/book.svg", "alt": "Sách 1" },
                        { "image": "/media/images/book.svg", "alt": "Sách 2" },
                        { "image": "/media/images/book.svg", "alt": "Sách 3" },
                        { "image": "/media/images/book.svg", "alt": "Sách 4" },
                        { "image": "/media/images/book.svg", "alt": "Sách 5" },
                        { "image": "/media/images/book.svg", "alt": "Sách 6" },
                        { "image": "/media/images/book.svg", "alt": "Sách 7" },
                        { "image": "/media/images/book.svg", "alt": "Sách 8" },
                        { "image": "/media/images/book.svg", "alt": "Sách 9" }
                    ],
                    "correctCount": 9,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có tất cả 9 quyển sách học tập.",
                    "explanationAudio": "/media/tts/m14-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 15: So sánh các số có hai chữ số & Sắp xếp theo thứ tự
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-15-so-sanh-100",
        "title": "So sánh các số có hai chữ số",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Nắm chắc quy tắc so sánh hàng chục trước, hàng đơn vị sau và sắp xếp dãy số.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m15-slide-title",
                "title": "So sánh các số có hai chữ số",
                "subtitle": "Toán Lớp 1 — Bài học tương tác",
                "teacherNote": "Hướng dẫn học sinh so sánh số hàng chục trước.",
                "backgroundImage": "/media/images/star.svg",
                "audio": "/media/tts/m15-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m15-slide-intro",
                "title": "Quy tắc so sánh số có hai chữ số",
                "body": "So sánh hàng chục: Số nào có chữ số hàng chục lớn hơn thì lớn hơn (VD: 52 > 47). Nếu hàng chục bằng nhau, so sánh hàng đơn vị (VD: 68 > 63).",
                "teacherNote": "Cho học sinh luyện tập đọc to các cặp số.",
                "illustration": "/media/images/apple.svg",
                "audio": "/media/tts/m15-intro.mp3",
                "bullets": [
                    "52 > 47 (vì 5 chục > 4 chục)",
                    "68 > 63 (vì cùng 6 chục, 8 đơn vị > 3 đơn vị)",
                    "85 = 85"
                ]
            },
            {
                "type": "question-slide",
                "id": "m15-slide-q1",
                "teacherNote": "So sánh 47 và 52",
                "question": {
                    "type": "multiple_choice",
                    "id": "m15-q1-mc",
                    "prompt": "Chọn dấu thích hợp: 47 ... 52",
                    "promptAudio": "/media/tts/m15-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "options": [
                        { "id": "m15-opt-be", "label": "Dấu bé hơn (<)", "audio": "/media/tts/m15-opt-dau-be.mp3", "isCorrect": True },
                        { "id": "m15-opt-lon", "label": "Dấu lớn hơn (>)", "audio": "/media/tts/m15-opt-dau-lon.mp3", "isCorrect": False },
                        { "id": "m15-opt-bang", "label": "Dấu bằng (=)", "audio": "/media/tts/m15-opt-dau-bang.mp3", "isCorrect": False }
                    ],
                    "explanation": "4 chục bé hơn 5 chục nên 47 < 52.",
                    "explanationAudio": "/media/tts/m15-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m15-slide-q2",
                "teacherNote": "Chọn số lớn hơn trong 68 và 63",
                "question": {
                    "type": "number_select",
                    "id": "m15-q2-ns",
                    "prompt": "Trong hai số 68 và 63, số nào lớn hơn?",
                    "promptAudio": "/media/tts/m15-q2-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "expression": "68 > 63",
                    "choices": [63, 68, 60, 70],
                    "correctAnswer": 68,
                    "explanation": "Hai số cùng có 6 chục, nhưng 8 đơn vị lớn hơn 3 đơn vị nên 68 lớn hơn 63.",
                    "explanationAudio": "/media/tts/m15-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m15-slide-q3",
                "teacherNote": "Điền dấu so sánh vào ô trống",
                "question": {
                    "type": "tap_place",
                    "id": "m15-q3-tap",
                    "prompt": "Chọn dấu so sánh đúng đặt vào giữa: 85 ... 82",
                    "promptAudio": "/media/tts/m15-q3-prompt.mp3",
                    "targets": [
                        { "id": "m15-t1", "prefix": "85 ", "suffix": " 82", "label": "Dấu so sánh" }
                    ],
                    "items": [
                        { "id": "m15-i1", "text": ">", "audio": "/media/tts/m15-sym-lon.mp3" },
                        { "id": "m15-i2", "text": "<", "audio": "/media/tts/m15-sym-be.mp3" },
                        { "id": "m15-i3", "text": "=", "audio": "/media/tts/m15-sym-bang.mp3" }
                    ],
                    "correctMapping": { "m15-t1": "m15-i1" },
                    "explanation": "85 lớn hơn 82, viết là 85 > 82.",
                    "explanationAudio": "/media/tts/m15-q3-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m15-slide-q4",
                "teacherNote": "Nối số bé nhất và lớn nhất trong dãy",
                "question": {
                    "type": "matching",
                    "id": "m15-q4-matching",
                    "prompt": "Với các số 34, 18, 75, hãy nối với đặc điểm đúng:",
                    "promptAudio": "/media/tts/m15-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m15-l1", "text": "Số 18", "audio": "/media/tts/m15-lbl-so18.mp3" },
                        { "id": "m15-l2", "text": "Số 75", "audio": "/media/tts/m15-lbl-so75.mp3" },
                        { "id": "m15-l3", "text": "Số 34", "audio": "/media/tts/m15-lbl-so34.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m15-r1", "text": "Số bé nhất", "audio": "/media/tts/m15-lbl-benhat.mp3" },
                        { "id": "m15-r2", "text": "Số lớn nhất", "audio": "/media/tts/m15-lbl-lonnhat.mp3" },
                        { "id": "m15-r3", "text": "Số ở giữa", "audio": "/media/tts/m15-lbl-ogiuaday.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m15-l1", "rightId": "m15-r1" },
                        { "leftId": "m15-l2", "rightId": "m15-r2" },
                        { "leftId": "m15-l3", "rightId": "m15-r3" }
                    ],
                    "explanation": "18 là số bé nhất, 75 là số lớn nhất, 34 ở giữa.",
                    "explanationAudio": "/media/tts/m15-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m15-slide-q5",
                "teacherNote": "Sắp xếp dãy số tăng dần",
                "question": {
                    "type": "multiple_choice",
                    "id": "m15-q5-mc",
                    "prompt": "Dãy số nào được xếp theo thứ tự từ bé đến lớn?",
                    "promptAudio": "/media/tts/m15-q5-prompt.mp3",
                    "illustration": "/media/images/flag.svg",
                    "options": [
                        { "id": "m15-opt-dung", "label": "15, 27, 49, 80", "audio": "/media/tts/m15-opt-day-tang.mp3", "isCorrect": True },
                        { "id": "m15-opt-sai1", "label": "80, 49, 27, 15", "audio": "/media/tts/m15-opt-day-giam.mp3", "isCorrect": False },
                        { "id": "m15-opt-sai2", "label": "27, 15, 80, 49", "audio": "/media/tts/m15-opt-day-lonxon.mp3", "isCorrect": False }
                    ],
                    "explanation": "15 < 27 < 49 < 80 là dãy số từ bé đến lớn.",
                    "explanationAudio": "/media/tts/m15-q5-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m15-slide-q6",
                "teacherNote": "Tìm số tròn chục ở giữa",
                "question": {
                    "type": "number_select",
                    "id": "m15-q6-ns",
                    "prompt": "Số tròn chục nào lớn hơn 50 và bé hơn 70?",
                    "promptAudio": "/media/tts/m15-q6-prompt.mp3",
                    "illustration": "/media/images/circle.svg",
                    "expression": "50 < ? < 70",
                    "choices": [40, 60, 80, 90],
                    "correctAnswer": 60,
                    "explanation": "Số 60 là số tròn chục nằm giữa 50 và 70.",
                    "explanationAudio": "/media/tts/m15-q6-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 16: Phép cộng số có hai chữ số với số có một chữ số (không nhớ)
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-16-cong-2cs-1cs",
        "title": "Cộng số có 2 chữ số với số có 1 chữ số (không nhớ)",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Cộng hàng đơn vị với hàng đơn vị, giữ nguyên chữ số hàng chục (24 + 5 = 29, 61 + 7 = 68).",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m16-slide-title",
                "title": "Cộng số có 2 chữ số với số có 1 chữ số",
                "subtitle": "Toán Lớp 1 — Phép tính không nhớ",
                "teacherNote": "Hướng dẫn: lấy hàng đơn vị cộng với nhau rồi ghép vào hàng chục.",
                "backgroundImage": "/media/images/apple.svg",
                "audio": "/media/tts/m16-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m16-slide-intro",
                "title": "Cách đặt tính và tính",
                "body": "Ví dụ tính 24 + 5: Ta lấy 4 cộng 5 bằng 9, hạ 2 viết 2. Vậy 24 + 5 = 29. Rất dễ dàng và nhanh chóng!",
                "teacherNote": "Cho học sinh nhắc lại: cộng hàng đơn vị trước.",
                "illustration": "/media/images/apple.svg",
                "audio": "/media/tts/m16-intro.mp3",
                "bullets": [
                    "24 + 5 = 29 (4 + 5 = 9, hạ 2)",
                    "61 + 7 = 68 (1 + 7 = 8, hạ 6)",
                    "43 + 4 = 47 (3 + 4 = 7, hạ 4)"
                ]
            },
            {
                "type": "question-slide",
                "id": "m16-slide-q1",
                "teacherNote": "Tính 24 + 5",
                "question": {
                    "type": "number_select",
                    "id": "m16-q1-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m16-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "expression": "24 + 5 = ?",
                    "choices": [28, 29, 30, 27],
                    "correctAnswer": 29,
                    "explanation": "Bốn cộng năm bằng chín, hai mươi chín. 24 + 5 = 29.",
                    "explanationAudio": "/media/tts/m16-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m16-slide-q2",
                "teacherNote": "Tính 61 + 7",
                "question": {
                    "type": "multiple_choice",
                    "id": "m16-q2-mc",
                    "prompt": "61 + 7 bằng bao nhiêu?",
                    "promptAudio": "/media/tts/m16-q2-prompt.mp3",
                    "illustration": "/media/images/candy.svg",
                    "options": [
                        { "id": "m16-opt-68", "label": "Bằng 68", "audio": "/media/tts/m16-opt-bang-68.mp3", "isCorrect": True },
                        { "id": "m16-opt-67", "label": "Bằng 67", "audio": "/media/tts/m16-opt-bang-67.mp3", "isCorrect": False },
                        { "id": "m16-opt-78", "label": "Bằng 78", "audio": "/media/tts/m16-opt-bang-78.mp3", "isCorrect": False }
                    ],
                    "explanation": "1 cộng 7 bằng 8, hạ 6 được 68.",
                    "explanationAudio": "/media/tts/m16-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m16-slide-q3",
                "teacherNote": "Tìm số còn thiếu",
                "question": {
                    "type": "tap_place",
                    "id": "m16-q3-tap",
                    "prompt": "Điền số thích hợp vào chỗ trống: 52 + ... = 58",
                    "promptAudio": "/media/tts/m16-q3-prompt.mp3",
                    "targets": [
                        { "id": "m16-t1", "prefix": "52 + ", "suffix": " = 58", "label": "Số cần tìm" }
                    ],
                    "items": [
                        { "id": "m16-i1", "text": "6", "audio": "/media/tts/m16-num-6.mp3" },
                        { "id": "m16-i2", "text": "5", "audio": "/media/tts/m16-num-5.mp3" },
                        { "id": "m16-i3", "text": "7", "audio": "/media/tts/m16-num-7.mp3" }
                    ],
                    "correctMapping": { "m16-t1": "m16-i1" },
                    "explanation": "Vì 2 + 6 = 8 nên 52 + 6 = 58.",
                    "explanationAudio": "/media/tts/m16-q3-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m16-slide-q4",
                "teacherNote": "Nối phép tính với kết quả",
                "question": {
                    "type": "matching",
                    "id": "m16-q4-matching",
                    "prompt": "Nối phép cộng với kết quả đúng:",
                    "promptAudio": "/media/tts/m16-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m16-l1", "text": "32 + 4", "audio": "/media/tts/m16-lbl-32cong4.mp3" },
                        { "id": "m16-l2", "text": "73 + 5", "audio": "/media/tts/m16-lbl-73cong5.mp3" },
                        { "id": "m16-l3", "text": "41 + 6", "audio": "/media/tts/m16-lbl-41cong6.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m16-r1", "text": "Bằng 36", "audio": "/media/tts/m16-lbl-bang-36.mp3" },
                        { "id": "m16-r2", "text": "Bằng 78", "audio": "/media/tts/m16-lbl-bang-78.mp3" },
                        { "id": "m16-r3", "text": "Bằng 47", "audio": "/media/tts/m16-lbl-bang-47.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m16-l1", "rightId": "m16-r1" },
                        { "leftId": "m16-l2", "rightId": "m16-r2" },
                        { "leftId": "m16-l3", "rightId": "m16-r3" }
                    ],
                    "explanation": "32 + 4 = 36, 73 + 5 = 78, 41 + 6 = 47.",
                    "explanationAudio": "/media/tts/m16-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m16-slide-q5",
                "teacherNote": "Tính 80 + 9",
                "question": {
                    "type": "number_select",
                    "id": "m16-q5-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m16-q5-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "expression": "80 + 9 = ?",
                    "choices": [88, 89, 90, 99],
                    "correctAnswer": 89,
                    "explanation": "Tám mươi cộng chín bằng tám mươi chín.",
                    "explanationAudio": "/media/tts/m16-q5-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m16-slide-q6",
                "teacherNote": "Toán có lời văn",
                "question": {
                    "type": "multiple_choice",
                    "id": "m16-q6-mc",
                    "prompt": "Lớp 1A có 31 bạn, thêm 4 bạn mới chuyển đến. Hỏi lớp có tất cả bao nhiêu bạn?",
                    "promptAudio": "/media/tts/m16-q6-prompt.mp3",
                    "illustration": "/media/images/school.svg",
                    "options": [
                        { "id": "m16-opt-35", "label": "35 bạn", "audio": "/media/tts/m16-opt-35-ban.mp3", "isCorrect": True },
                        { "id": "m16-opt-34", "label": "34 bạn", "audio": "/media/tts/m16-opt-34-ban.mp3", "isCorrect": False },
                        { "id": "m16-opt-36", "label": "36 bạn", "audio": "/media/tts/m16-opt-36-ban.mp3", "isCorrect": False }
                    ],
                    "explanation": "Phép tính: 31 + 4 = 35 bạn.",
                    "explanationAudio": "/media/tts/m16-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 17: Phép cộng số có 2 chữ số với số có 2 chữ số (không nhớ)
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-17-cong-2cs-2cs",
        "title": "Cộng 2 chữ số với 2 chữ số (không nhớ)",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Cộng hàng đơn vị với hàng đơn vị, hàng chục với hàng chục (32 + 15 = 47, 40 + 28 = 68).",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m17-slide-title",
                "title": "Cộng 2 chữ số với 2 chữ số",
                "subtitle": "Toán Lớp 1 — Phép tính không nhớ",
                "teacherNote": "Cộng thẳng cột: đơn vị cộng đơn vị, chục cộng chục.",
                "backgroundImage": "/media/images/candy.svg",
                "audio": "/media/tts/m17-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m17-slide-intro",
                "title": "Quy tắc cộng 2 chữ số với 2 chữ số",
                "body": "Ví dụ: 32 + 15. Ta lấy 2 cộng 5 bằng 7, 3 cộng 1 bằng 4. Kết quả là 47! Luôn tính từ phải sang trái các con nhé.",
                "teacherNote": "Cho học sinh lên bảng đặt tính dọc và tính nhẩm ngang.",
                "illustration": "/media/images/ten-rod.svg",
                "audio": "/media/tts/m17-intro.mp3",
                "bullets": [
                    "32 + 15 = 47 (2 + 5 = 7, 3 + 1 = 4)",
                    "40 + 28 = 68 (0 + 8 = 8, 4 + 2 = 6)",
                    "53 + 24 = 77 (3 + 4 = 7, 5 + 2 = 7)"
                ]
            },
            {
                "type": "question-slide",
                "id": "m17-slide-q1",
                "teacherNote": "Tính 32 + 15",
                "question": {
                    "type": "number_select",
                    "id": "m17-q1-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m17-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "expression": "32 + 15 = ?",
                    "choices": [46, 47, 48, 57],
                    "correctAnswer": 47,
                    "explanation": "Hai cộng năm bằng bảy, ba cộng một bằng bốn. Kết quả là 47.",
                    "explanationAudio": "/media/tts/m17-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m17-slide-q2",
                "teacherNote": "Tính 40 + 28",
                "question": {
                    "type": "number_select",
                    "id": "m17-q2-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m17-q2-prompt.mp3",
                    "illustration": "/media/images/candy.svg",
                    "expression": "40 + 28 = ?",
                    "choices": [58, 68, 78, 60],
                    "correctAnswer": 68,
                    "explanation": "Bốn mươi cộng hai mươi tám bằng sáu mươi tám.",
                    "explanationAudio": "/media/tts/m17-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m17-slide-q3",
                "teacherNote": "Tính 53 + 24",
                "question": {
                    "type": "multiple_choice",
                    "id": "m17-q3-mc",
                    "prompt": "53 + 24 bằng bao nhiêu?",
                    "promptAudio": "/media/tts/m17-q3-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "options": [
                        { "id": "m17-opt-77", "label": "Bằng 77", "audio": "/media/tts/m17-opt-bang-77.mp3", "isCorrect": True },
                        { "id": "m17-opt-76", "label": "Bằng 76", "audio": "/media/tts/m17-opt-bang-76.mp3", "isCorrect": False },
                        { "id": "m17-opt-87", "label": "Bằng 87", "audio": "/media/tts/m17-opt-bang-87.mp3", "isCorrect": False }
                    ],
                    "explanation": "3 cộng 4 bằng 7, 5 cộng 2 bằng 7. 53 + 24 = 77.",
                    "explanationAudio": "/media/tts/m17-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m17-slide-q4",
                "teacherNote": "Nối phép tính với kết quả",
                "question": {
                    "type": "matching",
                    "id": "m17-q4-matching",
                    "prompt": "Nối phép cộng với kết quả đúng:",
                    "promptAudio": "/media/tts/m17-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m17-l1", "text": "21 + 13", "audio": "/media/tts/m17-lbl-21cong13.mp3" },
                        { "id": "m17-l2", "text": "45 + 32", "audio": "/media/tts/m17-lbl-45cong32.mp3" },
                        { "id": "m17-l3", "text": "62 + 16", "audio": "/media/tts/m17-lbl-62cong16.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m17-r1", "text": "Bằng 34", "audio": "/media/tts/m17-lbl-bang-34.mp3" },
                        { "id": "m17-r2", "text": "Bằng 77", "audio": "/media/tts/m17-lbl-bang-77b.mp3" },
                        { "id": "m17-r3", "text": "Bằng 78", "audio": "/media/tts/m17-lbl-bang-78b.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m17-l1", "rightId": "m17-r1" },
                        { "leftId": "m17-l2", "rightId": "m17-r2" },
                        { "leftId": "m17-l3", "rightId": "m17-r3" }
                    ],
                    "explanation": "21 + 13 = 34, 45 + 32 = 77, 62 + 16 = 78.",
                    "explanationAudio": "/media/tts/m17-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m17-slide-q5",
                "teacherNote": "Điền kết quả vào chỗ trống",
                "question": {
                    "type": "tap_place",
                    "id": "m17-q5-tap",
                    "prompt": "Đặt số thích hợp vào chỗ trống: 25 + 14 = ...",
                    "promptAudio": "/media/tts/m17-q5-prompt.mp3",
                    "targets": [
                        { "id": "m17-t1", "prefix": "25 + 14 = ", "suffix": "", "label": "Kết quả" }
                    ],
                    "items": [
                        { "id": "m17-i1", "text": "39", "audio": "/media/tts/m17-num-39.mp3" },
                        { "id": "m17-i2", "text": "38", "audio": "/media/tts/m17-num-38.mp3" },
                        { "id": "m17-i3", "text": "49", "audio": "/media/tts/m17-num-49.mp3" }
                    ],
                    "correctMapping": { "m17-t1": "m17-i1" },
                    "explanation": "5 + 4 = 9, 2 + 1 = 3. 25 + 14 = 39.",
                    "explanationAudio": "/media/tts/m17-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m17-slide-q6",
                "teacherNote": "Toán lời văn thi đua",
                "question": {
                    "type": "multiple_choice",
                    "id": "m17-q6-mc",
                    "prompt": "Đội Đỏ có 23 điểm, cô thưởng thêm 12 điểm. Hỏi đội Đỏ có tất cả bao nhiêu điểm?",
                    "promptAudio": "/media/tts/m17-q6-prompt.mp3",
                    "illustration": "/media/images/flag.svg",
                    "options": [
                        { "id": "m17-opt-35d", "label": "35 điểm", "audio": "/media/tts/m17-opt-35-diem.mp3", "isCorrect": True },
                        { "id": "m17-opt-34d", "label": "34 điểm", "audio": "/media/tts/m17-opt-34-diem.mp3", "isCorrect": False },
                        { "id": "m17-opt-36d", "label": "36 điểm", "audio": "/media/tts/m17-opt-36-diem.mp3", "isCorrect": False }
                    ],
                    "explanation": "Phép tính: 23 + 12 = 35 điểm.",
                    "explanationAudio": "/media/tts/m17-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 18: Phép trừ số có hai chữ số (không nhớ)
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-18-tru-2cs-khong-nho",
        "title": "Phép trừ số có hai chữ số (không nhớ)",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Trừ hàng đơn vị cho hàng đơn vị, hàng chục cho hàng chục (48 - 6 = 42, 57 - 23 = 34).",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m18-slide-title",
                "title": "Phép trừ số có hai chữ số",
                "subtitle": "Toán Lớp 1 — Phép tính không nhớ",
                "teacherNote": "Trừ thẳng cột từ phải sang trái: đơn vị trừ đơn vị, chục trừ chục.",
                "backgroundImage": "/media/images/apple.svg",
                "audio": "/media/tts/m18-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m18-slide-intro",
                "title": "Quy tắc trừ số có hai chữ số",
                "body": "Ví dụ 57 - 23: Lấy 7 trừ 3 bằng 4, 5 trừ 2 bằng 3. Vậy 57 - 23 = 34. Thật đơn giản và chính xác!",
                "teacherNote": "Yêu cầu học sinh thực hành đặt tính trên bảng con.",
                "illustration": "/media/images/apple.svg",
                "audio": "/media/tts/m18-intro.mp3",
                "bullets": [
                    "48 - 6 = 42 (8 - 6 = 2, hạ 4)",
                    "57 - 23 = 34 (7 - 3 = 4, 5 - 2 = 3)",
                    "79 - 35 = 44 (9 - 5 = 4, 7 - 3 = 4)"
                ]
            },
            {
                "type": "question-slide",
                "id": "m18-slide-q1",
                "teacherNote": "Tính 48 - 6",
                "question": {
                    "type": "number_select",
                    "id": "m18-q1-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m18-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "expression": "48 - 6 = ?",
                    "choices": [41, 42, 43, 44],
                    "correctAnswer": 42,
                    "explanation": "Tám trừ sáu bằng hai, hạ bốn được bốn mươi hai.",
                    "explanationAudio": "/media/tts/m18-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m18-slide-q2",
                "teacherNote": "Tính 57 - 23",
                "question": {
                    "type": "number_select",
                    "id": "m18-q2-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m18-q2-prompt.mp3",
                    "illustration": "/media/images/candy.svg",
                    "expression": "57 - 23 = ?",
                    "choices": [33, 34, 35, 24],
                    "correctAnswer": 34,
                    "explanation": "7 trừ 3 bằng 4, 5 trừ 2 bằng 3. Kết quả là 34.",
                    "explanationAudio": "/media/tts/m18-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m18-slide-q3",
                "teacherNote": "Tính 79 - 35",
                "question": {
                    "type": "multiple_choice",
                    "id": "m18-q3-mc",
                    "prompt": "79 - 35 bằng bao nhiêu?",
                    "promptAudio": "/media/tts/m18-q3-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "options": [
                        { "id": "m18-opt-44", "label": "Bằng 44", "audio": "/media/tts/m18-opt-bang-44.mp3", "isCorrect": True },
                        { "id": "m18-opt-43", "label": "Bằng 43", "audio": "/media/tts/m18-opt-bang-43.mp3", "isCorrect": False },
                        { "id": "m18-opt-54", "label": "Bằng 54", "audio": "/media/tts/m18-opt-bang-54.mp3", "isCorrect": False }
                    ],
                    "explanation": "9 trừ 5 bằng 4, 7 trừ 3 bằng 4. 79 - 35 = 44.",
                    "explanationAudio": "/media/tts/m18-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m18-slide-q4",
                "teacherNote": "Nối phép trừ với kết quả",
                "question": {
                    "type": "matching",
                    "id": "m18-q4-matching",
                    "prompt": "Nối phép trừ với kết quả tương ứng:",
                    "promptAudio": "/media/tts/m18-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m18-l1", "text": "65 - 12", "audio": "/media/tts/m18-lbl-65tru12.mp3" },
                        { "id": "m18-l2", "text": "88 - 44", "audio": "/media/tts/m18-lbl-88tru44.mp3" },
                        { "id": "m18-l3", "text": "96 - 31", "audio": "/media/tts/m18-lbl-96tru31.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m18-r1", "text": "Bằng 53", "audio": "/media/tts/m18-lbl-bang-53.mp3" },
                        { "id": "m18-r2", "text": "Bằng 44", "audio": "/media/tts/m18-lbl-bang-44b.mp3" },
                        { "id": "m18-r3", "text": "Bằng 65", "audio": "/media/tts/m18-lbl-bang-65.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m18-l1", "rightId": "m18-r1" },
                        { "leftId": "m18-l2", "rightId": "m18-r2" },
                        { "leftId": "m18-l3", "rightId": "m18-r3" }
                    ],
                    "explanation": "65 - 12 = 53, 88 - 44 = 44, 96 - 31 = 65.",
                    "explanationAudio": "/media/tts/m18-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m18-slide-q5",
                "teacherNote": "Điền kết quả 36 - 15",
                "question": {
                    "type": "tap_place",
                    "id": "m18-q5-tap",
                    "prompt": "Đặt số thích hợp vào chỗ trống: 36 - 15 = ...",
                    "promptAudio": "/media/tts/m18-q5-prompt.mp3",
                    "targets": [
                        { "id": "m18-t1", "prefix": "36 - 15 = ", "suffix": "", "label": "Kết quả" }
                    ],
                    "items": [
                        { "id": "m18-i1", "text": "21", "audio": "/media/tts/m18-num-21.mp3" },
                        { "id": "m18-i2", "text": "20", "audio": "/media/tts/m18-num-20.mp3" },
                        { "id": "m18-i3", "text": "22", "audio": "/media/tts/m18-num-22.mp3" }
                    ],
                    "correctMapping": { "m18-t1": "m18-i1" },
                    "explanation": "6 - 5 = 1, 3 - 1 = 2. 36 - 15 = 21.",
                    "explanationAudio": "/media/tts/m18-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m18-slide-q6",
                "teacherNote": "Toán lời văn hái bưởi",
                "question": {
                    "type": "multiple_choice",
                    "id": "m18-q6-mc",
                    "prompt": "Cây bưởi có 46 quả, bác hái đi 14 quả. Hỏi trên cây còn lại bao nhiêu quả bưởi?",
                    "promptAudio": "/media/tts/m18-q6-prompt.mp3",
                    "illustration": "/media/images/tree.svg",
                    "options": [
                        { "id": "m18-opt-32q", "label": "32 quả", "audio": "/media/tts/m18-opt-32-qua.mp3", "isCorrect": True },
                        { "id": "m18-opt-31q", "label": "31 quả", "audio": "/media/tts/m18-opt-31-qua.mp3", "isCorrect": False },
                        { "id": "m18-opt-33q", "label": "33 quả", "audio": "/media/tts/m18-opt-33-qua.mp3", "isCorrect": False }
                    ],
                    "explanation": "Phép tính: 46 - 14 = 32 quả bưởi.",
                    "explanationAudio": "/media/tts/m18-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 19: Xem đồng hồ (Giờ đúng) & Các ngày trong tuần
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-19-dong-ho-thoi-gian",
        "title": "Xem đồng hồ (Giờ đúng) & Ngày trong tuần",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Làm quen mặt đồng hồ kim, nhận biết giờ đúng và ghi nhớ 7 ngày trong tuần.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m19-slide-title",
                "title": "Xem đồng hồ & Ngày trong tuần",
                "subtitle": "Toán Lớp 1 — Thời gian và cuộc sống",
                "teacherNote": "Mang đồng hồ mô hình cho học sinh xoay kim ngắn và kim dài.",
                "backgroundImage": "/media/images/clock.svg",
                "audio": "/media/tts/m19-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m19-slide-intro",
                "title": "Giờ đúng và Tuần lễ",
                "body": "Khi kim dài chỉ số 12, kim ngắn chỉ số nào thì đó là bấy nhiêu giờ đúng! Một tuần lễ có 7 ngày: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ Nhật.",
                "teacherNote": "Nhắc học sinh các ngày đi học và hai ngày nghỉ cuối tuần.",
                "illustration": "/media/images/calendar.svg",
                "audio": "/media/tts/m19-intro.mp3",
                "bullets": [
                    "Kim dài chỉ số 12, kim ngắn chỉ số 8: 8 giờ đúng",
                    "Một tuần lễ có 7 ngày",
                    "Thứ Bảy và Chủ Nhật là ngày nghỉ"
                ]
            },
            {
                "type": "question-slide",
                "id": "m19-slide-q1",
                "teacherNote": "Đồng hồ chỉ 8 giờ",
                "question": {
                    "type": "multiple_choice",
                    "id": "m19-q1-mc",
                    "prompt": "Đồng hồ có kim ngắn chỉ số 8, kim dài chỉ số 12 là mấy giờ?",
                    "promptAudio": "/media/tts/m19-q1-prompt.mp3",
                    "illustration": "/media/images/clock.svg",
                    "options": [
                        { "id": "m19-opt-8h", "label": "8 giờ đúng", "audio": "/media/tts/m19-opt-8-gio-dung.mp3", "isCorrect": True },
                        { "id": "m19-opt-12h", "label": "12 giờ đúng", "audio": "/media/tts/m19-opt-12-gio-dung.mp3", "isCorrect": False },
                        { "id": "m19-opt-7h", "label": "7 giờ đúng", "audio": "/media/tts/m19-opt-7-gio-dung.mp3", "isCorrect": False }
                    ],
                    "explanation": "Kim dài chỉ số 12, kim ngắn chỉ số 8 là 8 giờ đúng.",
                    "explanationAudio": "/media/tts/m19-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m19-slide-q2",
                "teacherNote": "Nối vị trí kim ngắn với giờ",
                "question": {
                    "type": "matching",
                    "id": "m19-q2-matching",
                    "prompt": "Khi kim dài chỉ số 12, hãy nối kim ngắn với giờ đúng:",
                    "promptAudio": "/media/tts/m19-q2-prompt.mp3",
                    "leftColumn": [
                        { "id": "m19-l1", "text": "Kim ngắn chỉ số 7", "audio": "/media/tts/m19-lbl-kn-7.mp3" },
                        { "id": "m19-l2", "text": "Kim ngắn chỉ số 10", "audio": "/media/tts/m19-lbl-kn-10.mp3" },
                        { "id": "m19-l3", "text": "Kim ngắn chỉ số 3", "audio": "/media/tts/m19-lbl-kn-3.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m19-r1", "text": "7 giờ đúng", "audio": "/media/tts/m19-lbl-7-gio.mp3" },
                        { "id": "m19-r2", "text": "10 giờ đúng", "audio": "/media/tts/m19-lbl-10-gio.mp3" },
                        { "id": "m19-r3", "text": "3 giờ đúng", "audio": "/media/tts/m19-lbl-3-gio.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m19-l1", "rightId": "m19-r1" },
                        { "leftId": "m19-l2", "rightId": "m19-r2" },
                        { "leftId": "m19-l3", "rightId": "m19-r3" }
                    ],
                    "explanation": "Kim ngắn chỉ số nào thì đó là bấy nhiêu giờ đúng.",
                    "explanationAudio": "/media/tts/m19-q2-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m19-slide-q3",
                "teacherNote": "Thứ Ba rồi đến thứ mấy?",
                "question": {
                    "type": "tap_place",
                    "id": "m19-q3-tap",
                    "prompt": "Chọn ngày thích hợp điền vào chỗ trống: Thứ Ba rồi đến ...",
                    "promptAudio": "/media/tts/m19-q3-prompt.mp3",
                    "targets": [
                        { "id": "m19-t1", "prefix": "Thứ Ba rồi đến ", "suffix": ".", "label": "Tên thứ" }
                    ],
                    "items": [
                        { "id": "m19-i1", "text": "Thứ Tư", "audio": "/media/tts/m19-word-thu-tu.mp3" },
                        { "id": "m19-i2", "text": "Thứ Năm", "audio": "/media/tts/m19-word-thu-nam.mp3" },
                        { "id": "m19-i3", "text": "Thứ Hai", "audio": "/media/tts/m19-word-thu-hai.mp3" }
                    ],
                    "correctMapping": { "m19-t1": "m19-i1" },
                    "explanation": "Thứ Ba liền kề sau đó là Thứ Tư.",
                    "explanationAudio": "/media/tts/m19-q3-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m19-slide-q4",
                "teacherNote": "Một tuần có bao nhiêu ngày?",
                "question": {
                    "type": "number_select",
                    "id": "m19-q4-ns",
                    "prompt": "Một tuần lễ có bao nhiêu ngày?",
                    "promptAudio": "/media/tts/m19-q4-prompt.mp3",
                    "illustration": "/media/images/calendar.svg",
                    "expression": "5 + 2 = ?",
                    "choices": [5, 6, 7, 8],
                    "correctAnswer": 7,
                    "explanation": "Một tuần lễ gồm có 7 ngày.",
                    "explanationAudio": "/media/tts/m19-q4-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m19-slide-q5",
                "teacherNote": "Tính ngày tiếp theo",
                "question": {
                    "type": "number_select",
                    "id": "m19-q5-ns",
                    "prompt": "Hôm nay là Thứ Hai ngày 10. Ngày mai Thứ Ba là ngày bao nhiêu?",
                    "promptAudio": "/media/tts/m19-q5-prompt.mp3",
                    "illustration": "/media/images/calendar.svg",
                    "expression": "10 + 1 = ?",
                    "choices": [11, 12, 13, 9],
                    "correctAnswer": 11,
                    "explanation": "Hôm nay ngày 10 thì ngày mai là ngày 11.",
                    "explanationAudio": "/media/tts/m19-q5-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m19-slide-q6",
                "teacherNote": "Các ngày đi học",
                "question": {
                    "type": "multiple_choice",
                    "id": "m19-q6-mc",
                    "prompt": "Trong tuần, các ngày em đến trường đi học là:",
                    "promptAudio": "/media/tts/m19-q6-prompt.mp3",
                    "illustration": "/media/images/school.svg",
                    "options": [
                        { "id": "m19-opt-t2t6", "label": "Từ Thứ Hai đến Thứ Sáu", "audio": "/media/tts/m19-opt-t2-t6.mp3", "isCorrect": True },
                        { "id": "m19-opt-t7cn", "label": "Thứ Bảy và Chủ Nhật", "audio": "/media/tts/m19-opt-t7-cn.mp3", "isCorrect": False },
                        { "id": "m19-opt-tatca", "label": "Tất cả các ngày trong tuần", "audio": "/media/tts/m19-opt-all-week.mp3", "isCorrect": False }
                    ],
                    "explanation": "Học sinh tiểu học đi học từ Thứ Hai đến Thứ Sáu hàng tuần.",
                    "explanationAudio": "/media/tts/m19-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 20: Ôn tập tổng hợp cuối năm: Phép tính liên tiếp & Toán có lời văn
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-20-on-tap-tong-hop",
        "title": "Ôn tập tổng hợp Toán Lớp 1 cuối năm",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Ôn luyện phép tính liên tiếp (10 + 5 - 3) và giải các bài toán có lời văn thực tế.",
        "totalDurationMinutes": 30,
        "slides": [
            {
                "type": "title-slide",
                "id": "m20-slide-title",
                "title": "Ôn tập tổng hợp Toán Lớp 1",
                "subtitle": "Phép tính liên tiếp & Toán có lời văn",
                "teacherNote": "Bài học tổng kết toàn bộ chương trình Toán Lớp 1.",
                "backgroundImage": "/media/images/star.svg",
                "audio": "/media/tts/m20-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m20-slide-intro",
                "title": "Chúc mừng các con đã hoàn thành Toán 1",
                "body": "Các con đã làm quen với các số đến 100, cộng trừ thành thạo và giải được các bài toán có lời văn. Hôm nay chúng mình cùng hoàn thành bài ôn tập xuất sắc nhé!",
                "teacherNote": "Tuyên dương sự tiến bộ của cả lớp trong năm học.",
                "illustration": "/media/images/star.svg",
                "audio": "/media/tts/m20-intro.mp3",
                "bullets": [
                    "Phép tính liên tiếp: tính từ trái sang phải",
                    "Toán có lời văn: đọc kỹ đề và tìm phép tính",
                    "Bé tự tin chuẩn bị lên Lớp 2"
                ]
            },
            {
                "type": "question-slide",
                "id": "m20-slide-q1",
                "teacherNote": "Tính liên tiếp 10 + 5 - 3",
                "question": {
                    "type": "number_select",
                    "id": "m20-q1-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m20-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "expression": "10 + 5 - 3 = ?",
                    "choices": [11, 12, 13, 14],
                    "correctAnswer": 12,
                    "explanation": "10 cộng 5 bằng 15, 15 trừ 3 bằng 12.",
                    "explanationAudio": "/media/tts/m20-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m20-slide-q2",
                "teacherNote": "Tính liên tiếp 20 + 30 + 5",
                "question": {
                    "type": "number_select",
                    "id": "m20-q2-ns",
                    "prompt": "Bé hãy tính kết quả phép tính sau:",
                    "promptAudio": "/media/tts/m20-q2-prompt.mp3",
                    "illustration": "/media/images/candy.svg",
                    "expression": "20 + 30 + 5 = ?",
                    "choices": [50, 55, 60, 65],
                    "correctAnswer": 55,
                    "explanation": "20 cộng 30 bằng 50, 50 cộng 5 bằng 55.",
                    "explanationAudio": "/media/tts/m20-q2-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m20-slide-q3",
                "teacherNote": "Bài toán đàn chim",
                "question": {
                    "type": "multiple_choice",
                    "id": "m20-q3-mc",
                    "prompt": "Trên cành có 15 con chim, 3 con bay đi, rồi lại có 2 con bay đến. Hỏi có bao nhiêu con chim?",
                    "promptAudio": "/media/tts/m20-q3-prompt.mp3",
                    "illustration": "/media/images/bird.svg",
                    "options": [
                        { "id": "m20-opt-14c", "label": "14 con chim", "audio": "/media/tts/m20-opt-14-con.mp3", "isCorrect": True },
                        { "id": "m20-opt-15c", "label": "15 con chim", "audio": "/media/tts/m20-opt-15-con.mp3", "isCorrect": False },
                        { "id": "m20-opt-16c", "label": "16 con chim", "audio": "/media/tts/m20-opt-16-con.mp3", "isCorrect": False }
                    ],
                    "explanation": "15 trừ 3 bằng 12, 12 cộng 2 bằng 14 con chim.",
                    "explanationAudio": "/media/tts/m20-q3-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m20-slide-q4",
                "teacherNote": "Nối phép tính liên tiếp",
                "question": {
                    "type": "matching",
                    "id": "m20-q4-matching",
                    "prompt": "Nối phép tính với kết quả đúng:",
                    "promptAudio": "/media/tts/m20-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m20-l1", "text": "12 + 6 - 4", "audio": "/media/tts/m20-lbl-pt1.mp3" },
                        { "id": "m20-l2", "text": "25 - 5 + 10", "audio": "/media/tts/m20-lbl-pt2.mp3" },
                        { "id": "m20-l3", "text": "40 + 20 - 10", "audio": "/media/tts/m20-lbl-pt3.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m20-r1", "text": "Bằng 14", "audio": "/media/tts/m20-lbl-kq14.mp3" },
                        { "id": "m20-r2", "text": "Bằng 30", "audio": "/media/tts/m20-lbl-kq30.mp3" },
                        { "id": "m20-r3", "text": "Bằng 50", "audio": "/media/tts/m20-lbl-kq50.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m20-l1", "rightId": "m20-r1" },
                        { "leftId": "m20-l2", "rightId": "m20-r2" },
                        { "leftId": "m20-l3", "rightId": "m20-r3" }
                    ],
                    "explanation": "12 + 6 - 4 = 14, 25 - 5 + 10 = 30, 40 + 20 - 10 = 50.",
                    "explanationAudio": "/media/tts/m20-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m20-slide-q5",
                "teacherNote": "Điền kết quả phép tính liên tiếp",
                "question": {
                    "type": "tap_place",
                    "id": "m20-q5-tap",
                    "prompt": "Tính kết quả: 18 - 8 + 6 = ?",
                    "promptAudio": "/media/tts/m20-q5-prompt.mp3",
                    "targets": [
                        { "id": "m20-t1", "prefix": "18 - 8 + 6 = ", "suffix": "", "label": "Kết quả" }
                    ],
                    "items": [
                        { "id": "m20-i1", "text": "16", "audio": "/media/tts/m20-num-16.mp3" },
                        { "id": "m20-i2", "text": "15", "audio": "/media/tts/m20-num-15.mp3" },
                        { "id": "m20-i3", "text": "14", "audio": "/media/tts/m20-num-14.mp3" }
                    ],
                    "correctMapping": { "m20-t1": "m20-i1" },
                    "explanation": "18 trừ 8 bằng 10, 10 cộng 6 bằng 16.",
                    "explanationAudio": "/media/tts/m20-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m20-slide-q6",
                "teacherNote": "Bài toán chia kẹo",
                "question": {
                    "type": "multiple_choice",
                    "id": "m20-q6-mc",
                    "prompt": "Bạn Lan có 12 cái kẹo, bạn Mai cho thêm 5 cái kẹo. Hỏi Lan có tất cả bao nhiêu cái kẹo?",
                    "promptAudio": "/media/tts/m20-q6-prompt.mp3",
                    "illustration": "/media/images/candy.svg",
                    "options": [
                        { "id": "m20-opt-17k", "label": "17 cái kẹo", "audio": "/media/tts/m20-opt-17-keo.mp3", "isCorrect": True },
                        { "id": "m20-opt-16k", "label": "16 cái kẹo", "audio": "/media/tts/m20-opt-16-keo.mp3", "isCorrect": False },
                        { "id": "m20-opt-18k", "label": "18 cái kẹo", "audio": "/media/tts/m20-opt-18-keo.mp3", "isCorrect": False }
                    ],
                    "explanation": "Phép tính: 12 + 5 = 17 cái kẹo.",
                    "explanationAudio": "/media/tts/m20-q6-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            }
        ]
    })

    return lessons
