var fe = Object.defineProperty,
    me = Object.defineProperties;
var ye = Object.getOwnPropertyDescriptors;
var N = Object.getOwnPropertySymbols;
var ve = Object.prototype.hasOwnProperty,
    Pe = Object.prototype.propertyIsEnumerable;
var M = (e, t, r) => t in e ? fe(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[t] = r,
    _ = (e, t) => {
        for (var r in t || (t = {})) ve.call(t, r) && M(e, r, t[r]);
        if (N)
            for (var r of N(t)) Pe.call(t, r) && M(e, r, t[r]);
        return e
    },
    q = (e, t) => me(e, ye(t));
import {
    a0 as we,
    a1 as be,
    ae as b,
    ac as Re,
    ad as _e
} from "./app.e27838e5.js";
import {
    c as qe
} from "./_copyArray.2183cf44.js";
(function() {
    try {
        var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {},
            t = new Error().stack;
        t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "c9b33255-0f09-4798-8bfc-694d4a70565a", e._sentryDebugIdIdentifier = "sentry-dbid-c9b33255-0f09-4798-8bfc-694d4a70565a")
    } catch {}
})();
var Te = Math.floor,
    Ie = Math.random;

function Ee(e, t) {
    return e + Te(Ie() * (t - e + 1))
}

function X(e, t) {
    var r = -1,
        n = e.length,
        o = n - 1;
    for (t = t === void 0 ? n : t; ++r < t;) {
        var s = Ee(r, o),
            a = e[s];
        e[s] = e[r], e[r] = a
    }
    return e.length = t, e
}

function Se(e) {
    return X(qe(e))
}

function ge(e) {
    return X(we(e))
}

function Ae(e) {
    var t = be(e) ? Se : ge;
    return t(e)
}
/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var B = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g,
    Ce = /\\([\u000b\u0020-\u00ff])/g,
    Ue = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/,
    Oe = ke;

function ke(e) {
    if (!e) throw new TypeError("argument string is required");
    var t = typeof e == "object" ? Fe(e) : e;
    if (typeof t != "string") throw new TypeError("argument string is required to be a string");
    var r = t.indexOf(";"),
        n = r !== -1 ? t.substr(0, r).trim() : t.trim();
    if (!Ue.test(n)) throw new TypeError("invalid media type");
    var o = new xe(n.toLowerCase());
    if (r !== -1) {
        var s, a, i;
        for (B.lastIndex = r; a = B.exec(t);) {
            if (a.index !== r) throw new TypeError("invalid parameter format");
            r += a[0].length, s = a[1].toLowerCase(), i = a[2], i[0] === '"' && (i = i.substr(1, i.length - 2).replace(Ce, "$1")), o.parameters[s] = i
        }
        if (r !== t.length) throw new TypeError("invalid parameter format")
    }
    return o
}

function Fe(e) {
    var t;
    if (typeof e.getHeader == "function" ? t = e.getHeader("content-type") : typeof e.headers == "object" && (t = e.headers && e.headers["content-type"]), typeof t != "string") throw new TypeError("content-type header is missing from object");
    return t
}

function xe(e) {
    this.parameters = Object.create(null), this.type = e
}

function h() {
    return h = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    }, h.apply(this, arguments)
}

function f(e, t) {
    if (e == null) return {};
    var r = {},
        n = Object.keys(e),
        o, s;
    for (s = 0; s < n.length; s++) o = n[s], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
    return r
}
var De = C(function(e) {
        return typeof e == "string" ? e : null
    }),
    v = function(t) {
        return t != null
    };

function C(e) {
    return function(t) {
        return v(e(t))
    }
}
var He = function(t) {
        return t.length > 0
    },
    y = function(t) {
        return Object.keys(t).reduce(function(r, n) {
            var o, s = t[n];
            return h({}, r, v(s) ? (o = {}, o[n] = s, o) : {})
        }, {})
    };

