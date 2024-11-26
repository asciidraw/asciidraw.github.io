<script setup lang="ts">
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";

const props = defineProps<{
  disabled?: boolean
}>();
</script>

<template>
  <slot v-if="props.disabled" />
  <ContextMenu v-else>
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="border-2">
      <ContextMenuItem inset>
        Hello World
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
