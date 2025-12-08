'use client';

import { useState, useEffect } from 'react';
import { getDeviceType, getOrientation, type DeviceType, type Orientation } from '@/theme/breakpoints';

export interface ResponsiveState {
  /** 设备类型 */
  deviceType: DeviceType;
  /** 屏幕方向 */
  orientation: Orientation;
  /** 窗口宽度 */
  width: number;
  /** 窗口高度 */
  height: number;
  /** 是否为手机 */
  isMobile: boolean;
  /** 是否为平板 */
  isTablet: boolean;
  /** 是否为桌面（>=1366px，使用平板样式） */
  isDesktop: boolean;
  /** 是否为竖屏 */
  isPortrait: boolean;
  /** 是否为横屏 */
  isLandscape: boolean;
}

/**
 * 获取当前响应式状态
 */
function getCurrentState(): ResponsiveState {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const deviceType = getDeviceType(width);
  const orientation = getOrientation(width, height);

  return {
    deviceType,
    orientation,
    width,
    height,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: width >= 1366, // 桌面宽度，但使用平板样式
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
}

/**
 * 响应式 Hook
 * 监听窗口大小和方向变化，返回当前的响应式状态
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    // 服务端渲染时返回默认值
    if (typeof window === 'undefined') {
      return {
        deviceType: 'mobile',
        orientation: 'portrait',
        width: 375,
        height: 667,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isPortrait: true,
        isLandscape: false,
      };
    }

    return getCurrentState();
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // 防抖处理，避免频繁更新
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setState(getCurrentState());
      }, 150);
    };

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    // 监听屏幕方向变化（某些设备支持）
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return state;
}
