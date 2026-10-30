import { z } from 'zod';

// ---- Media Reference ----
type MediaRefType = z.ZodType<string>;

const mediaRefDraft: MediaRefType = z
  .string()
  .refine((s) => !s.toLowerCase().endsWith('.wav'), {
    message: 'Cấm định dạng .wav! Phải dùng .mp3 cho âm thanh',
  });

const mediaRefPublish: MediaRefType = z
  .string()
  .min(1, 'Đường dẫn media bắt buộc khi publish')
  .refine((s) => !s.toLowerCase().endsWith('.wav'), {
    message: 'Cấm định dạng .wav! Phải dùng .mp3 cho âm thanh',
  });

// Helper check: general praise or utility audio exempted from distinct-label rule
function isExemptAudio(audioPath: string): boolean {
  const lower = audioPath.toLowerCase();
  return (
    lower.includes('explanation') ||
    lower.includes('congrats') ||
    lower.includes('khen') ||
    lower.includes('timer-chime') ||
    lower.includes('chime') ||
    lower.includes('prompt-')
  );
}

// ---- 1. Multiple Choice Question ----
function makeMultipleChoice(
  mediaRef: MediaRefType,
  typeName: 'multiple_choice' | 'multiple-choice',
  status: 'draft' | 'publish'
) {
  return z
    .object({
      type: z.literal(typeName),
      id: z.string().min(1),
      prompt: z.string().min(1),
      promptAudio: mediaRef,
      illustration: mediaRef,
      options: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().min(1),
            image: mediaRef.optional(),
            audio: mediaRef.optional(),
            isPhonemeOrWord: z.boolean().optional(),
          })
        )
        .min(2)
        .max(4),
      correctOptionId: z.string().min(1),
      explanation: z.string().optional(),
      explanationAudio: mediaRef.optional(),
    })
    .superRefine((data, ctx) => {
      const optionIds = new Set<string>();
      data.options.forEach((opt, idx) => {
        if (optionIds.has(opt.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Option ID '${opt.id}' bị trùng lặp`,
            path: ['options', idx, 'id'],
          });
        }
        optionIds.add(opt.id);

        // Luật Publish: đáp án có chữ bắt buộc phải có audio
        if (status === 'publish') {
          if (opt.label && (!opt.audio || opt.audio.trim() === '')) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Luật Publish: Đáp án có chữ '${opt.label}' bắt buộc phải có audio`,
              path: ['options', idx, 'audio'],
            });
          }
        }
      });

      if (!optionIds.has(data.correctOptionId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `correctOptionId '${data.correctOptionId}' không tồn tại trong options`,
          path: ['correctOptionId'],
        });
      }

      // Cấm 2 nhãn khác nhau dùng chung một file audio (trừ lời khen chung)
      if (status === 'publish') {
        const audioMap = new Map<string, string>();
        for (const opt of data.options) {
          if (opt.audio && opt.label) {
            const cleanAudio = opt.audio.trim().toLowerCase();
            const cleanLabel = opt.label.trim().toLowerCase();
            if (!isExemptAudio(cleanAudio)) {
              const existing = audioMap.get(cleanAudio);
              if (existing && existing.toLowerCase() !== cleanLabel) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `Luật Publish: Hai nhãn khác nhau ('${existing}' và '${opt.label}') không được dùng chung audio '${opt.audio}'`,
                  path: ['options'],
                });
              } else {
                audioMap.set(cleanAudio, opt.label);
              }
            }
          }
        }
      }

      if (status === 'publish' && data.explanation && (!data.explanationAudio || data.explanationAudio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Khi có explanation, bắt buộc phải có explanationAudio',
          path: ['explanationAudio'],
        });
      }
    });
}

// ---- 2. Counting Question ----
function makeCountingQuestion(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z
    .object({
      type: z.literal('counting'),
      id: z.string().min(1),
      prompt: z.string().min(1),
      promptAudio: mediaRef,
      illustration: mediaRef,
      items: z
        .array(
          z.object({
            image: mediaRef,
            alt: z.string().min(1),
          })
        )
        .min(1)
        .max(20),
      correctCount: z.number().int().min(0).max(20),
      numberRange: z.object({
        min: z.number().int().min(0),
        max: z.number().int().max(20),
      }),
      explanation: z.string().optional(),
      explanationAudio: mediaRef.optional(),
    })
    .superRefine((data, ctx) => {
      if (status === 'publish' && data.explanation && (!data.explanationAudio || data.explanationAudio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Khi có explanation, bắt buộc phải có explanationAudio',
          path: ['explanationAudio'],
        });
      }
    });
}

