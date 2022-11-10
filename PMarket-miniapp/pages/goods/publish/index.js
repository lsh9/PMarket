// pages/goods/publish/index.js

const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    imageurl:null,
    picUrls: [],
    title: '',
    opacity: '0.4',
    width: '85',
    position: 'center',
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(app.globalData.userId==null){
      wx.navigateTo({
        url: '/pages/my/login/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    if(app.globalData.userId==null){
      wx.navigateTo({
        url: '/pages/my/login/index',
      })
    }
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

  },

uploadimage: function(e){
    var that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: 'image',
      sourceType: ['album', 'camera'],
      success(res){
        var tempFilePath = res.tempFiles[0].tempFilePath;
        console.log(tempFilePath);
        wx.uploadFile({
          filePath: tempFilePath,
          name: 'image',
          url: app.globalData.domain + '/image/upload/goods',
          success:function(res) {
            console.log(res.data)
            that.data.imageurl = res.data
            wx.showModal({
              title: '提示',
              content: "图片上传成功",
              showCancel: false
            })
          }
        })
      }
    })
},



saveGoods: function(e) {
  var that = this;
  var name = e.detail.value.name;//获取商品名称

  if(app.globalData.userId==null){
    wx.showToast({
      title: '请先登录再发布商品',
      icon: 'none'
    })
    return;
  }

  if (name == '') {
    wx.showToast({
      title: '请填写商品名称',
      icon: 'none'
    })
    return;
  }

  var category = e.detail.value.category;//获取商品名称
  if (category == '') {
    wx.showToast({
      title: '填个012再走呗',
      icon: 'none'
    })
    return;
  }

  var price = e.detail.value.price;//获取联系方式
  if (price == '') {
    wx.showToast({
      title: '请填写价格',
      icon: 'none'
    })
    return;
  }

  var contact = e.detail.value.contact;//获取商品价格
  if (contact == '') {
    wx.showToast({
      title: '请留下联络方式',
      icon: 'none'
    })
    return;
  }

  /*
  if (that.data.picUrls.length == 0) {
    wx.showToast({
      title: '请上传商品图片',
      icon: 'none'
    })
    return;
  }
  */

  var description = e.detail.value.description;
  if (description == '') {
    wx.showToast({
      title: '请填写商品描述',
      icon: 'none'
    })
    return;
  }
  
var goods = {
  type: e.detail.value.type,//类型
  name: name,//商品名称
  description: description,//商品描述
  category:category,//商品类型
  price: price,//商品价格
  contact:contact,//联系方式
  userId:app.globalData.userId,//用户ID
  pictureUrl:that.data.imageurl,//图片的URL
};
console.log(goods);
wx.request({
      url: app.globalData.domain + '/goods/publish',
      method:'POST',
      data: goods,
      success:(res) =>{
        console.log(res.data);
        wx.showModal({
          title: '提示',
          content: "发布成功",
          showCancel: false
        })
      }
    })
}
})
