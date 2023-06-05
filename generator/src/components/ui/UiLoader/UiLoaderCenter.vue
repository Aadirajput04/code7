<template>
  <UiCenter>
    <UiLoader :iconColorClass="iconColorClass" :label="label" />
  </UiCenter>
</template>

<script>
export default {
  name: 'UiLoader',
  props: {
    iconColorClass: {
      type: String,
      default: 'text-brand-primary',
    },
    label: {
      type: String,
      default: 'Loading...',
    },
  },
}
</script>
