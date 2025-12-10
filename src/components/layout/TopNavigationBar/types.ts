import { ReactNode } from 'react';

export interface TopNavigationBarProps {
  /** 标签文本 */
  tag: '文献' | 'HOPE' | '机构' | string;

  /** 左侧额外图标 */
  leftIcon?: ReactNode;

  /** 左侧图标点击回调 */
  onLeftIconClick?: () => void;

  /** 搜索图标点击回调 */
  onSearchClick?: () => void;

  /** 列表图标点击回调（可选） */
  onListClick?: () => void;

  /** 用户头像 URL */
  userAvatar?: string;

  /** 用户头像点击回调 */
  onUserClick?: () => void;

  /** 是否显示列表图标 */
  showListIcon?: boolean;

  /** 是否显示搜索图标 */
  showSearchIcon?: boolean;
}
