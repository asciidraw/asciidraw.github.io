<script setup lang="ts">
import { ContextMenuItem, ContextMenuShortcut } from "@/components/ui/context-menu";

type ExtractComponentProps<T> = /* @vue-ignore */ T extends new () => { $props: infer P } ? Partial<P> : never;

const props = defineProps<ExtractComponentProps<typeof ContextMenuItem> & {

}>();
</script>

<template>
  <ContextMenuItem class="gap-x-1" v-bind="$attrs">
    <slot name="icon" />
    <slot name="default" />
    <ContextMenuShortcut v-if="$slots.shortcut">
      <slot name="shortcut" />
    </ContextMenuShortcut>
  </ContextMenuItem>
</template>
