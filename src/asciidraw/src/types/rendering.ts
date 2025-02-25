import type { Component } from "vue";
import { Layer } from "@/lib";
import type { ElementBase } from "@/types/project.ts";


/**
 * @see Vector
 */
export interface VectorLike {
  x: number
  y: number
}

export interface SizeLike {
  width: number
  height: number
}

export interface DrawContext {
  /** draw-offset of the canvas */
  offset: VectorLike
  /** specifies the scale of elements when drawn to the canvas */
  zoom: number
  /** width of (optional) auxiliary lines */
  auxiliaryLines?: number
  /** ids of elements that are selected */
  readonly selectedElements: Set<string>
  /** scratch-elements that should be drawn but not stored in the {@link Project} */
  readonly scratchElements: Array<ElementBase & object>
  userHighlight: BoundingBox | null
}


export interface ElementRenderer<D extends object = object> {
  /** component used to edit data of an element */
  EditComponent?: Component;
  /** calculate the bounding-box of an element */
  getBoundingBox(element: D): BoundingBox
  /** render an element to a layer */
  render(element: D): Layer
}


export type BoundingBox = VectorLike & SizeLike
