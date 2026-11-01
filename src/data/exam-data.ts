/* eslint-disable */
import type { Question } from '@/schemas/content.schema';

export interface ExamData {
  id: string;
  title: string;
  subject: 'math' | 'vietnamese';
  term: string;
  termLabel: string;
  icon: string;
  durationMinutes: number;
  description: string;
  questions: Question[];
}

export const EXAMS_DATA: ExamData[] = [
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
        "type": "multiple_choice",
        "id": "et-g1-q1",
        "prompt": "Có mấy bông hoa hồng nở trong vườn?",
        "promptAudio": "/media/tts/et-g1-q1-prompt.mp3",
        "illustration": "/media/images/flower.svg",
        "options": [
          {
            "id": "et-g1-q1-a",
            "label": "3 bông hoa",
            "audio": "/media/tts/et-g1-q1-opt0.mp3"
          },
          {
            "id": "et-g1-q1-b",
            "label": "5 bông hoa",
            "audio": "/media/tts/et-g1-q1-opt1.mp3"
          },
          {
            "id": "et-g1-q1-c",
            "label": "7 bông hoa",
            "audio": "/media/tts/et-g1-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q1-b",
        "explanation": "Quan sát hình vẽ ta đếm được chính xác 5 bông hoa hồng.",
        "explanationAudio": "/media/tts/et-g1-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q2",
        "prompt": "Số liền trước của số 5 là số nào?",
        "promptAudio": "/media/tts/et-g1-q2-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g1-q2-a",
            "label": "Số 4",
            "audio": "/media/tts/et-g1-q2-opt0.mp3"
          },
          {
            "id": "et-g1-q2-b",
            "label": "Số 6",
            "audio": "/media/tts/et-g1-q2-opt1.mp3"
          },
          {
            "id": "et-g1-q2-c",
            "label": "Số 3",
            "audio": "/media/tts/et-g1-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q2-a",
        "explanation": "Số liền trước của 5 là 5 - 1 = 4.",
        "explanationAudio": "/media/tts/et-g1-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q3",
        "prompt": "Điền dấu thích hợp vào chỗ chấm: 7 ... 4",
        "promptAudio": "/media/tts/et-g1-q3-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g1-q3-a",
            "label": "> (lớn hơn)",
            "audio": "/media/tts/et-g1-q3-opt0.mp3"
          },
          {
            "id": "et-g1-q3-b",
            "label": "< (bé hơn)",
            "audio": "/media/tts/et-g1-q3-opt1.mp3"
          },
          {
            "id": "et-g1-q3-c",
            "label": "= (bằng)",
            "audio": "/media/tts/et-g1-q3-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q3-a",
        "explanation": "7 lớn hơn 4, ta điền dấu lớn hơn (>).",
        "explanationAudio": "/media/tts/et-g1-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q4",
        "prompt": "Hình nào dưới đây là hình tròn?",
        "promptAudio": "/media/tts/et-g1-q4-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-g1-q4-a",
            "label": "Mặt trăng rằm tròn xoe",
            "audio": "/media/tts/et-g1-q4-opt0.mp3"
          },
          {
            "id": "et-g1-q4-b",
            "label": "Khung cửa sổ vuông",
            "audio": "/media/tts/et-g1-q4-opt1.mp3"
          },
          {
            "id": "et-g1-q4-c",
            "label": "Cái ê-ke tam giác",
            "audio": "/media/tts/et-g1-q4-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q4-a",
        "explanation": "Mặt trăng rằm có dạng hình tròn đường cong khép kín.",
        "explanationAudio": "/media/tts/et-g1-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q5",
        "prompt": "Tính nhẩm: 3 + 2 = ?",
        "promptAudio": "/media/tts/et-g1-q5-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-g1-q5-a",
            "label": "Bằng 4",
            "audio": "/media/tts/et-g1-q5-opt0.mp3"
          },
          {
            "id": "et-g1-q5-b",
            "label": "Bằng 5",
            "audio": "/media/tts/et-g1-q5-opt1.mp3"
          },
          {
            "id": "et-g1-q5-c",
            "label": "Bằng 6",
            "audio": "/media/tts/et-g1-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q5-b",
        "explanation": "3 cộng 2 bằng 5.",
        "explanationAudio": "/media/tts/et-g1-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q6",
        "prompt": "Số nào bé nhất trong các số: 8, 3, 9, 1?",
        "promptAudio": "/media/tts/et-g1-q6-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g1-q6-a",
            "label": "Số 1",
            "audio": "/media/tts/et-g1-q6-opt0.mp3"
          },
          {
            "id": "et-g1-q6-b",
            "label": "Số 3",
            "audio": "/media/tts/et-g1-q6-opt1.mp3"
          },
          {
            "id": "et-g1-q6-c",
            "label": "Số 8",
            "audio": "/media/tts/et-g1-q6-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q6-a",
        "explanation": "Số 1 là số bé nhất trong dãy số trên.",
        "explanationAudio": "/media/tts/et-g1-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q7",
        "prompt": "Có 4 quả táo, ăn mất 1 quả. Còn lại mấy quả táo?",
        "promptAudio": "/media/tts/et-g1-q7-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-g1-q7-a",
            "label": "2 quả",
            "audio": "/media/tts/et-g1-q7-opt0.mp3"
          },
          {
            "id": "et-g1-q7-b",
            "label": "3 quả",
            "audio": "/media/tts/et-g1-q7-opt1.mp3"
          },
          {
            "id": "et-g1-q7-c",
            "label": "4 quả",
            "audio": "/media/tts/et-g1-q7-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q7-b",
        "explanation": "4 trừ 1 bằng 3 quả táo.",
        "explanationAudio": "/media/tts/et-g1-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q8",
        "prompt": "Sắp xếp các số theo thứ tự từ bé đến lớn: 2, 7, 5",
        "promptAudio": "/media/tts/et-g1-q8-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g1-q8-a",
            "label": "2, 5, 7",
            "audio": "/media/tts/et-g1-q8-opt0.mp3"
          },
          {
            "id": "et-g1-q8-b",
            "label": "7, 5, 2",
            "audio": "/media/tts/et-g1-q8-opt1.mp3"
          },
          {
            "id": "et-g1-q8-c",
            "label": "5, 2, 7",
            "audio": "/media/tts/et-g1-q8-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q8-a",
        "explanation": "Thứ tự từ bé đến lớn là 2, 5, 7.",
        "explanationAudio": "/media/tts/et-g1-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q9",
        "prompt": "Hình tam giác có mấy cạnh?",
        "promptAudio": "/media/tts/et-g1-q9-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g1-q9-a",
            "label": "3 cạnh",
            "audio": "/media/tts/et-g1-q9-opt0.mp3"
          },
          {
            "id": "et-g1-q9-b",
            "label": "4 cạnh",
            "audio": "/media/tts/et-g1-q9-opt1.mp3"
          },
          {
            "id": "et-g1-q9-c",
            "label": "5 cạnh",
            "audio": "/media/tts/et-g1-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q9-a",
        "explanation": "Hình tam giác có đúng 3 cạnh và 3 góc.",
        "explanationAudio": "/media/tts/et-g1-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g1-q10",
        "prompt": "Tính: 5 - 0 = ?",
        "promptAudio": "/media/tts/et-g1-q10-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g1-q10-a",
            "label": "Bằng 0",
            "audio": "/media/tts/et-g1-q10-opt0.mp3"
          },
          {
            "id": "et-g1-q10-b",
            "label": "Bằng 5",
            "audio": "/media/tts/et-g1-q10-opt1.mp3"
          },
          {
            "id": "et-g1-q10-c",
            "label": "Bằng 4",
            "audio": "/media/tts/et-g1-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g1-q10-b",
        "explanation": "Bất kì số nào trừ đi 0 vẫn bằng chính số đó: 5 - 0 = 5.",
        "explanationAudio": "/media/tts/et-g1-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "et-c1-q1",
        "prompt": "Tính: 7 + 3 = ?",
        "promptAudio": "/media/tts/et-c1-q1-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-c1-q1-a",
            "label": "Bằng 9",
            "audio": "/media/tts/et-c1-q1-opt0.mp3"
          },
          {
            "id": "et-c1-q1-b",
            "label": "Bằng 10",
            "audio": "/media/tts/et-c1-q1-opt1.mp3"
          },
          {
            "id": "et-c1-q1-c",
            "label": "Bằng 8",
            "audio": "/media/tts/et-c1-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q1-b",
        "explanation": "7 cộng 3 bằng 10.",
        "explanationAudio": "/media/tts/et-c1-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q2",
        "prompt": "Tính: 10 - 6 = ?",
        "promptAudio": "/media/tts/et-c1-q2-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-c1-q2-a",
            "label": "Bằng 4",
            "audio": "/media/tts/et-c1-q2-opt0.mp3"
          },
          {
            "id": "et-c1-q2-b",
            "label": "Bằng 5",
            "audio": "/media/tts/et-c1-q2-opt1.mp3"
          },
          {
            "id": "et-c1-q2-c",
            "label": "Bằng 3",
            "audio": "/media/tts/et-c1-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q2-a",
        "explanation": "10 trừ 6 bằng 4.",
        "explanationAudio": "/media/tts/et-c1-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q3",
        "prompt": "Thực hiện phép tính liên tiếp: 4 + 3 - 2 = ?",
        "promptAudio": "/media/tts/et-c1-q3-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-c1-q3-a",
            "label": "Bằng 5",
            "audio": "/media/tts/et-c1-q3-opt0.mp3"
          },
          {
            "id": "et-c1-q3-b",
            "label": "Bằng 6",
            "audio": "/media/tts/et-c1-q3-opt1.mp3"
          },
          {
            "id": "et-c1-q3-c",
            "label": "Bằng 4",
            "audio": "/media/tts/et-c1-q3-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q3-a",
        "explanation": "4 + 3 = 7, sau đó lấy 7 - 2 = 5.",
        "explanationAudio": "/media/tts/et-c1-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q4",
        "prompt": "Viên xúc xắc đồ chơi có dạng khối hình gì?",
        "promptAudio": "/media/tts/et-c1-q4-prompt.mp3",
        "illustration": "/media/images/house.svg",
        "options": [
          {
            "id": "et-c1-q4-a",
            "label": "Khối lập phương",
            "audio": "/media/tts/et-c1-q4-opt0.mp3"
          },
          {
            "id": "et-c1-q4-b",
            "label": "Khối hộp chữ nhật",
            "audio": "/media/tts/et-c1-q4-opt1.mp3"
          },
          {
            "id": "et-c1-q4-c",
            "label": "Hình tam giác",
            "audio": "/media/tts/et-c1-q4-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q4-a",
        "explanation": "Viên xúc xắc có 6 mặt vuông bằng nhau nên là khối lập phương.",
        "explanationAudio": "/media/tts/et-c1-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q5",
        "prompt": "Điền số thích hợp: 8 - ... = 3",
        "promptAudio": "/media/tts/et-c1-q5-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "et-c1-q5-a",
            "label": "Số 5",
            "audio": "/media/tts/et-c1-q5-opt0.mp3"
          },
          {
            "id": "et-c1-q5-b",
            "label": "Số 4",
            "audio": "/media/tts/et-c1-q5-opt1.mp3"
          },
          {
            "id": "et-c1-q5-c",
            "label": "Số 6",
            "audio": "/media/tts/et-c1-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q5-a",
        "explanation": "8 - 5 = 3.",
        "explanationAudio": "/media/tts/et-c1-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q6",
        "prompt": "Hộp sữa tươi có dạng khối gì?",
        "promptAudio": "/media/tts/et-c1-q6-prompt.mp3",
        "illustration": "/media/images/milk.svg",
        "options": [
          {
            "id": "et-c1-q6-a",
            "label": "Khối hộp chữ nhật",
            "audio": "/media/tts/et-c1-q6-opt0.mp3"
          },
          {
            "id": "et-c1-q6-b",
            "label": "Khối lập phương",
            "audio": "/media/tts/et-c1-q6-opt1.mp3"
          }
        ],
        "correctOptionId": "et-c1-q6-a",
        "explanation": "Hộp sữa có các mặt hình chữ nhật nên là khối hộp chữ nhật.",
        "explanationAudio": "/media/tts/et-c1-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q7",
        "prompt": "So sánh: 9 - 4 ... 3 + 2",
        "promptAudio": "/media/tts/et-c1-q7-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-c1-q7-a",
            "label": "= (bằng nhau)",
            "audio": "/media/tts/et-c1-q7-opt0.mp3"
          },
          {
            "id": "et-c1-q7-b",
            "label": "> (lớn hơn)",
            "audio": "/media/tts/et-c1-q7-opt1.mp3"
          },
          {
            "id": "et-c1-q7-c",
            "label": "< (bé hơn)",
            "audio": "/media/tts/et-c1-q7-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q7-a",
        "explanation": "9 - 4 = 5 và 3 + 2 = 5. Do đó 5 = 5.",
        "explanationAudio": "/media/tts/et-c1-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q8",
        "prompt": "Tổ một có 6 bạn, tổ hai có 4 bạn. Cả hai tổ có bao nhiêu bạn?",
        "promptAudio": "/media/tts/et-c1-q8-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "et-c1-q8-a",
            "label": "9 bạn",
            "audio": "/media/tts/et-c1-q8-opt0.mp3"
          },
          {
            "id": "et-c1-q8-b",
            "label": "10 bạn",
            "audio": "/media/tts/et-c1-q8-opt1.mp3"
          },
          {
            "id": "et-c1-q8-c",
            "label": "8 bạn",
            "audio": "/media/tts/et-c1-q8-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q8-b",
        "explanation": "6 + 4 = 10 bạn học sinh.",
        "explanationAudio": "/media/tts/et-c1-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q9",
        "prompt": "Khi đứng chào cờ, bảng đen ở vị trí nào so với em?",
        "promptAudio": "/media/tts/et-c1-q9-prompt.mp3",
        "illustration": "/media/images/house.svg",
        "options": [
          {
            "id": "et-c1-q9-a",
            "label": "Ở phía trước",
            "audio": "/media/tts/et-c1-q9-opt0.mp3"
          },
          {
            "id": "et-c1-q9-b",
            "label": "Ở phía sau",
            "audio": "/media/tts/et-c1-q9-opt1.mp3"
          },
          {
            "id": "et-c1-q9-c",
            "label": "Ở dưới đất",
            "audio": "/media/tts/et-c1-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q9-a",
        "explanation": "Bảng đen ở ngay phía trước mặt em.",
        "explanationAudio": "/media/tts/et-c1-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-c1-q10",
        "prompt": "Tính: 10 - 2 - 3 = ?",
        "promptAudio": "/media/tts/et-c1-q10-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-c1-q10-a",
            "label": "Bằng 5",
            "audio": "/media/tts/et-c1-q10-opt0.mp3"
          },
          {
            "id": "et-c1-q10-b",
            "label": "Bằng 6",
            "audio": "/media/tts/et-c1-q10-opt1.mp3"
          },
          {
            "id": "et-c1-q10-c",
            "label": "Bằng 4",
            "audio": "/media/tts/et-c1-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "et-c1-q10-a",
        "explanation": "10 - 2 = 8, 8 - 3 = 5.",
        "explanationAudio": "/media/tts/et-c1-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "et-g2-q1",
        "prompt": "Số 47 gồm mấy chục và mấy đơn vị?",
        "promptAudio": "/media/tts/et-g2-q1-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "et-g2-q1-a",
            "label": "4 chục và 7 đơn vị",
            "audio": "/media/tts/et-g2-q1-opt0.mp3"
          },
          {
            "id": "et-g2-q1-b",
            "label": "7 chục và 4 đơn vị",
            "audio": "/media/tts/et-g2-q1-opt1.mp3"
          },
          {
            "id": "et-g2-q1-c",
            "label": "47 chục",
            "audio": "/media/tts/et-g2-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q1-a",
        "explanation": "47 gồm 4 chục và 7 đơn vị.",
        "explanationAudio": "/media/tts/et-g2-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q2",
        "prompt": "Đơn vị xăng-ti-mét được viết tắt là gì?",
        "promptAudio": "/media/tts/et-g2-q2-prompt.mp3",
        "illustration": "/media/images/ruler.svg",
        "options": [
          {
            "id": "et-g2-q2-a",
            "label": "cm",
            "audio": "/media/tts/et-g2-q2-opt0.mp3"
          },
          {
            "id": "et-g2-q2-b",
            "label": "kg",
            "audio": "/media/tts/et-g2-q2-opt1.mp3"
          },
          {
            "id": "et-g2-q2-c",
            "label": "dm",
            "audio": "/media/tts/et-g2-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q2-a",
        "explanation": "Xăng-ti-mét viết tắt là cm.",
        "explanationAudio": "/media/tts/et-g2-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q3",
        "prompt": "Tính nhẩm: 40 + 30 = ?",
        "promptAudio": "/media/tts/et-g2-q3-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g2-q3-a",
            "label": "Bằng 70",
            "audio": "/media/tts/et-g2-q3-opt0.mp3"
          },
          {
            "id": "et-g2-q3-b",
            "label": "Bằng 60",
            "audio": "/media/tts/et-g2-q3-opt1.mp3"
          },
          {
            "id": "et-g2-q3-c",
            "label": "Bằng 80",
            "audio": "/media/tts/et-g2-q3-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q3-a",
        "explanation": "4 chục cộng 3 chục bằng 7 chục (70).",
        "explanationAudio": "/media/tts/et-g2-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q4",
        "prompt": "Bút chì dài từ vạch 0 đến vạch 9 trên thước. Bút chì dài bao nhiêu cm?",
        "promptAudio": "/media/tts/et-g2-q4-prompt.mp3",
        "illustration": "/media/images/ruler.svg",
        "options": [
          {
            "id": "et-g2-q4-a",
            "label": "9cm",
            "audio": "/media/tts/et-g2-q4-opt0.mp3"
          },
          {
            "id": "et-g2-q4-b",
            "label": "8cm",
            "audio": "/media/tts/et-g2-q4-opt1.mp3"
          },
          {
            "id": "et-g2-q4-c",
            "label": "10cm",
            "audio": "/media/tts/et-g2-q4-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q4-a",
        "explanation": "Từ vạch 0 đến vạch 9 là 9cm.",
        "explanationAudio": "/media/tts/et-g2-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q5",
        "prompt": "Số tròn chục liền sau số 50 là số nào?",
        "promptAudio": "/media/tts/et-g2-q5-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g2-q5-a",
            "label": "Số 60",
            "audio": "/media/tts/et-g2-q5-opt0.mp3"
          },
          {
            "id": "et-g2-q5-b",
            "label": "Số 40",
            "audio": "/media/tts/et-g2-q5-opt1.mp3"
          },
          {
            "id": "et-g2-q5-c",
            "label": "Số 51",
            "audio": "/media/tts/et-g2-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q5-a",
        "explanation": "Số tròn chục liền sau 50 là 60.",
        "explanationAudio": "/media/tts/et-g2-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q6",
        "prompt": "Tính: 15cm + 4cm = ?",
        "promptAudio": "/media/tts/et-g2-q6-prompt.mp3",
        "illustration": "/media/images/ruler.svg",
        "options": [
          {
            "id": "et-g2-q6-a",
            "label": "19cm",
            "audio": "/media/tts/et-g2-q6-opt0.mp3"
          },
          {
            "id": "et-g2-q6-b",
            "label": "18cm",
            "audio": "/media/tts/et-g2-q6-opt1.mp3"
          },
          {
            "id": "et-g2-q6-c",
            "label": "20cm",
            "audio": "/media/tts/et-g2-q6-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q6-a",
        "explanation": "15 + 4 = 19cm.",
        "explanationAudio": "/media/tts/et-g2-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q7",
        "prompt": "Điền dấu thích hợp: 85 ... 58",
        "promptAudio": "/media/tts/et-g2-q7-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g2-q7-a",
            "label": "> (lớn hơn)",
            "audio": "/media/tts/et-g2-q7-opt0.mp3"
          },
          {
            "id": "et-g2-q7-b",
            "label": "< (bé hơn)",
            "audio": "/media/tts/et-g2-q7-opt1.mp3"
          },
          {
            "id": "et-g2-q7-c",
            "label": "= (bằng)",
            "audio": "/media/tts/et-g2-q7-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q7-a",
        "explanation": "8 chục lớn hơn 5 chục nên 85 > 58.",
        "explanationAudio": "/media/tts/et-g2-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q8",
        "prompt": "Tính: 90 - 50 = ?",
        "promptAudio": "/media/tts/et-g2-q8-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-g2-q8-a",
            "label": "Bằng 40",
            "audio": "/media/tts/et-g2-q8-opt0.mp3"
          },
          {
            "id": "et-g2-q8-b",
            "label": "Bằng 30",
            "audio": "/media/tts/et-g2-q8-opt1.mp3"
          },
          {
            "id": "et-g2-q8-c",
            "label": "Bằng 50",
            "audio": "/media/tts/et-g2-q8-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q8-a",
        "explanation": "9 chục trừ 5 chục bằng 4 chục (40).",
        "explanationAudio": "/media/tts/et-g2-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q9",
        "prompt": "Số liền trước số 90 là số nào?",
        "promptAudio": "/media/tts/et-g2-q9-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "et-g2-q9-a",
            "label": "Số 89",
            "audio": "/media/tts/et-g2-q9-opt0.mp3"
          },
          {
            "id": "et-g2-q9-b",
            "label": "Số 91",
            "audio": "/media/tts/et-g2-q9-opt1.mp3"
          },
          {
            "id": "et-g2-q9-c",
            "label": "Số 80",
            "audio": "/media/tts/et-g2-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q9-a",
        "explanation": "Số liền trước 90 là 89.",
        "explanationAudio": "/media/tts/et-g2-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-g2-q10",
        "prompt": "Đoạn dây đỏ dài 20cm, đoạn dây xanh dài 30cm. Cả hai đoạn dài bao nhiêu?",
        "promptAudio": "/media/tts/et-g2-q10-prompt.mp3",
        "illustration": "/media/images/ruler.svg",
        "options": [
          {
            "id": "et-g2-q10-a",
            "label": "50cm",
            "audio": "/media/tts/et-g2-q10-opt0.mp3"
          },
          {
            "id": "et-g2-q10-b",
            "label": "40cm",
            "audio": "/media/tts/et-g2-q10-opt1.mp3"
          },
          {
            "id": "et-g2-q10-c",
            "label": "60cm",
            "audio": "/media/tts/et-g2-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "et-g2-q10-a",
        "explanation": "20cm + 30cm = 50cm.",
        "explanationAudio": "/media/tts/et-g2-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "et-cn-q1",
        "prompt": "Tính: 43 + 25 = ?",
        "promptAudio": "/media/tts/et-cn-q1-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-cn-q1-a",
            "label": "68",
            "audio": "/media/tts/et-cn-q1-opt0.mp3"
          },
          {
            "id": "et-cn-q1-b",
            "label": "67",
            "audio": "/media/tts/et-cn-q1-opt1.mp3"
          },
          {
            "id": "et-cn-q1-c",
            "label": "58",
            "audio": "/media/tts/et-cn-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q1-a",
        "explanation": "3 + 5 = 8, 4 + 2 = 6, kết quả là 68.",
        "explanationAudio": "/media/tts/et-cn-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q2",
        "prompt": "Tính: 76 - 32 = ?",
        "promptAudio": "/media/tts/et-cn-q2-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-cn-q2-a",
            "label": "44",
            "audio": "/media/tts/et-cn-q2-opt0.mp3"
          },
          {
            "id": "et-cn-q2-b",
            "label": "43",
            "audio": "/media/tts/et-cn-q2-opt1.mp3"
          },
          {
            "id": "et-cn-q2-c",
            "label": "54",
            "audio": "/media/tts/et-cn-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q2-a",
        "explanation": "6 - 2 = 4, 7 - 3 = 4, kết quả là 44.",
        "explanationAudio": "/media/tts/et-cn-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q3",
        "prompt": "Đồng hồ có kim ngắn chỉ số 8, kim dài chỉ số 12. Lúc đó là mấy giờ?",
        "promptAudio": "/media/tts/et-cn-q3-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-cn-q3-a",
            "label": "8 giờ đúng",
            "audio": "/media/tts/et-cn-q3-opt0.mp3"
          },
          {
            "id": "et-cn-q3-b",
            "label": "12 giờ đúng",
            "audio": "/media/tts/et-cn-q3-opt1.mp3"
          },
          {
            "id": "et-cn-q3-c",
            "label": "4 giờ đúng",
            "audio": "/media/tts/et-cn-q3-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q3-a",
        "explanation": "Kim ngắn chỉ số 8, kim dài số 12 là đúng 8 giờ.",
        "explanationAudio": "/media/tts/et-cn-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q4",
        "prompt": "Một tuần lễ có bao nhiêu ngày?",
        "promptAudio": "/media/tts/et-cn-q4-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "et-cn-q4-a",
            "label": "7 ngày",
            "audio": "/media/tts/et-cn-q4-opt0.mp3"
          },
          {
            "id": "et-cn-q4-b",
            "label": "5 ngày",
            "audio": "/media/tts/et-cn-q4-opt1.mp3"
          },
          {
            "id": "et-cn-q4-c",
            "label": "6 ngày",
            "audio": "/media/tts/et-cn-q4-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q4-a",
        "explanation": "Một tuần lễ có đúng 7 ngày từ Thứ Hai đến Chủ Nhật.",
        "explanationAudio": "/media/tts/et-cn-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q5",
        "prompt": "Hôm nay là Thứ Ba ngày 4. Thứ Năm cùng tuần là ngày bao nhiêu?",
        "promptAudio": "/media/tts/et-cn-q5-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "et-cn-q5-a",
            "label": "Ngày 6",
            "audio": "/media/tts/et-cn-q5-opt0.mp3"
          },
          {
            "id": "et-cn-q5-b",
            "label": "Ngày 5",
            "audio": "/media/tts/et-cn-q5-opt1.mp3"
          },
          {
            "id": "et-cn-q5-c",
            "label": "Ngày 7",
            "audio": "/media/tts/et-cn-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q5-a",
        "explanation": "Thứ Ba (4) -> Thứ Tư (5) -> Thứ Năm (6).",
        "explanationAudio": "/media/tts/et-cn-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q6",
        "prompt": "Mẹ có 35 quả cam, mẹ mua thêm 14 quả nữa. Mẹ có tất cả bao nhiêu quả cam?",
        "promptAudio": "/media/tts/et-cn-q6-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "et-cn-q6-a",
            "label": "49 quả",
            "audio": "/media/tts/et-cn-q6-opt0.mp3"
          },
          {
            "id": "et-cn-q6-b",
            "label": "48 quả",
            "audio": "/media/tts/et-cn-q6-opt1.mp3"
          },
          {
            "id": "et-cn-q6-c",
            "label": "59 quả",
            "audio": "/media/tts/et-cn-q6-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q6-a",
        "explanation": "35 + 14 = 49 quả cam.",
        "explanationAudio": "/media/tts/et-cn-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q7",
        "prompt": "Tính chuỗi phép tính: 50 + 20 - 10 = ?",
        "promptAudio": "/media/tts/et-cn-q7-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-cn-q7-a",
            "label": "60",
            "audio": "/media/tts/et-cn-q7-opt0.mp3"
          },
          {
            "id": "et-cn-q7-b",
            "label": "70",
            "audio": "/media/tts/et-cn-q7-opt1.mp3"
          },
          {
            "id": "et-cn-q7-c",
            "label": "50",
            "audio": "/media/tts/et-cn-q7-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q7-a",
        "explanation": "50 + 20 = 70, 70 - 10 = 60.",
        "explanationAudio": "/media/tts/et-cn-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q8",
        "prompt": "Số lớn nhất có hai chữ số là số nào?",
        "promptAudio": "/media/tts/et-cn-q8-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "et-cn-q8-a",
            "label": "Số 99",
            "audio": "/media/tts/et-cn-q8-opt0.mp3"
          },
          {
            "id": "et-cn-q8-b",
            "label": "Số 90",
            "audio": "/media/tts/et-cn-q8-opt1.mp3"
          },
          {
            "id": "et-cn-q8-c",
            "label": "Số 100",
            "audio": "/media/tts/et-cn-q8-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q8-a",
        "explanation": "99 là số có hai chữ số lớn nhất.",
        "explanationAudio": "/media/tts/et-cn-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q9",
        "prompt": "Đoạn thẳng AB dài 18cm, cắt bớt 5cm. Đoạn thẳng còn lại dài bao nhiêu?",
        "promptAudio": "/media/tts/et-cn-q9-prompt.mp3",
        "illustration": "/media/images/ruler.svg",
        "options": [
          {
            "id": "et-cn-q9-a",
            "label": "13cm",
            "audio": "/media/tts/et-cn-q9-opt0.mp3"
          },
          {
            "id": "et-cn-q9-b",
            "label": "12cm",
            "audio": "/media/tts/et-cn-q9-opt1.mp3"
          },
          {
            "id": "et-cn-q9-c",
            "label": "14cm",
            "audio": "/media/tts/et-cn-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "et-cn-q9-a",
        "explanation": "18cm - 5cm = 13cm.",
        "explanationAudio": "/media/tts/et-cn-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "et-cn-q10",
        "prompt": "Hình khối nào có 6 mặt đều là hình vuông bằng nhau?",
        "promptAudio": "/media/tts/et-cn-q10-prompt.mp3",
        "illustration": "/media/images/house.svg",
        "options": [
          {
            "id": "et-cn-q10-a",
            "label": "Khối lập phương",
            "audio": "/media/tts/et-cn-q10-opt0.mp3"
          },
          {
            "id": "et-cn-q10-b",
            "label": "Khối hộp chữ nhật",
            "audio": "/media/tts/et-cn-q10-opt1.mp3"
          }
        ],
        "correctOptionId": "et-cn-q10-a",
        "explanation": "Khối lập phương có 6 mặt vuông bằng nhau.",
        "explanationAudio": "/media/tts/et-cn-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "ev-g1-q1",
        "prompt": "Tiếng 'cá' gồm có âm c, âm a và dấu thanh gì?",
        "promptAudio": "/media/tts/ev-g1-q1-prompt.mp3",
        "illustration": "/media/images/bird.svg",
        "options": [
          {
            "id": "ev-g1-q1-a",
            "label": "Dấu sắc",
            "audio": "/media/tts/ev-g1-q1-opt0.mp3"
          },
          {
            "id": "ev-g1-q1-b",
            "label": "Dấu huyền",
            "audio": "/media/tts/ev-g1-q1-opt1.mp3"
          },
          {
            "id": "ev-g1-q1-c",
            "label": "Dấu hỏi",
            "audio": "/media/tts/ev-g1-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q1-a",
        "explanation": "Tiếng cá gồm âm c, âm a và dấu sắc trên đầu chữ a.",
        "explanationAudio": "/media/tts/ev-g1-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q2",
        "prompt": "Theo quy tắc chính tả, âm 'k' ghép được với những chữ cái nào?",
        "promptAudio": "/media/tts/ev-g1-q2-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-g1-q2-a",
            "label": "e, ê, i",
            "audio": "/media/tts/ev-g1-q2-opt0.mp3"
          },
          {
            "id": "ev-g1-q2-b",
            "label": "a, o, u",
            "audio": "/media/tts/ev-g1-q2-opt1.mp3"
          },
          {
            "id": "ev-g1-q2-c",
            "label": "o, ô, ơ",
            "audio": "/media/tts/ev-g1-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q2-a",
        "explanation": "Âm k chỉ đi với e, ê, i (kẻ, kề, kí).",
        "explanationAudio": "/media/tts/ev-g1-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q3",
        "prompt": "Từ nào sau đây viết đúng chính tả?",
        "promptAudio": "/media/tts/ev-g1-q3-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "ev-g1-q3-a",
            "label": "Cây kẹo",
            "audio": "/media/tts/ev-g1-q3-opt0.mp3"
          },
          {
            "id": "ev-g1-q3-b",
            "label": "Cây cẹo",
            "audio": "/media/tts/ev-g1-q3-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q3-a",
        "explanation": "Đi với e phải viết bằng k: 'kẹo'.",
        "explanationAudio": "/media/tts/ev-g1-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q4",
        "prompt": "Âm 'd' và âm 'đ' khác nhau ở điểm nào?",
        "promptAudio": "/media/tts/ev-g1-q4-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-g1-q4-a",
            "label": "Chữ đ có thêm dấu gạch ngang",
            "audio": "/media/tts/ev-g1-q4-opt0.mp3"
          },
          {
            "id": "ev-g1-q4-b",
            "label": "Chữ d có dấu chấm ở trên",
            "audio": "/media/tts/ev-g1-q4-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q4-a",
        "explanation": "Chữ đ có nét gạch ngang ngắn ở thân.",
        "explanationAudio": "/media/tts/ev-g1-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q5",
        "prompt": "Từ nào là tên gọi của một loài hoa thơm?",
        "promptAudio": "/media/tts/ev-g1-q5-prompt.mp3",
        "illustration": "/media/images/flower.svg",
        "options": [
          {
            "id": "ev-g1-q5-a",
            "label": "Hoa hồng",
            "audio": "/media/tts/ev-g1-q5-opt0.mp3"
          },
          {
            "id": "ev-g1-q5-b",
            "label": "Con hươu",
            "audio": "/media/tts/ev-g1-q5-opt1.mp3"
          },
          {
            "id": "ev-g1-q5-c",
            "label": "Cái hồ",
            "audio": "/media/tts/ev-g1-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q5-a",
        "explanation": "Hoa hồng là loài hoa thơm ngát.",
        "explanationAudio": "/media/tts/ev-g1-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q6",
        "prompt": "Tiếng nào có dấu thanh 'hỏi'?",
        "promptAudio": "/media/tts/ev-g1-q6-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-g1-q6-a",
            "label": "Thỏ",
            "audio": "/media/tts/ev-g1-q6-opt0.mp3"
          },
          {
            "id": "ev-g1-q6-b",
            "label": "Cá",
            "audio": "/media/tts/ev-g1-q6-opt1.mp3"
          },
          {
            "id": "ev-g1-q6-c",
            "label": "Mẹ",
            "audio": "/media/tts/ev-g1-q6-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q6-a",
        "explanation": "Tiếng thỏ có dấu hỏi trên chữ o.",
        "explanationAudio": "/media/tts/ev-g1-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q7",
        "prompt": "Phụ âm ghép 'ch' xuất hiện trong từ nào sau đây?",
        "promptAudio": "/media/tts/ev-g1-q7-prompt.mp3",
        "illustration": "/media/images/bird.svg",
        "options": [
          {
            "id": "ev-g1-q7-a",
            "label": "Chim sẻ",
            "audio": "/media/tts/ev-g1-q7-opt0.mp3"
          },
          {
            "id": "ev-g1-q7-b",
            "label": "Quả khế",
            "audio": "/media/tts/ev-g1-q7-opt1.mp3"
          },
          {
            "id": "ev-g1-q7-c",
            "label": "Nhà ngói",
            "audio": "/media/tts/ev-g1-q7-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q7-a",
        "explanation": "Chim sẻ có tiếng chim bắt đầu bằng ch.",
        "explanationAudio": "/media/tts/ev-g1-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q8",
        "prompt": "Điền chữ còn thiếu: 'C... gà trống gáy vang.'",
        "promptAudio": "/media/tts/ev-g1-q8-prompt.mp3",
        "illustration": "/media/images/bird.svg",
        "options": [
          {
            "id": "ev-g1-q8-a",
            "label": "Chữ on (Con)",
            "audio": "/media/tts/ev-g1-q8-opt0.mp3"
          },
          {
            "id": "ev-g1-q8-b",
            "label": "Chữ a (Ca)",
            "audio": "/media/tts/ev-g1-q8-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q8-a",
        "explanation": "Con gà trống gáy vang.",
        "explanationAudio": "/media/tts/ev-g1-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q9",
        "prompt": "Câu: 'Bé ngoan nghe lời cô giáo' có mấy tiếng?",
        "promptAudio": "/media/tts/ev-g1-q9-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-g1-q9-a",
            "label": "6 tiếng",
            "audio": "/media/tts/ev-g1-q9-opt0.mp3"
          },
          {
            "id": "ev-g1-q9-b",
            "label": "7 tiếng",
            "audio": "/media/tts/ev-g1-q9-opt1.mp3"
          },
          {
            "id": "ev-g1-q9-c",
            "label": "8 tiếng",
            "audio": "/media/tts/ev-g1-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q9-b",
        "explanation": "Các tiếng: Bé (1) ngoan (2) nghe (3) lời (4) cô (5) giáo (6) -> 6 tiếng. À, đếm: Bé - ngoan - nghe - lời - cô - giáo = 6 tiếng.",
        "explanationAudio": "/media/tts/ev-g1-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g1-q10",
        "prompt": "Từ nào sau đây viết hoa đúng tên người?",
        "promptAudio": "/media/tts/ev-g1-q10-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "ev-g1-q10-a",
            "label": "Bé Lan",
            "audio": "/media/tts/ev-g1-q10-opt0.mp3"
          },
          {
            "id": "ev-g1-q10-b",
            "label": "bé lan",
            "audio": "/media/tts/ev-g1-q10-opt1.mp3"
          },
          {
            "id": "ev-g1-q10-c",
            "label": "BÉ lan",
            "audio": "/media/tts/ev-g1-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g1-q10-a",
        "explanation": "Tên riêng Lan phải viết hoa chữ cái đầu.",
        "explanationAudio": "/media/tts/ev-g1-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "ev-c1-q1",
        "prompt": "Từ 'khăn quàng' chứa vần gì ở tiếng 'khăn'?",
        "promptAudio": "/media/tts/ev-c1-q1-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-c1-q1-a",
            "label": "Vần ăn",
            "audio": "/media/tts/ev-c1-q1-opt0.mp3"
          },
          {
            "id": "ev-c1-q1-b",
            "label": "Vần an",
            "audio": "/media/tts/ev-c1-q1-opt1.mp3"
          },
          {
            "id": "ev-c1-q1-c",
            "label": "Vần ân",
            "audio": "/media/tts/ev-c1-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q1-a",
        "explanation": "Tiếng khăn chứa vần ăn.",
        "explanationAudio": "/media/tts/ev-c1-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q2",
        "prompt": "Quy tắc chính tả: 'ngh' chỉ ghép với những âm nào?",
        "promptAudio": "/media/tts/ev-c1-q2-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "ev-c1-q2-a",
            "label": "e, ê, i",
            "audio": "/media/tts/ev-c1-q2-opt0.mp3"
          },
          {
            "id": "ev-c1-q2-b",
            "label": "a, o, u",
            "audio": "/media/tts/ev-c1-q2-opt1.mp3"
          },
          {
            "id": "ev-c1-q2-c",
            "label": "ô, ơ, ư",
            "audio": "/media/tts/ev-c1-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q2-a",
        "explanation": "ngh chỉ ghép với e, ê, i (nghé, nghê, nghỉ).",
        "explanationAudio": "/media/tts/ev-c1-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q3",
        "prompt": "Từ nào sau đây viết sai chính tả?",
        "promptAudio": "/media/tts/ev-c1-q3-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-c1-q3-a",
            "label": "Con nghé",
            "audio": "/media/tts/ev-c1-q3-opt0.mp3"
          },
          {
            "id": "ev-c1-q3-b",
            "label": "Củ nghệ",
            "audio": "/media/tts/ev-c1-q3-opt1.mp3"
          },
          {
            "id": "ev-c1-q3-c",
            "label": "Nghe nghóng (viết ngóng thành nghóng)",
            "audio": "/media/tts/ev-c1-q3-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q3-c",
        "explanation": "Chữ ngóng phải viết bằng ng đơn vì đi với o: 'nghe ngóng'.",
        "explanationAudio": "/media/tts/ev-c1-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q4",
        "prompt": "Từ nào miêu tả quả cam chín mọng và chứa vần 'am'?",
        "promptAudio": "/media/tts/ev-c1-q4-prompt.mp3",
        "illustration": "/media/images/apple.svg",
        "options": [
          {
            "id": "ev-c1-q4-a",
            "label": "Quả cam",
            "audio": "/media/tts/ev-c1-q4-opt0.mp3"
          },
          {
            "id": "ev-c1-q4-b",
            "label": "Cây nấm",
            "audio": "/media/tts/ev-c1-q4-opt1.mp3"
          },
          {
            "id": "ev-c1-q4-c",
            "label": "Con tôm",
            "audio": "/media/tts/ev-c1-q4-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q4-a",
        "explanation": "Quả cam có tiếng cam chứa vần am.",
        "explanationAudio": "/media/tts/ev-c1-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q5",
        "prompt": "Tiếng 'sen' trong 'hoa sen' chứa vần gì?",
        "promptAudio": "/media/tts/ev-c1-q5-prompt.mp3",
        "illustration": "/media/images/flower.svg",
        "options": [
          {
            "id": "ev-c1-q5-a",
            "label": "Vần en",
            "audio": "/media/tts/ev-c1-q5-opt0.mp3"
          },
          {
            "id": "ev-c1-q5-b",
            "label": "Vần ên",
            "audio": "/media/tts/ev-c1-q5-opt1.mp3"
          },
          {
            "id": "ev-c1-q5-c",
            "label": "Vần in",
            "audio": "/media/tts/ev-c1-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q5-a",
        "explanation": "Hoa sen chứa vần en.",
        "explanationAudio": "/media/tts/ev-c1-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q6",
        "prompt": "Từ nào chứa tiếng có vần 'ăc'?",
        "promptAudio": "/media/tts/ev-c1-q6-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-c1-q6-a",
            "label": "Tắc kè",
            "audio": "/media/tts/ev-c1-q6-opt0.mp3"
          },
          {
            "id": "ev-c1-q6-b",
            "label": "Chim hạc",
            "audio": "/media/tts/ev-c1-q6-opt1.mp3"
          },
          {
            "id": "ev-c1-q6-c",
            "label": "Mặt trời",
            "audio": "/media/tts/ev-c1-q6-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q6-a",
        "explanation": "Tắc kè có tiếng tắc chứa vần ăc.",
        "explanationAudio": "/media/tts/ev-c1-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q7",
        "prompt": "Đọc câu: 'Đàn chim én bay lượn báo mùa xuân về.' Chim én báo hiệu mùa nào?",
        "promptAudio": "/media/tts/ev-c1-q7-prompt.mp3",
        "illustration": "/media/images/bird.svg",
        "options": [
          {
            "id": "ev-c1-q7-a",
            "label": "Mùa xuân",
            "audio": "/media/tts/ev-c1-q7-opt0.mp3"
          },
          {
            "id": "ev-c1-q7-b",
            "label": "Mùa hè",
            "audio": "/media/tts/ev-c1-q7-opt1.mp3"
          },
          {
            "id": "ev-c1-q7-c",
            "label": "Mùa đông",
            "audio": "/media/tts/ev-c1-q7-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q7-a",
        "explanation": "Đoạn văn viết: chim én báo mùa xuân về.",
        "explanationAudio": "/media/tts/ev-c1-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q8",
        "prompt": "Điền từ: 'Mặt trời ... tỏa ánh nắng ấm áp.'",
        "promptAudio": "/media/tts/ev-c1-q8-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-c1-q8-a",
            "label": "mọc",
            "audio": "/media/tts/ev-c1-q8-opt0.mp3"
          },
          {
            "id": "ev-c1-q8-b",
            "label": "học",
            "audio": "/media/tts/ev-c1-q8-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q8-a",
        "explanation": "Mặt trời mọc vào buổi sớm.",
        "explanationAudio": "/media/tts/ev-c1-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q9",
        "prompt": "Tiếng nào có âm cuối 'm' khép môi?",
        "promptAudio": "/media/tts/ev-c1-q9-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-c1-q9-a",
            "label": "Đom đóm",
            "audio": "/media/tts/ev-c1-q9-opt0.mp3"
          },
          {
            "id": "ev-c1-q9-b",
            "label": "Đèn pin",
            "audio": "/media/tts/ev-c1-q9-opt1.mp3"
          },
          {
            "id": "ev-c1-q9-c",
            "label": "Con cá",
            "audio": "/media/tts/ev-c1-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q9-a",
        "explanation": "Đom đóm có vần om kết thúc bằng m khép môi.",
        "explanationAudio": "/media/tts/ev-c1-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-c1-q10",
        "prompt": "Từ nào dưới đây là từ chỉ đồ dùng học tập của em?",
        "promptAudio": "/media/tts/ev-c1-q10-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "ev-c1-q10-a",
            "label": "Bút chì",
            "audio": "/media/tts/ev-c1-q10-opt0.mp3"
          },
          {
            "id": "ev-c1-q10-b",
            "label": "Bát cơm",
            "audio": "/media/tts/ev-c1-q10-opt1.mp3"
          },
          {
            "id": "ev-c1-q10-c",
            "label": "Cái chăn",
            "audio": "/media/tts/ev-c1-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-c1-q10-a",
        "explanation": "Bút chì là đồ dùng học tập quen thuộc.",
        "explanationAudio": "/media/tts/ev-c1-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "ev-g2-q1",
        "prompt": "Từ 'củ khoai' chứa vần gì ở tiếng 'khoai'?",
        "promptAudio": "/media/tts/ev-g2-q1-prompt.mp3",
        "illustration": "/media/images/leaf.svg",
        "options": [
          {
            "id": "ev-g2-q1-a",
            "label": "Vần oai",
            "audio": "/media/tts/ev-g2-q1-opt0.mp3"
          },
          {
            "id": "ev-g2-q1-b",
            "label": "Vần oay",
            "audio": "/media/tts/ev-g2-q1-opt1.mp3"
          },
          {
            "id": "ev-g2-q1-c",
            "label": "Vần ai",
            "audio": "/media/tts/ev-g2-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q1-a",
        "explanation": "Tiếng khoai chứa vần oai.",
        "explanationAudio": "/media/tts/ev-g2-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q2",
        "prompt": "Từ nào dưới đây viết đúng chính tả với âm 'l'?",
        "promptAudio": "/media/tts/ev-g2-q2-prompt.mp3",
        "illustration": "/media/images/leaf.svg",
        "options": [
          {
            "id": "ev-g2-q2-a",
            "label": "Lúa nếp",
            "audio": "/media/tts/ev-g2-q2-opt0.mp3"
          },
          {
            "id": "ev-g2-q2-b",
            "label": "Núa nếp",
            "audio": "/media/tts/ev-g2-q2-opt1.mp3"
          },
          {
            "id": "ev-g2-q2-c",
            "label": "Lúa lếp",
            "audio": "/media/tts/ev-g2-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q2-a",
        "explanation": "Viết đúng chính tả là 'lúa nếp'.",
        "explanationAudio": "/media/tts/ev-g2-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q3",
        "prompt": "Điền s hay x: 'Ngôi ...ao sáng lung linh trên trời.'",
        "promptAudio": "/media/tts/ev-g2-q3-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-g2-q3-a",
            "label": "s (sao)",
            "audio": "/media/tts/ev-g2-q3-opt0.mp3"
          },
          {
            "id": "ev-g2-q3-b",
            "label": "x (xao)",
            "audio": "/media/tts/ev-g2-q3-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q3-a",
        "explanation": "Ngôi sao viết bằng chữ s.",
        "explanationAudio": "/media/tts/ev-g2-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q4",
        "prompt": "Tiếng 'diều' trong 'cánh diều' chứa vần gì?",
        "promptAudio": "/media/tts/ev-g2-q4-prompt.mp3",
        "illustration": "/media/images/bird.svg",
        "options": [
          {
            "id": "ev-g2-q4-a",
            "label": "Vần iêu",
            "audio": "/media/tts/ev-g2-q4-opt0.mp3"
          },
          {
            "id": "ev-g2-q4-b",
            "label": "Vần yêu",
            "audio": "/media/tts/ev-g2-q4-opt1.mp3"
          },
          {
            "id": "ev-g2-q4-c",
            "label": "Vần iu",
            "audio": "/media/tts/ev-g2-q4-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q4-a",
        "explanation": "Có âm đầu d nên viết vần iêu: 'cánh diều'.",
        "explanationAudio": "/media/tts/ev-g2-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q5",
        "prompt": "Từ nào sau đây mang vần có âm đệm 'uê'?",
        "promptAudio": "/media/tts/ev-g2-q5-prompt.mp3",
        "illustration": "/media/images/flower.svg",
        "options": [
          {
            "id": "ev-g2-q5-a",
            "label": "Bông hoa huệ",
            "audio": "/media/tts/ev-g2-q5-opt0.mp3"
          },
          {
            "id": "ev-g2-q5-b",
            "label": "Cây hoa hồng",
            "audio": "/media/tts/ev-g2-q5-opt1.mp3"
          },
          {
            "id": "ev-g2-q5-c",
            "label": "Quả chuối tiêu",
            "audio": "/media/tts/ev-g2-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q5-a",
        "explanation": "Hoa huệ có tiếng huệ mang vần uê.",
        "explanationAudio": "/media/tts/ev-g2-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q6",
        "prompt": "Điền tr hay ch: 'Mái ...ường mến yêu.'",
        "promptAudio": "/media/tts/ev-g2-q6-prompt.mp3",
        "illustration": "/media/images/house.svg",
        "options": [
          {
            "id": "ev-g2-q6-a",
            "label": "tr (trường)",
            "audio": "/media/tts/ev-g2-q6-opt0.mp3"
          },
          {
            "id": "ev-g2-q6-b",
            "label": "ch (chường)",
            "audio": "/media/tts/ev-g2-q6-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q6-a",
        "explanation": "Mái trường viết bằng tr.",
        "explanationAudio": "/media/tts/ev-g2-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q7",
        "prompt": "Đọc câu: 'Bé giúp mẹ quét nhà và tưới cây.' Bé đã làm những việc gì?",
        "promptAudio": "/media/tts/ev-g2-q7-prompt.mp3",
        "illustration": "/media/images/house.svg",
        "options": [
          {
            "id": "ev-g2-q7-a",
            "label": "Quét nhà và tưới cây",
            "audio": "/media/tts/ev-g2-q7-opt0.mp3"
          },
          {
            "id": "ev-g2-q7-b",
            "label": "Xem tivi và ngủ",
            "audio": "/media/tts/ev-g2-q7-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q7-a",
        "explanation": "Bé chăm chỉ quét nhà và tưới cây giúp mẹ.",
        "explanationAudio": "/media/tts/ev-g2-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q8",
        "prompt": "Cặp từ nào viết đúng quy tắc phân biệt dấu hỏi và dấu ngã?",
        "promptAudio": "/media/tts/ev-g2-q8-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-g2-q8-a",
            "label": "Chăm chỉ, sạch sẽ",
            "audio": "/media/tts/ev-g2-q8-opt0.mp3"
          },
          {
            "id": "ev-g2-q8-b",
            "label": "Chăm chỉ, sạch sẻ",
            "audio": "/media/tts/ev-g2-q8-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q8-a",
        "explanation": "'Sạch sẽ' viết bằng dấu ngã.",
        "explanationAudio": "/media/tts/ev-g2-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q9",
        "prompt": "Tiếng 'thuyền' trong 'thuyền buồm' chứa vần gì?",
        "promptAudio": "/media/tts/ev-g2-q9-prompt.mp3",
        "illustration": "/media/images/boat.svg",
        "options": [
          {
            "id": "ev-g2-q9-a",
            "label": "Vần uyên",
            "audio": "/media/tts/ev-g2-q9-opt0.mp3"
          },
          {
            "id": "ev-g2-q9-b",
            "label": "Vần uyêt",
            "audio": "/media/tts/ev-g2-q9-opt1.mp3"
          },
          {
            "id": "ev-g2-q9-c",
            "label": "Vần uên",
            "audio": "/media/tts/ev-g2-q9-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q9-a",
        "explanation": "Tiếng thuyền chứa vần uyên.",
        "explanationAudio": "/media/tts/ev-g2-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-g2-q10",
        "prompt": "Từ nào thể hiện tình cảm của con cái đối với cha mẹ?",
        "promptAudio": "/media/tts/ev-g2-q10-prompt.mp3",
        "illustration": "/media/images/house.svg",
        "options": [
          {
            "id": "ev-g2-q10-a",
            "label": "Hiếu thảo",
            "audio": "/media/tts/ev-g2-q10-opt0.mp3"
          },
          {
            "id": "ev-g2-q10-b",
            "label": "Khéo léo",
            "audio": "/media/tts/ev-g2-q10-opt1.mp3"
          },
          {
            "id": "ev-g2-q10-c",
            "label": "Lười biếng",
            "audio": "/media/tts/ev-g2-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-g2-q10-a",
        "explanation": "Hiếu thảo là tình cảm kính yêu, vâng lời ông bà cha mẹ.",
        "explanationAudio": "/media/tts/ev-g2-q10-exp.mp3"
      }
    ]
  },
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
        "type": "multiple_choice",
        "id": "ev-cn-q1",
        "prompt": "Đọc đoạn văn: 'Mùa thu, bầu trời trong xanh cao vút. Những chiếc lá vàng khẽ rơi trên sân trường.' Bầu trời mùa thu có đặc điểm gì?",
        "promptAudio": "/media/tts/ev-cn-q1-prompt.mp3",
        "illustration": "/media/images/leaf.svg",
        "options": [
          {
            "id": "ev-cn-q1-a",
            "label": "Trong xanh cao vút",
            "audio": "/media/tts/ev-cn-q1-opt0.mp3"
          },
          {
            "id": "ev-cn-q1-b",
            "label": "Mù mịt mây xám",
            "audio": "/media/tts/ev-cn-q1-opt1.mp3"
          },
          {
            "id": "ev-cn-q1-c",
            "label": "Mưa to gió lớn",
            "audio": "/media/tts/ev-cn-q1-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q1-a",
        "explanation": "Đoạn văn viết: 'Mùa thu, bầu trời trong xanh cao vút'.",
        "explanationAudio": "/media/tts/ev-cn-q1-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q2",
        "prompt": "Trong câu trên, cái gì khẽ rơi trên sân trường?",
        "promptAudio": "/media/tts/ev-cn-q2-prompt.mp3",
        "illustration": "/media/images/leaf.svg",
        "options": [
          {
            "id": "ev-cn-q2-a",
            "label": "Những chiếc lá vàng",
            "audio": "/media/tts/ev-cn-q2-opt0.mp3"
          },
          {
            "id": "ev-cn-q2-b",
            "label": "Những hạt mưa rào",
            "audio": "/media/tts/ev-cn-q2-opt1.mp3"
          },
          {
            "id": "ev-cn-q2-c",
            "label": "Những quả táo đỏ",
            "audio": "/media/tts/ev-cn-q2-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q2-a",
        "explanation": "Những chiếc lá vàng khẽ rơi trên sân trường.",
        "explanationAudio": "/media/tts/ev-cn-q2-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q3",
        "prompt": "Chọn từ viết đúng chính tả để điền vào câu: 'Bác Hồ kính ...'",
        "promptAudio": "/media/tts/ev-cn-q3-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-cn-q3-a",
            "label": "yêu",
            "audio": "/media/tts/ev-cn-q3-opt0.mp3"
          },
          {
            "id": "ev-cn-q3-b",
            "label": "iêu",
            "audio": "/media/tts/ev-cn-q3-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q3-a",
        "explanation": "Không có âm đầu viết y dài: 'yêu'.",
        "explanationAudio": "/media/tts/ev-cn-q3-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q4",
        "prompt": "Ghép các từ thành câu hoàn chỉnh: 'chăm chỉ / Bé / học bài'",
        "promptAudio": "/media/tts/ev-cn-q4-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-cn-q4-a",
            "label": "Bé chăm chỉ học bài.",
            "audio": "/media/tts/ev-cn-q4-opt0.mp3"
          },
          {
            "id": "ev-cn-q4-b",
            "label": "Học bài bé chăm chỉ.",
            "audio": "/media/tts/ev-cn-q4-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q4-a",
        "explanation": "Câu hoàn chỉnh: 'Bé chăm chỉ học bài.' có nghĩa rõ ràng.",
        "explanationAudio": "/media/tts/ev-cn-q4-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q5",
        "prompt": "Dấu câu nào dùng để kết thúc một câu kể?",
        "promptAudio": "/media/tts/ev-cn-q5-prompt.mp3",
        "illustration": "/media/images/pencil.svg",
        "options": [
          {
            "id": "ev-cn-q5-a",
            "label": "Dấu chấm (.)",
            "audio": "/media/tts/ev-cn-q5-opt0.mp3"
          },
          {
            "id": "ev-cn-q5-b",
            "label": "Dấu hỏi chấm (?)",
            "audio": "/media/tts/ev-cn-q5-opt1.mp3"
          },
          {
            "id": "ev-cn-q5-c",
            "label": "Dấu chấm than (!)",
            "audio": "/media/tts/ev-cn-q5-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q5-a",
        "explanation": "Cuối câu kể dùng dấu chấm (.) để kết thúc câu.",
        "explanationAudio": "/media/tts/ev-cn-q5-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q6",
        "prompt": "Chữ cái đầu câu phải viết như thế nào?",
        "promptAudio": "/media/tts/ev-cn-q6-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-cn-q6-a",
            "label": "Viết hoa",
            "audio": "/media/tts/ev-cn-q6-opt0.mp3"
          },
          {
            "id": "ev-cn-q6-b",
            "label": "Viết thường",
            "audio": "/media/tts/ev-cn-q6-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q6-a",
        "explanation": "Chữ cái đầu tiên của câu luôn luôn phải viết hoa.",
        "explanationAudio": "/media/tts/ev-cn-q6-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q7",
        "prompt": "Từ nào sau đây là từ ngữ chỉ tình cảm bạn bè thân thiết?",
        "promptAudio": "/media/tts/ev-cn-q7-prompt.mp3",
        "illustration": "/media/images/star.svg",
        "options": [
          {
            "id": "ev-cn-q7-a",
            "label": "Gắn bó, sẻ chia",
            "audio": "/media/tts/ev-cn-q7-opt0.mp3"
          },
          {
            "id": "ev-cn-q7-b",
            "label": "Tranh giành đồ chơi",
            "audio": "/media/tts/ev-cn-q7-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q7-a",
        "explanation": "Bạn bè thân thiết luôn biết gắn bó, yêu thương và sẻ chia.",
        "explanationAudio": "/media/tts/ev-cn-q7-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q8",
        "prompt": "Từ nào chứa vần 'uyên' trong các từ sau?",
        "promptAudio": "/media/tts/ev-cn-q8-prompt.mp3",
        "illustration": "/media/images/boat.svg",
        "options": [
          {
            "id": "ev-cn-q8-a",
            "label": "Kể chuyện",
            "audio": "/media/tts/ev-cn-q8-opt0.mp3"
          },
          {
            "id": "ev-cn-q8-b",
            "label": "Trăng khuyết",
            "audio": "/media/tts/ev-cn-q8-opt1.mp3"
          },
          {
            "id": "ev-cn-q8-c",
            "label": "Mùa xuân",
            "audio": "/media/tts/ev-cn-q8-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q8-a",
        "explanation": "Tiếng chuyện chứa vần uyên.",
        "explanationAudio": "/media/tts/ev-cn-q8-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q9",
        "prompt": "Điền từ: 'Mùa hè, hoa phượng vĩ nở đỏ ... góc sân trường.'",
        "promptAudio": "/media/tts/ev-cn-q9-prompt.mp3",
        "illustration": "/media/images/flower.svg",
        "options": [
          {
            "id": "ev-cn-q9-a",
            "label": "rực",
            "audio": "/media/tts/ev-cn-q9-opt0.mp3"
          },
          {
            "id": "ev-cn-q9-b",
            "label": "lực",
            "audio": "/media/tts/ev-cn-q9-opt1.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q9-a",
        "explanation": "Đỏ rực viết bằng r.",
        "explanationAudio": "/media/tts/ev-cn-q9-exp.mp3"
      },
      {
        "type": "multiple_choice",
        "id": "ev-cn-q10",
        "prompt": "Kết thúc năm học Lớp 1, em sẽ được lên lớp mấy?",
        "promptAudio": "/media/tts/ev-cn-q10-prompt.mp3",
        "illustration": "/media/images/book.svg",
        "options": [
          {
            "id": "ev-cn-q10-a",
            "label": "Lên Lớp 2",
            "audio": "/media/tts/ev-cn-q10-opt0.mp3"
          },
          {
            "id": "ev-cn-q10-b",
            "label": "Lên Lớp 3",
            "audio": "/media/tts/ev-cn-q10-opt1.mp3"
          },
          {
            "id": "ev-cn-q10-c",
            "label": "Học lại mẫu giáo",
            "audio": "/media/tts/ev-cn-q10-opt2.mp3"
          }
        ],
        "correctOptionId": "ev-cn-q10-a",
        "explanation": "Hoàn thành Lớp 1 xuất sắc, em tự tin bước vào Lớp 2!",
        "explanationAudio": "/media/tts/ev-cn-q10-exp.mp3"
      }
    ]
  }
];

export function getExamById(id: string): ExamData | undefined {
  return EXAMS_DATA.find((e) => e.id === id);
}
