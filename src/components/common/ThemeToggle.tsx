import { useState, useEffect } from 'react';
import { getTheme, toggleTheme, subscribeTheme, type ThemeMode } from '@/core/theme-manager';
import styles from './ThemeToggle.module.css';

export function ThemeToggle({ showLabel = true }: { showLabel?: boolean }) {
  const [theme, setThemeState] = useState<ThemeMode>(getTheme());

  useEffect(() => {
    return subscribeTheme(setThemeState);
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggleBtn}
      onClick={() => toggleTheme()}
      data-testid="theme-toggle-btn"
      title={isDark ? 'Chuyển sang chế độ Sáng (Light Mode)' : 'Chuyển sang chế độ Tối (Dark Mode)'}
      aria-label={isDark ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
    >
      {isDark ? (
        // Sun Icon
        <svg
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon Icon
        <svg
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      {showLabel && (
        <span className={styles.label}>
          {isDark ? 'Giao diện Tối' : 'Giao diện Sáng'}
        </span>
      )}
    </button>
  );
}
