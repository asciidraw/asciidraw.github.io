<script setup lang="ts">
import { computed, inject, markRaw, onMounted, useTemplateRef, watch } from "vue";
import { useColorMode, useDebounceFn, useEventListener, useMouse, useWindowSize } from "@vueuse/core";
import AppZoomButton from "@/app/ZoomButton.vue";
import { isPointWithinBox, type VectorLike } from "@/lib";
import {
  INJECTION_KEY_APP,
  INJECTION_KEY_DRAW_CONTEXT,
  INJECTION_KEY_PROJECT,
  INJECTION_KEY_RENDERER_MAP
} from "@/symbols.ts";
import { CanvasRenderer, type ColorPalette, LayerRenderer } from "@/app/core";


const MouseButtons = {
  left: 0,
  middle: 1,
  right: 2,
}


const app = inject(INJECTION_KEY_APP)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const project = inject(INJECTION_KEY_PROJECT)!;

const colorMode = useColorMode();

watch(colorMode, () => {
  setTimeout(() => redraw());
});

const { width: windowWidth, height: windowHeight } = useWindowSize();
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvas");
const { x: mouseX, y: mouseY } = useMouse({ target: canvasRef, touch: false, scroll: false });

const normalZoom = computed(() => drawContext.value.zoom / 10);

function zoomIn() {
  drawContext.value.zoom++;
}
function zoomOut() {
  drawContext.value.zoom = Math.max(1, drawContext.value.zoom-1);
}

function getColorPalette(context: CanvasRenderingContext2D): ColorPalette {
  const canvas = context.canvas;
  const style = getComputedStyle(canvas);
  return <ColorPalette>{
    // background: `hsl(${style.getPropertyValue("--background")})`,
    grid: `hsl(${style.getPropertyValue("--border")})`,
    text: `hsl(${style.getPropertyValue("--foreground")})`,
    highlight: `hsl(${style.getPropertyValue("--accent-foreground")} / 0.2)`,
    selection: `hsl(${style.getPropertyValue("--card-foreground")} / 0.2)`,
  };
}

// todo: improve
function canvasToCell(pos: VectorLike): VectorLike {
  if (!canvasRef.value) return { x: 0, y: 0 };
  const renderingContext = canvasRef.value!.getContext("2d")!;
  return new CanvasRenderer(getColorPalette(renderingContext), drawContext.value, renderingContext).canvasToCell(pos);
}


function redraw() {
  const layer = new LayerRenderer(rendererMap).render(project.value);
  const renderingContext = canvasRef.value!.getContext("2d")!;
  const colorPalette = getColorPalette(renderingContext);
  const canvasRenderer = new CanvasRenderer(colorPalette, drawContext.value, renderingContext);
  canvasRenderer.initCanvas();
  canvasRenderer.drawGrid();
  canvasRenderer.drawHighlights(drawContext.value.highlights);
  canvasRenderer.drawLayer(layer)
}

const debouncedRedraw = useDebounceFn(redraw, 5);

onMounted(() => redraw());
watch([windowWidth, windowHeight], () => debouncedRedraw());
watch(project, () => redraw(), { deep: true });
watch(drawContext, () => redraw(), { deep: true });

// zooming

useEventListener(canvasRef, "wheel", (event: WheelEvent) => {
  if (event.deltaY > 0) {
    zoomOut();
  }
  if (event.deltaY < 0) {
    zoomIn();
  }
});

// offset dragging

const mouseButtonsDown: Record<number, boolean> = {};

const moveStartOffset = { x: 0, y: 0 };
const moveStartPosition = { x: 0, y: 0 };

useEventListener(canvasRef, "mousedown", (event: MouseEvent) => {
  mouseButtonsDown[event.button] = true;
  switch (event.button) {
    case MouseButtons.left:
      app.value.actions[app.value.activeActionId]?.onClickDown?.(event);
      break;
    case MouseButtons.middle:
      moveStartOffset.x = drawContext.value.offset.x;
      moveStartOffset.y = drawContext.value.offset.y;
      moveStartPosition.x = event.clientX;
      moveStartPosition.y = event.clientY;
      break;
  }
});

useEventListener("mousemove", (event: MouseEvent) => {
  if (mouseButtonsDown[MouseButtons.left])
    app.value.actions[app.value.activeActionId]?.onClickMove?.(event);

  if (mouseButtonsDown[MouseButtons.middle]) {
    const diffX = (moveStartPosition.x - event.clientX) / normalZoom.value;
    const diffY = (moveStartPosition.y - event.clientY) / normalZoom.value;
    const offsetX = moveStartOffset.x + diffX;
    const offsetY = moveStartOffset.y + diffY;
    drawContext.value.offset.x = offsetX;
    drawContext.value.offset.y = offsetY;
  }
});

useEventListener("mouseup", (event: MouseEvent) => {
  mouseButtonsDown[event.button] = false;

  if (event.button === MouseButtons.left)
    app.value.actions[app.value.activeActionId]?.onClickUp?.(event);

  if (event.button === MouseButtons.right) {
    const point = canvasToCell({ x: event.clientX, y: event.clientY });

    drawContext.value.highlights.length = 0;  // clearing the array
    app.value.extraMenu = undefined;

    for (let i = project.value.elements.length - 1; i >= 0; i--) {
      const element = project.value.elements[i];
      const renderer = rendererMap[element.type];
      const box = renderer.getBoundingBox(element);
      if (isPointWithinBox(point, box)) {
        if (renderer.EditComponent) {
          app.value.extraMenu = {
            component: markRaw(renderer.EditComponent!),
            props: { data: element },
          }
          drawContext.value.highlights.push(renderer.getBoundingBox(element));
        }
        break;
      }
    }
  }
});

useEventListener(canvasRef, "contextmenu", (event: MouseEvent) => {
  event.preventDefault();
})
</script>

<template>
  <div class="w-screen h-screen">
    <canvas ref="canvas" class="w-full h-full" :width="windowWidth" :height="windowHeight" />
  </div>
  <div class="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none">
    Zoom: {{ drawContext.zoom }} | offset: {{ drawContext.offset.x.toFixed(2) }}x{{ drawContext.offset.y.toFixed(2) }} | Mouse: {{ canvasToCell({ x: mouseX, y: mouseY }) }}
  </div>
  <AppZoomButton @zoom-in="zoomIn" @zoom-out="zoomOut" />
</template>
