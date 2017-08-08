// addComplain.js
import Config from '../../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    complainType: {
      array: ['治疗效果', '服务态度','服务效率'],
      objectArray: [{
        id: 0,
        name: '治疗效果'
      },
      {
        id: 1,
        name: '服务态度'
      },
      {
        id: 2,
        name: '服务效率'
      }],
    },
    operation_id:"",
    complainTypeIndex: 0,
    content: "",
    currentTab: 1
  },
  bindPickerChange: function (e) {
    this.setData({
      complainTypeIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加投诉'
    });
    this.setData({
      operation_id: options.operation_id,
      currentTab: options.currentTab
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

  input(e){
    this.setData({content:e.detail.value});
  },

  formSubmit() {
    wx.p.request(Config.api.inquiry.complain, { complain_type: parseInt(this.data.complainTypeIndex) + 1, complain_content: this.data.content, operation_id: this.data.operation_id }).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 1000
        });
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/my/charge/charge?tab=' + this.data.currentTab
          });
        },1000)
      } else {
        wx.showToast({
          title: '提交失败！',
          duration: 1000
        });
      }
    });
  }
})