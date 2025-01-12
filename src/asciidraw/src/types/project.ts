import type { VectorLike } from "@/lib";

interface ElementBase {
  id: string
  type: string
}

export interface Project {
  id: string
  elements: Array<ElementBase & object>
  drawContext: DrawContext
}

export interface DrawContext {
  offset: VectorLike
  zoom: number
}
