// addComment.js
import Config from '../../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chargeName: '',
    content: "",
    id:"",
    stars:0,
    person:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加评价'
    })
    this.setData({
      id: options.id,
      chargeName: options.name,
      person: (options.person && options.person != 'undefined') ? options.person : "无"
    });
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

  selectStar(e){
    this.setData({ stars: e.target.dataset.index + 1});
  },

  input(e){
    this.setData({ content: e.detail.value });
  },

  formSubmit() {
    if (this.data.stars < 1){
      wx.showToast({
        title: '请选择星级！',
        duration:1000
      });
      return false;
    }
    wx.p.request(Config.api.inquiry.operation, { operation_id: this.data.id, operation_content: this.data.content, operation_star:this.data.stars }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 1000
        });
        setTimeout(()=>{
          wx.redirectTo({
            url: "/pages/my/charge/charge?tab=1"
          });
        },1000);
      } else {
        wx.showToast({
          title: '提交失败！',
          duration: 1000
        });
      }
    });
  }
})