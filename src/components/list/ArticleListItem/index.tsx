'use client';

import { useState, useRef, useEffect } from 'react';
import { Tag } from 'antd-mobile';
import { MoreOutline, DownOutline, UpOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { ArticleListItemProps } from './types';

export default function ArticleListItem({
  article,
  showMoreIcon = true,
  onClick,
  onMoreClick
}: ArticleListItemProps) {
  const [keywordsExpanded, setKeywordsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const keywordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (keywordsRef.current) {
        const element = keywordsRef.current;
        // 检查内容高度是否超过容器高度（1行），增加5px容差
        setHasOverflow(element.scrollHeight > element.clientHeight + 5);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [article.keywords]);
  return (
    <div className={styles.articleItem} onClick={onClick}>
      {/* 左侧日期 */}
      <div className={styles.articleDate}>
        <span className={styles.articleDay}>{article.day}</span>
        <span className={styles.articleMonth}>{article.month}</span>
      </div>

      {/* 右侧内容 */}
      <div className={styles.articleMain}>
        {/* 文章头部：类型、期刊、影响因子、更多 */}
        <div className={styles.articleHeader}>
          {article.type && (
            <>
              <span
                className={`${styles.articleType} ${
                  article.type === 'Review'
                    ? styles.typeReview
                    : article.type === 'Commentary'
                    ? styles.typeCommentary
                    : ''
                }`}
              >
                {article.type}
              </span>
              <span className={styles.headerSeparator}>›</span>
            </>
          )}
          <span className={styles.articleJournal}>{article.journal}</span>
          <span className={styles.articleIF}>[IF:{article.impactFactor}]</span>
          {showMoreIcon && (
            <div
              className={styles.articleMore}
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick?.();
              }}
            >
              <MoreOutline className={styles.moreIcon} />
            </div>
          )}
        </div>

        {/* 中文标题 */}
        <h3 className={styles.articleTitleCn}>{article.titleCn}</h3>

        {/* 英文标题 */}
        <p className={styles.articleTitleEn}>{article.titleEn}</p>

        {/* 作者列表 */}
        <div className={styles.articleAuthors}>
          {article.authors.map((author, idx) => (
            <span key={idx} className={styles.authorItem}>
              {author.name}
              {author.isCorresponding && (
                <svg
                  viewBox="0 0 8 8"
                  fill="none"
                  className={styles.mailIcon}
                >
                  <rect x="1" y="2" width="6" height="4" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M1 2L4 4L7 2" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              )}
              {idx < article.authors.length - 1 && '，'}
            </span>
          ))}
        </div>

        {/* DOI 和日期 */}
        <div className={styles.articleMeta}>
          {article.doi && <span className={styles.doiText}>DOI: {article.doi}</span>}
          <span className={styles.dateText}>{article.date}</span>
        </div>

        {/* 底部：关键词 */}
        <div className={styles.keywordsWrapper}>
          <div
            ref={keywordsRef}
            className={`${styles.articleKeywords} ${keywordsExpanded ? styles.expanded : ''}`}
          >
            {article.keywords.map((kw, idx) => (
              <Tag key={idx} color="primary" fill="outline" className={styles.keywordTag}>
                {kw}
              </Tag>
            ))}
          </div>
          {hasOverflow && (
            <span
              className={styles.expandBtn}
              onClick={(e) => {
                e.stopPropagation();
                setKeywordsExpanded(!keywordsExpanded);
              }}
            >
              {keywordsExpanded ? <UpOutline /> : <DownOutline />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
