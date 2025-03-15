<script setup lang="ts">
import { useElementBounding } from "@vueuse/core";

const { element } = defineProps<{
  element: HTMLElement | null;
}>();

const { top, right, bottom, left } = useElementBounding(() => element);
</script>

<template>
  <div class="fixed z-40 bg-black/80" :style="{ left: `0`, right: `0`, top: `0`, height: `${top}px` }" />
  <div class="fixed z-40 bg-black/80" :style="{ left: `0`, top: `${top}px`, height: `${bottom-top}px`, width: `${left}px` }" />
  <div class="fixed z-40 bg-black/80" :style="{ left: `${right}px`, top: `${top}px`, height: `${bottom-top}px`, right: `0` }" />
  <div class="fixed z-40 bg-black/80" :style="{ left: `0`, top: `${bottom}px`, bottom: `0`, right: `0` }" />
</template>
