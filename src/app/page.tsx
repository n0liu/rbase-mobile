'use client';

import { Button, Card, NavBar, List, Space } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { mode, resolvedTheme, isDark } = useTheme();

  // 标记是否已在客户端挂载（避免 Hydration 错误）
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--adm-color-background)' }}>
      <NavBar back={null}>移动端组件库</NavBar>

      <div style={{ padding: '16px' }}>
        {/* 欢迎卡片 */}
        <Card title="🎉 欢迎使用" style={{ marginBottom: '16px' }}>
          <p>这是一个基于 Next.js 16 + Ant Design Mobile 5 的移动端组件库</p>
          <p>支持手机、平板响应式设计，内置暗黑模式和完整的设计令牌系统</p>
        </Card>

        {/* 当前状态 */}
        <Card title="📊 当前状态" style={{ marginBottom: '16px' }}>
          <List>
            <List.Item extra={mounted ? mode : '加载中...'}>主题模式</List.Item>
            <List.Item extra={mounted ? resolvedTheme : '加载中...'}>实际主题</List.Item>
            <List.Item extra={mounted ? (isDark ? '是' : '否') : '加载中...'}>暗黑模式</List.Item>
          </List>
        </Card>

        {/* 已完成功能 */}
        <Card title="✅ 已完成功能" style={{ marginBottom: '16px' }}>
          <List>
            <List.Item prefix="🎨">完整的设计令牌系统（颜色、字体、间距等）</List.Item>
            <List.Item prefix="🌓">主题切换（亮色/暗色/跟随系统）</List.Item>
            <List.Item prefix="📱">响应式设计（基于 375px 基准 vw 单位）</List.Item>
            <List.Item prefix="🛡️">安全区域处理（刘海屏/圆角屏自适配）</List.Item>
            <List.Item prefix="📐">px 到 vw 自动转换</List.Item>
            <List.Item prefix="🎯">Ant Design Mobile 样式覆盖</List.Item>
            <List.Item prefix="💾">单一数据源（所有样式来自 tokens）</List.Item>
          </List>
        </Card>

        {/* 技术栈 */}
        <Card title="🛠️ 技术栈" style={{ marginBottom: '16px' }}>
          <List>
            <List.Item>Next.js 16 + React 19</List.Item>
            <List.Item>Ant Design Mobile 5.41.1</List.Item>
            <List.Item>TypeScript 5</List.Item>
            <List.Item>设计令牌系统</List.Item>
            <List.Item>CSS Variables 动态注入</List.Item>
            <List.Item>postcss-px-to-viewport</List.Item>
            <List.Item>Context API（主题管理）</List.Item>
          </List>
        </Card>

        {/* 操作按钮 */}
        <Card title="🚀 开始测试" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" block>
            <Button
              color="primary"
              size="large"
              block
              onClick={() => router.push('/test')}
            >
              进入测试页面
            </Button>
            <p style={{
              fontSize: 'var(--adm-font-size-3)',
              color: 'var(--adm-color-text-secondary)',
              textAlign: 'center',
              marginTop: '8px'
            }}>
              在测试页面中可以查看所有设计令牌、切换主题、测试响应式行为
            </p>
          </Space>
        </Card>
      </div>
    </div>
  );
}
