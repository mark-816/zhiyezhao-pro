# 🏗️ 职业照Pro · AI推理管线完整方案

> 编写：AI工程师
> 日期：2026-04-29
> 目标：搭建从「用户上传照片」到「输出职业照」的完整AI推理流水线

---

## 一、管线总览

```
用户上传 5-8 张自拍
        │
        ▼
┌──────────────────┐
│   1. 预处理层     │  照片质量检测、人脸裁剪、对齐、背景去除
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   2. 人脸编码层    │  提取 FaceID Embedding / InstantID 特征
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   3. 生成层       │  SDXL + LoRA + ControlNet → 批量生成形象照
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   4. 后处理层     │  GFPGAN 面部修复 + Real-ESRGAN 超分
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│   5. 输出层       │  裁剪为标准尺寸 + 压缩 + CDN 分发
└──────────────────┘
```

---

## 二、各层详解

### 🔧 第1层：预处理（Preprocessing）

**目标：** 从用户上传的照片中提取可用的人脸

| 子步骤 | 工具/模型 | 说明 |
|:------|:---------|:------|
| ① 人脸检测 | **RetinaFace / MTCNN** | 检测照片中的人脸位置 |
| ② 质量评估 | **人脸清晰度评分** | 模糊/遮挡检测，<0.5分自动过滤 |
| ③ 人脸裁剪 | **自动裁剪** | 按 1:1 比例裁剪人脸区域 |
| ④ 五点对齐 | **Face Alignment** | 根据眼睛/鼻子/嘴角对齐 |
| ⑤ 背景去除 | **RMBG v1.4 / rembg** | 去除原背景，便于后续合成 |

**输入：** 用户上传的 5-8 张自拍（JPG/PNG）
**输出：** 3-5 张高质量对齐人脸（裁剪到 512×512）

### 🧬 第2层：人脸编码（Face Encoding）

**目标：** 提取人脸特征向量，作为后续生成的身份锚点

| 方式 | 模型 | 说明 |
|:----|:-----|:------|
| **推荐方案** | **InstantID + IP-Adapter-FaceID** | 直接提取人脸embedding，保持身份一致性最强 |
| 备选方案 | **ArcFace** | 传统人脸识别embedding，稳定但风格迁移弱 |
| 轻量方案 | **InsightFace** | 速度最快，适合移动端或低配GPU |

**推荐技术组合：**
```
IP-Adapter-FaceID (Face Embedding) 
    + 
InsightFace (Face Analysis for age/gender/pose)
```

**输出：** 768维人脸特征向量 + 人脸分析数据（姿态/年龄/性别）

### 🎨 第3层：生成（Generation）

**目标：** 用 Stable Diffusion 批量生成多风格职业照

这是最核心的一层，也是最耗时、最耗算力的部分。

#### 3.1 模型选择

| 模型 | 特点 | 推荐 |
|:----|:-----|:----:|
| **SDXL** | 1024×1024 高质量输出，写实人像表现好 | ⭐⭐⭐⭐⭐ |
| **RealVisXL V4.0** | 基于SDXL专门优化的写实人像模型 | ⭐⭐⭐⭐⭐ |
| **Juggernaut XL** | 人像摄影风格最强 | ⭐⭐⭐⭐ |
| **SD3.5** | 最新，文字理解力强但生态不如SDXL | ⭐⭐⭐ |

**推荐：SDXL + RealVisXL V4.0**

#### 3.2 身份保持方案

| 方案 | 效果 | 速度 | 部署难度 |
|:----|:---:|:----:|:--------:|
| **InstantID** | ⭐⭐⭐⭐⭐ | 一般 | 中等 |
| **IP-Adapter-FaceID** | ⭐⭐⭐⭐ | 快 | 简单 |
| **PhotoMaker** | ⭐⭐⭐⭐ | 慢 | 复杂 |
| **Face Swap（后置）** | ⭐⭐⭐ | 最快 | 最简单 |

**推荐：InstantID（质量优先） + IP-Adapter-FaceID（速度优先）**

