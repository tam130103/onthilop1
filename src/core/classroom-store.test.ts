import { describe, it, expect, beforeEach } from 'vitest';
import { ClassroomStore } from './classroom-store';

describe('ClassroomStore & Random Picker Algorithm', () => {
  let store: ClassroomStore;

  beforeEach(() => {
    store = new ClassroomStore();
  });

  it('imports student names and parses lines cleanly', () => {
    store.importStudents('Nguyễn Văn A\nTrần Thị B\nLê Văn C');
    const data = store.getData();
    expect(data.students).toHaveLength(3);
    expect(data.students[0]?.name).toBe('Nguyễn Văn A');
    expect(data.students[1]?.name).toBe('Trần Thị B');
    expect(data.students[2]?.name).toBe('Lê Văn C');
  });

  it('toggles attendance (absent / present)', () => {
    store.importStudents('Học sinh 1\nHọc sinh 2');
    const firstId = store.getData().students[0]!.id;

    expect(store.getData().students[0]?.isAbsent).toBe(false);
    store.toggleStudentAbsent(firstId);
    expect(store.getData().students[0]?.isAbsent).toBe(true);
    store.toggleStudentAbsent(firstId);
    expect(store.getData().students[0]?.isAbsent).toBe(false);
  });

  it('random picker guarantees non-repeating selection until all present students are called', () => {
    store.importStudents('Bé 1\nBé 2\nBé 3\nBé 4');
    store.resetCallCounts();

    const pickedIds = new Set<string>();

    // 4 picks should select all 4 different students
    for (let i = 0; i < 4; i++) {
      const picked = store.pickRandomStudent();
      expect(picked).not.toBeNull();
      if (picked) {
        expect(pickedIds.has(picked.id)).toBe(false); // must not repeat!
        pickedIds.add(picked.id);
      }
    }

    expect(pickedIds.size).toBe(4);

    // After everyone has been called once (callCount = 1), 5th pick should select someone with callCount 2
    const fifthPick = store.pickRandomStudent();
    expect(fifthPick).not.toBeNull();
    expect(fifthPick?.callCount).toBe(2);
  });

  it('random picker skips absent students completely', () => {
    store.importStudents('Bé Hiện Diện\nBé Vắng Mặt');
    store.resetCallCounts();

    const absentId = store.getData().students[1]!.id;
    store.toggleStudentAbsent(absentId);

    // Pick 5 times, should ALWAYS pick "Bé Hiện Diện" and NEVER pick "Bé Vắng Mặt"
    for (let i = 0; i < 5; i++) {
      const picked = store.pickRandomStudent();
      expect(picked?.name).toBe('Bé Hiện Diện');
    }
  });

  it('team scoreboard increments, decrements, and resets scores', () => {
    const teamId = store.getData().teams[0]!.id;

    store.addScore(teamId, 1);
    expect(store.getData().teams[0]?.score).toBe(1);

    store.addScore(teamId, 5);
    expect(store.getData().teams[0]?.score).toBe(6);

    store.addScore(teamId, -2);
    expect(store.getData().teams[0]?.score).toBe(4);

    // Score cannot drop below zero
    store.addScore(teamId, -100);
    expect(store.getData().teams[0]?.score).toBe(0);

    store.addScore(teamId, 10);
    store.resetScores();
    expect(store.getData().teams[0]?.score).toBe(0);
  });

  it('classroom timer lifecycle (start, tick, finish)', () => {
    store.startTimer(2);
    expect(store.getData().timer.isRunning).toBe(true);
    expect(store.getData().timer.remainingSeconds).toBe(2);

    const finished1 = store.tickTimer();
    expect(finished1).toBe(false);
    expect(store.getData().timer.remainingSeconds).toBe(1);

    const finished2 = store.tickTimer();
    expect(finished2).toBe(true); // timer finished!
    expect(store.getData().timer.remainingSeconds).toBe(0);
    expect(store.getData().timer.isRunning).toBe(false);
  });
});

