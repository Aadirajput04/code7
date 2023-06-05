<template>
  <div class="flex items-center font-extrabold animate-pulse" :class="classObject">
    <IconEntypoCircleWithCross
      class="animate-spin ui-loader-icon"
      :class="iconColorClass"
    />
    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: "UiLoader",
  props: {
    iconColorClass: {
      type: String,
      default: "text-brand-primary",
    },
    textColorClass: {
      type: String,
      default: "text-slate-800",
    },
    label: {
      type: String,
      default: "Loading...",
    },
    size: {
      type: String,
      default: "base",
    },
  },
  data() {
    return {
      classObject: {
        [`ui-loader-${this.size}`]: this.size,
        [this.textColorClass]: this.textColorClass,
      },
    };
  },
};
</script>

<style>
.ui-loader-base {
  @apply text-base;
  .ui-loader-icon {
    @apply w-5 h-5 mr-1.5;
  }
}

.ui-loader-sm {
  @apply text-sm;
  .ui-loader-icon {
    @apply w-4 h-4 mr-1;
  }
}
</style>
