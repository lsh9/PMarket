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
    pageSize: 10,
    isLoad: false,
    goodsList: []
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
      activeIndex: e.currentTarget.dataset.id,
      page: 1,
      goodsNum: -1
    });
    console.log(this.data.activeIndex)
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
    console.log(categoryId);
    wx.request({
      url: app.globalData.domain + '/classify/getGoodsList',
      method:"GET",
      data: {
        categoryId: categoryId,
        beginNo: that.data.goodsNum,
        number: that.data.pageSize
      },
      success: function (res) {
        if (that.data.page == 1) { //判断是否第一页
          that.setData({
            goodsList: []
          });
        }
        if (res.data.length == 0) {
          console.log("no goods")
          that.setData({
            isLoad: true
          });
          return;
        }
        var goods = that.data.goodsList;
        console.log("get goods")
        for (var i = 0; i < res.data.length; i++) {
          goods.push(res.data[i]);
        }
        that.setData({
          goodsList: goods,
          isLoad: false
        });
        var noNow = res.data[res.data.length-1].goodsId; //设置目前得到的最小商品号
        that.setData({
          goodsNum: noNow-1
        })
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
    console.log("refresh")
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
        console.log("get more goods")
        console.log(that.data.activeIndex);
        that.setData({
          page: that.data.page + 1
        });
        that.getGoodsList(that.data.activeIndex);
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