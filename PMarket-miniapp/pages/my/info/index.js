// pages/my/info/index.js
const app = getApp();
Page({

  data: {
    userInfo: null
  },

  /**
   * 查询用户信息
   */
  getUserInfo: function () {
    var that = this;
    if(app.globalData.userId!=null){
      wx.request({
        url: app.globalData.domain + '/my/info',
        method:"GET",
        data: {
          id:app.globalData.userId
        },
        success: function (res) {
          that.setData({
            userInfo: res.data
          });
          console.log("获取用户信息",that.data.userInfo);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
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
    this.getUserInfo();
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

  },

  edit: function () {
    wx.navigateTo({
      url: '/pages/my/edit/index',
    })
  }
})