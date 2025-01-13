import { defineElementRenderer, defineExtension, doInRange, Layer } from "@/lib";
import * as styles from "./styles.ts";
import EditOptions from "./EditOptions.vue";
import { v4 as uuid } from "uuid";


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
