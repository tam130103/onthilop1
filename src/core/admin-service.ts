import { getSupabase } from './supabase-client';
import { getAllLessons, getCustomLessons, saveCustomLesson, deleteCustomLesson, BUILTIN_LESSON_URLS } from './lesson-storage';
import { getClassroomStore, type Student, type Team } from './classroom-store';
import { getMistakeTracker, type MistakeEntry } from './mistake-tracker';
import type { Lesson } from '@/schemas/content.schema';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'parent';
  phone_number?: string;
  school_name?: string;
  created_at?: string;
}

export interface AdminClassroom {
  id: string;
  name: string;
  grade_level: number;
  academic_year: string;
  teacher_name: string;
  teacher_id?: string;
  created_at?: string;
}

export interface AdminTeam {
  id: string;
  classroom_id: string;
  name: string;
  color_hex: string;
  score: number;
  order_index: number;
}

export interface AdminLessonSummary {
  id: string;
  title: string;
  subject: 'math' | 'vietnamese' | 'english';
  status: 'draft' | 'publish';
  description?: string;
  total_slides: number;
  is_builtin: boolean;
  content_json?: unknown;
  updated_at?: string;
}

export interface AdminTeachingSessionHistory {
  id: string;
  title: string;
  subject: 'math' | 'vietnamese' | 'english';
  timestamp: number;
  totalQuestions: number;
  totalCorrect: number;
  starsAwarded: number;
  notes?: string;
}

const USERS_LOCAL_STORAGE_KEY = 'onthi_admin_users_cache_v1';

// Seed default users if local storage empty
function getLocalUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(USERS_LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminUser[];
  } catch {
    // ignore
  }
  return [
    {
      id: 'a0000000-0000-0000-0000-000000000001',
      email: 'giaovien@onthi.app',
      full_name: 'Cô Thu Tâm',
      role: 'teacher',
      phone_number: '0988123456',
      school_name: 'Trường Tiểu học Kim Đồng',
      created_at: new Date().toISOString(),
    },
    {
      id: 'a0000000-0000-0000-0000-000000000002',
      email: 'admin@onthi.app',
      full_name: 'Thầy Quản Trị Viên',
      role: 'admin',
      phone_number: '0912345678',
      school_name: 'Hệ thống Onthi Tiểu Học',
      created_at: new Date().toISOString(),
    },
  ];
}

function saveLocalUsers(users: AdminUser[]): void {
  try {
    localStorage.setItem(USERS_LOCAL_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

// ==========================================
// 1. QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG (USERS)
// ==========================================
export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        saveLocalUsers(data as AdminUser[]);
        return data as AdminUser[];
      }
    } catch (e) {
      console.warn('[Admin] Lỗi lấy danh sách user từ Cloud, dùng cache local:', e);
    }
  }
  return getLocalUsers();
}

export async function saveAdminUser(user: Partial<AdminUser> & { email: string; full_name: string }): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
  const id = user.id || crypto.randomUUID();
  const fullUser: AdminUser = {
    id,
    email: user.email.trim().toLowerCase(),
    full_name: user.full_name.trim(),
    role: user.role || 'teacher',
    phone_number: user.phone_number?.trim() || '',
    school_name: user.school_name?.trim() || 'Trường Tiểu học',
    created_at: user.created_at || new Date().toISOString(),
  };

  const local = getLocalUsers();
  const idx = local.findIndex((u) => u.id === fullUser.id || u.email === fullUser.email);
  if (idx >= 0) {
    local[idx] = fullUser;
  } else {
    local.unshift(fullUser);
  }
  saveLocalUsers(local);

  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('users').upsert({
        id: fullUser.id,
        email: fullUser.email,
        full_name: fullUser.full_name,
        role: fullUser.role,
        phone_number: fullUser.phone_number,
        school_name: fullUser.school_name,
      }, { onConflict: 'id' });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }

  return { success: true, user: fullUser };
}

export async function deleteAdminUser(id: string): Promise<{ success: boolean; error?: string }> {
  const local = getLocalUsers().filter((u) => u.id !== id);
  saveLocalUsers(local);

  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('users').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }
  return { success: true };
}

// ==========================================
// 2. QUẢN LÝ LỚP HỌC (CLASSROOMS)
// ==========================================
export async function fetchAdminClassrooms(): Promise<AdminClassroom[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('classrooms').select('*').order('name', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data as AdminClassroom[];
      }
    } catch {
      // ignore
    }
  }
  return [
    {
      id: 'class-1a1',
      name: 'Lớp 1A1',
      grade_level: 1,
      academic_year: '2025-2026',
      teacher_name: 'Cô Thu Tâm',
    },
  ];
}

export async function saveAdminClassroom(classroom: Partial<AdminClassroom> & { id: string; name: string }): Promise<{ success: boolean; error?: string }> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('classrooms').upsert({
        id: classroom.id,
        name: classroom.name,
        grade_level: classroom.grade_level || 1,
        academic_year: classroom.academic_year || '2025-2026',
        teacher_name: classroom.teacher_name || 'Cô giáo chủ nhiệm',
        teacher_id: classroom.teacher_id || null,
      }, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }
  return { success: true };
}

