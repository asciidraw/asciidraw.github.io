<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideClipboardCopy, LucideClipboardCheck } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";
import { computed, inject } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { Layer } from "@/lib";

const project = inject(INJECTION_KEY_PROJECT)!;
const renderMap = inject(INJECTION_KEY_RENDERER_MAP)!;

function findMinMax(layer: Layer): [number, number, number, number] {
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
  layer.entries().forEach(([[x, y]]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  return [minX, minY, maxX, maxY];
}

const rendered = computed(() => {
  const layer = new Layer();
  const [minX, minY, maxX, maxY] = findMinMax(layer);
  const gridArray = Array(maxY-minY+1).fill(null).map(() => Array(maxX-minX+1).fill(' '));
  layer.entries().forEach(([[x, y], char]) => {
    gridArray[y-minY][x-minX] = char;
  });
  return gridArray.map(row => row.join('')).join('\n');
});

const { copy: doCopy, copied: recentlyCopied } = useClipboard({ source: rendered });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {{ $t('app.dialog.export-clipboard.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('app.dialog.export-clipboard.description') }}
      </DialogDescription>
      <pre class="bg-black min-h-20 max-h-96 overflow-scroll select-all">{{ rendered }}</pre>
      <DialogFooter>
        <Button type="button" @click="() => doCopy()">
          <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-6" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
