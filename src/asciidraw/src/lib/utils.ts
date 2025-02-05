import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { BoundingBox, VectorLike } from "@/types";


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

export function isPointWithinBox(point: VectorLike, box: BoundingBox): boolean {
  return (
    box.x <= point.x && point.x < (box.x + box.width)
    && box.y <= point.y && point.y < (box.y + box.height)
  );
}

export function areAreasOverlapping(area1: BoundingBox, area2: BoundingBox): boolean {
  return (
    area1.x < (area2.x + area2.width) &&
    (area1.x + area1.width) > area2.x &&
    area1.y < (area2.y + area2.height) &&
    (area1.y + area1.height) > area2.y
  );
}
