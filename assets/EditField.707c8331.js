import {
    o as l,
    c as r,
    e as t,
    aF as b,
    r as x,
    h as c,
    b as y,
    D as m,
    a as s,
    a2 as w
} from "./app.e27838e5.js";
import {
    a as $
} from "./save24-regular.65bcdb0e.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            n = new Error().stack;
        n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "7718e036-cae4-4414-aae1-cc12c0e4e99a", e._sentryDebugIdIdentifier = "sentry-dbid-7718e036-cae4-4414-aae1-cc12c0e4e99a")
    } catch {}
})();
const L = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 20 20",
        width: "1.2em",
        height: "1.2em"
    },
    S = t("path", {
        fill: "currentColor",
        d: "M16.998 7v2.002a2.86 2.86 0 0 0-1.897.838l-4.83 4.829c-.409.41-.7.923-.84 1.485l-.211.845H5.5a2.5 2.5 0 0 1-2.5-2.5v-7.5h13.998Zm-2.5-4a2.5 2.5 0 0 1 2.5 2.5V6H3v-.5A2.5 2.5 0 0 1 5.5 3h8.999Zm-3.52 12.376l4.83-4.83a1.87 1.87 0 1 1 2.644 2.646l-4.829 4.828a2.197 2.197 0 0 1-1.02.578l-1.498.375a.89.89 0 0 1-1.078-1.079l.374-1.498c.097-.386.296-.739.578-1.02Z"
    }, null, -1),
    k = [S];

function C(e, n) {
    return l(), r("svg", L, k)
}
var j = {
    name: "fluent-calendar-edit20-filled",
    render: C
};
const F = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 16 16",
        width: "1.2em",
        height: "1.2em"
    },
    I = t("path", {
        fill: "currentColor",
        d: "M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708L12.707 6L9.998 3.294l.734-.734Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.632L5.4 13.06c.243-.08.463-.217.644-.398L12 6.708L9.292 4.001Z"
    }, null, -1),
    M = [I];

function B(e, n) {
    return l(), r("svg", F, M)
}
var D = {
    name: "fluent-edit16-filled",
    render: B
};
const E = {
        preserveAspectRatio: "xMidYMid meet",
        viewBox: "0 0 24 24",
        width: "1.2em",
        height: "1.2em"
    },
    Z = t("path", {
        fill: "currentColor",
        d: "m4.397 4.554l.073-.084a.75.75 0 0 1 .976-.073l.084.073L12 10.939l6.47-6.47a.75.75 0 1 1 1.06 1.061L13.061 12l6.47 6.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L12 13.061l-6.47 6.47a.75.75 0 0 1-1.06-1.061L10.939 12l-6.47-6.47a.75.75 0 0 1-.072-.976l.073-.084l-.073.084Z"
    }, null, -1),
    R = [Z];

function A(e, n) {
    return l(), r("svg", E, R)
}
var V = {
    name: "fluent-dismiss24-regular",
    render: A
};
const Y = {
        class: "flex-row-center gap-2"
    },
    H = {
        class: "flex gap-1 mx-1"
    },
    K = {
        type: "submit",
        title: "Save"
    },
    N = {
        key: 1,
        class: "flex-row-center gap-1"
    },
    z = {
        name: "EditField",
        props: {
            name: {
                type: String,
                required: !0
            },
            placeholder: {
                type: String,
                default: ""
            },
            validation: {
                type: String,
                default: ""
            },
            validationLabel: {
                type: String,
                default: ""
            },
            value: {
                type: String,
                default: ""
            }
        },
        emits: ["input"],
        setup(e, {
            emit: n
        }) {
            const o = e,
                [d, u] = b(),
                f = a => {
                    n("input", a == null ? void 0 : a[o == null ? void 0 : o.name]), d.value = !1
                };
            return (a, i) => {
                const v = $,
                    h = V,
                    _ = x("FormKit"),
                    p = D;
                return c(d) ? (l(), y(_, {
                    key: 0,
                    type: "form",
                    onSubmit: f,
                    actions: !1
                }, {
                    default: m(() => [t("div", Y, [s(_, {
                        type: "text",
                        name: e.name,
                        value: e.value,
                        placeholder: e.placeholder,
                        validation: e.validation,
                        "validation-label": e.validationLabel,
                        "outer-class": "!mb-0"
                    }, {
                        suffix: m(() => [t("div", H, [t("button", K, [s(v, {
                            class: "w-5 text-teal-500 hover:text-teal-600"
                        })]), t("button", {
                            type: "button",
                            title: "Cancel",
                            onClick: i[0] || (i[0] = g => c(u)())
                        }, [s(h, {
                            class: "w-5 text-red-400 hover:text-red-500"
                        })])])]),
                        _: 1
                    }, 8, ["name", "value", "placeholder", "validation", "validation-label"])])]),
                    _: 1
                })) : (l(), r("div", N, [w(a.$slots, "default"), t("button", {
                    type: "button",
                    onClick: i[1] || (i[1] = g => c(u)()),
                    title: "Edit"
                }, [s(p, {
                    class: "w-4 default-hover"
                })])]))
            }
        }
    };
export {
    z as _, j as a
};
//# sourceMappingURL=EditField.707c8331.js.map