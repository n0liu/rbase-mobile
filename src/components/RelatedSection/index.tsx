'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import type { RelatedSectionProps } from './types';

export type { RelatedItem, RelatedSectionProps } from './types';

export default function RelatedSection({
  title,
  items,
  maxDisplay = 3,
  onMoreClick,
  onItemClick,
}: RelatedSectionProps) {
  const displayItems = items.slice(0, maxDisplay);
  const showMore = items.length > maxDisplay;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>{title}</span>
        {showMore && (
          <span className={styles.sectionMore} onClick={onMoreClick}>
            更多
          </span>
        )}
      </div>
      <div className={styles.grid}>
        {displayItems.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => onItemClick?.(item, index)}
          >
            <div className={styles.iconBox}>
              <Image
                src={item.logo}
                alt={item.name}
                fill
                className={styles.logo}
              />
            </div>
            <span className={styles.label}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
