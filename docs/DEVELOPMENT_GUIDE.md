# Rbase Mobile 开发规范

本文档基于 article-v1、v2、v3 页面的开发经验总结，包含了项目中必须遵守的关键开发规范和最佳实践。

---

## 🎯 核心原则

### 1. 设计 Token 系统（最重要⭐）

**必须使用 CSS Variables 中定义的 design tokens，禁止硬编码任何样式值。**

#### ❌ 错误示例 - 硬编码
```css
.button {
  color: #0066ff;
  font-size: 14px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #f5f5f5;
}
```

#### ✅ 正确示例 - 使用 tokens
```css
.button {
  color: var(--rbase-color-primary);
  font-size: var(--rbase-font-size-body-small);
  padding: var(--rbase-spacing-sm) var(--rbase-spacing-md);
  border-radius: var(--rbase-radius-md);
  background: var(--rbase-color-background-secondary);
}
```

#### 常用 Design Tokens 速查表

**颜色 Tokens:**
```css
/* 主色系 */
--rbase-color-primary          /* 主色 */
--rbase-color-primary-light    /* 主色浅色版 */
--rbase-color-accent          /* 强调色 */

/* 文本颜色 */
--rbase-color-text-primary    /* 主要文本 */
--rbase-color-text-secondary  /* 次要文本 */
--rbase-color-text-tertiary   /* 三级文本 */

/* 背景颜色 */
--rbase-color-background           /* 主背景 */
--rbase-color-background-secondary /* 次背景 */
--rbase-color-background-tertiary  /* 三级背景 */

/* 边框颜色 */
--rbase-color-border        /* 默认边框 */
--rbase-color-border-strong /* 强调边框 */

/* 状态颜色 */
--rbase-color-success-light /* 成功状态 */
```

**字体 Tokens:**
```css
/* 字号 */
--rbase-font-size-h4          /* 标题4 */
--rbase-font-size-body        /* 正文 */
--rbase-font-size-body-small  /* 小号正文 */
--rbase-font-size-caption     /* 辅助文字 */

/* 字重 */
--rbase-font-weight-regular   /* 常规 */
--rbase-font-weight-medium    /* 中等 */
--rbase-font-weight-semibold  /* 半粗 */
--rbase-font-weight-bold      /* 粗体 */

/* 行高 */
--rbase-line-height-relaxed /* 舒适行高 */
--rbase-line-height-loose   /* 宽松行高 */
```

**间距 Tokens:**
```css
--rbase-spacing-xs  /* 超小间距 */
--rbase-spacing-sm  /* 小间距 */
--rbase-spacing-md  /* 中等间距 */
--rbase-spacing-lg  /* 大间距 */
```

**圆角 Tokens:**
```css
--rbase-radius-sm     /* 小圆角 */
--rbase-radius-md     /* 中等圆角 */
--rbase-radius-card   /* 卡片圆角 */
--rbase-radius-button /* 按钮圆角 */
```

#### 使用 Design Tokens 的好处

1. **主题一致性** - 整个应用的视觉风格保持统一
2. **易于维护** - 修改 token 值即可全局更新
3. **支持主题切换** - 未来可以轻松实现暗黑模式等
4. **响应式友好** - token 值会随设备自动调整

---

### 2. 像素单位管理规则

**所有像素值必须在 CSS 文件中定义，禁止在内联 style 中使用任何单位。**

#### 为什么？
系统会自动将 CSS 文件中的 `px` 转换为 `vw/vh` 以适配不同屏幕尺寸，但内联样式中的单位不会被转换。

#### ❌ 错误示例
```tsx
<div style={{ width: '80px', height: '100px', fontSize: '14px' }}>
```

#### ✅ 正确示例
```tsx
<div className={styles.container}>
```

```css
/* page.module.css */
.container {
  width: 80px;
  height: 100px;
  font-size: 14px;
}
```

---

### 3. 动态值传递策略

**使用 CSS 自定义属性（CSS Variables）传递无单位数值，在 CSS 中进行单位计算。**

#### ✅ 正确做法

```tsx
// TSX
<div
  className={styles.treeNode}
  style={{
    '--node-level': level
  } as React.CSSProperties}
>
```

```css
/* CSS */
.treeNode {
  padding-left: calc(var(--node-level, 0) * 24px);
}
```

#### ❌ 避免的做法

```tsx
// 不要在内联样式中计算并添加单位
<div style={{ paddingLeft: `${level * 24}px` }}>
```

---

### 4. Next.js Image 组件特殊处理

**`width` 和 `height` 属性是框架必需的，不是内联样式，必须保留。**

#### ✅ 正确用法

```tsx
<Image
  src="/icons/icon.svg"
  alt="图标"
  width={18}        // 必需的框架属性
  height={18}       // 必需的框架属性
  className={styles.icon}  // 可以在 CSS 中覆盖尺寸
/>
```

