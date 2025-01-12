import type {LucideIcon} from "lucide-vue-next";
import type {VectorLike} from "@/lib";
import type {Extension} from "@/types/extensions.ts";
import type {Emitter} from "mitt";
import type { Project } from "@/types/project.ts";
import type { Component } from "vue";


export interface AppContext {
  readonly extensions: Extension[]
  readonly actions: Record<string, Action>
  activeActionId: string
  events: Emitter<AppEvents>
  canvas?: CanvasContext
  extraMenu?: {
    component: Component
    props: Record<string, unknown>
  }
}

export interface CanvasContext {
  canvasToGrid: (pos: VectorLike) => VectorLike
  gridToCanvas: (pos: VectorLike) => VectorLike
  drawText: (pos: VectorLike, text: string) => void
  highlight: (start: VectorLike, end: VectorLike, color?: string) => void
  canvasElement: HTMLCanvasElement
  renderContext: CanvasRenderingContext2D
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
  preRender: AppContext
  postRender: AppContext
  mounted: AppContext
  loadProject: string
  downloadProject: undefined
  initProject: Project
}
