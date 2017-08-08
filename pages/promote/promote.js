// promote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    focus:false,
    inputValue:"",
    winWidth:0,
    isShow:true,
    inter: null
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
  /**
   * 点击查看历史
   */
  toHistory(){
    wx.navigateTo({url: 'history'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '推荐好友'
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
    wx.getSystemInfo({
      success: res => {
        this.setData({ winWidth: res.screenWidth - 45 });
      }
    });
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

  bindButtonTap(){
    this.setData({ focus: true});
    if (this.data.inter == null) {
      this.setData({
        inter: setInterval(() => {
          this.setData({ isShow: !this.data.isShow });
        }, 500)
      });
    }
  },

  bindKeyInput(e){
    this.setData({ inputValue: e.detail.value});
  },

  inputBlur() {
    clearInterval(this.data.inter);
    this.setData({ focus: false, inter:null });
  }
})