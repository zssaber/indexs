var a = getApp(),
  util = require("../../utils/util.js"),
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
    loading: !1,
  },
  dianija:function(t){
   var storeid=t.currentTarget.dataset.storeid ;
      wx.navigateTo({
        url: '/zh_cjdianc/pages/seller/index?sjid='+storeid,
      })
  },
 
  onLoad: function(options) {
    var that = this, e = wx.getStorageSync("users").id;
    var cishu = wx.getStorageSync("cishu");
    a.util.request({
      url: "entry/wxapp/YyCoupons",
      cachetime: "0",
      data: { 
        user_id: e,
      },
      success: function (t) {
        that.setData({
          yyyhq: t.data
          
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