/**
 * 间距设计令牌
 * 包含手机和平板的响应式间距系统
 */

import type { DeviceType } from './typography';

// 手机端基础间距（基准：375px）
export const mobileSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
} as const;

// 平板端基础间距（基准：768px，更大）
export const tabletSpacing = {
  xs: '6px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
  xxxl: '48px',
} as const;

// 组件特定间距
export const componentSpacing = {
  // 导航栏高度
  navBarHeight: {
    mobile: '44px',
    tablet: '56px',
  },

  // 标签栏高度
  tabBarHeight: {
    mobile: '50px',
    tablet: '60px',
  },

  // 列表项高度
  listItemHeight: {
    mobile: '50px',
    tablet: '64px',
  },

  // 按钮高度
  buttonHeight: {
    small: {
      mobile: '32px',
      tablet: '36px',
    },
    medium: {
      mobile: '44px',
      tablet: '48px',
    },
    large: {
      mobile: '52px',
      tablet: '56px',
    },
  },

  // 输入框高度
  inputHeight: {
    small: {
      mobile: '32px',
      tablet: '36px',
    },
    medium: {
      mobile: '40px',
      tablet: '44px',
    },
    large: {
      mobile: '48px',
      tablet: '52px',
    },
  },

  // 页面边距
  pageHorizontal: {
    mobile: '16px',
    tablet: '32px',
  },

  pageVertical: {
    mobile: '16px',
    tablet: '24px',
  },

  // 卡片内边距
  cardPadding: {
    mobile: '16px',
    tablet: '24px',
  },

  // 模态框边距
  modalPadding: {
    mobile: '16px',
    tablet: '24px',
  },

  // 安全区域（iPhone X 等）
  safeArea: {
    top: 'env(safe-area-inset-top)',
    right: 'env(safe-area-inset-right)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
  },
} as const;

// 类型定义
export type SpacingKeys = keyof typeof mobileSpacing;
export type SpacingTokens = Record<SpacingKeys, string>;

/**
 * 根据设备类型获取间距令牌
 */
export function getSpacing(deviceType: DeviceType): SpacingTokens {
  return deviceType === 'mobile' ? { ...mobileSpacing } : { ...tabletSpacing };
}

/**
 * 获取组件特定的响应式间距值
 */
export function getComponentSpacing(
  component: keyof typeof componentSpacing,
  deviceType: DeviceType,
  variant?: string
): string {
  const spacingValue = componentSpacing[component] as any;

  if (typeof spacingValue === 'object' && 'mobile' in spacingValue && 'tablet' in spacingValue) {
    return spacingValue[deviceType] as string;
  }

  if (variant && typeof spacingValue === 'object' && variant in spacingValue) {
    const variantValue = spacingValue[variant] as any;
    if (variantValue && typeof variantValue === 'object' && 'mobile' in variantValue && 'tablet' in variantValue) {
      return variantValue[deviceType] as string;
    }
  }

  return '16px'; // 默认值
}

/**
 * 完整的间距系统配置
 */
export const spacing = {
  mobile: mobileSpacing,
  tablet: tabletSpacing,
  component: componentSpacing,
} as const;
