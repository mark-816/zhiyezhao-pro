/**
 * 职业照Pro - 首页
 * @description 品牌展示 + 风格选择 + 上传入口
 */

Page({
  data: {
    // 文案
    title: '职业照Pro',
    subtitle: 'AI生成你的专业形象照',
    ctaText: '📸 立即生成职业照',

    // 特色卖点
    features: [
      { icon: '⚡', title: '1分钟生成', desc: 'AI智能处理，快速出片' },
      { icon: '🎨', title: '多种风格', desc: '商务/休闲/国风任选' },
      { icon: '💾', title: '微信保存', desc: '一键保存到相册，方便快捷' },
    ],
  },

  // ============================================================
  // 生命周期
  // ============================================================
  onLoad() {},

  onShow() {
    // 更新统计数据（从全局读取）
    const app = getApp()
    const stats = app.getStats()
    this.setData({ stats })
  },

  onShareAppMessage() {
    return {
      title: '职业照Pro - AI生成你的专业形象照',
      path: '/pages/index/index',
    }
  },

  // ============================================================
  // 页面跳转
  // ============================================================

  /** 跳转到上传页 */
  goToUpload() {
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },

  /** 跳转到我的页面 */
  goToMy() {
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },

  /** 跳转到结果页（历史查看） */
  goToResult(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/result/result?id=${id}`,
    })
  },
})
