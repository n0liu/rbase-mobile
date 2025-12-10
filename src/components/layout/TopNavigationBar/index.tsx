'use client';

import { Tag } from 'antd-mobile';
import { SearchOutline, UnorderedListOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { TopNavigationBarProps } from './types';

export default function TopNavigationBar({
  tag,
  leftIcon,
  onLeftIconClick,
  onSearchClick,
  onListClick,
  userAvatar = 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png',
  onUserClick,
  showListIcon = false,
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
        <span className={styles.logoR}>R</span>
        <span className={styles.logoDot}>•</span>
        <span className={styles.logoText}>base</span>
        <Tag className={styles.docTag}>{tag}</Tag>
      </div>
      <div className={styles.topRight}>
        {showListIcon && (
          <UnorderedListOutline
            className={styles.topIcon}
            onClick={onListClick}
          />
        )}
        {showSearchIcon && (
          <SearchOutline
            className={styles.topIcon}
            onClick={onSearchClick}
          />
        )}
        <img
          src={userAvatar}
          alt="用户头像"
          className={styles.userAvatar}
          onClick={onUserClick}
        />
      </div>
    </div>
  );
}
