import {
    clientsClaim as workbox_core_clientsClaim
} from '/home/runner/work/mixo-app/mixo-app/client/app/node_modules/workbox-core/clientsClaim.mjs';
import {
    precacheAndRoute as workbox_precaching_precacheAndRoute
} from '/home/runner/work/mixo-app/mixo-app/client/app/node_modules/workbox-precaching/precacheAndRoute.mjs';
import {
    cleanupOutdatedCaches as workbox_precaching_cleanupOutdatedCaches
} from '/home/runner/work/mixo-app/mixo-app/client/app/node_modules/workbox-precaching/cleanupOutdatedCaches.mjs';
import {
    registerRoute as workbox_routing_registerRoute
} from '/home/runner/work/mixo-app/mixo-app/client/app/node_modules/workbox-routing/registerRoute.mjs';
import {
    NavigationRoute as workbox_routing_NavigationRoute
} from '/home/runner/work/mixo-app/mixo-app/client/app/node_modules/workbox-routing/NavigationRoute.mjs';
import {
    createHandlerBoundToURL as workbox_precaching_createHandlerBoundToURL
} from '/home/runner/work/mixo-app/mixo-app/client/app/node_modules/workbox-precaching/createHandlerBoundToURL.mjs';
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */








self.skipWaiting();

workbox_core_clientsClaim();


