// pages/goods/publish/index.js
//尚存在一些未完全完善的图片处理等，第一次测试主要任务为测试名字、价格和描述的正确传输。
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList: [],
    categoryIndex: 0,
    picUrls: [],
    title: '',
    opacity: '0.4',
    width: '85',
    position: 'center',
    type: 1
  },

  radioChange: function(e) {
    this.setData({
      type: e.detail.value
    })
  },

  bindCategoryChange: function(e) {
    this.setData({
      categoryIndex: e.detail.value
    })
  },

  getCategoryIndex: function(categoryId) {
    for (var i = 0; i < this.data.categoryList.length; i++) {
      if (categoryId == this.data.categoryList[i].categoryId) {
        return i;
      }
    }
  },

  del(e){
    var that = this;
    var i = e.currentTarget.dataset.index;
    this.data.picUrls.splice(i, 1)
    this.setData({
      picUrls: that.data.picUrls
    });
  },

  saveGoods: function(e) {
    var that = this;
    var name = e.detail.value.name;//获取商品名字
    if (name == '') {
      wx.showToast({
        title: '请填写商品名称',
        icon: 'none'
      })
      return;
    }

    var price = e.detail.value.price;//获取价格
    if (price == '') {//不能为空
      wx.showToast({
        title: '请填写价格',
        icon: 'none'
      })
      return;
    }

    /*if (that.data.picUrls.length == 0) {
      wx.showToast({
        title: '请上传商品图片',
        icon: 'none'
      })
      return;
    }*/

    var description = e.detail.value.description;//获取描述信息
    if (description == '') {//不能为空
      wx.showToast({
        title: '请填写商品描述',
        icon: 'none'
      })
      return;
    }

    var goodsPicList = [];
    for (var i = 0; i < that.data.picUrls.length; i++) {
      goodsPicList.push({
        pic: that.data.picUrls[i]
      });
    }

    var goods = {
      type: e.detail.value.type,//类型：目前默认为出售，1
      name: name,//商品名字
      description: description,//商品描述
      //categoryId: that.data.categoryList[that.data.categoryIndex].id,
      price: price,//商品价格
      picUrl: that.data.picUrls[0],
      picUrls: that.data.picUrls,
      stock: 1
    };
    //等待添加更多交互（？）
    wx.request({
      url: app.globalData.domain + '/goods/publish',
      method:'POST',
      data: goods,
      success:(res) =>{
        wx.showModal({
          title: '提示',
          content: "发布成功",
          showCancel: false
        })
      }
    })
  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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

  }
})