//app.js
App({
  onLaunch: function () {
   
  },
  
  //授权登录
  login: function (userInfo, callback) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        // 下面开始调用注册接口
        wx.request({
          url: that.globalData.domain + '/api/wechat/login',
          data: {
            code: code,
            avatarUrl: userInfo.avatarUrl,
            nickname: userInfo.nickName,
            gender: userInfo.gender
          }, // 设置请求的 参数
          success: (res) => {
            if (res.data.code == 0) {
              wx.hideLoading();
              var token = res.data.token;
              that.globalData.userInfo = res.data.member;
              wx.setStorage({
                key: 'token',
                data: token,
              })
              callback(0);
            } else {
              // 登录错误 
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试',
                showCancel: false
              })
            }

          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    domain: "http://1.117.242.95:5000"
  }
})