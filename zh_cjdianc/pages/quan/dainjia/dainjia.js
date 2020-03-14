var app = getApp();

Page({
  data: {
    jrdd: "0",
    jrcj: "0"
  },
  onLoad: function (options) {
    var a = this,
      n = options.storeid;
    console.log(n, wx.getStorageSync("system")), this.setData({
      wm_name: wx.getStorageSync("system").wm_name || "外卖",
      dc_name: wx.getStorageSync("system").dc_name || "堂食"
    }), app.setNavigationBarColor(this), app.sjdpageOnLoad(this), app.util.request({
      url: "entry/wxapp/StoreStatistics",
      cachetime: "0",
      data: {
        store_id: n
      },
      success: function (t) {
        console.log(t.data), a.setData({
          wmdd: t.data
        });
      }
      }),app.util.request({
        url: "entry/wxapp/StoreInfo",
        cachetime: "0",
        data: {
          store_id: n
        },
        success: function (t) {
          var sx =t.data.sxf,
          zy = a.data.wmdd.zy,
          zsy = zy*(sx/100);
          a.setData({
            storeinfo:t.data.store,
            zsy:zsy.toFixed(2)
          })
        }
      });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});