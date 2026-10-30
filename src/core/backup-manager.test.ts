import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  createFullBackupPackage,
  importFullBackup,
  type FullBackupPackage,
} from './backup-manager';
import { getClassroomStore } from './classroom-store';
import { getCustomLessons } from './lesson-storage';
import { getMistakeTracker } from './mistake-tracker';

describe('BackupManager (Xuất/Nhập sao lưu toàn diện)', () => {
  beforeEach(() => {
    localStorage.clear();
    getClassroomStore().importStudents('Học sinh Alpha\nHọc sinh Beta');
    getMistakeTracker().clearAll();
  });

  it('exports comprehensive backup package with version 1 and appName', async () => {
    const pkg = await createFullBackupPackage();
    expect(pkg.version).toBe(1);
    expect(pkg.appName).toBe('trinh-chieu-lop1');
    expect(pkg.classroomData.students).toHaveLength(2);
    expect(Array.isArray(pkg.customLessons)).toBe(true);
    expect(Array.isArray(pkg.audioRecordings)).toBe(true);
  });

  it('imports valid backup and restores classroom and mistake data', async () => {
    const sampleBackup: FullBackupPackage = {
      version: 1,
      appName: 'trinh-chieu-lop1',
      exportedAt: new Date().toISOString(),
      classroomData: {
        students: [
          { id: 'st-1', name: 'Nguyễn Văn Test', isAbsent: false, callCount: 1 },
        ],
        teams: [
          { id: 'blue', name: 'Đội Xanh Dương', score: 5, color: '#3b82f6' },
        ],
        timer: { durationSeconds: 60, remainingSeconds: 60, isRunning: false },
        pickerActive: false,
        pickedStudent: null,
        pickerRolling: false,
      },
      customLessons: [],
      mistakes: [
        {
          questionId: 'q-test-1',
          lessonId: 'les-1',
          lessonTitle: 'Toán test',
          subject: 'math',
          question: {
            type: 'number_select',
            id: 'q-test-1',
            prompt: '1 + 1 = ?',
            promptAudio: '',
            illustration: '',
            expression: '1 + 1 = ?',
            choices: [1, 2],
            correctAnswer: 2,
          },
          wrongCount: 3,
          lastWrongAt: Date.now(),
        },
      ],
      teachingSessions: [],
      audioRecordings: [],
    };

    const jsonStr = JSON.stringify(sampleBackup);
    const result = await importFullBackup(jsonStr);

    expect(result.success).toBe(true);
    expect(result.stats?.studentsCount).toBe(1);
    expect(result.stats?.mistakesCount).toBe(1);

    // Verify restored in stores
    const restoredStore = getClassroomStore().getData();
    expect(restoredStore.students[0]?.name).toBe('Nguyễn Văn Test');
    expect(restoredStore.teams[0]?.score).toBe(5);

    const restoredMistakes = getMistakeTracker().getMistakes();
    expect(restoredMistakes).toHaveLength(1);
    expect(restoredMistakes[0]?.wrongCount).toBe(3);
  });

  it('rejects invalid backup JSON or incompatible appName', async () => {
    const invalidJson = JSON.stringify({ version: 2, appName: 'other-app' });
    const result = await importFullBackup(invalidJson);
    expect(result.success).toBe(false);
    expect(result.error).toContain('không tương thích');
  });
});
