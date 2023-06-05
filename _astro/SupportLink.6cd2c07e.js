import {
    U as i
} from "./UiButton.f2879737.js";
import {
    g as r,
    w as s,
    o as a,
    r as n,
    b as p
} from "./runtime-core.esm-bundler.4816885f.js"; /* empty css                       */
const d = {
    __name: "SupportLink",
    props: {
        theme: {
            type: String,
            default: "link"
        }
    },
    setup(t) {
        const e = () => {
            window ? .$crisp ? window ? .$crisp.push(["do", "chat:open"]) : window.location = "mailto:team@mixo.io?subject=Help with Mixo"
        };
        return (o, c) => (a(), r(i, {
            class: "cursor-pointer",
            "data-testid": "support-link",
            onClick: e,
            theme: t.theme
        }, {
            default: s(() => [n(o.$slots, "default", {}, () => [p("contact support")])]),
            _: 3
        }, 8, ["theme"]))
    }
};
export {
    d as
    default
};