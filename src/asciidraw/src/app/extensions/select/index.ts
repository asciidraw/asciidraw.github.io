import { defineExtension, isPointWithinBox } from "@/lib";
import { LucideSquareDashedMousePointer } from "lucide-vue-next";
import { markRaw } from "vue";

export default defineExtension({
  setup(app) {
    app.actions['select'] = {
      displayName: "actions.select.display-name",
      icon: LucideSquareDashedMousePointer,
      onClickUp({ mouseEvent, canvasToCell, drawContext, rendererMap, project, appContext: app }) {
        const point = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });

        drawContext.highlights.length = 0;  // clearing the array
        app.extraMenu = undefined;

        for (let i = project.elements.length - 1; i >= 0; i--) {
          const element = project.elements[i];
          const renderer = rendererMap[element.type];
          const box = renderer.getBoundingBox(element);
          if (isPointWithinBox(point, box)) {
            if (renderer.EditComponent) {
              app.extraMenu = {
                component: markRaw(renderer.EditComponent!),
                props: { data: element },
              }
              drawContext.highlights.push(renderer.getBoundingBox(element));
            }
            break;
          }
        }
      },
    };
  }
});
