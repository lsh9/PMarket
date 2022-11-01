// pages/classify/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    categoryList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();
    this.getGoodsList(-1)
  },

  //点击分类
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
    this.getGoodsList(e.currentTarget.dataset.id);
  },

  //查询分类
  getCategory: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/classify/getCategory',
      data: {},
      success: function (res) {
        if (res.data.code == 0) {
          var categoryList = [{
            id: -1,
            categoryName: '全部'
          }]
          for (var i = 0; i < res.data.categoryList.length; i++) {
            categoryList.push(res.data.categoryList[i]);
          }
          that.setData({
            categoryList: categoryList
          });

        }
      }
    })
  },

  //查询商品
  getGoodsList: function (categoryId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/classify/getGoodsList',
      data: {
        categoryId: categoryId
      },
      success: function (res) {
        that.setData({
          goodsList: res.data.goodsList
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

  }
})