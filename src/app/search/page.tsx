'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteOutline, DownOutline, UpOutline, FilterOutline } from 'antd-mobile-icons';
import { SpinLoading } from 'antd-mobile';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import PersonCard from '@/components/PersonCard';
import ArticleListItem from '@/components/list/ArticleListItem';
import FilterDrawer from '@/components/drawers/FilterDrawer';
import styles from './page.module.css';

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [hotSearchesVisible, setHotSearchesVisible] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 是否已执行搜索
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const skipFetchRef = useRef(false); // 标记是否跳过获取建议
  const [sortMenuVisible, setSortMenuVisible] = useState(false); // 排序菜单是否显示
  const [sortType, setSortType] = useState('relevance'); // 当前排序类型
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false); // 筛选抽屉是否显示
  const [activeFilterMenu, setActiveFilterMenu] = useState('影响因子');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    '影响因子': [],
    '类型': [],
    '作者': [],
    '发表时间': [],
    '关键词': [],
  });
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 从 localStorage 加载最近搜索
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed);
        }
      } catch (error) {
        console.error('加载最近搜索失败:', error);
      }
    }
  }, []);

  // 热门搜索数据，部分标记为热门
  const hotSearches = [
    { keyword: '益生菌', isHot: true },
    { keyword: '肠道菌群', isHot: false },
    { keyword: '免疫', isHot: false },
    { keyword: 'LGG', isHot: true },
    { keyword: '双歧杆菌', isHot: false },
    { keyword: '代谢', isHot: false },
    { keyword: '炎症', isHot: true },
  ];


  // 更新最近搜索并保存到 localStorage
  const updateRecentSearches = (keyword: string) => {
    const newRecent = [keyword, ...recentSearches.filter(s => s !== keyword)].slice(0, 10);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const handleCancel = () => {
    router.back();
  };

  // 获取搜索建议
  const fetchSuggestions = async (keyword: string) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      // 使用本地 API 代理路由，避免 CORS 问题
      const response = await fetch(`/api/search/suggest?q=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      console.log(data, "data")
      const suggestionsList = data.data || [];
      setSuggestions(suggestionsList);
      // 只有当有建议数据时才显示建议列表
      setShowSuggestions(suggestionsList.length > 0);
    } catch (error) {
      console.error('获取搜索建议失败:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 监听搜索值变化，使用防抖
  useEffect(() => {
    // 如果标记为跳过，则不获取建议
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }

    // 如果已经执行过搜索或正在搜索，不获取建议
    if (hasSearched || isSearching) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(searchValue);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchValue, hasSearched, isSearching]);

  // 阻止排序菜单打开时的滚动
  useEffect(() => {
    if (sortMenuVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [sortMenuVisible]);

  // 执行搜索
  const performSearch = async (keyword: string) => {
    if (!keyword.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search/simple?q=${encodeURIComponent(keyword)}`);
      const data = await response.json();

      if (data.code === 200 && data.data?.searchResults) {
        // 合并文章结果和作者结果
        const allItems = data.data.searchResults.all?.items || [];
        const authorItems = data.data.searchResults.z?.items || [];

        // 将作者结果放在前面
        setSearchResults([...authorItems, ...allItems]);
        setHasSearched(true);
      }
    } catch (error) {
      console.error('搜索失败:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      // 添加到最近搜索
      updateRecentSearches(searchValue);
      // 隐藏建议列表
      setShowSuggestions(false);
      // 执行搜索
      performSearch(searchValue);
    }
  };

  const handleClickSuggestion = (suggestion: string) => {
    // 标记跳过下一次建议获取
    skipFetchRef.current = true;
    setSearchValue(suggestion);
    setShowSuggestions(false);
    // 添加到最近搜索
    updateRecentSearches(suggestion);
    // 设置已搜索状态，这样可以立即显示加载区域
    setHasSearched(true);
    // 执行搜索
    performSearch(suggestion);
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    // 重置搜索状态
    setHasSearched(false);
  };

  // 高亮匹配文本
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={index} className={styles.highlight}>{part}</span>
        : part
    );
  };

  const handleClickTag = (keyword: string) => {
    // 标记跳过下一次建议获取
    skipFetchRef.current = true;
    setSearchValue(keyword);
    // 隐藏建议列表
    setShowSuggestions(false);
    // 添加到最近搜索
    updateRecentSearches(keyword);
    // 设置已搜索状态，这样可以立即显示加载区域
    setHasSearched(true);
    // 执行搜索
    performSearch(keyword);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // 解码 HTML 实体
  const decodeHTMLEntities = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // 解析含有 <em> 标签的文本，返回 React 元素
  const parseHighlightedText = (text: string) => {
    if (!text) return text;

    // 先解码 HTML 实体（除了 <em> 标签）
    const decodedText = decodeHTMLEntities(text);

    const parts = [];
    let lastIndex = 0;
    const regex = /<em>(.*?)<\/em>/g;
    let match;
    let key = 0;

    while ((match = regex.exec(decodedText)) !== null) {
      // 添加普通文本
      if (match.index > lastIndex) {
        parts.push(decodedText.substring(lastIndex, match.index));
      }
      // 添加高亮文本
      parts.push(
        <span key={key++} style={{ color: 'var(--rbase-color-danger)' }}>
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }

    // 添加剩余的普通文本
    if (lastIndex < decodedText.length) {
      parts.push(decodedText.substring(lastIndex));
    }

    return parts.length > 0 ? parts : decodedText;
  };

  // 渲染搜索结果项
  const renderSearchResultItem = (item: any, index: number) => {
    // 根据 asso_model 判断类型
    if (item.asso_model === 'Zhikus') {
      // 专家类型
      return (
        <div key={`person-${item.id || index}`}>
          <PersonCard
            person={{
              id: item.id,
              name: item.name,
              avatar: item.image || 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png',
              title: item.titleList?.[0] || item.title || '',
              researchArea: '',
            }}
            onClick={() => {
              if (item.defaultUrl) {
                window.location.href = `https://www.mr-gut.cn${item.defaultUrl}`;
              }
            }}
            renderName={(name) => parseHighlightedText(name)}
            renderTitle={(title) => parseHighlightedText(title)}
          />
        </div>
      );
    } else {
      // 文章/论文类型 (Papers 或 MrgutArticles)
      const date = item.time || '';
      const [, month, day] = date.split('-');

      return (
        <div key={`article-${item.id || item.uuid || index}`}>
          <ArticleListItem
            article={{
              id: item.id,
              day: day || '01',
              month: month || '01',
              journal: item.periodical || item.typeStr || '',
              impactFactor: item.impact_factor || '0',
              titleCn: item.title,
              titleEn: '',
              type: item.type || 'Article',
              date: date,
              doi: '',
              authors: item.author ? [{
                name: item.author,
                isCorresponding: false
              }] : [],
              keywords: [],
            }}
            onClick={() => {
              if (item.defaultUrl) {
                window.location.href = `https://www.mr-gut.cn${item.defaultUrl}`;
              }
            }}
            renderTitle={(title) => parseHighlightedText(title)}
            renderAuthorName={(name) => parseHighlightedText(name)}
          />
        </div>
      );
    }
  };

  // 筛选菜单
  const filterMenus = ['影响因子', '类型', '作者', '发表时间', '关键词'];

  // 筛选数据
  const filterData: Record<string, { title: string; tags: string[] }[]> = {
    '影响因子': [
      { title: '影响因子', tags: ['0~10', '10~20', '40~50', '30~40', '50~300', '20~30'] },
    ],
    '类型': [
      { title: '类型', tags: ['智库专家动态', '榜单', 'Article', '活动资讯', '研究院动态', '肠道演讲', '热心肠先生原创', 'Review', '中国肠道大会新闻', 'Other', '智库新闻', '其他'] },
    ],
    '作者': [
      { title: '作者', tags: ['热心肠小伙伴们', 'Changtao Jiang', 'Kai Wang', 'Lulu Sun', 'Qing Wu', 'Yanli Pang', 'Chuyu Yun', 'Qixing Nie', 'Xi Luo', 'Xuemei Wang', 'Chuan Ye', 'Yingying Zhuo', 'Yong Ding', '热心肠先生', 'Huiying Liu', 'Jia Liu', 'Jialin Xia', 'Jun Lin', 'Meng Li', 'Yi Zhang'] },
    ],
    '发表时间': [
      { title: '发表时间', tags: ['2024', '2019', '2025', '2023', '2021', '2020', '2022', '2018', '1970'] },
    ],
    '关键词': [
      { title: '关键词', tags: ['肠道菌群', '胆汁酸', 'FXR', 'Gut microbiota', 'bile acid', 'obesity', '神经酰胺', '糖尿病', '肥胖', '胆汁酸代谢'] },
    ],
  };

  // 排序选项
  const sortOptions = [
    { key: 'relevance', label: '相关性排序' },
    { key: 'impact', label: '影响因子  ↓' },
    { key: 'time', label: '发表时间  ↓' },
  ];

  const handleSortChange = (key: string) => {
    setSortType(key);
    setSortMenuVisible(false);
  };

  const getSortLabel = () => {
    const option = sortOptions.find(opt => opt.key === sortType);
    return option ? option.label : '相关性排序';
  };

  // 处理筛选标签点击（每个筛选项内只能选一个）
  const handleFilterTagClick = (menu: string, tag: string) => {
    setSelectedFilters(prev => {
      const currentSelected = prev[menu] || [];
      const isSelected = currentSelected.includes(tag);

      return {
        ...prev,
        [menu]: isSelected ? [] : [tag]  // 如果已选中则取消选择，否则只选中这一个
      };
    });
  };

  // 滚动到抽屉的指定section
  const scrollToDrawerSection = (menu: string) => {
    setActiveFilterMenu(menu);
    const sectionId = `drawer-section-${menu}`;
    const element = document.getElementById(sectionId);
    if (element && drawerContentRef.current) {
      const container = drawerContentRef.current;
      const offsetTop = element.offsetTop - container.offsetTop;
      container.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarFixed}>
        <SearchBar
          value={searchValue}
          onChange={handleSearchValueChange}
          onSearch={handleSearch}
          onCancel={handleCancel}
          showCancel={true}
          autoFocus={true}
        />
      </div>

      {/* 搜索建议列表 */}
      {showSuggestions && (
        <div className={styles.suggestions}>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={styles.suggestionItem}
                onClick={() => handleClickSuggestion(suggestion)}
              >
                {highlightText(suggestion, searchValue)}
              </div>
            ))
          ) : (
            <div className={styles.emptySuggestions}>
              <div className={styles.emptyIcon}>
                <Image
                  src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/none.png"
                  alt="无结果"
                  width={200}
                  height={200}
                  className={styles.emptyImage}
                />
              </div>
              <div className={styles.emptyText}>未找到相关建议</div>
            </div>
          )}
        </div>
      )}

      <div className={styles.content} onClick={() => setShowSuggestions(false)}>
        {searchValue && hasSearched && (
          <>
            {/* 搜索结果统计和排序栏 */}
            <div className={styles.resultHeader}>
              <span className={styles.resultCount}>找到{searchResults.length}条结果</span>
              <div className={styles.sortActions}>
                <span
                  className={styles.sortBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortMenuVisible(!sortMenuVisible);
                  }}
                >
                  {getSortLabel()}
                  {sortMenuVisible ? <UpOutline className={styles.downIcon} /> : <DownOutline className={styles.downIcon} />}
                </span>
                <span
                  className={styles.filterBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterDrawerVisible(!filterDrawerVisible);
                  }}
                >
                  <FilterOutline className={styles.filterIcon} />
                </span>
              </div>
            </div>

            {/* 排序菜单 */}
            {sortMenuVisible && (
              <>
                <div className={styles.sortMenuMask} onClick={() => setSortMenuVisible(false)} />
                <div className={styles.sortMenu}>
                  {sortOptions.map((option) => (
                    <div
                      key={option.key}
                      className={`${styles.sortMenuItem} ${sortType === option.key ? styles.sortMenuItemActive : ''}`}
                      onClick={() => handleSortChange(option.key)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </>
            )}

          <div className={styles.results}>
            {isSearching ? (
              <div className={styles.loading}>
                <SpinLoading color="primary" />
                <span className={styles.loadingText}>搜索中...</span>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((item, index) => renderSearchResultItem(item, index))
            ) : (
              <div className={styles.emptyResults}>
                <div className={styles.emptyIcon}>
                  <Image
                    src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/none.png"
                    alt="无结果"
                    width={200}
                    height={200}
                    className={styles.emptyImage}
                  />
                </div>
                <div className={styles.emptyText}>未找到相关结果</div>
              </div>
            )}
            </div>
          </>
        )}

        {!searchValue && (
          <div className={styles.emptyState}>
          {/* 最近搜索 */}
          {recentSearches.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>最近搜索</h3>
                <DeleteOutline
                  className={styles.deleteIcon}
                  onClick={clearRecentSearches}
                />
              </div>
              <div className={styles.tags}>
                {recentSearches.map((keyword) => (
                  <span
                    key={keyword}
                    className={styles.recentTag}
                    onClick={() => handleClickTag(keyword)}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 热门搜索 */}
          {hotSearchesVisible ? (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>热门搜索</h3>
                <span
                  className={styles.hideBtn}
                  onClick={() => setHotSearchesVisible(false)}
                >
                  隐藏
                </span>
              </div>
              <div className={styles.tags}>
                {hotSearches.map((item) => (
                  <span
                    key={item.keyword}
                    className={`${styles.hotTag} ${item.isHot ? styles.hotTagHighlight : ''}`}
                    onClick={() => handleClickTag(item.keyword)}
                  >
                    {item.keyword}
                  </span>
                ))}
              </div>
            </div>
            ) : (
            <div className={styles.showHotSearchBtn} onClick={() => setHotSearchesVisible(true)}>
              显示热门搜索
            </div>
            )}
        </div>
        )}
      </div>

      {/* 筛选抽屉 */}
      <FilterDrawer
        visible={filterDrawerVisible}
        onClose={() => setFilterDrawerVisible(false)}
        title="筛选"
        menus={filterMenus}
        activeMenu={activeFilterMenu}
        onMenuChange={scrollToDrawerSection}
        contentRef={drawerContentRef}
      >
        {filterMenus.map((menu) => (
          <div key={menu} id={`drawer-section-${menu}`} className={styles.drawerCategorySection}>
            <div className={styles.drawerCategoryTitle}>{menu}</div>
            {filterData[menu].map((section, idx) => {
              const maxLen = Math.max(...section.tags.map(tag => tag.length));
              const cols = maxLen <= 6 ? 3 : 2;
              return (
                <div key={idx} className={styles.drawerSection}>
                  <div
                    className={styles.drawerTagList}
                    style={{ '--tag-cols': cols } as React.CSSProperties}
                  >
                    {section.tags.map((tag, tagIdx) => {
                      const isSelected = selectedFilters[menu]?.includes(tag);
                      return (
                        <span
                          key={tagIdx}
                          className={`${styles.drawerTagItem} ${isSelected ? styles.drawerTagItemSelected : ''}`}
                          onClick={() => handleFilterTagClick(menu, tag)}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </FilterDrawer>
    </div>
  );
}
