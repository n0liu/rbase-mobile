'use client';

import { useState, useRef } from 'react';
import { NavBar, Tag, Space } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import {
  LeftOutline,
  RightOutline,
  StarOutline,
  SendOutline,
  EditSOutline,
  DownOutline,
  UpOutline,
  FileOutline,
  TeamOutline,
  AppstoreOutline,
  SetOutline,
  EnvironmentOutline,
  InformationCircleOutline,
  ContentOutline,
  CheckCircleOutline,
  ClockCircleOutline,
  LinkOutline,
  UserOutline
} from 'antd-mobile-icons';
import styles from './page.module.css';

// 可折叠卡片组件
interface CollapsibleCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  accentColor?: string;
  count?: number;
}

function CollapsibleCard({
  id,
  title,
  icon,
  children,
  defaultExpanded = false,
  accentColor = 'var(--rbase-color-primary)',
  count
}: CollapsibleCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      id={id}
      className={styles.collapsibleCard}
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div
        className={styles.cardHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <span className={styles.cardIcon}>{icon}</span>
        <span className={styles.cardTitle}>{title}</span>
        {count !== undefined && (
          <span className={styles.cardCount}>{count}</span>
        )}
        <span className={styles.expandIcon}>
          {expanded ? <UpOutline /> : <DownOutline />}
        </span>
      </div>
      <div className={`${styles.cardContent} ${expanded ? styles.expanded : ''}`}>
        <div className={styles.cardInner}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ArticleV3Page() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // 完整的文献数据 (与V1、V2一致)
  const article = {
    title: "Gut microbiota modulates innate immunity in the small intestine through a B cell-Myd88 signaling pathway",
    titleCn: "肠道菌群通过B细胞-MyD88信号通路调节小肠先天性免疫",
    journal: "Nature Communications",
    year: "2024",
    volume: "15",
    issue: "1",
    pages: "1234-1245",
    doi: "10.1038/s41467-024-12345-6",
    impactFactor: "16.6",
    quartile: "Q1",
    isOpenAccess: true,
    pubDate: "2024-03-15",
    authors: [
      { name: "Zhang Wei", nameCn: "张伟", avatar: "https://via.placeholder.com/80/ff7b00/ffffff?text=ZW", institution: "Stanford University", isCorresponding: true },
      { name: "Li Ming", nameCn: "李明", avatar: "https://via.placeholder.com/80/5fca96/ffffff?text=LM", institution: "MIT", isCorresponding: false },
      { name: "Wang Fang", nameCn: "王芳", avatar: "https://via.placeholder.com/80/0072f5/ffffff?text=WF", institution: "Harvard University", isCorresponding: false },
      { name: "Chen Lei", nameCn: "陈磊", avatar: "https://via.placeholder.com/80/9333ea/ffffff?text=CL", institution: "Peking University", isCorresponding: true },
      { name: "Liu Yang", nameCn: "刘洋", avatar: "https://via.placeholder.com/80/ec4899/ffffff?text=LY", institution: "Tsinghua University", isCorresponding: false }
    ],
    abstract: "The gut microbiota plays a crucial role in regulating host immunity. Here, we demonstrate that commensal bacteria modulate innate immune responses in the small intestine through a B cell-dependent mechanism involving the MyD88 signaling pathway...",
    abstractCn: "肠道菌群在调节宿主免疫中发挥关键作用。本研究表明，共生细菌通过依赖B细胞的机制，通过MyD88信号通路调节小肠的先天性免疫反应...",
    aiInterpretation: [
      "原文摘要",
      "创新要点",
      "科普解读",
      "专家点评",
      "热心肠日报解读",
      "研究背景与假设",
      "主要方法与结果",
      "研究结论与意义",
      "研究局限性",
      "后续研究方向"
    ],
    keywords: {
      core: ["肠道菌群", "益生菌", "免疫调节", "MyD88信号通路", "B细胞"],
      extended: ["肠道健康", "微生物组", "先天免疫", "适应性免疫", "黏膜免疫"],
      ai: ["肠道微生态", "免疫平衡", "炎症反应", "肠道屏障"],
      artificial: ["炎症性肠病", "肠易激综合征", "代谢综合征"],
      mesh: ["Hepatitis B, Chronic", "Haplorhinl", "Fedratinib Methanesulfonate"]
    },
    interventions: [
      { name: "菊粉", condition: "脂肪肝", method: "动物实验", result: "阳性" },
      { name: "益生菌LGG", condition: "肠炎", method: "临床试验", result: "阳性" },
      { name: "粪菌移植", condition: "CDI感染", method: "临床试验", result: "阳性" },
      { name: "抗生素", condition: "菌群失调", method: "动物实验", result: "阴性" }
    ],
    channels: ["微生物（组）", "营养", "消化", "免疫", "代谢"],
    hotGutTopics: ["益生菌", "菌群移植", "肠道免疫", "短链脂肪酸"],
    articleAttributes: {
      researchType: "基础研究",
      stage: "动物实验",
      evidenceLevel: "Ⅱ级",
      direction: "正向/阳性",
      majorField: "免疫学",
      minorFields: ["微生物学", "消化病学"],
      fundingSource: "国家自然科学基金"
    },
    experimentMaterials: {
      model: ["C57BL/6小鼠", "MyD88-/-小鼠", "无菌小鼠"],
      bacteria: ["大肠杆菌 Nissle 1917", "乳酸杆菌 LGG", "双歧杆菌 BB-12"],
      cell: "293T"
    },
    clinicalTrial: {
      sponsor: "斯坦福大学医学院",
      grouping: "随机分组",
      phase: "II期",
      population: "成人（18-65岁）",
      blinding: "双盲",
      control: "安慰剂对照",
      route: "口服",
      duration: "12周",
      frequency: "每日一次",
      dosage: "1×10^9 CFU",
      primaryEndpoint: "肠道炎症评分变化",
      secondaryEndpoints: ["菌群多样性", "免疫细胞比例", "细胞因子水平"],
      adverseEvents: "轻度腹胀（5%）",
      registrationNumber: "NCT04567890",
      ethicsApproval: "IRB-2024-001"
    },
    experimentMethods: [
      "16S rDNA测序",
      "液相色谱-质谱联用（LC-MS）",
      "RNA测序（RNA-seq）",
      "流式细胞术（FACS）",
      "Western Blot",
      "qRT-PCR",
      "免疫组化（IHC）",
      "ELISA"
    ],
    analysisSoftware: ["SPSS", "GraphPad Prism", "R语言", "QIIME2"],
    molecules: [
      { name: "PD-1", type: "蛋白" },
      { name: "CTLA-4", type: "蛋白" },
      { name: "IL-6", type: "细胞因子" },
      { name: "TNF-α", type: "细胞因子" },
      { name: "MyD88", type: "信号分子" },
      { name: "NF-κB", type: "转录因子" }
    ],
    outputs: {
      patents: ["CN202410001234.5 - 一种调节肠道免疫的益生菌组合物"],
      products: ["益生菌胶囊（临床前）"],
      guidelines: ["肠道菌群调节免疫的临床应用指南（草案）"]
    },
    contributors: [
      { name: "mCloud", role: "录入", avatar: "https://via.placeholder.com/40/0072f5/ffffff?text=M" },
      { name: "王教授", role: "审核", avatar: "https://via.placeholder.com/40/5fca96/ffffff?text=王" },
      { name: "AI助手", role: "解读", avatar: "https://via.placeholder.com/40/ff7b00/ffffff?text=AI" }
    ]
  };

  // 导航章节配置
  const sections = [
    { id: 'keywords', label: '关键词', icon: <AppstoreOutline /> },
    { id: 'interventions', label: '干预', icon: <SetOutline /> },
    { id: 'channels', label: '频道', icon: <EnvironmentOutline /> },
    { id: 'attributes', label: '属性', icon: <InformationCircleOutline /> },
    { id: 'materials', label: '材料', icon: <ContentOutline /> },
    { id: 'clinical', label: '临床', icon: <CheckCircleOutline /> },
    { id: 'methods', label: '方法', icon: <SetOutline /> },
    { id: 'molecules', label: '分子', icon: <ClockCircleOutline /> },
    { id: 'outputs', label: '转化', icon: <LinkOutline /> },
    { id: 'contributors', label: '贡献', icon: <UserOutline /> }
  ];

  // 滚动到指定章节
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      const headerHeight = 56;
      const elementTop = element.offsetTop - headerHeight - 12;
      contentRef.current.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <div className={styles.topBar}>
        <NavBar
          onBack={() => router.back()}
          className={styles.navbar}
          right={
            <Space>
              <StarOutline fontSize={20} />
              <SendOutline fontSize={20} />
            </Space>
          }
        >
          文献详情 V3
        </NavBar>
      </div>

      {/* 中间滚动区域 */}
      <div className={styles.scrollArea} ref={contentRef}>
        {/* 文章基本信息卡片 - 始终展开 */}
        <div className={styles.heroCard}>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleTitleCn}>{article.titleCn}</p>

          <div className={styles.metaInfo}>
            <div className={styles.journalInfo}>
              <span className={styles.journalName}>{article.journal}</span>
              <span className={styles.journalYear}>{article.year}</span>
            </div>
            <Space className={styles.tags}>
              {article.isOpenAccess && <Tag color="primary">OA</Tag>}
              <Tag color="success">IF {article.impactFactor}</Tag>
              <Tag color="warning">{article.quartile}</Tag>
            </Space>
          </div>

          {/* 作者横向滚动 */}
          <div className={styles.authorsScroll}>
            {article.authors.map((author, index) => (
              <div key={index} className={styles.authorChip}>
                <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                <span className={styles.authorName}>{author.nameCn}</span>
                {author.isCorresponding && <span className={styles.corrMark}>*</span>}
              </div>
            ))}
          </div>
        </div>

        {/* AI解读 - 默认展开 */}
        <CollapsibleCard
          id="ai-interpretation"
          title="AI智能解读"
          icon={<EditSOutline />}
          defaultExpanded={true}
          accentColor="var(--rbase-color-accent)"
          count={article.aiInterpretation.length}
        >
          <div className={styles.aiDisclaimer}>
            <InformationCircleOutline /> 以下内容由AI生成，仅供参考
          </div>
          <div className={styles.interpretGrid}>
            {article.aiInterpretation.map((item, index) => (
              <div key={index} className={styles.interpretItem}>
                <RightOutline className={styles.interpretIcon} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CollapsibleCard>

        {/* 关键词 */}
        <CollapsibleCard
          id="keywords"
          title="关键词"
          icon={<AppstoreOutline />}
          defaultExpanded={false}
          accentColor="var(--rbase-color-primary)"
          count={Object.values(article.keywords).flat().length}
        >
          <div className={styles.keywordsSection}>
            <div className={styles.kwRow}>
              <span className={styles.kwLabel}>核心关键词</span>
              <Space wrap>
                {article.keywords.core.map((kw, i) => (
                  <Tag key={i} color="primary">{kw}</Tag>
                ))}
              </Space>
            </div>
            <div className={styles.kwRow}>
              <span className={styles.kwLabel}>扩展关键词</span>
              <Space wrap>
                {article.keywords.extended.map((kw, i) => (
                  <Tag key={i} color="default" fill="outline">{kw}</Tag>
                ))}
              </Space>
            </div>
            <div className={styles.kwRow}>
              <span className={styles.kwLabel}>AI生成</span>
              <Space wrap>
                {article.keywords.ai.map((kw, i) => (
                  <Tag key={i} color="warning" fill="outline">{kw}</Tag>
                ))}
              </Space>
            </div>
            <div className={styles.kwRow}>
              <span className={styles.kwLabel}>MeSH词</span>
              <Space wrap>
                {article.keywords.mesh.map((kw, i) => (
                  <Tag key={i} color="success" fill="outline">{kw}</Tag>
                ))}
              </Space>
            </div>
          </div>
        </CollapsibleCard>

        {/* 治疗与干预措施 */}
        <CollapsibleCard
          id="interventions"
          title="治疗与干预措施"
          icon={<SetOutline />}
          defaultExpanded={false}
          accentColor="var(--rbase-color-success)"
          count={article.interventions.length}
        >
          <div className={styles.interventionTable}>
            <div className={styles.tableHeader}>
              <span>干预物</span>
              <span>疾病/状态</span>
              <span>方法</span>
              <span>结果</span>
            </div>
            {article.interventions.map((item, index) => (
              <div key={index} className={styles.tableRow}>
                <span>{item.name}</span>
                <span>{item.condition}</span>
                <span>{item.method}</span>
                <Tag
                  color={item.result === '阳性' ? 'success' : 'danger'}
                  fill="outline"
                  style={{ fontSize: '10px' }}
                >
                  {item.result}
                </Tag>
              </div>
            ))}
          </div>
        </CollapsibleCard>

        {/* 收录频道和主题词 */}
        <CollapsibleCard
          id="channels"
          title="收录频道和主题词"
          icon={<EnvironmentOutline />}
          defaultExpanded={false}
          accentColor="#9333ea"
        >
          <div className={styles.channelSection}>
            <div className={styles.channelRow}>
              <span className={styles.channelLabel}>收录频道</span>
              <Space wrap>
                {article.channels.map((ch, i) => (
                  <Tag key={i} color="primary" fill="outline">{ch}</Tag>
                ))}
              </Space>
            </div>
            <div className={styles.channelRow}>
              <span className={styles.channelLabel}>热心肠主题</span>
              <Space wrap>
                {article.hotGutTopics.map((topic, i) => (
                  <Tag key={i} color="warning">{topic}</Tag>
                ))}
              </Space>
            </div>
          </div>
        </CollapsibleCard>

        {/* 文章属性 */}
        <CollapsibleCard
          id="attributes"
          title="文章属性"
          icon={<InformationCircleOutline />}
          defaultExpanded={false}
          accentColor="#0ea5e9"
        >
          <div className={styles.attributeGrid}>
            <div className={styles.attrItem}>
              <span className={styles.attrLabel}>研究类型</span>
              <span className={styles.attrValue}>{article.articleAttributes.researchType}</span>
            </div>
            <div className={styles.attrItem}>
              <span className={styles.attrLabel}>研究阶段</span>
              <span className={styles.attrValue}>{article.articleAttributes.stage}</span>
            </div>
            <div className={styles.attrItem}>
              <span className={styles.attrLabel}>证据等级</span>
              <span className={styles.attrValue}>{article.articleAttributes.evidenceLevel}</span>
            </div>
            <div className={styles.attrItem}>
              <span className={styles.attrLabel}>研究方向</span>
              <span className={styles.attrValue}>{article.articleAttributes.direction}</span>
            </div>
            <div className={styles.attrItem}>
              <span className={styles.attrLabel}>主要领域</span>
              <span className={styles.attrValue}>{article.articleAttributes.majorField}</span>
            </div>
            <div className={styles.attrItem}>
              <span className={styles.attrLabel}>资助来源</span>
              <span className={styles.attrValue}>{article.articleAttributes.fundingSource}</span>
            </div>
          </div>
        </CollapsibleCard>

        {/* 实验材料和对象 */}
        <CollapsibleCard
          id="materials"
          title="实验材料和对象"
          icon={<ContentOutline />}
          defaultExpanded={false}
          accentColor="#f59e0b"
        >
          <div className={styles.materialSection}>
            <div className={styles.materialRow}>
              <span className={styles.materialLabel}>动物模型</span>
              <Space wrap>
                {article.experimentMaterials.model.map((m, i) => (
                  <Tag key={i} fill="outline">{m}</Tag>
                ))}
              </Space>
            </div>
            <div className={styles.materialRow}>
              <span className={styles.materialLabel}>细菌/菌株</span>
              <Space wrap>
                {article.experimentMaterials.bacteria.map((b, i) => (
                  <Tag key={i} color="success" fill="outline">{b}</Tag>
                ))}
              </Space>
            </div>
            <div className={styles.materialRow}>
              <span className={styles.materialLabel}>细胞系</span>
              <Tag fill="outline">{article.experimentMaterials.cell}</Tag>
            </div>
          </div>
        </CollapsibleCard>

        {/* 临床试验信息 */}
        <CollapsibleCard
          id="clinical"
          title="临床试验信息"
          icon={<CheckCircleOutline />}
          defaultExpanded={false}
          accentColor="#ec4899"
        >
          <div className={styles.clinicalGrid}>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>申办方</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.sponsor}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>分组方式</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.grouping}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>试验分期</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.phase}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>受试人群</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.population}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>盲法</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.blinding}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>对照</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.control}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>给药途径</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.route}</span>
            </div>
            <div className={styles.clinicalItem}>
              <span className={styles.clinicalLabel}>疗程</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.duration}</span>
            </div>
            <div className={styles.clinicalItemFull}>
              <span className={styles.clinicalLabel}>主要终点</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.primaryEndpoint}</span>
            </div>
            <div className={styles.clinicalItemFull}>
              <span className={styles.clinicalLabel}>次要终点</span>
              <span className={styles.clinicalValue}>{article.clinicalTrial.secondaryEndpoints.join('、')}</span>
            </div>
            <div className={styles.clinicalLink}>
              <LinkOutline /> 注册号: {article.clinicalTrial.registrationNumber}
            </div>
          </div>
        </CollapsibleCard>

        {/* 实验方法 */}
        <CollapsibleCard
          id="methods"
          title="实验方法"
          icon={<SetOutline />}
          defaultExpanded={false}
          accentColor="#14b8a6"
          count={article.experimentMethods.length}
        >
          <Space wrap>
            {article.experimentMethods.map((method, i) => (
              <Tag key={i} color="primary" fill="outline">{method}</Tag>
            ))}
          </Space>
          <div className={styles.subSection}>
            <span className={styles.subLabel}>分析软件</span>
            <Space wrap>
              {article.analysisSoftware.map((sw, i) => (
                <Tag key={i} fill="outline">{sw}</Tag>
              ))}
            </Space>
          </div>
        </CollapsibleCard>

        {/* 分子/通路 */}
        <CollapsibleCard
          id="molecules"
          title="分子/通路"
          icon={<ClockCircleOutline />}
          defaultExpanded={false}
          accentColor="#8b5cf6"
          count={article.molecules.length}
        >
          <div className={styles.moleculeGrid}>
            {article.molecules.map((mol, i) => (
              <div key={i} className={styles.moleculeItem}>
                <span className={styles.moleculeName}>{mol.name}</span>
                <Tag fill="outline" style={{ fontSize: '10px' }}>{mol.type}</Tag>
              </div>
            ))}
          </div>
        </CollapsibleCard>

        {/* 产出与转化 */}
        <CollapsibleCard
          id="outputs"
          title="产出与转化"
          icon={<LinkOutline />}
          defaultExpanded={false}
          accentColor="#f43f5e"
        >
          <div className={styles.outputSection}>
            {article.outputs.patents.length > 0 && (
              <div className={styles.outputRow}>
                <span className={styles.outputLabel}>相关专利</span>
                {article.outputs.patents.map((p, i) => (
                  <div key={i} className={styles.outputItem}>{p}</div>
                ))}
              </div>
            )}
            {article.outputs.products.length > 0 && (
              <div className={styles.outputRow}>
                <span className={styles.outputLabel}>产品开发</span>
                {article.outputs.products.map((p, i) => (
                  <Tag key={i} color="success">{p}</Tag>
                ))}
              </div>
            )}
            {article.outputs.guidelines.length > 0 && (
              <div className={styles.outputRow}>
                <span className={styles.outputLabel}>指南规范</span>
                {article.outputs.guidelines.map((g, i) => (
                  <div key={i} className={styles.outputItem}>{g}</div>
                ))}
              </div>
            )}
          </div>
        </CollapsibleCard>

        {/* 内容贡献者 */}
        <CollapsibleCard
          id="contributors"
          title="内容贡献者"
          icon={<UserOutline />}
          defaultExpanded={false}
          accentColor="#64748b"
          count={article.contributors.length}
        >
          <div className={styles.contributorList}>
            {article.contributors.map((c, i) => (
              <div key={i} className={styles.contributorItem}>
                <img src={c.avatar} alt={c.name} className={styles.contributorAvatar} />
                <span className={styles.contributorName}>{c.name}</span>
                <Tag fill="outline" style={{ fontSize: '10px' }}>{c.role}</Tag>
              </div>
            ))}
          </div>
        </CollapsibleCard>
      </div>

      {/* 底部快捷导航 */}
      <div className={styles.bottomNav}>
        <div className={styles.navScroll}>
          {sections.map((section) => (
            <div
              key={section.id}
              className={styles.navItem}
              onClick={() => scrollToSection(section.id)}
            >
              <span className={styles.navIcon}>{section.icon}</span>
              <span className={styles.navLabel}>{section.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
