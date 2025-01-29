<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { computed, inject } from "vue";
import { INJECTION_KEY_APP, INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import {
  LucideArrowBigDown,
  LucideArrowBigUp,
  LucideClipboardCopy, LucideClipboardPaste, LucideScissors,
  LucideTrash2
} from "lucide-vue-next";
import { useClipboardItems } from "@vueuse/core";
import CustomContextMenuItem from "./CustomContextMenuItem.vue";
import { splitBySelected } from "./util.ts";

const appContext = inject(INJECTION_KEY_APP)!;
const project = inject(INJECTION_KEY_PROJECT)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;

const { content: clipboardContent, copy: copyToClipboard } = useClipboardItems({ read: true });

function handleCutOrCopy(isCut: boolean): void {

}

function handleCut(): void {
  handleCutOrCopy(true);
}

function handleCopy(): void {
  handleCutOrCopy(false);
}

function handlePaste(): void {

}

function handleRaise(): void {
  const [selected, other] = splitBySelected(project.value.elements, drawContext.value.selectedElements);
  project.value.elements = [...other, ...selected];
}

function handleLower(): void {
  const [selected, other] = splitBySelected(project.value.elements, drawContext.value.selectedElements);
  project.value.elements = [...selected, ...other];
}

function handleDeletion(): void {
  project.value.elements = project.value.elements.filter(el => !drawContext.value.selectedElements.has(el.id));
}

const hasElements = computed(() => drawContext.value.selectedElements.size > 0);
const canPaste = computed(() => clipboardContent.value?.some(item => item.types.includes("application/asciidraw")))
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="border-2 min-w-[14rem]">
<!--      <CustomContextMenuItem :disabled="!hasElements" @click="handleCut">-->
<!--        <template #icon><LucideScissors /></template>-->
<!--        <template #default>{{ $t('app.context-menu.cut.label') }}</template>-->
<!--        <template #shortcut>{{ $t('app.context-menu.cut.shortcut') }}</template>-->
<!--      </CustomContextMenuItem>-->
<!--      <CustomContextMenuItem :disabled="!hasElements" @click="handleCopy">-->
<!--        <template #icon><LucideClipboardCopy /></template>-->
<!--        <template #default>{{ $t('app.context-menu.copy.label') }}</template>-->
<!--        <template #shortcut>{{ $t('app.context-menu.copy.shortcut') }}</template>-->
<!--      </CustomContextMenuItem>-->
<!--      <CustomContextMenuItem :disabled="canPaste" @click="handlePaste">-->
<!--        <template #icon><LucideClipboardPaste /></template>-->
<!--        <template #default>{{ $t('app.context-menu.paste.label') }}</template>-->
<!--        <template #shortcut>{{ $t('app.context-menu.paste.shortcut') }}</template>-->
<!--      </CustomContextMenuItem>-->
<!--      <ContextMenuSeparator />-->
      <CustomContextMenuItem :disabled="!hasElements" @click="handleRaise">
        <template #icon><LucideArrowBigUp /></template>
        <template #default>{{ $t('app.context-menu.raise.label') }}</template>
      </CustomContextMenuItem>
      <CustomContextMenuItem :disabled="!hasElements" @click="handleLower">
        <template #icon><LucideArrowBigDown /></template>
        <template #default>{{ $t('app.context-menu.lower.label') }}</template>
      </CustomContextMenuItem>
      <ContextMenuSeparator />
      <CustomContextMenuItem :disabled="!hasElements" @click="handleDeletion" class="text-destructive">
        <template #icon><LucideTrash2 /></template>
        <template #default>{{ $t('app.context-menu.delete.label') }}</template>
        <template #shortcut>{{ $t('app.context-menu.delete.shortcut') }}</template>
      </CustomContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
