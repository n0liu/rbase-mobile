'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper } from 'antd-mobile';
import { MoreOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { ResearcherSwiperProps } from './types';

export default function ResearcherSwiper({
  researchers,
  firstPageColumns = 4,
  firstPageRows = 1,
  otherPageColumns = 4,
  otherPageRows = 2,
  onResearcherClick,
  onMoreClick,
  showMoreButton = true,
  showIndicator = true,
  autoHeight = true,
  firstPageHeight = '100px',
  otherPageHeight = '200px'
}: ResearcherSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 计算第一页显示的数量
  const firstPageCount = firstPageColumns * firstPageRows;
  // 计算其他页显示的数量（为"更多"按钮留一个位置）
  const otherPageCount = otherPageColumns * otherPageRows - (showMoreButton ? 1 : 0);

  // 分页数据
  const firstPageResearchers = researchers.slice(0, firstPageCount);
  const remainingResearchers = researchers.slice(firstPageCount);

  // 计算总页数
  const hasSecondPage = remainingResearchers.length > 0;
  const totalPages = hasSecondPage ? 2 : 1;

  // 动态高度
  const swiperHeight = autoHeight
    ? currentIndex === 0
      ? firstPageHeight
      : otherPageHeight
    : 'auto';

  // 构建 Swiper 项数组
  const swiperItems = [
    // 第一页
    <Swiper.Item key="page1">
      <div
        className={styles.gridSingleRow}
        style={{
          gridTemplateColumns: `repeat(${firstPageColumns}, 1fr)`
        }}
      >
        {firstPageResearchers.map((researcher, idx) => (
          <div
            key={idx}
            className={styles.gridItem}
            onClick={() => onResearcherClick?.(researcher)}
          >
            <Image
              src={researcher.avatar}
              alt={researcher.name}
              width={56}
              height={56}
              className={styles.avatar}
            />
            <span className={styles.name}>{researcher.name}</span>
          </div>
        ))}
      </div>
    </Swiper.Item>
  ];

  // 第二页（如果有的话）
  if (hasSecondPage) {
    swiperItems.push(
      <Swiper.Item key="page2">
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${otherPageColumns}, 1fr)`,
            gridTemplateRows: `repeat(${otherPageRows}, auto)`
          }}
        >
          {remainingResearchers.slice(0, otherPageCount).map((researcher, idx) => (
            <div
              key={idx}
              className={styles.gridItem}
              onClick={() => onResearcherClick?.(researcher)}
            >
              <Image
                src={researcher.avatar}
                alt={researcher.name}
                width={56}
                height={56}
                className={styles.avatar}
              />
              <span className={styles.name}>{researcher.name}</span>
            </div>
          ))}
          {/* "更多"按钮 */}
          {showMoreButton && (
            <div className={styles.gridItem} onClick={onMoreClick}>
              <div className={styles.moreButton}>
                <MoreOutline className={styles.moreIcon} />
              </div>
              <span className={styles.name}>更多</span>
            </div>
          )}
        </div>
      </Swiper.Item>
    );
  }

  return (
    <div className={styles.swiperSection}>
      <Swiper
        trackOffset={0}
        stuckAtBoundary={false}
        className={styles.swiper}
        style={{ height: swiperHeight, transition: 'height 0.3s ease' }}
        onIndexChange={(index) => setCurrentIndex(index)}
        indicator={false}
      >
        {swiperItems}
      </Swiper>

      {/* 自定义指示器 */}
      {showIndicator && totalPages > 1 && (
        <div className={styles.indicator}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`${styles.indicatorDot} ${
                index === currentIndex ? styles.indicatorDotActive : ''
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
