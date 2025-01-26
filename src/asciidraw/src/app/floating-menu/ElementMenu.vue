<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { computed, inject } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";

const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const selectedElements = computed(() => project.value.elements.filter(el => drawContext.value.selectedElements.has(el.id)));
const EditComponent = computed(() => rendererMap[selectedElements.value[0].type].EditComponent);
</script>

<template>
  <template v-if="selectedElements.length === 1 && EditComponent !== undefined">
    <Separator :label="$t('app.menu.extra-menu.label')" />
    <component :is="EditComponent" :data="selectedElements[0]" />
  </template>
</template>
