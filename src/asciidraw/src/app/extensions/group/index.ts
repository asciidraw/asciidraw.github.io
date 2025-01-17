import { defineElementRenderer, defineExtension, doInRange, Layer, Vector, type VectorLike } from "@/lib";
import * as styles from "./styles.ts";
import EditOptions from "./EditOptions.vue";
import { v4 as uuid } from "uuid";
import { LucideGroup } from "lucide-vue-next";


export interface GroupData {
  id: string
  type: "group"
  x: number
  y: number
  width: number
  height: number
  style: keyof typeof styles
  label: string
}


export default defineExtension({
  setup(app) {
    let startPosition: VectorLike = { x: 0, y: 0 };

    app.actions["group"] = {
      displayName: "actions.group.display-name",
      icon: LucideGroup,
      onClickDown({ mouseEvent, canvasToCell }) {
        startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      },
      onClickMove({ mouseEvent, canvasToCell, drawContext }) {
        const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, currentPosition);
        drawContext.scratchElements.length = 0;
        drawContext.scratchElements.push(<GroupData>{
          id: uuid(),
          type: "group",
          x: start.x,
          y: start.y,
          width: end.x - start.x,
          height: end.y - start.y,
          style: "basic",
          label: "Group",
        });
      },
      onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
        drawContext.scratchElements.length = 0;
        const endPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, endPosition);
        project.elements.push(<GroupData>{
          id: uuid(),
          type: "group",
          x: start.x,
          y: start.y,
          width: end.x - start.x,
          height: end.y - start.y,
          style: "basic",
          label: "Group",
        });
      }
    };
  },
  renderer: {
    group: defineElementRenderer<GroupData>({
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

        doInRange(element.x + 1, element.x + element.width, (x, i) => {
          layer.set(x, element.y, i < element.label.length ? element.label[i] : style.top);
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
