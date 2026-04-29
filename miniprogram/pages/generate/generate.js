/**
 * 职业照Pro - 生成中页
 * @description 调用云函数 generatePortrait 对接 Replicate API 生成职业照
 */

const app = getApp()

Page({
  data: {
    // 进度
    progress: 0,
    progressPercent: '0%',

    // 状态文本
    statusMessages: [
      '正在准备生成参数...',
      '正在提交AI任务...',
      '正在生成形象（约4秒）...',
      '正在优化细节...',
      '即将完成...',
    ],
    currentStatusIndex: 0,
    currentStatus: '正在准备生成参数...',

    // 当前选择的风格和背景
    selectedStyleName: '',
    selectedBackgroundName: '',
    selectedStyleId: '',
    selectedBackgroundId: '',

    // 生成完成
    isComplete: false,
    isError: false,
    errorMessage: '',

    // 云函数返回结果
    generateResult: null,
  },

  onLoad() {
    // 读取全局选中的风格和背景
    const styleId = app.globalData.currentStyle || 'business'
    const bgId = app.globalData.currentBackground || 'office'
    const sourceImagePath = app.globalData.sourceImagePath || ''

    const styleMap = {
      business: '商务西装',
      casual: '简约衬衫',
      leisure: '休闲便装',
      chinese: '国风',
    }
    const bgMap = {
      office: '办公室背景',
      solid: '纯色背景',
      city: '城市背景',
      nature: '自然背景',
    }

    this.setData({
      selectedStyleName: styleMap[styleId] || '商务西装',
      selectedBackgroundName: bgMap[bgId] || '办公室背景',
      selectedStyleId: styleId,
      selectedBackgroundId: bgId,
    })

    // 开始调用真实API
    this.callGenerateAPI(styleId, bgId, sourceImagePath)
  },

  onUnload() {
    // 页面卸载时无需清理（云函数自动完成）
  },

  // ============================================================
  // 调用云函数 generatePortrait
  // ============================================================
  async callGenerateAPI(styleId, bgId, sourceImagePath) {
    try {
      // 进度展示：准备
      this.updateProgress(5, '正在准备生成参数...')

      // 检查云开发能力
      if (!wx.cloud) {
        this.showError('微信云开发未初始化，请检查 app.js 配置')
        return
      }

      // 进度展示：提交中
      this.updateProgress(15, '正在提交AI任务...')

      // 调用云函数
      const res = await wx.cloud.callFunction({
        name: 'generatePortrait',
        data: {
          style: styleId,
          background: bgId,
          numOutputs: 4,
          sourceImageUrl: sourceImagePath || '',
          prompt: '', // 让云函数自动构建提示词
        },
      })

      const result = res.result

      if (result.code !== 0) {
        this.showError(result.message || 'AI 生成失败')
        return
      }

      // 进度展示：生成中
      this.updateProgress(50, '正在生成形象（约4秒）...')

      // 短暂展示进度动画，让用户有等待感
      await this.animateProgress(50, 80, 1500, '正在优化细节...')
      await this.animateProgress(80, 100, 800, '即将完成...')

      // 保存结果
      this.setData({
        generateResult: result.data,
        isComplete: true,
        currentStatus: '✨ 生成完成！',
        progress: 100,
        progressPercent: '100%',
      })

      // 延迟跳转到结果页，携带参数
      setTimeout(() => {
        const images = result.data.images || []
        const imagesStr = JSON.stringify(images)
        const generateId = result.data.generateId || ''

        wx.redirectTo({
          url: `/pages/result/result?images=${encodeURIComponent(imagesStr)}&generateId=${generateId}&style=${styleId}&background=${bgId}`,
        })
      }, 800)

    } catch (err) {
      console.error('[generate] cloud function error:', err)
      this.showError('网络异常，请检查网络后重试')
    }
  },

  // ============================================================
  // 工具方法
  // ============================================================

  /** 更新进度和状态文本 */
  updateProgress(progress, status) {
    this.setData({
      progress: Math.round(progress),
      progressPercent: Math.round(progress) + '%',
      currentStatus: status,
    })
  },

  /** 平滑动画过渡进度 */
  animateProgress(from, to, duration, statusText) {
    return new Promise((resolve) => {
      const startTime = Date.now()
      const step = () => {
        const elapsed = Date.now() - startTime
        const ratio = Math.min(elapsed / duration, 1)
        const currentProgress = from + (to - from) * ratio

        this.setData({
          progress: Math.round(currentProgress),
          progressPercent: Math.round(currentProgress) + '%',
          currentStatus: statusText,
        })

        if (ratio < 1) {
          setTimeout(step, 50)
        } else {
          resolve()
        }
      }
      step()
    })
  },

  /** 显示错误 */
  showError(message) {
    this.setData({
      isError: true,
      isComplete: true,
      errorMessage: message,
      currentStatus: '❌ 生成失败',
    })
  },

  /** 重试 */
  retry() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /** 返回首页 */
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
      fail: () => {
        wx.reLaunch({ url: '/pages/index/index' })
      },
    })
  },
})
