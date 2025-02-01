/// <reference types="vite/client" />

declare const __BUILD_TIME__: string
declare const __GIT_REPOSITORY_OWNER__: string
declare const __GIT_REPOSITORY_NAME__: string
declare const __GIT_BRANCH__: string
declare const __GIT_COMMIT_HASH__: string

type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

type JoinWith<T extends string, SEP extends string = ",", U extends string = T> = T extends any ? T | `${T}${Exclude<U, T> extends never ? "" : `${SEP}${JoinWith<Exclude<U, T>, SEP>}`}` : never;

type CssCursor = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "grab" | "grabbing" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" | "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" | "zoom-out";

declare module '*.md' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}
