import { Layer, LayerCache } from "@/lib";
import type { ElementBase, ElementRenderer } from "@/types";

export class LayerRenderer {
  private readonly rendererMap: Record<string, ElementRenderer>

  constructor(rendererMap: Record<string, ElementRenderer>) {
    this.rendererMap = rendererMap;
  }

  /**
   * renders `elements` with their associated {@link ElementRenderer} and merging all to one layer
   * @param elements elements to render
   * @param layerCache optional layer-cache for better performance
   * @returns `element` rendered and merged
   */
  render(elements: Array<ElementBase & object>, layerCache?: LayerCache): Layer {
    const finalLayer = new Layer();
    for (const element of elements) {
      const cached = layerCache?.get(element);
      if (cached) {
        finalLayer.merge(cached);
        continue;
      }
      const renderer = this.rendererMap[element.type];
      if (renderer === undefined) {
        console.error(`missing renderer ${element.type}`);
        continue;
      }
      const elementLayer = renderer.render(element);
      layerCache?.set(element, elementLayer);
      finalLayer.merge(elementLayer);
    }
    return finalLayer;
  }
}
