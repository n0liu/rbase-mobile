import React, { useEffect, useState } from 'react';
import styles from './BackToTop.module.css';
import { UpOutline } from 'antd-mobile-icons';

interface BackToTopProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  threshold?: number;
  position?: 'default' | 'high'; // default=80px, high=140px
}

export default function BackToTop({
  scrollContainerRef,
  threshold = 300,
  position = 'default'
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, threshold]);

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const positionClass = position === 'high' ? styles.positionHigh : '';

  return (
    <div
      className={`${styles.backTopBtn} ${visible ? styles.backTopBtnVisible : ''} ${positionClass}`}
      onClick={scrollToTop}
    >
      <UpOutline className={styles.icon} />
    </div>
  );
}
