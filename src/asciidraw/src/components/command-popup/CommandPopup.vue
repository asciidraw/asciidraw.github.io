<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator, CommandShortcut
} from "@/components/ui/command";
import { useEventListener } from "@vueuse/core";
import { provide, ref, toValue } from "vue";
import { groupPriorityMap, common, INJECTION_KEY_COMMAND_POPUP } from "./common.ts";
import type { CommandMap } from "./types.ts";

const open = ref(false);
const commands = ref<CommandMap>({});

provide(INJECTION_KEY_COMMAND_POPUP, {
  open: open,
  commands: commands,
});

let lastShiftPress: number = 0;

useEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
    event.preventDefault();
    open.value = !open.value;
  }
  if (event.key === 'Shift') {
    const doubleShiftThreshold = 300;
    const now = Date.now();
    if ((now - lastShiftPress) <= doubleShiftThreshold) {
      event.preventDefault();
      open.value = true;
    }
    lastShiftPress = now;
  }
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
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>
        No Results found.
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
            <!-- todo: when navigating with the keyboard. a disabled item can still be selected and @select will be executed -->
            <CommandItem :disabled="toValue(command.disabled)" :value="toValue(command.label)" @select="() => { if(!toValue(command.disabled)) command.callback() }">
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
