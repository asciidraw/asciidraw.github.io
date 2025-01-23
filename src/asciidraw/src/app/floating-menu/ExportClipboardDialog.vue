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
import { LucideClipboardCopy, LucideClipboardCheck } from "lucide-vue-next";
import { useClipboard, useLocalStorage } from "@vueuse/core";
import { computed, inject } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { LayerRenderer } from "@/app/core";
import { findMinMaxOfLayer } from "@/app/floating-menu/export/util.ts";
import * as commentStyleMap from "./export/comment-styles.ts";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const project = inject(INJECTION_KEY_PROJECT)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const activeCommentStyle = useLocalStorage<keyof typeof commentStyleMap>("export-clipboard-comment-style", "none");

const rendered = computed<string>(() => {
  if (project.value.elements.length === 0) return "";
  const layer = new LayerRenderer(rendererMap).render(project.value.elements);
  const [minX, minY, maxX, maxY] = findMinMaxOfLayer(layer);
  const gridArray = Array(maxY-minY+1).fill(null).map(() => Array(maxX-minX+1).fill(' '));
  layer.entries().forEach(([[x, y], char]) => {
    gridArray[y-minY][x-minX] = char;
  });
  return gridArray.map(row => row.join('')).join('\n');
});

const renderedWithCommentStyle = computed(() => {
  return commentStyleMap[activeCommentStyle.value].transform(rendered.value);
});

const { copy: doCopy, copied: recentlyCopied } = useClipboard({ source: renderedWithCommentStyle });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent class="w-fit max-w-screen-lg">
      <DialogTitle>
        {{ $t('app.dialog.export-clipboard.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('app.dialog.export-clipboard.description') }}
      </DialogDescription>
      <div>
        <Label>
          {{ $t('app.dialog.export-clipboard.comment-style') }}
        </Label>
        <Select v-model:model-value="activeCommentStyle">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <template v-for="[name, transformer] in Object.entries(commentStyleMap)" :key="name">
              <SelectItem :value="name">
                {{ $t(`app.dialog.export-clipboard.comment-style-names.${name}`) }}
                <Badge v-if="transformer.example" variant="secondary" class="ml-1">
                  <pre>{{ transformer.example }}</pre>
                </Badge>
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>
      <pre class="bg-black p-2 min-h-20 max-h-[32rem] overflow-scroll select-all leading-none">{{ renderedWithCommentStyle }}</pre>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="secondary">
            {{ $t('dialog-common.close') }}
          </Button>
        </DialogClose>
        <Button type="button" @click="() => doCopy()">
          <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-6" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
