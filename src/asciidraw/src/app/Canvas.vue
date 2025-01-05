<script setup lang="ts">
import { computed, inject, onMounted, reactive, ref, useTemplateRef, watch } from "vue";
import { useColorMode, useDebounceFn, useEventListener, useWindowSize } from "@vueuse/core";
import AppZoomButton from "@/app/ZoomButton.vue";
import * as constants from "@/constants";
import { Layer, Vector, type VectorLike } from "@/lib";
import { INJECTION_KEY_APP, INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";

const app = inject(INJECTION_KEY_APP)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const colorMode = useColorMode();

watch(colorMode, () => {
  setTimeout(() => redraw());
});

const {width: windowWidth, height: windowHeight} = useWindowSize();
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvas");


const project = inject(INJECTION_KEY_PROJECT)!;
const normalZoom = computed(() => project.value.drawContext.zoom / 10);

function zoomIn() {
  project.value.drawContext.zoom++;
}
function zoomOut() {
  project.value.drawContext.zoom = Math.max(1, project.value.drawContext.zoom-1);
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

// coordinate conversion

function screenToFrame(screen: VectorLike): Vector {
  return new Vector(
    (screen.x - windowWidth.value / 2) / normalZoom.value + project.value.drawContext.offset.x,
    (screen.y - windowHeight.value / 2) / normalZoom.value + project.value.drawContext.offset.y,
  );
}

function frameToScreen(frame: VectorLike): Vector {
  return new Vector(
    (frame.x - project.value.drawContext.offset.x) * normalZoom.value + windowWidth.value / 2,
    (frame.y - project.value.drawContext.offset.y) * normalZoom.value + windowHeight.value / 2,
  )
}

function frameToCell(frame: VectorLike): Vector {
  return new Vector(
    Math.round((frame.x - constants.CHARACTER_PIXEL_WIDTH / 2) / constants.CHARACTER_PIXEL_WIDTH),
    Math.round((frame.y + constants.CHARACTER_PIXEL_HEIGHT / 2) / constants.CHARACTER_PIXEL_HEIGHT),
  );
}

function cellToFrame(cell: VectorLike): Vector {
  return new Vector(
    Math.round(cell.x * constants.CHARACTER_PIXEL_WIDTH),
    Math.round(cell.y * constants.CHARACTER_PIXEL_HEIGHT),
  );
}

function screenToCell(screen: VectorLike): Vector {
  return frameToCell(screenToFrame(screen));
}

function cellToScreen(cell: VectorLike): Vector {
  return frameToScreen(cellToFrame(cell));
}

// @end coordinate conversion

function initCanvas(context: CanvasRenderingContext2D) {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.scale(normalZoom.value, normalZoom.value);
  context.translate(context.canvas.width / 2 / normalZoom.value, context.canvas.height / 2 / normalZoom.value);
  context.font = constants.FONT;
}

function renderGrid(context: CanvasRenderingContext2D) {
  const colors = getColorPalette(context);
  context.lineWidth = 1;
  context.strokeStyle = colors.grid;

  const startOffset = screenToCell(new Vector(0, 0))
    .subtract(new Vector(constants.RENDER_PADDING_CELLS, constants.RENDER_PADDING_CELLS));
  const endOffset = screenToCell(new Vector(context.canvas.width, context.canvas.height))
    .add(new Vector(constants.RENDER_PADDING_CELLS, constants.RENDER_PADDING_CELLS));

  context.beginPath();
  for (let i = startOffset.x; i < endOffset.x; i++) {
    const posX = (i * constants.CHARACTER_PIXEL_WIDTH) - project.value.drawContext.offset.x;
    const startY = -context.canvas.height / 2 / normalZoom.value;
    const endY = context.canvas.height / 2 / normalZoom.value;
    context.moveTo(posX, startY);
    context.lineTo(posX,  endY);
  }
  for (let j = startOffset.y; j < endOffset.y; j++) {
    const posY = (j * constants.CHARACTER_PIXEL_HEIGHT) - project.value.drawContext.offset.y;
    const startX = -context.canvas.width / 2 / normalZoom.value;
    const endX = context.canvas.width / 2 / normalZoom.value;
    context.moveTo(startX, posY);
    context.lineTo(endX, posY);
  }
  context.stroke();
}

function highlight(context: CanvasRenderingContext2D, start: VectorLike, end: VectorLike, color: string = "#00F5") {
  context.fillStyle = color;
  const width = end.x - start.x;
  const height = end.y - start.y;
  context.fillRect(
    start.x * constants.CHARACTER_PIXEL_WIDTH - project.value.drawContext.offset.x + 0.5,
    start.y * constants.CHARACTER_PIXEL_HEIGHT - project.value.drawContext.offset.y + 0.5,
    width * constants.CHARACTER_PIXEL_WIDTH - 1,
    height * constants.CHARACTER_PIXEL_HEIGHT - 1,
  );
}

function drawText(context: CanvasRenderingContext2D, position: VectorLike, text: string) {
  const colors = getColorPalette(context);
  context.fillStyle = colors.text;
  let col = 0;
  let row = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char === '\n') {
      col = 0;
      row++;
      continue;
    }

    if (char === ' ') {
      col++;
      continue
    }

    const canvasX = ((position.x + col) * constants.CHARACTER_PIXEL_WIDTH) - project.value.drawContext.offset.x;
    const canvasY = ((position.y + row) * constants.CHARACTER_PIXEL_HEIGHT) - project.value.drawContext.offset.y - 3;
    context.fillText(char, canvasX, canvasY);
    col++;
  }
}

