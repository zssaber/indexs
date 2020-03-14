var t = getApp().requirejs("core");

Page({
    data: {
        storeid: 0,
        merchid: 0,
        markers: [],
        store: {}
    },
    onLoad: function(t) {
        this.setData({
            storeid: t.id,
            merchid: t.merchid
        }), this.getInfo();
    },
    getInfo: function() {
        var e = this;
        console.log(this.data.storeid), t.get("store/map", {
            id: this.data.storeid,
            merchid: this.data.merchid
        }, function(t) {
            e.setData({
                store: t.store,
                markers: [ {
                    id: 1,
                    latitude: Number(t.store.lat),
                    longitude: Number(t.store.lng)
                } ],
                show: !0
            });
        });
    },
    phone: function(e) {
        t.phone(e);
    },
  callme: function (e) {
    var lat = this.data.store.lat;
    var lon = this.data.store.lng;
    var name = this.data.store.storename;
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
          name: name,
          scale: 18
        })
      }
    })
  },
});