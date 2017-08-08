// charge.js
import Config from '../../../utils/config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    commentListTab: 0,// 已评价二级tab
    pageNum: 0,
    pageSize: 10,
    peedingList: [],
    waitList: [],
    commentList: [],
    complainList: [],
    isGot: true
  },

  //滑动切换tab
  bindChangeSwiper: function (e) {
    this.changeSwiper(e.detail.current)
    this.getNew()
  },
  //点击切换tab
  bindTapTab: function (e) {
    this.changeSwiper(e.target.dataset.current)
  },
  changeSwiper: function(tab) {
    tab = parseInt(tab);
    if (this.data.currentTab === tab) {
      return false;
    } else {
      this.setData({
        currentTab: tab, pageNum: 0
      })
    }
  },
  //点击评价按钮
  bindBtnComment: function (e) {
    wx.redirectTo({//detailid
      url: 'addComment?id=' + e.target.dataset.value + '&name=' + e.target.dataset.name + '&person=' + e.target.dataset.person
    })
  },
  //点击投诉按钮
  bindBtnComplain: function (e) {
    if (e.target.dataset.status == 'false'){
      return false;
    }
    wx.redirectTo({
      url: 'addComplain' + '?operation_id=' + e.target.dataset.value + '&currentTab=' + this.data.currentTab
    })
  },
  bindTabComment:function(e){
    if (this.data.commentListTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        commentListTab: e.target.dataset.current,
        pageNum:0
      })
    }
    this.getNew()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的项目'
    })
    if (this.data.currentTab == options.tab) {
      this.getNew()
    }
    this.changeSwiper(parseInt(options.tab))
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

  getPeeding(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.inquiry.info, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}&inquiryStatus=1`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1) });
          return;
        }
        if (isAppend) {
          list = this.data.peedingList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ peedingList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }

  },

  getWait(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.inquiry.info, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}&inquiryStatus=2`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1) });
          return;
        }
        if (isAppend) {
          list = this.data.waitList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ waitList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }
  },

  getComment(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.inquiry.info, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}&inquiryStatus=3`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1) });
          return;
        }
        if (isAppend) {
          list = this.data.commentList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ commentList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }

  },

  getComplain(isAppend) {
    if (this.data.isGot) {
      wx.p.request(Config.api.inquiry.info, `?pageNum=${this.data.pageNum}&pageSize=${this.data.pageSize}&inquiryStatus=4`).then(res => {
        let list = [];
        if (res.result.length == 0) {
          this.setData({ pageNum: (this.data.pageNum - 1) });
          return;
        }
        if (isAppend) {
          list = this.data.complainList.concat(res.result);
        } else {
          list = res.result;
        }
        this.setData({ complainList: list });
      });
      this.setData({ isGot: false });
      setTimeout(() => { this.setData({ isGot: true }); }, 500);
    }
  },

  getNew(curr) {
    let num = this.data.pageNum
    this.setData({
      pageNum: num + 1
    });
    switch (this.data.currentTab < 2 ? this.data.currentTab : (this.data.commentListTab == 0 ? 2 :3) ){
      case 0:
        this.getPeeding(num == 0?false:true);
        break;
      case 1:
        this.getWait(num == 0 ? false :true);
        break;
      case 2:
        this.getComment(num == 0 ? false :true);
        break;
      case 3:
        this.getComplain(num == 0 ? false :true);
        break;
      default:
        this.getPeeding(num == 0 ? false :true);
        break;
    }
  }

})