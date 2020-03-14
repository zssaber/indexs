var app = getApp(),
  util = require("../../utils/util.js");

Page({
  data: {
    selectedindex: 0,
    store_id:'',
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
  xztype: function (t) {
    var e, a = t.currentTarget.dataset.index;
    console.log(a), 0 == a && (e = ""), 1 == a && (e = "today"), 2 == a && (e = "yesterday"),
      3 == a && (e = "week"), 4 == a && (e = "month"), this.setData({
        typename: this.data.datetype[a],
        selecttype: !1,
        time: e,
        start_time: "",
        end_time: "",
      }), this.shuax();
  },
  bindTimeChange: function (t) {
    console.log("picker 发生选择改变，携带值为", t.detail.value), this.setData({
      timestart: t.detail.value
    });
  },
  bindTimeChange1: function (t) {
    console.log("picker  发生选择改变，携带值为", t.detail.value), this.setData({
      timeend: t.detail.value
    });
  },
  find: function () {
    var t = this.data.timestart,
      e = this.data.timeend;
    console.log(util.validTime(t, e)), util.validTime(t, e) ? (this.setData({
      typename: this.data.datetype[0],
      time: "",
      start_time: t,
      end_time: e,
      selectdate: !1
    }), this.shuax()) : wx.showModal({
      title: "提示",
      content: "请选择正确的日期范围"
    });
  },
  repeat: function () {
    var t = this.data.start;
    console.log(t), this.setData({
      typename: this.data.datetype[0],
      time: "",
      timestart: t,
      timeend: t,
      start_time: "",
      end_time: "",
      selectdate: !1
    }), this.reLoad();
  },
  chosedate: function () {
    this.setData({
      selectdate: !this.data.selectdate,
      selecttype: !1
    });
  },
  maketel: function (t) {
    var e = t.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: e
    });
  },
  location: function (t) {
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
  hidemask: function () {
    this.setData({
      selecttype: !1,
      selectdate: !1
    });
  },
  chosetype: function () {
    this.setData({
      selecttype: !this.data.selecttype,
      selectdate: !1
    });
  },
  onLoad: function (n) {
    wx.hideShareMenu({}), app.setNavigationBarColor(this);
    var t = this,
      o = wx.getStorageSync("users").id;
      t.setData({
        store_id:n.store_id,
      })
    var a = wx.getStorageSync("sjdsjid");
    console.log(a, t);
    var s = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
    console.log(s.toString()), this.setData({
      start: s,
      timestart: s,
      timeend: s
    });
    t.shuax();
  },
  tzjfsc: function () {
    wx.redirectTo({
      url: "../integral/integral"
    });
  },
  shuax:function(){
    var t = this,
      start_time = t.data.start_time,
      end_time = t.data.end_time,
      time = t.data.time,
      o = wx.getStorageSync("users").id,
    id = t.data.store_id;
    app.util.request({
      url: "entry/wxapp/VipMx",
      cachetime: "0",
      data: {
        user_id: o,
        store_id: id,
        start_time: start_time,
        end_time: end_time,
        time: time
      },
      success: function (n) {
        console.log(n), t.setData({
          score: n.data
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () {
    
   },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});