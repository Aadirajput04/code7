<template>
  <component
    :is="is"
    :to="to"
    class="ui-button"
    :class="classObject"
    v-bind="$attrs"
    :type="type"
    :disabled="loading || disabled"
  >
    <UiLoader
      v-if="loading"
      :textColorClass="loadingClass"
      :iconColorClass="loadingClass"
      :label="loadingLabel"
      :size="size"
      class="!font-semibold"
    />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import UiLoader from "../UiLoader/UiLoader.vue";

export default {
  components: { UiLoader },
  props: {
    danger: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingLabel: {
      type: String,
      default: "",
    },
    loadingClass: {
      type: String,
      default: "text-white",
    },
    size: {
      type: String,
      default: "base",
    },
    theme: {
      type: String,
      default: "primary",
    },
    to: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      classObject: {
        [`ui-button-${this.size}`]: this.size,
        [`ui-button-${this.theme}`]: this.theme,
        "ui-button-danger": this.danger,
      },
      loaderClassObject: {
        [`ui-loader-${this.theme}`]: this.theme,
      },
    };
  },
  computed: {
    is() {
      if (this?.$attrs?.href) return "a";

      if (this?.$props?.to) return "router-link";

      return "button";
    },
    type() {
      if (this?.$attrs?.type) return this?.$attrs?.type;

      if (this?.is === "button") return "button";

      return null;
    },
  },
};
</script>

<style>
.ui-button {
  @apply inline-flex items-center font-medium border border-transparent rounded-md focus:outline-none text-center justify-center no-underline space-x-1;
}

/* Sizes */
.ui-button-xs {
  @apply px-2.5 py-1.5 text-xs;
}

.ui-button-sm {
  @apply px-3 py-2 text-sm;
}

.ui-button-base {
  @apply px-4 py-2 text-base;
}

.ui-button-md {
  @apply px-4 py-2 text-base;
}

.ui-button-lg {
  @apply px-6 py-3 text-lg;
}

.ui-button-xl {
  @apply px-8 py-4 text-xl;
}

/* Themes */
.ui-button-primary {
  @apply text-white !bg-primary shadow hover:!bg-secondary focus:ring-2 focus:ring-primary/75 focus:ring-offset-2 active:shadow-none;
}

.ui-button-secondary {
  @apply text-white !bg-secondary shadow border-slate-200 hover:!bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary active:shadow-none;

  & .ui-button-danger {
    @apply hover:text-red-700 hover:border-red-700 focus:ring-red-700 focus:text-red-700;
  }
}

.ui-button-tertiary {
  @apply shadow bg-slate-400 text-white focus:ring-2 focus:ring-offset-2 focus:ring-slate-500  hover:bg-slate-500 active:shadow-none;
}

.ui-button-link {
  @apply px-0 text-primary;
  @apply hover:underline hover:text-secondary;

  & .ui-button-danger {
    @apply hover:text-red-700;
  }
}

.ui-button-brand-primary {
  @apply text-white !bg-brand-primary shadow hover:!bg-brand-secondary hover:text-yellow-800 focus:ring-2 focus:ring-brand-primary/75 focus:ring-offset-2 active:shadow-none font-semibold;

  @apply disabled:!bg-slate-300 disabled:text-slate-500
    disabled:cursor-not-allowed;
}

.ui-button-brand-secondary {
  @apply text-yellow-800 !bg-brand-secondary shadow hover:!bg-brand-primary focus:ring-2 focus:ring-brand-secondary/75 focus:ring-offset-2 active:shadow-none hover:text-white;
}

.ui-button-brand-success {
  @apply text-white !bg-emerald-500 shadow hover:!bg-brand-primary focus:ring-2 focus:ring-emerald-500/75 focus:ring-offset-2 active:shadow-none hover:text-white;
}

.ui-button-brand-link {
  @apply px-0 text-brand-primary;
  @apply hover:underline hover:text-brand-secondary;

  & .ui-button-danger {
    @apply hover:text-red-700;
  }
}

.ui-button-outline {
  @apply text-slate-500 !bg-transparent shadow hover:!bg-white focus:ring-2 focus:ring-brand-secondary/75 focus:ring-offset-2 active:shadow-none border-slate-300;
}

.ui-button-tertiary {
  @apply text-slate-500 !bg-white shadow hover:!bg-slate-100 focus:ring-2 focus:ring-slate-300/75 focus:ring-offset-2 active:shadow-none border-slate-300;
}
</style>