// ==========================================
// 3. QUẢN LÝ TỔ THI ĐUA (TEAMS)
// ==========================================
export async function fetchAdminTeams(): Promise<AdminTeam[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('teams').select('*').order('order_index', { ascending: true });
      if (!error && Array.isArray(data) && data.length > 0) {
        return data as AdminTeam[];
      }
    } catch {
      // ignore
    }
  }
  const storeTeams = getClassroomStore().getData().teams;
  return storeTeams.map((t, idx) => ({
    id: t.id,
    classroom_id: 'class-1a1',
    name: t.name,
    color_hex: t.color,
    score: t.score,
    order_index: idx + 1,
  }));
}

export async function saveAdminTeam(team: Partial<AdminTeam> & { id: string; name: string }): Promise<{ success: boolean; error?: string }> {
  if (team.score !== undefined) {
    getClassroomStore().setTeamScore(team.id, team.score);
  }
  if (team.name) {
    getClassroomStore().renameTeam(team.id, team.name);
  }

  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('teams').upsert({
        id: team.id,
        classroom_id: team.classroom_id || 'class-1a1',
        name: team.name,
        color_hex: team.color_hex || '#eab308',
        score: team.score ?? 0,
        order_index: team.order_index ?? 1,
      }, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
    } catch (e) {
      return { success: false, error: String(e) };
    }
  }
  return { success: true };
}

// ==========================================
// 4. QUẢN LÝ BÀI GIẢNG (LESSONS)
// ==========================================
function isBuiltinId(id: string): boolean {
  return BUILTIN_LESSON_URLS.some((url) => url.includes(id));
}

export async function fetchAdminLessons(): Promise<AdminLessonSummary[]> {
  const allLocal = await getAllLessons();
  const mappedLocal: AdminLessonSummary[] = allLocal.map((l) => ({
    id: l.id,
    title: l.title,
    subject: l.subject,
    status: l.status,
    description: l.description,
    total_slides: l.slides.length,
    is_builtin: isBuiltinId(l.id),
    content_json: l,
  }));

  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('lessons').select('*').order('created_at', { ascending: false });
      if (!error && Array.isArray(data) && data.length > 0) {
        const cloudLessons: AdminLessonSummary[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          subject: (row.subject as 'math' | 'vietnamese' | 'english') || 'math',
          status: (row.status as 'draft' | 'publish') || 'publish',
          description: row.description || '',
          total_slides: row.total_slides || 1,
          is_builtin: Boolean(row.is_builtin),
          content_json: row.content_json,
          updated_at: row.updated_at,
        }));

        const existingIds = new Set(cloudLessons.map((l) => l.id));
        const combined = [...cloudLessons];
        for (const local of mappedLocal) {
          if (!existingIds.has(local.id)) {
            combined.push(local);
          }
        }
        return combined;
      }
    } catch {
      // ignore
    }
  }

  return mappedLocal;
}

export async function saveAdminLesson(lesson: Lesson): Promise<{ success: boolean; error?: string }> {
  const localRes = saveCustomLesson(lesson);
  if (!localRes.success) {
    return localRes;
  }

  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('lessons').upsert({
        id: lesson.id,
        subject: lesson.subject,
        title: lesson.title,
        description: lesson.description || '',
        status: lesson.status,
        content_json: lesson,
        total_slides: lesson.slides.length,
        is_builtin: isBuiltinId(lesson.id),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });
    } catch (e) {
      console.warn('[Admin] Không thể lưu bài giảng lên Supabase:', e);
    }
  }

  return { success: true };
}

export async function deleteAdminLesson(lessonId: string): Promise<boolean> {
  const localSuccess = deleteCustomLesson(lessonId);

  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('lessons').delete().eq('id', lessonId);
    } catch (e) {
      console.warn('[Admin] Lỗi xóa bài giảng trên Supabase:', e);
    }
  }

  return localSuccess;
}

// ==========================================
// 5. QUẢN LÝ LỊCH SỬ TIẾT DẠY & CÂU HAY SAI
// ==========================================
export async function fetchAdminSessionHistory(): Promise<AdminTeachingSessionHistory[]> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('teaching_sessions').select('*').order('start_time', { ascending: false }).limit(50);
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((row: any) => ({
          id: row.id,
          title: row.title || 'Tiết học',
          subject: (row.subject as 'math' | 'vietnamese' | 'english') || 'math',
          timestamp: row.start_time ? new Date(row.start_time).getTime() : Date.now(),
          totalQuestions: row.total_questions || 0,
          totalCorrect: row.total_correct || 0,
          starsAwarded: row.stars_awarded || 0,
          notes: row.notes,
        }));
      }
    } catch {
      // ignore
    }
  }
  return [];
}

export async function fetchAdminMistakes(): Promise<MistakeEntry[]> {
  return getMistakeTracker().getMistakes();
}

// ==========================================
// 6. KIỂM TRA KẾT NỐI CLOUD SUPABASE
// ==========================================
export async function testCloudConnection(): Promise<{ connected: boolean; latencyMs: number; message: string }> {
  const sb = getSupabase();
  if (!sb) {
    return { connected: false, latencyMs: 0, message: 'Chưa cấu hình Supabase URL hoặc API Key' };
  }

  const start = performance.now();
  try {
    const { count, error } = await sb.from('classrooms').select('*', { count: 'exact', head: true });
    const latency = Math.round(performance.now() - start);

    if (error) {
      return { connected: false, latencyMs: latency, message: `Lỗi kết nối: ${error.message}` };
    }
    return { connected: true, latencyMs: latency, message: `Đã kết nối thành công tới Supabase Cloud (${latency}ms)` };
  } catch (e) {
    return { connected: false, latencyMs: 0, message: `Mất mạng hoặc lỗi máy chủ: ${String(e)}` };
  }
}
