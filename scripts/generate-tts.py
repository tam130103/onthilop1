from gtts import gTTS
import os
import shutil

os.makedirs("public/media/tts", exist_ok=True)
os.makedirs("public/media/phonemes", exist_ok=True)

AUDIO_ITEMS = [
    # Math lesson 1 - Common & Intro
    ("public/media/tts/math-title.mp3", "Bé vui học đếm và tính toán. Toán Lớp một, Bài tập khởi động."),
    ("public/media/tts/math-intro.mp3", "Cùng ôn lại các số từ một đến năm. Các con hãy chú ý quan sát và cùng đếm to với cô nhé! Một, hai, ba, bốn, năm."),
    ("public/media/tts/prompt-counting.mp3", "Đếm xem có bao nhiêu quả táo đỏ?"),
    ("public/media/tts/explanation-01.mp3", "Có ba quả táo đỏ. Chúng mình cùng đếm: một, hai, ba!"),
    ("public/media/tts/prompt-compare.mp3", "Số nào lớn hơn: bốn hay hai?"),
    ("public/media/tts/opt-num-2.mp3", "Số hai"),
    ("public/media/tts/opt-num-4.mp3", "Số bốn"),
    ("public/media/tts/opt-num-equal.mp3", "Hai số bằng nhau"),
    ("public/media/tts/exp-compare.mp3", "Số bốn lớn hơn số hai vì bốn nhiều hơn hai đơn vị."),
    ("public/media/tts/prompt-add-2-1.mp3", "Bé hãy tính phép cộng sau: hai cộng một bằng mấy?"),
    ("public/media/tts/exp-add-2-1.mp3", "Hai cộng một bằng ba. Có hai quả táo, thêm một quả là ba quả táo."),
    ("public/media/tts/prompt-counting-fishes.mp3", "Đếm xem có bao nhiêu chú cá đang bơi?"),
    ("public/media/tts/exp-counting-fishes.mp3", "Có tất cả năm chú cá xinh xắn đang bơi dưới nước!"),
    ("public/media/tts/prompt-tools.mp3", "Đâu là đồ dùng học tập của bé?"),
    ("public/media/tts/opt-pencil.mp3", "Bút chì"),
    ("public/media/tts/opt-ball.mp3", "Quả bóng"),
    ("public/media/tts/opt-fish.mp3", "Con cá"),
    ("public/media/tts/exp-tools.mp3", "Chiếc bút chì giúp các con tập viết và vẽ tranh thật đẹp."),
    ("public/media/tts/prompt-sub-5-2.mp3", "Bé hãy tính phép trừ sau: năm trừ hai bằng mấy?"),
    ("public/media/tts/exp-sub-5-2.mp3", "Năm bớt hai còn ba. Phép tính: năm trừ hai bằng ba."),
    ("public/media/tts/prompt-counting-candies.mp3", "Có bao nhiêu viên kẹo ngọt trên màn hình?"),
    ("public/media/tts/exp-counting-candies.mp3", "Có đúng bốn viên kẹo sắc màu thơm ngon!"),
    ("public/media/tts/prompt-add-3-2.mp3", "Bé tính kết quả của phép tính: ba cộng hai bằng mấy?"),
    ("public/media/tts/exp-add-3-2.mp3", "Ba cộng hai bằng năm. Có ba ngôi sao thêm hai ngôi sao là năm ngôi sao."),
    ("public/media/tts/math-congrats.mp3", "Hôm nay các con đã học rất chăm chỉ và đếm số rất giỏi! Cô khen cả lớp chúng mình!"),
    ("public/media/tts/prompt-addition.mp3", "Bé hãy tính kết quả phép tính sau:"),
    ("public/media/tts/prompt-mc.mp3", "Bé hãy chọn đáp án đúng nhất:"),
    ("public/media/tts/prompt-matching.mp3", "Bé hãy nối các ô ở hai cột có nội dung tương ứng với nhau:"),
    ("public/media/tts/prompt-tapplace.mp3", "Chọn âm thích hợp đặt vào chỗ trống để tạo thành từ đúng:"),
    ("public/media/tts/timer-chime.mp3", "Đã hết giờ làm bài, các con dừng bút nhé!"),
    
    # Vietnamese lesson 1 - Phonemes and words
    ("public/media/phonemes/a.mp3", "a"),
    ("public/media/phonemes/b.mp3", "bờ"),
    ("public/media/phonemes/c.mp3", "cờ"),
    ("public/media/phonemes/ba.mp3", "ba"),
    ("public/media/phonemes/bong.mp3", "quả bóng"),
    ("public/media/phonemes/ca.mp3", "con cá"),
    ("public/media/phonemes/ca-co.mp3", "cá cờ"),
    ("public/media/phonemes/o.mp3", "o"),

    # Vietnamese lesson 2 - Blending & Words
    ("public/media/tts/vn2-title.mp3", "Bài hai: Ghép vần và từ ứng dụng. Tiếng Việt Lớp một."),
    ("public/media/tts/vn2-intro.mp3", "Hôm nay chúng ta cùng luyện đọc và ghép các từ ứng dụng: ba ba, con cá, cờ đỏ."),
    ("public/media/tts/prompt-match-words.mp3", "Bé hãy nối từ ở cột bên trái với hình vẽ tương ứng ở cột bên phải:"),
    ("public/media/tts/exp-match-words.mp3", "Rất chính xác! Con cá nối với hình cá, quả bóng nối với hình quả bóng, con ba ba nối với hình con ba ba."),
    ("public/media/tts/word-con-ca.mp3", "con cá"),
    ("public/media/tts/word-qua-bong.mp3", "quả bóng"),
    ("public/media/tts/word-ba-ba.mp3", "ba ba"),
    ("public/media/tts/desc-hinh-ca.mp3", "Hình cá"),
    ("public/media/tts/desc-hinh-bong.mp3", "Hình bóng"),
    ("public/media/tts/desc-hinh-baba.mp3", "Hình con ba ba"),
    ("public/media/tts/prompt-tap-baba.mp3", "Bé hãy chọn âm thích hợp đặt vào chỗ trống để tạo thành từ ba ba:"),
    ("public/media/tts/exp-tap-baba.mp3", "Chính xác! Âm bờ ghép với âm a tạo thành tiếng ba, trong từ ba ba."),
    ("public/media/tts/prompt-mc-co-do.mp3", "Hình ảnh lá cờ đỏ sao vàng ứng với từ ngữ nào?"),
    ("public/media/tts/opt-co-do.mp3", "cờ đỏ"),
    ("public/media/tts/opt-ca-co.mp3", "cá cờ"),
    ("public/media/tts/opt-ba-ba.mp3", "ba ba"),
    ("public/media/tts/exp-co-do.mp3", "Lá cờ đỏ sao vàng là Quốc kỳ thiêng liêng của nước Việt Nam chúng mình."),

    # Math lesson 2 - Addition & 2D Shapes
    ("public/media/tts/math2-title.mp3", "Phép cộng trong phạm vi mười và Làm quen hình phẳng. Toán Lớp một."),
    ("public/media/tts/math2-intro.mp3", "Phép cộng là gộp hai nhóm lại với nhau. Hôm nay chúng mình cùng học cộng và làm quen các hình học nhé!"),
    ("public/media/tts/prompt-shape-square.mp3", "Hình nào dưới đây là hình vuông màu xanh?"),
    ("public/media/tts/opt-shape-square.mp3", "Hình vuông"),
    ("public/media/tts/opt-shape-circle.mp3", "Hình tròn"),
    ("public/media/tts/opt-shape-triangle.mp3", "Hình tam giác"),
    ("public/media/tts/exp-shape-square.mp3", "Hình vuông có bốn cạnh bằng nhau và bốn góc vuông vắn."),
    ("public/media/tts/prompt-add-4-3.mp3", "Bé hãy tính kết quả phép tính: bốn cộng ba bằng mấy?"),
    ("public/media/tts/exp-add-4-3.mp3", "Bốn cộng ba bằng bảy. Bắt đầu từ bốn, đếm thêm ba: năm, sáu, bảy."),
    ("public/media/tts/prompt-mc-equal-6.mp3", "Phép tính nào dưới đây có kết quả bằng sáu?"),
    ("public/media/tts/opt-calc-2-3.mp3", "hai cộng ba"),
    ("public/media/tts/opt-calc-4-2.mp3", "bốn cộng hai"),
    ("public/media/tts/opt-calc-5-3.mp3", "năm cộng ba"),
    ("public/media/tts/opt-calc-1-3.mp3", "một cộng ba"),
    ("public/media/tts/exp-calc-4-2.mp3", "Bốn cộng hai bằng sáu. Bốn thêm hai là sáu."),
    ("public/media/tts/prompt-count-shapes.mp3", "Đếm xem có tất cả bao nhiêu hình tam giác màu vàng?"),
    ("public/media/tts/exp-count-shapes.mp3", "Có tất cả năm hình tam giác màu vàng rực rỡ!"),
    ("public/media/tts/prompt-add-5-5.mp3", "Bé tính kết quả của phép cộng: năm cộng năm bằng mấy?"),
    ("public/media/tts/exp-add-5-5.mp3", "Năm cộng năm bằng mười. Hai bàn tay, mỗi bàn tay có năm ngón tay, cả hai bàn tay có mười ngón tay."),
]

