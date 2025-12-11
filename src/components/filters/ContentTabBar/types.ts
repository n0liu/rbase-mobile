export interface TabItem {
  /** Tab 唯一标识 */
  key: string;
  /** Tab 显示文本 */
  label: string;
  /** Tab 数量（可选） */
  count?: number;
}

export interface ContentTabBarProps {
  /** Tab 列表 */
  tabs: TabItem[];
  /** 当前激活的 Tab key */
  activeTab: string;
  /** Tab 切换回调 */
  onTabChange: (key: string) => void;
  /** 排序按钮文本 */
  sortLabel?: string;
  /** 排序按钮点击回调 */
  onSortClick?: () => void;
  /** 筛选按钮点击回调 */
  onFilterClick?: () => void;
  /** 是否显示数据分析按钮 */
  showAnalysisBtn?: boolean;
  /** 数据分析按钮点击回调 */
  onAnalysisClick?: () => void;
}
