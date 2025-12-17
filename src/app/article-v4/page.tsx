'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Popup } from 'antd-mobile';
import Image from 'next/image';
import { FilterOutline } from 'antd-mobile-icons';
import TopNavigationBar from '@/components/layout/TopNavigationBar';
import CoverBanner from '@/components/layout/CoverBanner';
import CategoryGrid from '@/components/CategoryGrid';
import { CategoryItem } from '@/components/CategoryGrid/types';
import TabBar from '@/components/TabBar';
import { TabItem } from '@/components/TabBar/types';
import ActiveFilterTags from '@/components/ActiveFilterTags';
import TreeView from '@/components/list/TreeView';
import { TreeNode } from '@/components/list/TreeView/types';
import ArticleListItem from '@/components/list/ArticleListItem';
import { Article } from '@/components/list/ArticleListItem/types';
import FilterDrawer from '@/components/drawers/FilterDrawer';
import styles from './page.module.css';
import BackToTop from '@/components/BackToTop';

export default function ArticleV4Page() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const [leftPanelVisible, setLeftPanelVisible] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [activeFilterMenu, setActiveFilterMenu] = useState('发表时间');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['学术头衔']));
  const [selectedPath, setSelectedPath] = useState<string[]>(['学术头衔']);
  const [selectedNode, setSelectedNode] = useState<string>('学术头衔');

  // 切换节点展开/收起
  const toggleNode = (nodeName: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeName)) {
      newExpanded.delete(nodeName);
    } else {
      newExpanded.add(nodeName);
    }
    setExpandedNodes(newExpanded);
  };

  // 树状数据结构 - 学术头衔
  const categoryTree: TreeNode[] = [
    {
      name: '学术头衔',
      count: 8,
      children: [
        { name: '欧洲科学院院士', count: 1 },
        { name: '香港科学院院士', count: 1 },
        { name: '香港中文大学终身教授', count: 1 },
        { name: '香港中文大学医学院助理院长', count: 1 },
        { name: '香港中文大学消化疾病研究所所长', count: 1 },
        { name: '香港中文大学消化疾病研究实验室主任', count: 1 },
      ]
    }
  ];

  // 构建节点路径
  const buildNodePath = (targetName: string, nodes: TreeNode[], currentPath: string[] = []): string[] | null => {
    for (const node of nodes) {
      const newPath = [...currentPath, node.name];
      if (node.name === targetName) {
        return newPath;
      }
      if (node.children) {
        const found = buildNodePath(targetName, node.children, newPath);
        if (found) return found;
      }
    }
    return null;
  };

  // 处理节点点击
  const handleNodeClick = (node: TreeNode) => {
    setSelectedNode(node.name);
    const path = buildNodePath(node.name, categoryTree);
    if (path) {
      setSelectedPath(path);
    }
  };

  // 滚动到抽屉指定分类
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

  // 人物详情菜单数据（4个）
  const categoryMenus: CategoryItem[] = [
    { id: 'profile', label: '个人简介', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/icons/89.svg?20230511' },
    { id: 'team', label: '团队成员', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/icons/11.svg?20230511' },
    { id: 'scholars', label: '合作学者', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/icons/87.svg?20230511' },
    { id: 'institutions', label: '合作机构', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/icons/5.svg?20230511' },
  ];

  // 筛选菜单配置 - 文献筛选
  const filterMenus = ['发表时间', '文献类型', '期刊分区', '作者角色', '机构'];

  // 筛选数据 - 人物的文献筛选
  const filterData: Record<string, { title: string; tags: string[] }[]> = {
    '发表时间': [
      { title: '发表时间', tags: [
        '近1年 (2)', '近3年 (41)', '近5年 (69)', '2000年以前 (0)'
      ]},
    ],
    '文献类型': [
      { title: '文献类型', tags: [
        'Article (89)', 'Review (15)', 'Other (1)'
      ]},
    ],
    '期刊分区': [
      { title: '期刊分区', tags: [
        'Q1区 (100)', 'Q2区 (14)', '顶刊 (1)', 'CNS (1)'
      ]},
    ],
    '作者角色': [
      { title: '作者角色', tags: [
        '第一作者 (1)', '共同第一作者 (0)', '通讯作者 (67)', '第一作者或通讯作者 (68)', '普通作者 (37)'
      ]},
    ],
    '机构': [
      { title: '机构', tags: [
        '香港中文大学深圳研究院 (8)', '香港中文大学消化疾病研究所 (4)', '香港中文大学 (4)',
        '中国科学院大学 (2)', '香港中文大学赛马会微生物组学研究中心 (2)'
      ]},
    ],
  };

  // 文献列表数据
  const [activeListTab, setActiveListTab] = useState<'literature' | 'patent'>('literature');

  const listTabs: TabItem[] = [
    { key: 'literature', label: '文献', count: 105 },
    { key: 'patent', label: '专利', count: 0 },
  ];

  const articleList: Article[] = [
    {
      id: 1,
      day: '25',
      month: '09',
      journal: 'Cell Metabolism',
      impactFactor: '30.9',
      titleCn: 'Catenibacterium mitsuokai通过结合肝细胞并产生生喹啉酸促进肝细胞癌发生',
      titleEn: 'Catenibacterium mitsuokai promotes hepatocellular carcinogenesis by binding to hepatocytes and generating quinolinic acid',
      type: 'Article',
      date: '2025-09-25',
      doi: '10.1016/j.cmet.2025.09.001',
      authors: [
        { name: 'Ying Zhang', isCorresponding: false },
        { name: 'Ming Kuang', isCorresponding: true },
        { name: '于君', isCorresponding: true },
      ],
      keywords: ['Cell Metabolism'],
    },
    {
      id: 2,
      day: '02',
      month: '01',
      journal: 'Nature Microbiology',
      impactFactor: '19.4',
      titleCn: '于君团队Nature子刊：肺炎克雷伯菌由肠入肝促肝癌',
      titleEn: 'Gut-liver translocation of pathogenic Klebsiella pneumoniae promotes hepatocellular carcinoma in mice',
      type: 'Article',
      date: '2025-01-02',
      doi: '10.1038/s41564-024-01895-x',
      authors: [
        { name: 'Xueliang Wang', isCorresponding: false },
        { name: 'Yi Fang', isCorresponding: false },
        { name: 'Wei Liang', isCorresponding: false },
        { name: 'Yuhong Cai', isCorresponding: true },
        { name: '于君', isCorresponding: true },
      ],
      keywords: ['Nature Microbiology'],
    },
    {
      id: 3,
      day: '12',
      month: '12',
      journal: 'Gut',
      impactFactor: '25.8',
      titleCn: '张翔/于君团队：肝脏TM6SF2激活抗肿瘤免疫力，抑制代谢功能障碍相关脂肪性肝病相关肝癌',
      titleEn: 'Hepatic TM6SF2 activates antitumour immunity to suppress metabolic dysfunction-associated steatotic liver disease-related hepatocellular carcinoma',
      type: 'Article',
      date: '2024-12-12',
      doi: '10.1136/gutjnl-2024-332168',
      authors: [
        { name: 'Yating Zhang', isCorresponding: false },
        { name: '于君', isCorresponding: true },
        { name: '张翔', isCorresponding: true },
      ],
      keywords: ['Gut'],
    },
  ];

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <TopNavigationBar
        onSearchClick={() => router.push('/search')}
        onListClick={() => {}}
      />

      {/* 可滚动内容区 */}
      <div className={styles.scrollArea} ref={scrollRef}>
        <div className={styles.content}>
          {/* 人物封面 */}
          <CoverBanner
            title="于君"
            subtitle="香港中文大学深圳研究院、香港中文大学医学院"
            showSearchBox={false}
            onSearch={() => router.push('/search')}
            backgroundImage="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/banner/banner-19.png"
            avatar="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/articles/240124/c033a2fd39350c68d93d0d5e6815bd7f.png"
            showMoreLink={true}
            onMoreClick={() => {}}
          />

          {/* 分类菜单 */}
          <CategoryGrid
            items={categoryMenus}
            onItemClick={() => setLeftPanelVisible(true)}
            scrollContainerRef={scrollRef}
          />

          {/* 文献列表区域 */}
          <div className={styles.listSection}>
            {/* Tab 栏 */}
            <TabBar
              items={listTabs}
              activeKey={activeListTab}
              onChange={(key) => setActiveListTab(key as 'literature' | 'patent')}
              extra={
                <>
                  <div className={styles.analysisBtn}>
                    <Image src="/icons/refresh-circle.svg" alt="数据分析" width={18} height={18} className={styles.analysisIcon} />
                  </div>
                  <div className={styles.listTabActions}>
                    <div className={styles.sortBtn}>
                      发表时间
                      <Image src="/icons/arrow-down.svg" alt="排序" width={12} height={12} className={styles.sortIcon} />
                    </div>
                    <div className={styles.filterBtn} onClick={() => setFilterPanelVisible(true)}>
                      <FilterOutline className={styles.filterIcon} />
                    </div>
                  </div>
                </>
              }
            />

            {/* 筛选标签 */}
            <ActiveFilterTags
              label="全部分类"
              showBreadcrumb={true}
              breadcrumbPath={selectedPath}
              filters={activeFilters}
              onRemove={(filter) => {
                setActiveFilters(activeFilters.filter(f => f !== filter));
              }}
            />

            {/* 文献卡片列表 */}
            <div className={styles.articleList}>
              {articleList.map((article) => (
                <ArticleListItem
                  key={article.id}
                  article={article}
                  showMoreIcon={true}
                  onClick={() => {}}
                  onMoreClick={() => {}}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 左侧分类树面板 */}
      <Popup
        visible={leftPanelVisible}
        onMaskClick={() => setLeftPanelVisible(false)}
        position="left"
        bodyStyle={{ width: '75vw' }}
      >
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <span className={styles.leftPanelTitle}>学术头衔</span>
            <span className={styles.leftPanelClose} onClick={() => setLeftPanelVisible(false)}>×</span>
          </div>
          <div className={styles.leftPanelBody}>
            <TreeView
              data={categoryTree}
              expandedNodes={expandedNodes}
              selectedNode={selectedNode}
              onToggle={toggleNode}
              onNodeClick={handleNodeClick}
              levelIndent={16}
            />
          </div>
        </div>
      </Popup>

      {/* 右侧筛选面板 */}
      <FilterDrawer
        visible={filterPanelVisible}
        onClose={() => setFilterPanelVisible(false)}
        title="更多筛选"
        menus={filterMenus}
        activeMenu={activeFilterMenu}
        onMenuChange={scrollToDrawerSection}
        contentRef={drawerContentRef}
      >
        {filterMenus.map((menu) => (
          <div key={menu} id={`drawer-section-${menu}`} className={styles.drawerCategorySection}>
            <div className={styles.drawerCategoryTitle}>{menu}</div>
            {filterData[menu].map((section, idx) => {
              // 根据最长标签长度决定列数：<=6字符用3列，否则用2列
              const maxLen = Math.max(...section.tags.map(tag => tag.length));
              const cols = maxLen <= 6 ? 3 : 2;
              return (
                <div key={idx} className={styles.drawerSection}>
                  <div className={styles.drawerSectionTitle}>
                    <span className={styles.drawerSectionBar}></span>
                    <span>{section.title}</span>
                  </div>
                  <div
                    className={styles.drawerTagList}
                    style={{ '--tag-cols': cols } as React.CSSProperties}
                  >
                    {section.tags.map((tag, tagIdx) => {
                      const isSelected = activeFilters.includes(tag);
                      return (
                        <span
                          key={tagIdx}
                          className={`${styles.drawerTagItem} ${isSelected ? styles.drawerTagItemActive : ''}`}
                          onClick={() => {
                            if (isSelected) {
                              setActiveFilters(activeFilters.filter(f => f !== tag));
                            } else {
                              setActiveFilters([...activeFilters, tag]);
                            }
                          }}
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
      <BackToTop scrollContainerRef={scrollRef} threshold={200}  />
    </div>
  );
}
