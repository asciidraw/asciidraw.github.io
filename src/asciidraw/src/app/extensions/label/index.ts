import { createNewElementId, defineElementRenderer, defineExtension, Layer, Vector } from "@/lib";
import EditOptions from "./EditOptions.vue";
import { LucideWholeWord } from "lucide-vue-next";
import { splitTextToLines } from "@/app/extensions/label/util.ts";
import type { VectorLike } from "@/types";


type TextAlignmentVertical = "t" | "m" | "b";
type TextAlignmentHorizontal = "l" | "c" | "r";
type TextAlignment = `${TextAlignmentVertical}${TextAlignmentHorizontal}`;

export interface LabelData {
  id: string
  type: "label"
  x: number
  y: number
  width: number
  height: number
  text: string
  block: boolean
  alignment: TextAlignment
}


export function createLabelElement(text: string, pos?: VectorLike, width?: number, height?: number): LabelData {
  const lines = text.split("\n");
  const altWidth = lines.reduce((prev, curr) => Math.max(curr.length, prev), 0)-1;
  const altHeight = lines.length-1;
  return {
    id: createNewElementId(),
    type: "label",
    x: pos?.x ?? 0,
    y: pos?.y ?? 0,
    width: width ?? altWidth,
    height: height ?? altHeight,
    text: text,
    block: false,
    alignment: "tl",
  }
}


export default defineExtension({
  setup(app) {
    let startPosition: VectorLike = { x: 0, y: 0 };

    app.actions["label"] = {
      displayName: "actions.label.display-name",
      icon: LucideWholeWord,
      onClickDown({ mouseEvent, canvasToCell }) {
        startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      },
      onClickMove({ mouseEvent, canvasToCell, drawContext }) {
        const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, currentPosition);
        drawContext.scratchElements.length = 0;
        drawContext.scratchElements.push(<LabelData>{
          id: createNewElementId(),
          type: "label",
          x: start.x,
          y: start.y,
          width: end.x - start.x + 1,
          height: end.y - start.y + 1,
          text: "Lorem ipsum dolor sit amet.",
          block: false,
          alignment: "tl",
        });
      },
      onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
        drawContext.scratchElements.length = 0;
        const endPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
        const [start, end] = Vector.minMax(startPosition, endPosition);
        project.elements.push(<LabelData>{
          id: createNewElementId(),
          type: "label",
          x: start.x,
          y: start.y,
          width: end.x - start.x + 1,
          height: end.y - start.y + 1,
          text: "Lorem ipsum dolor sit amet.",
          block: false,
          alignment: "tl",
        });
      }
    };
  },
  renderer: {
    label: defineElementRenderer<LabelData>({
      EditComponent: EditOptions,
      getBoundingBox(element) {
        return {
          x: element.x,
          y: element.y,
          height: element.height,
          width: element.width,
        }
      },
      render(element: LabelData) {
        const layer = new Layer();

        const xOffset = element.x;
        const yOffset = element.y;
        const maxWidth = element.width;
        const maxHeight = element.height;

        const lines = splitTextToLines(element.text, maxWidth, element.block);

        if (element.alignment === undefined) element.alignment = "tl";
        const vAlign = element.alignment[0] as TextAlignmentVertical;
        const hAlign = element.alignment[1] as TextAlignmentHorizontal;

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
      }
    })
  }
});
