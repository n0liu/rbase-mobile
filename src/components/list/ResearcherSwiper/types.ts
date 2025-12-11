export interface Researcher {
  /** 研究者姓名 */
  name: string;
  /** 头像 URL */
  avatar: string;
  /** 唯一标识（可选） */
  id?: string;
}

export interface ResearcherSwiperProps {
  /** 研究者列表 */
  researchers: Researcher[];
  /** 第一页列数，默认 4 */
  firstPageColumns?: number;
  /** 第一页行数，默认 1 */
  firstPageRows?: number;
  /** 其他页列数，默认 4 */
  otherPageColumns?: number;
  /** 其他页行数，默认 2 */
  otherPageRows?: number;
  /** 研究者点击回调 */
  onResearcherClick?: (researcher: Researcher) => void;
  /** "更多"按钮点击回调 */
  onMoreClick?: () => void;
  /** 是否显示"更多"按钮，默认 true */
  showMoreButton?: boolean;
  /** 是否显示指示器，默认 true */
  showIndicator?: boolean;
  /** 是否自动调整高度，默认 true */
  autoHeight?: boolean;
  /** 第一页高度，默认 '100px' */
  firstPageHeight?: string;
  /** 其他页高度，默认 '200px' */
  otherPageHeight?: string;
}
