import { ReactNode } from 'react';

export interface FilterDrawerMenu {
  /** 菜单项唯一标识 */
  key: string;
  /** 菜单项显示文本 */
  label: string;
}

export interface FilterDrawerProps {
  /** 是否显示抽屉 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 抽屉标题 */
  title: string;
  /** 左侧菜单列表 */
  menus: FilterDrawerMenu[];
  /** 当前激活的菜单项 key */
  activeMenu: string;
  /** 菜单切换回调 */
  onMenuChange: (key: string) => void;
  /** 右侧内容区 */
  children: ReactNode;
  /** 抽屉宽度，默认 '80vw' */
  width?: string;
}
