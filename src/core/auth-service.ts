// Authentication & Session Management Service (Supabase Auth + Role-Based Access Control)
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from './supabase-client';

export type UserRole = 'admin' | 'teacher' | 'parent';

export interface AuthState {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isAdmin: boolean;
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

async function resolveUserRole(uid: string, email?: string): Promise<UserRole> {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@onthi.app';
  if (email && email.trim().toLowerCase() === adminEmail.trim().toLowerCase()) {
    return 'admin';
  }

  const sb = getSupabase();
  if (sb) {
    try {
      const { data } = await sb.from('users').select('role').eq('id', uid).maybeSingle();
      if (data?.role) return data.role as UserRole;
    } catch {
      // fallback
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