```css
/* 如果需要调整尺寸，在 CSS 中覆盖 */
.icon {
  width: 20px;
  height: 20px;
}
```

---

### 5. SVG 元素尺寸控制

**移除 SVG 元素的内联尺寸属性，使用 CSS 控制。**

#### ❌ 错误示例
```tsx
<svg width="16" height="16" viewBox="0 0 16 16">
  <path d="..." />
</svg>
```

#### ✅ 正确示例
```tsx
<div className={styles.iconWrapper}>
  <svg viewBox="0 0 16 16">
    <path d="..." />
  </svg>
</div>
```

```css
.iconWrapper {
  width: 16px;
  height: 16px;
}

.iconWrapper svg {
  width: 100%;
  height: 100%;
}
```

---

### 6. 响应式宽度设置

**使用纯百分比单位，避免 maxWidth 限制。**

#### ❌ 错误示例
```tsx
<Popup
  bodyStyle={{ width: '80vw', maxWidth: '400px' }}
/>
```
> 问题：在 iPad 等大屏设备上会被限制在 400px，显得过窄

#### ✅ 正确示例
```tsx
<Popup
  bodyStyle={{ width: '80vw' }}
/>
```

---

### 7. 动态高度/尺寸控制

**避免使用 calc() 计算，使用 CSS 类切换。**

#### ❌ 避免的做法
```tsx
<div style={{ height: `calc(${value} * 1px)` }}>
```
> 问题：calc 计算结果是带单位的值，不会被系统转换

#### ✅ 推荐做法
```tsx
<Swiper
  className={`${styles.swiper} ${isExpanded ? styles.tall : styles.short}`}
>
```

```css
.swiper {
  transition: height 0.3s ease;
}

.short {
  height: 100px;
}

.tall {
  height: 200px;
}
```

---

### 8. Popup/抽屉组件使用

**优先使用 Ant Design Mobile 的 Popup 组件，避免自定义实现。**

#### ❌ 避免的做法
```tsx
{visible && (
  <div className={styles.drawerMask}>
    <div className={styles.drawer}>
      {/* 内容 */}
    </div>
  </div>
)}
```
> 问题：条件渲染会导致组件立即卸载，丢失关闭动画

#### ✅ 正确做法
```tsx
<Popup
  visible={visible}
  position="right"
  bodyStyle={{ width: '80vw' }}
  onMaskClick={() => setVisible(false)}
>
  <div className={styles.drawer}>
    {/* 内容 */}
  </div>
</Popup>
```

```css
/* 移除原有的定位样式 */
.drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
  /* 不需要 position, top, right, bottom, width, animation 等 */
}
```

---

### 9. Popup 样式处理原则

**合理使用 bodyStyle 和内部容器样式。**

#### 在 bodyStyle 中设置
- 必要的尺寸（width, height）
- 圆角（borderRadius）

#### 在内部容器 CSS 中设置
- `overflow: hidden`
- 其他布局样式

#### ✅ 正确示例

```tsx
<Popup
  visible={visible}
  position="bottom"
  bodyStyle={{
    height: '70vh',
    borderRadius: '16px 16px 0 0'
  }}
  destroyOnClose={false}  // 保留关闭动画
>
  <div className={styles.content}>
    {/* 内容 */}
  </div>
</Popup>
```

```css
.content {
  height: 100%;
  overflow: hidden;  /* 在这里设置 overflow */
  border-radius: 16px 16px 0 0;  /* 同时设置以确保显示 */
}
```

---

## 📋 开发检查清单

### 开发前检查

- [ ] ⭐ **确认所有样式值都使用 design tokens（`--rbase-*`）**
- [ ] 确认所有像素值都在 CSS 文件中
- [ ] 检查没有内联 style 使用 px、rem 等单位
- [ ] Image 组件正确使用 width/height 属性
- [ ] SVG 元素移除内联尺寸属性
- [ ] 抽屉/弹窗使用 Popup 组件而非自定义实现

### 提交前检查

- [ ] ⭐ **搜索代码中是否有硬编码的颜色值（如 `#0066ff`、`rgb()`）**
- [ ] ⭐ **检查是否有硬编码的字号、间距等数值**
- [ ] 在 iPad 模拟器上测试响应式效果
- [ ] 测试所有抽屉/弹窗的打开和关闭动画
- [ ] 验证树形结构的垂直线对齐
- [ ] 检查圆角、间距等视觉细节

### 快速检查命令

```bash
# 检查硬编码颜色
grep -r "color:\s*#" src/

# 检查硬编码字号
grep -r "font-size:\s*[0-9]" src/

# 检查内联 style 中的 px
grep -r "style={{.*px" src/
```

---

