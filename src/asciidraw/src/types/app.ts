import type {LucideIcon} from "lucide-vue-next";
import type {Extension} from "@/types/extensions.ts";
import type {Emitter} from "mitt";
import type { Project } from "@/types/project.ts";
import type { DrawContext, ElementRenderer } from "@/types/rendering.ts";
import type { VectorLike } from "@/lib";


export interface AppContext {
  readonly extensions: Extension[]
  readonly actions: Record<string, Action>
  activeActionId: string
  events: Emitter<AppEvents>
}

export type ActionClickEventHandler = (_: {
  mouseEvent: MouseEvent,
  drawContext: DrawContext,
  project: Project,
  appContext: AppContext,
  rendererMap: Record<string, ElementRenderer>
  canvasToCell: (screen: VectorLike) => VectorLike,
}) => void

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
  undo: undefined
  redo: undefined
}
