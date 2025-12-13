'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { UpOutline } from 'antd-mobile-icons';
import { CategoryGridProps } from './types';
import styles from './index.module.css';

export default function CategoryGrid({ items, onItemClick, scrollContainerRef }: CategoryGridProps) {
  const MAX_ITEMS = 8;
  const [expanded, setExpanded] = useState(false);
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const [maskTop, setMaskTop] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;

    if (expanded && menuSectionRef.current) {
      const rect = menuSectionRef.current.getBoundingClientRect();
      setMaskTop(rect.bottom + window.scrollY);

      // 禁止滚动容器滚动
      if (scrollContainer) {
        // eslint-disable-next-line react-hooks/immutability
        scrollContainer.style.overflow = 'hidden';
      }
      // 同时禁止 body 滚动（以防万一）
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复滚动
      if (scrollContainer) {
        scrollContainer.style.overflow = '';
      }
      document.body.style.overflow = '';
    }

    // 清理函数
    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflow = '';
      }
      document.body.style.overflow = '';
    };
  }, [expanded, scrollContainerRef]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const hasMore = items.length > MAX_ITEMS;

  // 收起状态：前7个 + "更多"按钮
  const collapsedItems = hasMore
    ? [
        ...items.slice(0, 7),
        { id: '_toggle', label: '更多', icon: '', isToggle: true }
      ]
    : items;

  // 展开状态：所有项 + "收起"按钮插入到第8个位置
  const expandedItems = hasMore
    ? [
        ...items.slice(0, 7),
        { id: '_toggle', label: '收起', icon: '', isToggle: true },
        ...items.slice(7)
      ]
    : items;

  const displayItems = expanded ? expandedItems : collapsedItems;

  // 分离固定的2行和额外的行
  const fixedRowsItemCount = 8;
  const fixedItems = displayItems.slice(0, fixedRowsItemCount);
  const extraItems = expanded ? displayItems.slice(fixedRowsItemCount) : [];

  const renderItem = (item: any) => {
    const isToggleButton = 'isToggle' in item && item.isToggle;

    return (
      <div
        key={item.id}
        className={styles.menuItem}
        onClick={() => {
          if (isToggleButton) {
            toggleExpanded();
          } else {
            onItemClick?.(item);
          }
        }}
      >
        {isToggleButton ? (
          <>
            <div className={styles.menuIconCircle}>
              {expanded ? (
                <UpOutline style={{ fontSize: 20, color: 'var(--rbase-color-primary)' }} />
              ) : (
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              )}
            </div>
            <span className={styles.menuLabel}>{item.label}</span>
          </>
        ) : (
          <>
            <div className={styles.menuIconCircle}>
              <Image src={item.icon} alt={item.label} width={36} height={36} />
            </div>
            <span className={styles.menuLabel}>{item.label}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.menuSection} ref={menuSectionRef}>
        {/* 固定的2行 */}
        <div className={styles.menuGrid}>
          {fixedItems.map(item => renderItem(item))}
        </div>

        {/* 展开的额外内容 - 浮层 */}
        {hasMore && (
          <div className={styles.expandedOverlay}>
            <div className={`${styles.expandedContent} ${expanded ? styles.show : ''}`}>
              <div className={styles.menuGrid}>
                {extraItems.map(item => renderItem(item))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 遮罩层 - 只遮住 CategoryGrid 下面的内容 */}
      {hasMore && (
        <div
          className={`${styles.overlayMask} ${expanded ? styles.show : ''}`}
          style={{ top: `${maskTop}px` }}
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  );
}
