<script setup>
import { useMachine } from "@xstate/vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import { useCurrentUser } from "vuefire";
import { eagerComputed } from "@vueuse/core";
import PlanSelectorMachine from "@/machines/plan-selector-machine.js";
import { setupMachine } from "@/composables";

// Props
const props = defineProps({
  openAuthModal: {
    type: Function,
    default: null,
  },
  heading: {
    type: String,
    default: null,
  },
  showCurrencies: {
    type: Boolean,
    default: true,
  },
});

// Injections
const firebaseAuth = inject("firebaseAuth");

// State
const { state: planSelectorState, send: sendToPlanSelectorService } = setupMachine(
  PlanSelectorMachine,
  "PlanSelector"
);

// Data
const annualBilling = ref(false);
const loadingLabel = eagerComputed(() => {
  switch (planSelectorState?.value?.value) {
    case "loading":
      return "Loading plans...";

    case "checkout":
      return "Loading checkout...";

    case "success":
      return "Redirecting checkout...";

    default:
      break;
  }
});
const currentUser = useCurrentUser();

// Watchers
watch(annualBilling, (billingPeriod) => {
  sendToPlanSelectorService({
    type: "BILLING_PERIOD_CHANGE",
    annualBilling: billingPeriod,
  });
});

// Methods
const onCurrencyChange = (currency) => {
  sendToPlanSelectorService({
    type: "CURRENCY_CHANGE",
    currency,
  });
};

const onSelectPlan = (planId, priceId) => {
  sendToPlanSelectorService({
    type: "PLAN_SELECTED",
    planId,
    priceId,
  });
};

const onAuthClick = async () => {
  props?.openAuthModal();
};
</script>

<template>
  <div data-testid="plan-selector">
    <UiCenter>
      <UiLoader
        v-if="['loading', 'checkout', 'success'].some(planSelectorState.matches)"
        :label="loadingLabel"
      />

      <div
        v-if="planSelectorState.matches('ready')"
        class="flex flex-col items-center space-y-6 relative"
      >
        <!-- <CurrencySelector v-if="(showCurrencies===true)" class="sm:absolute right-2 top-2" @change="onCurrencyChange" /> -->

        <UiHeading v-if="heading" :level="2">
          {{ heading }}
        </UiHeading>
        <UiHeading v-else :level="2">
          <template #icon>
            <IconMajesticonsPlanetRing2Line />
          </template>
          Choose a plan
        </UiHeading>

        <div>
          <SwitchGroup as="div" class="flex items-center space-x-3">
            <SwitchLabel as="span">
              <span class="text-sm font-medium text-gray-900">Monthly billing </span>
            </SwitchLabel>

            <Switch
              v-model="annualBilling"
              class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="[annualBilling ? 'bg-primary' : 'bg-gray-200']"
            >
              <span
                aria-hidden="true"
                :class="[
                  annualBilling ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                ]"
              />
            </Switch>

            <SwitchLabel as="span">
              <span class="text-sm font-medium text-gray-900">Annual billing </span>
              <span class="text-sm font-medium text-brand-primary">(20% off)</span>
            </SwitchLabel>
          </SwitchGroup>
          <!-- <span class="text-sm text-brand-primary">(Save)</span>  -->
        </div>

        <div
          class="max-w-2xl mx-auto px-4 space-y-12 space-x sm:px-6 lg:max-w-5xl lg:space-y-0 lg:px-2 lg:grid lg:grid-cols-2 lg:gap-x-8 pt-5"
        >
          <div
            v-for="plan in planSelectorState?.context?.filteredPlans"
            :key="plan.name"
            class="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
          >
            <div class="flex-1  text-left">
              <h3 class="text-xl font-semibold text-gray-900 text-left">
                {{ plan.name }}
              </h3>
              <p class="mt-4 flex items-baseline text-gray-900">
                <span class="text-5xl font-extrabold tracking-tight">{{
                  plan?.price?.prettyPrice
                }}</span><span class="ml-1 text-slate-400">/</span>
                <span class="ml-1 text-xl font-semibold">month</span>
              </p>
              <p class="text-sm text-slate-400 mt-1">
                <span v-if="plan.price?.interval === 'month'">(billed every month)</span>
                <span v-if="plan.price?.interval === 'year'">(billed every 12 months)</span>
                <span v-else>&nbsp;</span>
              </p>
              <p
                v-if="plan.price?.interval === 'year'"
                class="text-sm text-brand-primary mt-1"
              >
                You saved with annual billing 🎉
              </p>
              <p class="mt-6 text-gray-500">
                {{ plan?.description }}
              </p>

              <!-- Feature list -->
              <ul role="list" class="mt-6 space-y-6">
                <li
                  v-for="feature in plan?.metadata?.features?.split(',')"
                  :key="feature"
                  class="flex"
                >
                  <IconHeroiconsSolidCheck
                    class="flex-shrink-0 w-6 h-6 text-emerald"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-gray-500">{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8 text-center">
              <UiButton
                v-if="currentUser"
                theme="brand-primary"
                @click="onSelectPlan(plan?.id, plan?.price?.id)"
              >
                Select {{ plan.name }} Plan
              </UiButton>

              <UiButton
                v-if="!currentUser && openAuthModal"
                theme="brand-primary"
                @click="onAuthClick"
              >
                Select {{ plan.name }} Plan
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </UiCenter>
  </div>
</template>
