import {
    o as s,
    c as i,
    r as d,
    a as f,
    t as m,
    d as g,
    g as r,
    w as h,
    m as p,
    h as _,
    i as b
} from "./runtime-core.esm-bundler.4816885f.js"; /* empty css                       */
const y = "/img/mixo-logo.svg",
    c = (e, o) => {
        const t = e.__vccOpts || e;
        for (const [n, a] of o) t[n] = a;
        return t
    },
    C = {
        name: "UiLoader",
        props: {
            label: {
                type: String,
                default: "Loading..."
            }
        }
    },
    x = {
        class: "flex items-center space-x-2"
    },
    k = f("img", {
        class: "w-auto h-4 animate-spin",
        src: y,
        alt: "Mixo logo"
    }, null, -1),
    B = {
        key: 0
    };

function S(e, o, t, n, a, l) {
    return s(), i("div", x, [k, d(e.$slots, "default", {}, () => [t.label ? (s(), i("span", B, m(t.label), 1)) : g("", !0)])])
}
const $ = c(C, [
        ["render", S]
    ]),
    L = {
        props: {
            danger: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            loading: {
                type: Boolean,
                default: !1
            },
            loadingLabel: {
                type: String,
                default: ""
            },
            loadingClass: {
                type: String,
                default: "text-white"
            },
            size: {
                type: String,
                default: "base"
            },
            theme: {
                type: String,
                default: "primary"
            },
            to: {
                type: String,
                default: ""
            }
        },
        components: {
            UiLoader: $
        },
        data() {
            return {
                classObject: {
                    [`ui-button-${this.size}`]: this.size,
                    [`ui-button-${this.theme}`]: this.theme,
                    "ui-button-danger": this.danger
                },
                loaderClassObject: {
                    [`ui-loader-${this.theme}`]: this.theme
                }
            }
        },
        computed: {
            is() {
                return this ? .$attrs ? .href ? "a" : this ? .$props ? .to ? "router-link" : "button"
            },
            type() {
                return this ? .$attrs ? .type ? this ? .$attrs ? .type : this ? .is === "button" ? "button" : null
            }
        }
    };

function v(e, o, t, n, a, l) {
    const u = b("UiLoader");
    return s(), r(_(l.is), p({
        to: t.to,
        class: ["ui-button", a.classObject]
    }, e.$attrs, {
        type: l.type,
        disabled: t.loading || t.disabled
    }), {
        default: h(() => [t.loading ? (s(), r(u, {
            key: 0,
            textColorClass: t.loadingClass,
            iconColorClass: t.loadingClass,
            label: t.loadingLabel
        }, null, 8, ["textColorClass", "iconColorClass", "label"])) : d(e.$slots, "default", {
            key: 1
        })]),
        _: 3
    }, 16, ["to", "class", "type", "disabled"])
}
const O = c(L, [
    ["render", v]
]);
export {
    O as U, y as _
};