function D() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    var n = t.length - 1;
    return function() {
        for (var o = arguments.length, s = new Array(o), a = 0; a < o; a++) s[a] = arguments[a];
        for (var i = t[0].apply(this, s), c = 1; c <= n; c++) i = t[c].call(this, i);
        return i
    }
}
var je = C(function(e) {
        return v(e) && typeof e == "object" && !Array.isArray(e) ? e : null
    }),
    $e = C(function(e) {
        return Array.isArray(e) && e.every(De) && He(e) ? e : null
    }),
    Ne = C(function(e) {
        return je(e) && "errors" in e && $e(e.errors) ? {
            errors: e.errors
        } : null
    }),
    Me = function(t) {
        return Ne(t) ? {
            errors: t.errors,
            source: "api"
        } : {
            errors: ["Responded with a status code outside the 2xx range, and the response body is not recognisable."],
            source: "decoding"
        }
    },
    T = function(t) {
        this.message = t
    },
    Be = "content-type",
    ze = "application/json",
    Je = function(t) {
        var r = t.headers.get(Be);
        return v(r) && Oe(r).type === ze
    },
    V = function(t) {
        if (Je(t)) return t.json().catch(function(r) {
            throw new T("unable to parse JSON response.")
        });
        throw new T("expected JSON response from server.")
    },
    Ke = function(t) {
        return function(r) {
            return (r.ok ? t({
                response: r
            }).then(function(n) {
                return {
                    type: "success",
                    status: r.status,
                    response: n,
                    originalResponse: r
                }
            }) : V(r).then(function(n) {
                return h({
                    type: "error",
                    status: r.status
                }, Me(n), {
                    originalResponse: r
                })
            })).catch(function(n) {
                if (n instanceof T) return {
                    type: "error",
                    source: "decoding",
                    status: r.status,
                    originalResponse: r,
                    errors: [n.message]
                };
                throw n
            })
        }
    },
    p = function() {
        return function(t) {
            var r = t.response;
            return V(r)
        }
    },
    Qe = function(t) {
        return function(r) {
            Object.keys(t).forEach(function(n) {
                return r.searchParams.set(n, t[n].toString())
            })
        }
    },
    Xe = function(t) {
        return function(r) {
            r.pathname === "/" ? r.pathname = t : r.pathname += t
        }
    },
    Ve = function(t) {
        var r = t.pathname,
            n = t.query;
        return function(o) {
            var s = new URL(o);
            return Xe(r)(s), Qe(n)(s), s.toString()
        }
    },
    Ge = function(t) {
        var r = {};
        return t.forEach(function(n, o) {
            r[o] = n
        }), r
    },
    We = function(t) {
        var r = new URL(t),
            n = r.pathname,
            o = r.searchParams,
            s = Ge(o);
        return {
            query: s,
            pathname: n === "/" ? void 0 : n
        }
    },
    l = function(t) {
        return function(r, n) {
            n === void 0 && (n = {});
            var o = t(r),
                s = o.headers,
                a = o.query,
                i = f(o, ["headers", "query"]);
            return h({}, i, n, {
                query: a,
                headers: h({}, s, n.headers)
            })
        }
    },
    u = function(t) {
        return t
    },
    Ze = function(t) {
        var r = t.accessKey,
            n = t.apiVersion,
            o = n === void 0 ? "v1" : n,
            s = t.apiUrl,
            a = s === void 0 ? "https://api.unsplash.com" : s,
            i = t.headers,
            c = t.fetch,
            d = f(t, ["accessKey", "apiVersion", "apiUrl", "headers", "fetch"]);
        return function(P) {
            var ne = P.handleResponse,
                oe = P.handleRequest;
            return D(oe, function(R) {
                var se = R.pathname,
                    ae = R.query,
                    $ = R.method,
                    ie = $ === void 0 ? "GET" : $,
                    ce = R.headers,
                    ue = R.body,
                    he = R.signal,
                    le = Ve({
                        pathname: se,
                        query: ae
                    })(a),
                    de = h({
                        method: ie,
                        headers: h({}, i, ce, {
                            "Accept-Version": o
                        }, v(r) ? {
                            Authorization: "Client-ID " + r
                        } : {}),
                        body: ue,
                        signal: he
                    }, d),
                    pe = c != null ? c : fetch;
                return pe(le, de).then(Ke(ne))
            })
        }
    },
    k = "x-total",
    Ye = function(t) {
        var r = t.headers.get(k);
        if (v(r)) {
            var n = parseInt(r);
            if (Number.isInteger(n)) return n;
            throw new T("expected " + k + " header to be valid integer.")
        } else throw new T("expected " + k + " header to exist.")
    },
    w = function() {
        return function(t) {
            var r = t.response;
            return p()({
                response: r
            }).then(function(n) {
                return {
                    results: n,
                    total: Ye(r)
                }
            })
        }
    },
    G = function(t) {
        return v(t) ? {
            collections: t.join()
        } : {}
    },
    Le = function(t) {
        return v(t) ? {
            topics: t.join()
        } : {}
    },
    m = function(t) {
        var r = t.page,
            n = t.perPage,
            o = t.orderBy;
        return y({
            per_page: n,
            order_by: o,
            page: r
        })
    },
    U = "/collections",
    et = function() {
        var e = function(r) {
            var n = r.collectionId;
            return U + "/" + n + "/photos"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.collectionId,
                    n = t.orientation,
                    o = f(t, ["collectionId", "orientation"]);
                return {
                    pathname: e({
                        collectionId: r
                    }),
                    query: y(h({}, m(o), {
                        orientation: n
                    }))
                }
            }),
            handleResponse: w()
        })
    }(),
    tt = function() {
        var e = function(r) {
            var n = r.collectionId;
            return U + "/" + n
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.collectionId;
                return {
                    pathname: e({
                        collectionId: r
                    }),
                    query: {}
                }
            }),
            handleResponse: p()
        })
    }(),
    rt = function() {
        var e = function() {
            return U
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                return t === void 0 && (t = {}), {
                    pathname: e(),
                    query: m(t)
                }
            }),
            handleResponse: w()
        })
    }(),
    nt = function() {
        var e = function(r) {
            var n = r.collectionId;
            return U + "/" + n + "/related"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.collectionId;
                return {
                    pathname: e({
                        collectionId: r
                    }),
                    query: {}
                }
            }),
            handleResponse: p()
        })
    }(),
    I = "/photos",
    ot = function() {
        var e = function() {
            return I
        };
        return u({
            getPathname: function(r) {
                return e()
            },
            handleRequest: l(function(t) {
                return t === void 0 && (t = {}), {
                    pathname: I,
                    query: y(m(t))
                }
            }),
            handleResponse: w()
        })
    }(),
    st = function() {
        var e = function(r) {
            var n = r.photoId;
            return I + "/" + n
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.photoId;
                return {
                    pathname: e({
                        photoId: r
                    }),
                    query: {}
                }
            }),
            handleResponse: p()
        })
    }(),
    at = function() {
        var e = function(r) {
            var n = r.photoId;
            return I + "/" + n + "/statistics"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.photoId;
                return {
                    pathname: e({
                        photoId: r
                    }),
                    query: {}
                }
            }),
            handleResponse: p()
        })
    }(),
    it = function() {
        var e = function() {
            return I + "/random"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t === void 0 ? {} : t,
                    n = r.collectionIds,
                    o = r.contentFilter,
                    s = r.topicIds,
                    a = f(r, ["collectionIds", "contentFilter", "topicIds"]);
                return {
                    pathname: e(),
                    query: y(h({}, a, {
                        content_filter: o
                    }, G(n), Le(s))),
                    headers: {
                        "cache-control": "no-cache"
                    }
                }
            }),
            handleResponse: p()
        })
    }(),
    ct = {
        handleRequest: l(function(e) {
            var t = e.downloadLocation,
                r = We(t),
                n = r.pathname,
                o = r.query;
            if (!v(n)) throw new Error("Could not parse pathname from url.");
            return {
                pathname: n,
                query: y(o)
            }
        }),
        handleResponse: p()
    },
    H = "/search",
    ut = function() {
        var e = function() {
            return H + "/photos"
        };
        return u({
            getPathname: function(r) {
                return e()
            },
            handleRequest: l(function(t) {
                var r = t.query,
                    n = t.page,
                    o = t.perPage,
                    s = t.orderBy,
                    a = t.collectionIds,
                    i = t.lang,
                    c = t.contentFilter,
                    d = f(t, ["query", "page", "perPage", "orderBy", "collectionIds", "lang", "contentFilter"]);
                return {
                    pathname: e(),
                    query: y(h({
                        query: r,
                        content_filter: c,
                        lang: i,
                        order_by: s
                    }, m({
                        page: n,
                        perPage: o
                    }), G(a), d))
                }
            }),
            handleResponse: p()
        })
    }(),
    ht = function() {
        var e = function() {
            return H + "/collections"
        };
        return u({
            getPathname: function(r) {
                return e()
            },
            handleRequest: l(function(t) {
                var r = t.query,
                    n = f(t, ["query"]);
                return {
                    pathname: e(),
                    query: h({
                        query: r
                    }, m(n))
                }
            }),
            handleResponse: p()
        })
    }(),
    lt = function() {
        var e = function() {
            return H + "/users"
        };
        return u({
            getPathname: function(r) {
                return e()
            },
            handleRequest: l(function(t) {
                var r = t.query,
                    n = f(t, ["query"]);
                return {
                    pathname: e(),
                    query: h({
                        query: r
                    }, m(n))
                }
            }),
            handleResponse: p()
        })
    }(),
    O = "/users",
    dt = function() {
        var e = function(r) {
            var n = r.username;
            return O + "/" + n
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.username;
                return {
                    pathname: e({
                        username: r
                    }),
                    query: {}
                }
            }),
            handleResponse: p()
        })
    }(),
    pt = function() {
        var e = function(r) {
            var n = r.username;
            return O + "/" + n + "/photos"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.username,
                    n = t.stats,
                    o = t.orientation,
                    s = f(t, ["username", "stats", "orientation"]);
                return {
                    pathname: e({
                        username: r
                    }),
                    query: y(h({}, m(s), {
                        orientation: o,
                        stats: n
                    }))
                }
            }),
            handleResponse: w()
        })
    }(),
    ft = function() {
        var e = function(r) {
            var n = r.username;
            return O + "/" + n + "/likes"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.username,
                    n = t.orientation,
                    o = f(t, ["username", "orientation"]);
                return {
                    pathname: e({
                        username: r
                    }),
                    query: y(h({}, m(o), {
                        orientation: n
                    }))
                }
            }),
            handleResponse: w()
        })
    }(),
    mt = function() {
        var e = function(r) {
            var n = r.username;
            return O + "/" + n + "/collections"
        };
        return u({
            getPathname: e,
            handleRequest: l(function(t) {
                var r = t.username,
                    n = f(t, ["username"]);
                return {
                    pathname: e({
                        username: r
                    }),
                    query: m(n)
                }
            }),
            handleResponse: w()
        })
    }(),
    W = "/topics",
    g = function(t) {
        var r = t.topicIdOrSlug;
        return W + "/" + r
    },
    yt = u({
        getPathname: g,
        handleRequest: function(t) {
            var r = t.page,
                n = t.perPage,
                o = t.orderBy,
                s = t.topicIdsOrSlugs;
            return {
                pathname: W,
                query: y(h({}, m({
                    page: r,
                    perPage: n
                }), {
                    ids: s == null ? void 0 : s.join(","),
                    order_by: o
                }))
            }
        },
        handleResponse: w()
    }),
    vt = u({
        getPathname: g,
        handleRequest: function(t) {
            var r = t.topicIdOrSlug;
            return {
                pathname: g({
                    topicIdOrSlug: r
                }),
                query: {}
            }
        },
        handleResponse: p()
    }),
    Pt = function() {
        var e = D(g, function(t) {
            return t + "/photos"
        });
        return u({
            getPathname: e,
            handleRequest: function(r) {
                var n = r.topicIdOrSlug,
                    o = r.orientation,
                    s = f(r, ["topicIdOrSlug", "orientation"]);
                return {
                    pathname: e({
                        topicIdOrSlug: n
                    }),
                    query: y(h({}, m(s), {
                        orientation: o
                    }))
                }
            },
            handleResponse: w()
        })
    }(),
    z;
