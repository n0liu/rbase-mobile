'use client';

import { useState, useEffect } from 'react';

/**
 * 媒体查询 Hook
 * 监听指定的媒体查询，返回是否匹配
 *
 * @param query - 媒体查询字符串，例如：'(min-width: 768px)'
 * @returns 是否匹配媒体查询
 *
 * @example
 * ```tsx
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1365px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * const isPortrait = useMediaQuery('(orientation: portrait)');
 * ```
 */
export function useMediaQuery(query: string): boolean {
  // 移除可能的 @media 前缀
  const cleanQuery = query.replace(/^@media\s+/, '');

  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(cleanQuery).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(cleanQuery);

    // 监听变化
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [cleanQuery]);

  return matches;
}
