import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Student } from './classroom-store';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  if (!supabaseUrl || !supabaseKey) {
    console.info('[Supabase] VITE_SUPABASE_URL hoặc KEY chưa được cấu hình. Sử dụng IndexedDB cục bộ.');
    return null;
  }

  try {
    client = createClient(supabaseUrl, supabaseKey);
    return client;
  } catch (e) {
    console.warn('[Supabase] Khởi tạo Supabase client thất bại:', e);
    return null;
  }
}

export interface SupabaseStudentRow {
  id: string;
  name: string;
  gender?: string | null;
  team_id?: string | null;
  is_absent?: boolean | null;
  call_count?: number | null;
  stars?: number | null;
  note?: string | null;
  created_at?: string | null;
}

function rowToStudent(row: SupabaseStudentRow): Student {
  return {
    id: row.id,
    name: row.name,
    gender: (row.gender as 'Nam' | 'Nữ') || 'Nam',
    teamId: row.team_id || 'team-1',
    isAbsent: Boolean(row.is_absent),
    callCount: Number(row.call_count || 0),
    stars: Number(row.stars || 0),
    note: row.note || '',
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}

function studentToRow(s: Student): SupabaseStudentRow {
  return {
    id: s.id,
    name: s.name,
    gender: s.gender || 'Nam',
    team_id: s.teamId || 'team-1',
    is_absent: Boolean(s.isAbsent),
    call_count: Number(s.callCount || 0),
    stars: Number(s.stars || 0),
    note: s.note || '',
  };
}

/**
 * Tải toàn bộ học sinh từ Supabase Cloud
 */
export async function fetchStudentsFromSupabase(): Promise<Student[] | null> {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data, error } = await sb
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] Không thể tải danh sách học sinh (Có thể chưa tạo bảng students trên Supabase):', error.message);
      return null;
    }

    if (Array.isArray(data)) {
      return data.map((row) => rowToStudent(row as SupabaseStudentRow));
    }
    return null;
  } catch (e) {
    console.warn('[Supabase] Lỗi kết nối Supabase Cloud:', e);
    return null;
  }
}

/**
 * Lưu hoặc cập nhật một học sinh lên Supabase Cloud (Upsert)
 */
export async function syncStudentToSupabase(student: Student): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const row = studentToRow(student);
    const { error } = await sb.from('students').upsert(row, { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Lỗi đồng bộ học sinh lên Cloud:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[Supabase] Lỗi mạng khi đồng bộ học sinh:', e);
    return false;
  }
}

/**
 * Xóa một học sinh khỏi Supabase Cloud
 */
export async function deleteStudentFromSupabaseCloud(id: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  try {
    const { error } = await sb.from('students').delete().eq('id', id);
    if (error) {
      console.warn('[Supabase] Lỗi xóa học sinh trên Cloud:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[Supabase] Lỗi mạng khi xóa học sinh trên Cloud:', e);
    return false;
  }
}

/**
 * Đồng bộ toàn bộ danh sách học sinh lên Supabase Cloud (Batch Upsert)
 */
export async function syncAllStudentsToSupabase(students: Student[]): Promise<boolean> {
  const sb = getSupabase();
  if (!sb || students.length === 0) return false;

  try {
    const rows = students.map(studentToRow);
    const { error } = await sb.from('students').upsert(rows, { onConflict: 'id' });
    if (error) {
      console.warn('[Supabase] Lỗi batch upsert học sinh lên Cloud:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[Supabase] Lỗi mạng khi batch sync:', e);
    return false;
  }
}
