import type { WorkspaceContext, WorkspaceEvents } from "./workspace";
import type { Handler } from "mitt";
import type { Component } from "vue";
import type { ElementRenderer } from "./rendering.ts";

// type RemoveStringButKeepConstants<T> = T extends string ? (T extends `${infer _}` ? T : never) : never;
// type OnEvents = {
//   [K in RemoveStringButKeepConstants<keyof AppEvents> as `on${Capitalize<string & K>}`]?: Handler<AppEvents[K]>
// }


export interface Extension {
  /** setup function to initialize the {@link WorkspaceContext} */
  setup?(workspace: WorkspaceContext): void
  /** event handlers that are registered automatically */
  on?: {
    [K in keyof WorkspaceEvents]?: Handler<WorkspaceEvents[K]>
  }
  /** list of components to mount to extend the ui */
  components?: Component[]
  /** element renderer to register */
  renderer?: {
    [T in string]: ElementRenderer
  },
}
