var i = Object.defineProperty,
    c = Object.defineProperties;
var x = Object.getOwnPropertyDescriptors;
var n = Object.getOwnPropertySymbols;
var f = Object.prototype.hasOwnProperty,
    m = Object.prototype.propertyIsEnumerable;
var a = (e, t, s) => t in e ? i(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : e[t] = s,
    l = (e, t) => {
        for (var s in t || (t = {})) f.call(t, s) && a(e, s, t[s]);
        if (n)
            for (var s of n(t)) m.call(t, s) && a(e, s, t[s]);
        return e
    },
    r = (e, t) => c(e, x(t));
import {
    _ as b,
    o as g,
    b as p,
    D as h,
    a2 as d,
    e as _,
    F as y,
    K as v
} from "./app.e27838e5.js";
import {
    d as o
} from "./index.907e950c.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            t = new Error().stack;
        t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8ce7d209-186f-4920-4e8f-5db614d51a0d", e._sentryDebugIdIdentifier = "sentry-dbid-8ce7d209-186f-4920-4e8f-5db614d51a0d")
    } catch {}
})();
const C = {
    name: "UiHeading",
    props: {
        level: {
            default: 1,
            type: Number,
            validator(e) {
                return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(`h${e}`)
            }
        },
        preIconClass: {
            type: String,
            default: ""
        },
        size: {
            default: null,
            type: Number
        },
        tag: {
            default: null,
            type: String
        },
        textColorClass: {
            type: String,
            default: "text-slate-800"
        }
    },
    setup(e) {
        const t = o(() => {
            switch (e.size || e.level) {
                case 1:
                    return {
                        "font-extrabold text-3xl sm:text-4xl md:text-5xl": !0
                    };
                case 2:
                    return {
                        "font-bold text-2xl sm:text-3xl md:text-4xl": !0
                    };
                case 3:
                    return {
                        "font-semibold text-xl sm:text-2xl md:text-3xl": !0
                    };
                case 4:
                    return {
                        "font-semibold text-xl sm:text-xl md:text-2xl": !0
                    };
                case 5:
                    return {
                        "font-semibold text-base md:text-lg": !0
                    };
                case 6:
                    return {
                        "font-semibold text-base md:text-lg": !0
                    };
                default:
                    return {}
            }
        });
        return {
            classObject: o(() => r(l({}, t.value), {
                [e.textColorClass]: !0
            }))
        }
    }
};

function w(e, t, s, u, D, I) {
    return g(), p(v(s.tag || `h${s.level}`), {
        class: y(["leading-tight tracking-tight inline-flex items-center space-x-2", u.classObject]),
        "data-testid": "ui-heading"
    }, {
        default: h(() => [d(e.$slots, "icon"), _("span", null, [d(e.$slots, "default")])]),
        _: 3
    }, 8, ["class"])
}
var S = b(C, [
    ["render", w]
]);
export {
    S as _
};
//# sourceMappingURL=UiHeading.6d814843.js.map