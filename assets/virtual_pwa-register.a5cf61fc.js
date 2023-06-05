(function() {
    try {
        var n = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            r = new Error().stack;
        r && (n._sentryDebugIds = n._sentryDebugIds || {}, n._sentryDebugIds[r] = "20107c5c-6e5c-49c4-eab9-8e3b762f8b92", n._sentryDebugIdIdentifier = "sentry-dbid-20107c5c-6e5c-49c4-eab9-8e3b762f8b92")
    } catch {}
})();
try {
    self["workbox:window:6.5.2"] && _()
} catch {}

function E(n, r) {
    return new Promise(function(t) {
        var o = new MessageChannel;
        o.port1.onmessage = function(u) {
            t(u.data)
        }, n.postMessage(r, [o.port2])
    })
}

function W(n, r) {
    for (var t = 0; t < r.length; t++) {
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(n, o.key, o)
    }
}

function S(n, r) {
    (r == null || r > n.length) && (r = n.length);
    for (var t = 0, o = new Array(r); t < r; t++) o[t] = n[t];
    return o
}

function k(n, r) {
    var t;
    if (typeof Symbol == "undefined" || n[Symbol.iterator] == null) {
        if (Array.isArray(n) || (t = function(u, d) {
                if (u) {
                    if (typeof u == "string") return S(u, d);
                    var f = Object.prototype.toString.call(u).slice(8, -1);
                    return f === "Object" && u.constructor && (f = u.constructor.name), f === "Map" || f === "Set" ? Array.from(u) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? S(u, d) : void 0
                }
            }(n)) || r && n && typeof n.length == "number") {
            t && (n = t);
            var o = 0;
            return function() {
                return o >= n.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: n[o++]
                }
            }
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }
    return (t = n[Symbol.iterator]()).next.bind(t)
}
try {
    self["workbox:core:6.5.2"] && _()
} catch {}
var m = function() {
    var n = this;
    this.promise = new Promise(function(r, t) {
        n.resolve = r, n.reject = t
    })
};

function b(n, r) {
    var t = location.href;
    return new URL(n, t).href === new URL(r, t).href
}
var g = function(n, r) {
    this.type = n, Object.assign(this, r)
};

function p(n, r, t) {
    return t ? r ? r(n) : n : (n && n.then || (n = Promise.resolve(n)), r ? n.then(r) : n)
}

function L() {}
var j = {
    type: "SKIP_WAITING"
};

