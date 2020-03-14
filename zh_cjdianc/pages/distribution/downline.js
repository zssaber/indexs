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
      var a = this, e = wx.getStorageSync("users").id, tgy = wx.getStorageSync("users");
        app.util.request({
            url: "entry/wxapp/MyTeam",
            cachetime: "0",
            data: {
                user_id: e  
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    MyTeam: t.data,
                       tgy: tgy.tgy
                });
            }
        }), app.util.request({
          url: "entry/wxapp/StoreList",
          cachetime: "0",
          data: {
            user_id: e
          },
          success: function (t) {
            console.log(t.data), a.setData({
              mystore: t.data
            });
          }
        }), app.util.request({
            url: "entry/wxapp/CheckRetail",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    fxset: t.data
                }), wx.setNavigationBarTitle({
                    title: t.data.xx_name
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