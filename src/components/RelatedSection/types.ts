export interface RelatedItem {
  logo: string;
  name: string;
}

export interface RelatedSectionProps {
  /** 区块标题 */
  title: string;
  /** 数据列表 */
  items: RelatedItem[];
  /** 最大显示数量，默认 3 */
  maxDisplay?: number;
  /** 点击更多按钮回调 */
  onMoreClick?: () => void;
  /** 点击卡片回调 */
  onItemClick?: (item: RelatedItem, index: number) => void;
}
