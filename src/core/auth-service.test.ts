import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as authService from './auth-service';
import {
  getAuthState,
  hasActiveSession,
  setOfflineMode,
  subscribeAuth,
  signOut,
  signInWithPassword,
} from './auth-service';
import { fetchStudentsFromSupabase, syncStudentToSupabase } from './supabase-client';
import { saveAdminUser, deleteAdminUser } from './admin-service';
import fs from 'fs';
import path from 'path';

describe('Auth Service & Offline-First Sync Guard', () => {
  beforeEach(() => {
    localStorage.clear();
    setOfflineMode(false);
  });

  it('guarantees signUpWithPassword is deleted and NOT exposed on auth-service', () => {
    // Requirements: Xóa tab "Đăng ký" và signUpWithPassword khỏi LoginPage/auth-service
    expect((authService as Record<string, unknown>).signUpWithPassword).toBeUndefined();
    expect(typeof signInWithPassword).toBe('function');
  });

  it('verifies LoginPage does not invoke or import signUp anywhere in its UI code', () => {
    const loginPagePath = path.resolve(__dirname, '../pages/LoginPage.tsx');
    const loginPageContent = fs.readFileSync(loginPagePath, 'utf8');

    // Must NOT contain signUpWithPassword or signup mode tabs
    expect(loginPageContent.includes('signUpWithPassword')).toBe(false);
    expect(loginPageContent.includes("setMode('signup')")).toBe(false);
    expect(loginPageContent.includes('Đăng ký cô giáo mới')).toBe(false);

    // Must contain signInWithPassword and Offline mode
    expect(loginPageContent.includes('signInWithPassword')).toBe(true);
    expect(loginPageContent.includes('setOfflineMode')).toBe(true);
    expect(loginPageContent.includes('Vào dạy Offline ngay')).toBe(true);
  });

  it('initial state has hasActiveSession as false and isAuthenticated as false', () => {
    const state = getAuthState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.session).toBeNull();
    expect(state.user).toBeNull();
    expect(state.role).toBe('teacher');
    expect(state.isAdmin).toBe(false);
    expect(hasActiveSession()).toBe(false);
    expect(authService.isAdmin()).toBe(false);
    expect(authService.getUserRole()).toBe('teacher');
  });

  it('can toggle offline mode and notify listeners', () => {
    let notifiedState = getAuthState();
    const unsubscribe = subscribeAuth((st) => {
      notifiedState = st;
    });

    setOfflineMode(true);
    expect(getAuthState().isOfflineMode).toBe(true);
    expect(notifiedState.isOfflineMode).toBe(true);
    expect(localStorage.getItem('onthi_offline_mode_preference_v1')).toBe('true');

    setOfflineMode(false);
    expect(getAuthState().isOfflineMode).toBe(false);
    expect(notifiedState.isOfflineMode).toBe(false);

    unsubscribe();
  });

  it('fetchStudentsFromSupabase returns null without attempting query when no session exists', async () => {
    expect(hasActiveSession()).toBe(false);
    const result = await fetchStudentsFromSupabase();
    expect(result).toBeNull();
  });

  it('syncStudentToSupabase returns false without sending network requests when no session exists', async () => {
    expect(hasActiveSession()).toBe(false);
    const result = await syncStudentToSupabase({
      id: 'test-1',
      name: 'Bé Học Sinh',
      isAbsent: false,
      callCount: 0,
    });
    expect(result).toBe(false);
  });

  it('signOut clears session and sets isAuthenticated to false', async () => {
    const res = await signOut();
    expect(res.success).toBe(true);
    expect(hasActiveSession()).toBe(false);
    expect(getAuthState().isAuthenticated).toBe(false);
  });

  it('subscriber receives initial state upon registration and can unsubscribe cleanly', () => {
    const mockListener = vi.fn();
    const unsub = subscribeAuth(mockListener);

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(expect.objectContaining({
      isAuthenticated: false,
    }));

    setOfflineMode(true);
    expect(mockListener).toHaveBeenCalledTimes(2);

    unsub();
    setOfflineMode(false);
    expect(mockListener).toHaveBeenCalledTimes(2);
  });

  describe('Role-Based Access Control (RBAC): Admin vs Teacher vs Parent', () => {
    beforeEach(() => {
      authService.setUserRole('teacher');
    });

    it('Admin role has exclusive permission to manage users, plus classroom and lesson editing', () => {
      authService.setUserRole('admin');

      expect(authService.getUserRole()).toBe('admin');
      expect(authService.isAdmin()).toBe(true);
      expect(authService.isTeacher()).toBe(false);
      expect(authService.isParent()).toBe(false);

      expect(authService.canManageUsers()).toBe(true);
      expect(authService.canEditClassroom()).toBe(true);
      expect(authService.canEditLessons()).toBe(true);
      expect(authService.canTeach()).toBe(true);

      const state = authService.getAuthState();
      expect(state.role).toBe('admin');
      expect(state.isAdmin).toBe(true);
      expect(state.isTeacher).toBe(false);
      expect(state.isParent).toBe(false);
      expect(state.canManageUsers).toBe(true);
      expect(state.canEditClassroom).toBe(true);
    });

    it('Teacher role can edit within classroom and lessons, but CANNOT manage users or roles', () => {
      authService.setUserRole('teacher');

      expect(authService.getUserRole()).toBe('teacher');
      expect(authService.isAdmin()).toBe(false);
      expect(authService.isTeacher()).toBe(true);
      expect(authService.isParent()).toBe(false);

      // Strict requirement: Chỉ admin mới được phân quyền
      expect(authService.canManageUsers()).toBe(false);

      // Strict requirement: Giáo viên chỉ được chỉnh sửa trong lớp
      expect(authService.canEditClassroom()).toBe(true);
      expect(authService.canEditLessons()).toBe(true);
      expect(authService.canTeach()).toBe(true);

      const state = authService.getAuthState();
      expect(state.role).toBe('teacher');
      expect(state.canManageUsers).toBe(false);
      expect(state.canEditClassroom).toBe(true);
    });

    it('Parent role can ONLY learn: cannot manage users, cannot edit classroom or lessons, cannot teach', () => {
      authService.setUserRole('parent');

      expect(authService.getUserRole()).toBe('parent');
      expect(authService.isAdmin()).toBe(false);
      expect(authService.isTeacher()).toBe(false);
      expect(authService.isParent()).toBe(true);

      // Strict requirement: Phụ huynh chỉ học được
      expect(authService.canManageUsers()).toBe(false);
      expect(authService.canEditClassroom()).toBe(false);
      expect(authService.canEditLessons()).toBe(false);
      expect(authService.canTeach()).toBe(false);

      const state = authService.getAuthState();
      expect(state.role).toBe('parent');
      expect(state.isParent).toBe(true);
      expect(state.canManageUsers).toBe(false);
      expect(state.canEditClassroom).toBe(false);
    });

    it('resolves parent email to parent role correctly', async () => {
      const parentRole = await authService.resolveUserRole('any-uid', 'phuhuynh@tieuhoc.edu.vn');
      expect(parentRole).toBe('parent');

      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@tieuhoc.edu.vn';
      const adminRole = await authService.resolveUserRole('any-uid', adminEmail);
      expect(adminRole).toBe('admin');

      const teacherRole = await authService.resolveUserRole('any-uid', 'giaovien@tieuhoc.edu.vn');
      expect(teacherRole).toBe('teacher');
    });

    it('enforces that only admin can save or delete users; blocks teachers and parents', async () => {
      // 1. Teacher attempts to save/delete user
      authService.setUserRole('teacher');
      const teacherSave = await saveAdminUser({
        email: 'blocked@school.edu.vn',
        full_name: 'Người dùng Bị Chặn',
        role: 'teacher',
      });
      expect(teacherSave.success).toBe(false);
      expect(teacherSave.error).toContain('Chỉ tài khoản Quản trị viên (Admin) mới có quyền');

      const teacherDel = await deleteAdminUser('any-id');
      expect(teacherDel.success).toBe(false);
      expect(teacherDel.error).toContain('Chỉ tài khoản Quản trị viên (Admin) mới có quyền');

      // 2. Parent attempts to save/delete user
      authService.setUserRole('parent');
      const parentSave = await saveAdminUser({
        email: 'blocked@school.edu.vn',
        full_name: 'Người dùng Bị Chặn',
        role: 'parent',
      });
      expect(parentSave.success).toBe(false);
      expect(parentSave.error).toContain('Chỉ tài khoản Quản trị viên (Admin) mới có quyền');

      const parentDel = await deleteAdminUser('any-id');
      expect(parentDel.success).toBe(false);
      expect(parentDel.error).toContain('Chỉ tài khoản Quản trị viên (Admin) mới có quyền');

      // 3. Admin can save and delete users
      authService.setUserRole('admin');
      const adminSave = await saveAdminUser({
        id: 'test-admin-created-user-1',
        email: 'newuser@school.edu.vn',
        full_name: 'Cô Giáo Mới',
        role: 'teacher',
      });
      expect(adminSave.success).toBe(true);
      expect(adminSave.user?.email).toBe('newuser@school.edu.vn');

      const adminDel = await deleteAdminUser('test-admin-created-user-1');
      expect(adminDel.success).toBe(true);
    });
  });
});
