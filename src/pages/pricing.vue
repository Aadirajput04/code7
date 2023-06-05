<script setup>
const openAuthModal = inject("openAuthModal");

const pageTitle = "Mixo Pricing";
const description =
  "Mixo is an AI-powered site builder that's designed to help you launch startups quickly and easily. Our pricing page is designed to give you an overview of the different plans we offer and the features you'll get with each.";
const imageUrl =
  "https://storage.googleapis.com/mixo-sites/images/file-2ea8702c-b5e0-4026-80fc-d60d790bb5b0.png";

const route = useRoute();

useHead({
  title: "Pricing",
  meta: [
    { name: "description", content: description },
    { name: "og:url", content: route.path },
    { name: "og:title", content: pageTitle },
    { name: "og:site_name", content: pageTitle },
    { name: "og:type", content: "website" },
    { name: "og:description", content: description },
    { name: "og:image", content: imageUrl },
    { name: "og:image:alt", content: pageTitle },
    { name: "twitter:url", content: route.path },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image:src", content: imageUrl },
  ],
});

const faqs = [
  {
    question: "Is there a money-back guarantee?",
    answer:
      "There is a 30 day money-back policy on your purchase. Try for a month and see if it's right for you.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. On the free plan, you can create a site, edit and publish it live. Paid plans allow you to customize your sites URL and remove the Mixo branding.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can change your plan from within your dashboard at any time, and instantly unlock access to features at the new plan level.",
  },
  {
    question: "Can I cancel my plan before the end of my billing period?",
    answer:
      "We’ll be sorry to see you go, but we won’t take it personally. You can cancel your recurring subscription at any time from within your account, without having to contact support. Go to your account settings and click “Payment Settings” then “Cancel Subscription.”",
  },
];
</script>

<template>
  <div class="py-6 space-y-12 md:space-y-24">
    <PlanSelector :open-auth-modal="openAuthModal" />

    <MarketingFaqs :faqs="faqs" />

    <p class="text-center">
      All prices in USD. If you have any more questions feel free to
      <SupportLink>get in touch</SupportLink>.
    </p>
  </div>
</template>
