export interface ActiveFilterTagsProps {
  /** 标签前缀文本，如 "全部分类" */
  label?: string;
  /** 激活的筛选项列表 */
  filters: string[];
  /** 删除筛选项的回调 */
  onRemove: (filter: string) => void;
  /** 是否显示面包屑导航 */
  showBreadcrumb?: boolean;
  /** 面包屑路径，如 ['全部', '益生菌', '属/株'] */
  breadcrumbPath?: string[];
}
