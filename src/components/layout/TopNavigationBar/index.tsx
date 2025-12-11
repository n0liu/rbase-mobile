'use client';

import Image from 'next/image';
import styles from './index.module.scss';
import { TopNavigationBarProps } from './types';

export default function TopNavigationBar({
  leftIcon,
  onLeftIconClick,
  onSearchClick,
  onListClick,
  showListIcon = true,
  showSearchIcon = true,
}: TopNavigationBarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.topLeft}>
        {leftIcon && (
          <div className={styles.leftIcon} onClick={onLeftIconClick}>
            {leftIcon}
          </div>
        )}
        <Image
          src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/logo2.png"
          alt="Rbase Logo"
          width={120}
          height={40}
          className={styles.logo}
        />
      </div>
      <div className={styles.topRight}>
        {showSearchIcon && (
          <Image
            src="/icons/search.svg"
            alt="search"
            width={22}
            height={22}
            className={styles.topIcon}
            onClick={onSearchClick}
          />
        )}
        {showListIcon && (
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={22}
            height={22}
            className={styles.topIcon}
            onClick={onListClick}
          />
        )}
      </div>
    </div>
  );
}