(function(e) {
    e.Afrikaans = "af", e.Amharic = "am", e.Arabic = "ar", e.Azerbaijani = "az", e.Belarusian = "be", e.Bulgarian = "bg", e.Bengali = "bn", e.Bosnian = "bs", e.Catalan = "ca", e.Cebuano = "ceb", e.Corsican = "co", e.Czech = "cs", e.Welsh = "cy", e.Danish = "da", e.German = "de", e.Greek = "el", e.English = "en", e.Esperanto = "eo", e.Spanish = "es", e.Estonian = "et", e.Basque = "eu", e.Persian = "fa", e.Finnish = "fi", e.French = "fr", e.Frisian = "fy", e.Irish = "ga", e.ScotsGaelic = "gd", e.Galician = "gl", e.Gujarati = "gu", e.Hausa = "ha", e.Hawaiian = "haw", e.Hindi = "hi", e.Hmong = "hmn", e.Croatian = "hr", e.HaitianCreole = "ht", e.Hungarian = "hu", e.Armenian = "hy", e.Indonesian = "id", e.Igbo = "ig", e.Icelandic = "is", e.Italian = "it", e.Hebrew = "iw", e.Japanese = "ja", e.Javanese = "jw", e.Georgian = "ka", e.Kazakh = "kk", e.Khmer = "km", e.Kannada = "kn", e.Korean = "ko", e.Kurdish = "ku", e.Kyrgyz = "ky", e.Latin = "la", e.Luxembourgish = "lb", e.Lao = "lo", e.Lithuanian = "lt", e.Latvian = "lv", e.Malagasy = "mg", e.Maori = "mi", e.Macedonian = "mk", e.Malayalam = "ml", e.Mongolian = "mn", e.Marathi = "mr", e.Malay = "ms", e.Maltese = "mt", e.Myanmar = "my", e.Nepali = "ne", e.Dutch = "nl", e.Norwegian = "no", e.Nyanja = "ny", e.Oriya = "or", e.Punjabi = "pa", e.Polish = "pl", e.Pashto = "ps", e.Portuguese = "pt", e.Romanian = "ro", e.Russian = "ru", e.Kinyarwanda = "rw", e.Sindhi = "sd", e.Sinhala = "si", e.Slovak = "sk", e.Slovenian = "sl", e.Samoan = "sm", e.Shona = "sn", e.Somali = "so", e.Albanian = "sq", e.Serbian = "sr", e.Sesotho = "st", e.Sundanese = "su", e.Swedish = "sv", e.Swahili = "sw", e.Tamil = "ta", e.Telugu = "te", e.Tajik = "tg", e.Thai = "th", e.Turkmen = "tk", e.Filipino = "tl", e.Turkish = "tr", e.Tatar = "tt", e.Uighur = "ug", e.Ukrainian = "uk", e.Urdu = "ur", e.Uzbek = "uz", e.Vietnamese = "vi", e.Xhosa = "xh", e.Yiddish = "yi", e.Yoruba = "yo", e.ChineseSimplified = "zh", e.ChineseTraditional = "zh-TW", e.Zulu = "zu"
})(z || (z = {}));
var J;
(function(e) {
    e.LATEST = "latest", e.POPULAR = "popular", e.VIEWS = "views", e.DOWNLOADS = "downloads", e.OLDEST = "oldest"
})(J || (J = {}));
var Z = D(Ze, function(e) {
    return {
        photos: {
            get: e(st),
            list: e(ot),
            getStats: e(at),
            getRandom: e(it),
            trackDownload: e(ct)
        },
        users: {
            getPhotos: e(pt),
            getCollections: e(mt),
            getLikes: e(ft),
            get: e(dt)
        },
        search: {
            getCollections: e(ht),
            getPhotos: e(ut),
            getUsers: e(lt)
        },
        collections: {
            getPhotos: e(et),
            get: e(tt),
            list: e(rt),
            getRelated: e(nt)
        },
        topics: {
            list: e(yt),
            get: e(vt),
            getPhotos: e(Pt)
        }
    }
});
class K extends Error {
    constructor(t, r, n) {
        const o = t.status || t.status === 0 ? t.status : "",
            s = t.statusText || "",
            a = `${o} ${s}`.trim(),
            i = a ? `status code ${a}` : "an unknown error";
        super(`Request failed with ${i}`), this.name = "HTTPError", this.response = t, this.request = r, this.options = n
    }
}
class Y extends Error {
    constructor(t) {
        super("Request timed out"), this.name = "TimeoutError", this.request = t
    }
}
const S = e => e !== null && typeof e == "object",
    E = (...e) => {
        for (const t of e)
            if ((!S(t) || Array.isArray(t)) && typeof t != "undefined") throw new TypeError("The `options` argument must be an object");
        return j({}, ...e)
    },
    L = (e = {}, t = {}) => {
        const r = new globalThis.Headers(e),
            n = t instanceof globalThis.Headers,
            o = new globalThis.Headers(t);
        for (const [s, a] of o.entries()) n && a === "undefined" || a === void 0 ? r.delete(s) : r.set(s, a);
        return r
    },
    j = (...e) => {
        let t = {},
            r = {};
        for (const n of e)
            if (Array.isArray(n)) Array.isArray(t) || (t = []), t = [...t, ...n];
            else if (S(n)) {
            for (let [o, s] of Object.entries(n)) S(s) && o in t && (s = j(t[o], s)), t = q(_({}, t), {
                [o]: s
            });
            S(n.headers) && (r = L(r, n.headers), t.headers = r)
        }
        return t
    },
    wt = typeof globalThis.AbortController == "function",
    bt = typeof globalThis.ReadableStream == "function",
    Rt = typeof globalThis.FormData == "function",
    ee = ["get", "post", "put", "patch", "head", "delete"],
    _t = {
        json: "application/json",
        text: "text/*",
        formData: "multipart/form-data",
        arrayBuffer: "*/*",
        blob: "*/*"
    },
    F = 2147483647,
    te = Symbol("stop"),
    qt = e => ee.includes(e) ? e.toUpperCase() : e,
    Tt = ["get", "put", "head", "delete", "options", "trace"],
    It = [408, 413, 429, 500, 502, 503, 504],
    re = [413, 429, 503],
    Q = {
        limit: 2,
        methods: Tt,
        statusCodes: It,
        afterStatusCodes: re,
        maxRetryAfter: Number.POSITIVE_INFINITY
    },
    Et = (e = {}) => {
        if (typeof e == "number") return q(_({}, Q), {
            limit: e
        });
        if (e.methods && !Array.isArray(e.methods)) throw new Error("retry.methods must be an array");
        if (e.statusCodes && !Array.isArray(e.statusCodes)) throw new Error("retry.statusCodes must be an array");
        return q(_(_({}, Q), e), {
            afterStatusCodes: re
        })
    },
    St = async (e, t, r) => new Promise((n, o) => {
        const s = setTimeout(() => {
            t && t.abort(), o(new Y(e))
        }, r.timeout);
        r.fetch(e).then(n).catch(o).then(() => {
            clearTimeout(s)
        })
    }),
    gt = async e => new Promise(t => {
        setTimeout(t, e)
    });
