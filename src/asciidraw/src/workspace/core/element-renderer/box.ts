import type { ElementRenderer, ElementsData } from "@/types";
import { doInRange, Layer } from "@/lib";
import { boxStyles } from "@/lib/styles";


export const boxRenderer: ElementRenderer<ElementsData.Box> = {
  getBoundingBox(element){
    return {
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
    }
  },
  render(element) {
    const style = boxStyles[element.style];
    const layer = new Layer();

    layer.set(element.x, element.y, style.topLeft);
    layer.set(element.x+element.width-1, element.y, style.topRight);
    layer.set(element.x, element.y+element.height-1, style.bottomLeft);
    layer.set(element.x+element.width-1, element.y+element.height-1, style.bottomRight);

    // horizontal lines
    doInRange(element.x + 1, element.x + element.width - 1, x => {
      layer.set(x, element.y, style.top);
      layer.set(x, element.y + element.height-1, style.bottom);
    });

    // vertical lines
    doInRange(element.y + 1, element.y + element.height - 1, y => {
      layer.set(element.x, y, style.left);
      layer.set(element.x + element.width-1, y, style.right);
    });

    return layer;
  }
};
