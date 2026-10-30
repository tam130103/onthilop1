import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAllTeachingSessions,
  getTeachingSessionById,
  saveCustomSession,
  deleteCustomSession,
  BUILTIN_SESSIONS,
  type TeachingSession,
} from './session-storage';

describe('TeachingSession Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides 2 built-in sample sessions (Math and Vietnamese)', () => {
    const all = getAllTeachingSessions();
    expect(all.length).toBeGreaterThanOrEqual(2);

    const math = getTeachingSessionById('session-math-01');
    expect(math).not.toBeNull();
    expect(math?.subject).toBe('math');
    expect(math?.steps.length).toBeGreaterThanOrEqual(4);

    const vn = getTeachingSessionById('session-vn-01');
    expect(vn).not.toBeNull();
    expect(vn?.subject).toBe('vietnamese');
    expect(vn?.steps.some((s) => s.type === 'phonics')).toBe(true);
  });

  it('saves and retrieves custom teaching session', () => {
    const custom: TeachingSession = {
      id: 'custom-session-1',
      title: 'Buổi học ôn tập cuối tuần',
      subject: 'math',
      grade: 1,
      description: 'Luyện tập tổng hợp',
      estimatedDurationMinutes: 35,
      steps: [
        {
          id: 'step-1',
          type: 'warmup',
          title: 'Khởi động',
          description: 'Quay tên',
          durationMinutes: 5,
        },
      ],
    };

    saveCustomSession(custom);
    const found = getTeachingSessionById('custom-session-1');
    expect(found).not.toBeNull();
    expect(found?.title).toBe('Buổi học ôn tập cuối tuần');
    expect(found?.isCustom).toBe(true);
  });

  it('deletes custom teaching session', () => {
    const custom: TeachingSession = {
      id: 'to-delete',
      title: 'Tạm',
      subject: 'math',
      grade: 1,
      description: '',
      estimatedDurationMinutes: 10,
      steps: [],
    };
    saveCustomSession(custom);
    expect(getTeachingSessionById('to-delete')).not.toBeNull();

    const deleted = deleteCustomSession('to-delete');
    expect(deleted).toBe(true);
    expect(getTeachingSessionById('to-delete')).toBeNull();
  });
});
