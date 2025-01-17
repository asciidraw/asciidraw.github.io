import type {LucideIcon} from "lucide-vue-next";
import type {Extension} from "@/types/extensions.ts";
import type {Emitter} from "mitt";
import type { Project } from "@/types/project.ts";
import type { Component } from "vue";
import type { DrawContext } from "@/types/rendering.ts";


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

type ActionClickEventHandler = (_: { mouseEvent: MouseEvent, drawContext: DrawContext, project: Project }) => void

export interface Action {
  icon?: LucideIcon
  displayName: string
  onClickDown?: ActionClickEventHandler
  onClickMove?: ActionClickEventHandler
  onClickUp?: ActionClickEventHandler
}

export type AppEvents = {
  loadProject: string
  downloadProject: undefined
  initProject: Project
}
