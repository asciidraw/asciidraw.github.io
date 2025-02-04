import { createNewElementId, defineElementRenderer, defineExtension, Layer, Vector } from "@/lib";
import EditOptions from "./EditOptions.vue";
import { LucideWholeWord } from "lucide-vue-next";
import { splitTextToLines } from "@/app/extensions/label/util.ts";
import type { VectorLike } from "@/types";


export interface LabelData {
  id: string
  type: "label"
  x: number
  y: number
  width: number
  height: number
  text: string
  block: boolean
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
      render(element) {
        const layer = new Layer();

        const xOffset = element.x;
        const yOffset = element.y;
        const maxWidth = element.width;
        const maxHeight = element.height;

        const lines = splitTextToLines(element.text, maxWidth, element.block);

        let row: number = 0;
        for (const line of lines) {

          for (let c = 0; c < line.length; c++) {
            const character = line[c];
            layer.set(xOffset + c, yOffset + row, character);
          }

          row++;
          if (row >= maxHeight) break;
        }

        return layer;
      }
    })
  }
});
