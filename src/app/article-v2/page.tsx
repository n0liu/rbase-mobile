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

export default function ArticleV2Page() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const [leftPanelVisible, setLeftPanelVisible] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [activeFilterMenu, setActiveFilterMenu] = useState('影响因子');
  const [activeFilters, setActiveFilters] = useState<string[]>(['0-5 (452)', '5-10 (311)', '10-15 (189)']);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['益生菌']));
  const [selectedPath, setSelectedPath] = useState<string[]>(['益生菌']);
  const [selectedNode, setSelectedNode] = useState<string>('益生菌');

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

  // 树状数据结构
  const categoryTree: TreeNode[] = [
    {
      name: '益生菌',
      count: 8162,
      children: [
        {
          name: '食品用',
          count: 3450,
          children: [
            {
              name: '双歧杆菌属',
              count: 870,
              children: [
                { name: '长双歧杆菌', count: 320 },
                { name: '动物双歧杆菌', count: 250 }
              ]
            },
            { name: '乳杆菌属', count: 1230 }
          ]
        },
        { name: '婴幼儿菌株', count: 580 },
        { name: '组合/SynCom', count: 310 },
        { name: '保健品原料', count: 1800 },
        { name: '新兴益生菌', count: 120 },
        { name: '工程益生菌', count: 80 }
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
    // 设置选中节点
    setSelectedNode(node.name);
    // 构建完整路径
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

  // 分类菜单数据
  const categoryMenus: CategoryItem[] = [
    { id: 'category-table', label: '分类表', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/1.svg?20230511' },
    { id: 'food-use', label: '食品用', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/2.svg?20230511' },
    { id: 'infant-strains', label: '婴幼儿菌株', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/3.svg?20230511' },
    { id: 'lbp', label: '药品/LBP', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/4.svg?20230511' },
    { id: 'syncom', label: '组合/SynCom', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/5.svg?20230511' },
    { id: 'health-material', label: '保健品原料', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/6.svg?20230511' },
    { id: 'ngp', label: '二代益生菌', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/7.svg?20230511' },
    { id: 'potential', label: '潜在益生菌', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/8.svg?20230511' },
    { id: 'engineered', label: '工程益生菌', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/9.svg?20230511' },
    { id: 'agriculture', label: '农业用', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/10.svg?20230511' },
    { id: 'technology', label: '益生菌技术', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/11.svg?20230511' },
    { id: 'people-org', label: '人物/机构', count: 0, icon: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/hope/icons/12.svg?20230511' },
  ];

  // 筛选数据
  // 筛选菜单配置
  const filterMenus = ['影响因子', '发表日期', '健康效应', '菌株/原料', '实验材料', '临床试验'];

  // 筛选数据 - 按照v1的结构组织
  const filterData: Record<string, { title: string; tags: string[] }[]> = {
    '影响因子': [
      { title: '影响因子', tags: ['0-5 (452)', '5-10 (311)', '10-15 (189)', '15-20 (98)', '20-30 (45)', '30+ (12)'] },
    ],
    '发表日期': [
      { title: '发表日期', tags: ['2025 (156)', '2024 (892)', '2023 (1205)', '2022 (980)', '2021 (756)', '更早 (5420)'] },
    ],
    '健康效应': [
      { title: '健康效应', tags: [
        '调节肠道菌群 (210)', '改善便秘 (150)', '预防腹泻 (121)', '增强免疫力 (101)',
        '缓解过敏症状 (95)', '体重管理 (88)', '降低胆固醇 (76)', '改善血糖 (65)',
        '女性私密健康 (54)', '改善皮肤状况 (43)', '缓解焦虑抑郁 (32)', '促进钙吸收 (21)',
        '抗氧化 (15)', '改善睡眠 (9)', '口腔健康 (5)'
      ]},
    ],
    '菌株/原料': [
      { title: '菌株/原料', tags: [
        '鼠李糖乳杆菌GG (88)', '动物双歧杆菌Bb-12 (76)', '乳双歧杆菌HN019 (65)',
        '嗜酸乳杆菌NCFM (54)', '植物乳杆菌299v (51)', '罗伊氏乳杆菌DSM17938 (49)',
        '干酪乳杆菌代田株 (45)', '长双歧杆菌BB536 (41)', '菊粉 (95)',
        '低聚果糖(FOS) (81)', '低聚半乳糖(GOS) (72)', '抗性糊精 (60)',
        '母乳低聚糖(HMOs) (58)', '益生菌组合 (25)', '后生元 (20)'
      ]},
    ],
    '实验材料': [
      { title: '实验/试验材料和对象', tags: [
        '健康成人 (210)', '婴幼儿 (155)', 'IBD患者 (88)', '过敏儿童 (72)',
        '肥胖人群 (61)', '老年人 (50)', '孕妇 (41)', 'C57BL/6J小鼠 (30)',
        'BALB/c小鼠 (19)', 'Wistar大鼠 (15)', 'SD大鼠 (9)', '体外肠道模型 (5)',
        'Caco-2细胞 (3)', 'HT-29细胞 (1)', '巨噬细胞RAW264.7 (1)'
      ]},
    ],
    '临床试验': [
      { title: '临床试验信息', tags: [
        '人体干预试验 (98)', '随机对照试验(RCT) (81)', '双盲 (76)', '安慰剂对照 (72)',
        '交叉设计 (45)', '平行设计 (33)', '剂量效应研究 (21)', '安全性评估 (15)',
        '有效性评估 (12)', '长期跟踪 (8)', '招募中 (5)', '已完成 (101)',
        '单中心研究 (67)', '多中心研究 (81)', 'I期临床试验 (4)'
      ]},
    ],
  };

  // 文献列表数据
  const [activeListTab, setActiveListTab] = useState<'literature' | 'patent'>('literature');

  const listTabs: TabItem[] = [
    { key: 'literature', label: '文献', count: 12409 },
    { key: 'patent', label: '专利', count: 5721 },
  ];

  const articleList: Article[] = [
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
        { name: 'Yao-Yu Yu', isCorresponding: false },
        { name: '郑军华', isCorresponding: true },
        { name: '刘尽尧', isCorresponding: true },
        { name: '翟炜', isCorresponding: true },
      ],
      keywords: ['益生菌', '长双歧杆菌BB536'],
    },
    {
      id: 2,
      day: '08',
      month: '10',
      journal: 'Microbiome',
      impactFactor: '16.6',
      titleCn: '菊粉型益生元对调节肥胖个体肠道菌群结构和代谢产物的宏基因组学研究',
      titleEn: 'Metagenomic analysis reveals the effects of inulin-type prebiotics on gut microbial structure and metabolites in obese individuals and something...',
      type: 'Article',
      date: '2025-10-08',
      doi: '10.1186/s40168-025-01234-5',
      authors: [
        { name: '汪芳宏', isCorresponding: false },
        { name: '蓝灿辉', isCorresponding: true },
        { name: '张和平', isCorresponding: true },
        { name: '朱书', isCorresponding: true },
        { name: '张发明', isCorresponding: true },
      ],
      keywords: ['益生元', '菊粉'],
    },
    {
      id: 3,
      day: '29',
      month: '09',
      journal: 'Nature Communications',
      impactFactor: '17.7',
      titleCn: '鼠李糖乳杆菌GG通过调节肠-脑轴缓解小鼠焦虑样行为',
      titleEn: 'Lactobacillus rhamnosus GG alleviates anxiety-like behavior in mice by modulating the gut-brain axis',
      type: 'Article',
      date: '2025-09-29',
      doi: '10.1007/s00203-025-04606-7',
      authors: [
        { name: 'Bradley G Fitzgerald', isCorresponding: false },
        { name: 'Matthew T Sorbara', isCorresponding: true },
      ],
      keywords: ['精神益生菌', 'LGG', '后生元', '嗜黏蛋白阿克曼氏菌', '预防急性移植物抗宿主病'],
    },
    {
      id: 4,
      day: '15',
      month: '09',
      journal: 'The ISME Journal',
      impactFactor: '11.0',
      titleCn: '母乳低聚糖 (HMOs) 对婴儿早期肠道菌群定植的选择性塑造作用',
      titleEn: 'Selective shaping of the infant gut microbiome by human milk oligosaccharides (HMOs)',
      type: 'Commentary',
      date: '2025-09-15',
      doi: '10.1038/s41396-025-01567-8',
      authors: [
        { name: 'Xianyun Gao', isCorresponding: false },
        { name: 'Yiyu Jin', isCorresponding: false },
        { name: 'Mengyao Liu', isCorresponding: false },
        { name: '陈海冰', isCorresponding: true },
        { name: '叶海峰', isCorresponding: true },
        { name: '管宁子', isCorresponding: true },
      ],
      keywords: ['益生元', 'HMOs'],
    },
    {
      id: 5,
      day: '01',
      month: '09',
      journal: 'Cell Host & Microbe',
      impactFactor: '30.3',
      titleCn: '活体生物药 (LBP) 在炎症性肠病 (IBD) 治疗中的应用与挑战',
      titleEn: 'Applications and challenges of live biotherapeutic products (LBPs) in the treatment of inflammatory bowel disease (IBD)',
      type: 'Review',
      date: '2025-09-01',
      doi: '10.1016/j.chom.2025.08.012',
      authors: [
        { name: 'Siqi Hua', isCorresponding: false },
        { name: '朱波', isCorresponding: true },
        { name: '华子春', isCorresponding: true },
      ],
      keywords: ['LBP', 'IBD'],
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
          {/* 期刊封面 */}
          <CoverBanner
            title="全球益生菌/益生元<br />循证数据库"
            subtitle="The Global Evidence-based Database for<br /><strong>H</strong>ealth <strong>O</strong>utcomes of <strong>P</strong>ro/<strong>P</strong>rEbiotics"
            showSearchBox={true}
            searchPlaceholder="输入益生菌/益生元名称检索"
            onSearch={() => router.push('/search')}
          />

          {/* 两行宫格菜单 */}
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
            <span className={styles.leftPanelTitle}>分类导航</span>
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
        title="更多查询"
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
