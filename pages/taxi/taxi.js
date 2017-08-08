import Check from '../../utils/check'

// taxi.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    taxing: false,
    src: '输入您的位置',
    location: {latitude:40.0016407,longitude:116.4074044},
    polyline: []
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Check.scopeUserLocation().then(res => {
      if (!res.success) {
        return wx.p.fail()
      }
      console.log(this.mapCtx.moveToLocation)
      this.mapCtx.moveToLocation()
    })
  },
  //滑动切换tab
  bindChangeSwiper: function (e) {
    this.setData({ currentTab: e.detail.current });
  },  

  //点击切换tab
  bindTapTab: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },  
  bindTapTaxi: function (e) {
    this.setData({
      taxing: true
    })
    wx.p.getStorage({
      key: 'agree'
    }).then(res => {
      if(res.success) {
        return wx.p.request(wx.config.api.taxi.add,{
          flat: this.data.location.latitude.toString(),
          flng: this.data.location.longitude.toString(),
          start_name: this.data.location.name,
          start_address: this.data.location.address,
          type: this.data.currentTab.toString()
        })
      }
     else {
        wx.navigateTo({
          url: 'agreement'
        })
        return wx.p.break()
      }
    }).then(res => {
      if(!res.success) {
        wx.p.showModal({
          title: '提示',
          content: res.message,
          showCancel: false
        })
      }
      else {
        wx.p.showModal({
          title: '提示',
          content: '叫车成功，请等待叫车短信',
          showCancel: false
        })
      }
    }).then(res => {
      this.setData({
        taxing: false
      })
    })

  },
  bindTapSelect: function (e) {
    wx.p.chooseLocation().then(res => {
      if(!res.success) {
        console.log("获取位置失败")
        return wx.p.fail()
      }
      this.mapCtx.includePoints({
        points:[{
        longitude: res.longitude,
        latitude: res.latitude
      }, {
        longitude: 116.4074044,
        latitude: 40.0016407
      }],
      padding:[20,20,20,20]
      })
      this.setData({
        location: res,
        src: res.name,
        polyline: [{
      points: [{
        longitude: res.longitude,
        latitude: res.latitude
      }, {
        longitude: 116.4074044,
        latitude: 40.0016407
      }],
      color:"#FF6091FF",
      width: 3
    }]
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
        title: '一键打车'
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