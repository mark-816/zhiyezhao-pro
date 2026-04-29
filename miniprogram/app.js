/**
 * 职业照Pro - 全局应用入口
 * @description AI生成专业形象照小程序
 * @brand 职业照Pro
 * @theme #1B4B8C (墨羽蓝) / #F59E0B (快乐橙)
 */

App({
  // ============================================================
  // 全局数据
  // ============================================================
  globalData: {
    // 品牌信息
    brand: {
      name: '职业照Pro',
      primary: '#1B4B8C',
      accent: '#F59E0B',
    },

    // 用户信息
    userInfo: null,

    // 已生成的职业照列表
    historyList: [],

    // 当前选中的风格/背景（上传页->生成页->结果页传递）
    currentStyle: null,
    currentBackground: null,

    // 上传的原图临时路径
    sourceImagePath: '',
  },

  // ============================================================
  // 生命周期
  // ============================================================
  onLaunch() {
    // ===== 初始化云开发 =====
    // 如需指定环境，将 DYNAMIC_CURRENT_ENV 替换为你的环境ID
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV,
      traceUser: true,
    })

    // 从本地存储恢复历史记录
    const history = wx.getStorageSync('zp_history_list') || []
    this.globalData.historyList = history

    // 从本地存储恢复用户信息
    const userInfo = wx.getStorageSync('zp_user_info') || null
    this.globalData.userInfo = userInfo
  },

  // ============================================================
  // 工具方法
  // ============================================================

  /**
   * 保存历史记录到本地存储
   */
  saveHistory(record) {
    const list = this.globalData.historyList || []
    list.unshift(record)
    this.globalData.historyList = list
    wx.setStorageSync('zp_history_list', list)
  },

  /**
   * 获取生成统计数据
   */
  getStats() {
    const list = this.globalData.historyList || []
    let generateCount = list.length
    let favoritedCount = list.filter(item => item.favorited).length
    let sharedCount = list.reduce((sum, item) => sum + (item.sharedTimes || 0), 0)
    return { generateCount, favoritedCount, sharedCount }
  },

  /**
   * 显示全局Toast
   */
  showToast(title, icon = 'none') {
    wx.showToast({ title, icon, duration: 2000 })
  },

  /**
   * 显示全局加载
   */
  showLoading(title = '加载中...') {
    wx.showLoading({ title, mask: true })
  },

  hideLoading() {
    wx.hideLoading()
  },
})
