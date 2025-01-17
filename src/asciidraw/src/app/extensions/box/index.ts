import { defineElementRenderer, defineExtension, doInRange, Layer, Vector, type VectorLike } from "@/lib";
import * as styles from "./styles.ts";
import EditOptions from "./EditOptions.vue";
import { v4 as uuid } from "uuid";
import { LucideRectangleHorizontal } from "lucide-vue-next";


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
          id: uuid(),
          type: "box",
          x: start.x,
          y: start.y,
          width: end.x - start.x,
          height: end.y - start.y,
          style: "basic",
        });
      },
      onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
        drawContext.scratchElements.length = 0;
        const endPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, endPosition);
        project.elements.push(<BoxData>{
          id: uuid(),
          type: "box",
          x: start.x,
          y: start.y,
          width: end.x - start.x,
          height: end.y - start.y,
          style: "basic",
        });
      }
    };
  },
  on: {
    initProject(project) {
      project.elements.push(<BoxData>{
        id: uuid(),
        type: "box",
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        style: "basic",
      });
      project.elements.push(<BoxData>{
        id: uuid(),
        type: "box",
        x: 7,
        y: 5,
        width: 20,
        height: 10,
        style: "light",
      });
      project.elements.push(<BoxData>{
        id: uuid(),
        type: "box",
        x: 3,
        y: -5,
        width: 13,
        height: 13,
        style: "double",
      });
    }
  },
  renderer: {
    box: defineElementRenderer<BoxData>({
      EditComponent: EditOptions,
      getBoundingBox(element){
        return {
          top: element.y,
          left: element.x,
          bottom: element.y + element.height,
          right: element.x + element.width,
        }
      },
      render(element) {
        const style = styles[element.style];
        const layer = new Layer();

        layer.set(element.x, element.y, style.topLeft);
        layer.set(element.x+element.width, element.y, style.topRight);
        layer.set(element.x, element.y+element.height, style.bottomLeft);
        layer.set(element.x+element.width, element.y+element.height, style.bottomRight);

        doInRange(element.x + 1, element.x + element.width, x => {
          layer.set(x, element.y, style.top);
          layer.set(x, element.y+element.height, style.bottom);
        });

        doInRange(element.y + 1, element.y + element.height, y => {
          layer.set(element.x, y, style.left);
          layer.set(element.x+element.width, y, style.right);
        });

        return layer;
      }
    }),
  },
});
