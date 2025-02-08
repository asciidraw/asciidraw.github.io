<script setup lang="ts">
import {type GuideStep, TourGuide} from "@/components/tour-guide";
import {LucideCircleHelp} from "lucide-vue-next";
import IconButton from "@/components/composed/IconButton.vue";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const { t } = useI18n();

const steps = computed<GuideStep[]>(() => [
  {
    selector: "floating-menu",
    title: t('app.guide.floating-menu.title'),
    description: t('app.guide.floating-menu.description'),
    side: "right",
  },
  {
    selector: "project-list",
    title: t('app.guide.project-list.title'),
    description: t('app.guide.project-list.description'),
    side: "right",
  },
  {
    selector: "project-actions",
    title: t('app.guide.project-actions.title'),
    description: t('app.guide.project-actions.description'),
    side: "right",
  },
  {
    selector: "tools",
    title: t('app.guide.tools.title'),
    description: t('app.guide.tools.description'),
    side: "right",
  },
  {
    selector: "zoom",
    title: t('app.guide.zoom.title'),
    description: t('app.guide.zoom.description'),
    side: "left",
  },
]);
</script>

<template>
  <TourGuide :steps="steps" v-slot="{ startGuide }">
    <IconButton class="h-5" @click="startGuide">
      <LucideCircleHelp class="size-full text-primary" />
      <template #tooltip>{{ $t('components.tour-guide.tooltip') }}</template>
    </IconButton>
  </TourGuide>
</template>
