'use client';

import { useState } from 'react';
import { Tag } from 'antd-mobile';
import AIInputBar from '@/components/layout/AIInputBar';
import TopNavigationBar from '@/components/layout/TopNavigationBar';
import TreeView from '@/components/list/TreeView';
import FilterDrawer from '@/components/drawers/FilterDrawer';
import { TreeNode } from '@/components/list/TreeView/types';
import styles from './page.module.scss';

export default function TestComponentsPage() {
  const [messages, setMessages] = useState<string[]>([]);

  // TreeView 测试数据
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['益生菌']));
  const [selectedNode, setSelectedNode] = useState<string>('益生菌');

  // FilterDrawer 测试数据
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeFilterMenu, setActiveFilterMenu] = useState('影响因子');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['0-5 (452)', '5-10 (311)']);

  const treeData: TreeNode[] = [
    {
      name: '益生菌',
      count: 6520,
      children: [
        {
          name: '属/株',
          count: 3450,
          children: [
            {
              name: '双歧杆菌属',
              count: 870,
              children: [
                { name: '长双歧杆菌', count: 320 },
                { name: '动物双歧杆菌', count: 250 }
              ]
            },
            { name: '乳杆菌属', count: 1230 }
          ]
        },
        { name: '婴幼儿菌株', count: 580 },
        { name: '保健品原料', count: 1800 }
      ]
    }
  ];

  const handleSend = (text: string) => {
    setMessages([...messages, `用户: ${text}`]);
    // 模拟 AI 回复
    setTimeout(() => {
      setMessages((prev) => [...prev, `AI: 收到您的消息 "${text}"`]);
    }, 500);
  };

  const handleToggleNode = (nodeName: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeName)) {
      newExpanded.delete(nodeName);
    } else {
      newExpanded.add(nodeName);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node.name);
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <TopNavigationBar
        onSearchClick={() => alert('搜索点击')}
        onListClick={() => alert('列表点击')}
      />

      {/* 标题区 */}
      <div className={styles.header}>
        <h1 className={styles.title}>组件测试页面</h1>
        <p className={styles.subtitle}>测试 AIInputBar、TopNavigationBar、TreeView 组件</p>
      </div>

      {/* 内容区 */}
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>💬 消息记录</h2>
          <div className={styles.messageList}>
            {messages.length === 0 ? (
              <div className={styles.emptyMessage}>暂无消息，请在底部输入框发送消息</div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.startsWith('用户:') ? styles.userMessage : styles.aiMessage}
                >
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>🌲 TreeView 树状结构</h2>
          <div className={styles.infoCard}>
            <p style={{ marginBottom: '12px', color: 'var(--rbase-color-text-secondary)' }}>
              当前选中：<strong style={{ color: 'var(--rbase-color-primary)' }}>{selectedNode}</strong>
            </p>
            <TreeView
              data={treeData}
              expandedNodes={expandedNodes}
              selectedNode={selectedNode}
              onToggle={handleToggleNode}
              onNodeClick={handleNodeClick}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>🎛️ FilterDrawer 筛选抽屉</h2>
          <div className={styles.infoCard}>
            <p style={{ marginBottom: '12px', color: 'var(--rbase-color-text-secondary)' }}>
              当前菜单：<strong style={{ color: 'var(--rbase-color-primary)' }}>{activeFilterMenu}</strong>
            </p>
            <p style={{ marginBottom: '12px', color: 'var(--rbase-color-text-secondary)' }}>
              已选筛选项：{selectedFilters.length > 0 ? selectedFilters.join(', ') : '无'}
            </p>
            <button
              onClick={() => setDrawerVisible(true)}
              style={{
                padding: '12px 24px',
                background: 'var(--rbase-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              打开筛选抽屉
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>📝 组件说明</h2>
          <div className={styles.infoCard}>
            <h3>FilterDrawer 组件功能：</h3>
            <ul>
              <li>✅ 从右侧滑出</li>
              <li>✅ 左侧垂直菜单栏</li>
              <li>✅ 右侧可滚动内容区</li>
              <li>✅ 菜单项激活状态（蓝色左边框）</li>
              <li>✅ 关闭按钮</li>
              <li>✅ 自定义宽度</li>
              <li>✅ 基于 antd-mobile Popup 封装</li>
            </ul>
            <h3 style={{ marginTop: '16px' }}>TreeView 组件功能：</h3>
            <ul>
              <li>✅ 多层级嵌套结构</li>
              <li>✅ 展开/收起功能</li>
              <li>✅ 叶子节点横线、父节点 +/- 图标</li>
              <li>✅ 垂直连接线</li>
              <li>✅ 节点选中状态高亮</li>
              <li>✅ 根节点样式突出</li>
              <li>✅ 自定义层级缩进</li>
            </ul>
            <h3 style={{ marginTop: '16px' }}>TopNavigationBar 组件功能：</h3>
            <ul>
              <li>✅ R•base Logo 展示</li>
              <li>✅ 标签切换（文献/HOPE/机构）</li>
              <li>✅ 搜索、列表图标（可显示/隐藏）</li>
              <li>✅ 用户头像（可自定义）</li>
              <li>✅ 点击事件回调</li>
              <li>✅ 使用 design tokens</li>
            </ul>
            <h3 style={{ marginTop: '16px' }}>AIInputBar 组件功能：</h3>
            <ul>
              <li>✅ AI 按钮（可自定义图标和文本）</li>
              <li>✅ 输入框（支持占位符配置）</li>
              <li>✅ 右侧按钮（可显示/隐藏）</li>
              <li>✅ Enter 键发送</li>
              <li>✅ 底部固定 + safe-area 支持</li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>🎨 组件配置示例</h2>
          <div className={styles.codeBlock}>
            <pre>{`// FilterDrawer
<FilterDrawer
  visible={drawerVisible}
  onClose={() => setDrawerVisible(false)}
  title="筛选条件"
  menus={[
    { key: 'if', label: '影响因子' },
    { key: 'date', label: '发表日期' }
  ]}
  activeMenu={activeFilterMenu}
  onMenuChange={setActiveFilterMenu}
  width="80vw" // 可选，默认 80vw
>
  {/* 内容区域 */}
</FilterDrawer>

// TreeView
<TreeView
  data={treeData}
  expandedNodes={expandedNodes}
  selectedNode={selectedNode}
  onToggle={(name) => toggleNode(name)}
  onNodeClick={(node) => selectNode(node)}
  levelIndent={24} // 可选，默认 24px
/>

// TopNavigationBar
<TopNavigationBar
  tag="文献"
  showListIcon={true}
  onSearchClick={() => console.log('搜索')}
  onListClick={() => console.log('列表')}
  onUserClick={() => console.log('用户')}
/>

// AIInputBar
<AIInputBar
  placeholder="输入问题，对话权威文献"
  buttonText="AI问答"
  onSend={(text) => console.log('发送:', text)}
  onAIButtonClick={() => console.log('AI按钮点击')}
/>`}</pre>
          </div>
        </div>
      </div>

      {/* AIInputBar 组件 - 默认配置 */}
      <AIInputBar
        onSend={handleSend}
        onAIButtonClick={() => alert('AI问答按钮被点击')}
      />

      {/* FilterDrawer 组件 */}
      <FilterDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        title="筛选条件"
        menus={[
          { key: '影响因子', label: '影响因子' },
          { key: '发表日期', label: '发表日期' },
          { key: '健康效应', label: '健康效应' },
          { key: '菌株/原料', label: '菌株/原料' }
        ]}
        activeMenu={activeFilterMenu}
        onMenuChange={setActiveFilterMenu}
      >
        {activeFilterMenu === '影响因子' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>影响因子</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['0-5 (452)', '5-10 (311)', '10-15 (189)', '15-20 (98)', '20-30 (45)', '30+ (12)'].map((option) => (
                <Tag
                  key={option}
                  color={selectedFilters.includes(option) ? 'primary' : 'default'}
                  fill={selectedFilters.includes(option) ? 'solid' : 'outline'}
                  onClick={() => {
                    if (selectedFilters.includes(option)) {
                      setSelectedFilters(selectedFilters.filter((f) => f !== option));
                    } else {
                      setSelectedFilters([...selectedFilters, option]);
                    }
                  }}
                >
                  {option}
                </Tag>
              ))}
            </div>
          </div>
        )}
        {activeFilterMenu === '发表日期' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>发表日期</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['2025 (156)', '2024 (892)', '2023 (1205)', '2022 (980)'].map((option) => (
                <Tag key={option} color="default" fill="outline">
                  {option}
                </Tag>
              ))}
            </div>
          </div>
        )}
        {activeFilterMenu === '健康效应' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>健康效应</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['免疫调节 (320)', '肠道健康 (280)', '代谢改善 (210)'].map((option) => (
                <Tag key={option} color="default" fill="outline">
                  {option}
                </Tag>
              ))}
            </div>
          </div>
        )}
        {activeFilterMenu === '菌株/原料' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>菌株/原料</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['乳酸菌 (450)', '双歧杆菌 (380)', '酵母菌 (120)'].map((option) => (
                <Tag key={option} color="default" fill="outline">
                  {option}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </FilterDrawer>
    </div>
  );
}