class A {
    constructor(t, r = {}) {
        var n, o, s;
        if (this._retryCount = 0, this._input = t, this._options = q(_({
                credentials: this._input.credentials || "same-origin"
            }, r), {
                headers: L(this._input.headers, r.headers),
                hooks: j({
                    beforeRequest: [],
                    beforeRetry: [],
                    beforeError: [],
                    afterResponse: []
                }, r.hooks),
                method: qt((n = r.method) !== null && n !== void 0 ? n : this._input.method),
                prefixUrl: String(r.prefixUrl || ""),
                retry: Et(r.retry),
                throwHttpErrors: r.throwHttpErrors !== !1,
                timeout: typeof r.timeout == "undefined" ? 1e4 : r.timeout,
                fetch: (o = r.fetch) !== null && o !== void 0 ? o : globalThis.fetch.bind(globalThis)
            }), typeof this._input != "string" && !(this._input instanceof URL || this._input instanceof globalThis.Request)) throw new TypeError("`input` must be a string, URL, or Request");
        if (this._options.prefixUrl && typeof this._input == "string") {
            if (this._input.startsWith("/")) throw new Error("`input` must not begin with a slash when using `prefixUrl`");
            this._options.prefixUrl.endsWith("/") || (this._options.prefixUrl += "/"), this._input = this._options.prefixUrl + this._input
        }
        if (wt && (this.abortController = new globalThis.AbortController, this._options.signal && this._options.signal.addEventListener("abort", () => {
                this.abortController.abort()
            }), this._options.signal = this.abortController.signal), this.request = new globalThis.Request(this._input, this._options), this._options.searchParams) {
            const a = typeof this._options.searchParams == "string" ? this._options.searchParams.replace(/^\?/, "") : new URLSearchParams(this._options.searchParams).toString(),
                i = "?" + a,
                c = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, i);
            (Rt && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers["content-type"]) && this.request.headers.delete("content-type"), this.request = new globalThis.Request(new globalThis.Request(c, this.request), this._options)
        }
        this._options.json !== void 0 && (this._options.body = JSON.stringify(this._options.json), this.request.headers.set("content-type", (s = this._options.headers.get("content-type")) !== null && s !== void 0 ? s : "application/json"), this.request = new globalThis.Request(this.request, {
            body: this._options.body
        }))
    }
    static create(t, r) {
        const n = new A(t, r),
            o = async () => {
                if (n._options.timeout > F) throw new RangeError(`The \`timeout\` option cannot be greater than ${F}`);
                await Promise.resolve();
                let i = await n._fetch();
                for (const c of n._options.hooks.afterResponse) {
                    const d = await c(n.request, n._options, n._decorateResponse(i.clone()));
                    d instanceof globalThis.Response && (i = d)
                }
                if (n._decorateResponse(i), !i.ok && n._options.throwHttpErrors) {
                    let c = new K(i, n.request, n._options);
                    for (const d of n._options.hooks.beforeError) c = await d(c);
                    throw c
                }
                if (n._options.onDownloadProgress) {
                    if (typeof n._options.onDownloadProgress != "function") throw new TypeError("The `onDownloadProgress` option must be a function");
                    if (!bt) throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");
                    return n._stream(i.clone(), n._options.onDownloadProgress)
                }
                return i
            },
            a = n._options.retry.methods.includes(n.request.method.toLowerCase()) ? n._retry(o) : o();
        for (const [i, c] of Object.entries(_t)) a[i] = async () => {
            n.request.headers.set("accept", n.request.headers.get("accept") || c);
            const P = (await a).clone();
            if (i === "json") {
                if (P.status === 204) return "";
                if (r.parseJson) return r.parseJson(await P.text())
            }
            return P[i]()
        };
        return a
    }
    _calculateRetryDelay(t) {
        if (this._retryCount++, this._retryCount < this._options.retry.limit && !(t instanceof Y)) {
            if (t instanceof K) {
                if (!this._options.retry.statusCodes.includes(t.response.status)) return 0;
                const n = t.response.headers.get("Retry-After");
                if (n && this._options.retry.afterStatusCodes.includes(t.response.status)) {
                    let o = Number(n);
                    return Number.isNaN(o) ? o = Date.parse(n) - Date.now() : o *= 1e3, typeof this._options.retry.maxRetryAfter != "undefined" && o > this._options.retry.maxRetryAfter ? 0 : o
                }
                if (t.response.status === 413) return 0
            }
            return .3 * 2 ** (this._retryCount - 1) * 1e3
        }
        return 0
    }
    _decorateResponse(t) {
        return this._options.parseJson && (t.json = async () => this._options.parseJson(await t.text())), t
    }
    async _retry(t) {
        try {
            return await t()
        } catch (r) {
            const n = Math.min(this._calculateRetryDelay(r), F);
            if (n !== 0 && this._retryCount > 0) {
                await gt(n);
                for (const o of this._options.hooks.beforeRetry)
                    if (await o({
                            request: this.request,
                            options: this._options,
                            error: r,
                            retryCount: this._retryCount
                        }) === te) return;
                return this._retry(t)
            }
            throw r
        }
    }
    async _fetch() {
        for (const t of this._options.hooks.beforeRequest) {
            const r = await t(this.request, this._options);
            if (r instanceof Request) {
                this.request = r;
                break
            }
            if (r instanceof Response) return r
        }
        return this._options.timeout === !1 ? this._options.fetch(this.request.clone()) : St(this.request.clone(), this.abortController, this._options)
    }
    _stream(t, r) {
        const n = Number(t.headers.get("content-length")) || 0;
        let o = 0;
        return new globalThis.Response(new globalThis.ReadableStream({
            async start(s) {
                const a = t.body.getReader();
                r && r({
                    percent: 0,
                    transferredBytes: 0,
                    totalBytes: n
                }, new Uint8Array);
                async function i() {
                    const {
                        done: c,
                        value: d
                    } = await a.read();
                    if (c) {
                        s.close();
                        return
                    }
                    if (r) {
                        o += d.byteLength;
                        const P = n === 0 ? 0 : o / n;
                        r({
                            percent: P,
                            transferredBytes: o,
                            totalBytes: n
                        }, d)
                    }
                    s.enqueue(d), await i()
                }
                await i()
            }
        }))
    }
} /*! MIT License © Sindre Sorhus */
const x = e => {
        const t = (r, n) => A.create(r, E(e, n));
        for (const r of ee) t[r] = (n, o) => A.create(n, E(e, o, {
            method: r
        }));
        return t.create = r => x(E(r)), t.extend = r => x(E(e, r)), t.stop = te, t
    },
    At = x();
