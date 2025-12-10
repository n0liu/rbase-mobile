## ⚠️⚠️⚠️ 强制工作流程 - 每次编辑代码前必须执行 ⚠️⚠️⚠️

**你（Claude）在使用 Write、Edit、NotebookEdit 等工具前，必须：**

### 第 1 步：在文本回复中明确声明
在调用任何编辑工具之前，你必须在文本回复中写出：

```
代码规范检查：
✓ 所有颜色使用 var(--rbase-color-*)
✓ 所有字号使用 var(--rbase-font-size-*)
✓ 所有间距使用 var(--rbase-spacing-*)
✓ 无内联 style 中的单位
✓ SVG 无内联尺寸
✓ Image 保留必需属性
```

### 第 2 步：检查即将编写的代码
在你准备好代码后，再次检查是否符合上述所有规范。

### 第 3 步：执行工具调用
确认无误后，才能调用 Write/Edit 工具。

**如果你没有执行步骤 1 的声明，用户会提醒你重新检查规范！**

---

## 其他配置

- 服务我会自己启动
- 我不希望每个按钮点击会有一个放大的效果, 除非我明确说明
- 我不希望每个按钮点击会有一个按压的效果, 除非我明确说明

---

## 🚨 强制开发规范（最高优先级）

**在使用任何代码编辑工具（Read、Write、Edit、NotebookEdit）之前，必须遵循以下规范：**

### 1. Design Tokens（最重要，必须遵守）
- ✅ **所有颜色**必须使用 `var(--rbase-color-*)`，禁止硬编码如 `#0066ff`
- ✅ **所有字号**必须使用 `var(--rbase-font-size-*)`，禁止硬编码如 `14px`
- ✅ **所有间距**必须使用 `var(--rbase-spacing-*)`，禁止硬编码
- ✅ **所有圆角**必须使用 `var(--rbase-radius-*)`，禁止硬编码
- ✅ **所有字重**必须使用 `var(--rbase-font-weight-*)`，禁止硬编码

**示例：**
```css
/* ❌ 错误 */
.button {
  color: #0066ff;
  font-size: 14px;
  padding: 12px;
}

/* ✅ 正确 */
.button {
  color: var(--rbase-color-primary);
  font-size: var(--rbase-font-size-body-small);
  padding: var(--rbase-spacing-sm);
}
```

### 2. 像素单位管理
- ✅ 所有像素值必须在 CSS 文件中定义
- ❌ 禁止在内联 `style` 中使用 `px`、`rem`、`em` 等单位
- ✅ 动态值使用 CSS Variables 传递无单位数值，在 CSS 中计算

**示例：**
```tsx
/* ❌ 错误 */
<div style={{ width: '80px', paddingLeft: `${level * 24}px` }}>

/* ✅ 正确 */
<div
  className={styles.container}
  style={{ '--node-level': level } as React.CSSProperties}
>
```

```css
.container {
  width: 80px;
  padding-left: calc(var(--node-level, 0) * 24px);
}
```

### 3. 组件特殊规则
- ✅ Next.js `Image` 组件的 `width` 和 `height` 属性必须保留（框架要求）
- ❌ SVG 元素禁止使用内联 `width` 和 `height` 属性
- ✅ 使用 Ant Design Mobile 的 `Popup` 组件，不要自己实现条件渲染的抽屉

**示例：**
```tsx
/* ✅ Image 组件 */
<Image src="/icon.svg" width={18} height={18} className={styles.icon} />

/* ❌ SVG 错误 */
<svg width="16" height="16" viewBox="0 0 16 16">

/* ✅ SVG 正确 */
<svg viewBox="0 0 16 16" className={styles.icon}>
```

### 4. 响应式规则
- ❌ 禁止使用 `maxWidth` 限制（会在 iPad 上显示不佳）
- ✅ 使用纯百分比单位：`75vw`、`80vw`、`85vw`
- ❌ 避免 `calc()` 计算动态值（结果不会被自动转换）
- ✅ 使用 CSS 类切换来控制不同尺寸

### 5. 编写代码前自检清单
在使用 Write 或 Edit 工具前，必须确认：
- [ ] 是否所有样式值都使用了 design tokens？
- [ ] 是否有内联 style 中的单位？
- [ ] SVG 是否移除了内联尺寸？
- [ ] 是否使用了 Popup 而非自定义抽屉？

### 6. 完整文档
详细规范见：`docs/DEVELOPMENT_GUIDE.md`

### 7. UI 组件库
使用 Ant Design Mobile 组件库，请查看：`https://mobile.ant.design/`, 交互和组件尽量都采用 Ant Design Mobile 的样式，避免重复造轮子。



---

**违反以上任何规范的代码都是不可接受的，必须立即修正！**