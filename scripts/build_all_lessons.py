# -*- coding: utf-8 -*-
"""
Master Content Generator & TTS Builder for Grade 1 Interactive Curriculum.
Builds Math 07-20 and VN 07-20 (total 28 new lessons + 12 existing = 40 lessons).
Generates TTS voiceovers via gTTS, creates manifest mappings, and writes JSON files.
"""
import os
import sys
import json
import time
import concurrent.futures
from gtts import gTTS

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LESSONS_DIR = os.path.join(ROOT_DIR, "content", "lessons")
MANIFEST_PATH = os.path.join(ROOT_DIR, "scripts", "tts-manifest.json")
TTS_DIR = os.path.join(ROOT_DIR, "public", "media", "tts")
PHONEMES_DIR = os.path.join(ROOT_DIR, "public", "media", "phonemes")

os.makedirs(LESSONS_DIR, exist_ok=True)
os.makedirs(TTS_DIR, exist_ok=True)
os.makedirs(PHONEMES_DIR, exist_ok=True)

# 1. Load existing manifest
manifest = {}
if os.path.exists(MANIFEST_PATH):
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

audio_to_generate = {}

def reg_audio(rel_path, text):
    """Register audio path and text."""
    if not rel_path or not isinstance(rel_path, str):
        return rel_path
    
    clean = rel_path.strip()
    if clean.startswith("public/"):
        clean = "/" + clean[len("public/"):]
    elif not clean.startswith("/"):
        clean = "/" + clean
    
    clean_text = str(text or "").strip()
    if not clean_text:
        return clean

    pub_path = "public" + clean
    manifest[clean] = clean_text
    manifest[pub_path] = clean_text
    manifest[clean.lstrip("/")] = clean_text

    full_fs = os.path.join(ROOT_DIR, "public", clean.lstrip("/").replace("/", os.sep))
    if not os.path.exists(full_fs) or os.path.getsize(full_fs) == 0:
        audio_to_generate[full_fs] = clean_text

    return clean

# 2. Import lesson sets
from lessons_math_data import get_math_lessons
from lessons_math_part2 import get_math_lessons_part2
from lessons_vn_data import get_vn_lessons

math_lessons = []
math_lessons.extend(get_math_lessons())
math_lessons.extend(get_math_lessons_part2())
vn_lessons = get_vn_lessons()

print(f"Loaded {len(math_lessons)} Math lessons (07-20) and {len(vn_lessons)} VN lessons (07-20).")

# 3. Process & Normalize Lessons
def process_lesson(lesson, filename):
    for s_idx, slide in enumerate(lesson.get("slides", [])):
        stype = slide.get("type")
        if stype == "title-slide":
            text = f"{slide.get('title', '')}. {slide.get('subtitle', '')}".strip()
            if slide.get("audio"):
                slide["audio"] = reg_audio(slide["audio"], text or slide.get("title", ""))
        elif stype == "content-slide":
            text = f"{slide.get('title', '')}. {slide.get('body', '')}".strip()
            if slide.get("audio"):
                slide["audio"] = reg_audio(slide["audio"], text or slide.get("title", ""))
        elif stype == "question-slide":
            q = slide.get("question", {})
            qtype = q.get("type")
            qid = q.get("id", f"q{s_idx}")

            if not q.get("illustration"):
                q["illustration"] = "/media/images/star.svg"

            # Prompt & explanation
            if not q.get("promptAudio"):
                q["promptAudio"] = f"/media/tts/{qid}-prompt.mp3"
            q["promptAudio"] = reg_audio(q["promptAudio"], q.get("prompt", ""))

            if q.get("explanation"):
                if not q.get("explanationAudio"):
                    q["explanationAudio"] = f"/media/tts/{qid}-exp.mp3"
                q["explanationAudio"] = reg_audio(q["explanationAudio"], q.get("explanation", ""))

            # Multiple choice
            if qtype in ["multiple_choice", "multiple-choice"]:
                if "correctOptionId" not in q:
                    for opt in q.get("options", []):
                        if opt.get("isCorrect"):
                            q["correctOptionId"] = opt["id"]
                            break
                for o_idx, opt in enumerate(q.get("options", [])):
                    opt.pop("isCorrect", None)
                    if "text" in opt and "label" not in opt:
                        opt["label"] = opt["text"]
                    if not opt.get("label"):
                        opt["label"] = f"Đáp án {o_idx + 1}"
                    if not opt.get("audio"):
                        opt["audio"] = f"/media/tts/{qid}-opt{o_idx}.mp3"
                    opt["audio"] = reg_audio(opt["audio"], opt.get("label", ""))

            # Tap place
            elif qtype == "tap_place":
                for it_idx, item in enumerate(q.get("items", [])):
                    if "text" in item and "label" not in item:
                        item["label"] = item["text"]
                    if not item.get("label"):
                        item["label"] = f"Thẻ {it_idx + 1}"
                    if not item.get("audio"):
                        item["audio"] = f"/media/tts/{qid}-it{it_idx}.mp3"
                    item["audio"] = reg_audio(item["audio"], item.get("label", ""))

                for tgt in q.get("targets", []):
                    if "prefix" in tgt and "prefixText" not in tgt:
                        tgt["prefixText"] = tgt.pop("prefix")
                    if "suffix" in tgt and "suffixText" not in tgt:
                        tgt["suffixText"] = tgt.pop("suffix")
                    if not tgt.get("label"):
                        tgt["label"] = "..."
                    if tgt.get("audio"):
                        tgt["audio"] = reg_audio(tgt["audio"], tgt.get("label", ""))

                # Ensure correctMapping maps itemId -> targetId
                item_ids = {it["id"] for it in q.get("items", [])}
                target_ids = {tgt["id"] for tgt in q.get("targets", [])}
                new_mapping = {}
                for k, v in q.get("correctMapping", {}).items():
                    if k in item_ids and v in target_ids:
                        new_mapping[k] = v
                    elif v in item_ids and k in target_ids:
                        new_mapping[v] = k
                    else:
                        new_mapping[k] = v
                q["correctMapping"] = new_mapping

            # Matching
            elif qtype == "matching":
                for c_idx, item in enumerate(q.get("leftColumn", [])):
                    if "text" in item and "label" not in item:
                        item["label"] = item["text"]
                    if not item.get("label"):
                        item["label"] = f"Vế {c_idx + 1}"
                    if not item.get("audio"):
                        item["audio"] = f"/media/tts/{qid}-l{c_idx}.mp3"
                    item["audio"] = reg_audio(item["audio"], item.get("label", ""))

                for c_idx, item in enumerate(q.get("rightColumn", [])):
                    if "text" in item and "label" not in item:
                        item["label"] = item["text"]
                    if not item.get("label"):
                        item["label"] = f"Vế {c_idx + 1}"
                    if not item.get("audio"):
                        item["audio"] = f"/media/tts/{qid}-r{c_idx}.mp3"
                    item["audio"] = reg_audio(item["audio"], item.get("label", ""))

            # Number select
            elif qtype in ["number_select", "number-select"]:
                pass

    # Save to JSON
    dest_path = os.path.join(LESSONS_DIR, filename)
    with open(dest_path, "w", encoding="utf-8") as f:
        json.dump(lesson, f, ensure_ascii=False, indent=2)
    print(f"Saved: {filename}")

