//app.js
App({
  onLaunch: function () {
    wx.navigateTo({
      url: '/pages/my/login/index',
    })
  },
  
  //微信授权登录
  login: function (userInfo, callback) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的code参数
        wx.request({
          url: that.globalData.domain + '/my/login',
          method:"POST",
          data: {
            code: code,
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            gender: userInfo.gender
          },
          success: (res) => {
            console.log(res.data);
            console.log(userInfo);
            console.log(that.globalData.userId);
            if (res.data.code==0) {
              wx.hideLoading();
              that.globalData.userId=res.data.id;
              console.log(that.globalData.userId);
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

  logout: function(){
    this.globalData.userId=null
  },

  globalData: {
    userId: null,
    //domain: "http://1.117.242.95:80" 
    domain: "http://47.93.251.137:80" //课程服务器
  }
})