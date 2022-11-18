// pages/goods/goods-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goods: {},
//    isGoodsFavorite: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.goodsId
    })
    this.getGoods(options.goodsId);
    this.getCollect(options.goodsId)
    this.deleteGoods(options.goodsId)
  },

  //查询商品详情
  getGoods: function (goodsId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/goods/publish',
      data: {
        goods: goods,
        Userid: userid
      },
      success: function (res) {
        that.setData({
          goods: res.data.goods,
        });
      }
    })
  },

  //删除
  deleteGoods: function (goodsId) {
    wx.request({
      url: app.globalData.domain + '/goods/delete',
      method:'POST',
      data: data,
      success: function (res) {
        if (res.data.code != 0) {
          // 错误 
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
          return;
        }
        wx.navigateBack({})
      }



    })
  },


    //收藏
  collect(e) {
    if (!wx.getStorageSync('token')) {
      return;
    }
    var that = this;
    var goodsId = this.data.goods.id;
    var action = this.data.isGoodsFavorite ? 'uncollect' : 'save';
    wx.request({
      url: app.globalData.domain + '/goods/collect/' + action,  //not yet
      data: {
        goodsId: goodsId
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            isGoodsFavorite: !that.data.isGoodsFavorite
          })
        }
      }
    })
  },

  //是否收藏
  getCollect(goodsId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/goods/collect/',  //not yet
      data: {
        goodsId: goodsId
      },
      header: {
        token: wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            isGoodsFavorite: res.data.isCollect
          })
        }
      }
    })
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

  }
})