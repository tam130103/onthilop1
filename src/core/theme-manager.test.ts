import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getTheme,
  setTheme,
  toggleTheme,
  subscribeTheme,
  initTheme,
} from './theme-manager';

describe('Theme Manager & Dark Mode Tokens', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes and defaults to light mode when no preference is saved', () => {
    initTheme();
    const currentTheme = getTheme();
    expect(['light', 'dark']).toContain(currentTheme);
    expect(document.documentElement.getAttribute('data-theme')).toBe(currentTheme);
  });

  it('persists theme mode to localStorage and updates documentElement', () => {
    setTheme('dark');
    expect(getTheme()).toBe('dark');
    expect(localStorage.getItem('trinh_chieu_theme_mode')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    setTheme('light');
    expect(getTheme()).toBe('light');
    expect(localStorage.getItem('trinh_chieu_theme_mode')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles theme seamlessly with toggleTheme()', () => {
    setTheme('light');
    const newTheme = toggleTheme();
    expect(newTheme).toBe('dark');
    expect(getTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    const reverted = toggleTheme();
    expect(reverted).toBe('light');
    expect(getTheme()).toBe('light');
  });

  it('notifies subscribers whenever the theme changes', () => {
    setTheme('light');
    const subscriber = vi.fn();
    const unsub = subscribeTheme(subscriber);

    setTheme('dark');
    expect(subscriber).toHaveBeenCalledWith('dark');

    toggleTheme();
    expect(subscriber).toHaveBeenCalledWith('light');

    unsub();
    setTheme('dark');
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
