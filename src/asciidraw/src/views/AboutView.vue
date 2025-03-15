<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { LucideBuilding, LucideCrosshair, LucideUsers } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const steps = [
  {
    icon: LucideCrosshair,
    title: () => t('about.steps.mission.title'),
    description: () => t('about.steps.mission.description'),
  },
  {
    icon: LucideBuilding,
    title: () => t('about.steps.organisation.title'),
    description: () => t('about.steps.organisation.description'),
  },
  {
    icon: LucideUsers,
    title: () => t('about.steps.team.title'),
    description: () => t('about.steps.team.description'),
  },
];
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto p-5 md:mt-5 flex w-full max-w-md flex-col justify-start gap-10">
      <div v-for="(step, index) in steps" :key="index" class="relative w-full items-start gap-6 grid grid-cols-[auto,1fr]">
        <div v-if="index !== steps.length - 1" class="absolute left-3 -translate-x-1/2 top-8 block h-full w-0.5 shrink-0 rounded-full bg-foreground" />
        <div>
          <component :is="step.icon" class="size-6 z-10 shrink-0" />
        </div>
        <div>
          <div class="text-sm font-semibold transition lg:text-base">
            {{ step.title() }}
          </div>
          <div class="text-xs transition lg:text-sm">
            {{ step.description() }}
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
