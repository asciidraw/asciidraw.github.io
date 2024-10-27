<script setup lang="ts">
import {onMounted, onUpdated, reactive, ref, useTemplateRef, watch} from "vue";
import {useColorMode, useWindowSize} from "@vueuse/core";
import AppZoomButton from "@/app/ZoomButton.vue";
import * as constants from "@/constants";

const colorMode = useColorMode();

watch(colorMode, () => {
  setTimeout(() => redraw());
});

const windowSize = useWindowSize();
const canvas = useTemplateRef<HTMLCanvasElement>("canvas");

function getContext() {
  return canvas.value!.getContext("2d")!;
}

const zoom = ref<number>(10);
const offset = reactive({ x: 0, y: 0 });

function zoomIn() {
  zoom.value++;
}
function zoomOut() {
  zoom.value = Math.max(1, zoom.value-1);
}

function getColorPalette(context: CanvasRenderingContext2D) {
  const canvas = context.canvas;
  const style = getComputedStyle(canvas);
  return {
    grid: `hsl(${style.getPropertyValue("--border")})`,
    text: `hsl(${style.getPropertyValue("--foreground")})`,
    highlight: `hsl(${style.getPropertyValue("--accent-foreground")})`,
    selection: `hsl(${style.getPropertyValue("--card-foreground")})`,
  } as const;
}

function initCanvas(context: CanvasRenderingContext2D) {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  const normalZoom = zoom.value / 10;
  context.scale(normalZoom, normalZoom);
  context.translate(context.canvas.width / 2 / normalZoom, context.canvas.height / 2 / normalZoom);
  context.font = constants.FONT;
}

function renderGrid(context: CanvasRenderingContext2D) {
  const colors = getColorPalette(context);
  context.lineWidth = 1;
  context.strokeStyle = colors.grid;
  // todo: calculate start and end while considering $offset
  const startOffset = {
    x: Math.round(-context.canvas.width / 2 / constants.CHARACTER_PIXEL_WIDTH),
    y: Math.round(-context.canvas.height / 2 / constants.CHARACTER_PIXEL_HEIGHT),
  };
  const endOffset = {
    x: Math.round(context.canvas.width / 2 / constants.CHARACTER_PIXEL_WIDTH),
    y: Math.round(context.canvas.height / 2 / constants.CHARACTER_PIXEL_HEIGHT),
  };
  context.beginPath();
  for (let i = startOffset.x; i < endOffset.x; i++) {
    const posX = (i * constants.CHARACTER_PIXEL_WIDTH) - offset.x;
    context.moveTo(posX, -context.canvas.height / 2 - offset.y);
    context.lineTo(posX,  context.canvas.height / 2 - offset.y);
  }
  for (let j = startOffset.y; j < endOffset.y; j++) {
    const posY = (j * constants.CHARACTER_PIXEL_HEIGHT) - offset.y;
    context.moveTo(-context.canvas.width / 2 - offset.x, posY);
    context.lineTo( context.canvas.width / 2 - offset.x, posY);
  }
  context.stroke();
}

function drawText(context: CanvasRenderingContext2D, position: {x: number, y: number}, text: string) {
  const colors = getColorPalette(context);
  context.fillStyle = colors.text;
  for (let i = 0; i < text.length; i++) {
    const canvasX = ((position.x + i) * constants.CHARACTER_PIXEL_WIDTH) - offset.x;
    const canvasY = (position.y * constants.CHARACTER_PIXEL_HEIGHT) - offset.y - 3;
    context.fillText(text.charAt(i), canvasX, canvasY);
  }
}

function testDraw(context: CanvasRenderingContext2D) {
  drawText(context, { x: 0, y: 1 }, "╭────────────╮");
  drawText(context, { x: 0, y: 2 }, "│Hello World!│");
  drawText(context, { x: 0, y: 3 }, "╰────────────╯");
}

function redraw() {
  const context = getContext();
  initCanvas(context);
  renderGrid(context);
  testDraw(context);
}

function onCanvasWheel(event: WheelEvent) {
  if (event.deltaY > 0) {
    zoomOut();
  }
  if (event.deltaY < 0) {
    zoomIn();
  }
}

onMounted(redraw);
onUpdated(redraw);
</script>

<template>
  <div class="w-screen h-screen" @wheel="onCanvasWheel">
    <canvas ref="canvas" class="w-full h-full" :width="windowSize.width.value" :height="windowSize.height.value" />
  </div>
  <div class="fixed top-0 left-1/2 -translate-x-1/2">
    Zoom: {{ zoom }} | Offset: {{ offset.x }}x{{ offset.y }}
  </div>
  <AppZoomButton @zoom-in="zoomIn" @zoom-out="zoomOut" />
</template>
