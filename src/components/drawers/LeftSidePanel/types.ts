import { ReactNode } from 'react';

export interface LeftSidePanelProps {
  /** 是否显示面板 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 面板标题 */
  title: string;
  /** 面板宽度，默认 '75vw' */
  width?: string;
  /** 面板内容 */
  children: ReactNode;
}
