var e = getApp(), t = e.requirejs("wxParse/wxParse"), a = e.requirejs("core");

Page({
    data: {
        aid: 0,
        loading: !1,
        show: !1,
        article: [],
        likenum: 0,
        likenum_v:0,
      approot: e.globalDatayx.approot
    },
    onLoad: function(t) {
        t = t || {};
        var i = decodeURIComponent(t.scene);
        
        if (!t.id && i) {
            var r = a.str2Obj(i);
            t.id = r.id, r.mid && (t.mid = r.mid);
        }
        this.setData({
            aid: t.id,
        }), e.url(t), this.getDetail();
    },
    getDetail: function() {
        var e = this;
        a.get("changce/article/get_detail", {
          aid: e.data.aid
        }, function(i) {
            var article_content = i.article.article_content.replace(/<img/gi, '<img width="389" style="max-width:100% !important;height:auto;display:block" ').replace(/<section/g, '<div').replace(/\/section>/g, '/div>');
            if (!i.article) return a.alert(i.error), !1;
            wx.setNavigationBarTitle({
                title: i.article.article_title
            }), e.setData({
                article: i.article,
                article_content:article_content,
                readnum:parseInt(i.article.article_readnum),
                readnum_v:parseInt(i.article.article_readnum_v),
                likenum: parseInt(i.article.article_likenum),
                likenum_v:parseInt( i.article.article_likenum_v),
                show: !0
            }), t.wxParse("wxParseData", "html", i.article.article_content, e, "15");
        });
    },
    callme: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.target.id
        });
    },
    likeit: function(e) {
                var t = this, i = t.data.likenum, r = t.data.aid;
                wx.showLoading({
                    title: '加载中',
                    mask: true
                  })
                a.get("changce/article/like", {
                    aid: r
                }, function(e) {
                    1 == e.status ? i++ : i--, t.setData({
                        likenum: i
                    });
                    setTimeout(function () {
                        wx.hideLoading()
                      }, 300)
                });
            },
    phone: function(e) {
        a.phone(e);
    },
    tohome: function(e) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        return a.onShareAppMessage("/pages/changce/article/detail?id=" + this.data.aid, this.data.article.article_title);
    }
});