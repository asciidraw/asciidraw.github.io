/// <reference types="vite/client" />


declare module '*.md' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}

type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}
