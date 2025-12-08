/**
 * 颜色设计令牌
 * 包含亮色和暗黑两套主题的完整颜色系统
 */

// 亮色主题颜色
export const lightColors = {
  // 品牌色
  primary: '#1677FF',
  primaryHover: '#4096FF',
  primaryActive: '#0958D9',
  primaryBg: '#E6F4FF',

  // 功能色
  success: '#52c41a',
  successHover: '#73d13d',
  successActive: '#389e0d',
  successBg: '#f6ffed',

  warning: '#faad14',
  warningHover: '#ffc53d',
  warningActive: '#d48806',
  warningBg: '#fffbe6',

  danger: '#ff3141',
  dangerHover: '#ff4d4f',
  dangerActive: '#cf1322',
  dangerBg: '#fff1f0',

  info: '#1677FF',
  infoHover: '#4096FF',
  infoActive: '#0958D9',
  infoBg: '#e6f4ff',

  // 文本色
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textQuaternary: '#CCCCCC',
  textDisabled: '#DDDDDD',
  textReverse: '#FFFFFF',

  // 背景色
  background: '#FFFFFF',
  backgroundSecondary: '#FAFAFA',
  backgroundTertiary: '#F5F5F5',
  backgroundDisabled: '#F0F0F0',

  // 边框色
  border: '#EEEEEE',
  borderSecondary: '#E0E0E0',
  borderStrong: '#CCCCCC',

  // 遮罩
  mask: 'rgba(0, 0, 0, 0.45)',
  maskLight: 'rgba(0, 0, 0, 0.2)',
} as const;

// 暗黑主题颜色
export const darkColors = {
  // 品牌色
  primary: '#3C89E8',
  primaryHover: '#5A9FF0',
  primaryActive: '#2373DB',
  primaryBg: '#111D2C',

  // 功能色
  success: '#6BBF4E',
  successHover: '#85D065',
  successActive: '#529B3E',
  successBg: '#162312',

  warning: '#FAAD14',
  warningHover: '#FFC53D',
  warningActive: '#D48806',
  warningBg: '#2B2111',

  danger: '#FF4D4F',
  dangerHover: '#FF7875',
  dangerActive: '#D9363E',
  dangerBg: '#2A1215',

  info: '#3C89E8',
  infoHover: '#5A9FF0',
  infoActive: '#2373DB',
  infoBg: '#111D2C',

  // 文本色
  textPrimary: '#E8E8E8',
  textSecondary: '#B8B8B8',
  textTertiary: '#8C8C8C',
  textQuaternary: '#595959',
  textDisabled: '#434343',
  textReverse: '#1F1F1F',

  // 背景色
  background: '#141414',
  backgroundSecondary: '#1F1F1F',
  backgroundTertiary: '#2A2A2A',
  backgroundDisabled: '#383838',

  // 边框色
  border: '#303030',
  borderSecondary: '#3A3A3A',
  borderStrong: '#505050',

  // 遮罩
  mask: 'rgba(0, 0, 0, 0.65)',
  maskLight: 'rgba(0, 0, 0, 0.35)',
} as const;

// 类型定义
export type ColorKeys = keyof typeof lightColors;
export type ColorTokens = Record<ColorKeys, string>;
export type ThemeMode = 'light' | 'dark';

/**
 * 根据主题模式获取颜色令牌
 */
export function getColors(mode: ThemeMode): ColorTokens {
  return mode === 'light' ? { ...lightColors } : { ...darkColors };
}
