/**
 * 圆角设计令牌
 * 统一的边框圆角系统
 */

export const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '20px',
  xxxl: '24px',
  full: '9999px',

  // 组件特定圆角
  button: '8px',
  card: '12px',
  modal: '16px',
  dialog: '16px',
  input: '6px',
  tag: '4px',
  badge: '10px',
  avatar: '50%',
  image: '8px',
} as const;

export type RadiusTokens = typeof radius;
