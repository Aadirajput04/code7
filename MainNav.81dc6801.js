import {
    U as fe,
    _ as De
} from "./UiButton.f2879737.js";
import {
    j as We,
    k as E,
    F as re,
    l as C,
    n as M,
    p as h,
    q as w,
    s as P,
    u as T,
    v as Se,
    x as H,
    y as ee,
    T as Ve,
    z as ze,
    A as X,
    B as Ye,
    o as Z,
    c as J,
    a as p,
    e as N,
    w as z,
    C as Pe,
    b as pe,
    t as Y
} from "./runtime-core.esm-bundler.4816885f.js"; /* empty css                       */
function A(e, t, ...l) {
    if (e in t) {
        let r = t[e];
        return typeof r == "function" ? r(...l) : r
    }
    let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(r=>`"${r}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, A), n
}
var he = (e => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(he || {}),
    Ke = (e => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(Ke || {});

function F({
    visible: e = !0,
    features: t = 0,
    ourProps: l,
    theirProps: n,
    ...r
}) {
    var o;
    let a = Xe(n, l),
        i = Object.assign(r, {
            props: a
        });
    if (e || t & 2 && a.static) return ve(i);
    if (t & 1) {
        let s = (o = a.unmount) == null || o ? 0 : 1;
        return A(s, {
            [0]() {
                return null
            },
            [1]() {
                return ve({ ...r,
                    props: { ...a,
                        hidden: !0,
                        style: {
                            display: "none"
                        }
                    }
                })
            }
        })
    }
    return ve(i)
}

function ve({
    props: e,
    attrs: t,
    slots: l,
    slot: n,
    name: r
}) {
    var o;
    let {
        as: a,
        ...i
    } = Qe(e, ["unmount", "static"]), s = (o = l.default) == null ? void 0 : o.call(l, n), u = {};
    if (n) {
        let c = !1,
            f = [];
        for (let [d, v] of Object.entries(n)) typeof v == "boolean" && (c = !0), v === !0 && f.push(d);
        c && (u["data-headlessui-state"] = f.join(" "))
    }
    if (a === "template") {
        if (s = Ae(s ? ? []), Object.keys(i).length > 0 || Object.keys(t).length > 0) {
            let [c, ...f] = s ? ? [];
            if (!Ze(c) || f.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${r} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(i).concat(Object.keys(t)).sort((d, v) => d.localeCompare(v)).map(d => `  - ${d}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map(d => `  - ${d}`).join(`
`)].join(`
`));
            return We(c, Object.assign({}, i, u))
        }
        return Array.isArray(s) && s.length === 1 ? s[0] : s
    }
    return E(a, Object.assign({}, i, u), {
        default: () => s
    })
}

function Ae(e) {
    return e.flatMap(t => t.type === re ? Ae(t.children) : [t])
}

function Xe(...e) {
    if (e.length === 0) return {};
    if (e.length === 1) return e[0];
    let t = {},
        l = {};
    for (let n of e)
        for (let r in n) r.startsWith("on") && typeof n[r] == "function" ? (l[r] != null || (l[r] = []), l[r].push(n[r])) : t[r] = n[r];
    if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(l).map(n => [n, void 0])));
    for (let n in l) Object.assign(t, {
        [n](r, ...o) {
            let a = l[n];
            for (let i of a) {
                if (r instanceof Event && r.defaultPrevented) return;
                i(r, ...o)
            }
        }
    });
    return t
}

function Qe(e, t = []) {
    let l = Object.assign({}, e);
    for (let n of t) n in l && delete l[n];
    return l
}

function Ze(e) {
    return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function"
}
let Je = 0;

function et() {
    return ++Je
}

