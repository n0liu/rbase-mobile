'use client';

import { Card, Space, NavBar, Divider, Tag } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import {
  getColors,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  spacing,
  componentSpacing,
  radius,
  getShadows,
  type ThemeMode
} from '@/theme';
import styles from './page.module.css';

// 颜色卡片组件
function ColorCard({
  name,
  value,
  description,
  copiedValue,
  onCopy
}: {
  name: string;
  value: string;
  description?: string;
  copiedValue: string;
  onCopy: (text: string) => void;
}) {
  return (
    <div
      className={styles.colorCard}
      onClick={() => onCopy(value)}
    >
      <div
        className={styles.colorSwatch}
        style={{ backgroundColor: value }}
      />
      <div className={styles.colorInfo}>
        <div className={styles.colorName}>{name}</div>
        <div className={styles.colorValue}>{value}</div>
        {description && <div className={styles.colorDescription}>{description}</div>}
      </div>
      {copiedValue === value && (
        <Tag color='success' className={styles.copiedTag}>已复制</Tag>
      )}
    </div>
  );
}

// 字体示例组件
function FontSizeExample({
  name,
  size,
  copiedValue,
  onCopy
}: {
  name: string;
  size: string;
  copiedValue: string;
  onCopy: (text: string) => void;
}) {
  return (
    <div className={styles.fontExample} onClick={() => onCopy(size)}>
      <div style={{ fontSize: size }} className={styles.fontText}>
        字体示例 Font Example
      </div>
      <div className={styles.fontMeta}>
        <span className={styles.fontName}>{name}</span>
        <span className={styles.fontValue}>{size}</span>
      </div>
      {copiedValue === size && (
        <Tag color='success' className={styles.copiedTag}>已复制</Tag>
      )}
    </div>
  );
}

// 间距示例组件
function SpacingExample({
  name,
  value,
  copiedValue,
  onCopy
}: {
  name: string;
  value: string;
  copiedValue: string;
  onCopy: (text: string) => void;
}) {
  return (
    <div className={styles.spacingExample} onClick={() => onCopy(value)}>
      <div className={styles.spacingVisual}>
        <div className={styles.spacingDemo}>
          <div className={styles.spacingBlock}>A</div>
          <div className={styles.spacingGap} style={{ width: value }} />
          <div className={styles.spacingBlock}>B</div>
        </div>
      </div>
      <div className={styles.spacingInfo}>
        <div className={styles.spacingName}>{name}</div>
        <div className={styles.spacingValue}>{value}</div>
      </div>
      {copiedValue === value && (
        <Tag color='success' className={styles.copiedTag}>已复制</Tag>
      )}
    </div>
  );
}