# Legacy/existing WAV filenames to mirror for full compatibility
WAV_MAPPINGS = [
    ("public/media/tts/prompt-counting.mp3", "public/media/tts/prompt-counting.wav"),
    ("public/media/tts/prompt-mc.mp3", "public/media/tts/prompt-mc.wav"),
    ("public/media/tts/prompt-addition.mp3", "public/media/tts/prompt-addition.wav"),
    ("public/media/tts/explanation-01.mp3", "public/media/tts/explanation-01.wav"),
    ("public/media/tts/prompt-matching.mp3", "public/media/tts/prompt-matching.wav"),
    ("public/media/tts/prompt-tapplace.mp3", "public/media/tts/prompt-tapplace.wav"),
    ("public/media/tts/timer-chime.mp3", "public/media/tts/timer-chime.wav"),
    ("public/media/phonemes/a.mp3", "public/media/phonemes/a.wav"),
    ("public/media/phonemes/b.mp3", "public/media/phonemes/b.wav"),
    ("public/media/phonemes/c.mp3", "public/media/phonemes/c.wav"),
    ("public/media/phonemes/ba.mp3", "public/media/phonemes/ba.wav"),
    ("public/media/phonemes/bong.mp3", "public/media/phonemes/bong.wav"),
    ("public/media/phonemes/ca.mp3", "public/media/phonemes/ca.wav"),
    ("public/media/phonemes/ca-co.mp3", "public/media/phonemes/ca-co.wav"),
    ("public/media/phonemes/o.mp3", "public/media/phonemes/o.wav"),
]

def main():
    print(f"🎙️  Checking and generating {len(AUDIO_ITEMS)} real Vietnamese voiceover files...\n")
    generated = 0
    for path, text in AUDIO_ITEMS:
        if not os.path.exists(path):
            tts = gTTS(text, lang='vi')
            tts.save(path)
            size = os.path.getsize(path)
            print(f"   ✅ [NEW] {path} ({size:,} bytes) -> \"{text}\"")
            generated += 1
        else:
            print(f"   ⏩ [EXISTS] {path}")

    print(f"\n🔄 Mirroring to WAV filenames...")
    for src, dst in WAV_MAPPINGS:
        if os.path.exists(src):
            shutil.copyfile(src, dst)

    print(f"\n🎉 Successfully verified audio! (Generated {generated} new files)")

if __name__ == "__main__":
    main()
