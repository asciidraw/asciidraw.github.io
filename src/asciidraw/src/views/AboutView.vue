<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {LucideCircleDot} from "lucide-vue-next";

const steps = [
  {
    title: "Mission Statement",
    description: "We want to offer a good web-based editor to create ASCII diagrams for your README or terminal.",
  },
  {
    title: "Organisation",
    description: "The GitHub Organisation for this project was created in october 2024. We could have used a personal repository in one of our accounts, but because of the organisation we can offer the clean url of https://asciidraw.github.io",
  },
  {
    title: "Team",
    description: "Just two guys. Nothing special.",
  },
]
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto p-5 md:mt-5 flex w-full max-w-md flex-col justify-start gap-10">
      <div v-for="(step, index) in steps" :key="index" class="relative w-full items-start gap-6 grid grid-cols-[auto,1fr]">
        <div v-if="index !== steps.length - 1" class="absolute left-3 -translate-x-1/2 top-8 block h-full w-0.5 shrink-0 rounded-full bg-neutral-700" />
        <div>
          <LucideCircleDot class="size-6 z-10 shrink-0" />
        </div>
        <div>
          <div class="text-sm font-semibold transition lg:text-base">
            {{ step.title }}
          </div>
          <div class="text-xs transition lg:text-sm">
            {{ step.description }}
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
