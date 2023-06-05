<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h2 class="text-3xl font-extrabold text-center text-slate-900 sm:text-4xl">
      Trusted by over <span class="text-brand-primary">150,000</span> creators<span
        class="text-brand-primary"
      >.</span>
    </h2>

    <div class="divider mt-6" />

    <div
      class="mx-auto mt-10 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl lg:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
    >
      <component
        :is="company.icon"
        v-for="(company, index) in companies"
        :key="index"
        class="max-h-6 md:max-h-8 h-auto w-full object-contain object-left"
        :title="company.name"
      />
    </div>

    <p class="mt-6 max-w-2xl mx-auto leading-8 text-gray-600">
      Everyone from solo entrepreneurs to employees at Fortune 500 companies choose Mixo
      for its reliability, quality, and cutting-edge features.
    </p>
  </div>
</template>

<script setup>
import LogosGoogle from "~icons/logos/google";
import LogosIntercom from "~icons/logos/intercom";
import LogosAsana from "~icons/logos/asana";
import LogosGithub from "~icons/logos/github";
import LogosSlack from "~icons/logos/slack";
import LogosDribbble from "~icons/logos/dribbble";

const companies = [
  {
    name: "Google",
    icon: LogosGoogle,
  },
  {
    name: "Intercom",
    icon: LogosIntercom,
  },
  {
    name: "Asana",
    icon: LogosAsana,
  },
  {
    name: "Dribbble",
    icon: LogosDribbble,
  },
  {
    name: "Github",
    icon: LogosGithub,
  },
  {
    name: "Slack",
    icon: LogosSlack,
  },
];
</script>
