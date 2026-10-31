import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAuthState,
  hasActiveSession,
  setOfflineMode,
  subscribeAuth,
  signOut,
} from './auth-service';
import { fetchStudentsFromSupabase, syncStudentToSupabase } from './supabase-client';

describe('Auth Service & Offline-First Sync Guard', () => {
  beforeEach(() => {
    localStorage.clear();
    setOfflineMode(false);
  });

  it('initial state has hasActiveSession as false and isAuthenticated as false', () => {
    const state = getAuthState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.session).toBeNull();
    expect(state.user).toBeNull();
    expect(hasActiveSession()).toBe(false);
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
    // When hasActiveSession() is false, fetchStudentsFromSupabase must immediately return null
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
    // Should not receive further updates after unsubscribe
    expect(mockListener).toHaveBeenCalledTimes(2);
  });
});
