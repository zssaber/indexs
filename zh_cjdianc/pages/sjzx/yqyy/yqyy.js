var app = getApp();

Page({
  data: {
    getmsg: "获取验证码",
    link_tel:'',
  },
  tel: function() {
    wx.makePhoneCall({
        phoneNumber: this.data.xtxx.tel
    }); 
},
  onLoad: function(a) {
    app.getUserInfo(this);
    app.setNavigationBarColor(this);
    var that = this;
    app.util.request({
      url: "entry/wxapp/YyTime",
      cachetime: "0",
      data: {id: a.id,},
      success: function (t) {
        that.setData({
          id: a.id,
          state:t.data.state
        })
      }
    }),app.util.request({
      url: "entry/wxapp/system",
      cachetime: "0",
      success: function(t) {
          console.log(t.data), that.setData({
              xtxx: t.data
          });
      }
  });
  },
  
  code: function(a) {
    console.log(a), this.setData({
      phone: a.detail.value
    });
  },
  sendmessg: function(a) {
    var e = this;
    console.log(e.data);
    var t = e.data.phone;
    if ("" == t || null == t) wx.showModal({
      title: "",
      content: "请输入手机号"
    });
    else {
      for (var o = "", s = 0; s < 6; s++) o += Math.floor(10 * Math.random());
      console.log(o), app.util.request({
        url: "entry/wxapp/sms2",
        cachetime: "0",
        data: {
          code: o,
          tel: t
        },
        success: function(a) {
          console.log(a);
        }
      }), e.setData({
        num: o
      });
      var n = 59,
        i = setInterval(function() {
          e.setData({
            getmsg: n + "s后重新发送",
            send: !0
          }), --n <= 0 && (clearInterval(i), e.setData({
            getmsg: "获取验证码",
            send: !1
          }));
        }, 1e3);
    }
  },

  formSubmit: function (a) {
    var t = this.data,
      id = t.id,
      e = a.detail.value,
      i = e.name_tel,
      l = e.code,
      c = t.num;
    var k = wx.getStorageSync("users").id;
    var Yy = wx.getStorageSync("users").juese;
    var T = wx.getStorageSync("users").openid,
      q = "";    
      "" == i ? q = "请输入联系人电话" : c != l && (q = "验证码输入错误")
      1 == app.title(q) && app.util.request({
      url: "entry/wxapp/SaveYyr",
      cachetime: "0",
      data: {
        user_id: k,
        phone: i,
        id: id
      },
        success: function (a) {
          if(a.data==1){
          wx.showToast({
            title: "恭喜你，成为异业推广员",
            icon:'none',
            success: function () {
              setTimeout(function() {
                wx.navigateTo({
                  url: '/zh_cjdianc/pages/index/index',
                })
              }, 1000);
            }
          })
        }else{
          wx.showToast({
            title: "不能重复申请同一家店铺",
            icon:'none',
            success: function () {
              setTimeout(function() {
                wx.navigateTo({
                  url: '/zh_cjdianc/pages/index/index',
                })
              }, 1000);
            }
          })
        }
        }
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