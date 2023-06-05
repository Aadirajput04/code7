<template>
  <VueFinalModal
    v-slot="{ params, close }"
    v-bind="$attrs"
    :name="name"
    :ssr="false"
    :esc-to-close="escToClose"
    :click-to-close="clickToClose"
    classes="flex justify-center items-center backdrop-blur-sm my-4"
    :content-class="`relative flex flex-col max-h-full p-4 md:p-6 mx-4 space-y-4 bg-white border border-slate-300 rounded-3xl shadow-md ${contentClasses}`"
  >
    <span v-if="$slots.title" class="mr-8 text-xl font-bold pt-1 px-1">
      <slot name="title" />
    </span>

    <!-- Need padding here to prevent scroll bars showing when the loading components is visible -->
    <div class="flex-grow overflow-auto p-1">
      <slot :params="params" />
    </div>

    <div
      v-if="$slots.actions || actions"
      class="flex items-center justify-center flex-shrink-0 space-x-2 pb-1 px-1"
    >
      <slot name="actions">
        <UiButton size="sm" theme="primary" @click="$emit('confirm', close)">
          Confirm
        </UiButton>

        <UiButton size="sm" theme="outline" @click="$emit('cancel', close)">
          Cancel
        </UiButton>
      </slot>
    </div>

    <button
      type="button"
      class="absolute top-2 !mt-0 right-3 text-slate-600 hover:text-red-800"
      @click="close"
      v-if="showClose"
    >
      <IconGridiconsCrossSmall />
    </button>
  </VueFinalModal>
</template>

<script>
export default {
  name: "UiModal",
  inheritAttrs: false,
  props: {
    actions: {
      type: Boolean,
      default: false,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    contentClasses: {
      type: String,
      default: "",
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["confirm", "cancel"],
};
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>
