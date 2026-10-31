// Authentication & Session Management Service (Supabase Auth + Offline Fallback)
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from './supabase-client';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isOfflineMode: boolean;
  isLoading: boolean;
}

const OFFLINE_MODE_KEY = 'onthi_offline_mode_preference_v1';

let currentSession: Session | null = null;
let currentUser: User | null = null;
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

/**
 * Lấy trạng thái xác thực hiện tại đồng bộ
 */
export function getAuthState(): AuthState {
  return {
    user: currentUser,
    session: currentSession,
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
 * Đăng ký lắng nghe thay đổi trạng thái xác thực
 */
export function subscribeAuth(listener: (state: AuthState) => void): () => void {
  listeners.add(listener);
  // Gọi ngay trạng thái ban đầu
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
    }
  } catch (e) {
    console.warn('[Auth] Lỗi lấy session ban đầu:', e);
  } finally {
    isInitialized = true;
    notifyListeners();
  }

  // Lắng nghe sự kiện đăng nhập / đăng xuất từ Supabase
  sb.auth.onAuthStateChange((_event, session) => {
    currentSession = session;
    currentUser = session?.user || null;
    if (session) {
      isOffline = false;
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
): Promise<{ success: boolean; user?: User; error?: string }> {
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
    notifyListeners();

    return { success: true, user: data.user };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Lỗi kết nối máy chủ xác thực';
    return { success: false, error: msg };
  }
}

/**
 * Đăng ký tài khoản giáo viên mới
 */
export async function signUpWithPassword(
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean; user?: User; error?: string; requireEmailConfirmation?: boolean }> {
  const sb = getSupabase();
  if (!sb) {
    return { success: false, error: 'Không tìm thấy cấu hình Supabase Cloud.' };
  }

  try {
    const { data, error } = await sb.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.session && data.user) {
      currentSession = data.session;
      currentUser = data.user;
      isOffline = false;
      setOfflineMode(false);
      notifyListeners();
      return { success: true, user: data.user };
    }

    // Nếu Supabase bật confirm email
    return {
      success: true,
      user: data.user ?? undefined,
      requireEmailConfirmation: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Lỗi tạo tài khoản mới';
    return { success: false, error: msg };
  }
}

/**
 * Đăng xuất khỏi hệ thống Cloud
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) {
    currentSession = null;
    currentUser = null;
    notifyListeners();
    return { success: true };
  }

  try {
    const { error } = await sb.auth.signOut();
    currentSession = null;
    currentUser = null;
    notifyListeners();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    currentSession = null;
    currentUser = null;
    notifyListeners();
    const msg = err instanceof Error ? err.message : 'Lỗi khi đăng xuất';
    return { success: false, error: msg };
  }
}
