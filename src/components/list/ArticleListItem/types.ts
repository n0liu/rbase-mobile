export interface Author {
  /** 作者姓名 */
  name: string;
  /** 是否为通讯作者 */
  isCorresponding: boolean;
}

export interface Article {
  /** 日期信息 */
  date: {
    day: string;
    month: string;
  };
  /** 期刊名 */
  journal: string;
  /** 影响因子 */
  impactFactor: string;
  /** 中文标题 */
  titleCn: string;
  /** 英文标题 */
  titleEn: string;
  /** 文章类型 */
  type?: string; // 'Review' | 'Article' | 'Commentary' 等
  /** 作者列表 */
  authors: Author[];
  /** 关键词列表 */
  keywords: string[];
  /** 发表日期（底部显示） */
  publishDate?: string;
}

export interface ArticleListItemProps {
  /** 文章数据 */
  article: Article;
  /** 是否显示更多图标 */
  showMoreIcon?: boolean;
  /** 点击文章回调 */
  onClick?: () => void;
  /** 更多按钮点击回调 */
  onMoreClick?: () => void;
}
