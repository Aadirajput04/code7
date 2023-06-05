import {
    o as s,
    c as a,
    e,
    I as c,
    J as u,
    y as i,
    d as l,
    E as p
} from "./app.e27838e5.js";
(function() {
    try {
        var t = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            o = new Error().stack;
        o && (t._sentryDebugIds = t._sentryDebugIds || {}, t._sentryDebugIds[o] = "ea3d15a9-3a42-48ed-eb32-62e496ae179c", t._sentryDebugIdIdentifier = "sentry-dbid-ea3d15a9-3a42-48ed-eb32-62e496ae179c")
    } catch {}
})();
const h = {
        class: "px-4 mx-auto max-w-7xl sm:px-6 lg:px-84"
    },
    g = {
        class: "max-w-3xl mx-auto"
    },
    y = e("h2", {
        class: "text-3xl font-extrabold text-center text-slate-900 sm:text-4xl"
    }, [p(" Questions"), e("span", {
        class: "text-brand-primary"
    }, "?")], -1),
    f = e("div", {
        class: "divider mt-6"
    }, null, -1),
    x = {
        class: "mt-6 space-y-6 divide-y divide-slate-200"
    },
    m = {
        key: 0,
        class: "text-lg"
    },
    b = {
        class: "font-medium text-slate-900"
    },
    w = {
        class: "sm:px-12 mt-2"
    },
    _ = {
        class: "text-base text-slate-500"
    },
    q = {
        name: "MarketingFaqs",
        props: {
            faqs: {
                type: Array,
                default () {
                    return [{
                        question: "What if I'm already a Mixo customer?",
                        answer: "Existing Mixo customers can take up this offer to receive the lifetime benefits if they wish. They simply need to pay to upgrade their account."
                    }, {
                        question: "What's the difference between Mixo and other website builders?",
                        answer: "Mixo is purpose-built for early stage startups and product ideas that need launch pages (also known as coming soon pages). Launch pages are heavily optimised to grow early subscribers and focus on maintaining an audience before a product has launched."
                    }, {
                        question: "Can I use Mixo if my products already launched?",
                        answer: "Yes, Mixo allows you to build sites for both pre-launch and launched products. In fact, Mixo is a fantastic option for businesses to help them test new value propositions, go to market strategies or variations on their current landing pages."
                    }, {
                        question: "Can Mixo be used by larger companies and agencies?",
                        answer: "Mixo is primarily used by entrepreneurs, freelancers and startups launching products ideas. That said, we are seeing more agencies and larger companies adopting Mixo as a way to test new product ideas quickly. Since Mixo takes away the pain of designing, coding and setting up a website from scratch, it's seen as a great option to get a product out quickly."
                    }, {
                        question: "Can I create a site without knowing how to code?",
                        answer: "Absolutely. Mixo is user-friendly and makes it possible for anyone to build a landing page without knowing how to code. Using our simple editor, you can quickly add your content then hit publish to get your site live."
                    }]
                }
            }
        },
        setup(t) {
            return (o, r) => (s(), a("div", h, [e("div", g, [y, f, e("dl", x, [(s(!0), a(c, null, u(t.faqs, (n, d) => (s(), a("div", {
                key: d,
                class: "pt-6"
            }, [n.question ? (s(), a("dt", m, [e("span", b, i(n.question), 1)])) : l("", !0), e("dd", w, [e("p", _, i(n.answer), 1)])]))), 128))])])]))
        }
    };
export {
    q as _
};
//# sourceMappingURL=MarketingFaqs.dea97eb1.js.map