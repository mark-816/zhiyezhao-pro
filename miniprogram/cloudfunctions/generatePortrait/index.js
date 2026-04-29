/**
 * 云函数 generatePortrait
 * 
 * 功能：接收前端参数，调用 Replicate API（FLUX Dev 模型）生成 AI 形象照，
 *       将结果存入云数据库，返回图片 URL 列表给前端。
 * 
 * 环境变量（在微信云函数控制台设置）：
 *   REPLICATE_API_TOKEN  - Replicate API Token（必填）
 * 
 * 前端传参：
 *   @param {string}  prompt         - 自定义提示词（选填，不传则自动构建）
 *   @param {number}  numOutputs     - 生成数量（默认4）
 *   @param {string}  style          - 风格 ID：business / casual / leisure / chinese
 *   @param {string}  background     - 背景 ID：office / solid / city / nature
 *   @param {string}  sourceImageUrl - 源图 URL（选填，用于图生图能力）
 * 
 * 返回值：
 *   { code: 0, data: { images: [...], generateId: '...' } }
 *   或 { code: -1, message: '错误描述' }
 */

const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 自动使用当前云环境
})

const db = cloud.database()

// =============================================================
// 风格/背景 → 英文提示词映射（用于 FLUX 模型）
// =============================================================
const STYLE_PROMPTS = {
  business: 'professional business suit, formal office portrait',
  casual: 'simple casual shirt, smart casual office look',
  leisure: 'leisure casual wear, relaxed smart style',
  chinese: 'traditional Chinese costume, modern elegance',
}

const BACKGROUND_PROMPTS = {
  office: 'clean modern office background, soft lighting',
  solid: 'solid color background, studio lighting, clean gradient',
  city: 'blurry city skyline background, urban professional',
  nature: 'soft nature background, warm natural lighting',
}

const DEFAULT_PROMPT = 'professional headshot photo, high quality, realistic, detailed skin texture, natural expression, looking at camera, good lighting, 8K, photorealistic'

/**
 * 构建完整的提示词
 */
function buildPrompt(event) {
  const { style = 'business', background = 'office' } = event

  // 如果前端传了自定义 prompt，优先使用
  if (event.prompt && event.prompt.trim()) {
    return `${event.prompt.trim()}, professional portrait, photorealistic, 8K`
  }

  const styleText = STYLE_PROMPTS[style] || STYLE_PROMPTS.business
  const bgText = BACKGROUND_PROMPTS[background] || BACKGROUND_PROMPTS.office

  return `${styleText}, ${bgText}, professional headshot photo, high quality, realistic, detailed skin texture, natural expression, looking at camera, good lighting, volumetric lighting, 8K, photorealistic`
}

/**
 * 睡眠函数（用于轮询）
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// =============================================================
// 云函数入口
// =============================================================
exports.main = async (event, context) => {
  const { numOutputs = 4 } = event
  const { OPENID } = cloud.getWXContext()

  // ---- 1. 参数校验 ----
  if (!OPENID) {
    return { code: -1, message: '获取用户身份失败' }
  }

  const apiToken = process.env.REPLICATE_API_TOKEN
  if (!apiToken) {
    return { code: -1, message: '服务端配置错误：缺少 REPLICATE_API_TOKEN' }
  }

  // ---- 2. 构建提示词 ----
  const prompt = buildPrompt(event)
  console.log('[generatePortrait] prompt:', prompt)
  console.log('[generatePortrait] numOutputs:', numOutputs)

  // ---- 3. 调用 Replicate API ----
  // FLUX Dev 模型地址
  const REPLICATE_API_BASE = 'https://api.replicate.com/v1'
  // 使用最新的稳定版本（也可在环境变量中指定固定版本）
  const MODEL_VERSION = process.env.REPLICATE_FLUX_VERSION || 'black-forest-labs/flux-dev'

  try {
    // ---- 3a. 创建预测任务 ----
    const createResp = await fetch(`${REPLICATE_API_BASE}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          prompt: prompt,
          num_outputs: Math.min(Math.max(1, numOutputs), 8), // 限制1-8张
          num_inference_steps: 28,
          guidance_scale: 3.5,
          output_format: 'png',
        },
      }),
    })

    if (!createResp.ok) {
      const errBody = await createResp.text()
      console.error('[generatePortrait] Replicate create error:', createResp.status, errBody)
      return {
        code: -1,
        message: `AI 服务调用失败 (${createResp.status})`,
        detail: errBody,
      }
    }

    const prediction = await createResp.json()
    const predictionId = prediction.id
    console.log('[generatePortrait] prediction created:', predictionId)

    // ---- 3b. 轮询等待结果 ----
    const MAX_RETRIES = 60  // 最多等60秒
    const POLL_INTERVAL = 1000 // 每秒轮询一次

    let result = prediction
    for (let i = 0; i < MAX_RETRIES; i++) {
      if (result.status === 'succeeded') {
        break
      }
      if (result.status === 'failed') {
        console.error('[generatePortrait] prediction failed:', result.error)
        return {
          code: -1,
          message: 'AI 生成失败',
          detail: result.error || '未知错误',
        }
      }

      await sleep(POLL_INTERVAL)

      const pollResp = await fetch(`${REPLICATE_API_BASE}/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
        },
      })

      if (!pollResp.ok) {
        console.error('[generatePortrait] poll error:', pollResp.status)
        continue
      }

      result = await pollResp.json()
    }

    // 超时检查
    if (result.status !== 'succeeded') {
      return { code: -1, message: 'AI 生成超时，请稍后重试' }
    }

    // ---- 4. 提取结果 ----
    // FLUX Dev 输出格式：result.output 是字符串数组 [url1, url2, ...]
    const imageUrls = result.output || []
    console.log('[generatePortrait] generated images:', imageUrls.length)

    if (imageUrls.length === 0) {
      return { code: -1, message: 'AI 生成结果为空' }
    }

    // ---- 5. 保存到云数据库 ----
    const generateId = 'zp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)

    const record = {
      generateId,
      openId: OPENID,
      prompt,
      style: event.style || 'business',
      background: event.background || 'office',
      numOutputs: imageUrls.length,
      imageUrls,
      predictedAt: new Date(result.completed_at || Date.now()),
      createdAt: db.serverDate(),
    }

    // 写入 portraits 集合
    await db.collection('portraits').add({
      data: record,
    })

    console.log('[generatePortrait] saved to db, generateId:', generateId)

    // ---- 6. 返回结果 ----
    return {
      code: 0,
      data: {
        generateId,
        images: imageUrls.map((url, index) => ({
          id: index + 1,
          url,
          desc: `${STYLE_PROMPTS[event.style] || '商务风格'} · ${BACKGROUND_PROMPTS[event.background] || '专业背景'}`,
        })),
      },
    }

  } catch (err) {
    console.error('[generatePortrait] unexpected error:', err)
    return {
      code: -1,
      message: '服务器内部错误',
      detail: err.message || '',
    }
  }
}
