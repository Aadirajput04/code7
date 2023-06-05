<script setup>
import Logo from "@/assets/logo/mixo.svg";

const props = defineProps({
  size: {
    type: String,
    default: "",
  },
  tag: {
    type: String,
    default: "router-link",
  },
  to: {
    type: String,
    default: "/",
  },
});

const iconSize = eagerComputed(() => {
  switch (props.size) {
    case "sm":
      return "w-5 h-5";
    case "md":
      return "w-8 h-8";
    case "lg":
      return "w-12 h-12";
    default:
      return "w-7 h-7";
  }
});

const textSize = eagerComputed(() => {
  switch (props.size) {
    case "sm":
      return "text-lg";
    case "md":
      return "text-3xl";
    case "lg":
      return "text-4xl";
    default:
      return "text-xl";
  }
});
</script>

<template>
  <component
    :is="tag"
    :to="to"
    class="flex items-center shrink-0 space-x-1"
    data-testid="brand-logo"
  >
    <img :class="iconSize" :src="Logo" alt="Mixo Logo" />
    <span class="font-sans font-extrabold text-slate-800" :class="textSize"> Mixo </span>
  </component>
</template>

<style scoped>
.brand-logo {
  /* Base Styles */
}
</style>
