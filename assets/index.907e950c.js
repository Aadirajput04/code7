import {
    s as $,
    S as D,
    T as N,
    q as E,
    U as I,
    V as B,
    h as w,
    w as S
} from "./app.e27838e5.js";
(function() {
    try {
        var n = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            e = new Error().stack;
        e && (n._sentryDebugIds = n._sentryDebugIds || {}, n._sentryDebugIds[e] = "0ae1462f-715c-4984-3971-b28b472ba7c3", n._sentryDebugIdIdentifier = "sentry-dbid-0ae1462f-715c-4984-3971-b28b472ba7c3")
    } catch {}
})();
var A = Object.defineProperty,
    j = Object.defineProperties,
    x = Object.getOwnPropertyDescriptors,
    v = Object.getOwnPropertySymbols,
    C = Object.prototype.hasOwnProperty,
    U = Object.prototype.propertyIsEnumerable,
    _ = (n, e, t) => e in n ? A(n, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : n[e] = t,
    V = (n, e) => {
        for (var t in e || (e = {})) C.call(e, t) && _(n, t, e[t]);
        if (v)
            for (var t of v(e)) U.call(e, t) && _(n, t, e[t]);
        return n
    },
    q = (n, e) => j(n, x(e));

function k(n, e) {
    var t;
    const i = $();
    return D(() => {
        i.value = n()
    }, q(V({}, e), {
        flush: (t = e == null ? void 0 : e.flush) != null ? t : "sync"
    })), N(i)
}

function z() {
    const n = [],
        e = o => {
            const s = n.indexOf(o);
            s !== -1 && n.splice(s, 1)
        };
    return {
        on: o => (n.push(o), {
            off: () => e(o)
        }),
        off: e,
        trigger: o => {
            n.forEach(s => s(o))
        }
    }
}

function F(n) {
    return I() ? (B(n), !0) : !1
}
var h;
const b = typeof window != "undefined";
b && ((h = window == null ? void 0 : window.navigator) == null ? void 0 : h.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function H(n, e = !1, t = "Timeout") {
    return new Promise((i, o) => {
        setTimeout(e ? () => o(t) : i, n)
    })
}

function G(n, ...e) {
    return e.some(t => t in n)
}

function J(n) {
    let e = !1;

    function t(r, {
        flush: u = "sync",
        deep: a = !1,
        timeout: c,
        throwOnTimeout: P
    } = {}) {
        let f = null;
        const g = [new Promise(O => {
            f = S(n, T => {
                r(T) === !e && (f == null || f(), O())
            }, {
                flush: u,
                deep: a,
                immediate: !0
            })
        })];
        return c && g.push(H(c, P).finally(() => {
            f == null || f()
        })), Promise.race(g)
    }

    function i(r, u) {
        return t(a => a === w(r), u)
    }

    function o(r) {
        return t(u => Boolean(u), r)
    }

    function s(r) {
        return i(null, r)
    }

    function l(r) {
        return i(void 0, r)
    }

    function d(r) {
        return t(Number.isNaN, r)
    }

    function p(r, u) {
        return t(a => {
            const c = Array.from(a);
            return c.includes(r) || c.includes(w(r))
        }, u)
    }

    function m(r) {
        return y(1, r)
    }

    function y(r = 1, u) {
        let a = -1;
        return t(() => (a += 1, a >= r), u)
    }
    return Array.isArray(w(n)) ? {
        toMatch: t,
        toContains: p,
        changed: m,
        changedTimes: y,
        get not() {
            return e = !e, this
        }
    } : {
        toMatch: t,
        toBe: i,
        toBeTruthy: o,
        toBeNull: s,
        toBeNaN: d,
        toBeUndefined: l,
        changed: m,
        changedTimes: y,
        get not() {
            return e = !e, this
        }
    }
}

function K(n, e, t = {}) {
    const {
        immediate: i = !0
    } = t, o = E(!1);
    let s = null;

    function l() {
        s && (clearTimeout(s), s = null)
    }

    function d() {
        o.value = !1, l()
    }

    function p(...m) {
        l(), o.value = !0, s = setTimeout(() => {
            o.value = !1, s = null, n(...m)
        }, w(e))
    }
    return i && (o.value = !0, b && p()), F(d), {
        isPending: o,
        start: p,
        stop: d
    }
}
export {
    z as a, J as b, G as c, k as d, b as i, K as u
};
//# sourceMappingURL=index.907e950c.js.map