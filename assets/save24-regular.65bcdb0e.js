var p = Object.defineProperty,
    f = Object.defineProperties;
var v = Object.getOwnPropertyDescriptors;
var a = Object.getOwnPropertySymbols;
var b = Object.prototype.hasOwnProperty,
    g = Object.prototype.propertyIsEnumerable;
var c = (t, e, n) => e in t ? p(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n,
    i = (t, e) => {
        for (var n in e || (e = {})) b.call(e, n) && c(t, n, e[n]);
        if (a)
            for (var n of a(e)) g.call(e, n) && c(t, n, e[n]);
        return t
    },
    d = (t, e) => f(t, v(e));
import {
    o,
    c as _,
    e as s,
    j as A,
    k as z,
    l as M,
    a3 as r,
    b as w,
    D as y,
    a as C,
    a5 as x,
    H as D
} from "./app.e27838e5.js";
(function() {
    try {
        var t = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            e = new Error().stack;
        e && (t._sentryDebugIds = t._sentryDebugIds || {}, t._sentryDebugIds[e] = "38f4c603-53a3-4281-b9bd-37e7df5cbb8f", t._sentryDebugIdIdentifier = "sentry-dbid-38f4c603-53a3-4281-b9bd-37e7df5cbb8f")
    } catch {}
})();
const B = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 24 24",
        width: "1.2em",
        height: "1.2em"
    },
    V = s("path", {
        fill: "currentColor",
        d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm6.918 6h-3.215a49.088 49.088 0 0 0-.565-3.357A8.048 8.048 0 0 1 18.918 8zm-5.904-3.928c.068.352.387 2.038.645 3.928h-3.318c.258-1.89.577-3.576.645-3.928C11.319 4.029 11.656 4 12 4s.681.029 1.014.072zM14 12c0 .598-.043 1.286-.109 2h-3.782c-.066-.714-.109-1.402-.109-2s.043-1.286.109-2h3.782c.066.714.109 1.402.109 2zM8.862 4.643A49.088 49.088 0 0 0 8.297 8H5.082a8.048 8.048 0 0 1 3.78-3.357zM4.263 10h3.821C8.033 10.668 8 11.344 8 12s.033 1.332.085 2H4.263C4.097 13.359 4 12.692 4 12s.098-1.359.263-2zm.819 6h3.215c.188 1.424.42 2.65.565 3.357A8.048 8.048 0 0 1 5.082 16zm5.904 3.928A77.282 77.282 0 0 1 10.341 16h3.318a78.303 78.303 0 0 1-.645 3.928c-.333.043-.67.072-1.014.072s-.681-.029-1.014-.072zm4.152-.571c.145-.707.377-1.933.565-3.357h3.215a8.048 8.048 0 0 1-3.78 3.357zM19.737 14h-3.821c.051-.668.084-1.344.084-2s-.033-1.332-.085-2h3.821c.166.641.264 1.308.264 2s-.097 1.359-.263 2z"
    }, null, -1),
    k = [V];

function I(t, e) {
    return o(), _("svg", B, k)
}
var H = {
    name: "gridicons-domains",
    render: I
};
const S = s("span", null, "Customize Domain", -1),
    Y = {
        name: "DomainSettingsButton",
        props: {
            size: {
                type: String,
                default: "sm"
            }
        },
        setup(t) {
            const e = A(d(i({}, z), {
                    loader: () => M(() =>
                        import ("./DomainSettings.60841658.js"), ["assets/DomainSettings.60841658.js", "assets/app.e27838e5.js", "assets/app.a1b72515.css", "assets/UiHeading.6d814843.js", "assets/index.907e950c.js", "assets/copy-bold.61929160.js", "assets/set.45204d52.js", "assets/_assignValue.893c69e5.js", "assets/UpgradeNotice.938cdef8.js", "assets/access-machine.349d1b5c.js"])
                })),
                n = r("openAuthModal"),
                l = r("siteService"),
                m = () => {
                    x({
                        name: "custom-domain",
                        contentClasses: "w-full max-w-3xl"
                    }, {
                        default: {
                            component: e,
                            bind: {
                                openAuthModal: n,
                                siteService: l
                            }
                        }
                    })
                };
            return (j, N) => {
                const h = H,
                    u = D;
                return o(), w(u, {
                    theme: "brand-link",
                    size: t.size,
                    "data-testid": "custom-domain-button",
                    onClick: m
                }, {
                    default: y(() => [C(h), S]),
                    _: 1
                }, 8, ["size"])
            }
        }
    },
    $ = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 24 24",
        width: "1.2em",
        height: "1.2em"
    },
    E = s("path", {
        fill: "currentColor",
        d: "M3 5.75A2.75 2.75 0 0 1 5.75 3h9.964a3.25 3.25 0 0 1 2.299.952l2.035 2.035c.61.61.952 1.437.952 2.299v9.964A2.75 2.75 0 0 1 18.25 21H5.75A2.75 2.75 0 0 1 3 18.25V5.75ZM5.75 4.5c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25H6v-5.25A2.25 2.25 0 0 1 8.25 12h7.5A2.25 2.25 0 0 1 18 14.25v5.25h.25c.69 0 1.25-.56 1.25-1.25V8.286c0-.465-.184-.91-.513-1.238l-2.035-2.035a1.75 1.75 0 0 0-.952-.49V7.25a2.25 2.25 0 0 1-2.25 2.25h-4.5A2.25 2.25 0 0 1 7 7.25V4.5H5.75Zm10.75 15v-5.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v5.25h9Zm-8-15v2.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75V4.5h-6Z"
    }, null, -1),
    Z = [E];

function R(t, e) {
    return o(), _("svg", $, Z)
}
var G = {
    name: "fluent-save24-regular",
    render: R
};
export {
    Y as _, G as a, H as b
};
//# sourceMappingURL=save24-regular.65bcdb0e.js.map