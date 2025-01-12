import type { Component } from "vue";
import { Layer } from "@/lib";


export interface ElementRenderer<D extends object = object> {
  EditComponent?: Component;
  getBoundingBox<EL extends D>(element: EL): BoundingBox
  render(element: D): Layer
}


export interface BoundingBox {
  top: number
  left: number
  bottom: number
  right: number
}
