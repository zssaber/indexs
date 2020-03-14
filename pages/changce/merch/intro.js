var e = getApp(),
  a = e.requirejs("wxParse/wxParse"),
  r = e.requirejs("core");

Page({
  data: {
    merchid: 0,
    loading: !1,
    loaded: !1,
    merch: [],
    approot: e.globalDatayx.approot
  },
  onLoad: function(e) {
    this.setData({
      merchid: e.id
    }), this.getIntro();
  },
  getIntro: function() {
    var e = this;
    r.get("changce/merch/intro", {
      id: e.data.merchid
    }, function(r) {
      var t = [];
      r.merch.lat && (t = [{
        latitude: r.merch.lat,
        longitude: r.merch.lng,
        name: r.merch.merchname,
        desc: r.merch.address
      }]), e.setData({
        merch: r.merch,
        markers: t
      }), a.wxParse("wxParseData", "html", r.merch.desc, e, "0");
    });
  },
  callme: function(e) {
    var lat = this.data.merch.lat;
    var lon = this.data.merch.lng;
    var name = this.data.merch.merchname;
    console.log(lat);
    console.log(lon);
    console.log(name);
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = lat
        const longitude = lon
        wx.openLocation({
          latitude,
          longitude,
          name:name,
          scale: 18
        })
      }
    })
  },
  jump: function(e) {
    var a = r.pdata(e).id;
    a > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + a
    });
  }
});