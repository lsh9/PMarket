//app.js
App({
  onLaunch: function () {

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
            console.log(that.globalData.userInfo);
            if (res.data.code==0) {
              wx.hideLoading();
              that.globalData.userInfo.nickName = userInfo.nickName;
              that.globalData.userInfo.gender=userInfo.gender;
              that.globalData.userInfo.avatarUrl=userInfo.avatarUrl;
              that.globalData.userInfo.id=res.data.id;
              console.log(that.globalData.userInfo);
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
    this.globalData.userInfo={
      id:	null,// 用户识别编号
      nickName:	null,	// 用户昵称
      avatarUrl:	null,	// 头像
      gender:	   null,   // 性别
      contact:	null	// 联系方式
    }
  },

  globalData: {
    userInfo:
    {
      id:	null,// 用户识别编号
      nickName:	null,	// 用户昵称
      avatarUrl:	null,	// 头像
      gender:	   null,   // 性别
      contact:	null	// 联系方式
    },
    domain: "1.117.242.95:3306" 
    //domain: "http://47.93.251.137:80" //课程服务器
  }
})