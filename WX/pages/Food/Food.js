// pages/Food/Food.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weburl: wx.getStorageSync('weburl'),
    totalCount: 0,
    list: [],
    typelist: [],
    totalMoney: 0,
    textColor: '#EBA444',
    textColor1: '#EBA444',
    btnColor: '#3885CA',
    btnColor1: '#EBA444',
    selType: '',
    scroll: false, //菜品列表滚动
    foodtypecss: '', //菜品类型动态样式
    footercss: 'display:none;', //底部动态样式
    scrollid: '#', //滚动到选中菜品

  },
  //加数量
  addnum: function(e) {
    var index = e.currentTarget.dataset.index; //索引
    var num = this.data.list[index].num + 1; //数量
    var money = this.data.list[index].FoodPrice; //价格
    if (parseFloat(this.data.list[index].FoodStoreCount) >= num) {
      this.data.list[index].num = num;
      this.setData({
        list: this.data.list,
        totalMoney: parseFloat(this.data.totalMoney) + parseFloat(money),
        totalCount: parseFloat(this.data.totalCount) + 1
      });
      //是否显示底部
      this.showfooter();
    } else {
      wx.showToast({
        title: '今日剩余数量不足',
        icon: 'none'
      })
    }
  },
  //减数量
  jiannum: function(e) {
    var index = e.currentTarget.dataset.index;
    var money = this.data.list[index].FoodPrice;
    if (this.data.list[index].num > 0) {
      this.data.list[index].num -= 1;
      this.setData({
        list: this.data.list,
        totalMoney: parseFloat(this.data.totalMoney) - parseFloat(money),
        totalCount: parseFloat(this.data.totalCount) - 1
      });
      //是否显示底部
      this.showfooter();
    }
  },
  //是否显示底部
  showfooter: function() {
    var isshow = false;
    for (var i = 0; i < this.data.list.length; i++) {
      console.log(this.data.list[i].num)
      if (this.data.list[i].num > 0) {
        isshow = true;
        break;
      } else {
        isshow = false;
      }
    }
    if (isshow)
      this.setData({
        footercss: ''
      })
    else
      this.setData({
        footercss: 'display:none;'
      })

  },
  //选好了 跳转下一个页面
  guestPage: function() {
    var list = [];
    for (var i = 0; i < this.data.list.length; i++) {
      if (this.data.list[i].num > 0) {
        list.push(this.data.list[i]);
      }
    }
    wx.navigateTo({
      url: '../Guest/Guest?money=' + this.data.totalMoney + '&list=' + JSON.stringify(list)
    })
  },
  //拨打电话
  makePhone: function() {
    wx.makePhoneCall({
      phoneNumber: '15874107312'
    })
  },
  //选择菜品类型
  selfoodtype: function(e) {
    var typeid = e.currentTarget.dataset.id;
    //改变样式
    this.setData({
      selType: typeid,
      scroll: true,
      scrollid: 't' + typeid
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    //查询系统颜色配置
    wx.request({
      url: this.data.weburl + "wx/getSmallSetting",
      method: 'POST',
      success(res) {
        _this.setData({
          textColor: res.data[0].TextColor,
          textColor1: res.data[0].TextColor1,
          btnColor: res.data[0].BtnColor,
          btnColor1: res.data[0].BtnColor1,
        })
      },
      fail(error) {
        console.log(error)
      }
    })
    //查询所有菜品
    this.getallfood();
    //查询所有菜品类型
    wx.request({
      url: this.data.weburl + "wx/getallfoodtype",
      method: 'POST',
      success(res) {
        _this.setData({
          typelist: res.data
        })
      }
    })
  },
  //查询所有菜品
  getallfood: function() {
    var _this = this;
    wx.request({
      url: this.data.weburl + "wx/getallfood",
      method: 'POST',
      success(res) {
        _this.setData({
          list: res.data
        })
      }
    })
  },
  onPageScroll: function(e) {
    const top = e.scrollTop;
    if (top > 280) {
      this.setData({
        scroll: true,
        foodtypecss: 'position: fixed;top:0px;'
      })
    } else {
      this.setData({
        scroll: false,
        foodtypecss: ''
      })
    }
  },
  bindscroll: function(e) {
    console.log(e)
    if (e.detail.scrollTop == 0) {
      this.setData({
        scroll: false,
        foodtypecss: ''
      })
    }
  },





  /**   test  动画效果
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation()
  },
  translate: function() {
    this.animation.scale(0.1).step({
      duration: 50
    })
    var x = 0;
    var y = 0;
    var count = 10;
    for (var i = 0; i < count; i++) {
      if (i < 1) {
        x -= 100;
        y -= 150;
        this.animation.translate(x, y).step({
          duration: 100
        })
      } else if (i < 4) {
        x -= 150;
        y -= 150;
        this.animation.translate(x, y).step({
          duration: 50
        })
      } else if (i < 5) {
        x -= 200;
        y += 200;
        this.animation.translate(x, y).step({
          duration: 50
        })
      } else {
        x -= 500;
        y += 2000;
        this.animation.translate(x, y).opacity(0).step({
          duration: 500
        })
        break;
      }
    }

    this.setData({
      animation: this.animation.export()
    })
  }
})