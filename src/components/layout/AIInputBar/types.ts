import { ReactNode } from 'react';

export interface AIInputBarProps {
  /** 输入框占位符文本 */
  placeholder?: string;

  /** AI 按钮文本 */
  buttonText?: string;

  /** AI 按钮图标 */
  buttonIcon?: ReactNode;

  /** 右侧按钮图标 */
  rightIcon?: ReactNode;

  /** 发送按钮点击回调 */
  onSend?: (text: string) => void;

  /** AI 按钮点击回调 */
  onAIButtonClick?: () => void;

  /** 右侧按钮点击回调 */
  onRightIconClick?: () => void;

  /** 是否显示右侧图标 */
  showRightIcon?: boolean;
}
