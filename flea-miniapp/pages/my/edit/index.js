// pages/address/edit/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMember()
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
  
  getMember: function () {
    var that = this;
    wx.request({
      url: app.globalData.domain + '/my/info',
      method:"GET",
      data: {
        id:app.globalData.domain
      },
      success: function (res) {
        that.setData({
          userInfo: res.data.userInfo
        });
      }
    })
  },

  bindSave: function (e) {
    var that = this;
    var nickname = e.detail.value.nickname;
    var mobile = e.detail.value.mobile;

    if (nickname == "") {
      wx.showModal({
        title: '提示',
        content: '请填写昵称/别名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系方式：电话、微信、QQ等',
        showCancel: false
      })
      return
    }

    var data = e.detail.value;
    data.id = this.data.userInfo.id
    data.avatarUrl = this.data.UserInfo.avatarUrl
   
    wx.request({
      url: app.globalData.domain + '/my/edit',
      method: 'POST',
      data: data,
      success: function (res) {
        if (res.data.code != 0) {
          // 错误 
          wx.hideLoading();
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