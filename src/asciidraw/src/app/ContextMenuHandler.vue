<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent, ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { inject } from "vue";
import { INJECTION_KEY_APP } from "@/symbols.ts";

defineProps<{
  disabled?: boolean
}>();

const appContext = inject(INJECTION_KEY_APP)!;
</script>

<template>
  <slot v-if="disabled" />
  <ContextMenu v-else>
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuContent class="border-2">
      <template v-for="action in appContext.actions" :key="action.id">
        <ContextMenuItem @click="appContext.activeActionId = action.id" :class="appContext.activeActionId === action.id ? 'border-l' : ''">
          <component v-if="action.icon" :is="action.icon" class="mr-1" />
          {{ action.displayName }}
        </ContextMenuItem>
      </template>
    </ContextMenuContent>
  </ContextMenu>
</template>
