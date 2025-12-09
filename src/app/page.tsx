'use client';

import { Card, Grid } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import {
  AppOutline,
  FileOutline,
  UnorderedListOutline,
  SetOutline
} from 'antd-mobile-icons';
import styles from './home.module.css';

export default function Home() {
  const router = useRouter();

  const menuItems = [
    {
      icon: <AppOutline />,
      title: '设计系统',
      description: 'Design Tokens 展示',
      path: '/design-system',
      color: 'var(--rbase-color-primary)'
    },
    {
      icon: <FileOutline />,
      title: '版本1：经典布局',
      description: '折叠卡片式',
      path: '/article-v1',
      color: 'var(--rbase-color-success)'
    },
    {
      icon: <UnorderedListOutline />,
      title: '版本2：标签页',
      description: 'Tabs 切换式',
      path: '/article-v2',
      color: 'var(--rbase-color-warning)'
    },
    {
      icon: <SetOutline />,
      title: '版本3：卡片流',
      description: '底部操作栏式',
      path: '/article-v3',
      color: 'var(--rbase-color-accent)'
    }
  ];

  return (
    <div className={styles.container}>
      {/* 英雄区 */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>RBase Mobile</h1>
          <p className={styles.heroSubtitle}>
            我们追踪全球肠道科学研究进展，充分链接学术与产业界，推动转化和应用。
          </p>
        </div>
      </div>

      {/* 菜单网格 */}
      <div className={styles.content}>
        <Card className={styles.menuCard}>
          <Grid columns={2} gap={16}>
            {menuItems.map((item, index) => (
              <Grid.Item key={index}>
                <div
                  className={styles.menuItem}
                  onClick={() => router.push(item.path)}
                >
                  <div className={styles.menuIcon} style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className={styles.menuTitle}>{item.title}</div>
                  <div className={styles.menuDescription}>{item.description}</div>
                </div>
              </Grid.Item>
            ))}
          </Grid>
        </Card>

        {/* 说明卡片 */}
        <Card className={styles.infoCard}>
          <h3 className={styles.infoTitle}>移动端文献详情页 - 3个版本</h3>
          <div className={styles.infoContent}>
            <div className={styles.infoItem}>
              <strong>版本1：</strong>经典单栏布局，使用折叠卡片展示详细信息，配合浮动操作按钮
            </div>
            <div className={styles.infoItem}>
              <strong>版本2：</strong>标签页布局，通过 Tabs 切换不同内容区域（概览、详情、讨论、相关）
            </div>
            <div className={styles.infoItem}>
              <strong>版本3：</strong>卡片流布局，每个信息块独立展示，底部固定操作栏
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.featureTag}>英雄区设计</div>
            <div className={styles.featureTag}>Design Tokens</div>
            <div className={styles.featureTag}>响应式布局</div>
            <div className={styles.featureTag}>Ant Design Mobile</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
