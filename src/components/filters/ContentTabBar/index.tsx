'use client';

import { FilterOutline, DownOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { ContentTabBarProps } from './types';

export default function ContentTabBar({
  tabs,
  activeTab,
  onTabChange,
  sortLabel,
  onSortClick,
  onFilterClick,
  showAnalysisBtn = false,
  onAnalysisClick
}: ContentTabBarProps) {
  // 格式化数字（千位分隔）
  const formatCount = (count: number) => {
    return count.toLocaleString('zh-CN');
  };

  return (
    <div className={styles.tabBar}>
      {/* 左侧 Tab 列表 */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
            {tab.count !== undefined && ` (${formatCount(tab.count)})`}
          </div>
        ))}
      </div>

      {/* 右侧操作区 */}
      <div className={styles.actions}>
        {/* 数据分析按钮（可选） */}
        {showAnalysisBtn && (
          <div className={styles.analysisBtn} onClick={onAnalysisClick}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className={styles.analysisIcon}
            >
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 9L13 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* 排序按钮 */}
        {sortLabel && onSortClick && (
          <div className={styles.sortBtn} onClick={onSortClick}>
            {sortLabel}
            <DownOutline className={styles.sortIcon} />
          </div>
        )}

        {/* 筛选按钮 */}
        {onFilterClick && (
          <div className={styles.filterBtn} onClick={onFilterClick}>
            <FilterOutline className={styles.filterIcon} />
          </div>
        )}
      </div>
    </div>
  );
}
