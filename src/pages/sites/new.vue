<script setup>
const route = useRoute();
const siteTitle = "AI Website Builder";
const description =
  "With Mixo's AI Website Builder, you can create your website in minutes and customize it for free with our easy-to-use no-code editor.";
useHead({
  title: siteTitle,
  link: [{ rel: "canonical", href: "https://app.mixo.io" + route.path }],
  meta: [
    { name: "description", content: description },
    { name: "og:title", content: siteTitle },
    { name: "og:site_name", content: siteTitle },
    { name: "og:description", content: description },
    {
      name: "og:image",
      content:
        "https://storage.googleapis.com/mixo-sites/images/file-2ea8702c-b5e0-4026-80fc-d60d790bb5b0.png",
    },
    { name: "twitter:title", content: siteTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image:src",
      content:
        "https://storage.googleapis.com/mixo-sites/images/file-2ea8702c-b5e0-4026-80fc-d60d790bb5b0.png",
    },
  ],
});
</script>

<template>
  <div class="px-2 md:px-4 2xl:container">
    <SiteGenerator />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  requiresAuth: false
  container: false
</route>