function P(n, r) {
    if (!r) return n && n.then ? n.then(L) : Promise.resolve()
}
var I = function(n) {
    var r, t;

    function o(v, s) {
        var e, i;
        return s === void 0 && (s = {}), (e = n.call(this) || this).nn = {}, e.tn = 0, e.rn = new m, e.en = new m, e.on = new m, e.un = 0, e.an = new Set, e.cn = function() {
            var c = e.fn,
                a = c.installing;
            e.tn > 0 || !b(a.scriptURL, e.sn.toString()) || performance.now() > e.un + 6e4 ? (e.vn = a, c.removeEventListener("updatefound", e.cn)) : (e.hn = a, e.an.add(a), e.rn.resolve(a)), ++e.tn, a.addEventListener("statechange", e.ln)
        }, e.ln = function(c) {
            var a = e.fn,
                l = c.target,
                h = l.state,
                y = l === e.vn,
                w = {
                    sw: l,
                    isExternal: y,
                    originalEvent: c
                };
            !y && e.mn && (w.isUpdate = !0), e.dispatchEvent(new g(h, w)), h === "installed" ? e.wn = self.setTimeout(function() {
                h === "installed" && a.waiting === l && e.dispatchEvent(new g("waiting", w))
            }, 200) : h === "activating" && (clearTimeout(e.wn), y || e.en.resolve(l))
        }, e.dn = function(c) {
            var a = e.hn,
                l = a !== navigator.serviceWorker.controller;
            e.dispatchEvent(new g("controlling", {
                isExternal: l,
                originalEvent: c,
                sw: a,
                isUpdate: e.mn
            })), l || e.on.resolve(a)
        }, e.gn = (i = function(c) {
            var a = c.data,
                l = c.ports,
                h = c.source;
            return p(e.getSW(), function() {
                e.an.has(h) && e.dispatchEvent(new g("message", {
                    data: a,
                    originalEvent: c,
                    ports: l,
                    sw: h
                }))
            })
        }, function() {
            for (var c = [], a = 0; a < arguments.length; a++) c[a] = arguments[a];
            try {
                return Promise.resolve(i.apply(this, c))
            } catch (l) {
                return Promise.reject(l)
            }
        }), e.sn = v, e.nn = s, navigator.serviceWorker.addEventListener("message", e.gn), e
    }
    t = n, (r = o).prototype = Object.create(t.prototype), r.prototype.constructor = r, r.__proto__ = t;
    var u, d, f = o.prototype;
    return f.register = function(v) {
        var s = (v === void 0 ? {} : v).immediate,
            e = s !== void 0 && s;
        try {
            var i = this;
            return function(c, a) {
                var l = c();
                return l && l.then ? l.then(a) : a(l)
            }(function() {
                if (!e && document.readyState !== "complete") return P(new Promise(function(c) {
                    return window.addEventListener("load", c)
                }))
            }, function() {
                return i.mn = Boolean(navigator.serviceWorker.controller), i.yn = i.pn(), p(i.bn(), function(c) {
                    i.fn = c, i.yn && (i.hn = i.yn, i.en.resolve(i.yn), i.on.resolve(i.yn), i.yn.addEventListener("statechange", i.ln, {
                        once: !0
                    }));
                    var a = i.fn.waiting;
                    return a && b(a.scriptURL, i.sn.toString()) && (i.hn = a, Promise.resolve().then(function() {
                        i.dispatchEvent(new g("waiting", {
                            sw: a,
                            wasWaitingBeforeRegister: !0
                        }))
                    }).then(function() {})), i.hn && (i.rn.resolve(i.hn), i.an.add(i.hn)), i.fn.addEventListener("updatefound", i.cn), navigator.serviceWorker.addEventListener("controllerchange", i.dn), i.fn
                })
            })
        } catch (c) {
            return Promise.reject(c)
        }
    }, f.update = function() {
        try {
            return this.fn ? P(this.fn.update()) : void 0
        } catch (v) {
            return Promise.reject(v)
        }
    }, f.getSW = function() {
        return this.hn !== void 0 ? Promise.resolve(this.hn) : this.rn.promise
    }, f.messageSW = function(v) {
        try {
            return p(this.getSW(), function(s) {
                return E(s, v)
            })
        } catch (s) {
            return Promise.reject(s)
        }
    }, f.messageSkipWaiting = function() {
        this.fn && this.fn.waiting && E(this.fn.waiting, j)
    }, f.pn = function() {
        var v = navigator.serviceWorker.controller;
        return v && b(v.scriptURL, this.sn.toString()) ? v : void 0
    }, f.bn = function() {
        try {
            var v = this;
            return function(s, e) {
                try {
                    var i = s()
                } catch (c) {
                    return e(c)
                }
                return i && i.then ? i.then(void 0, e) : i
            }(function() {
                return p(navigator.serviceWorker.register(v.sn, v.nn), function(s) {
                    return v.un = performance.now(), s
                })
            }, function(s) {
                throw s
            })
        } catch (s) {
            return Promise.reject(s)
        }
    }, u = o, (d = [{
        key: "active",
        get: function() {
            return this.en.promise
        }
    }, {
        key: "controlling",
        get: function() {
            return this.on.promise
        }
    }]) && W(u.prototype, d), o
}(function() {
    function n() {
        this.Pn = new Map
    }
    var r = n.prototype;
    return r.addEventListener = function(t, o) {
        this.Sn(t).add(o)
    }, r.removeEventListener = function(t, o) {
        this.Sn(t).delete(o)
    }, r.dispatchEvent = function(t) {
        t.target = this;
        for (var o, u = k(this.Sn(t.type)); !(o = u()).done;)(0, o.value)(t)
    }, r.Sn = function(t) {
        return this.Pn.has(t) || this.Pn.set(t, new Set), this.Pn.get(t)
    }, n
}());

function R(n = {}) {
    const {
        immediate: r = !1,
        onNeedRefresh: t,
        onOfflineReady: o,
        onRegistered: u,
        onRegisterError: d
    } = n;
    let f;
    const v = async (s = !0) => {};
    return "serviceWorker" in navigator && (f = new I("/sw.js", {
        scope: "/",
        type: "classic"
    }), f.addEventListener("activated", s => {
        s.isUpdate ? window.location.reload() : o == null || o()
    }), f.register({
        immediate: r
    }).then(s => {
        u == null || u(s)
    }).catch(s => {
        d == null || d(s)
    })), v
}
export {
    R as registerSW
};
//# sourceMappingURL=virtual_pwa-register.a5cf61fc.js.map