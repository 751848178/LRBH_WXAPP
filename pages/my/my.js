import Config from '../../utils/config'
const app = getApp()
// my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    level: '',
    starDesc: '',
    avatarUrl: 'https://qn.wx.ilidu.cn/wxapp/avatar.webp-jpg',
    userid: '',
    star: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo && app.globalData.userInfo.userInfo.avatarUrl.length > 0) {
      this.setData({
        avatarUrl: app.globalData.userInfo.userInfo.avatarUrl
      })
    }

  },
  bindTapGrid: function (e) {
    console.log(e.currentTarget.dataset.item)
    let url = ''
    switch (e.currentTarget.dataset.item) {
      case 'blance':
        url = 'balance/balance'
        break
      case 'coupon':
        url = 'voucher/voucher'
        break
      case 'petal':
        url = 'petal/petal'
        break
      case 'point':
        url = 'integral/integral'
        break
      case 'item-ing':
        url = 'charge/charge?tab=0'
        break
      case 'item-rate':
        url = 'charge/charge?tab=1'
        break
      case 'item-rated':
        url = 'charge/charge?tab=2'
        break
    }
    wx.navigateTo({
      url: url
    })
  },
  bindTapTel: function () {
    wx.makePhoneCall({
      phoneNumber: '18611305888'
    })
  },
  bindTapSetting: function() {
    wx.navigateTo({
      url: 'setting/setting'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.p.request(Config.api.user.info).then(res => {
      this.setData({
        userid: res.result.customerId,
        nickname: res.result.nike_name,
        level: res.result.member_level_label,
        star: res.result.share_level_code,
        starDesc:res.result.share_level_label
      });
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 禁止Page滑动
   */
  catchMove: function (e) {

  },

  toInterest(){
    wx.navigateTo({
      url: '/pages/my/interest/interest',
    })
  }
})