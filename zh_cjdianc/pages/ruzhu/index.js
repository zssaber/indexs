var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        app.setNavigationBarColor(this);
        var a = this;
        var user = wx.getStorageSync("users");
        app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    system: t.data
                });
            }
        }), app.util.request({
          url: "entry/wxapp/StoreNum",
          cachetime: "0",
          data: { user_id: user.id},
          success: function (t) {
            a.setData({
              storenum: t.data.count,
              is_tgy:user.tgy,
              usernum: user.store_num
            });
          }
        }), a.setData({
            state: t.state
        });
    },
    submits:function(){
      var e = this;
      wx.navigateTo({
        url: "info?tgy=1&form_id=the formId is a mock one&state=" + e.data.state
      });
    },
    formSubmit: function(a) {
        var t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/AddFormId",
            cachetime: "0",
            data: {
                user_id: t,
                form_id: a.detail.formId
            },
            success: function(t) {
                console.log(t.data);
            }
        });
        var e = this;
        app.util.request({
            url: "entry/wxapp/CheckRz",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                 0 != t.data ? 1 == t.data.state ? wx.showModal({
                    title: "",
                    content: "系统正在审核中"
                }) : 2 == t.data.state ? wx.showModal({
                    title: "",
                    content: "您已经入驻过了"
                }) : 3 == t.data.state ? wx.showModal({
                    title: "",
                    content: "您的入驻申请已被拒绝，点击确定进行编辑",
                    success: function(t) {
                        t.confirm && wx.navigateTo({
                            url: "info?form_id=" + a.detail.formId + "&state=3"
                        });
                    }
                }) : wx.showModal({
                    title: "",
                    content: "您的入驻已经到期,请联系平台管理员续费"
                }) : wx.navigateTo({
                    url: "info?form_id=" + a.detail.formId + "&state=" + e.data.state
                });
            }
        });
    },
    getUserInfo: function(t) {
        console.log(t), app.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    }
});