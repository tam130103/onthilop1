// Authentication & Session Management Service (Supabase Auth + Role-Based Access Control)
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from './supabase-client';

export type UserRole = 'admin' | 'teacher' | 'parent';

export interface AuthState {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isAdmin: boolean;
  isTeacher: boolean;
  isParent: boolean;
  canManageUsers: boolean;
  canEditClassroom: boolean;
  isAuthenticated: boolean;
  isOfflineMode: boolean;
  isLoading: boolean;
}

const OFFLINE_MODE_KEY = 'onthi_offline_mode_preference_v1';

let currentSession: Session | null = null;
let currentUser: User | null = null;
let currentRole: UserRole = 'teacher';
let isOffline: boolean = false;
let isInitialized: boolean = false;

const listeners = new Set<(state: AuthState) => void>();

function notifyListeners(): void {
  const state = getAuthState();
  listeners.forEach((listener) => {
    try {
      listener(state);
    } catch {
      // ignore
    }
  });
}

interface CachedUserRecord {
  id?: string;
  email?: string;
  role?: UserRole;
}

export async function resolveUserRole(uid: string, email?: string): Promise<UserRole> {
  const normalizedEmail = email?.trim().toLowerCase();
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@tieuhoc.edu.vn').trim().toLowerCase();
  if (normalizedEmail && normalizedEmail === adminEmail) {
    return 'admin';
  }

  const parentEmail = (import.meta.env.VITE_PARENT_EMAIL || 'phuhuynh@tieuhoc.edu.vn').trim().toLowerCase();
  if (normalizedEmail && normalizedEmail === parentEmail) {
    return 'parent';
  }

  // 1. Check Supabase users table first (authoritative server-side role management)
  const sb = getSupabase();
  if (sb) {
    try {
      const { data } = await sb.from('users').select('role').eq('id', uid).maybeSingle();
      if (data?.role && (data.role === 'admin' || data.role === 'teacher' || data.role === 'parent')) {
        return data.role as UserRole;
      }
    } catch {
      // fallback
    }
  }

  // 2. Check local users cache (offline authoritative role changes synced locally)
  try {
    const raw = localStorage.getItem('onthi_admin_users_cache_v1');
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        const found = (list as CachedUserRecord[]).find(
          (u) => (u.email && u.email.toLowerCase() === normalizedEmail) || (u.id && u.id === uid)
        );
        if (found?.role && (found.role === 'admin' || found.role === 'teacher' || found.role === 'parent')) {
          return found.role;
        }
      }
    }
  } catch {
    // ignore
  }

  // 3. Fallback to auth token metadata if available
  if (currentUser?.user_metadata?.role) {
    const metaRole = currentUser.user_metadata.role as string;
    if (metaRole === 'admin' || metaRole === 'teacher' || metaRole === 'parent') {
      return metaRole;
    }
  }

  return 'teacher';
}

/**
 * Lấy trạng thái xác thực hiện tại đồng bộ
 */
export function getAuthState(): AuthState {
  return {
    user: currentUser,
    session: currentSession,
    role: currentRole,
    isAdmin: currentRole === 'admin',
    isTeacher: currentRole === 'teacher',
    isParent: currentRole === 'parent',
    canManageUsers: currentRole === 'admin',
    canEditClassroom: currentRole === 'admin' || currentRole === 'teacher',
    isAuthenticated: Boolean(currentSession?.user),
    isOfflineMode: isOffline,
    isLoading: !isInitialized,
  };
}

/**
 * Kiểm tra nhanh xem hiện có session đăng nhập hợp lệ không
 */
export function hasActiveSession(): boolean {
  return Boolean(currentSession?.user);
}

/**
 * Kiểm tra người dùng hiện tại có vai trò Quản trị viên (Admin) không
 */
export function isAdmin(): boolean {
  return currentRole === 'admin';
}

/**
 * Kiểm tra người dùng hiện tại có vai trò Giáo viên không
 */
export function isTeacher(): boolean {
  return currentRole === 'teacher';
}

/**
 * Kiểm tra người dùng hiện tại có vai trò Phụ huynh (chỉ học tập) không
 */
export function isParent(): boolean {
  return currentRole === 'parent';
}

/**
 * Phân quyền: Chỉ tài khoản Admin mới có quyền phân quyền người dùng
 */
