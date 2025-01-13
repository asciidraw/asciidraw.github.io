import { defineElementRenderer, defineExtension, doInRange, Layer } from "@/lib";
import { v4 as uuid } from "uuid";
import * as styles from "./styles.ts";
import EditOptions from "@/app/extensions/progress-bar/EditOptions.vue";


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
  on: {
    initProject(project) {
      project.elements.push(<ProgressBarData>{
        id: uuid(),
        type: "progressBar",
        x: 20,
        y: -15,
        width: 20,
        value: 40,
        style: "basic",
        showValue: true,
      });
      project.elements.push(<ProgressBarData>{
        id: uuid(),
        type: "progressBar",
        x: 20,
        y: -14,
        width: 20,
        value: 60,
        style: "block1",
        showValue: false,
      });
    }
  },
  renderer: {
    progressBar: defineElementRenderer<ProgressBarData>({
      EditComponent: EditOptions,
      getBoundingBox(element) {
        return {
          top: element.y,
          left: element.x,
          bottom: element.y + 1,
          right: element.x + element.width,
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
