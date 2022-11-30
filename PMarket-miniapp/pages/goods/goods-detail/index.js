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
    userInfo: null,
    goods_details_userinfo:{}
  }, 

  /**
   * 查询用户信息
   */
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.goodsId
    })
    this.getGoods(options.goodsId);
    this.getuserInfo();
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
  
//查询用户信息
  getuserInfo: function () {
    var that = this;
    if(app.globalData.userId!=null)
    {wx.request({
      url: app.globalData.domain + '/my/info',
      method:"GET",
      data: {
        id:app.globalData.userId
      },
      success: function (res) {
        that.setData({
          userInfo: res.data
        });
        console.log(that.data.userInfo);
      }
    })}
  },

  
  //删除
  deleteGoods: function () {
    var that = this;
    
    if(this.data.goods_details_userinfo.id==this.data.userInfo.id){
    wx.request({
      url: app.globalData.domain + '/goods/delete',
      method:'POST',
      data:{
        goodsId:this.data.id
      },
      success: function (res) {
      console.log(res.data);
        wx.navigateBack({})
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
        id:this.data.userInfo.id
      },
      success: function (res) {
      console.log(res.data);
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