function U() {
    return et()
}
var Te = (e => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(Te || {});

function L(e) {
    var t;
    return e == null || e.value == null ? null : (t = e.value.$el) != null ? t : e.value
}
let tt = Symbol("Context");
var ge = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(ge || {});

function nt() {
    return C(tt, null)
}
const ie = typeof window > "u" || typeof document > "u";

function q(e) {
    if (ie) return null;
    if (e instanceof Node) return e.ownerDocument;
    if (e != null && e.hasOwnProperty("value")) {
        let t = L(e);
        if (t) return t.ownerDocument
    }
    return document
}
let ye = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e => `${e}:not([tabindex='-1'])`).join(",");
var D = (e => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(D || {}),
    Le = (e => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Le || {}),
    ot = (e => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(ot || {});

function lt(e = document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(ye)).sort((t, l) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (l.tabIndex || Number.MAX_SAFE_INTEGER)))
}
var je = (e => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(je || {});

function rt(e, t = 0) {
    var l;
    return e === ((l = q(e)) == null ? void 0 : l.body) ? !1 : A(t, {
        [0]() {
            return e.matches(ye)
        },
        [1]() {
            let n = e;
            for (; n !== null;) {
                if (n.matches(ye)) return !0;
                n = n.parentElement
            }
            return !1
        }
    })
}

function I(e) {
    e ? .focus({
        preventScroll: !0
    })
}
let at = ["textarea", "input"].join(",");

function it(e) {
    var t, l;
    return (l = (t = e ? .matches) == null ? void 0 : t.call(e, at)) != null ? l : !1
}

function st(e, t = l => l) {
    return e.slice().sort((l, n) => {
        let r = t(l),
            o = t(n);
        if (r === null || o === null) return 0;
        let a = r.compareDocumentPosition(o);
        return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    })
}

function le(e, t, {
    sorted: l = !0,
    relativeTo: n = null,
    skipElements: r = []
} = {}) {
    var o;
    let a = (o = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e ? .ownerDocument) != null ? o : document,
        i = Array.isArray(e) ? l ? st(e) : e : lt(e);
    r.length > 0 && (i = i.filter(m => !r.includes(m))), n = n ? ? a.activeElement;
    let s = (() => {
            if (t & 5) return 1;
            if (t & 10) return -1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
        u = (() => {
            if (t & 1) return 0;
            if (t & 2) return Math.max(0, i.indexOf(n)) - 1;
            if (t & 4) return Math.max(0, i.indexOf(n)) + 1;
            if (t & 8) return i.length - 1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
        c = t & 32 ? {
            preventScroll: !0
        } : {},
        f = 0,
        d = i.length,
        v;
    do {
        if (f >= d || f + d <= 0) return 0;
        let m = u + f;
        if (t & 16) m = (m + d) % d;
        else {
            if (m < 0) return 3;
            if (m >= d) return 1
        }
        v = i[m], v ? .focus(c), f += s
    } while (v !== a.activeElement);
    return t & 6 && it(v) && v.select(), v.hasAttribute("tabindex") || v.setAttribute("tabindex", "0"), 2
}

function me(e, t, l) {
    ie || M(n => {
        document.addEventListener(e, t, l), n(() => document.removeEventListener(e, t, l))
    })
}

function ut(e, t, l = w(() => !0)) {
    function n(o, a) {
        if (!l.value || o.defaultPrevented) return;
        let i = a(o);
        if (i === null || !i.getRootNode().contains(i)) return;
        let s = function u(c) {
            return typeof c == "function" ? u(c()) : Array.isArray(c) || c instanceof Set ? c : [c]
        }(e);
        for (let u of s) {
            if (u === null) continue;
            let c = u instanceof HTMLElement ? u : L(u);
            if (c != null && c.contains(i) || o.composed && o.composedPath().includes(c)) return
        }
        return !rt(i, je.Loose) && i.tabIndex !== -1 && o.preventDefault(), t(o, i)
    }
    let r = h(null);
    me("mousedown", o => {
        var a, i;
        l.value && (r.value = ((i = (a = o.composedPath) == null ? void 0 : a.call(o)) == null ? void 0 : i[0]) || o.target)
    }, !0), me("click", o => {
        !r.value || (n(o, () => r.value), r.value = null)
    }, !0), me("blur", o => n(o, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0)
}
var ae = (e => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(ae || {});
let we = P({
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
        attrs: l
    }) {
        return () => {
            let {
                features: n,
                ...r
            } = e, o = {
                "aria-hidden": (n & 2) === 2 ? !0 : void 0,
                style: {
                    position: "fixed",
                    top: 1,
                    left: 1,
                    width: 1,
                    height: 0,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    borderWidth: "0",
                    ...(n & 4) === 4 && (n & 2) !== 2 && {
                        display: "none"
                    }
                }
            };
            return F({
                ourProps: o,
                theirProps: r,
                slot: {},
                attrs: l,
                slots: t,
                name: "Hidden"
            })
        }
    }
});

function dt(e, t, l) {
    ie || M(n => {
        window.addEventListener(e, t, l), n(() => window.removeEventListener(e, t, l))
    })
}
var Q = (e => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Q || {});

function ct() {
    let e = h(0);
    return dt("keydown", t => {
        t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0)
    }), e
}

function _e(e, t, l, n) {
    ie || M(r => {
        e = e ? ? window, e.addEventListener(t, l, n), r(() => e.removeEventListener(t, l, n))
    })
}

function ft(e) {
    typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch(t => setTimeout(() => {
        throw t
    }))
}
var Ne = (e => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(Ne || {});
let K = Object.assign(P({
    name: "FocusTrap",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        initialFocus: {
            type: Object,
            default: null
        },
        features: {
            type: Number,
            default: 30
        },
        containers: {
            type: Object,
            default: h(new Set)
        }
    },
    inheritAttrs: !1,
    setup(e, {
        attrs: t,
        slots: l,
        expose: n
    }) {
        let r = h(null);
        n({
            el: r,
            $el: r
        });
        let o = w(() => q(r));
        pt({
            ownerDocument: o
        }, w(() => Boolean(e.features & 16)));
        let a = vt({
            ownerDocument: o,
            container: r,
            initialFocus: w(() => e.initialFocus)
        }, w(() => Boolean(e.features & 2)));
        mt({
            ownerDocument: o,
            container: r,
            containers: e.containers,
            previousActiveElement: a
        }, w(() => Boolean(e.features & 8)));
        let i = ct();

        function s(d) {
            let v = L(r);
            v && (m => m())(() => {
                A(i.value, {
                    [Q.Forwards]: () => le(v, D.First, {
                        skipElements: [d.relatedTarget]
                    }),
                    [Q.Backwards]: () => le(v, D.Last, {
                        skipElements: [d.relatedTarget]
                    })
                })
            })
        }
        let u = h(!1);

        function c(d) {
            d.key === "Tab" && (u.value = !0, requestAnimationFrame(() => {
                u.value = !1
            }))
        }

        function f(d) {
            var v;
            let m = new Set((v = e.containers) == null ? void 0 : v.value);
            m.add(r);
            let j = d.relatedTarget;
            !j || j.dataset.headlessuiFocusGuard !== "true" && (Me(m, j) || (u.value ? le(L(r), A(i.value, {
                [Q.Forwards]: () => D.Next,
                [Q.Backwards]: () => D.Previous
            }) | D.WrapAround, {
                relativeTo: d.target
            }) : d.target instanceof HTMLElement && I(d.target)))
        }
        return () => {
            let d = {},
                v = {
                    ref: r,
                    onKeydown: c,
                    onFocusout: f
                },
                {
                    features: m,
                    initialFocus: j,
                    containers: G,
                    ...se
                } = e;
            return E(re, [Boolean(m & 4) && E(we, {
                as: "button",
                type: "button",
                "data-headlessui-focus-guard": !0,
                onFocus: s,
                features: ae.Focusable
            }), F({
                ourProps: v,
                theirProps: { ...t,
                    ...se
                },
                slot: d,
                attrs: t,
                slots: l,
                name: "FocusTrap"
            }), Boolean(m & 4) && E(we, {
                as: "button",
                type: "button",
                "data-headlessui-focus-guard": !0,
                onFocus: s,
                features: ae.Focusable
            })])
        }
    }
}), {
    features: Ne
});

function pt({
    ownerDocument: e
}, t) {
    let l = h(null);

    function n() {
        var o;
        l.value || (l.value = (o = e.value) == null ? void 0 : o.activeElement)
    }

    function r() {
        !l.value || (I(l.value), l.value = null)
    }
    T(() => {
        Se(t, (o, a) => {
            o !== a && (o ? n() : r())
        }, {
            immediate: !0
        })
    }), H(r)
}

function vt({
    ownerDocument: e,
    container: t,
    initialFocus: l
}, n) {
    let r = h(null),
        o = h(!1);
    return T(() => o.value = !0), H(() => o.value = !1), T(() => {
        Se([t, l, n], (a, i) => {
            if (a.every((u, c) => i ? .[c] === u) || !n.value) return;
            let s = L(t);
            !s || ft(() => {
                var u, c;
                if (!o.value) return;
                let f = L(l),
                    d = (u = e.value) == null ? void 0 : u.activeElement;
                if (f) {
                    if (f === d) {
                        r.value = d;
                        return
                    }
                } else if (s.contains(d)) {
                    r.value = d;
                    return
                }
                f ? I(f) : le(s, D.First | D.NoScroll) === Le.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), r.value = (c = e.value) == null ? void 0 : c.activeElement
            })
        }, {
            immediate: !0,
            flush: "post"
        })
    }), r
}

function mt({
    ownerDocument: e,
    container: t,
    containers: l,
    previousActiveElement: n
}, r) {
    var o;
    _e((o = e.value) == null ? void 0 : o.defaultView, "focus", a => {
        if (!r.value) return;
        let i = new Set(l ? .value);
        i.add(t);
        let s = n.value;
        if (!s) return;
        let u = a.target;
        u && u instanceof HTMLElement ? Me(i, u) ? (n.value = u, I(u)) : (a.preventDefault(), a.stopPropagation(), I(s)) : I(n.value)
    }, !0)
}

function Me(e, t) {
    var l;
    for (let n of e)
        if ((l = n.value) != null && l.contains(t)) return !0;
    return !1
}
let Fe = "body > *",
    B = new Set,
    O = new Map;

function $e(e) {
    e.setAttribute("aria-hidden", "true"), e.inert = !0
}

function Oe(e) {
    let t = O.get(e);
    !t || (t["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", t["aria-hidden"]), e.inert = t.inert)
}

function ht(e, t = h(!0)) {
    M(l => {
        if (!t.value || !e.value) return;
        let n = e.value,
            r = q(n);
        if (r) {
            B.add(n);
            for (let o of O.keys()) o.contains(n) && (Oe(o), O.delete(o));
            r.querySelectorAll(Fe).forEach(o => {
                if (o instanceof HTMLElement) {
                    for (let a of B)
                        if (o.contains(a)) return;
                    B.size === 1 && (O.set(o, {
                        "aria-hidden": o.getAttribute("aria-hidden"),
                        inert: o.inert
                    }), $e(o))
                }
            }), l(() => {
                if (B.delete(n), B.size > 0) r.querySelectorAll(Fe).forEach(o => {
                    if (o instanceof HTMLElement && !O.has(o)) {
                        for (let a of B)
                            if (o.contains(a)) return;
                        O.set(o, {
                            "aria-hidden": o.getAttribute("aria-hidden"),
                            inert: o.inert
                        }), $e(o)
                    }
                });
                else
                    for (let o of O.keys()) Oe(o), O.delete(o)
            })
        }
    })
}
let Ce = Symbol("ForcePortalRootContext");

function gt() {
    return C(Ce, !1)
}
let be = P({
    name: "ForcePortalRoot",
    props: {
        as: {
            type: [Object, String],
            default: "template"
        },
        force: {
            type: Boolean,
            default: !1
        }
    },
    setup(e, {
        slots: t,
        attrs: l
    }) {
        return ee(Ce, e.force), () => {
            let {
                force: n,
                ...r
            } = e;
            return F({
                theirProps: r,
                ourProps: {},
                slot: {},
                slots: t,
                attrs: l,
                name: "ForcePortalRoot"
            })
        }
    }
});

function yt(e) {
    let t = q(e);
    if (!t) {
        if (e === null) return null;
        throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)
    }
    let l = t.getElementById("headlessui-portal-root");
    if (l) return l;
    let n = t.createElement("div");
    return n.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(n)
}
let Re = P({
        name: "Portal",
        props: {
            as: {
                type: [Object, String],
                default: "div"
            }
        },
        setup(e, {
            slots: t,
            attrs: l
        }) {
            let n = h(null),
                r = w(() => q(n)),
                o = gt(),
                a = C(Be, null),
                i = h(o === !0 || a == null ? yt(n.value) : a.resolveTarget());
            return M(() => {
                o || a != null && (i.value = a.resolveTarget())
            }), H(() => {
                var s, u;
                let c = (s = r.value) == null ? void 0 : s.getElementById("headlessui-portal-root");
                !c || i.value === c && i.value.children.length <= 0 && ((u = i.value.parentElement) == null || u.removeChild(i.value))
            }), () => {
                if (i.value === null) return null;
                let s = {
                    ref: n,
                    "data-headlessui-portal": ""
                };
                return E(Ve, {
                    to: i.value
                }, F({
                    ourProps: s,
                    theirProps: e,
                    slot: {},
                    attrs: l,
                    slots: t,
                    name: "Portal"
                }))
            }
        }
    }),
    Be = Symbol("PortalGroupContext"),
    wt = P({
        name: "PortalGroup",
        props: {
            as: {
                type: [Object, String],
                default: "template"
            },
            target: {
                type: Object,
                default: null
            }
        },
        setup(e, {
            attrs: t,
            slots: l
        }) {
            let n = ze({
                resolveTarget() {
                    return e.target
                }
            });
            return ee(Be, n), () => {
                let {
                    target: r,
                    ...o
                } = e;
                return F({
                    theirProps: o,
                    ourProps: {},
                    slot: {},
                    attrs: t,
                    slots: l,
                    name: "PortalGroup"
                })
            }
        }
    }),
    Ie = Symbol("StackContext");
var xe = (e => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(xe || {});

function bt() {
    return C(Ie, () => {})
}

function xt({
    type: e,
    enabled: t,
    element: l,
    onUpdate: n
}) {
    let r = bt();

    function o(...a) {
        n ? .(...a), r(...a)
    }
    T(() => {
        Se(t, (a, i) => {
            a ? o(0, e, l) : i === !0 && o(1, e, l)
        }, {
            immediate: !0,
            flush: "sync"
        })
    }), H(() => {
        t.value && o(1, e, l)
    }), ee(Ie, o)
}
let He = Symbol("DescriptionContext");

function Et() {
    let e = C(He, null);
    if (e === null) throw new Error("Missing parent");
    return e
}

function St({
    slot: e = h({}),
    name: t = "Description",
    props: l = {}
} = {}) {
    let n = h([]);

    function r(o) {
        return n.value.push(o), () => {
            let a = n.value.indexOf(o);
            a !== -1 && n.value.splice(a, 1)
        }
    }
    return ee(He, {
        register: r,
        slot: e,
        name: t,
        props: l
    }), w(() => n.value.length > 0 ? n.value.join(" ") : void 0)
}
let en = P({
    name: "Description",
    props: {
        as: {
            type: [Object, String],
            default: "p"
        },
        id: {
            type: String,
            default: () => `headlessui-description-${U()}`
        }
    },
    setup(e, {
        attrs: t,
        slots: l
    }) {
        let n = Et();
        return T(() => H(n.register(e.id))), () => {
            let {
                name: r = "Description",
                slot: o = h({}),
                props: a = {}
            } = n, {
                id: i,
                ...s
            } = e, u = { ...Object.entries(a).reduce((c, [f, d]) => Object.assign(c, {
                    [f]: X(d)
                }), {}),
                id: i
            };
            return F({
                ourProps: u,
                theirProps: s,
                slot: o.value,
                attrs: t,
                slots: l,
                name: r
            })
        }
    }
});

function kt() {
    let e = [],
        t = [],
        l = {
            enqueue(n) {
                t.push(n)
            },
            addEventListener(n, r, o, a) {
                return n.addEventListener(r, o, a), l.add(() => n.removeEventListener(r, o, a))
            },
            requestAnimationFrame(...n) {
                let r = requestAnimationFrame(...n);
                l.add(() => cancelAnimationFrame(r))
            },
            nextFrame(...n) {
                l.requestAnimationFrame(() => {
                    l.requestAnimationFrame(...n)
                })
            },
            setTimeout(...n) {
                let r = setTimeout(...n);
                l.add(() => clearTimeout(r))
            },
            add(n) {
                e.push(n)
            },
            dispose() {
                for (let n of e.splice(0)) n()
            },
            async workQueue() {
                for (let n of t.splice(0)) await n()
            }
        };
    return l
}

function Pt() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
}
var Ft = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Ft || {});
let Ee = Symbol("DialogContext");

function te(e) {
    let t = C(Ee, null);
    if (t === null) {
        let l = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(l, te), l
    }
    return t
}
let oe = "DC8F892D-2EBD-447C-A4C8-A03058436FF4",
    $t = P({
        name: "Dialog",
        inheritAttrs: !1,
        props: {
            as: {
                type: [Object, String],
                default: "div"
            },
            static: {
                type: Boolean,
                default: !1
            },
            unmount: {
                type: Boolean,
                default: !0
            },
            open: {
                type: [Boolean, String],
                default: oe
            },
            initialFocus: {
                type: Object,
                default: null
            },
            id: {
                type: String,
                default: () => `headlessui-dialog-${U()}`
            }
        },
        emits: {
            close: e => !0
        },
        setup(e, {
            emit: t,
            attrs: l,
            slots: n,
            expose: r
        }) {
            var o;
            let a = h(!1);
            T(() => {
                a.value = !0
            });
            let i = h(0),
                s = nt(),
                u = w(() => e.open === oe && s !== null ? A(s.value, {
                    [ge.Open]: !0,
                    [ge.Closed]: !1
                }) : e.open),
                c = h(new Set),
                f = h(null),
                d = h(null),
                v = w(() => q(f));
            if (r({
                    el: f,
                    $el: f
                }), !(e.open !== oe || s !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
            if (typeof u.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${u.value===oe?void 0:e.open}`);
            let m = w(() => a.value && u.value ? 0 : 1),
                j = w(() => m.value === 0),
                G = w(() => i.value > 1),
                se = C(Ee, null) !== null,
                Ue = w(() => G.value ? "parent" : "leaf");
            ht(f, w(() => G.value ? j.value : !1)), xt({
                type: "Dialog",
                enabled: w(() => m.value === 0),
                element: f,
                onUpdate: (g, b, y) => {
                    if (b === "Dialog") return A(g, {
                        [xe.Add]() {
                            c.value.add(y), i.value += 1
                        },
                        [xe.Remove]() {
                            c.value.delete(y), i.value -= 1
                        }
                    })
                }
            });
            let qe = St({
                    name: "DialogDescription",
                    slot: w(() => ({
                        open: u.value
                    }))
                }),
                ne = h(null),
                _ = {
                    titleId: ne,
                    panelRef: h(null),
                    dialogState: m,
                    setTitleId(g) {
                        ne.value !== g && (ne.value = g)
                    },
                    close() {
                        t("close", !1)
                    }
                };
            ee(Ee, _);

            function ue() {
                var g, b, y;
                return [...Array.from((b = (g = v.value) == null ? void 0 : g.querySelectorAll("body > *, [data-headlessui-portal]")) != null ? b : []).filter(x => !(!(x instanceof HTMLElement) || x.contains(L(d)) || _.panelRef.value && x.contains(_.panelRef.value))), (y = _.panelRef.value) != null ? y : f.value]
            }
            return ut(() => ue(), (g, b) => {
                _.close(), Ye(() => b ? .focus())
            }, w(() => m.value === 0 && !G.value)), _e((o = v.value) == null ? void 0 : o.defaultView, "keydown", g => {
                g.defaultPrevented || g.key === Te.Escape && m.value === 0 && (G.value || (g.preventDefault(), g.stopPropagation(), _.close()))
            }), M(g => {
                var b;
                if (m.value !== 0 || se) return;
                let y = v.value;
                if (!y) return;
                let x = kt(),
                    $ = window.pageYOffset;

                function W(k, S, R) {
                    let de = k.style.getPropertyValue(S);
                    return Object.assign(k.style, {
                        [S]: R
                    }), x.add(() => {
                        Object.assign(k.style, {
                            [S]: de
                        })
                    })
                }
                let V = y ? .documentElement,
                    ke = ((b = y.defaultView) != null ? b : window).innerWidth - V.clientWidth;
                if (W(V, "overflow", "hidden"), ke > 0) {
                    let k = V.clientWidth - V.offsetWidth,
                        S = ke - k;
                    W(V, "paddingRight", `${S}px`)
                }
                if (Pt()) {
                    W(y.body, "marginTop", `-${$}px`), window.scrollTo(0, 0);
                    let k = null;
                    x.addEventListener(y, "click", S => {
                        if (S.target instanceof HTMLElement) try {
                            let R = S.target.closest("a");
                            if (!R) return;
                            let {
                                hash: de
                            } = new URL(R.href), ce = y.querySelector(de);
                            ce && !ue().some(Ge => Ge.contains(ce)) && (k = ce)
                        } catch {}
                    }, !0), x.addEventListener(y, "touchmove", S => {
                        S.target instanceof HTMLElement && !ue().some(R => R.contains(S.target)) && S.preventDefault()
                    }, {
                        passive: !1
                    }), x.add(() => {
                        window.scrollTo(0, window.pageYOffset + $), k && k.isConnected && (k.scrollIntoView({
                            block: "nearest"
                        }), k = null)
                    })
                }
                g(x.dispose)
            }), M(g => {
                if (m.value !== 0) return;
                let b = L(f);
                if (!b) return;
                let y = new IntersectionObserver(x => {
                    for (let $ of x) $.boundingClientRect.x === 0 && $.boundingClientRect.y === 0 && $.boundingClientRect.width === 0 && $.boundingClientRect.height === 0 && _.close()
                });
                y.observe(b), g(() => y.disconnect())
            }), () => {
                let {
                    id: g,
                    open: b,
                    initialFocus: y,
                    ...x
                } = e, $ = { ...l,
                    ref: f,
                    id: g,
                    role: "dialog",
                    "aria-modal": m.value === 0 ? !0 : void 0,
                    "aria-labelledby": ne.value,
                    "aria-describedby": qe.value
                }, W = {
                    open: m.value === 0
                };
                return E(be, {
                    force: !0
                }, () => [E(Re, () => E(wt, {
                    target: f.value
                }, () => E(be, {
                    force: !1
                }, () => E(K, {
                    initialFocus: y,
                    containers: c,
                    features: j.value ? A(Ue.value, {
                        parent: K.features.RestoreFocus,
                        leaf: K.features.All & ~K.features.FocusLock
                    }) : K.features.None
                }, () => F({
                    ourProps: $,
                    theirProps: x,
                    slot: W,
                    attrs: l,
                    slots: n,
                    visible: m.value === 0,
                    features: he.RenderStrategy | he.Static,
                    name: "Dialog"
                }))))), E(we, {
                    features: ae.Hidden,
                    ref: d
                })])
            }
        }
    });
P({
    name: "DialogOverlay",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        id: {
            type: String,
            default: () => `headlessui-dialog-overlay-${U()}`
        }
    },
    setup(e, {
        attrs: t,
        slots: l
    }) {
        let n = te("DialogOverlay");

        function r(o) {
            o.target === o.currentTarget && (o.preventDefault(), o.stopPropagation(), n.close())
        }
        return () => {
            let {
                id: o,
                ...a
            } = e;
            return F({
                ourProps: {
                    id: o,
                    "aria-hidden": !0,
                    onClick: r
                },
                theirProps: a,
                slot: {
                    open: n.dialogState.value === 0
                },
                attrs: t,
                slots: l,
                name: "DialogOverlay"
            })
        }
    }
});
P({
    name: "DialogBackdrop",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        id: {
            type: String,
            default: () => `headlessui-dialog-backdrop-${U()}`
        }
    },
    inheritAttrs: !1,
    setup(e, {
        attrs: t,
        slots: l,
        expose: n
    }) {
        let r = te("DialogBackdrop"),
            o = h(null);
        return n({
            el: o,
            $el: o
        }), T(() => {
            if (r.panelRef.value === null) throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.")
        }), () => {
            let {
                id: a,
                ...i
            } = e, s = {
                id: a,
                ref: o,
                "aria-hidden": !0
            };
            return E(be, {
                force: !0
            }, () => E(Re, () => F({
                ourProps: s,
                theirProps: { ...t,
                    ...i
                },
                slot: {
                    open: r.dialogState.value === 0
                },
                attrs: t,
                slots: l,
                name: "DialogBackdrop"
            })))
        }
    }
});
let Ot = P({
    name: "DialogPanel",
    props: {
        as: {
            type: [Object, String],
            default: "div"
        },
        id: {
            type: String,
            default: () => `headlessui-dialog-panel-${U()}`
        }
    },
    setup(e, {
        attrs: t,
        slots: l,
        expose: n
    }) {
        let r = te("DialogPanel");
        n({
            el: r.panelRef,
            $el: r.panelRef
        });

        function o(a) {
            a.stopPropagation()
        }
        return () => {
            let {
                id: a,
                ...i
            } = e, s = {
                id: a,
                ref: r.panelRef,
                onClick: o
            };
            return F({
                ourProps: s,
                theirProps: i,
                slot: {
                    open: r.dialogState.value === 0
                },
                attrs: t,
                slots: l,
                name: "DialogPanel"
            })
        }
    }
});
P({
    name: "DialogTitle",
    props: {
        as: {
            type: [Object, String],
            default: "h2"
        },
        id: {
            type: String,
            default: () => `headlessui-dialog-title-${U()}`
        }
    },
    setup(e, {
        attrs: t,
        slots: l
    }) {
        let n = te("DialogTitle");
        return T(() => {
            n.setTitleId(e.id), H(() => n.setTitleId(null))
        }), () => {
            let {
                id: r,
                ...o
            } = e;
            return F({
                ourProps: {
                    id: r
                },
                theirProps: o,
                slot: {
                    open: n.dialogState.value === 0
                },
                attrs: t,
                slots: l,
                name: "DialogTitle"
            })
        }
    }
});

function Dt(e, t) {
    return Z(), J("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true"
    }, [p("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    })])
}

function At(e, t) {
    return Z(), J("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        "aria-hidden": "true"
    }, [p("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M6 18L18 6M6 6l12 12"
    })])
}
const Tt = {
        class: "relative isolate"
    },
    Lt = {
        class: "px-6 py-6 lg:px-8"
    },
    jt = {
        class: "flex items-center justify-between",
        "aria-label": "Global"
    },
    _t = p("div", {
        class: "flex lg:flex-1"
    }, [p("a", {
        href: "https://mixo.io",
        class: "-m-1.5 p-1.5 flex items-center"
    }, [p("img", {
        class: "w-auto h-8",
        src: De,
        alt: "Mixo logo"
    }), p("p", {
        class: "ml-2 font-sans text-xl font-bold"
    }, "Mixo")])], -1),
    Nt = {
        class: "flex items-center space-x-2 lg:hidden"
    },
    Mt = p("span", {
        class: "sr-only"
    }, "Open main menu", -1),
    Ct = {
        class: "hidden lg:flex lg:gap-x-12"
    },
    Rt = ["href"],
    Bt = {
        class: "hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4"
    },
    It = ["href"],
    Ht = {
        class: "flex items-center justify-between"
    },
    Ut = p("a", {
        href: "https://mixo.io",
        class: "-m-1.5 p-1.5 flex items-center"
    }, [p("img", {
        class: "w-auto h-8",
        src: De,
        alt: "Mixo logo"
    }), p("p", {
        class: "ml-2 font-sans text-xl font-bold text-slate-800"
    }, "Mixo")], -1),
    qt = {
        class: "flex items-center space-x-2"
    },
    Gt = p("span", {
        class: "sr-only"
    }, "Close menu", -1),
    Wt = {
        class: "mt-6 flow-root"
    },
    Vt = {
        class: "-my-6 divide-y divide-gray-500/10"
    },
    zt = {
        class: "space-y-2 py-6"
    },
    Yt = ["href"],
    Kt = {
        class: "py-6"
    },
    Xt = ["href"],
    tn = {
        __name: "MainNav",
        props: {
            ctaLabel: {
                type: String,
                default: "Get Started for Free"
            },
            ctaLink: {
                type: String,
                default: "https://app.mixo.io"
            }
        },
        setup(e) {
            const t = [{
                    name: "Pricing",
                    href: "https://app.mixo.io/pricing"
                }, {
                    name: "Features",
                    href: "/features"
                }, {
                    name: "Help",
                    href: "https://help.mixo.io"
                }],
                l = h(!1);
            return (n, r) => (Z(), J("div", Tt, [p("div", Lt, [p("nav", jt, [_t, p("div", Nt, [N(fe, {
                size: "xs",
                href: e.ctaLink,
                theme: "primary"
            }, {
                default: z(() => [pe(Y(e.ctaLabel), 1)]),
                _: 1
            }, 8, ["href"]), p("button", {
                type: "button",
                class: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-600",
                onClick: r[0] || (r[0] = o => l.value = !0)
            }, [Mt, N(X(Dt), {
                class: "h-6 w-6",
                "aria-hidden": "true"
            })])]), p("div", Ct, [(Z(), J(re, null, Pe(t, o => p("a", {
                key: o.name,
                href: o.href,
                class: "text-sm font-semibold leading-6"
            }, Y(o.name), 9, Rt)), 64))]), p("div", Bt, [p("a", {
                href: e.ctaLink,
                class: "text-sm font-semibold leading-6"
            }, "Log in ", 8, It), N(fe, {
                size: "sm",
                href: e.ctaLink,
                theme: "primary"
            }, {
                default: z(() => [pe(Y(e.ctaLabel), 1)]),
                _: 1
            }, 8, ["href"])])]), N(X($t), {
                as: "div",
                onClose: r[2] || (r[2] = o => l.value = !1),
                open: l.value
            }, {
                default: z(() => [N(X(Ot), {
                    focus: "true",
                    class: "fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
                }, {
                    default: z(() => [p("div", Ht, [Ut, p("div", qt, [N(fe, {
                        size: "xs",
                        href: e.ctaLink,
                        theme: "primary"
                    }, {
                        default: z(() => [pe(Y(e.ctaLabel), 1)]),
                        _: 1
                    }, 8, ["href"]), p("button", {
                        type: "button",
                        class: "-m-2.5 rounded-md p-2.5 text-gray-700",
                        onClick: r[1] || (r[1] = o => l.value = !1)
                    }, [Gt, N(X(At), {
                        class: "h-6 w-6",
                        "aria-hidden": "true"
                    })])])]), p("div", Wt, [p("div", Vt, [p("div", zt, [(Z(), J(re, null, Pe(t, o => p("a", {
                        key: o.name,
                        href: o.href,
                        class: "-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-800 hover:bg-gray-400/10"
                    }, Y(o.name), 9, Yt)), 64))]), p("div", Kt, [p("a", {
                        href: e.ctaLink,
                        class: "-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 hover:bg-gray-400/10 text-slate-800"
                    }, "Log in", 8, Xt)])])])]),
                    _: 1
                })]),
                _: 1
            }, 8, ["open"])])]))
        }
    };
export {
    tn as
    default
};