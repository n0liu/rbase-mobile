'use client';

import { Button, List, Card, NavBar, Space, Toast } from 'antd-mobile';
import { useUserStore } from '@/store/userStore';

export default function Home() {
  const { user, setUser } = useUserStore();

  const handleLogin = () => {
    setUser({ name: '测试用户', id: 1 });
    Toast.show({
      content: '登录成功！',
      icon: 'success',
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <NavBar back={null}>rbase-mobile 示例</NavBar>

      <div style={{ padding: '16px' }}>
        <Card title="欢迎使用" style={{ marginBottom: '16px' }}>
          <p>这是一个基于 Next.js 16 + Ant Design Mobile 的移动端项目</p>
          <p>当前用户：{user ? user.name : '未登录'}</p>
        </Card>

        <Card title="功能演示" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" block>
            <Button color="primary" block onClick={handleLogin}>
              登录（Zustand 状态管理）
            </Button>
            <Button block>普通按钮</Button>
            <Button color="success" block>成功按钮</Button>
            <Button color="warning" block>警告按钮</Button>
            <Button color="danger" block>危险按钮</Button>
          </Space>
        </Card>

        <Card title="列表组件">
          <List>
            <List.Item prefix="📱" onClick={() => Toast.show('点击了移动端优化')}>
              移动端优化
            </List.Item>
            <List.Item prefix="🎨" onClick={() => Toast.show('点击了主题定制')}>
              主题定制
            </List.Item>
            <List.Item prefix="⚡" onClick={() => Toast.show('点击了快速开发')}>
              快速开发
            </List.Item>
            <List.Item prefix="🔧" onClick={() => Toast.show('点击了工具集成')}>
              工具集成
            </List.Item>
          </List>
        </Card>

        <Card title="技术栈" style={{ marginTop: '16px' }}>
          <List>
            <List.Item>Next.js 16</List.Item>
            <List.Item>React 19</List.Item>
            <List.Item>Ant Design Mobile 5</List.Item>
            <List.Item>TypeScript 5</List.Item>
            <List.Item>Zustand（状态管理）</List.Item>
            <List.Item>Axios（HTTP 请求）</List.Item>
          </List>
        </Card>
      </div>
    </div>
  );
}
