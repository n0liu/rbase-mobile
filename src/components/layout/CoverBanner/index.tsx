'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { CoverBannerProps } from './types';

export default function CoverBanner({
  imageUrl,
  title,
  subtitle,
  showFollowBtn = true,
  followBtnText = '+关注',
  onFollow,
  height = '200px',
  onClick
}: CoverBannerProps) {
  return (
    <div
      className={styles.coverSection}
      style={{ height }}
      onClick={onClick}
    >
      {/* 封面图片 */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className={styles.coverImage}
        style={{ objectFit: 'cover' }}
      />

      {/* 渐变遮罩层 + 内容 */}
      <div className={styles.coverOverlay}>
        <div className={styles.coverText}>
          <h2 className={styles.coverTitle}>{title}</h2>
          {subtitle && <p className={styles.coverSubtitle}>{subtitle}</p>}
        </div>

        {/* 关注按钮 */}
        {showFollowBtn && (
          <button
            className={styles.followBtn}
            onClick={(e) => {
              e.stopPropagation();
              onFollow?.();
            }}
          >
            {followBtnText}
          </button>
        )}
      </div>
    </div>
  );
}
