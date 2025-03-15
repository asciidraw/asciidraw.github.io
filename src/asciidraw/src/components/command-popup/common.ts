import type { CommandGroupId, CommandPopupContext } from "@/components/command-popup/types.ts";
import {
  LucideAppWindow,
  LucideBrush,
  type LucideIcon,
  LucideLanguages,
  LucideMap,
  LucideRectangleEllipsis
} from "lucide-vue-next";
import type { InjectionKey } from "vue";

export const INJECTION_KEY_COMMAND_POPUP: InjectionKey<CommandPopupContext> = Symbol("command-popup");

/**
 * associates a Lucide-icon to a command-group
 */
export const common: Record<CommandGroupId, LucideIcon> = {
  navigation: LucideMap,
  locales: LucideLanguages,
  other: LucideRectangleEllipsis,
  workspace: LucideAppWindow,
  canvas: LucideBrush,
};

/**
 * manually set priorities for a command-group.
 * a higher value correlates to a higher priority. <br>
 * the fallback-value should be 0. but this has to be <b>handled manually</b>
 */
export const groupPriorityMap: Record<CommandGroupId, number> = {
  locales: -1,
  workspace: 1,
  canvas: 1,
};
