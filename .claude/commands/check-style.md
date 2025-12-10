# 代码规范检查

在修改任何代码前，请确认以下规范：

## 强制检查清单

**所有颜色：**
- ✅ 必须使用 `var(--rbase-color-primary)` 等 tokens
- ❌ 禁止 `#0066ff`、`rgb()`、`rgba()` 等硬编码

**所有字号：**
- ✅ 必须使用 `var(--rbase-font-size-body)` 等 tokens
- ❌ 禁止 `14px`、`1rem` 等硬编码

**所有间距：**
- ✅ 必须使用 `var(--rbase-spacing-md)` 等 tokens
- ❌ 禁止 `12px`、`8px` 等硬编码

**像素单位：**
- ✅ 所有 px 值必须在 CSS 文件中
- ❌ 禁止在内联 style 中使用单位

**SVG/Image：**
- ✅ SVG 移除内联 width/height
- ✅ Image 保留 width/height（框架要求）

---

现在请继续你的代码修改任务。
