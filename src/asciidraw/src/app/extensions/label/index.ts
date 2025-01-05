import { defineElementRenderer, defineExtension, Layer } from "@/lib";


interface LabelData {
  type: "label"
  x: number
  y: number
  width: number
  height: number
  text: string
}


export default defineExtension({
  on: {
    initProject(project) {
      project.elements.push(<LabelData>{
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
