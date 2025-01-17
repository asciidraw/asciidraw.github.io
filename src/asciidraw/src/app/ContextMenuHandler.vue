<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent, ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { inject } from "vue";
import { INJECTION_KEY_APP } from "@/symbols.ts";
import { Button } from "@/components/ui/button";

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
      <template v-for="[actionId, action] in Object.entries(appContext.actions)" :key="action.id">
        <Button :variant="actionId === appContext.activeActionId ? 'secondary' : 'ghost'" size="xs" class="gap-x-2 w-full" @click="appContext.activeActionId = actionId">
          <component v-if="action.icon" :is="action.icon" class="size-6" />
          <div v-else class="size-6 invisible" />
          <p class="grow text-left">{{ $t(action.displayName) }}</p>
        </Button>
      </template>
    </ContextMenuContent>
  </ContextMenu>
</template>
