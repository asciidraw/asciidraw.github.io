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
import {
  LucideAlertTriangle,
  LucideClipboardCheck,
  LucideClipboardCopy,
  LucideDownload,
  LucideTangent
} from "lucide-vue-next";
import { useClipboardItems, useObjectUrl } from "@vueuse/core";
import { computed, inject, ref } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { LayerRenderer } from "@/app/core";
import { findMinMaxOfLayer } from "@/app/floating-menu/export/util.ts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { defineCommand } from "@/components/command-popup";
import { useI18n } from "vue-i18n";

const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const renderMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const { t } = useI18n();
const dialogOpen = ref(false);

defineCommand({
  group: "workspace",
  id: "export-svg",
  icon: LucideTangent,
  label: () => t('commands.workspace.export-svg'),
  action: () => {
    dialogOpen.value = true;
  },
});

const SVG_MIMETYPE = "image/svg+xml";

function fallbackData() {
  return new Blob(['<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>'], { type: "image/svg+xml" });
}

const renderedBlob = computed<Blob>(() => {
  const elements = drawContext.value.selectedElements.size
    ? project.value.elements.filter(el => drawContext.value.selectedElements.has(el.id))
    : project.value.elements;

  if (elements.length === 0) {
    return fallbackData();
  }

  const fontSize = 16;
  const characterHeight = fontSize;
  const characterWidth = (9/16) * fontSize;
  const padding = 4;

  const layer = new LayerRenderer(renderMap).render(elements);

  const [minX, minY, maxX, maxY] = findMinMaxOfLayer(layer);
  if (minX === Infinity) return fallbackData();

  const gridArray = Array(maxY-minY+1).fill(null).map(() => Array(maxX-minX+1).fill(' '));
  layer.entries().forEach(([[x, y], char]) => {
    gridArray[y-minY][x-minX] = char;
  });
  const lines = gridArray.map(row => row.join(''));

  const viewBoxHeight = Math.ceil(lines.length * characterHeight) + padding*2;
  const viewBoxWidth = Math.ceil((lines[0].length+2) * characterWidth + padding*2);

  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgNode.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
  svgNode.setAttribute("fill", "currentColor");
  svgNode.setAttribute("stroke", "currentColor");

  const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textNode.setAttribute("x", `${padding}`);
  textNode.setAttribute("y", `${padding}`);
  textNode.setAttribute("font-family", "monospace");
  textNode.setAttribute("font-size", `${fontSize}`);
  textNode.setAttribute("xml:space", "preserve");
  textNode.setAttribute("style", "white-space: pre");
  textNode.setAttribute("text-anchor", "start");
  textNode.setAttribute("direction", "ltr");
  textNode.setAttribute("letter-spacing", "normal");
  textNode.setAttribute("font-size-adjust", "none");

  for (let i = 0; i < lines.length; i++) {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.setAttribute("x", `${padding}`);
    tspan.setAttribute("dy", `1em`);
    // this replaces regular spaces with non-breaking space characters (short: `\u00A0` | long: `&nbsp;`)
    tspan.textContent = lines[i].replace(/ /g, '\u00A0');
    textNode.appendChild(tspan);
  }

  svgNode.appendChild(textNode);

  const serializer = new XMLSerializer();
  const svgDocument = serializer.serializeToString(svgNode);

  return new Blob([svgDocument], { type: SVG_MIMETYPE });
});

const imageUrl = useObjectUrl(renderedBlob);

function startDownload() {
  const anchor = document.createElement("a");
  anchor.href = imageUrl.value!;
  anchor.download = `${project.value.name ?? "asciidraw"}.svg`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

const clipboardItem = computed(() => [new ClipboardItem({ ["text/plain"]: renderedBlob.value })]);
const { copy: doCopy, copied: recentlyCopied } = useClipboardItems({ source: clipboardItem });
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {{ $t('app.dialog.export-svg.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('app.dialog.export-svg.description') }}
      </DialogDescription>
      <Alert variant="warning">
        <LucideAlertTriangle class="size-4" />
        <AlertTitle>
          {{ $t('app.dialog.export-svg.experimental.title') }}
        </AlertTitle>
        <AlertDescription>
          {{ $t('app.dialog.export-svg.experimental.description') }}
        </AlertDescription>
      </Alert>
      <img :src="imageUrl" alt="preview" class="w-full bg-secondary text-foreground rounded-sm" />
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
