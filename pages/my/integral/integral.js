// integral.js
import Config from "../../../utils/config";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integralList: [],
    pageNum: 0,
    pageSize: 10,
    isGot: true
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
    this.getNew();
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
  getIntegral(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.user.integralInfo, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1) });
          return;
        }
        if (isAppend) {
          list = this.data.integralList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ integralList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }

  },

  getNew() {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    this.getIntegral(true);
  }
})