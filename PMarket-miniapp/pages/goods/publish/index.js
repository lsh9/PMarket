// pages/goods/publish/index.js
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
    var goodsName = e.detail.value.goodsName;
    if (goodsName == '') {
      wx.showToast({
        title: '请填写商品名称',
        icon: 'none'
      })
      return;
    }

    var price = e.detail.value.price;
    if (price == '') {
      wx.showToast({
        title: '请填写价格',
        icon: 'none'
      })
      return;
    }

    if (that.data.picUrls.length == 0) {
      wx.showToast({
        title: '请上传商品图片',
        icon: 'none'
      })
      return;
    }

    var describe = e.detail.value.describe;
    if (describe == '') {
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
      type: e.detail.value.type,
      goodsName: goodsName,
      describe: describe,
      categoryId: that.data.categoryList[that.data.categoryIndex].id,
      price: price,
      picUrl: that.data.picUrls[0],
      picUrls: that.data.picUrls,
      stock: 1
    };
    //等待添加更多交互（？）
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