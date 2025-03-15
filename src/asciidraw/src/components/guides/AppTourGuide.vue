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
    selector: "floating-menu",
    title: t('workspace.guide.floating-menu.title'),
    description: t('workspace.guide.floating-menu.description'),
    side: "right",
  },
  {
    selector: "project-list",
    title: t('workspace.guide.project-list.title'),
    description: t('workspace.guide.project-list.description'),
    side: "right",
  },
  {
    selector: "project-actions",
    title: t('workspace.guide.project-actions.title'),
    description: t('workspace.guide.project-actions.description'),
    side: "right",
  },
  {
    selector: "tools",
    title: t('workspace.guide.tools.title'),
    description: t('workspace.guide.tools.description'),
    side: "right",
  },
  {
    selector: "action-box",
    title: t('workspace.guide.action-box.title'),
    description: t('workspace.guide.action-box.description'),
    side: "right",
    seeAlso: [{
      label: t('workspace.guide.action-box.see-also-docs'),
      ref: { name: 'docs', params: { path: ['elements', 'box'] } },
    }],
  },
  {
    selector: "action-label",
    title: t('workspace.guide.action-label.title'),
    description: t('workspace.guide.action-label.description'),
    side: "right",
    seeAlso: [{
      label: t('workspace.guide.action-label.see-also-docs'),
      ref: { name: 'docs', params: { path: ['elements', 'label'] } },
    }],
  },
  {
    selector: "action-move-view",
    title: t('workspace.guide.action-move-view.title'),
    description: t('workspace.guide.action-move-view.description'),
    side: "right",
  },
  {
    selector: "action-select+move",
    title: t('workspace.guide.action-select+move.title'),
    description: t('workspace.guide.action-select+move.description'),
    side: "right",
  },
  {
    selector: "zoom",
    title: t('workspace.guide.zoom.title'),
    description: t('workspace.guide.zoom.description'),
    side: "left",
  },
]);
</script>

<template>
  <TourGuide :steps="steps" v-slot="{ startGuide }">
    <DefineCommand group="other" id="tour-workspace" :icon="LucideMap" :label="() => $t('commands.other.tour-workspace')" :action="startGuide" />
    <IconButton class="h-5" @click="startGuide">
      <LucideCircleHelp class="size-full text-primary" />
      <template #tooltip>{{ $t('components.tour-guide.tooltip') }}</template>
    </IconButton>
  </TourGuide>
</template>
