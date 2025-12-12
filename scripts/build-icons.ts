import fs from 'fs';
import path from 'path';

const ICONS_DIR = path.join(process.cwd(), 'public/icons');
const OUTPUT_FILE = path.join(process.cwd(), 'src/icons/index.tsx');

// 将文件名转换为组件名 (kebab-case -> PascalCase)
function toComponentName(filename: string): string {
  const name = filename.replace('.svg', '');
  return name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') + 'Icon';
}

// 将文件名转换为 key 名 (保持 kebab-case)
function toKeyName(filename: string): string {
  return filename.replace('.svg', '');
}

// 处理 SVG 内容
function processSvgContent(content: string): string {
  // 移除 XML 声明
  content = content.replace(/<\?xml[^?]*\?>/g, '');
  // 移除 HTML 注释（JSX 不支持）
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  // 移除 svg 标签上的 width 和 height 属性（不影响 stroke-width 等）
  content = content.replace(/<svg([^>]*)\s+width="[^"]*"/g, '<svg$1');
  content = content.replace(/<svg([^>]*)\s+height="[^"]*"/g, '<svg$1');
  // 移除 xmlns:xlink
  content = content.replace(/\s*xmlns:xlink="[^"]*"/g, '');
  // 添加 fill="currentColor"（如果没有的话）
  if (!content.includes('fill=')) {
    content = content.replace('<svg', '<svg fill="currentColor"');
  }
  // 格式化为 JSX（自闭合标签）
  content = content.replace(/<path([^>]*)>\s*<\/path>/g, '<path$1 />');
  content = content.replace(/<circle([^>]*)>\s*<\/circle>/g, '<circle$1 />');
  content = content.replace(/<rect([^>]*)>\s*<\/rect>/g, '<rect$1 />');
  content = content.replace(/<line([^>]*)>\s*<\/line>/g, '<line$1 />');
  content = content.replace(/<polygon([^>]*)>\s*<\/polygon>/g, '<polygon$1 />');
  content = content.replace(/<polyline([^>]*)>\s*<\/polyline>/g, '<polyline$1 />');
  content = content.replace(/<text([^>]*)>\s*<\/text>/g, '<text$1 />');
  // 移除多余的空白行
  content = content.replace(/\n\s*\n/g, '\n');

  return content.trim();
}

async function buildIcons() {
  // 确保输出目录存在
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 读取所有 SVG 文件
  const files = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg'));

  const components: string[] = [];
  const exports: string[] = [];
  const iconMap: string[] = [];

  for (const file of files) {
    const filePath = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const componentName = toComponentName(file);
    const keyName = toKeyName(file);
    const processedSvg = processSvgContent(content);

    components.push(`export const ${componentName} = () => (
  ${processedSvg}
);`);

    iconMap.push(`  '${keyName}': ${componentName},`);
  }

  const output = `// 自动生成的文件，请勿手动修改
// 运行 npm run build:icons 重新生成

import { FC } from 'react';

${components.join('\n\n')}

// 图标映射表
export const icons: Record<string, FC> = {
${iconMap.join('\n')}
};
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`✅ 生成了 ${files.length} 个图标组件到 ${OUTPUT_FILE}`);
}

buildIcons();
