import {
    a as g
} from "./_assignValue.893c69e5.js";
import {
    aG as o,
    aH as I,
    aI as _,
    aJ as c
} from "./app.e27838e5.js";
(function() {
    try {
        var n = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            r = new Error().stack;
        r && (n._sentryDebugIds = n._sentryDebugIds || {}, n._sentryDebugIds[r] = "e8cf3242-0897-4912-9d65-898f0a32cbb2", n._sentryDebugIdIdentifier = "sentry-dbid-e8cf3242-0897-4912-9d65-898f0a32cbb2")
    } catch {}
})();

function p(n, r, e, a) {
    if (!o(n)) return n;
    r = I(r, n);
    for (var t = -1, u = r.length, l = u - 1, d = n; d != null && ++t < u;) {
        var s = _(r[t]),
            f = e;
        if (s === "__proto__" || s === "constructor" || s === "prototype") return n;
        if (t != l) {
            var i = d[s];
            f = a ? a(i, s, d) : void 0, f === void 0 && (f = o(i) ? i : c(r[t + 1]) ? [] : {})
        }
        g(d, s, f), d = d[s]
    }
    return n
}

function v(n, r, e) {
    return n == null ? n : p(n, r, e)
}
export {
    v as s
};
//# sourceMappingURL=set.45204d52.js.map