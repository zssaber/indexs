var app = getApp(),
  util = require("../../utils/util.js");

Page({
  data: {
    selectedindex: 0,
    topnav: [{
      img: "../../../img/icon/dzt.png",
      img1: "../../../img/icon/wdzt.png",
      name: "全部"
    }, {
      img: "../../../img/icon/djd.png",
      img1: "../../../img/icon/wdjd.png",
      name: "待支付"
    }, {
      img: "../../../img/icon/ywc.png",
      img1: "../../../img/icon/wywc.png",
      name: "已完成"
    }, {
      img: "../../../img/icon/sh.png",
      img1: "../../../img/icon/wsh.png",
      name: "已关闭"
    }],
    open: !1,
    pagenum: 1,
    order_list: [],
    storelist: [],
    mygd: !1,
    jzgd: !0,
    selecttype: !1,
    typename: "选择类型",
    selectdate: !1,
    datetype: ["全部", "今天", "昨天", "近七天", "本月"],
    start: "",
    timestart: "",
    timeend: "",
    start_time: "",
    end_time: ""
  },
  xztype: function(t) {
    var e, a = t.currentTarget.dataset.index;
    console.log(a), 0 == a && (e = ""), 1 == a && (e = "today"), 2 == a && (e = "yesterday"),
      3 == a && (e = "week"), 4 == a && (e = "month"), this.setData({
        typename: this.data.datetype[a],
        time: e,
        start_time: "",
        end_time: "",
        pagenum: 1,
        selecttype: !1,
      }), this.onLoad();
  },
  bindTimeChange: function(t) {
    console.log("picker 发生选择改变，携带值为", t.detail.value), this.setData({
      timestart: t.detail.value
    });
  },
  bindTimeChange1: function(t) {
    console.log("picker  发生选择改变，携带值为", t.detail.value), this.setData({
      timeend: t.detail.value
    });
  },
  find: function() {
    var t = this.data.timestart,
      e = this.data.timeend;
     util.validTime(t, e) ? (this.setData({
      typename: this.data.datetype[0],
      time: "",
      start_time: t,
      end_time: e,
      selectdate: !1
    }), this.onLoad()) : wx.showModal({
      title: "提示",
      content: "请选择正确的日期范围"
    });
  },
  repeat: function() {
    var t = this.data.start;
    console.log(t), this.setData({
      typename: this.data.datetype[0],
      time: "",
      pagenum: 1,
      status: 1,
      timestart: t,
      timeend: t,
      start_time: "",
      end_time: "",
      selectdate: !1
    }), this.onLoad();
  },
  chosedate: function() {
    this.setData({
      selectdate: !this.data.selectdate,
      selecttype: !1
    });
  },
  maketel: function(t) {
    var e = t.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: e
    });
  },
  location: function(t) {
    var e = t.currentTarget.dataset.lat,
      a = t.currentTarget.dataset.lng,
      s = t.currentTarget.dataset.address;
    console.log(e, a), wx.openLocation({
      latitude: parseFloat(e),
      longitude: parseFloat(a),
      address: s,
      name: "位置"
    });
  },
  selectednavbar: function(t) {
    console.log(t), this.setData({
      pagenum: 1,
      order_list: [],
      storelist: [],
      mygd: !1,
      jzgd: !0,
      selectedindex: t.currentTarget.dataset.index,
      status: Number(t.currentTarget.dataset.index) + 1
    }), this.onLoad();
  },
  doreload: function(t) {
    console.log(t), this.setData({
      pagenum: 1,
      order_list: [],
      storelist: [],
      mygd: !1,
      jzgd: !0,
      selectedindex: t - 1,
      status: t
    }), this.onLoad();
  },
  kindToggle: function(t) {
    var e = t.currentTarget.id,
      a = this.data.order_list;
    console.log(e);
    for (var s = 0, i = a.length; s < i; ++s) a[s].open = s == e && !a[s].open;
    this.setData({
      order_list: a
    });
  },
  hidemask: function() {
    this.setData({
      selecttype: !1,
      selectdate: !1
    });
  },
  chosetype: function() {
    this.setData({
      selecttype: !this.data.selecttype,
      selectdate: !1
    });
  },
  onLoad: function(n) {

    wx.hideShareMenu({}), app.setNavigationBarColor(this);
    var t = this,
      start_time = t.data.start_time,
      end_time = t.data.end_time,
      time = t.data.time,
      o = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/Qbmx",
      cachetime: "0",
      data: {
        user_id: o,
        start_time: start_time,
        end_time: end_time,
        time:time
      },
      success: function(n) {
         t.setData({
          score: n.data
        });
      }
    });
    var a = wx.getStorageSync("sjdsjid");
    console.log(a, t);
    var s = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
    console.log(s.toString()), this.setData({
      start: s,
      timestart: s,
      timeend: s
    });
  },
  tzjfsc: function() {
    wx.redirectTo({
      url: "../integral/integral"
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