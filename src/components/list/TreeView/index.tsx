'use client';

import React from 'react';
import styles from './index.module.scss';
import { TreeViewProps, TreeNode } from './types';

export default function TreeView({
  data,
  expandedNodes,
  selectedNode,
  onToggle,
  onNodeClick,
  levelIndent = 24
}: TreeViewProps) {
  // 处理节点点击
  const handleNodeClick = (node: TreeNode, hasChildren: boolean) => {
    if (hasChildren) {
      onToggle(node.name);
    }
    onNodeClick?.(node);
  };

  // 递归渲染树节点
  const renderNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.name);
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const isLeaf = !hasChildren;
    const isSelected = selectedNode === node.name;

    return (
      <div
        key={node.name}
        className={styles.nodeWrapper}
        style={{
          '--node-level': level,
          '--level-indent': `${levelIndent}px`
        } as React.CSSProperties}
      >
        <div
          className={`${styles.nodeItem} ${isSelected ? styles.nodeSelected : ''}`}
          onClick={() => handleNodeClick(node, hasChildren)}
        >
          <div className={styles.iconWrapper}>
            {isLeaf ? (
              // 叶子节点：横线
              <div className={styles.leafIcon}>
                <svg viewBox="0 0 16 16" fill="none">
                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            ) : isExpanded ? (
              // 已展开：圆圈 - 号
              <div className={styles.collapseIcon}>
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            ) : (
              // 未展开：圆圈 + 号
              <div className={styles.expandIcon}>
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            )}
          </div>
          <div className={level === 0 ? `${styles.nodeName} ${styles.nodeNameRoot}` : styles.nodeName}>
            {node.name} <span className={styles.nodeCount}>({node.count})</span>
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className={styles.childrenWrapper}>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return <div className={styles.treeView}>{data.map((node) => renderNode(node))}</div>;
}
