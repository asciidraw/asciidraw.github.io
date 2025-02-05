<script setup lang="ts">
import { ContextMenuItem, ContextMenuShortcut } from "@/components/ui/context-menu";

type ContextMenuItemProps = /* @vue-ignore */ UndefinedToOptional<InstanceType<typeof ContextMenuItem>['$props']>;

defineOptions({
  inheritAttrs: false,
});
defineProps<ContextMenuItemProps>();
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
