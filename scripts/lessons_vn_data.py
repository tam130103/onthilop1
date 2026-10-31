# -*- coding: utf-8 -*-
"""Generated Vietnamese Lessons 07-20 for Grade 1"""

true = True
false = False
null = None

VN_LESSONS = [
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-07-o-o-o",
    "title": "Bài 7: Âm o, ô, ơ và tiếng ghép",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen các âm o, ô, ơ và luyện đọc, ghép các tiếng bò, cô, cờ, bơ, hồ, nơ qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn7-title-slide",
        "title": "Bài 7: Âm o, ô, ơ và tiếng ghép",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn học sinh phân biệt âm o (tròn như quả trứng gà), ô (có nón), ơ (có râu).",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn7-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn7-intro-slide",
        "title": "Làm quen ba chữ cái O, Ô, Ơ",
        "body": "Chữ o tròn như quả trứng, chữ ô đội mũ, chữ ơ có râu. Cùng đọc các tiếng: bò, cô, cờ, bơ nhé!",
        "teacherNote": "Cho học sinh đọc đồng thanh từng chữ cái và tiếng mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn7-intro.mp3",
        "bullets": [
          "o — bò (con bò gặm cỏ)",
          "ô — cô (cô giáo mến yêu)",
          "ơ — cờ (lá cờ đỏ sao vàng)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn7-slide-q1",
        "teacherNote": "Nhận diện âm o trong tiếng bò",
        "question": {
          "type": "multiple_choice",
          "id": "vn7-q1-mc",
          "prompt": "Tiếng 'bò' có chứa âm nào dưới đây?",
          "promptAudio": "/media/tts/vn7-q1-prompt.mp3",
          "illustration": "/media/images/cat.svg",
          "options": [
            {
              "id": "vn7-opt-o",
              "label": "Âm o",
              "audio": "/media/tts/vn7-opt-o.mp3"
            },
            {
              "id": "vn7-opt-oo",
              "label": "Âm ô",
              "audio": "/media/tts/vn7-opt-oo.mp3"
            },
            {
              "id": "vn7-opt-ow",
              "label": "Âm ơ",
              "audio": "/media/tts/vn7-opt-ow.mp3"
            }
          ],
          "correctOptionId": "vn7-opt-o",
          "explanation": "Tiếng bò gồm âm b đứng trước, âm o đứng sau và dấu huyền trên đầu âm o: b - o - bo - huyền - bò.",
          "explanationAudio": "/media/tts/vn7-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn7-slide-q2",
        "teacherNote": "Tìm tiếng có âm ô",
        "question": {
          "type": "multiple_choice",
          "id": "vn7-q2-mc",
          "prompt": "Từ nào dưới đây có chứa âm 'ô'?",
          "promptAudio": "/media/tts/vn7-q2-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn7-q2-opt-co",
              "label": "cô giáo",
              "audio": "/media/tts/vn7-q2-opt-co.mp3"
            },
            {
              "id": "vn7-q2-opt-ca",
              "label": "con cá",
              "audio": "/media/tts/vn7-q2-opt-ca.mp3"
            },
            {
              "id": "vn7-q2-opt-me",
              "label": "quả me",
              "audio": "/media/tts/vn7-q2-opt-me.mp3"
            }
          ],
          "correctOptionId": "vn7-q2-opt-co",
          "explanation": "Tiếng cô có âm c đứng trước, âm ô đứng sau tạo thành c - ô - cô.",
          "explanationAudio": "/media/tts/vn7-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn7-slide-q3",
        "teacherNote": "Điền âm ơ tạo từ lá cờ",
        "question": {
          "type": "tap_place",
          "id": "vn7-q3-tap",
          "prompt": "Chọn âm thích hợp đặt vào chỗ trống để tạo thành từ lá cờ:",
          "promptAudio": "/media/tts/vn7-q3-prompt.mp3",
          "illustration": "/media/images/flag.svg",
          "targets": [
            {
              "id": "vn7-tgt-co",
              "label": "...",
              "prefixText": "Lá c",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn7-item-ow",
              "label": "ờ",
              "audio": "/media/tts/vn7-item-ow.mp3"
            },
            {
              "id": "vn7-item-o",
              "label": "ò",
              "audio": "/media/tts/vn7-item-o.mp3"
            }
          ],
          "correctMapping": {
            "vn7-item-ow": "vn7-tgt-co"
          },
          "explanation": "Lá cờ có tiếng cờ gồm âm c ghép với âm ờ.",
          "explanationAudio": "/media/tts/vn7-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn7-slide-q4",
        "teacherNote": "Nối tiếng với từ ứng dụng",
        "question": {
          "type": "matching",
          "id": "vn7-q4-match",
          "prompt": "Nối tiếng ở cột trái với từ tương ứng ở cột phải:",
          "promptAudio": "/media/tts/vn7-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn7-l-co",
              "label": "cô",
              "audio": "/media/tts/vn7-l-co.mp3"
            },
            {
              "id": "vn7-l-bo",
              "label": "bơ",
              "audio": "/media/tts/vn7-l-bo.mp3"
            },
            {
              "id": "vn7-l-ho",
              "label": "hồ",
              "audio": "/media/tts/vn7-l-ho.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn7-r-cogiao",
              "label": "cô giáo",
              "audio": "/media/tts/vn7-r-cogiao.mp3"
            },
            {
              "id": "vn7-r-quabo",
              "label": "quả bơ",
              "audio": "/media/tts/vn7-r-quabo.mp3"
            },
            {
              "id": "vn7-r-hosen",
              "label": "hồ sen",
              "audio": "/media/tts/vn7-r-hosen.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn7-l-co",
              "rightId": "vn7-r-cogiao"
            },
            {
              "leftId": "vn7-l-bo",
              "rightId": "vn7-r-quabo"
            },
            {
              "leftId": "vn7-l-ho",
              "rightId": "vn7-r-hosen"
            }
          ],
          "explanation": "Đúng rồi! Cô ghép với cô giáo, bơ ghép với quả bơ, hồ ghép với hồ sen.",
          "explanationAudio": "/media/tts/vn7-q4-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn7-slide-q5",
        "teacherNote": "Điền âm tạo từ quả bơ",
        "question": {
          "type": "tap_place",
          "id": "vn7-q5-tap",
          "prompt": "Chọn âm thích hợp đặt vào chỗ trống để tạo thành từ quả bơ:",
          "promptAudio": "/media/tts/vn7-q5-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn7-tgt-bo",
              "label": "...",
              "prefixText": "Quả b",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn7-item-bo-ow",
              "label": "ơ",
              "audio": "/media/tts/vn7-item-bo-ow.mp3"
            },
            {
              "id": "vn7-item-bo-e",
              "label": "e",
              "audio": "/media/tts/vn7-item-bo-e.mp3"
            }
          ],
          "correctMapping": {
            "vn7-item-bo-ow": "vn7-tgt-bo"
          },
          "explanation": "Quả bơ có tiếng bơ: b - ơ - bơ.",
          "explanationAudio": "/media/tts/vn7-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn7-slide-q6",
        "teacherNote": "Nối tiếng với hình ảnh tương ứng",
        "question": {
          "type": "matching",
          "id": "vn7-q6-match",
          "prompt": "Nối tiếng ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn7-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn7-l2-bo",
              "label": "bò",
              "audio": "/media/tts/vn7-l2-bo.mp3"
            },
            {
              "id": "vn7-l2-co",
              "label": "cờ",
              "audio": "/media/tts/vn7-l2-co.mp3"
            },
            {
              "id": "vn7-l2-no",
              "label": "nơ",
              "audio": "/media/tts/vn7-l2-no.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn7-r2-chubo",
              "label": "chú bò",
              "image": "/media/images/cat.svg",
              "audio": "/media/tts/vn7-r2-chubo.mp3"
            },
            {
              "id": "vn7-r2-laco",
              "label": "lá cờ",
              "image": "/media/images/flag.svg",
              "audio": "/media/tts/vn7-r2-laco.mp3"
            },
            {
              "id": "vn7-r2-caino",
              "label": "cái nơ",
              "image": "/media/images/flower.svg",
              "audio": "/media/tts/vn7-r2-caino.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn7-l2-bo",
              "rightId": "vn7-r2-chubo"
            },
            {
              "leftId": "vn7-l2-co",
              "rightId": "vn7-r2-laco"
            },
            {
              "leftId": "vn7-l2-no",
              "rightId": "vn7-r2-caino"
            }
          ],
          "explanation": "Bé giỏi lắm! Chú bò, lá cờ và cái nơ đều là các từ rất quen thuộc.",
          "explanationAudio": "/media/tts/vn7-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-08-u-u-y",
    "title": "Bài 8: Âm u, ư, y và tiếng ghép",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen các âm u, ư, y và luyện đọc từ ngữ ứng dụng: con cú, lá thư, y tá, đu đủ qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn8-title-slide",
        "title": "Bài 8: Âm u, ư, y và tiếng ghép",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn phân biệt u, ư (có móc) và y (i dài).",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn8-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn8-intro-slide",
        "title": "Làm quen ba chữ cái U, Ư, Y",
        "body": "Chữ u như cái thuyền nhỏ, chữ ư có móc xinh, chữ y có nét kéo dài. Cùng đọc: cú, thư, y tá nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn8-intro.mp3",
        "bullets": [
          "u — cú (con cú mèo)",
          "ư — thư (lá thư tay)",
          "y — y tá (cô y tá hiền hậu)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn8-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'cú' có chứa âm nào dưới đây?",
        "question": {
          "type": "multiple_choice",
          "id": "vn8-q1-mc",
          "prompt": "Tiếng 'cú' có chứa âm nào dưới đây?",
          "promptAudio": "/media/tts/vn8-q1-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn8-opt-u",
              "label": "Âm u",
              "audio": "/media/tts/vn8-q1-opt0.mp3"
            },
            {
              "id": "vn8-opt-uw",
              "label": "Âm ư",
              "audio": "/media/tts/vn8-q1-opt1.mp3"
            },
            {
              "id": "vn8-opt-y",
              "label": "Âm y",
              "audio": "/media/tts/vn8-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn8-opt-u",
          "explanation": "Tiếng cú gồm âm c đứng trước, âm u đứng sau và dấu sắc: c - u - cu - sắc - cú.",
          "explanationAudio": "/media/tts/vn8-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn8-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền âm thích hợp để có từ lá thư:",
        "question": {
          "type": "tap_place",
          "id": "vn8-q2-tap",
          "prompt": "Điền âm thích hợp để có từ lá thư:",
          "promptAudio": "/media/tts/vn8-q2-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "targets": [
            {
              "id": "vn8-tgt-thu",
              "label": "...",
              "prefixText": "Lá th",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn8-it-uw",
              "label": "ư",
              "audio": "/media/tts/vn8-q2-it0.mp3"
            },
            {
              "id": "vn8-it-u",
              "label": "u",
              "audio": "/media/tts/vn8-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn8-it-uw": "vn8-tgt-thu"
          },
          "explanation": "Lá thư có tiếng thư gồm âm th và âm ư.",
          "explanationAudio": "/media/tts/vn8-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn8-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối tiếng ở cột trái với từ thích hợp ở ",
        "question": {
          "type": "matching",
          "id": "vn8-q3-match",
          "prompt": "Nối tiếng ở cột trái với từ thích hợp ở cột phải:",
          "promptAudio": "/media/tts/vn8-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn8-l-cu",
              "label": "cú",
              "audio": "/media/tts/vn8-q3-l0.mp3"
            },
            {
              "id": "vn8-l-thu",
              "label": "thư",
              "audio": "/media/tts/vn8-q3-l1.mp3"
            },
            {
              "id": "vn8-l-yta",
              "label": "y tá",
              "audio": "/media/tts/vn8-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn8-r-cumeo",
              "label": "cú mèo",
              "audio": "/media/tts/vn8-q3-r0.mp3"
            },
            {
              "id": "vn8-r-lathu",
              "label": "lá thư",
              "audio": "/media/tts/vn8-q3-r1.mp3"
            },
            {
              "id": "vn8-r-coyta",
              "label": "cô y tá",
              "audio": "/media/tts/vn8-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn8-l-cu",
              "rightId": "vn8-r-cumeo"
            },
            {
              "leftId": "vn8-l-thu",
              "rightId": "vn8-r-lathu"
            },
            {
              "leftId": "vn8-l-yta",
              "rightId": "vn8-r-coyta"
            }
          ],
          "explanation": "Rất tốt! Cú ghép với cú mèo, thư ghép với lá thư, y tá ghép với cô y tá.",
          "explanationAudio": "/media/tts/vn8-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn8-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa âm 'y'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn8-q4-mc",
          "prompt": "Từ nào dưới đây có chứa âm 'y'?",
          "promptAudio": "/media/tts/vn8-q4-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "options": [
            {
              "id": "vn8-q4-opt-yta",
              "label": "y tế",
              "audio": "/media/tts/vn8-q4-opt0.mp3"
            },
            {
              "id": "vn8-q4-opt-me",
              "label": "quả me",
              "audio": "/media/tts/vn8-q4-opt1.mp3"
            },
            {
              "id": "vn8-q4-opt-ca",
              "label": "con cá",
              "audio": "/media/tts/vn8-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn8-q4-opt-yta",
          "explanation": "Từ y tế có tiếng y bắt đầu bằng âm y.",
          "explanationAudio": "/media/tts/vn8-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn8-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền âm thích hợp để tạo thành từ đu đủ:",
        "question": {
          "type": "tap_place",
          "id": "vn8-q5-tap",
          "prompt": "Điền âm thích hợp để tạo thành từ đu đủ:",
          "promptAudio": "/media/tts/vn8-q5-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn8-tgt-dudu",
              "label": "...",
              "prefixText": "Đu đ",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn8-it-du-u",
              "label": "ủ",
              "audio": "/media/tts/vn8-q5-it0.mp3"
            },
            {
              "id": "vn8-it-du-a",
              "label": "ả",
              "audio": "/media/tts/vn8-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn8-it-du-u": "vn8-tgt-dudu"
          },
          "explanation": "Đu đủ gồm hai tiếng đều có âm u.",
          "explanationAudio": "/media/tts/vn8-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn8-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ ở cột trái với hình tương ứng ở c",
        "question": {
          "type": "matching",
          "id": "vn8-q6-match",
          "prompt": "Nối từ ở cột trái với hình tương ứng ở cột phải:",
          "promptAudio": "/media/tts/vn8-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn8-l2-cu",
              "label": "con cú",
              "audio": "/media/tts/vn8-q6-l0.mp3"
            },
            {
              "id": "vn8-l2-thu",
              "label": "lá thư",
              "audio": "/media/tts/vn8-q6-l1.mp3"
            },
            {
              "id": "vn8-l2-nha",
              "label": "nhà ga",
              "audio": "/media/tts/vn8-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn8-r2-cu",
              "label": "chú cú nhỏ",
              "audio": "/media/tts/vn8-q6-r0.mp3",
              "image": "/media/images/bird.svg"
            },
            {
              "id": "vn8-r2-thu",
              "label": "bức thư tay",
              "audio": "/media/tts/vn8-q6-r1.mp3",
              "image": "/media/images/book.svg"
            },
            {
              "id": "vn8-r2-nha",
              "label": "ngôi nhà",
              "audio": "/media/tts/vn8-q6-r2.mp3",
              "image": "/media/images/house.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn8-l2-cu",
              "rightId": "vn8-r2-cu"
            },
            {
              "leftId": "vn8-l2-thu",
              "rightId": "vn8-r2-thu"
            },
            {
              "leftId": "vn8-l2-nha",
              "rightId": "vn8-r2-nha"
            }
          ],
          "explanation": "Chính xác! Bé đã nhận biết đúng các từ ngữ và hình ảnh.",
          "explanationAudio": "/media/tts/vn8-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-09-p-ph-qu-r-s-x",
    "title": "Bài 9: Các phụ âm p, ph, qu, r, s, x",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Nhận biết và đọc đúng các phụ âm p, ph, qu, r, s, x; luyện đọc các từ xe buýt, quả táo, bát phở, con rùa, chim sẻ qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn9-title-slide",
        "title": "Bài 9: Các phụ âm p, ph, qu, r, s, x",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn phát âm phân biệt s (uốn lưỡi) và x; r và d; qu và p.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn9-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn9-intro-slide",
        "title": "Các phụ âm P, PH, QU, R, S, X",
        "body": "Hôm nay chúng mình học các âm ghép và âm đôi: ph, qu, r, s, x. Cùng đọc các từ: quả táo, bát phở, con rùa, chim sẻ, xe buýt!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn9-intro.mp3",
        "bullets": [
          "ph — phở (bát phở bò thơm ngon)",
          "qu — quả (quả táo chín đỏ)",
          "r — rùa (chú rùa chậm chạp)",
          "s — sẻ (chú chim sẻ nhỏ)",
          "x — xe (xe buýt đến trường)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn9-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'quả' bắt đầu bằng âm nào dưới đây",
        "question": {
          "type": "multiple_choice",
          "id": "vn9-q1-mc",
          "prompt": "Tiếng 'quả' bắt đầu bằng âm nào dưới đây?",
          "promptAudio": "/media/tts/vn9-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "vn9-opt-qu",
              "label": "Âm qu",
              "audio": "/media/tts/vn9-q1-opt0.mp3"
            },
            {
              "id": "vn9-opt-ph",
              "label": "Âm ph",
              "audio": "/media/tts/vn9-q1-opt1.mp3"
            },
            {
              "id": "vn9-opt-r",
              "label": "Âm r",
              "audio": "/media/tts/vn9-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn9-opt-qu",
          "explanation": "Tiếng quả bắt đầu bằng âm qu: qu - a - qua - hỏi - quả.",
          "explanationAudio": "/media/tts/vn9-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn9-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền âm thích hợp để có từ bát phở:",
        "question": {
          "type": "tap_place",
          "id": "vn9-q2-tap",
          "prompt": "Điền âm thích hợp để có từ bát phở:",
          "promptAudio": "/media/tts/vn9-q2-prompt.mp3",
          "illustration": "/media/images/chair.svg",
          "targets": [
            {
              "id": "vn9-tgt-pho",
              "label": "...",
              "prefixText": "Bát ",
              "suffixText": "ở"
            }
          ],
          "items": [
            {
              "id": "vn9-it-ph",
              "label": "ph",
              "audio": "/media/tts/vn9-q2-it0.mp3"
            },
            {
              "id": "vn9-it-qu",
              "label": "qu",
              "audio": "/media/tts/vn9-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn9-it-ph": "vn9-tgt-pho"
          },
          "explanation": "Tiếng phở bắt đầu bằng âm ph.",
          "explanationAudio": "/media/tts/vn9-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn9-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối tiếng ở cột trái với từ thích hợp ở ",
        "question": {
          "type": "matching",
          "id": "vn9-q3-match",
          "prompt": "Nối tiếng ở cột trái với từ thích hợp ở cột phải:",
          "promptAudio": "/media/tts/vn9-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn9-l-rua",
              "label": "rùa",
              "audio": "/media/tts/vn9-q3-l0.mp3"
            },
            {
              "id": "vn9-l-se",
              "label": "sẻ",
              "audio": "/media/tts/vn9-q3-l1.mp3"
            },
            {
              "id": "vn9-l-xe",
              "label": "xe",
              "audio": "/media/tts/vn9-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn9-r-conrua",
              "label": "con rùa",
              "audio": "/media/tts/vn9-q3-r0.mp3"
            },
            {
              "id": "vn9-r-chimse",
              "label": "chim sẻ",
              "audio": "/media/tts/vn9-q3-r1.mp3"
            },
            {
              "id": "vn9-r-xebuyt",
              "label": "xe buýt",
              "audio": "/media/tts/vn9-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn9-l-rua",
              "rightId": "vn9-r-conrua"
            },
            {
              "leftId": "vn9-l-se",
              "rightId": "vn9-r-chimse"
            },
            {
              "leftId": "vn9-l-xe",
              "rightId": "vn9-r-xebuyt"
            }
          ],
          "explanation": "Đúng rồi! Rùa nối với con rùa, sẻ nối với chim sẻ, xe nối với xe buýt.",
          "explanationAudio": "/media/tts/vn9-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn9-slide-q4",
        "teacherNote": "Câu hỏi 4: Tiếng nào dưới đây bắt đầu bằng âm 's' (",
        "question": {
          "type": "multiple_choice",
          "id": "vn9-q4-mc",
          "prompt": "Tiếng nào dưới đây bắt đầu bằng âm 's' (sờ nặng)?",
          "promptAudio": "/media/tts/vn9-q4-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn9-q4-opt-se",
              "label": "chim sẻ",
              "audio": "/media/tts/vn9-q4-opt0.mp3"
            },
            {
              "id": "vn9-q4-opt-xe",
              "label": "xe đạp",
              "audio": "/media/tts/vn9-q4-opt1.mp3"
            },
            {
              "id": "vn9-q4-opt-ca",
              "label": "con cá",
              "audio": "/media/tts/vn9-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn9-q4-opt-se",
          "explanation": "Tiếng sẻ bắt đầu bằng âm s, ta cần cong lưỡi khi phát âm.",
          "explanationAudio": "/media/tts/vn9-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn9-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền âm thích hợp để hoàn thiện từ xe bu",
        "question": {
          "type": "tap_place",
          "id": "vn9-q5-tap",
          "prompt": "Điền âm thích hợp để hoàn thiện từ xe buýt:",
          "promptAudio": "/media/tts/vn9-q5-prompt.mp3",
          "illustration": "/media/images/bus.svg",
          "targets": [
            {
              "id": "vn9-tgt-xe",
              "label": "...",
              "prefixText": "",
              "suffixText": " buýt"
            }
          ],
          "items": [
            {
              "id": "vn9-it-xe",
              "label": "Xe",
              "audio": "/media/tts/vn9-q5-it0.mp3"
            },
            {
              "id": "vn9-it-be",
              "label": "Bé",
              "audio": "/media/tts/vn9-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn9-it-xe": "vn9-tgt-xe"
          },
          "explanation": "Từ đúng là xe buýt, phương tiện chở học sinh đến trường.",
          "explanationAudio": "/media/tts/vn9-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn9-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ với hình minh họa tương ứng:",
        "question": {
          "type": "matching",
          "id": "vn9-q6-match",
          "prompt": "Nối từ với hình minh họa tương ứng:",
          "promptAudio": "/media/tts/vn9-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn9-l2-rua",
              "label": "con rùa",
              "audio": "/media/tts/vn9-q6-l0.mp3"
            },
            {
              "id": "vn9-l2-xe",
              "label": "xe buýt",
              "audio": "/media/tts/vn9-q6-l1.mp3"
            },
            {
              "id": "vn9-l2-qua",
              "label": "quả táo",
              "audio": "/media/tts/vn9-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn9-r2-rua",
              "label": "chú rùa vàng",
              "audio": "/media/tts/vn9-q6-r0.mp3",
              "image": "/media/images/turtle.svg"
            },
            {
              "id": "vn9-r2-xe",
              "label": "xe buýt vàng",
              "audio": "/media/tts/vn9-q6-r1.mp3",
              "image": "/media/images/bus.svg"
            },
            {
              "id": "vn9-r2-qua",
              "label": "trái táo đỏ",
              "audio": "/media/tts/vn9-q6-r2.mp3",
              "image": "/media/images/apple.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn9-l2-rua",
              "rightId": "vn9-r2-rua"
            },
            {
              "leftId": "vn9-l2-xe",
              "rightId": "vn9-r2-xe"
            },
            {
              "leftId": "vn9-l2-qua",
              "rightId": "vn9-r2-qua"
            }
          ],
          "explanation": "Bé thật xuất sắc! Bé đã nối chính xác con rùa, xe buýt và quả táo.",
          "explanationAudio": "/media/tts/vn9-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-10-van-m-n",
    "title": "Bài 10: Các vần kết thúc bằng m, n",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Nhận diện các vần am, an, em, en, om, on và luyện ghép các từ quả cam, hoa sen, bạn bè, đom đóm qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn10-title-slide",
        "title": "Bài 10: Các vần kết thúc bằng m, n",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn học sinh khép môi khi phát âm vần có âm cuối m, và đầu lưỡi chạm lợi với âm cuối n.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn10-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn10-intro-slide",
        "title": "Các vần kết thúc bằng M, N",
        "body": "Hôm nay chúng mình làm quen với các vần có âm cuối m và n: am, an, em, en, om, on. Cùng đọc: quả cam, bạn bè, hoa sen, đom đóm nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn10-intro.mp3",
        "bullets": [
          "am — cam (quả cam ngọt)",
          "an — bạn (bạn bè thân thiết)",
          "en — sen (hoa sen ngát hương)",
          "om — đom đóm (chú đom đóm thắp đèn)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn10-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'cam' trong từ 'quả cam' có vần gì",
        "question": {
          "type": "multiple_choice",
          "id": "vn10-q1-mc",
          "prompt": "Tiếng 'cam' trong từ 'quả cam' có vần gì?",
          "promptAudio": "/media/tts/vn10-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "vn10-opt-am",
              "label": "Vần am",
              "audio": "/media/tts/vn10-q1-opt0.mp3"
            },
            {
              "id": "vn10-opt-an",
              "label": "Vần an",
              "audio": "/media/tts/vn10-q1-opt1.mp3"
            },
            {
              "id": "vn10-opt-em",
              "label": "Vần em",
              "audio": "/media/tts/vn10-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn10-opt-am",
          "explanation": "Tiếng cam gồm âm c đứng trước, vần am đứng sau: c - am - cam.",
          "explanationAudio": "/media/tts/vn10-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn10-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ hoa sen:",
        "question": {
          "type": "tap_place",
          "id": "vn10-q2-tap",
          "prompt": "Điền vần thích hợp để có từ hoa sen:",
          "promptAudio": "/media/tts/vn10-q2-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "targets": [
            {
              "id": "vn10-tgt-sen",
              "label": "...",
              "prefixText": "Hoa s",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn10-it-en",
              "label": "en",
              "audio": "/media/tts/vn10-q2-it0.mp3"
            },
            {
              "id": "vn10-it-em",
              "label": "em",
              "audio": "/media/tts/vn10-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn10-it-en": "vn10-tgt-sen"
          },
          "explanation": "Tiếng sen có âm s đứng trước, vần en đứng sau.",
          "explanationAudio": "/media/tts/vn10-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn10-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ mở rộng ở cột p",
        "question": {
          "type": "matching",
          "id": "vn10-q3-match",
          "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn10-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn10-l-cam",
              "label": "quả cam",
              "audio": "/media/tts/vn10-q3-l0.mp3"
            },
            {
              "id": "vn10-l-sen",
              "label": "hoa sen",
              "audio": "/media/tts/vn10-q3-l1.mp3"
            },
            {
              "id": "vn10-l-ban",
              "label": "bạn bè",
              "audio": "/media/tts/vn10-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn10-r-camngot",
              "label": "cam sành ngọt lịm",
              "audio": "/media/tts/vn10-q3-r0.mp3"
            },
            {
              "id": "vn10-r-senhong",
              "label": "hoa sen nở rộ",
              "audio": "/media/tts/vn10-q3-r1.mp3"
            },
            {
              "id": "vn10-r-banthan",
              "label": "bạn thân cùng lớp",
              "audio": "/media/tts/vn10-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn10-l-cam",
              "rightId": "vn10-r-camngot"
            },
            {
              "leftId": "vn10-l-sen",
              "rightId": "vn10-r-senhong"
            },
            {
              "leftId": "vn10-l-ban",
              "rightId": "vn10-r-banthan"
            }
          ],
          "explanation": "Tuyệt vời! Quả cam ngọt lịm, hoa sen nở rộ, bạn thân cùng lớp.",
          "explanationAudio": "/media/tts/vn10-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn10-slide-q4",
        "teacherNote": "Câu hỏi 4: Tiếng nào dưới đây có chứa vần 'an'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn10-q4-mc",
          "prompt": "Tiếng nào dưới đây có chứa vần 'an'?",
          "promptAudio": "/media/tts/vn10-q4-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "options": [
            {
              "id": "vn10-q4-opt-ban",
              "label": "bạn thân",
              "audio": "/media/tts/vn10-q4-opt0.mp3"
            },
            {
              "id": "vn10-q4-opt-sen",
              "label": "búp sen",
              "audio": "/media/tts/vn10-q4-opt1.mp3"
            },
            {
              "id": "vn10-q4-opt-meo",
              "label": "mèo con",
              "audio": "/media/tts/vn10-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn10-q4-opt-ban",
          "explanation": "Tiếng bạn có vần an: b - an - ban - nặng - bạn.",
          "explanationAudio": "/media/tts/vn10-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn10-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ đom đóm:",
        "question": {
          "type": "tap_place",
          "id": "vn10-q5-tap",
          "prompt": "Điền vần thích hợp vào từ đom đóm:",
          "promptAudio": "/media/tts/vn10-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn10-tgt-dom",
              "label": "...",
              "prefixText": "Đom đ",
              "suffixText": "s"
            }
          ],
          "items": [
            {
              "id": "vn10-it-om",
              "label": "óm",
              "audio": "/media/tts/vn10-q5-it0.mp3"
            },
            {
              "id": "vn10-it-on",
              "label": "ón",
              "audio": "/media/tts/vn10-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn10-it-om": "vn10-tgt-dom"
          },
          "explanation": "Đom đóm gồm hai tiếng có vần om.",
          "explanationAudio": "/media/tts/vn10-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn10-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ với hình ảnh thích hợp:",
        "question": {
          "type": "matching",
          "id": "vn10-q6-match",
          "prompt": "Nối từ với hình ảnh thích hợp:",
          "promptAudio": "/media/tts/vn10-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn10-l2-hoa",
              "label": "hoa sen",
              "audio": "/media/tts/vn10-q6-l0.mp3"
            },
            {
              "id": "vn10-l2-cam",
              "label": "quả cam",
              "audio": "/media/tts/vn10-q6-l1.mp3"
            },
            {
              "id": "vn10-l2-truong",
              "label": "trường học",
              "audio": "/media/tts/vn10-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn10-r2-hoa",
              "label": "bông hoa sen",
              "audio": "/media/tts/vn10-q6-r0.mp3",
              "image": "/media/images/flower.svg"
            },
            {
              "id": "vn10-r2-cam",
              "label": "trái cam ngọt",
              "audio": "/media/tts/vn10-q6-r1.mp3",
              "image": "/media/images/apple.svg"
            },
            {
              "id": "vn10-r2-truong",
              "label": "mái trường em",
              "audio": "/media/tts/vn10-q6-r2.mp3",
              "image": "/media/images/school.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn10-l2-hoa",
              "rightId": "vn10-r2-hoa"
            },
            {
              "leftId": "vn10-l2-cam",
              "rightId": "vn10-r2-cam"
            },
            {
              "leftId": "vn10-l2-truong",
              "rightId": "vn10-r2-truong"
            }
          ],
          "explanation": "Bé trả lời rất đúng! Bé đã phân biệt tốt các vần kết thúc bằng m và n.",
          "explanationAudio": "/media/tts/vn10-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-11-van-t-c",
    "title": "Bài 11: Các vần kết thúc bằng t, c",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen với các vần khép âm at, ac, et, ec, ot, oc và luyện đọc các từ bãi cát, hạt thóc, chim vẹt, cá nóc qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn11-title-slide",
        "title": "Bài 11: Các vần kết thúc bằng t, c",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Chú ý phát âm dứt khoát âm cuối t (chặn lưỡi) và c (chặn họng).",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn11-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn11-intro-slide",
        "title": "Các vần kết thúc bằng T, C",
        "body": "Hôm nay chúng mình học các vần có âm cuối t và c: at, ac, et, ec, ot, oc. Cùng luyện đọc: bãi cát, hạt thóc, chim vẹt, cá nóc!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn11-intro.mp3",
        "bullets": [
          "at — cát (bãi cát trắng)",
          "ac — vạc (con chim vạc)",
          "et — vẹt (chú vẹt biết nói)",
          "oc — thóc (hạt thóc vàng ươm)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn11-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'cát' trong 'bãi cát' có vần gì?",
        "question": {
          "type": "multiple_choice",
          "id": "vn11-q1-mc",
          "prompt": "Tiếng 'cát' trong 'bãi cát' có vần gì?",
          "promptAudio": "/media/tts/vn11-q1-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "options": [
            {
              "id": "vn11-opt-at",
              "label": "Vần at",
              "audio": "/media/tts/vn11-q1-opt0.mp3"
            },
            {
              "id": "vn11-opt-ac",
              "label": "Vần ac",
              "audio": "/media/tts/vn11-q1-opt1.mp3"
            },
            {
              "id": "vn11-opt-ot",
              "label": "Vần ot",
              "audio": "/media/tts/vn11-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn11-opt-at",
          "explanation": "Tiếng cát gồm âm c đứng trước, vần at đứng sau: c - at - cat - sắc - cát.",
          "explanationAudio": "/media/tts/vn11-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn11-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ chú vẹt:",
        "question": {
          "type": "tap_place",
          "id": "vn11-q2-tap",
          "prompt": "Điền vần thích hợp để có từ chú vẹt:",
          "promptAudio": "/media/tts/vn11-q2-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "targets": [
            {
              "id": "vn11-tgt-vet",
              "label": "...",
              "prefixText": "Chú v",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn11-it-et",
              "label": "ẹt",
              "audio": "/media/tts/vn11-q2-it0.mp3"
            },
            {
              "id": "vn11-it-ac",
              "label": "ạc",
              "audio": "/media/tts/vn11-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn11-it-et": "vn11-tgt-vet"
          },
          "explanation": "Tiếng vẹt có vần et: v - et - vet - nặng - vẹt.",
          "explanationAudio": "/media/tts/vn11-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn11-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ ở cột phải để t",
        "question": {
          "type": "matching",
          "id": "vn11-q3-match",
          "prompt": "Nối từ ở cột trái với từ ở cột phải để tạo từ đúng:",
          "promptAudio": "/media/tts/vn11-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn11-l-hat",
              "label": "hạt",
              "audio": "/media/tts/vn11-q3-l0.mp3"
            },
            {
              "id": "vn11-l-bai",
              "label": "bãi",
              "audio": "/media/tts/vn11-q3-l1.mp3"
            },
            {
              "id": "vn11-l-chim",
              "label": "chim",
              "audio": "/media/tts/vn11-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn11-r-thoc",
              "label": "thóc vàng",
              "audio": "/media/tts/vn11-q3-r0.mp3"
            },
            {
              "id": "vn11-r-cat",
              "label": "cát trắng",
              "audio": "/media/tts/vn11-q3-r1.mp3"
            },
            {
              "id": "vn11-r-vet",
              "label": "vẹt xanh",
              "audio": "/media/tts/vn11-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn11-l-hat",
              "rightId": "vn11-r-thoc"
            },
            {
              "leftId": "vn11-l-bai",
              "rightId": "vn11-r-cat"
            },
            {
              "leftId": "vn11-l-chim",
              "rightId": "vn11-r-vet"
            }
          ],
          "explanation": "Chính xác! Hạt thóc vàng, bãi cát trắng, chim vẹt xanh.",
          "explanationAudio": "/media/tts/vn11-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn11-slide-q4",
        "teacherNote": "Câu hỏi 4: Tiếng nào dưới đây có chứa vần 'oc'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn11-q4-mc",
          "prompt": "Tiếng nào dưới đây có chứa vần 'oc'?",
          "promptAudio": "/media/tts/vn11-q4-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "options": [
            {
              "id": "vn11-q4-opt-thoc",
              "label": "hạt thóc",
              "audio": "/media/tts/vn11-q4-opt0.mp3"
            },
            {
              "id": "vn11-q4-opt-cat",
              "label": "bãi cát",
              "audio": "/media/tts/vn11-q4-opt1.mp3"
            },
            {
              "id": "vn11-q4-opt-vet",
              "label": "chim vẹt",
              "audio": "/media/tts/vn11-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn11-q4-opt-thoc",
          "explanation": "Tiếng thóc có âm th đứng trước, vần oc đứng sau: th - oc - thoc - sắc - thóc.",
          "explanationAudio": "/media/tts/vn11-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn11-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp để hoàn thiện từ bãi ",
        "question": {
          "type": "tap_place",
          "id": "vn11-q5-tap",
          "prompt": "Điền vần thích hợp để hoàn thiện từ bãi cát:",
          "promptAudio": "/media/tts/vn11-q5-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "targets": [
            {
              "id": "vn11-tgt-cat",
              "label": "...",
              "prefixText": "Bãi c",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn11-it-at",
              "label": "át",
              "audio": "/media/tts/vn11-q5-it0.mp3"
            },
            {
              "id": "vn11-it-et",
              "label": "ét",
              "audio": "/media/tts/vn11-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn11-it-at": "vn11-tgt-cat"
          },
          "explanation": "Tiếng cát có vần át: c - át - cát.",
          "explanationAudio": "/media/tts/vn11-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn11-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ với hình minh họa thích hợp:",
        "question": {
          "type": "matching",
          "id": "vn11-q6-match",
          "prompt": "Nối từ với hình minh họa thích hợp:",
          "promptAudio": "/media/tts/vn11-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn11-l2-vet",
              "label": "chim vẹt",
              "audio": "/media/tts/vn11-q6-l0.mp3"
            },
            {
              "id": "vn11-l2-nang",
              "label": "nắng ấm",
              "audio": "/media/tts/vn11-q6-l1.mp3"
            },
            {
              "id": "vn11-l2-hoa",
              "label": "hoa nở",
              "audio": "/media/tts/vn11-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn11-r2-vet",
              "label": "chú vẹt nhỏ",
              "audio": "/media/tts/vn11-q6-r0.mp3",
              "image": "/media/images/bird.svg"
            },
            {
              "id": "vn11-r2-nang",
              "label": "ông mặt trời",
              "audio": "/media/tts/vn11-q6-r1.mp3",
              "image": "/media/images/sun.svg"
            },
            {
              "id": "vn11-r2-hoa",
              "label": "bông hoa tươi",
              "audio": "/media/tts/vn11-q6-r2.mp3",
              "image": "/media/images/flower.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn11-l2-vet",
              "rightId": "vn11-r2-vet"
            },
            {
              "leftId": "vn11-l2-nang",
              "rightId": "vn11-r2-nang"
            },
            {
              "leftId": "vn11-l2-hoa",
              "rightId": "vn11-r2-hoa"
            }
          ],
          "explanation": "Bé học rất giỏi! Vẹt, mặt trời và hoa đều được nối rất chuẩn xác.",
          "explanationAudio": "/media/tts/vn11-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-12-review-sem1",
    "title": "Bài 12: Ôn tập học kì 1 Tiếng Việt",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Ôn tập tổng hợp bảng chữ cái, các âm đầu, vần cơ bản và kỹ năng đọc hiểu câu ngắn học kì 1 qua 6 câu hỏi tương tác sinh động.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn12-title-slide",
        "title": "Bài 12: Ôn tập học kì 1 Tiếng Việt",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Tổng kết kiến thức học kì 1, củng cố sự tự tin cho học sinh.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn12-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn12-intro-slide",
        "title": "Ôn tập học kì 1 Tiếng Việt",
        "body": "Chúc mừng các em đã hoàn thành học kì 1! Hôm nay chúng mình cùng ôn lại các âm chữ cái và đọc câu ứng dụng nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn12-intro.mp3",
        "bullets": [
          "Nhớ mặt các chữ cái và dấu thanh",
          "Ghép vần và đọc trơn từ ngữ",
          "Hiểu nghĩa câu văn ngắn"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn12-slide-q1",
        "teacherNote": "Câu hỏi 1: Chọn câu có nghĩa đúng và hoàn chỉnh nhấ",
        "question": {
          "type": "multiple_choice",
          "id": "vn12-q1-mc",
          "prompt": "Chọn câu có nghĩa đúng và hoàn chỉnh nhất:",
          "promptAudio": "/media/tts/vn12-q1-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn12-opt-c1",
              "label": "Bé đi học vui vẻ",
              "audio": "/media/tts/vn12-q1-opt0.mp3"
            },
            {
              "id": "vn12-opt-c2",
              "label": "Bé đi học vở",
              "audio": "/media/tts/vn12-q1-opt1.mp3"
            },
            {
              "id": "vn12-opt-c3",
              "label": "Học đi bé bút",
              "audio": "/media/tts/vn12-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn12-opt-c1",
          "explanation": "Câu 'Bé đi học vui vẻ' diễn đạt một ý trọn vẹn và đúng ngữ pháp.",
          "explanationAudio": "/media/tts/vn12-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn12-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền từ thích hợp vào câu: 'Bé chăm ngoa",
        "question": {
          "type": "tap_place",
          "id": "vn12-q2-tap",
          "prompt": "Điền từ thích hợp vào câu: 'Bé chăm ngoan, ... cô yêu quý.'",
          "promptAudio": "/media/tts/vn12-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn12-tgt-ngoan",
              "label": "...",
              "prefixText": "Bé chăm ngoan, ",
              "suffixText": " cô yêu quý."
            }
          ],
          "items": [
            {
              "id": "vn12-it-duoc",
              "label": "được",
              "audio": "/media/tts/vn12-q2-it0.mp3"
            },
            {
              "id": "vn12-it-cho",
              "label": "cho",
              "audio": "/media/tts/vn12-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn12-it-duoc": "vn12-tgt-ngoan"
          },
          "explanation": "Bé chăm ngoan nên được thầy cô yêu quý.",
          "explanationAudio": "/media/tts/vn12-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn12-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối tiếng ở cột trái với tiếng ở cột phả",
        "question": {
          "type": "matching",
          "id": "vn12-q3-match",
          "prompt": "Nối tiếng ở cột trái với tiếng ở cột phải để tạo từ ghép đúng:",
          "promptAudio": "/media/tts/vn12-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn12-l-cham",
              "label": "chăm",
              "audio": "/media/tts/vn12-q3-l0.mp3"
            },
            {
              "id": "vn12-l-hoc",
              "label": "học",
              "audio": "/media/tts/vn12-q3-l1.mp3"
            },
            {
              "id": "vn12-l-thay",
              "label": "thầy",
              "audio": "/media/tts/vn12-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn12-r-chi",
              "label": "chỉ",
              "audio": "/media/tts/vn12-q3-r0.mp3"
            },
            {
              "id": "vn12-r-tap",
              "label": "tập",
              "audio": "/media/tts/vn12-q3-r1.mp3"
            },
            {
              "id": "vn12-r-co",
              "label": "cô",
              "audio": "/media/tts/vn12-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn12-l-cham",
              "rightId": "vn12-r-chi"
            },
            {
              "leftId": "vn12-l-hoc",
              "rightId": "vn12-r-tap"
            },
            {
              "leftId": "vn12-l-thay",
              "rightId": "vn12-r-co"
            }
          ],
          "explanation": "Chính xác! Chăm chỉ, học tập, thầy cô là những từ ngữ rất ý nghĩa.",
          "explanationAudio": "/media/tts/vn12-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn12-slide-q4",
        "teacherNote": "Câu hỏi 4: Tiếng nào dưới đây bắt đầu bằng âm 'kh'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn12-q4-mc",
          "prompt": "Tiếng nào dưới đây bắt đầu bằng âm 'kh'?",
          "promptAudio": "/media/tts/vn12-q4-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "options": [
            {
              "id": "vn12-q4-opt-khe",
              "label": "quả khế",
              "audio": "/media/tts/vn12-q4-opt0.mp3"
            },
            {
              "id": "vn12-q4-opt-nho",
              "label": "chùm nho",
              "audio": "/media/tts/vn12-q4-opt1.mp3"
            },
            {
              "id": "vn12-q4-opt-na",
              "label": "quả na",
              "audio": "/media/tts/vn12-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn12-q4-opt-khe",
          "explanation": "Tiếng khế bắt đầu bằng âm kh: kh - ê - khê - sắc - khế.",
          "explanationAudio": "/media/tts/vn12-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn12-slide-q5",
        "teacherNote": "Câu hỏi 5: Sắp xếp từ để tạo thành câu hoàn chỉnh: ",
        "question": {
          "type": "tap_place",
          "id": "vn12-q5-tap",
          "prompt": "Sắp xếp từ để tạo thành câu hoàn chỉnh: Em yêu trường em.",
          "promptAudio": "/media/tts/vn12-q5-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn12-tgt-truong",
              "label": "...",
              "prefixText": "Em yêu ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn12-it-truongem",
              "label": "trường em",
              "audio": "/media/tts/vn12-q5-it0.mp3"
            },
            {
              "id": "vn12-it-lopem",
              "label": "lớp em",
              "audio": "/media/tts/vn12-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn12-it-truongem": "vn12-tgt-truong"
          },
          "explanation": "Câu hoàn chỉnh là: Em yêu trường em.",
          "explanationAudio": "/media/tts/vn12-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn12-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối câu ở cột trái với thời điểm thích h",
        "question": {
          "type": "matching",
          "id": "vn12-q6-match",
          "prompt": "Nối câu ở cột trái với thời điểm thích hợp ở cột phải:",
          "promptAudio": "/media/tts/vn12-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn12-l2-sang",
              "label": "Mặt trời mọc",
              "audio": "/media/tts/vn12-q6-l0.mp3"
            },
            {
              "id": "vn12-l2-toi",
              "label": "Đèn đường bật sáng",
              "audio": "/media/tts/vn12-q6-l1.mp3"
            },
            {
              "id": "vn12-l2-trua",
              "label": "Mặt trời lên cao",
              "audio": "/media/tts/vn12-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn12-r2-sang",
              "label": "buổi sáng sớm",
              "audio": "/media/tts/vn12-q6-r0.mp3"
            },
            {
              "id": "vn12-r2-toi",
              "label": "buổi tối đến",
              "audio": "/media/tts/vn12-q6-r1.mp3"
            },
            {
              "id": "vn12-r2-trua",
              "label": "buổi trưa hè",
              "audio": "/media/tts/vn12-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn12-l2-sang",
              "rightId": "vn12-r2-sang"
            },
            {
              "leftId": "vn12-l2-toi",
              "rightId": "vn12-r2-toi"
            },
            {
              "leftId": "vn12-l2-trua",
              "rightId": "vn12-r2-trua"
            }
          ],
          "explanation": "Rất xuất sắc! Bé đã nắm vững toàn bộ kiến thức Tiếng Việt học kì 1!",
          "explanationAudio": "/media/tts/vn12-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-13-van-ng-nh",
    "title": "Bài 13: Các vần kết thúc bằng ng, nh",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Học các vần ang, anh, ăng, inh, ênh, uynh; luyện đọc các từ măng tre, cành chanh, bình hoa, kênh rạch, phụ huynh qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn13-title-slide",
        "title": "Bài 13: Các vần kết thúc bằng ng, nh",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn phát âm mở rộng vòm họng cho vần ng và bè môi cho vần nh.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn13-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn13-intro-slide",
        "title": "Các vần kết thúc bằng NG, NH",
        "body": "Hôm nay các em sẽ làm quen với các vần có âm cuối ng và nh: ang, anh, ăng, inh, ênh, uynh. Cùng đọc: măng tre, cành chanh, bình hoa, phụ huynh nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn13-intro.mp3",
        "bullets": [
          "ăng — măng (búp măng tre non)",
          "anh — chanh (cành chanh sai quả)",
          "inh — bình (bình hoa ngát hương)",
          "uynh — huynh (phụ huynh học sinh)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn13-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'măng' trong từ 'măng tre' có vần ",
        "question": {
          "type": "multiple_choice",
          "id": "vn13-q1-mc",
          "prompt": "Tiếng 'măng' trong từ 'măng tre' có vần gì?",
          "promptAudio": "/media/tts/vn13-q1-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "options": [
            {
              "id": "vn13-opt-ang2",
              "label": "Vần ăng",
              "audio": "/media/tts/vn13-q1-opt0.mp3"
            },
            {
              "id": "vn13-opt-ang1",
              "label": "Vần ang",
              "audio": "/media/tts/vn13-q1-opt1.mp3"
            },
            {
              "id": "vn13-opt-anh",
              "label": "Vần anh",
              "audio": "/media/tts/vn13-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn13-opt-ang2",
          "explanation": "Tiếng măng gồm âm m đứng trước, vần ăng đứng sau: m - ăng - măng.",
          "explanationAudio": "/media/tts/vn13-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn13-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ cành chanh:",
        "question": {
          "type": "tap_place",
          "id": "vn13-q2-tap",
          "prompt": "Điền vần thích hợp để có từ cành chanh:",
          "promptAudio": "/media/tts/vn13-q2-prompt.mp3",
          "illustration": "/media/images/leaf.svg",
          "targets": [
            {
              "id": "vn13-tgt-chanh",
              "label": "...",
              "prefixText": "Cành ch",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn13-it-anh",
              "label": "anh",
              "audio": "/media/tts/vn13-q2-it0.mp3"
            },
            {
              "id": "vn13-it-ang",
              "label": "ang",
              "audio": "/media/tts/vn13-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn13-it-anh": "vn13-tgt-chanh"
          },
          "explanation": "Tiếng chanh có âm ch ghép với vần anh.",
          "explanationAudio": "/media/tts/vn13-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn13-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ tương ứng ở cột",
        "question": {
          "type": "matching",
          "id": "vn13-q3-match",
          "prompt": "Nối từ ở cột trái với từ tương ứng ở cột phải:",
          "promptAudio": "/media/tts/vn13-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn13-l-mang",
              "label": "măng tre",
              "audio": "/media/tts/vn13-q3-l0.mp3"
            },
            {
              "id": "vn13-l-binh",
              "label": "bình hoa",
              "audio": "/media/tts/vn13-q3-l1.mp3"
            },
            {
              "id": "vn13-l-phu",
              "label": "phụ huynh",
              "audio": "/media/tts/vn13-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn13-r-mang",
              "label": "búp măng non",
              "audio": "/media/tts/vn13-q3-r0.mp3"
            },
            {
              "id": "vn13-r-binh",
              "label": "bình hoa đẹp",
              "audio": "/media/tts/vn13-q3-r1.mp3"
            },
            {
              "id": "vn13-r-phu",
              "label": "cha mẹ em",
              "audio": "/media/tts/vn13-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn13-l-mang",
              "rightId": "vn13-r-mang"
            },
            {
              "leftId": "vn13-l-binh",
              "rightId": "vn13-r-binh"
            },
            {
              "leftId": "vn13-l-phu",
              "rightId": "vn13-r-phu"
            }
          ],
          "explanation": "Chính xác! Măng tre non, bình hoa đẹp, phụ huynh là cha mẹ em.",
          "explanationAudio": "/media/tts/vn13-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn13-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa vần 'uynh'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn13-q4-mc",
          "prompt": "Từ nào dưới đây có chứa vần 'uynh'?",
          "promptAudio": "/media/tts/vn13-q4-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn13-q4-opt-huynh",
              "label": "phụ huynh",
              "audio": "/media/tts/vn13-q4-opt0.mp3"
            },
            {
              "id": "vn13-q4-opt-chanh",
              "label": "cành chanh",
              "audio": "/media/tts/vn13-q4-opt1.mp3"
            },
            {
              "id": "vn13-q4-opt-sen",
              "label": "hoa sen",
              "audio": "/media/tts/vn13-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn13-q4-opt-huynh",
          "explanation": "Tiếng huynh trong từ phụ huynh có chứa vần uynh: h - uynh - huynh.",
          "explanationAudio": "/media/tts/vn13-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn13-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ bình minh:",
        "question": {
          "type": "tap_place",
          "id": "vn13-q5-tap",
          "prompt": "Điền vần thích hợp vào từ bình minh:",
          "promptAudio": "/media/tts/vn13-q5-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "targets": [
            {
              "id": "vn13-tgt-minh",
              "label": "...",
              "prefixText": "Bình m",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn13-it-inh",
              "label": "inh",
              "audio": "/media/tts/vn13-q5-it0.mp3"
            },
            {
              "id": "vn13-it-enh",
              "label": "ênh",
              "audio": "/media/tts/vn13-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn13-it-inh": "vn13-tgt-minh"
          },
          "explanation": "Bình minh là lúc mặt trời bắt đầu mọc, tiếng minh có vần inh.",
          "explanationAudio": "/media/tts/vn13-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn13-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối tiếng ở cột trái với tiếng ở cột phả",
        "question": {
          "type": "matching",
          "id": "vn13-q6-match",
          "prompt": "Nối tiếng ở cột trái với tiếng ở cột phải để tạo từ đúng:",
          "promptAudio": "/media/tts/vn13-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn13-l2-binh",
              "label": "bình",
              "audio": "/media/tts/vn13-q6-l0.mp3"
            },
            {
              "id": "vn13-l2-kenh",
              "label": "kênh",
              "audio": "/media/tts/vn13-q6-l1.mp3"
            },
            {
              "id": "vn13-l2-cay",
              "label": "cây",
              "audio": "/media/tts/vn13-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn13-r2-minh",
              "label": "minh",
              "audio": "/media/tts/vn13-q6-r0.mp3"
            },
            {
              "id": "vn13-r2-rach",
              "label": "rạch",
              "audio": "/media/tts/vn13-q6-r1.mp3"
            },
            {
              "id": "vn13-r2-chanh",
              "label": "chanh",
              "audio": "/media/tts/vn13-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn13-l2-binh",
              "rightId": "vn13-r2-minh"
            },
            {
              "leftId": "vn13-l2-kenh",
              "rightId": "vn13-r2-rach"
            },
            {
              "leftId": "vn13-l2-cay",
              "rightId": "vn13-r2-chanh"
            }
          ],
          "explanation": "Tuyệt vời! Bình minh, kênh rạch, cây chanh đều là các từ ghép rất chuẩn.",
          "explanationAudio": "/media/tts/vn13-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-14-van-p",
    "title": "Bài 14: Các vần kết thúc bằng p",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Học các vần kết thúc bằng âm p: bắp ngô, cặp sách, hộp quà, lớp học, đèn tuýp, cá chép qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn14-title-slide",
        "title": "Bài 14: Các vần kết thúc bằng p",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn khép hai môi dứt khoát khi phát âm âm cuối p.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn14-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn14-intro-slide",
        "title": "Các vần kết thúc bằng P",
        "body": "Hôm nay chúng mình học các vần có âm cuối p: ăp, âp, op, ôp, ơp, ep, êp, ip, up. Cùng đọc: bắp ngô, cặp sách, hộp quà, lớp học, cá chép!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn14-intro.mp3",
        "bullets": [
          "ăp — bắp (bắp ngô non)",
          "ăp — cặp (cặp sách em mang)",
          "ơp — lớp (lớp học thân yêu)",
          "ep — chép (chú cá chép đỏ)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn14-slide-q1",
        "teacherNote": "Câu hỏi 1: Điền vần thích hợp để có từ bắp ngô:",
        "question": {
          "type": "tap_place",
          "id": "vn14-q1-tap",
          "prompt": "Điền vần thích hợp để có từ bắp ngô:",
          "promptAudio": "/media/tts/vn14-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn14-tgt-bap",
              "label": "...",
              "prefixText": "B",
              "suffixText": " ngô"
            }
          ],
          "items": [
            {
              "id": "vn14-it-ap1",
              "label": "ắp",
              "audio": "/media/tts/vn14-q1-it0.mp3"
            },
            {
              "id": "vn14-it-ap2",
              "label": "ấp",
              "audio": "/media/tts/vn14-q1-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn14-it-ap1": "vn14-tgt-bap"
          },
          "explanation": "Tiếng bắp có âm b ghép với vần ắp: b - ắp - bắp.",
          "explanationAudio": "/media/tts/vn14-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn14-slide-q2",
        "teacherNote": "Câu hỏi 2: Nối từ ở cột trái với từ ở cột phải để t",
        "question": {
          "type": "matching",
          "id": "vn14-q2-match",
          "prompt": "Nối từ ở cột trái với từ ở cột phải để tạo từ đúng:",
          "promptAudio": "/media/tts/vn14-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn14-l-cap",
              "label": "cặp",
              "audio": "/media/tts/vn14-q2-l0.mp3"
            },
            {
              "id": "vn14-l-hop",
              "label": "hộp",
              "audio": "/media/tts/vn14-q2-l1.mp3"
            },
            {
              "id": "vn14-l-lop",
              "label": "lớp",
              "audio": "/media/tts/vn14-q2-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn14-r-sach",
              "label": "sách đi học",
              "audio": "/media/tts/vn14-q2-r0.mp3"
            },
            {
              "id": "vn14-r-qua",
              "label": "quà xinh",
              "audio": "/media/tts/vn14-q2-r1.mp3"
            },
            {
              "id": "vn14-r-hoc",
              "label": "học thân thương",
              "audio": "/media/tts/vn14-q2-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn14-l-cap",
              "rightId": "vn14-r-sach"
            },
            {
              "leftId": "vn14-l-hop",
              "rightId": "vn14-r-qua"
            },
            {
              "leftId": "vn14-l-lop",
              "rightId": "vn14-r-hoc"
            }
          ],
          "explanation": "Rất giỏi! Cặp sách đi học, hộp quà xinh, lớp học thân thương.",
          "explanationAudio": "/media/tts/vn14-q2-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn14-slide-q3",
        "teacherNote": "Câu hỏi 3: Tiếng 'chép' trong từ 'cá chép' có chứa ",
        "question": {
          "type": "multiple_choice",
          "id": "vn14-q3-mc",
          "prompt": "Tiếng 'chép' trong từ 'cá chép' có chứa vần gì?",
          "promptAudio": "/media/tts/vn14-q3-prompt.mp3",
          "illustration": "/media/images/fish.svg",
          "options": [
            {
              "id": "vn14-opt-ep",
              "label": "Vần ep",
              "audio": "/media/tts/vn14-q3-opt0.mp3"
            },
            {
              "id": "vn14-opt-eep",
              "label": "Vần êp",
              "audio": "/media/tts/vn14-q3-opt1.mp3"
            },
            {
              "id": "vn14-opt-ip",
              "label": "Vần ip",
              "audio": "/media/tts/vn14-q3-opt2.mp3"
            }
          ],
          "correctOptionId": "vn14-opt-ep",
          "explanation": "Tiếng chép gồm âm ch đứng trước, vần ep đứng sau: ch - ep - chep - sắc - chép.",
          "explanationAudio": "/media/tts/vn14-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn14-slide-q4",
        "teacherNote": "Câu hỏi 4: Điền vần thích hợp vào từ lớp học:",
        "question": {
          "type": "tap_place",
          "id": "vn14-q4-tap",
          "prompt": "Điền vần thích hợp vào từ lớp học:",
          "promptAudio": "/media/tts/vn14-q4-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn14-tgt-lop",
              "label": "...",
              "prefixText": "L",
              "suffixText": " học"
            }
          ],
          "items": [
            {
              "id": "vn14-it-op1",
              "label": "ớp",
              "audio": "/media/tts/vn14-q4-it0.mp3"
            },
            {
              "id": "vn14-it-op2",
              "label": "ốp",
              "audio": "/media/tts/vn14-q4-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn14-it-op1": "vn14-tgt-lop"
          },
          "explanation": "Tiếng lớp có vần ớp: l - ớp - lớp.",
          "explanationAudio": "/media/tts/vn14-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn14-slide-q5",
        "teacherNote": "Câu hỏi 5: Nối từ với hình ảnh minh họa thích hợp:",
        "question": {
          "type": "matching",
          "id": "vn14-q5-match",
          "prompt": "Nối từ với hình ảnh minh họa thích hợp:",
          "promptAudio": "/media/tts/vn14-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn14-l2-ca",
              "label": "cá chép",
              "audio": "/media/tts/vn14-q5-l0.mp3"
            },
            {
              "id": "vn14-l2-lop",
              "label": "lớp học",
              "audio": "/media/tts/vn14-q5-l1.mp3"
            },
            {
              "id": "vn14-l2-but",
              "label": "cây bút",
              "audio": "/media/tts/vn14-q5-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn14-r2-ca",
              "label": "con cá chép",
              "audio": "/media/tts/vn14-q5-r0.mp3",
              "image": "/media/images/fish.svg"
            },
            {
              "id": "vn14-r2-lop",
              "label": "ngôi trường",
              "audio": "/media/tts/vn14-q5-r1.mp3",
              "image": "/media/images/school.svg"
            },
            {
              "id": "vn14-r2-but",
              "label": "chiếc bút chì",
              "audio": "/media/tts/vn14-q5-r2.mp3",
              "image": "/media/images/pencil.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn14-l2-ca",
              "rightId": "vn14-r2-ca"
            },
            {
              "leftId": "vn14-l2-lop",
              "rightId": "vn14-r2-lop"
            },
            {
              "leftId": "vn14-l2-but",
              "rightId": "vn14-r2-but"
            }
          ],
          "explanation": "Chính xác! Bé đã nối đúng các từ và hình ảnh.",
          "explanationAudio": "/media/tts/vn14-q5-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn14-slide-q6",
        "teacherNote": "Câu hỏi 6: Tiếng nào dưới đây có chứa vần 'up'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn14-q6-mc",
          "prompt": "Tiếng nào dưới đây có chứa vần 'up'?",
          "promptAudio": "/media/tts/vn14-q6-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "options": [
            {
              "id": "vn14-q6-opt-bup",
              "label": "búp sen",
              "audio": "/media/tts/vn14-q6-opt0.mp3"
            },
            {
              "id": "vn14-q6-opt-chep",
              "label": "cá chép",
              "audio": "/media/tts/vn14-q6-opt1.mp3"
            },
            {
              "id": "vn14-q6-opt-chop",
              "label": "tia chớp",
              "audio": "/media/tts/vn14-q6-opt2.mp3"
            }
          ],
          "correctOptionId": "vn14-q6-opt-bup",
          "explanation": "Tiếng búp có âm b đứng trước, vần up đứng sau: b - up - bup - sắc - búp.",
          "explanationAudio": "/media/tts/vn14-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-15-nguyen-am-doi",
    "title": "Bài 15: Các vần nguyên âm đôi",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Nhận biết và phát âm chuẩn các vần nguyên âm đôi iêu, yêu, uôi, ươi, ươu qua các từ diều sáo, yêu quý, nải chuối, quả bưởi, hươu sao qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn15-title-slide",
        "title": "Bài 15: Các vần nguyên âm đôi",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn luyện kéo dài hơi và chuyển khẩu hình nhịp nhàng khi đọc nguyên âm đôi.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn15-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn15-intro-slide",
        "title": "Các vần nguyên âm đôi",
        "body": "Các vần nguyên âm đôi kết hợp hai âm chính lại với nhau: iêu, yêu, uôi, ươi, ươu. Cùng luyện đọc: cánh diều, yêu quý, nải chuối, quả bưởi, chú hươu!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn15-intro.mp3",
        "bullets": [
          "iêu — diều (cánh diều lượn bay)",
          "uôi — chuối (nải chuối chín vàng)",
          "ươi — bưởi (quả bưởi da xanh)",
          "ươu — hươu (chú hươu sao hiền lành)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn15-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'diều' trong 'cánh diều' có vần gì",
        "question": {
          "type": "multiple_choice",
          "id": "vn15-q1-mc",
          "prompt": "Tiếng 'diều' trong 'cánh diều' có vần gì?",
          "promptAudio": "/media/tts/vn15-q1-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn15-opt-ieu",
              "label": "Vần iêu",
              "audio": "/media/tts/vn15-q1-opt0.mp3"
            },
            {
              "id": "vn15-opt-yeu",
              "label": "Vần yêu",
              "audio": "/media/tts/vn15-q1-opt1.mp3"
            },
            {
              "id": "vn15-opt-uoi",
              "label": "Vần uôi",
              "audio": "/media/tts/vn15-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn15-opt-ieu",
          "explanation": "Tiếng diều gồm âm d ghép với vần iêu và dấu huyền: d - iêu - diêu - huyền - diều.",
          "explanationAudio": "/media/tts/vn15-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn15-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ nải chuối:",
        "question": {
          "type": "tap_place",
          "id": "vn15-q2-tap",
          "prompt": "Điền vần thích hợp để có từ nải chuối:",
          "promptAudio": "/media/tts/vn15-q2-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn15-tgt-chuoi",
              "label": "...",
              "prefixText": "Nải ch",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn15-it-uoi",
              "label": "uối",
              "audio": "/media/tts/vn15-q2-it0.mp3"
            },
            {
              "id": "vn15-it-uoi2",
              "label": "ươi",
              "audio": "/media/tts/vn15-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn15-it-uoi": "vn15-tgt-chuoi"
          },
          "explanation": "Tiếng chuối có âm ch ghép với vần uôi.",
          "explanationAudio": "/media/tts/vn15-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn15-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ mở rộng ở cột p",
        "question": {
          "type": "matching",
          "id": "vn15-q3-match",
          "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn15-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn15-l-buoi",
              "label": "quả bưởi",
              "audio": "/media/tts/vn15-q3-l0.mp3"
            },
            {
              "id": "vn15-l-huou",
              "label": "hươu sao",
              "audio": "/media/tts/vn15-q3-l1.mp3"
            },
            {
              "id": "vn15-l-dieu",
              "label": "cánh diều",
              "audio": "/media/tts/vn15-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn15-r-buoi",
              "label": "bưởi năm roi",
              "audio": "/media/tts/vn15-q3-r0.mp3"
            },
            {
              "id": "vn15-r-huou",
              "label": "chú hươu trong rừng",
              "audio": "/media/tts/vn15-q3-r1.mp3"
            },
            {
              "id": "vn15-r-dieu",
              "label": "diều bay trên đồng",
              "audio": "/media/tts/vn15-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn15-l-buoi",
              "rightId": "vn15-r-buoi"
            },
            {
              "leftId": "vn15-l-huou",
              "rightId": "vn15-r-huou"
            },
            {
              "leftId": "vn15-l-dieu",
              "rightId": "vn15-r-dieu"
            }
          ],
          "explanation": "Rất chuẩn! Quả bưởi năm roi, chú hươu trong rừng, diều bay trên đồng.",
          "explanationAudio": "/media/tts/vn15-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn15-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa vần 'ươu'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn15-q4-mc",
          "prompt": "Từ nào dưới đây có chứa vần 'ươu'?",
          "promptAudio": "/media/tts/vn15-q4-prompt.mp3",
          "illustration": "/media/images/cat.svg",
          "options": [
            {
              "id": "vn15-q4-opt-huou",
              "label": "hươu sao",
              "audio": "/media/tts/vn15-q4-opt0.mp3"
            },
            {
              "id": "vn15-q4-opt-chuoi",
              "label": "chuối tiêu",
              "audio": "/media/tts/vn15-q4-opt1.mp3"
            },
            {
              "id": "vn15-q4-opt-yeu",
              "label": "yêu thương",
              "audio": "/media/tts/vn15-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn15-q4-opt-huou",
          "explanation": "Tiếng hươu có chứa vần ươu: h - ươu - hươu.",
          "explanationAudio": "/media/tts/vn15-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn15-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ quả bưởi:",
        "question": {
          "type": "tap_place",
          "id": "vn15-q5-tap",
          "prompt": "Điền vần thích hợp vào từ quả bưởi:",
          "promptAudio": "/media/tts/vn15-q5-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "targets": [
            {
              "id": "vn15-tgt-buoi",
              "label": "...",
              "prefixText": "Quả b",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn15-it-uoi3",
              "label": "ưởi",
              "audio": "/media/tts/vn15-q5-it0.mp3"
            },
            {
              "id": "vn15-it-uoi4",
              "label": "uối",
              "audio": "/media/tts/vn15-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn15-it-uoi3": "vn15-tgt-buoi"
          },
          "explanation": "Tiếng bưởi có vần ươi: b - ươi - bươi - hỏi - bưởi.",
          "explanationAudio": "/media/tts/vn15-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn15-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối tiếng ở hai cột để tạo thành từ ghép",
        "question": {
          "type": "matching",
          "id": "vn15-q6-match",
          "prompt": "Nối tiếng ở hai cột để tạo thành từ ghép đúng:",
          "promptAudio": "/media/tts/vn15-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn15-l2-yeu",
              "label": "yêu",
              "audio": "/media/tts/vn15-q6-l0.mp3"
            },
            {
              "id": "vn15-l2-nai",
              "label": "nải",
              "audio": "/media/tts/vn15-q6-l1.mp3"
            },
            {
              "id": "vn15-l2-buoi",
              "label": "vườn",
              "audio": "/media/tts/vn15-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn15-r2-quy",
              "label": "quý",
              "audio": "/media/tts/vn15-q6-r0.mp3"
            },
            {
              "id": "vn15-r2-chuoi",
              "label": "chuối",
              "audio": "/media/tts/vn15-q6-r1.mp3"
            },
            {
              "id": "vn15-r2-buoi",
              "label": "bưởi",
              "audio": "/media/tts/vn15-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn15-l2-yeu",
              "rightId": "vn15-r2-quy"
            },
            {
              "leftId": "vn15-l2-nai",
              "rightId": "vn15-r2-chuoi"
            },
            {
              "leftId": "vn15-l2-buoi",
              "rightId": "vn15-r2-buoi"
            }
          ],
          "explanation": "Bé thật thông minh! Yêu quý, nải chuối, vườn bưởi đều là các từ ghép chính xác.",
          "explanationAudio": "/media/tts/vn15-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-16-am-dem-tron-moi",
    "title": "Bài 16: Các vần có âm đệm tròn môi",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Luyện phát âm tròn môi và đọc các từ củ khoai, loay hoay, hoa huệ, tàu thủy, đêm khuya, chim khuyên, ánh trăng khuyết qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn16-title-slide",
        "title": "Bài 16: Các vần có âm đệm tròn môi",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn học sinh chúm môi tạo độ tròn trước khi mở miệng phát âm âm chính.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn16-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn16-intro-slide",
        "title": "Các vần có âm đệm tròn môi",
        "body": "Các vần oai, oay, uê, uy, uya, uyên, uyêt cần tròn môi khi phát âm. Cùng đọc các từ: củ khoai, hoa huệ, tàu thủy, chim khuyên nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn16-intro.mp3",
        "bullets": [
          "oai — khoai (củ khoai lang ngọt bùi)",
          "uê — huệ (bông hoa huệ trắng tinh)",
          "uy — thủy (tàu thủy lướt sóng)",
          "uyên — khuyên (chú chim khuyên líu lo)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn16-slide-q1",
        "teacherNote": "Câu hỏi 1: Điền vần thích hợp để có từ hoa huệ:",
        "question": {
          "type": "tap_place",
          "id": "vn16-q1-tap",
          "prompt": "Điền vần thích hợp để có từ hoa huệ:",
          "promptAudio": "/media/tts/vn16-q1-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "targets": [
            {
              "id": "vn16-tgt-hue",
              "label": "...",
              "prefixText": "Hoa h",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn16-it-ue",
              "label": "uệ",
              "audio": "/media/tts/vn16-q1-it0.mp3"
            },
            {
              "id": "vn16-it-oai",
              "label": "oai",
              "audio": "/media/tts/vn16-q1-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn16-it-ue": "vn16-tgt-hue"
          },
          "explanation": "Tiếng huệ có âm h ghép với vần uệ: h - uệ - huệ.",
          "explanationAudio": "/media/tts/vn16-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn16-slide-q2",
        "teacherNote": "Câu hỏi 2: Nối từ ở cột trái với ý thích hợp ở cột ",
        "question": {
          "type": "matching",
          "id": "vn16-q2-match",
          "prompt": "Nối từ ở cột trái với ý thích hợp ở cột phải:",
          "promptAudio": "/media/tts/vn16-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn16-l-khoai",
              "label": "củ khoai",
              "audio": "/media/tts/vn16-q2-l0.mp3"
            },
            {
              "id": "vn16-l-thuy",
              "label": "tàu thủy",
              "audio": "/media/tts/vn16-q2-l1.mp3"
            },
            {
              "id": "vn16-l-khuyen",
              "label": "chim khuyên",
              "audio": "/media/tts/vn16-q2-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn16-r-khoai",
              "label": "củ khoai ngọt bùi",
              "audio": "/media/tts/vn16-q2-r0.mp3"
            },
            {
              "id": "vn16-r-thuy",
              "label": "tàu trên biển lớn",
              "audio": "/media/tts/vn16-q2-r1.mp3"
            },
            {
              "id": "vn16-r-khuyen",
              "label": "hót líu lo trên cành",
              "audio": "/media/tts/vn16-q2-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn16-l-khoai",
              "rightId": "vn16-r-khoai"
            },
            {
              "leftId": "vn16-l-thuy",
              "rightId": "vn16-r-thuy"
            },
            {
              "leftId": "vn16-l-khuyen",
              "rightId": "vn16-r-khuyen"
            }
          ],
          "explanation": "Tuyệt vời! Khoai ngọt bùi, tàu thủy trên biển lớn, chim khuyên hót líu lo.",
          "explanationAudio": "/media/tts/vn16-q2-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn16-slide-q3",
        "teacherNote": "Câu hỏi 3: Tiếng 'khoai' trong từ 'củ khoai' có vần",
        "question": {
          "type": "multiple_choice",
          "id": "vn16-q3-mc",
          "prompt": "Tiếng 'khoai' trong từ 'củ khoai' có vần gì?",
          "promptAudio": "/media/tts/vn16-q3-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "vn16-opt-oai",
              "label": "Vần oai",
              "audio": "/media/tts/vn16-q3-opt0.mp3"
            },
            {
              "id": "vn16-opt-oay",
              "label": "Vần oay",
              "audio": "/media/tts/vn16-q3-opt1.mp3"
            },
            {
              "id": "vn16-opt-ue",
              "label": "Vần uê",
              "audio": "/media/tts/vn16-q3-opt2.mp3"
            }
          ],
          "correctOptionId": "vn16-opt-oai",
          "explanation": "Tiếng khoai có vần oai: kh - oai - khoai.",
          "explanationAudio": "/media/tts/vn16-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn16-slide-q4",
        "teacherNote": "Câu hỏi 4: Điền vần thích hợp để tạo thành từ tàu t",
        "question": {
          "type": "tap_place",
          "id": "vn16-q4-tap",
          "prompt": "Điền vần thích hợp để tạo thành từ tàu thủy:",
          "promptAudio": "/media/tts/vn16-q4-prompt.mp3",
          "illustration": "/media/images/boat.svg",
          "targets": [
            {
              "id": "vn16-tgt-thuy",
              "label": "...",
              "prefixText": "Tàu th",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn16-it-uy",
              "label": "ủy",
              "audio": "/media/tts/vn16-q4-it0.mp3"
            },
            {
              "id": "vn16-it-ue2",
              "label": "uê",
              "audio": "/media/tts/vn16-q4-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn16-it-uy": "vn16-tgt-thuy"
          },
          "explanation": "Tiếng thủy có âm th ghép với vần uy: th - uy - thuy - hỏi - thủy.",
          "explanationAudio": "/media/tts/vn16-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn16-slide-q5",
        "teacherNote": "Câu hỏi 5: Nối vần ở cột trái với từ chứa vần đó ở ",
        "question": {
          "type": "matching",
          "id": "vn16-q5-match",
          "prompt": "Nối vần ở cột trái với từ chứa vần đó ở cột phải:",
          "promptAudio": "/media/tts/vn16-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn16-l2-oay",
              "label": "vần oay",
              "audio": "/media/tts/vn16-q5-l0.mp3"
            },
            {
              "id": "vn16-l2-uya",
              "label": "vần uya",
              "audio": "/media/tts/vn16-q5-l1.mp3"
            },
            {
              "id": "vn16-l2-uyet",
              "label": "vần uyêt",
              "audio": "/media/tts/vn16-q5-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn16-r2-oay",
              "label": "loay hoay",
              "audio": "/media/tts/vn16-q5-r0.mp3"
            },
            {
              "id": "vn16-r2-uya",
              "label": "đêm khuya",
              "audio": "/media/tts/vn16-q5-r1.mp3"
            },
            {
              "id": "vn16-r2-uyet",
              "label": "trăng khuyết",
              "audio": "/media/tts/vn16-q5-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn16-l2-oay",
              "rightId": "vn16-r2-oay"
            },
            {
              "leftId": "vn16-l2-uya",
              "rightId": "vn16-r2-uya"
            },
            {
              "leftId": "vn16-l2-uyet",
              "rightId": "vn16-r2-uyet"
            }
          ],
          "explanation": "Chính xác! Loay hoay có vần oay, đêm khuya có vần uya, trăng khuyết có vần uyêt.",
          "explanationAudio": "/media/tts/vn16-q5-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn16-slide-q6",
        "teacherNote": "Câu hỏi 6: Từ nào dưới đây có chứa vần 'uyên'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn16-q6-mc",
          "prompt": "Từ nào dưới đây có chứa vần 'uyên'?",
          "promptAudio": "/media/tts/vn16-q6-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn16-q6-opt-khuyen",
              "label": "chim khuyên",
              "audio": "/media/tts/vn16-q6-opt0.mp3"
            },
            {
              "id": "vn16-q6-opt-hue",
              "label": "hoa huệ",
              "audio": "/media/tts/vn16-q6-opt1.mp3"
            },
            {
              "id": "vn16-q6-opt-san",
              "label": "củ sắn",
              "audio": "/media/tts/vn16-q6-opt2.mp3"
            }
          ],
          "correctOptionId": "vn16-q6-opt-khuyen",
          "explanation": "Tiếng khuyên có chứa vần uyên: kh - uyên - khuyên.",
          "explanationAudio": "/media/tts/vn16-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-17-doc-hieu-gia-dinh",
    "title": "Bài 17: Đọc hiểu Gia đình & Nhà trường",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Rèn luyện kỹ năng đọc hiểu đoạn văn ngắn 3-4 câu, trả lời câu hỏi tìm ý chính và liên hệ bản thân về gia đình và mái trường mến yêu.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn17-title-slide",
        "title": "Bài 17: Đọc hiểu Gia đình & Nhà trường",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn đọc thầm kết hợp đọc to rõ ràng, nhấn giọng ở từ khoá.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn17-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn17-intro-slide",
        "title": "Đọc hiểu: Gia đình & Mái trường",
        "body": "Gia đình là tổ ấm yêu thương, mái trường là ngôi nhà thứ hai của chúng mình. Cùng đọc đoạn văn và trả lời câu hỏi nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn17-intro.mp3",
        "bullets": [
          "Đoạn văn: 'Nhà bé có ông bà, bố mẹ và bé. Cả nhà luôn yêu thương nhau.'",
          "'Mỗi ngày đến trường là một ngày vui.'",
          "Học sinh ngoan lễ phép vâng lời thầy cô."
        ]
      },
      {
        "type": "question-slide",
        "id": "vn17-slide-q1",
        "teacherNote": "Câu hỏi 1: Đoạn văn kể: 'Nhà bé có ông bà, bố mẹ và",
        "question": {
          "type": "multiple_choice",
          "id": "vn17-q1-mc",
          "prompt": "Đoạn văn kể: 'Nhà bé có ông bà, bố mẹ và bé. Cả nhà luôn yêu thương nhau.' Đoạn văn trên nói về điều gì?",
          "promptAudio": "/media/tts/vn17-q1-prompt.mp3",
          "illustration": "/media/images/house.svg",
          "options": [
            {
              "id": "vn17-opt-giadinh",
              "label": "Gia đình yêu thương của bé",
              "audio": "/media/tts/vn17-q1-opt0.mp3"
            },
            {
              "id": "vn17-opt-truong",
              "label": "Sân trường giờ ra chơi",
              "audio": "/media/tts/vn17-q1-opt1.mp3"
            },
            {
              "id": "vn17-opt-meo",
              "label": "Chú mèo bắt chuột",
              "audio": "/media/tts/vn17-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn17-opt-giadinh",
          "explanation": "Đoạn văn giới thiệu các thành viên và tình cảm yêu thương trong gia đình bé.",
          "explanationAudio": "/media/tts/vn17-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn17-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền từ thích hợp vào câu: 'Mỗi ngày đến",
        "question": {
          "type": "tap_place",
          "id": "vn17-q2-tap",
          "prompt": "Điền từ thích hợp vào câu: 'Mỗi ngày đến trường là một ngày ...'",
          "promptAudio": "/media/tts/vn17-q2-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn17-tgt-vui",
              "label": "...",
              "prefixText": "Mỗi ngày đến trường là một ngày ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn17-it-vui",
              "label": "vui",
              "audio": "/media/tts/vn17-q2-it0.mp3"
            },
            {
              "id": "vn17-it-buon",
              "label": "buồn",
              "audio": "/media/tts/vn17-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn17-it-vui": "vn17-tgt-vui"
          },
          "explanation": "Đến trường được gặp thầy cô, bạn bè nên mỗi ngày đến trường là một ngày vui.",
          "explanationAudio": "/media/tts/vn17-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn17-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối hành động ở cột trái với ý nghĩa tốt",
        "question": {
          "type": "matching",
          "id": "vn17-q3-match",
          "prompt": "Nối hành động ở cột trái với ý nghĩa tốt đẹp ở cột phải:",
          "promptAudio": "/media/tts/vn17-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn17-l-chao",
              "label": "Bé chào cô giáo",
              "audio": "/media/tts/vn17-q3-l0.mp3"
            },
            {
              "id": "vn17-l-nau",
              "label": "Mẹ nấu cơm",
              "audio": "/media/tts/vn17-q3-l1.mp3"
            },
            {
              "id": "vn17-l-giup",
              "label": "Bé giúp mẹ quét nhà",
              "audio": "/media/tts/vn17-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn17-r-le-phep",
              "label": "thể hiện sự lễ phép",
              "audio": "/media/tts/vn17-q3-r0.mp3"
            },
            {
              "id": "vn17-r-chamsoc",
              "label": "chăm sóc cả nhà",
              "audio": "/media/tts/vn17-q3-r1.mp3"
            },
            {
              "id": "vn17-r-hieuthao",
              "label": "hiếu thảo, chăm chỉ",
              "audio": "/media/tts/vn17-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn17-l-chao",
              "rightId": "vn17-r-le-phep"
            },
            {
              "leftId": "vn17-l-nau",
              "rightId": "vn17-r-chamsoc"
            },
            {
              "leftId": "vn17-l-giup",
              "rightId": "vn17-r-hieuthao"
            }
          ],
          "explanation": "Rất chính xác! Bé ngoan luôn biết chào hỏi lễ phép và giúp đỡ bố mẹ.",
          "explanationAudio": "/media/tts/vn17-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn17-slide-q4",
        "teacherNote": "Câu hỏi 4: Khi cô giáo đang giảng bài trên lớp, các",
        "question": {
          "type": "multiple_choice",
          "id": "vn17-q4-mc",
          "prompt": "Khi cô giáo đang giảng bài trên lớp, các em cần làm gì?",
          "promptAudio": "/media/tts/vn17-q4-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn17-q4-opt-chuy",
              "label": "Chú ý lắng nghe cô giảng",
              "audio": "/media/tts/vn17-q4-opt0.mp3"
            },
            {
              "id": "vn17-q4-opt-noichuyen",
              "label": "Nói chuyện riêng với bạn",
              "audio": "/media/tts/vn17-q4-opt1.mp3"
            },
            {
              "id": "vn17-q4-opt-chaynhay",
              "label": "Chạy nhảy trong lớp",
              "audio": "/media/tts/vn17-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn17-q4-opt-chuy",
          "explanation": "Học sinh chăm ngoan luôn tập trung chú ý lắng nghe cô giảng bài.",
          "explanationAudio": "/media/tts/vn17-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn17-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền từ còn thiếu vào câu ca dao: 'Công ",
        "question": {
          "type": "tap_place",
          "id": "vn17-q5-tap",
          "prompt": "Điền từ còn thiếu vào câu ca dao: 'Công cha như núi Thái Sơn, nghĩa mẹ như ... trong nguồn chảy ra.'",
          "promptAudio": "/media/tts/vn17-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn17-tgt-nuoc",
              "label": "...",
              "prefixText": "Nghĩa mẹ như ",
              "suffixText": " trong nguồn chảy ra."
            }
          ],
          "items": [
            {
              "id": "vn17-it-nuoc",
              "label": "nước",
              "audio": "/media/tts/vn17-q5-it0.mp3"
            },
            {
              "id": "vn17-it-may",
              "label": "mây",
              "audio": "/media/tts/vn17-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn17-it-nuoc": "vn17-tgt-nuoc"
          },
          "explanation": "Câu ca dao bất hủ dạy con lòng biết ơn sâu sắc: Nghĩa mẹ như nước trong nguồn chảy ra.",
          "explanationAudio": "/media/tts/vn17-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn17-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ ở cột trái với từ ở cột phải tạo ",
        "question": {
          "type": "matching",
          "id": "vn17-q6-match",
          "prompt": "Nối từ ở cột trái với từ ở cột phải tạo từ ghép chỉ tình cảm tốt đẹp:",
          "promptAudio": "/media/tts/vn17-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn17-l2-yeu",
              "label": "yêu",
              "audio": "/media/tts/vn17-q6-l0.mp3"
            },
            {
              "id": "vn17-l2-kinh",
              "label": "kính",
              "audio": "/media/tts/vn17-q6-l1.mp3"
            },
            {
              "id": "vn17-l2-hieu",
              "label": "hiếu",
              "audio": "/media/tts/vn17-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn17-r2-thuong",
              "label": "thương",
              "audio": "/media/tts/vn17-q6-r0.mp3"
            },
            {
              "id": "vn17-r2-trong",
              "label": "trọng",
              "audio": "/media/tts/vn17-q6-r1.mp3"
            },
            {
              "id": "vn17-r2-thao",
              "label": "thảo",
              "audio": "/media/tts/vn17-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn17-l2-yeu",
              "rightId": "vn17-r2-thuong"
            },
            {
              "leftId": "vn17-l2-kinh",
              "rightId": "vn17-r2-trong"
            },
            {
              "leftId": "vn17-l2-hieu",
              "rightId": "vn17-r2-thao"
            }
          ],
          "explanation": "Bé thật xuất sắc! Yêu thương, kính trọng, hiếu thảo là những phẩm chất cao quý.",
          "explanationAudio": "/media/tts/vn17-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-18-doc-hieu-thien-nhien",
    "title": "Bài 18: Đọc hiểu Thiên nhiên & Loài vật",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Đọc hiểu đoạn văn ngắn miêu tả cảnh đẹp thiên nhiên, cây cối, con vật nuôi quanh em và ý thức bảo vệ môi trường qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn18-title-slide",
        "title": "Bài 18: Đọc hiểu Thiên nhiên & Loài vật",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn luyện tư duy phân tích chi tiết câu chuyện và tình yêu thiên nhiên.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn18-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn18-intro-slide",
        "title": "Đọc hiểu: Thiên nhiên & Loài vật",
        "body": "Thiên nhiên quanh ta có biết bao điều kì thú: chim sâu chăm chỉ, cây xanh toả bóng mát, mặt trời rực rỡ. Cùng đọc bài và khám phá nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn18-intro.mp3",
        "bullets": [
          "Chim sâu bắt sâu bảo vệ mùa màng",
          "Cây xanh cho bóng mát và quả ngọt",
          "Mỗi mùa trong năm đều mang vẻ đẹp riêng"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn18-slide-q1",
        "teacherNote": "Câu hỏi 1: Đoạn văn: 'Chú chim sâu nhỏ bé nhưng rất",
        "question": {
          "type": "multiple_choice",
          "id": "vn18-q1-mc",
          "prompt": "Đoạn văn: 'Chú chim sâu nhỏ bé nhưng rất chăm chỉ. Ngày ngày chú bắt sâu trên từng tán lá.' Chim sâu giúp ích gì cho cây cối?",
          "promptAudio": "/media/tts/vn18-q1-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn18-opt-batsau",
              "label": "Bắt sâu bảo vệ tán lá xanh",
              "audio": "/media/tts/vn18-q1-opt0.mp3"
            },
            {
              "id": "vn18-opt-hothay",
              "label": "Hót vang ru cây ngủ say",
              "audio": "/media/tts/vn18-q1-opt1.mp3"
            },
            {
              "id": "vn18-opt-anthoc",
              "label": "Ăn thóc của bác nông dân",
              "audio": "/media/tts/vn18-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn18-opt-batsau",
          "explanation": "Chim sâu siêng năng bắt sâu giúp cây xanh tươi tốt quanh năm.",
          "explanationAudio": "/media/tts/vn18-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn18-slide-q2",
        "teacherNote": "Câu hỏi 2: Nối con vật ở cột trái với tiếng kêu hoặ",
        "question": {
          "type": "matching",
          "id": "vn18-q2-match",
          "prompt": "Nối con vật ở cột trái với tiếng kêu hoặc hoạt động đặc trưng ở cột phải:",
          "promptAudio": "/media/tts/vn18-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn18-l-ga",
              "label": "chú gà trống",
              "audio": "/media/tts/vn18-q2-l0.mp3"
            },
            {
              "id": "vn18-l-meo",
              "label": "chú mèo con",
              "audio": "/media/tts/vn18-q2-l1.mp3"
            },
            {
              "id": "vn18-l-cun",
              "label": "chú cún con",
              "audio": "/media/tts/vn18-q2-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn18-r-gay",
              "label": "gáy vang gọi bình minh",
              "audio": "/media/tts/vn18-q2-r0.mp3"
            },
            {
              "id": "vn18-r-bat",
              "label": "bắt chuột ban đêm",
              "audio": "/media/tts/vn18-q2-r1.mp3"
            },
            {
              "id": "vn18-r-giu",
              "label": "trông giữ nhà cửa",
              "audio": "/media/tts/vn18-q2-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn18-l-ga",
              "rightId": "vn18-r-gay"
            },
            {
              "leftId": "vn18-l-meo",
              "rightId": "vn18-r-bat"
            },
            {
              "leftId": "vn18-l-cun",
              "rightId": "vn18-r-giu"
            }
          ],
          "explanation": "Chính xác! Gà gáy gọi bình minh, mèo bắt chuột, cún con giữ nhà.",
          "explanationAudio": "/media/tts/vn18-q2-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn18-slide-q3",
        "teacherNote": "Câu hỏi 3: Điền từ thích hợp để hoàn thiện câu: 'Mặ",
        "question": {
          "type": "tap_place",
          "id": "vn18-q3-tap",
          "prompt": "Điền từ thích hợp để hoàn thiện câu: 'Mặt trời mọc ở hướng ...'",
          "promptAudio": "/media/tts/vn18-q3-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "targets": [
            {
              "id": "vn18-tgt-dong",
              "label": "...",
              "prefixText": "Mặt trời mọc ở hướng ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn18-it-dong",
              "label": "Đông",
              "audio": "/media/tts/vn18-q3-it0.mp3"
            },
            {
              "id": "vn18-it-tay",
              "label": "Tây",
              "audio": "/media/tts/vn18-q3-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn18-it-dong": "vn18-tgt-dong"
          },
          "explanation": "Mặt trời mọc ở hướng Đông vào buổi sáng và lặn ở hướng Tây vào buổi chiều.",
          "explanationAudio": "/media/tts/vn18-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn18-slide-q4",
        "teacherNote": "Câu hỏi 4: Trồng nhiều cây xanh mang lại lợi ích gì",
        "question": {
          "type": "multiple_choice",
          "id": "vn18-q4-mc",
          "prompt": "Trồng nhiều cây xanh mang lại lợi ích gì to lớn cho cuộc sống?",
          "promptAudio": "/media/tts/vn18-q4-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "options": [
            {
              "id": "vn18-q4-opt-bongmat",
              "label": "Cho bóng mát và không khí trong lành",
              "audio": "/media/tts/vn18-q4-opt0.mp3"
            },
            {
              "id": "vn18-q4-opt-onhiem",
              "label": "Làm ô nhiễm bầu không khí",
              "audio": "/media/tts/vn18-q4-opt1.mp3"
            },
            {
              "id": "vn18-q4-opt-onao",
              "label": "Gây tiếng ồn xung quanh",
              "audio": "/media/tts/vn18-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn18-q4-opt-bongmat",
          "explanation": "Cây xanh làm sạch không khí, tạo bóng mát cho chúng ta vui chơi.",
          "explanationAudio": "/media/tts/vn18-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn18-slide-q5",
        "teacherNote": "Câu hỏi 5: Nối mùa trong năm ở cột trái với cảnh sắ",
        "question": {
          "type": "matching",
          "id": "vn18-q5-match",
          "prompt": "Nối mùa trong năm ở cột trái với cảnh sắc đặc trưng ở cột phải:",
          "promptAudio": "/media/tts/vn18-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn18-l2-xuan",
              "label": "mùa xuân",
              "audio": "/media/tts/vn18-q5-l0.mp3"
            },
            {
              "id": "vn18-l2-he",
              "label": "mùa hè",
              "audio": "/media/tts/vn18-q5-l1.mp3"
            },
            {
              "id": "vn18-l2-thu",
              "label": "mùa thu",
              "audio": "/media/tts/vn18-q5-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn18-r2-xuan",
              "label": "hoa đào nở rực rỡ",
              "audio": "/media/tts/vn18-q5-r0.mp3"
            },
            {
              "id": "vn18-r2-he",
              "label": "tiếng ve kêu râm ran",
              "audio": "/media/tts/vn18-q5-r1.mp3"
            },
            {
              "id": "vn18-r2-thu",
              "label": "lá vàng rơi nhẹ",
              "audio": "/media/tts/vn18-q5-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn18-l2-xuan",
              "rightId": "vn18-r2-xuan"
            },
            {
              "leftId": "vn18-l2-he",
              "rightId": "vn18-r2-he"
            },
            {
              "leftId": "vn18-l2-thu",
              "rightId": "vn18-r2-thu"
            }
          ],
          "explanation": "Rất đúng! Mùa xuân có hoa đào, mùa hè có tiếng ve kêu, mùa thu lá vàng rơi.",
          "explanationAudio": "/media/tts/vn18-q5-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn18-slide-q6",
        "teacherNote": "Câu hỏi 6: Điền từ thích hợp: 'Chúng em luôn chung ",
        "question": {
          "type": "tap_place",
          "id": "vn18-q6-tap",
          "prompt": "Điền từ thích hợp: 'Chúng em luôn chung tay ... cây xanh và môi trường.'",
          "promptAudio": "/media/tts/vn18-q6-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "targets": [
            {
              "id": "vn18-tgt-baove",
              "label": "...",
              "prefixText": "Chúng em chung tay ",
              "suffixText": " cây xanh."
            }
          ],
          "items": [
            {
              "id": "vn18-it-baove",
              "label": "bảo vệ",
              "audio": "/media/tts/vn18-q6-it0.mp3"
            },
            {
              "id": "vn18-it-chatpha",
              "label": "chặt phá",
              "audio": "/media/tts/vn18-q6-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn18-it-baove": "vn18-tgt-baove"
          },
          "explanation": "Mỗi học sinh đều có ý thức bảo vệ cây xanh để môi trường luôn tươi đẹp.",
          "explanationAudio": "/media/tts/vn18-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-19-chinh-ta-nang-cao",
    "title": "Bài 19: Chính tả nâng cao l/n, hỏi/ngã",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Rèn luyện quy tắc chính tả phân biệt l và n, dấu hỏi và dấu ngã, vần an và ang qua 6 câu hỏi thực hành tương tác sinh động.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn19-title-slide",
        "title": "Bài 19: Chính tả nâng cao l/n, hỏi/ngã",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn tư thế lưỡi khi phát âm l (uốn cong chạm vòm họng) và n (thẳng lưỡi).",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn19-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn19-intro-slide",
        "title": "Chính tả: Phân biệt L/N và Dấu Thanh",
        "body": "Phân biệt đúng l và n, dấu hỏi và dấu ngã giúp em viết đúng chính tả tiếng Việt. Cùng luyện tập qua các bài đố vui nhé!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn19-intro.mp3",
        "bullets": [
          "l — lúa (đồng lúa chín vàng)",
          "n — nón (chiếc nón lá nghiêng che)",
          "an — bạn (bạn bè thân thiết)",
          "ang — vàng (sắc hoa vàng tươi)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn19-slide-q1",
        "teacherNote": "Câu hỏi 1: Từ nào dưới đây viết ĐÚNG chính tả?",
        "question": {
          "type": "multiple_choice",
          "id": "vn19-q1-mc",
          "prompt": "Từ nào dưới đây viết ĐÚNG chính tả?",
          "promptAudio": "/media/tts/vn19-q1-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "options": [
            {
              "id": "vn19-opt-nonla",
              "label": "nón lá",
              "audio": "/media/tts/vn19-q1-opt0.mp3"
            },
            {
              "id": "vn19-opt-lonla",
              "label": "lón lá",
              "audio": "/media/tts/vn19-q1-opt1.mp3"
            },
            {
              "id": "vn19-opt-nonna",
              "label": "nón ná",
              "audio": "/media/tts/vn19-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn19-opt-nonla",
          "explanation": "Nón bắt đầu bằng n, lá bắt đầu bằng l: nón lá.",
          "explanationAudio": "/media/tts/vn19-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn19-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền 'l' hoặc 'n' vào chỗ trống: 'Hoa ..",
        "question": {
          "type": "tap_place",
          "id": "vn19-q2-tap",
          "prompt": "Điền 'l' hoặc 'n' vào chỗ trống: 'Hoa ...an nở trắng vườn.'",
          "promptAudio": "/media/tts/vn19-q2-prompt.mp3",
          "illustration": "/media/images/flower.svg",
          "targets": [
            {
              "id": "vn19-tgt-lan",
              "label": "...",
              "prefixText": "Hoa ",
              "suffixText": "an nở trắng vườn."
            }
          ],
          "items": [
            {
              "id": "vn19-it-l",
              "label": "l",
              "audio": "/media/tts/vn19-q2-it0.mp3"
            },
            {
              "id": "vn19-it-n",
              "label": "n",
              "audio": "/media/tts/vn19-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn19-it-l": "vn19-tgt-lan"
          },
          "explanation": "Hoa lan viết bằng âm l: l - an - lan.",
          "explanationAudio": "/media/tts/vn19-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn19-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với dấu thanh thích hợ",
        "question": {
          "type": "matching",
          "id": "vn19-q3-match",
          "prompt": "Nối từ ở cột trái với dấu thanh thích hợp ở cột phải:",
          "promptAudio": "/media/tts/vn19-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn19-l-buoi",
              "label": "quả bưởi",
              "audio": "/media/tts/vn19-q3-l0.mp3"
            },
            {
              "id": "vn19-l-mu",
              "label": "chiếc mũ",
              "audio": "/media/tts/vn19-q3-l1.mp3"
            },
            {
              "id": "vn19-l-sao",
              "label": "ngôi sao",
              "audio": "/media/tts/vn19-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn19-r-hoi",
              "label": "thanh hỏi",
              "audio": "/media/tts/vn19-q3-r0.mp3"
            },
            {
              "id": "vn19-r-nga",
              "label": "thanh ngã",
              "audio": "/media/tts/vn19-q3-r1.mp3"
            },
            {
              "id": "vn19-r-ngang",
              "label": "thanh ngang",
              "audio": "/media/tts/vn19-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn19-l-buoi",
              "rightId": "vn19-r-hoi"
            },
            {
              "leftId": "vn19-l-mu",
              "rightId": "vn19-r-nga"
            },
            {
              "leftId": "vn19-l-sao",
              "rightId": "vn19-r-ngang"
            }
          ],
          "explanation": "Rất chuẩn! Quả bưởi có thanh hỏi, chiếc mũ có thanh ngã, ngôi sao có thanh ngang.",
          "explanationAudio": "/media/tts/vn19-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn19-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây viết SAI chính tả?",
        "question": {
          "type": "multiple_choice",
          "id": "vn19-q4-mc",
          "prompt": "Từ nào dưới đây viết SAI chính tả?",
          "promptAudio": "/media/tts/vn19-q4-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "options": [
            {
              "id": "vn19-q4-opt-lanua",
              "label": "lá nụa (sai)",
              "audio": "/media/tts/vn19-q4-opt0.mp3"
            },
            {
              "id": "vn19-q4-opt-hoalan",
              "label": "hoa lan",
              "audio": "/media/tts/vn19-q4-opt1.mp3"
            },
            {
              "id": "vn19-q4-opt-nuhoa",
              "label": "nụ hoa",
              "audio": "/media/tts/vn19-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn19-q4-opt-lanua",
          "explanation": "Từ 'lá nụa' viết sai, từ đúng phải là 'lá lúa'.",
          "explanationAudio": "/media/tts/vn19-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn19-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần 'an' hoặc 'ang' vào chỗ trống: ",
        "question": {
          "type": "tap_place",
          "id": "vn19-q5-tap",
          "prompt": "Điền vần 'an' hoặc 'ang' vào chỗ trống: 'Đồng lúa chín v...'",
          "promptAudio": "/media/tts/vn19-q5-prompt.mp3",
          "illustration": "/media/images/sun.svg",
          "targets": [
            {
              "id": "vn19-tgt-vang",
              "label": "...",
              "prefixText": "Đồng lúa chín v",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn19-it-ang",
              "label": "àng",
              "audio": "/media/tts/vn19-q5-it0.mp3"
            },
            {
              "id": "vn19-it-an",
              "label": "àn",
              "audio": "/media/tts/vn19-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn19-it-ang": "vn19-tgt-vang"
          },
          "explanation": "Đồng lúa chín vàng, tiếng vàng có vần ang.",
          "explanationAudio": "/media/tts/vn19-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn19-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối cặp từ phân biệt l và n ở hai cột:",
        "question": {
          "type": "matching",
          "id": "vn19-q6-match",
          "prompt": "Nối cặp từ phân biệt l và n ở hai cột:",
          "promptAudio": "/media/tts/vn19-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn19-l2-lua",
              "label": "lúa",
              "audio": "/media/tts/vn19-q6-l0.mp3"
            },
            {
              "id": "vn19-l2-lam",
              "label": "làm",
              "audio": "/media/tts/vn19-q6-l1.mp3"
            },
            {
              "id": "vn19-l2-no",
              "label": "nô",
              "audio": "/media/tts/vn19-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn19-r2-nep",
              "label": "nếp thơm",
              "audio": "/media/tts/vn19-q6-r0.mp3"
            },
            {
              "id": "vn19-r2-nen",
              "label": "nên công việc",
              "audio": "/media/tts/vn19-q6-r1.mp3"
            },
            {
              "id": "vn19-r2-dua",
              "label": "đùa vui vẻ",
              "audio": "/media/tts/vn19-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn19-l2-lua",
              "rightId": "vn19-r2-nep"
            },
            {
              "leftId": "vn19-l2-lam",
              "rightId": "vn19-r2-nen"
            },
            {
              "leftId": "vn19-l2-no",
              "rightId": "vn19-r2-dua"
            }
          ],
          "explanation": "Bé thật xuất sắc! Bé đã nắm vững quy tắc chính tả phân biệt l và n.",
          "explanationAudio": "/media/tts/vn19-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-20-review-final",
    "title": "Bài 20: Ôn tập Tiếng Việt cuối năm",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Ôn tập toàn diện chương trình Tiếng Việt Lớp 1: Ghép từ thành câu trọn vẹn, đọc hiểu đoạn văn ngắn và sẵn sàng bước vào Lớp 2.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn20-title-slide",
        "title": "Bài 20: Ôn tập Tiếng Việt cuối năm",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Tổng kết năm học Lớp 1, khen ngợi và động viên các em tự tin lên lớp 2.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn20-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn20-intro-slide",
        "title": "Ôn tập tổng hợp cuối năm",
        "body": "Chúc mừng các em đã đi đến chặng đường cuối của lớp 1! Giờ đây các em đã biết đọc thông, viết thạo và tự tin bước vào lớp 2!",
        "teacherNote": "Hướng dẫn cả lớp luyện đọc đồng thanh các từ ngữ mẫu.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn20-intro.mp3",
        "bullets": [
          "Đọc trôi chảy câu và đoạn văn",
          "Ghép từ tạo thành câu có nghĩa",
          "Hiểu nội dung bài đọc và diễn đạt tự tin"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn20-slide-q1",
        "teacherNote": "Câu hỏi 1: Sắp xếp từ để tạo thành câu hoàn chỉnh: ",
        "question": {
          "type": "tap_place",
          "id": "vn20-q1-tap",
          "prompt": "Sắp xếp từ để tạo thành câu hoàn chỉnh: Em là học sinh lớp một.",
          "promptAudio": "/media/tts/vn20-q1-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn20-tgt-lopmot",
              "label": "...",
              "prefixText": "Em là học sinh ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn20-it-lopmot",
              "label": "lớp một",
              "audio": "/media/tts/vn20-q1-it0.mp3"
            },
            {
              "id": "vn20-it-lopnam",
              "label": "lớp năm",
              "audio": "/media/tts/vn20-q1-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn20-it-lopmot": "vn20-tgt-lopmot"
          },
          "explanation": "Câu hoàn chỉnh thể hiện niềm tự hào: Em là học sinh lớp một.",
          "explanationAudio": "/media/tts/vn20-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn20-slide-q2",
        "teacherNote": "Câu hỏi 2: Nối hai vế câu ở cột trái và cột phải để",
        "question": {
          "type": "matching",
          "id": "vn20-q2-match",
          "prompt": "Nối hai vế câu ở cột trái và cột phải để tạo câu văn hoàn chỉnh:",
          "promptAudio": "/media/tts/vn20-q2-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn20-l-muahe",
              "label": "Mùa hè đến,",
              "audio": "/media/tts/vn20-q2-l0.mp3"
            },
            {
              "id": "vn20-l-bautroi",
              "label": "Bầu trời mùa hè",
              "audio": "/media/tts/vn20-q2-l1.mp3"
            },
            {
              "id": "vn20-l-hocsinh",
              "label": "Các bạn học sinh",
              "audio": "/media/tts/vn20-q2-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn20-r-vekeu",
              "label": "tiếng ve kêu râm ran.",
              "audio": "/media/tts/vn20-q2-r0.mp3"
            },
            {
              "id": "vn20-r-trongxanh",
              "label": "trong xanh vời vợi.",
              "audio": "/media/tts/vn20-q2-r1.mp3"
            },
            {
              "id": "vn20-r-nghihe",
              "label": "được nghỉ hè vui vẻ.",
              "audio": "/media/tts/vn20-q2-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn20-l-muahe",
              "rightId": "vn20-r-vekeu"
            },
            {
              "leftId": "vn20-l-bautroi",
              "rightId": "vn20-r-trongxanh"
            },
            {
              "leftId": "vn20-l-hocsinh",
              "rightId": "vn20-r-nghihe"
            }
          ],
          "explanation": "Rất chuẩn xác! Cả 3 câu đều nói về mùa hè tươi đẹp và tràn ngập niềm vui.",
          "explanationAudio": "/media/tts/vn20-q2-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn20-slide-q3",
        "teacherNote": "Câu hỏi 3: Đoạn văn: 'Năm học lớp một đã kết thúc. ",
        "question": {
          "type": "multiple_choice",
          "id": "vn20-q3-mc",
          "prompt": "Đoạn văn: 'Năm học lớp một đã kết thúc. Em biết đọc truyện, viết chữ đẹp và làm toán nhanh.' Sau năm học lớp một, em đã biết làm những gì?",
          "promptAudio": "/media/tts/vn20-q3-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "options": [
            {
              "id": "vn20-opt-bietdoc",
              "label": "Biết đọc truyện, viết chữ và làm toán",
              "audio": "/media/tts/vn20-q3-opt0.mp3"
            },
            {
              "id": "vn20-opt-laixe",
              "label": "Biết lái xe ô tô trên đường phố",
              "audio": "/media/tts/vn20-q3-opt1.mp3"
            },
            {
              "id": "vn20-opt-bay",
              "label": "Biết tự bay lên mặt trăng",
              "audio": "/media/tts/vn20-q3-opt2.mp3"
            }
          ],
          "correctOptionId": "vn20-opt-bietdoc",
          "explanation": "Lớp một đã giúp các em biết đọc, biết viết và làm toán rất giỏi.",
          "explanationAudio": "/media/tts/vn20-q3-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn20-slide-q4",
        "teacherNote": "Câu hỏi 4: Điền từ thích hợp: 'Tạm biệt lớp một, ch",
        "question": {
          "type": "tap_place",
          "id": "vn20-q4-tap",
          "prompt": "Điền từ thích hợp: 'Tạm biệt lớp một, chúng em tự tin bước vào lớp ...'",
          "promptAudio": "/media/tts/vn20-q4-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn20-tgt-lophai",
              "label": "...",
              "prefixText": "Tự tin bước vào lớp ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn20-it-hai",
              "label": "hai",
              "audio": "/media/tts/vn20-q4-it0.mp3"
            },
            {
              "id": "vn20-it-ba",
              "label": "ba",
              "audio": "/media/tts/vn20-q4-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn20-it-hai": "vn20-tgt-lophai"
          },
          "explanation": "Hoàn thành lớp một, năm sau các em sẽ là học sinh lớp hai.",
          "explanationAudio": "/media/tts/vn20-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn20-slide-q5",
        "teacherNote": "Câu hỏi 5: Nối đức tính tốt ở cột trái với hành độn",
        "question": {
          "type": "matching",
          "id": "vn20-q5-match",
          "prompt": "Nối đức tính tốt ở cột trái với hành động cụ thể ở cột phải:",
          "promptAudio": "/media/tts/vn20-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn20-l2-cham",
              "label": "Chăm chỉ",
              "audio": "/media/tts/vn20-q5-l0.mp3"
            },
            {
              "id": "vn20-l2-le",
              "label": "Lễ phép",
              "audio": "/media/tts/vn20-q5-l1.mp3"
            },
            {
              "id": "vn20-l2-doan",
              "label": "Đoàn kết",
              "audio": "/media/tts/vn20-q5-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn20-r2-di-hoc",
              "label": "đi học đúng giờ, làm bài đầy đủ",
              "audio": "/media/tts/vn20-q5-r0.mp3"
            },
            {
              "id": "vn20-r2-chao-hoi",
              "label": "chào hỏi thầy cô và người lớn",
              "audio": "/media/tts/vn20-q5-r1.mp3"
            },
            {
              "id": "vn20-r2-giup-do",
              "label": "yêu quý, giúp đỡ bạn bè",
              "audio": "/media/tts/vn20-q5-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn20-l2-cham",
              "rightId": "vn20-r2-di-hoc"
            },
            {
              "leftId": "vn20-l2-le",
              "rightId": "vn20-r2-chao-hoi"
            },
            {
              "leftId": "vn20-l2-doan",
              "rightId": "vn20-r2-giup-do"
            }
          ],
          "explanation": "Chính xác! Chăm chỉ, lễ phép, đoàn kết là những phẩm chất đáng quý của học sinh.",
          "explanationAudio": "/media/tts/vn20-q5-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn20-slide-q6",
        "teacherNote": "Câu hỏi 6: Khi gặp thầy cô giáo trong sân trường, c",
        "question": {
          "type": "multiple_choice",
          "id": "vn20-q6-mc",
          "prompt": "Khi gặp thầy cô giáo trong sân trường, câu chào nào thể hiện sự lễ phép nhất?",
          "promptAudio": "/media/tts/vn20-q6-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn20-q6-opt-chao",
              "label": "Em chào thầy cô ạ!",
              "audio": "/media/tts/vn20-q6-opt0.mp3"
            },
            {
              "id": "vn20-q6-opt-hoi",
              "label": "Thầy cô đi đâu đấy?",
              "audio": "/media/tts/vn20-q6-opt1.mp3"
            },
            {
              "id": "vn20-q6-opt-re",
              "label": "Chào nhé!",
              "audio": "/media/tts/vn20-q6-opt2.mp3"
            }
          ],
          "correctOptionId": "vn20-q6-opt-chao",
          "explanation": "Lời chào 'Em chào thầy cô ạ!' vừa lễ phép vừa thể hiện lòng tôn kính thầy cô giáo.",
          "explanationAudio": "/media/tts/vn20-q6-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      }
    ]
  }
]

def get_vn_lessons():
    return VN_LESSONS
