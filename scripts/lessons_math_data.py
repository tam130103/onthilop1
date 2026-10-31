# -*- coding: utf-8 -*-
"""
Math Lessons 07 to 20 for Grade 1 Interactive Slides.
Full compliance with content.schema.ts & pedagogical standards.
"""

def get_math_lessons():
    lessons = []

    # =========================================================================
    # MATH 07: So sánh các số trong phạm vi 10
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-07-compare-10",
        "title": "So sánh các số trong phạm vi 10",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Làm quen với các dấu lớn hơn, bé hơn, bằng nhau và so sánh các số đến 10.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m7-slide-title",
                "title": "So sánh các số trong phạm vi 10",
                "subtitle": "Toán Lớp 1 — Bài học tương tác",
                "teacherNote": "Hướng dẫn học sinh nhận biết dấu lớn (>), dấu bé (<), dấu bằng (=).",
                "backgroundImage": "/media/images/star.svg",
                "audio": "/media/tts/m7-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m7-slide-intro",
                "title": "Nhận biết Dấu So Sánh",
                "body": "Đầu nhọn luôn chỉ về số bé hơn, miệng mở rộng hướng về số lớn hơn. Ví dụ: 7 lớn hơn 5 viết là 7 > 5.",
                "teacherNote": "Cho học sinh làm cử chỉ hai tay tạo hình dấu lớn và dấu bé.",
                "illustration": "/media/images/apple.svg",
                "audio": "/media/tts/m7-intro.mp3",
                "bullets": [
                    "7 lớn hơn 5: 7 > 5",
                    "4 bé hơn 8: 4 < 8",
                    "6 bằng 6: 6 = 6"
                ]
            },
            {
                "type": "question-slide",
                "id": "m7-slide-q1",
                "teacherNote": "So sánh 9 và 6",
                "question": {
                    "type": "multiple_choice",
                    "id": "m7-q1-mc",
                    "prompt": "Chọn dấu thích hợp điền vào chỗ chấm: 9 ... 6",
                    "promptAudio": "/media/tts/m7-q1-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "options": [
                        { "id": "m7-opt1", "label": "Dấu lớn hơn (>)", "audio": "/media/tts/m7-opt-lon.mp3", "isCorrect": True },
                        { "id": "m7-opt2", "label": "Dấu bé hơn (<)", "audio": "/media/tts/m7-opt-be.mp3", "isCorrect": False },
                        { "id": "m7-opt3", "label": "Dấu bằng (=)", "audio": "/media/tts/m7-opt-bang.mp3", "isCorrect": False }
                    ],
                    "explanation": "Số 9 nhiều hơn số 6 nên 9 lớn hơn 6.",
                    "explanationAudio": "/media/tts/m7-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m7-slide-q2",
                "teacherNote": "Đếm bóng và so sánh số lượng",
                "question": {
                    "type": "counting",
                    "id": "m7-q2-counting",
                    "prompt": "Đếm xem có bao nhiêu quả bóng trên màn hình?",
                    "promptAudio": "/media/tts/m7-q2-prompt.mp3",
                    "illustration": "/media/images/ball.svg",
                    "items": [
                        { "image": "/media/images/ball.svg", "alt": "Bóng 1" },
                        { "image": "/media/images/ball.svg", "alt": "Bóng 2" },
                        { "image": "/media/images/ball.svg", "alt": "Bóng 3" },
                        { "image": "/media/images/ball.svg", "alt": "Bóng 4" },
                        { "image": "/media/images/ball.svg", "alt": "Bóng 5" },
                        { "image": "/media/images/ball.svg", "alt": "Bóng 6" },
                        { "image": "/media/images/ball.svg", "alt": "Bóng 7" }
                    ],
                    "correctCount": 7,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có tất cả 7 quả bóng sắc màu.",
                    "explanationAudio": "/media/tts/m7-q2-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m7-slide-q3",
                "teacherNote": "So sánh số bé hơn",
                "question": {
                    "type": "number_select",
                    "id": "m7-q3-ns",
                    "prompt": "Trong các số sau, số nào bé hơn 5?",
                    "promptAudio": "/media/tts/m7-q3-prompt.mp3",
                    "illustration": "/media/images/fish.svg",
                    "expression": "? < 5",
                    "choices": [3, 5, 7, 9],
                    "correctAnswer": 3,
                    "explanation": "Số 3 bé hơn số 5 vì 3 đứng trước 5 trên tia số.",
                    "explanationAudio": "/media/tts/m7-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m7-slide-q4",
                "teacherNote": "Nối phép so sánh đúng",
                "question": {
                    "type": "matching",
                    "id": "m7-q4-matching",
                    "prompt": "Bé hãy nối hai vế để được phép so sánh đúng:",
                    "promptAudio": "/media/tts/m7-q4-prompt.mp3",
                    "leftColumn": [
                        { "id": "m7-l1", "text": "Số 10", "audio": "/media/tts/m7-lbl-so10.mp3" },
                        { "id": "m7-l2", "text": "Số 4", "audio": "/media/tts/m7-lbl-so4.mp3" },
                        { "id": "m7-l3", "text": "Số 8", "audio": "/media/tts/m7-lbl-so8.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m7-r1", "text": "Lớn hơn 9", "audio": "/media/tts/m7-lbl-lon9.mp3" },
                        { "id": "m7-r2", "text": "Bé hơn 5", "audio": "/media/tts/m7-lbl-be5.mp3" },
                        { "id": "m7-r3", "text": "Bằng 8", "audio": "/media/tts/m7-lbl-bang8.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m7-l1", "rightId": "m7-r1" },
                        { "leftId": "m7-l2", "rightId": "m7-r2" },
                        { "leftId": "m7-l3", "rightId": "m7-r3" }
                    ],
                    "explanation": "10 lớn hơn 9, 4 bé hơn 5 và 8 bằng 8.",
                    "explanationAudio": "/media/tts/m7-q4-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m7-slide-q5",
                "teacherNote": "Điền dấu vào chỗ trống",
                "question": {
                    "type": "tap_place",
                    "id": "m7-q5-tap",
                    "prompt": "Chọn dấu thích hợp đặt vào giữa hai số 6 và 8:",
                    "promptAudio": "/media/tts/m7-q5-prompt.mp3",
                    "targets": [
                        { "id": "m7-t1", "prefix": "6 ", "suffix": " 8", "label": "Dấu so sánh" }
                    ],
                    "items": [
                        { "id": "m7-i1", "text": "<", "audio": "/media/tts/m7-dau-be.mp3" },
                        { "id": "m7-i2", "text": ">", "audio": "/media/tts/m7-dau-lon.mp3" },
                        { "id": "m7-i3", "text": "=", "audio": "/media/tts/m7-dau-bang.mp3" }
                    ],
                    "correctMapping": { "m7-t1": "m7-i1" },
                    "explanation": "6 bé hơn 8, viết là 6 < 8.",
                    "explanationAudio": "/media/tts/m7-q5-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m7-slide-q6",
                "teacherNote": "Số lớn nhất trong dãy",
                "question": {
                    "type": "multiple_choice",
                    "id": "m7-q6-mc",
                    "prompt": "Trong các số: 3, 7, 2, 9, số nào lớn nhất?",
                    "promptAudio": "/media/tts/m7-q6-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "options": [
                        { "id": "m7-opt-9", "label": "Số 9", "audio": "/media/tts/m7-opt-so-9.mp3", "isCorrect": True },
                        { "id": "m7-opt-7", "label": "Số 7", "audio": "/media/tts/m7-opt-so-7.mp3", "isCorrect": False },
                        { "id": "m7-opt-3", "label": "Số 3", "audio": "/media/tts/m7-opt-so-3.mp3", "isCorrect": False }
                    ],
                    "explanation": "Số 9 là số lớn nhất trong các số đã cho.",
                    "explanationAudio": "/media/tts/m7-q6-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            }
        ]
    })

    # =========================================================================
    # MATH 08: Tách – Gộp các số trong phạm vi 10
    # =========================================================================
    lessons.append({
        "status": "publish",
        "mode": "publish",
        "id": "math-08-decompose-10",
        "title": "Tách – Gộp các số trong phạm vi 10",
        "subject": "math",
        "grade": 1,
        "description": "Bài học Toán 1: Rèn luyện kỹ năng tách gộp số linh hoạt, nền tảng của phép cộng trừ trong phạm vi 10.",
        "totalDurationMinutes": 25,
        "slides": [
            {
                "type": "title-slide",
                "id": "m8-slide-title",
                "title": "Tách – Gộp số trong phạm vi 10",
                "subtitle": "Toán Lớp 1 — Khám phá cấu tạo số",
                "teacherNote": "Cho học sinh tách các nhóm đồ vật thành 2 phần.",
                "backgroundImage": "/media/images/circle.svg",
                "audio": "/media/tts/m8-title.mp3"
            },
            {
                "type": "content-slide",
                "id": "m8-slide-intro",
                "title": "Tách và Gộp số 10",
                "body": "10 gồm 9 và 1, gồm 8 và 2, gồm 7 và 3, gồm 6 và 4, gồm 5 và 5. Nắm chắc cấu tạo số 10 giúp tính toán cực nhanh!",
                "teacherNote": "Yêu cầu học sinh xòe 10 ngón tay và thực hành gập các ngón tay.",
                "illustration": "/media/images/apple.svg",
                "audio": "/media/tts/m8-intro.mp3",
                "bullets": [
                    "Gộp 6 và 4 được 10",
                    "Gộp 7 và 3 được 10",
                    "Gộp 8 và 2 được 10"
                ]
            },
            {
                "type": "question-slide",
                "id": "m8-slide-q1",
                "teacherNote": "Gộp 6 và 3",
                "question": {
                    "type": "number_select",
                    "id": "m8-q1-ns",
                    "prompt": "Gộp 6 và 3 được mấy?",
                    "promptAudio": "/media/tts/m8-q1-prompt.mp3",
                    "illustration": "/media/images/candy.svg",
                    "expression": "6 + 3 = ?",
                    "choices": [7, 8, 9, 10],
                    "correctAnswer": 9,
                    "explanation": "Gộp 6 và 3 được 9.",
                    "explanationAudio": "/media/tts/m8-q1-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m8-slide-q2",
                "teacherNote": "Đếm số táo và tách thành 2 phần",
                "question": {
                    "type": "counting",
                    "id": "m8-q2-counting",
                    "prompt": "Đếm xem có bao nhiêu quả táo đỏ?",
                    "promptAudio": "/media/tts/m8-q2-prompt.mp3",
                    "illustration": "/media/images/apple.svg",
                    "items": [
                        { "image": "/media/images/apple.svg", "alt": "Táo 1" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 2" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 3" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 4" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 5" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 6" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 7" },
                        { "image": "/media/images/apple.svg", "alt": "Táo 8" }
                    ],
                    "correctCount": 8,
                    "numberRange": { "min": 1, "max": 10 },
                    "explanation": "Có đúng 8 quả táo đỏ.",
                    "explanationAudio": "/media/tts/m8-q2-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m8-slide-q3",
                "teacherNote": "Tách 7 thành 5 và mấy?",
                "question": {
                    "type": "multiple_choice",
                    "id": "m8-q3-mc",
                    "prompt": "7 gồm 5 và mấy?",
                    "promptAudio": "/media/tts/m8-q3-prompt.mp3",
                    "illustration": "/media/images/fish.svg",
                    "options": [
                        { "id": "m8-opt-2", "label": "Và 2", "audio": "/media/tts/m8-opt-va-2.mp3", "isCorrect": True },
                        { "id": "m8-opt-3", "label": "Và 3", "audio": "/media/tts/m8-opt-va-3.mp3", "isCorrect": False },
                        { "id": "m8-opt-1", "label": "Và 1", "audio": "/media/tts/m8-opt-va-1.mp3", "isCorrect": False }
                    ],
                    "explanation": "7 gồm 5 và 2 vì 5 + 2 = 7.",
                    "explanationAudio": "/media/tts/m8-q3-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m8-slide-q4",
                "teacherNote": "Điền số còn thiếu vào sơ đồ tách gộp",
                "question": {
                    "type": "tap_place",
                    "id": "m8-q4-tap",
                    "prompt": "Gộp 7 và mấy để được 10?",
                    "promptAudio": "/media/tts/m8-q4-prompt.mp3",
                    "targets": [
                        { "id": "m8-t1", "prefix": "7 + ", "suffix": " = 10", "label": "Số cần tìm" }
                    ],
                    "items": [
                        { "id": "m8-i1", "text": "3", "audio": "/media/tts/m8-num-3.mp3" },
                        { "id": "m8-i2", "text": "2", "audio": "/media/tts/m8-num-2.mp3" },
                        { "id": "m8-i3", "text": "4", "audio": "/media/tts/m8-num-4.mp3" }
                    ],
                    "correctMapping": { "m8-t1": "m8-i1" },
                    "explanation": "7 cộng 3 bằng 10.",
                    "explanationAudio": "/media/tts/m8-q4-exp.mp3"
                },
                "timeLimitSeconds": 25,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m8-slide-q5",
                "teacherNote": "Nối các cặp số gộp thành 10",
                "question": {
                    "type": "matching",
                    "id": "m8-q5-matching",
                    "prompt": "Nối các cặp số gộp lại thành 10:",
                    "promptAudio": "/media/tts/m8-q5-prompt.mp3",
                    "leftColumn": [
                        { "id": "m8-l1", "text": "Số 8", "audio": "/media/tts/m8-pair-8.mp3" },
                        { "id": "m8-l2", "text": "Số 6", "audio": "/media/tts/m8-pair-6.mp3" },
                        { "id": "m8-l3", "text": "Số 5", "audio": "/media/tts/m8-pair-5.mp3" }
                    ],
                    "rightColumn": [
                        { "id": "m8-r1", "text": "Gộp với 2", "audio": "/media/tts/m8-pair-gop-2.mp3" },
                        { "id": "m8-r2", "text": "Gộp với 4", "audio": "/media/tts/m8-pair-gop-4.mp3" },
                        { "id": "m8-r3", "text": "Gộp với 5", "audio": "/media/tts/m8-pair-gop-5.mp3" }
                    ],
                    "correctPairs": [
                        { "leftId": "m8-l1", "rightId": "m8-r1" },
                        { "leftId": "m8-l2", "rightId": "m8-r2" },
                        { "leftId": "m8-l3", "rightId": "m8-r3" }
                    ],
                    "explanation": "8 + 2 = 10, 6 + 4 = 10, 5 + 5 = 10.",
                    "explanationAudio": "/media/tts/m8-q5-exp.mp3"
                },
                "timeLimitSeconds": 30,
                "showRetryOnWrong": True
            },
            {
                "type": "question-slide",
                "id": "m8-slide-q6",
                "teacherNote": "Tách 9 thành 4 và 5",
                "question": {
                    "type": "number_select",
                    "id": "m8-q6-ns",
                    "prompt": "9 bớt 4 còn mấy?",
                    "promptAudio": "/media/tts/m8-q6-prompt.mp3",
                    "illustration": "/media/images/star.svg",
                    "expression": "9 - 4 = ?",
                    "choices": [3, 4, 5, 6],
                    "correctAnswer": 5,
                    "explanation": "Chín bớt bốn còn năm. 9 - 4 = 5.",
                    "explanationAudio": "/media/tts/m8-q6-exp.mp3"
                },
                "timeLimitSeconds": 20,
                "showRetryOnWrong": True
            }
        ]
    })

    return lessons
