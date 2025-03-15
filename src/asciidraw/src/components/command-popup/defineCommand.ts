import { inject, onMounted, onUnmounted } from "vue";
import type { CommandCommandId, CommandDetails, CommandGroupId } from "./types.ts";
import { INJECTION_KEY_COMMAND_POPUP } from "./common.ts";

export type DefineCommandOptions = Omit<CommandDetails, "callback"> & {
  group: CommandGroupId
  id: CommandCommandId
  action: () => boolean | void
}

/**
 * registers a certain action for the command-popup
 * @param options
 */
export function defineCommand(options: DefineCommandOptions) {
  const commandContext = inject(INJECTION_KEY_COMMAND_POPUP);
  if (commandContext === undefined) return;
  const { open, commands } = commandContext;

  const { group, id, action, ...detail } = options;

  onMounted(() => {
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
  });
  onUnmounted(() => {
    delete commands.value[group]?.[id];
  });
}
