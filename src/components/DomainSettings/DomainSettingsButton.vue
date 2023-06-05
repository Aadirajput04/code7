<template>
  <UiButton
    theme="brand-link"
    :size="size"
    data-testid="custom-domain-button"
    @click="onOpen"
  >
    <IconGridiconsDomains /><span>Customize Domain</span>
  </UiButton>
</template>

<script setup>
import { asyncComponentDefaults, showModal } from "@/composables";

const props = defineProps({
  size: {
    type: String,
    default: "sm",
  },
});

const DomainSettings = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("@/components/DomainSettings/DomainSettings.vue"),
});

const openAuthModal = inject("openAuthModal");
const siteService = inject("siteService");

const onOpen = () => {
  showModal(
    { name: "custom-domain", contentClasses: "w-full max-w-3xl" },
    {
      default: {
        component: DomainSettings,
        bind: {
          openAuthModal,
          siteService,
        },
      },
    }
  );
};
</script>
