<<<<<<< HEAD
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    bannerList: [],
    goodsList: [],
    isLoad: false,
    page: 1,
    pageSize: 10,
    type: 1
  },

  onLoad: function() {
    this.getAdvert();
    this.getGoods();
  },

  onShow: function(){
    
  },

  //跳转查询
  showInput: function () {
    wx.navigateTo({
      url: '/pages/goods/goods-list/index',
    })
  },

  //查询轮播
  getAdvert: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/api/advert/list',
      data: {
        position: 'shop'
      },
      success: function(res) {
        that.setData({
          bannerList: res.data.advertList
        });
      }
    })
  },

  //查询商品
  getGoods: function() {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/index/goods',
      data: {
        page: that.data.page,
        limit: that.data.pageSize
      },
      success: function(res) {
        that.setData({
          goodsList: []
        });
        if (res.data.code != 0) { //请求异常
          that.setData({
            isLoad: false
          });
          return;
        }
        if (res.data.goodsList.length == 0) {
          that.setData({
            isLoad: true
          });
          return;
        }
        var goods = that.data.goodsList;
        for (var i = 0; i < res.data.goodsList.length; i++) {
          goods.push(res.data.goodsList[i]);
        }
        that.setData({
          goodsList: goods,
          isLoad: false
        });
      }
    })
  },

  //上拉加载
  loadMore: function () {
    console.log("load more")
    var that = this;
    var isLoad = this.data.isLoad;
    console.log(isLoad)
    if (!isLoad) {
      this.setData({
        page: that.data.page + 1
      });
      this.getGoods();
    }
  },

  //下拉加载
  onPullDownRefresh: function() {
    this.setData({
      page: 1
    });
    wx.showNavigationBarLoading()
    this.getAdvert();
    this.getGoods();
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  //分享
  onShareAppMessage: function() {
    var path = '/pages/index/index';
    return {
      title: "二手交易平台",
      path: path,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    this.loadMore();
=======
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742
  }
})