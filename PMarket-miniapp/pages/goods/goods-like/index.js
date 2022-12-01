//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goodsList: [],
    isLoad: false,
    page: 1,
    pageSize: 18,
    goodsNum: -1,
  },

  onLoad: function () {
    this.getLikesGoods();
  },

  onShow: function () {},



  getLikesGoods: function () {
    var that = this;
    console.log("get goods")
    wx.request({
      url: app.globalData.domain + '/goods/getLikesGoods',
      method: "GET",
      data: {
        id: app.globalData.userId,
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
          that.setData({
            isLoad: true
          });
          return;
        }
        var goods = that.data.goodsList;
        for (var i = 0; i < res.data.length; i++) {
          goods.push(res.data[i]);
        }
        that.setData({
          goodsList: goods,
          isLoad: false
        });
        that.setData({
          goodsNum: res.data[res.data.length-1].goodsId - 1
        })
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
      this.getLikesGoods();
    }
  },

  //下拉加载
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      goodsNum: -1
    });
    wx.showNavigationBarLoading()
    this.getLikesGoods();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

  //分享
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  }
})