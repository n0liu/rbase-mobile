/**
 * 字体设计令牌
 * 包含响应式字号系统（手机 + 平板）
 */

// 字体家族
export const fontFamily = {
  base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
} as const;

// 手机端字号（基准：375px）
export const mobileFontSize = {
  h1: '24px',
  h2: '20px',
  h3: '18px',
  h4: '16px',
  h5: '14px',
  body: '14px',
  bodySmall: '13px',
  caption: '12px',
  overline: '11px',
} as const;

// 平板端字号（基准：768px）
export const tabletFontSize = {
  h1: '28px',
  h2: '24px',
  h3: '20px',
  h4: '18px',
  h5: '16px',
  body: '15px',
  bodySmall: '14px',
  caption: '13px',
  overline: '12px',
} as const;

// 字重
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// 行高
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// 字母间距
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// 类型定义
export type DeviceType = 'mobile' | 'tablet';
export type FontSizeKeys = keyof typeof mobileFontSize;
export type FontSizeTokens = Record<FontSizeKeys, string>;

/**
 * 根据设备类型获取字号令牌
 */
export function getFontSize(deviceType: DeviceType): FontSizeTokens {
  return deviceType === 'mobile' ? { ...mobileFontSize } : { ...tabletFontSize };
}

/**
 * 完整的字体系统配置
 */
export const typography = {
  fontFamily,
  mobile: mobileFontSize,
  tablet: tabletFontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;
