var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("jquery"),
  tt = t.requirejs("wxParse/wxParse");

Page({
  data: {
    cates: [],
    cateid: '',
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
    keyword: "",
    article_sys: [],
    url: 'https://huanyucanguan.com/attachment/',
    approot: t.globalData.approot
  },
  previewImg:function(e){
    var imgUrl = e.currentTarget.dataset.src; 
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgUrl,
      urls: imgArr, 
      urls: [imgUrl], 
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  save: function (e) {
    var o = this,
      img = e.currentTarget.dataset.index,
      text = e.currentTarget.dataset.text,
      imgSrc = o.data.url + img;
    console.log(img);
    console.log(imgSrc);
    o.setData({
        text: text,
      }),
      wx.downloadFile({
        url: imgSrc,
        success: function (res) {
          console.log(res);
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
              o.copyTextwenzz();
            },
            fail: function (err) {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("当初用户拒绝，再次发起授权")
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    } else {
                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                    }
                  }
                })
              }
            },
            complete(res) {
              console.log(res);
            }
          })
        }
      })
  },
  copyTextwenzz: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: this.data.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '保存成功'
            })
          }
        })
      }
    })
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '口令复制成功'
            })
          }
        })
      }
    })
  },
  onLoad: function (t) {
    var a = this;
    var users = wx.getStorageSync('users');
    console.log(t);
    t.cateid && a.setData({
      cateid: t.cateid,
      index: t.index,
      users: users
    }), a.getList();
  },
  jumps: function (t) {
    var a = t.currentTarget.dataset.link;
    wx.navigateTo({
      url: a
    })
  },
  getList: function () {
    var t = this;
    var index = t.data.index;
    a.loading(), this.setData({
      loading: !0
    }), a.get("changce/article/get_list", {
      page: this.data.page,
      cateid: this.data.cateid,
      //  keyword: this.data.keyword
    }, function (e) {
      var i = {
        loading: !1,
        total: e.total,
        pagesize: e.pagesize,
        cates: e.cates,
        article_sys: e.article_sys,
        banner: e.banner,
      };
      e.cates[index].category_name && wx.setNavigationBarTitle({
          title: e.cates[index].category_name
        }), e.list.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list),
          e.list.length < e.pagesize && (i.loaded = !0), t.setSpeed(e.list)), t.setData(i),
        tt.wxParse("wxParseData", "html", e.list[0].article_content, t, "15"),
        a.hideLoading();
    });
  },
  changeMode: function () {
    "block" == this.data.listmode ? this.setData({
      listmode: ""
    }) : this.setData({
      listmode: "block"
    });
  },
  bindSearch: function (t) {
    t.target, this.setData({
      list: [],
      loading: !0,
      loaded: !1
    });
    var a = e.trim(t.detail.value),
      i = this.data.defaults;
    "" != a ? (i.keywords = a, this.setData({
      page: 1,
      params: i,
      fromsearch: !1
    }), this.getList(), this.setRecord(a)) : (i.keywords = "", this.setData({
      page: 1,
      params: i,
      listorder: "",
      fromsearch: !1
    }), this.getList());
  },
  bindInput: function (t) {
    var a = e.trim(t.detail.value);
    this.setData({
      page: 1,
      list: [],
      loading: !0,
      loaded: !1,
      keyword: a,
      fromsearch: !0
    }), this.getList();
  },
  bindFocus: function (t) {
    "" == e.trim(t.detail.value) && this.setData({
      fromsearch: !0
    });
  },
  bindback: function () {
    this.setData({
      fromsearch: !1,
      keyword: ""
    }), this.getList();
  },
  showFilter: function () {
    this.setData({
      isFilterShow: !this.data.isFilterShow,
      isNearShow: !1
    });
  },
  selCate: function (t) {
    var a = t.target.dataset.id;
    this.setData({
      list: [],
      page: 1,
      loading: !0,
      loaded: !1,
      cateid: a
    }), this.getList();
  },
  showNear: function () {
    this.setData({
      isFilterShow: !1,
      isNearShow: !this.data.isNearShow
    });
  },
  bindDisEvents: function (t) {
    var a = t.target.dataset.id;
    this.setData({
      list: [],
      page: 1,
      loading: !0,
      loaded: !1,
      range: a,
      selrangename: t.target.dataset.title,
      isFilterShow: !1,
      isNearShow: !1
    }), this.getList();
  },
  setSpeed: function (t) {
    if (t && !(t.length < 1))
      for (var a in t) {
        var e = t[a];
        if (!isNaN(e.lastratio)) {
          var i = e.lastratio / 100 * 2.5,
            s = wx.createContext();
          s.beginPath(), s.arc(34, 35, 30, .5 * Math.PI, 2.5 * Math.PI), s.setFillStyle("rgba(0,0,0,0)"),
            s.setStrokeStyle("rgba(0,0,0,0.2)"), s.setLineWidth(4), s.stroke(), s.beginPath(),
            s.arc(34, 35, 30, .5 * Math.PI, i * Math.PI), s.setFillStyle("rgba(0,0,0,0)"), s.setStrokeStyle("#ffffff"),
            s.setLineWidth(4), s.setLineCap("round"), s.stroke();
          var o = "coupon-" + e.id;
          wx.drawCanvas({
            canvasId: o,
            actions: s.getActions()
          });
        }
      }
  },
  bindTab: function (t) {
    var e = a.pdata(t).cateid;
    this.setData({
      cateid: e,
      page: 1,
      list: []
    }), this.getList();
  },
  onReachBottom: function () {
    this.data.loaded || this.data.list.length == this.data.total || this.getList();
  },
  jump: function (t) {
    var e = a.pdata(t).id;
    e > 0 && wx.navigateTo({
      url: "/pages/sale/coupon/detail/index?id=" + e
    });
  }
});