<script setup>
import { getSites } from "@/lib/sites";
import { getCurrentUser } from "vuefire";
import { first } from "lodash-es";

// Composables
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  let path = "/ai-website-builder";

  const currentUser = await getCurrentUser();
  const isNewSiteRoute = route.path === "/ai-website-builder";

  // Only redirect if we have a user and we're not on the new site route so users don't lose their idea
  if (currentUser && !isNewSiteRoute) {
    // load existing sites
    const sites = await getSites();
    const site = first(sites);
    const siteId = site?.id;

    if (siteId) {
      path = `/sites/${siteId}`;
    }
  }

  router.push({ path });
});
</script>

<template>
  <UiCenter>
    <UiLoader />
  </UiCenter>
</template>
