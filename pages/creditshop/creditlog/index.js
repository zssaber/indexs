var t = getApp(),
  e = t.requirejs("core");

t.requirejs("jquery");

Page(function(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}({
  data: {
    page: 1,
    list: {},
    total: 0,
    load: !0,
    more: !0,
    jifen: '',
    display: 1,
    disable: true,
    showModal: false,
    notgoods: !0,
    xinashi:1,
    isChecked: true,
  },
  onLoad: function(t) {
    this.get_list();
    this.get_jifen();
  },
  get_jifen: function() {
    var a = this;
    e.get("creditshop/creditlog/jifen", {}, function(res) {
      a.setData({
        re: res.res
      })
    });
  },
  shangpin:function(){
     this.setData({
       xinashi:1,
       isChecked: true
     })
  },
  zengsong:function(){
    this.setData({
      xinashi: 0,
      isChecked: false
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function(res) {
    var that = this,
      jifen = that.data.jifen,
      id = wx.getStorageSync('userinfo_idwx061ff5b068336c2c'),
      time = Date.parse(new Date()),
      timestamp = time / 1000,
      uid = id.value;
    console.log(timestamp);
    return {
      title: '分享赠送积分',
      path: '/pages/creditshop/jifenzs/jifenzs?jifen=' + jifen + '&uid=' + uid + '&time=' + timestamp,
      imageUrl: 'https://hzmy.qiyweb.com/attachment/images/1/2019/11/Ep4h1T3tpPfJ12xTP4TVGrhzkG5GS9.jpg',
    }
    that.setData({
      display: 1
    })
  },
  ok: function() {
    this.setData({
      showModal: false
    })
  },
  eject: function() {
    this.setData({
      showModal: true
    })
  },
  back: function() {
    this.setData({
      showModal: false
    })
  },
  inputTyping: function(e) {
    var that = this,
      dd = e.detail.value,
      jf = that.data.total;
    if (dd == '' || dd == 0 || dd > jf) {
      that.setData({
        disable: true,
        jifen: e.detail.value
      })
    } else {
      that.setData({
        disable: false,
        jifen: e.detail.value
      })
    }

  },
  zsong: function() {
    this.setData({
      display: 0
    })
  },
  quxiao: function() {
    this.setData({
      display: 1
    })
  },
  get_list: function(t) {
    var a = this;
    e.post("creditshop/creditlog/getlist", {
      page: a.data.page
    }, function(e) {
      a.setData({
        total: e.credit
      }), t ? (e.list = a.data.list.concat(e.list), a.setData({
        list: e.list
      })) : a.setData({
        list: e.list
      }), 0 == e.total ? a.setData({
        notgoods: !1
      }) : a.setData({
        notgoods: !0
      }), e.pagesize >= e.next_page ? a.setData({
        more: !1
      }) : a.setData({
        more: !0
      });
    });
  }
}, "onReachBottom", function(t) {
  this.setData({
    page: this.data.page + 1,
    load: !1
  }), this.get_list(!0), this.setData({
    load: !0
  });
}));