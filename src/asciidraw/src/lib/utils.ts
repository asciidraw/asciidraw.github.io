import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ElementRenderer, Extension } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function compare_arrays<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => arr2[index] === val);
}


export function defineExtension(extension: Extension) {
  return extension;
}


export function defineElementRenderer<Data extends object>(renderer: ElementRenderer<Data>) {
  return renderer;
}
