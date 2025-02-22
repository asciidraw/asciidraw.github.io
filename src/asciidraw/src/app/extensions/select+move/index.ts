import { defineExtension, Vector } from "@/lib";
import { LucideSquareDashedMousePointer } from "lucide-vue-next";
import { getElementAtPos, getElementsInArea } from "@/app/extensions/select+move/util.ts";
import type { ActionClickEventHandler, BoundingBox, VectorLike } from "@/types";


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
      hasMoved = false;
      onStartElements.clear();
      drawContext.selectedElements.forEach(v => onStartElements.add(v));
    },
    onClickMove({ mouseEvent, canvasToCell, drawContext, project, rendererMap }) {
      const currentPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
      hasMoved = hasMoved || !Vector.equals(startPosition, currentPosition);
      if (!hasMoved) return;
      const [start, end] = Vector.minMax(startPosition, currentPosition);
      const selectionArea: BoundingBox = { x: start.x, y: start.y, width: end.x - start.x + 1, height: end.y - start.y + 1 };  // todo: verify size
      const elements = getElementsInArea({ area: selectionArea, elements: project.elements, rendererMap });
      drawContext.selectedElements.clear();
      if (isMod(mouseEvent))
        onStartElements.forEach(v => drawContext.selectedElements.add(v));
      for (const element of elements)
        drawContext.selectedElements.add(element.id);
      drawContext.highlights.length = 0;
      drawContext.highlights.push(selectionArea);
    },
    onClickUp({ mouseEvent, canvasToCell, drawContext, project, rendererMap }) {
      const endPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });

      drawContext.highlights.length = 0;

      drawContext.selectedElements.clear();
      if (isMod(mouseEvent))
        onStartElements.forEach(v => drawContext.selectedElements.add(v));

      if (hasMoved) {
        const [start, end] = Vector.minMax(startPosition, endPosition);
        const selectionArea: BoundingBox = { x: start.x, y: start.y, width: end.x - start.x + 1, height: end.y - start.y + 1 };  // todo: verify size
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
      startOffsets.clear();
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
    let useMoveHandler = false;
    let hasSelectedStartElement = false;
    let startPosition: VectorLike = { x: 0, y: 0 };
    let moveSelectionHandler: SubHandler = newMoveSelectionHandler();
    let selectionAreaHandler: SubHandler = newSelectionAreaHandler();

    app.activeActionId = "select+move";
    app.actions['select+move'] = {
      displayName: "actions.select+move.display-name",
      icon: LucideSquareDashedMousePointer,
      onClickDown(_) {
        const { mouseEvent, canvasToCell, drawContext, rendererMap, project } = _;
        startPosition = canvasToCell({ x: mouseEvent.clientX, y: mouseEvent.clientY });
        const element = getElementAtPos({ pos: startPosition, elements: project.elements, rendererMap });
        hasSelectedStartElement = element !== null && drawContext.selectedElements.has(element.id);
        useMoveHandler = false;
        moveSelectionHandler.onClickDown(_);
        selectionAreaHandler.onClickDown(_);
      },
      onClickMove(_) {
        const { mouseEvent, canvasToCell } = _;
        const currentPosition = canvasToCell({x: mouseEvent.clientX, y: mouseEvent.clientY});
        useMoveHandler = useMoveHandler || (hasSelectedStartElement && !Vector.equals(startPosition, currentPosition));
        if (useMoveHandler)
          moveSelectionHandler.onClickMove(_);
        else
          selectionAreaHandler.onClickMove(_);
      },
      onClickUp(_) {
        if (useMoveHandler)
          moveSelectionHandler.onClickUp(_);
        else
          selectionAreaHandler.onClickUp(_);
      },
    };
  }
});
