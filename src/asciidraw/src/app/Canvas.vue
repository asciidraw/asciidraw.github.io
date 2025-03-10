<script setup lang="ts">
import { computed, inject, onMounted, useTemplateRef, watch } from "vue";
import {
  useDebounceFn,
  useEventListener,
  useMouse,
  useWindowSize,
} from "@vueuse/core";
import AppZoomButton from "@/app/ZoomButton.vue";
import { cloneElement, isPointWithinBox, Layer } from "@/lib";
import {
  INJECTION_KEY_APP,
  INJECTION_KEY_DRAW_CONTEXT,
  INJECTION_KEY_PROJECT,
  INJECTION_KEY_RENDERER_MAP
} from "@/symbols.ts";
import { CanvasRenderer, type ColorPalette, LayerRenderer } from "@/app/core";
import type { ElementBase, VectorLike } from "@/types";
import { createLabelElement } from "@/app/extensions/label";
import ContextMenuHandler from "@/app/context-menu/ContextMenuHandler.vue";
import { useConfiguredColorMode } from "@/composables/useConfiguredColorMode.ts";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";
import { useWebSettings } from "@/composables/useWebSettings.ts";
import { useI18n } from "vue-i18n";
import { registerCommand } from "@/components/command-popup";
import { LucideSquareDashedMousePointer, LucideTrash2 } from "lucide-vue-next";


const MouseButtons = {
  left: 0,
  middle: 1,
  right: 2,
}


const app = inject(INJECTION_KEY_APP)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const project = inject(INJECTION_KEY_PROJECT)!;
const isDevMode = useWebSettings("devMode");

const { t } = useI18n();
const colorMode = useConfiguredColorMode();
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
    grid: `hsl(${style.getPropertyValue("--border")} / 0.8)`,
    text: `hsl(${style.getPropertyValue("--foreground")})`,
    highlight: `hsl(${style.getPropertyValue("--accent-foreground")} / 0.2)`,
    selection: `hsl(${style.getPropertyValue("--card-foreground")} / 0.2)`,
  };
}

// todo: improve
function canvasToCell(pos: VectorLike): VectorLike {
  if (!canvasRef.value) return { x: 0, y: 0 };
  const renderingContext = canvasRef.value!.getContext("2d")!;
  // @ts-expect-error: setting colorPalette to null as it's unused
  const canvasRenderer = new CanvasRenderer(null, drawContext.value, renderingContext);
  return canvasRenderer.canvasToCell(pos);
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
    const highlightBox = rendererMap[selectedElement.type].getBoundingBox(selectedElement);
    canvasRenderer.highlight(highlightBox);
  }
  if (drawContext.value.userHighlight)
    canvasRenderer.highlight(drawContext.value.userHighlight)
  canvasRenderer.drawLayer(layer);
}

const debouncedRedraw = useDebounceFn(redraw, 5);

onMounted(() => redraw());
watch([windowWidth, windowHeight], () => debouncedRedraw());
watch(project, () => redraw(), { deep: true });
watch(drawContext, () => redraw(), { deep: true });

// zooming

