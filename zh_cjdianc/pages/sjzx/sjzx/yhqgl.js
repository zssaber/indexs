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
    loading: !1,
  },
  dianija:function(t){
    var id = t.currentTarget.dataset.id ;
      wx.navigateTo({
        url: '/zh_cjdianc/pages/sjzx/sjzx/blyyq?id='+id,
      })
  },
 
  onLoad: function(options) {
    var that = this, 
           e = wx.getStorageSync("users").id,
           n = wx.getStorageSync("sjdsjid"),
       cishu = wx.getStorageSync("cishu");
       console.log('-----',n);
    a.util.request({
      url: "entry/wxapp/MyCouponsApi",
      cachetime: "0",
      data: { 
        store_id: n,
      },
      success: function (t) {
        that.setData({
          list: t.data    
        });
      }
    })
  },
  del:function(e){
    var that = this,
      id = e.currentTarget.dataset.id,
      n = wx.getStorageSync("sjdsjid");
      wx.showModal({
        title:'温馨提示',
        content:'您确定要删除吗？',
        success: function(res) {
          a.util.request({
            url: "entry/wxapp/DelCouponsApi",
            cachetime: "0",
            data: {
              id:id,
              store_id:n,
            },
            success: function (t) {
              that.setData({
                list: t.data
              });
            }
          })
          }
      })
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