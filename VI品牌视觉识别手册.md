# 职业照Pro — 品牌视觉识别手册 (VI)

> 版本：v1.0 | 更新：2026-04-30 | 设计：墨羽传媒 · 画师

---

## 目录

1. [品牌概述](#1-品牌概述)
2. [Logo 设计方案](#2-logo-设计方案)
3. [品牌色体系](#3-品牌色体系)
4. [字体规范](#4-字体规范)
5. [品牌辅助图形](#5-品牌辅助图形)
6. [应用规范](#6-应用规范)
7. [App 图标设计](#7-app-图标设计)
8. [错误使用示例](#8-错误使用示例)

---

## 1. 品牌概述

### 品牌定位

> **「职业照Pro」—— AI 生成你的专业形象照**

面向职场人士、求职者、创业者，提供无需去照相馆即可获得媲美专业摄影棚品质的证件照/商务形象照。

### 品牌关键词

`专业` `高效` `自信` `科技` `亲和`

### 品牌标语

- 主：**AI 生成你的专业形象照**
- 备：**一张好照片，打开职场大门**
- 备：**3 分钟，拥有百万级形象照**

---

## 2. Logo 设计方案

### 方案 A：文字标 + 图标（推荐）

```
┌─────────────────────────────────────────────────┐
│                                                   │
│        █████   █      ██████                      │
│       ██   ██ █      ██                           │
│       ███████ █      ██████    ╔════════════╗     │
│       ██   ██ █      ██        ║ 职业照 ║     │
│       ██   ██ ██████ ██████    ║    Pro     ║     │
│                                 ╚════════════╝     │
│      ↑ 图标区域                    ↑ 文字区域       │
│     (人像+镜头)                  (品牌名称)        │
│                                                   │
└─────────────────────────────────────────────────┘
```

#### 图标详解（SVG 描述）

人像轮廓 + 相机镜头的极简组合符号，可以用以下 SVG 实现：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <!-- 人像头部（圆形） -->
  <circle cx="48" cy="42" r="18" fill="none" stroke="#1B4B8C" stroke-width="3.5"/>
  <!-- 人像身体 -->
  <path d="M22 90 C22 68, 48 58, 48 58 C48 58, 74 68, 74 90" 
        fill="none" stroke="#1B4B8C" stroke-width="3.5" stroke-linecap="round"/>
  <!-- 相机镜头圆环 -->
  <circle cx="82" cy="48" r="20" fill="none" stroke="#F59E0B" stroke-width="3"/>
  <!-- 镜头内圈 -->
  <circle cx="82" cy="48" r="10" fill="#F59E0B" opacity="0.15"/>
  <circle cx="82" cy="48" r="4" fill="#F59E0B"/>
  <!-- 镜头高光 -->
  <circle cx="78" cy="44" r="2" fill="white" opacity="0.4"/>
</svg>
```

> **设计说明：** 左侧人像使用墨羽蓝勾勒极简上半身线条，右侧橙色相机镜头与之并置或部分叠合。整体传达"AI 摄影"的核心概念——人像 + 镜头。

#### 文字标排版

```
横版（标准）：
┌─────────────────────────────────────────────┐
│                                             │
│  [图标]  职 业 照 Pro                       │
│                                             │
│           ↑ 思源黑体 Heavy    ↑ 橙色 #F59E0B │
│             字号与图标等高     同字号斜体/加粗 │
│                                             │
└─────────────────────────────────────────────┘

竖版（图标在上）：
┌─────────┐
│         │
│  [图标] │
│         │
│ 职业照  │
│         │
│   Pro   │
│         │
└─────────┘
```

#### 横向组合参数

| 元素 | 说明 |
|:----|:-----|
| 图标尺寸 | 60×60px（参考） |
| 图标与文字间距 | 12px |
| "职业照"字号 | 40px，思源黑体 Heavy，#1B4B8C |
| "Pro"字号 | 40px，SF Pro Display Bold，#F59E0B |
| 整体高度 | 60px |

---

### 方案 B：纯文字标

```
横版标准型：
┌─────────────────────────────────────┐
│                                     │
│    职  业  照  P r o                │
│                                     │
│    ↑ #1B4B8C        ↑ #F59E0B      │
│    思源黑体 Heavy     SF Pro Display│
│                                     │
└─────────────────────────────────────┘

竖版型：
┌─────────────┐
│             │
│    职       │
│    业       │
│    照       │
│             │
│    P r o    │
│             │
└─────────────┘

横版_中文强调型：
┌─────────────────────────────────────┐
│                                     │
│   【职业照】Pro                      │
│                                     │
│   全大写中文标签      斜体英文       │
│   墨羽蓝             快乐橙         │
│                                     │
└─────────────────────────────────────┘
```

#### 文字标排版参数

| 参数 | 值 |
|:----|:---|
| 中文间距 | letter-spacing: 0.04em |
| Pro 间距 | letter-spacing: 0.02em |
| 中英间距 | 6px |
| 行高(竖版) | 1.2倍 |

---

### Logo 应用规范

#### ✅ 安全空间规则

```
┌─────────────────────────────────────────┐
│  ← 1/4H →                          │
│           ┌──────────────┐              │
│           │              │              │
│           │    LOGO      │  ← 1/4H      │
│           │   (H高度)     │              │
│           │              │              │
│           └──────────────┘              │
│  ← 1/4H →         ← 1/4H →        │
│           ← 1/4H →                    │
└─────────────────────────────────────────┘

安全空间 = 至少 Logo 高度的 1/4
```

#### ✅ 最小使用尺寸

- **含图标版本 (方案A):** ≥ 60px（屏幕）/ ≥ 15mm（印刷）
- **纯文字版本 (方案B):** ≥ 50px（屏幕）/ ≥ 12mm（印刷）
- **小程序 tabBar 图标:** 不低于 48px

#### ✅ 深色/浅色背景版本

| 场景 | Logo 颜色 | 适用位置 |
|:----|:---------|:--------|
| **浅色背景** | 标准色（墨羽蓝+橙） | 白/浅灰背景 |
| **深色背景** | 全白色（墨羽蓝→白色，橙→白） | 墨羽蓝/深色背景 |
| **中等背景** | 反白 Logo（全白） | 蓝色渐变区域 |
| **灰度模式** | 纯黑色（#1A1A1A） | 黑白印刷/灰度环境 |
| **单色场景** | 墨羽蓝单色 | 限制色彩场景 |

#### ❌ 禁用规则（红线）

| ❌ 禁止行为 | 说明 |
|:----------|:-----|
| 变形拉伸 | 始终保持宽高比 |
| 更改颜色 | 除非使用授权灰度/反白版本 |
| 添加阴影 | 不允许添加外发光、阴影、描边 |
| 旋转倾斜 | 始终保持水平 |
| 替换字体 | 不允许使用其他字体替代 |
| 拆解元素 | 不允许单独使用图标或"Pro" |
| 加外框 | 禁止为 Logo 添加额外边框或容器 |
| 叠加纹理 | 禁止将 Logo 放在复杂纹理图片上 |

---

## 3. 品牌色体系

### 品牌主色

| 用途 | 色号 | HEX | RGB | 场景 |
|:----|:----|:---:|:---:|:-----|
| **品牌主色** | 墨羽蓝 | `#1B4B8C` | 27,75,140 | 导航栏、标题、主按钮 |
| **主色浅色** | 墨羽蓝 10% | `#EBF0F8` | 235,240,248 | 背景区、浅色卡片 |
| **主色浅色 2** | 墨羽蓝 5% | `#F4F7FB` | 244,247,251 | 最浅背景 |
| **主色深色** | 墨羽蓝 80% | `#0F2D54` | 15,45,84 | 深色模式文字、底部 |

### 点缀色

| 用途 | 色号 | HEX | RGB | 场景 |
|:----|:----|:---:|:---:|:-----|
| **点缀色** | 快乐橙 | `#F59E0B` | 245,158,11 | CTA 按钮、强调、Pro 文字 |
| **橙色浅色** | 快乐橙 10% | `#FEF5E7` | 254,245,231 | 橙色标签背景 |
| **橙色深色** | 快乐橙 80% | `#B87500` | 184,117,0 | 按钮点按态 |

### 渐变色

| 名称 | 色值 | 角度 | 场景 |
|:----|:----|:----:|:-----|
| **品牌蓝渐变** | `linear-gradient(135deg, #1B4B8C 0%, #2A6BBF 50%, #3A7BD5 100%)` | 135° | 品牌头图、Hero 区 |
| **品牌橙渐变** | `linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)` | 135° | 主要 CTA 按钮 |
| **深浅蓝渐变** | `linear-gradient(180deg, #EBF0F8 0%, #FFFFFF 100%)` | 180° | 页面分段背景 |
| **墨羽渐变** | `linear-gradient(135deg, #0F2D54 0%, #1B4B8C 100%)` | 135° | 深色模式背景 |

### 功能色

| 用途 | HEX | RGB | 场景 |
|:----|:---:|:---:|:-----|
| **专业绿** | `#10B981` | 16,185,129 | 成功状态、已完成 |
| **警示红** | `#EF4444` | 239,68,68 | 错误、删除、警告 |
| **注意黄** | `#F59E0B` | 245,158,11 | 提示、待处理 |
| **信息蓝** | `#3B82F6` | 59,130,246 | 信息提示 |

### 摄影/中性色

| 用途 | HEX | RGB | 场景 |
|:----|:---:|:---:|:-----|
| **柔光灰** | `#F8FAFC` | 248,250,252 | 页面主背景 |
| **镜头银** | `#E2E8F0` | 226,232,240 | 分割线、边框 |
| **雾灰** | `#CBD5E1` | 203,213,225 | 禁用状态、占位 |
| **石板灰** | `#64748B` | 100,116,139 | 次级文字 |
| **深灰** | `#334155` | 51,65,85 | 正文 |
| **纯黑** | `#0F172A` | 15,23,42 | 主标题文字 |

### 色彩比例建议

```
页面色彩构成（UI 场景）：
┌──────────────────────────────────────┐
│                                      │
│  70% 中性色（灰白基调） → 舒适、干净  │
│                                      │
│  20% 品牌蓝（墨羽蓝） → 专业、可信    │
│                                      │
│  10% 快乐橙（强调色） → 行动指引      │
│                                      │
└──────────────────────────────────────┘
```

---

## 4. 字体规范

### 字体选择

| 用途 | 中文字体 | 英文字体 | 回退字体 |
|:----|:--------|:--------|:--------|
| 标题 | 思源黑体 (Noto Sans SC) | SF Pro Display | PingFang SC, Helvetica Neue |
| 正文 | 思源黑体 (Noto Sans SC) | SF Pro Text | PingFang SC, -apple-system |
| 码字/数据 | — | SF Mono / Menlo | Courier New |

### 字号体系（微信小程序 rpx）

```
H1  ── 52rpx ── 品牌标题、大数字展示
H2  ── 44rpx ── 页面主标题
H3  ── 36rpx ── 模块标题、卡片标题
H4  ── 32rpx ── 列表标题、弹窗标题
Body ── 28rpx ── 正文、说明文字
Small ── 24rpx ── 辅助文字、时间戳
Tiny ── 20rpx ── 标签、角标、Tab 文字

（注：以上为小程序 750 设计稿标准，换算公式：px = rpx / 2）
```

### 字重规范

| 层级 | 字重 | 值 |
|:----|:----|:--:|
| H1 / H2 | Heavy / ExtraBold | 800~900 |
| H3 / H4 | Bold | 700 |
| 正文 Body | Regular | 400 |
| 按钮文字 | Medium | 500 |
| Small / Tiny | Regular | 400 |

### 行高规范

| 层级 | 行高倍率 |
|:----|:--------:|
| 标题 (H1~H4) | 1.3x |
| 正文 (Body) | 1.6x |
| 辅助文字 | 1.4x |

### 用色规范

| 层级 | 颜色 | 不透明度 |
|:----|:----|:--------:|
| 主标题 | `#0F172A` (纯黑) | 100% |
| 正文 | `#334155` (深灰) | 100% |
| 次级文字 | `#64748B` (石板灰) | 100% |
| 占位/禁用 | `#CBD5E1` (雾灰) | 100% |
| 链接/品牌 | `#1B4B8C` (墨羽蓝) | 100% |
| 强调 | `#F59E0B` (快乐橙) | 100% |

### 代码示例（app.wxss）

```css
/* 品牌字体变量 */
page {
  --font-family-cn: "Noto Sans SC", "PingFang SC", -apple-system, sans-serif;
  --font-family-en: "SF Pro Display", "Helvetica Neue", sans-serif;
  --font-family-mono: "SF Mono", Menlo, monospace;
  
  --font-h1: 52rpx;
  --font-h2: 44rpx;
  --font-h3: 36rpx;
  --font-h4: 32rpx;
  --font-body: 28rpx;
  --font-small: 24rpx;
  --font-tiny: 20rpx;
  
  --weight-heavy: 800;
  --weight-bold: 700;
  --weight-medium: 500;
  --weight-regular: 400;
  
  --line-height-tight: 1.3;
  --line-height-normal: 1.6;
  --line-height-small: 1.4;
}
```

---

## 5. 品牌辅助图形

### 图形 1：抽象人像轮廓线条

极简侧脸轮廓线，用于页面背景装饰。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <!-- 侧面人像轮廓 -->
  <path d="M100 20 
           C120 20, 140 40, 140 60 
           C140 75, 130 85, 130 90
           C145 95, 155 105, 155 120
           C155 135, 140 145, 120 145
           L120 155
           C135 160, 150 175, 155 195
           L155 200
           L45 200
           C45 175, 60 155, 80 145
           L80 130
           C60 125, 50 110, 50 95
           C50 75, 65 60, 70 55
           C70 40, 85 20, 100 20Z"
        fill="none" stroke="#1B4B8C" stroke-width="2" opacity="0.06"/>
</svg>
```

**使用场景：** 品牌登录页背景、卡片水印装饰、分享海报底纹。

### 图形 2：相机光圈环形

多层嵌套圆环，模拟相机镜头光圈叶片。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- 外层光圈环 -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="#1B4B8C" stroke-width="1.5" opacity="0.08"/>
  <circle cx="100" cy="100" r="70" fill="none" stroke="#1B4B8C" stroke-width="1.5" opacity="0.08"/>
  <circle cx="100" cy="100" r="55" fill="none" stroke="#1B4B8C" stroke-width="2" opacity="0.10"/>
  <!-- 光圈叶片（6角形） -->
  <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" 
           fill="none" stroke="#1B4B8C" stroke-width="1.5" opacity="0.06"/>
  <polygon points="100,60 140,80 140,120 100,140 60,120 60,80" 
           fill="none" stroke="#1B4B8C" stroke-width="1.5" opacity="0.08"/>
  <!-- 中心点 -->
  <circle cx="100" cy="100" r="8" fill="#F59E0B" opacity="0.15"/>
  <circle cx="100" cy="100" r="3" fill="#F59E0B" opacity="0.6"/>
</svg>
```

**使用场景：** Loading 动画元素、品牌水印、功能卡片装饰角标。

### 图形 3：相框/照片直角

顶部带有折角照片效果的矩形框，模拟相片。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 220" width="180" height="220">
  <!-- 照片主体（圆角矩形） -->
  <rect x="10" y="20" width="160" height="190" rx="8" ry="8"
        fill="none" stroke="#1B4B8C" stroke-width="1.5" opacity="0.06"/>
  <!-- 内框（照片内容区） -->
  <rect x="25" y="50" width="130" height="110" rx="4" ry="4"
        fill="none" stroke="#1B4B8C" stroke-width="1" opacity="0.08"/>
  <!-- 顶部折角效果 -->
  <path d="M10 20 L10 40 L30 20 Z" 
        fill="#F59E0B" opacity="0.1"/>
  <path d="M10 40 L30 20 L30 40 Z" 
        fill="#1B4B8C" opacity="0.05"/>
  <!-- 底部文字模拟 -->
  <line x1="35" y1="180" x2="95" y2="180" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
  <line x1="35" y1="190" x2="80" y2="190" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
</svg>
```

**使用场景：** 模板选择框图标、相册入口图标、结果展示框装饰。

---

## 6. 应用规范

### 6.1 首页品牌露出

#### 品牌头图区（Hero）

```wxml
<!-- 品牌头图区域 -->
<view class="brand-hero" style="background: linear-gradient(135deg, #1B4B8C, #2A6BBF);">
  <view class="brand-hero-content">
    <text class="brand-logo-text">职业照<text class="brand-pro">Pro</text></text>
    <text class="brand-tagline">AI生成你的专业形象照</text>
  </view>
</view>
```

```wxss
.brand-hero {
  width: 100%;
  padding: 80rpx 40rpx 60rpx;
  border-radius: 0 0 40rpx 40rpx;
  position: relative;
  overflow: hidden;
}
.brand-hero::before {
  content: '';
  position: absolute;
  top: -60rpx;
  right: -40rpx;
  width: 200rpx;
  height: 200rpx;
  background: url('data:image/svg+xml,...') no-repeat; /* 光圈装饰 */
  opacity: 0.1;
}
.brand-hero-content {
  position: relative;
  z-index: 1;
}
.brand-logo-text {
  font-size: var(--font-h1);
  font-weight: var(--weight-heavy);
  color: #FFFFFF;
  letter-spacing: 0.04em;
}
.brand-pro {
  color: #FBBF24;
  font-style: italic;
  font-weight: var(--weight-bold);
}
.brand-tagline {
  display: block;
  margin-top: 16rpx;
  font-size: var(--font-small);
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.06em;
}
```

**备选：纯文字品牌头图**

```wxml
<view class="brand-hero-simple" style="background: linear-gradient(135deg, #1B4B8C, #3A7BD5);">
  <image class="brand-hero-icon" src="/images/icon-logo.svg" mode="aspectFit"></image>
  <text class="brand-slogan">职业照Pro</text>
  <text class="brand-subtitle">3分钟 · 拍出百万级形象照</text>
</view>
```

### 6.2 导航栏

```wxml
<!-- 自定义导航栏 -->
<view class="nav-bar" style="background-color: #1B4B8C;">
  <view class="nav-bar-left">
    <image class="nav-logo" src="/images/logo-white.svg" mode="aspectFit"></image>
  </view>
  <view class="nav-bar-title">职业照Pro</view>
  <view class="nav-bar-right">
    <button class="nav-share-btn">分享</button>
  </view>
</view>
```

**导航栏规范：**
- 背景色：墨羽蓝 `#1B4B8C`
- 标题文字：白色，最少字号 32rpx
- 返回箭头：白色
- 状态栏沉浸式（自定义导航栏）

### 6.3 Loading 页

```wxml
<!-- 启动 Loading -->
<view class="splash-screen" style="background: linear-gradient(135deg, #1B4B8C, #2A6BBF);">
  <view class="splash-content">
    <image class="splash-logo" src="/images/logo-white.svg" mode="aspectFit"></image>
    <view class="splash-loading-ring"></view>
    <text class="splash-text">正在加载...</text>
  </view>
</view>
```

```wxss
/* Loading 旋转光圈动画 */
.splash-loading-ring {
  width: 48rpx;
  height: 48rpx;
  border: 4rpx solid rgba(255,255,255,0.2);
  border-top-color: #F59E0B;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 32rpx auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 6.4 分享卡片（转发到微信）

```wxml
// app.js 中设置
wx.showShareMenu({
  withShareTicket: true,
  menus: ['shareAppMessage', 'shareTimeline']
})

// 页面 onShareAppMessage
onShareAppMessage() {
  return {
    title: '职业照Pro - AI生成你的专业形象照',
    imageUrl: '/images/share-card.jpg',  // 800×800px
    desc: '3分钟拥有专业级形象照，面试/职场/社交都能用'
  }
}
```

**分享卡片设计规范：**
- 尺寸：800×800px（正方形）
- 背景：墨羽蓝渐变
- 中心：品牌 Logo（白色）
- 底部：二维码（小程序码）引导
- 文字区域留白不低于 30%

### 6.5 小程序头像

- **头像形状：** 圆形（微信自动裁剪）
- **头像内容：** 方案A图标（去文字，仅人像+镜头组合）
- **背景色：** `#1B4B8C` 纯色背景
- **图标色：** 白色人像 + 橙色镜头
- **文件格式：** PNG，透明背景也可，但微信推荐带背景色

### 6.6 首页功能卡片组件

```wxml
<!-- 功能卡片品牌规范 -->
<view class="feature-card" style="background: linear-gradient(135deg, #EBF0F8, #FFFFFF);">
  <view class="card-icon" style="background: #1B4B8C;">
    <!-- 功能图标 -->
  </view>
  <text class="card-title">上传照片</text>
  <text class="card-desc">支持自拍或已有照片</text>
</view>
```

**卡片规范：**
- 圆角：16rpx
- 背景：柔光灰 `#F8FAFC` 或浅蓝渐变
- 阴影：`box-shadow: 0 4rpx 12rpx rgba(27,75,140,0.08)`
- 图标容器：44×44rpx，墨羽蓝圆角背景，白色图标

### 6.7 底部 TabBar

```wxml
// app.json
"tabBar": {
  "color": "#64748B",
  "selectedColor": "#1B4B8C",
  "backgroundColor": "#FFFFFF",
  "borderStyle": "black",
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "images/tab-home.png",
      "selectedIconPath": "images/tab-home-active.png"
    },
    {
      "pagePath": "pages/templates/templates",
      "text": "模板",
      "iconPath": "images/tab-template.png",
      "selectedIconPath": "images/tab-template-active.png"
    },
    {
      "pagePath": "pages/my/my",
      "text": "我的",
      "iconPath": "images/tab-my.png",
      "selectedIconPath": "images/tab-my-active.png"
    }
  ]
}
```

### 6.8 空状态页

```wxml
<view class="empty-state">
  <view class="empty-icon" style="background: #EBF0F8; border-radius: 50%;">
    <!-- 空状态图标：相机光圈轮廓 -->
  </view>
  <text class="empty-title">还没有作品哦</text>
  <text class="empty-desc">快去拍一张你的专属职业照吧</text>
  <button class="btn-primary" style="background: linear-gradient(135deg, #F59E0B, #FBBF24); color: #FFFFFF;">
    立即拍摄
  </button>
</view>
```

### 6.9 按钮体系

```css
/* 主要按钮（CTA） */
.btn-primary {
  background: linear-gradient(135deg, #F59E0B, #FBBF24);
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 48rpx;
  padding: 24rpx 48rpx;
  box-shadow: 0 4rpx 16rpx rgba(245,158,11,0.3);
}
/* 主要按钮点按态 */
.btn-primary:active {
  background: linear-gradient(135deg, #B87500, #F59E0B);
}

/* 次要按钮 */
.btn-secondary {
  background: #1B4B8C;
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 48rpx;
  padding: 24rpx 48rpx;
}
.btn-secondary:active {
  background: #0F2D54;
}

/* 线框按钮 */
.btn-outline {
  background: transparent;
  border: 2rpx solid #1B4B8C;
  color: #1B4B8C;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 48rpx;
  padding: 24rpx 48rpx;
}
.btn-outline:active {
  background: #EBF0F8;
}

/* 文字按钮 */
.btn-text {
  background: transparent;
  color: #1B4B8C;
  font-size: 28rpx;
  padding: 8rpx;
}
```

---

## 7. App 图标设计

### 设计说明

| 项目 | 规范 |
|:----|:-----|
| 尺寸 | **1024×1024 px** |
| 背景色 | 墨羽蓝 `#1B4B8C` |
| 中心元素 | 白色极简人像轮廓 + 橙色镜头点缀 |
| 圆角 | 圆角矩形（iOS 风格圆角） |
| 格式 | PNG |
| 文件大小 | ≤ 500KB |

### 结构描述

```
┌────────────────────────────┐
│                            │
│        ██████████           │
│     ███  墨羽蓝  ███        │
│    ██   背景 #1B4B8C  ██    │
│   ██                     ██  │
│   █    ┌──────────┐      █  │
│   █    │  人像轮廓   │      █  │
│   █    │  (白色)    │      █  │
│   █    │  ┌────┐   │      █  │
│   █    │  │橙色│   │      █  │
│   █    │  │镜头│   │      █  │
│   █    │  └────┘   │      █  │
│   █    └──────────┘      █  │
│   ██                     ██  │
│    ██      ████          ██  │
│     ███              ███    │
│        ██████████████       │
│                            │
└────────────────────────────┘
```

### SVG 参考

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <!-- 背景圆角矩形 -->
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B4B8C"/>
      <stop offset="100%" stop-color="#2A6BBF"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" rx="200" ry="200" fill="url(#bgGrad)"/>
  
  <!-- 人像头部 -->
  <circle cx="420" cy="370" r="140" fill="none" stroke="white" stroke-width="24"/>
  
  <!-- 人像身体 -->
  <path d="M200 780 C200 600, 420 530, 420 530 C420 530, 640 600, 640 780" 
        fill="none" stroke="white" stroke-width="24" stroke-linecap="round"/>
  
  <!-- 镜头外圈 -->
  <circle cx="660" cy="420" r="150" fill="none" stroke="#F59E0B" stroke-width="20"/>
  
  <!-- 镜头内圈 -->
  <circle cx="660" cy="420" r="80" fill="#F59E0B" opacity="0.15"/>
  <circle cx="660" cy="420" r="30" fill="#F59E0B"/>
  
  <!-- 镜头高光 -->
  <circle cx="640" cy="400" r="12" fill="white" opacity="0.4"/>
</svg>
```

### 各平台适配

| 平台 | 尺寸 | 格式 |
|:----|:----|:----:|
| iOS App Store | 1024×1024 | PNG |
| 微信小程序 | 180×180 | PNG |
| Android | 512×512 | PNG |
| 网站 favicon | 32×32 | ICO |
| 安卓通知栏 | 48×48 | PNG |

---

## 8. 错误使用示例

### ❌ 常见错误示范

```
❌ 错误1：Logo 变形
  [正常]   (宽高比 1:1)
  [错误]   (拉伸到 2:1)    → 不可压缩或拉伸

❌ 错误2：Logo 被压缩
  [正常]  清晰边缘留白
  [错误]  左右贴边          → 破坏安全空间

❌ 错误3：Logo 加描边
  [正常]  无任何外框修饰
  [错误]  加白色描边        → 破坏视觉纯净度

❌ 错误4：更改颜色
  [正常]  墨羽蓝 #1B4B8C + 橙 #F59E0B
  [错误]  改为红色/绿色     → 仅在授权灰度版本可用

❌ 错误5：Pro 文字变大
  [正常]  与中文同字号
  [错误]  Pro 远大于中文    → "Pro"不得大于中文

❌ 错误6：图标与文字分离使用
  [正常]  完整组合
  [错误]  只发图标不带字    → 首次使用必须完整露出

❌ 错误7：背景过花
  [正常]  纯色干净背景
  [错误]  放在风景/人像照上 → 至少与背景有 60% 对比度
```

### ✅ 正确使用清单

- [ ] Logo 在浅色背景使用标准色版本
- [ ] Logo 在深色背景使用反白版本
- [ ] Logo 周围保留 1/4H 安全空间
- [ ] Logo 不小于最小使用尺寸
- [ ] 品牌蓝色为主，橙色点缀 ≤ 10%
- [ ] 字体使用思源黑体 + SF Pro
- [ ] 图片版权清晰，人物肖像已授权

---

## 附录：资源文件清单

建议准备的资源文件：

| 文件 | 说明 | 格式 |
|:----|:----|:----:|
| `logo-standard.svg` | 标准版 Logo（横版） | SVG |
| `logo-vertical.svg` | 竖版 Logo | SVG |
| `logo-white.svg` | 反白版本 | SVG |
| `logo-icon.svg` | 仅图标（小程序头像用） | SVG |
| `logo-icon-white.svg` | 反白图标 | SVG |
| `brand-gradient-blue.png` | 蓝色渐变背景 | PNG |
| `brand-gradient-orange.png` | 橙色渐变背景 | PNG |
| `share-card-template.png` | 分享卡片模板 | PSD/PNG |
| `app-icon-ios.png` | iOS 应用图标 | 1024×1024 PNG |
| `app-icon-miniprogram.png` | 小程序图标 | 180×180 PNG |

---

> **设计团队：** 墨羽传媒 · 画师
> 
> **版本记录：** v1.0 初始版本 — 2026-04-30
