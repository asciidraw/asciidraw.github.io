<script setup lang="ts">
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideClipboardCopy, LucideClipboardCheck, LucideDownload } from "lucide-vue-next";
import { computedAsync, useClipboardItems, useObjectUrl } from "@vueuse/core";
import { computed, inject } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { CanvasRenderer, type ColorPalette, LayerRenderer } from "@/app/core";
import type { DrawContext } from "@/types";
import { findMinMaxOfLayer } from "@/app/floating-menu/export/util.ts";
import * as constants from "@/constants";

const project = inject(INJECTION_KEY_PROJECT)!;
const renderMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const imageFormat = "image/png";

// todo: improve
const colorPalette: ColorPalette = {
  grid: "red",
  text: "white",
  highlight: "red",
  selection: "red",
}

const renderedBlob = computedAsync<Blob>(async () => {
  const layer = new LayerRenderer(renderMap).render(project.value);

  const canvas = document.createElement("canvas");
  const renderingContext = canvas.getContext("2d")!;
  const [minX, minY, maxX, maxY] = findMinMaxOfLayer(layer);
  canvas.width = (maxX-minX+1) * constants.CHARACTER_PIXEL_WIDTH + 10;
  canvas.height = (maxY-minY+1) * constants.CHARACTER_PIXEL_HEIGHT + 10;
  const drawContext: DrawContext = {
    zoom: 10,
    offset: {
      x: ((maxX-minX)/2+minX+0.5) * constants.CHARACTER_PIXEL_WIDTH,
      y: ((maxY-minY)/2+minY-0.5) * constants.CHARACTER_PIXEL_HEIGHT,
    },
  };
  const canvasRenderer = new CanvasRenderer(colorPalette, drawContext, renderingContext);
  canvasRenderer.initCanvas();
  // canvasRenderer.drawGrid();
  canvasRenderer.drawLayer(layer);
  return await new Promise(resolve => canvas.toBlob(blob => resolve(blob!), imageFormat));
}, new Blob());

const imageUrl = useObjectUrl(renderedBlob);

function startDownload() {
  const anchor = document.createElement("a");
  anchor.href = imageUrl.value!;
  anchor.download = `asciidraw.${imageFormat.slice(6)}`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

const clipboardItem = computed(() => [new ClipboardItem({ [imageFormat]: renderedBlob.value })]);
const { copy: doCopy, copied: recentlyCopied } = useClipboardItems({ source: clipboardItem });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {{ $t('app.dialog.export-image.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('app.dialog.export-image.description') }}
      </DialogDescription>
      <img :src="imageUrl" alt="preview" class="w-full bg-accent rounded-sm" />
      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            {{ $t('app.dialog.common.close') }}
          </Button>
        </DialogClose>
        <Button type="button" @click="() => startDownload()">
          <LucideDownload class="size-6" />
        </Button>
        <Button type="button" @click="() => doCopy()">
          <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-6" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
