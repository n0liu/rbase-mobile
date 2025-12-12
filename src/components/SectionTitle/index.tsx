'use client';

import { ReactNode } from 'react';
import styles from './index.module.css';

interface SectionTitleProps {
  children: ReactNode;
  extra?: ReactNode;
  className?: string;
}

export default function SectionTitle({ children, extra, className }: SectionTitleProps) {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <span className={styles.title}>{children}</span>
      {extra && <div className={styles.extra}>{extra}</div>}
    </div>
  );
}
