<template>
  <div
    class="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:h-full xl:grid-cols-10 2xl:gap-6"
  >
    <div
      class="lg:col-span-2 space-y-6 md:space-y-8 xl:col-span-3 xl:flex xl:flex-col xl:items-center"
    >
      <SiteGeneratorWrap inner-class="flex-none px-4 space-y-2 xl:max-w-sm">
        <img
          v-if="idea?.logoUrl"
          class="h-16 w-16 rounded-full"
          :src="idea?.logoUrl"
          :alt="idea?.ideaId"
        />
        <EditField
          :value="idea?.name"
          placeholder="Enter a site name..."
          name="siteName"
          validation="required|length:3,100"
          validation-label="Site Name"
          @input="$emit('on-site-name-input', $event)"
        >
          <p class="text-xl font-bold text-gray-900 break-all">
            {{ idea?.name }}
          </p>
        </EditField>

        <p class="sm:text-lg font-medium text-gray-900">
          {{ idea?.siteTitle }}
        </p>

        <p class="xl:text-lg text-gray-500">
          {{ idea?.description }}
        </p>

        <!-- Login state -->
        <div v-if="currentUser" class="space-y-3 space-x-0">
          <UiButton
            theme="brand-primary"
            class="w-full"
            loading-label="Claiming..."
            :disabled="reselectingImages"
            @click="$emit('on-claim-click')"
          >
            <IconFluentCalendarEdit20Filled class="w-4" />
            <span>Save and customize</span>
          </UiButton>
          <!-- <UiButton
            theme="outline"
            class="w-full"
            @click="$emit('on-regenerate-click')"
          >
            <IconFluentArrowCounterclockwise12Filled class="w-4" />
            <span>Regenerate</span>
          </UiButton> -->
          <UiButton
            theme="outline"
            class="w-full"
            size="sm"
            loading-class="text-slate-500"
            :loading="reselectingImages"
            loading-label="Reselecting Images..."
            @click="$emit('on-reselect-images-click')"
          >
            <IconFluentArrowCounterclockwise12Filled class="w-3" />
            <span>Refresh Image Selection</span>
          </UiButton>
        </div>

        <!-- Requires Login state -->
        <div v-else class="space-y-3 space-x-0">
          <UiButton
            theme="brand-primary"
            class="w-full"
            :disabled="reselectingImages"
            @click="$emit('on-auth-click')"
          >
            <IconFluentCalendarEdit20Filled class="w-4" />
            <span>Save and customize</span>
          </UiButton>
          <!-- <UiButton
            theme="outline"
            class="w-full"
            @click="$emit('on-regenerate-click')"
          >
            <IconFluentArrowCounterclockwise12Filled class="w-4" />
            <span>Regenerate</span>
          </UiButton> -->
          <UiButton
            theme="outline"
            class="w-full"
            size="sm"
            loading-class="text-slate-500"
            :loading="reselectingImages"
            loading-label="Reselecting Images..."
            @click="$emit('on-reselect-images-click')"
          >
            <IconFluentArrowCounterclockwise12Filled class="w-3" />
            <span>Refresh Image Selection</span>
          </UiButton>
        </div>
      </SiteGeneratorWrap>

      <Benefits
        :tags="idea?.tags"
        :site-social-image-url="idea?.siteData?.config?.siteSocialImageUrl"
        :site-description="idea?.siteData?.config?.siteDescription"
        :site-title="idea?.siteData?.config?.siteTitle"
        class="xl:max-w-sm"
      />
    </div>

    <BrowserUi
      :is-new-site="true"
      :show-custom-domain-link="false"
      @url-click="$emit('on-claim-click')"
      class="md:overflow-y-auto md:sticky md:top-0 md:self-start lg:col-span-4 xl:col-span-7"
    >
      <!-- Adding both h-full h-screen so h-full is a fallback in case h-screen isn't supported -->
      <iframe
        ref="previewFrame"
        :src="previewFrameSrc"
        class="w-full h-full h-screen"
        title="Page Preview"
        frameborder="0"
      />

      <div class="p-3 text-right">
        <p class="text-sm text-gray-300">
          <a href="https://unsplash.com/" rel="nofollow">Photos by Unsplash</a>
        </p>
      </div>
    </BrowserUi>
  </div>
</template>

<script setup>
import { useCurrentUser } from "vuefire";
import { capitalize } from "lodash-es";
import { APP_URL, SSR } from "~/utils/constants.js";

const props = defineProps({
  idea: {
    type: Object,
    required: true,
  },
  reselectingImages: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "on-auth-click",
  "on-claim-click",
  "on-regenerate-click",
  "on-edit-site-name-click",
  "on-reselect-images-click",
  "on-site-name-input",
  "on-preview-frame-loaded",
]);

const previewFrame = ref(null);

const route = useRoute();
const currentUser = useCurrentUser();
const title = `${capitalize(
  props?.idea?.tags ? props?.idea?.tags[0] : "Free"
)} Website Builder`;
const previewFrameSrc = ref("");

useHead({
  title,
  meta: [
    {
      name: "description",
      content: props?.idea?.siteData?.config?.siteDescription,
    },
    { name: "og:site_name", content: "Mixo" },
    { name: "og:url", content: route.fullPath },
    { name: "twitter:url", content: route.fullPath },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    {
      name: "og:description",
      content: props?.idea?.siteData?.config?.siteDescription,
    },
    {
      name: "og:image",
      content: props?.idea?.siteData?.config?.siteSocialImageUrl,
    },
    { name: "og:image:alt", content: title },
    { name: "twitter:title", content: title },
    {
      name: "twitter:description",
      content: props?.idea?.siteData?.config?.siteDescription,
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:image:src",
      content: props?.idea?.siteData?.config?.siteSocialImageUrl,
    },
  ],
});

// Methods
const onPreviewFrameLoad = () => {
  emit("on-preview-frame-loaded", previewFrame);
};

let postRobotListener;

onMounted(async () => {
  if (!SSR) {
    // Setup Post Robot
    const postRobot = await import("post-robot").then((pr) => pr.default);

    const config = { window: previewFrame?.value?.contentWindow, domain: APP_URL };

    if (!postRobotListener) {
      postRobotListener = postRobot.on("previewFrameReady", config, onPreviewFrameLoad);
    }

    previewFrameSrc.value = "/sites/preview";
  }
});

onBeforeUnmount(() => {
  postRobotListener?.cancel();
  postRobotListener = null;
});
</script>
