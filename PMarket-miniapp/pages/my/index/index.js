const app = getApp()

Page({

  data: {
    list: [
      { "name": "我的信息", "url": "/pages/my/info/index" },
      { "name": "我的发售", "url": "/pages/goods/publish-mine/index" },
      { "name": "我的求购", "url": "/pages/goods/buy-mine/index" },
      { "name": "我的收藏", "url": "/pages/goods/goods-like/index" },
    ],
    userInfo:null
  },

  onLoad() {
    this.getuserInfo();
  },

  onShow() {
    this.getuserInfo();
  },

  tabNav: function(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 查询用户信息
   */
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
        console.log("获取用户信息",that.data.userInfo);
      }
    })}
  },
  
  /**
   * 登录/退出
   */
  login: function(){
    wx.navigateTo({
      url: '/pages/my/login/index',
    })
  },

  logout(){
    wx.removeStorage({
      key: 'token',
    })
    this.setData({
      userInfo: null
    })
    app.logout()
  }

})