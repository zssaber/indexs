var app = getApp(),
  siteinfo = require("../../../siteinfo.js");

Page({
  data: {
    indicatorDots: !1,
    hbshare_modal_active: !1,
    autoplay: !1,
    totalyh:0,
    cid:0,
    hbkdje:'',
    interval: 5e3,
    duration: 1e3,
    admin_id: 0,
    selectShow: false,
    selectShow1: false,
    hbactiveradio:0,
    getmsg: "获取验证码",
    ac_index: 0,
    admin_id: 0,
    adname: '请选择绑定人',
    type_name: '请选择门店类型',
    type_id: 0,
    succ: !0,
    index: 0,
    indexa: 0,
    type: [],
    id:0
  },
  bindPickerChangesa: function (t) {
    var a = this;
    console.log('picker发送选择改变，索引为', t.detail.value);
    var indexa = t.detail.value;
    var id = a.data.MyTeam[indexa].fx_user;
    a.setData({
      admin_id: id,
      indexa: indexa,
    })
    console.log('id为: ', id);
  },
  bindPickerChanges: function(e) {
    var a = this;
    console.log('picker发送选择改变，索引为', e.detail.value);
    var index = e.detail.value;
    var id = a.data.type[index].id;
    a.setData({
      type_id: id,
      index: index,
    })
    console.log('id为: ', id);
  },
  onLoad: function(asd) {
    app.setNavigationBarColor(this);
    var s = this,
      e = wx.getStorageSync("users").id;
    s.setData({
      state: asd.state,
      is_tgy: asd.tgy
    })
     app.util.request({
      url: "entry/wxapp/CheckRz",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function(a) {
        if (0 == a.data) {
          var e = wx.getStorageSync("imglink");
          s.setData({
            id: "",
            url: e
          }), s.rz_time();
        } else if(!asd.tgy){s.setData({
          name: a.data.name,
          details: app.convertHtmlToText(a.data.details),
          link_name: a.data.link_name,
          link_tel: a.data.link_tel,
          address: a.data.address,
          latitude: a.data.coordinates,
          phone: a.data.link_tel,
          upload_one: a.data.logo,
          upload_two: a.data.zm_img,
          upload_three: a.data.fm_img,
          upload_four: a.data.yyzz,
          bdupload_one: a.data.logo,
          bdupload_two: a.data.zm_img,
          bdupload_three: a.data.fm_img,
          bdupload_four: a.data.yyzz,
          id: a.data.id,
          day: a.data.rz_time,
          url: ""
        })}
        s.rz_time();
      }
    })
      app.util.request({
      url: "entry/wxapp/system",
      cachetime: "0",
      success: function(a) {
        s.setData({
          system: a.data
        });
      }
    }),app.util.request({
      url: "entry/wxapp/UserMadd",
      cachetime: "0",
      data: {
          user_id: e,
          message:5
      },
      success: function(t) {
      }
     }), app.util.request({
      url: "entry/wxapp/CheckSms",
      cachetime: "0",
      success: function(a) {
        s.setData({
          CheckSms: a.data
        });
      }
    }), app.util.request({
      url: "entry/wxapp/ad",
      cachetime: "0",
      success: function(a) {
        console.log(a);
        var e = a.data,
          t = [];
        for (var o in e) "5" == e[o].type && t.push(e[o]);
        s.setData({
          ad: t
        });
      }
    }), app.util.request({
      url: "entry/wxapp/MyTeam",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function(t) {
        console.log(t.data), s.setData({
          MyTeam: t.data.one
        });
      }
    }), app.util.request({
      url: "entry/wxapp/StoreType",
      cachetime: "0",
      success: function(t) {
        console.log(t.data), s.setData({
          type: t.data
        });
      }
    }),app.util.request({
      url: "entry/wxapp/RzCoupon",
      cachetime: "0",
      data: {
          user_id: e
      },
      success: function(t) {
          s.setData({
              hbarr: t.data
          });
      }
  }), app.util.request({
    url: "entry/wxapp/CouponSet",
    cachetime: "0",
    success: function(t) {
        console.log(t.data), s.setData({
            CouponSet: t.data
        });
    }
});
    s.germsg();
  },
  hbshowcart: function() {
    this.setData({
        hbshare_modal_active: !this.data.hbshare_modal_active
    });
  },
  hbclosecart: function() {
      this.setData({
          hbshare_modal_active: !1
      });
  },
  xzhbs:function(){
    this.setData({
      hbshare_modal_active: !1
    })
  },
  xzhb: function(t) {
    if (Number(t.currentTarget.dataset.full) > this.data.money) return wx.showModal({
        title: "提示",
        content: "您的消费金额不满足此红包条件"
    }), !1;
    "1" == this.data.CouponSet.yhq_set ? this.setData({
        hbshare_modal_active: !1,
        hbactiveradio: t.currentTarget.dataset.rdid,
        hbkdje: t.currentTarget.dataset.kdje
    }) : (this.setData({
        hbshare_modal_active: !1,
        hbactiveradio: t.currentTarget.dataset.rdid,
        hbkdje: t.currentTarget.dataset.kdje,
        activeradio: "",
        yhqkdje: 0
    })), this.gettotalprice();
        
},
gettotalprice: function() {
 var that = this,
      money = that.data.money,
      hb = that.data.hbkdje;
  var a = money-hb;
 that.setData({
  totalyh: hb,
  money:a
  });
},
  germsg:function(){
    var that = this,m = wx.getStorageSync("users").id;
    app.util.request({
        url: "entry/wxapp/UserM",
        cachetime: "0",
        data: {
            user_id: m,
            message:5
        },
        success: function(t) {
         if(t.data.state==0){
            wx.getSetting({
                success: (res) => {
                    wx.showModal({
                        title: '订阅消息',
                       content: '是否同意接受订阅消息？',
                       showCancel: true,
                       cancelText:"否",
                       confirmText:"是",
                        success: function (res) {
                           if (res.cancel) {

                           } else {
                            wx.requestSubscribeMessage({
                                tmplIds: ["JzQdZTgIrTX37L632lVLEFJ2MpUS5KvMfDc2iYbETrg"],
                                success: (res) => {
                                    if(res.errMsg == 'requestSubscribeMessage:ok'){
                                     if(res['JzQdZTgIrTX37L632lVLEFJ2MpUS5KvMfDc2iYbETrg']=='accept'){
                                        app.util.request({
                                            url: "entry/wxapp/UserM",
                                            cachetime: "0",
                                            data: {
                                                user_id: m,
                                                state:1,
                                                message:5
                                            },
                                        })
                                     }   
                                    }
                                },
                                fail(err) {
                                  console.error(err);
                                }
                              })
                           }
                        },
                     })
                } 
            })
         }
        }
    })
},
  rz_time: function(a) {
    var o = this.data,
      s = this;
    app.util.request({
      url: "entry/wxapp/GetRzqx",
      cachetime: "0",
      success: function(a) {
        console.log(a);
        var e = a.data;
        if (0 < e.length) {
          if (s.setData({
              array: !0,
              arr: e,
              money:e[0].money
            }), null != o.day)
            for (var t in e) e[t].days == o.day && s.setData({
              ac_index: t
            });
        } else s.setData({
          array: !1
        });
      }
    });
  },
  selse_succ: function(a) {
    1 == this.data.succ ? this.setData({
      succ: !1
    }) : this.setData({
      succ: !0
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
  bindPickerChange: function(a) {
    console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
      index: a.detail.value
    });
  },
  choose: function(a) {
    var t = this,
      o = a.currentTarget.dataset.type;
    wx.getStorageSync("imglink");
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function(a) {
        console.log(a);
        var e = a.tempFilePaths[0];
        wx.uploadFile({
          url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_cjdianc",
          filePath: e,
          name: "upfile",
          formData: {},
          success: function(a) {
            console.log("这是上传成功"), console.log(a), 1 == o ? t.setData({
              bdupload_one: e,
              upload_one: a.data
            }) : 2 == o ? t.setData({
              bdupload_two: e,
              upload_two: a.data
            }) : 3 == o ? t.setData({
              bdupload_three: e,
              upload_three: a.data
            }) : 4 == o && t.setData({
              bdupload_four: e,
              upload_four: a.data
            });
          },
          fail: function(a) {
            console.log("这是上传失败"), console.log(a);
          }
        });
      }
    });
  },
  sele_arr: function(a) {
    this.data.arr;
    var e = a.currentTarget.dataset.index,
      money = a.currentTarget.dataset.money;
    3 == this.data.state || 4 == this.data.state ? wx.showModal({
      title: "",
      content: "入驻期限不可以修改"
    }) : this.setData({
      ac_index: e,
      totalyh:0,
      hbkdje:'',
      hbactiveradio:0,
      money:money
    });
  },
  choose_address: function(a) {
    var t = this;
    wx.chooseLocation({
      success: function(a) {
        console.log(a);
        var e = a.latitude + "," + a.longitude;
        console.log(e), t.setData({
          address: a.address,
          latitude: e
        });
      }
    });
  },
  xieyi: function(a) {
    wx.navigateTo({
      url: "xieyi"
    });
  },
  formSubmit: function(a) {
    var t = this.data,
      e = a.detail.value,
      o = e.name_title,
      s = e.name_prompt,
      n = e.name_wor,
      i = e.name_tel,
      l = e.code,
      c = t.num,
      d = t.arr,
      u = t.succ,
      r = t.ac_index,
      p = t.array,
      tg = t.admin_id,
      cid = t.hbactiveradio,
      typeid = t.type_id,
      m = (t.system,
        t.id);
    if ("" == m) {
      if (console.log("这是新建"), 1 == p) var g = d[r].days,
        f = t.money;
    } else {
      console.log("这是修改");
      g = t.day;
    }
    var _ = t.address,
      h = t.upload_one,
      y = t.upload_two,
      w = t.upload_three,
      x = t.upload_four,
      v = t.latitude,
      D = t.form_id,
      z = t.CheckSms,
      S = a.detail.formId;
    console.log(D), console.log(S);
    var k = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/AddFormId",
      cachetime: "0",
      data: {
        user_id: k,
        form_id: a.detail.formId
      },
      success: function(a) {
        console.log(a.data);
      }
    });
    var tgyid = t.is_tgy;
    var T = wx.getStorageSync("users").openid,
      q = "";
    if (tgyid) {
      "" == o ? q = "请输入商户名称" : 0 == typeid ? q = "请选择门店类型" : null == _ ? q = "请选择商户地址" : "" == s ? q = "请输入商户简介" : "" == n ? q = "请输入联系人姓名" : "" == i ? q = "请输入联系人电话" : 0 == tg ? q = "请选择绑定人" : null == h ? q = "请上传商户logo" : null == y ? q = "请上传身份证正面照片" : null == w ? q = "请上传身份证反面照片" : null == x ? q = "请上传营业执照" : c != l && 1 == z ? q = "验证码输入错误" : 0 == u ? q = "请先阅读并同意入驻申请协议" : 0 == p && (q = "请选择入驻期限")
    } else {
      "" == o ? q = "请输入商户名称" : 0 == typeid ? q = "请选择门店类型" : null == _ ? q = "请选择商户地址" : "" == s ? q = "请输入商户简介" : "" == n ? q = "请输入联系人姓名" : "" == i ? q = "请输入联系人电话" : null == h ? q = "请上传商户logo" : null == y ? q = "请上传身份证正面照片" : null == w ? q = "请上传身份证反面照片" : null == x ? q = "请上传营业执照" : c != l && 1 == z ? q = "验证码输入错误" : 0 == u ? q = "请先阅读并同意入驻申请协议" : 0 == p && (q = "请选择入驻期限")
    }
    1 == app.title(q) && app.util.request({
      url: "entry/wxapp/SaveRzsq",
      cachetime: "0",
      data: {
        id: m,
        name: o,
        user_id: k,
        admin_id: tg,
        md_type: typeid,
        address: _,
        details: s,
        rz_time: g,
        yyzz: x,
        fm_img: w,
        zm_img: y,
        logo: h,
        link_name: n,
        link_tel: i,
        coordinates: v,
        cid:cid,
        money: f
      },
      success: function(a) {

        var e = a.data;
        "" == m ? 0 < Number(f) ? app.util.request({
          url: "entry/wxapp/RzPay",
          cachetime: "0",
          data: {
            openid: T,
            money: f,
            rz_id: e
          },
          success: function(a) {
            wx.requestPayment({
              timeStamp: a.data.timeStamp,
              nonceStr: a.data.nonceStr,
              package: a.data.package,
              signType: a.data.signType,
              paySign: a.data.paySign,
              success: function(a) {
                console.log("支付成功"), console.log(a), wx.showToast({
                  title: "申请已提交"
                }), app.util.request({
                  url: "entry/wxapp/RzMessage",
                  cachetime: "0",
                  data: {
                    openid: T,
                    sh_id: e
                  },
                  success: function(a) {
                    console.log("发送模板消息"), console.log(a);
                  }
                }), setTimeout(function() {
                  wx.navigateBack({
                    delta: 2
                  });
                }, 1500);
              },
              fail: function(a) {
                console.log("支付失败"), wx.showToast({
                  title: "支付失败"
                }), setTimeout(function() {
                  wx.navigateBack({
                    delta: 2
                  });
                }, 1500);
              }
            });
          }
        }) : (app.util.request({
          url: "entry/wxapp/RzMessage",
          cachetime: "0",
          data: {
            form_id: D,
            openid: T,
            sh_id: e
          },
          success: function(a) {
            console.log("发送模板消息"), console.log(a);
          }
        }), wx.showToast({
          title: "申请已提交"
        }), setTimeout(function() {
          wx.navigateBack({
            delta: 2
          });
        }, 1500)) : (wx.showToast({
          title: "申请已提交"
        }), setTimeout(function() {
          wx.navigateBack({
            delta: 2
          });
        }, 1500), app.util.request({
          url: "entry/wxapp/RzMessage",
          cachetime: "0",
          data: {
            form_id: D,
            openid: T,
            sh_id: t.id
          },
          success: function(a) {
            console.log("发送模板消息"), console.log(a);
          }
        }));
      }
    });
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name;
    this.setData({
      admin_id: Index,
      adname: name,
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      selectShow1: !this.data.selectShow1
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Index = e.currentTarget.dataset.index
    let name = e.currentTarget.dataset.name;
    this.setData({
      type_id: Index,
      type_name: name,
      selectShow1: !this.data.selectShow1
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