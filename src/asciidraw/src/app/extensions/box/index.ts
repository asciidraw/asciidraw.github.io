import { defineElementRenderer, defineExtension, doInRange, Layer, createNewElementId, Vector } from "@/lib";
import * as styles from "./styles.ts";
import EditOptions from "./EditOptions.vue";
import { LucideRectangleHorizontal } from "lucide-vue-next";
import type { VectorLike } from "@/types";


export interface BoxData {
  id: string
  type: "box"
  x: number
  y: number
  width: number
  height: number
  style: keyof typeof styles
}


export default defineExtension({
  setup(app) {
    let startPosition: VectorLike = { x: 0, y: 0 };

    app.actions["box"] = {
      displayName: "actions.box.display-name",
      icon: LucideRectangleHorizontal,
      onClickDown({ mouseEvent, canvasToCell }) {
        startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      },
      onClickMove({ mouseEvent, canvasToCell, drawContext }) {
        const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, currentPosition);
        drawContext.scratchElements.length = 0;
        drawContext.scratchElements.push(<BoxData>{
          id: createNewElementId(),
          type: "box",
          x: start.x,
          y: start.y,
          width: end.x - start.x + 1,
          height: end.y - start.y + 1,
          style: "basic",
        });
      },
      onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
        drawContext.scratchElements.length = 0;
        const endPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, endPosition);
        project.elements.push(<BoxData>{
          id: createNewElementId(),
          type: "box",
          x: start.x,
          y: start.y,
          width: end.x - start.x + 1,
          height: end.y - start.y + 1,
          style: "basic",
        });
      }
    };
  },
  renderer: {
    box: defineElementRenderer<BoxData>({
      EditComponent: EditOptions,
      getBoundingBox(element){
        return {
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
        }
      },
      render(element) {
        const style = styles[element.style];
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
    }),
  },
});
