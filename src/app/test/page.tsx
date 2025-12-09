'use client';

import { Button, Card, List, NavBar, Space, Dialog } from 'antd-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function TestPage() {
  const { mode, resolvedTheme, setMode, isDark } = useTheme();

  // 标记是否已在客户端挂载（避免 Hydration 错误）
  const [mounted, setMounted] = useState(false);

  // CSS 变量值（客户端获取）
  const [cssVars, setCssVars] = useState<Record<string, string>>({
    '--adm-color-primary': '',
    '--adm-font-size-main': '',
    '--adm-radius-m': '',
    '--spacing-lg': '',
  });

  // 安全区域值（客户端获取）
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: '',
    bottom: '',
    left: '',
    right: '',
  });

  // 标记组件已在客户端挂载
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // 在客户端获取 CSS 变量值和安全区域值
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCssVars({
        '--adm-color-primary': computedStyle.getPropertyValue('--adm-color-primary'),
        '--adm-font-size-main': computedStyle.getPropertyValue('--adm-font-size-main'),
        '--adm-radius-m': computedStyle.getPropertyValue('--adm-radius-m'),
        '--spacing-lg': computedStyle.getPropertyValue('--spacing-lg'),
      });

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSafeAreaInsets({
        top: computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0px',
        bottom: computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0px',
        left: computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0px',
        right: computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0px',
      });
    }
  }, [mounted, resolvedTheme]); // 当主题变化时重新获取

  const handleThemeChange = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setMode(nextMode);
  };

  return (
    <div className={styles.container}>
      <NavBar back={null}>主题测试</NavBar>

      <div className={styles.content}>
        {/* 主题信息卡片 */}
        <Card title="🎨 主题信息" className={styles.card}>
          <List>
            <List.Item extra={mounted ? mode : '加载中...'}>主题模式</List.Item>
            <List.Item extra={mounted ? resolvedTheme : '加载中...'}>实际主题</List.Item>
            <List.Item extra={mounted ? (isDark ? '是' : '否') : '加载中...'}>暗黑模式</List.Item>
          </List>

          <div className={styles.buttonGroup}>
            <Button
              color="primary"
              onClick={handleThemeChange}
              block
              disabled={!mounted}
            >
              切换主题 {mounted && `(当前: ${mode})`}
            </Button>
          </div>
        </Card>

        {/* 组件展示卡片 */}
        <Card title="🎯 组件展示" className={styles.card}>
          <Space direction="vertical" block>
            <Button color="primary" block>主要按钮</Button>
            <Button color="success" block>成功按钮</Button>
            <Button color="warning" block>警告按钮</Button>
            <Button color="danger" block>危险按钮</Button>
            <Button
              block
              onClick={() => {
                Dialog.confirm({
                  content: '这是一个对话框示例',
                  onConfirm: () => {
                    Dialog.show({
                      content: '你点击了确认',
                    });
                  },
                });
              }}
            >
              打开对话框
            </Button>
          </Space>
        </Card>

        {/* 颜色展示卡片 */}
        <Card title="🎨 设计令牌颜色" className={styles.card}>
          <div className={styles.colorGrid}>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-primary)' }} />
              <div className={styles.colorLabel}>Primary</div>
            </div>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-success)' }} />
              <div className={styles.colorLabel}>Success</div>
            </div>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-warning)' }} />
              <div className={styles.colorLabel}>Warning</div>
            </div>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-danger)' }} />
              <div className={styles.colorLabel}>Danger</div>
            </div>
          </div>

          <div className={styles.colorGrid} style={{ marginTop: 16 }}>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-text)' }} />
              <div className={styles.colorLabel}>Text</div>
            </div>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-text-secondary)' }} />
              <div className={styles.colorLabel}>Text 2nd</div>
            </div>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-weak)' }} />
              <div className={styles.colorLabel}>Text 3rd</div>
            </div>
            <div className={styles.colorItem}>
              <div className={styles.colorBox} style={{ backgroundColor: 'var(--adm-color-border)' }} />
              <div className={styles.colorLabel}>Border</div>
            </div>
          </div>
        </Card>

        {/* 字体展示卡片 */}
        <Card title="📝 字体大小" className={styles.card}>
          <div className={styles.fontSizes}>
            <div style={{ fontSize: 'var(--adm-font-size-1)' }}>Font Size 1 (overline)</div>
            <div style={{ fontSize: 'var(--adm-font-size-3)' }}>Font Size 3 (caption)</div>
            <div style={{ fontSize: 'var(--adm-font-size-5)' }}>Font Size 5 (body)</div>
            <div style={{ fontSize: 'var(--adm-font-size-7)' }}>Font Size 7 (h5)</div>
            <div style={{ fontSize: 'var(--adm-font-size-8)' }}>Font Size 8 (h4)</div>
            <div style={{ fontSize: 'var(--adm-font-size-10)' }}>Font Size 10 (h2)</div>
          </div>
        </Card>

        {/* CSS 变量信息 */}
        <Card title="⚙️ CSS 变量预览" className={styles.card}>
          <div className={styles.variableList}>
            <div>--adm-color-primary: <code>{cssVars['--adm-color-primary'] || '加载中...'}</code></div>
            <div>--adm-font-size-main: <code>{cssVars['--adm-font-size-main'] || '加载中...'}</code></div>
            <div>--adm-radius-m: <code>{cssVars['--adm-radius-m'] || '加载中...'}</code></div>
            <div>--spacing-lg: <code>{cssVars['--spacing-lg'] || '加载中...'}</code></div>
          </div>
        </Card>

        {/* 安全区域信息 */}
        <Card title="📱 安全区域" className={styles.card}>
          <div className={styles.variableList}>
            <div>顶部安全区域: <code>{safeAreaInsets.top || '加载中...'}</code></div>
            <div>底部安全区域: <code>{safeAreaInsets.bottom || '加载中...'}</code></div>
            <div>左侧安全区域: <code>{safeAreaInsets.left || '加载中...'}</code></div>
            <div>右侧安全区域: <code>{safeAreaInsets.right || '加载中...'}</code></div>
          </div>
          <p style={{
            fontSize: 'var(--adm-font-size-3)',
            color: 'var(--adm-color-text-secondary)',
            marginTop: '12px',
            lineHeight: 1.5
          }}>
            💡 安全区域由 SafeArea 组件自动处理，在有刘海/圆角的设备上会显示非零值
          </p>
        </Card>
      </div>
    </div>
  );
}
