import { defineElementRenderer, defineExtension, Layer } from "@/lib";
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
    app.actions["label"] = {
      displayName: "actions.label.display-name",
      icon: LucideWholeWord,
    };
  },
  on: {
    initProject(project) {
      project.elements.push(<LabelData>{
        id: uuid(),
        type: "label",
        x: -8,
        y: -2,
        width: 20,
        height: 1,
        text: "Hello World\nHello AsciiDraw",
      });
    }
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
          const char = text[i];
          if (char === '\n') {
            col = 0;
            row++;
            continue;
          }
          layer.set(element.x + col, element.y + row, char);
          col++;
        }

        return layer;
      }
    })
  }
});
