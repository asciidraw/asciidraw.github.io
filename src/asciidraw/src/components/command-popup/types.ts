import type { LucideIcon } from "lucide-vue-next";
import type { MaybeRefOrGetter, Ref, VNode } from "vue";

export type CommandGroupId = string
export type CommandCommandId = string
export type CommandDetails = {
  icon?: LucideIcon | VNode
  label: MaybeRefOrGetter<string>
  disabled?: MaybeRefOrGetter<boolean>
  callback: () => void
  shortcut?: MaybeRefOrGetter<string>
}
export type CommandMap = { [K in CommandGroupId]?: Record<CommandCommandId, CommandDetails> }

export interface CommandPopupContext {
  open: Ref<boolean>
  commands: Ref<CommandMap>
}
