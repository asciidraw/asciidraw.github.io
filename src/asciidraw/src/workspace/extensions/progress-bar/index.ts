import { createNewElementId, defineElementRenderer, defineExtension, doInRange, Layer, Vector, } from "@/lib";
import * as styles from "./styles.ts";
import EditOptions from "@/workspace/extensions/progress-bar/EditOptions.vue";
import { LucideRectangleEllipsis } from "lucide-vue-next";
import type { VectorLike } from "@/types";


export interface ProgressBarData {
  id: string
  type: "progressBar"
  x: number
  y: number
  width: number
  value: number
  style: keyof typeof styles
  showValue: boolean
}


export default defineExtension({
  setup(workspace) {
    let startPosition: VectorLike = { x: 0, y: 0 };

    workspace.actions["progress-bar"] = {
      displayName: "actions.progress-bar.display-name",
      icon: LucideRectangleEllipsis,
      onClickDown({ mouseEvent, canvasToCell }) {
        startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      },
      onClickMove({ mouseEvent, canvasToCell, drawContext }) {
        const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, currentPosition);
        drawContext.scratchElements.length = 0;
        drawContext.scratchElements.push(<ProgressBarData>{
          id: createNewElementId(),
          type: "progressBar",
          x: start.x,
          y: start.y,
          width: end.x - start.x + 1,
          style: "basic",
          value: 0.0,
          showValue: false,
        });
      },
      onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
        drawContext.scratchElements.length = 0;
        const endPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const [start, end] = Vector.minMax(startPosition, endPosition);
        project.elements.push(<ProgressBarData>{
          id: createNewElementId(),
          type: "progressBar",
          x: start.x,
          y: start.y,
          width: end.x - start.x + 1,
          style: "basic",
          value: 0.0,
          showValue: false,
        });
      }
    };
  },
  renderer: {
    progressBar: defineElementRenderer<ProgressBarData>({
      EditComponent: EditOptions,
      getBoundingBox(element) {
        return {
          x: element.x,
          y: element.y,
          height: 1,
          width: element.width,
        }
      },
      render(element) {
        const style = styles[element.style];
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
            layer.set(start+i, element.y, valStr[i]);
          }
        }

        return layer;
      }
    }),
  }
});
