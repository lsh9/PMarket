//app.js
App({
  onLaunch: function () {

  },
  
  //微信授权登录
  login: function (userInfo, callback) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数
        var openid;
        wx.request({
          url: that.globalData.domain + '/my/login',
          method:"POST",
          data: {
            code: code,
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            gender: userInfo.gender
          }, // 设置请求的 参数
          success: (res) => {
            console.log(res.data);
            console.log(userInfo);
            if (res.data.code==0) {
              wx.hideLoading();
              that.globalData.userInfo = userInfo;
              console.log(that.globalData.userInfo);
              callback(0);
              console.log(callback);
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
   // domain: "http://1.117.242.95:80" 
    domain: "http://47.93.251.137:80"
  }
})