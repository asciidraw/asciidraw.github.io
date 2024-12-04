import type { VectorLike } from "@/lib";

export interface Project {
  id: string
  drawContext: DrawContext
}

export interface DrawContext {
  offset: VectorLike
  zoom: number
}
