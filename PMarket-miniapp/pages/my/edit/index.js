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
    this.getuserInfo()
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
    this.getuserInfo()
  },
  
  /**
   * 查询用户信息
   */
  getuserInfo: function () {
    var that = this;
    if(app.globalData.userInfo.id!=null)
    {wx.request({
      url: app.globalData.domain + '/my/info',
      method:"GET",
      data: {
        id:app.globalData.userInfo.id
      },
      success: function (res) {
        that.setData({
          userInfo: res.data
        });
        console.log(that.data.userInfo);
      }
    })}
  },

  bindSave: function (e) {
    var that = this;
    var nickName = e.detail.value.nickName;
    var contact = e.detail.value.contact;
    if (nickName == "") {
      wx.showModal({
        title: '提示',
        content: '请填写昵称/别名',
        showCancel: false
      })
      return
    }
    if (contact == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系方式：电话、微信、QQ等',
        showCancel: false
      })
      return
    }
    var data = e.detail.value;
    data.id = this.data.userInfo.id;
    data.avatarUrl=this.data.userInfo.avatarUrl;
    console.log(data);
    wx.request({
      url: app.globalData.domain + '/my/edit',
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res.data);
        if (res.data.code != 0) {
          // 错误 
          wx.hideLoading();
          wx.showModal({
            title: '错误',
            content: '编辑失败',
            showCancel: false
          })
          return;
        }
        wx.navigateBack({})
      }
    })
  },

  /*
  uploadAvatar(){
    wx.chooseMedia({
      success: function(res) {
        console.log(res.tempFiles[0].tempFilePath);
        wx.uploadFile({
          url: app.globalData.domain + '/my/upload',
          filePath:res.tempFiles[0].tempFilePath,
          name: 'userAvatar',
          success: function(res) {
            console.log(res.data);
            if (res.data.code == 0) {
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
              })
              var user = this.data.userInfo;
              user.avatarUrl = res.data.avatarUrl;
              this.setData({
                userInfo:user
              })
            }
            else{
              wx.showToast({
                title: '上传失败',
                duration: 2000
              })
            }
          },
          fail: function(res) {
            wx.showToast({
              title: '上传失败',
              duration: 2000
            })
          }
        })
      }
    })
  },
  */
 
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