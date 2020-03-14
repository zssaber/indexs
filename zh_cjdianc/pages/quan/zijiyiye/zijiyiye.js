var a = getApp(),
  util = require("../../../utils/util.js"),
  aa = a.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    testtrue: true,
    cateid: 0,
    page: 1,
    storeid:0,
    loading: !1,
    yyid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  dianija:function(t){
    var storeid=t.currentTarget.dataset.storeid ;
       wx.navigateTo({
         url: '/zh_cjdianc/pages/seller/index?sjid='+storeid,
       })
   },
  onLoad: function (t) {
    var that = this;
      var yyide = t.scene.split("-")[0];
      var storeid = t.scene.split("-")[1];
    a.getUserInfo(function (t) {
      if ("undefined" != yyide) {
        that.setData({
          yyid: yyide,
          storeid:storeid
        })
      }
      that.cxyhq();
    });
  },

  cxyhq: function () {
    var that = this,
      e = wx.getStorageSync("users").id,
      yyids = that.data.yyid,
      storeid = that.data.storeid;
    if (!yyids) {
      yyids = e;
    }
    a.util.request({
      url: "entry/wxapp/MyyCoupons",
      cachetime: "0",
      data: {
        user_id: yyids,
        storeid:storeid,
        uid: e
      },
      success: function (t) {
        that.setData({
          yyyhq: t.data,
          yyid:yyids,
          myid:e
        });
      }
    })
  },
  lqlj: function () {
    wx.showToast({
      title: "已经领取过啦",
      mask: !0
    })
  },
  ljlq: function (t) {
    console.log(t.currentTarget.dataset.qid);
    var that = this,
      index = t.currentTarget.dataset.index,
      yyid = that.data.yyid,
      yyyhq = "yyyhq[" + index + "].state",
      e = wx.getStorageSync("users").id;
    wx.showLoading({
      title: "正在加载",
      mask: !0
    }), a.util.request({
      url: "entry/wxapp/YyLq",
      cachetime: "0",
      data: {
        uid: yyid,
        user_id: e,
        coupon_id: t.currentTarget.dataset.qid
      },
      success: function (t) {
        console.log(t), "1" == t.data && (wx.showToast({
          title: "领取成功",
          mask: !0
        }), that.setData({
          [yyyhq]: 1
        }))
      }
    });
  },

  onShareAppMessage: function (res) {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})