<script>
import vueFinalModal from "vue-final-modal";
import { isDark, preferredDark } from "@/composables";
import { DEVELOPMENT } from "~/utils/constants.js";
import { asyncComponentDefaults } from "@/composables";
const Maintenance = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("@/components/Maintenance.vue"),
});
const { ModalsContainer } = vueFinalModal;

export default {
  name: "App",
  components: {
    ModalsContainer,
  },
  setup() {
    const route = useRoute();

    const scripts = ref([
      // Rewardful
      {
        children:
          "(function (w, r) { w._rwq = r; w[r] = w[r] || function () { (w[r].q = w[r].q || []).push(arguments) } })(window, 'rewardful');",
      },
      {
        src: "https://r.wdfl.co/rw.js",
        async: true,
        "data-rewardful": "35dd66",
      },
      // Crisp
      {
        children:
          "window.$crisp = []; window.CRISP_WEBSITE_ID = '211a89ee-af11-4718-937e-be995ea69b2b'; (function() { d = document; s = d.createElement('script'); s.src = 'https://client.crisp.chat/l.js'; s.async = 1; d.getElementsByTagName('head')[0].appendChild(s) })()",
        async: true,
      },
    ]);

    // Don't load any third party scripts on the sites preview page
    if (route?.name === "sites-preview" || route?.path === "/sites/preview") {
      scripts.value = [];
    }

    useHead({
      title: "Home",
      titleTemplate: "Mixo | %s",
      meta: [
        {
          name: "description",
          content: "AI-powered page builder to launch and validate your startup ideas.",
        },
        {
          name: "theme-color",
          content: computed(() => (isDark.value ? "#f1f5f9" : "#f1f5f9")),
        },
        { name: "og:title", content: "Mixo" },
        { name: "og:url", content: route.path },
        { name: "twitter:url", content: route.path },
        { name: "og:site_name", content: "Mixo" },
        { name: "og:type", content: "website" },
        {
          name: "og:description",
          content: "AI-powered page builder to launch and validate your startup ideas.",
        },
        {
          name: "og:image",
          content:
            "https://storage.googleapis.com/mixo-sites/images/file-2ea8702c-b5e0-4026-80fc-d60d790bb5b0.png",
        },
        { name: "og:image:alt", content: "Mixo.io" },
        { name: "twitter:title", content: "Mixo" },
        {
          name: "twitter:description",
          content: "AI-powered page builder to launch and validate your startup ideas.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image:src",
          content:
            "https://storage.googleapis.com/mixo-sites/images/file-2ea8702c-b5e0-4026-80fc-d60d790bb5b0.png",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: computed(() =>
            preferredDark.value ? "/favicon-dark.svg" : "/favicon.svg"
          ),
        },
      ],
      htmlAttrs: {
        class: DEVELOPMENT ? "debug-screens" : "",
      },
      script: scripts,
    });

    const MAINTENANCE_MODE = false;
    const MIXO_ADMIN =
      typeof window !== "undefined" &&
      window?.localStorage.getItem("mixo-admin") === "true";

    const network = useNetwork();

    return {
      network,
      MAINTENANCE_MODE,
      MIXO_ADMIN,
    };
  },
};
</script>

<template>
  <div
    v-if="!network?.isOnline?.value"
    class="text-center p-1 md:py-3 bg-red-100 text-sm text-red-800 border-b border-red-200"
  >
    It looks like you're not connected to the internet. Please reconnect before
    continuing.
  </div>

  <ClientOnly>
    <ModalsContainer />
  </ClientOnly>

  <Maintenance v-if="MAINTENANCE_MODE && !MIXO_ADMIN" />

  <RouterView />
</template>
