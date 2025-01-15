import type {LucideIcon} from "lucide-vue-next";
import type {Extension} from "@/types/extensions.ts";
import type {Emitter} from "mitt";
import type { Project } from "@/types/project.ts";
import type { Component } from "vue";


export interface AppContext {
  readonly extensions: Extension[]
  readonly actions: Record<string, Action>
  activeActionId: string
  events: Emitter<AppEvents>
  extraMenu?: {
    component: Component
    props: Record<string, unknown>
  }
}

export interface Action {
  id: string
  icon?: LucideIcon
  displayName: string
  onClickDown?: (mouseEvent: MouseEvent) => void
  onClickMove?: (mouseEvent: MouseEvent) => void
  onClickUp?: (mouseEvent: MouseEvent) => void
}

export type AppEvents = {
  loadProject: string
  downloadProject: undefined
  initProject: Project
}