// 圆角示例组件
function RadiusExample({
  name,
  value,
  copiedValue,
  onCopy
}: {
  name: string;
  value: string;
  copiedValue: string;
  onCopy: (text: string) => void;
}) {
  // 判断是否是完全圆形（50% 或 9999px）
  const isCircle = value === '50%' || value === '9999px';

  return (
    <div className={styles.radiusExample} onClick={() => onCopy(value)}>
      <div className={styles.radiusVisual}>
        {isCircle ? (
          // 圆形头像示例
          <div className={styles.avatarDemo} style={{ borderRadius: value }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="9" r="3" fill="white" opacity="0.9"/>
              <path d="M12 14c-3.5 0-6 2-6 4v2h12v-2c0-2-2.5-4-6-4z" fill="white" opacity="0.9"/>
            </svg>
          </div>
        ) : (
          // 矩形卡片/按钮示例
          <div
            className={styles.radiusBox}
            style={{ borderRadius: value }}
          />
        )}
      </div>
      <div className={styles.radiusInfo}>
        <div className={styles.radiusName}>{name}</div>
        <div className={styles.radiusValue}>{value}</div>
      </div>
      {copiedValue === value && (
        <Tag color='success' className={styles.copiedTag}>已复制</Tag>
      )}
    </div>
  );
}

// 阴影示例组件
function ShadowExample({
  name,
  value,
  copiedValue,
  onCopy
}: {
  name: string;
  value: string;
  copiedValue: string;
  onCopy: (text: string) => void;
}) {
  return (
    <div className={styles.shadowExample} onClick={() => onCopy(value)}>
      <div
        className={styles.shadowBox}
        style={{ boxShadow: value }}
      />
      <div className={styles.shadowInfo}>
        <div className={styles.shadowName}>{name}</div>
        <div className={styles.shadowValue}>{value}</div>
      </div>
      {copiedValue === value && (
        <Tag color='success' className={styles.copiedTag}>已复制</Tag>
      )}
    </div>
  );
}

export default function DesignSystemPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [copiedValue, setCopiedValue] = useState<string>('');

  const colors = getColors(resolvedTheme as ThemeMode);
  const shadows = getShadows(resolvedTheme as ThemeMode);

  // 复制到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(''), 2000);
  };

  return (
    <div className={styles.container}>
      <NavBar onBack={() => router.push('/')}>设计系统</NavBar>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Design Tokens</h1>
          <p className={styles.subtitle}>点击任意项目即可复制值到剪贴板</p>
        </div>

        {/* 颜色系统 */}
        <Card title="🎨 颜色系统" className={styles.section}>
          <Divider>品牌色与功能色</Divider>
          <div className={styles.colorGrid}>
            <ColorCard name="Primary" value={colors.primary} description="主色调" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Success" value={colors.success} description="成功状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Warning" value={colors.warning} description="警告状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Danger" value={colors.danger} description="危险状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Info" value={colors.info} description="信息提示" copiedValue={copiedValue} onCopy={copyToClipboard} />
          </div>

          <Divider>强调色系</Divider>
          <div className={styles.colorGrid}>
            <ColorCard name="Accent" value={colors.accent} description="橙色-CTA按钮" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Accent Hover" value={colors.accentHover} description="悬停状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Accent Active" value={colors.accentActive} description="激活状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Accent Bg" value={colors.accentBg} description="背景色" copiedValue={copiedValue} onCopy={copyToClipboard} />
          </div>

          <Divider>成功色系（浅绿）</Divider>
          <div className={styles.colorGrid}>
            <ColorCard name="Success Light" value={colors.successLight} description="影响因子标签" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Success Light Hover" value={colors.successLightHover} description="悬停状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Success Light Active" value={colors.successLightActive} description="激活状态" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Success Light Bg" value={colors.successLightBg} description="背景色" copiedValue={copiedValue} onCopy={copyToClipboard} />
          </div>

          <Divider>文本色</Divider>
          <div className={styles.colorGrid}>
            <ColorCard name="Text Primary" value={colors.textPrimary} description="主文本" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Text Secondary" value={colors.textSecondary} description="次要文本" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Text Tertiary" value={colors.textTertiary} description="第三层文本" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Text Quaternary" value={colors.textQuaternary} description="第四层文本" copiedValue={copiedValue} onCopy={copyToClipboard} />
          </div>

          <Divider>背景色</Divider>
          <div className={styles.colorGrid}>
            <ColorCard name="Background" value={colors.background} description="主背景" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Background Secondary" value={colors.backgroundSecondary} description="次级背景" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Background Tertiary" value={colors.backgroundTertiary} description="第三层背景" copiedValue={copiedValue} onCopy={copyToClipboard} />
          </div>

          <Divider>边框色</Divider>
          <div className={styles.colorGrid}>
            <ColorCard name="Border" value={colors.border} description="默认边框" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Border Secondary" value={colors.borderSecondary} description="次级边框" copiedValue={copiedValue} onCopy={copyToClipboard} />
            <ColorCard name="Border Strong" value={colors.borderStrong} description="强调边框" copiedValue={copiedValue} onCopy={copyToClipboard} />
          </div>
        </Card>

        {/* 字体系统 */}
        <Card title="✏️ 字体系统" className={styles.section}>
          <Divider>字号</Divider>
          <Space direction="vertical" block>
            <FontSizeExample name="H1" size={fontSize.h1} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="H2" size={fontSize.h2} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="H3" size={fontSize.h3} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="H4" size={fontSize.h4} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="H5" size={fontSize.h5} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="Body" size={fontSize.body} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="Body Small" size={fontSize.bodySmall} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="Caption" size={fontSize.caption} copiedValue={copiedValue} onCopy={copyToClipboard} />
            <FontSizeExample name="Overline" size={fontSize.overline} copiedValue={copiedValue} onCopy={copyToClipboard} />
          </Space>

          <Divider>字重</Divider>
          <div className={styles.fontWeightGrid}>
            {Object.entries(fontWeight).map(([name, value]) => (
              <div
                key={name}
                className={styles.fontWeightItem}
                onClick={() => copyToClipboard(value.toString())}
              >
                <div style={{ fontWeight: value }} className={styles.fontWeightText}>
                  字重示例 {value}
                </div>
                <div className={styles.fontWeightName}>{name}</div>
                {copiedValue === value.toString() && (
                  <Tag color='success' className={styles.copiedTag}>已复制</Tag>
                )}
              </div>
            ))}
          </div>

          <Divider>行高</Divider>
          <div className={styles.lineHeightGrid}>
            {Object.entries(lineHeight).map(([name, value]) => (
              <div
                key={name}
                className={styles.lineHeightItem}
                onClick={() => copyToClipboard(value.toString())}
              >
                <div style={{ lineHeight: value }} className={styles.lineHeightText}>
                  行高示例<br />Line Height<br />多行文本演示
                </div>
                <div className={styles.lineHeightInfo}>
                  <span>{name}</span>
                  <span>{value}</span>
                </div>
                {copiedValue === value.toString() && (
                  <Tag color='success' className={styles.copiedTag}>已复制</Tag>
                )}
              </div>
            ))}
          </div>

          <Divider>字体家族</Divider>
          <div className={styles.fontFamilyBox}>
            <div className={styles.fontFamilyExample} style={{ fontFamily: fontFamily.base }}>
              基础字体 Base Font - {fontFamily.base}
            </div>
            <div className={styles.fontFamilyExample} style={{ fontFamily: fontFamily.monospace }}>
              等宽字体 Monospace - {fontFamily.monospace}
            </div>
          </div>
        </Card>

        {/* 间距系统 */}
        <Card title="📏 间距系统" className={styles.section}>
          <div className={styles.sectionDescription}>
            定义元素之间的标准间隔，用于 margin、padding、gap 等。
            两个方块 A-B 之间的距离就是间距值。
          </div>
          <Divider>基础间距</Divider>
          <div className={styles.spacingGrid}>
            {Object.entries(spacing).map(([name, value]) => (
              <SpacingExample key={name} name={name} value={value} copiedValue={copiedValue} onCopy={copyToClipboard} />
            ))}
          </div>

          <Divider>组件间距</Divider>
          <div className={styles.sectionDescription}>
            专门用于特定组件的固定尺寸，如导航栏高度、标签栏高度等。
          </div>
          <div className={styles.spacingGrid}>
            {Object.entries(componentSpacing)
              .filter(([, value]) => typeof value === 'string')
              .map(([name, value]) => (
                <SpacingExample key={name} name={name} value={value as string} copiedValue={copiedValue} onCopy={copyToClipboard} />
              ))}
          </div>
        </Card>

        {/* 圆角系统 */}
        <Card title="⭕ 圆角系统" className={styles.section}>
          <div className={styles.sectionDescription}>
            定义元素的圆角大小，用于 border-radius。圆角越大，边角越圆润。
          </div>
          <div className={styles.radiusGrid}>
            {Object.entries(radius).map(([name, value]) => (
              <RadiusExample key={name} name={name} value={value} copiedValue={copiedValue} onCopy={copyToClipboard} />
            ))}
          </div>
        </Card>

        {/* 阴影系统 */}
        <Card title="🌑 阴影系统" className={styles.section}>
          <div className={styles.sectionDescription}>
            定义元素的阴影效果，用于 box-shadow。SM/MD/LG 表示阴影的强度和深度。
          </div>
          <div className={styles.shadowGrid}>
            {Object.entries(shadows).map(([name, value]) => (
              <ShadowExample key={name} name={name} value={value} copiedValue={copiedValue} onCopy={copyToClipboard} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