export function canManageUsers(): boolean {
  return currentRole === 'admin';
}

/**
 * Phân quyền: Giáo viên và Admin được chỉnh sửa trong lớp học
 * (Phụ huynh chỉ xem, không được sửa học sinh hay điểm tổ)
 */
export function canEditClassroom(): boolean {
  return currentRole === 'admin' || currentRole === 'teacher';
}

/**
 * Phân quyền: Giáo viên và Admin được soạn bài dạy
 * (Phụ huynh chỉ học)
 */
export function canEditLessons(): boolean {
  return currentRole === 'admin' || currentRole === 'teacher';
}

/**
 * Phân quyền: Chỉ Giáo viên và Admin mới được vào phòng dạy Presenter
 */
export function canTeach(): boolean {
  return currentRole === 'admin' || currentRole === 'teacher';
}

/**
 * Thiết lập trực tiếp vai trò (dành cho kiểm thử hoặc chuyển role offline)
 */
export function setUserRole(role: UserRole): void {
  currentRole = role;
  notifyListeners();
}

/**
 * Lấy vai trò của người dùng hiện tại
 */
export function getUserRole(): UserRole {
  return currentRole;
}

/**
 * Đăng ký lắng nghe thay đổi trạng thái xác thực
 */
export function subscribeAuth(listener: (state: AuthState) => void): () => void {
  listeners.add(listener);
  listener(getAuthState());
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Bật hoặc tắt cờ chế độ Offline ưu tiên
 */
export function setOfflineMode(enabled: boolean): void {
  isOffline = enabled;
  try {
    if (enabled) {
      localStorage.setItem(OFFLINE_MODE_KEY, 'true');
    } else {
      localStorage.removeItem(OFFLINE_MODE_KEY);
    }
  } catch {
    // ignore
  }
  notifyListeners();
}

/**
 * Khởi tạo Auth: Kiểm tra session từ Supabase hoặc khôi phục chế độ Offline
 */
export async function initAuth(): Promise<AuthState> {
  if (typeof window !== 'undefined') {
    try {
      isOffline = localStorage.getItem(OFFLINE_MODE_KEY) === 'true';
    } catch {
      isOffline = false;
    }
  }

  const sb = getSupabase();
  if (!sb) {
    isInitialized = true;
    notifyListeners();
    return getAuthState();
  }

  try {
    const { data, error } = await sb.auth.getSession();
    if (!error && data.session) {
      currentSession = data.session;
      currentUser = data.session.user;
      isOffline = false;
      currentRole = await resolveUserRole(currentUser.id, currentUser.email);
    }
  } catch (e) {
    console.warn('[Auth] Lỗi lấy session ban đầu:', e);
  } finally {
    isInitialized = true;
    notifyListeners();
  }

  // Lắng nghe sự kiện đăng nhập / đăng xuất từ Supabase
  sb.auth.onAuthStateChange(async (_event, session) => {
    currentSession = session;
    currentUser = session?.user || null;
    if (session && session.user) {
      isOffline = false;
      currentRole = await resolveUserRole(session.user.id, session.user.email);
    } else {
      currentRole = 'teacher';
    }
    notifyListeners();
  });

  return getAuthState();
}

/**
 * Đăng nhập bằng Email và Mật khẩu
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; role?: UserRole; error?: string }> {
  const sb = getSupabase();
  if (!sb) {
    return { success: false, error: 'Không tìm thấy cấu hình Supabase Cloud.' };
  }

  try {
    const { data, error } = await sb.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    currentSession = data.session;
    currentUser = data.user;
    isOffline = false;
    setOfflineMode(false);

    if (data.user) {
      currentRole = await resolveUserRole(data.user.id, data.user.email);
    }

    notifyListeners();

    return { success: true, user: data.user, role: currentRole };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Lỗi kết nối máy chủ xác thực';
    return { success: false, error: msg };
  }
}

/**
 * Đăng xuất khỏi hệ thống Cloud
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  const sb = getSupabase();
  currentSession = null;
  currentUser = null;
  currentRole = 'teacher';
  notifyListeners();

  if (!sb) {
    return { success: true };
  }

  try {
    const { error } = await sb.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Lỗi khi đăng xuất';
    return { success: false, error: msg };
  }
}
