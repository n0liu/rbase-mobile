'use client';

import { useRef } from 'react';
import { SearchOutline, CloseCircleFill } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { SearchBarProps } from './types';

export default function SearchBar({
  placeholder = '搜索文章、人物...',
  value,
  onChange,
  onSearch,
  onCancel,
  showCancel = true,
  autoFocus = true,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
      // 隐藏键盘
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputWrapper}>
        <SearchOutline className={styles.searchIcon} />
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus={autoFocus}
          enterKeyHint="search"
        />
        {value && (
          <CloseCircleFill
            className={styles.clearIcon}
            onClick={handleClear}
          />
        )}
      </div>
      {showCancel && (
        <button className={styles.cancelBtn} onClick={onCancel}>
          取消
        </button>
      )}
    </div>
  );
}
