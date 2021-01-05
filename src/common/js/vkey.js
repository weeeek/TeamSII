try {
    !function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define(t) : t()
    }(0, function () {
        "use strict";
        function e(e) {
            var t = this.constructor;
            return this.then(function (n) {
                return t.resolve(e()).then(
                    function () {
                        return n
                    })
            },
                function (n) {
                    return t.resolve(e()).then(
                        function () {
                            return t.reject(n)
                        })
                })
        }
        var t = setTimeout;
        function n(e) {
            return Boolean(e && void 0 !== e.length
            )
        }
        function i() { }
        function o(e) {
            if (!(this instanceof o))
                throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof e)
                throw new TypeError("not a function");
            this._state = 0,
                this._handled = !1,
                this._value = void 0,
                this._deferreds = [],
                d(e, this)
        }
        function a(e, t) {
            for (; 3 === e._state;)
                e = e._value;
            0 !== e._state ? (e._handled = !0, o._immediateFn(function () {
                var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                if (null !== n) {
                    var i;
                    try { i = n(e._value) } catch (e) {
                        return void s(t.promise, e)
                    }
                    r(t.promise, i)
                }
                else (1 === e._state ? r : s)(t.promise, e._value)
            })) : e._deferreds.push(t)
        } function r(e, t) {
            try {
                if (t === e)
                    throw new TypeError("A promise cannot be resolved with itself.");
                if (t && ("object" == typeof t || "function" == typeof t)) { var n = t.then; if (t instanceof o) return e._state = 3, e._value = t, void c(e); if ("function" == typeof n) return void d((i = n, a = t, function () { i.apply(a, arguments) }), e) } e._state = 1, e._value = t, c(e)
            } catch (t) { s(e, t) } var i, a
        } function s(e, t) { e._state = 2, e._value = t, c(e) } function c(e) { 2 === e._state && 0 === e._deferreds.length && o._immediateFn(function () { e._handled || o._unhandledRejectionFn(e._value) }); for (var t = 0, n = e._deferreds.length; t < n; t++)a(e, e._deferreds[t]); e._deferreds = null } function d(e, t) { var n = !1; try { e(function (e) { n || (n = !0, r(t, e)) }, function (e) { n || (n = !0, s(t, e)) }) } catch (e) { if (n) return; n = !0, s(t, e) } } o.prototype.catch = function (e) { return this.then(null, e) }, o.prototype.then = function (e, t) { var n = new this.constructor(i); return a(this, new function (e, t, n) { this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n }(e, t, n)), n }, o.prototype.finally = e, o.all = function (e) { return new o(function (t, i) { if (!n(e)) return i(new TypeError("Promise.all accepts an array")); var o = Array.prototype.slice.call(e); if (0 === o.length) return t([]); var a = o.length; function r(e, n) { try { if (n && ("object" == typeof n || "function" == typeof n)) { var s = n.then; if ("function" == typeof s) return void s.call(n, function (t) { r(e, t) }, i) } o[e] = n, 0 == --a && t(o) } catch (e) { i(e) } } for (var s = 0; s < o.length; s++)r(s, o[s]) }) }, o.resolve = function (e) { return e && "object" == typeof e && e.constructor === o ? e : new o(function (t) { t(e) }) }, o.reject = function (e) { return new o(function (t, n) { n(e) }) }, o.race = function (e) { return new o(function (t, i) { if (!n(e)) return i(new TypeError("Promise.race accepts an array")); for (var a = 0, r = e.length; a < r; a++)o.resolve(e[a]).then(t, i) }) }, o._immediateFn = "function" == typeof setImmediate && function (e) { setImmediate(e) } || function (e) { t(e, 0) }, o._unhandledRejectionFn = function (e) { "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e) }; var l = function () { if ("undefined" != typeof self) return self; if ("undefined" != typeof window) return window; if ("undefined" != typeof global) return global; throw new Error("unable to locate global object") }(); "function" != typeof l.Promise ? l.Promise = o : l.Promise.prototype.finally || (l.Promise.prototype.finally = e)
    }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", { value: function (e, t) { "use strict"; if (null === e || void 0 === e) throw new TypeError("Cannot convert undefined or null to object"); for (var n = Object(e), i = 1; i < arguments.length; i++) { var o = arguments[i]; if (null !== o && void 0 !== o) for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (n[a] = o[a]) } return n }, writable: !0, configurable: !0 })
} catch (e) {
    !function () {
        var t = new Image;
        t.src = location.protocol + "//stat.y.qq.com/monitor/report_err?msg=" + e + "&file=" + encodeURIComponent("https://imgcache.gtimg.cn/music/h5/lib/js/music-1.0.min.js"),
            t.onload = function () { t = null }
    }()
}
try {
    var M = window.M || { version: "1.0.0" };
    M.unityAjax = function (e) {
        var t = e.params || {}, n = e.success || function () { }, i = e.error || function () { };
        M.ajax({ url: location.protocol + "//u.y.qq.com/cgi-bin/musicu.fcg", dataType: "json", type: "post", postType: !0, data: t, success: function (t) { e.allCb && "function" == typeof e.allCb ? e.allCb(t) : t && 0 == t.code && n && "function" == typeof n && n(t) }, error: function () { i && "function" == typeof i && i() } })
    }, M.unityServerCheck = function (e, t, n) {
        0 == e ? t && "function" == typeof t && t() : 1e3 == e ? n && "function" == typeof n ? n() : M.user.login(function (e) {
            e && location.reload()
        }) : -500001 == e || -500002 == e || -500003 == e ? M.alert("瑙ｇ紪鐮佸嚭閿�") : -500004 == e ? M.alert("鏈嶅姟鏃犲搷搴�") : -500005 == e ? M.alert("鏈嶅姟閰嶇疆鏈壘鍒�") : e <= -500011 && e >= -500019 ? -500015 == e ? M.alert("鏈嶅姟鍝嶅簲瓒呮椂") : -500019 == e ? M.alert("鏈嶅姟杩炴帴寮傚父") : M.alert("缃戠粶閿欒") : -500020 == e && M.alert("璇锋眰鏍煎紡涓嶆纭�")
    },
        function (e) {
            Array.prototype.forEach.call("Object,Function,String,Number,Boolean,Date,Undefined,Null,Array,File".split(","),
                function (t, n) {
                    e["is" + t] || (e["is" + t] = function (e) {
                        return Object.prototype.toString.call(e) === "[object " + t + "]"
                    })
                }), e.isTrueEmpty = function (t) {
                    return void 0 === t || null === t || "" === t || e.isNumber(t) && isNaN(t)
                },
                e.isEmpty = function (t) {
                    if (e.isTrueEmpty(t)) return !0;
                    if (e.isObject(t)) {
                        for (var n in t) return !n && !0;
                        return !0
                    }
                    return e.isArray(t) ? 0 === t.length : e.isString(t) ? 0 === t.length : e.isNumber(t) ? 0 === t : !!e.isBoolean(t) && !t
                }, e.fixUrl = function (t) {
                    var n = location.protocol; if (t && e.isString(t)) { if (/^http(s?):\/\/pic.y.qq.com/i.test(t)) return t; /^http(s?):\/\//i.test(t) && (t = t.replace(/^http(s?):/i, n)), /^\/\//.test(t) && (t = n + t), /\.(jpg|png|gif|css|js)$/i.test(t) && (t += "?max_age=2592000"), /\.(jpg|png|gif|css|js)\?/i.test(t) && !t.match(/^http(s?):\/\/y\.gtimg\.cn\//i) && t.match(/^http(s?):\/\/[^\/]+\/(music|mediastyle)\//i) && (t = t.replace(new RegExp("^(" + n + ")\\/\\/[^\\/]+\\/(music|mediastyle)\\/", "i"), function () { return RegExp.$1 + "//y.gtimg.cn/" + RegExp.$2 + "/" })) } return t
                }
        }(M),
        function (e) {
            function t(e) {
                for (var t = "", n = 0; n < e.length; n++)/\W/.test(e[n]) && e.charCodeAt(n) < 256 ? t += "&#" + e.charCodeAt(n) + ";" : t += e[n]; return t
            }
            function n(e) {
                return (t = e, null == t ? "" : t + "").replace(/&amp;/g, "&#38;").replace(/&lt;/g, "&#60;").replace(/&gt;/g, "&#62;").replace(/&quot;/g, "&#34;").replace(/&apos;/g, "&#39;").replace(/&nbsp;/g, "&#160;").replace(/&#(\d+);?/g,
                    function (e, t) {
                        return i(t)
                    }).replace(/&#x([0-9a-f]+);?/gi,
                        function (e, t) {
                            return i(parseInt(t, 16))
                        }); var t
            }
            function i(e) {
                return e > 65535 ? String.fromCodePoint ? String.fromCodePoint(e) : null == (t = "&#" + e + ";") || "" == t ? "" : (o || (o = document.createElement("div")), o.innerHTML = t, o.textContent || o.innerText) : String.fromCharCode(e); var t
            } var o; e.encodeHTML = t, e.decodeHTML = n, "undefined" != typeof _ && _.escape || (window._ = { escape: function (e) { return t(n(e)) } }), String.prototype.encodeHTML = function () { return t(this) }, String.prototype.decodeHTML = function () { return n(this) }
        }(M), M.compare = function (e, t) {
            for (e = ("" + e).split("."),
                t = ("" + t).split(".");
                e.length + t.length;) {
                var n = e.shift() || "0", i = t.shift() || "0"; if (n >= 0 && i >= 0 && (n = ~~n, i = ~~i), n > i) return 1; if (n < i) return -1
            } return 0
        }, function (e) {
            $.browser.platform = "other";
            var t = navigator.userAgent, n = t.match(/\bQQMUSIC\/(\d[\.\d]*)/i) || t.match(/QQMUSIC\/(\d[\.\d]*)/i);
            n && ($.browser.platform = "music",
                $.browser.music = !0,
                n[1] && (parseInt(n[1]) < 1e3 ? ($.browser.ver = $.browser.version = parseFloat(n[1]),
                    $.browser.appVer = n[1]) : $.browser.appVer = $.browser.ver = $.browser.version = parseFloat(n[1].replace("0", "."))));
            var i = t.match(/MicroMessenger\/(\d[\.\d]*)/i);
            i && ($.browser.platform = "weixin", $.browser.weixin = !0, i[1] && ($.browser.ver = $.browser.version = parseFloat(i[1]), $.browser.appVer = i[1])); var o = /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/, a = /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/; if (o.test(t) || a.test(t)) { $.browser.platform = "mqq", $.browser.mqq = !0; var r; $.os.ios ? (r = t.match(o), $.browser.appVer = r && r.length && r[3] || "0") : (r = t.match(a), $.browser.appVer = r && r.length && (e.compare(r[1], r[3]) >= 0 ? r[1] : r[3]) || "0") } /Qzone\//.test(t) && ($.browser.platform = "qzone", $.browser.qzone = !0, $.browser.mqq = !1, $.browser.appVer = $.browser.ver = $.browser.version = function (e) { var t = e.split("Qzone/")[1], n = 0; return (/V1_AND_QZ_/gi.test(e) || /V1_IPH_QZ/gi.test(e)) && (n = (t = t.split("_"))[3] + "." + t[4]), n }(t), $.browser.qua = function (e) { var t = e.match(/Qzone\/([^\s]+)/); return t && t[1] ? t[1] : e.split("Qzone/")[1].split(/\s+/)[0] }(t)); var s = t.match(/\bqmkege\/(\d[\.\d]*)/i); s && ($.browser.platform = "qmkege", $.browser.qmkege = !0, s[1] && ($.browser.appVer = s[1])), /\bReleased\[0\]/i.test(t) && ($.browser.iosReviewing = !0), /WeSecure|MQQSecure/.test(t) && ($.browser.platform = "tcs", $.browser.tcs = !0), $.browser.weixin || $.browser.mqq || !/\/[\w. ]+MQQBrowser\//i.test(t) || ($.browser.platform = "qqbrowser", $.browser.qqbrowser = !0), /\bUCBrowser\/(\d[\.\d]*)/i.test(t) && ($.browser.platform = "uc", $.browser.uc = !0), /Weibo\ \(*/i.test(t) && ($.browser.platform = "weibo", $.browser.weibo = !0)
        }(M), function (e) {
            try {
                var t = function (e) {
                    "use strict"; var t = document, n = setTimeout, i = window, o = window.performance,
                        a = (o && o.timing, navigator.userAgent), r = JSON.stringify,
                        s = "complete" === t.readyState, c = s ? null : []; i.addEventListener("load", function () {
                            s = !0, c.forEach(function (e) {
                                return e()
                            })
                        });
                    var d = /\bQQMusic\//i.test(a);
                    function l(e) {
                        return e && e.toLocaleLowerCase()
                    }
                    var u, p, m = location;
                    (p = a.match(/QQMUSIC\/(\d[\.\d]*)/i)) ? u = "music" : (p = a.match(/MicroMessenger\/(\d[\.\d]*)/i)) ? u = "weixin" : (p = a.match(/(?:iPad|iPhone|iPod).*? (?:IPad)?QQ\/([\d\.]+)/) || a.match(/\bV1_AND_SQI?_(?:[\d\.]+)(?:.*? QQ\/([\d\.]+))?/)) ? u = "mqq" : (p = a.match(/\bqmkege\/(\d[\.\d]*)/i)) ? u = "qmkege" : /Qzone\//.test(a) ? u = "qzone" : /\/[\w. ]+MQQBrowser\//i.test(a) ? u = "qqbrowser" : /Weibo\ \(*/i.test(a) && (u = "weibo"); var f, g, h = u || "other", _ = p ? p[1] : ""; (g = a.match(/(?:Android);?[\s\/]+([\d.]+)?/)) ? f = "android" : (g = a.match(/(?:iPad).*OS\s([\d_]+)/) || a.match(/(?:iPod)(?:.*OS\s([\d_]+))?/) || a.match(/(?:iPhone\sOS)\s([\d_]+)/)) && (f = "ios"); var w = f || "", y = g ? g[1] : ""; function b(e) { var n = t.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)")); return n ? n[2] : "" } var v, q, x, k, $ = "ios" === w, S = t.cookie.match(/\blogin_type=(\d+)/), I = (v = a.match(/\bNetType\/(\w+)/i)) ? v[1] : "unknown", D = { _appid: "qqmusic", _uid: (x = b("uin") || b("p_uin") || 0, 2 == b("login_type") && (x = b("wxuin") || b("uin") || 0), x && (x = x.replace(/^o/, ""), !/^\d+$/.test(x) || x < 1e4 ? x = 0 : x.length < 14 && (x = parseInt(x, 10))), x), _platform: $ ? 1 : 11, _account_source: S ? S[1] : "0", _os_version: y || "", _app_version: _, _channelid: (q = m.href.split("#")[0].match(new RegExp("(\\?|&)channelId=(.*?)(#|&|$)", "i")), decodeURIComponent(q ? q[2] : "")), _os: w, _app: h, _opertime: (Date.now() / 1e3 | 0).toString(), _network_type: l(I) }, T = []; return e.reportSend = function (e, t) { var i; Array.isArray(t) ? t.forEach(function (t) { T.push(Object.assign({ _key: e, _opertime: (Date.now() / 1e3 | 0).toString() }, t)) }) : T.push(Object.assign({ _key: e, _opertime: (Date.now() / 1e3 | 0).toString() }, t)), i = function () { k && clearTimeout(k), k = n(function () { new Promise(function (e) { if (d && window.M) { var t = function (e) { return new Promise(function (t) { var n, i; n = e, i = function (n) { "getDeviceInfo" === e ? (D._mobile_factory = n.modelVersion, D._mobile_type = n.modelVersion, D._os_version = n.systemVersion) : "getGuid" === e ? (D._deviceid = n.imei, D._mnc = n.isp) : D._network_type = l(n.type), t() }, window.M.client.invoke("device", n, {}, function (e) { i(e && 0 == e.code && e.data || {}) }) }) }; Promise.all([t("getDeviceInfo"), t("getGuid"), t("getNetworkType")]).then(function () { e(D) }) } else e(D) }).then(function (e) { !function (e, t) { t = r(t); var n = new XMLHttpRequest; n.open("POST", "//stat.y.qq.com/sdk/fcgi-bin/sdk.fcg"), n.send(t) }(0, { common: e, items: T }), T.length = 0 }) }, 500) }, s ? i() : c.push(i) }, e.setCommon = function (e) { D = Object.assign(D, e) }, e
                }({})
            } catch (e) { t = { reportSend: function () { } } } function n(t, n) {
                try { var i = document.createElement("INPUT"); i.style.opacity = 0, i.style.position = "absolute", i.style.left = "-100000px", document.body.appendChild(i), i.value = t, i.select(), i.focus(); var o = document.execCommand("copy"); if (document.body.removeChild(i), o) return void (n && n()) } catch (e) { } $.browser.mqq && e.ready(function () { window.mqq && window.mqq.data && window.mqq.data.setClipboard && window.mqq.data.setClipboard({ text: t }, function (e) { e && n && n() }) })
            } function i(e, n, i) { var o = window.download_report_pvid || $.cookie.get("pgv_pvid"); o || (o = (new Date).getUTCMilliseconds(), o = "" + Math.round(2147483647 * Math.random()) * o % 1e10, window.download_report_pvid = o); try { t.reportSend("clpbd_nvgt", { action: 1, dltag: e, start: n + "", end: i + "", pgv_pvid: o }) } catch (e) { } } e.copyToClipboard = n, e.reportClipboard = i, e.writeSchemeToClipboard = function (t, o) { if (e.getParam("noclip")) return !1; var a = Math.floor(Date.now() / 1e3), r = a + 86400, s = (t.dltag || "").split("_"), c = e.getParam("dltag0") || "nq"; c += "_", c += s[0] || window.NQ_PAGE_TYPE || "other", c += "_", c += s[1] || window.NQ_CLICK_TYPE || "other", c += "_", c += $.browser.platform, c += "_", c += $.os.ios ? "1" : "11"; var d = { scheme: t._download_next_scheme, dltag: c, start: a, end: r }; n("qqmusic://qq.com/other/parseClipboard?p=" + encodeURIComponent(JSON.stringify(d)), function () { o ? o(c, a, r) : i(c, a, r) }) }
        }(M), M.getNetType = function () {
            var e = navigator.userAgent.match(/\bNetType\/(\w+)/i);
            return (e = e && e[1]) || "unknown"
        },
        M.param2obj = function (e) {
            var t = (e + "").trim().match(/([^?#]*)(#.*)?$/);
            if (!t) return {};
            var n = {};
            return t[1].split("&").forEach(function (e) {
                var t = "";
                if (t = e.split("=", 1)[0]) {
                    var i = decodeURIComponent(t),
                        o = e.substring(i.length + 1);
                    void 0 != o && (o = decodeURIComponent(o)),
                        i in n ? (n[i].constructor != Array && (n[i] = [n[i]]), n[i].push(o)) : n[i] = o
                }
            }), n
        }, function (e) {
            e.getParam = function (e, t) {
                var n = (t || location.href).split("#")[0],
                    i = new RegExp("(\\?|&)" + e + "=(.*?)(#|&|$)", "i"),
                    o = n.match(i);
                return decodeURIComponent(o ? o[2] : "")
            }, e.delParam = function (e, t) {
                var n = new RegExp("(\\?|#|&)(" + e + "=.*?)(#|&|$)"), i = (t = t || location.href).match(n);
                if (i && i.length >= 3 && i[2]) { var o = i[0], a = i[2]; return "&" == o.charAt(0) && (a = "&" + a), t.replace(a, "") } return t
            }, e.addParam = function (e, t) { if (t = t || location.href, "object" != typeof e && !e) return t; var n = e; if ("object" == typeof e) { n = []; for (var i in e) n.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i])); n = n.join("&") } return /\?/.test(t) || /#/.test(t) ? /\?/.test(t) && !/#/.test(t) ? t + "&" + n : !/\?/.test(t) && /#/.test(t) ? t.replace("#", "?" + n + "#") : t.replace("?", "?" + n + "&") : t + "?" + n }
        }(M), function (e) {
            var t = !1, n = [], i = !1, o = function () {
                n.forEach(function (e) { e(i) }), n.length = 0
            }; e.weixinReady = function (a) {
                if ($.browser.weixin && (n.push(a), !t)) {
                    if (e.compare($.browser.appVer, "6") >= 0) {
                        if ("object" == typeof wx) return void a(i); t = !0;
                        var r = 0, s = null, c = null, d = function () { wx.config({ beta: !0, debug: !1, appId: "wx076851c9874e3112", timestamp: s.timestamp, nonceStr: s.nonceStr, signature: s.signature, jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareWeibo", "getInstallState", "launchApplication", "addDownloadTask", "installDownloadTask"] }), wx.ready(function () { t = !1, c || (i = !0), o() }), wx.error(function (e) { t = !1, c = e, console.error("weixinjssdk config error", e) }) }; u = function () { 2 === (r += 1) && (s ? d() : (t = !1, i = !1, o())) }, e.loadUrl("//res.wx.qq.com/open/js/jweixin-1.4.0.js?max_age=2592000", u), l = function (e) { s = e, 2 === (r += 1) && (s ? d() : (t = !1, i = !1, o())) }, e.ajax({ url: "//c.y.qq.com/base/fcgi-bin/fcg_weixin_get_jsticket.fcg", data: { format: "json", signurl: window.location.href.split("#")[0] }, dataType: "json", success: function (e) { 0 == e.code ? l(e.data) : l() }, error: function () { l() } })
                    } else "object" == typeof WeixinJSBridge ? (i = !0, o()) : document.addEventListener("WeixinJSBridgeReady", function () { i = !0, o() }); var l, u
                }
            }
        }(M), function (e) {
            e.musicReady = function (e) {
                $.browser.music && ("undefined" == typeof WebViewJavascriptBridge ? document.addEventListener("WebViewJavascriptBridgeReady", function () { e() }) : e())
            }, e.musicReady(function () {
                e.bridge = WebViewJavascriptBridge, e.bridge.init(), e.bridge.onApp || (e.bridge.onApp = e.bridge.onAPP)
            }), e.bridgeCall = function (t, n, i) { e.musicReady(function () { var o = ("" + t).match(/(\w+)\.(\w+)/); o ? e.client.open(o[1], o[2], n, i) : e.bridge.callHandler(t, n, i) }) }, $.browser.music && $.os.ios && e.compare($.browser.appVer, "7.3") >= 0 && $(document).ready(function () { var e = document.createElement("iframe"); e.style.display = "none", e.src = "qqmusic://qq.com/core/initJsBridge", document.body.appendChild(e), setTimeout(function () { try { document.body.removeChild(e), e = null } catch (e) { } }, 1e3) }), $.browser.music && e.compare($.browser.appVer, "10.0") >= 0 && $(document).ready(function () { try { $("<style>.page_client10::after {content: '';height: 38px;display: block;}</style>").appendTo("head"), $("body").addClass("page_client10") } catch (e) { } })
        }(M), M.qzoneReady = function (e) {
            "object" == typeof QZAppExternal ? e() : M.loadUrl("//qzonestyle.gtimg.cn/qzone/hybrid/lib/jsbridge.js?max_age=2529000", function () { e() })
        }, function (e) {
            function t(e, t, n, i) {
                var o = /\.css(?:\?|#|$)/i.test(e), a = document.createElement(o ? "link" : "script"); n && (a.charset = n), a.onload = a.onerror = a.onreadystatechange = function (e) { /^(?:loaded|complete|undefined)$/.test(a.readyState) && (a.onload = a.onerror = a.onreadystatechange = null, o || document.body.removeChild(a), a = null, t && t(e)) }, o ? (a.rel = "stylesheet", a.href = e) : (a.async = !0, a.src = e, i && (a.crossorigin = "true")), document.body.appendChild(a)
            } "undefined" != typeof module ? module.exports = t : e && (e.loadUrl = t)
        }(M), M.mqqReady = M.loadSQAPI = function (e) {
            "object" == typeof mqq && $.browser.mqq ? e() : M.loadUrl("//pub.idqqimg.com/qqmobile/qqapi.wk.js?_bid=152", function () { e() })
        }, function (e, t, n) {
            n.tcsReady = function (i) {
                $.browser.tcs && n.isFunction(i) && (e.TcsJSBridge && n.isFunction(TcsJSBridge.invoke) ? i() : t.addEventListener("TcsJSBridgeReady", i, !1))
            }
        }(window, document, M), function (e) {
            var t = {}, n = { openTag: "<%", closeTag: "%>" }; function i(e) {
                for (var t = "", n = 0, i = (e = (e || "") + "").length;
                    n < i; n++)t += "\\" + e[n]; return t
            } M.tmpl = function (e, o, a) {
                return function (e, o) {
                    $.extend(n, o); var a = "", r = i(n.openTag), s = i(n.closeTag), c = new RegExp(r, "g"), d = new RegExp(s, "g"),
                        l = new RegExp(r + "=(.*?)" + s, "g"), u = new RegExp(r + "-(.*?)" + s, "g");
                    return a = c.test(e) ? e : (document.getElementById(e) || {}).innerHTML || "", t[e] || (t[e] = new Function("data", "var str='" + a.replace(/[\r\n\t]/g, " ").replace(/('|\\)/g, "\\$1").replace(l, "'+($1)+'").replace(u, "'+M.encodeHTML(M.decodeHTML($1+''))+'").replace(c, "';").replace(d, "str+='") + "';return str;"))
                }(e, a)(o || {})
            }
        }(), function () {
            function e(e) {
                var t = parseInt(e / 60, 10), n = e % 60; return (t < 10 ? "0" + t : t) + ":" + (n < 10 ? "0" + n : n)
            } function t(t) { if ("string" == typeof t) try { t = JSON.parse(t) } catch (e) { } if ("object" == typeof t) { if (t.formatted) return t; 0 == t.type || void 0 !== t.switch && 0 != t.switch || (t.switch = 403); var n = t.switch.toString(2).split(""); n.pop(), n.reverse(); var i = ["play_lq", "play_hq", "play_sq", "down_lq", "down_hq", "down_sq", "soso", "fav", "share", "bgm", "ring", "sing", "radio", "try", "give"]; t.action = { switch: t.switch }; for (var o = 0; o < i.length; o++)t.action[i[o]] = parseInt(n[o], 10) || 0; t.pay = t.pay || {}, t.preview = t.preview || {}, t.playTime = e(t.interval), t.action.play = 0, (t.action.play_lq || t.action.play_hq || t.action.play_sq) && (t.action.play = 1), t.tryPlay = 0, t.action.try && t.preview.trysize > 0 && (t.tryPlay = 1), t.anyPlay = 0, (t.action.play || t.tryPlay) && (t.anyPlay = 1), t.tryIcon = 0, t.disabled = 0, t.action.play || t.pay.payplay || (t.tryPlay ? t.tryIcon = 1 : t.disabled = 1); var a = []; if (t.singer) for (var r = 0; r < t.singer.length; r++)a.push(t.singer[r].name); t.singername = a.join(" / "), t.formatted = 1 } return t } "undefined" != typeof module ? module.exports = t : M && (M.formatMusic = t, M.makePlayTime = e)
        }(), function (e) {
            var t = {
                _css: function () {
                    var e = '.qui_dialog__mask{position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;background:rgba(0,0,0,.6)}.qui_dialog__box{position:relative;display:-webkit-box;-webkit-box-orient:vertical;width:296px;max-height:68%;font:300 12px/1.5 sans-serif;color:#000;border-radius:5px;background:#fff}.qui_dialog__media{overflow:hidden;border-radius:5px 5px 0 0}.qui_dialog--only_pic .qui_dialog__media{border-radius:5px}.qui_dialog__img{display:block;width:100%}.qui_dialog__hd{margin-bottom:-19px;padding-top:25px}.qui_dialog__tit{margin:0 30px;text-align:center;font-weight:400;font-size:20px}.qui_dialog__bd{-webkit-box-flex:1;overflow:auto;margin:26px 0 18px;-webkit-overflow-scrolling:touch}.qui_dialog__para{margin:0 30px 8px;text-align:justify;word-wrap:break-word;word-break:break-all;font-size:16px}.qui_dialog__para--center{text-align:center}.qui_dialog__ft{position:relative;display:-webkit-box}.qui_dialog__btn{position:relative;display:block;-webkit-box-flex:1;width:0;height:45px;line-height:45px;text-align:center;text-decoration:none;font-size:16px;color:#000;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none}.qui_dialog__btn::after{content:"";position:absolute;top:0;left:0;right:0;z-index:1;height:1px;background:#E2E3E7}.qui_dialog__btn:last-child::before{content:"";position:absolute;top:1px;left:0;bottom:0;z-index:1;width:1px;background:#E2E3E7}.qui_dialog__ft--three{-webkit-box-orient:vertical}.qui_dialog__ft--three .qui_dialog__btn{width:100%;-webkit-box-flex:0}.qui_dialog__ft--three .qui_dialog__btn:last-child::before{display:none}.qui_dialog__btn--primary{color:#31c27c}.qui_dialog__btn_pill{display:block;height:40px;margin:0 30px 30px;line-height:40px;text-align:center;text-decoration:none;font-size:18px;color:#fff;border-radius:40px;background:#31c27c;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none}.qui_dialog__close{position:absolute;left:50%;bottom:-84px;-webkit-transform:translateX(-50%);-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-select:none}.qui_dialog__close_txt{position:relative;display:block;width:37px;height:37px;margin:5px;line-height:999px;overflow:hidden;border:solid 1px #fff;border-radius:33px}.qui_dialog__close_txt::after,.qui_dialog__close_txt::before{content:"";position:absolute;background:#fff;-webkit-transform:rotate(45deg)}.qui_dialog__close_txt::before{width:1px;height:19px;top:9px;left:18px}.qui_dialog__close_txt::after{width:19px;height:1px;top:18px;left:9px}.noscroll,.noscroll body{height:100%;overflow:hidden}@media only screen and (max-width:320px){.qui_dialog__box{width:256px}.qui_dialog__hd{margin-bottom:-15px;padding-top:20px}.qui_dialog__tit{margin:0 24px;font-size:18px}.qui_dialog__bd{margin:20px 0 12px}.qui_dialog__para{margin:0 24px 4px;font-size:14px}.qui_dialog__btn{height:40px;line-height:40px;font-size:14px}.qui_dialog__btn_pill{height:36px;margin:0 24px 24px;line-height:36px;font-size:16px}}@media only screen and (-webkit-min-device-pixel-ratio:2){.qui_dialog__btn::after{-webkit-transform:scaleY(.5)}.qui_dialog__btn:last-child::before{-webkit-transform:scaleX(.5)}}'; e += "a.qui_dialog__btn{text-decoration:none}.qui_dialog :focus{outline:none}", $("<style>").html(e).appendTo(document.head), delete t._css
                }, close: function () { $("#js_mod_dialog").remove() }, show: function (n) { t._css && t._css(); var i = function (t) { return null == t ? "" : e.encodeHTML("" + t) }, o = function (e, t, n, i) { return "<" + e + ' class="' + t + '" ' + n + ("a" == e ? ' href="javascript:;"' : "") + ">" + i + "</" + e + ">" }; null == n ? n = { title: "QQ闊充箰" } : e.isObject(n) || (n = { message: "" + n }); var a = [], r = "", s = e.isArray(n.btn) ? n.btn : [n.btn]; (s = s.map(function (t, n) { if (t) if (t.img) a.push({ img: t.img, index: n }); else { var c = (t.color ? ' style="color:' + i(t.color) + '"' : "") + ' data-index="' + n + '"', d = i(e.isObject(t) ? t.text : t); if (1 != t.type) { var l = n > 0 && n === s.length - 1 ? " qui_dialog__btn--primary" : ""; return o("a", "qui_dialog__btn js_qui_dialog_btn" + l, c, d) } r += o("a", "qui_dialog__btn_pill js_qui_dialog_btn", c, d) } return "" }).join("")) && (s = o("div", "qui_dialog__ft", "", s)); var c = n.forceHideClose || (a.length || r || s) && !n.close ? "" : o("a", "qui_dialog__close js_qui_dialog_btn", 'data-index="-1"', '<span class="qui_dialog__close_txt">鍏抽棴</span>'); n.img && a.unshift({ img: n.img }); var d = "this.parentElement.style.minHeight='auto'"; a = a.map(function (e, t) { return e && e.img && (e = '<div class="qui_dialog__media' + (null != e.index ? ' js_qui_dialog_btn" data-index="' + e.index : "") + '"><img class="qui_dialog__img" src="' + i(e.img) + '" onload="' + d + '" onerror="' + d + '"></div>'), e }).join(""); var l = n.title ? '<div class="qui_dialog__hd"><h4 class="qui_dialog__tit">' + i(n.title) + "</h4></div>" : "", u = "", p = "qui_dialog__para" + (n.center ? " qui_dialog__para--center" : ""); n.bodyContent ? u = n.bodyContent : n.html ? u = o("div", p, "", n.html) : n.message && (e.isArray(n.message) ? n.message : ("" + n.message).split("\n")).forEach(function (e) { u += o("p", p, "", i(e)) }), (l || u) && (u = o("div", "qui_dialog__bd", "", u)); var m = $('<section id="js_mod_dialog" class="qui_dialog' + (a && !(l || u || r || s) ? " qui_dialog--only_pic" : "") + '"><div class="qui_dialog__mask"><div class="qui_dialog__box">' + a + l + u + r + s + c + "</div></div></section>").appendTo(document.body).on("tap", ".js_qui_dialog_btn", function (t) { if (m) { var i = parseInt(this.getAttribute("data-index")); m.remove(), m = null, e.isFunction(n.cb) && n.cb(isNaN(i) ? 0 : i) } return t.stopImmediatePropagation(), !1 }); return m.find("a").focus(), m }, alert: function (n) { t.close(); var i = { title: "QQ闊充箰", message: "", btn: "鎴戠煡閬撲簡" }; return e.isObject(n) ? i = $.extend(i, n) : i.message = n + "", e.isArray(i.btn) && i.btn.length > 1 && (i.btn = i.btn.slice(0, 2)), t.show(i) }, confirm: function (n) { t.close(); var i = { title: "QQ闊充箰", message: "", btn: ["鍙栨秷", "纭畾"] }; return e.isObject(n) ? i = $.extend(i, n) : i.message = n + "", e.isArray(i.btn) || (i.btn = "" + i.btn), e.isArray(i.btn) && i.btn.length > 2 && (i.btn = [i.btn[0]]), t.show(i) }
            }; e.dialog = t, e.alert = e.webAlert = t.alert, e.confirm = e.webConfirm = t.confirm
        }(M), function (e) {
            window.doNotUseQQConnectLogin || setTimeout(function () { if (!$.browser.music) { var t = localStorage.getItem("CHECK_QQ_LOGIN_TYPE_ID"); t || (t = (new Date).getTime(), localStorage.setItem("CHECK_QQ_LOGIN_TYPE_ID", t)), e.uajax({ comm: { ct: 23, cv: 0 } }).request({ module: "QQConnectLogin.LoginMethod", method: "GetLoginMethod", param: { id: parseInt(t, 10) } }, function (t, n) { t || 0 != n.code || (e.USE_QQ_CONNECT = 2 == n.data.method) }) } }); function t() { if (e.USE_QQ_CONNECT) return function () { e.tj.sendClick("webqqconnectlogin.click"); var t = { response_type: "code", client_id: "100497308", redirect_uri: location.protocol + "//y.qq.com/m/login/redirect.html?is_qq_connect=1&login_type=1&surl=" + encodeURIComponent(e.delParam("access_token", e.delParam("mmkey", location.href)).replace(/\?&+/, "?")), state: "state", display: "mobile" }; setTimeout(function () { location.href = "https://graph.qq.com/oauth2.0/authorize?" + $.param(t) }, 50) }(); e.tj.sendClick("webLogin.click"); var t = { pt_no_auth: 1, pt_wxtest: 1, pt_no_onekey: $.browser.weibo || $.browser.qmkege || e.getParam("no_onekey") ? 1 : 0, daid: 384, style: 9, hln_css: "https://y.gtimg.cn/music/common/upload/t_cm3_photo_publish/1117688.png?max_age=2592000", appid: 83886593, s_url: location.protocol + "//y.qq.com/m/login/redirect.html?login_type=1&surl=" + encodeURIComponent(e.delParam("access_token", e.delParam("mmkey", location.href)).replace(/\?&+/, "?")) }; $.browser.music && (t.low_login_enable = 1, t.pt_ttype = 1), setTimeout(function () { location.href = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/login?" + $.param(t) }, 50) } !function () { if ($.browser.music) { var t = $.cookie.get("uin") || $.cookie.get("p_uin") || 0, n = $.cookie.get("wxuin") || 0, i = $.cookie.get("wxopenid"); 2 == ($.cookie.get("login_type") || 0) && i && t != n && e.musicReady(function () { e.bridgeCall("resetCookie", {}, function (e) { }) }) } }(); function n() { var e = $.cookie.get("uin") || $.cookie.get("p_uin") || 0; return 2 == $.cookie.get("login_type") && (e = $.cookie.get("wxuin") || $.cookie.get("uin") || 0), e && (0 == e.indexOf("o") && (e = e.substring(1, e.length)), !/^\d+$/.test(e) || e < 1e4 ? e = 0 : ("" + e).length < 14 && (e = parseInt(e, 10))), e } var i = n(), o = {}; e.user = { isweixinlogin: !!$.cookie.get("wxopenid") && 2 == $.cookie.get("login_type"), isQQConnectLogin: !(!$.cookie.get("psrf_qqopenid") || !$.cookie.get("psrf_qqaccess_token")), getUin: function () { return n() || i }, isLogin: function (e) { return e ? (function () { var e = $.cookie.get("uin") || $.cookie.get("p_uin"); if (/^\d{5,12}$/.test(e)) { var t = "o" + "00000".substr(0, 10 - e.length) + e; $.cookie.set("uin", t, "qq.com") } }(), !!$.cookie.get("qm_keyst") || !(!$.cookie.get("skey") || !/^o\d{5,12}$/.test($.cookie.get("uin")))) : !!$.cookie.get("qm_keyst") || !!$.cookie.get("wxopenid") || !!$.cookie.get("skey") || !!$.cookie.get("p_skey") || $.browser.qmkege && !!$.cookie.get("openkey") }, getSession: function () { return { uin: this.getUin(), mmskey: "" } }, showLogin: function (n) { n = n || { cb: function () { }, loginType: 1, noConfirm: 0, forceLogin: 0, loginOpt: 0, noQMBtn: !1 }, e.checkInstall(function (i) { var o, a = $.browser.weibo, r = n.loginType; a ? o = "涓鸿幏寰楀畬鏁翠綋楠岋紝寤鸿浣�" : (o = "QQ/寰俊璐﹀彿璧勪骇鍜岀壒鏉冧笉浜掗€�", 1 == r ? o += "锛屾湰椤甸潰闄怮Q鐧诲綍" : 2 == r && (o += "锛屾湰椤甸潰闄愬井淇＄櫥褰�")), e.dialog.show({ title: "鐧诲綍QQ闊充箰", bodyContent: ['<div style="text-align:center;line-height:36px;font-size:14px;margin:20px 0 0;padding:0 15% 14px;">', '<p style="font-size:14px;line-height:1.5em;margin:15px 0;">' + o + "</p>", a || 1 == r ? "" : '<a class="js_login_select" data-type="2" href="javascript:;" style="color:#00AE57;text-decoration:none;display:block;margin-bottom:16px;border-radius:40px;border:1px solid #00AE57;">寰俊甯愬彿鐧诲綍</a>', a || 2 != r ? '<a class="js_login_select" data-type="1" href="javascript:;" style="color:#4994EA;text-decoration:none;display:block;border-radius:40px;border:1px solid #4994EA;">QQ甯愬彿鐧诲綍</a>' : "", "</div>", a || -1 != i && !n.noQMBtn ? '<div style="text-align:center;font-size:15px;margin-bottom:10px;padding:0 15%;"><p style="border-bottom:1px solid #F3F3F3;margin:-10px 20% 24px;"><span style="font-size:12px;line-height:24px;background-color:#FFFFFF;display:inline-block;margin-bottom:-12px;padding:0 10px;vertical-align:bottom;">鎴�</span></p><a class="js_login_select" data-type="3" href="javascript:;" style="color:#FFFFFF;text-align:center;line-height:46px;text-decoration:none;background:linear-gradient(60deg, #24CCAA 10%, #31C27C 110%);display:block;border-radius:40px;">鎵撳紑QQ闊充箰 涓€閿櫥褰�</a></div>' : ""].join(""), forceHideClose: n.noConfirm }), 1 != r && e.tj.sendClick("wxLogin.show"), 2 != r && e.tj.sendClick("webLogin.show"), -1 == i || n.noQMBtn || e.tj.sendClick("qmLogin.show"), $(".js_login_select").off().on("click", function (n) { var i = $(this).data("type"); 1 == i ? t() : 2 == i ? (e.tj.sendClick("wxLogin.click"), setTimeout(function () { location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?" + $.param({ appid: "wx2b878669d2ea531c", redirect_uri: location.protocol + "//y.qq.com/m/login/redirect.html?login_type=2&surl=" + encodeURIComponent(e.delParam("access_token", e.delParam("mmkey", location.href)).replace(/\?&+/, "?")), response_type: "code", scope: "snsapi_userinfo" }) + "#wechat_redirect" }, 50)) : 3 == i && (e.ready(function () { window.SOURCE_PAGE = e.addParam({ ADTAG: "morendenglu" }, e.delParam("ADTAG")), e.client.open("ui", "openUrl", { url: location.href }, function () { }, 10036164) }), e.tj.sendClick("qmLogin.click")) }) }) }, login: function (n, i, o, a) { var r = n && e.isObject(n) ? n : { cb: n, loginType: 1, noConfirm: i, forceLogin: a, loginOpt: 0, noQMBtn: !1 }, s = r.cb || function () { }; !function () { var n = ""; e.getParam("no_wxlogin") || $.browser.music || $.browser.mqq || !($.browser.weixin || $.browser.safari || $.browser.weibo || $.browser.qqbrowser || $.browser.uc) ? $.browser.music ? e.compare($.browser.appVer, 4.8) >= 0 && e.compare($.browser.appVer, 6.2) <= 0 ? (r.forceLogin && (n = { force: "1" }), e.bridgeCall("JS_CMD_DO_LOGIN", n, function (e) { 0 == e.RESPONSE_CODE ? s(!0, e) : s(!1, e) })) : e.compare($.browser.appVer, 6.2) > 0 ? (n = {}, r.forceLogin && (n.force = 1), 1 == r.loginOpt && (n.forbiddenWeixin = 1), 2 == r.loginOpt && (n.forbiddenQQ = 1), e.client.open("ui", "login", n, function (e) { 0 == e.code ? s(!0, e) : s(!1, e) })) : t() : t() : e.user.showLogin(r) }() }, logindo: function (n, i) { if ($.browser.music && $.browser.ver >= 4.8) { var o = i ? { force: "1" } : ""; e.bridgeCall("JS_CMD_DO_LOGIN", o, function (e) { 0 == e.RESPONSE_CODE ? n(!0, e) : n(!1, e) }) } else t() }, buyLogin: function (e, t, n) { this.login(e, t, !0, n) }, getUserInfo: function (t, n, a) { n = e.isFunction(t) && t || n, t = e.isObject(t) && t || {}; var r = (t = $.extend({ format: "json", source: 4001 }, t)).uin || i; a && o[r] ? n && n(o[r]) : e.ajax({ url: "//c.y.qq.com/portalcgi/fcgi-bin/music_mini_portal/fcg_getuser_infoEx.fcg", dataType: "json", data: t, success: function (e) { o[r] = e, n && n(e) } }) }, unityGetUserInfo: function (t, n) { n = e.isFunction(t) && t || n; var i = !(t = e.isObject(t) && t || {}).uin_list || !t.uin_list.length, o = "" + e.user.getUin(); t = $.extend({ uin_list: [o] }, t), e.unityAjax({ params: { getVipInfo: { module: "userInfo.VipQueryServer", method: "SRFVipQuery_V2", param: t } }, success: function (a) { a.getVipInfo && e.unityServerCheck(a.getVipInfo.code, function () { var r = a.getVipInfo; 0 == r.code && (i ? e.isFunction(n) && n(r.data.infoMap[o]) : e.isFunction(n) && n(r, t.uin_list)) }) } }) }, unityGetBaseUserInfo: function (t, n) { n = e.isFunction(t) && t || n; var i = !(t = e.isObject(t) && t || {}).vec_uin || !t.vec_uin.length, o = "" + e.user.getUin(); t = $.extend({ vec_uin: [o] }, t), e.unityAjax({ params: { getNickHead: { module: "userInfo.BaseUserInfoServer", method: "get_user_baseinfo_v2", param: t } }, success: function (a) { a.getNickHead && e.unityServerCheck(a.getNickHead.code, function () { var r = a.getNickHead; 0 == r.code && (i ? e.isFunction(n) && n(r.data.map_userinfo[o]) : e.isFunction(n) && n(r, t.vec_uin)) }) } }) } }
        }(M), M.ready = function (e) {
            e = e || function () { }, $.browser.music ? M.musicReady(function () { e() }) : $.browser.mqq ? M.mqqReady(function () { e() }) : $.browser.weixin ? M.weixinReady(function () { e() }) : $.browser.qzone ? M.qzoneReady(function () { e() }) : e()
        }, function (e) {
            var t = /\bH5Proxy\[1\]/i.test(navigator.userAgent); e.ajax = function (n) { var i = { report: !1 }; if (n) { i.report = n.H5LogReport || !1; var o = this.user.getSession(), a = /shop\.y\.qq\.com/.test(n.url) || /c\.y\.qq\.com\/shop/.test(n.url) ? "p_skey" : ""; !/^post$/i.test(n.type) && n.postType && delete n.postType; var r = { data: { g_tk: this.getACSRFToken(a, /^(https?:)?\/\/u.y.qq.com\//.test(n.url)), uin: o.uin || 0, format: "json", inCharset: "utf-8", outCharset: "utf-8", notice: 0, platform: "h5", needNewCode: 1 }, timeout: 1e4, withCredentials: 1, cache: !1 }; !1 === /^(https?:)?\/\/u.y.qq.com\//.test(n.url) && (r.data.g_tk_new_20200303 = this.getACSRFToken("", !0)), $.browser.music && (r.data.ct = 23, r.data.cv = 0), $.browser.qmkege && (r.data.g_tk_openkey = this.getACSRFToken("openkey")), n.postType && (r.data = { comm: r.data }), n.data && "string" == typeof n.data && (n.data = this.param2obj(n.data)), $.extend(!0, r, n); var s = document.createElement("a"); s.href = r.url || ""; var c = { domain: s.hostname, cgi: s.protocol + "//" + s.host + s.pathname, timeout: r.timeout, report: 0 != n.reportCode, retry: 0 != n.retry, error: [] }; s = null, setTimeout(function () { try { e.tj.sendClick("cgidomain." + c.domain.replace(/\./g, "_")) } catch (e) { console.log("cgi domain report error") } }, 10), c.retry && (c.retry = /^(?:sz|sh)?[cu]6?.y.qq.com$/.test(c.domain)); var d, l = /^(?:sz|sh)?[cu]6.y.qq.com$/.test(c.domain); if (c.report && /\/musicu\.fcg$/.test(c.cgi)) { d = {}; var u = n.data; if (u && !/post/i.test(n.type) && (u = u.data), u) try { "string" == typeof u && (u = JSON.parse(u)); for (var a in u) { var p = u[a]; p && p.module && p.method && (d[a] = { cgi: p.module + "." + p.method }) } } catch (e) { console.log(e) } } var m = function (e, t, n) { try { if (n || (n = "code"), null != e && (c[n] = e), d) if (t) for (var i in t) d[i] && null != t[i].code && (d[i][n] = t[i].code); else for (var i in d) d[i][n] = e } catch (e) { console.log(e) } }; return r.success = function (t, o, a) { $.browser.music && r.timestamp && i.report && (i.code = null != t.code ? t.code : t.retcode, i.data = t, i.status = "success"), c.report && (c.endTime = +new Date), t && m(null != t.code ? t.code : t.retcode, t), !(c.retry && c.code < 0) || c.retry_sh && c.retry_sz ? e.isFunction(n.success) && n.success.apply(this, arguments) : c.needRetry = 1 }, r.error = function (t, o) { if ($.browser.music && r.timestamp && i.report) { i.data = t, i.status = o || "error"; var a = { abort: -601, error: -602, parsererror: -603, timeout: -604 }; t.status && 200 != t.status ? i.code = -t.status : i.code = a[o] || -500 } c.report && (c.endTime = +new Date, c.error.push(o), a = { abort: -601, error: -602, parsererror: -603, timeout: -604 }, t.status && 200 != t.status ? m(-t.status) : m(a[o] || -500)), !c.retry || c.retry_sh && c.retry_sz ? c.retry && !c._extraTry && -604 == c.code && /fcg_mpay_buy_item|fcg_dmrp_draw_lottery|fcg_dmrp_get_userinfo|fcg_dmrp_send_lottery|fcg_mmrp_cdkey_new/.test(c.cgi) ? (c.needRetry = 1, c.tryArea = "sz", c._extraTry = 1) : e.isFunction(n.error) && n.error.apply(this, arguments) : c.needRetry = 1 }, r.complete = function (t) { if (c.retry && (/sh/.test(c.domain) ? c.area = "sh" : /sz/.test(c.domain) ? c.area = "sz" : c.area = t.getResponseHeader && t.getResponseHeader("area"), c.needRetry)) return c.tryArea ? (c.area = c.tryArea, delete c.tryArea) : /^sh|sz$/.test(c.area) ? (c["time_" + c.area] = c.endTime - c.startTime, m(c.code, null, "code_" + c.area), c["retry_" + c.area] = 1, c.area = "sh" == c.area ? "sz" : "sh") : c.area = Math.random() < .5 ? "sh" : "sz", c["retry_" + c.area] = 1, c.domain = c.area + (/c6?.y/.test(c.domain) ? "c" : "u") + (l ? "6" : "") + ".y.qq.com", r.url = r.url.replace(/(?:sz|sh)?[cu]6?.y.qq.com/, c.domain), delete c.needRetry, delete r.beforeSend, void setTimeout(function () { c.startTime = +new Date, i && i.report && (r.timestamp = 0, r.timestamp = +new Date, e.ajaxReport(r)), $.ajax(r) }, 0); c.report && !1 !== t.reportCode && ((c = $.extend(c, e.isObject(n.reportCode) && n.reportCode, e.isObject(t.reportCode) && t.reportCode)).time = c.endTime - c.startTime, c.totaltime = c.endTime - c._startTime, function (t) { try { if (e.reportCode(t), d) for (var n in d) e.reportCode($.extend({}, t, d[n])) } catch (e) { console.log(e) } }(c)), i && i.report && i.data && e.ajaxReport(r, i), e.isFunction(n.complete) && n.complete.apply(this, arguments) }, i && i.report && (r.timestamp = 0, r.timestamp = +new Date, e.ajaxReport(r)), r.postType && (r.data = JSON.stringify(r.data)), c.report && (c._startTime = c.startTime = +new Date), /^post$/i.test(r.type) && t && /^(?:https?:)?\/\/(?:u|c)6?.y.qq.com\//i.test(r.url) && (r.url = r.url.replace(/\/\/(.*?)\//, "//ct.y.qq.com/$1/")), $.ajax(r), e } }, e.getACSRFToken = function (e, t) { e = e || "skey"; var n = "", i = 5381; if (n = t ? $.cookie.get("qqmusic_key") || $.cookie.get("p_skey") || $.cookie.get("skey") || $.cookie.get("p_lskey") || $.cookie.get("lskey") : $.cookie.get(e) || $.cookie.get("skey") || $.cookie.get("qqmusic_key")) for (var o = 0, a = n.length; o < a; ++o)i += (i << 5) + n.charCodeAt(o); return 2147483647 & i }
        }(M), function (e, t, n) {
            var i = /\bH5Proxy\[1\]/i.test(navigator.userAgent); n.uajax = function (e) { var o = { report: !1 }; e && (o.report = e.H5LogReport || !1); var a = [], r = [], s = [], c = [], d = { type: "post", url: "//u.y.qq.com/cgi-bin/musicu.fcg", comm: { g_tk: n.getACSRFToken("", !0), uin: n.user.getUin() || 0, format: "json", platform: "h5" }, dataType: "json", timeout: 1e4, withCredentials: 1, retry: !0, report: !0, cache: !1 }; $.browser.music && (d.comm.ct = 23, d.comm.cv = 0), d = $.extend(!0, d, e); var l = /post/i.test(d.type), u = { report: 0 != d.report, retry: 0 != d.retry }; if (u.report || u.retry) { var p = t.createElement("a"); p.href = d.url, u.domain = p.hostname, u.cgi = p.protocol + "//" + p.host + p.pathname, u = $.extend({}, d.report, u), p = null } u.retry && (u.retry = /^(?:sz|sh)?u6?.y.qq.com$/.test(u.domain)); var m = /^(?:sz|sh)?u6.y.qq.com$/.test(u.domain), f = function (e) { l ? (e.comm = d.comm, d.data = JSON.stringify(e)) : (d.data = $.extend({}, d.comm), d.data.data = JSON.stringify(e)) }, g = function (e) { r.forEach(function (t) { t(e, s) }), r.length = 0 }; return { request: function (t, r) { if (a) { var p = 0 === a.length; return a.push({ data: t || {}, callback: n.isFunction(r) && r }), p && setTimeout(function () { !function () { var e = !0, t = {}, r = {}; if (a.forEach(function (n, i) { var o = n.data; if (o.module && o.method) { var a = "req_" + i; n.index = i, u.report && (n.report = $.extend({}, d.report, { cgi: o.module + "." + o.method })), o.param || (o.param = {}), r[a] = n, t[a] = o, e = 0 } else n.callback && n.callback() }), a = null, e) return g(); f(t); var p, h; d.success = function (e) { $.browser.music && d.timestamp && o.report && (o.code = null != e.code ? e.code : e.retcode, o.data = e, o.status = "success"), u.endTime = +new Date, h = e || {} }, d.error = function (e, t) { $.browser.music && d.timestamp && o.report && (o.data = e, o.status = t || "error", e.status && 200 != e.status ? o.code = -e.status : o.code = { abort: -601, error: -602, parsererror: -603, timeout: -604 }[t] || -500), u.endTime = +new Date, p = t }, d.complete = function (e) { o && o.report && o.data && n.ajaxReport(d, o), u.report && (u.time = u.endTime - u.startTime, u.totaltime = u.endTime - u._startTime); var t; p ? t = e.status && 200 != e.status ? -e.status : { abort: -601, error: -602, parsererror: -603, timeout: -604 }[p] || -500 : h && 0 != h.code && (t = h.code, p = h), u.code = t || 0, (u.retry || u.report) && (/sh/.test(u.domain) ? u.area = "sh" : /sz/.test(u.domain) ? u.area = "sz" : u.area = e.getResponseHeader && e.getResponseHeader("area"), u.area && (u["retry_" + u.area] = 1)); var i = {}, a = 0; for (var l in r) { var _ = r[l], w = h && h[l]; s[_.index] = w, _.code = t || w && w.code, w && (w.ts = h.ts), u.report && (_.report.code = _.code, _.report.time = u.time, _.report.totaltime = u.totaltime, _.report.area = u.area), !u.retry || !(p || _.code < 0) || u.retry_sh && u.retry_sz ? (_.callback && _.callback(p, w), c.push(_.report), delete r[l]) : (i[l] = _.data, a = 1, u.area && (_.report["time_" + u.area] = u.time, _.report["code_" + u.area] = _.code)) } a ? (/^sh|sz$/.test(u.area) ? (u["time_" + u.area] = u.endTime - u.startTime, u["code_" + u.area] = u.code, u.area = "sh" == u.area ? "sz" : "sh") : u.area = Math.random() < .5 ? "sh" : "sz", u.domain = "//" + u.area + (m ? "u6" : "u") + ".y.qq.com", d.url = d.url.replace(/\/\/(?:sz|sh)?u6?.y.qq.com/, u.domain), delete d.beforeSend, h = p = null, f(i), setTimeout(function () { u.startTime = +new Date, o && o.report && (d.timestamp = 0, d.timestamp = +new Date, n.ajaxReport(d)), $.ajax(d) }, 0)) : (u.report && (n.reportCode(u), c.forEach(n.reportCode), c.length = 0), g(p)) }, u._startTime = u.startTime = +new Date, o && o.report && (d.timestamp = 0, d.timestamp = +new Date, n.ajaxReport(d)), l && i && /^(?:https?:)?\/\/(?:u|c)6?.y.qq.com\//i.test(d.url) && (d.url = d.url.replace(/\/\/(.*?)\//, "//ct.y.qq.com/$1/")), $.ajax(d) }() }, 0), this } return n.uajax(e).request(t, r) }, complete: function (e) { return n.isFunction(e) && (r ? r.push(e) : e()), this } } }
        }(window, document, M), function (e) {
            e.checkInstall = function (t, n, i) { t = t || function () { }, "object" == typeof n ? (i = n.ios, n = n.android) : (n = n || "com.tencent.qqmusic", i = i || "qqmusic://"), $.browser.weixin ? e.weixinReady(function () { window.WeixinJSBridge && WeixinJSBridge.invoke("getInstallState", { packageName: n, packageUrl: i }, function (e) { e.err_msg.indexOf("get_install_state:yes") > -1 ? t(1) : t(-1) }) }) : !$.browser.mqq || $.os.ipad && "qqmusic://" == i ? $.browser.music ? "com.tencent.qqmusic" == n ? t(1) : e.musicReady(function () { e.bridge.call("checkAppInstalled", { ios: [i], android: [n] }, function (e) { e && e.result ? 1 == e.result[0] ? t(1) : t(-1) : t(0) }) }) : $.browser.qzone ? e.qzoneReady(function () { window.mqq ? mqq.invoke("app", "isAppInstalled", { name: $.os.ios ? i : n }, function (e) { 1 == e || "object" == typeof e && e.data.result ? t(1) : t(-1) }) : t(0) }) : $.browser.tcs && $.os.android ? e.tcsReady(function () { TcsJSBridge.invoke("isPkgInstalled", { pkgName: n, iosUrl: i }, function (o) { if (/not_allow/.test(o.err_msg)) return delete $.browser.tcs, e.checkInstall(t, n, i); "ok" == o.err_msg ? "true" == o.ret || 1 == o.ret ? t(1) : t(-1) : t(0) }) }) : t(0) : e.mqqReady(function () { mqq.app && mqq.app.isAppInstalled ? setTimeout(function () { mqq.app.isAppInstalled($.os.ios ? i : n, function (e) { t(e ? 1 : -1) }) }) : t(0) }) }, e.isInstall = function (t, n, i) { e.checkInstall(function (e) { t(1 == e) }, n, i) }
        }(M), M.getPic = function (e, t, n) {
            var i = location.protocol + "//y.gtimg.cn/mediastyle/music_v11/extra/default_300x300.jpg?max_age=31536000"; return "string" == typeof t && t.length >= 14 ? (e = "album" == e ? "T002" : "singer" == e ? "T001" : e, i = location.protocol + "//y.gtimg.cn/music/photo_new/" + e + "R" + (n || 68) + "x" + (n || 68) + "M000" + t + ".jpg?max_age=2592000") : t > 0 && (i = location.protocol + "//y.gtimg.cn/music/photo/" + e + (n >= 300 ? "_" + n : "") + "/" + t % 100 + "/" + (n || 68) + "_" + e + "pic_" + t + "_0.jpg?max_age=2592000"), i
        }, function (e) {
            var t = e.user.getUin();
            function n(n, i) {
                var o = 9; if (2 == n && i) switch (i.data && i.data.target) {
                    case "weixin": o = 1; break;
                    case "timeline": o = 2; break;
                    case "qq": o = 3; break;
                    case "qzone": o = 4; break;
                    case "sina": o = 5; break;
                    case "qmim": o = 6; break;
                    case "copy": o = 7; break;
                    case "qmcode": o = 8; break;
                    default: o = 9
                }e.report("//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg", {
                    platform: $.browser.platform, os: $.os.ios ? "ios" : "android", data_type: 291, data: n || 1, data2: o, reserve6: t, reserve7: location.origin + location.pathname, reserve8: document.title
                })
            } setTimeout(function () { n() }, 1e3), e.musicReady(function () {
                e.client.on("share", function (e) { e && 0 == e.code && n(2, e) })
            }), e.share = { isInit: !0, mqqMenu: !0, showCtrl: !1, onshare: function () { }, _onshare: function (t) { !$.browser.music && t && 0 == t.code && n(2, t), e.isFunction(this.onshare) && this.onshare(t) }, shareData: { appid: "wx5aa333606550dfd5", img_width: 173, img_height: 173, img: location.protocol + "//y.gtimg.cn/mediastyle/musicprotal/extra/logo.png?max_age=2592000", link: location.href }, init: function (t) { var n = this; for (var i in t) this.shareData[i] = t[i]; this.shareData.link = e.delParam("mmkey", this.shareData.link), this.shareData.link = e.delParam("sid", this.shareData.link), /^https?\:/.test(this.shareData.link) || (this.shareData.link = location.protocol + "//" + this.shareData.link.replace(/^\/\//, "")), this.shareData.share_url = this.shareData.link, this.shareData.img = e.fixUrl(this.shareData.img), $.browser.music && $.os.android && e.isString(this.shareData.img) && /^https:/i.test(this.shareData.img) && (this.shareData.img = this.shareData.img.replace(/^https/i, "http")), this.shareData.wxTimelineTitle = this.shareData.wxTimelineTitle || this.shareData.pengyouquanTitle || this.shareData.title; var o = this.shareData.imgUrl = this.shareData.image_url = this.shareData.img_url = this.shareData.img; $.browser.music && e.compare($.browser.appVer, "10.0") >= 0 && 1 == this.shareData.supportToFeed && (this.shareData.feedMediaTitle = this.shareData.feedMediaTitle || this.shareData.title, this.shareData.feedMediaSubtitle = this.shareData.feedMediaSubtitle || this.shareData.desc, this.shareData.feedMediaCover = this.shareData.feedMediaCover || this.shareData.img, this.shareData.feedMediaSchema = this.shareData.feedMediaSchema || this.shareData.link), setTimeout(function () { var e = new Image, t = new Image; e.onload = function () { if (e.width > 1e3 || e.height > 1e3) { var n = ["msg=" + encodeURIComponent("wrongsize" + e.width + "x" + e.height), "file=" + encodeURIComponent(o)]; t.src = "//stat.y.qq.com/monitor/report_err?" + n.join("&") } }, e.onerror = function () { var e = ["msg=" + encodeURIComponent("loaderror"), "file=" + encodeURIComponent(o)]; t.src = "//stat.y.qq.com/monitor/report_err?" + e.join("&") }, e.src = o }, 1e3), !1 !== this.shareData.isInit && 1 != e.getParam("hide_share") || (this.isInit = !1), !1 === this.shareData.mqqMenu && (this.mqqMenu = !1), this.shareData.showCtrl && (this.showCtrl = !0), $.browser.mqq && (this.shareData.appid = 100497308), e.weixinReady(function () { n.weixinInit() }), e.musicReady(function () { n.musicInit() }), $.browser.mqq && e.mqqReady(function () { n.shareData.back = !0, mqq.ui.setOnShareHandler(function (e) { n.shareData.share_type = e, mqq.ui.shareMessage(n.shareData, function (t) { t.target = 1 == e ? "qzone" : 2 == e ? "weixin" : 3 == e ? "timeline" : "qq", n._onshare({ code: 0 == t.retCode ? 0 : -1, data: t }) }) }) }), $.browser.qzone && this.qzoneInit(), $.browser.mqq || $.browser.music || (this.shareLayer && $(this.shareLayer).remove(), this.shareLayer = document.createElement("div"), this.shareLayer.style.cssText = "display:none;position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.8);z-index:9999", this.shareLayer.innerHTML = $.browser.weixin || $.browser.qzone || $.browser.qmkege ? '<img id="shareimgup" style="position:absolute;top:10px;right:27px;width:263px;height:auto" src="//y.gtimg.cn/mediastyle/mobile/event/20140318_ceremony_live/img/share_top.png?max_age=2592000">' : '<img id="shareimgdown" style="position:absolute;bottom:10px;right:27px;width:263px;height:auto" src="//y.gtimg.cn/mediastyle/mobile/event/20140318_ceremony_live/img/share_bottom.png?max_age=2592000">', document.body.appendChild(this.shareLayer), this.shareLayer.addEventListener("touchstart", function (e) { this.style.display = "none" })), $.browser.qmkege && (location.href = "qmkege://kege.com?action=setshare&" + $.param({ title: this.shareData.title, content: this.shareData.desc, link: this.shareData.link, cover: this.shareData.img })); var a = navigator.userAgent; (a.match(/\bQMfanlive\/(\d[\.\d]*)/i) || a.match(/QMfanlive\/(\d[\.\d]*)/i)) && n.qmliveInit() }, call: function () { var t = this; if ($.browser.music) e.client.open("other", "callShareWeb", t.shareData, function (e) { t._onshare(e) }); else if ($.browser.weixin || $.browser.qzone || $.browser.qmkege) this.shareLayer.style.display = "block"; else if ($.browser.mqq) e.mqqReady(function () { mqq.QQVersion >= "5.2" && t.mqqMenu ? mqq.ui.showShareMenu() : e.alert("浣犵殑鎵婹鐗堟湰澶綆,璇风偣鍑诲彸涓婅鍒嗕韩!") }); else { var n = navigator.userAgent; (n.match(/\bQMfanlive\/(\d[\.\d]*)/i) || n.match(/QMfanlive\/(\d[\.\d]*)/i)) && "object" == typeof window.QMLiveJSBridge ? (t.shareData.target = t.shareData.target || "default", window.QMLiveJSBridge.invoke("other", "callShareWeb", t.shareData, function (e) { t._onshare(e) })) : e.confirm({ message: "褰撳墠鐜鏆備笉鏀寔鍒嗕韩, 鏄惁鍓嶅線鎵嬫満QQ鍒嗕韩!", cb: function (e) { e && (location.href = "mqqapi://forward/url?url_prefix=" + btoa(location.href) + "&version=1&src_type=web") } }) } }, weixinInit: function () { var t = this; t.shareData.success = function (e) { t._onshare({ code: 0, data: e }) }, t.shareData.cancel = function (e) { t._onshare({ code: -1, data: e }) }, e.compare($.browser.appVer, "6") >= 0 ? function () { var n = t.shareData.imgUrl; try { $.os.android && e.isString(n) && /^https/.test(n) && (n = n.replace(/^https/, "http")) } catch (e) { } wx.updateAppMessageShareData({ title: t.shareData.title, desc: t.shareData.desc, link: t.shareData.link, imgUrl: n, success: function (e) { e.target = "weixin", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "wx_friend" }) } }), wx.updateTimelineShareData({ title: t.shareData.wxTimelineTitle, link: t.shareData.link, imgUrl: n, success: function (e) { e.target = "timeline", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "wx_timeline" }) } }), wx.onMenuShareWeibo({ title: t.shareData.title, desc: t.shareData.desc, link: t.shareData.link, imgUrl: n, success: function (e) { e.target = "weibo", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "weibo" }) } }) }() : window.WeixinJSBridge && (WeixinJSBridge.on("menu:share:appmessage", function () { WeixinJSBridge.invoke("sendAppMessage", t.shareData, function (e) { e.target = "weixin", t._onshare({ code: /\:(confirm|ok)/.test(e.err_msg) ? 0 : -1, data: e, to: "wx_friend" }) }) }), WeixinJSBridge.on("menu:share:timeline", function (e) { var n = t.shareData; n.wxTimelineTitle && n.wxTimelineTitle != n.title && (n = $.extend({}, n, { title: n.wxTimelineTitle })), WeixinJSBridge.invoke("shareTimeline", n, function (e) { e.target = "timeline", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "wx_timeline" }) }) }), WeixinJSBridge.on("menu:share:qq", function (e) { WeixinJSBridge.invoke("shareQQ", t.shareData, function (e) { e.target = "qq", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "qq" }) }) }), WeixinJSBridge.on("menu:share:QZone", function (e) { WeixinJSBridge.invoke("shareQZone", t.shareData, function (e) { e.target = "qzone", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "qzone" }) }) }), WeixinJSBridge.on("menu:share:weiboApp", function (e) { WeixinJSBridge.invoke("shareWeiboApp", t.shareData, function (e) { e.target = "weibo", t._onshare({ code: /\:ok/.test(e.err_msg) ? 0 : -1, data: e, to: "weibo" }) }) })) }, musicInit: function () { var t = this; t.isInit && e.client.open("ui", "setActionBtn", { type: "icon", content: "share" }, function (e) { e && 0 == e.code && t.call() }) }, qmliveInit: function () { var e = this; e.isInit && ("object" == typeof window.QMLiveJSBridge ? t() : document.addEventListener("WebViewJavascriptBridgeReady", function () { t() })); function t() { "object" == typeof window.QMLiveJSBridge && window.QMLiveJSBridge.invoke("ui", "setActionBtn", { type: "icon", content: "share" }, function (t) { t && 0 == t.code && e.call() }) } }, qzoneInit: function () { var t = this; e.qzoneReady(function () { if (window.QZAppExternal && QZAppExternal.setShare) { var e = t.shareData.title, n = t.shareData.wxTimelineTitle || t.shareData.title, i = t.shareData.img_url, o = t.shareData.desc, a = t.shareData.link; QZAppExternal.setShare(function () { }, { type: "share", image: [i, i, i, i, i], title: [e, e, e, e, n], summary: [o, o, o, o, o], shareURL: [a, a, a, a, a] }) } }) } }
        }(M), function (e) {
            var t = []; e.fn.imglazyload = function (n) {
                var i = Array.prototype.splice, o = (n = e.extend({
                    threshold: 0, container: window, urlName: "data-url", placeHolder: "", eventName: "scrollStop", innerScroll: !1, isVertical: !0
                }, n), e(n.container)), a = n.isVertical, r = e.isWindow(o.get(0)), s = { win: [a ? "scrollY" : "scrollX", a ? "innerHeight" : "innerWidth"], img: [a ? "top" : "left", a ? "height" : "width"] }, c = e(n.placeHolder).length ? e(n.placeHolder) : null, d = e(this).is("img"); !r && (s.win = s.img); function l(e) { var t = r ? window : o.offset(), i = t[s.win[0]], a = t[s.win[1]]; return i >= e[s.img[0]] - n.threshold - a && i <= e[s.img[0]] + e[s.img[1]] } if (t = Array.prototype.slice.call(e(t.reverse()).add(this), 0).reverse(), e.isFunction(e.fn.imglazyload.detect)) return m(), this; function u(i) { var o = e(i), a = {}, r = o, s = e(i).is("img"); s || (e.each(o.get(0).attributes, function () { ~this.name.indexOf("data-") && (a[this.name] = this.value) }), r = e("<img />").attr(a)), o.trigger("startload"), r.on("load", function () { !s && o.replaceWith(r), o.trigger("loadcomplete"), r.off("load") }).on("error", function () { var n = e.Event("error"); s || o.trigger(n), n.defaultPrevented || t.push(i), r.off("error").remove() }).attr("src", o.attr(n.urlName)) } function p() { var n, o; for (n = t.length; n--;)l(e(o = t[n]).offset()) && (i.call(t, n, 1), u(o)) } function m() { !d && c && e(t).append(c) } return e(document).ready(function () { m(), p() }), !n.innerScroll && e(window).on(n.eventName + " ortchange", function () { p() }), e.fn.imglazyload.destroy = function () { t.length = 0 }, e.fn.imglazyload.detect = p, this
            }
        }(Zepto), function (e) {
            var t = null, n = 0; e.tips = function (i, o) {
                i && ($.browser.music && ($.os.ios || e.compare($.browser.appVer, "8.0") >= 0) ? e.client.open("ui", "topTips", { type: o || 0, message: i }) : function (e, i) { if (!n) { var o = document.createElement("div"); o.id = "tips", o.style.cssText = "position:fixed;top:-30px;left:0;z-index:9999;width:100%;height:30px;overflow:hidden;-webkit-transition:all 250ms;-webkit-transform:translate3d(0,0,0)", o.innerHTML = '<p style="height:30px;line-height:30px;margin:0 10px;text-align:center;font-size:14px;color:#fff;-webkit-border-radius:0 0 3px 3px;background:rgba(0,0,0,.7)"></p>', o.onclick = function () { $(this).css({ "-webkit-transform": "translateY(0)" }) }, document.body.appendChild(o), n = 1 } setTimeout(function () { t && clearTimeout(t), $("#tips p").text(e), $("#tips").css({ "-webkit-transform": "translateY(30px)" }), t = setTimeout(function () { $("#tips").css({ "-webkit-transform": "translateY(0)" }) }, 3e3) }) }(i))
            }
        }(M), function (e) {
            window.M || (window.M = {}), window.M.client || function (t) {
                "use strict"; var n = navigator.userAgent,
                    i = "qqmusic://", o = "qq.com",
                    a = Array.prototype.slice,
                    r = /[\?&]debug=1/i.test(location.search),
                    s = t.__aFunctions || {}; t.version = "20160419001";
                var c = n.match(/QQMUSIC\/(\d[\.\d]*)/i);
                t.clientVersion = c && c[1] && parseFloat(c[1].replace("0", ".")),
                    t.clientVersion > 0 || (t.clientVersion = "0");
                function d() { }
                function l(t, n, a, s, c) {
                    var d = ""; e.isFunction(a) ? (d = s, s = a, a = null) : e.isFunction(a && a.callback) && !e.isFunction(s) && (s = a.callback), c && e.isObject(c) ? d = c.cId : (d = c, c = {}); var l = i + (o ? o + "/" : ""); if (t && n && (l += encodeURIComponent(t) + "/" + encodeURIComponent(n), e.isObject(a))) { try { a = function e(t) { if (null != t) if ("object" == typeof t) for (var n in t) t[n] = e(t[n]); else "function" != typeof t && (t = String(t)); return t }(a) } catch (e) { } a = JSON.stringify(a), l += "&p=" + encodeURIComponent(a) } c._download_next_scheme = (c._download_next_scheme || l).replace(/[?&]/, "?"); var u = e.getParam("ADTAG"), p = e.getParam("ADTAG", window.SOURCE_PAGE), m = window.SOURCE_PAGE || location.href; $.browser.weibo && (u && "cbshare" != u || (u = "swbshare")), u && p && u != p && (m = e.addParam({ ADTAG: u + "|" + p }, e.delParam("ADTAG", window.SOURCE_PAGE))), l = (l + "&source=" + encodeURIComponent(m)).replace(/[?&]/, "?"), $.browser.music || !r ? e.checkInstall(function (t) { 1 == t ? e.openScheme(l) : -1 == t ? e.download(d, c) : e.hackOpen(l, d, null, c) }) : console.log(l)
                } t.__aFunctions = s, t.__scheme = i, $.extend(t, { invoke: function (t, n, i, o, r) { var c = s[t + "." + n]; return e.isFunction(c) ? c.apply(this, a.call(arguments, 2)) : l.apply(this, a.call(arguments)) }, invokeClient: l, build: function (e, n) { var i = null, o = e.split("."), a = e.lastIndexOf("."), r = o[o.length - 2], c = o[o.length - 1], l = function (n) { var i = e.substring(0, a).split("."), o = t; return i.forEach(function (e) { !o[e] && (o[e] = {}), o = o[e] }), o }(); !n.ios && n.iOS && (n.ios = n.iOS), n.support && !n.support.ios && n.support.iOS && (n.support.ios = n.support.iOS), (i = $.os.ios && n.ios) || (i = $.os.android && n.android), i && 0 != n.supportInvoke && (s[r + "." + c] = i), l[c] = i || d } })
            }(window.M.client = {}); var t = function (t, n) { e.client.on ? e.musicReady(function () { e.client.invoke("ui", "setActionBtn", { type: "icon", content: "share" }, function () { var i = "callShareWeb"; t && t.type && ("song" == t.type ? i = "callShareSong" : "img" == t.type ? i = "callShareImg" : "video" == t.type && (i = "callShareVideo")), e.client.invoke("other", i, t, n) }) }) : (t && (t.img = t.img || t.imgUrl), e.share && e.share.init(t)) }; e.client.build("other.setShare", { supportInvoke: !0, android: t, ios: t }), e.musicReady(function () { $.os.ipad && (e.client.off("loginState"), e.client.on("loginState", function () { location.reload() })) }), e.client.open = function (t, n, i, o, a) { if ("ui" === t && "openUrl" === n && i && /^qqmusic:/.test(i.url)) e.client.openScheme(i.url); else { var r = arguments; $.browser.music ? e.musicReady(function () { t && n && s() }) : s() } function s() { e.client.invoke.apply(e.client, r) } }, e.client.openScheme = function (t, n) { if (n = n || function () { }, !e.getParam("source", t)) { var i = e.getParam("ADTAG"), o = e.getParam("ADTAG", window.SOURCE_PAGE), a = window.SOURCE_PAGE || location.href; i && o && i != o && (a = e.addParam({ ADTAG: i + "|" + o }, e.delParam("ADTAG", window.SOURCE_PAGE))), t = (t + "&source=" + encodeURIComponent(a)).replace(/[?&]/, "?") } if ($.browser.weixin && e.compare($.browser.appVer, "6.5.6") >= 0) e.weixinReady(function () { WeixinJSBridge.invoke("launchApplication", { schemeUrl: t }, function (e) { if (n) { var t = e && e.err_msg || "error"; n(/launchApplication:ok/.test(t) ? null : t) } }) }); else { var r = Date.now(); if ($.os.ios) location.href = t; else { var s = document.createElement("iframe"); s.style.width = s.style.height = "1px", s.style.display = "none", s.src = t, document.body.appendChild(s) } n && setTimeout(function () { n(Date.now() - r < 1550 ? "timeout" : null) }, 1500) } }
        }(window.M), function (e) {
            var t = e.getParam("channelId") || e.getParam("channelid"), n = t, i = e.getParam("keep_cid"), o = e.getParam("ADTAG") || ""; n > 0 || ($.browser.mqq ? n = 10000609 : $.browser.weixin ? n = 10023178 : $.browser.weibo ? (n = 10039229, o = "sinaweibomr") : n = 10031709); function a(t) { e.report("//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg", { platform: $.browser.platform, os: $.os.ios ? "ios" : "android", data_type: 291, data: t || 3, data2: 9, reserve6: e.user.getUin(), reserve7: location.origin + location.pathname, reserve8: document.title }) } function r(t, n) { if (e.isFunction(n) || (n = null), $.browser.weixin && e.compare($.browser.appVer, "6.5.6") >= 0) e.weixinReady(function () { WeixinJSBridge.invoke("launchApplication", { schemeUrl: t }, function (e) { if (n) { var t = e && e.err_msg || "error"; n(/launchApplication:ok/.test(t) ? null : t) } }) }); else { var i; if ($.os.ios) i = +new Date, location.href = t; else { var o = document.createElement("iframe"); o.style.width = o.style.height = "1px", o.style.display = "none", o.src = t, i = +new Date, document.body.appendChild(o) } n && setTimeout(function () { n(+new Date - i < 1550 ? "timeout" : null) }, 1500) } a(3) } function s(t, n, i, o) { e.isFunction(n) && (i = n, n = null); var a, s, c; e.isObject(o) && o._download_next_scheme && e.writeSchemeToClipboard(o, function (e, t, n) { a = e, s = t, c = n }), r(t, function (t) { "timeout" == t && (e.isFunction(i) ? i() : (m(n), a && s && c && e.reportClipboard(a, s, c))) }) } function c(t) { t && e.tj && e.tj.sendClick && e.tj.sendClick(t, { virtualDomain: "y.qq.com" }) } function d(e) { e && window.downloadTjPrefix && c("downloadAppByWX." + window.downloadTjPrefix + "." + e) } var l = function () { var t; return function (n) { e.isFunction(n) && (t ? n(t) : e.mqqReady(function () { mqq.device.getDeviceInfo(function (e) { t = e && e.qimei, n(t) }) })) } }(), u = { get: function (e, t) { try { var n = localStorage.getItem(e); return t && (n = n ? JSON.parse(n) : ""), n } catch (e) { console.log(e) } }, set: function (e, t, n) { try { n && (t = t ? JSON.stringify(t) : ""), localStorage.setItem(e, t) } catch (e) { console.log(e) } } }; function p(t, n) {
                e.isFunction(t) || (t = null); var i, o, a = +new Date, r = parseInt(new Date / 36e5); n || (o = u.get("_download_cfg_ver"), r == o && (i = u.get("_download_cfg", !0)), a = r), i ? t && t(i) :
                    e.ajax({ type: "GET", url: "//y.qq.com/m/client/mm_cfg/download.json?max_age=3600&v=" + a, dataType: "jsonp", jsonpCallback: "download", success: function (e) { u.set("_download_cfg_ver", r), u.set("_download_cfg", e, !0), t && t(e) }, error: function () { t && t() } })
            } setTimeout(function () { 1 == e.getParam("_gene_config") && p(null, !0) }, 0); function m(s, u) { if (e.isObject(u) && u._download_next_scheme && e.writeSchemeToClipboard(u), 1 == i && t && (s = t), s = s > 0 ? s : n, $.browser.mqq && !window._direct_download) { var f = "https://y.qq.com/m/download/index.html?channelId=" + s; if (f !== location.href) return void e.mqqReady(function () { window.mqq && mqq.ui && mqq.ui.openUrl && mqq.ui.openUrl({ url: f, target: 1 }) }) } !function (e) { var n = function () { if ($.os.android && $.browser.mqq && "undefined" != typeof mqq && mqq.compare("4.6") >= 0 && mqq.app.downloadApp) return "mqq" }, i = function () { if ($.os.android && $.browser.weixin && WeixinJSBridge && WeixinJSBridge.invoke) return "weixin" }, o = navigator.userAgent; $.os.android && $.browser.tcs ? e("tcs") : $.os.android && $.browser.mqq && !t && /oppo|pacm00|vivo|huawei/i.test(o) ? p(function (t) { t || (t = {}), 1 == t.oppo && /oppo|pacm00/i.test(o) ? e("market", "oppo") : 1 == t.vivo && /vivo/i.test(o) ? e("market", "vivo") : 1 == t.huawei && /huawei/i.test(o) ? e("market", "huawei") : e(n() || i()) }) : e(n() || i()) }(function (t, i) { switch (c("download.h5." + (i || t || "web")), t) { case "tcs": u = s, e.tcsReady(function () { TcsJSBridge.invoke("download", { url: h(u), pkgName: "com.tencent.qqmusic", categoryId: "0", channel_id: "", extStr: "" }, function (t) { if (/not_allow/.test(t.err_msg)) return delete $.browser.tcs, m(u); "ok" == t.err_msg && 0 == t.ret || e.alert({ center: 1, title: "", message: "涓嬭浇澶辫触 锛宔rr_msg: " + t.err_msg }) }) }); break; case "market": l(function (e) { var t, n = navigator.userAgent.toLowerCase(); if (~n.indexOf("oppo") || ~n.indexOf("pacm00")) t = "oppo", r("softmarket://market_appdetail?pn=com.oppo.market&gb=1&params=enter_id%3d6%26enter_params%3dout_operator%23ac20180309%26out_package_name%3dcom.tencent.qqmusic%26out_start_download%3dtrue"); else if (~n.indexOf("vivo")) t = "vivo", r("vivoMarket://details?id=com.tencent.qqmusic"); else { if (!~n.indexOf("huawei")) return; t = "huawei", r('hiapp://com.huawei.appmarket?activityName=activityUri|appdetail.activity&params={"params":[{"name":"uri","type":"String","value":"app|C10220136"}]}&channelId=70124') } c("market_download." + t); var i = new Image; i.onload = i.onerror = function () { i = null }, i.src = "//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg?" + $.param({ data_type: 266, data2: 23, reserve6: e, reserve7: o, reserve8: t }) }); break; case "mqq": mqq.app.downloadApp({ appid: "1101079856", url: h(s), packageName: "com.tencent.qqmusic", actionCode: "2", via: "ANDROIDQQ.QQMUSIC.GENE", appName: "QQMUSIC", source: "biz_src_qqmusic", isUniteDownload: !0 }, function (e) { e && 4 == e.state && mqq.app.downloadApp({ appid: "1101079856", url: h(s), packageName: "com.tencent.qqmusic", actionCode: "5", via: "ANDROIDQQ.QQMUSIC.GENE", appName: "QQMUSIC", source: "biz_src_qqmusic", isUniteDownload: !0 }, function () { }) }); break; case "weixin": !function (t) { d("cid_" + t + "_startdownload"), i = t = t > 0 ? t : n, o = function (n) { var i = 0; WeixinJSBridge.invoke("addDownloadTask", { task_name: "QQ闊充箰", task_url: n.download_url, thumb_url: "https://y.gtimg.cn/music/common/upload/t_cm3_photo_publish/295599.png?max_age=2592000", file_md5: n.download_md5 }, function (n) { (i = n.download_id || 0) && e.tips("姝ｅ湪涓嬭浇QQ闊充箰锛岃绋嶅€�"), d("cid_" + t + "_addDownloadTask_res_" + (n.err_msg || "success")) }), WeixinJSBridge.on("wxdownload:state_change", function (e) { "download_succ" === e.state && WeixinJSBridge.invoke("installDownloadTask", { download_id: i }, function (e) { d("cid_" + t + "_state_change_res_" + ((e || { err_msg: "undefined" }).err_msg || "success")) }) }) }, e.ajax({ url: "//c.y.qq.com/base/fcgi-bin/fcg_wxdownload_config.fcg?chid=" + i, dataType: "json", success: function (t) { t && 0 == t.code ? (o(t || {}), d("cid_" + i + "_download_md5_" + t.download_md5)) : (d("cid_" + i + "_cgi_code_" + (t || { code: "undefined" }).code), e.alert({ center: 1, title: "", message: "鑾峰彇App淇℃伅澶辫触 code:" + t.code })) }, error: function () { d("cid_" + i + "_cgi_error"), e.alert({ center: 1, title: "", message: "鑾峰彇App淇℃伅澶辫触锛岀綉缁滅箒蹇欙紝璇风◢鍊欏啀璇曪紒" }) } }); var i, o }(s); break; default: var a = h(s); a && (location.href = a) }var u }), a(4) } e.openMusic = function (t, i, o) { i > 0 || (i = n); var a = t && t.mid && ("" + t.mid).match(/(\w+)\.(\w+)/); if (a) delete t.mid, e.client.open(a[1], a[2], t, null, i); else if ($.browser.music) t && e.bridgeCall(t.mid + "", t, function () { }); else { var c = $.param(t || {}), d = "androidqqmusic://form=webpage&" + c; $.os.ios && (d = "qqmusic://qq.com?form=webpage&" + c), e.checkInstall(function (e) { 1 == e ? r(d) : -1 == e ? m(i, o) : s(d, i, null, o) }) } }; var f = { ios: "https://itunes.apple.com/app/apple-store/id414603431?pt=69276&mt=8&ct=QQmusic", tablet: "http://dldir1.qq.com/music/clntupate/qqmusic_android_pad_h5.apk" }; f.android = g(n); function g(e) { return "https://unicorn.wcd.qq.com/2b/api/chs/" + e + "/com.tencent.qqmusic" } function h(e) { e = e > 0 ? e : n; var t = ""; return $.os.ios ? t = f.ios + e : $.os.android && (t = $.os.tablet ? f.tablet : g(e)), t } var _ = e.getParam("openinqqmusic"), w = parseInt(e.getParam("delayopeninqqmusic")); if (!$.browser.music && !$.browser.weixin) { var y = 0; 1 != _ || window.forbidOpenInMusic ? w > 0 && !window.forbidDelayOpenInMusic && (y = 1e3 * w) : y = 1e3, y > 0 && setTimeout(function () { e.client.open("ui", "openUrl", { url: location.href }) }, y) } e.setChannelId = function (e) { e > 0 && (n = e) }, e.openMusic.downloadUrl = f, e.download = m, e.hackOpen = s, e.openScheme = r
        }(M), function (e) {
            var t = function () {
                var t, n = { playing: "playing", pause: "pause", end: "ended" }, i = {
                    ERR_SONG_DATA_INVALID: "姝屾洸鏁版嵁鏃犳晥", ERR_SET_PLAY_TIME: "璁剧疆currentTime澶辫触", ERR_REMOVE_AUDIO: "鏇挎崲audio瀵硅薄澶辫触", ERR_GET_SONG_INFO: "鑾峰彇姝屾洸淇℃伅澶辫触",
                    ERR_GET_SONG_VKEY: "鑾峰彇姝屾洸vkey澶辫触"
                }, o = { songData: {} }, a = /^(,*\d+,*)+$/, r = /^https?:\/\/./, c = {}, d = {}, l = {}, u = $.browser.music && $.browser.version || 0, p = { inited: 0, key: "qmplayer-cdn-dispatch", def: "http://dl.stream.qqmusic.qq.com/", sip: [] }; p.init = function () { if (!p.inited) { p.inited = 1; try { var t = sessionStorage.getItem(p.key); t && (t = JSON.parse(t), e.isArray(t.sip) && r.test(t.active) && (p.sip = t.sip, p.active = t.active)) } catch (e) { } } }, p.fixUrl = function (e) { return e && !r.test(e) && (e = (p.active || p.def) + e), e }, p.dispatch = function (t, n) { e.isFunction(t) ? (n = t, t = null) : e.isFunction(n) || (n = null); var i = p.sip || []; if (!t && p.active) n && n(p.active, i); else if (e.isArray(p._waiting)) p._waiting.push(n); else if (p.testfilewifi && i.length > 1) { p._waiting = [n]; var o, a, r = 0, s = function () { p._waiting && (p._waiting.forEach(function (t) { e.isFunction(t) && t(o, i) }), delete p._waiting) }, c = function (e) { var t = e.target; if (r++, !o) { var n, c = "loadedmetadata" != e.type && "ios" != e.type, d = r >= i.length; if (n = "ios" == e.type ? { cdn: e.cdn, index: e.index } : { cdn: t.getAttribute("data-cdn"), index: t.getAttribute("data-index") }, a ? c && d && (n = a) : a = n, !c || $.os.ios && d) { p.active = o = n.cdn, n.index > 0 && (i.splice(n.index, 1), i.unshift(o)), p.sip = i, s(); try { sessionStorage.setItem(p.key, JSON.stringify({ sip: p.sip, active: p.active })) } catch (e) { } } else d && s() } t && document.body.removeChild(t) }; $.os.ios ? c({ type: "ios", cdn: i[0], index: 0 }) : i.forEach(function (e, t) { var n = document.createElement("audio"); n.setAttribute("style", "height:0;width:0;display:none"), n.setAttribute("data-index", t), n.setAttribute("data-cdn", e), n.addEventListener("abort", c), n.addEventListener("error", c), n.addEventListener("loadedmetadata", c), n.src = e + p.testfilewifi, document.body.appendChild(n), n.load() }) } else i && i.length && (p.active = i[0]), n && n(p.active) }, p.ready = function (t, n, i) { if (e.isFunction(t) ? (i = t, t = n = null) : e.isFunction(n) && (i = n, e.isBoolean(t) ? (n = t, t = null) : n = null), t && t.request || (t = e.uajax()), p.init(), !n && p.sip && p.sip.length) { if (p.active) return e.isFunction(i) && i(p); if (p.testfilewifi) return p.dispatch(i) } p.sip = [], p.active = null, t.request({ module: "CDN.SrfCdnDispatchServer", method: "GetCdnDispatch" }, function (e, t) { t && 0 == t.code && t.data && (p.sip = t.data && t.data.sip, p.testfilewifi = t.data.testfilewifi), p.dispatch(i) }) }; function m(e) { if (e) { var t = e.type || 0; if (d[t]) return d[t][e.mid] || d[t][e.id] } } function f(e, t) { if (e) { t = t || d; var n = e.type || 0; t[n] || (t[n] = {}), t[n][e.id] = t[n][e.mid] = t[n + "_" + e.id] = t[n + "_" + e.mid] = t[e.mid] = e, t[e.id] || (t[e.id] = e) } } function g(e) { return null == e ? "" : "" + e } function h(t) {
                    try {
                        e.isArray(t) && t.forEach(function (t) {
                            (t.songid > 0 || t.id > 0) && (t.songid || (t.songid = t.id, t.preview || (t.preview = {}), [["songmid", "mid"], ["songname", "name"], ["songtitle", "title"], ["cdIdx", "index_cd"], ["songmid", "mid"], ["albumid", "id", null, "album"], ["albummid", "mid", null, "album"], ["albumname", "name", null, "album"], ["strMediaMid", "media_mid", null, "file"], ["size128", "size_128mp3", null, "file"], ["size320", "size_320mp3", null, "file"], ["sizeape", "size_ape", null, "file"], ["sizeflac", "size_flac", null, "file"], ["sizeogg", "size_ogg", null, "file"], ["trybegin", "b_30s", "preview", "file"], ["tryend", "e_30s", "preview", "file"], ["trysize", "size_try", "preview", "file"], ["payalbumprice", "price_album", "pay", "pay"], ["paytrackprice", "price_track", "pay", "pay"], ["paydownload", "pay_down", "pay", "pay"], ["payplay", "pay_play", "pay", "pay"], ["timefree", "time_free", "pay", "pay"], ["msgid", "msgid", null, "action"], ["switch", "switch", null, "action"], ["alertid", "alert", null, "action"]].forEach(function (e) { var n = e[0], i = e[2] ? t[e[2]] : t; if (i && null == i[n]) { var o = e[3] ? t[e[3]] : t; o && (i[n] = o[e[1]]) } }), null != t.switch && (t.newAction = t.action, delete t.action)), delete t.url, delete t.songUrl, delete t.songurl, e.formatMusic(t), t.newAction && $.extend(t.action, t.newAction))
                        })
                    } catch (e) { console.log(e) }
                } function _(e, t) {
                    return e == t || null == e || null == t ? e == t : "" + e == "" + t
                }
                function w(t, n) {
                    if (t = e.isArray(t) ? t.slice(0) : null == t || "" == t ? [] : ("" + t).split(/\s*,\s*/), !n)
                        for (var i = [], o = 0; o < t.length; o++)null != t[o] && "" != t && i.push(t[o]);
                    return t
                }
                function y(t, n) {
                    var i = c[t]; for (var a in i) e.isFunction(i[a]) && i[a].call(o, n)
                } var b = 0;
                function v(a, r, s) {
                    if (b = new Date, !t || $.os.ios && s && !navigator.userAgent.match(/Weibo\ \(*/i)) {
                        if (t && e.isFunction(t.pause))
                            try {
                                t.pause(), document.body.removeChild(t)
                            } catch (e) { console.log(e), y("error", i.ERR_REMOVE_AUDIO) }
                        var c = document.createElement("audio");
                        c.setAttribute("data-web-player", 1),
                            c.setAttribute("style", "height:0;width:0;display:none"),
                            c.addEventListener("error", function () {
                                t = "h5_play_song_error", n = void 0, b && (n = new Date - b, b = 0), n > 0 && setTimeout(function () {
                                    e.reportCode({ rate: 1, code: 0, time: n, cgi: t })
                                }, 0); var t, n
                            }), o.songData && o.songData.useProtocal && (a = e.fixUrl(a)), a && (c.src = a), c.addEventListener("playing", function (e) {
                                this.src && (o.state = n.playing, y("play", e))
                            }, !1),
                            c.addEventListener("pause", function (e) {
                                o.state = n.pause, y("pause", e)
                            }, !1),
                            c.addEventListener("error", function () {
                                if (this.src) {
                                    var t = o.songMid && d[o.songMid];
                                    if (t && t.playfile) {
                                        t.cdnIndex = t.cdnIndex > 0 ? t.cdnIndex + 1 : 1;
                                        var n = p.sip && p.sip[t.cdnIndex];
                                        n && (this.src = n + t.playfile, setTimeout(function () {
                                            e.tj.sendClick("cdn_dispatch.retry." + t.cdnIndex)
                                        }, 0))
                                    }
                                    return e.report("http://qm.music.qq.com/report_err", {
                                        msg: this.src + ":is not found", file: location.href
                                    }), !0
                                }
                            }),
                            c.addEventListener("ended", function (e) {
                                var t = o.songData;
                                t.songId && t.songId[t.index] == o.songId && t.songId[t.index + 1] && setTimeout(function () {
                                    x(t = $.extend({}, t, { index: t.index + 1 }))
                                }, 50),
                                    o.state = n.end, y("ended", e)
                            }, !1),
                            c.addEventListener("timeupdate", function (e) {
                                y("timeupdate", e)
                            }, !1),
                            c.setAttribute("autoplay", ""), document.body ? document.body.appendChild(c) : setTimeout(function () {
                                document.body.appendChild(c)
                            }, 0),
                            a && c.load(),
                            t = c,
                            $.os.ios && t.play()
                    }
                    else o.songData && o.songData.useProtocal && (a = e.fixUrl(a)), a && (t.src = a), $.os.ios && t.play();
                    e.isFunction(r) && r(c)
                } function q(t) {
                    var i = location.href + "&" + document.title;
                    t = $.extend(!0, { contentid: i }, t),
                        o.state == n.playing && "web" == o.songData.target && k("web");
                    var a = -1 == t.index ? 0 : t.index;
                    if (!t.songId || !t.force && o.state != n.end && (_(t.songId, o.songId) || _(t.songId, o.songData.songId) && (u = o.songData.songId, p = o.songId, m = a, "" + u == "" + p || u && e.isFunction(u.indexOf) && u.indexOf(p) == m && -1 != m)))
                        t.songId || !t.songUrl || !t.force && o.state != n.end && t.songUrl == o.songData.songUrl ? o.state == n.pause ? e.bridgeCall("music_resume") : e.bridgeCall("music_pause") : (r = { type: 1, songUrl: t.songUrl, songname: t.songName }, t.singerName && (r.singer = [{ name: t.singerName }]), e.client.open("media", "playSonglist", { song: [r] }, null, t.channelId));
                    else {
                        var r; (r = $.extend(!0, {}, t)).reportId > 0 && (r.from = parseInt(r.reportId));
                        var s = [];
                        if (e.isArray(r.song) && (r.song.forEach(function (e) {
                            1 == e.type && e.songUrl ? (s.push(e.songUrl), delete e.songid) : (s.push((e.type || 0) + "_" + e.songid), 0 == e.type && $.browser.music && (e.action = e.newAction || { switch: e.switch || e.action && e.action.switch, msgid: e.msgid, alert: e.alertid }))
                        }), $.os.android)) {
                            var c = [],
                                d = ["type", "action", "songid", "songmid", "songUrl"];
                            r.song.forEach(function (e) {
                                var t = {};
                                d.forEach(function (n) {
                                    null != e[n] && (t[n] = e[n])
                                }), c.push(t)
                            }), r.song = c
                        }
                        delete r.songInfo,
                            delete r.songId,
                            r.source || (s = s.join("|"),
                                l[s] || (l[s] = ("" + parseInt((1 + Math.random()) * Math.pow(10, 12))).substr(1)),
                                r.source = { type: 2e4, id: l[s] }),
                            e.client.open("media", "playSonglist", r, null, t.channelId)
                    }
                    var u, p, m;
                    delete t.force,
                        o.songData = t
                }
                function x(s, c) {
                    var d = {
                        target: u ? "music" : "web",
                        songInfo: {}, song: []
                    };
                    if (s && (s.songid > 0 || s.id > 0) && (s.reportId && (d.reportId = s.reportId), s = [s]), h(s), s) {
                        if (e.isArray(s)) {
                            for (var l = { songId: [], mediaMid: [], songInfo: {} }, p = 0; p < s.length; p++)
                                s[p] > 0 ? (l.songId.push(s[p]), l.mediaMid.push("")) : (l.songId.push(s[p].songid || ""), l.mediaMid.push(s[p].strMediaMid || ""), l.songInfo[s[p].songid || s[p].songurl] = s[p]); s = l
                        }
                    }
                    else s = o.songData; if (d = $.extend(d, c), a.test(s)) d.songId = s;
                    else if (r.test(s)) d.songUrl = s;
                    else {
                        if (!s || !a.test(s.songId) && !r.test(s.songUrl))
                            return y("error", i.ERR_SONG_DATA_INVALID);
                        $.extend(d, s)
                    }
                    ["songId", "songUrl", "mediaMid", "songName", "singerName"].forEach(function (e) {
                        d[e] = g(d[e])
                    }), 1 == d.download && $.extend(d, { target: "music", download: 1, action: "download", force: 1 }); var f = [];
                    if (d.songId) {
                        var w = d.songId.split(","), b = d.mediaMid && d.mediaMid.split(","); for (d.songId = [], d.mediaMid = [], w.length != b.length && (b = ""), p = 0; p < w.length; p++) { var x = w[p], I = d.songInfo[x]; x > 0 && (d.songId.push(x), b && d.mediaMid.push(b[p]), I || (f.push(x), I = m({ type: 0, id: x }) || { type: 0, songid: x, strMediaMid: b[p] }), d.song.push(I)) }
                        if (!d.songId.length)
                            return y("error", i.ERR_SONG_DATA_INVALID); d.mediaMid = d.mediaMid.join(","), d.index = parseInt(d.index), d.index = d.index >= 0 ? d.index : -1
                    } "music" == d.target ? $.os.ios && $.browser.music ? S({
                        id: f, callback: function (e, t) {
                            if (t) for (var n in t) d.songInfo[n] = t[n]; try { for (var i = 0, o = d.song.length; i < o; i++) { var a = d.song[i]; a && !a.action && d.songInfo[a.songid] && (d.song[i] = d.songInfo[a.songid]) } } catch (e) { } q(d)
                        }
                    }) : q(d) : S({
                        tryPlay: d.tryPlay, id: f, needUrl: !0, callback: function (i, a) {
                            if (a) for (var r in a)
                                d.songInfo[r] = a[r];
                            !function (i) {
                                if (o.state == n.playing && "music" == o.songData.target && k("music"), -1 == i.index && (i.index = 0), !i.force && i.songId && 1 == i.songId.length && o.songData.songId) { var a = o.songData.songId.indexOf(i.songId[0]); -1 != a && (i.songId = o.songData.songId, i.index = a) } var r, s = function () { delete i.force, o.songData = i, r && v(r) }; if (!i.songId || "music" != o.songData.target && (_(i.songId, o.songId) || _(i.songId, o.songData.songId) && i.index == o.songData.index)) i.songId || !i.songUrl || "music" != o.songData.target && i.songUrl == o.songData.songUrl ? i.force || /pause|ended/.test(o.state) ? t && ((i.force || o.state == n.end) && (t.currentTime = 0), t.play(), o.state = n.playing) : t && (t.pause(), o.state = n.pause) : (delete o.songId, delete o.songMid, delete o.mediaMid, o.songUrl = r = i.songUrl, o.state = n.playing); else { var c = i.songId[i.index] || i.songId[0], d = m({ id: c, type: 0 }) || {}; if (d.switch && !d.action) try { i.songInfo[c] = d = e.formatMusic(d) } catch (e) { console.log(e) } var l = d.action, u = function () { delete o.songUrl, o.songId = i.songId[i.index] || i.songId[0], o.songMid = d.songmid, o.mediaMid = d.strMediaMid || d.songmid, r = d.songurl, $.cookie.set("qqmusic_fromtag", 10, "qq.com"), o.state = n.playing }, p = function () { l ? e.player.playBlock(d) : e.alert("鎶辨瓑锛屾殏鏃跺惉涓嶄簡杩欓姝屼簡") }; if (l && !l.play && i.tryPlay && d.tryPlay) return void (e.user.isLogin() ? e.user.getUserInfo(null, function (e) { e && 1e3 == e.code ? p() : (u(), s()) }, !0) : p()); if (!l || !l.play) return void p(); u() } s()
                            }(d)
                        }
                    })
                } function k(n) { n && "web" != n || !t || !e.isFunction(t.pause) || t.pause(), n && "music" != n || !u || e.bridgeCall("music_pause") } function S(t, n, a, r, s) {
                    var c = null, d = null; e.isObject(t) ? (t = (c = t).id, n = c.type || [], a = void 0 != c.force && c.force, r = c.needUrl, s = c.callback || null, d = c.commData) : e.isFunction(n) ? (s = n, n = [], a = !1) : e.isFunction(a) ? (s = a, a = !1) : e.isFunction(r) ? (s = r, r = !0) : e.isFunction(s) || (s = null), null == r && (r = !0); var l, u = w(n, !0), g = w(t, !0), _ = {}, y = [], b = [], q = [], x = [], k = [], S = [], I = { mids: [], types: [], filename: [] }, D = [], T = {}, M = function (e) { for (var t = 0; t < g.length; t++)g[t] = m(g[t]); s && s(e, _, g) }; if (g.forEach(function (t, n) { if (t) { var i, o, s = u[n] > 0 ? parseInt(u[n]) : 0; e.isObject(t) ? (o = t.mid || t.songmid, i = t.id || t.songid, null != t.type && (s = t.type)) : t > 0 ? i = t : o = t, g[n] = { type: s, mid: o, id: i }, t = m(g[n]), !a && t ? (g[n] = t, f(t), f(t, _), r && !t.url && t.mid && t.action.play && (k.push(t.mid), S.push(t.type))) : o ? (q.push(o), x.push(s)) : (y.push(parseInt(i)), b.push(s)) } }), r && (k = k.concat(q), S = S.concat(x)), !(q.length || y.length || k.length)) return M(); var E = function (e) {
                        return { module: "track_info.UniformRuleCtrlServer", method: "GetTrackInfo", param: e }
                    }, C = function (t) {
                        var n = $.cookie.get("pgv_pvid");
                        n || (n = (new Date).getUTCMilliseconds(),
                            n = "" + Math.round(2147483647 * Math.random()) * n % 1e10);
                        var i = {
                            guid: n,
                            songmid: t.mids,
                            songtype: t.types,
                            uin: "" + e.user.getUin(),
                            loginflag: e.user.isLogin() ? 1 : 0,
                            platform: "23",
                            h5to: "speed"
                        };
                        return t.filename && (i.filename = t.filename), {
                            module: "vkey.GetVkeyServer",
                            method: "CgiGetVkey",
                            param: i
                        }
                    };
                    $.os.ios && r && "web" === o.songData.target && v(null, null, 1);
                    var j = function (t, n) {
                        l || (t || n && 0 != n.code ? l = i.ERR_GET_SONG_INFO : (n = n && n.data && n.data.tracks,
                            e.isArray(n) && (D = D.concat(n))))
                    }, A = function (t, n) {
                        l || (t || n && 0 != n.code ? l = i.ERR_GET_SONG_VKEY : n && n.data && e.isArray(n.data.midurlinfo) && n.data.midurlinfo.forEach(function (e) {
                            T[e.songmid] = e.purl
                        }))
                    }, R = function () { D.forEach(function (e) { if (e && e.mid && !e.url) { var t = T[e.mid]; t ? (e.playfile = t, e.songurl = e.songUrl = e.url = T[e.mid] = p.fixUrl(t)) : e.action.play ? (k.push(e.mid), S.push(e.type)) : e.tryPlay && e.strMediaMid && (I.mids.push(e.mid), I.types.push(e.type), I.filename.push("RS02" + e.strMediaMid + ".mp3")) } }) }; d || (d = {}), d.ct || (d.ct = 23, d.cv = 0); var U = e.uajax({ comm: d }); r && p.ready(U), q.length && U.request(E({ mids: q, types: x }), j), y.length && U.request(E({ ids: y, types: b }), j), k.length && U.request(C({ mids: k, types: x }), A); var Q = function () { if (h(D), D.forEach(function (e) { f(e), f(e, _), r && (k.length = S.length = 0, R()) }), !r || !k.length && !I.mids.length) return M(null); var t = e.uajax({ comm: d }); k.length && t.request(C({ mids: k, types: x }), A), I.mids.length && t.request(C(I), A), t.complete(function () { l || R(), M(l) }) }; U.complete(function () { if (l) return M(l); r ? p.ready(Q) : Q() })
                } return u && e ? e.musicReady(function () {
                    function t(t) {
                        if (t.data) {
                            if (o.state = n[t.data.state] || n.end, o.songId = g(t.data.songId || t.data.songid), o.songUrl = t.data.songUrl, o.songType = t.data.type, o.songData) { o.songData.target = "music"; var i = e.isArray(o.songData.songId) ? o.songData.songId.indexOf(o.songId) : -1; -1 == i && (i = 0, o.songData.songId = [o.songId], o.songData.albumName = t.data.albumName || t.data.albumname, o.songData.singerName = t.data.singerName || t.data.singername, o.songData.songName = t.data.songName || t.data.songname), o.songData.index = i } y(o.state == n.playing ? "play" : o.state)
                        }
                    } e.compare($.browser.appVer, "6.1") < 0 ? e.bridge && e.bridge.onApp && e.bridge.onApp("register_musicstate", t) : e.client && e.client.on && e.client.on("playStateChange", t), setTimeout(function () { e.bridge.callHandler("query_songinfo", {}, t) }, 50)
                }) : v(), {
                    cdn: p, map: d, config: function (e) { return e ? ($.extend(i, e), this) : $.extend({}, i) }, on: function (t, n) { return ("" + t).split(/\s/).forEach(function (t) { t && (c[t] || (c[t] = []), e.isFunction(n) && c[t].push(n)) }), this }, off: function (e) { return ("" + e).split(/\s/).forEach(function (e) { delete c[e] }), this }, getStatus: function () {
                        return $.extend({}, o)
                    }, play: function (e) {
                        return x.apply(this, arguments), this
                    }, pause: function () {
                        return k.apply(this, arguments), this
                    }, toggle: function () {
                        return x(), this
                    }, trigger: function (e, t) {
                        return y.apply(this, arguments), this
                    }, setPlayTime: function (e) {
                        if (t) try { t.currentTime = e } catch (e) {
                            console.log(e), y("error", i.ERR_SET_PLAY_TIME)
                        }
                        return this
                    }, download: function (e) {
                        return x({ songId: e, target: "music", download: 1 }), this
                    },
                    getSongInfo: function (e, t, n, i) {
                        return S.apply(this, arguments), this
                    }, playBlock: function (t, n) {
                        if (t) {
                            var i = function () {
                                if (t.pay && t.pay.payplay) {
                                    var n = 0 == t.pay.paytrackmouth && t.pay.payalbumprice > 0 ? "搴旂増鏉冩柟瑕佹眰锛屾浠樿垂鏁板瓧涓撹緫姝屾洸鐧诲綍璐拱鍚庡彲鎾斁" : "姝ゆ瓕鏇蹭负浠樿垂姝屾洸锛岃鍏堢櫥褰�"; e.confirm({
                                        title: "", message: n, btn: ["鍙栨秷", "鐧诲綍"], cb: function (t) {
                                            1 == t && e.user.login({ noConfirm: 0, cb: function () { location.reload() } }, !0)
                                        }
                                    })
                                }
                                else
                                    e.user.login({ noConfirm: 0, cb: function () { s && location.reload() } }, !0)
                            }; e.user.isLogin() ? e.user.getUserInfo(null, function (o) {
                                o && 1e3 == o.code ? i() : e.showMsg ? e.showMsg(t, n) : e.loadUrl("//y.gtimg.cn/music/h5/lib/js/module/showmsg.js?max_age=2592000&v=20181102", function () {
                                    e.showMsg && e.showMsg(t, n)
                                })
                            }, !0) : i()
                        }
                    }, playReady: function () { v("") }
                }
            }(); e.player = t
        }(M), function (e) {
            var t = function () {
                if (window.pageFollowSkin) {
                    var t = function (e) {
                        if (/^[0-9a-f]{1,8}$/i.test(e)) {
                            for (var t = 0, n = 8 - e.length; t < n; t++)e = "0" + e;
                            return e.replace(/(?:[0-9a-f]{2})/gi, function (e, t) { return e = parseInt(e, 16), 0 == t ? "rgba(" + e : "," + (t < 6 ? e : e / 255 + ")") })
                        } return ""
                    }; e.client && e.client.invoke("theme", "getThemeSetting", { type: ["theme"] }, function (e) { if (e && 0 == e.code) { var n = e.data || {}, i = n.theme, o = n.detail && n.detail.color, a = n.detail && n.detail.bcolor, r = n.detail && n.detail.skin_css; if (i) { var s = "//y.gtimg.cn/mediastyle/musiccm/skin/" + (r || "skin_" + i) + ".css?max_age=2592000"; $("head").append('<link rel="stylesheet" href="' + s + "\" onerror=\"this.href=this.href.replace('?m', '?r=1&m')\">"), $("link").each(function (e, t) { var n = $(t), i = n.attr("href"); /\/mediastyle\/musiccm\/skin\/skin/.test(i) && i != s && n.remove() }) } var c = []; o && (o = t(o), c.push(".c_txt3{color:" + o + "}")), 4 == i && a && (a = t(a), c.push(".c_bg3{background-color:" + a + "}")), c.length && $("<style>" + c.join("") + "</style>").appendTo("head") } })
                }
            }; e.musicReady(function () { e.client.on && e.client.on("themeStateChange", function (e) { t() }), t() })
        }(M), function (e) {
            function t(e) { setTimeout(function () { var t = new Image; t.onload = t.onerror = t.onabort = function () { t = t.onload = t.onerror = t.onabort = null }, t.src = e }) } e.winLoaded = function (t) { e.isFunction(t) && ("complete" == document.readyState ? t() : window.addEventListener("load", t)) }, e.report = function (n, i, o, a) { n && ($.os.ios && (a = !1), a && e.isFunction(navigator.sendBeacon) ? navigator.sendBeacon(n, i ? $.param(i) : null) : (i && (n = e.addParam(i, n)), o ? t(n) : e.winLoaded(function () { t(n) }))) }, e.musicReport = function (t, n, i) {
                t && $.browser.music && e.client.open("core", "support", { apiName: "debug.report" }, function (o) {
                    try {
                        if (o && o.data && 1 == o.data.isSupport) {
                            if (t = "" + t, n = parseInt(n), sessionStorage.getItem("debug.report:" + t))
                                return; window.performance && !n > 0 && (n = performance.timing[t]), n > 0 && (e.client.open("debug", "report", { tag: t, timestamp: n }, i),
                                    sessionStorage.setItem("debug.report:" + t, "" + n))
                        }
                    } catch (e) { }
                })
            }, e.H5Log = function (t) {
                var n = $.extend({ type: "H5", uin: e.user.getUin(), href: window.location.href, timestamp: 0 + new Date }, t); n = "***" + n.type + "***:" + JSON.stringify(n), $.browser.music && ($.os.android && e.compare($.browser.appVer, "8.9") >= 0 || $.os.ios && e.compare($.browser.appVer, "8.9.5") >= 0 ? console && console.log && console.log(n) : e.client && e.client.open && e.client.open("debug", "H5Log", { content: n }, function () { }))
            }, e.ajaxReport = function (t, n) { if (t.timestamp) { var i = { type: "ajaxReport", href: window.location.href, url: t.url, zrequestData: JSON.stringify(t.data), timestamp: t.timestamp, subtype: "request" }; n && (i.subtype = "respond", i.status = n.status, i.code = n.code, i.zrespondData = n.data), e.H5Log && e.H5Log(i) } }
        }(M), function (e) {
            e.tj = {
                pv: function (e) { e = e || window.tj_param || {}, this.checkping(function () { pgvMain("", { virtualDomain: e.virtualDomain || location.host, virtualURL: e.virtualURL || "", ADTAG: e.ADTAG || "", repeat: e.repeat || !1, useRefUrl: !0, careSameDomainRef: !0 }) }) }, sendClick: function (e, t) {
                    e && (t = t || window.tj_param || {}, this.checkping(function () {
                        pgvSendClick({ virtualDomain: t.virtualDomain || location.host, virtualURL: t.virtualURL || "", hottag: (e + (t.no_os ? "" : "." + ($.os.ios ? "ios" : "android"))).toUpperCase() })
                    }))
                }, _checkpingFlag: !1, _pingUrl: "//y.gtimg.cn/music/h5/lib/js/async/ping.js?max_age=25920000", checkping: function (t) { var n = this, i = t || function () { }; "function" == typeof pgvMain ? i() : e.loadUrl(n._pingUrl, function () { "function" == typeof pgvMain ? i() : n._checkpingFlag || (n._checkpingFlag = !0, n._pingUrl = "//y.gtimg.cn/music/h5/lib/js/async/ping.js?max_age=25920000&r=" + Math.random(), n.checkping(i)) }) }
            }, $(function () {
                window.tj_param && window.tj_param.noAuto || setTimeout(function () {
                    e.tj.pv()
                }, 100)
            })
        }(M), function (e) {
            window.SPD = window.SPD || {}, window.SPD.start ? function () {
                "use strict"; var t, n, i = document, o = location, a = setTimeout, r = window, s = navigator, c = window, d = c.localStorage, l = c.performance, u = c.Promise, p = l && l.timing || {}, m = p.navigationStart, f = navigator.userAgent, g = location.pathname,
                    h = JSON.stringify,
                    _ = "domContentLoadedEvent",
                    w = ["unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", _ + "Start", _ + "End", "domComplete", "loadEventStart", "loadEventEnd"],
                    y = 3e4,
                    b = "spd-" + g,
                    v = 10,
                    q = 100,
                    x = "complete" === i.readyState,
                    k = x ? null : [];
                function $(e) {
                    x ? e() : k.push(e)
                } r.addEventListener("load", function () {
                    x = !0, k.forEach(function (e) {
                        return e()
                    })
                }), i.addEventListener("DOMContentLoaded", function () {
                    t = !0, n && n()
                }); var S, I, D = /\bQQMusic\//i.test(f); function T(e) {
                    r.WebViewJavascriptBridge ? e() : i.addEventListener("WebViewJavascriptBridgeReady", e)
                }
                function M(t, n, i, o) {
                    e.client.invoke(t, n, o || {}, function (e) {
                        i(e && 0 == e.code && e.data || {})
                    })
                } (I = f.match(/QQMUSIC\/(\d[\.\d]*)/i)) ? S = "music" : (I = f.match(/MicroMessenger\/(\d[\.\d]*)/i)) ? S = "weixin" : (I = f.match(/(?:iPad|iPhone|iPod).*? (?:IPad)?QQ\/([\d\.]+)/) || f.match(/\bV1_AND_SQI?_(?:[\d\.]+)(?:.*? QQ\/([\d\.]+))?/)) ? S = "mqq" : (I = f.match(/\bqmkege\/(\d[\.\d]*)/i)) ? S = "qmkege" : /Qzone\//.test(f) ? S = "qzone" : /\/[\w. ]+MQQBrowser\//i.test(f) ? S = "qqbrowser" : /Weibo\ \(*/i.test(f) && (S = "weibo");
                var E, C, j = S || "other", A = I ? I[1] : ""; (C = f.match(/(?:Android);?[\s\/]+([\d.]+)?/)) ? E = "android" : (C = f.match(/(?:iPad).*OS\s([\d_]+)/) || f.match(/(?:iPod)(?:.*OS\s([\d_]+))?/) || f.match(/(?:iPhone\sOS)\s([\d_]+)/)) && (E = "ios");
                var R = E || "", U = C ? C[1] : ""; function Q(e) {
                    var t = i.cookie.match(RegExp("(^|;\\s*)" + e + "=([^;]*)(;|$)"));
                    return t ? t[2] : ""
                } var P, O, L = r.SPD, z = []; function N(e, t) { 0 <= t && t < y && (L.timing[e] = 0 | t) } function F(e) {
                    function t() {
                        var t = L.flag, n = L.timing, a = t && 3 <= t.length; n.length && (a || e) && (z.push(n.slice(0)), n.length = 0, a && $(function () {
                            var e = r.QMFE_SPD_RATE, n = 0 < e ? e : v; z.forEach(function (e) {
                                var a, r, c = [], d = "ios" === R, l = (r = f.match(/\bNetType\/(\w+)/i)) ? r[1] : "unknown", p = "//stat.y.qq.com/sdk/fcgi-bin/sdk.fcg", m = e[20] || 0, _ = e[21] || 0, w = e[22] || 0, y = e[23] || 0; for (var b in e) c.push(b + "=" + e[b]);
                                var v = encodeURIComponent("flag1=" + t[0] + "&flag2=" + t[1] + "&flag3=" + t[2] + "&flag5=" + (t[4] || 1) + "&" + c.join("&")), q = "weixin" === j ? "wechat" : j;
                                (new Image).src = "//stat.y.qq.com/sp/r.png?speedparams=" + v + "&platform=" + R + "&app=" + q + "&apn=" + l, (m || _ || w || y) && n * Math.random() < 1 && (a = a || new u(function (e) {
                                    var t, n, a, r = i.cookie.match(/\blogin_type=(\d+)/),
                                        s = {
                                            _appid: "qqmusic",
                                            _uid: (a = Q("uin") || Q("p_uin") || 0, 2 == Q("login_type") && (a = Q("wxuin") || Q("uin") || 0),
                                                a && (a = a.replace(/^o/, ""), !/^\d+$/.test(a) || a < 1e4 ? a = 0 : a.length < 14 && (a = parseInt(a, 10))), a),
                                            _platform: d ? 1 : 11,
                                            _account_source: r ? r[1] : "0",
                                            _os_version: U || "",
                                            _app_version: A,
                                            _channelid: (n = o.href.split("#")[0].match(new RegExp("(\\?|&)channelId=(.*?)(#|&|$)", "i")), decodeURIComponent(n ? n[2] : "")),
                                            _os: R,
                                            _app: j,
                                            _opertime: "" + (Date.now() / 1e3 | 0),
                                            _network_type: (t = l) && t.toLocaleLowerCase()
                                        }, c = "getDeviceInfo";
                                    D ? T(function () {
                                        function t(e) {
                                            return new u(function (t) {
                                                M("device", e, function (n) {
                                                    e === c ? (s._mobile_factory = n.model, s._mobile_type = n.modelVersion, s._os_version = n.systemVersion) : (s._deviceid = n.imei, s._mnc = n.isp), t()
                                                })
                                            })
                                        } u.all([t(c), t("getGuid")]).then(function () { e(s) })
                                    }) : e(s)
                                })).then(function (e) { var i = h({ common: e, items: [{ _key: "webcs", id: t[0] + "-" + t[1] + "-" + t[2], url: g, rate: n, webview: m, fcp: _, fmp: w, tti: y }] }); if (d || !s.sendBeacon) { var o = new XMLHttpRequest; o.open("POST", p), o.send(i) } else s.sendBeacon(p, i) })
                            }), z.length = 0
                        }))
                    } e ? t() : (clearTimeout(P), P = a(t, q))
                } function B(e) { if (e) { var t = e.webview, n = e.fcp, i = e.fmp, o = e.tti; (t || n || i || o) && (N(20, t), N(21, n), N(22, i), N(23, o), F(!0)) } } function V(e) {
                    D ? T(function () {
                        M("core", "support", function (t) {
                            1 == t.isSupport ? M("debug", "report", function (t) {
                                var n = t && t.time || 0, i = L.result; 0 < n && (i.webview = n, function (e) {
                                    if (e) try { d.setItem(b, h(e)) } catch (e) { }
                                }(i)), e(n)
                            }, { tag: "navigationStart", timestamp: m, url: o.href }) : e()
                        }, { apiName: "debug.report" })
                    }) : e()
                } L && 4 <= L.version && L.enabled && (L.report = F, O = function () { B(L.last), u.all([new u(V), new u(function (e) { $(function () { try { if (p) { for (var t = 0; t < w.length; t++)N(t + 1, p[w[t]] - m); var n = p[w[9]], o = p[w[10]], a = p[w[11]]; N(28, p[w[8]] - p[w[7]]), N(29, o - n), N(30, a - o) } if (l.getEntries) { var r, s, c, d, u = l.getEntries(), f = !1, g = i.body.querySelector("script[src]"); g && (d = g.src), u.forEach(function (e) { var t = e.name, n = e.initiatorType, i = e.responseEnd; "first-paint" === t && (f = !0), f || "link" !== n ? "script" === n && (t === d && (s = e.startTime, d = null), c = i < c ? c : i) : r = i }), N(31, r), N(32, s), N(33, c) } } catch (t) { } F(), L.ready(e) }) })]).then(function () { B(L.result) }) }, t ? O() : n = O)
            }() : $.extend(SPD, { flag: [], pointTime: {}, markStart: function (e, t) { this.pointTime[e] = t || Date.now() }, markEnd: function (e, t) { this.pointTime[e] && this._timing && (this._timing[e] = (t || Date.now()) - this.pointTime[e], this.send(), this.pointTime[e] = 0) }, send: function (t) { var n = t || this._timing; if (!this.flag.length) return !1; var i = e.isArray(n) ? n.join("&") : $.param(n); i && (e.report("//report.huatuo.qq.com/report.cgi", { appid: 10013, speedparams: this.flag.join("&") + "&" + i, platform: $.os.ios ? "ios" : "android", app: $.browser.mqq ? "mqq" : $.browser.weixin ? "wechat" : $.browser.qzone ? "mqzone" : "other", apn: e.getNetType() }), t || (this._timing = {})) }, init: function (e) { var t = this; e && e.flag instanceof Array && (this.flag.push("flag1=" + (e.flag[0] || 0)), this.flag.push("flag2=" + (e.flag[1] || 0)), this.flag.push("flag3=" + (e.flag[2] || 0)), e.flag[3] && this.flag.push("flag4=" + e.flag[3]), this.flag.push("flag5=" + (e.flag[4] || 1)), $(window).on("load", function () { setTimeout(function () { var e = {}; if (window.performance && performance.timing) try { for (var n = performance.timing, i = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"], o = n.navigationStart, a = 1, r = i.length; a < r; a++) { if (void 0 !== n[i[a]] && n[i[a]] > 0) { var s = n[i[a]] - o; if (s > 0 && s < 1e5) { e[a] = s; continue } } e[a] = 0 } t._timing[28] = n.connectEnd - n.connectStart, t._timing[29] = n.responseStart - n.requestStart, t._timing[30] = n.responseEnd - n.responseStart } catch (e) { } $.extend(t._timing, e), SPD.send() }, 100) })) } })
        }(M), function (e) {
            null == window.rtpid && (window.rtpid = 4); var t = [], n = 0, i = 100, o = {}, a = window.debug || 1 == e.getParam("debug"); function r(o) { o && t.push(o), 0 == n && ((o = t.shift()) && (a && console.log("report锛�", o), e.report("//stat.y.qq.com/ext/fcgi-bin/fcg_web_access_stat.fcg", o, 0, 1)), n = setTimeout(function () { n = 0, t.length && r() }, i)) } function s(e) { return e && (e < 0 || e >= 400 && e <= 699) } var c = function () {
                var t, n = []; return function (i) {
                    e.isFunction(i) && (n.push(i), 1 === n.length && $.ajax({ type: "head", url: "https://u.y.qq.com/connectiontest", dataType: "text", cache: !1, timeout: 5e3, success: function () { t = !0 }, error: function () { t = !1 }, complete: function () { n.forEach(function (e) { e(t) }), n.length = 0 } }))
                }
            }(); e.reportCode = function (e) { if ((e = e || {}).cgi && null != e.code && !isNaN(e.time)) { var t = { pid: window.rtpid > 0 ? window.rtpid : 4, os: $.os.android ? "android" : $.os.ios ? "ios" : "other", cgi: ("" + e.cgi).split("?")[0], code: e.code, time: e.time || 0 }; if (e.pid > 0 && (t.pid = parseInt(e.pid)), e.rate > 0 && (t.rate = parseInt(e.rate)), null != e.totaltime && (t.totaltime = e.totaltime), null != e.code_sh && (t.code_sh = e.code_sh), null != e.code_sz && (t.code_sz = e.code_sz), null != e.time_sh && (t.time_sh = e.time_sh), null != e.time_sz && (t.time_sz = e.time_sz), e.area && (t.area = e.area), (s(e.code) || s(e.code_sh) || s(e.time_sh)) && (t.rate = 1, e.one = !1), e.one) { if (o[t.cgi]) return; o[t.cgi] = 1 } 0 === t.rate || "0" === t.rate || t.rate > 1 && parseInt(Math.random() * t.rate) > 0 || (-604 == t.code ? c(function (e) { e || (t.code = 1000007, -604 == t.code_sz && (t.code_sz = 1000007), -604 == t.code_sh && (t.code_sh = 1000007)), r(t) }) : r(t)) } }
        }(M), M.webLog = function () { var e = !1; function t(e, t) { var n = { ut: "20170109", bname: "qqmusic", uid: M.user.getUin() || 0, time: +new Date, type: e || "other", data: t }, i = new XMLHttpRequest; i.open("post", location.protocol + "//stat.y.qq.com/monitor/report_log"), i.send(JSON.stringify(n)) } return { init: function () { e || (t("basic", { title: document.title, url: location.href, referer: document.referrer, ua: navigator.userAgent, cookie: document.cookie, uin: M.user.getUin() }), window.onerror = function (e, n, i, o) { try { var a = "", r = arguments.callee.caller; if (r) { for (var s, c = []; r;)s = r, c.push(s.toString().replace(/[\t\n\r]/g, "")), r = r.caller; a = "; 鍫嗘爤锛�" + c.join(" --\x3e ") } e += a } catch (c) { } t("error", { msg: e, url: n, line: i, column: o }) }, $(document).on("ajaxBeforeSend", function (e, t, n) { t.cgiData = { startTime: e.timeStamp } }).on("ajaxSuccess", function (e, t, n, i) { t.cgiData.response = i }).on("ajaxError", function (e, t, n, i) { t.cgiData.responseError = i.toString() }).on("ajaxComplete", function (e, n, i) { n.cgiData.request = i, n.cgiData.status = n.status || "", n.cgiData.costTime = e.timeStamp - n.cgiData.startTime, n.cgiData.response = n.cgiData.response || n.response || "", n.cgiData.referer = location.href, t("cgi", n.cgiData) }), e = !0) }, report: function (n, i) { e && t(n, i) } } }(), 1 == M.getParam("logmode") && M.webLog.init(), 1 == M.getParam("debugswitch") && M.loadUrl(location.protocol + "//y.gtimg.cn/music/h5/lib/js/module/debug.js?max_age=2592000", function () { }), window.addEventListener("load", function () { $.browser.music && M.compare($.browser.appVer, "10.0") >= 0 && M.client.open("debug", "loaded") }), function (e) { var t = { _css: function () { $("<style>").html(".qui_loading{position:relative;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;height:55px;}.qui_loading__bd{-webkit-box-flex:1;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;width:100%;pointer-events:auto;}.qui_loading__box{display:-webkit-box;-webkit-box-align:center;}.qui_loading__icon{display:block;width:16px;height:16px;margin-right:5px;background:currentColor;-webkit-mask-image:url(http://y.gtimg.cn/mediastyle/mod/mobile/img/system_loading.svg);}.qui_loading__text{display:block;font-size:14px;}/* 鏁村睆 */.qui_loading--full{position:fixed;left:0;top:0;z-index:100;-webkit-box-orient:vertical;width:100%;height:100%;pointer-events:none;}/* 閬僵 */.qui_loading--mask .qui_loading__box{-webkit-box-orient:vertical;padding:20px 20px 16px;border-radius:5px;background:rgba(0,0,0,.8);}.qui_loading--mask .qui_loading__icon{width:28px;height:28px;margin:0 auto 11px;color:#fff;}.qui_loading--mask .qui_loading__text{font-size:16px;color:#fff;}").appendTo(document.head), delete t._css }, hide: function () { $("#js_music_mod_loading").remove() }, show: function (n) { t._css && t._css(), null == (n = n || null) ? n = { message: "姝ｅ湪杞藉叆..." } : e.isObject(n) || (n = { message: "" + n }), n.duration && n.duration > 0 && setTimeout(function () { t.hide() }, n.duration); var i = '<div class="qui_loading qui_loading--full qui_loading--mask" id="js_music_mod_loading"><div class="qui_loading__bd"><div class="qui_loading__box"><i class="qui_loading__icon c_txt2"></i><span class="qui_loading__text c_txt2">' + (n.message || "姝ｅ湪杞藉叆...") + "</span></div></div></div>"; return $(i).appendTo(document.body) } }; e.loading = t }(M)
} catch (e) {
    !function () {
        var t = new Image; t.src = location.protocol + "//stat.y.qq.com/monitor/report_err?msg=" + e + "&file=" + encodeURIComponent("https://imgcache.gtimg.cn/music/h5/lib/js/music-1.0.min.js"), t.onload = function () { t = null }
    }()
}