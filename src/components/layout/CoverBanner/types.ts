export interface CoverBannerProps {
  /** 主标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 是否显示搜索框 */
  showSearchBox?: boolean;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 搜索按钮点击回调 */
  onSearch?: () => void;
  /** 背景图片 URL */
  backgroundImage?: string;
  /** 头像图片 URL */
  avatar?: string;
  /** 是否显示更多链接 */
  showMoreLink?: boolean;
  /** 更多链接点击回调 */
  onMoreClick?: () => void;
}
