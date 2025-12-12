'use client';

import { useState, useRef } from 'react';
import { Tag, Dialog, Popup, Tabs, ErrorBlock } from 'antd-mobile';
import Image from 'next/image';
import { MoreOutline } from 'antd-mobile-icons';
import TopNavigationBar from '@/components/layout/TopNavigationBar';
import RelatedSection from '@/components/RelatedSection';
import FloatingButton from '@/components/FloatingButton';
import SectionTitle from '@/components/SectionTitle';
import styles from './page.module.css';
import BackToTop from '@/components/BackToTop';

export default function ArticleV1Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [aiTabKey, setAiTabKey] = useState('cn');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('关键词');
  const [aiTipVisible, setAiTipVisible] = useState(false);
  const [aiReadPopupVisible, setAiReadPopupVisible] = useState(false);
  const [aiReadType, setAiReadType] = useState('summary');

  const article = {
    type: "ARTICLE",
    journal: "Nature Metabolism",
    impactFactor: "20.8",
    isOpenAccess: true,
    titleCn: "Nature子刊：菊粉促益生菌→小肠耗果糖→拯救脂肪肝",
    subtitleCn: "膳食纤维诱导的肠道菌群清除膳食中的果糖，并逆转脂肪肝",
    titleEn: "Dietary fibre-adapted gut microbiome clears dietary fructose and reverses hepatic steatosis",
    doi: "10.1038/s43587-025-00947-6",
    publishDate: "2025-9-1",
    source: "Gut Microbes",
    authors: [
      { name: "张发明", avatar: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" },
      { name: "T. Borody", avatar: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" },
      { name: "A. Khoruts", avatar: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" },
      { name: "C. Kelly", avatar: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" },
      { name: "Z. Kassam", avatar: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" },
    ],
    aiSummary: {
      summary: [
        { num: 1, title: "研究设计与方法", content: "该研究通过小鼠模型，结合同位素示踪、代谢组学和微生物组移植等技术，探究膳食纤维菊粉对高果葡糖浆（HFCS）诱导的代谢功能障碍相关脂肪性肝病（MASLD）的干预效果与机制。" },
        { num: 2, title: "核心发现", content: "补充菊粉不仅能预防，还能逆转由HFCS引起的肝脏脂肪变性、纤维化和胰岛素抵抗，其关键在于重塑肠道菌群的功能，使其能主动清除膳食果糖。" },
        { num: 3, title: "小肠菌群清糖机制", content: "菊粉能特异性促进小肠菌群分解膳食果糖，从而显著减少果糖溢出至肝脏和结肠，从源头抑制肝脏从头脂肪生成（DNL）。" },
        { num: 4, title: "肝脏代谢重塑机制", content: "菊粉还将肝脏内的果糖代谢碳流从DNL转向丝氨酸和甘氨酸的从头合成，进而增强谷胱甘肽生成，有效对抗果糖诱导的肝脏脂质过氧化损伤。" },
      ]
    },
    aiInterpretation: {
      summary: {
        title: '原文摘要',
        cnContent: '人类微生物组在维持稳态及影响疾病发生发展中发挥关键作用，但其组成随地域、年龄和生活方式而显著变化。这些差异制约了广谱益生菌疗法的疗效，亟需发展更具个体化或区域适应性的干预策略。本文综述了广谱益生菌应用的局限性，着重强调宿主-微生物共适应、本地膳食习惯及生态背景的重要性。我们认为，益生菌设计必须兼顾微生物多样性、菌株水平的适应性以及功能冗余性，并探讨上述因素对定植成功率及治疗潜力的影响。最后，我们讨论如何将微生物组知识重新置于多元化的生态、文化及认知传统框架之中，以构建一种全球性、包容性的研究范式，从而推动兼具有效性与可及性的微生物组靶向疗法的发展。',
        enContent: 'The human microbiome plays a crucial role in maintaining homeostasis and influencing disease development, yet its composition varies across geography, age, and lifestyle. These differences undermine the efficacy of broad-spectrum probiotic therapies, highlighting the need for more personalized or regionally adapted intervention strategies.'
      },
      innovation: {
        title: '创新要点',
        cnContent: '本研究首次系统揭示了膳食纤维菊粉通过重塑肠道菌群功能来清除膳食果糖的机制，为开发基于膳食纤维的脂肪肝预防和治疗策略提供了重要的理论基础。',
        enContent: 'This study is the first to systematically reveal the mechanism by which dietary fiber inulin clears dietary fructose by reshaping gut microbiota function.'
      },
      popular: {
        title: '科普解读',
        cnContent: '简单来说，这项研究发现吃菊粉（一种膳食纤维）可以帮助肠道里的好细菌把果糖吃掉，从而保护肝脏，预防脂肪肝。这就像给肠道请来了一群"清洁工"，专门负责清理多余的糖分。',
        enContent: 'Simply put, eating inulin (a dietary fiber) can help good bacteria in the gut consume fructose, thereby protecting the liver and preventing fatty liver disease.'
      },
      background: {
        title: '研究背景',
        cnContent: '脂肪肝已成为全球最常见的慢性肝病之一，高果糖饮食被认为是重要诱因。然而，目前缺乏有效的干预措施。膳食纤维作为一种天然的营养素，能够调节肠道菌群，可能对脂肪肝有积极作用。',
        enContent: 'Fatty liver has become one of the most common chronic liver diseases worldwide, with high-fructose diet considered an important contributing factor.'
      },
      method: {
        title: '研究方法',
        cnContent: '研究采用小鼠模型，通过16S rRNA测序、代谢组学分析、同位素示踪等技术进行系统研究，结合肠道菌群移植实验验证菊粉的保护作用机制。',
        enContent: 'The study used mouse models and conducted systematic research through 16S rRNA sequencing, metabolomics analysis, and isotope tracing techniques.'
      },
      prospect: {
        title: '转化前景',
        cnContent: '该研究为开发基于膳食纤维的脂肪肝预防和治疗策略提供了重要的理论基础，未来可能开发出针对性的益生元或益生菌制剂用于临床干预。',
        enContent: 'This research provides an important theoretical basis for developing dietary fiber-based strategies for preventing and treating fatty liver disease.'
      },
      framework: {
        title: '文章框架',
        cnContent: '文章分为引言、方法、结果、讨论四个主要部分。引言部分阐述研究背景；方法部分详细描述实验设计；结果部分展示关键发现；讨论部分解释机制并展望应用前景。',
        enContent: 'The article is divided into four main sections: introduction, methods, results, and discussion.'
      },
      figures: {
        title: '图表解读',
        cnContent: '图1展示了菊粉对小鼠肝脏脂肪含量的影响；图2揭示了肠道菌群组成的变化；图3说明了果糖代谢途径的改变；图4展示了关键菌种的作用机制。',
        enContent: 'Figure 1 shows the effect of inulin on liver fat content in mice; Figure 2 reveals changes in gut microbiota composition.'
      },
      limitation: {
        title: '局限性',
        cnContent: '本研究主要基于小鼠模型，需要进一步的人体临床试验来验证结果的普适性。此外，不同个体的肠道菌群差异可能影响菊粉的效果，需要个体化的研究。',
        enContent: 'This study is mainly based on mouse models and requires further human clinical trials to verify the universality of the results.'
      }
    },
    figures: [
      { id: 1, label: "Fig.1" },
      { id: 2, label: "Fig.2" },
    ],
    relatedArticles: [
      {
        type: "Review",
        journal: "Gut Microbes",
        impact: "12.2",
        titleCn: "Science：用化学遗传学方法，解析健康与疾病中的菌群机制（综述）",
        titleEn: "How do bacterial infections in bowel cancer affect the immune system and DNA damage?"
      },
      {
        type: "News & Views",
        journal: "Gut Microbes",
        impact: "12.2",
        titleCn: "Nature Reviews：FMT和益生菌干预预后考虑潜在风险",
        titleEn: "How do bacterial infections in bowel cancer affect the immune system and DNA damage?"
      },
      {
        type: "Article",
        journal: "Gut Microbes",
        impact: "12.2",
        titleCn: "艾克/何真/毛仁/来书Cell子刊：菌群如何影响克罗恩病中的'爬行脂肪'形成?",
        titleEn: "How do bacterial infections in bowel cancer affect the immune system and DNA damage?"
      }
    ],
    institutions: [
      { logo: "https://cdn.mr-gut.cn/rbase_2408/institution_detail/logo/20250905/54d64a4dcf7b41b8b774b16ce6ad456d.png", name: "南京医科大学康达学院" },
      { logo: "https://cdn.mr-gut.cn/rbase_2408/institution_detail/logo/20250701/b9ca05f28dbc45b698ed69adb6c112a1.png", name: "华中农业大学植物科学技术学院" },
      { logo: "https://cdn.mr-gut.cn/rbase_2408/institution_detail/logo/20251031/d44d86f0060c435285143c293992af61.png", name: "上海承葛生物科技有限公司" },
      { logo: "https://cdn.mr-gut.cn/rbase_2408/institution_detail/logo/20250905/54d64a4dcf7b41b8b774b16ce6ad456d.png", name: "南京医科大学康达学院" },
    ],
    links: [
      { logo: "https://cdn.mr-gut.cn/rbase_2408/journals/publisher/Taylor and Francis.png", name: "出版社原文" },
      { logo: "https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/pdf-icon2.png", name: "PDF下载" },
    ],
  };

  const structureMenus = ['关键词', '临床试验', '治疗措施', '文章属性', '实验材料', '实验方法', '分析软件', '分子通路', '产出转化', '收录频道', '贡献者'];

  const structureData: Record<string, { title: string; tags: string[] }[]> = {
    '关键词': [
      { title: '核心', tags: ['菊粉', '益生菌', '小肠', '果糖', '脂肪肝', '膳食纤维'] },
      { title: '原文', tags: ['肠道菌群', 'hepatic steatosis', '期刊 | Nature Metabolism', '膳食纤维', '从头脂肪生成', '高果糖糖浆', 'MASLD', '代谢组学', '同位素示踪'] },
      { title: 'AI', tags: ['代谢功能障碍', 'B. acidifaciens', '谷胱甘肽', '肝脏脂质过氧化', '酶免疫组抗'] },
      { title: '人工', tags: ['菌群移植', '产酸拟杆菌', '益菌素', '甘氨酸'] },
      { title: 'MeSH', tags: ['Fructose', 'Inulin', 'Fatty Liver', 'Probiotics'] },
    ],
    '临床试验': [],
    '治疗措施': [
      { title: '治疗与干预措施', tags: ['菊粉', '脂肪肝', '动物实验', '阳性', '抗生素', '便秘', '人体临床试验', '阴性'] },
    ],
    '文章属性': [
      { title: '文章属性', tags: ['研究类型', '干预性研究', '研究等级', '动物研究', '转化方向', '药物开发', '大类学科', '医学', '小类学科', '传染病学', '外科', '研究基金', '国自然NSFC8888888（中国）', 'NIH666666（美国）'] },
    ],
    '实验材料': [
      { title: '实验/试验材料和对象', tags: ['模型', '小鼠', '部位', '肝脏', '小肠', '细胞', '293T', '细菌类', '产酸拟杆菌', '动物双歧杆菌Bb-12', '鼠李糖乳杆菌GG'] },
    ],
    '实验方法': [
      { title: '实验方法', tags: ['16S rDNA测序', '液相色谱-质谱联用（LC-MS）', '逆转录定量聚合酶链式反应（qPCR）', 'RNA序列分析（RNA-seq）', '16S rRNA基因扩增子测序分析（16S）', '同位素示踪', '组织学分析', '苏木精-伊红染色（H&E）', '三色染色', '免疫荧光成像', '间接免疫', '回波磁共振成像（EchoMRI）', '脂肪酸氧化（FAO）', '线粒体和脂肪分离', '线粒体', '线粒体DNA分析（mtDNA）', '蛋白质蛋白酶抑制', '酶联免疫吸附测定（ELISA）'] },
    ],
    '分析软件': [
      { title: '分析方法/软件', tags: ['回归分析', '贝叶斯统计方法', 'SPSS', 'QIIME2'] },
    ],
    '分子通路': [
      { title: '分子/通路', tags: ['生化分子', '谷胱甘肽', '短链脂肪酸', '果糖', '抗生素', '配点/靶分子', 'PD-1', 'CTLA-4', '生物学通路', 'JAK-STAT'] },
    ],
    '产出转化': [
      { title: '产出与转化', tags: ['研究资源', '中国健康人益生菌菌库', '相关产品', '冠益乳酸奶', '优益C乳酸菌饮料', '优益C益生菌固体饮料', '相关企业', '蒙牛乳业', '科拓生物', '华润江中', '相关品牌', '蒙牛', '优益C', '益适优', '尚品'] },
    ],
    '收录频道': [
      { title: '热心肠日报', tags: ['微生物（组）', '营养', '消化系统疾病', '治疗', '免疫', '医药协议'] },
      { title: '全球益生菌/益生元循证数据库（HOPE）', tags: ['益生菌', '益生元', '膳食纤维', '合生制剂', '发酵食品', '后生元'] },
      { title: '保健食品循证库', tags: ['药食同源', '保生元', '扩展', '植物提取物', '技术方法', '元一健康'] },
    ],
    '贡献者': [
      { title: '内容贡献者', tags: ['白细胞战_007', 'PaperSlayer_张', '医学僧不是和尚', '爱吃烧烤的Dr_Li', 'FMT冲锋队员', '细胞观察员-Wang', '熬夜写论述的me', '菌群研究员9527'] },
    ],
  };

  const openAiRead = (type: string) => {
    setAiReadType(type);
    setAiReadPopupVisible(true);
    setAiTabKey('cn');
  };

  const getAiReadTitle = () => {
    const typeMap: { [key: string]: string } = {
      summary: '原文摘要',
      innovation: '创新要点',
      popular: '科普解读',
      background: '研究背景',
      method: '研究方法',
      prospect: '转化前景',
      framework: '文章框架',
      figures: '图表解读',
      limitation: '局限性'
    };
    return typeMap[aiReadType] || '';
  };

  const getCurrentAiReadContent = () => {
    const content = article.aiInterpretation[aiReadType as keyof typeof article.aiInterpretation];
    if (content && typeof content === 'object' && 'cnContent' in content && 'enContent' in content) {
      return aiTabKey === 'cn' ? content.cnContent : content.enContent;
    }
    return '';
  };

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

              {/* 1. Hero Section (Clean) */}
          <div className={styles.titleSection}>
            
            <div className={styles.journalRow}>
              <span className={styles.articleTypeTag}>{article.type}</span>
              <span className={styles.journalSeparator}>&gt;</span>
              <span className={styles.journalName}>{article.journal}</span>
              <span className={styles.ifTagBracket}>[IF:{article.impactFactor}]</span>
            </div>

            <h1 className={styles.titleCn}>{article.titleCn}</h1>
            <p className={styles.titleEn}>{article.titleEn}</p>
            
            <div className={styles.citationRow}>
              {article.journal}.{article.publishDate};17(1):{article.doi.split('/').pop()}.doi:{article.doi}.
              <Image src="/icons/copy.svg" alt="copy" width={16} height={16} className={styles.actionIcon} />
              <Image src="/icons/share.svg" alt="share" width={16} height={16} className={styles.actionIcon} />
              <Image src="/icons/quote.svg" alt="quote" width={16} height={16} className={styles.actionIcon} />
              <Image src="/icons/star.svg" alt="star" width={16} height={16} className={styles.actionIcon} />
            </div>
            
          </div>
            
          {/* 2. Author Box (Clean Grid) */}
          <div className={styles.authorBox}>
            <SectionTitle
              extra={
                <span className={styles.authorViewAll}>
                  <Image src="/icons/team.svg" alt="team" width={14} height={14} className={styles.teamIcon} />
                  全部
                </span>
              }
            >
              主要作者
            </SectionTitle>
            <div className={styles.authorGrid}>
              {(() => {
                const MAX_DISPLAY = 10;
                const showMoreButton = article.authors.length > MAX_DISPLAY;
                const displayAuthors = showMoreButton 
                  ? article.authors.slice(0, MAX_DISPLAY - 1) 
                  : article.authors.slice(0, MAX_DISPLAY);

                return (
                  <>
                    {displayAuthors.map((author, index) => (
                      <div key={index} className={styles.authorItem}>
                        <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                        <span className={styles.authorName}>{author.name}</span>
                      </div>
                    ))}
                    {showMoreButton && (
                      <div className={styles.authorItem} onClick={() => { /* Handle view all */ }}>
                        <div className={styles.moreAuthorsBtn}><MoreOutline /></div>
                        <span className={styles.moreAuthorsText}>更多</span>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {/* 3. Timeline Content (Originally AI Summary) */}
          <div className={styles.aiSection}>
            <SectionTitle
              extra={
                <span className={styles.aiCorrect}>
                  <Image src="/icons/edit.svg" alt="edit" width={14} height={14} className={styles.editIcon} />
                  纠错
                </span>
              }
            >
              AI要点总结
            </SectionTitle>
            <div className={styles.aiContent}>
              {article.aiSummary.summary.map((item, index) => (
                <div key={index} className={styles.aiItem}>
                  <div className={styles.aiNum}>
                     {/* Using Icon placeholders based on index, or simple numbers for V1 */}
                     {index === 0 && <span style={{fontSize: 14}}>🔬</span>}
                     {index === 1 && <span style={{fontSize: 14}}>💡</span>}
                     {index === 2 && <span style={{fontSize: 14}}>⚔️</span>}
                     {index === 3 && <span style={{fontSize: 14}}>🧬</span>}
                     {index >= 4 && <span>{item.num}</span>}
                  </div>
                  <div className={styles.aiItemContent}>
                    <div className={styles.aiItemTitle}>{item.title}</div>
                    <div className={styles.aiItemText}>{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.aiDisclaimer}>
              <span className={styles.aiDisclaimerIcon}>ⓘ</span>
              AI内容可能存在错误，仅供参考，欢迎纠错！
            </div>
          </div>

          {/* AI一键解读 */}
          <div className={styles.section}>
            <SectionTitle
              extra={<span className={styles.aiReadTip} onClick={() => setAiTipVisible(true)}>ⓘ 说明</span>}
            >
              <span className={styles.aiReadTitleRow}>
                AI一键解读
                <Tag color="danger" fill="outline" className={styles.oaTag}>OA</Tag>
              </span>
            </SectionTitle>
            <div className={styles.aiReadGrid}>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('summary')}>原文摘要</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('innovation')}>创新要点</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('popular')}>科普解读</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('background')}>研究背景</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('method')}>研究方法</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('prospect')}>转化前景</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('framework')}>文章框架</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('figures')}>图表解读</div>
              <div className={styles.aiReadBtn} onClick={() => openAiRead('limitation')}>局限性</div>
            </div>
          </div>

          {/* 相关链接 */}
          <RelatedSection
            title="相关链接"
            items={article.links}
            maxDisplay={3}
            onMoreClick={() => console.log('查看更多链接')}
            onItemClick={(item) => console.log('点击链接:', item.name)}
          />

          {/* 相关文章 */}
          <div className={styles.section}>
            <SectionTitle
              extra={
                <div className={styles.relatedTags}>
                  <span className={styles.tagLink}>细菌感染</span>
                  <span className={styles.tagLink}>DNA损伤</span>
                  <Image src="/icons/refresh.svg" alt="刷新" width={14} height={14} className={styles.refreshIcon} />
                </div>
              }
            >
              相关文章
            </SectionTitle>
            <div className={styles.relatedList}>
              {article.relatedArticles.map((item, index) => (
                <div key={index} className={styles.relatedItem}>
                  <div className={styles.relatedMeta}>
                    <span className={styles.relatedType}>{item.type}</span>
                    <span className={styles.relatedArrow}>›</span>
                    <span className={styles.relatedJournal}>{item.journal} <span className={styles.impactFactor}>[IF:{item.impact}]</span></span>
                  </div>
                  <div className={styles.relatedTitleCn}>{item.titleCn}</div>
                  <div className={styles.relatedTitleEn}>{item.titleEn}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 相关机构 */}
          <RelatedSection
            title="相关机构"
            items={article.institutions}
            maxDisplay={3}
            onMoreClick={() => console.log('查看更多机构')}
            onItemClick={(item) => console.log('点击机构:', item.name)}
          />

          {/* 底部版权信息 */}
          <div className={styles.footer}>
            <Image src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/logo/daily2.svg" alt="Rdaily" width={200} height={40} className={styles.footerLogo} />
            <p className={styles.footerCompany}>北京热心肠生物技术研究院有限公司</p>
            <p className={styles.footerCopyright}>© 2017-2025 京ICP备18003096号-3</p>
            <p className={styles.footerLicense}>增值电信业务经营许可证：合字B2-20230401</p>
          </div>

        </div>
      </div>

      {/* 更多信息按钮 - 可拖动悬浮球 */}
      <FloatingButton onClick={() => setDrawerVisible(true)}>
        <Image src="/icons/list-white.svg" alt="更多信息" width={24} height={24} className={styles.floatingBubbleIcon} />
      </FloatingButton>

      <BackToTop scrollContainerRef={scrollRef} position="high" />


      {/* 更多信息抽屉 */}
      <Popup
        visible={drawerVisible}
        onMaskClick={() => setDrawerVisible(false)}
        position="right"
        bodyStyle={{ width: '80vw' }}
      >
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>更多信息</span>
            <span className={styles.drawerClose} onClick={() => setDrawerVisible(false)}>×</span>
          </div>
          <div className={styles.drawerBody}>
            {/* 顶部菜单标签 */}
            <div className={styles.drawerMenu}>
              {structureMenus.map((menu) => (
                <div
                  key={menu}
                  className={`${styles.drawerMenuItem} ${activeMenu === menu ? styles.drawerMenuItemActive : ''}`}
                  onClick={() => setActiveMenu(menu)}
                >
                  {menu}
                </div>
              ))}
            </div>
            {/* 内容区域 */}
            <div className={styles.drawerContent}>
              {structureData[activeMenu]?.map((section, idx) => {
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
                      {section.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className={styles.drawerTagItem}>{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
              {(!structureData[activeMenu] || structureData[activeMenu].length === 0) && (
                <ErrorBlock
                  image="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/none.png"
                  fullPage
                  title="暂无数据"
                  description="该分类下暂无内容"
                />
              )}
            </div>
          </div>
        </div>
      </Popup>

      {/* AI一键解读说明弹窗 */}
      <Dialog
        visible={aiTipVisible}
        content={
          <div className={styles.aiTipContent}>
            <div className={styles.aiTipItem}>
              <span className={styles.aiTipNumber}>1、</span>
              <span className={styles.aiTipText}>
                <span className={styles.aiTipBlue}>蓝色框内容由AI自动生成</span>，大部分未经人工校对，可能存在错误，仅供参考。
              </span>
            </div>
            <div className={styles.aiTipItem}>
              <span className={styles.aiTipNumber}>2、</span>
              <span className={styles.aiTipText}>
                <span className={styles.aiTipGray}>灰色框暂无内容</span>，受限于原文非OA，AI未解读。欢迎您上传PDF，获取解读内容。
              </span>
            </div>
          </div>
        }
        closeOnMaskClick
        onClose={() => setAiTipVisible(false)}
        title="AI一键解读"
      />

      {/* AI一键解读详情弹窗 */}
      <Popup
        visible={aiReadPopupVisible}
        onMaskClick={() => setAiReadPopupVisible(false)}
        position="bottom"
        bodyStyle={{ height: '70vh', borderRadius: '16px 16px 0 0' }}
      >
        <div className={styles.aiReadPopup}>
          <div className={styles.aiReadHeader}>
            <h3 className={styles.aiReadTitle}>AI解读 - {getAiReadTitle()}</h3>
            <span className={styles.aiReadClose} onClick={() => setAiReadPopupVisible(false)}>×</span>
          </div>
          <Tabs activeKey={aiTabKey} onChange={setAiTabKey}>
            <Tabs.Tab title="中文" key="cn" />
            <Tabs.Tab title="原文" key="en" />
          </Tabs>
          <div className={styles.aiReadContent}>
            {getCurrentAiReadContent()}
          </div>
        </div>
      </Popup>
    </div>
  );
}
