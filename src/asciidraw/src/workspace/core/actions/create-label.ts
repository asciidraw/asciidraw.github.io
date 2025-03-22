import type { Action, ElementsData, VectorLike } from "@/types";
import { LucideWholeWord } from "lucide-vue-next";
import { createNewElementId, Vector } from "@/lib";


export function createLabelAction(): Action {
  let startPosition: VectorLike = { x: 0, y: 0 };

  return {
    displayName: "actions.label.display-name",
    icon: LucideWholeWord,
    onClickDown({ mouseEvent, canvasToCell }) {
      startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    },
    onClickMove({ mouseEvent, canvasToCell, drawContext }) {
      const currentPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      const [start, end] = Vector.minMax(startPosition, currentPosition);
      drawContext.scratchElements.length = 0;
      drawContext.scratchElements.push(<ElementsData.Label>{
        id: createNewElementId(),
        type: "label",
        x: start.x,
        y: start.y,
        width: end.x - start.x + 1,
        height: end.y - start.y + 1,
        text: "Lorem ipsum dolor sit amet.",
        block: false,
        alignment: "tl",
      });
    },
    onClickUp({ mouseEvent, canvasToCell, drawContext, project }) {
      drawContext.scratchElements.length = 0;
      const endPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
      const [start, end] = Vector.minMax(startPosition, endPosition);
      project.elements.push(<ElementsData.Label>{
        id: createNewElementId(),
        type: "label",
        x: start.x,
        y: start.y,
        width: end.x - start.x + 1,
        height: end.y - start.y + 1,
        text: "Lorem ipsum dolor sit amet.",
        block: false,
        alignment: "tl",
      });
    }
  };
}
