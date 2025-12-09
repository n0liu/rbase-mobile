/**
 * 间距设计令牌
 * 统一基于 375px 基准的响应式间距系统
 * 通过 vw 单位实现真正的响应式，适配所有屏幕尺寸
 */

/**
 * 基础间距（基准：375px）
 * 将通过 pxToVw() 函数转换为 vw 单位，实现跨设备响应式
 */
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
} as const;

/**
 * 组件特定间距（基准：375px）
 * 将通过 pxToVw() 函数转换为 vw 单位，实现跨设备响应式
 */
export const componentSpacing = {
  // 导航栏高度
  navBarHeight: '44px',

  // 标签栏高度
  tabBarHeight: '50px',

  // 列表项高度
  listItemHeight: '50px',

  // 按钮高度
  buttonHeight: {
    small: '32px',
    medium: '44px',
    large: '52px',
  },

  // 输入框高度
  inputHeight: {
    small: '32px',
    medium: '40px',
    large: '48px',
  },

  // 页面边距
  pageHorizontal: '16px',
  pageVertical: '16px',

  // 卡片内边距
  cardPadding: '16px',

  // 模态框边距
  modalPadding: '16px',

  // 安全区域（iPhone X 等）
  safeArea: {
    top: 'env(safe-area-inset-top)',
    right: 'env(safe-area-inset-right)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
  },
} as const;
