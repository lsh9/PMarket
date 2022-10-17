// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 登录
   */
  formSubmit: function(e){
    if (e.detail.value.mobile == '') {
      wx.showModal({
        title: '提示',
        content: '用户名不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else if (e.detail.value.password == '') {
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
        showCancel: false,
        success: function (res) {
        }
      })
    } else {
      wx.request({
        url: app.globalData.domain + "/api/login",
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          loginName: e.detail.value.mobile,
          password: e.detail.value.password
        },
        success: function (res) {
          if(res.data.code == 0){
            var token = res.data.token;
            wx.setStorage({
              key: 'token',
              data: token,
            })
            
            wx.navigateBack({
              
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
              }
            })
          }
          
        },
        fail:function(res){
          console.log(res);
        }
      })
    }
  },

  //授权登录
  getUserInfo: function (r) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (resUser) => {
        app.login(resUser.userInfo, function(res){
          if(res == 0){
            wx.navigateBack({
              delta: 0,
            })
          }
        })
      },
      fail: function(res){
      }
    })
  },

  // 注册
  reg: function(){
    wx.navigateTo({
      url: '/pages/my/register/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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