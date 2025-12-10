'use client';

import { useState } from 'react';
import { Tag, Popup, Swiper } from 'antd-mobile';
import {
  AddOutline,
  SearchOutline,
  DownOutline,
  CloseOutline,
  MoreOutline,
  LinkOutline,
  FilterOutline,
  UpOutline,
  UnorderedListOutline
} from 'antd-mobile-icons';
import styles from './page.module.css';

export default function ArticleV3Page() {
  const [activeTab, setActiveTab] = useState<'articles' | 'patents'>('articles');
  const [leftPanelVisible, setLeftPanelVisible] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['消化道菌群 (388)', '肠道微生物组 (472)']);
  const [activeFilterMenu, setActiveFilterMenu] = useState('研究领域');
  const [researcherSwiperIndex, setResearcherSwiperIndex] = useState(0);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['香港中文大学', '医学院', '消化疾病研究所']));

  // 机构数据
  const institution = {
    name: '香港中文大学',
    nameEn: 'The Chinese University of Hong Kong',
    cover: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rxcgw/home-1.png',
    stats: {
      articles: '200+',
      patents: '50+',
      collaborators: '150+'
    },
    departments: [
      {
        name: '香港中文大学',
        count: 1450,
        children: [
          {
            name: '医学院',
            count: 2450,
            children: [
              { name: '内科及药物治疗学系', count: 234 },
              { name: '外科学系', count: 234 },
              {
                name: '消化疾病研究所',
                count: 234,
                children: [
                  { name: '肠道菌群研究中心', count: 120 },
                  { name: '消化道肿瘤实验室', count: 120 }
                ]
              },
              { name: '理学院', count: 234 },
              { name: '工程学院', count: 234 },
              { name: '李嘉诚健康科学研究所', count: 234 },
              { name: '农业生物技术国家重点实验室', count: 234 }
            ]
          }
        ]
      }
    ],
    researchers: [
      { name: '于君', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: '沈湘荣', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: '陈家荣', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: '卢炬明', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: '黄革', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: '陈浩森', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: '段崇智', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: 'HM 何敏', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' },
      { name: 'LT 蓝霆', avatar: 'https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png' }
    ],
    links: [
      { label: '官方网站', icon: <LinkOutline /> },
      { label: 'Twitter / X', icon: <LinkOutline /> }
    ]
  };

  // 筛选数据
  const filterData = {
    researchFields: [
      { label: '消化道菌群', count: 388 },
      { label: '肠道微生物组', count: 472 },
      { label: '胃癌', count: 436 },
      { label: '结直肠癌', count: 116 },
      { label: '肝癌', count: 96 },
      { label: '基因组学', count: 216 },
      { label: '表观遗传学', count: 87 },
      { label: '生物信息学', count: 254 }
    ],
    authors: [
      { label: '于君', count: 115 },
      { label: '沈湘荣', count: 98 },
      { label: '陈家荣', count: 85 },
      { label: '卢炬明', count: 77 }
    ],
    institutions: [
      { label: '医学院', count: 450 },
      { label: '消化疾病研究所', count: 210 },
      { label: '理学院', count: 180 },
      { label: '李嘉诚健康科学研究所', count: 155 }
    ],
    journals: [
      { label: 'Q1区', count: 268 },
      { label: 'Q2区', count: 79 },
      { label: '顶刊', count: 205 },
      { label: 'CNS', count: 386 }
    ],
    publishYear: [
      { label: '近1年', count: 213 },
      { label: '近3年', count: 449 },
      { label: '近5年', count: 445 },
      { label: '2000年以前', count: 24 }
    ]
  };

  // 文献列表数据
  const articles = [
    {
      id: 1,
      date: { day: '15', month: '10' },
      journal: 'Gut Microbes',
      if: '[IF:12.2]',
      titleCn: 'Bifidobacterium longum BB536 对改善老年人肠道健康和免疫功能的随机对照试验',
      titleEn: 'A Randomized, Controlled Trial of Bifidobacterium longum BB536 for Improving Gut Health and Immune Function in the Elderly',
      type: 'Article',
      publishDate: '2025-10-15',
      authors: [
        { name: 'Jun-Yao Xu', hasEmail: false },
        { name: 'Yao-Yu Yu', hasEmail: false },
        { name: '郑军平', hasEmail: true },
        { name: '刘荣奇', hasEmail: true },
        { name: '理科', hasEmail: true }
      ],
      tags: ['益生菌', '长双歧杆菌BB536']
    },
    {
      id: 2,
      date: { day: '08', month: '10' },
      journal: 'Microbiome',
      if: '[IF:16.6]',
      titleCn: '菊粉型益生元对调节肥胖个体肠道菌群结构和代谢产物的宏基因组组学研究',
      titleEn: 'Metagenomic analysis reveals the effects of inulin-type prebiotics on gut microbial structure and metabolic output in obese individuals and something...',
      type: 'Article',
      publishDate: '2025-10-08',
      authors: [
        { name: '汪芳宏', hasEmail: false },
        { name: '蓝湘辉', hasEmail: true },
        { name: '张和平', hasEmail: true },
        { name: '朱光', hasEmail: true },
        { name: '张发明', hasEmail: true }
      ],
      tags: ['益生元', '菊粉']
    },
    {
      id: 3,
      date: { day: '29', month: '09' },
      journal: 'Nature Communications',
      if: '[IF:17.7]',
      titleCn: '鼠李糖乳杆菌GG通过调节肠-脑轴缓解小鼠焦虑样行为',
      titleEn: 'Lactobacillus rhamnosus GG alleviates anxiety-like behavior in mice by modulating the gut-brain axis',
      type: 'Article',
      publishDate: '2025-09-29',
      authors: [
        { name: 'Bradley G Fitzgerald', hasEmail: false },
        { name: 'Matthew T Sorbara', hasEmail: true }
      ],
      tags: ['精神益生菌', 'LGG']
    },
    {
      id: 4,
      date: { day: '15', month: '09' },
      journal: 'The ISME Journal',
      if: '[IF:11.0]',
      titleCn: '母乳低聚糖 (HMOs) 对塑儿早期肠道菌群定植的选择性塑造作用',
      titleEn: 'Selective shaping of the infant gut microbiome by human milk oligosaccharides (HMOs)',
      type: 'Commentary',
      publishDate: '2025-09-15',
      authors: [
        { name: 'Xianyun Gao', hasEmail: false },
        { name: 'Yiyu Jin', hasEmail: false },
        { name: 'Mengyao Liu', hasEmail: false },
        { name: '陈泊汐', hasEmail: true },
        { name: '叶湛瀚', hasEmail: true },
        { name: '霍宁子', hasEmail: true }
      ],
      tags: ['益生元', 'HMOs']
    },
    {
      id: 5,
      date: { day: '01', month: '09' },
      journal: 'Cell Host & Microbe',
      if: '[IF:30.3]',
      titleCn: '活体生物药 (LBP) 在炎症性肠病 (IBD) 治疗中的应用与挑战',
      titleEn: 'Applications and challenges of live biotherapeutic products (LBPs) in the treatment of inflammatory bowel disease (IBD)',
      type: 'Review',
      publishDate: '2025-09-01',
      authors: [
        { name: 'Siqi Hua', hasEmail: false },
        { name: '朱波', hasEmail: true },
        { name: '华子春', hasEmail: true }
      ],
      tags: ['LBP', 'IBD']
    }
  ];

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

  // 递归渲染组织结构树节点
  interface OrgNode {
    name: string;
    count: number;
    children?: OrgNode[];
  }

  const renderOrgNode = (node: OrgNode, level: number = 0, isLast: boolean = false): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.name);
    const hasChildren = node.children && node.children.length > 0;
    const isLeaf = !hasChildren;

    return (
      <div
        key={node.name}
        className={`${styles.orgNodeWrapper} ${isLast ? styles.orgNodeLast : ''}`}
        style={{
          '--node-level': level
        } as React.CSSProperties}
      >
        <div
          className={`${styles.orgItemChild} ${hasChildren ? styles.orgItemClickable : ''}`}
          style={{
            '--node-level': level
          } as React.CSSProperties}
          onClick={() => hasChildren && toggleNode(node.name)}
        >
          <div className={styles.orgItemIconWrapper}>
            {isLeaf ? (
              // 叶子节点:只显示横线
              <div className={styles.orgLeafIcon}>
                <svg viewBox="0 0 16 16" fill="none">
                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            ) : isExpanded ? (
              // 已展开:圆圈-号
              <div className={styles.orgCollapseIcon}>
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            ) : (
              // 未展开:圆圈+号
              <div className={styles.orgExpandIcon}>
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            )}
          </div>
          <div className={level === 0 ? `${styles.orgItemName} ${styles.orgItemNameRoot}` : styles.orgItemName}>
            {node.name} <span className={styles.orgItemCount}>({node.count})</span>
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className={styles.orgChildrenWrapper}>
            {node.children!.map((child, index) =>
              renderOrgNode(child, level + 1, index === node.children!.length - 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <span className={styles.logoR}>R</span>
          <span className={styles.logoDot}>•</span>
          <span className={styles.logoText}>base</span>
          <Tag className={styles.docTag}>机构</Tag>
        </div>
        <div className={styles.topRight}>
          <UnorderedListOutline className={styles.topIcon} onClick={() => setLeftPanelVisible(true)} />
          <SearchOutline className={styles.topIcon} />
          <img src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" alt="用户头像" className={styles.userAvatar} />
        </div>
      </div>

      {/* 可滚动内容区 */}
      <div className={styles.scrollArea}>
        <div className={styles.content}>
          {/* 机构横幅 */}
          <div className={styles.institutionBanner}>
            <img src={institution.cover} alt={institution.name} className={styles.bannerImage} />
            <div className={styles.bannerOverlay}>
              <div className={styles.institutionInfo}>
                <h1 className={styles.institutionName}>{institution.name}</h1>
                <p className={styles.institutionNameEn}>{institution.nameEn}</p>
              </div>
              <button className={styles.followBtn}>
                <AddOutline className={styles.addIcon} />
                <span>关注</span>
              </button>
            </div>
          </div>

          {/* 机构统计 */}
          <div className={styles.statsSection}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{institution.stats.articles}</div>
              <div className={styles.statLabel}>期刊文章</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{institution.stats.patents}</div>
              <div className={styles.statLabel}>专利成果</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{institution.stats.collaborators}</div>
              <div className={styles.statLabel}>合作机构</div>
            </div>
          </div>

          {/* 研究学者宫格 */}
          <div className={styles.researcherGridSection}>
            <Swiper
              trackOffset={0}
              stuckAtBoundary={false}
              className={`${styles.researcherSwiper} ${researcherSwiperIndex === 1 ? styles.researcherSwiperTall : styles.researcherSwiperShort}`}
              onIndexChange={(index) => setResearcherSwiperIndex(index)}
              indicator={false}
            >
              {[
                <Swiper.Item key="page1">
                  <div className={styles.departmentGridSingleRow}>
                    {institution.researchers.slice(0, 4).map((researcher, idx) => (
                      <div key={idx} className={styles.departmentGridItem}>
                        <img src={researcher.avatar} alt={researcher.name} className={styles.researcherGridAvatar} />
                        <div className={styles.departmentName}>{researcher.name}</div>
                      </div>
                    ))}
                  </div>
                </Swiper.Item>,
                institution.researchers.length > 4 ? (
                  <Swiper.Item key="page2">
                    <div className={styles.departmentGrid}>
                      {institution.researchers.slice(4, 11).map((researcher, idx) => (
                        <div key={idx} className={styles.departmentGridItem}>
                          <img src={researcher.avatar} alt={researcher.name} className={styles.researcherGridAvatar} />
                          <div className={styles.departmentName}>{researcher.name}</div>
                        </div>
                      ))}
                      {/* 第8个位置永远显示"更多"按钮 */}
                      <div className={`${styles.departmentGridItem} ${styles.departmentGridMore}`}>
                        <div className={styles.moreButton}>
                          <MoreOutline className={styles.moreOutlineIcon} />
                        </div>
                        <div className={styles.departmentName}>更多</div>
                      </div>
                    </div>
                  </Swiper.Item>
                ) : null
              ].filter((item): item is React.ReactElement => item !== null)}
            </Swiper>
            <div className={styles.customIndicator}>
              {Array.from({ length: institution.researchers.length > 4 ? 2 : 1 }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.indicatorDot} ${index === researcherSwiperIndex ? styles.indicatorDotActive : ''}`}
                />
              ))}
            </div>
          </div>

          {/* 筛选标签区 */}
          {activeFilters.length > 0 && (
            <div className={styles.filterTags}>
              <span className={styles.filterTagsLabel}>当前未选择任何筛选条件</span>
              <div className={styles.activeFilters}>
                {activeFilters.map((filter, idx) => (
                  <Tag
                    key={idx}
                    color="primary"
                    className={styles.activeFilterTag}
                    onClick={() => {
                      setActiveFilters(activeFilters.filter((_, i) => i !== idx));
                    }}
                  >
                    {filter}
                    <CloseOutline className={styles.filterTagClose} />
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* 文献列表区域 */}
          <div className={styles.listSection}>
            <div className={styles.listTabBar}>
              <div className={styles.listTabs}>
                <div
                  className={`${styles.listTab} ${activeTab === 'articles' ? styles.listTabActive : ''}`}
                  onClick={() => setActiveTab('articles')}
                >
                  文献 (850+)
                </div>
                <div
                  className={`${styles.listTab} ${activeTab === 'patents' ? styles.listTabActive : ''}`}
                  onClick={() => setActiveTab('patents')}
                >
                  专利 (25)
                </div>
              </div>
              <div className={styles.listActions}>
                <div className={styles.sortBtn}>
                  <span>发表时间</span>
                  <DownOutline className={styles.downIcon} />
                </div>
                <FilterOutline
                  className={styles.filterIcon}
                  onClick={() => setFilterPanelVisible(true)}
                />
              </div>
            </div>

            <div className={styles.articleList}>
              {articles.map((article) => (
                <div key={article.id} className={styles.articleItem}>
                  <div className={styles.articleDate}>
                    <div className={styles.articleDay}>{article.date.day}</div>
                    <div className={styles.articleMonth}>{article.date.month}</div>
                  </div>
                  <div className={styles.articleMain}>
                    <div className={styles.articleHeader}>
                      <span className={styles.articleJournal}>{article.journal}</span>
                      <span className={styles.headerSeparator}>•</span>
                      <span className={styles.articleIF}>{article.if}</span>
                    </div>
                    <div className={styles.articleTitleCn}>{article.titleCn}</div>
                    <div className={styles.articleTitleEn}>{article.titleEn}</div>
                    <div className={styles.articleMeta}>
                      <div className={styles.articleMetaRow}>
                        <span className={styles.articleType}>{article.type}</span>
                        <span className={styles.headerSeparator}>•</span>
                        <span className={styles.articleMetaDate}>{article.publishDate}</span>
                      </div>
                      <div className={styles.articleAuthors}>
                        {article.authors.map((author, idx) => (
                          <span key={idx} className={styles.authorItem}>
                            {author.name}
                            {author.hasEmail && <span className={styles.mailIcon}>✉</span>}
                            {idx < article.authors.length - 1 && ' | '}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.articleBottom}>
                      <div className={styles.articleKeywords}>
                        {article.tags.map((tag, idx) => (
                          <Tag key={idx} color="primary" fill="outline" className={styles.keywordTag}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <MoreOutline className={styles.articleMore} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部 AI 问答栏 */}
      <div className={styles.bottomBar}>
        <div className={styles.aiButton}>
          <span className={styles.aiIcon}>✦</span>
          <span>AI问答</span>
        </div>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="输入问题，对话权威文献" className={styles.inputField} />
        </div>
        <div className={styles.upButton}>
          <UpOutline />
        </div>
      </div>

      {/* 左侧组织结构面板 */}
      <Popup
        visible={leftPanelVisible}
        onMaskClick={() => setLeftPanelVisible(false)}
        position="left"
        bodyStyle={{ width: '75vw' }}
      >
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <span className={styles.leftPanelTitle}>组织结构图</span>
            <span className={styles.leftPanelClose} onClick={() => setLeftPanelVisible(false)}>×</span>
          </div>
          <div className={styles.leftPanelBody}>
            {/* 组织结构树 */}
            <div className={styles.orgSection}>
              <div className={styles.orgTree}>
                {institution.departments.map(dept => renderOrgNode(dept))}
              </div>
            </div>

            {/* 官方链接 */}
            <div className={styles.linksSection}>
              <div className={styles.linksSectionTitle}>官方链接</div>
              {institution.links.map((link, idx) => (
                <div key={idx} className={styles.linkItem}>
                  <span className={styles.linkIcon}>{link.icon}</span>
                  <span className={styles.linkLabel}>{link.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Popup>

      {/* 右侧筛选面板 */}
      <Popup
        visible={filterPanelVisible}
        onMaskClick={() => setFilterPanelVisible(false)}
        position="right"
        bodyStyle={{ width: '85vw' }}
      >
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>筛选文献</span>
            <span className={styles.drawerClose} onClick={() => setFilterPanelVisible(false)}>×</span>
          </div>
          <div className={styles.drawerBody}>
            <div className={styles.drawerMenu}>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '研究领域' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('研究领域')}
              >
                研究领域
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '按学者' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('按学者')}
              >
                按学者
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '按机构' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('按机构')}
              >
                按机构
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '期刊分区' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('期刊分区')}
              >
                期刊分区
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '发表年份' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('发表年份')}
              >
                发表年份
              </div>
            </div>
            <div className={styles.drawerContent}>
              {activeFilterMenu === '研究领域' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>研究领域和方向</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.researchFields.map((item, idx) => (
                        <Tag
                          key={idx}
                          color={activeFilters.includes(`${item.label} (${item.count})`) ? 'primary' : 'default'}
                          fill={activeFilters.includes(`${item.label} (${item.count})`) ? 'solid' : 'outline'}
                          onClick={() => {
                            const filterText = `${item.label} (${item.count})`;
                            if (activeFilters.includes(filterText)) {
                              setActiveFilters(activeFilters.filter(f => f !== filterText));
                            } else {
                              setActiveFilters([...activeFilters, filterText]);
                            }
                          }}
                        >
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '按学者' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>按学者筛选</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.authors.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '按机构' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>按院系/实验室筛选</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.institutions.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '期刊分区' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>期刊分区</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.journals.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '发表年份' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>发表年份</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.publishYear.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}
