import { areAreasOverlapping, isPointWithinBox } from "@/lib";
import type { BoundingBox, ElementBase, ElementRenderer, VectorLike } from "@/types";


interface GetElementAtPositionParams {
  pos: VectorLike
  elements: Array<ElementBase & object>
  rendererMap: Record<string, ElementRenderer>
}

export function getElementAtPos({ pos, elements, rendererMap }: GetElementAtPositionParams): (ElementBase & object) | null {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    const renderer = rendererMap[element.type];
    const box = renderer.getBoundingBox(element);
    if (isPointWithinBox(pos, box)) {
      return element;
    }
  }
  return null;
}


interface GetElementInAreaParams {
  area: BoundingBox
  elements: Array<ElementBase & object>
  rendererMap: Record<string, ElementRenderer>
}

export function getElementsInArea({ area, elements, rendererMap }: GetElementInAreaParams): (ElementBase & object)[] {
  return elements.filter(el => areAreasOverlapping(area, rendererMap[el.type].getBoundingBox(el)));
}
