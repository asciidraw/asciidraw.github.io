import { defineExtension, isPointWithinBox } from "@/lib";
import { LucideSquareDashedMousePointer } from "lucide-vue-next";

export default defineExtension({
  setup(app) {
    app.actions['select'] = {
      displayName: "actions.select.display-name",
      icon: LucideSquareDashedMousePointer,
      onClickUp({ mouseEvent, canvasToCell, drawContext, rendererMap, project }) {
        const point = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });

        if (!(mouseEvent.ctrlKey || mouseEvent.shiftKey))
          drawContext.selectedElements.clear();

        for (let i = project.elements.length - 1; i >= 0; i--) {
          const element = project.elements[i];
          const renderer = rendererMap[element.type];
          const box = renderer.getBoundingBox(element);
          if (isPointWithinBox(point, box)) {
            if (drawContext.selectedElements.has(element.id))
              drawContext.selectedElements.delete(element.id);
            else
              drawContext.selectedElements.add(element.id);
            break;
          }
        }
      },
    };
  }
});
