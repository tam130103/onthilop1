# -*- coding: utf-8 -*-
"""
Master Builder for Batch 5 (Math 31-48, VN 31-40) and 8 Period Exams.
Generates lesson JSONs, exam-data.ts, synthesizes TTS audios via gTTS, and updates manifest.
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

os.makedirs(LESSONS_DIR, exist_ok=True)
os.makedirs(TTS_DIR, exist_ok=True)

# 1. Load existing manifest
manifest = {}
if os.path.exists(MANIFEST_PATH):
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

audio_to_generate = {}

def reg_audio(rel_path, text):
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

# 2. Build Math Lessons 31-48
from data_batch5_math import get_math_batch5_specs
from data_batch5_vn import get_vn_batch5_specs
from data_exams import get_exams_specs

math_specs = get_math_batch5_specs()
vn_specs = get_vn_batch5_specs()
exam_specs = get_exams_specs()

print(f"Loaded {len(math_specs)} Math specs (31-48), {len(vn_specs)} VN specs (31-40), and {len(exam_specs)} Exam specs.")

def build_lesson(spec, subject):
    num = spec["num"]
    prefix = "m" if subject == "math" else "vn"
    slides = [
        {
            "type": "title-slide",
            "id": f"{prefix}{num}-title-slide",
            "title": spec["title"],
            "subtitle": "Bài học tương tác — Lớp 1",
            "teacherNote": spec["note"],
            "backgroundImage": "/media/images/star.svg",
            "audio": reg_audio(f"/media/tts/{prefix}{num}-title.mp3", f"{spec['title']}. Bài học tương tác lớp 1")
        },
        {
            "type": "content-slide",
            "id": f"{prefix}{num}-intro-slide",
            "title": spec["intro_title"],
            "body": spec["intro_body"],
            "teacherNote": spec["note"],
            "illustration": "/media/images/book.svg" if subject == "vietnamese" else "/media/images/star.svg",
            "audio": reg_audio(f"/media/tts/{prefix}{num}-intro.mp3", f"{spec['intro_title']}. {spec['intro_body']}"),
            "bullets": spec["bullets"]
        }
    ]

    for q_idx, q in enumerate(spec["questions"], start=1):
        qtype = q["type"]
        qid = q["id"]
        q_obj = None

        if qtype == "multiple_choice":
            q_obj = {
                "type": "multiple_choice",
                "id": f"{qid}-mc",
                "prompt": q["prompt"],
                "promptAudio": reg_audio(f"/media/tts/{qid}-prompt.mp3", q["prompt"]),
                "illustration": q["ill"],
                "options": [
                    {
                        "id": opt[0],
                        "label": opt[1],
                        "audio": reg_audio(f"/media/tts/{qid}-opt{idx}.mp3", opt[1])
                    }
                    for idx, opt in enumerate(q["options"])
                ],
                "correctOptionId": next(opt[0] for opt in q["options"] if opt[2]),
                "explanation": q["exp"],
                "explanationAudio": reg_audio(f"/media/tts/{qid}-exp.mp3", q["exp"])
            }
        elif qtype == "number_select":
            q_obj = {
                "type": "number_select",
                "id": f"{qid}-num",
                "prompt": q["prompt"],
                "promptAudio": reg_audio(f"/media/tts/{qid}-prompt.mp3", q["prompt"]),
                "illustration": q["ill"],
                "expression": q["expr"],
                "choices": q["choices"],
                "correctAnswer": q["ans"],
                "explanation": q["exp"],
                "explanationAudio": reg_audio(f"/media/tts/{qid}-exp.mp3", q["exp"])
            }
        elif qtype == "counting":
            q_obj = {
                "type": "counting",
                "id": f"{qid}-cnt",
                "prompt": q["prompt"],
                "promptAudio": reg_audio(f"/media/tts/{qid}-prompt.mp3", q["prompt"]),
                "illustration": q["ill"],
                "items": [
                    {
                        "image": q["img"],
                        "alt": f"Hình {i+1}"
                    }
                    for i in range(q["count"])
                ],
                "correctCount": q["count"],
                "numberRange": {"min": 1, "max": max(10, q["count"] + 2)},
                "explanation": q["exp"],
                "explanationAudio": reg_audio(f"/media/tts/{qid}-exp.mp3", q["exp"])
            }
        elif qtype == "tap_place":
            q_obj = {
                "type": "tap_place",
                "id": f"{qid}-tap",
                "prompt": q["prompt"],
                "promptAudio": reg_audio(f"/media/tts/{qid}-prompt.mp3", q["prompt"]),
                "illustration": q["ill"],
                "targets": [
                    {"id": q["target"][0], "label": q["target"][1], "prefixText": q["target"][2], "suffixText": q["target"][3]}
                ],
                "items": [
                    {"id": it_id, "label": it_lbl, "audio": reg_audio(f"/media/tts/{qid}-it{idx}.mp3", it_lbl)}
                    for idx, (it_id, it_lbl) in enumerate(q["items"])
                ],
                "correctMapping": {q["correct_item"]: q["target"][0]},
                "explanation": q["exp"],
                "explanationAudio": reg_audio(f"/media/tts/{qid}-exp.mp3", q["exp"])
            }
        elif qtype == "matching":
            q_obj = {
                "type": "matching",
                "id": f"{qid}-match",
                "prompt": q["prompt"],
                "promptAudio": reg_audio(f"/media/tts/{qid}-prompt.mp3", q["prompt"]),
                "illustration": q["ill"],
                "leftColumn": [
                    {"id": p[0], "label": p[1], "audio": reg_audio(f"/media/tts/{qid}-l{idx}.mp3", p[1])}
                    for idx, p in enumerate(q["pairs"])
                ],
                "rightColumn": [
                    {"id": p[2], "label": p[3], "audio": reg_audio(f"/media/tts/{qid}-r{idx}.mp3", p[3])}
                    for idx, p in enumerate(q["pairs"])
                ],
                "correctPairs": [
                    {"leftId": p[0], "rightId": p[2]} for p in q["pairs"]
                ],
                "explanation": q["exp"],
                "explanationAudio": reg_audio(f"/media/tts/{qid}-exp.mp3", q["exp"])
            }

        slides.append({
            "type": "question-slide",
            "id": f"{prefix}{num}-slide-q{q_idx}",
            "teacherNote": f"Câu hỏi {q_idx}: {q['prompt'][:40]}",
            "question": q_obj,
            "timeLimitSeconds": 25 if qtype != "matching" else 30,
            "showRetryOnWrong": True
        })

    lesson = {
        "status": "publish",
        "mode": "publish",
        "id": spec["id"],
        "title": spec["title"],
        "subject": subject,
        "grade": 1,
        "description": spec["desc"],
        "totalDurationMinutes": 25,
        "slides": slides
    }
    return lesson

# Save Math lessons 31-48
for spec in math_specs:
    fn = f"math-lesson-{spec['num']:02d}.json"
    lesson_data = build_lesson(spec, "math")
    with open(os.path.join(LESSONS_DIR, fn), "w", encoding="utf-8") as f:
        json.dump(lesson_data, f, ensure_ascii=False, indent=2)
    print(f"Saved {fn}")

# Save VN lessons 31-40
for spec in vn_specs:
    fn = f"vn-lesson-{spec['num']:02d}.json"
    lesson_data = build_lesson(spec, "vietnamese")
    with open(os.path.join(LESSONS_DIR, fn), "w", encoding="utf-8") as f:
        json.dump(lesson_data, f, ensure_ascii=False, indent=2)
    print(f"Saved {fn}")

# 3. Build Exam Data & exam-data.ts
exam_ts_objects = []
for exam in exam_specs:
    built_questions = []
    for q_idx, q in enumerate(exam["questions"], start=1):
        qid = q["id"]
        correct_opt_id = next(opt[0] for opt in q["options"] if opt[2])
        built_q = {
            "type": "multiple_choice",
            "id": qid,
            "prompt": q["prompt"],
            "promptAudio": reg_audio(f"/media/tts/{qid}-prompt.mp3", q["prompt"]),
            "illustration": q["ill"],
            "options": [
                {
                    "id": opt[0],
                    "label": opt[1],
                    "audio": reg_audio(f"/media/tts/{qid}-opt{idx}.mp3", opt[1])
                }
                for idx, opt in enumerate(q["options"])
            ],
            "correctOptionId": correct_opt_id,
            "explanation": q["exp"],
            "explanationAudio": reg_audio(f"/media/tts/{qid}-exp.mp3", q["exp"])
        }
        built_questions.append(built_q)

    exam_obj = {
        "id": exam["id"],
        "title": exam["title"],
        "subject": exam["subject"],
        "term": exam["term"],
        "termLabel": exam["termLabel"],
        "icon": exam["icon"],
        "durationMinutes": exam["durationMinutes"],
        "description": exam["description"],
        "questions": built_questions
    }
    exam_ts_objects.append(exam_obj)

exam_ts_path = os.path.join(ROOT_DIR, "src", "data", "exam-data.ts")
with open(exam_ts_path, "w", encoding="utf-8") as f:
    f.write("/* eslint-disable */\n")
    f.write("import type { Question } from '@/schemas/content.schema';\n\n")
    f.write("export interface ExamData {\n")
    f.write("  id: string;\n")
    f.write("  title: string;\n")
    f.write("  subject: 'math' | 'vietnamese';\n")
    f.write("  term: string;\n")
    f.write("  termLabel: string;\n")
    f.write("  icon: string;\n")
    f.write("  durationMinutes: number;\n")
    f.write("  description: string;\n")
    f.write("  questions: Question[];\n")
    f.write("}\n\n")
    f.write("export const EXAMS_DATA: ExamData[] = " + json.dumps(exam_ts_objects, ensure_ascii=False, indent=2) + ";\n\n")
    f.write("export function getExamById(id: string): ExamData | undefined {\n")
    f.write("  return EXAMS_DATA.find((e) => e.id === id);\n")
    f.write("}\n")

print(f"Saved {exam_ts_path} with {len(exam_ts_objects)} exams.")

# 4. Multithreaded TTS Generation
print(f"Total audio files needing generation: {len(audio_to_generate)}")

def generate_one_tts(item):
    fs_path, text = item
    os.makedirs(os.path.dirname(fs_path), exist_ok=True)
    if os.path.exists(fs_path) and os.path.getsize(fs_path) > 0:
        return True, fs_path

    speak_text = str(text or "").strip()
    if not speak_text:
        speak_text = "Đáp án"

    p_map = {
        ">": "lớn hơn", "<": "bé hơn", "=": "bằng",
        "+": "cộng", "-": "trừ",
        "cm": "xăng ti mét", "kg": "ki-lô-gam", "dm": "đề-xi-mét",
        "an": "an", "ăn": "ăn", "ân": "ân",
        "on": "on", "ôn": "ôn", "ơn": "ơn",
        "en": "en", "ên": "ên", "in": "in",
        "am": "am", "ăm": "ăm", "âm": "âm",
        "om": "om", "ôm": "ôm", "em": "em",
        "ac": "ac", "ăc": "ắc", "at": "at", "ăt": "ắt",
        "oc": "oc", "ôc": "ốc", "ot": "ot", "ôt": "ốt",
        "ang": "ang", "ăng": "ăng", "anh": "anh", "inh": "inh",
        "iêc": "iếc", "iên": "iên", "iêu": "iêu", "yêu": "yêu"
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

max_threads = 12
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
