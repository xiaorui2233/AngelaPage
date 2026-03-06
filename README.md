# AngelaPage 开发指南

## 项目概述

AngelaPage 是一个部署在 GitHub Pages 上的 Astro 静态博客，支持：

- 文章发布与管理（Markdown）
- 可视化背景配置
- PWA（Service Worker）

- **线上地址**: https://xiaorui2233.github.io/AngelaPage/
- **仓库地址**: https://github.com/xiaorui2233/AngelaPage

## 技术栈

- **框架**: Astro 4.x
- **部署**: GitHub Actions + GitHub Pages
- **内容**: Astro Content Collections（`src/content/posts`）

## 目录结构

```text
AngelaPage/
├── src/
│   ├── components/             # 页面组件（Header/Footer/Sidebar/ArticleCard）
│   ├── content/
│   │   ├── config.ts           # 内容集合定义
│   │   └── posts/              # 博客文章（Markdown）
│   ├── data/
│   │   └── background-config.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
├── public/
│   ├── publish-gui.html        # 线上可访问发布工具
│   └── sw.js                   # Service Worker
├── publish-gui.html            # 本地直接打开的发布工具（与 public 版本同步）
├── .github/workflows/deploy.yml
└── astro.config.mjs
```

## 本地开发

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run build
npm run preview
```

## 部署与图片路径说明

站点部署在 `/AngelaPage/` 基路径下，因此站内资源推荐使用：

- 相对站点路径：`/AngelaPage/images/xxx.png`
- 绝对线上地址：`https://xiaorui2233.github.io/AngelaPage/images/xxx.png`

GitHub Actions 会在构建前执行图片同步步骤，将仓库 `images/` 复制到 `public/images/`，以确保 Pages 构建产物中存在对应图片目录。

## Angela 博客发布工具（publish-gui）

`publish-gui.html` / `public/publish-gui.html` 提供以下能力：

1. 发布新文章（创建 Markdown）
2. 管理文章（加载、编辑、删除）
3. 可视化编辑 `src/data/background-config.json`
4. 从仓库图片选择器插入图片（支持相对路径 / 绝对地址两种模式）

### 使用步骤

1. 打开 `publish-gui.html`（本地）或访问线上 `https://xiaorui2233.github.io/AngelaPage/publish-gui.html`
2. 输入具备 repo 权限的 GitHub Token
3. 选择对应功能页签执行操作

### 背景配置建议

在背景设置中可使用“**套用推荐背景源**”按钮，自动填充：

1. `https://xiaorui2233.github.io/AngelaPage/images/background.png`
2. `/AngelaPage/images/background.png`
3. 远程兜底图源

这样可在 Pages 已部署时优先命中稳定绝对地址，同时保留站内路径回退。

## 文章 Frontmatter 示例

```markdown
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-03-01
tags: ["前端", "Astro"]
category: "默认"
cover: "/AngelaPage/images/example.png"
---

正文内容...
```

## 开发注意事项

1. 该项目为静态站点，避免依赖运行时服务器状态。
2. 修改 `public/publish-gui.html` 后，请同步 `publish-gui.html`，保持两份一致。
3. 与图片路径相关的功能应优先考虑 `/AngelaPage/` base path。
