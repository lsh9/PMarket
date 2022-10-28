// pages/classify/index.js
<<<<<<< HEAD

const app = getApp()

=======
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    activeIndex: 0,
    categoryList: []
=======

>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742
  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
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
      url: app.globalData.domain + '/api/category/list',
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
      url: app.globalData.domain + '/api/goods/list',
      data: {
        categoryId: categoryId
      },
      success: function (res) {
        that.setData({
          goodsList: res.data.goodsList
        });
      }
    })
=======
  onLoad(options) {

>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
<<<<<<< HEAD
  onReady: function () {
=======
  onReady() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
  onShow: function () {
=======
  onShow() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
<<<<<<< HEAD
  onHide: function () {
=======
  onHide() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  },

  /**
   * 生命周期函数--监听页面卸载
   */
<<<<<<< HEAD
  onUnload: function () {
=======
  onUnload() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
<<<<<<< HEAD
  onPullDownRefresh: function () {
=======
  onPullDownRefresh() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  },

  /**
   * 页面上拉触底事件的处理函数
   */
<<<<<<< HEAD
  onReachBottom: function () {
=======
  onReachBottom() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  },

  /**
   * 用户点击右上角分享
   */
<<<<<<< HEAD
  onShareAppMessage: function () {
=======
  onShareAppMessage() {
>>>>>>> 381d95262e78154b2ea2d5b7f7ef6800c0819742

  }
})