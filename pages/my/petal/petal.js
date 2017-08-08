// petal.js
import Config from '../../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    count: 0,
    pageNum: 1,
    pageSize: 10,
    incomeList: [],
    presentList: [],
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
    wx.p.request(Config.api.coin.info).then(res => {
      this.setData({ count: res.result.balance });
    });
    this.getIncome();
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

  attorn() {
    wx.redirectTo({ url: "attorn" });
  },

  hisTab(event) {
    this.setData({
      currentTab: event.target.dataset.current,
      isGot: true
    });
  },

  //滑动切换tab
  bindChangeSwiper: function (e) {
    let current = e.detail.current;
    this.setData({ currentTab: current });
    this.setData({ pageNum: 1 });
    if (current == 0) {
      this.getIncome();
    } else {
      this.getPresent();
    }
  },

  getIncome(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.coin.income, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1) });
          return;
        }
        if (isAppend) {
          list = this.data.incomeList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ incomeList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }

  },

  getPresent(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.coin.present, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1)});
          return ;
        }
        if (isAppend) {
          list = this.data.presentList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ presentList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }
  },

  getNew() {
    this.setData({
      pageNum: this.data.pageNum + 1
    });
    if (this.data.currentTab == 0) {
      this.getIncome(true);
    } else {
      this.getPresent(true);
    }
  }

})