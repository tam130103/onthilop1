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
let roleResolvedUserId: string | null = null;
let roleResolutionVersion = 0;

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
  // The users table is the only online role authority. Email and user_metadata
  // are user-controlled identity fields and must never grant a privileged role.
  const sb = getSupabase();
  if (sb) {
    try {
      const { data } = await sb.from('users').select('role').eq('id', uid).maybeSingle();
      if (data?.role && (data.role === 'admin' || data.role === 'teacher' || data.role === 'parent')) {
        return data.role as UserRole;
      }
    } catch {
      // Fall through to the restricted default when the server cannot verify a role.
    }
  }

  // A local role cache is useful only in explicit offline mode. Never use it
  // to elevate a live Auth session if its server-side profile is missing.
  if (isOffline) {
    try {
      const raw = localStorage.getItem('onthi_admin_users_cache_v1');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          const normalizedEmail = email?.trim().toLowerCase();
          const found = (list as CachedUserRecord[]).find(
            (u) => (u.email?.trim().toLowerCase() === normalizedEmail && Boolean(normalizedEmail)) || u.id === uid
          );
          if (found?.role && (found.role === 'admin' || found.role === 'teacher' || found.role === 'parent')) {
            return found.role;
          }
        }
      }
    } catch {
      // ignore malformed offline cache
    }
  }

  // Unknown online identities get the most restricted UI role available.
  return 'parent';
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
  const initializationVersion = ++roleResolutionVersion;
  roleResolvedUserId = null;
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
    if (roleResolutionVersion === initializationVersion && !error && data.session) {
      const initialUser = data.session.user;
      const role = await resolveUserRole(initialUser.id, initialUser.email);
      if (roleResolutionVersion === initializationVersion) {
        currentSession = data.session;
        currentUser = initialUser;
        isOffline = false;
        currentRole = role;
        roleResolvedUserId = initialUser.id;
      }
    }
  } catch (e) {
    console.warn('[Auth] Lỗi lấy session ban đầu:', e);
  } finally {
    if (roleResolutionVersion === initializationVersion) {
      isInitialized = true;
      notifyListeners();
    }
  }

  // Lắng nghe sự kiện đăng nhập / đăng xuất từ Supabase
  sb.auth.onAuthStateChange((event, session) => {
    const nextUserId = session?.user.id ?? null;

    if (!session) {
      roleResolutionVersion += 1;
      roleResolvedUserId = null;
      currentSession = null;
      currentUser = null;
      currentRole = 'teacher';
      isInitialized = true;
      notifyListeners();
      return;
    }

    currentSession = session;
    currentUser = session.user;
    isOffline = false;

    if (event === 'INITIAL_SESSION' && nextUserId === roleResolvedUserId) {
      notifyListeners();
      return;
    }

    const sameUser = nextUserId === roleResolvedUserId;
    const resolutionVersion = ++roleResolutionVersion;
    if (!sameUser) {
      currentRole = 'parent';
      isInitialized = false;
      notifyListeners();
    }

    // Supabase auth listeners run under an internal lock. Defer profile reads
    // until after this synchronous callback returns to avoid client deadlocks.
    setTimeout(() => {
      void resolveUserRole(session.user.id, session.user.email).then((role) => {
        if (resolutionVersion !== roleResolutionVersion || currentSession?.user.id !== nextUserId) return;
        currentRole = role;
        roleResolvedUserId = session.user.id;
        isInitialized = true;
        notifyListeners();
      }).catch(() => {
        if (resolutionVersion !== roleResolutionVersion || currentSession?.user.id !== nextUserId) return;
        currentRole = 'parent';
        roleResolvedUserId = session.user.id;
        isInitialized = true;
        notifyListeners();
      });
    }, 0);
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
    currentRole = 'parent';
    isInitialized = false;
    const resolutionVersion = ++roleResolutionVersion;
    setOfflineMode(false);

    if (data.user) {
      const role = await resolveUserRole(data.user.id, data.user.email);
      if (currentSession?.user.id === data.user.id) {
        roleResolutionVersion = Math.max(roleResolutionVersion, resolutionVersion) + 1;
        roleResolvedUserId = data.user.id;
        currentRole = role;
        isInitialized = true;
      }
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
  roleResolutionVersion += 1;
  roleResolvedUserId = null;
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
