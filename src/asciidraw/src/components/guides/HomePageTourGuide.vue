<script setup lang="ts">
import { type GuideStep, TourGuide } from "@/components/tour-guide";
import { LucideCircleHelp, LucideMap } from "lucide-vue-next";
import IconButton from "@/components/composed/IconButton.vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { DefineCommand } from "@/components/command-popup";

const { t } = useI18n();

const steps = computed<GuideStep[]>(() => [
  {
    selector: 'draw-something',
    title: t('home.tour.draw-something.title'),
    description: t('home.tour.draw-something.description'),
  },
  {
    selector: 'project-list',
    title: t('home.tour.project-list.title'),
    description: t('home.tour.project-list.description'),
  },
  {
    selector: 'documentation',
    title: t('home.tour.documentation.title'),
    description: t('home.tour.documentation.description'),
  },
  {
    selector: 'example-projects',
    title: t('home.tour.example-projects.title'),
    description: t('home.tour.example-projects.description'),
  },
]);
</script>

<template>
  <TourGuide :steps="steps" v-slot="{ startGuide }">
    <DefineCommand group="other" id="tour-home" :icon="LucideMap" :label="() => $t('commands.other.tour-home')" :action="startGuide" />
    <IconButton @click="startGuide">
      <LucideCircleHelp />
      <template #tooltip>{{ $t('components.tour-guide.tooltip') }}</template>
    </IconButton>
  </TourGuide>
</template>
