'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteOutline, DownOutline, UpOutline } from 'antd-mobile-icons';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import PersonCard from '@/components/PersonCard';
import { Person } from '@/components/PersonCard/types';
import ArticleListItem from '@/components/list/ArticleListItem';
import { Article } from '@/components/list/ArticleListItem/types';
import FilterDrawer from '@/components/drawers/FilterDrawer';
import styles from './page.module.css';

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['益生菌', '肠道菌群']);
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

  // 模拟搜索结果数据 - 人物
  const peopleResults: Person[] = [
    {
      id: 1,
      name: '张和平',
      avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png',
      title: '教授、博士生导师',
      organization: '江南大学食品学院',
      researchArea: '益生菌、肠道微生态',
      articleCount: 156,
    },
    {
      id: 2,
      name: '陈卫',
      avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png',
      title: '中国工程院院士',
      organization: '江南大学',
      researchArea: '食品微生物学、益生菌',
      articleCount: 203,
    },
    {
      id: 3,
      name: 'Jun-Yao Xu',
      avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png',
      title: '副研究员',
      organization: 'Stanford University',
      researchArea: '肠道菌群、代谢组学',
      articleCount: 45,
    },
  ];

  // 模拟搜索结果数据 - 文章
  const articleResults: Article[] = [
    {
      id: 1,
      day: '15',
      month: '10',
      journal: 'Gut Microbes',
      impactFactor: '12.2',
      titleCn: 'Bifidobacterium longum BB536 对改善老年人肠道健康和免疫功能的随机对照试验',
      titleEn: 'A Randomized, Controlled Trial of Bifidobacterium longum BB536 for Improving Gut Health and Immune Function in the Elderly',
      type: 'Article',
      date: '2025-10-15',
      doi: '10.1080/19490976.2025.2345678',
      authors: [
        { name: 'Jun-Yao Xu', isCorresponding: false },
        { name: '陈欢', isCorresponding: false },
        { name: '张和平', isCorresponding: true },
      ],
      keywords: ['益生菌', '长双歧杆菌BB536', '肠道健康'],
    },
    {
      id: 2,
      day: '08',
      month: '10',
      journal: 'Microbiome',
      impactFactor: '16.6',
      titleCn: '菊粉型益生元对调节肥胖个体肠道菌群结构和代谢产物的宏基因组学研究',
      titleEn: 'Metagenomic analysis reveals the effects of inulin-type prebiotics on gut microbial structure and metabolites',
      type: 'Article',
      date: '2025-10-08',
      doi: '10.1186/s40168-025-01234-5',
      authors: [
        { name: '汪芳宏', isCorresponding: false },
        { name: '陈卫', isCorresponding: true },
      ],
      keywords: ['益生元', '菊粉', '肠道菌群'],
    },
  ];

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
      const response = await fetch(`https://rai-api.chinagut.cn/api/f/search/suggest?q=${encodeURIComponent(keyword)}`);
      const data = await response.json();
      console.log(data, "data")
      setSuggestions(data.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('获取搜索建议失败:', error);
      setSuggestions([]);
    }
  };

  // 监听搜索值变化，使用防抖
  useEffect(() => {
    // 如果标记为跳过，则不获取建议
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
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
  }, [searchValue]);

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

  const handleSearch = () => {
    if (searchValue.trim()) {
      // 添加到最近搜索
      const newRecent = [searchValue, ...recentSearches.filter(s => s !== searchValue)].slice(0, 10);
      setRecentSearches(newRecent);
      // 隐藏建议列表
      setShowSuggestions(false);
      // 标记为已搜索
      setHasSearched(true);
      // 实际项目中这里应该调用 API 进行搜索
      console.log('搜索:', searchValue);
    }
  };

  const handleClickSuggestion = (suggestion: string) => {
    // 标记跳过下一次建议获取
    skipFetchRef.current = true;
    setSearchValue(suggestion);
    setShowSuggestions(false);
    // 标记为已搜索
    setHasSearched(true);
    // 添加到最近搜索
    const newRecent = [suggestion, ...recentSearches.filter(s => s !== suggestion)].slice(0, 10);
    setRecentSearches(newRecent);
    // 实际项目中这里应该调用 API 进行搜索
    console.log('搜索:', suggestion);
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
    setHasSearched(true);
    // 自动执行搜索
    const newRecent = [keyword, ...recentSearches.filter(s => s !== keyword)].slice(0, 10);
    setRecentSearches(newRecent);
    // 实际项目中这里应该调用 API 进行搜索
    console.log('搜索:', keyword);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
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

  const allResults = [...peopleResults, ...articleResults];

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
              <span className={styles.resultCount}>找到{allResults.length}条结果</span>
              <div className={styles.sortActions}>
                <span
                  className={styles.filterBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterDrawerVisible(!filterDrawerVisible);
                  }}
                >
                  筛选
                  {filterDrawerVisible ? <UpOutline className={styles.downIcon} /> : <DownOutline className={styles.downIcon} />}
                </span>
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
            {/* 人物结果 */}
            {peopleResults.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>人物</h3>
                {peopleResults.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onClick={() => console.log('查看人物:', person.name)}
                  />
                ))}
              </div>
            )}

            {/* 文章结果 */}
            {articleResults.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>文章</h3>
                {articleResults.map((article) => (
                  <ArticleListItem
                    key={article.id}
                    article={article}
                    showMoreIcon={true}
                    onClick={() => console.log('查看文章:', article.titleCn)}
                    onMoreClick={() => console.log('更多操作:', article.titleCn)}
                  />
                ))}
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
