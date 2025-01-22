import { defineExtension, Vector, type VectorLike } from "@/lib";
import { LucideSquareDashedMousePointer } from "lucide-vue-next";
import { getElementAtPos, getElementsInArea } from "@/app/extensions/select+move/util.ts";
import type { ActionClickEventHandler, BoundingBox } from "@/types";


interface SubHandler {
  onClickDown: ActionClickEventHandler,
  onClickMove: ActionClickEventHandler,
  onClickUp: ActionClickEventHandler,
}

function isMod(mouseEvent: MouseEvent): boolean {
  return mouseEvent.ctrlKey || mouseEvent.shiftKey;
}


function newSelectionAreaHandler(): SubHandler {
  let startPosition: VectorLike = { x: 0, y: 0 };
  let hasMoved = false;
  let onStartElements: Set<string> = new Set();

  return {
    onClickDown({ mouseEvent, canvasToCell, drawContext }) {
      startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      drawContext.selectedElements.forEach(v => onStartElements.add(v));
    },
    onClickMove({ mouseEvent, canvasToCell, drawContext, project, rendererMap }) {
      const currentPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
      hasMoved = hasMoved || !Vector.equals(startPosition, currentPosition);
      const [start, end] = Vector.minMax(startPosition, currentPosition);
      const selectionArea: BoundingBox = {left: start.x, top: start.y, right: end.x, bottom: end.y};
      const elements = getElementsInArea({area: selectionArea, elements: project.elements, rendererMap});
      drawContext.selectedElements.clear();
      if (isMod(mouseEvent))
        onStartElements.forEach(v => drawContext.selectedElements.add(v));
      for (const element of elements)
        drawContext.selectedElements.add(element.id);
    },
    onClickUp({ mouseEvent, canvasToCell, drawContext, project, rendererMap }) {
      const endPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});

      drawContext.selectedElements.clear();
      if (mouseEvent.ctrlKey || mouseEvent.shiftKey)
        onStartElements.forEach(v => drawContext.selectedElements.add(v));

      if (hasMoved) {
        const [start, end] = Vector.minMax(startPosition, endPosition);
        const selectionArea: BoundingBox = { left: start.x, top: start.y, right: end.x, bottom: end.y };
        const elements = getElementsInArea({ area: selectionArea, elements: project.elements, rendererMap });
        for (const element of elements) {
          drawContext.selectedElements.add(element.id);
        }
      } else {
        const element = getElementAtPos({ pos: endPosition, elements: project.elements, rendererMap });
        if (element) {
          if (drawContext.selectedElements.has(element.id))  // note: impossible to reach as of now. can be solved? by moving hasMoved to action and switch handler when moved
            drawContext.selectedElements.delete(element.id);
          else
            drawContext.selectedElements.add(element.id);
        }
      }
    },
  };
}

function newMoveSelectionHandler(): SubHandler {
  let startPosition: VectorLike = { x: 0, y: 0 };
  const startOffsets: Map<string, VectorLike> = new Map();

  return {
    onClickDown({ mouseEvent, canvasToCell, drawContext, project }) {
      startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
      for (const elementId of drawContext.selectedElements) {
        const element = project.elements.find(el => el.id === elementId)!;
        startOffsets.set(element.id, {
          x: element.x - startPosition.x,
          y: element.y - startPosition.y,
        });
      }
    },
    onClickMove({ mouseEvent, canvasToCell, drawContext, project }) {
      const currentPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
      for (const elementId of drawContext.selectedElements) {
        const element = project.elements.find(el => el.id === elementId)!;
        const startOffset = startOffsets.get(elementId)!;
        element.x = currentPosition.x + startOffset.x;
        element.y = currentPosition.y + startOffset.y;
      }
    },
    onClickUp(_) {
      this.onClickMove(_);
    },
  };
}


export default defineExtension({
  setup(app) {
    let handler: SubHandler;

    app.actions['select+move'] = {
      displayName: "actions.select+move.display-name",
      icon: LucideSquareDashedMousePointer,
      onClickDown(_) {
        const { mouseEvent, canvasToCell, drawContext, rendererMap, project } = _;
        const startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const elementAtPosition = getElementAtPos({ pos: startPosition, elements: project.elements, rendererMap });
        // problem
        if (!isMod(mouseEvent))
          drawContext.selectedElements.clear();
        if (elementAtPosition !== null) {
          drawContext.selectedElements.add(elementAtPosition.id);
        }
        handler = elementAtPosition !== null ? newMoveSelectionHandler() : newSelectionAreaHandler();
        handler.onClickDown(_);
      },
      onClickMove(_) {
        handler.onClickMove(_);
      },
      onClickUp(_) {
        handler.onClickUp(_);
      },
    };
  }
});
