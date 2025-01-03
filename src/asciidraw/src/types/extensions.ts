import type {AppContext, AppEvents} from "./app";
import type {Handler} from "mitt";
import type { Component } from "vue";

// type RemoveStringButKeepConstants<T> = T extends string ? (T extends `${infer _}` ? T : never) : never;
// type OnEvents = {
//   [K in RemoveStringButKeepConstants<keyof AppEvents> as `on${Capitalize<string & K>}`]?: Handler<AppEvents[K]>
// }

export interface Extension {
  setup?(app: AppContext): void
  on?: {
    [K in keyof AppEvents]?: Handler<AppEvents[K]>
  },
  components?: Component[],
}
