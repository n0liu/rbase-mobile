export interface CoverBannerProps {
  /** 封面图片 URL */
  imageUrl: string;
  /** 主标题 */
  title: string;
  /** 副标题 */
  subtitle?: string;
  /** 是否显示关注按钮 */
  showFollowBtn?: boolean;
  /** 关注按钮文本，默认 '+关注' */
  followBtnText?: string;
  /** 关注按钮点击回调 */
  onFollow?: () => void;
  /** 封面高度，默认 '200px' */
  height?: string;
  /** 点击封面回调 */
  onClick?: () => void;
}
