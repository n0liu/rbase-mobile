'use client';

import { useState } from 'react';
import { Tag } from 'antd-mobile';
import Image from 'next/image';
import {
  RightOutline,
  SearchOutline,
  UnorderedListOutline,
  UpOutline
} from 'antd-mobile-icons';
import styles from './page.module.css';

export default function ArticleV1Page() {
  const [aiTabKey, setAiTabKey] = useState('summary');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState('关键词');

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
      ],
      innovation: [
        { num: 1, title: "创新点1", content: "首次系统揭示了膳食纤维菊粉通过重塑肠道菌群功能来清除膳食果糖的机制。" },
      ],
      popular: [
        { num: 1, title: "通俗解读", content: "简单来说，这项研究发现吃菊粉可以帮助肠道里的好细菌把果糖吃掉，从而保护肝脏。" },
      ],
      background: [
        { num: 1, title: "研究背景", content: "脂肪肝已成为全球最常见的慢性肝病之一，高果糖饮食被认为是重要诱因。" },
      ],
      method: [
        { num: 1, title: "实验方法", content: "研究采用小鼠模型，通过16S rRNA测序、代谢组学分析等技术进行研究。" },
      ]
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
      { abbr: "CAU", name: "中国农业大学食品科学与营养工程学院" },
      { abbr: "AMMS", name: "军事科学院军事医学研究院" },
      { abbr: "IOZ,CAS", name: "中国科学院动物研究所" },
      { abbr: "CBS,CAU", name: "中国农业大学生物学院" },
    ],
  };

  const structureMenus = ['关键词', '临床试验', '治疗措施', '文章属性', '实验材料', '实验方法', '分析软件', '分子通路', '产出转化', '收录频道', '贡献者'];

  // 治疗措施数据（卡片式）
  const treatmentData = [
    {
      name: '菊粉',
      indication: '脂肪肝',
      method: '动物实验',
      status: 'positive' as const,
    },
    {
      name: '抗生素',
      indication: '促纤',
      method: '人体临床试验',
      status: 'negative' as const,
    },
  ];

  const structureData: Record<string, { title: string; tags: string[] }[]> = {
    '关键词': [
      { title: '核心', tags: ['菊粉', '益生菌', '小肠', '果糖', '脂肪肝', '膳食纤维'] },
      { title: '原文', tags: ['肠道菌群', 'hepatic steatosis', '期刊 | Nature Metabolism'] },
      { title: 'AI', tags: ['代谢功能障碍', 'B. acidifaciens', '谷胱甘肽', '肝脏脂质过氧化'] },
      { title: 'MeSH', tags: ['Fructose', 'Inulin', 'Fatty Liver', 'Probiotics'] },
    ],
    '临床试验': [
      { title: '临床试验信息', tags: ['发起机构', 'BIT', '分类', '交叉设计', '状态', '双盲', '研究中心', '单中心', '入组', '婴幼儿', '干预措施', '油酸性', '试验分期', '非药物试验', '阳性', '7天', '适应症', '日期/进展状态', 'ChiCTR2500109434', '斯坦福大学露西帕卡德儿童医院（批准号：IRB#58644）', '哥伦比亚大学动物实验伦理和规范委员会（批准号：APLAC-34186）'] },
    ],
    '文章属性': [
      { title: '文章属性', tags: ['研究类型', '干预性研究', '干预类型', 'TG-基础研究', '动物研究', '转化', '药物开发', '大类学科', '医学', '小类学科', '肠道微生物', '学科', '国首份NSFC8888888（中国）', 'NIH666666（美国）'] },
    ],
    '实验材料': [
      { title: '实验/试验材料和对象', tags: ['动物', '小鼠', '小鼠', '293T', '细胞系', '产酸拟杆菌', '动物双歧杆菌Bb-12', '婴导婴乳杆菌60'] },
    ],
    '实验方法': [
      { title: '实验方法', tags: ['16S rDNA测序', '液相色谱-串联质谱（LC-MS）', '逆转录定量聚合酶链式反应（qPCR）', 'RNA序列分析（RNA-seq）', '16S rRNA基因扩增子测序分析（16S）', '质谱成像技术', '苏木精-伊红染色（H&E）', '超声心动图（EchoMS）', '脂肪酸氧化（FAO）', '油红O染色和脂肪酸', '线粒体DNA分析（mtDNA）', '蛋白质免疫印迹（ELISA）'] },
    ],
    '分析软件': [
      { title: '分析方法/软件', tags: ['图分析', '双侧精确统计方法', 'SPSS', 'QIIME2'] },
    ],
    '分子通路': [
      { title: '分子/通路', tags: ['信号通路', '脂肪酸', 'PD-1', 'CTLA-4', '生物学通路', 'JAK-STAT'] },
    ],
    '产出转化': [
      { title: '产出与转化', tags: ['研究资源', '中国健康人益生菌基库', '相关产品', '短链乳酸', '优乐C乳酸菌固体饮料', '重要中药', '科研仪器', '震平中药饮片', '刘书博论文'] },
    ],
    '收录频道': [
      { title: '热心肠日报', tags: ['肠道菌（组）', '营养', '消化系统疾病', '代谢', '果糖', '脂X病', '国家自然科学基金委员会（NSFC）', '美国国立卫生研究院（NIH）'] },
      { title: '全球益生菌/益生元循证数据库（HOPE）', tags: ['益生菌', '益生元', '膳食纤维', '血糖', '发酵食品', '肥胖', '双歧杆菌'] },
      { title: '保健食品循证库', tags: ['药食同源', '虫草素', '扩充', '植物提取物', '肥胖'] },
    ],
    '贡献者': [
      { title: '内容贡献者', tags: ['白细胞组_007', 'PaperSlayer_泽', '医学传奇故事', '艾忆瑾帛Dy_Li', 'FMT小神兽儿', '国家药监局_Wang', '熊实习的Jane', '营养研究5527'] },
    ],
  };

  const getCurrentAiContent = () => {
    return article.aiSummary[aiTabKey as keyof typeof article.aiSummary] || [];
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <span className={styles.logoR}>R</span>
          <span className={styles.logoDot}>•</span>
          <span className={styles.logoText}>base</span>
          <Tag className={styles.docTag}>文献</Tag>
        </div>
        <div className={styles.topRight}>
          <SearchOutline className={styles.topIcon} />
          <img src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/users/default_avatar.png" alt="用户头像" className={styles.userAvatar} />
        </div>
      </div>

      {/* 可滚动内容区 */}
      <div className={styles.scrollArea}>
        <div className={styles.content}>

          {/* 文章元信息 */}
          <div className={styles.articleMeta}>
            <Tag color="primary" fill="solid" className={styles.articleTypeTag}>{article.type}</Tag>
            <span className={styles.journalInfo}>{article.journal} <span className={styles.impactFactor}>[IF:{article.impactFactor}]</span></span>
            {article.isOpenAccess && <Tag color="danger" fill="outline">OA</Tag>}
          </div>

          {/* 文章标题区 */}
          <div className={styles.titleSection}>
            <h1 className={styles.titleCn}>{article.titleCn}</h1>
            <p className={styles.subtitleCn}>{article.subtitleCn}</p>
            <p className={styles.titleEn}>{article.titleEn}</p>
            <div className={styles.titleFooter}>
              <span className={styles.doiText}>{article.source}.{article.publishDate}; doi:{article.doi.substring(0, 6)}...</span>
              <div className={styles.titleActions}>
                <Image src="/icons/share.svg" alt="分享" width={18} height={18} className={styles.actionIcon} />
                <Image src="/icons/star.svg" alt="收藏" width={18} height={18} className={styles.actionIcon} />
              </div>
            </div>
          </div>

          {/* 主要作者 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>主要作者</span>
              <span className={styles.sectionMore}>全部 <RightOutline fontSize={12} /></span>
            </div>
            <div className={styles.authorScroll}>
              {article.authors.map((author, index) => (
                <div key={index} className={styles.authorItem}>
                  <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                  <span className={styles.authorName}>{author.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI要点总结 */}
          <div className={styles.aiSection}>
            <div className={styles.aiHeader}>
              <span className={styles.aiTitle}>AI要点总结</span>
              <span className={styles.aiGenerated}>● AI 生成</span>
            </div>

            <div className={styles.aiContent}>
              {getCurrentAiContent().map((item, index) => (
                <div key={index} className={styles.aiItem}>
                  <div className={styles.aiNum}>{item.num}</div>
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
              <div className={styles.aiReadTitleRow}>
                <span className={styles.sectionTitle}>AI一键解读</span>
                <Tag color="danger" fill="outline">OA</Tag>
              </div>
              <span className={styles.aiReadTip}>ⓘ 说明</span>
            </div>
            <div className={styles.aiReadGrid}>
              <div className={styles.aiReadBtn}>原文摘要</div>
              <div className={styles.aiReadBtn}>创新要点</div>
              <div className={styles.aiReadBtn}>科普解读</div>
              <div className={styles.aiReadBtn}>研究背景</div>
              <div className={styles.aiReadBtn}>研究方法</div>
              <div className={styles.aiReadBtn}>转化前景</div>
              <div className={styles.aiReadBtn}>文章框架</div>
              <div className={styles.aiReadBtn}>图表解读</div>
              <div className={styles.aiReadBtn}>局限性</div>
            </div>
          </div>

          {/* 相关链接 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>相关链接</span>
            </div>
            <div className={styles.linksGrid}>
              <div className={styles.linkCard}>
                <div className={styles.linkIconBox}>
                  <div className={styles.bmcLogo}>
                    <span className={styles.bmcIcon}>◀</span>
                    <span className={styles.bmcText}>BMC</span>
                  </div>
                  <span className={styles.bmcSub}>Part of Springer Nature</span>
                </div>
                <span className={styles.linkLabel}>出版社原文</span>
              </div>
              <div className={styles.linkCard}>
                <div className={styles.linkIconBox}>
                  <div className={styles.pdfIcon}>PDF</div>
                  <Tag color="danger" fill="outline" className={styles.oaSmall}>OA</Tag>
                </div>
                <span className={styles.linkLabel}>PDF下载</span>
              </div>
            </div>
          </div>

          {/* 相关文章 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>相关文章</span>
              <div className={styles.relatedTags}>
                <span className={styles.tagLink}>细菌感染</span>
                <span className={styles.tagLink}>DNA损伤</span>
                <Image src="/icons/refresh.svg" alt="刷新" width={14} height={14} className={styles.refreshIcon} />
              </div>
            </div>
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

          {/* 底部版权信息 */}
          <div className={styles.footer}>
            <Image src="https://pics-xldkp-com.oss-cn-qingdao.aliyuncs.com/images/rbase/logo/daily2.svg" alt="Rdaily" width={200} height={40} className={styles.footerLogo} />
            <p className={styles.footerCompany}>北京热心肠生物技术研究院有限公司</p>
            <p className={styles.footerCopyright}>© 2017-2025 京ICP备18003096号-3</p>
            <p className={styles.footerLicense}>增值电信业务经营许可证：合字B2-20230401</p>
          </div>

        </div>
      </div>

      {/* 结构化解读按钮 - 悬浮 */}
      <div className={styles.structureBtn} onClick={() => setDrawerVisible(true)}>
        <UnorderedListOutline className={styles.structureIcon} />
        <span>结构化解读</span>
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

      {/* 结构化解读抽屉 */}
      {drawerVisible && (
        <div className={styles.drawerMask} onClick={() => setDrawerVisible(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>结构化解读</span>
              <span className={styles.drawerClose} onClick={() => setDrawerVisible(false)}>×</span>
            </div>
            <div className={styles.drawerBody}>
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
              <div className={styles.drawerContent}>
                {activeMenu === '治疗措施' ? (
                  <>
                    <div className={styles.drawerSectionTitle}>
                      <span className={styles.drawerSectionBar}></span>
                      <span>治疗与干预措施</span>
                    </div>
                    {treatmentData.map((item, idx) => (
                      <div key={idx} className={styles.treatmentCard}>
                        <div className={styles.treatmentHeader}>
                          <span className={styles.treatmentTitle}>{item.name}</span>
                          <span className={`${styles.treatmentStatus} ${item.status === 'positive' ? styles.treatmentStatusPositive : styles.treatmentStatusNegative}`}>
                            {item.status === 'positive' ? '阳性' : '阴性'}
                          </span>
                        </div>
                        <div className={styles.treatmentRow}>
                          <span className={styles.treatmentLabel}>适应症</span>
                          <span className={styles.treatmentValue}>{item.indication}</span>
                        </div>
                        <div className={styles.treatmentRow}>
                          <span className={styles.treatmentLabel}>方法</span>
                          <span className={styles.treatmentValue}>{item.method}</span>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {structureData[activeMenu]?.map((section, idx) => (
                      <div key={idx} className={styles.drawerSection}>
                        <div className={styles.drawerSectionTitle}>
                          <span className={styles.drawerSectionBar}></span>
                          <span>{section.title}</span>
                        </div>
                        <div className={styles.drawerTags}>
                          {section.tags.map((tag, tagIdx) => (
                            <span key={tagIdx} className={styles.drawerTag}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {(!structureData[activeMenu] || structureData[activeMenu].length === 0) && (
                      <div className={styles.drawerEmpty}>暂无数据</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
