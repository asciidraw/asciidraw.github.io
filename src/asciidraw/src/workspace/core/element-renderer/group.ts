import type { ElementRenderer, ElementsData } from "@/types";
import { groupStyles } from "@/lib/styles";
import { doInRange, Layer } from "@/lib";


export const groupRenderer: ElementRenderer<ElementsData.Group> = {
  getBoundingBox(element){
    return {
      x: element.x,
      y: element.y,
      height: element.height,
      width: element.width,
    }
  },
  render(element) {
    const style = groupStyles[element.style];
    const layer = new Layer();

    layer.set(element.x, element.y, style.topLeft);
    layer.set(element.x+element.width-1, element.y, style.topRight);
    layer.set(element.x, element.y+element.height-1, style.bottomLeft);
    layer.set(element.x+element.width-1, element.y+element.height-1, style.bottomRight);

    doInRange(element.x + 1, element.x + element.width - 1, (x, i) => {
      layer.set(x, element.y, i < element.label.length ? element.label[i]! : style.top);
      layer.set(x, element.y+element.height-1, style.bottom);
    });

    doInRange(element.y + 1, element.y + element.height - 1, y => {
      layer.set(element.x, y, style.left);
      layer.set(element.x+element.width-1, y, style.right);
    });

    return layer;
  },
};
