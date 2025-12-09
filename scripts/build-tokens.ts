#!/usr/bin/env tsx
/**
 * Design Tokens 构建脚本
 *
 * 功能：
 * 1. 读取 src/theme/tokens 中的所有设计令牌
 * 2. 生成纯 CSS 文件（dist/rbase-light.css 和 dist/rbase-dark.css）
 * 3. 可供任何框架使用（Vue、React、Angular、纯 HTML）
 *
 * 运行：npm run build:tokens
 */

import fs from 'fs';
import path from 'path';

// 导入 tokens
import { lightColors, darkColors } from '../src/theme/tokens/colors.js';
import { fontSize, fontFamily, lineHeight, fontWeight } from '../src/theme/tokens/typography.js';
import { spacing, componentSpacing } from '../src/theme/tokens/spacing.js';
import { radius } from '../src/theme/tokens/radius.js';
import { lightShadows, darkShadows } from '../src/theme/tokens/shadows.js';

// 生成 CSS 变量
function generateCSS(theme: 'light' | 'dark'): string {
  const colors = theme === 'light' ? lightColors : darkColors;
  const shadows = theme === 'light' ? lightShadows : darkShadows;

  const lines: string[] = [];

  lines.push('/**');
  lines.push(` * RBase Design Tokens - ${theme === 'light' ? '亮色主题' : '暗色主题'}`);
  lines.push(' * ');
  lines.push(' * 框架无关的设计令牌系统');
  lines.push(' * 可用于任何前端项目：Next.js、Vue、React、Angular、纯 HTML');
  lines.push(' * ');
  lines.push(` * 生成时间：${new Date().toISOString()}`);
  lines.push(' */');
  lines.push('');
  lines.push(':root {');

  // ==================== 颜色变量 ====================
  lines.push('  /* ==================== 颜色系统 ==================== */');
  lines.push('  ');
  lines.push('  /* 品牌色 */');
  lines.push(`  --rbase-color-primary: ${colors.primary};`);
  lines.push(`  --rbase-color-success: ${colors.success};`);
  lines.push(`  --rbase-color-warning: ${colors.warning};`);
  lines.push(`  --rbase-color-danger: ${colors.danger};`);
  lines.push(`  --rbase-color-info: ${colors.info};`);
  lines.push('  ');

  lines.push('  /* 强调色（橙色 - CTA 按钮）*/');
  lines.push(`  --rbase-color-accent: ${colors.accent};`);
  lines.push(`  --rbase-color-accent-hover: ${colors.accentHover};`);
  lines.push(`  --rbase-color-accent-active: ${colors.accentActive};`);
  lines.push(`  --rbase-color-accent-bg: ${colors.accentBg};`);
  lines.push('  ');

  lines.push('  /* 成功色（浅绿 - 影响因子标签）*/');
  lines.push(`  --rbase-color-success-light: ${colors.successLight};`);
  lines.push(`  --rbase-color-success-light-hover: ${colors.successLightHover};`);
  lines.push(`  --rbase-color-success-light-active: ${colors.successLightActive};`);
  lines.push(`  --rbase-color-success-light-bg: ${colors.successLightBg};`);
  lines.push('  ');

  lines.push('  /* 文本色 */');
  lines.push(`  --rbase-color-text-primary: ${colors.textPrimary};`);
  lines.push(`  --rbase-color-text-secondary: ${colors.textSecondary};`);
  lines.push(`  --rbase-color-text-tertiary: ${colors.textTertiary};`);
  lines.push(`  --rbase-color-text-quaternary: ${colors.textQuaternary};`);
  lines.push('  ');

  lines.push('  /* 背景色 */');
  lines.push(`  --rbase-color-background: ${colors.background};`);
  lines.push(`  --rbase-color-background-secondary: ${colors.backgroundSecondary};`);
  lines.push(`  --rbase-color-background-tertiary: ${colors.backgroundTertiary};`);
  lines.push('  ');

  lines.push('  /* 边框色 */');
  lines.push(`  --rbase-color-border: ${colors.border};`);
  lines.push(`  --rbase-color-border-secondary: ${colors.borderSecondary};`);
  lines.push(`  --rbase-color-border-strong: ${colors.borderStrong};`);
  lines.push('  ');

  lines.push('  /* 其他 */');
  lines.push(`  --rbase-color-mask: ${colors.mask};`);
  lines.push('  ');

  // ==================== 字体变量 ====================
  lines.push('  /* ==================== 字体系统 ==================== */');
  lines.push('  ');
  lines.push('  /* 字号 */');
  lines.push(`  --rbase-font-size-h1: ${fontSize.h1};`);
  lines.push(`  --rbase-font-size-h2: ${fontSize.h2};`);
  lines.push(`  --rbase-font-size-h3: ${fontSize.h3};`);
  lines.push(`  --rbase-font-size-h4: ${fontSize.h4};`);
  lines.push(`  --rbase-font-size-h5: ${fontSize.h5};`);
  lines.push(`  --rbase-font-size-body: ${fontSize.body};`);
  lines.push(`  --rbase-font-size-body-small: ${fontSize.bodySmall};`);
  lines.push(`  --rbase-font-size-caption: ${fontSize.caption};`);
  lines.push(`  --rbase-font-size-overline: ${fontSize.overline};`);
  lines.push('  ');

  lines.push('  /* 字体家族 */');
  lines.push(`  --rbase-font-family-base: ${fontFamily.base};`);
  lines.push(`  --rbase-font-family-monospace: ${fontFamily.monospace};`);
  lines.push('  ');

  lines.push('  /* 字重 */');
  Object.entries(fontWeight).forEach(([name, value]) => {
    lines.push(`  --rbase-font-weight-${name}: ${value};`);
  });
  lines.push('  ');

  lines.push('  /* 行高 */');
  lines.push(`  --rbase-line-height-tight: ${lineHeight.tight};`);
  lines.push(`  --rbase-line-height-normal: ${lineHeight.normal};`);
  lines.push(`  --rbase-line-height-relaxed: ${lineHeight.relaxed};`);
  lines.push(`  --rbase-line-height-loose: ${lineHeight.loose};`);
  lines.push('  ');

  // ==================== 圆角变量 ====================
  lines.push('  /* ==================== 圆角系统 ==================== */');
  lines.push('  ');
  lines.push(`  --rbase-radius-sm: ${radius.sm};`);
  lines.push(`  --rbase-radius-md: ${radius.md};`);
  lines.push(`  --rbase-radius-lg: ${radius.lg};`);
  lines.push(`  --rbase-radius-button: ${radius.button};`);
  lines.push(`  --rbase-radius-card: ${radius.card};`);
  lines.push('  ');

  // ==================== 间距变量 ====================
  lines.push('  /* ==================== 间距系统 ==================== */');
  lines.push('  ');
  lines.push('  /* 基础间距 */');
  lines.push(`  --rbase-spacing-xs: ${spacing.xs};`);
  lines.push(`  --rbase-spacing-sm: ${spacing.sm};`);
  lines.push(`  --rbase-spacing-md: ${spacing.md};`);
  lines.push(`  --rbase-spacing-lg: ${spacing.lg};`);
  lines.push(`  --rbase-spacing-xl: ${spacing.xl};`);
  lines.push(`  --rbase-spacing-xxl: ${spacing.xxl};`);
  lines.push('  ');

  lines.push('  /* 组件间距 */');
  lines.push(`  --rbase-nav-bar-height: ${componentSpacing.navBarHeight};`);
  lines.push(`  --rbase-tab-bar-height: ${componentSpacing.tabBarHeight};`);
  lines.push('  ');

  // ==================== 阴影变量 ====================
  lines.push('  /* ==================== 阴影系统 ==================== */');
  lines.push('  ');
  lines.push(`  --rbase-shadow-sm: ${shadows.sm};`);
  lines.push(`  --rbase-shadow-md: ${shadows.md};`);
  lines.push(`  --rbase-shadow-lg: ${shadows.lg};`);

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

// 主函数
async function main() {
  console.log('🚀 开始构建 Design Tokens...\n');

  // 创建 dist 目录
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log('✅ 创建 dist 目录');
  }

  // 生成亮色主题
  const lightCSS = generateCSS('light');
  const lightPath = path.join(distDir, 'rbase-light.css');
  fs.writeFileSync(lightPath, lightCSS, 'utf-8');
  console.log(`✅ 生成 rbase-light.css (${lightCSS.length} 字节)`);

  // 生成暗色主题
  const darkCSS = generateCSS('dark');
  const darkPath = path.join(distDir, 'rbase-dark.css');
  fs.writeFileSync(darkPath, darkCSS, 'utf-8');
  console.log(`✅ 生成 rbase-dark.css (${darkCSS.length} 字节)`);

  console.log('\n🎉 Design Tokens 构建完成！');
  console.log('\n📦 生成的文件：');
  console.log(`   - dist/rbase-light.css`);
  console.log(`   - dist/rbase-dark.css`);
  console.log('\n💡 使用方法：');
  console.log('   <link rel="stylesheet" href="dist/rbase-light.css">');
  console.log('   或在 JS 中: import "dist/rbase-light.css"');
}

// 执行
main().catch(console.error);
