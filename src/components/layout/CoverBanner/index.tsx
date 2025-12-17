'use client';

import Image from 'next/image';
import { SearchOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { CoverBannerProps } from './types';

export default function CoverBanner({
  title,
  subtitle,
  showSearchBox = true,
  searchPlaceholder = '输入益生菌/益生元名称检索',
  onSearch,
  backgroundImage,
  avatar,
  showMoreLink = false,
  onMoreClick,
}: CoverBannerProps) {
  return (
    <div
      className={styles.coverSection}
      style={backgroundImage ? { '--banner-bg-image': `url(${backgroundImage})` } as React.CSSProperties : undefined}
    >
      {/* 装饰性细菌图案 */}
      <div className={styles.decorationPattern}></div>

      {/* 内容 */}
      <div className={styles.coverContent}>
        {avatar ? (
          // 人物信息卡片模式
          <div className={styles.personCard}>
            <Image
              src={avatar}
              alt={title}
              width={60}
              height={60}
              className={styles.avatar}
              unoptimized
            />
            <div className={styles.personInfo}>
              <h1 className={styles.personName}>{title}</h1>
              <div className={styles.personDetails}>
                <span className={styles.personSubtitle} dangerouslySetInnerHTML={{ __html: subtitle || '' }} />
                {showMoreLink && (
                  <span className={styles.moreLink} onClick={onMoreClick}>更多&gt;</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          // 原来的文字模式
          <>
            <div className={styles.coverText}>
              <h1 className={styles.coverTitle} dangerouslySetInnerHTML={{ __html: title }} />
              {subtitle && (
                <p className={styles.coverSubtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
              )}
            </div>

            {/* 搜索框 */}
            {/* {showSearchBox && (
              <div className={styles.searchBox}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  readOnly
                  onClick={onSearch}
                />
                <button className={styles.searchBtn} onClick={onSearch}>
                  <SearchOutline />
                  <span>搜索</span>
                </button>
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
}
