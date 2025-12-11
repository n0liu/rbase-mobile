'use client';

import { FloatingBubble } from 'antd-mobile';
import styles from './index.module.css';

interface FloatingButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function FloatingButton({ onClick, children }: FloatingButtonProps) {
  return (
    <FloatingBubble
      axis="xy"
      magnetic="x"
      className={styles.floatingButton}
      onClick={onClick}
    >
      {children}
    </FloatingBubble>
  );
}
