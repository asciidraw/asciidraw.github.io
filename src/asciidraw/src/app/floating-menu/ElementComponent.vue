<script setup lang="ts">

import { computed, inject } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";

const props = defineProps<{
  elementId: string
}>();

const project = inject(INJECTION_KEY_PROJECT)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const element = computed(() => project.value.elements.find(e => e.id === props.elementId)!);

const EditComponent = computed(() => rendererMap[element.value.type].EditComponent)
</script>

<template>
  <component :is="EditComponent" :data="element" />
</template>