/**
 * The precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox_precaching_precacheAndRoute([{
        "url": "assets/_...all_.08f3e85c.js",
        "revision": null
    },
    {
        "url": "assets/_assignValue.893c69e5.js",
        "revision": null
    },
    {
        "url": "assets/_copyArray.2183cf44.js",
        "revision": null
    },
    {
        "url": "assets/_id_.10e4b8e3.js",
        "revision": null
    },
    {
        "url": "assets/_id_.2af9dab8.css",
        "revision": null
    },
    {
        "url": "assets/404.91bfd6ef.js",
        "revision": null
    },
    {
        "url": "assets/access-machine.349d1b5c.js",
        "revision": null
    },
    {
        "url": "assets/app.a1b72515.css",
        "revision": null
    },
    {
        "url": "assets/app.e27838e5.js",
        "revision": null
    },
    {
        "url": "assets/auth.0c82a2c8.js",
        "revision": null
    },
    {
        "url": "assets/AuthForm.e9ca2ea7.js",
        "revision": null
    },
    {
        "url": "assets/baseline-tiktok.7f0b617f.js",
        "revision": null
    },
    {
        "url": "assets/blank.54be1716.js",
        "revision": null
    },
    {
        "url": "assets/blank.a7770adb.css",
        "revision": null
    },
    {
        "url": "assets/blank.f4f55d54.js",
        "revision": null
    },
    {
        "url": "assets/BrowserUi.5aed889a.css",
        "revision": null
    },
    {
        "url": "assets/BrowserUi.f4994d26.js",
        "revision": null
    },
    {
        "url": "assets/check.a548b91d.js",
        "revision": null
    },
    {
        "url": "assets/copy-bold.61929160.js",
        "revision": null
    },
    {
        "url": "assets/Cta.44e812de.css",
        "revision": null
    },
    {
        "url": "assets/Cta.99cbc88e.js",
        "revision": null
    },
    {
        "url": "assets/discord.ea805e71.js",
        "revision": null
    },
    {
        "url": "assets/DomainSettings.60841658.js",
        "revision": null
    },
    {
        "url": "assets/edit.4f72ac32.js",
        "revision": null
    },
    {
        "url": "assets/EditField.707c8331.js",
        "revision": null
    },
    {
        "url": "assets/editor.605232ad.js",
        "revision": null
    },
    {
        "url": "assets/empty.1706e1c4.js",
        "revision": null
    },
    {
        "url": "assets/external-link.a134d0f1.js",
        "revision": null
    },
    {
        "url": "assets/facebook.646c48ae.js",
        "revision": null
    },
    {
        "url": "assets/Faqs.5324904e.js",
        "revision": null
    },
    {
        "url": "assets/Features.dbc6d606.js",
        "revision": null
    },
    {
        "url": "assets/index.18d4ef83.js",
        "revision": null
    },
    {
        "url": "assets/index.907e950c.js",
        "revision": null
    },
    {
        "url": "assets/index.afe06d62.js",
        "revision": null
    },
    {
        "url": "assets/instagram.e4b76ca0.js",
        "revision": null
    },
    {
        "url": "assets/linkedin.37cacd42.js",
        "revision": null
    },
    {
        "url": "assets/login.c2500d7f.js",
        "revision": null
    },
    {
        "url": "assets/logout.70210db3.js",
        "revision": null
    },
    {
        "url": "assets/MarketingFaqs.dea97eb1.js",
        "revision": null
    },
    {
        "url": "assets/media.fe609717.js",
        "revision": null
    },
    {
        "url": "assets/MediaLibrary.97c81614.js",
        "revision": null
    },
    {
        "url": "assets/MediaUploader.1b5d7d72.js",
        "revision": null
    },
    {
        "url": "assets/new.2b84c413.js",
        "revision": null
    },
    {
        "url": "assets/new.cf4398f3.css",
        "revision": null
    },
    {
        "url": "assets/Note.00a34d35.css",
        "revision": null
    },
    {
        "url": "assets/Note.1cc66505.js",
        "revision": null
    },
    {
        "url": "assets/ping.f02d1707.js",
        "revision": null
    },
    {
        "url": "assets/planet-ring2-line.eb2bb610.js",
        "revision": null
    },
    {
        "url": "assets/PlanSelector.4a86a2ca.js",
        "revision": null
    },
    {
        "url": "assets/preview.2448df02.js",
        "revision": null
    },
    {
        "url": "assets/preview.a89f9882.css",
        "revision": null
    },
    {
        "url": "assets/pricing.d39c0a42.js",
        "revision": null
    },
    {
        "url": "assets/privacy.337c534d.js",
        "revision": null
    },
    {
        "url": "assets/PromoCode.f163a98c.js",
        "revision": null
    },
    {
        "url": "assets/route-block.9b0645f8.js",
        "revision": null
    },
    {
        "url": "assets/save24-regular.65bcdb0e.js",
        "revision": null
    },
    {
        "url": "assets/set.45204d52.js",
        "revision": null
    },
    {
        "url": "assets/site-machine.a0b137fc.js",
        "revision": null
    },
    {
        "url": "assets/site-schema.740196f3.js",
        "revision": null
    },
    {
        "url": "assets/site-schema.e30bf265.css",
        "revision": null
    },
    {
        "url": "assets/SiteEditor.1702ab56.css",
        "revision": null
    },
    {
        "url": "assets/SiteEditor.46685e70.js",
        "revision": null
    },
    {
        "url": "assets/SiteSettings.84b88815.js",
        "revision": null
    },
    {
        "url": "assets/SiteSettings.8b5c8a6c.css",
        "revision": null
    },
    {
        "url": "assets/snapchat.4a7bb4ca.js",
        "revision": null
    },
    {
        "url": "assets/SocialPreview.589f2bc4.js",
        "revision": null
    },
    {
        "url": "assets/star.03b6facb.js",
        "revision": null
    },
    {
        "url": "assets/success.b59c1cbd.js",
        "revision": null
    },
    {
        "url": "assets/support.6a57e97c.js",
        "revision": null
    },
    {
        "url": "assets/terms-affiliate.d49be3b0.js",
        "revision": null
    },
    {
        "url": "assets/terms-ltd.777ab854.js",
        "revision": null
    },
    {
        "url": "assets/terms.6206c0fc.js",
        "revision": null
    },
    {
        "url": "assets/Testimonials.dc2e6932.js",
        "revision": null
    },
    {
        "url": "assets/twitter.372d3a84.js",
        "revision": null
    },
    {
        "url": "assets/UiHeading.6d814843.js",
        "revision": null
    },
    {
        "url": "assets/UnsplashSearch.b6b64ebb.js",
        "revision": null
    },
    {
        "url": "assets/UpgradeNotice.938cdef8.js",
        "revision": null
    },
    {
        "url": "assets/VimeoSelector.ba9b1380.js",
        "revision": null
    },
    {
        "url": "assets/virtual_pwa-register.a5cf61fc.js",
        "revision": null
    },
    {
        "url": "assets/whatsapp.050271d2.js",
        "revision": null
    },
    {
        "url": "assets/youtube.47d37168.js",
        "revision": null
    },
    {
        "url": "assets/YoutubeSelector.932acb1a.js",
        "revision": null
    },
    {
        "url": "assets/zapier.7064b686.js",
        "revision": null
    },
    {
        "url": "checkout/success.html",
        "revision": "33843f0cef33bfcf4efa35baf16b884e"
    },
    {
        "url": "index.html",
        "revision": "2c4f1f75dfd5659839adcaca55663af3"
    },
    {
        "url": "login.html",
        "revision": "a833c72c2e03380f12a97d1332f9659d"
    },
    {
        "url": "logout.html",
        "revision": "289b9bd9ad8f41dde967ceb42042622c"
    },
    {
        "url": "oauth/zapier.html",
        "revision": "d0a23f33a69c3cbdd62e4e3829756da8"
    },
    {
        "url": "ping.html",
        "revision": "d1b5474a3674f95beb36ff019979d58f"
    },
    {
        "url": "pricing.html",
        "revision": "83baaeb026b0a102b4622e4b2fdb722c"
    },
    {
        "url": "privacy.html",
        "revision": "a4e3a414bdc81dd637d7d9f971202870"
    },
    {
        "url": "sites/blank.html",
        "revision": "2d722bf7a1e0138a841cb1bede07fc54"
    },
    {
        "url": "sites/new.html",
        "revision": "db985965ecb4162b55984b53887bd446"
    },
    {
        "url": "sites/preview.html",
        "revision": "493b11c62b93141d15a5328b75e20c8f"
    },
    {
        "url": "support.html",
        "revision": "517de64d39b4243d0c3dba48cdb0e53f"
    },
    {
        "url": "terms-affiliate.html",
        "revision": "3ad86cca1eb86c584ea55e9b59866e58"
    },
    {
        "url": "terms-ltd.html",
        "revision": "db1d4776ef4e1e6ec5473d0371a28d1d"
    },
    {
        "url": "terms.html",
        "revision": "ff0d94078e41049a9e255e4ee33622b9"
    },
    {
        "url": "favicon.svg",
        "revision": "3d4c218d046f849997faa98465526f83"
    },
    {
        "url": "safari-pinned-tab.svg",
        "revision": "3d4c218d046f849997faa98465526f83"
    },
    {
        "url": "pwa-192x192.png",
        "revision": "5c57ed70dfaf87a9aff43611b01f014c"
    },
    {
        "url": "pwa-512x512.png",
        "revision": "54f81b66d77738460832a1aec4334105"
    },
    {
        "url": "manifest.webmanifest",
        "revision": "1a48c48a81cb372ae7284dd38cfcb738"
    }
], {});
workbox_precaching_cleanupOutdatedCaches();
workbox_routing_registerRoute(new workbox_routing_NavigationRoute(workbox_precaching_createHandlerBoundToURL("index.html")));