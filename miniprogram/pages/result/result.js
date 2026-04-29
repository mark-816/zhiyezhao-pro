/**
 * 职业照Pro - 结果页
 * @description 预览云函数返回的真实AI图片 + 保存到相册 + 分享 + 收藏
 */

const app = getApp()

Page({
  data: {
    // 生成结果（从云函数返回的真实数据）
    results: [],

    // 当前查看的索引
    currentIndex: 0,
    currentResult: null,

    // 收藏状态
    isFavorited: false,
    favoritedIds: [],

    // 生成ID
    generateId: '',

    // 图片加载状态
    imageLoading: true,
    imageError: false,

    // 当前选择的风格和背景（从参数读取）
    currentStyle: '',
    currentBackground: '',
  },

  onLoad(options) {
    const { images, generateId, style, background } = options || {}
    const generateIdVal = generateId || 'gen_' + Date.now()

    // 解析图片列表（从URL参数传入）
    let results = []
    try {
      if (images) {
        results = JSON.parse(decodeURIComponent(images))
      }
    } catch (e) {
      console.warn('[result] parse images failed, using fallback:', e)
    }

    // 如果没有结果（异常降级），使用空数组
    if (!results || results.length === 0) {
      results = []
    }

    this.setData({
      results,
      generateId: generateIdVal,
      currentStyle: style || app.globalData.currentStyle || '',
      currentBackground: background || app.globalData.currentBackground || '',
    })

    // 设置当前显示结果
    if (results.length > 0) {
      this.showResult(0)
    }

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
      imageLoading: true,
      imageError: false,
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

  /** 图片加载完成 */
  onImageLoad() {
    this.setData({ imageLoading: false })
  },

  /** 图片加载失败 */
  onImageError() {
    this.setData({ imageLoading: false, imageError: true })
  },

  // ============================================================
  // 保存到相册
  // ============================================================
  saveToAlbum() {
    const result = this.data.currentResult
    if (!result || !result.url) {
      wx.showToast({ title: '暂无图片可保存', icon: 'none' })
      return
    }

    wx.showLoading({ title: '保存中...' })

    // 网络图片需要先下载到本地临时路径
    wx.downloadFile({
      url: result.url,
      success: (downloadRes) => {
        if (downloadRes.statusCode === 200) {
          // 下载成功，保存到相册
          wx.saveImageToPhotosAlbum({
            filePath: downloadRes.tempFilePath,
            success: () => {
              wx.hideLoading()
              wx.showToast({ title: '已保存到相册 ✅', icon: 'success' })
              this.incrementShareCount()
            },
            fail: (err) => {
              wx.hideLoading()
              if (err.errMsg && err.errMsg.indexOf('auth deny') !== -1) {
                // 引导用户授权
                wx.showModal({
                  title: '需要授权',
                  content: '保存到相册需要您授权相册权限',
                  success: (res) => {
                    if (res.confirm) {
                      wx.openSetting()
                    }
                  },
                })
              } else {
                wx.showToast({ title: '保存失败，请重试', icon: 'none' })
              }
            },
          })
        } else {
          wx.hideLoading()
          wx.showToast({ title: '图片下载失败', icon: 'none' })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '图片下载失败，请检查网络', icon: 'none' })
      },
    })
  },

  // ============================================================
  // 换背景重生成
  // ============================================================
  regenerateWithNewBg() {
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },

  // ============================================================
  // 分享
  // ============================================================
  onShare() {
    // 走 onShareAppMessage
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
        wx.reLaunch({ url: '/pages/index/index' })
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
      style: this.data.currentStyle || app.globalData.currentStyle || 'business',
      background: this.data.currentBackground || app.globalData.currentBackground || 'office',
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
