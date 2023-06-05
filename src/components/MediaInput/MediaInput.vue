<script setup>
import { asyncComponentDefaults, showModal } from "@/composables";

const props = defineProps({
  context: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(["input"]);

// Injections
const $vfm = inject("$vfm");
const openAuthModal = inject("openAuthModal");

// Composables
const [thumbLoading, toggleThumbLoading] = useToggle();

const MediaLibrary = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("@/components/MediaLibrary/MediaLibrary.vue"),
});

// Data
const thumburl = eagerComputed(() => {
  const value = props?.context?._value;
  if (typeof value === "string") return value;

  // If we have an image return it's src
  if (value?.image?.src) {
    return value?.image?.src;
  }

  // If we have a video return it's thumbnailUrl
  if (value?.video?.thumbnailUrl) {
    return value?.video?.thumbnailUrl;
  }

  return null;
});

// Methods
const onInput = (input) => {
  thumbLoading.value = true;
  props?.context?.node?.input(input);
  $vfm.hide("media-library");
};

const onMediaClick = () => {
  showModal(
    {
      name: "media-library",
      clickToClose: false,
      contentClasses: "w-full max-w-4xl",
    },
    {
      default: {
        component: MediaLibrary,
        bind: {
          enableUnsplash: props?.context?.enableUnsplash,
          enableUploader: props?.context?.enableUploader,
          enableVideo: props?.context?.enableVideo,
          returnImagePathAsString: props?.context?.returnImagePathAsString,
          openAuthModal: openAuthModal,
        },
        on: {
          input: onInput,
        },
      },
    }
  );
};

const onThumbLoad = () => {
  thumbLoading.value = false;
};

const onRemoveClick = () => {
  props?.context?.node?.input();
};
</script>

<template>
  <div class="formkit-outer formkit-disabled:opacity-50" data-testid="media-input">
    <div class="formkit-wrapper flex flex-col space-y-4">
      <div
        v-if="context?._value"
        class="formkit-inner max-w-md formkit-invalid:border-red-500 mb-1 flex flex-col items-start space-y-2"
      >
        <button
          class="appearance-none cursor-pointer border border-slate-300 rounded-lg p-2 bg-white"
          type="button"
          @click="onMediaClick"
        >
          <UiLoader v-if="thumbLoading" />

          <img
            v-show="!thumbLoading"
            :key="context?._value"
            :src="thumburl"
            :alt="context?.label"
            :onload="onThumbLoad"
            class="w-full max-w-[8rem]"
          />
        </button>

        <button
          v-if="!thumbLoading"
          class="text-xs text-red-700"
          type="button"
          @click="onRemoveClick"
        >
          (remove)
        </button>
      </div>

      <UiButton
        v-if="!context?._value"
        type="button"
        theme="brand-secondary"
        size="sm"
        class="self-start"
        @click="onMediaClick"
      >
        <IconFluentImage24Regular class="w-4" />
        <span>Add</span>
      </UiButton>
    </div>
  </div>
</template>