useEventListener(canvasRef, "wheel", (event: WheelEvent) => {
  if (event.ctrlKey) event.preventDefault();
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

function deleteElementsById(...elementIds: string[]) {
  for (const elementId of elementIds) {
    const elementIndex = project.value.elements.findIndex(el => el.id === elementId);
    if (elementIndex > -1) {
      project.value.elements.splice(elementIndex, 1);
      drawContext.value.selectedElements.delete(elementId);
    }
  }
}


function deleteSelection(): void {
  deleteElementsById(...drawContext.value.selectedElements);
}

function selectAll(): void {
  for (const element of project.value.elements)
    drawContext.value.selectedElements.add(element.id);
}

function invertSelection(): void {
  for (const element of project.value.elements) {
    if (drawContext.value.selectedElements.has(element.id))
      drawContext.value.selectedElements.delete(element.id);
    else
      drawContext.value.selectedElements.add(element.id);
  }
}

defineShortcuts({
  Delete: () => deleteSelection(),
  Backspace: () => deleteSelection(),
  ctrl_a: () => selectAll(),
  ctrl_i: () => invertSelection(),
  ArrowUp: () => {
    project.value.elements
      .filter(el => drawContext.value.selectedElements.has(el.id))
      .forEach(el => { el.y -= 1; });
  },
  ArrowRight: () => {
    project.value.elements
      .filter(el => drawContext.value.selectedElements.has(el.id))
      .forEach(el => { el.x += 1; });
  },
  ArrowDown: () => {
    project.value.elements
      .filter(el => drawContext.value.selectedElements.has(el.id))
      .forEach(el => { el.y += 1; });
  },
  ArrowLeft: () => {
    project.value.elements
      .filter(el => drawContext.value.selectedElements.has(el.id))
      .forEach(el => { el.x -= 1; });
  }
});

function validCopyCutPasteEvent(event: ClipboardEvent): boolean {
  if (event.target === canvasRef.value) return true;
  if (event.target instanceof HTMLDivElement && event.target.classList.contains("canvas-wrapper")) return true;
  return false;
}

function cutCopyEventHandler(event: ClipboardEvent) {
  if (!validCopyCutPasteEvent(event)) return;
  event.preventDefault();
  const selectedIds = drawContext.value.selectedElements;
  if (selectedIds.size === 0) return;
  const { x: centerX, y: centerY } = canvasToCell(canvasRef.value ? { x : canvasRef.value.width / 2, y: canvasRef.value.height / 2 } : { x: 0, y: 0 });
  const selectedElements = project.value.elements
    .filter(element => selectedIds.has(element.id))
    .map(element => {
      const copied = cloneElement(element);
      // make relative to screen-center
      copied.x = element.x - centerX;
      copied.y = element.y - centerY;
      return copied;
    });
  const stringified = JSON.stringify(selectedElements);
  event.clipboardData!.setData("application/asciidraw", stringified);
  if (event.type === "cut")
    deleteElementsById(...drawContext.value.selectedElements);
}

useEventListener(canvasRef, "auxclick", (event: MouseEvent) => {
  event.preventDefault();  // prevent paste triggering from mouse-wheel button
});

useEventListener("copy", cutCopyEventHandler);
useEventListener("cut", cutCopyEventHandler);
useEventListener("paste", (event: ClipboardEvent) => {
  if (!validCopyCutPasteEvent(event)) return;
  const clipboard = event.clipboardData!;
  event.preventDefault();
  if (clipboard.types.includes("application/asciidraw")) {
    const loaded: Array<ElementBase> = JSON.parse(clipboard.getData("application/asciidraw"));
    if (!Array.isArray(loaded)) throw new Error("Bad paste content");
    const { x: centerX, y: centerY } = canvasToCell(canvasRef.value ? { x : canvasRef.value.width / 2, y: canvasRef.value.height / 2 } : {x: 0, y: 0});
    const newElements = loaded.map(raw => {
      const newElement = cloneElement(raw);
      // make relative to screen-center
      newElement.x += centerX;
      newElement.y += centerY;
      return newElement;
    });
    project.value.elements.push(...newElements);
    drawContext.value.selectedElements.clear();
    newElements.forEach(element => drawContext.value.selectedElements.add(element.id))
  } else if (clipboard.types.includes("text/plain")) {
    const text = clipboard.getData("text/plain");
    const { x: centerX, y: centerY } = canvasToCell(canvasRef.value ? { x : canvasRef.value.width / 2, y: canvasRef.value.height / 2 } : {x: 0, y: 0});
    const lines = text.split("\n");
    const width = lines.reduce((prev, curr) => Math.max(curr.length, prev), 0)-1;
    const height = lines.length-1;
    project.value.elements.push(createLabelElement(
      text,
      { x: Math.floor(centerX - width / 2), y: Math.floor(centerY - height / 2) },
      width, height,
    ));
  } else {
    throw new Error("Unsupported Clipboard-Data");
  }
});

const debugMousePos = computed(() => canvasToCell({ x: mouseX.value, y: mouseY.value }));

registerCommand({
  group: "canvas",
  id: "select-all",
  icon: LucideSquareDashedMousePointer,
  label: () => t('commands.canvas.select-all'),
  action: () => { selectAll() },
  shortcut: () => t('commands.canvas.select-all-shortcut'),
});
registerCommand({
  group: "canvas",
  id: "invert-selection",
  icon: LucideSquareDashedMousePointer,
  label: () => t('commands.canvas.invert-selection'),
  action: () => { invertSelection() },
  shortcut: () => t('commands.canvas.invert-selection-shortcut'),
});
registerCommand({
  group: "canvas",
  id: "delete-selected",
  icon: LucideTrash2,
  disabled: () => drawContext.value.selectedElements.size === 0,
  label: () => t('commands.canvas.delete-selected'),
  action: () => { deleteSelection() },
  shortcut: () => t('commands.canvas.delete-selected-shortcut'),
});
</script>

<template>
  <div class="w-screen h-screen canvas-wrapper">
    <ContextMenuHandler>
      <canvas
        ref="canvas"
        class="w-full h-full"
        :width="windowWidth"
        :height="windowHeight"
        tabindex="0"
      />
    </ContextMenuHandler>
  </div>
  <AppZoomButton @zoom-in="zoomIn" @zoom-out="zoomOut" />
  <!-- debug information -->
  <div v-if="isDevMode" class="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none">
    Zoom: {{ drawContext.zoom * 10 }}% | Offset: {{ drawContext.offset.x.toFixed(2) }}x{{ drawContext.offset.y.toFixed(2) }} | Mouse: {{ debugMousePos.x }},{{ debugMousePos.y }}
  </div>
</template>
