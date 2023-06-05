<script setup>
import { useCurrentUser } from "vuefire";
import { isSmallScreen } from "@/composables";

const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: true,
  },
  showAccountSelector: {
    type: Boolean,
    default: true,
  },
});

// Injections
const route = useRoute();

// Composables
const currentUser = useCurrentUser();
</script>

<template>
  <div class="w-full bg-slate-100 py-2 md:py-4">
    <div
      class="flex justify-between"
      :class="{ container: !fullWidth, 'px-2 md:px-4': fullWidth }"
    >
      <div class="flex items-center space-x-2 md:space-x-4">
        <slot name="pre" />

        <BrandLogo />
        <slot />

        <SiteSelector v-if="currentUser?.uid && showAccountSelector" :key="route?.path" />
      </div>

      <div class="flex items-center space-x-2 md:space-x-4 justify-end">
        <slot name="meta" />

        <Suspense>
          <AccountDropdown />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discord-icon {
  @apply text-discord;
}

.discord-icon:hover .community-tag {
  @apply md:block;
}
.community-tag {
  @apply hidden absolute font-semibold;
  bottom: -21px;
  width: 100px;
  line-height: 11px;
  font-size: 10px;
  z-index: 1;
  text-align: center;
  left: -30px;
  text-shadow: 0 0 1px white;
}
</style>
