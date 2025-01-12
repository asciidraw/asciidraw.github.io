import type {AppContext, AppEvents} from "./app";
import type {Handler} from "mitt";
import type { Component } from "vue";
import type { BoundingBox } from "./rendering.ts";
import { Layer } from "@/lib";

// type RemoveStringButKeepConstants<T> = T extends string ? (T extends `${infer _}` ? T : never) : never;
// type OnEvents = {
//   [K in RemoveStringButKeepConstants<keyof AppEvents> as `on${Capitalize<string & K>}`]?: Handler<AppEvents[K]>
// }


export interface ElementRenderer<D extends object = object> {
  EditComponent?: Component;
  getBoundingBox<EL extends D>(element: EL): BoundingBox
  render(element: D): Layer
}


export interface Extension {
  setup?(app: AppContext): void
  on?: {
    [K in keyof AppEvents]?: Handler<AppEvents[K]>
  }
  components?: Component[]
  renderer?: {
    [T in string]: ElementRenderer
  },
}
