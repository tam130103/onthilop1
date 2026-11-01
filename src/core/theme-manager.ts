export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'trinh_chieu_theme_mode';
type Listener = (theme: ThemeMode) => void;
const listeners = new Set<Listener>();

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    // fallback
  }
  return 'light';
}

let currentTheme: ThemeMode = getInitialTheme();

// Apply theme to DOM documentElement
export function applyTheme(theme: ThemeMode): void {
  currentTheme = theme;
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  listeners.forEach((fn) => fn(theme));
}

export const setTheme = applyTheme;

export function initTheme(): void {
  applyTheme(getInitialTheme());
}

export function getTheme(): ThemeMode {
  return currentTheme;
}

export function toggleTheme(): ThemeMode {
  const next = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  return next;
}

export function subscribeTheme(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Auto initialize on import
if (typeof window !== 'undefined') {
  applyTheme(currentTheme);
}
