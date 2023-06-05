(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            d = new Error().stack;
        d && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[d] = "65f6a902-3bcf-4651-75ed-0aedbe0afbdd", e._sentryDebugIdIdentifier = "sentry-dbid-65f6a902-3bcf-4651-75ed-0aedbe0afbdd")
    } catch {}
})();

function f(e, d) {
    var n = -1,
        t = e.length;
    for (d || (d = Array(t)); ++n < t;) d[n] = e[n];
    return d
}
export {
    f as c
};
//# sourceMappingURL=_copyArray.2183cf44.js.map