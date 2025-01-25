import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BoundingBox, ElementBase, ElementRenderer, Extension } from "@/types";
import type { VectorLike } from "@/lib/";
import { toRaw } from "vue";
import { v4 as uuid } from "uuid";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function compare_arrays<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, index) => arr2[index] === val);
}


export function doInRange(start: number, end: number, cb: (n: number, i: number) => void): void {
  const range = end - start;
  for (let i = 0; i < range; i++) {
    const val = i + start;
    cb(val, i);
  }
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

export function areAreasOverlapping(area1: BoundingBox, area2: BoundingBox): boolean {
  return (
    area1.left < area2.right &&
    area1.right > area2.left &&
    area1.top < area2.bottom &&
    area1.bottom > area2.top
  );
}


/**
 * clones an element and changing the id to prevent conflicts
 * @param element element to clone
 * @returns cloned `element`
 */
export function cloneElement<T extends ElementBase>(element: T): T {
  const cloned = structuredClone(toRaw(element));
  cloned.id = uuid();
  return cloned;
}
