/// <reference types="vite/client" />

declare const __BUILD_TIME__: string
declare const __GIT_REPOSITORY_OWNER__: string
declare const __GIT_REPOSITORY_NAME__: string
declare const __GIT_BRANCH__: string
declare const __GIT_COMMIT_HASH__: string

declare module '*.md' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}

type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}
