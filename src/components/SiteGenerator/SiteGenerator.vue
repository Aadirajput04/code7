<template>
  <div class="site-generator" data-testid="site-generator">
    <UiAlert
      v-if="errorMessage || generatorState.matches('error')"
      type="danger"
      title="Error 🙈"
      :messages="errors"
      :button-action="contactSupport"
      button-label="Contact Support"
      class="mb-6 max-w-4xl mx-auto"
    >
      {{ errorMessage }}

      <template #controls>
        <UiButton
          v-if="generatorState.matches('error')"
          theme="brand-primary"
          size="xs"
          @click="onRetryClick"
        >
          Retry
        </UiButton>
      </template>
    </UiAlert>

    <UiLoaderCenter v-if="generatorState.hasTag('loading')" :label="loadingLabel" />

    <Ideation
      v-if="generatorState.matches('ideation')"
      :max-desc-length="maxDescLength"
      :description="ideaDescription"
      @on-description-input="onDescriptionInput"
      @on-generate-click="onGenerateClick"
      @on-generate-idea-click="onGenerateIdeaClick"
    />

    <Generating
      v-if="generatorState.matches('generating')"
      @complete="onGeneratingAnimationComplete"
    />

    <Preview
      v-if="generatorState.matches('generated')"
      :idea="idea"
      :reselecting-images="generatorState.matches('generated.reselectingImages')"
      @on-auth-click="onAuthClick"
      @on-site-name-input="onSiteNameInput"
      @on-regenerate-click="onRegenerateClick"
      @on-claim-click="onClaimClick"
      @on-reselect-images-click="onReselectImagesClick"
      @on-preview-frame-loaded="onPreviewFrameLoaded"
    />

    <Claiming v-if="generatorState.matches('claiming')" />

    <Claimed
      v-if="generatorState.matches('claimed')"
      :site-logo-url="idea?.logoUrl || site?.logoUrl"
      :site-name="idea?.name || site?.name"
      :paying-user="payingUser"
      @on-go-to-editor-click="onGotoEditorClick"
      @on-regenerate-click="onRegenerateClick"
    />
  </div>
</template>

<script setup>
import { setupMachine } from "@/composables";
import GeneratorMachine from "@/machines/generator-machine";
import { canAccessFeature } from "@/lib/plans";
import { contactSupport } from "@/lib/crisp";
import { SSR } from "~/utils/constants";

// Injections
const firebaseAuth = inject("firebaseAuth");
const openAuthModal = inject("openAuthModal");
const toast = inject("$toast");

// Composables
const router = useRouter();
const route = useRoute();

// State
const machineOptions = {
  context: {
    ideaId: route?.name === "idea" ? route?.params?.id : "",
    siteId: route?.name === "site" ? route?.params?.id : "",
    tag: route?.query["tag"] || "",
    toast,
    router,
  },
  actions: {
    redirectToHomeRoute: () => {
      router.push("/");
    },
    redirectToIdeaRoute: (_, { idea, type }) => {
      if (type !== "LOAD_IDEA_SUCCESS") {
        router.push(`/ai-website-builder/idea/${idea?.ideaId}`);
      }
    },
    redirectToSiteRoute: ({ siteId }) => {
      router.push(`/ai-website-builder/site/${siteId}`);
    },
  },
};
const { state: generatorState, send: sendToGeneratorService } = setupMachine(
  GeneratorMachine,
  "Generator",
  machineOptions
);

// Data
const maxDescLength = ref(200);
const payingUser = ref(false);
const loadingLabel = ref(
  route?.query?.ideaId ? "Loading your idea..." : "Loading your site..."
);
const idea = eagerComputed(() => {
  return generatorState?.value?.context?.idea;
});
const site = eagerComputed(() => {
  return generatorState?.value?.context?.site;
});
const ideaDescription = eagerComputed(() => {
  return generatorState?.value?.context?.ideaDescription;
});
const errors = eagerComputed(() => {
  return generatorState?.value?.context?.errors;
});
const errorMessage = eagerComputed(() => {
  return generatorState?.value?.context?.errorMessage;
});
const siteId = eagerComputed(() => {
  return generatorState?.value?.context?.siteId;
});

// Methods
const onAuthClick = async () => {
  openAuthModal({ showClose: true }, { signInLabel: " to save" });
};

const onGenerateClick = async () => {
  if (!ideaDescription.value) return false;

  sendToGeneratorService("GENERATE_IDEA");
};

const onGenerateIdeaClick = () => {
  sendToGeneratorService("GENERATE_IDEA_DESCRIPTION");
};

const onReselectImagesClick = () => {
  sendToGeneratorService("RESELECT_IMAGES");
};

const onRetryClick = () => {
  sendToGeneratorService("RETRY");
};

const onPreviewFrameLoaded = (previewFrame) => {
  sendToGeneratorService({ type: "PREVIEW_FRAME_LOADED", previewFrame });
};

// TODO: Check with Ads what this is for
const onDescriptionInput = (e) => {
  if (e.target.value.length >= maxDescLength.value) {
    e.target.value = e.target.value.substring(0, maxDescLength.value);
  }

  sendToGeneratorService({
    type: "UPDATE_IDEA_DESCRIPTION",
    ideaDescription: e.target.value,
  });
};

const onSiteNameInput = (siteName) => {
  if (siteName?.length >= 3) {
    sendToGeneratorService({
      type: "UPDATE_SITE_NAME",
      siteName,
    });
  }
};

const onRegenerateClick = async () => {
  if (confirm("You will lose this unsaved site. Are you sure you want to proceed?")) {
    sendToGeneratorService("REGENERATE");
  }
};

const onGotoEditorClick = () => {
  const path = `/sites/${siteId.value}/edit`;
  router.push({ path });
};

const onClaimClick = async () => {
  sendToGeneratorService("CLAIM");
};

const onGeneratingAnimationComplete = async () => {
  sendToGeneratorService({
    type: "GENERATING_ANIMATION_COMPLETE",
    generatingAnimationComplete: true,
  });
};

// Firebase
firebaseAuth?.onAuthStateChanged(async (user) => {
  if (user) {
    payingUser.value = await canAccessFeature("customDomain");
  }
});
</script>
