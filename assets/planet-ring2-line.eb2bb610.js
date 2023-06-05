import {
    o,
    c,
    e as t
} from "./app.e27838e5.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            n = new Error().stack;
        n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "33760589-75cd-4cc7-64ef-7e2747e3ea4a", e._sentryDebugIdIdentifier = "sentry-dbid-33760589-75cd-4cc7-64ef-7e2747e3ea4a")
    } catch {}
})();
const r = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 24 24",
        width: "1.2em",
        height: "1.2em"
    },
    s = t("g", {
        fill: "none",
        stroke: "currentColor",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        "stroke-width": "2"
    }, [t("circle", {
        cx: "12",
        cy: "12",
        r: "7"
    }), t("path", {
        d: "M18 7.96c2.59-.125 4.379.274 4.625 1.193c.429 1.6-3.98 4.172-9.849 5.745c-5.868 1.572-10.972 1.55-11.401-.051c-.254-.948 1.188-2.236 3.625-3.455"
    })], -1),
    i = [s];

function d(e, n) {
    return o(), c("svg", r, i)
}
var _ = {
    name: "majesticons-planet-ring2-line",
    render: d
};
export {
    _
};
//# sourceMappingURL=planet-ring2-line.eb2bb610.js.map