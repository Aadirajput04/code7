var pe = Object.defineProperty,
    me = Object.defineProperties;
var fe = Object.getOwnPropertyDescriptors;
var L = Object.getOwnPropertySymbols;
var Z = Object.prototype.hasOwnProperty,
    Q = Object.prototype.propertyIsEnumerable;
var X = (e, t, n) => t in e ? pe(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n,
    d = (e, t) => {
        for (var n in t || (t = {})) Z.call(t, n) && X(e, n, t[n]);
        if (L)
            for (var n of L(t)) Q.call(t, n) && X(e, n, t[n]);
        return e
    },
    R = (e, t) => me(e, fe(t));
var T = (e, t) => {
    var n = {};
    for (var s in e) Z.call(e, s) && t.indexOf(s) < 0 && (n[s] = e[s]);
    if (e != null && L)
        for (var s of L(e)) t.indexOf(s) < 0 && Q.call(e, s) && (n[s] = e[s]);
    return n
};
import {
    x as U,
    at as D,
    q as C,
    p as F,
    t as M,
    au as K,
    N as oe,
    av as re,
    h,
    a3 as B,
    aw as ye,
    ax as ee,
    ay as ge,
    I as V,
    az as te,
    a8 as he,
    a9 as _e,
    aj as H,
    ae as be,
    aA as ve,
    aB as xe,
    aC as ke,
    aD as Ce,
    aa as Se,
    ab as we,
    a7 as Ee,
    w as Pe,
    o as m,
    c as b,
    a as x,
    D as v,
    b as N,
    d as E,
    E as A,
    y as k,
    e as u,
    F as se,
    J as ne,
    aE as Oe,
    H as Re,
    a4 as Ne
} from "./app.e27838e5.js";
import {
    _ as Ue
} from "./check.a548b91d.js";
import {
    _ as De
} from "./planet-ring2-line.eb2bb610.js";
import {
    _ as $e
} from "./UiHeading.6d814843.js";
import "./index.907e950c.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            t = new Error().stack;
        t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "be46e825-bd26-4db3-a446-ebd898a06c8d", e._sentryDebugIdIdentifier = "sentry-dbid-be46e825-bd26-4db3-a446-ebd898a06c8d")
    } catch {}
})();
var le = (e => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(le || {});
let Ie = U({
    name: "Hidden",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        features: {
            type: Number,
            default: 1
        }
    },
    setup(e, {
        slots: t,
        attrs: n
    }) {
        return () => {
            let l = e,
                {
                    features: s
                } = l,
                o = T(l, ["features"]),
                a = {
                    "aria-hidden": (s & 2) === 2 ? !0 : void 0,
                    style: d({
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        borderWidth: "0"
                    }, (s & 4) === 4 && (s & 2) !== 2 && {
                        display: "none"
                    })
                };
            return D({
                props: d(d({}, o), a),
                slot: {},
                attrs: n,
                slots: t,
                name: "Hidden"
            })
        }
    }
});

function Le(e) {
    var t;
    let n = (t = e == null ? void 0 : e.form) != null ? t : e.closest("form");
    if (n) {
        for (let s of n.elements)
            if (s.tagName === "INPUT" && s.type === "submit" || s.tagName === "BUTTON" && s.type === "submit" || s.nodeName === "INPUT" && s.type === "image") {
                s.click();
                return
            }
    }
}
let ie = Symbol("DescriptionContext");

function Te() {
    let e = B(ie, null);
    if (e === null) throw new Error("Missing parent");
    return e
}

