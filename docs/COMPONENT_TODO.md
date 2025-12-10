# 组件开发 TODO 清单

## 📊 进度总览

- **总计**：10 个组件
- **已完成**：0 个
- **进行中**：0 个
- **待开始**：10 个

---

## 🔥 第一优先级（5个）- 立即实现

### ✅ 1. AIInputBar - 底部 AI 问答栏
- **状态**：❌ 待开始
- **使用页面**：v1/v2/v3
- **复用度**：⭐⭐⭐⭐⭐
- **实现方式**：自己写
- **目录**：`src/components/layout/AIInputBar/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - AI 按钮（带图标）
  - 输入框（placeholder 可配置）
  - 发送按钮
  - 底部固定布局，支持 safe-area
- **Props 设计**：
  ```typescript
  interface AIInputBarProps {
    placeholder?: string;
    buttonText?: string;
    buttonIcon?: ReactNode;
    onSend?: (text: string) => void;
    onAIButtonClick?: () => void;
  }
  ```

---

### ✅ 2. TopNavigationBar - 顶部导航栏
- **状态**：❌ 待开始
- **使用页面**：v1/v2/v3
- **复用度**：⭐⭐⭐⭐⭐
- **实现方式**：自己写
- **目录**：`src/components/layout/TopNavigationBar/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - R•base Logo
  - 标签（文献/HOPE/机构）
  - 右侧图标（搜索、列表、用户头像）
- **Props 设计**：
  ```typescript
  interface TopNavigationBarProps {
    tag: '文献' | 'HOPE' | '机构';
    leftIcon?: ReactNode;
    onLeftIconClick?: () => void;
    onSearchClick?: () => void;
    onListClick?: () => void;
    userAvatar?: string;
    onUserClick?: () => void;
  }
  ```

---

### ✅ 3. TreeView - 树状结构组件
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐⭐
- **实现方式**：自己写
- **目录**：`src/components/list/TreeView/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 支持多层级嵌套
  - 展开/收起功能
  - 叶子节点横线、父节点圆圈+/-图标
  - 垂直连接线
  - 节点选中状态
- **Props 设计**：
  ```typescript
  interface TreeNode {
    name: string;
    count: number;
    children?: TreeNode[];
  }

  interface TreeViewProps {
    data: TreeNode[];
    expandedNodes: Set<string>;
    selectedNode?: string;
    onToggle: (nodeName: string) => void;
    onNodeClick?: (node: TreeNode) => void;
    levelIndent?: number; // 默认 24px
  }
  ```

---

### ✅ 4. FilterDrawer - 右侧筛选抽屉
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐⭐
- **实现方式**：基于 ADM Popup 二次封装
- **目录**：`src/components/drawers/FilterDrawer/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 左侧菜单栏（垂直）
  - 右侧内容区（可滚动）
  - 关闭按钮
  - 菜单项激活状态
- **Props 设计**：
  ```typescript
  interface FilterDrawerProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    menus: Array<{ key: string; label: string }>;
    activeMenu: string;
    onMenuChange: (key: string) => void;
    children: ReactNode;
  }
  ```

---

### ✅ 5. ResearcherSwiper - 研究学者轮播宫格
- **状态**：❌ 待开始
- **使用页面**：v3 + v1可替换
- **复用度**：⭐⭐⭐⭐⭐
- **实现方式**：基于 ADM Swiper 二次封装
- **目录**：`src/components/list/ResearcherSwiper/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 第一页：单行宫格（4列）
  - 第二页：双行宫格（4×2）+ "更多"按钮
  - 自定义指示器
  - 动态高度切换
- **Props 设计**：
  ```typescript
  interface ResearcherSwiperProps {
    researchers: Array<{ name: string; avatar: string; id?: string }>;
    firstPageColumns?: number;  // 默认 4
    firstPageRows?: number;     // 默认 1
    otherPageColumns?: number;  // 默认 4
    otherPageRows?: number;     // 默认 2
    onResearcherClick?: (researcher) => void;
    onMoreClick?: () => void;
    showMoreButton?: boolean;   // 默认 true
    showIndicator?: boolean;    // 默认 true
    autoHeight?: boolean;       // 默认 true
  }
  ```

---

## 🌟 第二优先级（5个）- 尽快实现

### ✅ 6. ArticleListItem - 文章列表项
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐
- **实现方式**：自己写
- **目录**：`src/components/list/ArticleListItem/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 日期显示（日+月）
  - 期刊名、影响因子
  - 标题（中英文）
  - 作者列表（通讯作者标记）
  - 关键词标签
