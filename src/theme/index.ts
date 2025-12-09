/**
 * 主题配置生成
 * 根据主题模式生成 Ant Design Mobile 的主题配置
 * 统一使用 375px 作为基准，通过 vw 单位实现响应式
 */

import { getColors } from './tokens/colors';
import { fontSize, fontFamily, lineHeight } from './tokens/typography';
import { spacing, componentSpacing } from './tokens/spacing';
import { radius } from './tokens/radius';
import { getShadows } from './tokens/shadows';
import { pxToVw } from './utils/px-to-vw';
import type { ThemeMode } from './tokens/colors';

/**
 * 生成完整的 CSS 变量对象（用于动态注入到 :root）
 * 统一基于 375px 基准，通过 vw 实现响应式
 *
 * 采用双层架构：
 * 1. --rbase-* 设计令牌（框架无关）
 * 2. --adm-* 框架适配（覆盖 Ant Design Mobile）
 */
export function generateCSSVariables(
  theme: ThemeMode
): Record<string, string> {
  const colors = getColors(theme);
  const shadows = getShadows(theme);

  return {
    // ==================== 设计令牌层：--rbase-* ====================
    // 颜色变量
    '--rbase-color-primary': colors.primary,
    '--rbase-color-success': colors.success,
    '--rbase-color-warning': colors.warning,
    '--rbase-color-danger': colors.danger,
    '--rbase-color-info': colors.info,

    // 强调色（橙色）
    '--rbase-color-accent': colors.accent,
    '--rbase-color-accent-hover': colors.accentHover,
    '--rbase-color-accent-active': colors.accentActive,
    '--rbase-color-accent-bg': colors.accentBg,

    // 成功色（浅绿）
    '--rbase-color-success-light': colors.successLight,
    '--rbase-color-success-light-hover': colors.successLightHover,
    '--rbase-color-success-light-active': colors.successLightActive,
    '--rbase-color-success-light-bg': colors.successLightBg,

    '--rbase-color-text-primary': colors.textPrimary,
    '--rbase-color-text-secondary': colors.textSecondary,
    '--rbase-color-text-tertiary': colors.textTertiary,
    '--rbase-color-text-quaternary': colors.textQuaternary,

    '--rbase-color-background': colors.background,
    '--rbase-color-background-secondary': colors.backgroundSecondary,
    '--rbase-color-background-tertiary': colors.backgroundTertiary,

    '--rbase-color-border': colors.border,
    '--rbase-color-border-secondary': colors.borderSecondary,
    '--rbase-color-border-strong': colors.borderStrong,

    '--rbase-color-mask': colors.mask,

    // ==================== 框架适配层：--adm-* ====================
    '--adm-color-primary': 'var(--rbase-color-primary)',
    '--adm-color-success': 'var(--rbase-color-success)',
    '--adm-color-warning': 'var(--rbase-color-warning)',
    '--adm-color-danger': 'var(--rbase-color-danger)',
    '--adm-color-info': 'var(--rbase-color-info)',

    '--adm-color-text': 'var(--rbase-color-text-primary)',
    '--adm-color-text-secondary': 'var(--rbase-color-text-secondary)',
    '--adm-color-weak': 'var(--rbase-color-text-tertiary)',
    '--adm-color-light': 'var(--rbase-color-text-quaternary)',

    '--adm-color-background': 'var(--rbase-color-background)',
    '--adm-color-box': 'var(--rbase-color-background-secondary)',
    '--adm-color-fill-content': 'var(--rbase-color-background-tertiary)',

    '--adm-color-border': 'var(--rbase-color-border)',

    '--adm-color-mask': 'var(--rbase-color-mask)',

    // 字体变量（统一基于 375px 转换为 vw）
    '--rbase-font-size-overline': pxToVw(fontSize.overline),
    '--rbase-font-size-caption': pxToVw(fontSize.caption),
    '--rbase-font-size-body-small': pxToVw(fontSize.bodySmall),
    '--rbase-font-size-body': pxToVw(fontSize.body),
    '--rbase-font-size-h5': pxToVw(fontSize.h5),
    '--rbase-font-size-h4': pxToVw(fontSize.h4),
    '--rbase-font-size-h3': pxToVw(fontSize.h3),
    '--rbase-font-size-h2': pxToVw(fontSize.h2),
    '--rbase-font-size-h1': pxToVw(fontSize.h1),

    '--rbase-font-family-base': fontFamily.base,
    '--rbase-font-family-monospace': fontFamily.monospace,

    // 行高变量
    '--rbase-line-height-tight': lineHeight.tight.toString(),
    '--rbase-line-height-normal': lineHeight.normal.toString(),
    '--rbase-line-height-relaxed': lineHeight.relaxed.toString(),
    '--rbase-line-height-loose': lineHeight.loose.toString(),

    // 圆角变量
    '--rbase-radius-sm': radius.sm,
    '--rbase-radius-md': radius.md,
    '--rbase-radius-lg': radius.lg,
    '--rbase-radius-button': radius.button,
    '--rbase-radius-card': radius.card,

    // 间距变量（统一基于 375px 转换为 vw）
    '--rbase-spacing-xs': pxToVw(spacing.xs),
    '--rbase-spacing-sm': pxToVw(spacing.sm),
    '--rbase-spacing-md': pxToVw(spacing.md),
    '--rbase-spacing-lg': pxToVw(spacing.lg),
    '--rbase-spacing-xl': pxToVw(spacing.xl),
    '--rbase-spacing-xxl': pxToVw(spacing.xxl),

    '--rbase-nav-bar-height': pxToVw(componentSpacing.navBarHeight),
    '--rbase-tab-bar-height': pxToVw(componentSpacing.tabBarHeight),

    // 阴影变量
    '--rbase-shadow-sm': shadows.sm,
    '--rbase-shadow-md': shadows.md,
    '--rbase-shadow-lg': shadows.lg,

    // ==================== 框架适配层：--adm-* ====================
    '--adm-font-size-1': 'var(--rbase-font-size-overline)',
    '--adm-font-size-2': 'var(--rbase-font-size-overline)',
    '--adm-font-size-3': 'var(--rbase-font-size-caption)',
    '--adm-font-size-4': 'var(--rbase-font-size-caption)',
    '--adm-font-size-5': 'var(--rbase-font-size-body)',
    '--adm-font-size-6': 'var(--rbase-font-size-body)',
    '--adm-font-size-7': 'var(--rbase-font-size-h5)',
    '--adm-font-size-8': 'var(--rbase-font-size-h4)',
    '--adm-font-size-9': 'var(--rbase-font-size-h3)',
    '--adm-font-size-10': 'var(--rbase-font-size-h2)',
    '--adm-font-size-main': 'var(--rbase-font-size-body)',

    '--adm-font-family': 'var(--rbase-font-family-base)',

    '--adm-line-height-tight': 'var(--rbase-line-height-tight)',
    '--adm-line-height-normal': 'var(--rbase-line-height-normal)',
    '--adm-line-height-relaxed': 'var(--rbase-line-height-relaxed)',
    '--adm-line-height-loose': 'var(--rbase-line-height-loose)',

    '--adm-radius-s': 'var(--rbase-radius-sm)',
    '--adm-radius-m': 'var(--rbase-radius-md)',
    '--adm-radius-l': 'var(--rbase-radius-lg)',
    '--adm-button-border-radius': 'var(--rbase-radius-button)',
    '--adm-card-border-radius': 'var(--rbase-radius-card)',

    '--adm-nav-bar-height': 'var(--rbase-nav-bar-height)',
    '--adm-tab-bar-height': 'var(--rbase-tab-bar-height)',
    '--adm-list-item-padding-left': 'var(--rbase-spacing-lg)',
    '--adm-list-item-padding-right': 'var(--rbase-spacing-lg)',

    '--adm-shadow-sm': 'var(--rbase-shadow-sm)',
    '--adm-shadow-md': 'var(--rbase-shadow-md)',
    '--adm-shadow-lg': 'var(--rbase-shadow-lg)',
  };
}

/**
 * 根据主题模式生成主题配置（用于 ConfigProvider）
 * @param theme - 主题模式（light/dark/system）
 */
export function getThemeConfig(
  theme: ThemeMode
): Record<string, string> {
  return generateCSSVariables(theme);
}

// 导出所有令牌以供直接使用
export * from './tokens/colors';
export { fontSize, fontFamily, lineHeight, fontWeight } from './tokens/typography';
export { spacing, componentSpacing } from './tokens/spacing';
export * from './tokens/radius';
export * from './tokens/shadows';
export * from './tokens/animation';
export * from './breakpoints';

// 重新导出类型
export type { ThemeMode } from './tokens/colors';