#### 3.3 服装控制方案

**方案A：ControlNet（推荐）**
```
Prompt 中描述服装 → ControlNet OpenPose 约束姿势 → 
Canny 边缘约束服装轮廓
```

**方案B：LoRA 微调**
```
为每套服装训练一个 LoRA:
- suit-blue.safetensors (深蓝西装)
- shirt-white.safetensors (白衬衫)
- casual-sweater.safetensors (休闲针织)
- qipao-red.safetensors (红色旗袍)
...
```

**方案C：Inpainting 局部重绘**
```
先生成背景和人 → 再局部重绘服装区域
效果最精细，但速度最慢
```

**推荐方案：先A（快速MVP），再C（优化效果）**

#### 3.4 生成参数

| 参数 | 值 | 说明 |
|:----|:--:|:------|
| 分辨率 | 1024×1024 | SDXL标准输出 |
| 步数 | 20-30 | 步数越多质量越好，成本越高 |
| CFG Scale | 5.0-7.0 | 提示词跟随度 |
| 批量大小 | 4-6 | 每次生成4-6张 |
| Seed | 随机 | 多样化的结果 |
| 总产出 | 30-50张/次 | 用户可从中挑选 |

#### 3.5 提示词模板

```
[职业照模板 - 通用]
professional headshot photo of a [gender] in their [age], 
wearing [outfit description], [background description], 
professional studio lighting, soft rim light, 
Canon EOS R5, 85mm f/1.8, shallow depth of field, 
natural expression, photorealistic, highly detailed skin texture, 
8K, masterpiece, --ar 3:4

[服装示例 - 深蓝西装]
...wearing a tailored dark navy suit with a crisp white dress shirt, 
no tie, confident and approachable expression...

[背景示例 - 办公室]
...standing in a modern office with floor-to-ceiling windows, 
soft natural light streaming through, city skyline visible...
```

### ✨ 第4层：后处理（Post-processing）

**目标：** 修复面部瑕疵，提升画质到出版级

| 步骤 | 模型 | 说明 |
|:----|:-----|:------|
| ① 面部修复 | **GFPGAN v1.4** | 修复眼睛、嘴巴细节，去除伪影 |
| ② 面部美化 | **CodeFormer** | 更自然的面部增强（可选） |
| ③ 超分辨率 | **Real-ESRGAN 4x** | 输出 4096×4096 超高分辨率 |
| ④ 色彩校正 | **自动白平衡+对比度** | 统一所有输出的色彩风格 |

**注意：** 第②步（CodeFormer）和第③步（Real-ESRGAN）可按套餐分级：
- 体验版：仅 GFPGAN
- 标准版：GFPGAN + Real-ESRGAN
- 专业版：GFPGAN + CodeFormer + Real-ESRGAN

### 📤 第5层：输出（Output）

| 步骤 | 说明 |
|:----|:------|
| ① 裁剪 | 输出 1寸(295×413) / 2寸(413×579) / 简历尺寸(800×1000) |
| ② 压缩 | WebP格式，质量85，单张控制在500KB内 |
| ③ 加水印 | 体验版加「职业照Pro」水印 |
| ④ 上传CDN | 存入阿里云OSS，CDN加速分发 |
| ⑤ 返回URL | 小程序前端展示结果 |

---

## 三、部署架构

### MVP阶段（Replicate API）

```
小程序 ──HTTPS──→ 云函数(排队+鉴权) ──→ Replicate API ──→ SDXL
                         │
                         ▼
                    阿里云OSS / CDN
```

**成本：** $0.02-0.05/张（含SDXL+GFPGAN）
**优势：** 零运维，最快上线
**劣势：** 无定制能力，排队时间长

### 正式阶段（自部署）

```
小程序 ──HTTPS──→ 云函数(排队+鉴权) ──→ ComfyUI API Server
                         │                      │
                         ▼                      ▼
                    阿里云OSS / CDN        GPU Server (RTX 4090)
                                         ComfyUI + SDXL + InstantID
                                         + GFPGAN + Real-ESRGAN
```

