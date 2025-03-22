import type { ElementRenderer, ElementsData } from "@/types";
import { Layer } from "@/lib";
import { splitTextToLines } from "./util.ts";


export const labelRenderer: ElementRenderer<ElementsData.Label> = {
  getBoundingBox(element) {
    return {
      x: element.x,
      y: element.y,
      height: element.height,
      width: element.width,
    }
  },
  render(element) {
    const layer = new Layer();

    const xOffset = element.x;
    const yOffset = element.y;
    const maxWidth = element.width;
    const maxHeight = element.height;

    const lines = splitTextToLines(element.text, maxWidth, element.block);

    element.alignment ??= "tl";
    const vAlign = element.alignment[0] as ElementsData.UtilTextAlignmentVertical;
    const hAlign = element.alignment[1] as ElementsData.UtilTextAlignmentHorizontal;

    let row: number;
    if (vAlign === "b") row = Math.max(0, maxHeight - lines.length);
    else if (vAlign === "m") row = Math.max(0, Math.floor(maxHeight / 2 - lines.length / 2));
    else row = 0;

    for (const line of lines) {
      let cOff: number;
      if (hAlign === "r") cOff = Math.max(0, maxWidth - line.length);
      else if (hAlign === "c") cOff = Math.max(0, Math.floor(maxWidth / 2 - line.length / 2));
      else cOff = 0;

      for (let c = 0; c < line.length; c++) {
        const character = line[c];
        layer.set(xOffset + cOff + c, yOffset + row, character);
      }

      row++;
      if (row >= maxHeight) break;
    }

    return layer;
  },
};
