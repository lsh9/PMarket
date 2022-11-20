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
                console.log(that.data.tmpimageurl);
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
        console.log(e.detail.value);
        var that = this;
        that.setData({ description: e.detail.value });
    },


    saveGoods: function (e) {
        var that = this;
        var name = e.detail.value.name;//获取商品名称
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

        wx.uploadFile({
            filePath: this.data.tmpimageurl,
            name: 'image',
            url: app.globalData.domain + '/image/upload/goods',
            success: function (res) {
                console.log(res.data)
                that.data.imageurl = res.data
                wx.showModal({
                    title: '提示',
                    content: "图片上传成功",
                    showCancel: false
                })
            }
        })

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
        console.log(goods);
        wx.request({
            url: app.globalData.domain + '/goods/publish',
            method: 'POST',
            data: goods,
            success: (res) => {
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