**成本：** $0.005-0.01/张
**优势：** 完全可控，可定制，成本低
**劣势：** 需要运维GPU服务器

### 推荐GPU服务器配置

| 配置 | MVP够用 | 正式推荐 | 企业级 |
|:----|:-------:|:--------:|:-----:|
| GPU | RTX 4090 24G | RTX 4090 × 2 | A100 80G |
| CPU | 8核 | 16核 | 32核 |
| 内存 | 32GB | 64GB | 128GB |
| 月费(租用) | ¥2,000-3,000 | ¥4,000-6,000 | ¥15,000+ |
| 生成量 | 5张/分钟 | 10张/分钟 | 30张/分钟 |

---

## 四、ComfyUI 工作流结构

```
[Load Image] ──→ [FaceDetection] ──→ [Crop Face]
                                              │
[IP-Adapter] ←── [FaceID Encoder] ←──────────┘
     │
[Load SDXL] ──→ [KSampler] ──→ [VAE Decode]
     │              │
[ControlNet] ────[OpenPose] ←── [Pose Reference]
     │
[Positive Prompt] ←── [服装描述 + 背景描述]
     │
[CLIP Text Encode]
```

**对应ComfyUI节点：**
- `ComfyUI-InstantID`（身份保持）
- `ComfyUI-IPAdapter-plus`（IP-Adapter）
- `ComfyUI-ControlNet`（姿态控制）
- `ComfyUI-GFPGAN`（面部修复）
- `ComfyUI-ESRGAN`（超分辨率）

---

## 五、开发排期

| 阶段 | 时间 | 内容 | 负责人 |
|:----|:----:|:-----|:------|
| **P0 验证** | 1周 | ComfyUI本地搭建 + 调试SDXL人像效果 | AI工程师 |
| | | Replicate API接入 | AI工程师 |
| | | 测试5套服装+5种背景的提示词 | AI工程师 |
| **P1 管线** | 1周 | InstantID/IP-Adapter集成 | AI工程师 |
| | | 批量生成脚本+后处理管线 | AI工程师 |
| | | 输出尺寸控制+压缩 | AI工程师 |
| **P2 优化** | 1周 | 服装LoRA训练 | AI工程师 |
| | | 生成速度优化（FP16/TensorRT） | AI工程师 |
| | | 质量评估+自动选片 | AI工程师 |
| **P3 上线** | 1周 | ComfyUI API封装 | AI工程师 |
| | | 云函数对接 | 后端 |
| | | 压力测试+监控 | AI工程师 |

---

## 六、质量验收标准

| 维度 | 标准 | 检测方式 |
|:----|:-----|:---------|
| 面部一致度 | 与原始照片相似度 ≥ 85% | InsightFace 人脸比对 |
| 图像清晰度 | GFPGAN修复后无明显伪影 | 人工抽检 |
| 风格匹配度 | 符合所选服装/背景描述 | 人工抽检 |
| 生成速度 | 30张 ≤ 3分钟 | 计时 |
| 分辨率 | 输出 ≥ 1024×1024 | 自动检测 |
| 色彩一致性 | 同一批次色彩风格统一 | 人工抽检 |

---

## 七、需要准备的事项

### 立刻需要
1. ❓ ComfyUI 装在哪台机器上？（本地电脑/云服务器）
2. ❓ Replicate API Key 是否有？
3. ❓ 准备好10-20张不同长相的测试照片
4. ❓ 确定第一期上线的服装套数（建议5套）

### 需要购买的
- 如果自部署：GPU云服务器（推荐 **AutoDL / 恒源云** 租RTX 4090）
- 如果云API：Replicate 账号 + 充值 $50 够用1-2个月

---

> **AI工程师总结：**
> 管线本身技术成熟，InstantID+SDXL+GFPGAN 组合方案已经有很多成功案例。
> 最难的部分不是写代码，而是**调提示词**和**把控质量**。
> 建议第1周集中攻克生成质量，质量达到85分以上再推进其他功能。
