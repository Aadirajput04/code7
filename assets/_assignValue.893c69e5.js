import {
    aK as a,
    aL as t
} from "./app.e27838e5.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            r = new Error().stack;
        r && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[r] = "65b1e74e-57f6-406a-18ea-750fef844bfe", e._sentryDebugIdIdentifier = "sentry-dbid-65b1e74e-57f6-406a-18ea-750fef844bfe")
    } catch {}
})();

function s(e, r, n) {
    r == "__proto__" && a ? a(e, r, {
        configurable: !0,
        enumerable: !0,
        value: n,
        writable: !0
    }) : e[r] = n
}
var o = Object.prototype,
    i = o.hasOwnProperty;

function u(e, r, n) {
    var f = e[r];
    (!(i.call(e, r) && t(f, n)) || n === void 0 && !(r in e)) && s(e, r, n)
}
export {
    u as a, s as b
};
//# sourceMappingURL=_assignValue.893c69e5.js.map