- **Props 设计**：
  ```typescript
  interface ArticleListItemProps {
    article: {
      date: { day: string; month: string };
      journal: string;
      impactFactor: string;
      titleCn: string;
      titleEn: string;
      type?: string;
      publishDate?: string;
      authors: Array<{ name: string; hasEmail: boolean }>;
      tags: string[];
    };
    showMoreIcon?: boolean;
    onClick?: () => void;
  }
  ```

---

### ✅ 7. ContentTabBar - 内容 Tab 栏
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐
- **实现方式**：自己写
- **目录**：`src/components/filters/ContentTabBar/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - Tab 切换（文献/专利）
  - 数量显示
  - 排序按钮
  - 筛选按钮
  - 数据分析按钮（可选）
- **Props 设计**：
  ```typescript
  interface ContentTabBarProps {
    tabs: Array<{ key: string; label: string; count?: number }>;
    activeTab: string;
    onTabChange: (key: string) => void;
    sortLabel?: string;
    onSortClick?: () => void;
    onFilterClick?: () => void;
    showAnalysisBtn?: boolean;
    onAnalysisClick?: () => void;
  }
  ```

---

### ✅ 8. CoverBanner - 封面横幅
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐
- **实现方式**：自己写
- **目录**：`src/components/layout/CoverBanner/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 封面图片
  - 渐变遮罩
  - 标题（中英文）
  - 关注按钮
- **Props 设计**：
  ```typescript
  interface CoverBannerProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    showFollowBtn?: boolean;
    followBtnText?: string;
    onFollow?: () => void;
  }
  ```

---

### ✅ 9. ActiveFilterTags - 筛选标签栏
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐
- **实现方式**：基于 ADM Tag 二次封装
- **目录**：`src/components/filters/ActiveFilterTags/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 显示当前激活的筛选条件
  - 标签可删除（带关闭图标）
  - 面包屑导航（可选）
- **Props 设计**：
  ```typescript
  interface ActiveFilterTagsProps {
    label?: string;
    filters: string[];
    onRemove: (filter: string) => void;
    showBreadcrumb?: boolean;
    breadcrumbPath?: string[];
  }
  ```

---

### ✅ 10. LeftSidePanel - 左侧面板容器
- **状态**：❌ 待开始
- **使用页面**：v2/v3
- **复用度**：⭐⭐⭐⭐
- **实现方式**：基于 ADM Popup 二次封装
- **目录**：`src/components/drawers/LeftSidePanel/`
- **文件**：
  - `index.tsx`
  - `index.module.scss`
  - `types.ts`
- **功能描述**：
  - 从左侧滑出
  - 标题栏
  - 关闭按钮
  - 内容区可滚动
- **Props 设计**：
  ```typescript
  interface LeftSidePanelProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    width?: string; // 默认 '75vw'
    children: ReactNode;
  }
  ```

---

## 📝 开发规范

1. **所有颜色**：必须使用 `var(--rbase-color-*)`
2. **所有字号**：必须使用 `var(--rbase-font-size-*)`
3. **所有间距**：必须使用 `var(--rbase-spacing-*)`
4. **所有组件**：使用 `.module.scss` 文件
5. **类型定义**：每个组件都有独立的 `types.ts`
6. **导出方式**：通过 `index.tsx` 统一导出

---

## 🎯 开发顺序建议

1. AIInputBar（最简单）
2. TopNavigationBar
3. CoverBanner
4. ActiveFilterTags
5. ContentTabBar
6. LeftSidePanel
7. FilterDrawer
8. ArticleListItem
9. TreeView
10. ResearcherSwiper（最复杂）

---

**更新时间**：2025-12-10