var Ct = At;
const Ut = async (e, t) => {
        const r = Z({
            accessKey: "2Z53wBSWJVEmkXRa81cfNdjIQazdP-K9wf_X_m5DIzQ"
        });
        try {
            const n = await r.search.getPhotos({
                query: e,
                page: b(t, "page", 1),
                perPage: b(t, "perPage", 10),
                color: b(t, "color", void 0),
                orientation: b(t, "orientation", "landscape")
            });
            return b(n, "response.results", [])
        } catch (n) {
            return console.error(n), n
        }
    },
    Dt = async e => {
        try {
            const t = Z({
                accessKey: "2Z53wBSWJVEmkXRa81cfNdjIQazdP-K9wf_X_m5DIzQ"
            });
            console.log(`About to track unsplash download ${e}...`), t.photos.trackDownload({
                downloadLocation: e
            })
        } catch (t) {
            throw console.error(t), t
        }
    },
    Ht = async e => {
        const t = Re(_e, "signUploadUrl");
        try {
            const r = await t({
                    extension: e
                }),
                n = await b(r, "data.uploadUrl"),
                o = await b(r, "data.destinationUrl");
            return {
                uploadUrl: n,
                destinationUrl: o
            }
        } catch (r) {
            console.error(r)
        }
    },
    jt = async (e, t) => {
        const r = await Ct.put(e, {
            headers: {
                "Content-Type": t.file.type
            },
            body: t.file
        });
        if (r.ok) {
            const n = r.url.split("?")[0];
            return console.log(`Uploaded file successfully - ${n}`), {
                url: n
            }
        } else throw new Error(r.statusText)
    },
    Ot = (e, t = 1e3) => new Promise(r => {
        setTimeout(() => r(e), t)
    }),
    $t = async (e, t) => {
        const r = await Ot(t) || await Ut(e, {
                perPage: "400"
            }),
            n = t ? "cache" : "unsplash",
            o = Ae(r);
        return {
            source: n,
            images: o.map(s => {
                var a;
                return (a = s == null ? void 0 : s.urls) == null ? void 0 : a.regular
            }),
            imageCache: r
        }
    };
export {
    Ht as a, Ee as b, $t as g, Ut as s, Dt as t, jt as u
};
//# sourceMappingURL=media.fe609717.js.map