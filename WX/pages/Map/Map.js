Page({
  data: {
    latitude: 26.52695470767461,
    longitude: 113.9971244629711,
    markers: [{
      latitude: 26.52741547559128,
      longitude: 113.99721029365958,
      iconPath: '../weizhiicon.png',
      title: '谷香谷色',
      label: {
        content: '谷香谷色农家',
        anchorX: -35,
        anchorY: 5,
        color: '#000'
      }
    }]
  },
  onReady: function(e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  chooselocation: function(e) {
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = 26.52695470767461 // res.latitude
        const longitude = 113.9971244629711 // res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 16
        })
      }
    })
  },
  onLoad: function(o) {
    console.log(this.distance(28.169736, 113.007713, 28.17112, 113.00387))
    var para = {
      FoodID: 1
    }
    wx.request({
      url: 'https://chenann.com/', 
      method:'POST',
      data: para,
      success(res) {

      }
    })
  },
  getCenterLocation: function() {
    this.mapCtx.getCenterLocation({
      success: function(res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function() {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  foodPage: function() {
    //this.mapCtx.getCenterLocation({
    //  success: function(res) {
    //    console.log(res.longitude)
    //    console.log(res.latitude)
    //  }
    //})
    wx.navigateTo({
      url: '../Food/Food'
    })
  },
  makePhone: function() {
    wx.makePhoneCall({
      phoneNumber: '15874107312'
    })
  },
  shopPage:function(){
    wx.navigateTo({
      url: '../Shop/Shop'
    })
  },
  distance: function(la1, lo1, la2, lo2) {
    //根据经纬度计算距离
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  }
})