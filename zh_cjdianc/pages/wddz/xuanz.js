var QQMapWX = require('../../utils/qqmap-wx-jssdk.js'),
  util = require("../../utils/util.js");
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var that;
var qqmapsdk, app = getApp();
Page({
  data: {
    params: {
      nopsf: 2,
      nostart: 2,
      yhhd: ""
    },
    location: '',
    keywords: ''
  },
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    that = this;
    that.setData({
      id: id
    })
    qqmapsdk = new QQMapWX({
      key: 'AZVBZ-F2XKU-2BFVP-26ZGF-MAJRH-SRFL2'
    });
    that.reloadCurrent();
  },
  onShow: function () {
    wx.showNavigationBarLoading();
    var a = this,
      e = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/MyAddress",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (e) {
        console.log(e);
        for (var t = 0; t < e.data.length; t++) e.data[t].address = e.data[t].area.join("") + e.data[t].address;
        a.setData({
          address_list: e.data
        });
      }
    });
  },
  tiaoyue: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/wddz/xzdz',
    })
  },
  keywordTyping: function (e) {
    // 键盘不断录入绑定取值
    var keyword = e.detail.value;
    // 向腾讯地图接口发送请求
    qqmapsdk.getSuggestion({
      keyword: keyword,
      region: that.data.city,
      success: function (res) {
        console.log("aaaaaa", res);
        // 保存地址数组
        that.setData({
          result: res.data
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    this.setData({
      keywords: e.detail.value
    })
  },


  addressTapped: function (e) {
    var a = this;
    var title = e.currentTarget.dataset.title;
    var locat = e.currentTarget.dataset.location;
    console.log("+", title, "+");
    console.log(locat);
    a.setData({
      locat: locat,
      title: title
    })
    wx.setStorageSync('locat', a.data);
    wx.navigateTo({
      url: '/zh_cjdianc/pages/index/index',
    });
  },
  reloadCurrent: function () {
    that.setData({
      address: '正在定位中...',
    });
    // 调用接口
    qqmapsdk.reverseGeocoder({
      poi_options: 'policy=2',
      get_poi: 1,
      success: function (res) {
        that.setData({
          address: res.result.formatted_addresses.recommend,
          location: res.result.location,
          result: res.result.pois,
          city: res.result.address_component.city
        });
      },
      fail: function (res) {
        //         console.log(res);
      },
      complete: function (res) {
        //         console.log(res);
      }
    });
  },
  radioChange: function (e) {
    wx.getStorageSync("mydata").id;
    var a = this;
    var ids = a.data.id;
    console.log(ids);
    if (ids == '123') {
      var lat = e.currentTarget.dataset.lat;
      var lng = e.currentTarget.dataset.lng;
      var locat = {lat:lat,lng:lng};
      var title = e.currentTarget.dataset.title;
      console.log(locat);
      a.setData({
        locat: locat,
        title: title
      })
      wx.setStorageSync('locat', a.data);
      wx.navigateTo({
        url: '/zh_cjdianc/pages/index/index',
      });
    } else {


      console.log("radio发生change事件，携带value值为：", e.currentTarget.dataset.id);
      var t = e.currentTarget.dataset.id;
      app.util.request({
        url: "entry/wxapp/AddDefault",
        cachetime: "0",
        data: {
          id: t
        },
        success: function (e) {
          if (console.log(e), "1" == e.data) {
            a.onShow(), wx.showToast({
              title: "修改成功",
              icon: "success",
              duration: 1e3
            });
            var t = getCurrentPages();
            if (console.log(t), 1 < t.length && "zh_cjdianc/pages/takeout/takeoutform" == t[t.length - 2].route) t[t.length - 2].countpsf();
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 1e3);
          }
          if ("2" == e.data) {
            t = getCurrentPages();
            if (console.log(t), 1 < t.length && "zh_cjdianc/pages/takeout/takeoutform" == t[t.length - 2].route) t[t.length - 2].countpsf();
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 1e3);
          }
        },
        fail: function (e) {},
        complete: function (e) {}
      });
    }
  },
  getWechatAddress: function (e) {
    var n = wx.getStorageSync("users").id,
      s = this;
    wx.chooseAddress({
      success: function (o) {
        console.log(o), "chooseAddress:ok" == o.errMsg && (wx.showLoading(), qqmapsdk.geocoder({
          address: o.provinceName + o.cityName + o.countyName + o.detailInfo,
          success: function (e) {
            if (console.log(e), "0" == e.status) {
              var t = e.result.location.lat,
                a = e.result.location.lng;
              app.util.request({
                url: "entry/wxapp/AddAddress",
                cachetime: "0",
                data: {
                  address: o.detailInfo,
                  area: o.provinceName + "," + o.cityName + "," + o.countyName,
                  user_name: o.userName,
                  user_id: n,
                  tel: o.telNumber,
                  lat: t,
                  lng: a
                },
                success: function (e) {
                  if (console.log(e.data), "1" == e.data) {
                    wx.showToast({
                      title: "保存成功",
                      duration: 1e3
                    });
                    var t = getCurrentPages();
                    if (console.log(t), 1 < t.length && "zh_cjdianc/pages/takeout/takeoutform" == t[t.length - 2].route) t[t.length - 2].countpsf();
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      });
                    }, 1e3), s.onShow();
                  }
                }
              });
            }
          },
          fail: function (e) {
            console.log(e);
          },
          complete: function (e) {
            console.log(e);
          }
        }));
      },
      fail: function () {
        wx.getSetting({
          success: function (e) {
            console.log(e), e.authSetting["scope.address"] ? console.log("取消") : wx.showModal({
              title: "提示",
              content: "您拒绝了获取收货地址授权，部分功能无法使用,点击确定重新获取授权。",
              showCancel: !1,
              success: function (e) {
                e.confirm && wx.openSetting({
                  success: function (e) {
                    e.authSetting["scope.address"] && s.getWechatAddress();
                  },
                  fail: function (e) {}
                });
              }
            });
          }
        });
      }
    });
  }
})