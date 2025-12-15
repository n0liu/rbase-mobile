'use client';

import { SearchOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { CoverBannerProps } from './types';

export default function CoverBanner({
  title,
  subtitle,
  showSearchBox = true,
  searchPlaceholder = '输入益生菌/益生元名称检索',
  onSearch,
}: CoverBannerProps) {
  return (
    <div className={styles.coverSection}>
      {/* 装饰性细菌图案 */}
      <div className={styles.decorationPattern}></div>

      {/* 内容 */}
      <div className={styles.coverContent}>
        <div className={styles.coverText}>
          <h1 className={styles.coverTitle}>
            全球益生菌/益生元<br />循证数据库
          </h1>
          {subtitle && (
            <p className={styles.coverSubtitle}>
              The Global Evidence-based Database for<br />
              <strong>Health Outcomes</strong> of <strong>Pro</strong>/<strong>PrE</strong>biotics
            </p>
          )}
        </div>

        {/* 搜索框 */}
        {showSearchBox && (
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
        )}
      </div>
    </div>
  );
}
