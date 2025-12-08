/**
 * 主题配置生成
 * 根据主题模式和设备类型生成 Ant Design Mobile 的主题配置
 */

import { getColors } from './tokens/colors';
import { getFontSize, fontFamily } from './tokens/typography';
import { getSpacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { getShadows } from './tokens/shadows';
import type { DeviceType } from './tokens/typography';
import type { ThemeMode } from './tokens/colors';

/**
 * 生成完整的 CSS 变量对象（用于动态注入到 :root）
 */
export function generateCSSVariables(
  theme: ThemeMode,
  deviceType: DeviceType
): Record<string, string> {
  const colors = getColors(theme);
  const fontSize = getFontSize(deviceType);
  const spacing = getSpacing(deviceType);
  const shadows = getShadows(theme);

  return {
    // ==================== 颜色变量 ====================
    '--adm-color-primary': colors.primary,
    '--adm-color-success': colors.success,
    '--adm-color-warning': colors.warning,
    '--adm-color-danger': colors.danger,
    '--adm-color-info': colors.info,

    '--adm-color-text': colors.textPrimary,
    '--adm-color-text-secondary': colors.textSecondary,
    '--adm-color-weak': colors.textTertiary,
    '--adm-color-light': colors.textQuaternary,

    '--adm-color-background': colors.background,
    '--adm-color-box': colors.backgroundSecondary,
    '--adm-color-fill-content': colors.backgroundTertiary,

    '--adm-color-border': colors.border,

    '--adm-color-mask': colors.mask,

    // ==================== 字体变量 ====================
    '--adm-font-size-1': fontSize.overline,
    '--adm-font-size-2': fontSize.overline,
    '--adm-font-size-3': fontSize.caption,
    '--adm-font-size-4': fontSize.caption,
    '--adm-font-size-5': fontSize.body,
    '--adm-font-size-6': fontSize.body,
    '--adm-font-size-7': fontSize.h5,
    '--adm-font-size-8': fontSize.h4,
    '--adm-font-size-9': fontSize.h3,
    '--adm-font-size-10': fontSize.h2,
    '--adm-font-size-main': fontSize.body,

    '--adm-font-family': fontFamily.base,

    // ==================== 圆角变量 ====================
    '--adm-radius-s': radius.sm,
    '--adm-radius-m': radius.md,
    '--adm-radius-l': radius.lg,

    '--adm-button-border-radius': radius.button,
    '--adm-card-border-radius': radius.card,

    // ==================== 间距变量 ====================
    '--adm-nav-bar-height': deviceType === 'mobile' ? '44px' : '56px',
    '--adm-tab-bar-height': deviceType === 'mobile' ? '50px' : '60px',
    '--adm-list-item-padding-left': spacing.lg,
    '--adm-list-item-padding-right': spacing.lg,

    // ==================== 阴影变量 ====================
    '--adm-shadow-sm': shadows.sm,
    '--adm-shadow-md': shadows.md,
    '--adm-shadow-lg': shadows.lg,

    // ==================== 自定义变量（用于我们的组件） ====================
    '--spacing-xs': spacing.xs,
    '--spacing-sm': spacing.sm,
    '--spacing-md': spacing.md,
    '--spacing-lg': spacing.lg,
    '--spacing-xl': spacing.xl,
    '--spacing-xxl': spacing.xxl,
  };
}

/**
 * 根据主题模式和设备类型生成主题配置（用于 ConfigProvider）
 */
export function getThemeConfig(
  theme: ThemeMode,
  deviceType: DeviceType
): Record<string, string> {
  // 直接使用 generateCSSVariables 生成的变量
  return generateCSSVariables(theme, deviceType);
}

// 导出默认主题（兼容旧代码）
export const mobileTheme = getThemeConfig('light', 'mobile');

// 导出所有令牌以供直接使用
export * from './tokens/colors';
export * from './tokens/typography';
export * from './tokens/spacing';
export * from './tokens/radius';
export * from './tokens/shadows';
export * from './tokens/animation';
export * from './breakpoints';

// 重新导出类型以避免歧义
export type { ThemeMode } from './tokens/colors';
export type { DeviceType } from './tokens/typography';