// ---- 3. Number Select Question ----
function makeNumberSelect(
  mediaRef: MediaRefType,
  typeName: 'number_select' | 'number-select',
  status: 'draft' | 'publish'
) {
  return z
    .object({
      type: z.literal(typeName),
      id: z.string().min(1),
      prompt: z.string().min(1),
      promptAudio: mediaRef,
      illustration: mediaRef,
      expression: z.string().min(1),
      choices: z.array(z.number().int()).min(2).max(6),
      correctAnswer: z.number().int(),
      explanation: z.string().optional(),
      explanationAudio: mediaRef.optional(),
    })
    .superRefine((data, ctx) => {
      const choiceSet = new Set(data.choices);
      if (choiceSet.size !== data.choices.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Các lựa chọn trong choices không được trùng lặp',
          path: ['choices'],
        });
      }
      if (!choiceSet.has(data.correctAnswer)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `correctAnswer '${data.correctAnswer}' phải nằm trong choices`,
          path: ['correctAnswer'],
        });
      }
      if (status === 'publish' && data.explanation && (!data.explanationAudio || data.explanationAudio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Khi có explanation, bắt buộc phải có explanationAudio',
          path: ['explanationAudio'],
        });
      }
    });
}

// ---- 4. Tap Place Question (with superRefine on correctMapping & unique IDs) ----
function makeTapPlace(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z
    .object({
      type: z.literal('tap_place'),
      id: z.string().min(1),
      prompt: z.string().min(1),
      promptAudio: mediaRef,
      illustration: mediaRef,
      targets: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().min(1),
            x: z.number().optional(),
            y: z.number().optional(),
            prefixText: z.string().optional(),
            suffixText: z.string().optional(),
          })
        )
        .min(1),
      items: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().min(1),
            image: mediaRef.optional(),
            audio: mediaRef.optional(),
            isPhonemeOrWord: z.boolean().optional(),
          })
        )
        .min(1),
      correctMapping: z.record(z.string(), z.string()),
      explanation: z.string().optional(),
      explanationAudio: mediaRef.optional(),
    })
    .superRefine((data, ctx) => {
      const itemIds = new Set<string>();
      data.items.forEach((item, idx) => {
        if (itemIds.has(item.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Item ID '${item.id}' bị trùng lặp`,
            path: ['items', idx, 'id'],
          });
        }
        itemIds.add(item.id);

        if (status === 'publish') {
          if (item.label && (!item.audio || item.audio.trim() === '')) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Luật Publish: Thẻ '${item.label}' bắt buộc phải có audio`,
              path: ['items', idx, 'audio'],
            });
          }
        }
      });

      const targetIds = new Set<string>();
      data.targets.forEach((target, idx) => {
        if (targetIds.has(target.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Target ID '${target.id}' bị trùng lặp`,
            path: ['targets', idx, 'id'],
          });
        }
        targetIds.add(target.id);
      });

      for (const [itemId, targetId] of Object.entries(data.correctMapping)) {
        if (!itemIds.has(itemId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `correctMapping contains invalid itemId '${itemId}' that does not exist in items`,
            path: ['correctMapping', itemId],
          });
        }
        if (!targetIds.has(targetId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `correctMapping maps itemId '${itemId}' to invalid targetId '${targetId}' that does not exist in targets`,
            path: ['correctMapping', itemId],
          });
        }
      }

      // Cấm 2 nhãn khác nhau dùng chung một file audio (trừ lời khen chung)
      if (status === 'publish') {
        const audioMap = new Map<string, string>();
        for (const item of data.items) {
          if (item.audio && item.label) {
            const cleanAudio = item.audio.trim().toLowerCase();
            const cleanLabel = item.label.trim().toLowerCase();
            if (!isExemptAudio(cleanAudio)) {
              const existing = audioMap.get(cleanAudio);
              if (existing && existing.toLowerCase() !== cleanLabel) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `Luật Publish: Hai nhãn khác nhau ('${existing}' và '${item.label}') không được dùng chung audio '${item.audio}'`,
                  path: ['items'],
                });
              } else {
                audioMap.set(cleanAudio, item.label);
              }
            }
          }
        }
      }

      if (status === 'publish' && data.explanation && (!data.explanationAudio || data.explanationAudio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Khi có explanation, bắt buộc phải có explanationAudio',
          path: ['explanationAudio'],
        });
      }
    });
}

// ---- 5. Matching Question (with superRefine on correctPairs & 1-1 matching) ----
function makeMatching(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z
    .object({
      type: z.literal('matching'),
      id: z.string().min(1),
      prompt: z.string().min(1),
      promptAudio: mediaRef,
      illustration: mediaRef,
      leftColumn: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().min(1),
            image: mediaRef.optional(),
            audio: mediaRef.optional(),
            isPhonemeOrWord: z.boolean().optional(),
          })
        )
        .min(2),
      rightColumn: z
        .array(
          z.object({
            id: z.string().min(1),
            label: z.string().min(1),
            image: mediaRef.optional(),
            audio: mediaRef.optional(),
            isPhonemeOrWord: z.boolean().optional(),
          })
        )
        .min(2),
      correctPairs: z
        .array(
          z.object({
            leftId: z.string().min(1),
            rightId: z.string().min(1),
          })
        )
        .min(2),
      explanation: z.string().optional(),
      explanationAudio: mediaRef.optional(),
    })
    .superRefine((data, ctx) => {
      const leftIds = new Set<string>();
      data.leftColumn.forEach((col, idx) => {
        if (leftIds.has(col.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `leftColumn ID '${col.id}' bị trùng lặp`,
            path: ['leftColumn', idx, 'id'],
          });
        }
        leftIds.add(col.id);

        if (status === 'publish' && col.label && (!col.audio || col.audio.trim() === '')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Luật Publish: Mục nối '${col.label}' bắt buộc phải có audio`,
            path: ['leftColumn', idx, 'audio'],
          });
        }
      });

      const rightIds = new Set<string>();
      data.rightColumn.forEach((col, idx) => {
        if (rightIds.has(col.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `rightColumn ID '${col.id}' bị trùng lặp`,
            path: ['rightColumn', idx, 'id'],
          });
        }
        rightIds.add(col.id);

        if (status === 'publish' && col.label && (!col.audio || col.audio.trim() === '')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Luật Publish: Mục nối '${col.label}' bắt buộc phải có audio`,
            path: ['rightColumn', idx, 'audio'],
          });
        }
      });

      const usedLeftIds = new Set<string>();
      const usedRightIds = new Set<string>();

      data.correctPairs.forEach((pair, index) => {
        if (!leftIds.has(pair.leftId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `correctPairs[${index}] contains invalid leftId '${pair.leftId}' that does not exist in leftColumn`,
            path: ['correctPairs', index, 'leftId'],
          });
        } else if (usedLeftIds.has(pair.leftId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Matching một-một: leftId '${pair.leftId}' bị nối nhiều hơn một lần tại correctPairs[${index}]`,
            path: ['correctPairs', index, 'leftId'],
          });
        }
        usedLeftIds.add(pair.leftId);

        if (!rightIds.has(pair.rightId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `correctPairs[${index}] contains invalid rightId '${pair.rightId}' that does not exist in rightColumn`,
            path: ['correctPairs', index, 'rightId'],
          });
        } else if (usedRightIds.has(pair.rightId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Matching một-một: rightId '${pair.rightId}' bị nối nhiều hơn một lần tại correctPairs[${index}]`,
            path: ['correctPairs', index, 'rightId'],
          });
        }
        usedRightIds.add(pair.rightId);
      });

      // Cấm 2 nhãn khác nhau dùng chung một file audio (trừ lời khen chung)
      if (status === 'publish') {
        const audioMap = new Map<string, string>();
        const allItems = [...data.leftColumn, ...data.rightColumn];
        for (const item of allItems) {
          if (item.audio && item.label) {
            const cleanAudio = item.audio.trim().toLowerCase();
            const cleanLabel = item.label.trim().toLowerCase();
            if (!isExemptAudio(cleanAudio)) {
              const existing = audioMap.get(cleanAudio);
              if (existing && existing.toLowerCase() !== cleanLabel) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: `Luật Publish: Hai nhãn khác nhau ('${existing}' và '${item.label}') không được dùng chung audio '${item.audio}'`,
                  path: ['leftColumn'],
                });
              } else {
                audioMap.set(cleanAudio, item.label);
              }
            }
          }
        }
      }

      if (status === 'publish' && data.explanation && (!data.explanationAudio || data.explanationAudio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Khi có explanation, bắt buộc phải có explanationAudio',
          path: ['explanationAudio'],
        });
      }
    });
}

// ---- Slide Types ----
function makeTitleSlide(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z
    .object({
      type: z.literal('title-slide'),
      id: z.string().min(1),
      title: z.string().min(1),
      subtitle: z.string().optional(),
      teacherNote: z.string().optional(),
      backgroundImage: mediaRef.optional(),
      audio: mediaRef.optional(),
    })
    .superRefine((data, ctx) => {
      if (status === 'publish' && (!data.audio || data.audio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Slide tiêu đề bắt buộc phải có audio lời dẫn',
          path: ['audio'],
        });
      }
    });
}

function makeContentSlide(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z
    .object({
      type: z.literal('content-slide'),
      id: z.string().min(1),
      title: z.string().min(1),
      body: z.string().optional(),
      teacherNote: z.string().optional(),
      illustration: mediaRef.optional(),
      audio: mediaRef.optional(),
      bullets: z.array(z.string()).optional(),
    })
    .superRefine((data, ctx) => {
      if (status === 'publish' && (!data.audio || data.audio.trim() === '')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Luật Publish: Slide nội dung bắt buộc phải có audio',
          path: ['audio'],
        });
      }
    });
}

function makeQuestionSlide(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z.object({
    type: z.literal('question-slide'),
    id: z.string().min(1),
    teacherNote: z.string().optional(),
    question: z.discriminatedUnion('type', [
      makeMultipleChoice(mediaRef, 'multiple_choice', status),
      makeMultipleChoice(mediaRef, 'multiple-choice', status),
      makeCountingQuestion(mediaRef, status),
      makeNumberSelect(mediaRef, 'number_select', status),
      makeNumberSelect(mediaRef, 'number-select', status),
      makeTapPlace(mediaRef, status),
      makeMatching(mediaRef, status),
    ]),
    timeLimitSeconds: z.number().int().min(5).max(120).default(30),
    showRetryOnWrong: z.boolean().default(true),
  });
}

function makePhonicsSlide(mediaRef: MediaRefType) {
  return z.object({
    type: z.literal('phonics-slide'),
    id: z.string().min(1),
    title: z.string().min(1),
    teacherNote: z.string().optional(),
    initials: z.array(z.string()).optional(),
    rhymes: z.array(z.string()).optional(),
    tones: z.array(z.string()).optional(),
    audioBaseUrl: mediaRef.optional(),
  });
}

function makeFlashcardSlide(mediaRef: MediaRefType, status: 'draft' | 'publish') {
  return z.object({
    type: z.literal('flashcard-slide'),
    id: z.string().min(1),
    title: z.string().min(1),
    teacherNote: z.string().optional(),
    cards: z
      .array(
        z.object({
          id: z.string().min(1),
          frontText: z.string().min(1),
          backText: z.string().optional(),
          phoneme: z.string().optional(),
          image: mediaRef.optional(),
          audio: status === 'publish' ? mediaRefPublish : mediaRefDraft.optional(),
        })
      )
      .min(1),
  });
}

// ---- Lesson Schemas ----
function makeLessonSchema(status: 'draft' | 'publish') {
  const mediaRef = status === 'draft' ? mediaRefDraft : mediaRefPublish;
  return z
    .object({
      $schema: z.string().optional(),
      status: z.literal(status),
      mode: z.literal(status).optional(),
      id: z.string().min(1),
      title: z.string().min(1),
      subject: z.enum(['math', 'vietnamese']),
      grade: z.literal(1),
      description: z.string().optional(),
      totalDurationMinutes: z.number().int().min(1).max(90).optional(),
      slides: z
        .array(
          z.discriminatedUnion('type', [
            makeTitleSlide(mediaRef, status),
            makeContentSlide(mediaRef, status),
            makeQuestionSlide(mediaRef, status),
            makePhonicsSlide(mediaRef),
            makeFlashcardSlide(mediaRef, status),
          ])
        )
        .min(1),
    })
    .superRefine((lesson, ctx) => {
      const slideIds = new Set<string>();
      const questionIds = new Set<string>();

      lesson.slides.forEach((slide, sIdx) => {
        if (slideIds.has(slide.id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Slide ID '${slide.id}' bị trùng lặp tại slide ${sIdx + 1}`,
            path: ['slides', sIdx, 'id'],
          });
        }
        slideIds.add(slide.id);

        if (slide.type === 'question-slide') {
          const q = slide.question;
          if (questionIds.has(q.id)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Question ID '${q.id}' bị trùng lặp tại slide ${sIdx + 1}`,
              path: ['slides', sIdx, 'question', 'id'],
            });
          }
          questionIds.add(q.id);
        }
      });
    });
}

export const DraftLessonSchema = makeLessonSchema('draft');
export const PublishLessonSchema = makeLessonSchema('publish');

export const LessonSchema = z.discriminatedUnion('status', [
  DraftLessonSchema,
  PublishLessonSchema,
]);

// ---- Exported Types ----
export type DraftLesson = z.infer<typeof DraftLessonSchema>;
export type PublishLesson = z.infer<typeof PublishLessonSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Slide = Lesson['slides'][number];
export type QuestionSlide = Extract<Slide, { type: 'question-slide' }>;
export type Question = QuestionSlide['question'];
export type PhonicsSlide = Extract<Slide, { type: 'phonics-slide' }>;
export type FlashcardSlide = Extract<Slide, { type: 'flashcard-slide' }>;
