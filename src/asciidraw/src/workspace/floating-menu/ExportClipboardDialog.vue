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
  LucideClipboard,
  LucideClipboardCheck,
  LucideClipboardCopy,
  LucideSpellCheck,
  LucideSpellCheck2,
} from "lucide-vue-next";
import { useClipboard, useLocalStorage } from "@vueuse/core";
import { computed, inject, ref } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { LayerRenderer, rendererMap } from "@/workspace/core";
import { CharacterType, detectCharacterType, findMinMaxOfLayer } from "@/workspace/floating-menu/export/util.ts";
import * as commentStyleMap from "./export/comment-styles.ts";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { defineCommand } from "@/components/command-popup";
import { useI18n } from "vue-i18n";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;

const { t } = useI18n();

const dialogOpen = ref(false);

defineShortcuts({
  ctrl_s: () => {
    dialogOpen.value = true;
  },
});

defineCommand({
  group: "workspace",
  id: "export-clipboard",
  icon: LucideClipboard,
  label: () => t('commands.workspace.export-clipboard'),
  action: () => {
    dialogOpen.value = true;
  },
  shortcut: () => t('commands.workspace.export-clipboard-shortcut'),
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
    gridArray[y-minY]![x-minX] = char;
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
        {{ $t('workspace.dialog.export-clipboard.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('workspace.dialog.export-clipboard.description') }}
      </DialogDescription>
      <div>
        <Label>
          {{ $t('workspace.dialog.export-clipboard.comment-style') }}
        </Label>
        <Select v-model="activeCommentStyle">
          <SelectTrigger>
            <SelectValue>
              {{ $t(`workspace.dialog.export-clipboard.comment-style-names.${activeCommentStyle}`) }}
              <Badge v-if="commentStyleMap[activeCommentStyle].example" variant="secondary" class="ml-1">
                <pre>{{ commentStyleMap[activeCommentStyle].example }}</pre>
              </Badge>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <template v-for="[name, transformer] in Object.entries(commentStyleMap)" :key="name">
              <SelectItem :value="name">
                {{ $t(`workspace.dialog.export-clipboard.comment-style-names.${name}`) }}
                <Badge v-if="transformer.example" variant="secondary" class="ml-1">
                  <pre>{{ transformer.example }}</pre>
                </Badge>
              </SelectItem>
            </template>
          </SelectContent>
        </Select>
      </div>
      <pre class="bg-secondary p-2 min-h-20 max-h-[32rem] overflow-scroll select-all leading-none">{{ renderedWithCommentStyle }}</pre>
      <DialogFooter>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="px-3">
              <component :is="characterType === CharacterType.ASCII ? LucideSpellCheck : LucideSpellCheck2" class="size-6" :class="{'text-warning': characterType !== CharacterType.ASCII}" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="space-y-1.5">
            <h4 class="text-xl font-semibold leading-none tracking-tight flex gap-2 items-baseline">
              <component :is="characterType === CharacterType.ASCII ? LucideSpellCheck : LucideSpellCheck2" class="my-auto size-5 shrink-0 inline" :class="{'text-warning': characterType !== CharacterType.ASCII}" />
              <template v-if="characterType === CharacterType.ASCII">{{ $t('workspace.dialog.export-clipboard.warnings.ascii.title') }}</template>
              <template v-else-if="characterType === CharacterType.EXTENDED_ASCII">{{ $t('workspace.dialog.export-clipboard.warnings.extended-ascii.title') }}</template>
              <template v-else-if="characterType === CharacterType.UNICODE">{{ $t('workspace.dialog.export-clipboard.warnings.unicode.title') }}</template>
              <template v-else>!BUG!</template>
            </h4>
            <p class="text-sm text-muted-foreground text-justify">
              <template v-if="characterType === CharacterType.ASCII">{{ $t('workspace.dialog.export-clipboard.warnings.ascii.description') }}</template>
              <template v-else-if="characterType === CharacterType.EXTENDED_ASCII">{{ $t('workspace.dialog.export-clipboard.warnings.extended-ascii.description') }}</template>
              <template v-else-if="characterType === CharacterType.UNICODE">{{ $t('workspace.dialog.export-clipboard.warnings.unicode.description') }}</template>
              <template v-else>!BUG!</template>
            </p>
          </PopoverContent>
        </Popover>
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
