# -*- coding: utf-8 -*-
"""
Specifications for Vietnamese Lessons 31 to 40 (10 lessons completing phonics & reading comprehension).
"""

def get_vn_batch5_specs():
    specs = [
        # 31. Vần an, ăn, ân
        {
            "num": 31, "id": "vn-31-van-an-an-an", "title": "Bài 31: Các vần an, ăn, ân",
            "desc": "Luyện đọc và ghép vần kết thúc bằng n: an, ăn, ân trong từ cái bàn, khăn quàng, sân chơi.",
            "note": "Phân biệt nguyên âm chính a, ă, â khi đi cùng âm cuối n.",
            "intro_title": "Nhà vần kết thúc bằng n: an, ăn, ân",
            "intro_body": "Hôm nay chúng mình cùng làm quen với ba vần vui nhộn: vần an trong cái bàn, vần ăn trong khăn quàng, vần ân trong sân trường.",
            "bullets": ["a - n - an: cái bàn, bạn bè", "ă - n - ăn: khăn quàng, con trăn", "â - n - ân: sân trường, bàn chân"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v31-q1", "prompt": "Tiếng 'bàn' trong 'cái bàn' chứa vần gì?", "ill": "/media/images/book.svg",
                    "options": [("v31-opt-an", "Vần an", True), ("v31-opt-an2", "Vần ăn", False), ("v31-opt-an3", "Vần ân", False)],
                    "exp": "Tiếng bàn gồm âm b ghép với vần an và dấu huyền."
                },
                {
                    "type": "multiple_choice", "id": "v31-q2", "prompt": "Từ nào dưới đây chứa vần 'ăn'?", "ill": "/media/images/book.svg",
                    "options": [("v31-opt2-khan", "Khăn quàng", True), ("v31-opt2-san", "Sân trường", False), ("v31-opt2-ban", "Bạn bè", False)],
                    "exp": "Từ 'khăn quàng' chứa tiếng khăn có vần ăn."
                },
                {
                    "type": "matching", "id": "v31-q3", "prompt": "Nối từ ngữ với vần tương ứng:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("v31-l1", "Cái bàn", "v31-r1", "Chứa vần an"),
                        ("v31-l2", "Con trăn", "v31-r2", "Chứa vần ăn"),
                        ("v31-l3", "Sân chơi", "v31-r3", "Chứa vần ân")
                    ],
                    "exp": "Bàn vần an; trăn vần ăn; sân vần ân."
                },
                {
                    "type": "tap_place", "id": "v31-q4", "prompt": "Ghép vần thích hợp vào chỗ trống: 'Các bạn chơi đùa trên s... trường.'", "ill": "/media/images/house.svg",
                    "target": ("v31-t1", "...", "Trên s", " trường."),
                    "items": [("v31-i1", "ân"), ("v31-i2", "an")], "correct_item": "v31-i1",
                    "exp": "Ghép vần ân vào âm s tạo thành tiếng sân: 'sân trường'."
                },
                {
                    "type": "counting", "id": "v31-q5", "prompt": "Đếm xem có bao nhiêu cuốn sách trên bàn học?", "ill": "/media/images/book.svg",
                    "count": 4, "img": "/media/images/book.svg", "exp": "Có đúng 4 cuốn sách trên bàn học."
                },
                {
                    "type": "multiple_choice", "id": "v31-q6", "prompt": "Câu nào sau đây viết đúng chính tả?", "ill": "/media/images/book.svg",
                    "options": [("v31-opt6-dung", "Bé đeo khăn quàng đỏ đi học.", True), ("v31-opt6-sai", "Bé đeo khan quàng đỏ đi học.", False)],
                    "exp": "Viết đúng là 'khăn quàng đỏ'."
                }
            ]
        },

        # 32. Vần on, ôn, ơn
        {
            "num": 32, "id": "vn-32-van-on-on-on", "title": "Bài 32: Các vần on, ôn, ơn",
            "desc": "Luyện đọc các vần on, ôn, ơn trong từ con cá, chim sơn ca, ôn bài.",
            "note": "Chú ý khẩu hình miệng mở tròn với o, khép hơn với ô và bè ngang với ơ.",
            "intro_title": "Nhà vần tròn môi: on, ôn, ơn",
            "intro_body": "Cùng lắng nghe tiếng chim sơn ca hót véo von nhé! Vần on trong nón lá, vần ôn trong ôn bài, vần ơn trong cảm ơn.",
            "bullets": ["o - n - on: con cá, nón lá", "ô - n - ôn: ôn bài, thủ môn", "ơ - n - ơn: sơn ca, cảm ơn"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v32-q1", "prompt": "Tiếng 'nón' trong 'nón lá' chứa vần gì?", "ill": "/media/images/leaf.svg",
                    "options": [("v32-opt-on", "Vần on", True), ("v32-opt-on2", "Vần ôn", False), ("v32-opt-on3", "Vần ơn", False)],
                    "exp": "Tiếng nón chứa vần on."
                },
                {
                    "type": "matching", "id": "v32-q2", "prompt": "Nối tiếng với vần tương ứng:", "ill": "/media/images/bird.svg",
                    "pairs": [
                        ("v32-l1", "Tiếng con", "v32-r1", "Vần on"),
                        ("v32-l2", "Tiếng môn", "v32-r2", "Vần ôn"),
                        ("v32-l3", "Tiếng sơn", "v32-r3", "Vần ơn")
                    ],
                    "exp": "Con vần on; môn vần ôn; sơn vần ơn."
                },
                {
                    "type": "tap_place", "id": "v32-q3", "prompt": "Chọn tiếng điền vào câu: 'Chim ... ca hót líu lo trên cành.'", "ill": "/media/images/bird.svg",
                    "target": ("v32-t1", "...", "Chim ", " ca hót líu lo."),
                    "items": [("v32-i1", "sơn"), ("v32-i2", "son")], "correct_item": "v32-i1",
                    "exp": "Điền tiếng 'sơn' tạo thành từ 'chim sơn ca'."
                },
                {
                    "type": "multiple_choice", "id": "v32-q4", "prompt": "Từ nào sau đây thể hiện phép lịch sự khi được giúp đỡ?", "ill": "/media/images/star.svg",
                    "options": [("v32-opt4-camon", "Cảm ơn", True), ("v32-opt4-onbai", "Ôn bài", False), ("v32-opt4-conca", "Con cá", False)],
                    "exp": "Khi được người khác giúp đỡ, em nói lời 'Cảm ơn'."
                },
                {
                    "type": "counting", "id": "v32-q5", "prompt": "Đếm xem có bao nhiêu chú chim sơn ca đang hót?", "ill": "/media/images/bird.svg",
                    "count": 3, "img": "/media/images/bird.svg", "exp": "Có đúng 3 chú chim sơn ca."
                },
                {
                    "type": "multiple_choice", "id": "v32-q6", "prompt": "Vần nào xuất hiện trong cả hai từ 'thủ môn' và 'bồn hoa'?", "ill": "/media/images/flower.svg",
                    "options": [("v32-opt6-on", "Vần ôn", True), ("v32-opt6-onb", "Vần on", False), ("v32-opt6-onc", "Vần ơn", False)],
                    "exp": "Môn và bồn đều chứa vần ôn."
                }
            ]
        },

        # 33. Vần en, ên, in
        {
            "num": 33, "id": "vn-33-van-en-en-in", "title": "Bài 33: Các vần en, ên, in",
            "desc": "Luyện đọc các vần en, ên, in trong từ hoa sen, mũi tên, đèn pin, con nhím.",
            "note": "Rèn phát âm chuẩn âm cuối n không lẫn sang ng.",
            "intro_title": "Nhà vần en, ên, in",
            "intro_body": "Búp sen thơm ngát trong đầm mang vần en. Cây nến lung linh mang vần ên. Chiếc đèn pin soi sáng mang vần in. Cùng khám phá nhé!",
            "bullets": ["e - n - en: hoa sen, dế mèn", "ê - n - ên: mũi tên, con sên", "i - n - in: đèn pin, niềm tin"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v33-q1", "prompt": "Tiếng 'sen' trong 'hoa sen' chứa vần gì?", "ill": "/media/images/flower.svg",
                    "options": [("v33-opt-en", "Vần en", True), ("v33-opt-en2", "Vần ên", False), ("v33-opt-in", "Vần in", False)],
                    "exp": "Tiếng sen gồm âm s và vần en."
                },
                {
                    "type": "matching", "id": "v33-q2", "prompt": "Nối từ với hình ảnh vần phù hợp:", "ill": "/media/images/flower.svg",
                    "pairs": [
                        ("v33-l1", "Hoa sen", "v33-r1", "Vần en thanh mát"),
                        ("v33-l2", "Mũi tên", "v33-r2", "Vần ên thẳng tắp"),
                        ("v33-l3", "Đèn pin", "v33-r3", "Vần in sáng rực")
                    ],
                    "exp": "Hoa sen vần en; mũi tên vần ên; đèn pin vần in."
                },
                {
                    "type": "tap_place", "id": "v33-q3", "prompt": "Điền vần thích hợp vào câu: 'Bé thắp ngọn n... lung linh.'", "ill": "/media/images/star.svg",
                    "target": ("v33-t1", "...", "Ngọn n", " lung linh."),
                    "items": [("v33-i1", "ến"), ("v33-i2", "in")], "correct_item": "v33-i1",
                    "exp": "Điền vần ến tạo thành tiếng 'nến'."
                },
                {
                    "type": "multiple_choice", "id": "v33-q4", "prompt": "Con vật nào sau đây mang vần 'en' trong tên gọi?", "ill": "/media/images/cat.svg",
                    "options": [("v33-opt4-demen", "Chú dế mèn", True), ("v33-opt4-conmeo", "Con mèo", False), ("v33-opt4-contho", "Con thỏ", False)],
                    "exp": "Dế mèn có tiếng mèn chứa vần en."
                },
                {
                    "type": "counting", "id": "v33-q5", "prompt": "Đếm xem có bao nhiêu bông hoa sen nở trong hồ?", "ill": "/media/images/flower.svg",
                    "count": 5, "img": "/media/images/flower.svg", "exp": "Có đúng 5 bông hoa sen nở ngát hương."
                },
                {
                    "type": "multiple_choice", "id": "v33-q6", "prompt": "Từ nào chứa tiếng có vần 'in'?", "ill": "/media/images/pencil.svg",
                    "options": [("v33-opt6-denpin", "Đèn pin", True), ("v33-opt6-muiten", "Mũi tên", False), ("v33-opt6-hoasen", "Hoa sen", False)],
                    "exp": "Từ 'đèn pin' chứa tiếng pin mang vần in."
                }
            ]
        },

        # 34. Vần am, ăm, âm
        {
            "num": 34, "id": "vn-34-van-am-am-am", "title": "Bài 34: Các vần am, ăm, âm",
            "desc": "Luyện phát âm các vần kết thúc bằng m: am, ăm, âm trong từ quả cam, chăm chỉ, cây nấm.",
            "note": "Khi phát âm âm cuối m, hai môi khép kín lại nhẹ nhàng.",
            "intro_title": "Nhà vần khép môi: am, ăm, âm",
            "intro_body": "Quả cam ngọt lành mang vần am. Bé chăm chỉ học bài mang vần ăm. Cây nấm sau mưa mang vần âm. Cùng phát âm khép môi thật xinh nhé!",
            "bullets": ["a - m - am: quả cam, hàm răng", "ă - m - ăm: chăm chỉ, bắp tằm", "â - m - âm: cây nấm, mầm non"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v34-q1", "prompt": "Tiếng 'cam' trong 'quả cam' chứa vần gì?", "ill": "/media/images/apple.svg",
                    "options": [("v34-opt-am", "Vần am", True), ("v34-opt-am2", "Vần ăm", False), ("v34-opt-am3", "Vần âm", False)],
                    "exp": "Tiếng cam gồm âm c ghép với vần am."
                },
                {
                    "type": "matching", "id": "v34-q2", "prompt": "Nối từ với vần phù hợp:", "ill": "/media/images/leaf.svg",
                    "pairs": [
                        ("v34-l1", "Quả cam", "v34-r1", "Chứa vần am"),
                        ("v34-l2", "Chăm chỉ", "v34-r2", "Chứa vần ăm"),
                        ("v34-l3", "Cây nấm", "v34-r3", "Chứa vần âm")
                    ],
                    "exp": "Cam vần am; chăm vần ăm; nấm vần âm."
                },
                {
                    "type": "tap_place", "id": "v34-q3", "prompt": "Điền từ: 'Mùa xuân đến, hạt thóc nảy ... non xanh biếc.'", "ill": "/media/images/leaf.svg",
                    "target": ("v34-t1", "...", "Nảy ", " non."),
                    "items": [("v34-i1", "mầm"), ("v34-i2", "nấm")], "correct_item": "v34-i1",
                    "exp": "Hạt thóc nảy mầm non."
                },
                {
                    "type": "multiple_choice", "id": "v34-q4", "prompt": "Khi phát âm các vần kết thúc bằng âm 'm', môi của em như thế nào?", "ill": "/media/images/star.svg",
                    "options": [("v34-opt4-khep", "Hai môi khép lại", True), ("v34-opt4-mo", "Môi mở to tròn", False)],
                    "exp": "Âm m là âm khép môi nhẹ nhàng."
                },
                {
                    "type": "counting", "id": "v34-q5", "prompt": "Đếm xem có bao nhiêu cây nấm nhỏ mọc ven rừng?", "ill": "/media/images/leaf.svg",
                    "count": 6, "img": "/media/images/leaf.svg", "exp": "Có đúng 6 cây nấm nhỏ xinh."
                },
                {
                    "type": "multiple_choice", "id": "v34-q6", "prompt": "Từ nào dưới đây khen ngợi bạn học sinh siêng năng?", "ill": "/media/images/book.svg",
                    "options": [("v34-opt6-chamchi", "Chăm chỉ", True), ("v34-opt6-quacam", "Quả cam", False), ("v34-opt6-caynam", "Cây nấm", False)],
                    "exp": "'Chăm chỉ' là đức tính siêng năng, cần cù."
                }
            ]
        },

        # 35. Vần om, ôm, em
        {
            "num": 35, "id": "vn-35-van-om-om-em", "title": "Bài 35: Các vần om, ôm, em",
            "desc": "Luyện đọc các vần om, ôm, em trong từ đom đóm, con tôm, con tem, que kem.",
            "note": "Phân biệt vần om tròn môi, ôm chúm môi và em bè môi.",
            "intro_title": "Nhà vần om, ôm, em",
            "intro_body": "Đêm hè chú đom đóm thắp đèn mang vần om. Con tôm nhảy tanh tách mang vần ôm. Chiếc que kem mát lạnh mang vần em.",
            "bullets": ["o - m - om: đom đóm, làng xóm", "ô - m - ôm: con tôm, ôm ấp", "e - m - em: que kem, con tem"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v35-q1", "prompt": "Từ 'đom đóm' chứa vần gì?", "ill": "/media/images/star.svg",
                    "options": [("v35-opt-om", "Vần om", True), ("v35-opt-om2", "Vần ôm", False), ("v35-opt-em", "Vần em", False)],
                    "exp": "Đom đóm chứa vần om."
                },
                {
                    "type": "matching", "id": "v35-q2", "prompt": "Nối tiếng với vần phù hợp:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("v35-l1", "Tiếng tôm", "v35-r1", "Vần ôm"),
                        ("v35-l2", "Tiếng xóm", "v35-r2", "Vần om"),
                        ("v35-l3", "Tiếng kem", "v35-r3", "Vần em")
                    ],
                    "exp": "Tôm vần ôm; xóm vần om; kem vần em."
                },
                {
                    "type": "tap_place", "id": "v35-q3", "prompt": "Điền từ: 'Mùa hè bé thích ăn que ... mát lạnh.'", "ill": "/media/images/milk.svg",
                    "target": ("v35-t1", "...", "Ăn que ", " mát lạnh."),
                    "items": [("v35-i1", "kem"), ("v35-i2", "cơm")], "correct_item": "v35-i1",
                    "exp": "Ăn que kem mát lạnh."
                },
                {
                    "type": "multiple_choice", "id": "v35-q4", "prompt": "Con vật nào bơi lùi trong nước và chứa vần 'ôm'?", "ill": "/media/images/star.svg",
                    "options": [("v35-opt4-contom", "Con tôm", True), ("v35-opt4-conca", "Con cá", False), ("v35-opt4-conrua", "Con rùa", False)],
                    "exp": "Con tôm có tiếng tôm mang vần ôm."
                },
                {
                    "type": "counting", "id": "v35-q5", "prompt": "Đếm xem có bao nhiêu chú đom đóm đang phát sáng?", "ill": "/media/images/star.svg",
                    "count": 5, "img": "/media/images/star.svg", "exp": "Có đúng 5 chú đom đóm lấp lánh."
                },
                {
                    "type": "multiple_choice", "id": "v35-q6", "prompt": "Cặp từ nào dưới đây cùng chứa vần 'em'?", "ill": "/media/images/book.svg",
                    "options": [("v35-opt6-kemtem", "Que kem, con tem", True), ("v35-opt6-tomca", "Con tôm, con cá", False)],
                    "exp": "Kem và tem đều chứa vần em."
                }
            ]
        },

        # 36. Vần ac, ăc, at, ăt
        {
            "num": 36, "id": "vn-36-van-ac-at", "title": "Bài 36: Các vần ac, ăc, at, ăt",
            "desc": "Luyện đọc các vần kết thúc bằng âm c và âm t trong từ chim hạc, hạt thóc, mặt trời.",
            "note": "Âm cuối c bật hơi nhẹ ở cuống họng, âm cuối t đầu lưỡi chạm lợi trên.",
            "intro_title": "Nhà vần có c và t",
            "intro_body": "Con hạc trắng bay vút mang vần ac. Hạt thóc vàng óng mang vần at. Mặt trời ban mai ấm áp mang vần ăt. Cùng luyện đọc thật chuẩn nhé!",
            "bullets": ["a - c - ac: con hạc, ca nhạc", "ă - c - ăc: con tắc kè, lắc lư", "a - t - at: hạt thóc, ca hát", "ă - t - ăt: mặt trời, cắt tỉa"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v36-q1", "prompt": "Tiếng 'hạc' trong 'chim hạc' chứa vần gì?", "ill": "/media/images/bird.svg",
                    "options": [("v36-opt-ac", "Vần ac", True), ("v36-opt-at", "Vần at", False), ("v36-opt-ac2", "Vần ăc", False)],
                    "exp": "Tiếng hạc chứa vần ac."
                },
                {
                    "type": "multiple_choice", "id": "v36-q2", "prompt": "Tiếng 'mặt' trong 'mặt trời' chứa vần gì?", "ill": "/media/images/star.svg",
                    "options": [("v36-opt2-at", "Vần ăt", True), ("v36-opt2-at2", "Vần at", False), ("v36-opt2-ac", "Vần ăc", False)],
                    "exp": "Tiếng mặt chứa vần ăt."
                },
                {
                    "type": "matching", "id": "v36-q3", "prompt": "Nối từ với vần tương ứng:", "ill": "/media/images/bird.svg",
                    "pairs": [
                        ("v36-l1", "Chim hạc", "v36-r1", "Vần ac"),
                        ("v36-l2", "Hạt thóc", "v36-r2", "Vần at"),
                        ("v36-l3", "Mặt trời", "v36-r3", "Vần ăt")
                    ],
                    "exp": "Hạc vần ac; hạt vần at; mặt vần ăt."
                },
                {
                    "type": "tap_place", "id": "v36-q4", "prompt": "Điền từ: 'Bác nông dân gặt những h... thóc vàng tươi.'", "ill": "/media/images/leaf.svg",
                    "target": ("v36-t1", "...", "Những h", " thóc vàng."),
                    "items": [("v36-i1", "ạt"), ("v36-i2", "ạc")], "correct_item": "v36-i1",
                    "exp": "Hạt thóc chứa vần at."
                },
                {
                    "type": "counting", "id": "v36-q5", "prompt": "Đếm xem có bao nhiêu chú chim hạc đang bay?", "ill": "/media/images/bird.svg",
                    "count": 4, "img": "/media/images/bird.svg", "exp": "Có đúng 4 chú chim hạc."
                },
                {
                    "type": "multiple_choice", "id": "v36-q6", "prompt": "Từ nào chứa tiếng có vần 'ăc'?", "ill": "/media/images/star.svg",
                    "options": [("v36-opt6-tacke", "Tắc kè", True), ("v36-opt6-hathoc", "Hạt thóc", False), ("v36-opt6-chimhac", "Chim hạc", False)],
                    "exp": "Tắc kè có tiếng tắc chứa vần ăc."
                }
            ]
        },

        # 37. Vần oc, ôc, ot, ôt
        {
            "num": 37, "id": "vn-37-van-oc-ot", "title": "Bài 37: Các vần oc, ôc, ot, ôt",
            "desc": "Luyện đọc các vần tròn môi đi cùng c và t trong từ con cóc, ốc bươu, quả nhót, cột cờ.",
            "note": "Phân biệt oc/ôc (vần c) và ot/ôt (vần t).",
            "intro_title": "Nhà vần oc, ôc, ot, ôt",
            "intro_body": "Chú cóc tía ngồi học bài mang vần oc. Chú ốc bươu bò thong thả mang vần ôc. Cột cờ đỏ sao vàng mang vần ôt.",
            "bullets": ["o - c - oc: con cóc, đi học", "ô - c - ôc: con ốc, gốc cây", "o - t - ot: hót líu lo, quả nhót", "ô - t - ôt: cột cờ, tốt bụng"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v37-q1", "prompt": "Tiếng 'học' trong 'đi học' chứa vần gì?", "ill": "/media/images/book.svg",
                    "options": [("v37-opt-oc", "Vần oc", True), ("v37-opt-oc2", "Vần ôc", False), ("v37-opt-ot", "Vần ot", False)],
                    "exp": "Tiếng học chứa vần oc."
                },
                {
                    "type": "multiple_choice", "id": "v37-q2", "prompt": "Tiếng 'cột' trong 'cột cờ' chứa vần gì?", "ill": "/media/images/star.svg",
                    "options": [("v37-opt2-ot", "Vần ôt", True), ("v37-opt2-ot2", "Vần ot", False), ("v37-opt2-oc", "Vần ôc", False)],
                    "exp": "Tiếng cột chứa vần ôt."
                },
                {
                    "type": "matching", "id": "v37-q3", "prompt": "Nối từ với vần phù hợp:", "ill": "/media/images/book.svg",
                    "pairs": [
                        ("v37-l1", "Đi học", "v37-r1", "Vần oc chăm chỉ"),
                        ("v37-l2", "Con ốc", "v37-r2", "Vần ôc chậm chạp"),
                        ("v37-l3", "Cột cờ", "v37-r3", "Vần ôt sừng sững")
                    ],
                    "exp": "Học vần oc; ốc vần ôc; cột vần ôt."
                },
                {
                    "type": "tap_place", "id": "v37-q4", "prompt": "Điền từ: 'Chim sơn ca h... líu lo trên cành.'", "ill": "/media/images/bird.svg",
                    "target": ("v37-t1", "...", "Chim sơn ca h", " líu lo."),
                    "items": [("v37-i1", "ót"), ("v37-i2", "ọc")], "correct_item": "v37-i1",
                    "exp": "Hót líu lo mang vần ot."
                },
                {
                    "type": "counting", "id": "v37-q5", "prompt": "Đếm xem có bao nhiêu chú ốc nhỏ đang bò?", "ill": "/media/images/leaf.svg",
                    "count": 4, "img": "/media/images/leaf.svg", "exp": "Có đúng 4 chú ốc nhỏ xinh."
                },
                {
                    "type": "multiple_choice", "id": "v37-q6", "prompt": "Từ nào sau đây mang vần 'ôc'?", "ill": "/media/images/house.svg",
                    "options": [("v37-opt6-goccay", "Gốc cây", True), ("v37-opt6-dihoc", "Đi học", False), ("v37-opt6-cotco", "Cột cờ", False)],
                    "exp": "Gốc cây có tiếng gốc chứa vần ôc."
                }
            ]
        },

        # 38. Vần ang, ăng, anh, inh
        {
            "num": 38, "id": "vn-38-van-ang-anh", "title": "Bài 38: Các vần ang, ăng, anh, inh",
            "desc": "Luyện đọc các vần ngân vang kết thúc bằng ng và nh trong từ măng tre, cành chanh, bình hoa.",
            "note": "Âm ng ngân vang ở vòm họng; âm nh lướt nhẹ mặt lưỡi.",
            "intro_title": "Nhà vần ngân vang: ang, ăng, anh, inh",
            "intro_body": "Tiếng chuông ngân vang mang vần ang. Cây măng vươn thẳng mang vần ăng. Cành chanh trĩu quả mang vần anh. Bình hoa thơm ngát mang vần inh.",
            "bullets": ["a - ng - ang: vầng trăng, ngân vang", "ă - ng - ăng: măng tre, cố gắng", "a - nh - anh: cành cây, quả chanh", "i - nh - inh: bình hoa, lung linh"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v38-q1", "prompt": "Tiếng 'măng' trong 'măng tre' chứa vần gì?", "ill": "/media/images/leaf.svg",
                    "options": [("v38-opt-ang", "Vần ăng", True), ("v38-opt-ang2", "Vần ang", False), ("v38-opt-anh", "Vần anh", False)],
                    "exp": "Tiếng măng chứa vần ăng."
                },
                {
                    "type": "multiple_choice", "id": "v38-q2", "prompt": "Từ nào sau đây chứa vần 'inh'?", "ill": "/media/images/flower.svg",
                    "options": [("v38-opt2-binhhoa", "Bình hoa", True), ("v38-opt2-canhchanh", "Cành chanh", False), ("v38-opt2-vang", "Ngân vang", False)],
                    "exp": "Bình hoa có tiếng bình chứa vần inh."
                },
                {
                    "type": "matching", "id": "v38-q3", "prompt": "Nối từ ngữ với vần tương ứng:", "ill": "/media/images/flower.svg",
                    "pairs": [
                        ("v38-l1", "Cành chanh", "v38-r1", "Chứa vần anh"),
                        ("v38-l2", "Măng tre", "v38-r2", "Chứa vần ăng"),
                        ("v38-l3", "Bình hoa", "v38-r3", "Chứa vần inh")
                    ],
                    "exp": "Chanh vần anh; măng vần ăng; bình vần inh."
                },
                {
                    "type": "tap_place", "id": "v38-q4", "prompt": "Điền vần: 'Buổi tối, vầng tr... tròn vành vạnh chiếu sáng sân nhà.'", "ill": "/media/images/star.svg",
                    "target": ("v38-t1", "...", "Vầng tr", " tròn sáng."),
                    "items": [("v38-i1", "ăng"), ("v38-i2", "anh")], "correct_item": "v38-i1",
                    "exp": "Vầng trăng chứa vần ăng."
                },
                {
                    "type": "counting", "id": "v38-q5", "prompt": "Đếm xem có bao nhiêu cành hoa tươi trong bình?", "ill": "/media/images/flower.svg",
                    "count": 5, "img": "/media/images/flower.svg", "exp": "Có đúng 5 cành hoa tươi khoe sắc."
                },
                {
                    "type": "multiple_choice", "id": "v38-q6", "prompt": "Từ nào miêu tả ngôi sao lấp lánh và chứa vần 'inh'?", "ill": "/media/images/star.svg",
                    "options": [("v38-opt6-lunglinh", "Lung linh", True), ("v38-opt6-sangto", "Sáng tỏ", False), ("v38-opt6-laplanh", "Lấp lánh", False)],
                    "exp": "'Lung linh' có tiếng linh chứa vần inh."
                }
            ]
        },

        # 39. Vần nguyên âm đôi: iêc, iên, iêu, yêu
        {
            "num": 39, "id": "vn-39-van-iec-ieu", "title": "Bài 39: Các vần iêc, iên, iêu, yêu",
            "desc": "Luyện đọc các vần nguyên âm đôi phong phú: cánh diều, cô tiên, làm việc, tình yêu thương.",
            "note": "iê đổi thành yê khi không có âm đầu (yêu, yến, yên).",
            "intro_title": "Thế giới vần nguyên âm đôi",
            "intro_body": "Cánh diều bay lượn trên bầu trời mang vần iêu. Cô tiên hiền từ mang vần iên. Bé chăm chỉ làm việc mang vần iêc. Tình yêu gia đình mang vần yêu.",
            "bullets": ["i - ê - u - iêu: cánh diều, buổi chiều", "i - ê - n - iên: cô tiên, biển cả", "y - ê - u - yêu: yêu quý, đáng yêu", "Quy tắc: không có âm đầu viết y (yêu, yên)"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v39-q1", "prompt": "Từ 'cánh diều' chứa vần gì?", "ill": "/media/images/star.svg",
                    "options": [("v39-opt-ieu", "Vần iêu", True), ("v39-opt-ien", "Vần iên", False), ("v39-opt-iec", "Vần iêc", False)],
                    "exp": "Cánh diều có tiếng diều chứa vần iêu."
                },
                {
                    "type": "multiple_choice", "id": "v39-q2", "prompt": "Khi vần 'iêu' không có âm đầu đứng trước, vần được viết là gì?", "ill": "/media/images/pencil.svg",
                    "options": [("v39-opt2-yeu", "Viết là yêu", True), ("v39-opt2-ieu", "Viết là iêu", False)],
                    "exp": "Không có âm đầu thì chữ i ngắn đổi thành y dài: 'yêu'."
                },
                {
                    "type": "matching", "id": "v39-q3", "prompt": "Nối từ ngữ với vần nguyên âm đôi phù hợp:", "ill": "/media/images/star.svg",
                    "pairs": [
                        ("v39-l1", "Cánh diều", "v39-r1", "Chứa vần iêu"),
                        ("v39-l2", "Cô tiên", "v39-r2", "Chứa vần iên"),
                        ("v39-l3", "Yêu quý", "v39-r3", "Chứa vần yêu")
                    ],
                    "exp": "Diều vần iêu; tiên vần iên; yêu vần yêu."
                },
                {
                    "type": "tap_place", "id": "v39-q4", "prompt": "Điền từ: 'Mỗi buổi sáng bố mẹ chăm chỉ làm ...'", "ill": "/media/images/house.svg",
                    "target": ("v39-t1", "...", "Chăm chỉ làm ", "."),
                    "items": [("v39-i1", "việc"), ("v39-i2", "tiên")], "correct_item": "v39-i1",
                    "exp": "Làm việc có tiếng việc chứa vần iêc."
                },
                {
                    "type": "counting", "id": "v39-q5", "prompt": "Đếm xem có bao nhiêu cánh diều đang bay trên đồng cỏ?", "ill": "/media/images/bird.svg",
                    "count": 4, "img": "/media/images/bird.svg", "exp": "Có đúng 4 cánh diều no gió."
                },
                {
                    "type": "multiple_choice", "id": "v39-q6", "prompt": "Từ nào dưới đây nói về biển cả bao la?", "ill": "/media/images/boat.svg",
                    "options": [("v39-opt6-bienca", "Biển cả", True), ("v39-opt6-canhsua", "Cánh đồng", False)],
                    "exp": "Biển cả có tiếng biển chứa vần iên."
                }
            ]
        },

        # 40. Đọc hiểu đoạn văn: Quê hương tươi đẹp
        {
            "num": 40, "id": "vn-40-doc-hieu-que-huong", "title": "Bài 40: Đọc hiểu Đoạn văn — Quê hương tươi đẹp",
            "desc": "Luyện đọc đoạn văn 40-50 chữ ca ngợi vẻ đẹp quê hương, rèn kỹ năng trả lời câu hỏi đọc hiểu.",
            "note": "Khép lại toàn bộ 40 bài giảng Tiếng Việt Lớp 1, chuẩn bị sẵn sàng cho các kỳ thi định kỳ.",
            "intro_title": "Quê hương tươi đẹp của em",
            "intro_body": "Quê hương em có con sông xanh mát uốn quanh xóm làng. Những cánh đồng lúa chín vàng trĩu hạt dập dờn theo gió. Em yêu tha thiết quê hương em.",
            "bullets": ["Đọc trơn lưu loát, ngắt nghỉ đúng dấu câu", "Hiểu nội dung vẻ đẹp của quê hương", "Bồi đắp tình yêu gia đình, làng quê và Tổ quốc"],
            "questions": [
                {
                    "type": "multiple_choice", "id": "v40-q1", "prompt": "Trong đoạn văn, con sông quê hương có đặc điểm gì?", "ill": "/media/images/boat.svg",
                    "options": [("v40-opt-song", "Xanh mát uốn quanh xóm làng", True), ("v40-opt-duc", "Nước đục ngầu", False), ("v40-opt-can", "Khô cạn", False)],
                    "exp": "Đoạn văn viết: 'Quê hương em có con sông xanh mát uốn quanh xóm làng'."
                },
                {
                    "type": "multiple_choice", "id": "v40-q2", "prompt": "Cánh đồng lúa chín có màu gì?", "ill": "/media/images/leaf.svg",
                    "options": [("v40-opt2-vang", "Vàng trĩu hạt", True), ("v40-opt2-xanh", "Xanh ngắt", False), ("v40-opt2-do", "Đỏ thẫm", False)],
                    "exp": "Cánh đồng lúa chín vàng trĩu hạt dập dờn theo gió."
                },
                {
                    "type": "matching", "id": "v40-q3", "prompt": "Nối hình ảnh quê hương với miêu tả tương ứng:", "ill": "/media/images/house.svg",
                    "pairs": [
                        ("v40-l1", "Dòng sông quê", "v40-r1", "Nước trong xanh uốn lượn"),
                        ("v40-l2", "Cánh đồng lúa", "v40-r2", "Chín vàng thơm ngát"),
                        ("v40-l3", "Tình cảm của em", "v40-r3", "Yêu tha thiết quê hương")
                    ],
                    "exp": "Dòng sông xanh, cánh đồng lúa vàng, em yêu tha thiết quê hương."
                },
                {
                    "type": "tap_place", "id": "v40-q4", "prompt": "Điền từ: 'Em ... tha thiết quê hương em.'", "ill": "/media/images/star.svg",
                    "target": ("v40-t1", "...", "Em ", " tha thiết quê hương."),
                    "items": [("v40-i1", "yêu"), ("v40-i2", "thích")], "correct_item": "v40-i1",
                    "exp": "Câu văn chuẩn là: 'Em yêu tha thiết quê hương em'."
                },
                {
                    "type": "counting", "id": "v40-q5", "prompt": "Đếm xem có bao nhiêu chiếc thuyền nhỏ xuôi dòng sông?", "ill": "/media/images/boat.svg",
                    "count": 3, "img": "/media/images/boat.svg", "exp": "Có đúng 3 chiếc thuyền nhỏ êm đềm."
                },
                {
                    "type": "multiple_choice", "id": "v40-q6", "prompt": "Đoạn văn trên khuyên chúng mình điều gì?", "ill": "/media/images/house.svg",
                    "options": [("v40-opt6-yeu", "Yêu quý và giữ gìn quê hương tươi đẹp", True), ("v40-opt6-pha", "Chặt phá cây xanh", False)],
                    "exp": "Đoạn văn bồi đắp lòng tự hào và tình yêu quê hương đất nước."
                }
            ]
        }
    ]
    return specs
