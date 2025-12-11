import { ReactNode } from 'react';

export interface TopNavigationBarProps {
  /** 左侧额外图标 */
  leftIcon?: ReactNode;

  /** 左侧图标点击回调 */
  onLeftIconClick?: () => void;

  /** 搜索图标点击回调 */
  onSearchClick?: () => void;

  /** 列表图标点击回调 */
  onListClick?: () => void;

  /** 是否显示列表图标 */
  showListIcon?: boolean;

  /** 是否显示搜索图标 */
  showSearchIcon?: boolean;
}
