import {
    _ as m
} from "./save24-regular.65bcdb0e.js";
import {
    o as t,
    c as o,
    e as s,
    a as f,
    y as i,
    d as a,
    b,
    a2 as y
} from "./app.e27838e5.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            r = new Error().stack;
        r && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[r] = "501d84ed-4453-4102-eef4-425576496aa8", e._sentryDebugIdIdentifier = "sentry-dbid-501d84ed-4453-4102-eef4-425576496aa8")
    } catch {}
})();
const w = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 24 24",
        width: "1.2em",
        height: "1.2em"
    },
    h = s("path", {
        fill: "currentColor",
        d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
    }, null, -1),
    x = [h];

function v(e, r) {
    return t(), o("svg", w, x)
}
var _ = {
    name: "ic-round-lock",
    render: v
};
const p = {
        class: "border border-slate-300 shadow rounded-3xl flex-1 mb-2 overflow-hidden bg-slate-50",
        "data-testid": "browser-ui"
    },
    g = {
        class: "flex flex-col sm:flex-row justify-between md:justify-start sm:space-x-2 lg:space-x-3 px-3 py-2 md:p-3 lg:p-4 border-b border-slate-200 items-center"
    },
    k = s("div", {
        class: "items-center space-x-2 md:flex hidden"
    }, [s("div", {
        class: "browser-ui-nav-control"
    }), s("div", {
        class: "browser-ui-nav-control"
    }), s("div", {
        class: "browser-ui-nav-control"
    })], -1),
    B = ["href"],
    V = {
        name: "BrowserUi",
        props: {
            isNewSite: {
                type: Boolean,
                default: !1
            },
            showCustomDomainLink: {
                type: Boolean,
                default: !0
            },
            url: {
                type: String,
                default: ""
            },
            siteId: {
                type: String,
                default: ""
            },
            theme: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        emits: ["url-click"],
        setup(e, {
            emit: r
        }) {
            return (n, l) => {
                var d;
                const c = _,
                    u = m;
                return t(), o("div", p, [s("div", g, [k, (t(), o("div", {
                    key: e.url,
                    class: "flex-1 w-full sm:w-auto lg:max-w-md lg:w-full overflow-hidden truncate p-2 md:px-3 bg-white rounded-2xl md:rounded-lg border border-slate-300 flex justify-center md:justify-start text-slate-500 space-x-1 md:space-x-1.5 text-sm md:text-base lg:flex-none"
                }, [f(c, {
                    class: "w-4 mt-0.5 text-slate-300"
                }), e.url ? (t(), o("a", {
                    key: 0,
                    href: e.url,
                    target: "_blank",
                    title: "View website"
                }, i((d = e.url) == null ? void 0 : d.replace("https://", "")), 9, B)) : a("", !0), e.url ? a("", !0) : (t(), o("button", {
                    key: 1,
                    type: "button",
                    onClick: l[0] || (l[0] = S => n.$emit("url-click")),
                    class: "text-slate-400 hover:text-brand-primary"
                }, i(e.isNewSite ? "Save and customize your site" : "Publish to see your url and to share") + "\u2026 ", 1))])), e.url && e.showCustomDomainLink ? (t(), b(u, {
                    key: 0
                })) : a("", !0)]), y(n.$slots, "default")])
            }
        }
    };
export {
    V as _
};
//# sourceMappingURL=BrowserUi.f4994d26.js.map