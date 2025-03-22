import type { Action } from "@/types";
import { LucideHand } from "lucide-vue-next";

export function moveViewAction(): Action {
  const moveStartOffset = { x: 0, y: 0 };
  const moveStartPosition = { x: 0, y: 0 };

  return {
    displayName: "actions.move-view.display-name",
    icon: LucideHand,
    onClickDown({ mouseEvent, drawContext }) {
      moveStartOffset.x = drawContext.offset.x;
      moveStartOffset.y = drawContext.offset.y;
      moveStartPosition.x = mouseEvent.clientX;
      moveStartPosition.y = mouseEvent.clientY;
    },
    onClickMove({mouseEvent, drawContext}) {
      const diffX = (moveStartPosition.x - mouseEvent.clientX) / (drawContext.zoom / 10);
      const diffY = (moveStartPosition.y - mouseEvent.clientY) / (drawContext.zoom / 10);
      const offsetX = moveStartOffset.x + diffX;
      const offsetY = moveStartOffset.y + diffY;
      drawContext.offset.x = offsetX;
      drawContext.offset.y = offsetY;
    },
  };
}
