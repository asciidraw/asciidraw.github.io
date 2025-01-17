import { Layer } from "@/lib";
import type { ElementBase, ElementRenderer } from "@/types";

export class LayerRenderer {
  private readonly rendererMap: Record<string, ElementRenderer>

  constructor(rendererMap: Record<string, ElementRenderer>) {
    this.rendererMap = rendererMap;
  }

  render(elements: Array<ElementBase & object>): Layer {
    const finalLayer = new Layer();
    for (const element of elements) {
      const renderer = this.rendererMap[element.type];
      if (renderer === undefined) {
        console.error(`missing renderer ${element.type}`);
        continue;
      }
      const elementLayer = renderer.render(element);
      finalLayer.merge(elementLayer);
    }
    return finalLayer;
  }
}
