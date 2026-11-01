import { describe, expect, it } from 'vitest';
import { audioTextMatches } from './audio-text-matcher';

describe('audioTextMatches', () => {
  it('matches a displayed equation result with a spoken result label', () => {
    expect(audioTextMatches('= 2', 'kết quả hai')).toBe(true);
  });

  it('does not drop result wording from ordinary prompts', () => {
    expect(audioTextMatches('Tính kết quả phép tính sau', 'Tính phép tính sau')).toBe(false);
  });

  it('matches written consonants with their spoken phoneme names', () => {
    expect(audioTextMatches('Chữ B', 'bờ')).toBe(true);
    expect(audioTextMatches('th', 'thờ')).toBe(true);
    expect(audioTextMatches('gh', 'gờ')).toBe(true);
  });

  it('only removes phoneme wrappers when they label a single consonant', () => {
    expect(audioTextMatches('Chữ cái đang ở đâu?', 'đang ở đâu?')).toBe(false);
  });

  it('matches image labels with equivalent descriptive prefixes', () => {
    expect(audioTextMatches('Tranh hình tròn', 'ảnh hình tròn')).toBe(true);
    expect(audioTextMatches('Hình chiếc nơ', 'ảnh chiếc nơ xinh')).toBe(true);
  });

  it('matches identical mathematical symbols', () => {
    expect(audioTextMatches('<', '<')).toBe(true);
    expect(audioTextMatches('<', '>')).toBe(false);
  });

  it('rejects unrelated labels', () => {
    expect(audioTextMatches('con cá', 'quả táo')).toBe(false);
  });

  it('rejects arithmetic narration with a changed operand or answer', () => {
    expect(audioTextMatches('hai cộng hai', 'hai cộng một')).toBe(false);
    expect(audioTextMatches('hai cộng một bằng ba', 'hai cộng một bằng bốn')).toBe(false);
  });

  it('keeps meaningful relation words in the displayed text', () => {
    expect(audioTextMatches('Số liền sau của số 4', 'Số liền trước của số 4')).toBe(false);
  });
});
