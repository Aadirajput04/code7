<template>
  <div class="p-4 rounded-md shadow" :class="`ui-alert-${type}`">
    <div class="flex">
      <div class="flex-shrink-0">
        <IconIcRoundWarning class="w-6 h-6 ui-alert-icon" v-if="type === 'warning'" />
        <IconIcBaselineCheckCircle
          class="w-6 h-6 ui-alert-icon"
          v-if="type === 'success'"
        />
        <IconIcRoundInfo class="w-6 h-6 ui-alert-icon" v-if="type === 'info'" />
        <IconIcBaselineError class="w-6 h-6 ui-alert-icon" v-if="type === 'error'" />
      </div>

      <div class="ml-3 space-y-2">
        <h3 v-if="title" class="text-base font-bold ui-alert-title">
          {{ title }}
        </h3>

        <div
          v-if="$slots.default || buttonAction || messages.length"
          class="space-y-2 ui-alert-content"
        >
          <div class="space-y-4">
            <div>
              <slot />
            </div>

            <div class="flex items-center gap-2">
              <slot name="controls" />
              <UiButton
                v-if="buttonAction"
                size="xs"
                theme="tertiary"
                @click="buttonAction"
                >{{ buttonLabel }}</UiButton
              >
            </div>
          </div>

          <details
            v-if="messages.length && messages[0]"
            class="text-sm ui-alert-details pt-1 max-w-sm"
          >
            <summary>
              <em>Boring Technical Details</em>
            </summary>
            <ul role="list" class="pl-5 space-y-1 list-disc">
              <li v-for="(message, index) in messages" :key="index">
                {{ message }}
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiAlert",
  props: {
    buttonAction: {
      type: Function,
      default: null,
    },
    buttonLabel: {
      type: String,
      default: "Retry?",
    },
    messages: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="postcss">
.ui-alert-danger,
.ui-alert-error {
  @apply bg-red-50 border border-red-100;

  & .ui-alert-icon {
    @apply text-red-400;
  }

  & .ui-alert-title {
    @apply text-red-800;
  }

  & .ui-alert-content {
    @apply text-red-700;
  }

  & .ui-alert-details {
    @apply text-red-400;
  }
}

.ui-alert-info {
  @apply bg-blue-50 border border-blue-100;

  & .ui-alert-icon {
    @apply text-blue-400;
  }

  & .ui-alert-title {
    @apply text-blue-800;
  }

  & .ui-alert-content {
    @apply text-blue-700;
  }

  & .ui-alert-details {
    @apply text-blue-300;
  }
}

.ui-alert-success {
  @apply bg-emerald-50 border border-emerald-100;

  & .ui-alert-icon {
    @apply text-emerald-500;
  }

  & .ui-alert-title {
    @apply text-emerald-600;
  }

  & .ui-alert-content {
    @apply text-emerald-700;
  }

  & .ui-alert-details {
    @apply text-emerald-300;
  }
}
.ui-alert-warning {
  @apply bg-yellow-50 border border-yellow-100;

  & .ui-alert-icon {
    @apply text-yellow-500;
  }

  & .ui-alert-title {
    @apply text-yellow-700;
  }

  & .ui-alert-content {
    @apply text-yellow-700;
  }

  & .ui-alert-details {
    @apply text-yellow-300;
  }
}
</style>
