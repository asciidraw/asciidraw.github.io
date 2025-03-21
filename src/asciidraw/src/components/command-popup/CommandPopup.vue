<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { provide, ref, toValue } from "vue";
import { common, groupPriorityMap, INJECTION_KEY_COMMAND_POPUP } from "./common.ts";
import type { CommandMap } from "./types.ts";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";

// todo: move `open` and `commands` to own composable or so
const open = ref(false);
const commands = ref<CommandMap>({});

provide(INJECTION_KEY_COMMAND_POPUP, {
  open: open,
  commands: commands,
});

defineShortcuts({
  ctrl_p: {
    handler: () => {
      open.value = !open.value;
    },
    usingInput: true,
  },
  'Shift-Shift': () => {
    open.value = true;
  },
});

function sortedEntries<T>(o: {[k: string]: T}): [string, T][] {
  return Object.entries(o).sort(([k1], [k2]) => {
    const [g1Prio, g2Prio] = [groupPriorityMap[k1] ?? 0, groupPriorityMap[k2] ?? 0];
    if (g1Prio === g2Prio) return k1.localeCompare(k2);
    return g2Prio - g1Prio;
  });
}
</script>

<template>
  <slot />
  <CommandDialog v-model:open="open">
    <CommandInput :placeholder="$t('components.command-popup.filter-placeholder')" />
    <CommandList>
      <CommandEmpty>
        {{ $t('components.command-popup.no-results') }}
      </CommandEmpty>
      <template v-for="([groupId, groupCommands], index) in sortedEntries(commands)" :key="groupId">
        <CommandSeparator v-if="index" />
        <CommandGroup v-if="groupCommands">
          <template #heading>
            <component :is="common[groupId] ?? 'div'" class="size-4 mr-1 inline-block" />
            <span class="uppercase">
              {{ $t(`commands.${groupId}.popup-label`) }}
            </span>
          </template>
          <template v-for="[commandId, command] in sortedEntries(groupCommands)" :key="commandId">
            <CommandItem :disabled="toValue(command.disabled)" :value="toValue(command.label)" @select="() => { command.callback() }">
              <component :is="command.icon ?? 'div'" class="size-4 mr-1 inline-block" />
              {{ toValue(command.label) }}
              <CommandShortcut v-if="command.shortcut">
                {{ toValue(command.shortcut) }}
              </CommandShortcut>
            </CommandItem>
          </template>
        </CommandGroup>
      </template>
    </CommandList>
  </CommandDialog>
</template>
