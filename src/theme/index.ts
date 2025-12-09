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
 */
export function generateCSSVariables(
  theme: ThemeMode
): Record<string, string> {
  const colors = getColors(theme);
  const shadows = getShadows(theme);

  return {
    // ==================== 颜色变量 ====================
    '--adm-color-primary': colors.primary,
    '--adm-color-success': colors.success,
    '--adm-color-warning': colors.warning,
    '--adm-color-danger': colors.danger,
    '--adm-color-info': colors.info,

    // 强调色（橙色）
    '--adm-color-accent': colors.accent,
    '--adm-color-accent-hover': colors.accentHover,
    '--adm-color-accent-active': colors.accentActive,
    '--adm-color-accent-bg': colors.accentBg,

    // 成功色（浅绿）
    '--adm-color-success-light': colors.successLight,
    '--adm-color-success-light-hover': colors.successLightHover,
    '--adm-color-success-light-active': colors.successLightActive,
    '--adm-color-success-light-bg': colors.successLightBg,

    '--adm-color-text': colors.textPrimary,
    '--adm-color-text-secondary': colors.textSecondary,
    '--adm-color-weak': colors.textTertiary,
    '--adm-color-light': colors.textQuaternary,

    '--adm-color-background': colors.background,
    '--adm-color-box': colors.backgroundSecondary,
    '--adm-color-fill-content': colors.backgroundTertiary,

    '--adm-color-border': colors.border,

    '--adm-color-mask': colors.mask,

    // ==================== 字体变量（统一基于 375px 转换为 vw）====================
    '--adm-font-size-1': pxToVw(fontSize.overline),
    '--adm-font-size-2': pxToVw(fontSize.overline),
    '--adm-font-size-3': pxToVw(fontSize.caption),
    '--adm-font-size-4': pxToVw(fontSize.caption),
    '--adm-font-size-5': pxToVw(fontSize.body),
    '--adm-font-size-6': pxToVw(fontSize.body),
    '--adm-font-size-7': pxToVw(fontSize.h5),
    '--adm-font-size-8': pxToVw(fontSize.h4),
    '--adm-font-size-9': pxToVw(fontSize.h3),
    '--adm-font-size-10': pxToVw(fontSize.h2),
    '--adm-font-size-main': pxToVw(fontSize.body),

    '--adm-font-family': fontFamily.base,

    // 行高变量
    '--adm-line-height-tight': lineHeight.tight.toString(),
    '--adm-line-height-normal': lineHeight.normal.toString(),
    '--adm-line-height-relaxed': lineHeight.relaxed.toString(),
    '--adm-line-height-loose': lineHeight.loose.toString(),

    // ==================== 圆角变量 ====================
    '--adm-radius-s': radius.sm,
    '--adm-radius-m': radius.md,
    '--adm-radius-l': radius.lg,

    '--adm-button-border-radius': radius.button,
    '--adm-card-border-radius': radius.card,

    // ==================== 间距变量（统一基于 375px 转换为 vw）====================
    '--adm-nav-bar-height': pxToVw(componentSpacing.navBarHeight),
    '--adm-tab-bar-height': pxToVw(componentSpacing.tabBarHeight),
    '--adm-list-item-padding-left': pxToVw(spacing.lg),
    '--adm-list-item-padding-right': pxToVw(spacing.lg),

    // ==================== 阴影变量 ====================
    '--adm-shadow-sm': shadows.sm,
    '--adm-shadow-md': shadows.md,
    '--adm-shadow-lg': shadows.lg,

    // ==================== 自定义变量（用于我们的组件，统一基于 375px 转换为 vw）====================
    '--spacing-xs': pxToVw(spacing.xs),
    '--spacing-sm': pxToVw(spacing.sm),
    '--spacing-md': pxToVw(spacing.md),
    '--spacing-lg': pxToVw(spacing.lg),
    '--spacing-xl': pxToVw(spacing.xl),
    '--spacing-xxl': pxToVw(spacing.xxl),
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
