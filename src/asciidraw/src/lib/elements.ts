import type { ElementBase } from "@/types";
import { toRaw } from "vue";
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";


/**
 * clones an element and changing the id to prevent conflicts
 * @param element element to clone
 * @returns cloned `element`
 */
export function cloneElement<T extends ElementBase>(element: T): T {
  const cloned = structuredClone(toRaw(element));
  cloned.id = createNewElementId();
  return cloned;
}


/**
 * creates a new project id
 */
export function createNewProjectId(): string {
  return uuid();  // uuid is more human-readable
}


/**
 * creates a new element id
 */
export function createNewElementId(): string {
  return nanoid();  // nanoid is shorter than uuid (21 vs 36 characters)
}
