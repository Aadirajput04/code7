<script setup>
import { useCurrentUser } from "vuefire";
import { signOut } from "firebase/auth";
import { reactive } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { getCustomPortalUrl, onPaidPlan } from "../../lib/plans";
import { asyncComponentDefaults, showModal } from "@/composables";
const PlanSelector = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("@/components/PlanSelector/PlanSelector.vue"),
});
const UiLoaderCenter = defineAsyncComponent({
  ...asyncComponentDefaults,
  loader: () => import("^/components/ui/UiLoader/UiLoaderCenter.vue"),
});

// Injections
const firebaseAuth = inject("firebaseAuth");
const openAuthModal = inject("openAuthModal");
const $vfm = inject("$vfm");

// Composables
const currentUser = useCurrentUser();
const router = useRouter();

// Data
const plan = reactive({
  paid: false,
});

// Methods
const onUpgrade = async () => {
  showModal(
    { name: "plan-selector" },
    {
      default: {
        component: PlanSelector,
        bind: { openAuthModal },
      },
    }
  );
};

const onPaymentSettingsClick = async () => {
  showModal(
    { name: "loader", clickToClose: false, showClose: false },
    {
      default: {
        component: UiLoaderCenter,
      },
    }
  );

  // payment settings for Stripe only available when customer has paid account
  if (typeof window !== "undefined") {
    const url = await getCustomPortalUrl(window?.location?.origin);

    if (url) {
      window?.location?.assign(url);
    } else {
      $vfm.hide("loader");
    }
  }
};

const onLoginClick = () => {
  openAuthModal();
};

const onLogoutClick = async () => {
  await signOut(firebaseAuth);
  router?.push("/login");
};

firebaseAuth.onAuthStateChanged(async (user) => {
  if (user) {
    plan.isPaid = await onPaidPlan();
  }
});
</script>

<template>
  <!-- Account dropdown -->
  <Menu as="div" class="ml-3 relative z-10">
    <div class="flex items-center h-full">
      <UiLoader v-if="currentUser === undefined" />

      <UiButton v-if="currentUser === null" theme="brand-link" @click="onLoginClick">
        Login
      </UiButton>

      <MenuButton
        v-if="currentUser"
        class="max-w-xs flex items-center focus:outline-none rounded-full focus:text-slate-500 hover:text-slate-500 text-slate-400"
      >
        <IconIcRoundAccountCircle class="h-8 w-8" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="origin-top-right border border-light-100 absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      >
        <div v-if="currentUser" class="py-1">
          <div class="px-4 py-3">
            <p class="text-slate-400 text-sm">Signed in as</p>
            <p class="font-medium text-gray-900 truncate">
              {{ currentUser.email }}
              <span
                v-if="plan.isPaid"
                class="inline-flex items-center px-1 py-1 rounded-full text-xs font-medium bg-brand-primary text-white"
              >
                <IconIcRoundStarRate />
              </span>
            </p>
          </div>
        </div>
        <div class="py-1">
          <MenuItem v-if="plan.isPaid">
            <a
              href="#"
              title="Payment Settings"
              class="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
              @click="onPaymentSettingsClick"
            >
              Payment Settings
            </a>
          </MenuItem>
          <MenuItem v-if="currentUser && !plan.isPaid">
            <a
              href="#"
              title="Upgrade"
              class="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
              @click="onUpgrade"
            >
              Upgrade
            </a>
          </MenuItem>
          <MenuItem v-if="currentUser">
            <a
              href="#"
              title="Logout"
              class="block px-4 py-2 hover:bg-gray-100 hover:text-gray-900"
              @click="onLogoutClick"
            >
              Logout
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
