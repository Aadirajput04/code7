<template>
  <button
    class="default-link cursor-pointer"
    data-testid="support-link"
    @click="onClick"
  >
    <slot>contact support</slot>
  </button>
</template>

<script setup>
const onClick = () => {
  if (window?.$crisp) window?.$crisp.push(["do", "chat:open"]);
  else window.location = "mailto:team@mixo.io?subject=Help with Mixo";
};
</script>
