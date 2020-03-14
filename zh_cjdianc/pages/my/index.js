var a = getApp(), f = a.requirejs("core"), ts = require("./../../../utils/core.js"), util = require("../../utils/util.js");

Page({
  data: {
    carte: [{
      img1: "../../img/personal/kefu.png",
      name: "客服与投诉",
      img2: "",
      margin: "margin_top",
      border: "border_bottom",
      bindtap: "customer"
    }, {
      img1: "../../img/personal/bangzhu.png",
      name: "帮助中心",
      img2: "",
      border: "border_bottom",
      bindtap: "help"
    }],
    top: "-420",
    color: "#459cf9",
    js: 0,
    fwxy: !0,
    fwxys: !0
  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  qishou: function () {
    wx: wx.navigateTo({
      url: '/zh_cjpt/pages/mine/zhuce'
    })
  },
  tuanduidingdan: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/my/wodetuandui'
    })
  },
  wdyy: function () {
    wx.navigateTo({
      url: "../reserve/order"
    });
  },
  wodexiaji: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/distribution/downline'
    })
  },
  youxuanshangjai: function () {
    wx: wx.navigateTo({
      url: '/pages/changce/merch/apply'
    })
  },
  wodedingdan: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/wddd/order'
    })
  },
  yaoqinghaoyou: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/my/yqinhy'
    })
  },
  shouru: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/distribution/index'
    })
  },
  lingquan: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/quan/lingquan'
    })
  },
  yiye: function () {
    wx: wx.navigateTo({
      url: '/zh_cjdianc/pages/quan/yiye'
    })
  },
  wdsc: function () {
    wx.navigateTo({
      url: "../extra/wdsc"
    });
  },
  wddd: function () {
    wx.navigateTo({
      url: "../wddd/order"
    });
  },
  wddz: function () {
    wx.navigateTo({
      url: "../wddz/xzdz"
    });
  },
  wdyy: function () {
    wx.navigateTo({
      url: "../reserve/order"
    });
  },
  wdqg: function () {
    wx.navigateTo({
      url: "../xsqg/order"
    });
  },
  wdpt: function () {
    wx.navigateTo({
      url: "../collage/order"
    });
  },
  wdyhq: function () {
    wx.navigateTo({
      url: "myyhq"
    });
  },
  help: function () {
    wx.navigateTo({
      url: "bzzx"
    });
  },
  qishou: function () {
    wx.navigateTo({
      url: "/zh_cjpt/pages/mine/zhuce"
    });
  },
  xinshou: function () {
    wx: wx.navigateTo({
      url: '/pages/custom/index?pageid=38'
    })
  },
  ditui: function () {
    wx: wx.navigateTo({
      url: '/pages/changce/article/list?cateid=14&index=2'
    })
  },
  shequn: function () {
    wx: wx.navigateTo({
      url: '/pages/changce/article/list?cateid=13&index=1'
    })
  },
  shangxueyuan: function () {
    wx: wx.navigateTo({
      url: '/pages/changce/article/list?cateid=12&index=0'
    })
  },
  seller: function () {
    var t = wx.getStorageSync("users").id;
    a.util.request({
      url: "entry/wxapp/CheckRz",
      cachetime: "0",
      data: {
        user_id: t
      },
      success: function (t) {
        console.log(t.data), 0 != t.data ? 1 == t.data.state ? wx.showModal({
          title: "",
          content: "系统正在审核中"
        }) : 2 == t.data.state ? (wx.setStorageSync("sjdsjid", t.data.id), wx.navigateTo({
          url: "../sjzx/wmdd/wmdd"
        })) : 3 == t.data.state ? wx.showModal({
          title: "",
          content: "您的入驻申请已被拒绝，点击确定进行编辑",
          success: function (t) {
            t.confirm && wx.navigateTo({
              url: "../ruzhu/index?state=3"
            });
          }
        }) : wx.showModal({
          title: "",
          content: "您的入驻已经到期,请联系平台管理员续费"
        }) : wx.navigateTo({
          url: "../sjzx/login"
        });
      }
    });
  },
  fx: function () {
    wx.navigateTo({
      url: "../distribution/index"
    });
  },
  jfsc: function () {
    wx.navigateTo({
      url: "../integral/integral"
    });
  },
  czzx: function () {
    wx.navigateTo({
      url: "../wallet/walletadd"
    });
  },
  tzhy: function () {
    wx.navigateTo({
      url: "../hyk/hyk"
    });
  },
  bindGetUserInfo: function (n) {
    var aa = a.getCache("routeData"),that=this, o = aa.url, s = aa.params, i = "";
    Object.keys(s).forEach(function (e) {
      i += e + "=" + s[e] + "&";
    });
    var c = "/" + o + "?" + (s = i.substring(0, i.length - 1));
    console.log(c), wx.login({
      success: function (ad) {
        ts.post("wxapp/login", {
          code: ad.code
        }, function (ad) {
          ad.error ? ts.alert("获取用户登录态失败:" + ad.message) : ts.get("wxapp/auth", {
            data: n.detail.encryptedData,
            iv: n.detail.iv,
            sessionKey: ad.session_key
          }, function (t) {
            1 == t.isblack && wx.showModal({
              title: "无法访问",
              content: "您在商城的黑名单中，无权访问！",
              success: function (t) {
                t.confirm && a.close(), t.cancel && a.close();
              }
            }), n.detail.userInfo.openid = t.openId, n.detail.userInfo.id = t.id, n.detail.userInfo.uniacid = t.uniacid,
              a.setCache("userinfo", n.detail.userInfo), a.setCache("userinfo_openid", n.detail.userInfo.openid),
              a.setCache("userinfo_id", t.id), a.getSet(), wx.reLaunch({
                url: c
              });
          });
        });
      },
      fail: function () {
        ts.alert("获取用户信息失败!");
      }
    });
  },
  // bindGetUserInfo: function(t) {
  //   console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
  //     hydl: !1
  //   }), this.changeData());
  // },
  changeData: function () {
    var n = this;
    wx.getSetting({
      success: function (t) {
        console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
          success: function (t) {
            console.log(t), a.util.request({
              url: "entry/wxapp/login",
              cachetime: "0",
              data: {
                openid: getApp().getOpenId,
                img: t.userInfo.avatarUrl,
                name: t.userInfo.nickName
              },
              header: {
                "content-type": "application/json"
              },
              dataType: "json",
              success: function (t) {
                console.log("用户信息", t);
              }
            });
            var e = t.userInfo;
            console.log(e), n.setData({
              avatarUrl: e.avatarUrl,
              nickName: e.nickName
            });
          }
        }) : (console.log("未授权过"), n.setData({
          hydl: !0
        }));
      }
    });
  },
  jumps: function (t) {
    var e = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.name,
      n = t.currentTarget.dataset.appid,
      o = t.currentTarget.dataset.src,
      s = t.currentTarget.dataset.wb_src,
      i = t.currentTarget.dataset.type;
    console.log(e, a, n, o, s, i), 1 == i ? (console.log(o), wx.navigateTo({
      url: o
    })) : 2 == i ? (wx.setStorageSync("vr", s), wx.navigateTo({
      url: "../car/car"
    })) : 3 == i && wx.navigateToMiniProgram({
      appId: n
    });
  },
  onLoad: function (t) {
    //, a.checkAuth()
    a.getUserInfo(this);
    this.changeData();
    var as = getCurrentPages(),
      i = as[as.length - 1],
      n = {
        params: i.options || null,
        url: i.route
      };
    if (n.params.hasOwnProperty("scene")) {
      var o = {},
        s = decodeURIComponent(n.params.scene).split("&").shift().split("=");
      o.id = s[1], n.params = o;
    }
    a.setCache("routeData", n), console.log(n);
    var r = a.getCache("userinfo");
    wx.getSetting({
      success: function (a) {
        a.authSetting["scope.userInfo"] && r ? ts.get("member", {}, function (e) {
          e.error && wx.redirectTo({
            url: t
          });
        }) : wx.redirectTo({
          url: t
        });
      }
    });
    var o = this,
      e = wx.getStorageSync("users").id,
      js = wx.getStorageSync("users").juese;
    a.util.request({
      url: "entry/wxapp/MyCoupons",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (t) {
        console.log(t.data), o.setData({
          yhnum: t.data.length,
          js: js
        });
      }
    }), a.util.request({
      url: "entry/wxapp/system",
      cachetime: "0",
      success: function (t) {
        console.log(t), o.setData({
          system: t.data
        });
      }
    }), a.util.request({
      url: "entry/wxapp/MyCode",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (t) {
        console.log(t.data), o.setData({
          codes: t.data
        });
      }
    }), a.util.request({
      url: "entry/wxapp/MyyCode",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (t) {
        console.log(t.data), o.setData({
          code: t.data
        });
      }
    }), a.util.request({
      url: "entry/wxapp/CheckRetail",
      cachetime: "0",
      success: function (t) {
        console.log(t), o.setData({
          fxset: t.data
        });
      }
    }), a.util.request({
      url: "entry/wxapp/Signset",
      cachetime: "0",
      success: function (t) {
        console.log("签到设置", t), o.setData({
          qdset: t.data
        });
      }
    }), a.util.request({
      url: "entry/wxapp/ad",
      cachetime: "0",
      success: function (t) {
        console.log(t);
        for (var e = [], a = 0; a < t.data.length; a++) "7" == t.data[a].type && e.push(t.data[a]);
        console.log(e), o.setData({
          lblist: e
        });
      }
    }), a.util.request({
      url: "entry/wxapp/Llz",
      cachetime: "0",
      data: {
        type: "3,4"
      },
      success: function (t) {
        console.log(t);
        for (var e = [], a = [], n = 0; n < t.data.length; n++) 3 == t.data[n].type && e.push(t.data[n]),
          4 == t.data[n].type && a.push(t.data[n]);
        o.setData({
          dbllz: e,
          zbllz: a
        });
      }
    }), wx.getSystemInfo({
      success: function (t) {
        console.log(t.model), console.log(t.pixelRatio), console.log(t.windowWidth), console.log(t.windowHeight),
          console.log(t.language), console.log(t.version), console.log(t.platform), "android" != t.platform && o.setData({
            top: "-330"
          });
      }
    });
  },
  getPhoneNumber: function(t) {
    var e = this,id = wx.getStorageSync("users").id;
    "getPhoneNumber:fail user deny" == t.detail.errMsg && wx.showModal({
        title: "提示",
        showCancel: !1,
        content: "您未授权获取您的手机号",
        success: function(t) {}
    }), "getPhoneNumber:ok" == t.detail.errMsg && a.util.request({
        url: "entry/wxapp/Jiemi",
        cachetime: "0",
        data: {
            sessionKey: getApp().getSK,
            data: t.detail.encryptedData,
            iv: t.detail.iv
        },
        success: function(t) {
          a.util.request({
            url: "entry/wxapp/SaveTel",
            cachetime: "0",
            data: {
              user_id: id,
              tel:t.data.phoneNumber
            },
            success: function (t) {
              if(t.data==1){
                e.onShow();
              }
               
            }
          })
        }
    });
},

  feedback: function (t) {
    wx.navigateTo({
      url: "feedback"
    });
  },
  wallet: function (t) {
    wx.navigateTo({
      url: "../wallet/wallet"
    });
  },
  set_up: function (t) {
    wx.navigateTo({
      url: "set_up"
    });
  },
  receive: function (t) {
    wx.navigateTo({
      url: "receive"
    });
  },
  integral: function (t) {
    wx.navigateTo({
      url: "../integral/myintegral"
    });
  },
  sign_in: function (t) {
    wx.navigateTo({
      url: "rankings"
    });
  },
  sjrz: function (t) {
    var e = wx.getStorageSync("users").id;
    a.util.request({
      url: "entry/wxapp/CheckRz",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function (t) {
        wx.navigateTo({
          url: "../ruzhu/index"
        });
      }
    });
  },
  mdmfx: function () {
    this.setData({
      fwxy: !1
    });
  },
  yczz: function () {
    this.setData({
      fwxy: !0,
      hydl: false,
    });
  },
  yczzss: function () {
    this.setData({
      hysj: 2
    });
  },
  previewimg: function () {
    wx.previewImage({
      urls: [this.data.code]
    });
  },
  mdmfxs: function () {
    this.setData({
      fwxys: !1
    });
  },
  yczzs: function () {
    this.setData({
      fwxys: !0
    });
  },
  previewimgs: function () {
    wx.previewImage({
      urls: [this.data.code]
    });
  },
  onReady: function () { },
  onShow: function () {
    var e = this,
      t = wx.getStorageSync("users").id,
      s = wx.getStorageSync("users").name,
      n = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
    console.log(n.toString()), a.util.request({
      url: "entry/wxapp/UserInfo",
      cachetime: "0",
      data: {
        user_id: t
      },
      success: function (t) {
        if(t.data.tel==''){
          var is = 1;
        }else{
          var is = 2;
        }
        "" != t.data.dq_time && t.data.dq_time >= n.toString() && (t.data.ishy = 1),
          e.setData({
            userInfo: t.data,
            name:s,
            hysj:is
          });
      }
    }),f.get("shop/get_waimai", {}, function (a) {
      e.setData({
        waimai: a.res,
        vip: a.vip
      });
    })
  },
  onShareAppMessage: function() {
    var e = this.data.userInfo.id;
    console.log(e);
    return {
      title: '您的好友'+this.data.name+"，邀请您加入小程序",
      path: "/zh_cjdianc/pages/Liar/loginindex?userid="+e,
      imageUrl: 'https://huanyucanguan.com/attachment/images/9/2020/01/zw0MMpCzwYyHX1qzqtpSSh0xttzzT0.png',
    };
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { }
});