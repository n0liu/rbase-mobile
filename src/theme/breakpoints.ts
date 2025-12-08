/**
 * 响应式断点配置
 * 定义设备类型和媒体查询
 */

// 断点值
export const breakpoints = {
  mobile: 375,       // 手机基准
  mobileLarge: 480,  // 大屏手机
  tablet: 768,       // 平板（竖屏）
  tabletLarge: 1024, // 平板（横屏）
  desktop: 1366,     // 桌面
} as const;

// 断点字符串（带单位）
export const breakpointValues = {
  mobile: '375px',
  mobileLarge: '480px',
  tablet: '768px',
  tabletLarge: '1024px',
  desktop: '1366px',
} as const;

// 媒体查询
export const mediaQueries = {
  // 设备类型查询
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

// 设备类型枚举（与 typography 保持一致）
export type DeviceType = 'mobile' | 'tablet';
export type Orientation = 'portrait' | 'landscape';

/**
 * 根据窗口宽度判断设备类型
 */
export function getDeviceType(width: number): DeviceType {
  if (width < breakpoints.tablet) {
    return 'mobile';
  } else {
    return 'tablet';
  }
}

/**
 * 根据窗口尺寸判断屏幕方向
 */
export function getOrientation(width: number, height: number): Orientation {
  return height >= width ? 'portrait' : 'landscape';
}

/**
 * 判断是否为移动设备
 */
export function isMobile(width: number): boolean {
  return width < breakpoints.tablet;
}

/**
 * 判断是否为平板设备
 */
export function isTablet(width: number): boolean {
  return width >= breakpoints.tablet && width < breakpoints.desktop;
}

/**
 * 判断是否为桌面设备
 */
export function isDesktop(width: number): boolean {
  return width >= breakpoints.desktop;
}

/**
 * 获取设备类型（包含桌面）
 */
export function getDeviceTypeWithDesktop(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (width < breakpoints.tablet) {
    return 'mobile';
  } else if (width < breakpoints.desktop) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

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
