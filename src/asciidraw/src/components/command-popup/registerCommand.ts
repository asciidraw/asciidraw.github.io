import { inject, type MaybeRefOrGetter, onWatcherCleanup, toValue, watch } from "vue";
import type { CommandCommandId, CommandDetails, CommandGroupId } from "./types.ts";
import { INJECTION_KEY_COMMAND_POPUP } from "./common.ts";

export type RegisterCommandOptions = Omit<CommandDetails, "callback"> & {
  group: CommandGroupId
  id: CommandCommandId
  action: () => boolean | void
}

/**
 * registers a certain action for the command-popup
 * @param options
 */
export function registerCommand(options: MaybeRefOrGetter<RegisterCommandOptions>) {
  const commandContext = inject(INJECTION_KEY_COMMAND_POPUP);
  if (commandContext === undefined) return;
  const { open, commands } = commandContext;

  watch(() => toValue(options), ({ group, id, action, ...detail }) => {
    if (!(group in commands.value))
      commands.value[group] = {};
    commands.value[group]![id] = {
      ...detail,
      callback: () => {
        const shouldClose = action();
        if (shouldClose !== false)
          open.value = false;
      },
    };
    onWatcherCleanup(() => {
      delete commands.value[group]?.[id];
    })
  }, { immediate: true, deep: true });
}
