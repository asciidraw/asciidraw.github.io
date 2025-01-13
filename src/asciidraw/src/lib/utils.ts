import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BoundingBox, ElementRenderer, Extension } from "@/types";
import type { VectorLike } from "@/lib/vector.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function compare_arrays<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => arr2[index] === val);
}


export function doInRange(start: number, end: number, cb: (n: number, i: number) => void) {
  return Array.from(Array(end - start).keys()).forEach(i => cb(i + start, i));
}


export function defineExtension(extension: Extension) {
  return extension;
}


export function defineElementRenderer<Data extends object>(renderer: ElementRenderer<Data>) {
  return renderer;
}


export function isPointWithinBox(point: VectorLike, box: BoundingBox): boolean {
  return (
    box.left <= point.x && point.x <= box.right
    && box.top <= point.y && point.y <= box.bottom
  );
}
