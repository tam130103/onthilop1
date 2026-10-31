// Classroom Management Store (Offline-First LocalStorage / IndexedDB)
import {
  saveAllStudentsToDb,
  getStudentsFromDb,
  deleteStudentFromDb,
} from './student-db';
import {
  fetchTeamsFromSupabase,
  syncTeamToSupabase,
} from './supabase-client';

export interface Student {
  id: string;
  name: string;
  isAbsent: boolean;
  callCount: number;
  gender?: 'Nam' | 'Nữ';
  teamId?: string;
  stars?: number;
  note?: string;
  createdAt?: number;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface ClassroomTimerState {
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export interface ClassroomData {
  students: Student[];
  teams: Team[];
  timer: ClassroomTimerState;
  pickerActive: boolean;
  pickedStudent: Student | null;
  pickerRolling: boolean;
}

const DEFAULT_TEAMS: Team[] = [
  { id: 'team-1', name: 'Đội Sao Vàng', color: '#eab308', score: 0 },
  { id: 'team-2', name: 'Đội Măng Non', color: '#22c55e', score: 0 },
  { id: 'team-3', name: 'Đội Tia Chớp', color: '#3b82f6', score: 0 },
  { id: 'team-4', name: 'Đội Mặt Trời', color: '#ef4444', score: 0 },
];

const DEFAULT_STUDENTS: Student[] = [
  { id: 's-1', name: 'Nguyễn Văn An', isAbsent: false, callCount: 0 },
  { id: 's-2', name: 'Trần Thị Bình', isAbsent: false, callCount: 0 },
  { id: 's-3', name: 'Lê Hoàng Cúc', isAbsent: false, callCount: 0 },
  { id: 's-4', name: 'Phạm Đức Dũng', isAbsent: false, callCount: 0 },
  { id: 's-5', name: 'Vũ Ngọc Hoa', isAbsent: false, callCount: 0 },
  { id: 's-6', name: 'Đỗ Minh Khang', isAbsent: false, callCount: 0 },
  { id: 's-7', name: 'Bùi Bảo Linh', isAbsent: false, callCount: 0 },
  { id: 's-8', name: 'Hoàng Quốc Nam', isAbsent: false, callCount: 0 },
];

const STORAGE_KEY = 'trinh_chieu_classroom_v1';

export class ClassroomStore {
  private data: ClassroomData;
  private listeners: Set<(data: ClassroomData) => void> = new Set();

  constructor() {
    this.data = this.loadInitial();
    this.requestPersistentStorage();
    this.syncFromIndexedDb();
    this.listenToCrossTabStorage();
  }

  private async syncFromIndexedDb(): Promise<void> {
    try {
      const dbStudents = await getStudentsFromDb();
      if (Array.isArray(dbStudents) && dbStudents.length > 0) {
        this.data.students = dbStudents;
        this.notify();
      }

      const cloudTeams = await fetchTeamsFromSupabase();
      if (cloudTeams && cloudTeams.length > 0) {
        this.data.teams = cloudTeams;
        this.notify();
      }
    } catch {
      // ignore
    }
  }

  private listenToCrossTabStorage(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            if (Array.isArray(parsed.students)) {
              this.data.students = parsed.students;
            }
            if (Array.isArray(parsed.teams)) {
              this.data.teams = parsed.teams;
            }
            this.notify();
          } catch {
            // ignore
          }
        }
      });
    }
  }

  private async requestPersistentStorage(): Promise<void> {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
      try {
        const isPersisted = await navigator.storage.persist();
        if (isPersisted) {
          console.log('[ClassroomStore] Storage is persisted offline.');
        }
      } catch {
        // ignore
      }
    }
  }

  private loadInitial(): ClassroomData {
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          const hasCustomized = parsed.isCustomized === true || (Array.isArray(parsed.students) && parsed.students.length > 0);
          return {
            students: hasCustomized ? parsed.students : DEFAULT_STUDENTS,
            teams: Array.isArray(parsed.teams) && parsed.teams.length > 0 ? parsed.teams : DEFAULT_TEAMS,
            timer: parsed.timer || { durationSeconds: 0, remainingSeconds: 0, isRunning: false },
            pickerActive: false,
            pickedStudent: null,
            pickerRolling: false,
          };
        }
      } catch (e) {
        console.warn('[ClassroomStore] Failed to load from localStorage:', e);
      }
    }

    return {
      students: DEFAULT_STUDENTS,
      teams: DEFAULT_TEAMS,
      timer: { durationSeconds: 0, remainingSeconds: 0, isRunning: false },
      pickerActive: false,
      pickedStudent: null,
      pickerRolling: false,
    };
  }

  private persist(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const toSave = {
          students: this.data.students,
          teams: this.data.teams,
          isCustomized: true,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (e) {
        console.warn('[ClassroomStore] Save error:', e);
      }
    }
    // Transactional asynchronous IndexedDB save
    saveAllStudentsToDb(this.data.students).catch(() => {});
    this.notify();
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  subscribe(listener: (data: ClassroomData) => void): () => void {
    this.listeners.add(listener);
    listener(this.data);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getData(): ClassroomData {
    return this.data;
  }

  setData(data: ClassroomData): void {
    if (!data) return;
    this.data = {
      ...this.data,
      ...data,
      students: Array.isArray(data.students) ? data.students : this.data.students,
      teams: Array.isArray(data.teams) ? data.teams : this.data.teams,
      timer: data.timer || this.data.timer,
    };
    this.persist();
  }

  // ---- Student Roster Management (Full CRUD) ----
  addStudent(studentData: {
    name: string;
    gender?: 'Nam' | 'Nữ';
    teamId?: string;
    note?: string;
  }): Student {
    const trimmed = studentData.name.trim();
    if (!trimmed) throw new Error('Tên học sinh không được để trống.');

    const newStudent: Student = {
      id: `student-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmed,
      gender: studentData.gender || 'Nam',
      teamId: studentData.teamId || this.data.teams[0]?.id,
      note: studentData.note || '',
      isAbsent: false,
      callCount: 0,
      stars: 0,
      createdAt: Date.now(),
    };

    this.data.students = [newStudent, ...this.data.students];
    this.persist();
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<Student>): void {
    this.data.students = this.data.students.map((s) => {
      if (s.id === id) {
        return { ...s, ...updates };
      }
      return s;
    });
    this.persist();
  }

  deleteStudent(id: string): void {
    this.data.students = this.data.students.filter((s) => s.id !== id);
    deleteStudentFromDb(id).catch(() => {});
    this.persist();
  }

  addStudentStar(id: string, delta: number = 1): void {
    this.data.students = this.data.students.map((s) => {
      if (s.id === id) {
        return { ...s, stars: Math.max(0, (s.stars || 0) + delta) };
      }
      return s;
    });
    this.persist();
  }

  importStudents(namesText: string): void {
    const lines = namesText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const newStudents: Student[] = lines.map((name, idx) => ({
      id: `student-${Date.now()}-${idx}`,
      name,
      isAbsent: false,
      callCount: 0,
    }));

    if (newStudents.length > 0) {
      this.data.students = newStudents;
      this.persist();
    }
  }

  toggleStudentAbsent(id: string): void {
    this.data.students = this.data.students.map((s) =>
      s.id === id ? { ...s, isAbsent: !s.isAbsent } : s
    );
    this.persist();
  }

  resetCallCounts(): void {
    this.data.students = this.data.students.map((s) => ({ ...s, callCount: 0 }));
    this.persist();
  }

  // ---- Random Picker (Non-repeating priority algorithm) ----
  pickRandomStudent(): Student | null {
    const presentStudents = this.data.students.filter((s) => !s.isAbsent);
    if (presentStudents.length === 0) return null;

    // Find the minimum callCount among present students
    const minCallCount = Math.min(...presentStudents.map((s) => s.callCount));

    // Candidate pool: only students with the minimum callCount
    const candidates = presentStudents.filter((s) => s.callCount === minCallCount);

    // Pick uniformly at random from candidates
    const chosenIndex = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[chosenIndex];
    if (!chosen) return null;

    // Increment callCount
    this.data.students = this.data.students.map((s) =>
      s.id === chosen.id ? { ...s, callCount: s.callCount + 1 } : s
    );
    this.data.pickedStudent = { ...chosen, callCount: chosen.callCount + 1 };
    this.data.pickerActive = true;
    this.persist();

    return this.data.pickedStudent;
  }

  closePicker(): void {
    this.data.pickerActive = false;
    this.data.pickedStudent = null;
    this.notify();
  }

  // ---- Team Scoreboard ----
  addScore(teamId: string, delta: number): void {
    this.data.teams = this.data.teams.map((t) =>
      t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t
    );
    const updatedTeam = this.data.teams.find((t) => t.id === teamId);
    if (updatedTeam) {
      syncTeamToSupabase(teamId, { score: updatedTeam.score });
    }
    this.persist();
  }

  setTeamScore(teamId: string, score: number): void {
    this.data.teams = this.data.teams.map((t) =>
      t.id === teamId ? { ...t, score: Math.max(0, score) } : t
    );
    syncTeamToSupabase(teamId, { score });
    this.persist();
  }

  resetScores(): void {
    this.data.teams = this.data.teams.map((t) => ({ ...t, score: 0 }));
    for (const t of this.data.teams) {
      syncTeamToSupabase(t.id, { score: 0 });
    }
    this.persist();
  }

  updateTeamName(teamId: string, name: string): void {
    this.data.teams = this.data.teams.map((t) =>
      t.id === teamId ? { ...t, name } : t
    );
    syncTeamToSupabase(teamId, { name });
    this.persist();
  }

  renameTeam(teamId: string, name: string): void {
    this.updateTeamName(teamId, name);
  }

  // ---- Classroom Timer ----
  startTimer(seconds: number): void {
    this.data.timer = {
      durationSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: true,
    };
    this.notify();
  }

  tickTimer(): boolean {
    if (!this.data.timer.isRunning || this.data.timer.remainingSeconds <= 0) {
      if (this.data.timer.isRunning) {
        this.data.timer.isRunning = false;
        this.notify();
        return true; // Finished!
      }
      return false;
    }

    this.data.timer.remainingSeconds -= 1;
    if (this.data.timer.remainingSeconds <= 0) {
      this.data.timer.isRunning = false;
      this.notify();
      return true; // Finished!
    }

    this.notify();
    return false;
  }

  stopTimer(): void {
    this.data.timer.isRunning = false;
    this.notify();
  }
}

let storeInstance: ClassroomStore | null = null;
export function getClassroomStore(): ClassroomStore {
  if (!storeInstance) {
    storeInstance = new ClassroomStore();
  }
  return storeInstance;
}

