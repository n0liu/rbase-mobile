/**
 * 媒体查询配置
 * 用于 CSS-in-JS 中的响应式样式
 *
 * 注意：本项目使用 vw 单位实现响应式，这些媒体查询仅用于特殊的布局需求
 */

// 断点值
export const breakpoints = {
  mobile: 375,       // 手机基准（也是响应式基准）
  mobileLarge: 480,  // 大屏手机
  tablet: 768,       // 平板尺寸（竖屏）
  tabletLarge: 1024, // 平板尺寸（横屏）
  desktop: 1366,     // 桌面尺寸
} as const;

// 媒体查询字符串（用于 CSS-in-JS）
export const mediaQueries = {
  // 设备尺寸查询
  mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.tabletLarge - 1}px)`,
  tabletLarge: `@media (min-width: ${breakpoints.tabletLarge}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,

  // 范围查询
  mobileOnly: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tabletUp: `@media (min-width: ${breakpoints.tablet}px)`,
  tabletOnly: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktopUp: `@media (min-width: ${breakpoints.desktop}px)`,

  // 屏幕方向
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',

  // 组合查询
  mobilePortrait: `@media (max-width: ${breakpoints.tablet - 1}px) and (orientation: portrait)`,
  mobileLandscape: `@media (max-width: ${breakpoints.tablet - 1}px) and (orientation: landscape)`,
  tabletPortrait: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px) and (orientation: portrait)`,
  tabletLandscape: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px) and (orientation: landscape)`,

  // 高分辨率屏幕
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',

  // 触摸设备
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
} as const;

/**
 * 创建自定义媒体查询
 */
export function createMediaQuery(minWidth?: number, maxWidth?: number): string {
  const conditions: string[] = [];

  if (minWidth !== undefined) {
    conditions.push(`(min-width: ${minWidth}px)`);
  }

  if (maxWidth !== undefined) {
    conditions.push(`(max-width: ${maxWidth}px)`);
  }

  return `@media ${conditions.join(' and ')}`;
}
