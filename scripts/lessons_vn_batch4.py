# -*- coding: utf-8 -*-
"""Vietnamese Lessons 21-30 for Grade 1"""

true = True
false = False
null = None

VN_LESSONS_BATCH4 = [
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-21-am-g-gi",
    "title": "Bài 21: Âm g, gi và tiếng ghép",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen âm đơn g, âm đôi gi và luyện đọc các từ con gà, đồ gỗ, gió mát, giỏ cá qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn21-title-slide",
        "title": "Bài 21: Âm g, gi và tiếng ghép",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Hướng dẫn phân biệt cách viết và đọc g đơn và gi.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn21-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn21-intro-slide",
        "title": "Làm quen âm G và GI",
        "body": "Hôm nay các em học âm g và gi. Cùng đọc các tiếng: gà, gỗ, gió, giỏ cá nhé!",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn21-intro.mp3",
        "bullets": [
          "g — gà (chú gà trống gáy vang)",
          "g — gỗ (bộ bàn ghế gỗ)",
          "gi — gió (gió thổi mát rượi)",
          "gi — giỏ (chiếc giỏ mây đi chợ)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn21-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'gà' bắt đầu bằng âm nào dưới đây?",
        "question": {
          "type": "multiple_choice",
          "id": "vn21-q1-mc",
          "prompt": "Tiếng 'gà' bắt đầu bằng âm nào dưới đây?",
          "promptAudio": "/media/tts/vn21-q1-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn21-opt-g",
              "label": "Âm g",
              "audio": "/media/tts/vn21-q1-opt0.mp3"
            },
            {
              "id": "vn21-opt-gi",
              "label": "Âm gi",
              "audio": "/media/tts/vn21-q1-opt1.mp3"
            },
            {
              "id": "vn21-opt-c",
              "label": "Âm c",
              "audio": "/media/tts/vn21-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn21-opt-g",
          "explanation": "Tiếng gà bắt đầu bằng âm g: g - a - ga - huyền - gà.",
          "explanationAudio": "/media/tts/vn21-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn21-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền âm thích hợp để tạo thành từ gió má",
        "question": {
          "type": "tap_place",
          "id": "vn21-q2-tap",
          "prompt": "Điền âm thích hợp để tạo thành từ gió mát:",
          "promptAudio": "/media/tts/vn21-q2-prompt.mp3",
          "illustration": "/media/images/leaf.svg",
          "targets": [
            {
              "id": "vn21-t1",
              "label": "...",
              "prefixText": "",
              "suffixText": "ó mát"
            }
          ],
          "items": [
            {
              "id": "vn21-i1",
              "label": "Gi",
              "audio": "/media/tts/vn21-q2-it0.mp3"
            },
            {
              "id": "vn21-i2",
              "label": "G",
              "audio": "/media/tts/vn21-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn21-i1": "vn21-t1"
          },
          "explanation": "Gió mát bắt đầu bằng âm gi.",
          "explanationAudio": "/media/tts/vn21-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn21-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối tiếng ở cột trái với từ tương ứng ở ",
        "question": {
          "type": "matching",
          "id": "vn21-q3-match",
          "prompt": "Nối tiếng ở cột trái với từ tương ứng ở cột phải:",
          "promptAudio": "/media/tts/vn21-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn21-l1",
              "label": "con gà",
              "audio": "/media/tts/vn21-q3-l0.mp3"
            },
            {
              "id": "vn21-l2",
              "label": "đồ gỗ",
              "audio": "/media/tts/vn21-q3-l1.mp3"
            },
            {
              "id": "vn21-l3",
              "label": "giỏ cá",
              "audio": "/media/tts/vn21-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn21-r1",
              "label": "chú gà trống",
              "audio": "/media/tts/vn21-q3-r0.mp3"
            },
            {
              "id": "vn21-r2",
              "label": "bàn ghế gỗ",
              "audio": "/media/tts/vn21-q3-r1.mp3"
            },
            {
              "id": "vn21-r3",
              "label": "chiếc giỏ mây",
              "audio": "/media/tts/vn21-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn21-l1",
              "rightId": "vn21-r1"
            },
            {
              "leftId": "vn21-l2",
              "rightId": "vn21-r2"
            },
            {
              "leftId": "vn21-l3",
              "rightId": "vn21-r3"
            }
          ],
          "explanation": "Gà trống, bàn ghế gỗ, giỏ mây.",
          "explanationAudio": "/media/tts/vn21-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn21-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa âm 'gi'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn21-q4-mc",
          "prompt": "Từ nào dưới đây có chứa âm 'gi'?",
          "promptAudio": "/media/tts/vn21-q4-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "options": [
            {
              "id": "vn21-q4-gio",
              "label": "cơn gió",
              "audio": "/media/tts/vn21-q4-opt0.mp3"
            },
            {
              "id": "vn21-q4-ga",
              "label": "con gà",
              "audio": "/media/tts/vn21-q4-opt1.mp3"
            },
            {
              "id": "vn21-q4-go",
              "label": "khúc gỗ",
              "audio": "/media/tts/vn21-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn21-q4-gio",
          "explanation": "Từ cơn gió có tiếng gió bắt đầu bằng âm gi.",
          "explanationAudio": "/media/tts/vn21-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn21-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền âm g hoặc gi vào chỗ trống: Chú ...",
        "question": {
          "type": "tap_place",
          "id": "vn21-q5-tap",
          "prompt": "Điền âm g hoặc gi vào chỗ trống: Chú ...à trống",
          "promptAudio": "/media/tts/vn21-q5-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "targets": [
            {
              "id": "vn21-t2",
              "label": "...",
              "prefixText": "Chú ",
              "suffixText": "à trống"
            }
          ],
          "items": [
            {
              "id": "vn21-i3",
              "label": "g",
              "audio": "/media/tts/vn21-q5-it0.mp3"
            },
            {
              "id": "vn21-i4",
              "label": "gi",
              "audio": "/media/tts/vn21-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn21-i3": "vn21-t2"
          },
          "explanation": "Gà viết bằng âm g đơn.",
          "explanationAudio": "/media/tts/vn21-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn21-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối âm với phần vần để tạo tiếng có nghĩ",
        "question": {
          "type": "matching",
          "id": "vn21-q6-match",
          "prompt": "Nối âm với phần vần để tạo tiếng có nghĩa:",
          "promptAudio": "/media/tts/vn21-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn21-l2-g",
              "label": "g",
              "audio": "/media/tts/vn21-q6-l0.mp3"
            },
            {
              "id": "vn21-l2-gi",
              "label": "gi",
              "audio": "/media/tts/vn21-q6-l1.mp3"
            },
            {
              "id": "vn21-l2-go",
              "label": "g",
              "audio": "/media/tts/vn21-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn21-r2-a",
              "label": "à (gà)",
              "audio": "/media/tts/vn21-q6-r0.mp3"
            },
            {
              "id": "vn21-r2-o",
              "label": "ó (gió)",
              "audio": "/media/tts/vn21-q6-r1.mp3"
            },
            {
              "id": "vn21-r2-o2",
              "label": "ỗ (gỗ)",
              "audio": "/media/tts/vn21-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn21-l2-g",
              "rightId": "vn21-r2-a"
            },
            {
              "leftId": "vn21-l2-gi",
              "rightId": "vn21-r2-o"
            },
            {
              "leftId": "vn21-l2-go",
              "rightId": "vn21-r2-o2"
            }
          ],
          "explanation": "g ghép à thành gà; gi ghép ó thành gió; g ghép ỗ thành gỗ.",
          "explanationAudio": "/media/tts/vn21-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-22-am-gh-nh",
    "title": "Bài 22: Âm gh, nh và tiếng ghép",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen âm gh, nh và luyện đọc các từ ghế gỗ, nhà ga, chùm nho qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn22-title-slide",
        "title": "Bài 22: Âm gh, nh và tiếng ghép",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Nhắc quy tắc gh chỉ đi với e, ê, i.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn22-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn22-intro-slide",
        "title": "Làm quen âm GH và NH",
        "body": "Âm gh ghép với e, ê, i tạo tiếng: ghế, ghen, ghi. Âm nh tạo tiếng: nhà, nho, nhạn. Cùng luyện đọc nhé!",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn22-intro.mp3",
        "bullets": [
          "gh — ghế (chiếc ghế tựa)",
          "nh — nhà (ngôi nhà thân yêu)",
          "nh — nho (chùm nho tím ngọt)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn22-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'ghế' bắt đầu bằng âm nào?",
        "question": {
          "type": "multiple_choice",
          "id": "vn22-q1-mc",
          "prompt": "Tiếng 'ghế' bắt đầu bằng âm nào?",
          "promptAudio": "/media/tts/vn22-q1-prompt.mp3",
          "illustration": "/media/images/chair.svg",
          "options": [
            {
              "id": "vn22-opt-gh",
              "label": "Âm gh",
              "audio": "/media/tts/vn22-q1-opt0.mp3"
            },
            {
              "id": "vn22-opt-g",
              "label": "Âm g",
              "audio": "/media/tts/vn22-q1-opt1.mp3"
            },
            {
              "id": "vn22-opt-nh",
              "label": "Âm nh",
              "audio": "/media/tts/vn22-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn22-opt-gh",
          "explanation": "Vì đứng trước âm ê nên phải viết bằng gh.",
          "explanationAudio": "/media/tts/vn22-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn22-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền âm thích hợp để có từ chùm nho:",
        "question": {
          "type": "tap_place",
          "id": "vn22-q2-tap",
          "prompt": "Điền âm thích hợp để có từ chùm nho:",
          "promptAudio": "/media/tts/vn22-q2-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn22-t1",
              "label": "...",
              "prefixText": "Chùm ",
              "suffixText": "o"
            }
          ],
          "items": [
            {
              "id": "vn22-i1",
              "label": "nh",
              "audio": "/media/tts/vn22-q2-it0.mp3"
            },
            {
              "id": "vn22-i2",
              "label": "gh",
              "audio": "/media/tts/vn22-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn22-i1": "vn22-t1"
          },
          "explanation": "Tiếng nho bắt đầu bằng âm nh: nh - o - nho.",
          "explanationAudio": "/media/tts/vn22-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn22-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với ý tương ứng ở cột ",
        "question": {
          "type": "matching",
          "id": "vn22-q3-match",
          "prompt": "Nối từ ở cột trái với ý tương ứng ở cột phải:",
          "promptAudio": "/media/tts/vn22-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn22-l1",
              "label": "ghế gỗ",
              "audio": "/media/tts/vn22-q3-l0.mp3"
            },
            {
              "id": "vn22-l2",
              "label": "ngôi nhà",
              "audio": "/media/tts/vn22-q3-l1.mp3"
            },
            {
              "id": "vn22-l3",
              "label": "chùm nho",
              "audio": "/media/tts/vn22-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn22-r1",
              "label": "chiếc ghế tựa",
              "audio": "/media/tts/vn22-q3-r0.mp3"
            },
            {
              "id": "vn22-r2",
              "label": "mái ấm gia đình",
              "audio": "/media/tts/vn22-q3-r1.mp3"
            },
            {
              "id": "vn22-r3",
              "label": "quả nho ngọt lịm",
              "audio": "/media/tts/vn22-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn22-l1",
              "rightId": "vn22-r1"
            },
            {
              "leftId": "vn22-l2",
              "rightId": "vn22-r2"
            },
            {
              "leftId": "vn22-l3",
              "rightId": "vn22-r3"
            }
          ],
          "explanation": "Ghế tựa, mái ấm gia đình, quả nho ngọt lịm.",
          "explanationAudio": "/media/tts/vn22-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn22-slide-q4",
        "teacherNote": "Câu hỏi 4: Âm 'gh' đi được với những chữ cái nào?",
        "question": {
          "type": "multiple_choice",
          "id": "vn22-q4-mc",
          "prompt": "Âm 'gh' đi được với những chữ cái nào?",
          "promptAudio": "/media/tts/vn22-q4-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "options": [
            {
              "id": "vn22-q4-eei",
              "label": "e, ê, i",
              "audio": "/media/tts/vn22-q4-opt0.mp3"
            },
            {
              "id": "vn22-q4-ao",
              "label": "a, o, u",
              "audio": "/media/tts/vn22-q4-opt1.mp3"
            },
            {
              "id": "vn22-q4-ou",
              "label": "o, ô, ơ",
              "audio": "/media/tts/vn22-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn22-q4-eei",
          "explanation": "Quy tắc chính tả: gh luôn đi với ba âm e, ê, i.",
          "explanationAudio": "/media/tts/vn22-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn22-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền từ thích hợp vào chỗ trống: Ngôi ..",
        "question": {
          "type": "tap_place",
          "id": "vn22-q5-tap",
          "prompt": "Điền từ thích hợp vào chỗ trống: Ngôi ... em ở",
          "promptAudio": "/media/tts/vn22-q5-prompt.mp3",
          "illustration": "/media/images/house.svg",
          "targets": [
            {
              "id": "vn22-t2",
              "label": "...",
              "prefixText": "Ngôi ",
              "suffixText": " em ở"
            }
          ],
          "items": [
            {
              "id": "vn22-i3",
              "label": "nhà",
              "audio": "/media/tts/vn22-q5-it0.mp3"
            },
            {
              "id": "vn22-i4",
              "label": "ghế",
              "audio": "/media/tts/vn22-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn22-i3": "vn22-t2"
          },
          "explanation": "Ngôi nhà em ở.",
          "explanationAudio": "/media/tts/vn22-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn22-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ với hình minh họa thích hợp:",
        "question": {
          "type": "matching",
          "id": "vn22-q6-match",
          "prompt": "Nối từ với hình minh họa thích hợp:",
          "promptAudio": "/media/tts/vn22-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn22-l2-ghe",
              "label": "cái ghế",
              "audio": "/media/tts/vn22-q6-l0.mp3"
            },
            {
              "id": "vn22-l2-nha",
              "label": "ngôi nhà",
              "audio": "/media/tts/vn22-q6-l1.mp3"
            },
            {
              "id": "vn22-l2-cay",
              "label": "cây xanh",
              "audio": "/media/tts/vn22-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn22-r2-ghe",
              "label": "chiếc ghế ngồi",
              "audio": "/media/tts/vn22-q6-r0.mp3",
              "image": "/media/images/chair.svg"
            },
            {
              "id": "vn22-r2-nha",
              "label": "ngôi nhà ngói đỏ",
              "audio": "/media/tts/vn22-q6-r1.mp3",
              "image": "/media/images/house.svg"
            },
            {
              "id": "vn22-r2-cay",
              "label": "bóng mát sân trường",
              "audio": "/media/tts/vn22-q6-r2.mp3",
              "image": "/media/images/tree.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn22-l2-ghe",
              "rightId": "vn22-r2-ghe"
            },
            {
              "leftId": "vn22-l2-nha",
              "rightId": "vn22-r2-nha"
            },
            {
              "leftId": "vn22-l2-cay",
              "rightId": "vn22-r2-cay"
            }
          ],
          "explanation": "Nối rất chính xác! Cái ghế, ngôi nhà và cây xanh.",
          "explanationAudio": "/media/tts/vn22-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-23-am-ng-ngh",
    "title": "Bài 23: Âm ng, ngh và tiếng ghép",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Phân biệt quy tắc viết ng và ngh qua các từ bắp ngô, con nghé, nghệ vàng, ngỗng trắng.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn23-title-slide",
        "title": "Bài 23: Âm ng, ngh và tiếng ghép",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Nhắc lại quy tắc ngh ghép với e, ê, i; ng ghép với các âm còn lại.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn23-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn23-intro-slide",
        "title": "Quy tắc chính tả NG và NGH",
        "body": "Tương tự g và gh, ngh luôn đi cùng e, ê, i (nghé, nghệ, nghi). Còn ng đi cùng a, o, ô, ơ, u, ư (ngô, ngỗng, ngã).",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn23-intro.mp3",
        "bullets": [
          "ngh đi với: e, ê, i (con nghé, củ nghệ)",
          "ng đi với: a, o, ô, ơ, u, ư (bắp ngô, ngỗng con)",
          "Phát âm hai âm này giống nhau"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn23-slide-q1",
        "teacherNote": "Câu hỏi 1: Từ 'con nghé' viết bằng âm 'ng' hay 'ngh",
        "question": {
          "type": "multiple_choice",
          "id": "vn23-q1-mc",
          "prompt": "Từ 'con nghé' viết bằng âm 'ng' hay 'ngh'?",
          "promptAudio": "/media/tts/vn23-q1-prompt.mp3",
          "illustration": "/media/images/cat.svg",
          "options": [
            {
              "id": "vn23-opt-ngh",
              "label": "Âm ngh",
              "audio": "/media/tts/vn23-q1-opt0.mp3"
            },
            {
              "id": "vn23-opt-ng",
              "label": "Âm ng",
              "audio": "/media/tts/vn23-q1-opt1.mp3"
            }
          ],
          "correctOptionId": "vn23-opt-ngh",
          "explanation": "Vì đứng trước âm é nên phải viết là ngh: con nghé.",
          "explanationAudio": "/media/tts/vn23-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn23-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền 'ng' hoặc 'ngh' vào chỗ trống: Bắp ",
        "question": {
          "type": "tap_place",
          "id": "vn23-q2-tap",
          "prompt": "Điền 'ng' hoặc 'ngh' vào chỗ trống: Bắp ...ô non",
          "promptAudio": "/media/tts/vn23-q2-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn23-t1",
              "label": "...",
              "prefixText": "Bắp ",
              "suffixText": "ô non"
            }
          ],
          "items": [
            {
              "id": "vn23-i1",
              "label": "ng",
              "audio": "/media/tts/vn23-q2-it0.mp3"
            },
            {
              "id": "vn23-i2",
              "label": "ngh",
              "audio": "/media/tts/vn23-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn23-i1": "vn23-t1"
          },
          "explanation": "Âm ô đi với ng đơn: bắp ngô.",
          "explanationAudio": "/media/tts/vn23-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn23-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với cách viết đúng ở c",
        "question": {
          "type": "matching",
          "id": "vn23-q3-match",
          "prompt": "Nối từ ở cột trái với cách viết đúng ở cột phải:",
          "promptAudio": "/media/tts/vn23-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn23-l1",
              "label": "củ nghệ",
              "audio": "/media/tts/vn23-q3-l0.mp3"
            },
            {
              "id": "vn23-l2",
              "label": "ngỗng trắng",
              "audio": "/media/tts/vn23-q3-l1.mp3"
            },
            {
              "id": "vn23-l3",
              "label": "nghỉ ngơi",
              "audio": "/media/tts/vn23-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn23-r1",
              "label": "ngh đi với ê",
              "audio": "/media/tts/vn23-q3-r0.mp3"
            },
            {
              "id": "vn23-r2",
              "label": "ng đi với ô",
              "audio": "/media/tts/vn23-q3-r1.mp3"
            },
            {
              "id": "vn23-r3",
              "label": "ngh đi với i",
              "audio": "/media/tts/vn23-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn23-l1",
              "rightId": "vn23-r1"
            },
            {
              "leftId": "vn23-l2",
              "rightId": "vn23-r2"
            },
            {
              "leftId": "vn23-l3",
              "rightId": "vn23-r3"
            }
          ],
          "explanation": "Quy tắc: ngh đi với e, ê, i; ng đi với a, o, ô, ơ, u, ư.",
          "explanationAudio": "/media/tts/vn23-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn23-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây viết SAI chính tả?",
        "question": {
          "type": "multiple_choice",
          "id": "vn23-q4-mc",
          "prompt": "Từ nào dưới đây viết SAI chính tả?",
          "promptAudio": "/media/tts/vn23-q4-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "options": [
            {
              "id": "vn23-q4-sai",
              "label": "nghe ngóng (viết ng-e sai)",
              "audio": "/media/tts/vn23-q4-opt0.mp3"
            },
            {
              "id": "vn23-q4-dung1",
              "label": "con nghé",
              "audio": "/media/tts/vn23-q4-opt1.mp3"
            },
            {
              "id": "vn23-q4-dung2",
              "label": "bắp ngô",
              "audio": "/media/tts/vn23-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn23-q4-sai",
          "explanation": "Đi với e phải viết là 'nghe' (ngh), viết 'nge' là sai.",
          "explanationAudio": "/media/tts/vn23-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn23-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền âm thích hợp để có từ củ nghệ:",
        "question": {
          "type": "tap_place",
          "id": "vn23-q5-tap",
          "prompt": "Điền âm thích hợp để có từ củ nghệ:",
          "promptAudio": "/media/tts/vn23-q5-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn23-t2",
              "label": "...",
              "prefixText": "Củ ",
              "suffixText": "ệ"
            }
          ],
          "items": [
            {
              "id": "vn23-i3",
              "label": "ngh",
              "audio": "/media/tts/vn23-q5-it0.mp3"
            },
            {
              "id": "vn23-i4",
              "label": "ng",
              "audio": "/media/tts/vn23-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn23-i3": "vn23-t2"
          },
          "explanation": "Củ nghệ có âm ngh đứng trước âm ê.",
          "explanationAudio": "/media/tts/vn23-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn23-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối tiếng ở hai cột để tạo từ ghép đúng:",
        "question": {
          "type": "matching",
          "id": "vn23-q6-match",
          "prompt": "Nối tiếng ở hai cột để tạo từ ghép đúng:",
          "promptAudio": "/media/tts/vn23-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn23-l2-nghi",
              "label": "nghỉ",
              "audio": "/media/tts/vn23-q6-l0.mp3"
            },
            {
              "id": "vn23-l2-nghe",
              "label": "lắng",
              "audio": "/media/tts/vn23-q6-l1.mp3"
            },
            {
              "id": "vn23-l2-ngo",
              "label": "bắp",
              "audio": "/media/tts/vn23-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn23-r2-ngoi",
              "label": "ngơi",
              "audio": "/media/tts/vn23-q6-r0.mp3"
            },
            {
              "id": "vn23-r2-nghe",
              "label": "nghe",
              "audio": "/media/tts/vn23-q6-r1.mp3"
            },
            {
              "id": "vn23-r2-ngo",
              "label": "ngô",
              "audio": "/media/tts/vn23-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn23-l2-nghi",
              "rightId": "vn23-r2-ngoi"
            },
            {
              "leftId": "vn23-l2-nghe",
              "rightId": "vn23-r2-nghe"
            },
            {
              "leftId": "vn23-l2-ngo",
              "rightId": "vn23-r2-ngo"
            }
          ],
          "explanation": "Nghỉ ngơi, lắng nghe, bắp ngô.",
          "explanationAudio": "/media/tts/vn23-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-24-van-ia-ua-ua",
    "title": "Bài 24: Các vần ia, ua, ưa",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen với các vần nguyên âm ia, ua, ưa và luyện đọc các từ cây mía, con cua, quả dừa, chú ngựa.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn24-title-slide",
        "title": "Bài 24: Các vần ia, ua, ưa",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn phát âm lướt từ âm đầu sang âm a.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn24-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn24-intro-slide",
        "title": "Các vần IA, UA, ƯA",
        "body": "Các vần ia, ua, ưa xuất hiện trong rất nhiều từ thân quen: cây mía, con cua, quả dừa, chú ngựa. Cùng đọc với cô nhé!",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn24-intro.mp3",
        "bullets": [
          "ia — mía (cây mía ngọt lịm)",
          "ua — cua (con cua tám cẳng hai càng)",
          "ưa — dừa (quả dừa xiêm mát lành)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn24-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'mía' có chứa vần gì?",
        "question": {
          "type": "multiple_choice",
          "id": "vn24-q1-mc",
          "prompt": "Tiếng 'mía' có chứa vần gì?",
          "promptAudio": "/media/tts/vn24-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "vn24-opt-ia",
              "label": "Vần ia",
              "audio": "/media/tts/vn24-q1-opt0.mp3"
            },
            {
              "id": "vn24-opt-ua",
              "label": "Vần ua",
              "audio": "/media/tts/vn24-q1-opt1.mp3"
            },
            {
              "id": "vn24-opt-uwa",
              "label": "Vần ưa",
              "audio": "/media/tts/vn24-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn24-opt-ia",
          "explanation": "Tiếng mía gồm âm m ghép với vần ia và dấu sắc: m - ia - mia - sắc - mía.",
          "explanationAudio": "/media/tts/vn24-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn24-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ con cua:",
        "question": {
          "type": "tap_place",
          "id": "vn24-q2-tap",
          "prompt": "Điền vần thích hợp để có từ con cua:",
          "promptAudio": "/media/tts/vn24-q2-prompt.mp3",
          "illustration": "/media/images/fish.svg",
          "targets": [
            {
              "id": "vn24-t1",
              "label": "...",
              "prefixText": "Con c",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn24-i1",
              "label": "ua",
              "audio": "/media/tts/vn24-q2-it0.mp3"
            },
            {
              "id": "vn24-i2",
              "label": "ưa",
              "audio": "/media/tts/vn24-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn24-i1": "vn24-t1"
          },
          "explanation": "Tiếng cua gồm âm c ghép với vần ua: c - ua - cua.",
          "explanationAudio": "/media/tts/vn24-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn24-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ mở rộng ở cột p",
        "question": {
          "type": "matching",
          "id": "vn24-q3-match",
          "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn24-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn24-l1",
              "label": "cây mía",
              "audio": "/media/tts/vn24-q3-l0.mp3"
            },
            {
              "id": "vn24-l2",
              "label": "con cua",
              "audio": "/media/tts/vn24-q3-l1.mp3"
            },
            {
              "id": "vn24-l3",
              "label": "quả dừa",
              "audio": "/media/tts/vn24-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn24-r1",
              "label": "mía ngọt thơm",
              "audio": "/media/tts/vn24-q3-r0.mp3"
            },
            {
              "id": "vn24-r2",
              "label": "cua bò ngang",
              "audio": "/media/tts/vn24-q3-r1.mp3"
            },
            {
              "id": "vn24-r3",
              "label": "nước dừa ngọt mát",
              "audio": "/media/tts/vn24-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn24-l1",
              "rightId": "vn24-r1"
            },
            {
              "leftId": "vn24-l2",
              "rightId": "vn24-r2"
            },
            {
              "leftId": "vn24-l3",
              "rightId": "vn24-r3"
            }
          ],
          "explanation": "Mía ngọt thơm, cua bò ngang, nước dừa ngọt mát.",
          "explanationAudio": "/media/tts/vn24-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn24-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa vần 'ưa'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn24-q4-mc",
          "prompt": "Từ nào dưới đây có chứa vần 'ưa'?",
          "promptAudio": "/media/tts/vn24-q4-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "options": [
            {
              "id": "vn24-q4-dua",
              "label": "quả dừa",
              "audio": "/media/tts/vn24-q4-opt0.mp3"
            },
            {
              "id": "vn24-q4-mia",
              "label": "cây mía",
              "audio": "/media/tts/vn24-q4-opt1.mp3"
            },
            {
              "id": "vn24-q4-cua",
              "label": "con cua",
              "audio": "/media/tts/vn24-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn24-q4-dua",
          "explanation": "Tiếng dừa có âm d ghép với vần ưa và dấu huyền.",
          "explanationAudio": "/media/tts/vn24-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn24-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ chú ngựa:",
        "question": {
          "type": "tap_place",
          "id": "vn24-q5-tap",
          "prompt": "Điền vần thích hợp vào từ chú ngựa:",
          "promptAudio": "/media/tts/vn24-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn24-t2",
              "label": "...",
              "prefixText": "Chú ng",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn24-i3",
              "label": "ựa",
              "audio": "/media/tts/vn24-q5-it0.mp3"
            },
            {
              "id": "vn24-i4",
              "label": "ụa",
              "audio": "/media/tts/vn24-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn24-i3": "vn24-t2"
          },
          "explanation": "Tiếng ngựa có vần ưa: ng - ưa - ngưa - nặng - ngựa.",
          "explanationAudio": "/media/tts/vn24-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn24-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ với hình ảnh minh họa thích hợp:",
        "question": {
          "type": "matching",
          "id": "vn24-q6-match",
          "prompt": "Nối từ với hình ảnh minh họa thích hợp:",
          "promptAudio": "/media/tts/vn24-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn24-l2-rua",
              "label": "con rùa",
              "audio": "/media/tts/vn24-q6-l0.mp3"
            },
            {
              "id": "vn24-l2-cay",
              "label": "cây dừa",
              "audio": "/media/tts/vn24-q6-l1.mp3"
            },
            {
              "id": "vn24-l2-thuyen",
              "label": "con thuyền",
              "audio": "/media/tts/vn24-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn24-r2-rua",
              "label": "chú rùa chậm chạp",
              "audio": "/media/tts/vn24-q6-r0.mp3",
              "image": "/media/images/turtle.svg"
            },
            {
              "id": "vn24-r2-cay",
              "label": "cây dừa trĩu quả",
              "audio": "/media/tts/vn24-q6-r1.mp3",
              "image": "/media/images/tree.svg"
            },
            {
              "id": "vn24-r2-thuyen",
              "label": "thuyền trôi trên sông",
              "audio": "/media/tts/vn24-q6-r2.mp3",
              "image": "/media/images/boat.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn24-l2-rua",
              "rightId": "vn24-r2-rua"
            },
            {
              "leftId": "vn24-l2-cay",
              "rightId": "vn24-r2-cay"
            },
            {
              "leftId": "vn24-l2-thuyen",
              "rightId": "vn24-r2-thuyen"
            }
          ],
          "explanation": "Con rùa có vần ua, cây dừa có vần ưa.",
          "explanationAudio": "/media/tts/vn24-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-25-van-oi-ai-oi-ui",
    "title": "Bài 25: Các vần kết thúc bằng i",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Học các vần oi, ai, ơi, ôi, ui, ưi và luyện đọc quả ổi, cái túi, gửi quà, quả bưởi, ngày hội.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn25-title-slide",
        "title": "Bài 25: Các vần kết thúc bằng i",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn phát âm âm cuối i kéo nhẹ khóe môi sang hai bên.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn25-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn25-intro-slide",
        "title": "Các vần có âm cuối I",
        "body": "Các vần oi, ai, ơi, ôi, ui, ưi kết thúc bằng âm i. Cùng đọc các từ: quả ổi, cái túi, gửi thư, bơi lội nhé!",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn25-intro.mp3",
        "bullets": [
          "oi — ổi (quả ổi giòn ngọt)",
          "ai — hai (số hai)",
          "ui — túi (chiếc túi xinh)",
          "ơi — bơi (bé tập bơi lội)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn25-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'ổi' trong 'quả ổi' có vần gì?",
        "question": {
          "type": "multiple_choice",
          "id": "vn25-q1-mc",
          "prompt": "Tiếng 'ổi' trong 'quả ổi' có vần gì?",
          "promptAudio": "/media/tts/vn25-q1-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "vn25-opt-oi",
              "label": "Vần oi",
              "audio": "/media/tts/vn25-q1-opt0.mp3"
            },
            {
              "id": "vn25-opt-ai",
              "label": "Vần ai",
              "audio": "/media/tts/vn25-q1-opt1.mp3"
            },
            {
              "id": "vn25-opt-ui",
              "label": "Vần ui",
              "audio": "/media/tts/vn25-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn25-opt-oi",
          "explanation": "Tiếng ổi có vần oi: o - i - oi - hỏi - ổi.",
          "explanationAudio": "/media/tts/vn25-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn25-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ cái túi:",
        "question": {
          "type": "tap_place",
          "id": "vn25-q2-tap",
          "prompt": "Điền vần thích hợp để có từ cái túi:",
          "promptAudio": "/media/tts/vn25-q2-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "targets": [
            {
              "id": "vn25-t1",
              "label": "...",
              "prefixText": "Cái t",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn25-i1",
              "label": "úi",
              "audio": "/media/tts/vn25-q2-it0.mp3"
            },
            {
              "id": "vn25-i2",
              "label": "ái",
              "audio": "/media/tts/vn25-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn25-i1": "vn25-t1"
          },
          "explanation": "Tiếng túi có âm t ghép với vần ui và dấu sắc.",
          "explanationAudio": "/media/tts/vn25-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn25-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ mở rộng ở cột p",
        "question": {
          "type": "matching",
          "id": "vn25-q3-match",
          "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn25-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn25-l1",
              "label": "bơi lội",
              "audio": "/media/tts/vn25-q3-l0.mp3"
            },
            {
              "id": "vn25-l2",
              "label": "gửi thư",
              "audio": "/media/tts/vn25-q3-l1.mp3"
            },
            {
              "id": "vn25-l3",
              "label": "ngày hội",
              "audio": "/media/tts/vn25-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn25-r1",
              "label": "bé tập bơi dưới nước",
              "audio": "/media/tts/vn25-q3-r0.mp3"
            },
            {
              "id": "vn25-r2",
              "label": "gửi thư cho bà",
              "audio": "/media/tts/vn25-q3-r1.mp3"
            },
            {
              "id": "vn25-r3",
              "label": "ngày hội trường em",
              "audio": "/media/tts/vn25-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn25-l1",
              "rightId": "vn25-r1"
            },
            {
              "leftId": "vn25-l2",
              "rightId": "vn25-r2"
            },
            {
              "leftId": "vn25-l3",
              "rightId": "vn25-r3"
            }
          ],
          "explanation": "Bơi lội dưới nước, gửi thư cho bà, ngày hội trường em.",
          "explanationAudio": "/media/tts/vn25-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn25-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào có chứa vần 'ai'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn25-q4-mc",
          "prompt": "Từ nào có chứa vần 'ai'?",
          "promptAudio": "/media/tts/vn25-q4-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "options": [
            {
              "id": "vn25-q4-hoa",
              "label": "hoa mai",
              "audio": "/media/tts/vn25-q4-opt0.mp3"
            },
            {
              "id": "vn25-q4-tui",
              "label": "cái túi",
              "audio": "/media/tts/vn25-q4-opt1.mp3"
            },
            {
              "id": "vn25-q4-boi",
              "label": "bơi lội",
              "audio": "/media/tts/vn25-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn25-q4-hoa",
          "explanation": "Hoa mai có tiếng mai mang vần ai.",
          "explanationAudio": "/media/tts/vn25-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn25-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ gửi thư:",
        "question": {
          "type": "tap_place",
          "id": "vn25-q5-tap",
          "prompt": "Điền vần thích hợp vào từ gửi thư:",
          "promptAudio": "/media/tts/vn25-q5-prompt.mp3",
          "illustration": "/media/images/book.svg",
          "targets": [
            {
              "id": "vn25-t2",
              "label": "...",
              "prefixText": "G",
              "suffixText": " thư"
            }
          ],
          "items": [
            {
              "id": "vn25-i3",
              "label": "ửi",
              "audio": "/media/tts/vn25-q5-it0.mp3"
            },
            {
              "id": "vn25-i4",
              "label": "ỏi",
              "audio": "/media/tts/vn25-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn25-i3": "vn25-t2"
          },
          "explanation": "Tiếng gửi có vần ưi: g - ưi - gưi - hỏi - gửi.",
          "explanationAudio": "/media/tts/vn25-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn25-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối vần ở cột trái với từ chứa vần đó ở ",
        "question": {
          "type": "matching",
          "id": "vn25-q6-match",
          "prompt": "Nối vần ở cột trái với từ chứa vần đó ở cột phải:",
          "promptAudio": "/media/tts/vn25-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn25-l2-oi",
              "label": "vần ơi",
              "audio": "/media/tts/vn25-q6-l0.mp3"
            },
            {
              "id": "vn25-l2-ui",
              "label": "vần ui",
              "audio": "/media/tts/vn25-q6-l1.mp3"
            },
            {
              "id": "vn25-l2-ai",
              "label": "vần ai",
              "audio": "/media/tts/vn25-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn25-r2-oi",
              "label": "bơi lội",
              "audio": "/media/tts/vn25-q6-r0.mp3"
            },
            {
              "id": "vn25-r2-ui",
              "label": "túi xách",
              "audio": "/media/tts/vn25-q6-r1.mp3"
            },
            {
              "id": "vn25-r2-ai",
              "label": "hoa mai",
              "audio": "/media/tts/vn25-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn25-l2-oi",
              "rightId": "vn25-r2-oi"
            },
            {
              "leftId": "vn25-l2-ui",
              "rightId": "vn25-r2-ui"
            },
            {
              "leftId": "vn25-l2-ai",
              "rightId": "vn25-r2-ai"
            }
          ],
          "explanation": "Bơi lội có vần ơi, túi xách có vần ui, hoa mai có vần ai.",
          "explanationAudio": "/media/tts/vn25-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-26-van-ao-eo-au-au",
    "title": "Bài 26: Các vần kết thúc bằng o, u",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Học các vần ao, eo, au, âu và luyện đọc ngôi sao, chú mèo, cây cau, quả dâu tây.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn26-title-slide",
        "title": "Bài 26: Các vần kết thúc bằng o, u",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn tròn môi khi phát âm các vần có âm cuối là o hoặc u.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn26-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn26-intro-slide",
        "title": "Các vần AO, EO, AU, ÂU",
        "body": "Các vần ao, eo, au, âu giúp chúng mình đọc được nhiều từ đẹp: ngôi sao, chú mèo con, cây cau, con bồ câu.",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn26-intro.mp3",
        "bullets": [
          "ao — sao (ngôi sao năm cánh)",
          "eo — mèo (chú mèo mướp)",
          "au — cau (cây cau cao vút)",
          "âu — câu (con chim bồ câu)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn26-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'sao' trong 'ngôi sao' có vần gì?",
        "question": {
          "type": "multiple_choice",
          "id": "vn26-q1-mc",
          "prompt": "Tiếng 'sao' trong 'ngôi sao' có vần gì?",
          "promptAudio": "/media/tts/vn26-q1-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "options": [
            {
              "id": "vn26-opt-ao",
              "label": "Vần ao",
              "audio": "/media/tts/vn26-q1-opt0.mp3"
            },
            {
              "id": "vn26-opt-eo",
              "label": "Vần eo",
              "audio": "/media/tts/vn26-q1-opt1.mp3"
            },
            {
              "id": "vn26-opt-au",
              "label": "Vần au",
              "audio": "/media/tts/vn26-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn26-opt-ao",
          "explanation": "Tiếng sao có âm s ghép với vần ao: s - ao - sao.",
          "explanationAudio": "/media/tts/vn26-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn26-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ chú mèo:",
        "question": {
          "type": "tap_place",
          "id": "vn26-q2-tap",
          "prompt": "Điền vần thích hợp để có từ chú mèo:",
          "promptAudio": "/media/tts/vn26-q2-prompt.mp3",
          "illustration": "/media/images/cat.svg",
          "targets": [
            {
              "id": "vn26-t1",
              "label": "...",
              "prefixText": "Chú m",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn26-i1",
              "label": "èo",
              "audio": "/media/tts/vn26-q2-it0.mp3"
            },
            {
              "id": "vn26-i2",
              "label": "ào",
              "audio": "/media/tts/vn26-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn26-i1": "vn26-t1"
          },
          "explanation": "Tiếng mèo có âm m ghép với vần eo và dấu huyền.",
          "explanationAudio": "/media/tts/vn26-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn26-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ mở rộng ở cột p",
        "question": {
          "type": "matching",
          "id": "vn26-q3-match",
          "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn26-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn26-l1",
              "label": "ngôi sao",
              "audio": "/media/tts/vn26-q3-l0.mp3"
            },
            {
              "id": "vn26-l2",
              "label": "chú mèo",
              "audio": "/media/tts/vn26-q3-l1.mp3"
            },
            {
              "id": "vn26-l3",
              "label": "bồ câu",
              "audio": "/media/tts/vn26-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn26-r1",
              "label": "ngôi sao lấp lánh",
              "audio": "/media/tts/vn26-q3-r0.mp3"
            },
            {
              "id": "vn26-r2",
              "label": "mèo con bắt chuột",
              "audio": "/media/tts/vn26-q3-r1.mp3"
            },
            {
              "id": "vn26-r3",
              "label": "chim bồ câu trắng",
              "audio": "/media/tts/vn26-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn26-l1",
              "rightId": "vn26-r1"
            },
            {
              "leftId": "vn26-l2",
              "rightId": "vn26-r2"
            },
            {
              "leftId": "vn26-l3",
              "rightId": "vn26-r3"
            }
          ],
          "explanation": "Ngôi sao lấp lánh, mèo con bắt chuột, chim bồ câu trắng.",
          "explanationAudio": "/media/tts/vn26-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn26-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa vần 'âu'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn26-q4-mc",
          "prompt": "Từ nào dưới đây có chứa vần 'âu'?",
          "promptAudio": "/media/tts/vn26-q4-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn26-q4-bocau",
              "label": "chim bồ câu",
              "audio": "/media/tts/vn26-q4-opt0.mp3"
            },
            {
              "id": "vn26-q4-ngoisao",
              "label": "ngôi sao",
              "audio": "/media/tts/vn26-q4-opt1.mp3"
            },
            {
              "id": "vn26-q4-chumeo",
              "label": "chú mèo",
              "audio": "/media/tts/vn26-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn26-q4-bocau",
          "explanation": "Tiếng câu trong bồ câu có chứa vần âu: c - âu - câu.",
          "explanationAudio": "/media/tts/vn26-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn26-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ cây cau:",
        "question": {
          "type": "tap_place",
          "id": "vn26-q5-tap",
          "prompt": "Điền vần thích hợp vào từ cây cau:",
          "promptAudio": "/media/tts/vn26-q5-prompt.mp3",
          "illustration": "/media/images/tree.svg",
          "targets": [
            {
              "id": "vn26-t2",
              "label": "...",
              "prefixText": "Cây c",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn26-i3",
              "label": "au",
              "audio": "/media/tts/vn26-q5-it0.mp3"
            },
            {
              "id": "vn26-i4",
              "label": "âu",
              "audio": "/media/tts/vn26-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn26-i3": "vn26-t2"
          },
          "explanation": "Tiếng cau có vần au: c - au - cau.",
          "explanationAudio": "/media/tts/vn26-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn26-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ với hình minh họa thích hợp:",
        "question": {
          "type": "matching",
          "id": "vn26-q6-match",
          "prompt": "Nối từ với hình minh họa thích hợp:",
          "promptAudio": "/media/tts/vn26-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn26-l2-sao",
              "label": "ngôi sao",
              "audio": "/media/tts/vn26-q6-l0.mp3"
            },
            {
              "id": "vn26-l2-meo",
              "label": "con mèo",
              "audio": "/media/tts/vn26-q6-l1.mp3"
            },
            {
              "id": "vn26-l2-chim",
              "label": "con chim",
              "audio": "/media/tts/vn26-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn26-r2-sao",
              "label": "ngôi sao vàng",
              "audio": "/media/tts/vn26-q6-r0.mp3",
              "image": "/media/images/star.svg"
            },
            {
              "id": "vn26-r2-meo",
              "label": "chú mèo con",
              "audio": "/media/tts/vn26-q6-r1.mp3",
              "image": "/media/images/cat.svg"
            },
            {
              "id": "vn26-r2-chim",
              "label": "chú chim sẻ",
              "audio": "/media/tts/vn26-q6-r2.mp3",
              "image": "/media/images/bird.svg"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn26-l2-sao",
              "rightId": "vn26-r2-sao"
            },
            {
              "leftId": "vn26-l2-meo",
              "rightId": "vn26-r2-meo"
            },
            {
              "leftId": "vn26-l2-chim",
              "rightId": "vn26-r2-chim"
            }
          ],
          "explanation": "Ngôi sao vàng, chú mèo con, chú chim sẻ.",
          "explanationAudio": "/media/tts/vn26-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-27-van-iu-uu",
    "title": "Bài 27: Các vần iu, ưu",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Làm quen với vần iu và ưu, luyện đọc các từ chim hót líu lo, chú cừu non, quả lựu đỏ qua 6 câu hỏi tương tác.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn27-title-slide",
        "title": "Bài 27: Các vần iu, ưu",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn khẩu hình chuyển từ i/ư sang u tròn môi.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn27-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn27-intro-slide",
        "title": "Các vần IU và ƯU",
        "body": "Vần iu và ưu xuất hiện trong những tiếng rất vui tai: chim hót líu lo, chú cừu non, quả lựu chín đỏ.",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn27-intro.mp3",
        "bullets": [
          "iu — líu lo (chim hót líu lo)",
          "ưu — cừu (chú cừu lông trắng)",
          "ưu — lựu (quả lựu đỏ au)"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn27-slide-q1",
        "teacherNote": "Câu hỏi 1: Tiếng 'líu' trong 'líu lo' có chứa vần g",
        "question": {
          "type": "multiple_choice",
          "id": "vn27-q1-mc",
          "prompt": "Tiếng 'líu' trong 'líu lo' có chứa vần gì?",
          "promptAudio": "/media/tts/vn27-q1-prompt.mp3",
          "illustration": "/media/images/bird.svg",
          "options": [
            {
              "id": "vn27-opt-iu",
              "label": "Vần iu",
              "audio": "/media/tts/vn27-q1-opt0.mp3"
            },
            {
              "id": "vn27-opt-uu",
              "label": "Vần ưu",
              "audio": "/media/tts/vn27-q1-opt1.mp3"
            },
            {
              "id": "vn27-opt-ui",
              "label": "Vần ui",
              "audio": "/media/tts/vn27-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn27-opt-iu",
          "explanation": "Tiếng líu gồm âm l ghép với vần iu và dấu sắc: l - iu - liu - sắc - líu.",
          "explanationAudio": "/media/tts/vn27-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn27-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền vần thích hợp để có từ chú cừu:",
        "question": {
          "type": "tap_place",
          "id": "vn27-q2-tap",
          "prompt": "Điền vần thích hợp để có từ chú cừu:",
          "promptAudio": "/media/tts/vn27-q2-prompt.mp3",
          "illustration": "/media/images/rabbit.svg",
          "targets": [
            {
              "id": "vn27-t1",
              "label": "...",
              "prefixText": "Chú c",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn27-i1",
              "label": "ừu",
              "audio": "/media/tts/vn27-q2-it0.mp3"
            },
            {
              "id": "vn27-i2",
              "label": "ìu",
              "audio": "/media/tts/vn27-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn27-i1": "vn27-t1"
          },
          "explanation": "Tiếng cừu có vần ưu: c - ưu - cưu - huyền - cừu.",
          "explanationAudio": "/media/tts/vn27-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn27-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối từ ở cột trái với từ mở rộng ở cột p",
        "question": {
          "type": "matching",
          "id": "vn27-q3-match",
          "prompt": "Nối từ ở cột trái với từ mở rộng ở cột phải:",
          "promptAudio": "/media/tts/vn27-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn27-l1",
              "label": "chim hót",
              "audio": "/media/tts/vn27-q3-l0.mp3"
            },
            {
              "id": "vn27-l2",
              "label": "chú cừu",
              "audio": "/media/tts/vn27-q3-l1.mp3"
            },
            {
              "id": "vn27-l3",
              "label": "quả lựu",
              "audio": "/media/tts/vn27-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn27-r1",
              "label": "líu lo trên cành",
              "audio": "/media/tts/vn27-q3-r0.mp3"
            },
            {
              "id": "vn27-r2",
              "label": "bộ lông trắng tinh",
              "audio": "/media/tts/vn27-q3-r1.mp3"
            },
            {
              "id": "vn27-r3",
              "label": "hạt lựu đỏ tươi",
              "audio": "/media/tts/vn27-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn27-l1",
              "rightId": "vn27-r1"
            },
            {
              "leftId": "vn27-l2",
              "rightId": "vn27-r2"
            },
            {
              "leftId": "vn27-l3",
              "rightId": "vn27-r3"
            }
          ],
          "explanation": "Chim hót líu lo, chú cừu lông trắng, quả lựu hạt đỏ.",
          "explanationAudio": "/media/tts/vn27-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn27-slide-q4",
        "teacherNote": "Câu hỏi 4: Từ nào dưới đây có chứa vần 'ưu'?",
        "question": {
          "type": "multiple_choice",
          "id": "vn27-q4-mc",
          "prompt": "Từ nào dưới đây có chứa vần 'ưu'?",
          "promptAudio": "/media/tts/vn27-q4-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "options": [
            {
              "id": "vn27-q4-luu",
              "label": "quả lựu",
              "audio": "/media/tts/vn27-q4-opt0.mp3"
            },
            {
              "id": "vn27-q4-liu",
              "label": "líu lo",
              "audio": "/media/tts/vn27-q4-opt1.mp3"
            },
            {
              "id": "vn27-q4-chum",
              "label": "chùm nho",
              "audio": "/media/tts/vn27-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn27-q4-luu",
          "explanation": "Tiếng lựu có âm l ghép với vần ưu và dấu nặng.",
          "explanationAudio": "/media/tts/vn27-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn27-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền vần thích hợp vào từ quả lựu:",
        "question": {
          "type": "tap_place",
          "id": "vn27-q5-tap",
          "prompt": "Điền vần thích hợp vào từ quả lựu:",
          "promptAudio": "/media/tts/vn27-q5-prompt.mp3",
          "illustration": "/media/images/apple.svg",
          "targets": [
            {
              "id": "vn27-t2",
              "label": "...",
              "prefixText": "Quả l",
              "suffixText": ""
            }
          ],
          "items": [
            {
              "id": "vn27-i3",
              "label": "ựu",
              "audio": "/media/tts/vn27-q5-it0.mp3"
            },
            {
              "id": "vn27-i4",
              "label": "ịu",
              "audio": "/media/tts/vn27-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn27-i3": "vn27-t2"
          },
          "explanation": "Tiếng lựu mang vần ưu.",
          "explanationAudio": "/media/tts/vn27-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn27-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối vần ở cột trái với từ chứa vần đó ở ",
        "question": {
          "type": "matching",
          "id": "vn27-q6-match",
          "prompt": "Nối vần ở cột trái với từ chứa vần đó ở cột phải:",
          "promptAudio": "/media/tts/vn27-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn27-l2-iu",
              "label": "vần iu",
              "audio": "/media/tts/vn27-q6-l0.mp3"
            },
            {
              "id": "vn27-l2-uu1",
              "label": "vần ưu",
              "audio": "/media/tts/vn27-q6-l1.mp3"
            },
            {
              "id": "vn27-l2-uu2",
              "label": "vần ưu",
              "audio": "/media/tts/vn27-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn27-r2-iu",
              "label": "líu lo",
              "audio": "/media/tts/vn27-q6-r0.mp3"
            },
            {
              "id": "vn27-r2-uu1",
              "label": "chú cừu",
              "audio": "/media/tts/vn27-q6-r1.mp3"
            },
            {
              "id": "vn27-r2-uu2",
              "label": "quả lựu",
              "audio": "/media/tts/vn27-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn27-l2-iu",
              "rightId": "vn27-r2-iu"
            },
            {
              "leftId": "vn27-l2-uu1",
              "rightId": "vn27-r2-uu1"
            },
            {
              "leftId": "vn27-l2-uu2",
              "rightId": "vn27-r2-uu2"
            }
          ],
          "explanation": "Bé nối rất chính xác! Líu lo có vần iu, chú cừu và quả lựu có vần ưu.",
          "explanationAudio": "/media/tts/vn27-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-28-doc-hieu-ong-ba-cha-me",
    "title": "Bài 28: Đọc hiểu: Kính yêu ông bà, cha mẹ",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Luyện đọc đoạn văn ngắn về tình cảm gia đình, trả lời câu hỏi và bồi dưỡng lòng hiếu thảo.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn28-title-slide",
        "title": "Bài 28: Đọc hiểu: Kính yêu ông bà, cha mẹ",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn đọc diễn cảm, ngắt nghỉ đúng dấu câu.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn28-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn28-intro-slide",
        "title": "Gia đình mến thương",
        "body": "Đoạn văn: 'Bé Lan rất yêu bà. Mỗi khi đi học về, Lan lễ phép chào bà, rồi rót nước mời bà uống. Bà âu yếm xoa đầu khen Lan ngoan.'",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn28-intro.mp3",
        "bullets": [
          "Lan lễ phép chào bà khi đi học về",
          "Lan rót nước mời bà uống",
          "Bà khen Lan là cô bé hiếu thảo"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn28-slide-q1",
        "teacherNote": "Câu hỏi 1: Khi đi học về, bạn Lan đã làm gì đầu tiê",
        "question": {
          "type": "multiple_choice",
          "id": "vn28-q1-mc",
          "prompt": "Khi đi học về, bạn Lan đã làm gì đầu tiên?",
          "promptAudio": "/media/tts/vn28-q1-prompt.mp3",
          "illustration": "/media/images/house.svg",
          "options": [
            {
              "id": "vn28-opt-chao",
              "label": "Lễ phép chào bà",
              "audio": "/media/tts/vn28-q1-opt0.mp3"
            },
            {
              "id": "vn28-opt-xemti",
              "label": "Bật ti vi xem hoạt hình",
              "audio": "/media/tts/vn28-q1-opt1.mp3"
            },
            {
              "id": "vn28-opt-di-choi",
              "label": "Chạy đi chơi ngay",
              "audio": "/media/tts/vn28-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn28-opt-chao",
          "explanation": "Lan là bé ngoan, vừa về nhà đã lễ phép chào bà.",
          "explanationAudio": "/media/tts/vn28-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn28-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền từ thích hợp: Lan rót ... mời bà uố",
        "question": {
          "type": "tap_place",
          "id": "vn28-q2-tap",
          "prompt": "Điền từ thích hợp: Lan rót ... mời bà uống.",
          "promptAudio": "/media/tts/vn28-q2-prompt.mp3",
          "illustration": "/media/images/milk.svg",
          "targets": [
            {
              "id": "vn28-t1",
              "label": "...",
              "prefixText": "Lan rót ",
              "suffixText": " mời bà uống."
            }
          ],
          "items": [
            {
              "id": "vn28-i1",
              "label": "nước",
              "audio": "/media/tts/vn28-q2-it0.mp3"
            },
            {
              "id": "vn28-i2",
              "label": "sữa",
              "audio": "/media/tts/vn28-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn28-i1": "vn28-t1"
          },
          "explanation": "Lan rót nước mời bà uống mát lòng.",
          "explanationAudio": "/media/tts/vn28-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn28-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối hành động ở cột trái với ý nghĩa tốt",
        "question": {
          "type": "matching",
          "id": "vn28-q3-match",
          "prompt": "Nối hành động ở cột trái với ý nghĩa tốt đẹp ở cột phải:",
          "promptAudio": "/media/tts/vn28-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn28-l1",
              "label": "Chào hỏi lễ phép",
              "audio": "/media/tts/vn28-q3-l0.mp3"
            },
            {
              "id": "vn28-l2",
              "label": "Giúp mẹ quét nhà",
              "audio": "/media/tts/vn28-q3-l1.mp3"
            },
            {
              "id": "vn28-l3",
              "label": "Vâng lời thầy cô",
              "audio": "/media/tts/vn28-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn28-r1",
              "label": "kính trọng người lớn",
              "audio": "/media/tts/vn28-q3-r0.mp3"
            },
            {
              "id": "vn28-r2",
              "label": "chăm chỉ, đỡ đần cha mẹ",
              "audio": "/media/tts/vn28-q3-r1.mp3"
            },
            {
              "id": "vn28-r3",
              "label": "học sinh chăm ngoan",
              "audio": "/media/tts/vn28-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn28-l1",
              "rightId": "vn28-r1"
            },
            {
              "leftId": "vn28-l2",
              "rightId": "vn28-r2"
            },
            {
              "leftId": "vn28-l3",
              "rightId": "vn28-r3"
            }
          ],
          "explanation": "Chào hỏi lễ phép, giúp mẹ quét nhà, vâng lời thầy cô.",
          "explanationAudio": "/media/tts/vn28-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn28-slide-q4",
        "teacherNote": "Câu hỏi 4: Thấy Lan ngoan ngoãn, bà đã làm gì?",
        "question": {
          "type": "multiple_choice",
          "id": "vn28-q4-mc",
          "prompt": "Thấy Lan ngoan ngoãn, bà đã làm gì?",
          "promptAudio": "/media/tts/vn28-q4-prompt.mp3",
          "illustration": "/media/images/house.svg",
          "options": [
            {
              "id": "vn28-q4-xoadau",
              "label": "Âu yếm xoa đầu khen Lan",
              "audio": "/media/tts/vn28-q4-opt0.mp3"
            },
            {
              "id": "vn28-q4-trach",
              "label": "Trách phạt Lan",
              "audio": "/media/tts/vn28-q4-opt1.mp3"
            },
            {
              "id": "vn28-q4-khong",
              "label": "Không nói gì cả",
              "audio": "/media/tts/vn28-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn28-q4-xoadau",
          "explanation": "Bà rất vui và âu yếm xoa đầu khen Lan ngoan.",
          "explanationAudio": "/media/tts/vn28-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn28-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền từ thích hợp vào câu ca dao: 'Công ",
        "question": {
          "type": "tap_place",
          "id": "vn28-q5-tap",
          "prompt": "Điền từ thích hợp vào câu ca dao: 'Công cha như núi Thái Sơn, ... mẹ như nước trong nguồn chảy ra.'",
          "promptAudio": "/media/tts/vn28-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn28-t2",
              "label": "...",
              "prefixText": "",
              "suffixText": " mẹ như nước trong nguồn."
            }
          ],
          "items": [
            {
              "id": "vn28-i3",
              "label": "Nghĩa",
              "audio": "/media/tts/vn28-q5-it0.mp3"
            },
            {
              "id": "vn28-i4",
              "label": "Tình",
              "audio": "/media/tts/vn28-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn28-i3": "vn28-t2"
          },
          "explanation": "Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra.",
          "explanationAudio": "/media/tts/vn28-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn28-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ ở cột trái với từ ở cột phải tạo ",
        "question": {
          "type": "matching",
          "id": "vn28-q6-match",
          "prompt": "Nối từ ở cột trái với từ ở cột phải tạo từ chỉ tình cảm:",
          "promptAudio": "/media/tts/vn28-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn28-l2-yeu",
              "label": "yêu",
              "audio": "/media/tts/vn28-q6-l0.mp3"
            },
            {
              "id": "vn28-l2-hieu",
              "label": "hiếu",
              "audio": "/media/tts/vn28-q6-l1.mp3"
            },
            {
              "id": "vn28-l2-biet",
              "label": "biết",
              "audio": "/media/tts/vn28-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn28-r2-quy",
              "label": "quý",
              "audio": "/media/tts/vn28-q6-r0.mp3"
            },
            {
              "id": "vn28-r2-thao",
              "label": "thảo",
              "audio": "/media/tts/vn28-q6-r1.mp3"
            },
            {
              "id": "vn28-r2-on",
              "label": "ơn",
              "audio": "/media/tts/vn28-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn28-l2-yeu",
              "rightId": "vn28-r2-quy"
            },
            {
              "leftId": "vn28-l2-hieu",
              "rightId": "vn28-r2-thao"
            },
            {
              "leftId": "vn28-l2-biet",
              "rightId": "vn28-r2-on"
            }
          ],
          "explanation": "Yêu quý, hiếu thảo, biết ơn.",
          "explanationAudio": "/media/tts/vn28-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-29-doc-hieu-truong-lop-ban-be",
    "title": "Bài 29: Đọc hiểu: Trường lớp xanh sạch",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Đọc hiểu đoạn văn về giờ ra chơi, giữ gìn vệ sinh lớp học và tình bạn đoàn kết, giúp đỡ nhau.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn29-title-slide",
        "title": "Bài 29: Đọc hiểu: Trường lớp xanh sạch",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Rèn ý thức bảo vệ môi trường học đường và tinh thần đoàn kết.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn29-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn29-intro-slide",
        "title": "Mái trường mến yêu",
        "body": "Đoạn văn: 'Giờ ra chơi, sân trường rộn rã tiếng cười. Các bạn cùng nhau tưới hoa và nhặt rác bỏ vào thùng. Lớp học luôn sạch đẹp, ngăn nắp.'",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn29-intro.mp3",
        "bullets": [
          "Sân trường vui tươi trong giờ ra chơi",
          "Cùng nhau tưới hoa và giữ vệ sinh",
          "Trường học thân thiện, học sinh tích cực"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn29-slide-q1",
        "teacherNote": "Câu hỏi 1: Trong giờ ra chơi, các bạn học sinh đã c",
        "question": {
          "type": "multiple_choice",
          "id": "vn29-q1-mc",
          "prompt": "Trong giờ ra chơi, các bạn học sinh đã cùng nhau làm gì?",
          "promptAudio": "/media/tts/vn29-q1-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn29-opt-tuoihoa",
              "label": "Tưới hoa và nhặt rác",
              "audio": "/media/tts/vn29-q1-opt0.mp3"
            },
            {
              "id": "vn29-opt-vutrac",
              "label": "Vứt rác bừa bãi",
              "audio": "/media/tts/vn29-q1-opt1.mp3"
            },
            {
              "id": "vn29-opt-behoa",
              "label": "Bẻ cành hái hoa",
              "audio": "/media/tts/vn29-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn29-opt-tuoihoa",
          "explanation": "Các bạn cùng nhau tưới hoa và nhặt rác bỏ vào thùng.",
          "explanationAudio": "/media/tts/vn29-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn29-slide-q2",
        "teacherNote": "Câu hỏi 2: Điền từ thích hợp: Giữ gìn trường lớp xa",
        "question": {
          "type": "tap_place",
          "id": "vn29-q2-tap",
          "prompt": "Điền từ thích hợp: Giữ gìn trường lớp xanh, sạch, ...",
          "promptAudio": "/media/tts/vn29-q2-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn29-t1",
              "label": "...",
              "prefixText": "Giữ gìn trường lớp xanh, sạch, ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn29-i1",
              "label": "đẹp",
              "audio": "/media/tts/vn29-q2-it0.mp3"
            },
            {
              "id": "vn29-i2",
              "label": "xấu",
              "audio": "/media/tts/vn29-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn29-i1": "vn29-t1"
          },
          "explanation": "Khẩu hiệu trường học thân thiện: Xanh - Sạch - Đẹp.",
          "explanationAudio": "/media/tts/vn29-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn29-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối hành động ở cột trái với kết quả tíc",
        "question": {
          "type": "matching",
          "id": "vn29-q3-match",
          "prompt": "Nối hành động ở cột trái với kết quả tích cực ở cột phải:",
          "promptAudio": "/media/tts/vn29-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn29-l1",
              "label": "Tưới nước cho cây",
              "audio": "/media/tts/vn29-q3-l0.mp3"
            },
            {
              "id": "vn29-l2",
              "label": "Bỏ rác vào thùng",
              "audio": "/media/tts/vn29-q3-l1.mp3"
            },
            {
              "id": "vn29-l3",
              "label": "Kê bàn ghế ngay ngắn",
              "audio": "/media/tts/vn29-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn29-r1",
              "label": "cây xanh tươi tốt",
              "audio": "/media/tts/vn29-q3-r0.mp3"
            },
            {
              "id": "vn29-r2",
              "label": "sân trường sạch sẽ",
              "audio": "/media/tts/vn29-q3-r1.mp3"
            },
            {
              "id": "vn29-r3",
              "label": "lớp học gọn gàng",
              "audio": "/media/tts/vn29-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn29-l1",
              "rightId": "vn29-r1"
            },
            {
              "leftId": "vn29-l2",
              "rightId": "vn29-r2"
            },
            {
              "leftId": "vn29-l3",
              "rightId": "vn29-r3"
            }
          ],
          "explanation": "Cây tươi tốt, sân trường sạch sẽ, lớp học gọn gàng.",
          "explanationAudio": "/media/tts/vn29-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn29-slide-q4",
        "teacherNote": "Câu hỏi 4: Khi thấy bạn làm rơi hộp bút, em nên làm",
        "question": {
          "type": "multiple_choice",
          "id": "vn29-q4-mc",
          "prompt": "Khi thấy bạn làm rơi hộp bút, em nên làm gì?",
          "promptAudio": "/media/tts/vn29-q4-prompt.mp3",
          "illustration": "/media/images/pencil.svg",
          "options": [
            {
              "id": "vn29-q4-giup",
              "label": "Nhặt lên giúp bạn",
              "audio": "/media/tts/vn29-q4-opt0.mp3"
            },
            {
              "id": "vn29-q4-che",
              "label": "Cười chê bạn",
              "audio": "/media/tts/vn29-q4-opt1.mp3"
            },
            {
              "id": "vn29-q4-lo",
              "label": "Bỏ đi không quan tâm",
              "audio": "/media/tts/vn29-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn29-q4-giup",
          "explanation": "Bạn bè tốt luôn sẵn lòng giúp đỡ lẫn nhau.",
          "explanationAudio": "/media/tts/vn29-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn29-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền từ thích hợp: Mỗi ngày đến trường l",
        "question": {
          "type": "tap_place",
          "id": "vn29-q5-tap",
          "prompt": "Điền từ thích hợp: Mỗi ngày đến trường là một ngày ...",
          "promptAudio": "/media/tts/vn29-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn29-t2",
              "label": "...",
              "prefixText": "Mỗi ngày đến trường là một ngày ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn29-i3",
              "label": "vui",
              "audio": "/media/tts/vn29-q5-it0.mp3"
            },
            {
              "id": "vn29-i4",
              "label": "buồn",
              "audio": "/media/tts/vn29-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn29-i3": "vn29-t2"
          },
          "explanation": "Mỗi ngày đến trường là một ngày vui.",
          "explanationAudio": "/media/tts/vn29-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn29-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối từ ở cột trái với từ ở cột phải tạo ",
        "question": {
          "type": "matching",
          "id": "vn29-q6-match",
          "prompt": "Nối từ ở cột trái với từ ở cột phải tạo từ ghép về trường học:",
          "promptAudio": "/media/tts/vn29-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn29-l2-truong",
              "label": "trường",
              "audio": "/media/tts/vn29-q6-l0.mp3"
            },
            {
              "id": "vn29-l2-ban",
              "label": "bạn",
              "audio": "/media/tts/vn29-q6-l1.mp3"
            },
            {
              "id": "vn29-l2-thay",
              "label": "thầy",
              "audio": "/media/tts/vn29-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn29-r2-lop",
              "label": "lớp",
              "audio": "/media/tts/vn29-q6-r0.mp3"
            },
            {
              "id": "vn29-r2-be",
              "label": "bè",
              "audio": "/media/tts/vn29-q6-r1.mp3"
            },
            {
              "id": "vn29-r2-co",
              "label": "cô",
              "audio": "/media/tts/vn29-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn29-l2-truong",
              "rightId": "vn29-r2-lop"
            },
            {
              "leftId": "vn29-l2-ban",
              "rightId": "vn29-r2-be"
            },
            {
              "leftId": "vn29-l2-thay",
              "rightId": "vn29-r2-co"
            }
          ],
          "explanation": "Trường lớp, bạn bè, thầy cô.",
          "explanationAudio": "/media/tts/vn29-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  },
  {
    "status": "publish",
    "mode": "publish",
    "id": "vn-30-dau-truong-trang-nguyen-vn",
    "title": "Bài 30: Đấu trường Trạng nguyên Tiếng Việt",
    "subject": "vietnamese",
    "grade": 1,
    "description": "Tổng kết năm học: Đố vui ghép vần nhanh, kiểm tra chính tả, đọc hiểu và vinh danh Trạng nguyên Lớp 1.",
    "totalDurationMinutes": 25,
    "slides": [
      {
        "type": "title-slide",
        "id": "vn30-title-slide",
        "title": "Bài 30: Đấu trường Trạng nguyên Tiếng Việt",
        "subtitle": "Tiếng Việt Lớp 1 — Bài học tương tác",
        "teacherNote": "Tổ chức trò chơi thi đua sôi nổi, trao huy hiệu khen thưởng.",
        "backgroundImage": "/media/images/star.svg",
        "audio": "/media/tts/vn30-title.mp3"
      },
      {
        "type": "content-slide",
        "id": "vn30-intro-slide",
        "title": "Đấu trường Trạng nguyên Nhí",
        "body": "Chào mừng các sĩ tử nhí đến với Đấu trường Trạng nguyên Tiếng Việt Lớp 1! Cùng nhau chinh phục các câu đố vần và chính tả để giành vòng nguyệt quế nhé!",
        "teacherNote": "Hướng dẫn học sinh đọc to rõ ràng từng từ ngữ.",
        "illustration": "/media/images/book.svg",
        "audio": "/media/tts/vn30-intro.mp3",
        "bullets": [
          "Đọc thông viết thạo âm vần tiếng Việt",
          "Hiểu đúng nghĩa câu văn và đoạn văn",
          "Giành danh hiệu Trạng nguyên Lớp 1"
        ]
      },
      {
        "type": "question-slide",
        "id": "vn30-slide-q1",
        "teacherNote": "Câu hỏi 1: Từ nào dưới đây viết ĐÚNG chính tả?",
        "question": {
          "type": "multiple_choice",
          "id": "vn30-q1-mc",
          "prompt": "Từ nào dưới đây viết ĐÚNG chính tả?",
          "promptAudio": "/media/tts/vn30-q1-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "options": [
            {
              "id": "vn30-opt-dung",
              "label": "nón lá",
              "audio": "/media/tts/vn30-q1-opt0.mp3"
            },
            {
              "id": "vn30-opt-sai1",
              "label": "lón lá",
              "audio": "/media/tts/vn30-q1-opt1.mp3"
            },
            {
              "id": "vn30-opt-sai2",
              "label": "nón ná",
              "audio": "/media/tts/vn30-q1-opt2.mp3"
            }
          ],
          "correctOptionId": "vn30-opt-dung",
          "explanation": "Nón lá viết đúng: nón bắt đầu bằng n, lá bắt đầu bằng l.",
          "explanationAudio": "/media/tts/vn30-q1-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn30-slide-q2",
        "teacherNote": "Câu hỏi 2: Sắp xếp từ để tạo câu hoàn chỉnh: Em yêu",
        "question": {
          "type": "tap_place",
          "id": "vn30-q2-tap",
          "prompt": "Sắp xếp từ để tạo câu hoàn chỉnh: Em yêu trường em.",
          "promptAudio": "/media/tts/vn30-q2-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "targets": [
            {
              "id": "vn30-t1",
              "label": "...",
              "prefixText": "Em yêu ",
              "suffixText": "."
            }
          ],
          "items": [
            {
              "id": "vn30-i1",
              "label": "trường em",
              "audio": "/media/tts/vn30-q2-it0.mp3"
            },
            {
              "id": "vn30-i2",
              "label": "lớp em",
              "audio": "/media/tts/vn30-q2-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn30-i1": "vn30-t1"
          },
          "explanation": "Câu hoàn chỉnh: Em yêu trường em.",
          "explanationAudio": "/media/tts/vn30-q2-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn30-slide-q3",
        "teacherNote": "Câu hỏi 3: Nối hai vế để tạo thành câu tục ngữ, ca ",
        "question": {
          "type": "matching",
          "id": "vn30-q3-match",
          "prompt": "Nối hai vế để tạo thành câu tục ngữ, ca dao đúng:",
          "promptAudio": "/media/tts/vn30-q3-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn30-l1",
              "label": "Ăn quả",
              "audio": "/media/tts/vn30-q3-l0.mp3"
            },
            {
              "id": "vn30-l2",
              "label": "Uống nước",
              "audio": "/media/tts/vn30-q3-l1.mp3"
            },
            {
              "id": "vn30-l3",
              "label": "Học thầy",
              "audio": "/media/tts/vn30-q3-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn30-r1",
              "label": "nhớ kẻ trồng cây",
              "audio": "/media/tts/vn30-q3-r0.mp3"
            },
            {
              "id": "vn30-r2",
              "label": "nhớ nguồn",
              "audio": "/media/tts/vn30-q3-r1.mp3"
            },
            {
              "id": "vn30-r3",
              "label": "không tày học bạn",
              "audio": "/media/tts/vn30-q3-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn30-l1",
              "rightId": "vn30-r1"
            },
            {
              "leftId": "vn30-l2",
              "rightId": "vn30-r2"
            },
            {
              "leftId": "vn30-l3",
              "rightId": "vn30-r3"
            }
          ],
          "explanation": "Ăn quả nhớ kẻ trồng cây, uống nước nhớ nguồn, học thầy không tày học bạn.",
          "explanationAudio": "/media/tts/vn30-q3-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn30-slide-q4",
        "teacherNote": "Câu hỏi 4: Đoạn thơ: 'Trường em ngói mới đỏ hồng / ",
        "question": {
          "type": "multiple_choice",
          "id": "vn30-q4-mc",
          "prompt": "Đoạn thơ: 'Trường em ngói mới đỏ hồng / Mọc lên tươi thắm giữa đồng lúa xanh.' Đoạn thơ miêu tả trường em ở đâu?",
          "promptAudio": "/media/tts/vn30-q4-prompt.mp3",
          "illustration": "/media/images/school.svg",
          "options": [
            {
              "id": "vn30-q4-donglua",
              "label": "Giữa cánh đồng lúa xanh",
              "audio": "/media/tts/vn30-q4-opt0.mp3"
            },
            {
              "id": "vn30-q4-trenbien",
              "label": "Ở trên mặt biển",
              "audio": "/media/tts/vn30-q4-opt1.mp3"
            },
            {
              "id": "vn30-q4-trongrung",
              "label": "Ở sâu trong hang đá",
              "audio": "/media/tts/vn30-q4-opt2.mp3"
            }
          ],
          "correctOptionId": "vn30-q4-donglua",
          "explanation": "Trường mọc lên tươi thắm giữa cánh đồng lúa xanh ngát.",
          "explanationAudio": "/media/tts/vn30-q4-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn30-slide-q5",
        "teacherNote": "Câu hỏi 5: Điền từ thích hợp: Chúc mừng các em tự t",
        "question": {
          "type": "tap_place",
          "id": "vn30-q5-tap",
          "prompt": "Điền từ thích hợp: Chúc mừng các em tự tin bước vào lớp ...",
          "promptAudio": "/media/tts/vn30-q5-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "targets": [
            {
              "id": "vn30-t2",
              "label": "...",
              "prefixText": "Tự tin bước vào lớp ",
              "suffixText": "!"
            }
          ],
          "items": [
            {
              "id": "vn30-i3",
              "label": "hai",
              "audio": "/media/tts/vn30-q5-it0.mp3"
            },
            {
              "id": "vn30-i4",
              "label": "ba",
              "audio": "/media/tts/vn30-q5-it1.mp3"
            }
          ],
          "correctMapping": {
            "vn30-i3": "vn30-t2"
          },
          "explanation": "Hoàn thành Lớp 1, các em vững bước lên Lớp 2!",
          "explanationAudio": "/media/tts/vn30-q5-exp.mp3"
        },
        "timeLimitSeconds": 25,
        "showRetryOnWrong": true
      },
      {
        "type": "question-slide",
        "id": "vn30-slide-q6",
        "teacherNote": "Câu hỏi 6: Nối các danh hiệu với phẩm chất tương ứn",
        "question": {
          "type": "matching",
          "id": "vn30-q6-match",
          "prompt": "Nối các danh hiệu với phẩm chất tương ứng:",
          "promptAudio": "/media/tts/vn30-q6-prompt.mp3",
          "illustration": "/media/images/star.svg",
          "leftColumn": [
            {
              "id": "vn30-l2-trang",
              "label": "Trạng nguyên",
              "audio": "/media/tts/vn30-q6-l0.mp3"
            },
            {
              "id": "vn30-l2-hoa",
              "label": "Bông hoa điểm 10",
              "audio": "/media/tts/vn30-q6-l1.mp3"
            },
            {
              "id": "vn30-l2-sao",
              "label": "Ngôi sao chăm ngoan",
              "audio": "/media/tts/vn30-q6-l2.mp3"
            }
          ],
          "rightColumn": [
            {
              "id": "vn30-r2-trang",
              "label": "thông minh xuất sắc",
              "audio": "/media/tts/vn30-q6-r0.mp3"
            },
            {
              "id": "vn30-r2-hoa",
              "label": "chăm chỉ học giỏi",
              "audio": "/media/tts/vn30-q6-r1.mp3"
            },
            {
              "id": "vn30-r2-sao",
              "label": "lễ phép vâng lời",
              "audio": "/media/tts/vn30-q6-r2.mp3"
            }
          ],
          "correctPairs": [
            {
              "leftId": "vn30-l2-trang",
              "rightId": "vn30-r2-trang"
            },
            {
              "leftId": "vn30-l2-hoa",
              "rightId": "vn30-r2-hoa"
            },
            {
              "leftId": "vn30-l2-sao",
              "rightId": "vn30-r2-sao"
            }
          ],
          "explanation": "Chúc mừng tất cả các em đều là những ngôi sao chăm ngoan, học giỏi!",
          "explanationAudio": "/media/tts/vn30-q6-exp.mp3"
        },
        "timeLimitSeconds": 30,
        "showRetryOnWrong": true
      }
    ]
  }
]

def get_vn_lessons_batch4():
    return VN_LESSONS_BATCH4
