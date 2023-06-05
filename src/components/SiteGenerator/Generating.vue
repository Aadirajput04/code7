<template>
  <SiteGeneratorWrap inner-class="h-80" :animating="true">
    <UiCenter class="space-y-3 flex-col sm:space-x-3 sm:flex-row sm:space-y-0 h-full">
      <img class="w-12" :src="activePrompt?.imageUrl" :alt="activePrompt?.text" />
      <p class="text-slate-800 font-bold px-2 animate-pulse text-2xl text-center">
        {{ activePrompt?.text }}
      </p>
    </UiCenter>
  </SiteGeneratorWrap>
</template>

<script setup>
import { setupMachine } from "@/composables";
import GeneratorLoaderMachine from "@/machines/generator-loader-machine";

const emit = defineEmits(["complete"]);

// State
const machineOptions = {
  context: {},
  actions: {
    emitComplete: () => emit("complete"),
  },
};
const { state: generatorLoaderState, send: sendToGeneratorLoaderService } = setupMachine(
  GeneratorLoaderMachine,
  "Generator Loader",
  machineOptions
);

// Data
const prompts = [
  {
    text: "Connecting to AI...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/102-wifi-outline.gif",
  },
  {
    text: "Submitting description...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/49-upload-file-outline.gif",
  },
  {
    text: "Generating a startup name...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/63-settings-cog-outline.gif",
  },
  {
    text: "Designing a logo...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/45-category-outline.gif",
  },
  {
    text: "Collecting site images...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/42-search-outline.gif",
  },
  {
    text: "Crafting testimonials...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/8-account-outline.gif",
  },
  {
    text: "Writing site copy...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/50-file-outline.gif",
  },
  {
    text: "Generating site code...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/34-code-outline.gif",
  },
  {
    text: "Configuring site...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/22-build-outline.gif",
  },
  {
    text: "Adding social sharing...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/1-share-outline.gif",
  },
  {
    text: "Optimising SEO...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/10-analytics-outline.gif",
  },
  {
    text: "Enhancing mobile experience...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/15-ratio-outline.gif",
  },
  {
    text: "Improving page performance...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/33-speed-outline.gif",
  },
  {
    text: "Adding final touches...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/134-celebration-outline.gif",
  },
  {
    text: "Still adding final touches...",
    imageUrl:
      "https://storage.googleapis.com/mixo-files/public/img/icons/134-celebration-outline.gif",
  },
];
const activePrompt = eagerComputed(() => {
  return prompts[generatorLoaderState?.value?.value];
});
</script>
