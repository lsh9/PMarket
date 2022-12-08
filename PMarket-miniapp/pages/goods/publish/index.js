// pages/goods/publish/index.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageurl: null,
        tmpimageurl: null,
        buttonhidden: false,
        imghidden: true,
        deletehidden: true,
        category: null,
        picUrls: [],
        title: '',
        opacity: '0.4',
        width: '85',
        position: 'center',
        type: 1,
        hidden: true,
        string: '请选择商品类型',
        description: '',
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

    changehidden: function (e) {
        this.setData({ hidden: !this.data.hidden });
    },

    choosecategory0: function (e) {
        this.setData({ category: 0 });
        this.setData({ hidden: true });
        this.setData({ string: '书籍' })
    },

    choosecategory1: function (e) {
        this.setData({ category: 1 });
        this.setData({ hidden: true });
        this.setData({ string: '日用' })
    },

    choosecategory2: function (e) {
        this.setData({ category: 2 });
        this.setData({ hidden: true });
        this.setData({ string: '数码' })
    },


    uploadimage: function (e) {
        var that = this;
        wx.chooseMedia({
            count: 1,
            mediaType: 'image',
            sourceType: ['album', 'camera'],
            success(res) {
                that.setData({ tmpimageurl: res.tempFiles[0].tempFilePath });
                console.log("生成临时图片",that.data.tmpimageurl);
                that.setData({ buttonhidden: true });
                that.setData({ deletehidden: false });
                that.setData({ imghidden: false })
            }
        })
    },

    deleteimg: function (e) {
        this.setData({ deletehidden: true });
        this.setData({ tmpimageurl: null });
        this.setData({ imghidden: true });
        this.setData({ buttonhidden: false });
    },

    inputdescription: function (e) {
        console.log("商品描述，用户输入的内容",e.detail.value);
        var that = this;
        that.setData({ description: e.detail.value });
    },


    saveGoods: async function (e) {
        var that = this;
        var name = e.detail.value.name;//获取商品名称

        if(app.globalData.userId==null){
          wx.showToast({
            title: '请先登录再发布商品',
            icon: 'none'
          })
          return;
        }

        if(that.data.tmpimageurl==null){
          wx.showToast({
            title: '请上传商品图片',
            icon: 'none'
        })
        return;
        }
        else{
          await that.upAvatar(that);
        }

        if (name == '') {
            wx.showToast({
                title: '请填写商品名称',
                icon: 'none'
            })
            return;
        }

        var category = this.data.category;//获取商品名称
        if (category == null) {
            wx.showToast({
                title: '请选择商品类型',
                icon: 'none'
            })
            return;
        }

      var price = e.detail.value.price;//获取联系方式
      for (let i = 0; i < price.length; ++i) {//正则判断是否合法
        var textValue = (/^[0-9_]$/.test(price.charAt(i)));
        if (!textValue) {
          price = 'INVALID';
        }
      }
      if (price == 'INVALID') {
        wx.showToast({
          title: '目前只支持正整数价格哦',
          icon: 'none'
        })
        return;
      }
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

        var description = this.data.description;
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
            category: category,//商品类型
            price: price,//商品价格
            contact: contact,//联系方式
            userId: app.globalData.userId,//用户ID
            pictureUrl: that.data.imageurl,//图片的URL
        };
        console.log("发布商品，传给后端的商品对象内容",goods);
        wx.request({
            url: app.globalData.domain + '/goods/publish',
            method: 'POST',
            data: goods,
            success: (res) => {
                console.log("发布商品，后端返回的内容",res.data);
                wx.showModal({
                    title: '提示',
                    content: "发布成功",
                    showCancel: false
                })
                wx.navigateTo({
                    url: '/pages/goods/publish/index',
                })
            }
        })
    },

    async upAvatar(that) {
      return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: app.globalData.domain + '/image/upload/goods',
      filePath:that.data.tmpimageurl,
      name: 'image',
      success: function(res) {
        console.log("上传图片中收到的data",res.data);
        const data = res.data
        if (res.statusCode==200) {
          wx.showToast({
            title: '上传图片成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            imageurl:data
          })
          console.log("上传图片完成")
          resolve('1')
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
      },
    })
      })
    },
    
})
