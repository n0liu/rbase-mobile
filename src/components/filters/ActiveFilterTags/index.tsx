'use client';

import { Tag } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { ActiveFilterTagsProps } from './types';

export default function ActiveFilterTags({
  label,
  filters,
  onRemove,
  showBreadcrumb = false,
  breadcrumbPath = []
}: ActiveFilterTagsProps) {
  if (filters.length === 0 && !showBreadcrumb) {
    return null;
  }

  return (
    <div className={styles.filterTags}>
      {/* 面包屑或标签前缀 */}
      {showBreadcrumb && breadcrumbPath.length > 0 ? (
        <div className={styles.breadcrumb}>
          {label && `${label} > `}
          {breadcrumbPath.join(' > ')}
        </div>
      ) : (
        label && <div className={styles.label}>{label}</div>
      )}

      {/* 激活的筛选标签 */}
      {filters.length > 0 && (
        <div className={styles.activeFilters}>
          {filters.map((filter, idx) => (
            <Tag
              key={idx}
              color="primary"
              className={styles.filterTag}
              onClick={() => onRemove(filter)}
            >
              {filter}
              <CloseOutline className={styles.closeIcon} />
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}
