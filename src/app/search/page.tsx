'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';
import SearchBar from '@/components/SearchBar';
import PersonCard from '@/components/PersonCard';
import { Person } from '@/components/PersonCard/types';
import ArticleListItem from '@/components/list/ArticleListItem';
import { Article } from '@/components/list/ArticleListItem/types';
import styles from './page.module.css';

export default function SearchPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(['益生菌', '肠道菌群']);
  const [hotSearchesVisible, setHotSearchesVisible] = useState(true);

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

  const handleSearch = () => {
    if (searchValue.trim()) {
      // 添加到最近搜索
      const newRecent = [searchValue, ...recentSearches.filter(s => s !== searchValue)].slice(0, 10);
      setRecentSearches(newRecent);
      // 实际项目中这里应该调用 API 进行搜索
      console.log('搜索:', searchValue);
    }
  };

  const handleClickTag = (keyword: string) => {
    setSearchValue(keyword);
    // 自动执行搜索
    const newRecent = [keyword, ...recentSearches.filter(s => s !== keyword)].slice(0, 10);
    setRecentSearches(newRecent);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const allResults = [...peopleResults, ...articleResults];
  const displayPeople = activeTab === 'all' || activeTab === 'people' ? peopleResults : [];
  const displayArticles = activeTab === 'all' || activeTab === 'articles' ? articleResults : [];

  return (
    <div className={styles.container}>
      <div className={styles.searchBarFixed}>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          onCancel={handleCancel}
          showCancel={true}
          autoFocus={true}
        />
      </div>

      <div className={styles.content}>
        {searchValue && (
          <>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className={styles.tabs}
            >
              <Tabs.Tab title={`全部 (${allResults.length})`} key="all" />
              <Tabs.Tab title={`文章 (${articleResults.length})`} key="articles" />
              <Tabs.Tab title={`人物 (${peopleResults.length})`} key="people" />
            </Tabs>

          <div className={styles.results}>
            {/* 人物结果 */}
            {displayPeople.length > 0 && (
              <div className={styles.section}>
                {activeTab === 'all' && (
                  <h3 className={styles.sectionTitle}>人物</h3>
                )}
                {displayPeople.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onClick={() => console.log('查看人物:', person.name)}
                  />
                ))}
              </div>
            )}

            {/* 文章结果 */}
            {displayArticles.length > 0 && (
              <div className={styles.section}>
                {activeTab === 'all' && (
                  <h3 className={styles.sectionTitle}>文章</h3>
                )}
                {displayArticles.map((article) => (
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
    </div>
  );
}
