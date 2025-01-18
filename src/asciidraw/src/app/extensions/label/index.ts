import { defineElementRenderer, defineExtension, Layer, Vector, type VectorLike } from "@/lib";
import EditOptions from "./EditOptions.vue";
import { v4 as uuid } from "uuid";
import { LucideWholeWord } from "lucide-vue-next";


export interface LabelData {
  id: string
  type: "label"
  x: number
  y: number
  width: number
  height: number
  text: string
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
          id: uuid(),
          type: "label",
          x: start.x,
          y: start.y,
          width: end.x - start.x,
          height: end.y - start.y,
          text: "Lorem ipsum dolor sit amet.",
        });
      },
      onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
        drawContext.scratchElements.length = 0;
        const endPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
        const [start, end] = Vector.minMax(startPosition, endPosition);
        project.elements.push(<LabelData>{
          id: uuid(),
          type: "label",
          x: start.x,
          y: start.y,
          width: end.x - start.x,
          height: end.y - start.y,
          text: "Lorem ipsum dolor sit amet.",
        });
      }
    };
  },
  renderer: {
    label: defineElementRenderer<LabelData>({
      EditComponent: EditOptions,
      getBoundingBox(element) {
        return {
          left: element.x,
          top: element.y,
          right: element.x + element.width,
          bottom: element.y + element.height,
        }
      },
      render(element) {
        const layer = new Layer();

        let col: number = 0;
        let row: number = 0;

        const text = element.text;

        for (let i = 0; i < text.length; i++) {
          if (row > element.height) {
            break;
          }
          const char = text[i];
          if (char === '\n' || col > element.width) {
            col = 0;
            row++;
            if (char === '\n') continue;
          }
          layer.set(element.x + col, element.y + row, char);
          col++;
        }

        return layer;
      }
    })
  }
});
