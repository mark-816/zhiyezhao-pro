/**
 * 职业照Pro - 上传照片页
 * @description 拍照指南、上传照片、风格选择、背景选择
 */

const app = getApp()

Page({
  data: {
    // 步骤控制
    currentStep: 0,
    steps: ['拍照', '选风格', '生成'],

    // 上传状态
    sourceImagePath: '',
    hasImage: false,

    // 风格选择
    styles: [
      { id: 'business', name: '商务西装', icon: '👔', checked: true },
      { id: 'casual', name: '简约衬衫', icon: '👕', checked: false },
      { id: 'leisure', name: '休闲便装', icon: '🧥', checked: false },
      { id: 'chinese', name: '国风', icon: '🥋', checked: false },
    ],
    selectedStyle: 'business',

    // 背景选择
    backgrounds: [
      { id: 'office', name: '办公室', icon: '🏢', checked: true },
      { id: 'solid', name: '纯色', icon: '🎨', checked: false },
      { id: 'city', name: '城市', icon: '🌆', checked: false },
      { id: 'nature', name: '自然', icon: '🌳', checked: false },
    ],
    selectedBackground: 'office',

    // 拍照指南
    tips: [
      { icon: '👤', title: '正对镜头', desc: '正面拍摄，头部居中，双肩放松' },
      { icon: '☀️', title: '光线充足', desc: '自然光或柔和灯光，避免阴影' },
      { icon: '😊', title: '自然微笑', desc: '微笑自然，眼神看向镜头' },
      { icon: '🎯', title: '纯色背景', desc: '浅色纯色背景效果最佳' },
    ],

    // 生成按钮文案
    generateBtnText: '🚀 立即生成职业照',
  },

  // ============================================================
  // 选择风格
  // ============================================================
  selectStyle(e) {
    const { id } = e.currentTarget.dataset
    const styles = this.data.styles.map(item => ({
      ...item,
      checked: item.id === id,
    }))
    this.setData({
      styles,
      selectedStyle: id,
    })
  },

  // ============================================================
  // 选择背景
  // ============================================================
  selectBackground(e) {
    const { id } = e.currentTarget.dataset
    const backgrounds = this.data.backgrounds.map(item => ({
      ...item,
      checked: item.id === id,
    }))
    this.setData({
      backgrounds,
      selectedBackground: id,
    })
  },

  // ============================================================
  // 上传照片
  // ============================================================
  chooseImage() {
    const that = this

    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      camera: 'front',
      success(res) {
        const tempFilePath = res.tempFiles[0].tempFilePath
        that.setData({
          sourceImagePath: tempFilePath,
          hasImage: true,
          currentStep: 1,
        })
        wx.showToast({
          title: '照片已上传 ✓',
          icon: 'success',
          duration: 1500,
        })
      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') === -1) {
          wx.showToast({
            title: '选择照片失败，请重试',
            icon: 'none',
          })
        }
      },
    })
  },

  // ============================================================
  // 预览原图
  // ============================================================
  previewImage() {
    if (this.data.sourceImagePath) {
      wx.previewImage({
        current: this.data.sourceImagePath,
        urls: [this.data.sourceImagePath],
      })
    }
  },

  // ============================================================
  // 重新上传
  // ============================================================
  retakePhoto() {
    this.setData({
      sourceImagePath: '',
      hasImage: false,
      currentStep: 0,
    })
  },

  // ============================================================
  // 开始生成
  // ============================================================
  startGenerate() {
    if (!this.data.hasImage) {
      wx.showToast({
        title: '请先上传照片',
        icon: 'none',
      })
      return
    }

    // 保存选择到全局
    app.globalData.currentStyle = this.data.selectedStyle
    app.globalData.currentBackground = this.data.selectedBackground
    app.globalData.sourceImagePath = this.data.sourceImagePath

    // 跳转到生成页
    wx.navigateTo({
      url: '/pages/generate/generate',
    })
  },
})
