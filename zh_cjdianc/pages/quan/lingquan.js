var a = getApp(),
 qqmapsdk,
  util = require("../../utils/util.js"),
  i = a.requirejs("wxParse/wxParse"),
  as = a.requirejs("foxui"),
  aa = a.requirejs("core"),
QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    testtrue: 1,
    testtrua: 1,
    cates: [],
    cateid: 0,
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
    bfstorelist:[],
    params: {
      nopsf: 2,
      nostart: 2,
      yhhd: ""
    },
  },
  dianijass:function(t){
       wx.navigateTo({
         url: '/pages/index/index',
       })
   },
  dianija:function(t){
    var storeid=t.currentTarget.dataset.storeid ;
       wx.navigateTo({
         url: '/zh_cjdianc/pages/seller/index?sjid='+storeid,
       })
   },
  onLoad: function (options) {
    var that = this, e = wx.getStorageSync("users").id;
    a.util.request({
      url: "entry/wxapp/system",
      cachetime: "0",
      success: function(t) {
        qqmapsdk = new QQMapWX({
          key: t.data.map_key
        }),that.setData({
          mdxx: t.data
        })
      }
    }), aa.loading(), that.setData({
      loading: !0
    }), aa.get("sale/coupon/getlist", {
      page: that.data.page,
      cateid: that.data.cateid,
    }, function (e) {
      var i = {
        loading: !0,
        total: e.total,
        pagesize: e.pagesize
      };
      e.list.length > 0 && (i.page = that.data.page + 1, i.list = that.data.list.concat(e.list),
        e.list.length < e.pagesize && (i.loaded = !0), that.setSpeed(e.list)), that.setData(i),
        aa.hideLoading();
    });
    that.getcoupons();
  },

  getcoupons:function(){
    var that = this, 
    ee = wx.getStorageSync("users").id,
    dw = wx.getStorageSync("locat"),
    i = this.data.params;
    if(dw){
      var e = dw.locat.lat,
          s = dw.locat.lng;
      a.util.request({
        url: "entry/wxapp/PtCoupons",
        cachetime: "0",
        data: {
          user_id: ee,
          lat:e,
          lng:s
        },
        success: function (t) {
          that.setData({
            ptyhq: t.data
          });
        }
      })
    }else{
    wx.getLocation({
      success: function (t) {
        var e = t.latitude,
          s = t.longitude;
          i.lat = e, 
          i.lng = s, that.setData({
            params: i
          })
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: e,
        longitude: s
      },
      coord_type: 1,
      success: function (t) {
        var a = t.result.ad_info.location;
        that.setData({
          weizhi: t.result.formatted_addresses.recommend,
          startjwd: a
        });
      },
      fail: function (t) {
        console.log(t);
      },
      complete: function (t) {
        console.log(t);
      }
    }),a.util.request({
      url: "entry/wxapp/PtCoupons",
      cachetime: "0",
      data: {user_id: ee,lat:e,lng:s},
      success: function (t) {
        that.setData({
          ptyhq: t.data
        });
      }
    })
   }
  })
  }
  },

  setSpeed: function (t) {
    if (t && !(t.length < 1)) for (var a in t) {
      var e = t[a];
      if (!isNaN(e.lastratio)) {
        var i = e.lastratio / 100 * 2.5, s = wx.createContext();
        s.beginPath(), s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), s.setFillStyle("rgba(0,0,0,0)"),
          s.setStrokeStyle("rgba(0,0,0,0.2)"), s.setLineWidth(4), s.stroke(), s.beginPath(),
          s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), s.setStrokeStyle("#ffffff"),
          s.setLineWidth(4), s.setLineCap("round"), s.stroke();
        var o = "coupon-" + e.id;
        wx.drawCanvas({
          canvasId: o,
          actions: s.getActions()
        });
      }
    }
  },
  lqlj:function(){
    wx.showToast({
      title: "已经领取过啦",
      mask: !0
    })
  },
  ljlq: function (t) {
    console.log(t.currentTarget.dataset.qid);
    var that = this, e = wx.getStorageSync("users").id;
    wx.showLoading({
      title: "正在加载",
      mask: !0
    }), a.util.request({
      url: "entry/wxapp/LqCoupons",
      cachetime: "0",
      data: {
        user_id: e,
        coupon_id: t.currentTarget.dataset.qid
      },
      success: function (t) {
        console.log(t), "1" == t.data && (wx.showLoading({
          title: "领取成功",
          mask: !0
        }), that.onLoad())
      }
    });
  },

  yxlq:function(a){
    var e = this;
    aa.get("sale/coupon/getdetail", {
      id: a.currentTarget.dataset.id
    }, function (t) {
      aa.error > 0 ? wx.navigateBack() : (i.wxParse("wxParseData", "html", t.detail.desc, e, "5")),
      e.receive(t);
      });
  },

  receive: function (e) {
    var i = e.detail, s = this;
    console.log(i);
    if (this.data.buying) as.toast(s, "正在执行请稍后"); else if (1 == i.canget) {
          s.setData({
            buying: !0
          }), aa.post("sale/coupon/pay", {
            id: i.id
          }, function (e) {
            if (e.error > 0) return as.toast(s, e.message), void s.setData({
              buying: !1
            });
            s.setData({
              logid: e.logid
            }), a.wechat && a.wechat.success ? aa.pay(a.wechat.payinfo, function (e) {
              "requestPayment:ok" == e.errMsg && s.payResult();
            }) : s.payResult(), s.setData({
              buying: !1
            });
          });
    } else as.toast(s, i.getstr);
  },

  payResult: function () {
    var that = this;
    aa.get("sale/coupon/payresult", {
      logid: that.data.logid
    }), wx.showLoading({
      title: "领取成功",
      mask: !0
    }), setTimeout(function () {
      wx.navigateBack();
    }, 1e3);
  },

  

  btnClicks: function () {
    var yxcishu = this.data.yxcishu;
    var testtrues = this.data.testtrua;
    if (yxcishu == true || testtrues == false) {
      wx.showToast({
        title: '你已领取',
      });
    } else {
      var isShow = this.data.testtrua;
      this.setData({
        testtrua: !isShow,
      }), wx.setStorageSync("yxcishu", isShow);
    }
    this.onLoad();
  },




  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})