function He({
    slot: e = C({}),
    name: t = "Description",
    props: n = {}
} = {}) {
    let s = C([]);

    function o(a) {
        return s.value.push(a), () => {
            let l = s.value.indexOf(a);
            l !== -1 && s.value.splice(l, 1)
        }
    }
    return F(ie, {
        register: o,
        slot: e,
        name: t,
        props: n
    }), M(() => s.value.length > 0 ? s.value.join(" ") : void 0)
}
let bt = U({
        name: "Description",
        props: {
            as: {
                type: [Object, String],
                default: "p"
            }
        },
        setup(e, {
            attrs: t,
            slots: n
        }) {
            let s = Te(),
                o = `headlessui-description-${K()}`;
            return oe(() => re(s.register(o))), () => {
                let {
                    name: a = "Description",
                    slot: l = C({}),
                    props: f = {}
                } = s, i = e, c = R(d({}, Object.entries(f).reduce((y, [_, g]) => Object.assign(y, {
                    [_]: h(g)
                }), {})), {
                    id: o
                });
                return D({
                    props: d(d({}, i), c),
                    slot: l.value,
                    attrs: t,
                    slots: n,
                    name: a
                })
            }
        }
    }),
    ce = Symbol("LabelContext");

function ue() {
    let e = B(ce, null);
    if (e === null) {
        let t = new Error("You used a <Label /> component, but it is not inside a parent.");
        throw Error.captureStackTrace && Error.captureStackTrace(t, ue), t
    }
    return e
}

function Ae({
    slot: e = {},
    name: t = "Label",
    props: n = {}
} = {}) {
    let s = C([]);

    function o(a) {
        return s.value.push(a), () => {
            let l = s.value.indexOf(a);
            l !== -1 && s.value.splice(l, 1)
        }
    }
    return F(ce, {
        register: o,
        slot: e,
        name: t,
        props: n
    }), M(() => s.value.length > 0 ? s.value.join(" ") : void 0)
}
let Be = U({
        name: "Label",
        props: {
            as: {
                type: [Object, String],
                default: "label"
            },
            passive: {
                type: [Boolean],
                default: !1
            }
        },
        setup(e, {
            slots: t,
            attrs: n
        }) {
            let s = ue(),
                o = `headlessui-label-${K()}`;
            return oe(() => re(s.register(o))), () => {
                let {
                    name: a = "Label",
                    slot: l = {},
                    props: f = {}
                } = s, g = e, {
                    passive: i
                } = g, c = T(g, ["passive"]), y = R(d({}, Object.entries(f).reduce((P, [p, S]) => Object.assign(P, {
                    [p]: h(S)
                }), {})), {
                    id: o
                }), _ = d(d({}, c), y);
                return i && delete _.onClick, D({
                    props: _,
                    slot: l,
                    attrs: n,
                    slots: t,
                    name: a
                })
            }
        }
    }),
    de = Symbol("GroupContext"),
    je = U({
        name: "SwitchGroup",
        props: {
            as: {
                type: [Object, String],
                default: "template"
            }
        },
        setup(e, {
            slots: t,
            attrs: n
        }) {
            let s = C(null),
                o = Ae({
                    name: "SwitchLabel",
                    props: {
                        onClick() {
                            !s.value || (s.value.click(), s.value.focus({
                                preventScroll: !0
                            }))
                        }
                    }
                }),
                a = He({
                    name: "SwitchDescription"
                });
            return F(de, {
                switchRef: s,
                labelledby: o,
                describedby: a
            }), () => D({
                props: e,
                slot: {},
                slots: t,
                attrs: n,
                name: "SwitchGroup"
            })
        }
    }),
    Ve = U({
        name: "Switch",
        emits: {
            "update:modelValue": e => !0
        },
        props: {
            as: {
                type: [Object, String],
                default: "button"
            },
            modelValue: {
                type: Boolean,
                default: !1
            },
            name: {
                type: String,
                optional: !0
            },
            value: {
                type: String,
                optional: !0
            }
        },
        inheritAttrs: !1,
        setup(e, {
            emit: t,
            attrs: n,
            slots: s,
            expose: o
        }) {
            let a = B(de, null),
                l = `headlessui-switch-${K()}`;

            function f() {
                t("update:modelValue", !e.modelValue)
            }
            let i = C(null),
                c = a === null ? i : a.switchRef,
                y = ye(M(() => ({
                    as: e.as,
                    type: n.type
                })), c);
            o({
                el: c,
                $el: c
            });

            function _(p) {
                p.preventDefault(), f()
            }

            function g(p) {
                p.key === te.Space ? (p.preventDefault(), f()) : p.key === te.Enter && Le(p.currentTarget)
            }

            function P(p) {
                p.preventDefault()
            }
            return () => {
                let O = e,
                    {
                        name: p,
                        value: S,
                        modelValue: w
                    } = O,
                    $ = T(O, ["name", "value", "modelValue"]),
                    I = {
                        checked: w
                    },
                    r = {
                        id: l,
                        ref: c,
                        role: "switch",
                        type: y.value,
                        tabIndex: 0,
                        "aria-checked": w,
                        "aria-labelledby": a == null ? void 0 : a.labelledby.value,
                        "aria-describedby": a == null ? void 0 : a.describedby.value,
                        onClick: _,
                        onKeyup: g,
                        onKeypress: P
                    };
                return ee(V, [p != null && w != null ? ee(Ie, ge({
                    features: le.Hidden,
                    as: "input",
                    type: "checkbox",
                    hidden: !0,
                    readOnly: !0,
                    checked: w,
                    name: p,
                    value: S
                })) : null, D({
                    props: d(d(d({}, n), $), r),
                    slot: I,
                    attrs: n,
                    slots: s,
                    name: "Switch"
                })])
            }
        }
    }),
    ae = Be;
