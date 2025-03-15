<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideClipboardCheck, LucideClipboardCopy, LucideDownload, LucideImage } from "lucide-vue-next";
import { computedAsync, useClipboardItems, useLocalStorage, useObjectUrl } from "@vueuse/core";
import { computed, inject, ref } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { CanvasRenderer, LayerRenderer } from "@/workspace/core";
import type { DrawContext } from "@/types";
import { findMinMaxOfLayer } from "@/workspace/floating-menu/export/util.ts";
import * as constants from "@/constants";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as colorPalettes from "./export/color-palettes.ts";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "vue-i18n";
import { defineCommand } from "@/components/command-popup";

const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const renderMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const { t } = useI18n();
const dialogOpen = ref(false);

defineCommand({
  group: "workspace",
  id: "export-image",
  icon: LucideImage,
  label: () => t('commands.workspace.export-image'),
  action: () => {
    dialogOpen.value = true;
  },
});

const imageFormat = "image/png";

const activePalette = useLocalStorage<keyof typeof colorPalettes>("export-image-palette", "github");

function fallbackData(): Promise<Blob> {
  return new Promise(resolve => {
    const canvas = document.createElement("canvas");
    return canvas.toBlob(blob => resolve(blob!), imageFormat);
  });
}

const renderedBlob = computedAsync<Blob>(async () => {
  const elements = drawContext.value.selectedElements.size
    ? project.value.elements.filter(el => drawContext.value.selectedElements.has(el.id))
    : project.value.elements;

  if (elements.length === 0) return await fallbackData();

  const layer = new LayerRenderer(renderMap).render(elements);
  const [minX, minY, maxX, maxY] = findMinMaxOfLayer(layer);
  if (minX === Infinity) return await fallbackData();

  const canvas = document.createElement("canvas");
  const renderingContext = canvas.getContext("2d")!;
  canvas.width = (maxX-minX+1) * constants.CHARACTER_PIXEL_WIDTH + 10;
  canvas.height = (maxY-minY+1) * constants.CHARACTER_PIXEL_HEIGHT + 10;
  const renderDrawContext: DrawContext = {
    zoom: 10,
    offset: {
      x: ((maxX-minX)/2+minX+0.5) * constants.CHARACTER_PIXEL_WIDTH,
      y: ((maxY-minY)/2+minY-0.5) * constants.CHARACTER_PIXEL_HEIGHT,
    },
    selectedElements: new Set(), scratchElements: [],
    userHighlight: null,
  };
  const canvasRenderer = new CanvasRenderer(colorPalettes[activePalette.value], renderDrawContext, renderingContext);
  canvasRenderer.initCanvas();
  // canvasRenderer.drawGrid();
  canvasRenderer.drawLayer(layer);
  return await new Promise(resolve => canvas.toBlob(blob => resolve(blob!), imageFormat));
}, new Blob());

const imageUrl = useObjectUrl(renderedBlob);

function startDownload() {
  const anchor = document.createElement("a");
  anchor.href = imageUrl.value!;
  anchor.download = `${project.value.name ?? "asciidraw"}.${imageFormat.slice(6)}`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

const clipboardItem = computed(() => [new ClipboardItem({ [imageFormat]: renderedBlob.value })]);
const { copy: doCopy, copied: recentlyCopied } = useClipboardItems({ source: clipboardItem });
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {{ $t('workspace.dialog.export-image.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('workspace.dialog.export-image.description') }}
      </DialogDescription>
      <div>
        <Label>
          {{ $t('workspace.dialog.export-image.style') }}
        </Label>
        <Select v-model:model-value="activePalette">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <template v-for="[name, palette] in Object.entries(colorPalettes)" :key="name">
              <SelectItem :value="name">
                {{ $t(`workspace.dialog.export-image.style-names.${name}`) }}
                <Badge variant="secondary" class="ml-1" :style="{ backgroundColor: palette.background, color: palette.text }">
                  <pre>+---+</pre>
                </Badge>
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>
      <img :src="imageUrl" alt="preview" class="w-full bg-secondary rounded-sm" />
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary">
            {{ $t('dialog-common.close') }}
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
