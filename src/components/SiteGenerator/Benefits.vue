<template>
  <div class="wrap">
    <div class="content">
      <div class="benefits">
        <div class="benefit">
          <IconCarbonEdit class="icon" />
          <div>
            <p class="title">
              No-Code Site Editor
            </p>
            <p class="subtitle">
              Make content updates using Mixo's site editor
            </p>
          </div>
        </div>
        <div class="benefit">
          <IconCarbonNetworkPublic class="icon" />
          <div>
            <p class="title">
              Scalable Site Hosting
            </p>
            <p class="subtitle">
              Site hosted on Mixo's Global Content Network
            </p>
          </div>
        </div>

        <div class="benefit">
          <IconCarbonShareKnowledge class="icon" />
          <div>
            <p class="title">
              Social Sharing Ready
            </p>
            <p class="subtitle">
              Social images and description generated
            </p>
            <button class="text-brand-primary hover:underline" @click="openSocialModal">
              see preview
            </button>
          </div>
        </div>
        <div class="benefit">
          <IconCarbonSelectWindow class="icon" />
          <div>
            <p class="title">
              Content Optimized for SEO
            </p>
            <p class="subtitle">
              Targeted Keywords<span v-if="tags.length">:</span>
            </p>
            <p v-if="tags.length" class="subtitle">
              {{ tags?.join(", ") }}
            </p>
          </div>
        </div>
        <div class="benefit">
          <IconCarbonApplicationMobile class="icon" />
          <div>
            <p class="title">
              Mobile First Responsive Design
            </p>
            <p class="subtitle">
              Mobile, Tablet and Desktop
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { asyncComponentDefaults, showModal } from "@/composables";
const SocialPreview = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("./SocialPreview.vue"),
});

const props = defineProps({
  siteDescription: {
    type: String,
    default: "",
  },
  siteSocialImageUrl: {
    type: String,
    default: "",
  },
  siteTitle: {
    type: String,
    default: "",
  },
  tags: {
    type: Array,
    default() {
      return [];
    },
  },
});

const openSocialModal = (modalProps, authFormProps) => {
  showModal(
    { name: "social-preview" },
    {
      default: {
        component: SocialPreview,
        bind: {
          siteDescription: props.siteDescription,
          siteSocialImageUrl: props.siteSocialImageUrl,
          siteTitle: props.siteTitle,
        },
      },
    }
  );
};
</script>

<style>
.wrap {
  @apply w-full relative;

  &:after {
    @apply w-8 lg:hidden;
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      theme(colors.slate.100) 85%
    );
  }
}

.content {
  @apply whitespace-nowrap overflow-x-scroll overflow-y-hidden relative pb-3;
  @apply lg:overflow-auto lg:p-0 lg:whitespace-normal;
}

.benefits {
  @apply space-x-6 flex;
  @apply lg:flex-col lg:space-x-0 lg:space-y-6;
}

.benefit {
  @apply text-sm text-slate-700 flex items-center space-x-4 first:pl-1 last:pr-8 lg:last:pr-0 lg:first:pl-0;
}

.title {
  @apply font-bold;
}

.subtitle {
  @apply text-slate-600;
}

.icon {
  @apply shrink-0 w-6 h-6 text-brand-primary;
}
</style>
