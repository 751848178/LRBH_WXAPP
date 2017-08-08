// registered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexes: [
      {name: '1', value: '男'},
      {name: '2', value: '女'}
    ],
    sex: '2',
    sendText: '获取验证码',
    sending: false,
    submiting: false,
    mobile: '',
    code: '',
    name: '',
    time:null
  },
  bindChangeSex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  bindTapSend: function (e) {
    if (this.data.time != null) {
      return false;
    }
    this.setData({
      time: setInterval(() => {
        if (this.data.sendText == 0) {
          clearInterval(this.data.time);
          this.setData({ time: null, sendText: '获取验证码' });
          return false;
        }
        this.setData({ sendText: this.data.sendText - 1 });
      }, 1000),
      sendText: 60
    });
    wx.p.request(wx.config.api.common.code,{
      mobile: this.data.mobile
    }).then(res => {
      if (res.success) {
        return  wx.p.showModal({
                  title: '提示',
                  content: '发送成功',
                  showCancel: false
                })
      }
    })
  },
  bindTapLogin: function (e) {
    wx.navigateTo({
      url: 'login'
    })
  },
  bindKeyMobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindKeyCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindKeyName: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  bindTapReg: function (e) {
    wx.p.request(wx.config.api.common.reg, {
      mobile: this.data.mobile,
      code: this.data.code,
      name: this.data.name,
      gender: this.data.sex.toString()
    }).then(res => {
      if (res.success) {
        wx.reLaunch({
          url: '/pages/my/my'
        })
      }
      else {
        if (res.code === 305) {
           wx.navigateTo({
            url: 'login'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      title: '注册'
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

  }
})