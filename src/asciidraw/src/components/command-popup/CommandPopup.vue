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
import { computed, provide, ref, toValue } from "vue";
import { common, groupPriorityMap, INJECTION_KEY_COMMAND_POPUP } from "./common.ts";
import type { CommandDetails, CommandMap } from "./types.ts";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";
import { LucideHistory } from "lucide-vue-next";
import { useWebSettings } from "@/composables/useWebSettings.ts";
import { useLocalStorage } from "@vueuse/core";

// todo: hidden commands that are only available after typing a keyword (e.g. `settings` => "Go to Settings")

// todo: move `open` and `commands` to own composable or so
const open = ref(false);
const commands = ref<CommandMap>({});

type RecentCommand = [string, string]
const MAX_COMMAND_HISTORY = useWebSettings('maxCommandHistory');
const recentCommands = useLocalStorage<RecentCommand[]>('recent-commands', []);

function addToHistory(groupId: string, commandId: string): void {
  const alreadyIn = recentCommands.value.findIndex(([g, c]) => g === groupId && c === commandId);
  if (alreadyIn !== -1) recentCommands.value.splice(alreadyIn, 1);
  recentCommands.value.unshift([groupId, commandId]);
  recentCommands.value.splice(MAX_COMMAND_HISTORY.value);
}

const commandHistory = computed(() => {
  return recentCommands.value.map(([groupId, commandId]) => {
    const command = commands.value[groupId]?.[commandId];
    return command && [groupId, commandId, command] as const;
  }).filter(Boolean) as Array<[string, string, CommandDetails]>;
});

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

type CommandsSorted = Array<[string, CommandDetails]>
type GroupsSorted = Array<[string, CommandsSorted]>

const groupsSorted = computed<GroupsSorted>(() => {
  return Object.entries(commands.value)
    .map<GroupsSorted[number]>(([groupId, group]) => {
      return [groupId, Object.entries(group).sort(([k1], [k2]) => k1.localeCompare(k2))];
    })
    .filter(([_, group]) => group.length)  // filter to contain only groups with commands
    .sort(([k1], [k2]) => {  // and sort while respecting `groupPriorityMap`
      const [g1Prio, g2Prio] = [groupPriorityMap[k1] ?? 0, groupPriorityMap[k2] ?? 0];
      if (g1Prio === g2Prio) return k1.localeCompare(k2);
      return g2Prio - g1Prio;
    });
});
</script>

<template>
  <slot />
  <CommandDialog v-model:open="open">
    <CommandInput :placeholder="$t('components.command-popup.filter-placeholder')" />
    <CommandList>
      <CommandEmpty>
        {{ $t('components.command-popup.no-results') }}
      </CommandEmpty>
      <template v-if="commandHistory.length">
        <CommandGroup>
          <template #heading>
            <LucideHistory class="size-4 mr-1 inline-block" />
            <span class="uppercase">
              {{ $t(`commands.recent-commands`) }}
            </span>
          </template>
          <template v-for="[groupId, commandId, command] in commandHistory">
            <CommandItem :disabled="toValue(command.disabled)" :value="toValue(command.label)" @select="() => { addToHistory(groupId, commandId); command.callback(); }">
              <component :is="command.icon ?? 'div'" class="size-4 mr-1 inline-block" />
              {{ toValue(command.label) }}
              <CommandShortcut v-if="command.shortcut">
                {{ toValue(command.shortcut) }}
              </CommandShortcut>
            </CommandItem>
          </template>
        </CommandGroup>
        <CommandSeparator />
      </template>
      <template v-for="([groupId, groupCommands], index) in groupsSorted" :key="groupId">
        <CommandSeparator v-if="index" />
        <CommandGroup>
          <template #heading>
            <component :is="common[groupId] ?? 'div'" class="size-4 mr-1 inline-block" />
            <span class="uppercase">
              {{ $t(`commands.${groupId}.popup-label`) }}
            </span>
          </template>
          <template v-for="[commandId, command] in groupCommands" :key="commandId">
            <CommandItem :disabled="toValue(command.disabled)" :value="toValue(command.label)" @select="() => { addToHistory(groupId, commandId); command.callback(); }">
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
