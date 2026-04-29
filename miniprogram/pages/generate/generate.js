/**
 * 职业照Pro - 生成中页
 * @description 进度动画 + 等待（模拟，后续对接API）
 */

const app = getApp()

Page({
  data: {
    // 进度
    progress: 0,
    progressPercent: '0%',

    // 状态文本
    statusMessages: [
      '正在分析照片...',
      '正在提取面部特征...',
      '正在生成形象...',
      '正在优化细节...',
      '正在渲染背景...',
      '正在最终优化...',
    ],
    currentStatusIndex: 0,
    currentStatus: '正在分析照片...',

    // 当前选择的风格和背景
    selectedStyleName: '',
    selectedBackgroundName: '',

    // 生成完成
    isComplete: false,

    // 定时器
    _timer: null,
  },

  onLoad() {
    // 读取全局选中的风格和背景
    const styleId = app.globalData.currentStyle || 'business'
    const bgId = app.globalData.currentBackground || 'office'

    // 获取名称（引用upload页面的数据格式）
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
    })

    // 开始模拟进度
    this.startMockProgress()
  },

  onUnload() {
    // 清除定时器
    if (this.data._timer) {
      clearInterval(this.data._timer)
    }
  },

  // ============================================================
  // 模拟生成进度
  // ============================================================
  startMockProgress() {
    const totalDuration = 4000 // 4秒完成
    const interval = 100 // 每100ms更新一次
    const step = 100 / (totalDuration / interval)

    let progress = 0
    let statusIndex = 0

    const timer = setInterval(() => {
      progress += step
      if (progress >= 100) {
        progress = 100
        clearInterval(timer)
        this.onGenerateComplete()
      }

      // 更新进度文字
      const newStatusIndex = Math.min(
        Math.floor((progress / 100) * this.data.statusMessages.length),
        this.data.statusMessages.length - 1
      )
      if (newStatusIndex !== statusIndex) {
        statusIndex = newStatusIndex
      }

      this.setData({
        progress: Math.round(progress),
        progressPercent: Math.round(progress) + '%',
        currentStatus: this.data.statusMessages[statusIndex],
        currentStatusIndex: statusIndex,
      })
    }, interval)

    this.data._timer = timer
  },

  // ============================================================
  // 生成完成
  // ============================================================
  onGenerateComplete() {
    this.setData({
      currentStatus: '✨ 生成完成！',
      isComplete: true,
    })

    // 延迟跳转到结果页
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/result/result',
      })
    }, 800)
  },
})