# Process math lessons 07 to 20
for idx, lesson in enumerate(math_lessons, start=7):
    filename = f"math-lesson-{idx:02d}.json"
    process_lesson(lesson, filename)

# Process VN lessons 07 to 20
for idx, lesson in enumerate(vn_lessons, start=7):
    filename = f"vn-lesson-{idx:02d}.json"
    process_lesson(lesson, filename)

print(f"Total audio files needing generation: {len(audio_to_generate)}")

# 4. Multithreaded TTS Generation
def generate_one_tts(item):
    fs_path, text = item
    os.makedirs(os.path.dirname(fs_path), exist_ok=True)
    if os.path.exists(fs_path) and os.path.getsize(fs_path) > 0:
        return True, fs_path

    speak_text = str(text or "").strip()
    if not speak_text:
        speak_text = "Đáp án"

    # Pronunciation map for mathematical symbols, numbers, phonemes
    p_map = {
        ">": "lớn hơn", "<": "bé hơn", "=": "bằng",
        "+": "cộng", "-": "trừ",
        "d": "dờ", "đ": "đờ", "b": "bờ", "c": "cờ", "k": "ca",
        "g": "gờ", "l": "lờ", "n": "nờ", "m": "mờ", "p": "pờ",
        "ph": "phờ", "qu": "quờ", "r": "rờ", "s": "sờ", "x": "xờ",
        "t": "tờ", "th": "thờ", "v": "vờ", "y": "i dài",
        "ă": "á", "â": "ớ", "ê": "ê", "ô": "ô", "ơ": "ơ", "ư": "ư"
    }
    if speak_text.strip().lower() in p_map:
        speak_text = p_map[speak_text.strip().lower()]

    for attempt in range(3):
        try:
            tts = gTTS(text=speak_text, lang="vi", slow=False)
            tts.save(fs_path)
            return True, fs_path
        except Exception as e:
            time.sleep(1)
            if attempt == 2:
                print(f"Failed {fs_path}: {e}")
                return False, fs_path

max_threads = 8
if audio_to_generate:
    print(f"Starting TTS generation with {max_threads} threads for {len(audio_to_generate)} files...")
    start_time = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_threads) as executor:
        results = list(executor.map(generate_one_tts, audio_to_generate.items()))
    succ = sum(1 for ok, _ in results if ok)
    print(f"Generated {succ}/{len(audio_to_generate)} TTS files in {time.time() - start_time:.2f}s")

# 5. Save Manifest
with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"Updated {MANIFEST_PATH} with {len(manifest)} total entries.")