function redraw() {
  const context = canvasRef.value!.getContext("2d")!;
  initCanvas(context);
  renderGrid(context);
  app.value.events.emit("preRender", app.value);
  const finalLayer = new Layer();
  for (const element of project.value.elements) {
    const renderer = rendererMap[element.type];
    if (renderer === undefined) {
      console.error(`missing renderer ${element.type}`);
      continue;
    }
    const elementLayer = renderer.render(element);
    finalLayer.merge(elementLayer);
  }
  for (const [[x, y], char] of finalLayer.entries()) {
    drawText(context, { x, y }, char);
  }
  app.value.events.emit("postRender", app.value);
}

const debouncedRedraw = useDebounceFn(redraw, 5);

onMounted(() => {
  const canvas = canvasRef.value!;
  const context = canvas.getContext("2d")!
  app.value.canvas = {
    canvasToGrid: screenToCell,
    gridToCanvas: cellToScreen,
    canvasElement: canvas,
    renderContext: context,
    drawText: (pos, text) => drawText(context, pos, text),
    highlight: (start, end, color) => highlight(context, start, end, color),
  }
  redraw();
});
watch([windowWidth, windowHeight], () => debouncedRedraw());
watch(project, () => redraw(), {deep: true });

// zooming

function onCanvasWheel(event: WheelEvent) {
  if (event.deltaY > 0) {
    zoomOut();
  }
  if (event.deltaY < 0) {
    zoomIn();
  }
}

// offset dragging

const isDraggingOffset = ref(false);
const moveStartOffset = reactive({ x: 0, y: 0 });
const moveStartPosition = reactive({ x: 0, y: 0 });

function onMouseDown(event: MouseEvent) {
  if (event.button === 1) {
    isDraggingOffset.value = true;
    moveStartOffset.x = project.value.drawContext.offset.x;
    moveStartOffset.y = project.value.drawContext.offset.y;
    moveStartPosition.x = event.clientX;
    moveStartPosition.y = event.clientY;
  }
}

useEventListener("mousemove", (event: MouseEvent) => {
  if (isDraggingOffset.value) {
    const diffX = (moveStartPosition.x - event.clientX) / normalZoom.value;
    const diffY = (moveStartPosition.y - event.clientY) / normalZoom.value;
    const offsetX = moveStartOffset.x + diffX;
    const offsetY = moveStartOffset.y + diffY;
    project.value.drawContext.offset.x = offsetX;
    project.value.drawContext.offset.y = offsetY;
  }
});

useEventListener("mouseup", () => {
  isDraggingOffset.value = false;
});
</script>

<template>
  <div class="w-screen h-screen" @wheel="onCanvasWheel" @mousedown="onMouseDown">
    <canvas ref="canvas" class="w-full h-full" :width="windowWidth" :height="windowHeight" />
  </div>
  <div class="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none">
    Zoom: {{ project.drawContext.zoom }} | offset: {{ project.drawContext.offset.x.toFixed(2) }}x{{ project.drawContext.offset.y.toFixed(2) }}
  </div>
  <AppZoomButton @zoom-in="zoomIn" @zoom-out="zoomOut" />
</template>
