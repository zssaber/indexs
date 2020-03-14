var form_id, app = getApp();

Page({
  data: {
    money: 0,
    qzf: !0,
    showModal: !1,
    zffs: 1,
    zfz: !1,
    yhqkdje: 0,
    hbkdje: 0,
    activeradio: '',
    hbactiveradio: '',
    zfwz: "微信支付",
    btntype: "btn_ok1",
    fwyid: 0,
    yh_money: ''
  },
  showcart: function () {
    this.setData({
      share_modal_active: !this.data.share_modal_active
    });
  },
  closecart: function () {
    this.setData({
      share_modal_active: !1
    });
  },
  hbshowcart: function () {
    this.setData({
      hbshare_modal_active: !this.data.hbshare_modal_active
    });
  },
  hbclosecart: function () {
    this.setData({
      hbshare_modal_active: !1
    });
  },
  sjshowcart: function () {
    this.setData({
      sjshare_modal_active: !this.data.sjshare_modal_active
    });
  },
  sjclosecart: function () {
    this.setData({
      sjshare_modal_active: !1
    });
  },
  radioChanges: function (t) {
    this.setData({
      radioChanges: t.detail.value
    }), console.log("radio发生change事件，携带value值为：", t.detail.value);
  },
  xzq: function (t) {
    if (console.log(t.currentTarget.dataset, this.data.money, this.data.CouponSet.yhq_set),
      Number(t.currentTarget.dataset.full) > this.data.money) return wx.showModal({
        title: "提示",
        content: "您的消费金额不满足此优惠券条件"
      }), !1;
    "1" == this.data.CouponSet.yhq_set ? this.setData({
      share_modal_active: !1,
      activeradio: t.currentTarget.dataset.rdid,
      yhqkdje: t.currentTarget.dataset.kdje
    }) : this.setData({
      share_modal_active: !1,
      activeradio: t.currentTarget.dataset.rdid,
      yhqkdje: t.currentTarget.dataset.kdje,
      hbactiveradio: '',
      hbkdje: 0
    }), this.gettotalprice();
  },
  xzhb: function (t) {
    if (console.log(t.currentTarget.dataset, this.data.money, this.data.CouponSet.yhq_set),
      Number(t.currentTarget.dataset.full) > this.data.money) return wx.showModal({
        title: "提示",
        content: "您的消费金额不满足此红包条件"
      }), !1;
    "1" == this.data.CouponSet.yhq_set ? this.setData({
      hbshare_modal_active: !1,
      hbactiveradio: t.currentTarget.dataset.rdid,
      hbkdje: t.currentTarget.dataset.kdje
    }) : (wx.showModal({
      title: "提示",
      content: "优惠券与红包不可同时享用"
    }), this.setData({
      hbshare_modal_active: !1,
      hbactiveradio: t.currentTarget.dataset.rdid,
      hbkdje: t.currentTarget.dataset.kdje,
      activeradio: '',
      yhqkdje: 0
    })), this.gettotalprices();
  },
  gettotalprices: function () {
    var that = this,
      money = that.data.money,
      yhq = that.data.hbkdje,
      yhmoney = money - yhq;
    that.setData({
      yh_money: yhmoney
    })
  },
  gettotalprice: function () {
    var that = this,
      money = that.data.money,
      yhq = that.data.yhqkdje,
      yhmoney = money - yhq;
    that.setData({
      yh_money: yhmoney
    })
  },
  hbradioChange: function (t) {
    this.setData({
      hbradioChange: t.detail.value
    }), console.log("radio发生change事件，携带value值为：", t.detail.value);
  },
  radioChange: function (t) {
    console.log("radio发生change事件，携带value值为：", t.detail.value), "wxzf" == t.detail.value && this.setData({
      zffs: 1,
      zfwz: "微信支付",
      btntype: "btn_ok1"
    }), "yezf" == t.detail.value && this.setData({
      zffs: 2,
      zfwz: "余额支付",
      btntype: "btn_ok2"
    }), "jfzf" == t.detail.value && this.setData({
      zffs: 3,
      zfwz: "积分支付",
      btntype: "btn_ok3"
      }), "czkzf" == t.detail.value && this.setData({
        zffs: 5,
        zfwz: "储值卡支付",
        btntype: "btn_ok5"
      });
  },
  xszz: function () {
    var t = this.data.userinfo;
    console.log(t), "" == t.img || "" == t.name ? wx.navigateTo({
      url: "../smdc/getdl"
    }) : this.setData({
      showModal: !0
    });
  },
  yczz: function () {
    this.setData({
      showModal: !1
    });
  },
  money: function (t) {
    var e;
    console.log(t.detail.value), e = "" != t.detail.value ? t.detail.value : 0, this.setData({
      money: parseFloat(e).toFixed(2)
    });
  },
  formSubmit: function (e) {
    var a = this;
    form_id = e.detail.formId, a.setData({
      form_id: form_id
    });
    var o = this.data.userinfo.openid,
      t = this.data.userinfo.id,
      yh_money = this.data.yh_money,
      s = this.data.money,
      fwyid = this.data.fwyid,
      activeradio = this.data.activeradio,
      yhqkdje = this.data.yhqkdje,
      hbactiveradio = this.data.hbactiveradio,
      hbkdje = this.data.hbkdje,
      i = this.data.storeinfo.store.id;

    if (console.log(o, t, s, i), 0 == s) return wx.showModal({
      title: "提示",
      content: "付款金额不能等于0"
    }), !1;
    if (console.log("form发生了submit事件，携带数据为：", e.detail.value.radiogroup), "yezf" == e.detail.value.radiogroup) {
      var n = Number(this.data.wallet),
        s = Number(this.data.money);

      if (console.log(n, s), n < s) return void wx.showToast({
        title: "余额不足支付",
        icon: "loading"
      });
    }
    if (console.log("form发生了submit事件，携带数据为：", e.detail.value.radiogroup), "czkzf" == e.detail.value.radiogroup) {
      var n = Number(this.data.userMoney.money),
        s = Number(this.data.money);

      if (console.log(n, s), n < s) return void wx.showToast({
        title: "储值卡余额不足",
        icon: "loading"
      });
    }
    var l = 0;
    if ("jfzf" == e.detail.value.radiogroup) {
      var r = Number(this.data.total_score) / Number(this.data.jf_proportion);
      if (l = (s = Number(this.data.money)) * Number(this.data.jf_proportion), console.log(r, s, l),
        r < s) return void wx.showToast({
          title: "积分不足支付",
          icon: "loading"
        });
    }
    if ("yezf" == e.detail.value.radiogroup) var d = 2;
    if ("wxzf" == e.detail.value.radiogroup) d = 1;
    if ("jfzf" == e.detail.value.radiogroup) d = 3;
    if ("czkzf" == e.detail.value.radiogroup) d = 5;
    if (yh_money != '') s = this.data.yh_money;
    console.log("金额", s);
    console.log("pay_type", d), "" == form_id ? wx.showToast({
      title: "没有获取到formid",
      icon: "loading",
      duration: 1e3
    }) : (this.setData({
      zfz: !0
    }), app.util.request({
      url: "entry/wxapp/DmOrder",
      cachetime: "0",
      data: {
        money: s,
        store_id: i,
        user_id: t,
        coupon_id: activeradio,
        yhq_money: yhqkdje,
        coupon_id2: hbactiveradio,
        yhq_money2: hbkdje,
        pay_type: d,
        fwyid: fwyid
      },
      success: function (t) {
        a.setData({
          zfz: !1,
          showModal: !1
        }), "下单失败" != t.data && ("yezf" == e.detail.value.radiogroup ? (console.log("余额支付流程"),
          wx.redirectTo({
            url: "/zh_cjdianc/pages/seller/fukuan?storeid=" + i
          }), wx.showModal({
            title: "提示",
            content: "支付成功"
          })) : "czkzf" == e.detail.value.radiogroup ? (console.log("余额支付流程"),
            wx.redirectTo({
              url: "/zh_cjdianc/pages/seller/fukuan?storeid=" + i
            }), wx.showModal({
              title: "提示",
              content: "支付成功"
            })) : "jfzf" == e.detail.value.radiogroup ? console.log("积分支付流程") : (console.log("微信支付流程"),
            app.util.request({
              url: "entry/wxapp/pay",
              cachetime: "0",
              data: {
                openid: o,
                money: s,
                order_id: t.data
              },
              success: function (t) {
                console.log(t), wx.requestPayment({
                  timeStamp: t.data.timeStamp,
                  nonceStr: t.data.nonceStr,
                  package: t.data.package,
                  signType: t.data.signType,
                  paySign: t.data.paySign,
                  success: function (t) {
                    console.log(t.data), console.log(t), console.log(form_id);
                  },
                  complete: function (t) {
                    console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                      title: "取消支付",
                      icon: "loading",
                      duration: 1e3
                    }), "requestPayment:ok" == t.errMsg && (wx.redirectTo({
                      url: "/zh_cjdianc/pages/seller/fukuan?storeid=" + i
                    }), wx.showModal({
                      title: "提示",
                      content: "支付成功"
                    }));
                  }
                });
              }
            })));
      }
    }));
  },
  onLoad: function (t) {
    app.setNavigationBarColor(this);
    var a = this;
    var id = wx.getStorageSync('users');
    var es = t.scene;
    if (es) {
      var e = t.scene.split("-")[0];
      var fwyid = t.scene.split("-")[1];
      a.setData({
        fwyid: fwyid
      })
    } else {
      var e = t.storeid;
    }
    var o = e;
   
    app.getUserInfo(function (t) {
      a.onShow1(), a.setData({
        userinfo: t
      });
    }), app.util.request({
      url: "entry/wxapp/UserMoney",
      cachetime: "0",
      data: {
        user_id: id.id,
        store_id: t.storeid
      },
      success: function (t) {
        a.setData({
          userMoney: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/StoreInfo",
      cachetime: "0",
      data: {
        store_id: o
      },
      success: function (t) {
        console.log(t);
        var e = t.data;
        a.setData({
          storeinfo: t.data
        }), "1" == getApp().xtxx.is_yuepay && "1" == e.storeset.is_yuepay && a.setData({
          kqyue: !0
        });
      }
    }), app.util.request({
      url: "entry/wxapp/Url",
      cachetime: "0",
      success: function (t) {
        a.setData({
          url: t.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/system",
      cachetime: "0",
      success: function (t) {
        console.log(t), a.setData({
          ptxx: t.data,
          jf_proportion: t.data.jf_proportion
        }), "1" == t.data.is_yue ? a.setData({
          ptkqyue: !0
        }) : a.setData({
          ptkqyue: !1
        }), "1" == t.data.is_jfpay ? a.setData({
          ptkqjf: !0
        }) : a.setData({
          ptkqjf: !1
        });
      }
    }), app.util.request({
      url: "entry/wxapp/MyCoupons",
      cachetime: "0",
      data: {
        store_id: o,
        user_id: id.id
      },
      success: function (t) {
      for (var e = [], aa = [], s = 0; s < t.data.length; s++) "1" != t.data[s].coupon_type && ("1" == t.data[s].type || "3" == t.data[s].type )&& e.push(t.data[s]),
          "2" != t.data[s].coupon_type && "2" == t.data[s].type && aa.push(t.data[s]);
        console.log(e, aa), a.setData({
          Coupons: e,
          hbarr: aa
        });
      }
    }), app.util.request({
      url: "entry/wxapp/CouponSet",
      cachetime: "0",
      success: function (t) {
        console.log(t.data), a.setData({
          CouponSet: t.data
        });
      }
    });
  },
  onReady: function () { },
  onShow1: function () {
    var e = this, t = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/UserInfo",
      cachetime: "0",
      data: {
        user_id: t
      },
      success: function (t) {
        console.log(t), e.setData({
          wallet: t.data.wallet,
          total_score: t.data.total_score
        });
      }
    });
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () {
    this.onLoad(), wx.stopPullDownRefresh();
  },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});