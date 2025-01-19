import type { Component } from "vue";
import { Layer, type VectorLike } from "@/lib";
import type { ElementBase } from "@/types/project.ts";


export interface DrawContext {
  offset: VectorLike
  zoom: number
  readonly selectedElements: Set<string>
  readonly scratchElements: Array<ElementBase & object>
}


export interface ElementRenderer<D extends object = object> {
  EditComponent?: Component;
  getBoundingBox(element: D): BoundingBox
  render(element: D): Layer
}


export interface BoundingBox {
  top: number
  left: number
  bottom: number
  right: number
}
