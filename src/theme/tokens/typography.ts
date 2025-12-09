/**
 * 字体设计令牌
 * 统一基于 375px 基准的响应式字号系统
 * 通过 vw 单位实现真正的响应式，适配所有屏幕尺寸
 */

// 字体家族
export const fontFamily = {
  base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
} as const;

/**
 * 字号系统（基准：375px）
 * 将通过 pxToVw() 函数转换为 vw 单位，实现跨设备响应式
 */
export const fontSize = {
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
export type FontSizeKeys = keyof typeof fontSize;
export type FontSizeTokens = Record<FontSizeKeys, string>;

/**
 * 完整的字体系统配置
 */
export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;
