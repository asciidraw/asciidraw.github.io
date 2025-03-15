<script setup lang="ts">
import {type GuideStep, TourGuide} from "@/components/tour-guide";
import { LucideCircleHelp, LucideMap } from "lucide-vue-next";
import IconButton from "@/components/composed/IconButton.vue";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import { RegisterCommand } from "@/components/command-popup";

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
    selector: "action-box",
    title: t('app.guide.action-box.title'),
    description: t('app.guide.action-box.description'),
    side: "right",
    seeAlso: [{
      label: t('app.guide.action-box.see-also-docs'),
      ref: { name: 'docs', params: { path: ['elements', 'box'] } },
    }],
  },
  {
    selector: "action-label",
    title: t('app.guide.action-label.title'),
    description: t('app.guide.action-label.description'),
    side: "right",
    seeAlso: [{
      label: t('app.guide.action-label.see-also-docs'),
      ref: { name: 'docs', params: { path: ['elements', 'label'] } },
    }],
  },
  {
    selector: "action-move-view",
    title: t('app.guide.action-move-view.title'),
    description: t('app.guide.action-move-view.description'),
    side: "right",
  },
  {
    selector: "action-select+move",
    title: t('app.guide.action-select+move.title'),
    description: t('app.guide.action-select+move.description'),
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
    <RegisterCommand group="other" id="tour-app" :icon="LucideMap" :label="() => $t('commands.other.tour-app')" :action="startGuide" />
    <IconButton class="h-5" @click="startGuide">
      <LucideCircleHelp class="size-full text-primary" />
      <template #tooltip>{{ $t('components.tour-guide.tooltip') }}</template>
    </IconButton>
  </TourGuide>
</template>
