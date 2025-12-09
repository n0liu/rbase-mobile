'use client';

import { useState } from 'react';
import { Tag, Popup, Tabs } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import {
  RightOutline,
  StarOutline,
  LeftOutline,
  SearchOutline,
  UserOutline,
  FileOutline,
  LinkOutline,
  EyeOutline,
  ContentOutline,
  EditSOutline,
  SendOutline,
  AppstoreOutline,
  SetOutline,
  TagOutline,
  InformationCircleOutline,
  CheckCircleOutline,
  BillOutline,
  TransportQRcodeOutline,
  TeamOutline,
  GlobalOutline,
  UnorderedListOutline
} from 'antd-mobile-icons';
import styles from './page.module.css';

// 菜单项类型
interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

export default function ArticleV1Page() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState<MenuItem | null>(null);
  const [aiPopupVisible, setAiPopupVisible] = useState(false);
  const [aiPopupContent, setAiPopupContent] = useState({ title: '', content: '' });
  const [aiTabKey, setAiTabKey] = useState('cn');

  const article = {
    type: "Article",
    journal: "Nature Metabolism",
    impactFactor: "20.8",
    isOpenAccess: true,
    titleCn: "Nature子刊：菊粉促益生菌→小肠耗果糖→拯救脂肪肝",
    subtitleCn: "膳食纤维诱导的肠道菌群清除膳食中的果糖，并逆转脂肪肝",
    titleEn: "Dietary fibre-adapted gut microbiome clears dietary fructose and reverses hepatic steatosis",
    doi: "10.1038/s43587-025-00947-6",
    publishDate: "2025-9-1",
    source: "Gut Microbes",
    coverImage: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rxcgw/home-1.png",
    authors: [
      { name: "张发明", initial: "张", color: "#0066ff", isCorresponding: true },
      { name: "T. Borody", initial: "B", color: "#5fca96", isCorresponding: false },
      { name: "A. Khoruts", initial: "K", color: "#ff7b00", isCorresponding: true },
      { name: "C. Kelly", initial: "C", color: "#9333ea", isCorresponding: false },
      { name: "Z. Kassam", initial: "Z", color: "#0066ff", isCorresponding: false },
      { name: "J. Keller", initial: "J", color: "#5fca96", isCorresponding: false },
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

  // 菜单配置
  const menuItems: MenuItem[] = [
    {
      id: 'keywords',
      icon: <AppstoreOutline />,
      label: '关键词',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>核心关键词</span>
            <div className={styles.kwGroupTags}>
              {article.keywords.core.map((kw, i) => (
                <Tag key={i} color="primary">{kw}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>扩展关键词</span>
            <div className={styles.kwGroupTags}>
              {article.keywords.extended.map((kw, i) => (
                <Tag key={i} fill="outline">{kw}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>AI生成</span>
            <div className={styles.kwGroupTags}>
              {article.keywords.ai.map((kw, i) => (
                <Tag key={i} color="warning" fill="outline">{kw}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>MeSH词</span>
            <div className={styles.kwGroupTags}>
              {article.keywords.mesh.map((kw, i) => (
                <Tag key={i} color="success" fill="outline">{kw}</Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'interventions',
      icon: <SetOutline />,
      label: '干预措施',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.interventionTable}>
            <div className={styles.tableHeader}>
              <span>措施</span>
              <span>适应情况</span>
              <span>方法</span>
              <span>结果</span>
            </div>
            {article.interventions.map((item, i) => (
              <div key={i} className={styles.tableRow}>
                <span>{item.name}</span>
                <span>{item.condition}</span>
                <span>{item.method}</span>
                <Tag color={item.result === '阳性' ? 'success' : 'danger'} fill="outline">
                  {item.result}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'channels',
      icon: <TagOutline />,
      label: '频道主题',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>收录频道</span>
            <div className={styles.kwGroupTags}>
              {article.channels.map((ch, i) => (
                <Tag key={i} color="primary" fill="outline">{ch}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>主题词</span>
            <div className={styles.kwGroupTags}>
              {article.topics.map((tp, i) => (
                <Tag key={i}>{tp}</Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'attributes',
      icon: <InformationCircleOutline />,
      label: '文章属性',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.attrGrid}>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>研究类型</span>
              <span className={styles.attrGridValue}>{article.articleAttributes.researchType}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>转化阶段</span>
              <span className={styles.attrGridValue}>{article.articleAttributes.stage}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>循证等级</span>
              <span className={styles.attrGridValue}>{article.articleAttributes.evidenceLevel}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>转化方向</span>
              <span className={styles.attrGridValue}>{article.articleAttributes.direction}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>大类学科</span>
              <span className={styles.attrGridValue}>{article.articleAttributes.majorField}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>小类学科</span>
              <span className={styles.attrGridValue}>{article.articleAttributes.minorFields.join('、')}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'materials',
      icon: <UnorderedListOutline />,
      label: '实验材料',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>模型</span>
            <div className={styles.kwGroupTags}>
              {article.experimentMaterials.model.map((m, i) => (
                <Tag key={i}>{m}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>微生物</span>
            <div className={styles.kwGroupTags}>
              {article.experimentMaterials.bacteria.map((b, i) => (
                <Tag key={i} color="success" fill="outline">{b}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>细胞</span>
            <div className={styles.kwGroupTags}>
              <Tag>{article.experimentMaterials.cell}</Tag>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'clinical',
      icon: <CheckCircleOutline />,
      label: '临床试验',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.attrGrid}>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>发起方</span>
              <span className={styles.attrGridValue}>{article.clinicalTrial.sponsor}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>分组</span>
              <span className={styles.attrGridValue}>{article.clinicalTrial.grouping}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>阶段</span>
              <span className={styles.attrGridValue}>{article.clinicalTrial.phase}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>人群</span>
              <span className={styles.attrGridValue}>{article.clinicalTrial.population}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>盲法</span>
              <span className={styles.attrGridValue}>{article.clinicalTrial.blinding}</span>
            </div>
            <div className={styles.attrGridItem}>
              <span className={styles.attrGridLabel}>对照</span>
              <span className={styles.attrGridValue}>{article.clinicalTrial.control}</span>
            </div>
          </div>
          <div className={styles.clinicalLink}>
            <LinkOutline /> 注册号: {article.clinicalTrial.registrationNumber}
          </div>
        </div>
      )
    },
    {
      id: 'methods',
      icon: <BillOutline />,
      label: '实验方法',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>实验方法</span>
            <div className={styles.kwGroupTags}>
              {article.experimentMethods.map((m, i) => (
                <Tag key={i} color="primary" fill="outline">{m}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>分析软件</span>
            <div className={styles.kwGroupTags}>
              {article.analysisMethods.map((m, i) => (
                <Tag key={i}>{m}</Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'molecules',
      icon: <TransportQRcodeOutline />,
      label: '分子通路',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>生化分子</span>
            <div className={styles.kwGroupTags}>
              {article.molecules.biochemical.map((m, i) => (
                <Tag key={i}>{m}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>靶点/标志物</span>
            <div className={styles.kwGroupTags}>
              {article.molecules.targets.map((m, i) => (
                <Tag key={i} color="warning">{m}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>通路</span>
            <div className={styles.kwGroupTags}>
              {article.molecules.pathways.map((m, i) => (
                <Tag key={i} color="success">{m}</Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'outputs',
      icon: <GlobalOutline />,
      label: '产出转化',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>研究资源</span>
            <div className={styles.kwGroupTags}>
              {article.outputs.resources.map((r, i) => (
                <Tag key={i}>{r}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>相关产品</span>
            <div className={styles.kwGroupTags}>
              {article.outputs.products.map((p, i) => (
                <Tag key={i} color="success">{p}</Tag>
              ))}
            </div>
          </div>
          <div className={styles.kwGroup}>
            <span className={styles.kwGroupLabel}>相关企业</span>
            <div className={styles.kwGroupTags}>
              {article.outputs.companies.map((c, i) => (
                <Tag key={i} color="primary" fill="outline">{c}</Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contributors',
      icon: <TeamOutline />,
      label: '贡献者',
      content: (
        <div className={styles.drawerSection}>
          <div className={styles.contributorGrid}>
            {article.contributors.map((name, i) => (
              <div key={i} className={styles.contributorCard}>
                <div className={styles.contributorAvatar}>{name.charAt(0)}</div>
                <span className={styles.contributorName}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  // 打开抽屉
  const openDrawer = (item: MenuItem) => {
    setDrawerContent(item);
    setDrawerVisible(true);
  };

  // 打开AI解读弹窗
  const openAiPopup = (item: typeof article.aiInterpretation[0]) => {
    setAiPopupContent({ title: item.label, content: '' });
    setAiPopupVisible(true);
    // 找到对应内容
    const found = article.aiInterpretation.find(a => a.key === item.key);
    if (found) {
      setAiPopupContent({ title: found.label, content: aiTabKey === 'cn' ? found.cnContent : found.enContent });
    }
  };

  // 渲染链接图标
  const renderLinkIcon = (iconType: string, color: string) => {
    const iconStyle = { color, fontSize: 28 };
    switch (iconType) {
      case 'link': return <LinkOutline style={iconStyle} />;
      case 'file': return <FileOutline style={iconStyle} />;
      case 'eye': return <EyeOutline style={iconStyle} />;
      case 'content': return <ContentOutline style={iconStyle} />;
      default: return <FileOutline style={iconStyle} />;
    }
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <span className={styles.backBtn} onClick={() => router.back()}>
            <LeftOutline />
          </span>
          <span className={styles.logoR}>R</span>
          <span className={styles.logoDot}>·</span>
          <span className={styles.logoText}>base</span>
          <Tag className={styles.docTag}>文献</Tag>
        </div>
        <div className={styles.topRight}>
          <SearchOutline className={styles.topIcon} />
          <div className={styles.userAvatar}>
            <UserOutline />
          </div>
        </div>
      </div>

      {/* 可滚动内容区 */}
      <div className={styles.scrollArea}>
        <div className={styles.content}>
          {/* 期刊封面 */}
          <div className={styles.coverSection}>
            <img src={article.coverImage} alt={article.journal} className={styles.coverImage} />
          </div>

          {/* 两行宫格菜单 */}
          <div className={styles.menuSection}>
            <div className={styles.menuScroll}>
              <div className={styles.menuGrid}>
                {menuItems.slice(0, 5).map((item) => (
                  <div key={item.id} className={styles.menuItem} onClick={() => openDrawer(item)}>
                    <div className={styles.menuIcon}>{item.icon}</div>
                    <span className={styles.menuLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.menuGrid}>
                {menuItems.slice(5, 10).map((item) => (
                  <div key={item.id} className={styles.menuItem} onClick={() => openDrawer(item)}>
                    <div className={styles.menuIcon}>{item.icon}</div>
                    <span className={styles.menuLabel}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 主要作者 - 圆形头像横向滚动 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>主要作者</span>
              <span className={styles.sectionMore}>全部 <RightOutline fontSize={12} /></span>
            </div>
            <div className={styles.authorScroll}>
              {article.authors.map((author, index) => (
                <div key={index} className={styles.authorItem}>
                  <div className={styles.authorAvatar} style={{ backgroundColor: author.color }}>
                    {author.initial}
                  </div>
                  <span className={styles.authorName}>
                    {author.name}
                    {author.isCorresponding && <span className={styles.corrMark}>*</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 文章标题区域 + AI要点总结 合并为一个卡片 */}
          <div className={styles.articleCard}>
            {/* 顶部期刊信息 */}
            <div className={styles.articleTop}>
              <div className={styles.articleTopLeft}>
                <span className={styles.journalName}>{article.journal}</span>
                <span className={styles.articleType}>{article.type}</span>
              </div>
              <Tag color="primary" fill="outline" className={styles.ifTag}>IF: {article.impactFactor}</Tag>
            </div>

            {/* 中文标题 */}
            <h1 className={styles.articleTitleCn}>{article.titleCn}</h1>

            {/* 英文标题 */}
            <p className={styles.articleTitleEn}>{article.titleEn}</p>

            {/* 作者和DOI信息 */}
            <div className={styles.articleInfo}>
              <div className={styles.articleAuthors}>
                <TeamOutline className={styles.authorIcon} />
                <span>{article.authors.slice(0, 2).map(a => a.name).join(', ')}, ...</span>
              </div>
              <div className={styles.articleDoi}>
                <span className={styles.doiText}>{article.doi}</span>
                <span className={styles.dateText}>{article.publishDate}</span>
              </div>
            </div>

            {/* AI要点总结 */}
            <div className={styles.aiSection}>
              {article.aiSummary.map((item, index) => (
                <div key={index} className={styles.aiItem}>
                  <div className={styles.aiIcon}>
                    {index === 0 && <SetOutline />}
                    {index === 1 && <CheckCircleOutline />}
                    {index === 2 && <GlobalOutline />}
                    {index === 3 && <BillOutline />}
                    {index === 4 && <TagOutline />}
                    {index === 5 && <TeamOutline />}
                  </div>
                  <div className={styles.aiItemContent}>
                    <div className={styles.aiItemTitle}>{item.title}</div>
                    <div className={styles.aiItemText}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI一键解读 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>AI一键解读</span>
            </div>
            <div className={styles.aiInterpretGrid}>
              {article.aiInterpretation.map((item) => (
                <div key={item.key} className={styles.aiInterpretItem} onClick={() => openAiPopup(item)}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* 相关文章 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>相关文章</span>
              <span className={styles.sectionMore}>更多 <RightOutline fontSize={12} /></span>
            </div>
            <div className={styles.relatedList}>
              {article.relatedArticles.map((item, index) => (
                <div key={index} className={styles.relatedItem}>
                  <div className={styles.relatedMeta}>
                    <Tag color={item.type === 'Review' ? 'primary' : item.type === 'News & Views' ? 'warning' : 'default'} fill="outline">
                      {item.type}
                    </Tag>
                    <span className={styles.relatedJournal}>{item.journal} [IF:{item.impact}]</span>
                  </div>
                  <div className={styles.relatedTitle}>{item.titleCn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 相关链接 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>相关链接</span>
              <span className={styles.sectionMore}>更多 <RightOutline fontSize={12} /></span>
            </div>
            <div className={styles.linksGrid}>
              {article.links.map((link, index) => (
                <div key={index} className={styles.linkCard}>
                  <div className={styles.linkIconWrapper}>
                    {renderLinkIcon(link.icon, link.iconColor)}
                    {link.tag && <Tag color="success" className={styles.linkBadge}>{link.tag}</Tag>}
                  </div>
                  <span className={styles.linkLabel}>{link.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 相关机构 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>相关机构</span>
            </div>
            <div className={styles.institutionsGrid}>
              {article.institutions.map((inst, index) => (
                <div key={index} className={styles.institutionCard}>
                  <div className={styles.institutionAbbr}>{inst.abbr}</div>
                  <div className={styles.institutionName}>{inst.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部 AI 问答栏 */}
      <div className={styles.bottomBar}>
        <div className={styles.aiButton}>
          <StarOutline />
          <span>AI问答</span>
        </div>
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="输入问题，对话权威文献" className={styles.inputField} />
          <div className={styles.sendButton}><SendOutline /></div>
        </div>
      </div>

      {/* 右侧抽屉 */}
      <Popup
        visible={drawerVisible}
        onMaskClick={() => setDrawerVisible(false)}
        position="right"
        bodyStyle={{ width: '80vw', maxWidth: '320px' }}
      >
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>{drawerContent?.label}</span>
            <span className={styles.drawerClose} onClick={() => setDrawerVisible(false)}>×</span>
          </div>
          <div className={styles.drawerBody}>
            {drawerContent?.content}
          </div>
        </div>
      </Popup>

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
    </div>
  );
}
