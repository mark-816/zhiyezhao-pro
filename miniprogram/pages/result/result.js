/**
 * 职业照Pro - 结果页
 * @description 预览 + 下载 + 分享 + 收藏
 */

const app = getApp()

Page({
  data: {
    // 生成结果（模拟数据）
    results: [
      { id: 1, url: 'zp_result_1', desc: '商务西装 · 办公室背景' },
      { id: 2, url: 'zp_result_2', desc: '商务西装 · 城市背景' },
      { id: 3, url: 'zp_result_3', desc: '简约衬衫 · 办公室背景' },
      { id: 4, url: 'zp_result_4', desc: '简约衬衫 · 纯色背景' },
    ],

    // 当前查看的索引
    currentIndex: 0,
    currentResult: null,

    // 收藏状态
    isFavorited: false,
    favoritedIds: [],

    // 生成ID（用于保存到历史）
    generateId: '',

    // 是否显示更多缩略图
    showThumbnails: true,
  },

  onLoad(options) {
    const { id } = options || {}

    // 生成唯一ID
    const generateId = id || 'gen_' + Date.now()
    this.setData({ generateId })

    // 设置当前显示结果
    this.showResult(0)

    // 加载收藏状态
    const favoritedIds = wx.getStorageSync('zp_favorited_ids') || []
    this.setData({ favoritedIds })

    // 保存到历史
    this.saveToHistory()
  },

  onShareAppMessage() {
    return {
      title: '我在职业照Pro生成了专业形象照，快来看看！',
      path: '/pages/result/result',
      imageUrl: '/images/share.png',
    }
  },

  onShareTimeline() {
    return {
      title: '职业照Pro - AI生成专业形象照',
    }
  },

  // ============================================================
  // 切换结果
  // ============================================================
  showResult(index) {
    if (index < 0 || index >= this.data.results.length) return
    const result = this.data.results[index]
    const isFavorited = this.data.favoritedIds.includes(result.id)

    this.setData({
      currentIndex: index,
      currentResult: result,
      isFavorited,
    })
  },

  /** 左右切换 */
  switchResult(e) {
    const { direction } = e.currentTarget.dataset
    let newIndex = this.data.currentIndex
    if (direction === 'prev') {
      newIndex = Math.max(0, newIndex - 1)
    } else {
      newIndex = Math.min(this.data.results.length - 1, newIndex + 1)
    }
    if (newIndex !== this.data.currentIndex) {
      this.showResult(newIndex)
    }
  },

  /** 点击缩略图跳转 */
  selectThumbnail(e) {
    const { index } = e.currentTarget.dataset
    this.showResult(index)
  },

  // ============================================================
  // 保存到相册
  // ============================================================
  saveToAlbum() {
    const result = this.data.currentResult
    if (!result) return

    wx.showLoading({ title: '保存中...' })

    // 模拟保存（真实场景：从网络或本地获取图片）
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '已保存到相册 ✅',
        icon: 'success',
        duration: 2000,
      })

      // 统计分享次数
      this.incrementShareCount()
    }, 1000)

    // 真实场景代码（注释掉，当前仅模拟）
    /*
    wx.saveImageToPhotosAlbum({
      filePath: result.url,
      success() {
        wx.hideLoading()
        wx.showToast({ title: '已保存到相册 ✅', icon: 'success' })
      },
      fail(err) {
        wx.hideLoading()
        if (err.errMsg.indexOf('auth') !== -1) {
          wx.showModal({
            title: '提示',
            content: '需要您授权保存到相册',
            success(res) {
              if (res.confirm) {
                wx.openSetting()
              }
            },
          })
        }
      },
    })
    */
  },

  // ============================================================
  // 换背景重生成
  // ============================================================
  regenerateWithNewBg() {
    wx.showModal({
      title: '换背景重生成',
      content: '将跳转到上传页重新选择背景生成',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/upload/upload',
          })
        }
      },
    })
  },

  // ============================================================
  // 分享
  // ============================================================
  onShare() {
    // 默认走 onShareAppMessage
    this.incrementShareCount()
  },

  // ============================================================
  // 收藏／取消收藏
  // ============================================================
  toggleFavorite() {
    const result = this.data.currentResult
    if (!result) return

    let favoritedIds = [...this.data.favoritedIds]
    let isFavorited = !this.data.isFavorited

    if (isFavorited) {
      if (!favoritedIds.includes(result.id)) {
        favoritedIds.push(result.id)
      }
      wx.showToast({ title: '❤️ 已收藏', icon: 'success', duration: 1500 })
    } else {
      favoritedIds = favoritedIds.filter(id => id !== result.id)
      wx.showToast({ title: '已取消收藏', icon: 'none', duration: 1500 })
    }

    // 更新历史中的收藏状态
    const historyList = (wx.getStorageSync('zp_history_list') || []).map(item => {
      if (item.id === this.data.generateId) {
        item.favorited = isFavorited
      }
      return item
    })
    wx.setStorageSync('zp_history_list', historyList)
    app.globalData.historyList = historyList

    this.setData({ favoritedIds, isFavorited })
    wx.setStorageSync('zp_favorited_ids', favoritedIds)
  },

  // ============================================================
  // 返回首页
  // ============================================================
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
      fail: () => {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      },
    })
  },

  // ============================================================
  // 内部方法
  // ============================================================

  /** 保存生成记录到历史 */
  saveToHistory() {
    const record = {
      id: this.data.generateId,
      time: Date.now(),
      style: app.globalData.currentStyle || 'business',
      background: app.globalData.currentBackground || 'office',
      resultsCount: this.data.results.length,
      favorited: false,
      sharedTimes: 0,
    }
    app.saveHistory(record)
  },

  /** 增加分享计数 */
  incrementShareCount() {
    const historyList = (wx.getStorageSync('zp_history_list') || []).map(item => {
      if (item.id === this.data.generateId) {
        item.sharedTimes = (item.sharedTimes || 0) + 1
      }
      return item
    })
    wx.setStorageSync('zp_history_list', historyList)
    app.globalData.historyList = historyList
  },
})
