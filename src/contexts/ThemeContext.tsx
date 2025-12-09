'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  /** 当前主题模式（light/dark/system） */
  mode: ThemeMode;
  /** 实际生效的主题（light/dark） */
  resolvedTheme: ResolvedTheme;
  /** 设置主题模式 */
  setMode: (mode: ThemeMode) => void;
  /** 是否为暗黑模式 */
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme-mode';

export interface ThemeProviderProps {
  children: ReactNode;
  /** 默认主题模式 */
  defaultMode?: ThemeMode;
}

export function ThemeProvider({ children, defaultMode = 'system' }: ThemeProviderProps) {
  // 从 localStorage 读取保存的主题设置
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
    return defaultMode;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  // 检测系统主题
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      if (mode === 'system') {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setResolvedTheme(mode as ResolvedTheme);
      }
    };

    updateTheme();

    // 监听系统主题变化
    const handler = (e: MediaQueryListEvent) => {
      if (mode === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode]);

  // 设置主题模式并保存到 localStorage
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      setMode,
      isDark: resolvedTheme === 'dark',
    }),
    [mode, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * 使用主题的 Hook
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
