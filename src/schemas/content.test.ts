import { describe, it, expect } from 'vitest';
import {
  DraftLessonSchema,
  PublishLessonSchema,
  LessonSchema,
} from './content.schema';

// ---- Fixtures ----

function makeValidBase(status: 'draft' | 'publish', slides: unknown[], subject: 'math' | 'vietnamese' = 'math') {
  return {
    status,
    id: 'lesson-01',
    title: 'Bài học lớp 1',
    subject,
    grade: 1,
    slides,
  };
}

describe('Zod Content Schema - 5 Question Types & superRefine', () => {
  it('validates 1. multiple_choice question (valid)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-1',
        question: {
          type: 'multiple_choice',
          id: 'q1',
          prompt: '2 + 1 = ?',
          promptAudio: '',
          illustration: '',
          options: [
            { id: 'opt1', label: '2' },
            { id: 'opt2', label: '3' },
          ],
          correctOptionId: 'opt2',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(true);
  });

  it('validates 2. counting question (valid)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-2',
        question: {
          type: 'counting',
          id: 'q2',
          prompt: 'Đếm số con cá',
          promptAudio: '',
          illustration: '',
          items: [{ image: '', alt: 'Cá 1' }],
          correctCount: 1,
          numberRange: { min: 0, max: 5 },
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(true);
  });

  it('validates 3. number_select question (valid)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-3',
        question: {
          type: 'number_select',
          id: 'q3',
          prompt: 'Chọn số',
          promptAudio: '',
          illustration: '',
          expression: '1 + 4 = ?',
          choices: [4, 5, 6],
          correctAnswer: 5,
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(true);
  });

  it('validates 4. tap_place question (valid with correctMapping)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-4',
        question: {
          type: 'tap_place',
          id: 'q4',
          prompt: 'Kéo thả quả táo vào đĩa',
          promptAudio: '',
          illustration: '',
          targets: [
            { id: 'plate1', label: 'Đĩa 1' },
            { id: 'plate2', label: 'Đĩa 2' },
          ],
          items: [
            { id: 'apple1', label: 'Quả táo đỏ' },
            { id: 'apple2', label: 'Quả táo xanh' },
          ],
          correctMapping: {
            apple1: 'plate1',
            apple2: 'plate2',
          },
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(true);
  });

  it('fails 4. tap_place with invalid itemId in correctMapping via superRefine', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-4',
        question: {
          type: 'tap_place',
          id: 'q4',
          prompt: 'Kéo thả',
          promptAudio: '',
          illustration: '',
          targets: [{ id: 'plate1', label: 'Đĩa 1' }],
          items: [{ id: 'apple1', label: 'Quả táo' }],
          correctMapping: {
            nonExistentItem: 'plate1',
          },
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('invalid itemId');
    }
  });

  it('fails 4. tap_place with invalid targetId in correctMapping via superRefine', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-4',
        question: {
          type: 'tap_place',
          id: 'q4',
          prompt: 'Kéo thả',
          promptAudio: '',
          illustration: '',
          targets: [{ id: 'plate1', label: 'Đĩa 1' }],
          items: [{ id: 'apple1', label: 'Quả táo' }],
          correctMapping: {
            apple1: 'nonExistentPlate',
          },
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('invalid targetId');
    }
  });

  it('validates 5. matching question (valid with correctPairs)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-5',
        question: {
          type: 'matching',
          id: 'q5',
          prompt: 'Nối số với chữ tương ứng',
          promptAudio: '',
          illustration: '',
          leftColumn: [
            { id: 'left-1', label: 'Số 1' },
            { id: 'left-2', label: 'Số 2' },
          ],
          rightColumn: [
            { id: 'right-one', label: 'Một' },
            { id: 'right-two', label: 'Hai' },
          ],
          correctPairs: [
            { leftId: 'left-1', rightId: 'right-one' },
            { leftId: 'left-2', rightId: 'right-two' },
          ],
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(true);
  });

  it('fails 5. matching with invalid leftId in correctPairs via superRefine', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-5',
        question: {
          type: 'matching',
          id: 'q5',
          prompt: 'Nối',
          promptAudio: '',
          illustration: '',
          leftColumn: [
            { id: 'left-1', label: 'Số 1' },
            { id: 'left-2', label: 'Số 2' },
          ],
          rightColumn: [
            { id: 'right-one', label: 'Một' },
            { id: 'right-two', label: 'Hai' },
          ],
          correctPairs: [
            { leftId: 'wrong-left', rightId: 'right-one' },
            { leftId: 'left-2', rightId: 'right-two' },
          ],
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('invalid leftId');
    }
  });

  it('fails 5. matching with invalid rightId in correctPairs via superRefine', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-5',
        question: {
          type: 'matching',
          id: 'q5',
          prompt: 'Nối',
          promptAudio: '',
          illustration: '',
          leftColumn: [
            { id: 'left-1', label: 'Số 1' },
            { id: 'left-2', label: 'Số 2' },
          ],
          rightColumn: [
            { id: 'right-one', label: 'Một' },
            { id: 'right-two', label: 'Hai' },
          ],
          correctPairs: [
            { leftId: 'left-1', rightId: 'wrong-right' },
            { leftId: 'left-2', rightId: 'right-two' },
          ],
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('invalid rightId');
    }
  });

  it('validates vietnamese subject, phonics-slide, and flashcard-slide', () => {
    const vnLesson = makeValidBase('draft', [
      {
        type: 'phonics-slide',
        id: 'ps-1',
        title: 'Bảng Ghép Vần',
        initials: ['b', 'c'],
        rhymes: ['a', 'o'],
      },
      {
        type: 'flashcard-slide',
        id: 'fc-1',
        title: 'Thẻ chữ cái',
        cards: [
          {
            id: 'c-1',
            frontText: 'A a',
            backText: 'Quả na',
          },
        ],
      },
    ], 'vietnamese');

    const res = LessonSchema.safeParse(vnLesson);
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.subject).toBe('vietnamese');
    }
  });

  it('validates tap_place and matching logic checking functions', () => {
    // tap_place checking logic: itemId -> targetId
    const correctMapping: Record<string, string> = { item1: 'targetA', item2: 'targetB' };
    const placedCorrect: Record<string, string> = { targetA: 'item1', targetB: 'item2' };
    const placedWrong: Record<string, string> = { targetA: 'item2', targetB: 'item1' };

    function checkTapPlace(placed: Record<string, string>) {
      for (const itemId of Object.keys(correctMapping)) {
        const expectedTarget = correctMapping[itemId];
        if (!expectedTarget || placed[expectedTarget] !== itemId) return false;
      }
      return true;
    }

    expect(checkTapPlace(placedCorrect)).toBe(true);
    expect(checkTapPlace(placedWrong)).toBe(false);

    // matching checking logic:
    const correctPairs = [{ leftId: 'L1', rightId: 'R1' }, { leftId: 'L2', rightId: 'R2' }];
    function checkMatching(pairs: Array<{ leftId: string; rightId: string }>) {
      if (pairs.length !== correctPairs.length) return false;
      return pairs.every((p) =>
        correctPairs.some((cp) => cp.leftId === p.leftId && cp.rightId === p.rightId)
      );
    }

    expect(checkMatching([{ leftId: 'L1', rightId: 'R1' }, { leftId: 'L2', rightId: 'R2' }])).toBe(true);
    expect(checkMatching([{ leftId: 'L1', rightId: 'R2' }, { leftId: 'L2', rightId: 'R1' }])).toBe(false);
  });

  it('fails matching when leftId is paired more than once (violates 1-to-1)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-matching-dup-left',
        question: {
          type: 'matching',
          id: 'q-dup-left',
          prompt: 'Nối một-một',
          promptAudio: '',
          illustration: '',
          leftColumn: [
            { id: 'left-1', label: 'L1' },
            { id: 'left-2', label: 'L2' },
          ],
          rightColumn: [
            { id: 'right-1', label: 'R1' },
            { id: 'right-2', label: 'R2' },
          ],
          correctPairs: [
            { leftId: 'left-1', rightId: 'right-1' },
            { leftId: 'left-1', rightId: 'right-2' }, // duplicate leftId!
          ],
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('Matching một-một');
    }
  });

  it('fails matching when rightId is paired more than once (violates 1-to-1)', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-matching-dup-right',
        question: {
          type: 'matching',
          id: 'q-dup-right',
          prompt: 'Nối một-một',
          promptAudio: '',
          illustration: '',
          leftColumn: [
            { id: 'left-1', label: 'L1' },
            { id: 'left-2', label: 'L2' },
          ],
          rightColumn: [
            { id: 'right-1', label: 'R1' },
            { id: 'right-2', label: 'R2' },
          ],
          correctPairs: [
            { leftId: 'left-1', rightId: 'right-1' },
            { leftId: 'left-2', rightId: 'right-1' }, // duplicate rightId!
          ],
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('Matching một-một');
    }
  });

  it('fails when duplicate slide IDs exist in a lesson', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'title-slide',
        id: 'same-slide-id',
        title: 'Tiêu đề 1',
      },
      {
        type: 'content-slide',
        id: 'same-slide-id',
        title: 'Nội dung 2',
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain("Slide ID 'same-slide-id' bị trùng lặp");
    }
  });

  it('fails when duplicate question IDs exist across question slides', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'slide-1',
        question: {
          type: 'multiple_choice',
          id: 'same-question-id',
          prompt: 'Câu 1',
          promptAudio: '',
          illustration: '',
          options: [{ id: 'o1', label: 'A' }, { id: 'o2', label: 'B' }],
          correctOptionId: 'o1',
        },
      },
      {
        type: 'question-slide',
        id: 'slide-2',
        question: {
          type: 'multiple_choice',
          id: 'same-question-id',
          prompt: 'Câu 2',
          promptAudio: '',
          illustration: '',
          options: [{ id: 'o3', label: 'C' }, { id: 'o4', label: 'D' }],
          correctOptionId: 'o3',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain("Question ID 'same-question-id' bị trùng lặp");
    }
  });

  it('fails multiple_choice with duplicate option IDs', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-mc-dup',
        question: {
          type: 'multiple_choice',
          id: 'q-mc-dup',
          prompt: 'Chọn',
          promptAudio: '',
          illustration: '',
          options: [
            { id: 'opt-1', label: 'Option 1' },
            { id: 'opt-1', label: 'Option 2' },
          ],
          correctOptionId: 'opt-1',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain("Option ID 'opt-1' bị trùng lặp");
    }
  });

  it('fails number_select with duplicate choices', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-ns-dup',
        question: {
          type: 'number_select',
          id: 'q-ns-dup',
          prompt: 'Chọn',
          promptAudio: '',
          illustration: '',
          expression: '1 + 1 = ?',
          choices: [2, 2, 3],
          correctAnswer: 2,
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('choices không được trùng lặp');
    }
  });

  // ---- LUẬT PUBLISH: Bắt buộc Audio & Đáp án có chữ phải có Audio ----
  it('fails Publish mode when multiple_choice option has text but lacks audio', () => {
    const lesson = makeValidBase('publish', [
      {
        type: 'question-slide',
        id: 'qs-pub-fail',
        question: {
          type: 'multiple_choice',
          id: 'q-pub-mc',
          prompt: 'Chọn số lớn hơn',
          promptAudio: '/media/tts/prompt-mc.mp3',
          illustration: '/media/images/star.svg',
          options: [
            { id: 'opt-1', label: 'Số 3', audio: '/media/tts/opt-pencil.mp3' },
            { id: 'opt-2', label: 'Số 5' }, // Thiếu audio!
          ],
          correctOptionId: 'opt-2',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('Luật Publish: Đáp án có chữ');
    }
  });

  it('passes Draft mode when multiple_choice option has text but no audio', () => {
    const lesson = makeValidBase('draft', [
      {
        type: 'question-slide',
        id: 'qs-draft-ok',
        question: {
          type: 'multiple_choice',
          id: 'q-draft-mc',
          prompt: 'Chọn số lớn hơn',
          promptAudio: '',
          illustration: '',
          options: [
            { id: 'opt-1', label: 'Số 3' },
            { id: 'opt-2', label: 'Số 5' },
          ],
          correctOptionId: 'opt-2',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(true);
  });

  it('fails Publish mode when matching column items lack audio', () => {
    const lesson = makeValidBase('publish', [
      {
        type: 'question-slide',
        id: 'qs-pub-match-fail',
        question: {
          type: 'matching',
          id: 'q-pub-match',
          prompt: 'Nối chữ',
          promptAudio: '/media/tts/prompt-matching.mp3',
          illustration: '/media/images/pencil.svg',
          leftColumn: [
            { id: 'L1', label: 'Chữ A', audio: '/media/phonemes/a.mp3' },
            { id: 'L2', label: 'Chữ B' }, // Thiếu audio!
          ],
          rightColumn: [
            { id: 'R1', label: 'Quả bóng', audio: '/media/phonemes/bong.mp3' },
            { id: 'R2', label: 'Con cá', audio: '/media/phonemes/ca.mp3' },
          ],
          correctPairs: [
            { leftId: 'L1', rightId: 'R1' },
            { leftId: 'L2', rightId: 'R2' },
          ],
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('Luật Publish: Mục nối');
    }
  });

  it('fails Publish mode when promptAudio is empty', () => {
    const lesson = makeValidBase('publish', [
      {
        type: 'question-slide',
        id: 'qs-pub-empty-audio',
        question: {
          type: 'multiple_choice',
          id: 'q-pub-no-prompt-audio',
          prompt: 'Câu hỏi',
          promptAudio: '', // Rỗng khi publish!
          illustration: '/media/images/star.svg',
          options: [
            { id: 'opt-1', label: 'A', audio: '/media/phonemes/a.mp3' },
            { id: 'opt-2', label: 'B', audio: '/media/phonemes/b.mp3' },
          ],
          correctOptionId: 'opt-1',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
  });

  it('fails when using forbidden .wav format', () => {
    const lesson = makeValidBase('publish', [
      {
        type: 'question-slide',
        id: 'qs-wav-fail',
        question: {
          type: 'multiple_choice',
          id: 'q-wav-mc',
          prompt: 'Câu hỏi',
          promptAudio: '/media/tts/test.wav',
          illustration: '/media/images/star.svg',
          options: [
            { id: 'opt-1', label: 'A', audio: '/media/phonemes/a.mp3' },
            { id: 'opt-2', label: 'B', audio: '/media/phonemes/b.mp3' },
          ],
          correctOptionId: 'opt-1',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('Cấm định dạng .wav');
    }
  });

  it('fails Publish mode when two different text labels share the same audio file', () => {
    const lesson = makeValidBase('publish', [
      {
        type: 'question-slide',
        id: 'qs-shared-audio-fail',
        question: {
          type: 'multiple_choice',
          id: 'q-shared-audio',
          prompt: 'Chọn âm đúng',
          promptAudio: '/media/tts/prompt-mc.mp3',
          illustration: '/media/images/star.svg',
          options: [
            { id: 'opt-ba', label: 'ba', audio: '/media/phonemes/ba.mp3' },
            { id: 'opt-ba-sac', label: 'bá', audio: '/media/phonemes/ba.mp3' }, // Trùng audio với label 'ba'!
          ],
          correctOptionId: 'opt-ba-sac',
        },
      },
    ]);
    const res = LessonSchema.safeParse(lesson);
    expect(res.success).toBe(false);
    if (!res.success) {
      const msg = res.error.issues.map((i) => i.message).join(' ');
      expect(msg).toContain('không được dùng chung audio');
    }
  });
});
