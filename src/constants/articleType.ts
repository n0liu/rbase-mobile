// 文章类型颜色配置
// 使用时通过 getArticleTypeColor(type) 获取颜色

export const ARTICLE_TYPE_COLORS: Record<string, string> = {
  'Review': '#aa4ca3',
  'Article': '#0072f5',
  // 以下类型待补充颜色
  'News & Views': '#0072f5',
  'Letter': '#0072f5',
  'Editorial': '#0072f5',
  'Commentary': '#0072f5',
  'Perspective': '#0072f5',
  'Research': '#0072f5',
  'Case Report': '#0072f5',
  'Meta-Analysis': '#0072f5',
  'Clinical Trial': '#0072f5',
};

// 默认颜色（未配置的类型使用）
const DEFAULT_COLOR = '#0072f5';

/**
 * 获取文章类型对应的颜色
 * @param type 文章类型（不区分大小写）
 * @returns 颜色值
 */
export function getArticleTypeColor(type: string): string {
  // 忽略大小写匹配
  const normalizedType = Object.keys(ARTICLE_TYPE_COLORS).find(
    key => key.toLowerCase() === type.toLowerCase()
  );

  return normalizedType ? ARTICLE_TYPE_COLORS[normalizedType] : DEFAULT_COLOR;
}
