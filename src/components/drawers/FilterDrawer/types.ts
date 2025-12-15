import { ReactNode } from 'react';

export interface FilterDrawerProps {
  /** 是否显示抽屉 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 抽屉标题 */
  title: string;
  /** 顶部菜单列表（字符串数组） */
  menus: string[];
  /** 当前激活的菜单项 */
  activeMenu: string;
  /** 菜单切换回调 */
  onMenuChange: (menu: string) => void;
  /** 内容区（使用 ref） */
  contentRef?: React.RefObject<HTMLDivElement | null>;
  /** 内容区 */
  children: ReactNode;
  /** 抽屉宽度，默认 '80vw' */
  width?: string;
}
