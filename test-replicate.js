/**
 * ============================================
 *  职业照Pro · Replicate API 测试脚本
 *  测试 AI 人像生成效果
 * ============================================
 *
 * 使用方法：
 *   1. 在 https://replicate.com 注册并获取 API Key
 *   2. 打开终端执行：
 *      cd C:\Users\Administrator\.openclaw\workspace\projects\ai-portrait
 *      set REPLICATE_API_TOKEN=r8_你的key
 *      node test-replicate.js
 *
 * 测试模型：
 *   - FLUX Dev（$0.025/张）— 目前最写实的人像模型
 *   - SDXL（按GPU时长计费）
 *   - GFPGAN（面部修复）
 */

// Node 18+ 原生支持 fetch
const API_TOKEN = process.env.REPLICATE_API_TOKEN || '填入你的API_KEY'

// ===== 配置 =====
const CONFIG = {
  // 要测试的模型
  models: {
    // FLUX Dev - 最推荐，写实人像最佳
    fluxDev: 'black-forest-labs/flux-dev',
    // SDXL - 成熟稳定
    sdxl: 'stability-ai/sdxl',
  },

  // 基础提示词（西装职业照模板）
  basePrompt: `professional headshot photo of a confident Chinese man in his 30s, 
wearing a tailored dark navy suit with white dress shirt, no tie,
modern office background with soft window light,
professional studio lighting, soft rim light,
Canon EOS R5, 85mm f/1.8, shallow depth of field,
natural expression, photorealistic, highly detailed skin texture,
8K, masterpiece`,

  // 负面提示词
  negativePrompt: 'bad anatomy, deformed, blurry, low quality, watermark, text, logo, cartoon, anime, extra fingers, distorted face'
}

// ===== 测试函数 =====
async function testReplicate() {
  console.log('')
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   职业照Pro · Replicate API 测试         ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log('')

  if (!API_TOKEN || API_TOKEN === '填入你的API_KEY') {
    console.error('❌ 请先设置 REPLICATE_API_TOKEN 环境变量')
    console.error('   或者直接编辑此文件填入你的API Key')
    console.error('')
    console.error('   获取地址: https://replicate.com/account/api-tokens')
    process.exit(1)
  }

  // 测试1：FLUX Dev 生成
  console.log('📸 测试1：FLUX Dev - 基础职业照生成')
  console.log('   费用预计：$0.025/张')
  console.log('')

  try {
    const startTime = Date.now()
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'black-forest-labs/flux-dev',
        input: {
          prompt: CONFIG.basePrompt,
          negative_prompt: CONFIG.negativePrompt,
          num_outputs: 1,
          num_inference_steps: 25,
          guidance_scale: 5.0,
          aspect_ratio: '3:4',
          output_format: 'webp',
          output_quality: 85,
        },
      }),
    })

    const prediction = await response.json()
    
    if (prediction.error) {
      console.error('❌ API错误:', prediction.error)
      return
    }

    console.log(`   ✅ 任务已提交，ID: ${prediction.id}`)
    console.log(`   状态: ${prediction.status}`)
    console.log('')
    console.log('   等待生成完成...（约15-30秒）')
    console.log('')

    // 轮询等待结果
    let result = prediction
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` },
      })
      result = await pollRes.json()
      process.stdout.write(`   进度: ${result.status} (耗时: ${Math.floor((Date.now() - startTime)/1000)}s)\r`)
    }
    console.log('')

    if (result.status === 'succeeded') {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      console.log(`   ✅ 生成成功！耗时 ${elapsed}秒`)
      console.log(`   📍 图片URL: ${result.output[0]}`)
      console.log('')
      console.log(`   复制以下链接在浏览器打开查看效果:`)
      console.log(`   ${result.output[0]}`)
    } else {
      console.error('   ❌ 生成失败:', result.error)
    }

  } catch (err) {
    console.error('❌ 请求失败:', err.message)
  }

  // ===== 测试汇总 =====
  console.log('')
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   测试完成                                ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log('')
  console.log('后续测试建议:')
  console.log('  1. 换不同提示词（女性/不同服装/不同背景）')
  console.log('  2. 测试 SDXL 模型的人像效果')
  console.log('  3. 测试 GFPGAN 面部修复效果')
  console.log('  4. 批量测试（一次生成4-6张）')
  console.log('')
  console.log('需要更多测试？改 prompt 重新运行即可')
}

// ===== 更多测试函数（后续可取消注释） =====

// async function testBatch() {
//   // 一次生成多张
//   const response = await fetch('https://api.replicate.com/v1/predictions', {
//     method: 'POST',
//     headers: {
//       'Authorization': ...,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       version: 'black-forest-labs/flux-dev',
//       input: {
//         prompt: CONFIG.basePrompt,
//         num_outputs: 4,  // 一次出4张
//         num_inference_steps: 25,
//         aspect_ratio: '3:4',
//       },
//     }),
//   })
// }

// ===== 运行 =====
testReplicate().catch(console.error)
