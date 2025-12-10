'use client';

import { useState } from 'react';
import AIInputBar from '@/components/layout/AIInputBar';
import TopNavigationBar from '@/components/layout/TopNavigationBar';
import TreeView from '@/components/list/TreeView';
import { TreeNode } from '@/components/list/TreeView/types';
import styles from './page.module.scss';

export default function TestComponentsPage() {
  const [messages, setMessages] = useState<string[]>([]);

  // TreeView 测试数据
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['益生菌']));
  const [selectedNode, setSelectedNode] = useState<string>('益生菌');

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
        tag="文献"
        onSearchClick={() => alert('搜索点击')}
        onUserClick={() => alert('用户头像点击')}
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
          <h2 className={styles.sectionTitle}>📝 组件说明</h2>
          <div className={styles.infoCard}>
            <h3>TreeView 组件功能：</h3>
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
            <pre>{`// TreeView
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
    </div>
  );
}
