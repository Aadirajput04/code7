<template>
  <component
    :is="tag || `h${level}`"
    class="leading-tight tracking-tight inline-flex items-center space-x-2"
    :class="classObject"
    data-testid="ui-heading"
  >
    <slot name="icon"/>
    <span>
      <slot />
    </span>
  </component>
</template>

<script>
import { eagerComputed } from '@vueuse/core'

export default {
  name: 'UiHeading',
  props: {
    level: {
      default: 1,
      type: Number,
      validator(value) {
        // Here PurgeCSS picks up the selectors and
        // does not remove their styles from the CSS.
        const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
        return headings.includes(`h${value}`);
      },
    },
    preIconClass: {
      type: String,
      default: ""
    },
    size: {
      default: null,
      type: Number,
    },
    tag: {
      default: null,
      type: String,
    },
    textColorClass: {
      type: String,
      default: 'text-slate-800',
    },
  },
  setup(props) {
    const sizes = eagerComputed(() => {
      switch (props.size || props.level) {
        case 1:
          return {
            "font-extrabold text-3xl sm:text-4xl md:text-5xl": true,
          };
        case 2:
          return {
            "font-bold text-2xl sm:text-3xl md:text-4xl": true,
          };
        case 3:
          return {
            "font-semibold text-xl sm:text-2xl md:text-3xl": true,
          };
        case 4:
          return {
            "font-semibold text-xl sm:text-xl md:text-2xl": true,
          };
        case 5:
          return {
            "font-semibold text-base md:text-lg": true,
          };
        case 6:
          return {
            "font-semibold text-base md:text-lg": true,
          };
        default:
          return {};
      }
    });

    const classObject = eagerComputed(() => {
      return {
        ...sizes.value,
        [props.textColorClass]: true,
      };
    });

    return {
      classObject,
    }
  },
}
</script>
