# -*- coding: utf-8 -*-
"""Math Lessons 21-30 for Grade 1"""

true = True
false = False
null = None

MATH_LESSONS_BATCH4 = [
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-21-tinh-ba-so",
    "title": "Bài 21: Tính ba số liên tiếp",
    "subject": "math",
    "grade": 1,
    "description": "Thực hiện chuỗi hai phép tính liên tiếp từ trái sang phải trong phạm vi 10 và 20 qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m21-title-slide",
        "title": "Bài 21: Tính ba số liên tiếp",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn học sinh quy tắc thực hiện phép tính từ trái sang phải.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m21-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m21-intro-slide",
        "title": "Quy tắc tính ba số",
        "body": "Khi gặp chuỗi hai phép tính, chúng mình thực hiện lần lượt từ trái sang phải. Ví dụ: 5 + 3 - 2 = ? Ta lấy 5 + 3 = 8, rồi lấy 8 - 2 = 6.",
        "teacherNote": "Cho học sinh nhẩm từng bước trung gian và ghi nhớ kết quả.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m21-intro.mp3",
        "bullets": [
          "Bước 1: Tính phép tính thứ nhất (bên trái)",
          "Bước 2: Lấy kết quả đó tính tiếp với số thứ ba",
          "Ví dụ: 5 + 3 - 2 = 8 - 2 = 6"
        ]
      },
      {
        "type": "question-slide",
        "id": "m21-slide-q1",
        "teacherNote": "Tính nhẩm 5 + 3 - 2",
        "question": {
          "type": "number_select",
          "id": "m21-q1-num",
          "prompt": "Chọn kết quả đúng của phép tính: 5 + 3 - 2 = ?",
          "promptAudio": "/media/tts/m21-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "expression": "5 + 3 - 2 = ?",
          "choices": [
            5,
            6,
            7,
            8
          ],
          "correctAnswer": 6,
          "explanation": "Ta lấy 5 cộng 3 bằng 8, sau đó lấy 8 trừ 2 bằng 6.",
          "explanationAudio": "/media/tts/m21-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m21-slide-q2",
        "teacherNote": "Tính nhẩm 8 - 4 + 3",
        "question": {
          "type": "multiple_choice",
          "id": "m21-q2-mc",
          "prompt": "Kết quả của phép tính 8 - 4 + 3 là bao nhiêu?",
          "promptAudio": "/media/tts/m21-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "options": [
            {
              "id": "m21-opt-7",
              "label": "Bằng 7",
              "audio": "/media/tts/m21-opt-7.mp3"
            },
            {
              "id": "m21-opt-6",
              "label": "Bằng 6",
              "audio": "/media/tts/m21-opt-6.mp3"
            },
            {
              "id": "m21-opt-8",
              "label": "Bằng 8",
              "audio": "/media/tts/m21-opt-8.mp3"
            }
          ],
          "correctOptionId": "m21-opt-7",
          "explanation": "Ta lấy 8 trừ 4 bằng 4, sau đó lấy 4 cộng 3 bằng 7.",
          "explanationAudio": "/media/tts/m21-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m21-slide-q3",
        "teacherNote": "Đếm số bóng sau khi gộp và bớt",
        "question": {
          "type": "counting",
          "id": "m21-q3-count",
          "prompt": "Đếm xem có bao nhiêu quả bóng trên màn hình?",
          "promptAudio": "/media/tts/m21-q3-prompt.mp3",
          "illustration": "/media/images/ball.svg",
          "items": [
            {
              "image": "/media/images/ball.svg",
              "alt": "Bóng 1"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Bóng 2"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Bóng 3"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Bóng 4"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Bóng 5"
            }
          ],
          "correctCount": 5,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có đúng 5 quả bóng trên màn hình.",
          "explanationAudio": "/media/tts/m21-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m21-slide-q4",
        "teacherNote": "Điền kết quả 10 - 4 + 2",
        "question": {
          "type": "tap_place",
          "id": "m21-q4-tap",
          "prompt": "Chọn số thích hợp đặt vào ô trống: 10 - 4 + 2 = ...",
          "promptAudio": "/media/tts/m21-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "m21-tgt1",
              "label": "...",
              "prefixText": "10 - 4 + 2 = ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "m21-it-8",
              "label": "8",
              "audio": "/media/tts/m21-it-8.mp3"
            },
            {
              "id": "m21-it-7",
              "label": "7",
              "audio": "/media/tts/m21-it-7.mp3"
            }
          ],
          "correctMapping": {
            "m21-it-8": "m21-tgt1"
          },
          "explanation": "10 trừ 4 bằng 6, 6 cộng 2 bằng 8.",
          "explanationAudio": "/media/tts/m21-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m21-slide-q5",
        "teacherNote": "Nối phép tính với kết quả",
        "question": {
          "type": "matching",
          "id": "m21-q5-match",
          "prompt": "Nối phép tính ở cột trái với kết quả tương ứng ở cột phải:",
          "promptAudio": "/media/tts/m21-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m21-l1",
              "label": "4 + 2 + 3",
              "audio": "/media/tts/m21-l1.mp3"
            },
            {
              "id": "m21-l2",
              "label": "9 - 5 + 1",
              "audio": "/media/tts/m21-l2.mp3"
            },
            {
              "id": "m21-l3",
              "label": "7 + 3 - 4",
              "audio": "/media/tts/m21-l3.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m21-r1",
              "label": "Bằng 9",
              "audio": "/media/tts/m21-r1.mp3"
            },
            {
              "id": "m21-r2",
              "label": "Bằng 5",
              "audio": "/media/tts/m21-r2.mp3"
            },
            {
              "id": "m21-r3",
              "label": "Bằng 6",
              "audio": "/media/tts/m21-r3.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m21-l1",
              "rightId": "m21-r1"
            },
            {
              "leftId": "m21-l2",
              "rightId": "m21-r2"
            },
            {
              "leftId": "m21-l3",
              "rightId": "m21-r3"
            }
          ],
          "explanation": "4+2+3=9, 9-5+1=5, 7+3-4=6.",
          "explanationAudio": "/media/tts/m21-q5-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m21-slide-q6",
        "teacherNote": "Tính nhẩm 10 + 6 - 4",
        "question": {
          "type": "number_select",
          "id": "m21-q6-num",
          "prompt": "Chọn kết quả đúng của phép tính: 10 + 6 - 4 = ?",
          "promptAudio": "/media/tts/m21-q6-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "expression": "10 + 6 - 4 = ?",
          "choices": [
            10,
            11,
            12,
            14
          ],
          "correctAnswer": 12,
          "explanation": "10 cộng 6 bằng 16, 16 trừ 4 bằng 12.",
          "explanationAudio": "/media/tts/m21-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-22-so-sanh-phep-tinh",
    "title": "Bài 22: So sánh với phép tính",
    "subject": "math",
    "grade": 1,
    "description": "So sánh kết quả phép tính với một số hoặc so sánh giữa hai phép tính qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m22-title-slide",
        "title": "Bài 22: So sánh với phép tính",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn tính kết quả phép tính trước rồi mới so sánh.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m22-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m22-intro-slide",
        "title": "Cách so sánh phép tính",
        "body": "Để so sánh phép tính với một số, ta tính kết quả của phép tính đó trước, sau đó so sánh kết quả tìm được với số đã cho.",
        "teacherNote": "Nhắc học sinh viết kết quả nhẩm lên trên phép tính.",
        "illustration": "/media/images/pencil.svg",
        "audio": "/media/tts/m22-intro.mp3",
        "bullets": [
          "Ví dụ: 4 + 3 ... 8",
          "Ta có: 4 + 3 = 7",
          "Vì 7 < 8 nên 4 + 3 < 8"
        ]
      },
      {
        "type": "question-slide",
        "id": "m22-slide-q1",
        "teacherNote": "So sánh 4 + 3 và 8",
        "question": {
          "type": "multiple_choice",
          "id": "m22-q1-mc",
          "prompt": "Chọn dấu thích hợp điền vào chỗ chấm: 4 + 3 ... 8",
          "promptAudio": "/media/tts/m22-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "m22-opt-be",
              "label": "Dấu bé hơn (<)",
              "audio": "/media/tts/m22-opt-be.mp3"
            },
            {
              "id": "m22-opt-lon",
              "label": "Dấu lớn hơn (>)",
              "audio": "/media/tts/m22-opt-lon.mp3"
            },
            {
              "id": "m22-opt-bang",
              "label": "Dấu bằng (=)",
              "audio": "/media/tts/m22-opt-bang.mp3"
            }
          ],
          "correctOptionId": "m22-opt-be",
          "explanation": "4 + 3 = 7, vì 7 bé hơn 8 nên 4 + 3 < 8.",
          "explanationAudio": "/media/tts/m22-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m22-slide-q2",
        "teacherNote": "So sánh 9 - 2 và 7",
        "question": {
          "type": "multiple_choice",
          "id": "m22-q2-mc",
          "prompt": "Chọn dấu thích hợp điền vào chỗ chấm: 9 - 2 ... 7",
          "promptAudio": "/media/tts/m22-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "options": [
            {
              "id": "m22-q2-bang",
              "label": "Dấu bằng (=)",
              "audio": "/media/tts/m22-q2-bang.mp3"
            },
            {
              "id": "m22-q2-lon",
              "label": "Dấu lớn hơn (>)",
              "audio": "/media/tts/m22-q2-lon.mp3"
            },
            {
              "id": "m22-q2-be",
              "label": "Dấu bé hơn (<)",
              "audio": "/media/tts/m22-q2-be.mp3"
            }
          ],
          "correctOptionId": "m22-q2-bang",
          "explanation": "9 - 2 = 7, vì 7 bằng 7 nên 9 - 2 = 7.",
          "explanationAudio": "/media/tts/m22-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m22-slide-q3",
        "teacherNote": "Điền số thỏa mãn 5 + 2 > ?",
        "question": {
          "type": "tap_place",
          "id": "m22-q3-tap",
          "prompt": "Chọn số thích hợp điền vào ô trống để được phép so sánh đúng: 5 + 2 > ...",
          "promptAudio": "/media/tts/m22-q3-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "m22-tgt1",
              "label": "...",
              "prefixText": "5 + 2 > ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "m22-it-6",
              "label": "6",
              "audio": "/media/tts/m22-it-6.mp3"
            },
            {
              "id": "m22-it-8",
              "label": "8",
              "audio": "/media/tts/m22-it-8.mp3"
            }
          ],
          "correctMapping": {
            "m22-it-6": "m22-tgt1"
          },
          "explanation": "5 + 2 = 7, 7 lớn hơn 6 nên ta chọn số 6.",
          "explanationAudio": "/media/tts/m22-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m22-slide-q4",
        "teacherNote": "Nối phép tính với so sánh đúng",
        "question": {
          "type": "matching",
          "id": "m22-q4-match",
          "prompt": "Nối phép tính ở cột trái với so sánh đúng ở cột phải:",
          "promptAudio": "/media/tts/m22-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m22-l1",
              "label": "6 + 3",
              "audio": "/media/tts/m22-l1.mp3"
            },
            {
              "id": "m22-l2",
              "label": "5 - 1",
              "audio": "/media/tts/m22-l2.mp3"
            },
            {
              "id": "m22-l3",
              "label": "2 + 4",
              "audio": "/media/tts/m22-l3.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m22-r1",
              "label": "Lớn hơn 8",
              "audio": "/media/tts/m22-r1.mp3"
            },
            {
              "id": "m22-r2",
              "label": "Bằng số 4",
              "audio": "/media/tts/m22-r2.mp3"
            },
            {
              "id": "m22-r3",
              "label": "Bé hơn 7",
              "audio": "/media/tts/m22-r3.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m22-l1",
              "rightId": "m22-r1"
            },
            {
              "leftId": "m22-l2",
              "rightId": "m22-r2"
            },
            {
              "leftId": "m22-l3",
              "rightId": "m22-r3"
            }
          ],
          "explanation": "6+3=9 > 8; 5-1=4 = 4; 2+4=6 < 7.",
          "explanationAudio": "/media/tts/m22-q4-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m22-slide-q5",
        "teacherNote": "Đếm số sao và so sánh",
        "question": {
          "type": "counting",
          "id": "m22-q5-count",
          "prompt": "Đếm xem có bao nhiêu ngôi sao vàng trên màn hình?",
          "promptAudio": "/media/tts/m22-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "items": [
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 1"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 2"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 3"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 4"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 5"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 6"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 7"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Sao 8"
            }
          ],
          "correctCount": 8,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có tất cả 8 ngôi sao vàng, 8 bé hơn 5 + 4 = 9.",
          "explanationAudio": "/media/tts/m22-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m22-slide-q6",
        "teacherNote": "So sánh 3 + 4 và 2 + 5",
        "question": {
          "type": "number_select",
          "id": "m22-q6-num",
          "prompt": "Tính kết quả của phép so sánh: 3 + 4 = 7 và 2 + 5 = 7. Hai kết quả này bằng mấy?",
          "promptAudio": "/media/tts/m22-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "expression": "3 + 4 = 2 + 5 = ?",
          "choices": [
            5,
            6,
            7,
            8
          ],
          "correctAnswer": 7,
          "explanation": "Cả hai phép tính đều có kết quả bằng 7.",
          "explanationAudio": "/media/tts/m22-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-23-dai-ngan-so-sanh",
    "title": "Bài 23: Dài hơn, ngắn hơn",
    "subject": "math",
    "grade": 1,
    "description": "Làm quen với khái niệm đo lường, so sánh chiều dài các đồ vật quen thuộc qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m23-title-slide",
        "title": "Bài 23: Dài hơn, ngắn hơn",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Cho học sinh quan sát đồ dùng học tập thực tế và so sánh.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m23-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m23-intro-slide",
        "title": "So sánh chiều dài đồ vật",
        "body": "Đặt một đầu của hai đồ vật bằng nhau, đồ vật nào nhô ra dài hơn thì đồ vật đó dài hơn. Đồ vật còn lại ngắn hơn.",
        "teacherNote": "Hướng dẫn đặt thẳng hàng một đầu mốc để so sánh chuẩn xác.",
        "illustration": "/media/images/pencil.svg",
        "audio": "/media/tts/m23-intro.mp3",
        "bullets": [
          "Bút chì dài hơn cục tẩy",
          "Cục tẩy ngắn hơn bút chì",
          "Thước kẻ dài hơn chiếc bút"
        ]
      },
      {
        "type": "question-slide",
        "id": "m23-slide-q1",
        "teacherNote": "So sánh bút chì và cục tẩy",
        "question": {
          "type": "multiple_choice",
          "id": "m23-q1-mc",
          "prompt": "Cây bút chì dài hơn hay ngắn hơn cục tẩy?",
          "promptAudio": "/media/tts/m23-q1-prompt.mp3",
          "illustration": "/media/images/pencil.svg",
          "options": [
            {
              "id": "m23-opt-dai",
              "label": "Dài hơn",
              "audio": "/media/tts/m23-opt-dai.mp3"
            },
            {
              "id": "m23-opt-ngan",
              "label": "Ngắn hơn",
              "audio": "/media/tts/m23-opt-ngan.mp3"
            },
            {
              "id": "m23-opt-bang",
              "label": "Bằng nhau",
              "audio": "/media/tts/m23-opt-bang.mp3"
            }
          ],
          "correctOptionId": "m23-opt-dai",
          "explanation": "Cây bút chì có chiều dài lớn hơn cục tẩy nên bút chì dài hơn cục tẩy.",
          "explanationAudio": "/media/tts/m23-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m23-slide-q2",
        "teacherNote": "Nối đồ vật với mức độ chiều dài",
        "question": {
          "type": "matching",
          "id": "m23-q2-match",
          "prompt": "Nối đồ vật ở cột trái với nhận xét chiều dài tương ứng ở cột phải:",
          "promptAudio": "/media/tts/m23-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m23-l1",
              "label": "Chiếc xe buýt",
              "audio": "/media/tts/m23-l1.mp3"
            },
            {
              "id": "m23-l2",
              "label": "Cây bút chì",
              "audio": "/media/tts/m23-l2.mp3"
            },
            {
              "id": "m23-l3",
              "label": "Chiếc lá cây",
              "audio": "/media/tts/m23-l3.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m23-r1",
              "label": "Dài nhất trong ba vật",
              "audio": "/media/tts/m23-r1.mp3"
            },
            {
              "id": "m23-r2",
              "label": "Dài vừa phải",
              "audio": "/media/tts/m23-r2.mp3"
            },
            {
              "id": "m23-r3",
              "label": "Ngắn nhất trong ba vật",
              "audio": "/media/tts/m23-r3.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m23-l1",
              "rightId": "m23-r1"
            },
            {
              "leftId": "m23-l2",
              "rightId": "m23-r2"
            },
            {
              "leftId": "m23-l3",
              "rightId": "m23-r3"
            }
          ],
          "explanation": "Xe buýt dài nhất, bút chì dài vừa và chiếc lá ngắn nhất.",
          "explanationAudio": "/media/tts/m23-q2-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m23-slide-q3",
        "teacherNote": "Điền từ dài hơn",
        "question": {
          "type": "tap_place",
          "id": "m23-q3-tap",
          "prompt": "Chọn từ thích hợp điền vào chỗ chấm: Thước kẻ ... chiếc bút chì.",
          "promptAudio": "/media/tts/m23-q3-prompt.mp3",
          "illustration": "/media/images/ruler.svg",
          "targets": [
            {
              "id": "m23-tgt1",
              "label": "...",
              "prefixText": "Thước kẻ ",
              "suffixText": " chiếc bút chì."
            }
          ],
          "items": [
            {
              "id": "m23-it-daihon",
              "label": "dài hơn",
              "audio": "/media/tts/m23-it-daihon.mp3"
            },
            {
              "id": "m23-it-nganhon",
              "label": "ngắn hơn",
              "audio": "/media/tts/m23-it-nganhon.mp3"
            }
          ],
          "correctMapping": {
            "m23-it-daihon": "m23-tgt1"
          },
          "explanation": "Chiếc thước kẻ thường có chiều dài 20cm, dài hơn bút chì.",
          "explanationAudio": "/media/tts/m23-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m23-slide-q4",
        "teacherNote": "Đếm số cây bút chì",
        "question": {
          "type": "counting",
          "id": "m23-q4-count",
          "prompt": "Đếm xem có bao nhiêu cây bút chì trên màn hình?",
          "promptAudio": "/media/tts/m23-q4-prompt.mp3",
          "illustration": "/media/images/pencil.svg",
          "items": [
            {
              "image": "/media/images/pencil.svg",
              "alt": "Bút 1"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Bút 2"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Bút 3"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Bút 4"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Bút 5"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Bút 6"
            }
          ],
          "correctCount": 6,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có tất cả 6 cây bút chì.",
          "explanationAudio": "/media/tts/m23-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m23-slide-q5",
        "teacherNote": "Bàn học dài hơn quyển vở",
        "question": {
          "type": "multiple_choice",
          "id": "m23-q5-mc",
          "prompt": "Chiếc bàn học dài hơn cuốn vở là Đúng hay Sai?",
          "promptAudio": "/media/tts/m23-q5-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "options": [
            {
              "id": "m23-opt-dung",
              "label": "Đúng",
              "audio": "/media/tts/m23-opt-dung.mp3"
            },
            {
              "id": "m23-opt-sai",
              "label": "Sai",
              "audio": "/media/tts/m23-opt-sai.mp3"
            }
          ],
          "correctOptionId": "m23-opt-dung",
          "explanation": "Bàn học của chúng mình chắc chắn dài hơn cuốn vở ghi bài.",
          "explanationAudio": "/media/tts/m23-q5-exp.mp3"
        },
        "timeLimitSeconds": 20,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m23-slide-q6",
        "teacherNote": "Số chiếc bút chì dài hơn",
        "question": {
          "type": "number_select",
          "id": "m23-q6-num",
          "prompt": "Bút chì xanh dài 10cm, bút chì đỏ dài 7cm. Bút chì xanh dài hơn bút chì đỏ mấy cm?",
          "promptAudio": "/media/tts/m23-q6-prompt.mp3",
          "illustration": "/media/images/pencil.svg",
          "expression": "10 - 7 = ?",
          "choices": [
            2,
            3,
            4,
            5
          ],
          "correctAnswer": 3,
          "explanation": "Ta lấy 10 trừ 7 bằng 3, bút chì xanh dài hơn 3cm.",
          "explanationAudio": "/media/tts/m23-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-24-xang-ti-met",
    "title": "Bài 24: Đo độ dài & Đơn vị Xăng-ti-mét",
    "subject": "math",
    "grade": 1,
    "description": "Làm quen thước kẻ có vạch chia xăng-ti-mét (cm), tập đo độ dài và làm phép tính đo lường.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m24-title-slide",
        "title": "Bài 24: Đo độ dài & Đơn vị Xăng-ti-mét",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn đặt vạch số 0 trùng với một đầu của vật cần đo.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m24-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m24-intro-slide",
        "title": "Đơn vị Xăng-ti-mét (cm)",
        "body": "Xăng-ti-mét là đơn vị đo độ dài, viết tắt là cm. Trên thước kẻ, khoảng cách giữa hai vạch số liên tiếp là 1cm.",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m24-intro.mp3",
        "bullets": [
          "Xăng-ti-mét viết tắt là cm",
          "Khi đo, đặt vạch 0 trùng đầu vật",
          "Cộng trừ số đo kèm đơn vị cm: 5cm + 3cm = 8cm"
        ]
      },
      {
        "type": "question-slide",
        "id": "m24-slide-q1",
        "teacherNote": "Câu hỏi 1: Đơn vị xăng-ti-mét được viết tắt là gì?",
        "question": {
          "type": "multiple_choice",
          "id": "m24-q1-mc",
          "prompt": "Đơn vị xăng-ti-mét được viết tắt là gì?",
          "promptAudio": "/media/tts/m24-q1-prompt.mp3",
          "illustration": "/media/images/ruler.svg",
          "options": [
            {
              "id": "m24-opt-cm",
              "label": "cm",
              "audio": "/media/tts/m24-q1-opt0.mp3"
            },
            {
              "id": "m24-opt-kg",
              "label": "kg",
              "audio": "/media/tts/m24-q1-opt1.mp3"
            },
            {
              "id": "m24-opt-dm",
              "label": "dm",
              "audio": "/media/tts/m24-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "m24-opt-cm",
          "explanation": "Xăng-ti-mét viết tắt là cm.",
          "explanationAudio": "/media/tts/m24-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m24-slide-q2",
        "teacherNote": "Câu hỏi 2: Bút chì đặt từ vạch 0 đến vạch 8 trên th",
        "question": {
          "type": "number_select",
          "id": "m24-q2-num",
          "prompt": "Bút chì đặt từ vạch 0 đến vạch 8 trên thước kẻ. Bút chì dài bao nhiêu xăng-ti-mét?",
          "promptAudio": "/media/tts/m24-q2-prompt.mp3",
          "illustration": "/media/images/ruler.svg",
          "expression": "Bút chì dài: ? cm",
          "choices": [
            6,
            7,
            8,
            9
          ],
          "correctAnswer": 8,
          "explanation": "Từ vạch 0 đến vạch 8 tương ứng độ dài 8cm.",
          "explanationAudio": "/media/tts/m24-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m24-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối phép tính đo độ dài với kết quả đúng",
        "question": {
          "type": "matching",
          "id": "m24-q3-match",
          "prompt": "Nối phép tính đo độ dài với kết quả đúng:",
          "promptAudio": "/media/tts/m24-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m24-l1",
              "label": "5cm + 3cm",
              "audio": "/media/tts/m24-q3-l0.mp3"
            },
            {
              "id": "m24-l2",
              "label": "9cm - 4cm",
              "audio": "/media/tts/m24-q3-l1.mp3"
            },
            {
              "id": "m24-l3",
              "label": "20cm + 10cm",
              "audio": "/media/tts/m24-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m24-r1",
              "label": "Bằng 8cm",
              "audio": "/media/tts/m24-q3-r0.mp3"
            },
            {
              "id": "m24-r2",
              "label": "Bằng 5cm",
              "audio": "/media/tts/m24-q3-r1.mp3"
            },
            {
              "id": "m24-r3",
              "label": "Bằng 30cm",
              "audio": "/media/tts/m24-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m24-l1",
              "rightId": "m24-r1"
            },
            {
              "leftId": "m24-l2",
              "rightId": "m24-r2"
            },
            {
              "leftId": "m24-l3",
              "rightId": "m24-r3"
            }
          ],
          "explanation": "5cm+3cm=8cm; 9cm-4cm=5cm; 20cm+10cm=30cm.",
          "explanationAudio": "/media/tts/m24-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m24-slide-q4",
        "teacherNote": "Câu hỏi 4: Chọn kết quả thích hợp điền vào chỗ chấm",
        "question": {
          "type": "tap_place",
          "id": "m24-q4-tap",
          "prompt": "Chọn kết quả thích hợp điền vào chỗ chấm: 7cm + 2cm = ...",
          "promptAudio": "/media/tts/m24-q4-prompt.mp3",
          "illustration": "/media/images/ruler.svg",
          "targets": [
            {
              "id": "m24-t1",
              "label": "...",
              "prefixText": "7cm + 2cm = ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "m24-i1",
              "label": "9cm",
              "audio": "/media/tts/m24-q4-it0.mp3"
            },
            {
              "id": "m24-i2",
              "label": "8cm",
              "audio": "/media/tts/m24-q4-it1.mp3"
            }
          ],
          "correctMapping": {
            "m24-i1": "m24-t1"
          },
          "explanation": "7cm cộng 2cm bằng 9cm.",
          "explanationAudio": "/media/tts/m24-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m24-slide-q5",
        "teacherNote": "Câu hỏi 5: Đếm xem có bao nhiêu vạch chia trên đoạn",
        "question": {
          "type": "counting",
          "id": "m24-q5-count",
          "prompt": "Đếm xem có bao nhiêu vạch chia trên đoạn thước?",
          "promptAudio": "/media/tts/m24-q5-prompt.mp3",
          "illustration": "/media/images/ruler.svg",
          "items": [
            {
              "image": "/media/images/pencil.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Item 4"
            },
            {
              "image": "/media/images/pencil.svg",
              "alt": "Item 5"
            }
          ],
          "correctCount": 5,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có đúng 5 đoạn khoảng cách xăng-ti-mét.",
          "explanationAudio": "/media/tts/m24-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m24-slide-q6",
        "teacherNote": "Câu hỏi 6: Tính: 15cm - 5cm = ?",
        "question": {
          "type": "number_select",
          "id": "m24-q6-num",
          "prompt": "Tính: 15cm - 5cm = ?",
          "promptAudio": "/media/tts/m24-q6-prompt.mp3",
          "illustration": "/media/images/ruler.svg",
          "expression": "15cm - 5cm = ?",
          "choices": [
            8,
            9,
            10,
            12
          ],
          "correctAnswer": 10,
          "explanation": "15 trừ 5 bằng 10, kết quả là 10cm.",
          "explanationAudio": "/media/tts/m24-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-25-dem-them-2-5-10",
    "title": "Bài 25: Đếm thêm 2, thêm 5, thêm 10",
    "subject": "math",
    "grade": 1,
    "description": "Nhận biết quy luật dãy số cách đều: đếm thêm 2, thêm 5, thêm 10 và điền số còn thiếu vào dãy.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m25-title-slide",
        "title": "Bài 25: Đếm thêm 2, thêm 5, thêm 10",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn tư duy phát hiện khoảng cách giữa các số liên tiếp.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m25-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m25-intro-slide",
        "title": "Quy luật đếm cách đều",
        "body": "Đếm thêm 2: 2, 4, 6, 8, 10. Đếm thêm 5: 5, 10, 15, 20. Đếm thêm 10: 10, 20, 30, 40, 50. Cùng luyện tập đếm thật nhanh nhé!",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m25-intro.mp3",
        "bullets": [
          "Đếm thêm 2: cộng thêm 2 đơn vị",
          "Đếm thêm 5: cộng thêm 5 đơn vị",
          "Đếm thêm 10: cộng thêm 1 chục"
        ]
      },
      {
        "type": "question-slide",
        "id": "m25-slide-q1",
        "teacherNote": "Câu hỏi 1: Điền số tiếp theo vào dãy số đếm thêm 2:",
        "question": {
          "type": "tap_place",
          "id": "m25-q1-tap",
          "prompt": "Điền số tiếp theo vào dãy số đếm thêm 2: 2, 4, 6, 8, ...",
          "promptAudio": "/media/tts/m25-q1-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "m25-t1",
              "label": "...",
              "prefixText": "2, 4, 6, 8, ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "m25-i1",
              "label": "10",
              "audio": "/media/tts/m25-q1-it0.mp3"
            },
            {
              "id": "m25-i2",
              "label": "9",
              "audio": "/media/tts/m25-q1-it1.mp3"
            }
          ],
          "correctMapping": {
            "m25-i1": "m25-t1"
          },
          "explanation": "8 cộng thêm 2 bằng 10.",
          "explanationAudio": "/media/tts/m25-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m25-slide-q2",
        "teacherNote": "Câu hỏi 2: Số tiếp theo trong dãy đếm thêm 5: 5, 10",
        "question": {
          "type": "number_select",
          "id": "m25-q2-num",
          "prompt": "Số tiếp theo trong dãy đếm thêm 5: 5, 10, 15, ? là số nào?",
          "promptAudio": "/media/tts/m25-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "expression": "5, 10, 15, ?",
          "choices": [
            18,
            19,
            20,
            25
          ],
          "correctAnswer": 20,
          "explanation": "15 cộng thêm 5 bằng 20.",
          "explanationAudio": "/media/tts/m25-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m25-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối quy luật đếm ở cột trái với dãy số t",
        "question": {
          "type": "matching",
          "id": "m25-q3-match",
          "prompt": "Nối quy luật đếm ở cột trái với dãy số tương ứng ở cột phải:",
          "promptAudio": "/media/tts/m25-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m25-l1",
              "label": "Đếm thêm 2",
              "audio": "/media/tts/m25-q3-l0.mp3"
            },
            {
              "id": "m25-l2",
              "label": "Đếm thêm 5",
              "audio": "/media/tts/m25-q3-l1.mp3"
            },
            {
              "id": "m25-l3",
              "label": "Đếm thêm 10",
              "audio": "/media/tts/m25-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m25-r1",
              "label": "2, 4, 6, 8, 10",
              "audio": "/media/tts/m25-q3-r0.mp3"
            },
            {
              "id": "m25-r2",
              "label": "5, 10, 15, 20, 25",
              "audio": "/media/tts/m25-q3-r1.mp3"
            },
            {
              "id": "m25-r3",
              "label": "10, 20, 30, 40, 50",
              "audio": "/media/tts/m25-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m25-l1",
              "rightId": "m25-r1"
            },
            {
              "leftId": "m25-l2",
              "rightId": "m25-r2"
            },
            {
              "leftId": "m25-l3",
              "rightId": "m25-r3"
            }
          ],
          "explanation": "Rất chuẩn xác! Bé đã nhận biết đúng cả 3 quy luật đếm.",
          "explanationAudio": "/media/tts/m25-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m25-slide-q4",
        "teacherNote": "Câu hỏi 4: Trong dãy số 10, 20, 30, 40, ... số tiếp",
        "question": {
          "type": "multiple_choice",
          "id": "m25-q4-mc",
          "prompt": "Trong dãy số 10, 20, 30, 40, ... số tiếp theo là số nào?",
          "promptAudio": "/media/tts/m25-q4-prompt.mp3",
          "illustration": "/media/images/ten-rod.svg",
          "options": [
            {
              "id": "m25-opt-50",
              "label": "Số 50",
              "audio": "/media/tts/m25-q4-opt0.mp3"
            },
            {
              "id": "m25-opt-45",
              "label": "Số 45",
              "audio": "/media/tts/m25-q4-opt1.mp3"
            },
            {
              "id": "m25-opt-60",
              "label": "Số 60",
              "audio": "/media/tts/m25-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "m25-opt-50",
          "explanation": "Dãy số tròn chục đếm thêm 10, sau 40 là 50.",
          "explanationAudio": "/media/tts/m25-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m25-slide-q5",
        "teacherNote": "Câu hỏi 5: Đếm các quả táo trên màn hình (gồm 3 cặp",
        "question": {
          "type": "counting",
          "id": "m25-q5-count",
          "prompt": "Đếm các quả táo trên màn hình (gồm 3 cặp quả táo):",
          "promptAudio": "/media/tts/m25-q5-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "items": [
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 4"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 5"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 6"
            }
          ],
          "correctCount": 6,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có tất cả 6 quả táo (2, 4, 6 quả).",
          "explanationAudio": "/media/tts/m25-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m25-slide-q6",
        "teacherNote": "Câu hỏi 6: Điền số tiếp theo vào dãy số tròn chục: ",
        "question": {
          "type": "tap_place",
          "id": "m25-q6-tap",
          "prompt": "Điền số tiếp theo vào dãy số tròn chục: 30, 40, 50, ...",
          "promptAudio": "/media/tts/m25-q6-prompt.mp3",
          "illustration": "/media/images/ten-rod.svg",
          "targets": [
            {
              "id": "m25-t2",
              "label": "...",
              "prefixText": "30, 40, 50, ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "m25-i3",
              "label": "60",
              "audio": "/media/tts/m25-q6-it0.mp3"
            },
            {
              "id": "m25-i4",
              "label": "55",
              "audio": "/media/tts/m25-q6-it1.mp3"
            }
          ],
          "correctMapping": {
            "m25-i3": "m25-t2"
          },
          "explanation": "50 cộng thêm 10 bằng 60.",
          "explanationAudio": "/media/tts/m25-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-26-tim-so-con-thieu",
    "title": "Bài 26: Tìm số còn thiếu",
    "subject": "math",
    "grade": 1,
    "description": "Tìm số thích hợp điền vào chỗ trống trong các phép tính cộng, trừ có khuyết số.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m26-title-slide",
        "title": "Bài 26: Tìm số còn thiếu",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn dựa vào bảng cộng trừ và tách gộp để tìm số chưa biết.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m26-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m26-intro-slide",
        "title": "Tìm số còn thiếu",
        "body": "Khi phép tính bị khuyết một số: 40 + ? = 47. Ta nhận thấy 47 gồm 40 và 7, vậy số cần tìm chính là 7!",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m26-intro.mp3",
        "bullets": [
          "40 + 7 = 47, vậy số còn thiếu là 7",
          "55 - 5 = 50, vậy số còn thiếu là 5",
          "Dựa vào cấu tạo chục và đơn vị để tìm nhanh"
        ]
      },
      {
        "type": "question-slide",
        "id": "m26-slide-q1",
        "teacherNote": "Câu hỏi 1: Số nào thích hợp điền vào dấu hỏi chấm: ",
        "question": {
          "type": "number_select",
          "id": "m26-q1-num",
          "prompt": "Số nào thích hợp điền vào dấu hỏi chấm: 40 + ? = 47",
          "promptAudio": "/media/tts/m26-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "expression": "40 + ? = 47",
          "choices": [
            5,
            6,
            7,
            8
          ],
          "correctAnswer": 7,
          "explanation": "40 cộng 7 bằng 47, vậy số cần điền là 7.",
          "explanationAudio": "/media/tts/m26-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m26-slide-q2",
        "teacherNote": "Câu hỏi 2: Số nào thích hợp điền vào ô trống: ? + 5",
        "question": {
          "type": "number_select",
          "id": "m26-q2-num",
          "prompt": "Số nào thích hợp điền vào ô trống: ? + 5 = 55",
          "promptAudio": "/media/tts/m26-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "expression": "? + 5 = 55",
          "choices": [
            45,
            50,
            52,
            60
          ],
          "correctAnswer": 50,
          "explanation": "50 cộng 5 bằng 55, số cần tìm là 50.",
          "explanationAudio": "/media/tts/m26-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m26-slide-q3",
        "teacherNote": "Câu hỏi 3: Chọn số thích hợp đặt vào chỗ trống: 68 ",
        "question": {
          "type": "tap_place",
          "id": "m26-q3-tap",
          "prompt": "Chọn số thích hợp đặt vào chỗ trống: 68 - ... = 60",
          "promptAudio": "/media/tts/m26-q3-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "m26-t1",
              "label": "...",
              "prefixText": "68 - ",
              "suffixText": " = 60"
            }
          ],
          "items": [
            {
              "id": "m26-i1",
              "label": "8",
              "audio": "/media/tts/m26-q3-it0.mp3"
            },
            {
              "id": "m26-i2",
              "label": "6",
              "audio": "/media/tts/m26-q3-it1.mp3"
            }
          ],
          "correctMapping": {
            "m26-i1": "m26-t1"
          },
          "explanation": "68 bớt đi 8 đơn vị thì còn 60.",
          "explanationAudio": "/media/tts/m26-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m26-slide-q4",
        "teacherNote": "Câu hỏi 4: Nối phép tính khuyết ở cột trái với số c",
        "question": {
          "type": "matching",
          "id": "m26-q4-match",
          "prompt": "Nối phép tính khuyết ở cột trái với số cần điền ở cột phải:",
          "promptAudio": "/media/tts/m26-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m26-l1",
              "label": "20 + ? = 25",
              "audio": "/media/tts/m26-q4-l0.mp3"
            },
            {
              "id": "m26-l2",
              "label": "34 - ? = 30",
              "audio": "/media/tts/m26-q4-l1.mp3"
            },
            {
              "id": "m26-l3",
              "label": "70 + ? = 79",
              "audio": "/media/tts/m26-q4-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m26-r1",
              "label": "Điền số 5",
              "audio": "/media/tts/m26-q4-r0.mp3"
            },
            {
              "id": "m26-r2",
              "label": "Điền số 4",
              "audio": "/media/tts/m26-q4-r1.mp3"
            },
            {
              "id": "m26-r3",
              "label": "Điền số 9",
              "audio": "/media/tts/m26-q4-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m26-l1",
              "rightId": "m26-r1"
            },
            {
              "leftId": "m26-l2",
              "rightId": "m26-r2"
            },
            {
              "leftId": "m26-l3",
              "rightId": "m26-r3"
            }
          ],
          "explanation": "20+5=25; 34-4=30; 70+9=79.",
          "explanationAudio": "/media/tts/m26-q4-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m26-slide-q5",
        "teacherNote": "Câu hỏi 5: Phép tính nào dưới đây có số thích hợp đ",
        "question": {
          "type": "multiple_choice",
          "id": "m26-q5-mc",
          "prompt": "Phép tính nào dưới đây có số thích hợp điền vào ô trống là số 4?",
          "promptAudio": "/media/tts/m26-q5-prompt.mp3",
          "illustration": "/media/images/pencil.svg",
          "options": [
            {
              "id": "m26-opt-1",
              "label": "50 + ... = 54",
              "audio": "/media/tts/m26-q5-opt0.mp3"
            },
            {
              "id": "m26-opt-2",
              "label": "30 + ... = 35",
              "audio": "/media/tts/m26-q5-opt1.mp3"
            },
            {
              "id": "m26-opt-3",
              "label": "70 + ... = 78",
              "audio": "/media/tts/m26-q5-opt2.mp3"
            }
          ],
          "correctOptionId": "m26-opt-1",
          "explanation": "50 + 4 = 54 nên số cần điền là 4.",
          "explanationAudio": "/media/tts/m26-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m26-slide-q6",
        "teacherNote": "Câu hỏi 6: Đếm xem có bao nhiêu chú cá đang bơi?",
        "question": {
          "type": "counting",
          "id": "m26-q6-count",
          "prompt": "Đếm xem có bao nhiêu chú cá đang bơi?",
          "promptAudio": "/media/tts/m26-q6-prompt.mp3",
          "illustration": "/media/images/fish.svg",
          "items": [
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 4"
            },
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 5"
            },
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 6"
            },
            {
              "image": "/media/images/fish.svg",
              "alt": "Item 7"
            }
          ],
          "correctCount": 7,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có đúng 7 chú cá trên màn hình.",
          "explanationAudio": "/media/tts/m26-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-27-tinh-ba-so-100",
    "title": "Bài 27: Tính ba số trong phạm vi 100",
    "subject": "math",
    "grade": 1,
    "description": "Thực hiện chuỗi hai phép tính liên tiếp với các số tròn chục và số có hai chữ số trong phạm vi 100.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m27-title-slide",
        "title": "Bài 27: Tính ba số trong phạm vi 100",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn tính nhẩm nhanh từng cặp số từ trái qua phải.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m27-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m27-intro-slide",
        "title": "Tính ba số đến 100",
        "body": "Khi tính chuỗi ba số: 30 + 20 + 10 = ? Ta lấy 30 + 20 = 50, rồi 50 + 10 = 60. Rất đơn giản và nhanh chóng!",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m27-intro.mp3",
        "bullets": [
          "30 + 20 + 10 = 50 + 10 = 60",
          "70 - 20 + 5 = 50 + 5 = 55",
          "Luôn thực hiện lần lượt từ trái sang phải"
        ]
      },
      {
        "type": "question-slide",
        "id": "m27-slide-q1",
        "teacherNote": "Câu hỏi 1: Tính: 30 + 20 + 10 = ?",
        "question": {
          "type": "number_select",
          "id": "m27-q1-num",
          "prompt": "Tính: 30 + 20 + 10 = ?",
          "promptAudio": "/media/tts/m27-q1-prompt.mp3",
          "illustration": "/media/images/ten-rod.svg",
          "expression": "30 + 20 + 10 = ?",
          "choices": [
            50,
            60,
            70,
            80
          ],
          "correctAnswer": 60,
          "explanation": "30 + 20 = 50, 50 + 10 = 60.",
          "explanationAudio": "/media/tts/m27-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m27-slide-q2",
        "teacherNote": "Câu hỏi 2: Tính: 70 - 20 + 5 = ?",
        "question": {
          "type": "number_select",
          "id": "m27-q2-num",
          "prompt": "Tính: 70 - 20 + 5 = ?",
          "promptAudio": "/media/tts/m27-q2-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "expression": "70 - 20 + 5 = ?",
          "choices": [
            50,
            52,
            55,
            60
          ],
          "correctAnswer": 55,
          "explanation": "70 - 20 = 50, 50 + 5 = 55.",
          "explanationAudio": "/media/tts/m27-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m27-slide-q3",
        "teacherNote": "Câu hỏi 3: Điền kết quả vào chỗ chấm: 45 + 3 - 2 = ",
        "question": {
          "type": "tap_place",
          "id": "m27-q3-tap",
          "prompt": "Điền kết quả vào chỗ chấm: 45 + 3 - 2 = ...",
          "promptAudio": "/media/tts/m27-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "m27-t1",
              "label": "...",
              "prefixText": "45 + 3 - 2 = ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "m27-i1",
              "label": "46",
              "audio": "/media/tts/m27-q3-it0.mp3"
            },
            {
              "id": "m27-i2",
              "label": "47",
              "audio": "/media/tts/m27-q3-it1.mp3"
            }
          ],
          "correctMapping": {
            "m27-i1": "m27-t1"
          },
          "explanation": "45 + 3 = 48, 48 - 2 = 46.",
          "explanationAudio": "/media/tts/m27-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m27-slide-q4",
        "teacherNote": "Câu hỏi 4: Nối phép tính 3 số với kết quả chính xác",
        "question": {
          "type": "matching",
          "id": "m27-q4-match",
          "prompt": "Nối phép tính 3 số với kết quả chính xác:",
          "promptAudio": "/media/tts/m27-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m27-l1",
              "label": "10 + 40 + 20",
              "audio": "/media/tts/m27-q4-l0.mp3"
            },
            {
              "id": "m27-l2",
              "label": "80 - 30 - 10",
              "audio": "/media/tts/m27-q4-l1.mp3"
            },
            {
              "id": "m27-l3",
              "label": "62 + 5 - 2",
              "audio": "/media/tts/m27-q4-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m27-r1",
              "label": "Bằng 70",
              "audio": "/media/tts/m27-q4-r0.mp3"
            },
            {
              "id": "m27-r2",
              "label": "Bằng 40",
              "audio": "/media/tts/m27-q4-r1.mp3"
            },
            {
              "id": "m27-r3",
              "label": "Bằng 65",
              "audio": "/media/tts/m27-q4-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m27-l1",
              "rightId": "m27-r1"
            },
            {
              "leftId": "m27-l2",
              "rightId": "m27-r2"
            },
            {
              "leftId": "m27-l3",
              "rightId": "m27-r3"
            }
          ],
          "explanation": "10+40+20=70; 80-30-10=40; 62+5-2=65.",
          "explanationAudio": "/media/tts/m27-q4-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m27-slide-q5",
        "teacherNote": "Câu hỏi 5: Kết quả của phép tính 50 + 30 - 40 là ba",
        "question": {
          "type": "multiple_choice",
          "id": "m27-q5-mc",
          "prompt": "Kết quả của phép tính 50 + 30 - 40 là bao nhiêu?",
          "promptAudio": "/media/tts/m27-q5-prompt.mp3",
          "illustration": "/media/images/ten-rod.svg",
          "options": [
            {
              "id": "m27-opt-40",
              "label": "Bằng 40",
              "audio": "/media/tts/m27-q5-opt0.mp3"
            },
            {
              "id": "m27-opt-50",
              "label": "Bằng 50",
              "audio": "/media/tts/m27-q5-opt1.mp3"
            },
            {
              "id": "m27-opt-60",
              "label": "Bằng 60",
              "audio": "/media/tts/m27-q5-opt2.mp3"
            }
          ],
          "correctOptionId": "m27-opt-40",
          "explanation": "50 + 30 = 80, 80 - 40 = 40.",
          "explanationAudio": "/media/tts/m27-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m27-slide-q6",
        "teacherNote": "Câu hỏi 6: Đếm xem có bao nhiêu ngôi sao may mắn?",
        "question": {
          "type": "counting",
          "id": "m27-q6-count",
          "prompt": "Đếm xem có bao nhiêu ngôi sao may mắn?",
          "promptAudio": "/media/tts/m27-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "items": [
            {
              "image": "/media/images/star.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Item 4"
            },
            {
              "image": "/media/images/star.svg",
              "alt": "Item 5"
            }
          ],
          "correctCount": 5,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Có đúng 5 ngôi sao may mắn.",
          "explanationAudio": "/media/tts/m27-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-28-giai-toan-loi-van",
    "title": "Bài 28: Giải toán có lời văn",
    "subject": "math",
    "grade": 1,
    "description": "Đọc hiểu đề bài toán bằng lời văn, nhận diện từ khóa 'thêm vào' hoặc 'bớt đi' để viết phép tính thích hợp.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m28-title-slide",
        "title": "Bài 28: Giải toán có lời văn",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn kỹ năng đọc kĩ câu hỏi: 'tất cả' là cộng, 'còn lại' là trừ.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m28-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m28-intro-slide",
        "title": "Giải toán có lời văn",
        "body": "Khi giải toán có lời văn: Đọc kĩ đề -> Tìm điều bài toán cho biết -> Xác định bài toán hỏi gì -> Viết phép tính và câu trả lời.",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m28-intro.mp3",
        "bullets": [
          "Thêm vào, có tất cả: làm phép cộng (+)",
          "Bớt đi, bay đi, cho đi: làm phép trừ (-)",
          "Viết phép tính kèm kết quả chính xác"
        ]
      },
      {
        "type": "question-slide",
        "id": "m28-slide-q1",
        "teacherNote": "Câu hỏi 1: Nam có 12 viên bi, Nam mua thêm 3 viên b",
        "question": {
          "type": "multiple_choice",
          "id": "m28-q1-mc",
          "prompt": "Nam có 12 viên bi, Nam mua thêm 3 viên bi nữa. Hỏi Nam có tất cả bao nhiêu viên bi? Phép tính đúng là:",
          "promptAudio": "/media/tts/m28-q1-prompt.mp3",
          "illustration": "/media/images/ball.svg",
          "options": [
            {
              "id": "m28-opt-1",
              "label": "12 + 3 = 15",
              "audio": "/media/tts/m28-q1-opt0.mp3"
            },
            {
              "id": "m28-opt-2",
              "label": "12 - 3 = 9",
              "audio": "/media/tts/m28-q1-opt1.mp3"
            },
            {
              "id": "m28-opt-3",
              "label": "12 + 3 = 16",
              "audio": "/media/tts/m28-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "m28-opt-1",
          "explanation": "Nam mua thêm nên ta làm phép tính cộng: 12 + 3 = 15 viên bi.",
          "explanationAudio": "/media/tts/m28-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m28-slide-q2",
        "teacherNote": "Câu hỏi 2: Trên cành có 18 con chim, 5 con chim bay",
        "question": {
          "type": "number_select",
          "id": "m28-q2-num",
          "prompt": "Trên cành có 18 con chim, 5 con chim bay đi. Hỏi trên cành còn lại bao nhiêu con chim?",
          "promptAudio": "/media/tts/m28-q2-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "expression": "18 - 5 = ?",
          "choices": [
            11,
            12,
            13,
            14
          ],
          "correctAnswer": 13,
          "explanation": "5 con bay đi nên ta lấy 18 trừ 5 bằng 13 con chim.",
          "explanationAudio": "/media/tts/m28-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m28-slide-q3",
        "teacherNote": "Câu hỏi 3: Lan có 20 bông hoa, Mai có 10 bông hoa. ",
        "question": {
          "type": "tap_place",
          "id": "m28-q3-tap",
          "prompt": "Lan có 20 bông hoa, Mai có 10 bông hoa. Cả hai bạn có ... bông hoa.",
          "promptAudio": "/media/tts/m28-q3-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "targets": [
            {
              "id": "m28-t1",
              "label": "...",
              "prefixText": "Cả hai bạn có ",
              "suffixText": " bông hoa."
            }
          ],
          "items": [
            {
              "id": "m28-i1",
              "label": "30",
              "audio": "/media/tts/m28-q3-it0.mp3"
            },
            {
              "id": "m28-i2",
              "label": "25",
              "audio": "/media/tts/m28-q3-it1.mp3"
            }
          ],
          "correctMapping": {
            "m28-i1": "m28-t1"
          },
          "explanation": "Cả hai bạn có: 20 + 10 = 30 bông hoa.",
          "explanationAudio": "/media/tts/m28-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m28-slide-q4",
        "teacherNote": "Câu hỏi 4: Nối bài toán ở cột trái với phép tính tư",
        "question": {
          "type": "matching",
          "id": "m28-q4-match",
          "prompt": "Nối bài toán ở cột trái với phép tính tương ứng ở cột phải:",
          "promptAudio": "/media/tts/m28-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m28-l1",
              "label": "Có 25 quả cam, bán đi 5 quả",
              "audio": "/media/tts/m28-q4-l0.mp3"
            },
            {
              "id": "m28-l2",
              "label": "Lớp có 30 bạn, thêm 4 bạn mới",
              "audio": "/media/tts/m28-q4-l1.mp3"
            },
            {
              "id": "m28-l3",
              "label": "Có 48 chiếc kẹo, bớt 8 chiếc",
              "audio": "/media/tts/m28-q4-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m28-r1",
              "label": "25 - 5 = 20",
              "audio": "/media/tts/m28-q4-r0.mp3"
            },
            {
              "id": "m28-r2",
              "label": "30 + 4 = 34",
              "audio": "/media/tts/m28-q4-r1.mp3"
            },
            {
              "id": "m28-r3",
              "label": "48 - 8 = 40",
              "audio": "/media/tts/m28-q4-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m28-l1",
              "rightId": "m28-r1"
            },
            {
              "leftId": "m28-l2",
              "rightId": "m28-r2"
            },
            {
              "leftId": "m28-l3",
              "rightId": "m28-r3"
            }
          ],
          "explanation": "Bán đi, bớt đi là trừ; thêm vào là cộng.",
          "explanationAudio": "/media/tts/m28-q4-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m28-slide-q5",
        "teacherNote": "Câu hỏi 5: Bài toán hỏi 'Có tất cả bao nhiêu?' thì ",
        "question": {
          "type": "multiple_choice",
          "id": "m28-q5-mc",
          "prompt": "Bài toán hỏi 'Có tất cả bao nhiêu?' thì chúng mình thường dùng phép tính gì?",
          "promptAudio": "/media/tts/m28-q5-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "m28-q5-cong",
              "label": "Phép tính cộng (+)",
              "audio": "/media/tts/m28-q5-opt0.mp3"
            },
            {
              "id": "m28-q5-tru",
              "label": "Phép tính trừ (-)",
              "audio": "/media/tts/m28-q5-opt1.mp3"
            },
            {
              "id": "m28-q5-nhan",
              "label": "Phép nhân (x)",
              "audio": "/media/tts/m28-q5-opt2.mp3"
            }
          ],
          "correctOptionId": "m28-q5-cong",
          "explanation": "Gộp lại để tìm tất cả thì làm phép tính cộng.",
          "explanationAudio": "/media/tts/m28-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m28-slide-q6",
        "teacherNote": "Câu hỏi 6: Đếm xem có bao nhiêu quả táo trong giỏ?",
        "question": {
          "type": "counting",
          "id": "m28-q6-count",
          "prompt": "Đếm xem có bao nhiêu quả táo trong giỏ?",
          "promptAudio": "/media/tts/m28-q6-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "items": [
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/apple.svg",
              "alt": "Item 4"
            }
          ],
          "correctCount": 4,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Trong giỏ có đúng 4 quả táo.",
          "explanationAudio": "/media/tts/m28-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-29-thoi-gian-trong-ngay",
    "title": "Bài 29: Các buổi trong ngày & Thời gian",
    "subject": "math",
    "grade": 1,
    "description": "Nhận biết các thời điểm sáng, trưa, chiều, tối trong ngày; xem giờ đúng và nhận biết 7 ngày trong tuần.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m29-title-slide",
        "title": "Bài 29: Các buổi trong ngày & Thời gian",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Liên hệ với thời gian biểu sinh hoạt hàng ngày của học sinh.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m29-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m29-intro-slide",
        "title": "Một ngày của em",
        "body": "Một ngày gồm các buổi: Sáng (mặt trời mọc, em đi học), Trưa (ăn cơm, nghỉ ngơi), Chiều (tan học vui chơi), Tối (học bài và đi ngủ).",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m29-intro.mp3",
        "bullets": [
          "Buổi sáng: 7 giờ em vào lớp",
          "Buổi trưa: 11 giờ ăn bán trú",
          "Buổi tối: 8 giờ em học bài",
          "Một tuần lễ có 7 ngày"
        ]
      },
      {
        "type": "question-slide",
        "id": "m29-slide-q1",
        "teacherNote": "Câu hỏi 1: Em thường đến trường học bài vào buổi nà",
        "question": {
          "type": "multiple_choice",
          "id": "m29-q1-mc",
          "prompt": "Em thường đến trường học bài vào buổi nào trong ngày?",
          "promptAudio": "/media/tts/m29-q1-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "m29-opt-sang",
              "label": "Buổi sáng",
              "audio": "/media/tts/m29-q1-opt0.mp3"
            },
            {
              "id": "m29-opt-toi",
              "label": "Buổi tối",
              "audio": "/media/tts/m29-q1-opt1.mp3"
            },
            {
              "id": "m29-opt-dem",
              "label": "Nửa đêm",
              "audio": "/media/tts/m29-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "m29-opt-sang",
          "explanation": "Học sinh đến trường học bài vào buổi sáng sớm.",
          "explanationAudio": "/media/tts/m29-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m29-slide-q2",
        "teacherNote": "Câu hỏi 2: Nối thời điểm ở cột trái với hoạt động p",
        "question": {
          "type": "matching",
          "id": "m29-q2-match",
          "prompt": "Nối thời điểm ở cột trái với hoạt động phù hợp ở cột phải:",
          "promptAudio": "/media/tts/m29-q2-prompt.mp3",
          "illustration": "/media/images/clock.svg",
          "leftColumn": [
            {
              "id": "m29-l1",
              "label": "6 giờ sáng",
              "audio": "/media/tts/m29-q2-l0.mp3"
            },
            {
              "id": "m29-l2",
              "label": "11 giờ trưa",
              "audio": "/media/tts/m29-q2-l1.mp3"
            },
            {
              "id": "m29-l3",
              "label": "8 giờ tối",
              "audio": "/media/tts/m29-q2-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m29-r1",
              "label": "Bé thức dậy tập thể dục",
              "audio": "/media/tts/m29-q2-r0.mp3"
            },
            {
              "id": "m29-r2",
              "label": "Bé ăn cơm trưa tại trường",
              "audio": "/media/tts/m29-q2-r1.mp3"
            },
            {
              "id": "m29-r3",
              "label": "Bé ngồi học bài ở nhà",
              "audio": "/media/tts/m29-q2-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m29-l1",
              "rightId": "m29-r1"
            },
            {
              "leftId": "m29-l2",
              "rightId": "m29-r2"
            },
            {
              "leftId": "m29-l3",
              "rightId": "m29-r3"
            }
          ],
          "explanation": "Sáng thức dậy, trưa ăn cơm, tối học bài rất khoa học.",
          "explanationAudio": "/media/tts/m29-q2-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m29-slide-q3",
        "teacherNote": "Câu hỏi 3: Khi đồng hồ chỉ 7 giờ đúng, kim dài luôn",
        "question": {
          "type": "multiple_choice",
          "id": "m29-q3-mc",
          "prompt": "Khi đồng hồ chỉ 7 giờ đúng, kim dài luôn chỉ vào số nào?",
          "promptAudio": "/media/tts/m29-q3-prompt.mp3",
          "illustration": "/media/images/clock.svg",
          "options": [
            {
              "id": "m29-opt-12",
              "label": "Chỉ số 12",
              "audio": "/media/tts/m29-q3-opt0.mp3"
            },
            {
              "id": "m29-opt-6",
              "label": "Chỉ số 6",
              "audio": "/media/tts/m29-q3-opt1.mp3"
            },
            {
              "id": "m29-opt-1",
              "label": "Chỉ số 1",
              "audio": "/media/tts/m29-q3-opt2.mp3"
            }
          ],
          "correctOptionId": "m29-opt-12",
          "explanation": "Khi đồng hồ chỉ giờ đúng, kim dài luôn chỉ thẳng vào số 12.",
          "explanationAudio": "/media/tts/m29-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m29-slide-q4",
        "teacherNote": "Câu hỏi 4: Điền từ thích hợp: Mặt trời mọc vào buổi",
        "question": {
          "type": "tap_place",
          "id": "m29-q4-tap",
          "prompt": "Điền từ thích hợp: Mặt trời mọc vào buổi ..., lặn vào buổi chiều.",
          "promptAudio": "/media/tts/m29-q4-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "targets": [
            {
              "id": "m29-t1",
              "label": "...",
              "prefixText": "Mặt trời mọc vào buổi ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "m29-i1",
              "label": "sáng",
              "audio": "/media/tts/m29-q4-it0.mp3"
            },
            {
              "id": "m29-i2",
              "label": "tối",
              "audio": "/media/tts/m29-q4-it1.mp3"
            }
          ],
          "correctMapping": {
            "m29-i1": "m29-t1"
          },
          "explanation": "Mặt trời mọc ở hướng Đông vào buổi sáng.",
          "explanationAudio": "/media/tts/m29-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m29-slide-q5",
        "teacherNote": "Câu hỏi 5: Đếm số ngày em đi học từ thứ Hai đến thứ",
        "question": {
          "type": "counting",
          "id": "m29-q5-count",
          "prompt": "Đếm số ngày em đi học từ thứ Hai đến thứ Sáu:",
          "promptAudio": "/media/tts/m29-q5-prompt.mp3",
          "illustration": "/media/images/calendar.svg",
          "items": [
            {
              "image": "/media/images/book.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/book.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/book.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/book.svg",
              "alt": "Item 4"
            },
            {
              "image": "/media/images/book.svg",
              "alt": "Item 5"
            }
          ],
          "correctCount": 5,
          "numberRange": {
            "min": 1,
            "max": 10
          },
          "explanation": "Em đi học 5 ngày: thứ Hai, Ba, Tư, Năm, Sáu.",
          "explanationAudio": "/media/tts/m29-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m29-slide-q6",
        "teacherNote": "Câu hỏi 6: Một tuần lễ có bao nhiêu ngày?",
        "question": {
          "type": "number_select",
          "id": "m29-q6-num",
          "prompt": "Một tuần lễ có bao nhiêu ngày?",
          "promptAudio": "/media/tts/m29-q6-prompt.mp3",
          "illustration": "/media/images/calendar.svg",
          "expression": "Một tuần = ? ngày",
          "choices": [
            5,
            6,
            7,
            8
          ],
          "correctAnswer": 7,
          "explanation": "Một tuần lễ có đúng 7 ngày từ thứ Hai đến Chủ nhật.",
          "explanationAudio": "/media/tts/m29-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "math-30-dau-truong-toan-1",
    "title": "Bài 30: Đấu trường Rung chuông vàng",
    "subject": "math",
    "grade": 1,
    "description": "Tổng kết và thi đua toàn diện: Số học, Phép tính 2 chữ số, Đo lường và Giải toán có lời văn.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "m30-title-slide",
        "title": "Bài 30: Đấu trường Rung chuông vàng",
        "subtitle": "Toán Lớp 1 — Bài học tương tác",
        "teacherNote": "Tổ chức trò chơi thi đua 4 đội hào hứng, bấm giờ cho mỗi câu đố.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/m30-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "m30-intro-slide",
        "title": "Đấu trường Rung chuông vàng",
        "body": "Chào mừng các em đến với Đấu trường Rung chuông vàng Toán Lớp 1! Cùng nhau chinh phục các thử thách toán học hấp dẫn nhất!",
        "teacherNote": "Hướng dẫn cả lớp nắm vững kiến thức trọng tâm.",
        "illustration": "/media/images/apple.svg",
        "audio": "/media/tts/m30-intro.mp3",
        "bullets": [
          "Tính nhanh chính xác phép tính 2 chữ số",
          "Giải toán có lời văn thông minh",
          "Tự tin chiến thắng và giành cúp vàng"
        ]
      },
      {
        "type": "question-slide",
        "id": "m30-slide-q1",
        "teacherNote": "Câu hỏi 1: Số liền trước của số 60 là số nào?",
        "question": {
          "type": "multiple_choice",
          "id": "m30-q1-mc",
          "prompt": "Số liền trước của số 60 là số nào?",
          "promptAudio": "/media/tts/m30-q1-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "options": [
            {
              "id": "m30-opt-59",
              "label": "Số 59",
              "audio": "/media/tts/m30-q1-opt0.mp3"
            },
            {
              "id": "m30-opt-61",
              "label": "Số 61",
              "audio": "/media/tts/m30-q1-opt1.mp3"
            },
            {
              "id": "m30-opt-58",
              "label": "Số 58",
              "audio": "/media/tts/m30-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "m30-opt-59",
          "explanation": "Số liền trước của 60 là 59.",
          "explanationAudio": "/media/tts/m30-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m30-slide-q2",
        "teacherNote": "Câu hỏi 2: Tính: 35 + 24 = ?",
        "question": {
          "type": "number_select",
          "id": "m30-q2-num",
          "prompt": "Tính: 35 + 24 = ?",
          "promptAudio": "/media/tts/m30-q2-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "expression": "35 + 24 = ?",
          "choices": [
            57,
            58,
            59,
            60
          ],
          "correctAnswer": 59,
          "explanation": "5 cộng 4 bằng 9, 3 cộng 2 bằng 5. Kết quả là 59.",
          "explanationAudio": "/media/tts/m30-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m30-slide-q3",
        "teacherNote": "Câu hỏi 3: Tính: 87 - 35 = ?",
        "question": {
          "type": "number_select",
          "id": "m30-q3-num",
          "prompt": "Tính: 87 - 35 = ?",
          "promptAudio": "/media/tts/m30-q3-prompt.mp3",
          "illustration": "/media/images/pencil.svg",
          "expression": "87 - 35 = ?",
          "choices": [
            50,
            51,
            52,
            53
          ],
          "correctAnswer": 52,
          "explanation": "7 trừ 5 bằng 2, 8 trừ 3 bằng 5. Kết quả là 52.",
          "explanationAudio": "/media/tts/m30-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m30-slide-q4",
        "teacherNote": "Câu hỏi 4: Nối phép tính với kết quả chính xác:",
        "question": {
          "type": "matching",
          "id": "m30-q4-match",
          "prompt": "Nối phép tính với kết quả chính xác:",
          "promptAudio": "/media/tts/m30-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "m30-l1",
              "label": "42 + 6",
              "audio": "/media/tts/m30-q4-l0.mp3"
            },
            {
              "id": "m30-l2",
              "label": "69 - 7",
              "audio": "/media/tts/m30-q4-l1.mp3"
            },
            {
              "id": "m30-l3",
              "label": "50 + 30",
              "audio": "/media/tts/m30-q4-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "m30-r1",
              "label": "Bằng 48",
              "audio": "/media/tts/m30-q4-r0.mp3"
            },
            {
              "id": "m30-r2",
              "label": "Bằng 62",
              "audio": "/media/tts/m30-q4-r1.mp3"
            },
            {
              "id": "m30-r3",
              "label": "Bằng 80",
              "audio": "/media/tts/m30-q4-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "m30-l1",
              "rightId": "m30-r1"
            },
            {
              "leftId": "m30-l2",
              "rightId": "m30-r2"
            },
            {
              "leftId": "m30-l3",
              "rightId": "m30-r3"
            }
          ],
          "explanation": "42+6=48; 69-7=62; 50+30=80.",
          "explanationAudio": "/media/tts/m30-q4-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m30-slide-q5",
        "teacherNote": "Câu hỏi 5: Chọn dấu thích hợp điền vào ô trống: 40 ",
        "question": {
          "type": "tap_place",
          "id": "m30-q5-tap",
          "prompt": "Chọn dấu thích hợp điền vào ô trống: 40 + 30 ... 80",
          "promptAudio": "/media/tts/m30-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "m30-t1",
              "label": "...",
              "prefixText": "40 + 30 ",
              "suffixText": " 80"
            }
          ],
          "items": [
            {
              "id": "m30-i1",
              "label": "<",
              "audio": "/media/tts/m30-q5-it0.mp3"
            },
            {
              "id": "m30-i2",
              "label": ">",
              "audio": "/media/tts/m30-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "m30-i1": "m30-t1"
          },
          "explanation": "40 + 30 = 70, vì 70 bé hơn 80 nên điền dấu <.",
          "explanationAudio": "/media/tts/m30-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "m30-slide-q6",
        "teacherNote": "Câu hỏi 6: Đếm xem có bao nhiêu quả bóng trên màn h",
        "question": {
          "type": "counting",
          "id": "m30-q6-count",
          "prompt": "Đếm xem có bao nhiêu quả bóng trên màn hình đấu trường?",
          "promptAudio": "/media/tts/m30-q6-prompt.mp3",
          "illustration": "/media/images/ball.svg",
          "items": [
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 1"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 2"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 3"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 4"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 5"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 6"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 7"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 8"
            },
            {
              "image": "/media/images/ball.svg",
              "alt": "Item 9"
            }
          ],
          "correctCount": 9,
          "numberRange": {
            "min": 1,
            "max": 12
          },
          "explanation": "Có đúng 9 quả bóng trên màn hình.",
          "explanationAudio": "/media/tts/m30-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  }
]

def get_math_lessons_batch4():
    return MATH_LESSONS_BATCH4
