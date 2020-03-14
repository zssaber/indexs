var app = getApp(), util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['请选择类型', '普通券', '异业券' ],
    arrayss: ['固定佣金', '提点佣金' ],
    arrays: ['请选择使用范围','仅限外卖使用', '仅限堂食使用','仅限堂食+外卖使用'],
    index: 0,
    indexs: 0,
    indexss: 0,
    full:0,
    reduce: 0,
    number:0,
    commission:0,
    commission_td:0,
    lq_num:0,
    timestart: '',
    timeend: '',
    id:0
  },
  bindDateChange1(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      timestart: e.detail.value,
    })
  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      timeend: e.detail.value,
    })

  },
  bindPickerChangess: function(e) {
    var indexss = this.data.indexss;
    if(indexss==1){
      this.setData({
        indexss: e.detail.value,
        commission:0
      })
    }else{
      this.setData({
        indexss: e.detail.value,
        commission_td:0
      })
    }
    
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChanges: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexs: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    var that = this,
        s = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"),
        n = wx.getStorageSync("sjdsjid"),
        id= t.id;
        if(id){
          console.log('这是修改');
          app.util.request({
            url: "entry/wxapp/CouponDs",
            cachetime: "0",
            data: {
              id: id,
            },
            success: function (t) {
              that.setData({
                list: t.data,
                commission:t.data.commission,
                commission_td:t.data.commission_td,
                stock:t.data.stock,
                id:id,
                timestart: t.data.start_time,
                timeend: t.data.end_time,
                index:t.data.category,
                indexs: t.data.type,
                store_id:n
              });
            }
          })
        }else{
          that.setData({
            timestart: s,
            timeend: s,
            store_id: n
          })
        }
    
  },

  formSubmit:function(a){
    var t = this.data,
      e = a.detail.value,
      name = e.name,
      full = e.full,
      indexss = e.indexss,
      reduce = e.reduce,
      number = e.number,
      instruction = e.instruction,
      lq_num = e.lq_num,
      commission = e.commission,
      commission_td = e.commission_td,
      end_time = e.end_time,
      start_time = e.start_time,
      type = t.indexs,
      category = t.index,
      m = (t.id),
      store_id = t.store_id,
         id = t.id;
      var q = "";
    "" == name ? q = "请输入优惠券名称" : 0 == category ? q = "请选择优惠券类型" : 0 == reduce ? q = "优惠金额不得为0" : 0 == number ? q = "优惠数量不得为0" :  0 == type && (q = "请选择优惠范围")
    1 == app.title(q) && app.util.request({
      url: "entry/wxapp/AddCouponsApi",
      cachetime: "0",
      data: {
        id:id,
        name: name,
        start_time: start_time,
        end_time: end_time,
        full: full,
        reduce: reduce,
        type: type,
        number: number,
        instruction: instruction,
        category: category,
        commission: commission,
        commission_td: commission_td,
        lq_num: lq_num,
        store_id: store_id,
      },
      success: function (a) {
        if(id==0){
          wx.showToast({
            title: "添加成功"
          }),setTimeout(function () {
            wx.navigateTo({
              url: 'yhqgl',
            })
          }, 1000)
        }else{
          wx.showToast({
            title: "修改成功"
          }), setTimeout(function () {
            wx.navigateTo({
              url: 'yhqgl',
            })
          }, 1000)
        }
       }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})