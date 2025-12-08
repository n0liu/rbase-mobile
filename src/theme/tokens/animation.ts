/**
 * 动画设计令牌
 * 统一的动画时长和缓动函数
 */

// 动画时长
export const duration = {
  instant: '0ms',
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
  slower: '500ms',
  slowest: '800ms',
} as const;

// 缓动函数
export const easing = {
  // 标准缓动
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // 自定义缓动
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',

  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

  // 弹性缓动
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// 组件特定动画配置
export const componentAnimation = {
  // 页面切换
  pageTransition: {
    duration: duration.normal,
    easing: easing.easeInOut,
  },

  // 模态框
  modal: {
    duration: duration.normal,
    easing: easing.easeOut,
  },

  // 抽屉
  drawer: {
    duration: duration.normal,
    easing: easing.easeInOut,
  },

  // 折叠面板
  collapse: {
    duration: duration.normal,
    easing: easing.easeInOut,
  },

  // 淡入淡出
  fade: {
    duration: duration.fast,
    easing: easing.linear,
  },

  // 滑动
  slide: {
    duration: duration.normal,
    easing: easing.easeInOut,
  },

  // 缩放
  zoom: {
    duration: duration.fast,
    easing: easing.easeOut,
  },

  // 按钮点击
  buttonPress: {
    duration: duration.fast,
    easing: easing.easeOut,
  },

  // 涟漪效果
  ripple: {
    duration: duration.slow,
    easing: easing.easeOut,
  },
} as const;

// 常用动画关键帧
export const keyframes = {
  // 淡入
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  // 淡出
  fadeOut: `
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,

  // 从上滑入
  slideInUp: `
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  `,

  // 从下滑入
  slideInDown: `
    @keyframes slideInDown {
      from {
        transform: translateY(-100%);
      }
      to {
        transform: translateY(0);
      }
    }
  `,

  // 从左滑入
  slideInLeft: `
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `,

  // 从右滑入
  slideInRight: `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `,

  // 缩放
  zoomIn: `
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,

  // 旋转
  rotate: `
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,

  // 脉冲
  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,
} as const;

/**
 * 完整的动画系统配置
 */
export const animation = {
  duration,
  easing,
  component: componentAnimation,
  keyframes,
} as const;

export type DurationTokens = typeof duration;
export type EasingTokens = typeof easing;
