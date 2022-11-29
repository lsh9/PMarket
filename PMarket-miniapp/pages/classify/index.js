// pages/classify/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    categoryList: [],
    page: 1,
    goodsNum: -1,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();
    this.getGoodsList(0)
  },

  //点击分类
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id,
      page: 1,
      goodsNum: -1
    });
    this.getGoodsList(e.currentTarget.dataset.id);
  },

  //查询分类
  getCategory: function () {
    var that = this;
    var categoryList = [{
      id: 0,
      categoryName: '书籍'
    }, {
      id: 1,
      categoryName: '日用'
    }, {
      id: 2,
      categoryName: '数码'
    }];

    that.setData({
      categoryList: categoryList
    });
  },

  //查询商品
  getGoodsList: function (categoryId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/classify/getGoodsList',
      method:"GET",
      data: {
        categoryId: categoryId,
        beginNo: that.data.goodsNum,
        number: that.data.pageSize
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            goodsList: [],
            isLoad: true
          });
          return;
        }
        that.setData({
          goodsList: res.data,
          goodsNum: res.data[res.data.length-1].goodsId - 1
        });
      }
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
    this.setData({
      page: 1,
      goodsNum: -1
    });
    wx.showNavigationBarLoading()
    this.getGoodsList(this.data.activeIndex);
    setTimeout(function() {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
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
        this.getGoodsList(that.activeIndex);
      }
    },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})