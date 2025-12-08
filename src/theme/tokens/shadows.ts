/**
 * 阴影设计令牌
 * 包含亮色和暗黑模式的阴影系统
 */

// 亮色模式阴影
export const lightShadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 2px 8px rgba(0, 0, 0, 0.1)',
  lg: '0 4px 16px rgba(0, 0, 0, 0.12)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.15)',
  xxl: '0 12px 32px rgba(0, 0, 0, 0.18)',

  // 组件特定阴影
  button: '0 2px 4px rgba(0, 0, 0, 0.08)',
  card: '0 2px 8px rgba(0, 0, 0, 0.1)',
  modal: '0 8px 24px rgba(0, 0, 0, 0.15)',
  dropdown: '0 4px 16px rgba(0, 0, 0, 0.12)',
  popup: '0 8px 24px rgba(0, 0, 0, 0.15)',

  // 内阴影
  inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
} as const;

// 暗黑模式阴影（更深）
export const darkShadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.2)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
  md: '0 2px 8px rgba(0, 0, 0, 0.4)',
  lg: '0 4px 16px rgba(0, 0, 0, 0.5)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.6)',
  xxl: '0 12px 32px rgba(0, 0, 0, 0.7)',

  // 组件特定阴影
  button: '0 2px 4px rgba(0, 0, 0, 0.3)',
  card: '0 2px 8px rgba(0, 0, 0, 0.4)',
  modal: '0 8px 24px rgba(0, 0, 0, 0.6)',
  dropdown: '0 4px 16px rgba(0, 0, 0, 0.5)',
  popup: '0 8px 24px rgba(0, 0, 0, 0.6)',

  // 内阴影
  inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
} as const;

export type ShadowKeys = keyof typeof lightShadows;
export type ShadowTokens = Record<ShadowKeys, string>;
export type ThemeMode = 'light' | 'dark';

/**
 * 根据主题模式获取阴影令牌
 */
export function getShadows(mode: ThemeMode): ShadowTokens {
  return mode === 'light' ? { ...lightShadows } : { ...darkShadows };
}

/**
 * 完整的阴影系统配置
 */
export const shadows = {
  light: lightShadows,
  dark: darkShadows,
} as const;
