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
});
