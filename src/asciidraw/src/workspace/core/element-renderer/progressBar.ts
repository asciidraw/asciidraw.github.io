import type { ElementRenderer, ElementsData } from "@/types";
import { progressBarStyles } from "@/lib/styles";
import { doInRange, Layer } from "@/lib";


export const progressBarRenderer: ElementRenderer<ElementsData.ProgressBar> = {
  getBoundingBox(element) {
    return {
      x: element.x,
      y: element.y,
      height: 1,
      width: element.width,
    }
  },
  render(element) {
    const style = progressBarStyles[element.style];
    const layer = new Layer();

    const value = Math.max(0, Math.min(element.value, 100));

    const barWidth = element.width - 2 - (element.showValue ? 4 : 0);

    layer.set(element.x, element.y, style.leftWall);
    layer.set(element.x+barWidth+1, element.y, style.rightWall);

    const nFullBlocks = Math.round(barWidth * (value / 100));
    doInRange(element.x+1, element.x + barWidth + 1, (x, i) => {
      layer.set(x, element.y, i < nFullBlocks ? style.fullBar : style.emptyBar);
    });

    if (element.showValue) {
      const valStr = (value.toFixed(0) + "%").padStart(4, " ");
      const start = element.x + element.width - 4;
      for (let i = 0; i < valStr.length; i++) {
        layer.set(start+i, element.y, valStr[i]!);
      }
    }

    return layer;
  },
};
