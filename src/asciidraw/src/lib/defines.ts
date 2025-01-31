import type { ElementRenderer, Extension } from "@/types";


export function defineExtension(extension: Extension) {
  return extension;
}


export function defineElementRenderer<Data extends object>(renderer: ElementRenderer<Data>) {
  return renderer;
}
