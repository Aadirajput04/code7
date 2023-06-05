<template>
  <div class="space-y-12 pb-10">
    <SiteGeneratorWrap>
      <UiCenter>
        <div class="prose text-center text-m text-gray-500">
          <img
            v-if="siteLogoUrl"
            class="h-16 w-16 rounded-full"
            :src="siteLogoUrl"
            :alt="siteName"
          >
          <h1 class="!mb-2">
            Congratulations, {{ siteName }}
            has been saved to your account 🥳
          </h1>
          <div class="divider mt-6" />
          <h3>Ready to edit and publish your site?</h3>
          <p v-if="!payingUser">
            Proceed to our our editor to update content, publish and share your site. 
            Our paid plans let you
            <span class="font-semibold">customize your link</span>,
            <span class="font-semibold">remove Mixo branding</span> and access
            <span class="font-semibold">additional editor tools</span>.
          </p>
          <p v-else>
            The site has been added to your account. Proceed to the editor to make any
            further customizations and publish your site.
          </p>
        </div>
      </UiCenter>

      <PlanSelector
        v-if="!payingUser"
        :open-auth-modal="openAuthModal"
        heading=" "
        :show-currencies="false"
      />

      <UiCenter v-if="!payingUser">
        <div class="prose text-center text-m text-gray-500">
          <p>
            or
            <UiButton theme="brand-link" @click="$emit('on-go-to-editor-click')">
              continue with just the free plan
            </UiButton>.
          </p>
        </div>
      </UiCenter>

      <UiCenter v-else>
        <div class="prose text-center text-m text-gray-500">
          <p>
            <UiButton theme="brand-primary" @click="$emit('on-go-to-editor-click')">
              Proceed to site editor
            </UiButton>
          </p>
        </div>
      </UiCenter>

      <div v-if="!payingUser" class="pt-5 space-y-6 md:space-y-8 lg:space-y-20">
        <MarketingFaqs :faqs="faqs" />
        <MarketingLogoCloud />
        <MarketingQuote />
      </div>
    </SiteGeneratorWrap>
  </div>
</template>

<script setup>
const openAuthModal = inject("openAuthModal");

const props = defineProps({
  payingUser: {
    type: Boolean,
    default: false,
  },
  siteLogoUrl: {
    type: String,
    default: "",
  },
  siteName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["on-go-to-editor-click"]);

// FAQs
const faqs = [
  {
    question: "Do you offer a money-back guarantee?",
    answer:
      "There is a 30 day money-back policy on your purchase. You can try for a month and see if it's right for you.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "You can cancel your subscription at any time from within your account, without having to contact support. Simply go to “Payment Settings”, then “Cancel Subscription.”",
  },
  {
    question: "How do I edit my site?",
    answer:
      "Once you select one of the options above, you will be taken to the editor where you can update your site content (eg. logo, images, colors, copy) and publish changes live.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. On the free plan, you can create a site, edit and publish it live. Paid plans allow you to customize your sites URL and remove our Mixo branding. To proceed on the free plan, simply click 'continue with just the free plan' above.",
  },
  // {
  //   question: "Can I upgrade my plan later?",
  //   answer:
  //     "Absolutely! You can change your plan from within your dashboard at any time. If you get stuck at any point, our customer support team is always here to help.",
  // },
];
</script>
