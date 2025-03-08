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
import { LucideClipboardCheck, LucideClipboardCopy, LucideSpellCheck, LucideSpellCheck2 } from "lucide-vue-next";
import { useClipboard, useLocalStorage, useMagicKeys, whenever } from "@vueuse/core";
import { computed, inject, ref } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { LayerRenderer } from "@/app/core";
import { CharacterType, detectCharacterType, findMinMaxOfLayer } from "@/app/floating-menu/export/util.ts";
import * as commentStyleMap from "./export/comment-styles.ts";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";

const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const rendererMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const dialogOpen = ref(false);

defineShortcuts({
  ctrl_s: () => {
    dialogOpen.value = true;
  },
});

const activeCommentStyle = useLocalStorage<keyof typeof commentStyleMap>("export-clipboard-comment-style", "none");

function fallbackData() {
  return "";
}

const rendered = computed<string>(() => {
  const elements = drawContext.value.selectedElements.size
    ? project.value.elements.filter(el => drawContext.value.selectedElements.has(el.id))
    : project.value.elements;
  if (elements.length === 0) return fallbackData();

  const layer = new LayerRenderer(rendererMap).render(elements);
  const [minX, minY, maxX, maxY] = findMinMaxOfLayer(layer);
  if (minX === Infinity) return fallbackData();

  const gridArray = Array(maxY-minY+1).fill(null).map(() => Array(maxX-minX+1).fill(' '));
  layer.entries().forEach(([[x, y], char]) => {
    gridArray[y-minY][x-minX] = char;
  });
  return gridArray.map(row => row.join('')).join('\n');
});

const renderedWithCommentStyle = computed(() => {
  return commentStyleMap[activeCommentStyle.value].transform(rendered.value);
});

const characterType = computed(() => detectCharacterType(renderedWithCommentStyle.value));

const { copy: doCopy, copied: recentlyCopied } = useClipboard({ source: renderedWithCommentStyle });
</script>

<template>
  <Dialog v-model:open="dialogOpen">
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
      <Alert :variant="characterType === CharacterType.ASCII ? 'default' : 'warning'">
        <component :is="characterType === CharacterType.ASCII ? LucideSpellCheck : LucideSpellCheck2" class="size-4" />
        <AlertTitle>
          <template v-if="characterType === CharacterType.ASCII">{{ $t('app.dialog.export-clipboard.warnings.ascii.title') }}</template>
          <template v-else-if="characterType === CharacterType.EXTENDED_ASCII">{{ $t('app.dialog.export-clipboard.warnings.extended-ascii.title') }}</template>
          <template v-else-if="characterType === CharacterType.UNICODE">{{ $t('app.dialog.export-clipboard.warnings.unicode.title') }}</template>
          <template v-else>!BUG!</template>
        </AlertTitle>
        <AlertDescription>
          <template v-if="characterType === CharacterType.ASCII">{{ $t('app.dialog.export-clipboard.warnings.ascii.description') }}</template>
          <template v-else-if="characterType === CharacterType.EXTENDED_ASCII">{{ $t('app.dialog.export-clipboard.warnings.extended-ascii.description') }}</template>
          <template v-else-if="characterType === CharacterType.UNICODE">{{ $t('app.dialog.export-clipboard.warnings.unicode.description') }}</template>
          <template v-else>!BUG!</template>
        </AlertDescription>
      </Alert>
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
