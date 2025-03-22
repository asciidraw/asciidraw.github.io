import type { Action, ElementsData, VectorLike } from "@/types";
import { LucideRectangleEllipsis } from "lucide-vue-next";
import { createNewElementId, Vector } from "@/lib";


export function createProgressBarAction(): Action {
  let startPosition: VectorLike = { x: 0, y: 0 };

  return {
    displayName: "actions.progress-bar.display-name",
    icon: LucideRectangleEllipsis,
    onClickDown({ mouseEvent, canvasToCell }) {
      startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    },
    onClickMove({ mouseEvent, canvasToCell, drawContext }) {
      const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      const [start, end] = Vector.minMax(startPosition, currentPosition);
      drawContext.scratchElements.length = 0;
      drawContext.scratchElements.push(<ElementsData.ProgressBar>{
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
      project.elements.push(<ElementsData.ProgressBar>{
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
}
