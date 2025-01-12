import {
  type LucideIcon,
  LucideMove,
  LucideRectangleHorizontal, LucideSquareDashedMousePointer,
  LucideWholeWord
} from "lucide-vue-next";
import {defineExtension} from "@/lib";


const testActions: Array<[string, LucideIcon]> = [
  ["move", LucideMove],
  ["select", LucideSquareDashedMousePointer],
  ["label", LucideWholeWord],
  ["box", LucideRectangleHorizontal],
]


export default defineExtension({
  setup(app) {
    console.log("setup()");
    app.activeActionId = "move";
    for (const [actionId, actionIcon] of testActions) {
      app.actions[actionId] = {
        id: actionId,
        icon: actionIcon,
        displayName: actionId,
        onClickDown: () => console.log(`Click Down (${actionId})`),
        onClickMove: () => console.log(`Click Move (${actionId})`),
        onClickUp: () => console.log(`Click Up (${actionId})`),
      };
    }
  },
});
