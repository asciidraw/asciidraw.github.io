import type {LucideIcon} from "lucide-vue-next";
import type {Extension} from "@/types/extensions.ts";
import type {Emitter} from "mitt";
import type { Project } from "@/types/project.ts";
import type { DrawContext, ElementRenderer } from "@/types/rendering.ts";
import type { VectorLike } from "@/lib";


export interface AppContext {
  /** list of extensions that got loaded */
  readonly extensions: Extension[]
  /** record of actions that the user can do */
  readonly actions: Record<string, Action>
  /** currently active action */
  activeActionId: string
  /** event-system */
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
  /** icon of the action */
  icon: LucideIcon
  /** translation-key to get the display-name of the action */
  displayName: string
  onClickDown?: ActionClickEventHandler
  onClickMove?: ActionClickEventHandler
  onClickUp?: ActionClickEventHandler
}

export type AppEvents = {
  undo: undefined
  redo: undefined
}
