'use client';

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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
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
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus={autoFocus}
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
