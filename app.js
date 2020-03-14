var _App;
var e = require("utils/core.js");
var t = require("utils/core.js");

function _defineProperty(a, o, e) {
  return o in a ? Object.defineProperty(a, o, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[o] = e, a;
}

App((_defineProperty(_App = {
  onLaunch: function(t) {
    var n = wx.getStorageSync("logs") || [];
    n.unshift(Date.now()), wx.setStorageSync("logs", n);
  },
  checkAuth: function() {
    var t = "/pages/message/auth/index",
      a = getCurrentPages(),
      i = a[a.length - 1],
      n = {
        params: i.options || null,
        url: i.route
      };
    if (n.params.hasOwnProperty("scene")) {
      var o = {},
        s = decodeURIComponent(n.params.scene).split("&").shift().split("=");
      o.id = s[1], n.params = o;
    }
    this.setCache("routeData", n), console.log(n);
    var r = this.getCache("userinfo");
    wx.getSetting({
      success: function(a) {
        a.authSetting["scope.userInfo"] && r ? e.get("member", {}, function(e) {
          e.error && wx.redirectTo({
            url: t
          });
        }) : wx.redirectTo({
          url: t
        });
      }
    });
  },
  requirejs: function(e) {
    return require("utils/" + e + ".js");
  },
  getConfig: function() {
    if (null !== this.globalDatayx.api) return {
      api: this.globalDatayx.api,
      approot: this.globalDatayx.approot,
      appid: this.globalDatayx.appid
    };
    var e = wx.getExtConfigSync();
    return console.log(e), this.globalDatayx.api = e.config.api, this.globalDatayx.approot = e.config.approot,
      this.globalDatayx.appid = e.config.appid, e.config;
  },
  getCache: function(e, t) {
    var a = +new Date() / 1e3,
      i = "";
    a = parseInt(a);
    try {
      (i = wx.getStorageSync(e + this.globalDatayx.appid)).expire > a || 0 == i.expire ? i = i.value : (i = "",
        this.removeCache(e));
    } catch (e) {
      i = void 0 === t ? "" : t;
    }
    return i = i || "";
  },
  setCache: function(e, t, a) {
    var i = +new Date() / 1e3,
      n = !0,
      o = {
        expire: a ? i + parseInt(a) : 0,
        value: t
      };
    try {
      wx.setStorageSync(e + this.globalDatayx.appid, o);
    } catch (e) {
      n = !1;
    }
    return n;
  },
  removeCache: function(e) {
    var t = !0;
    try {
      wx.removeStorageSync(e + this.globalDatayx.appid);
    } catch (e) {
      t = !1;
    }
    return t;
  },
  close: function() {
    this.globalDataClose.flag = !0, wx.reLaunch({
      url: "/pages/index/index"
    });
  },
  getSet: function() {
    var t = this;
    "" == t.getCache("cacheset") && setTimeout(function() {
      var a = t.getCache("cacheset");
      e.get("cacheset", {
        version: a.version
      }, function(e) {
        e.update && t.setCache("cacheset", e.data);
      });
    }, 10);
  },
  url: function(e) {
    e = e || {};
    var t = {},
      i = "",
      n = "",
      o = this.getCache("usermid");
    i = e.mid || "", n = e.merchid || "", "" != o ? ("" != o.mid && void 0 !== o.mid || (t.mid = i),
        "" != o.merchid && void 0 !== o.merchid || (t.merchid = n)) : (t.mid = i, t.merchid = n),
      this.setCache("usermid", {
        "mid": i,
        "merchid": n
      }, 7200);
  },
  impower: function(e, t, i) {
    wx.getSetting({
      success: function(n) {
        console.log(n), n.authSetting["scope." + e] || wx.showModal({
          title: "用户未授权",
          content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
          confirmText: "去设置",
          success: function(e) {
            e.confirm ? wx.openSetting({
              success: function(e) {}
            }) : "route" == i ? wx.switchTab({
              url: "/pages/index/index"
            }) : "details" == i || wx.navigateTo({
              url: "/pages/index/index"
            });
          }
        });
      }
    });
  },
  /* 底部 */

  setPageNavbar: function() {
    console.log("----setPageNavbar----");
    let p = new Promise(function(resolve, reject) {
      wx.request({
        url: "https://huanyucanguan.com/app/ewei_shopv2_api.php?i=7&r=shop.setPageNavbar&timestamp=" + new Date(),
        method: "GET",
        header: {
          "Content-type": "application/json"
        },
        success: function(e) {
          wx.setStorageSync("_navbar", e.data.tabbar)
        }
      })
      let e = wx.getStorageSync("_navbar")
      resolve(e)
    })
    console.log("----setPageNavbar Return----");
    return p;
  },
  navbarPages: ["pages/index/index", "pages/cat/cat", "pages/cart/cart", "pages/user/user", "pages/list/list", "pages/search/search", "pages/topic-list/topic-list", "pages/video/video-list", "pages/miaosha/miaosha", "pages/shop/shop", "pages/pt/index/index", "pages/book/index/index", "pages/share/index", "pages/quick-purchase/index/index", "mch/m/myshop/myshop", "mch/shop-list/shop-list", "pages/integral-mall/index/index", "pages/integral-mall/register/index"],

  globalDataClose: {
    flag: !1
  },
  globalDatayx: {
    appid: "wx7fda3d593c11bdd5",
    api: "https://huanyucanguan.com/app/ewei_shopv2_api.php?i=7",
    approot: "https://huanyucanguan.com/addons/",
    userInfo: null
  },




  getUrl: function(n) {
    var t = this.globalDatas.url;
    n.setData({
      url: t
    });
    var e = this;
    t || e.util.request({
      url: "entry/wxapp/Attachurl",
      success: function(t) {
        e.globalDatas.url = t.data, e.getUrl(n);
      }
    });
  },

  ifArrVal: function(e) {
    function t(t, n) {
      return e.apply(this, arguments);
    }
    return t.toString = function() {
      return e.toString();
    }, t;
  }(function(t, n) {
    for (var e = 0; e < t.length; e++) {
      if (t[e] instanceof Array) return ifArrVal(t[e].url, n);
      if (t[e].url == n) return t[e].active = !0, t;
    }
    return !1;
  }),

  repeat: function(t) {
    var e = {};
    return t.reduce(function(t, n) {
      return !e[n.url] && (e[n.url] = t.push(n)), t;
    }, []);
  },
  bottom_menu: function(t) {
    var n = this;
    console.log(n);
    var e = [{
      img: "../img/z_qiang.png",
      sele_img: "../img/qiang.png",
      name: "任务大厅",
      color: "#999",
      active: !1,
      sele_color: "#89f7fe",
      url: "/zh_cjpt/pages/index/index"
    }, {
      img: "../img/index.png",
      sele_img: "../img/z_index.png",
      name: "我的",
      color: "#999",
      active: !1,
      sele_color: "#89f7fe",
      url: "/zh_cjpt/pages/logs/logs"
    }];
    console.log(this.route);
    var o = t,
      r = n.ifArrVal(e, o);
    return 0 != r && n.repeat(r);
  },

  g_t: function(e) {
    wx.getLocation({
      type: "wgs84",
      success: function(t) {
        console.log(t);
        var n = t.latitude + "," + t.longitude;
        location = n, e(n), console.log(n), wx.setStorageSync("loacation", n);
      },
      fail: function(t) {
        console.log(t), wx.hideLoading(), location = 1, wx.showModal({
          title: "授权提示",
          content: "您取消了位置授权，小程序将无法正常使用，如需再次授权，请在我的-授权管理中进行授权，再次进入小程序即可",
          showCancel: !0,
          cancelText: "取消",
          cancelColor: "#333",
          confirmText: "确定",
          confirmColor: "#333",
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        });
      }
    });
  },


  onShow: function() {

  },
  onHide: function(t) {
    console.log("这是小程序从前台进入后台"), this.globalDatas.sign_out = !0;
  },
  today_time: function(t) {
    var n = new Date(),
      e = n.getMonth() + 1,
      o = n.getDate();
    return 1 <= e && e <= 9 && (e = "0" + e), 0 <= o && o <= 9 && (o = "0" + o), n.getFullYear() + "-" + e + "-" + o;
  },
  today_month: function(t) {
    var n = new Date(),
      e = n.getMonth() + 1,
      o = n.getDate();
    return 1 <= e && e <= 9 && (e = "0" + e), 0 <= o && o <= 9 && (o = "0" + o), n.getFullYear() + "-" + e;
  },
  ormatDate: function(t) {
    var n = new Date(1e3 * t);
    return n.getFullYear() + "-" + e(n.getMonth() + 1, 2) + "-" + e(n.getDate(), 2) + " " + e(n.getHours(), 2) + ":" + e(n.getMinutes(), 2) + ":" + e(n.getSeconds(), 2);

    function e(t, n) {
      for (var e = "" + t, o = e.length, r = "", a = n; a-- > o;) r += "0";
      return r + e;
    }
  },
  location: function(t, n, e, o) {
    var r = t * Math.PI / 180,
      a = n * Math.PI / 180,
      i = r - a,
      c = e * Math.PI / 180 - o * Math.PI / 180,
      u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(r) * Math.cos(a) * Math.pow(Math.sin(c / 2), 2)));
    return u *= 6378.137, u = (u = Math.round(u)).toFixed(2);
  },
  onError: function(a) {
    console.log(a);
  },
  util: require("we7/resource/js/util.js"),
  siteInfo: require("siteinfo.js"),
  getUserInfos: function(n) {
    var e = this;
    wx.login({
      success: function(t) {
        console.log(t), e.util.request({
          url: "entry/wxapp/Openid",
          cachetime: "0",
          data: {
            code: t.code
          },
          success: function(t) {
            console.log(t), n(t.data);
          }
        });
      }
    });
  },
  getSystem: function(n) {
    this.util.request({
      url: "entry/wxapp/GetSystem",
      cachetime: "0",
      success: function(t) {
        console.log(t), n(t.data);
      }
    });
  },
  succ_t: function(t, n) {
    wx.showToast({
      title: t
    }), 0 == n && setTimeout(function() {
      wx.navigateBack({
        delta: 1
      });
    }, 1500);
  },
  succ_m: function(t, n) {
    wx.showModal({
      title: "温馨提示",
      content: t,
      success: function(t) {
        return !!t.confirm;
      }
    });
  },
  isTelCode: function(t) {
    var n = /^1[3|4|5|7|8|9][0-9]\d{4,8}$/;
    return n.test(t);
  },
  globalDatas: {
    userInfo: null,
    mid: 0,
    refresh: !1
  },
  getimgUrl: function(o) {
    var a = this.globalData.imgurl;
    console.log(a, o), o.setData({
      url: a
    });
    var e = this;
    a || e.util.request({
      url: "entry/wxapp/Url",
      success: function(a) {
        console.log(a), e.globalData.imgurl = a.data, e.getimgUrl(o);
      }
    });
  },
  setNavigationBarColor: function(o) {
    var a = this.globalData.color,
      e = this.globalData.imgurl;
    console.log(a, e, o), a && wx.setNavigationBarColor({
      frontColor: "#000000",
      backgroundColor: "#ffffff"
    }), o.setData({
      color: a,
      url: e
    });
    var t = this;
    a || t.util.request({
      url: "entry/wxapp/system",
      success: function(a) {
        console.log(a), getApp().xtxx = a.data, t.globalData.imgurl = a.data.attachurl,
          t.globalData.color = a.data.color || "#34aaff", t.setNavigationBarColor(o);
      }
    });
  },
  setNavigationBarColors: function(o) {
    var a = this.globalData.color,
      e = this.globalData.imgurl;
    console.log(a, e, o), a && o.setData({
      color: a,
      url: e
    });
    var t = this;
    a || t.util.request({
      url: "entry/wxapp/system",
      success: function(a) {
        console.log(a), getApp().xtxx = a.data, t.globalData.imgurl = a.data.attachurl,
          t.globalData.color = a.data.color || "#34aaff", t.setNavigationBarColors(o);
      }
    });
  },
  pageOnLoad: function(n) {
    var t = this;

    function l(a) {
      console.log(a);
      var o = !1,
        e = n.route || n.__route__ || null;
      for (var t in a.navs) a.navs[t].url === "/" + e ? o = a.navs[t].active = !0 : a.navs[t].active = !1;
      o && n.setData({
        _navbar: a
      });
    }
    console.log("----setPageNavbar----"), console.log(n);
    var i = {
        background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
        border_color: "rgba(0,0,0,.1)"
      },
      a = t.globalData.navbar;
    console.log(a), a && l(a), a || t.util.request({
      url: "entry/wxapp/nav",
      success: function(a) {
        var o = getApp().xtxx1;
        if (console.log(a, o), 0 == a.data.length) {
          if ("1" == o.model) var e = [{
            logo: "/zh_cjdianc/img/tabindexfs.png",
            logo2: "/zh_cjdianc/img/tabindexs.png",
            title: "首页",
            title_color: "#FA855B",
            title_color2: "#DDDDDD",
            url: "/zh_cjdianc/pages/index/index"
          }, {
            logo: "/zh_cjdianc/img/youxuan.png",
            logo2: "/zh_cjdianc/img/youxaund.png",
            title: "优选",
            title_color: "#FA855B",
            title_color2: "#DDDDDD",
            url: "/pages/index/index"
          }, {
            logo: "/zh_cjdianc/img/tabddfs.png",
            logo2: "/zh_cjdianc/img/tabdds.png",
            title: "订单",
            title_color: "#FA855B",
            title_color2: "#DDDDDD",
            url: "/zh_cjdianc/pages/wddd/order"
          }, {
            logo: "/zh_cjdianc/img/tabmyfs.png",
            logo2: "/zh_cjdianc/img/tabmys.png",
            title: "我的",
            title_color: "#FA855B",
            title_color2: "#DDDDDD",
            url: "/zh_cjdianc/pages/my/index"
          }];
          if ("2" == o.model) e = [{
            logo: "/zh_cjdianc/img/tabindexf.png",
            logo2: "/zh_cjdianc/img/tabindex.png",
            title: "首页",
            title_color: "#34aaff",
            title_color2: "#888",
            url: "/zh_cjdianc/pages/seller/index"
          }, {
            logo: "/zh_cjdianc/img/tabddf.png",
            logo2: "/zh_cjdianc/img/tabdd.png",
            title: "订单",
            title_color: "#34aaff",
            title_color2: "#888",
            url: "/zh_cjdianc/pages/wddd/order"
          }, {
            logo: "/zh_cjdianc/img/tabmyf.png",
            logo2: "/zh_cjdianc/img/tabmy.png",
            title: "我的",
            title_color: "#34aaff",
            title_color2: "#888",
            url: "/zh_cjdianc/pages/my/index"
          }];
          if ("4" == o.model) e = [{
            logo: "/zh_cjdianc/img/tabindexf.png",
            logo2: "/zh_cjdianc/img/tabindex.png",
            title: "首页",
            title_color: "#34aaff",
            title_color2: "#888",
            url: "/zh_cjdianc/pages/seller/indextakeout"
          }, {
            logo: "/zh_cjdianc/img/tabddf.png",
            logo2: "/zh_cjdianc/img/tabdd.png",
            title: "订单",
            title_color: "#34aaff",
            title_color2: "#888",
            url: "/zh_cjdianc/pages/wddd/order"
          }, {
            logo: "/zh_cjdianc/img/tabmyf.png",
            logo2: "/zh_cjdianc/img/tabmy.png",
            title: "我的",
            title_color: "#34aaff",
            title_color2: "#888",
            url: "/zh_cjdianc/pages/my/index"
          }];
          i.navs = e, l(i), t.globalData.navbar = i;
        } else i.navs = a.data, l(i), t.globalData.navbar = i;
      }
    });
  },
  title: function(a) {
    if ("" == a) return !0;
    wx.showModal({
      title: "",
      content: a
    });
  },
  getUserInfo: function(o) {
    var e = this,
      a = this.globalData.userInfo;
    console.log(a), a ? "function" == typeof o && o(a) : wx.login({
      success: function(a) {
        wx.showLoading({
          title: "正在登录",
          mask: !0
        }), console.log(a.code), e.util.request({
          url: "entry/wxapp/Openid",
          cachetime: "0",
          data: {
            code: a.code
          },
          header: {
            "content-type": "application/json"
          },
          dataType: "json",
          success: function(a) {
            console.log("openid信息", a.data), getApp().getOpenId = a.data.openid, getApp().getSK = a.data.session_key,
              e.util.request({
                url: "entry/wxapp/login",
                cachetime: "0",
                data: {
                  openid: a.data.openid
                },
                header: {
                  "content-type": "application/json"
                },
                dataType: "json",
                success: function(a) {
                  getApp().getuniacid = a.data.uniacid, wx.setStorageSync("users", a.data), e.globalData.userInfo = a.data,
                    "function" == typeof o && o(e.globalData.userInfo);
                }
              });
          },
          fail: function(a) {},
          complete: function(a) {}
        });
      }
    });
  },
  sjdpageOnLoad: function(n) {
    var o = this;

    function e(a) {
      console.log(a);
      var o = !1,
        e = n.route || n.__route__ || null;
      for (var t in a.navs) a.navs[t].url === "/" + e ? o = a.navs[t].active = !0 : a.navs[t].active = !1;
      o && n.setData({
        _navbar: a
      });
    }
    console.log("----setPageNavbar----"), console.log(n);
    var t = {
        background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
        border_color: "rgba(0,0,0,.1)"
      },
      a = o.globalData.sjdnavbar;
    console.log(a), a && e(a), a || o.util.request({
      url: "entry/wxapp/nav",
      success: function(a) {
        console.log(a);
        t.navs = [{
          logo: "/zh_cjdianc/img/tabindexf.png",
          logo2: "/zh_cjdianc/img/tabindex.png",
          title: "外卖订单",
          title_color: "#FF7D5C",
          title_color2: "#888",
          url: "/zh_cjdianc/pages/sjzx/wmdd/wmdd"
        }, {
          logo: "/zh_cjdianc/img/tabdnf.png",
          logo2: "/zh_cjdianc/img/tabdn.png",
          title: "堂食订单",
          title_color: "#FF7D5C",
          title_color2: "#888",
          url: "/zh_cjdianc/pages/sjzx/dndd/dndd"
        }, {
          logo: "/zh_cjdianc/img/tabglf.png",
          logo2: "/zh_cjdianc/img/tabgl.png",
          title: "商品管理",
          title_color: "#FF7D5C",
          title_color2: "#888",
          url: "/zh_cjdianc/pages/sjzx/spgl/cplb"
        }, {
          logo: "/zh_cjdianc/img/tabddf.png",
          logo2: "/zh_cjdianc/img/tabdd.png",
          title: "数据统计",
          title_color: "#FF7D5C",
          title_color2: "#888",
          url: "/zh_cjdianc/pages/sjzx/sjtj/sjtj"
        }, {
          logo: "/zh_cjdianc/img/tabmyf.png",
          logo2: "/zh_cjdianc/img/tabmy.png",
          title: "商家中心",
          title_color: "#FF7D5C",
          title_color2: "#888",
          url: "/zh_cjdianc/pages/sjzx/sjzx/sjzx"
        }], e(t), o.globalData.sjdnavbar = t;
      }
    });
  },
  convertHtmlToText: function(a) {
    var o = "" + a;
    return o = (o = o.replace(/<p.*?>/gi, "\r\n")).replace(/<\/p>/gi, "\r\n", "  *  ");
  }
}, "util", require("we7/resource/js/util.js")), _defineProperty(_App, "tabBar", {
  color: "#123",
  selectedColor: "#1ba9ba",
  borderStyle: "#1ba9ba",
  backgroundColor: "#fff",
  list: [{
    pagePath: "/we7/pages/index/index",
    iconPath: "/we7/resource/icon/home.png",
    selectedIconPath: "/we7/resource/icon/homeselect.png",
    text: "首页"
  }, {
    pagePath: "/we7/pages/user/index/index",
    iconPath: "/we7/resource/icon/user.png",
    selectedIconPath: "/we7/resource/icon/userselect.png",
    text: "我的"
  }]
}), _defineProperty(_App, "globalData", {
  userInfo: null
}), _defineProperty(_App, "siteInfo", require("siteinfo.js")), _App));