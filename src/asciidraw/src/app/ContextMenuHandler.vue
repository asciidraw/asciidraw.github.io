<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent, ContextMenuLabel,
  ContextMenuRadioGroup, ContextMenuRadioItem,
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
      <ContextMenuLabel>
        {{ $t('app.menu.actions.label') }}
      </ContextMenuLabel>
      <ContextMenuRadioGroup :model-value="appContext.activeActionId">
        <template v-for="action in appContext.actions" :key="action.id">
          <ContextMenuRadioItem :value="action.id" @click="appContext.activeActionId = action.id">
            {{ action.displayName }}
          </ContextMenuRadioItem>
        </template>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
</template>
