import type { VectorLike } from "@/lib";

export interface Project {
  id: string
  elements: ({type: string} & object)[]
  drawContext: DrawContext
}

export interface DrawContext {
  offset: VectorLike
  zoom: number
}