## 🔧 常见问题快速参考

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 样式在不同页面不一致 | 硬编码颜色/字号 | 使用 design tokens |
| iPad 上图标/文字太小 | 内联样式中的 px 未转换 | 移到 CSS 文件中 |
| 树形结构垂直线位置不对 | 内联样式传递了带单位的值 | 传递无单位数值，CSS 中计算 |
| 抽屉没有收起动画 | 使用条件渲染 `{visible && ...}` | 改用 Popup 组件 |
| Popup 圆角消失 | 只在 bodyStyle 中设置 | 同时在内部容器 CSS 中设置 |
| Swiper 高度在 iPad 上不对 | calc 计算值未转换 | 使用 CSS 类切换 |
| Image 组件报错缺少属性 | 移除了 width/height | 恢复 width/height 属性 |

---

## 📝 完整示例对比

### 示例 1: 卡片组件

#### ❌ 完全错误的写法
```css
.card {
  background: #ffffff;
  color: #333333;
  font-size: 14px;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

#### ✅ 完全正确的写法
```css
.card {
  background: var(--rbase-color-background);
  color: var(--rbase-color-text-primary);
  font-size: var(--rbase-font-size-body-small);
  padding: var(--rbase-spacing-sm) var(--rbase-spacing-md);
  margin: var(--rbase-spacing-xs);
  border-radius: var(--rbase-radius-md);
  border: 1px solid var(--rbase-color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### 示例 2: 树形结构节点

#### ❌ 错误的写法
```tsx
<div
  style={{
    paddingLeft: `${level * 24}px`,
    fontSize: '14px',
    color: '#666'
  }}
>
```

#### ✅ 正确的写法
```tsx
<div
  className={styles.treeNode}
  style={{
    '--node-level': level
  } as React.CSSProperties}
>
```

```css
.treeNode {
  padding-left: calc(var(--node-level, 0) * 24px);
  font-size: var(--rbase-font-size-body-small);
  color: var(--rbase-color-text-secondary);
}
```

### 示例 3: 图标处理

#### ❌ 错误的写法
```tsx
<div style={{ width: '16px', height: '16px' }}>
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path d="..." />
  </svg>
</div>
```

#### ✅ 正确的写法
```tsx
<div className={styles.iconWrapper}>
  <svg viewBox="0 0 16 16">
    <path d="..." />
  </svg>
</div>
```

```css
.iconWrapper {
  width: 16px;
  height: 16px;
}

.iconWrapper svg {
  width: 100%;
  height: 100%;
}
```

---

## 🎨 Design Tokens 完整示例

```css
/* 典型的按钮样式 */
.primaryButton {
  /* 颜色使用 tokens */
  background: var(--rbase-color-primary);
  color: white;

  /* 字体使用 tokens */
  font-size: var(--rbase-font-size-body-small);
  font-weight: var(--rbase-font-weight-medium);

  /* 间距使用 tokens */
  padding: var(--rbase-spacing-sm) var(--rbase-spacing-md);

  /* 圆角使用 tokens */
  border-radius: var(--rbase-radius-button);

  /* 边框使用 tokens */
  border: 1px solid var(--rbase-color-border);

  /* 过渡效果 */
  transition: all 0.2s;
}

.primaryButton:hover {
  background: var(--rbase-color-primary-light);
}

/* 典型的文本样式 */
.title {
  font-size: var(--rbase-font-size-h4);
  font-weight: var(--rbase-font-weight-bold);
  color: var(--rbase-color-text-primary);
  line-height: var(--rbase-line-height-relaxed);
  margin-bottom: var(--rbase-spacing-md);
}

.description {
  font-size: var(--rbase-font-size-body-small);
  color: var(--rbase-color-text-secondary);
  line-height: var(--rbase-line-height-loose);
}
```

---

## 💡 最佳实践建议

### 1. 开发新组件时
1. 先查看 design tokens 有哪些可用的值
2. 优先使用已有的 token，避免创建新的样式值
3. 如果需要新的样式值，考虑是否应该添加到 tokens 系统中

### 2. 复用现有组件
1. 参考 article-v1/v2/v3 的实现
2. 复用已有的样式类
3. 保持代码一致性

### 3. 响应式开发
1. 所有样式值在 CSS 中定义，让系统自动转换
2. 在多个设备尺寸上测试（iPhone、iPad）
3. 避免使用固定宽度，优先使用百分比和视口单位

### 4. 动画和过渡
1. 优先使用组件库提供的动画
2. 如需自定义动画，在 CSS 中定义
3. 确保动画流畅，避免卡顿

---

## 📚 参考资源

- [Ant Design Mobile 文档](https://mobile.ant.design/)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Next.js Image 组件](https://nextjs.org/docs/api-reference/next/image)

---

**版本**: 1.0.0
**最后更新**: 2025-12-10
**维护者**: 开发团队
