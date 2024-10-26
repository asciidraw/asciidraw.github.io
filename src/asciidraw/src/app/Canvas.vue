<script setup lang="ts">
import {onMounted, onUpdated, useTemplateRef} from "vue";
import { useWindowSize } from "@vueuse/core";

const windowSize = useWindowSize();
const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

function getCanvasAndContext() {
  const context = canvas.value.getContext("2d");
  return [canvas.value, context] as const;
}

function drawRect() {
  const [_, context] = getCanvasAndContext();
  context.fillStyle = "green";
  context.fillRect(windowSize.width.value / 2 - 75, windowSize.height.value / 2 - 75, 150, 100);
}

onMounted(drawRect);
onUpdated(drawRect);
</script>

<template>
  <div class="w-screen h-screen">
    <canvas ref="canvas" class="w-full h-full" :width="windowSize.width.value" :height="windowSize.height.value" />
  </div>
</template>
