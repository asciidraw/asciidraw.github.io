import type { Action, ElementsData, VectorLike } from "@/types";
import { LucideRectangleHorizontal } from "lucide-vue-next";
import { createNewElementId, Vector } from "@/lib";


export function createBoxAction(): Action {
  let startPosition: VectorLike = { x: 0, y: 0 };

  return {
    displayName: "actions.box.display-name",
    icon: LucideRectangleHorizontal,
    onClickDown({ mouseEvent, canvasToCell }) {
      startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    },
    onClickMove({ mouseEvent, canvasToCell, drawContext }) {
      const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      const [start, end] = Vector.minMax(startPosition, currentPosition);
      drawContext.scratchElements.length = 0;
      drawContext.scratchElements.push(<ElementsData.Box>{
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
      project.elements.push(<ElementsData.Box>{
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
}
