<script setup>
import { asyncComponentDefaults } from "@/composables";
import { authProvider } from "@/utils/auth";

const route = useRoute();

useHead({
  bodyAttrs: {
    class: "bg-slate-100",
  },
});

// Props
const props = defineProps({
  error: {
    type: Object,
    default() {
      return {};
    },
  },
});

const AuthForm = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("@/components/AuthForm/AuthForm.vue"),
});

provide("openAuthModal", authProvider(AuthForm));

const container = eagerComputed(() => {
  return route?.meta?.container === false ? false : true;
});
</script>

<template>
  <main>
    <MainNav />

    <UiAlert v-if="error?.message" :title="error.message" />

    <div class="py-4 md:py-6 lg:py-8" :class="{ container }">
      <RouterView v-bind="$attrs" :key="$route.fullPath" />
    </div>
  </main>
</template>
