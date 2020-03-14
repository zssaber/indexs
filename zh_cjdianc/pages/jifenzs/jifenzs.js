var a = getApp(),util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dis:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    a.getUserInfo(this);

    var that = this,
      e = wx.getStorageSync("users").id,
      coupon = options.coupon_id,
      user = options.user_id,
      time = options.time;
      if(coupon){
        a.util.request({
          url: "entry/wxapp/CouponCx",
          cachetime: "0",
          data: {
            uid: user,
            user_id: e,
            time: time,
            coupon_id: coupon
          },
          success: function (t) {
            if ("1" == t.data.is_lq){
              that.setData({
                dis: 3,
                list: t.data
              })
            } else if ("3" == t.data.is_lq){
              that.setData({
                dis: 4,
                list: t.data
              })
            }else{
              that.setData({
                dis: 1,
                coupon_id: coupon,
                user_id: user,
                time: time,
                list: t.data
              })
            }
          }
        });
      }
  },

  onShareAppMessage: function (res) {
    var that = this,
      coupon_id = that.data.coupon_id,
      e = wx.getStorageSync("users").id,
      time = Date.parse(new Date()),
      timestamp = time / 1000;

    console.log('分享用户id',e);
    console.log('分享时间', timestamp);
    console.log('分享优惠券id', coupon_id);
    return {
      title: '分享优惠券',
      path: '/zh_cjdianc/pages/jifenzs/jifenzs?coupon_id=' + coupon_id + '&user_id=' + e + '&time=' + timestamp,
      imageUrl: '',
    }
    that.setData({
      display: 1
    })
  },

  lingqu:function(e){
    var that = this,
      uid = that.data.user_id,
      coupon_id = that.data.coupon_id,
      time = that.data.time,
     user_id = wx.getStorageSync("users").id;

    wx.showLoading({
      title: "正在加载",
      mask: !0
    }), a.util.request({
      url: "entry/wxapp/CouponFx",
      cachetime: "0",
      data: {
        uid: uid,
        user_id: user_id,
        time:time,
        coupon_id: coupon_id
      },
      success: function (t) {
        console.log(t), "1" == t.data && (wx.showToast({
          title: "领取成功",
        }), that.setData({
          dis:3,
        }))
        wx.navigateTo({
          url: '/zh_cjdianc/pages/my/myyhq',
        })
      }
    });
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