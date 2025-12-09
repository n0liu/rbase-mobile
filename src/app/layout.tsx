'use client';

import { ConfigProvider, unstableSetRender } from 'antd-mobile';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { getThemeConfig } from '@/theme';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import "./globals.css";
import "@/styles/antd-overrides.css"; // 引入 antd 样式覆盖
import { useEffect } from 'react';

// React 19 兼容性配置（官方方案）
unstableSetRender((node, container) => {
  // 添加类型断言以支持自定义属性
  const containerWithRoot = container as (Element | DocumentFragment) & { _reactRoot?: Root };
  containerWithRoot._reactRoot ||= createRoot(container);
  const root = containerWithRoot._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

// 内部组件：应用主题配置
function AppContent({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  // 根据主题生成配置（统一基于 375px 基准）
  const themeConfig = getThemeConfig(resolvedTheme);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('vconsole').then(({ default: VConsole }) => {
        new VConsole();
      });
    }
  }, []);

  // 动态注入 CSS 变量到 :root
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeConfig).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [themeConfig]);

  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 生成默认的 CSS 变量（light 主题），用于服务端渲染和初始加载
  const defaultThemeConfig = getThemeConfig('light');
  const cssVariablesString = Object.entries(defaultThemeConfig)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n    ');

  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <title>rbase-mobile</title>
        {/* 内联 CSS 变量，避免字体闪烁 */}
        <style dangerouslySetInnerHTML={{
          __html: `:root {\n    ${cssVariablesString}\n  }`
        }} />
      </head>
      <body>
        <ThemeProvider>
          <AppContent>{children}</AppContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
