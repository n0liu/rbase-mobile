'use client';

import { useState, useRef } from 'react';
import { Tag, Popup, Tabs } from 'antd-mobile';
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
import styles from './page.module.css';
import BackToTop from '@/components/BackToTop';

export default function ArticleV2Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leftPanelVisible, setLeftPanelVisible] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [activeFilterMenu, setActiveFilterMenu] = useState('影响因子');
  const [aiPopupVisible, setAiPopupVisible] = useState(false);
  const [aiPopupContent, setAiPopupContent] = useState({ title: '', content: '' });
  const [aiTabKey, setAiTabKey] = useState('cn');
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

  const article = {
    type: "Article",
    journal: "Nature Metabolism",
    impactFactor: "20.8",
    titleCn: "Nature子刊：菊粉促益生菌→小肠耗果糖→拯救脂肪肝",
    titleEn: "Dietary fibre-adapted gut microbiome clears dietary fructose and reverses hepatic steatosis",
    doi: "10.1038/s43587-025-00947-6",
    publishDate: "2025-9-1",
    coverImage: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rxcgw/home-1.png",
    authors: [
      { name: "张发明", isCorresponding: true },
      { name: "T. Borody", isCorresponding: false },
      { name: "A. Khoruts", isCorresponding: true },
      { name: "C. Kelly", isCorresponding: false },
      { name: "Z. Kassam", isCorresponding: false },
      { name: "J. Keller", isCorresponding: false },
    ],
    aiSummary: [
      { title: "研究设计与方法", content: "该研究通过小鼠模型，结合同位素示踪、代谢组学和微生物组移植等技术，探究膳食纤维菊粉对高果葡糖浆（HFCS）诱导的代谢功能障碍相关脂肪性肝病（MASLD）的干预效果与机制。" },
      { title: "核心发现", content: "补充菊粉不仅能预防，还能逆转由HFCS引起的肝脏脂肪变性、纤维化和胰岛素抵抗，其关键在于重塑肠道菌群的功能，使其能主动清除膳食果糖。" },
      { title: "小肠菌群清糖机制", content: "菊粉能特异性促进小肠菌群分解膳食果糖，从而显著减少果糖溢出至肝脏和结肠，从源头抑制肝脏从头脂肪生成（DNL）。" },
      { title: "肝脏代谢重塑机制", content: "菊粉还将肝脏内的果糖代谢碳流从DNL转向丝氨酸和甘氨酸的从头合成，进而增强谷胱甘肽生成，有效对抗果糖诱导的肝脏脂质过氧化损伤。" },
      { title: "关键菌种及作用", content: "鉴定出产酸拟杆菌（Bacteroides acidifaciens）是介导菊粉效应的关键菌种，其丰度因菊粉而增加，并能高效分解果糖以抑制宿主DNL。" },
      { title: "菌群介导因果验证", content: "菊粉的保护作用可通过肠道菌群移植传递给受体小鼠，而抗生素处理则会消除这些益处，共同证实肠道菌群的介导作用。" }
    ],
    aiInterpretation: [
      { key: "summary", label: "原文摘要", cnContent: "背景：黄曲霉毒素B₁（AFB₁）是一种强致癌性与肝毒性真菌毒素，常污染动物饲料，对人类及家畜健康构成严重威胁。尽管AFB₁所致肝毒性及其他器官损伤已得到广泛表征，但其对反刍动物瘤胃微生物群结构动态及功能活性的影响仍缺乏深入研究...", enContent: "Background: Aflatoxin B₁ (AFB₁) is a potent carcinogenic and hepatotoxic fungal toxin that commonly contaminates animal feed, posing a serious threat to human and livestock health..." },
      { key: "innovation", label: "创新要点", cnContent: "本研究首次系统揭示了膳食纤维菊粉通过重塑肠道菌群功能来清除膳食果糖的机制...", enContent: "This study is the first to systematically reveal the mechanism by which dietary fiber inulin clears dietary fructose by reshaping gut microbiota function..." },
      { key: "popular", label: "科普解读", cnContent: "简单来说，这项研究发现吃菊粉（一种膳食纤维）可以帮助肠道里的好细菌把果糖吃掉，从而保护肝脏...", enContent: "In simple terms, this study found that eating inulin (a dietary fiber) can help good bacteria in the gut consume fructose, thereby protecting the liver..." },
      { key: "background", label: "研究背景", cnContent: "脂肪肝已成为全球最常见的慢性肝病之一，高果糖饮食被认为是重要诱因...", enContent: "Fatty liver has become one of the most common chronic liver diseases worldwide, and high-fructose diet is considered an important contributing factor..." },
      { key: "method", label: "研究方法", cnContent: "研究采用小鼠模型，通过16S rRNA测序、代谢组学分析、同位素示踪等技术进行系统研究...", enContent: "The study used mouse models and conducted systematic research through 16S rRNA sequencing, metabolomics analysis, isotope tracing and other techniques..." },
      { key: "prospect", label: "转化前景", cnContent: "该研究为开发基于膳食纤维的脂肪肝预防和治疗策略提供了重要的理论基础...", enContent: "This study provides an important theoretical basis for developing fatty liver prevention and treatment strategies based on dietary fiber..." },
      { key: "framework", label: "文章框架", cnContent: "文章分为引言、方法、结果、讨论四个主要部分，逻辑清晰，论证严密...", enContent: "The article is divided into four main parts: introduction, methods, results, and discussion, with clear logic and rigorous argumentation..." },
      { key: "figures", label: "图表解读", cnContent: "图1展示了菊粉对小鼠肝脏脂肪含量的影响；图2揭示了肠道菌群组成的变化...", enContent: "Figure 1 shows the effect of inulin on liver fat content in mice; Figure 2 reveals changes in gut microbiota composition..." },
      { key: "limitation", label: "局限性", cnContent: "本研究主要基于小鼠模型，需要进一步的人体临床试验来验证结果的普适性...", enContent: "This study is mainly based on mouse models, and further human clinical trials are needed to verify the universality of the results..." }
    ],
    links: [
      { icon: "link", label: "出版社原文", iconColor: "#0066ff" },
      { icon: "file", label: "PDF下载", tag: "OA", iconColor: "#f5222d" },
      { icon: "eye", label: "深度解读", iconColor: "#52c41a" },
      { icon: "content", label: "新闻报道", iconColor: "#fa8c16" },
    ],
    institutions: [
      { abbr: "CAU", name: "中国农业大学食品科学与营养工程学院" },
      { abbr: "AMMS", name: "军事科学院军事医学研究院" },
      { abbr: "IOZ,CAS", name: "中国科学院动物研究所" },
      { abbr: "CBS,CAU", name: "中国农业大学生物学院" },
    ],
    relatedArticles: [
      { type: "Review", journal: "Gut Microbes", impact: "12.2", titleCn: "Science：用化学遗传学方法，解析健康与疾病中的菌群机制（综述）" },
      { type: "News & Views", journal: "Gut Microbes", impact: "12.2", titleCn: "Nature Reviews：FMT和益生菌干预预后考虑潜在风险" },
      { type: "Article", journal: "Gut Microbes", impact: "12.2", titleCn: "艾克/何真/毛仁/来书Cell子刊：菌群如何影响克罗恩病中的爬行脂肪形成?" }
    ],
    keywords: {
      core: ["肠道菌群", "益生菌", "小肠", "脂肪肝", "hepatic steatosis"],
      extended: ["代谢组胆酸", "B. acidifaciens", "谷胱甘肽", "肝脏脂质过氧化"],
      ai: ["代谢功能障碍", "同位素示踪", "黏膜", "果糖"],
      mesh: ["Fructose", "Inulin", "Fatty Liver", "Probiotics"]
    },
    interventions: [
      { name: "菊粉", condition: "脂肪肝", method: "动物实验", result: "阳性" },
      { name: "抗生素", condition: "便秘", method: "人体临床试验", result: "阴性" }
    ],
    channels: ["微生物（组）", "营养", "消化系统疾病", "动物", "免疫"],
    topics: ["神经", "特殊人群", "肠X轴", "肿瘤", "消化道生理"],
    articleAttributes: {
      researchType: "干预性研究",
      stage: "TO-基础研究",
      evidenceLevel: "动物研究",
      direction: "药物开发",
      majorField: "医学",
      minorFields: ["传染病学", "骨科", "外科"]
    },
    experimentMaterials: {
      model: ["小鼠", "肝脏", "小肠"],
      bacteria: ["产酸拟杆菌", "动物双歧杆菌Bb-12", "鼠李糖乳杆菌GG"],
      cell: "293T"
    },
    clinicalTrial: {
      sponsor: "IIT",
      grouping: "交叉设计",
      phase: "III期临床试验",
      population: "婴幼儿",
      blinding: "双盲",
      control: "安慰剂对照",
      route: "口服",
      duration: "7天",
      primaryEndpoint: "日均排便次数",
      secondaryEndpoints: ["粪便微生物多样性", "血液免疫指标"],
      registrationNumber: "ChiCTR2500109434"
    },
    experimentMethods: ["16S rDNA测序", "液相色谱-质谱联用（LC-MS）", "逆转录定量聚合酶链式反应（qPCR）", "RNA序列分析（RNA-seq）"],
    analysisMethods: ["回归分析", "贝叶斯统计方法", "SPSS", "QIIME2"],
    molecules: {
      biochemical: ["谷胱肽", "短链脂肪酸", "果糖"],
      targets: ["PD-1", "CTLA-4"],
      pathways: ["JAK-STAT"]
    },
    outputs: {
      resources: ["中国健康人益生菌菌库"],
      products: ["冠益乳酸奶", "优益C乳酸菌饮料"],
      companies: ["蒙牛乳业", "科拓生物"]
    },
    contributors: ["白细胞战神_007", "PaperSlayer_张", "医学僧不是和尚", "爱吃烧烤的Dr_Li"]
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
  const filterData = {
    healthEffects: [
      { label: '调节肠道菌群', count: 210 },
      { label: '改善便秘', count: 150 },
      { label: '预防腹泻', count: 121 },
      { label: '增强免疫力', count: 101 },
      { label: '缓解过敏症状', count: 95 },
      { label: '体重管理', count: 88 },
      { label: '降低胆固醇', count: 76 },
      { label: '改善血糖', count: 65 },
      { label: '女性私密健康', count: 54 },
      { label: '改善皮肤状况', count: 43 },
      { label: '缓解焦虑抑郁', count: 32 },
      { label: '促进钙吸收', count: 21 },
      { label: '抗氧化', count: 15 },
      { label: '改善睡眠', count: 9 },
      { label: '口腔健康', count: 5 },
    ],
    strains: [
      { label: '鼠李糖乳杆菌GG', count: 88 },
      { label: '动物双歧杆菌Bb-12', count: 76 },
      { label: '乳双歧杆菌HN019', count: 65 },
      { label: '嗜酸乳杆菌NCFM', count: 54 },
      { label: '植物乳杆菌299v', count: 51 },
      { label: '罗伊氏乳杆菌DSM17938', count: 49 },
      { label: '干酪乳杆菌代田株', count: 45 },
      { label: '长双歧杆菌BB536', count: 41 },
      { label: '菊粉', count: 95 },
      { label: '低聚果糖(FOS)', count: 81 },
      { label: '低聚半乳糖(GOS)', count: 72 },
      { label: '抗性糊精', count: 60 },
      { label: '母乳低聚糖(HMOs)', count: 58 },
      { label: '益生菌组合', count: 25 },
      { label: '后生元', count: 20 },
    ],
    materials: [
      { label: '健康成人', count: 210 },
      { label: '婴幼儿', count: 155 },
      { label: 'IBD患者', count: 88 },
      { label: '过敏儿童', count: 72 },
      { label: '肥胖人群', count: 61 },
      { label: '老年人', count: 50 },
      { label: '孕妇', count: 41 },
      { label: 'C57BL/6J小鼠', count: 30 },
      { label: 'BALB/c小鼠', count: 19 },
      { label: 'Wistar大鼠', count: 15 },
      { label: 'SD大鼠', count: 9 },
      { label: '体外肠道模型', count: 5 },
      { label: 'Caco-2细胞', count: 3 },
      { label: 'HT-29细胞', count: 1 },
      { label: '巨噬细胞RAW264.7', count: 1 },
    ],
    clinical: [
      { label: '人体干预试验', count: 98 },
      { label: '随机对照试验(RCT)', count: 81 },
      { label: '双盲', count: 76 },
      { label: '安慰剂对照', count: 72 },
      { label: '交叉设计', count: 45 },
      { label: '平行设计', count: 33 },
      { label: '剂量效应研究', count: 21 },
      { label: '安全性评估', count: 15 },
      { label: '有效性评估', count: 12 },
      { label: '长期跟踪', count: 8 },
      { label: '招募中', count: 5 },
      { label: '已完成', count: 101 },
      { label: '单中心研究', count: 67 },
      { label: '多中心研究', count: 81 },
      { label: 'I期临床试验', count: 4 },
    ],
  };

  // 文献列表数据
  const [activeListTab, setActiveListTab] = useState<'literature' | 'patent'>('literature');

  const listTabs: TabItem[] = [
    { key: 'literature', label: '文献', count: 12409 },
    { key: 'patent', label: '专利', count: 5721 },
  ];

  const articleList = [
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
      authors: [
        { name: 'Bradley G Fitzgerald', isCorresponding: false },
        { name: 'Matthew T Sorbara', isCorresponding: true },
      ],
      keywords: ['精神益生菌', 'LGG'],
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
        onSearchClick={() => {}}
        onListClick={() => {}}
      />

      {/* 可滚动内容区 */}
      <div className={styles.scrollArea} ref={scrollRef}>
        <div className={styles.content}>
          {/* 期刊封面 */}
          <CoverBanner
            imageUrl={article.coverImage}
            title="全球益生菌/益生元循证知识库"
            subtitle="The Global Evidence-based Database for Health Outcomes of Pro/PrEbiotics"
            showFollowBtn={true}
            followBtnText="+ 关注"
            onFollow={() => {}}
            height="200px"
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
              {articleList.map((item) => (
                <div key={item.id} className={styles.articleItem}>
                  <div className={styles.articleDate}>
                    <span className={styles.articleDay}>{item.day}</span>
                    <span className={styles.articleMonth}>{item.month}</span>
                  </div>
                  <div className={styles.articleMain}>
                    <div className={styles.articleHeader}>
                      <span className={`${styles.articleType} ${item.type === 'Review' ? styles.typeReview : item.type === 'Commentary' ? styles.typeCommentary : ''}`}>
                        {item.type}
                      </span>
                      <span className={styles.headerSeparator}>›</span>
                      <span className={styles.articleJournal}>{item.journal}</span>
                      <span className={styles.articleIF}>[IF:{item.impactFactor}]</span>
                      <div className={styles.articleMore}>
                        <Image src="/icons/ellipsis.svg" alt="更多" width={16} height={16} className={styles.moreIcon} />
                      </div>
                    </div>
                    <h3 className={styles.articleTitleCn}>{item.titleCn}</h3>
                    <p className={styles.articleTitleEn}>{item.titleEn}</p>
                    <div className={styles.articleAuthors}>
                      {item.authors.map((author, idx) => (
                        <span key={idx} className={styles.authorItem}>
                          {author.name}
                          {author.isCorresponding && (
                            <Image src="/icons/email.svg" alt="通讯作者" width={8} height={8} className={styles.mailIcon} />
                          )}
                          {idx < item.authors.length - 1 && ' | '}
                        </span>
                      ))}
                    </div>
                    <div className={styles.articleBottom}>
                      <div className={styles.articleKeywords}>
                        {item.keywords.map((kw, idx) => (
                          <Tag key={idx} color="primary" fill="outline" className={styles.keywordTag}>{kw}</Tag>
                        ))}
                      </div>
                      <span className={styles.articleDate2}>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* AI解读底部弹窗 */}
      <Popup
        visible={aiPopupVisible}
        onMaskClick={() => setAiPopupVisible(false)}
        position="bottom"
        bodyStyle={{ height: '70vh', borderRadius: '16px 16px 0 0' }}
      >
        <div className={styles.aiPopup}>
          <div className={styles.aiPopupHeader}>
            <span className={styles.aiPopupTitle}>AI解读 - {aiPopupContent.title}</span>
            <span className={styles.aiPopupClose} onClick={() => setAiPopupVisible(false)}>×</span>
          </div>
          <Tabs activeKey={aiTabKey} onChange={setAiTabKey} className={styles.aiPopupTabs}>
            <Tabs.Tab title="中文" key="cn" />
            <Tabs.Tab title="原文" key="en" />
          </Tabs>
          <div className={styles.aiPopupContent}>
            {article.aiInterpretation.find(a => a.label === aiPopupContent.title)?.[aiTabKey === 'cn' ? 'cnContent' : 'enContent']}
          </div>
        </div>
      </Popup>

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
      <Popup
        visible={filterPanelVisible}
        onMaskClick={() => setFilterPanelVisible(false)}
        position="right"
        bodyStyle={{ width: '80vw' }}
      >
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>结构化解读</span>
            <span className={styles.drawerClose} onClick={() => setFilterPanelVisible(false)}>×</span>
          </div>
          <div className={styles.drawerBody}>
            <div className={styles.drawerMenu}>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '影响因子' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('影响因子')}
              >
                影响因子
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '发表日期' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('发表日期')}
              >
                发表日期
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '健康效应' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('健康效应')}
              >
                健康效应
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '菌株/原料' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('菌株/原料')}
              >
                菌株/原料
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '实验材料' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('实验材料')}
              >
                实验材料
              </div>
              <div
                className={`${styles.drawerMenuItem} ${activeFilterMenu === '临床试验' ? styles.drawerMenuItemActive : ''}`}
                onClick={() => setActiveFilterMenu('临床试验')}
              >
                临床试验
              </div>
            </div>
            <div className={styles.drawerContent}>
              {activeFilterMenu === '影响因子' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>影响因子</span>
                    <div className={styles.kwGroupTags}>
                      {['0-5 (452)', '5-10 (311)', '10-15 (189)', '15-20 (98)', '20-30 (45)', '30+ (12)'].map((option, idx) => (
                        <Tag
                          key={idx}
                          color={activeFilters.includes(option) ? 'primary' : 'default'}
                          fill={activeFilters.includes(option) ? 'solid' : 'outline'}
                          onClick={() => {
                            if (activeFilters.includes(option)) {
                              setActiveFilters(activeFilters.filter(f => f !== option));
                            } else {
                              setActiveFilters([...activeFilters, option]);
                            }
                          }}
                        >
                          {option}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '发表日期' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>发表日期</span>
                    <div className={styles.kwGroupTags}>
                      {['2025 (156)', '2024 (892)', '2023 (1205)', '2022 (980)', '2021 (756)', '更早 (5420)'].map((option, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {option}
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '健康效应' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>健康效应</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.healthEffects.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '菌株/原料' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>菌株/原料</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.strains.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '实验材料' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>实验/试验材料和对象</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.materials.map((item, idx) => (
                        <Tag key={idx} color="default" fill="outline">
                          {item.label} ({item.count})
                        </Tag>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeFilterMenu === '临床试验' && (
                <div className={styles.drawerSection}>
                  <div className={styles.kwGroup}>
                    <span className={styles.kwGroupLabel}>临床试验信息</span>
                    <div className={styles.kwGroupTags}>
                      {filterData.clinical.map((item, idx) => (
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
      <BackToTop scrollContainerRef={scrollRef} threshold={200}  />
    </div>
  );
}
