<script setup lang="ts">
import { computed, inject, onMounted, useTemplateRef, watch } from "vue";
import {
  useColorMode,
  useDebounceFn,
  useEventListener,
  useMouse,
  useWindowSize,
} from "@vueuse/core";
import AppZoomButton from "@/app/ZoomButton.vue";
import { isPointWithinBox, Layer, type VectorLike } from "@/lib";
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
  drawContext.value.zoom = Math.min(30, drawContext.value.zoom+1);
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
  const layerRendered = new LayerRenderer(rendererMap);
  const layer = new Layer();
  layer.merge(layerRendered.render(project.value.elements));
  layer.merge(layerRendered.render(drawContext.value.scratchElements));
  const renderingContext = canvasRef.value!.getContext("2d")!;
  const colorPalette = getColorPalette(renderingContext);
  const canvasRenderer = new CanvasRenderer(colorPalette, drawContext.value, renderingContext);
  canvasRenderer.initCanvas();
  canvasRenderer.drawGrid();
  if (drawContext.value.auxiliaryLines)
    canvasRenderer.drawAuxiliaryLines(drawContext.value.auxiliaryLines);
  for (const selectedElementId of drawContext.value.selectedElements) {
    const selectedElement = project.value.elements.find(e => e.id === selectedElementId);
    if (!selectedElement) continue;
    const highlight = rendererMap[selectedElement.type].getBoundingBox(selectedElement);
    canvasRenderer.highlight({ x: highlight.left, y: highlight.top }, { x: highlight.right, y: highlight.bottom });
  }
  canvasRenderer.drawLayer(layer);
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

function getAppClickParams(mouseEvent: MouseEvent) {
  return {
    mouseEvent: mouseEvent,
    project: project.value,
    appContext: app.value,
    drawContext: drawContext.value,
    rendererMap: rendererMap,
    canvasToCell: canvasToCell,
  };
}

useEventListener(canvasRef, "mousedown", (event: MouseEvent) => {
  canvasRef.value!.focus();
  mouseButtonsDown[event.button] = true;
  switch (event.button) {
    case MouseButtons.left:
      app.value.actions[app.value.activeActionId]?.onClickDown?.(getAppClickParams(event));
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
    app.value.actions[app.value.activeActionId]?.onClickMove?.(getAppClickParams(event));

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
  if (mouseButtonsDown[MouseButtons.left])
    app.value.actions[app.value.activeActionId]?.onClickUp?.(getAppClickParams(event));

  if (mouseButtonsDown[MouseButtons.right]) {
    const point = canvasToCell({ x: event.clientX, y: event.clientY });

    drawContext.value.selectedElements.clear();

    for (let i = project.value.elements.length - 1; i >= 0; i--) {
      const element = project.value.elements[i];
      const renderer = rendererMap[element.type];
      const box = renderer.getBoundingBox(element);
      if (isPointWithinBox(point, box)) {
        if (drawContext.value.selectedElements.has(element.id))
          drawContext.value.selectedElements.delete(element.id);
        else
          drawContext.value.selectedElements.add(element.id);
        break;
      }
    }
  }

  mouseButtonsDown[event.button] = false;
});

useEventListener(canvasRef, "contextmenu", (event: MouseEvent) => {
  event.preventDefault();
});

useEventListener(canvasRef, "keydown", (event: KeyboardEvent) => {
  event.preventDefault();
  if (event.key === "Delete" || event.key === "Backspace") {
    for (const selectedElementId of drawContext.value.selectedElements) {
      const elementIndex = project.value.elements.findIndex(el => el.id === selectedElementId);
      if (elementIndex > -1) {
        project.value.elements.splice(elementIndex, 1);
        drawContext.value.selectedElements.delete(selectedElementId);
      }
    }
  }
  if (event.ctrlKey && event.key === "a") {
    for (const element of project.value.elements)
      drawContext.value.selectedElements.add(element.id);
  }
  if (event.ctrlKey && event.key === "i") {
    for (const element of project.value.elements) {
      if (drawContext.value.selectedElements.has(element.id))
        drawContext.value.selectedElements.delete(element.id);
      else
        drawContext.value.selectedElements.add(element.id);
    }
  }
});
</script>

<template>
  <div class="w-screen h-screen">
    <canvas ref="canvas" class="w-full h-full" :width="windowWidth" :height="windowHeight" tabindex="0" />
  </div>
  <div class="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none">
    Zoom: {{ drawContext.zoom }} | offset: {{ drawContext.offset.x.toFixed(2) }}x{{ drawContext.offset.y.toFixed(2) }} | Mouse: {{ canvasToCell({ x: mouseX, y: mouseY }) }}
  </div>
  <AppZoomButton @zoom-in="zoomIn" @zoom-out="zoomOut" />
</template>
