// pages/index/search/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    isLoad: false,
    page: 1,
    pageSize: 10,
    categoryId: "-1",
    inputVal: "",
    Nonow: 1
  },

  //点击查询
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },

  //
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.getGoodsList();
  },

  //清空查询
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
    this.getGoodsList();
  },

  //输入
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.categoryId) {
      this.setData({
        categoryId: options.categoryId
      });
    }
    this.getGoodsList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    this.setData({
      page: 1
    });
    this.getGoodsList();
    setTimeout(function() {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1000);
  },

  //上拉
  loadMore: function () {
    console.log("load more")
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      console.log("get more search result")
      this.getGoodsList();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //查询商品
  getGoodsList: function() {
    var that = this;
    console.log("search")
    that.setData({
      isLoad: true
    });
    wx.request({
      url: app.globalData.domain + '/index/searchGoods',
      method: "POST",
      data: {
        limit: that.data.page * that.data.pageSize,
        keywords: that.data.inputVal
      },
      success: function(res) {
        if (that.data.page == 1) {
          that.setData({
            goodsList: []
          });
        }
        if (res.data.length == 0) {
          console.log("no search result")
          that.setData({
            isLoad: true
          });
          return;
        }
        var goods = that.data;
        console.log("get result")
        for (var i = that.data.Nonow; i < res.data.length; i++) {
          goods.goodsList.push(res.data[i]);
        }
        that.setData({
          goodsList: goods.goodsList,
          isLoad: false,
          Nonow: that.data.Nonow + that.data.pageSize
        });
      }
    })
  }
  
})