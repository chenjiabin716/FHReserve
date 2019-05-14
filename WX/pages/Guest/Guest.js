// pages/Guest/Guest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalMoney: 0,
    list: [],
    weburl: wx.getStorageSync('weburl'),
    time: '13:00',
    ordernum: '4',
    name: '陈佳斌',
    phone: '15874107312',
    remark: '不要辣椒',
  },
  bindchange: function(e) {
    this.setData({
      time: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      totalMoney: options.money,
      list: JSON.parse(options.list)
    });
  },
  gotopay: function() {
    var nickName;
    var avatarUrl;
    var _this=this;
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
         nickName = userInfo.nickName
         avatarUrl = userInfo.avatarUrl
        console.log(nickName)
        wx.request({
          url: _this.data.weburl + "wx/insertOrder?msg=wxmanage",
          data: {
            data: JSON.stringify(_this.data.list),
            money: _this.data.totalMoney,
            name: _this.data.name,
            num: _this.data.ordernum,
            phone: _this.data.phone,
            remark: _this.data.remark,
            time: _this.data.time,
            wxName: nickName,
            wxTX: avatarUrl
          },
          method: 'POST',
          success(res) {
            wx.showToast({
              title: '订单提交成功！',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  ordernumInput: function(e) {
    this.setData({
      ordernum: e.detail.value
    })
  },
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function(e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },
  remarkInput: function(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})