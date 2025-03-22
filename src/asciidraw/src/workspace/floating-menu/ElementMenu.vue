<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { computed, inject } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { elementEditorMap } from "@/workspace/element-editors";

const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;

const selectedElements = computed(() => project.value.elements.filter(el => drawContext.value.selectedElements.has(el.id)));
const EditComponent = computed(() => elementEditorMap[selectedElements.value[0].type]);
</script>

<template>
  <template v-if="selectedElements.length === 1 && EditComponent !== undefined">
    <Separator :label="$t('workspace.menu.extra-menu.label')" />
    <component :is="EditComponent" :data="selectedElements[0]" />
  </template>
</template>