var Fe = {
    usd: "$",
    eur: "\u20AC",
    aud: "$"
};
const Me = {
    errors: [],
    currency: "usd",
    interval: "month",
    plans: {}
};
var Ke = he({
    id: "planSelector",
    initial: "loading",
    context: d({}, Me),
    states: {
        loading: {
            invoke: {
                src: "getPlans"
            },
            on: {
                SUCCESS: {
                    target: "#ready",
                    actions: ["assignPlans", {
                        type: "analyticsTrackEvent",
                        analyticsEvent: "ViewPlans"
                    }, "assignFilteredPlans"]
                },
                ERROR: {
                    target: "#error",
                    actions: "assignErrors"
                }
            }
        },
        ready: {
            id: "ready",
            on: {
                BILLING_PERIOD_CHANGE: {
                    actions: ["assignInterval", "assignFilteredPlans"]
                },
                CURRENCY_CHANGE: {
                    actions: ["assignCurrency", "assignFilteredPlans"]
                },
                PLAN_SELECTED: {
                    target: "#checkout"
                }
            }
        },
        checkout: {
            id: "checkout",
            invoke: {
                src: "checkout"
            },
            on: {
                CHECKOUT_SUCCESS: {
                    target: "#success",
                    actions: [{
                        type: "analyticsTrackEvent",
                        analyticsEvent: "Checkout"
                    }, "redirectToCheckoutUrl"]
                },
                CHECKOUT_ERROR: {
                    target: "#error",
                    actions: "assignErrors"
                }
            }
        },
        success: {
            id: "success",
            type: "final"
        },
        error: {
            id: "error"
        }
    }
}, {
    actions: R(d({}, _e), {
        assignCurrency: H((e, {
            currency: t
        }) => ({
            currency: t
        })),
        assignInterval: H((e, {
            annualBilling: t
        }) => ({
            interval: t ? "year" : "month"
        })),
        assignFilteredPlans: H(({
            plans: e,
            currency: t,
            interval: n
        }) => {
            const s = e.map(a => {
                var _;
                const l = (_ = a == null ? void 0 : a.prices) == null ? void 0 : _.filter(g => g.currency === t && g.interval === n),
                    f = be(a, "metadata.position", "10"),
                    [i] = l,
                    c = n === "year" ? (i == null ? void 0 : i.interval_count) * 12 : (i == null ? void 0 : i.interval_count) * 1,
                    y = parseFloat((i == null ? void 0 : i.unit_amount) / 100 / c).toFixed(2);
                return i && (i.prettyPrice = `${Fe[t]||"$"}${y}`), R(d({}, a), {
                    price: i,
                    position: ve(f)
                })
            });
            return {
                filteredPlans: xe(s, "position")
            }
        }),
        assignPlans: H((e, {
            plans: t
        }) => ({
            plans: t
        }))
    }),
    services: {
        checkout: (e, {
            planId: t,
            priceId: n
        }) => async s => {
            let o;
            const a = l => {
                const {
                    error: f,
                    url: i
                } = l.data();
                f && (s({
                    type: "CHECKOUT_ERROR",
                    error: new Error(`An error occured: ${f.message}`)
                }), typeof o == "function" && o()), i && (s({
                    type: "CHECKOUT_SUCCESS",
                    url: i
                }), typeof o == "function" && o())
            };
            try {
                o = await ke({
                    planId: t,
                    priceId: n,
                    snapShotCallback: a
                })
            } catch (l) {
                console.log(l), s({
                    type: "CHECKOUT_ERROR",
                    error: l
                })
            }
        },
        getPlans: () => async e => {
            try {
                const t = await Ce();
                e({
                    type: "SUCCESS",
                    plans: t
                })
            } catch (t) {
                e({
                    type: "ERROR",
                    error: t
                }), console.error(t)
            }
        }
    }
});
const Ge = {
        "data-testid": "plan-selector"
    },
    Ye = {
        key: 1,
        class: "flex flex-col items-center space-y-6 relative"
    },
    ze = A(" Choose a plan "),
    qe = u("span", {
        class: "text-sm font-medium text-gray-900"
    }, "Monthly billing ", -1),
    Je = u("span", {
        class: "text-sm font-medium text-gray-900"
    }, "Annual billing ", -1),
    We = u("span", {
        class: "text-sm font-medium text-brand-primary"
    }, "(20% off)", -1),
    Xe = {
        class: "max-w-2xl mx-auto px-4 space-y-12 space-x sm:px-6 lg:max-w-5xl lg:space-y-0 lg:px-2 lg:grid lg:grid-cols-2 lg:gap-x-8 pt-5"
    },
    Ze = {
        class: "flex-1 text-left"
    },
    Qe = {
        class: "text-xl font-semibold text-gray-900 text-left"
    },
    et = {
        class: "mt-4 flex items-baseline text-gray-900"
    },
    tt = {
        class: "text-5xl font-extrabold tracking-tight"
    },
    st = u("span", {
        class: "ml-1 text-slate-400"
    }, "/", -1),
    nt = u("span", {
        class: "ml-1 text-xl font-semibold"
    }, "month", -1),
    at = {
        class: "text-sm text-slate-400 mt-1"
    },
    ot = {
        key: 0
    },
    rt = {
        key: 1
    },
    lt = {
        key: 2
    },
    it = {
        key: 0,
        class: "text-sm text-brand-primary mt-1"
    },
    ct = {
        class: "mt-6 text-gray-500"
    },
    ut = {
        role: "list",
        class: "mt-6 space-y-6"
    },
    dt = {
        class: "ml-3 text-gray-500"
    },
    pt = {
        class: "mt-8 text-center"
    },
    vt = {
        name: "PlanSelector",
        props: {
            openAuthModal: {
                type: Function,
                default: null
            },
            heading: {
                type: String,
                default: null
            },
            showCurrencies: {
                type: Boolean,
                default: !0
            }
        },
        setup(e) {
            const t = e;
            B("firebaseAuth");
            const {
                state: n,
                send: s
            } = Se(Ke, "PlanSelector"), o = C(!1), a = we(() => {
                var c;
                switch ((c = n == null ? void 0 : n.value) == null ? void 0 : c.value) {
                    case "loading":
                        return "Loading plans...";
                    case "checkout":
                        return "Loading checkout...";
                    case "success":
                        return "Redirecting checkout..."
                }
            }), l = Ee();
            Pe(o, c => {
                s({
                    type: "BILLING_PERIOD_CHANGE",
                    annualBilling: c
                })
            });
            const f = (c, y) => {
                    s({
                        type: "PLAN_SELECTED",
                        planId: c,
                        priceId: y
                    })
                },
                i = async () => {
                    t == null || t.openAuthModal()
                };
            return (c, y) => {
                const _ = Oe,
                    g = $e,
                    P = De,
                    p = Ue,
                    S = Re,
                    w = Ne;
                return m(), b("div", Ge, [x(w, null, {
                    default: v(() => {
                        var $, I;
                        return [
                            ["loading", "checkout", "success"].some(h(n).matches) ? (m(), N(_, {
                                key: 0,
                                label: h(a)
                            }, null, 8, ["label"])) : E("", !0), h(n).matches("ready") ? (m(), b("div", Ye, [e.heading ? (m(), N(g, {
                                key: 0,
                                level: 2
                            }, {
                                default: v(() => [A(k(e.heading), 1)]),
                                _: 1
                            })) : (m(), N(g, {
                                key: 1,
                                level: 2
                            }, {
                                icon: v(() => [x(P)]),
                                default: v(() => [ze]),
                                _: 1
                            })), u("div", null, [x(h(je), {
                                as: "div",
                                class: "flex items-center space-x-3"
                            }, {
                                default: v(() => [x(h(ae), {
                                    as: "span"
                                }, {
                                    default: v(() => [qe]),
                                    _: 1
                                }), x(h(Ve), {
                                    modelValue: o.value,
                                    "onUpdate:modelValue": y[0] || (y[0] = r => o.value = r),
                                    class: se(["relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", [o.value ? "bg-primary" : "bg-gray-200"]])
                                }, {
                                    default: v(() => [u("span", {
                                        "aria-hidden": "true",
                                        class: se([o.value ? "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"])
                                    }, null, 2)]),
                                    _: 1
                                }, 8, ["modelValue", "class"]), x(h(ae), {
                                    as: "span"
                                }, {
                                    default: v(() => [Je, We]),
                                    _: 1
                                })]),
                                _: 1
                            })]), u("div", Xe, [(m(!0), b(V, null, ne((I = ($ = h(n)) == null ? void 0 : $.context) == null ? void 0 : I.filteredPlans, r => {
                                var O, G, Y, z, q, J;
                                return m(), b("div", {
                                    key: r.name,
                                    class: "relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
                                }, [u("div", Ze, [u("h3", Qe, k(r.name), 1), u("p", et, [u("span", tt, k((O = r == null ? void 0 : r.price) == null ? void 0 : O.prettyPrice), 1), st, nt]), u("p", at, [((G = r.price) == null ? void 0 : G.interval) === "month" ? (m(), b("span", ot, "(billed every month)")) : E("", !0), ((Y = r.price) == null ? void 0 : Y.interval) === "year" ? (m(), b("span", rt, "(billed every 12 months)")) : (m(), b("span", lt, "\xA0"))]), ((z = r.price) == null ? void 0 : z.interval) === "year" ? (m(), b("p", it, " You saved with annual billing \u{1F389} ")) : E("", !0), u("p", ct, k(r == null ? void 0 : r.description), 1), u("ul", ut, [(m(!0), b(V, null, ne((J = (q = r == null ? void 0 : r.metadata) == null ? void 0 : q.features) == null ? void 0 : J.split(","), j => (m(), b("li", {
                                    key: j,
                                    class: "flex"
                                }, [x(p, {
                                    class: "flex-shrink-0 w-6 h-6 text-emerald",
                                    "aria-hidden": "true"
                                }), u("span", dt, k(j), 1)]))), 128))])]), u("div", pt, [h(l) ? (m(), N(S, {
                                    key: 0,
                                    theme: "brand-primary",
                                    onClick: j => {
                                        var W;
                                        return f(r == null ? void 0 : r.id, (W = r == null ? void 0 : r.price) == null ? void 0 : W.id)
                                    }
                                }, {
                                    default: v(() => [A(" Select " + k(r.name) + " Plan ", 1)]),
                                    _: 2
                                }, 1032, ["onClick"])) : E("", !0), !h(l) && e.openAuthModal ? (m(), N(S, {
                                    key: 1,
                                    theme: "brand-primary",
                                    onClick: i
                                }, {
                                    default: v(() => [A(" Select " + k(r.name) + " Plan ", 1)]),
                                    _: 2
                                }, 1024)) : E("", !0)])])
                            }), 128))])])) : E("", !0)
                        ]
                    }),
                    _: 1
                })])
            }
        }
    };
export {
    vt as
    default
};
//# sourceMappingURL=PlanSelector.4a86a2ca.js.map