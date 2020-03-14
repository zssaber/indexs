var app = getApp();

Page({
    data: {
        ac_index: 0
    },
  tuanduidingdan: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/ruzhu/index'
    })
  },
    onLoad: function(t) {
        app.setNavigationBarColor(this);
      var a = this, e = wx.getStorageSync("sjdsjid");
        app.util.request({
            url: "entry/wxapp/MyTeams",
            cachetime: "0",
            data: {
                store_id: e  
            },
            success: function(t) {
                a.setData({
                    MyTeam: t.data,
                });
            }
        });
    },
    one: function(t) {
        this.setData({
            ac_index: 0
        });
    },
    two: function(t) {
        this.setData({
            ac_index: 1
        });
    },
    tgy: function (t) {
      this.setData({
        ac_index: 2
      });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});