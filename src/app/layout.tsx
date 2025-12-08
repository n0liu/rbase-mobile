'use client';

import { ConfigProvider, unstableSetRender } from 'antd-mobile';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { mobileTheme } from '@/theme';
import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('vconsole').then(({ default: VConsole }) => {
        new VConsole();
      });
    }
  }, []);

  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>rbase-mobile</title>
      </head>
      <body>
        <ConfigProvider {...mobileTheme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
