import {
    a3 as p,
    a6 as m,
    u as f,
    o as g,
    c as y,
    a,
    h,
    e as _,
    D as b,
    E as s,
    bD as w
} from "./app.e27838e5.js";
import {
    _ as k
} from "./MarketingFaqs.dea97eb1.js";
import I from "./PlanSelector.4a86a2ca.js";
import "./check.a548b91d.js";
import "./planet-ring2-line.eb2bb610.js";
import "./UiHeading.6d814843.js";
import "./index.907e950c.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            n = new Error().stack;
        n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "366b35fc-9ea4-42b9-b35c-788c5acdf79c", e._sentryDebugIdIdentifier = "sentry-dbid-366b35fc-9ea4-42b9-b35c-788c5acdf79c")
    } catch {}
})();
const v = {
        class: "py-6 space-y-12 md:space-y-24"
    },
    q = {
        class: "text-center"
    },
    x = s(" All prices in USD. If you have any more questions feel free to "),
    D = s("get in touch"),
    M = s(". "),
    V = {
        name: "pricing",
        setup(e) {
            const n = p("openAuthModal"),
                t = "Mixo Pricing",
                o = "Mixo is an AI-powered site builder that's designed to help you launch startups quickly and easily. Our pricing page is designed to give you an overview of the different plans we offer and the features you'll get with each.",
                i = "https://storage.googleapis.com/mixo-sites/images/file-2ea8702c-b5e0-4026-80fc-d60d790bb5b0.png",
                c = m();
            f({
                title: "Pricing",
                meta: [{
                    name: "description",
                    content: o
                }, {
                    name: "og:url",
                    content: c.path
                }, {
                    name: "og:title",
                    content: t
                }, {
                    name: "og:site_name",
                    content: t
                }, {
                    name: "og:type",
                    content: "website"
                }, {
                    name: "og:description",
                    content: o
                }, {
                    name: "og:image",
                    content: i
                }, {
                    name: "og:image:alt",
                    content: t
                }, {
                    name: "twitter:url",
                    content: c.path
                }, {
                    name: "twitter:title",
                    content: t
                }, {
                    name: "twitter:description",
                    content: o
                }, {
                    name: "twitter:card",
                    content: "summary_large_image"
                }, {
                    name: "twitter:image:src",
                    content: i
                }]
            });
            const r = [{
                question: "Is there a money-back guarantee?",
                answer: "There is a 30 day money-back policy on your purchase. Try for a month and see if it's right for you."
            }, {
                question: "Is there a free plan?",
                answer: "Yes. On the free plan, you can create a site, edit and publish it live. Paid plans allow you to customize your sites URL and remove the Mixo branding."
            }, {
                question: "Can I change my plan later?",
                answer: "Absolutely! You can change your plan from within your dashboard at any time, and instantly unlock access to features at the new plan level."
            }, {
                question: "Can I cancel my plan before the end of my billing period?",
                answer: "We\u2019ll be sorry to see you go, but we won\u2019t take it personally. You can cancel your recurring subscription at any time from within your account, without having to contact support. Go to your account settings and click \u201CPayment Settings\u201D then \u201CCancel Subscription.\u201D"
            }];
            return (A, P) => {
                const l = I,
                    u = k,
                    d = w;
                return g(), y("div", v, [a(l, {
                    "open-auth-modal": h(n)
                }, null, 8, ["open-auth-modal"]), a(u, {
                    faqs: r
                }), _("p", q, [x, a(d, null, {
                    default: b(() => [D]),
                    _: 1
                }), M])])
            }
        }
    };
export {
    V as
    default
};
//# sourceMappingURL=pricing.d39c0a42.js.map