# AngelaPage 改版方案（UI/UX + IA + 功能增强）

## 1) 当前网站分析

### 1.1 页面结构（现状）

当前站点基于 Astro 静态路由，主要页面包括：

- `/` 首页（展示 Hero + 最新文章）
- `/posts/[slug]` 文章详情页
- `/archive` 归档页
- `/tags` 标签列表页
- `/tags/[tag]` 标签详情页
- `/search` 搜索页
- `/about` 关于页
- `/friends` 友链页
- `/rss.xml` RSS

### 1.2 UI 设计（现状）

现有风格以“玻璃态 + 动态背景 + 鼠标跟随”为核心，视觉冲击明显，但阅读导向较弱：

- 主体视觉重心在背景与动效，而非文章内容。
- 页面布局偏单层卡片流，缺少明确“阅读模式”与“信息密度层级”。
- 导航结构完整，但没有“当前页高亮/面包屑/二级导航”等细化引导。

### 1.3 信息布局（现状）

- 首页主要是最新文章卡片，缺少“专题/置顶/分类入口/项目入口”信息组织。
- 文章页仅含标题、时间、标签和正文，缺少 TOC、阅读时间、上一篇/下一篇、相关推荐。
- 关于页与友链页内容偏静态，未沉淀为站点资产（如技能栈、时间线、项目陈列）。

### 1.4 用户体验（现状）

优点：

- 页面过渡与动效完整。
- 移动端已有基础响应式。

不足：

- 部分动效与背景可能影响文本对比度与可读性。
- 博客高频任务（按主题浏览、快速检索、持续阅读）支持不足。
- 搜索能力、内容发现能力、阅读辅助能力不够强。

### 1.5 技术栈（现状）

- Astro 4 + Astro Content Collection + RSS 插件。
- 纯静态输出（GitHub Pages 友好）。
- 当前未引入 UI 设计系统、组件库、主题系统（暗黑/浅色）和站内全文搜索方案。

### 1.6 页面加载结构（现状）

- BaseLayout 统一注入字体、背景脚本、鼠标跟随、页面切换效果。
- 动效脚本与背景加载逻辑较重，可能占据首屏注意力和执行时间预算。

### 1.7 SEO 结构（现状）

- 已有基础 meta description 与 RSS。
- 缺失系统化 SEO：Open Graph、Twitter Card、canonical、结构化数据（JSON-LD）、sitemap（建议明确）等。

---

## 2) 当前问题清单

### UI 设计问题

1. 视觉重心偏背景特效，正文内容优先级不足。
2. 卡片样式统一度高但信息层次浅，缺少“主次信息”节奏。
3. 阅读页缺乏沉浸式排版优化（行宽、行高、段间距、代码块可读性）。

### 页面排版问题

1. 首页“内容运营位”不足（置顶、专题、系列、项目入口）。
2. 列表页和详情页之间缺少“路径连接”（相关推荐、上下篇）。
3. 侧栏缺失，导致标签、分类、作者信息无法形成稳定信息锚点。

### 信息层级问题

1. 站点级信息架构较平，缺少 Projects / Timeline / Links 的独立定位。
2. 标签已有但“分类（category）→归档→主题页”关系不清晰。

### 交互与功能问题

1. 暗黑模式缺失。
2. 搜索功能如仅前端过滤，缺少索引、拼写容错与结果高亮。
3. 无 TOC、阅读进度、图片灯箱、复制代码按钮等阅读增强功能。

### 博客阅读适配问题

1. 文章阅读指标缺失（阅读时长、字数、发布时间/更新时间）。
2. 内容发现链路短（无推荐、无系列导航）。

### 移动端体验问题

1. 导航与内容区在小屏下信息密度控制不足。
2. 动效在移动端可能引发卡顿和误触成本。

### GitHub Pages 约束问题

1. 无服务端检索能力，需采用静态索引搜索（Pagefind / Fuse.js）。
2. 评论与统计需依赖第三方（Giscus、Umami/Plausible/GA）。

---

## 3) 新信息架构设计（IA）

## 3.1 网站结构图（建议）

```text
Home
├─ Featured Posts（置顶）
├─ Latest Posts（最新）
├─ Topics（专题/分类）
└─ Quick Entry（Projects / About / Links）

Blog
├─ All Posts
├─ Category
├─ Tag
└─ Archive (Year/Month)

Post Detail
├─ TOC
├─ Content
├─ Prev/Next
└─ Related Posts

Projects
├─ Project List
└─ Project Detail (optional static page)

About
├─ Bio
├─ Tech Stack
└─ Timeline

Links
└─ Friends / 推荐资源

Search
└─ Full-text Search Result
```

### 3.2 页面层级

- 一级页面：Home / Blog / Tags / Projects / About / Links / Search
- 二级页面：Post Detail / Tag Detail / Category Detail / Archive
- 辅助层：RSS / sitemap / 404 / 隐私与版权说明

### 3.3 导航结构

- 顶部主导航：Home, Blog, Tags, Projects, About, Links, Search
- 次级导航（Blog 内）：Latest, Archive, Categories
- 文章页右侧：TOC + 相关推荐 + 作者卡片
- Footer：RSS、GitHub、版权、订阅入口

---

## 4) UI Layout 重设计（现代技术博客风格）

目标：兼顾 **Vercel Blog 的克制感** 与 **Angela 主题的轻动漫情绪**，采用“高可读性 + 轻动效”策略。

### 4.1 Header 结构

- 左侧：Logo / SiteName（Angela.dev）
- 中部：主导航（Blog 优先）
- 右侧：Search 按钮 + Theme Toggle + GitHub 图标
- 吸顶（sticky）+ 滚动轻微毛玻璃

