export interface SearchBarProps {
  /** 搜索框占位符 */
  placeholder?: string;
  /** 搜索值 */
  value: string;
  /** 值变化回调 */
  onChange: (value: string) => void;
  /** 搜索按钮点击回调 */
  onSearch?: () => void;
  /** 取消按钮点击回调 */
  onCancel?: () => void;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
}
