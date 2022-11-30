// pages/goods/goods-detail/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    goods: {},
    goods_details_userinfo:{}
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.goodsId
    })
    this.getGoods(options.goodsId);
    this.getdetail_userinfo(options.goodsId);
//    this.getCollect();
//    this.getCollect(options.goodsId)
  },

  getGoods: function (goodsId) {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/goods/getGoodsId',
      method:"GET",
      data: {
        goodsId: goodsId
      },
      success: function (res) {
        that.setData({
          goods: res.data.Goods,
        });
      }
    })
  },

  getdetail_userinfo:function(goodsId){
    var that = this;
    wx.request({
      url: app.globalData.domain + '/goods/getGoodsId',
      method:"GET",
      data: {
        goodsId:goodsId
      },
      success: function (res) {
        that.setData({
          goods_details_userinfo:res.data.User
        });
        console.log("goods_detail");
        console.log(res.data.User);
      }
    })

  },
  
  //删除
  deleteGoods: function () {
    var that = this;
    if(that.data.goods_details_userinfo.id!=app.globalData.userId){
      wx.showModal({
        title: '提示',
        content: "不能删除别人发布的商品哦~",
        showCancel: false
      })
    }
    else{
    wx.request({
      url: app.globalData.domain + '/goods/delete',
      method:'POST',
      data:{
        goodsId:this.data.id
      },
      success: function (res) {
      console.log(res.data);
      if(res.data.code==0){
        wx.showModal({
          title: '提示',
          content: "删除成功",
          showCancel: false
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: "删除失败",
          showCancel: false
        })
      }
      }
    })
  }
  },

  collect: function () {
    wx.request({
      url: app.globalData.domain + '/goods/addLikesGoods',
      method:'POST',
      data:{
        goodsId:this.data.id,
        id:app.globalData.userId
      },
      success: function (res) {
      console.log(res.data);
      if(res.data.code==0){
        wx.showModal({
          title: '提示',
          content: "收藏成功",
          showCancel: false
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: "收藏失败",
          showCancel: false
        })
      }
      }
    })
    
  },
    /*
    wx.request({
      url: app.globalData.domain + '/goods/collected',
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
    })*/
  



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