### 4.2 Hero Section

- 一句话定位（个人品牌 Slogan）
- 次级文案（最近更新频率/内容方向）
- CTA：`开始阅读`、`查看项目`
- 可选：轻量插画/角色头像（Anime 气质）

### 4.3 Article List

- 支持“Card / Compact”双视图
- 每条包含：标题、摘要、标签、发布日期、阅读时间
- 置顶文章区与普通文章区分层
- 可按 tag / category 筛选

### 4.4 Sidebar（桌面端）

- 作者信息卡（头像、简介、社媒）
- 热门标签云
- 最近文章
- 项目入口

### 4.5 Footer

- 三列：Site Map / Social / Subscribe
- 增加 RSS、版权、站点版本信息（如 v2.0）

---

## 5) 完整功能升级方案

### 5.1 博客核心功能

- 标签系统（强化页内筛选与聚合页）
- 分类系统（category page）
- TOC（根据 Markdown 标题生成）
- 阅读时间（基于字数估算）
- 相关文章推荐（同标签优先 + 时间衰减）

### 5.2 用户体验功能

- 暗黑模式（系统跟随 + 本地持久化）
- 页面过渡动画（轻量，respect `prefers-reduced-motion`）
- 图片灯箱（中小图库）
- 搜索（Pagefind 或 Fuse.js）

### 5.3 内容展示功能

- Projects 页面（卡片 + 技术栈 + 外链）
- GitHub Repo 展示（构建时拉取或手动数据源）
- Timeline（学习/经历节点）
- Tech Stack 页面/区块

### 5.4 社区与增长

- 评论系统：Giscus
- 访客统计：Umami / Plausible（或 GA）
- 订阅：RSS + 邮件订阅入口（可选）

---

## 6) 技术实现建议（适配 GitHub Pages）

### 推荐技术组合

- 框架：Astro（保留）
- 样式：Tailwind CSS + CSS Variables（主题管理）
- 内容：MDX + Astro Content Collections
- 代码高亮：Shiki
- 搜索：Pagefind（纯静态优先）或 Fuse.js（轻量）
- 评论：Giscus（GitHub Issues）
- 分析：Umami / Plausible / GA

### 工程建议

- 统一 SEO 组件：`<SEO />`
- 统一内容组件：`ArticleCard / TagChip / TOC / Prose`
- 统一配置中心：`src/config/site.ts`

---

## 7) 分阶段开发计划

### Phase 1：UI Redesign（1~2 周）

- 建立设计令牌（颜色、字体、间距、阴影、圆角）
- 完成 Home / Blog / Post Layout 改版
- 完成 Header / Footer / Sidebar 组件化

### Phase 2：功能增强（1~2 周）

- 上线分类、TOC、阅读时间、相关文章
- 完成 Projects / Timeline / Tech Stack 页面
- 完成搜索（Pagefind）

### Phase 3：SEO 优化（3~5 天）

- OG/Twitter/canonical
- JSON-LD（BlogPosting、Breadcrumb）
- sitemap + robots + 404 优化

### Phase 4：交互动画与体验打磨（3~5 天）

- 暗黑模式切换
- 页面过渡与图片灯箱
- `prefers-reduced-motion` 与移动端性能优化

---

## 8) 推荐目录结构

```text
src
├─ components
│  ├─ layout
│  │  ├─ Header.astro
│  │  ├─ Footer.astro
│  │  └─ Sidebar.astro
│  ├─ blog
│  │  ├─ ArticleCard.astro
│  │  ├─ TOC.astro
│  │  ├─ TagChip.astro
│  │  └─ ReadingTime.astro
│  └─ common
│     ├─ SEO.astro
│     ├─ ThemeToggle.astro
│     └─ SearchModal.astro
├─ layouts
│  ├─ BaseLayout.astro
│  └─ PostLayout.astro
├─ pages
│  ├─ index.astro
│  ├─ blog/index.astro
│  ├─ blog/[slug].astro
│  ├─ tags/index.astro
│  ├─ tags/[tag].astro
│  ├─ categories/[category].astro
│  ├─ projects.astro
│  ├─ about.astro
│  ├─ links.astro
│  └─ search.astro
├─ content
│  ├─ posts
│  ├─ projects
│  └─ config.ts
├─ styles
│  ├─ globals.css
│  ├─ prose.css
│  └─ theme.css
├─ config
│  └─ site.ts
└─ utils
   ├─ seo.ts
   ├─ related.ts
   └─ reading-time.ts
```

---

## 9) 最终输出（可直接执行的改版蓝图）

### 改版规划

- 从“视觉特效优先”转向“内容阅读优先 + 品牌视觉点缀”。
- 建立 Blog 为核心的信息架构，Projects/About/Links 作为品牌与社交延展。

### UI 结构

- Header（导航 + 搜索 + 主题切换）
- Home（Hero + 置顶 + 最新 + 入口）
- Post（正文 + TOC + 推荐 + 上下篇）
- Sidebar（作者、标签、最近文章）
- Footer（站点地图 + 订阅 + 社媒）

### 功能列表

- 分类、标签、TOC、阅读时间、相关推荐
- 暗黑模式、搜索、灯箱、过渡动画
- Projects、GitHub Repo、Timeline、Tech Stack
- Giscus 评论、访问统计

### 技术方案

- Astro + Tailwind + MDX + Shiki
- Pagefind/Fuse.js + Giscus + Umami/Plausible
- 纯静态友好，符合 GitHub Pages 约束

### 实施步骤

1. 先重构布局与组件体系（不改内容模型）。
2. 再接入搜索、评论、统计等插件能力。
3. 最后补全 SEO、性能与动画策略。
4. 按阶段发布，确保每阶段都可独立上线。
