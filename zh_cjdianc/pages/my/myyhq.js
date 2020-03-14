var app = getApp(),
  asd = app.requirejs("core");

Page({
  data: {
    tabs: ["平台红包", "商家优惠券", "优选优惠券"],
    activeIndex: 0,
    cate: "",
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
  },
  tabClick: function(t) {
    this.setData({
      activeIndex: t.currentTarget.id
    });
  },
  qsy: function(t) {
    console.log(t.currentTarget.dataset.sjid), getApp().sjid = t.currentTarget.dataset.sjid,
      wx.redirectTo({
        url: "/zh_cjdianc/pages/seller/index"
      });
  },
  onLoad: function(t) {
    app.setNavigationBarColor(this), console.log(this);
    var o = this,
      a = wx.getStorageSync("users").id,
      js = wx.getStorageSync("users").juese;
    if (js == 1) {
      o.setData({
        tabs: ["平台红包", "商家优惠券", "优选优惠券", "异业优惠券"]
      })

    }
    app.util.request({
      url: "entry/wxapp/MyCoupons",
      cachetime: "0",
      data: {
        user_id: a
      },
      success: function(t) {
        console.log(t.data);
        for (var a = [], e = [], n = 0; n < t.data.length; n++) "2" == t.data[n].type && a.push(t.data[n]),
          "1" == t.data[n].type && e.push(t.data[n]);
        console.log(a, e), o.setData({
          ptarr: a,
          sjarr: e
        });
      }
    }), app.util.request({
      url: "entry/wxapp/MyyCoupons",
      cachetime: "0",
      data: {
        user_id: a
      },
      success: function(t) {
        o.setData({
          yyyhq: t.data,
        });
      }
    }), asd.get("sale/coupon/my/getlist", {
      page: this.data.page,
      cate: this.data.cate
    }, function(e) {
      var i = {
        loading: !1,
        total: e.total,
        pagesize: e.pagesize,
        closecenter: e.closecenter
      };
      e.list.length > 0 && (i.page = o.data.page + 1, i.list = o.data.list.concat(e.list),
        e.list.length < e.pagesize && (i.loaded = !0)), o.setData(i), asd.hideLoading();
    });
  },
  onShareAppMessage: function(res) {
    var that = this,
      coupon_id = res.target.dataset.qid,
      e = wx.getStorageSync("users").id,
      time = Date.parse(new Date()),
      timestamp = time / 1000;
    console.log('优惠券id--', coupon_id);
    console.log('分享本人id--', e);
    console.log('分享的时间---', timestamp);
    return {
      title: '分享优惠券',
      path: '/zh_cjdianc/pages/jifenzs/jifenzs?coupon_id=' + coupon_id + '&user_id=' + e + '&time=' + timestamp,
      imageUrl: '',
    }
    that.setData({
      display: 1
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});