/**
 * 像素单位转换工具
 * 将 px 转换为 vw，用于动态注入的 CSS 变量
 * 统一使用 375px 作为基准宽度，实现真正的响应式
 */

/**
 * 基准视口宽度（与 postcss.config.mjs 保持一致）
 * 所有设备统一使用此基准，实现真正的等比缩放
 */
const VIEWPORT_WIDTH = 375;

/**
 * 将 px 字符串转换为数字
 * @example '14px' => 14
 */
function parsePx(value: string): number {
  return parseFloat(value.replace('px', ''));
}

/**
 * 将 px 转换为 vw
 * @param pxValue - px 值字符串，如 '14px' 或数字
 * @param precision - 精度，默认 5 位小数
 * @returns vw 值字符串，如 '3.73333vw'
 *
 * @example
 * pxToVw('14px') // => '3.73333vw'
 * pxToVw(14) // => '3.73333vw'
 */
export function pxToVw(
  pxValue: string | number,
  precision: number = 5
): string {
  const px = typeof pxValue === 'number' ? pxValue : parsePx(pxValue);
  const vw = (px / VIEWPORT_WIDTH) * 100;

  return `${vw.toFixed(precision)}vw`;
}

/**
 * 批量转换对象中的所有 px 值为 vw
 * @param values - 包含 px 值的对象
 * @returns 转换后的对象
 */
export function convertPxToVw<T extends Record<string, string>>(
  values: T
): T {
  const result = {} as T;

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === 'string' && value.endsWith('px')) {
      result[key as keyof T] = pxToVw(value) as T[keyof T];
    } else {
      result[key as keyof T] = value as T[keyof T];
    }
  }

  return result;
}
