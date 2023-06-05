<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import SitesSelectorMachine from "@/machines/sites-selector-machine.js";
import { setupMachine, showModal } from "@/composables";
import { SSR } from "~/utils/constants.js";

// Props
const props = defineProps({
  alignLeft: {
    type: Boolean,
    default: true,
  },
  showNewSite: {
    type: Boolean,
    default: true,
  },
  showWithNoSites: {
    type: Boolean,
    default: true,
  },
});

// Injections
const route = useRoute();
const router = useRouter();

// State Machine
const machineOptions = {
  context: {
    currentSiteId: route?.params?.id || "",
    router,
  },
  actions: {
    redirectToIndexRoute: () => {
      router.push("/");
    },
    redirectToSiteRoute: (_, { siteId }) => {
      router.push(`/sites/${siteId}/edit`);
    },
  },
};

const { state: sitesSelectorState, send: sendToSiteSelectorService } = setupMachine(
  SitesSelectorMachine,
  "Sites Selector",
  machineOptions
);

// Data
const sites = eagerComputed(() => sitesSelectorState?.value?.context?.sites || []);
const errorMessage = eagerComputed(
  () => sitesSelectorState?.value?.context?.errorMessage || ""
);
const currentSite = eagerComputed(
  () => sitesSelectorState?.value?.context?.currentSite || null
);
const showSiteSelector = eagerComputed(() => {
  if (!sites?.value?.length && !props.showWithNoSites) return false;

  return true;
});

// Methods
const onDuplicateClick = (siteId) => {
  sendToSiteSelectorService({
    type: "DUPLICATE_SITE",
    siteId,
  });
};

const onDeleteClick = (siteId) => {
  showModal(
    { name: "delete-confirm", actions: true },
    {
      default: `
        <h2 class="mb-2 text-2xl font-bold text-red-600">
          Delete Site
        </h2>
        <p>
          You are about to delete your site. This action can't be undone.
        </p>
        <p class="mt-2 font-semibold text-lg">
          Are you sure you want to <span class="text-red-600">delete</span> this site?
        </p>
      `,
    },
    {
      confirm(close) {
        if (!SSR) {
          if (window?.confirm("Your site will now be deleted. Are you sure?")) {
            sendToSiteSelectorService({
              type: "DELETE_SITE",
              siteId,
            });
            close();
          }
        }
      },
    }
  );
};

const onResetClick = (siteId) => {
  sendToSiteSelectorService({
    type: "RESET",
  });
};
</script>

<template>
  <div>
    <div
      v-if="sitesSelectorState.matches('error')"
      class="flex flex-wrap items-center gap-1 text-xs sm:text-sm"
    >
      <IconIcBaselineError class="w-4 h-4 text-red-500" />
      <span class="text-red-500">Error: </span>
      <span class="text-slate-500">{{ errorMessage }}</span>
      <button type="button" class="text-xs text-brand-primary" @click="onResetClick">
        (reset)
      </button>
    </div>

    <UiLoader v-if="sitesSelectorState.hasTag('loading')" />

    <Menu
      v-if="sitesSelectorState.matches('ready') && showSiteSelector"
      v-slot="{ open }"
      as="div"
      class="relative z-10"
    >
      <MenuButton
        class="p-2 max-w-xs bg-white flex items-center rounded-lg hover:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-brand-primary border border-slate-200"
      >
        <div v-if="currentSite?.id" class="flex items-center truncate">
          <img
            :src="currentSite?.logoUrl"
            :alt="currentSite?.name"
            class="px-0.5 flex-shrink-0 h-5 w-5 rounded-full"
            :class="{ hidden: currentSite?.logoUrl === undefined }"
          />
          <p class="px-1 font-medium text-slate-700 text-m">
            {{ currentSite?.name }}
          </p>
        </div>
        <p v-else class="font-medium text-slate-700 text-sm md:text-base">Sites</p>
        <IconIcBaselineKeyboardArrowUp v-if="open" class="text-slate-500" />
        <IconIcBaselineKeyboardArrowDown v-else class="text-slate-500" />
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute border border-light-100 overflow-hidden mt-2 w-64 sm:w-80 md:w-96 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          :class="alignLeft ? 'left-0 origin-top-left' : 'right-0 origin-top-right'"
          :unmount="false"
        >
          <div
            class="max-h-80 scroll-py-3"
            :class="{ 'overflow-y-auto': sites?.length > 2 }"
          >
            <MenuItem v-for="site in sites" :key="site?.id" :value="site" as="template">
              <div
                class="flex flex-col sm:items-center justify-between w-full space-x-2 sm:space-x-3"
                :class="{ 'bg-gray-100': currentSite?.id === site?.id }"
              >
                <div
                  class="p-2 sm:p-3 md:p-4 flex items-center justify-between w-full border-b border-slate-100"
                >
                  <div class="flex items-center w-full space-x-2 sm:space-x-3 group">
                    <router-link :to="`/sites/${site?.id}`" title="Go to site overview">
                      <img
                        :src="site?.logoUrl"
                        alt=""
                        class="flex-shrink-0 h-8 w-8 rounded-full items-center group-hover:scale-125 transition-transform"
                        :class="{ hidden: site?.logoUrl === undefined }"
                      />
                    </router-link>

                    <div
                      class="flex flex-col gap-1 sm:gap-2 md:flex-row md:items-center md:justify-between w-full"
                    >
                      <div>
                        <router-link
                          :to="`/sites/${site?.id}`"
                          title="Go to site overview"
                          class="text-sm sm:text-base font-medium text-slate-700 group-hover:text-brand-primary"
                        >
                          {{ site?.name }}
                        </router-link>
                        <p class="text-xs md:text-sm text-slate-500">
                          Created {{ site?.dateCreated }}
                        </p>
                      </div>

                      <div class="flex items-center gap-2 text-xs md:text-sm">
                        <router-link
                          :to="`/sites/${site?.id}/edit`"
                          class="flex items-center default-hover"
                        >
                          <IconTablerEdit class="mr-1" /> Edit
                        </router-link>

                        <SiteSelectorMoreMenu
                          :site-id="site?.id"
                          @duplicate-click="onDuplicateClick"
                          @delete-click="onDeleteClick"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MenuItem>
          </div>
          <MenuItem v-slot="{ close }">
            <router-link
              v-if="showNewSite"
              to="/ai-website-builder"
              class="font-medium text-white p-4 px-6 flex items-center w-96 bg-brand-primary hover:bg-brand-secondary hover:text-slate-900 border-t border-rose-700 text-sm md:text-base hover:border-yellow-500"
              @click="
                {
                  close;
                }
              "
            >
              <IconIconoirNewTab class="mr-2 text-current w-4" />
              <span>Create New Site</span>
            </router-link>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
