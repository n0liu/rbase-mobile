'use client';

import { TabBarProps } from './types';
import styles from './index.module.css';

export default function TabBar({ items, activeKey, onChange, extra }: TabBarProps) {
  const formatCount = (count: number) => {
    return count >= 999 ? '999+' : count.toString();
  };

  return (
    <div className={styles.tabBar}>
      <div className={styles.tabs}>
        {items.map((item) => (
          <div
            key={item.key}
            className={`${styles.tab} ${activeKey === item.key ? styles.tabActive : ''}`}
            onClick={() => onChange(item.key)}
          >
            {item.label}
            {item.count !== undefined && ` (${formatCount(item.count)})`}
          </div>
        ))}
      </div>
      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  );
}
