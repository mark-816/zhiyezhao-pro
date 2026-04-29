/**
 * 职业照Pro - 我的页面
 * @description 用户信息、统计数据、历史记录、设置
 */

const app = getApp()

Page({
  data: {
    // 用户信息
    userInfo: null,
    isLoggedIn: false,

    // 统计数据
    stats: {
      generateCount: 0,
      favoritedCount: 0,
      sharedCount: 0,
    },

    // 历史记录
    historyList: [],
    hasHistory: false,

    // 设置项
    settings: [
      { icon: '💬', title: '意见反馈', desc: '告诉我们你的想法' },
      { icon: '📖', title: '使用指南', desc: '了解如何使用' },
      { icon: '⭐', title: '给我们评分', desc: '你的支持是我们的动力' },
      { icon: 'ℹ️', title: '关于我们', desc: '版本 1.0.0' },
    ],
  },

  onShow() {
    this.loadData()
  },

  onShareAppMessage() {
    return {
      title: '职业照Pro - AI生成你的专业形象照',
      path: '/pages/index/index',
    }
  },

  // ============================================================
  // 数据加载
  // ============================================================
  loadData() {
    const app = getApp()
    const userInfo = app.globalData.userInfo
    const isLoggedIn = !!userInfo

    // 从全局获取统计数据
    const stats = app.getStats()

    // 获取历史记录
    const historyList = app.globalData.historyList || []
    // 格式化时间显示
    const formattedHistory = historyList.slice(0, 20).map(item => ({
      ...item,
      timeStr: this.formatTime(item.time),
    }))

    this.setData({
      userInfo,
      isLoggedIn,
      stats,
      historyList: formattedHistory,
      hasHistory: formattedHistory.length > 0,
    })
  },

  // ============================================================
  // 用户登录
  // ============================================================
  handleLogin() {
    const that = this

    wx.getUserProfile({
      desc: '用于展示用户头像和昵称',
      success(res) {
        const userInfo = res.userInfo
        app.globalData.userInfo = userInfo
        wx.setStorageSync('zp_user_info', userInfo)

        that.setData({
          userInfo,
          isLoggedIn: true,
        })

        wx.showToast({
          title: '登录成功',
          icon: 'success',
        })
      },
      fail() {
        // 降级方案：使用默认头像
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
        })
      },
    })
  },

  // ============================================================
  // 历史记录交互
  // ============================================================
  viewHistory(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/result/result?id=${id}`,
    })
  },

  /** 清除历史 */
  clearHistory() {
    wx.showModal({
      title: '清除历史',
      content: '确定要清除所有生成记录吗？此操作不可撤销。',
      success: (res) => {
        if (res.confirm) {
          app.globalData.historyList = []
          wx.setStorageSync('zp_history_list', [])
          this.setData({
            historyList: [],
            hasHistory: false,
            stats: { generateCount: 0, favoritedCount: 0, sharedCount: 0 },
          })
          wx.showToast({
            title: '已清除',
            icon: 'success',
          })
        }
      },
    })
  },

  // ============================================================
  // 设置项点击
  // ============================================================
  onSettingTap(e) {
    const { index } = e.currentTarget.dataset
    const settings = this.data.settings

    switch (index) {
      case 0: // 意见反馈
        wx.showModal({
          title: '意见反馈',
          content: '感谢你的反馈！请发送邮件至：feedback@zhiyezhao-pro.com',
          confirmText: '复制邮箱',
          success(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: 'feedback@zhiyezhao-pro.com',
              })
            }
          },
        })
        break
      case 1: // 使用指南
        wx.showModal({
          title: '使用指南',
          content: '1. 上传正面照片\n2. 选择喜欢的风格和背景\n3. AI智能生成\n4. 保存到相册或分享好友',
          showCancel: false,
        })
        break
      case 2: // 评分
        wx.showToast({
          title: '感谢你的支持！',
          icon: 'none',
        })
        break
      case 3: // 关于
        wx.showModal({
          title: '关于我们',
          content: '职业照Pro v1.0.0\nAI生成专业形象照\n让每个人都能拥有专业级职业照',
          showCancel: false,
        })
        break
    }
  },

  // ============================================================
  // 工具方法
  // ============================================================
  formatTime(timestamp) {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    const oneDay = 24 * 60 * 60 * 1000

    if (diff < oneDay) {
      return '今天'
    } else if (diff < 2 * oneDay) {
      return '昨天'
    } else {
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}月${day}日`
    }
  },
})
