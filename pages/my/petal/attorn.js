// attorn.js
import Config from '../../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remarkLen:0,
    isSub:false
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
   * 输入事件
   */
  input(e){
    this.setData({
      remarkLen: e.detail.value.length
    });
  },

  formSubmit(e){
    if (e.detail.value.mobile.length < 1 || e.detail.value.balance.length < 1 || (e.detail.value.balance + "").indexOf(".") > 0){
      wx.showToast({
        title: '请填写正确的信息！',
        duration:1000
      });
      return false;
    }
    if (this.data.isSub){
      return false;
    }
    wx.p.request(Config.api.coin.makeOver, e.detail.value).then(res => {
      if(res.code == 0){
        res.message = "转账成功！";
        wx.showToast({
          title: res.message,
          duration: 1000
        });
        setTimeout(()=>{wx.redirectTo({
          url: '/pages/my/petal/petal',
        });},1000);
      }
      this.setData({ isSub: false });
    });
    this.setData({ isSub:true});
  },

  mobileInput(e) {
    if (e.detail.value.length == 11) {
      wx.p.request(Config.api.coin.target, "?mobile=" + e.detail.value).then(res => {
        console.log(res);
        wx.showToast({
          title: "转给：" + res.result.nike_name,
          duration: 1000
        });
      });
    }
  }
})