import {
  type LucideIcon,
  LucideMove,
  LucideRectangleHorizontal,
  LucideWholeWord
} from "lucide-vue-next";
import {defineExtension} from "@/lib";


const testActions: Array<[string, LucideIcon]> = [
  ["move", LucideMove],
  ["label", LucideWholeWord],
  ["box", LucideRectangleHorizontal],
]


export default defineExtension({
  setup(app) {
    console.log("setup()");
    for (const [actionId, actionIcon] of testActions) {
      app.actions.push({
        id: actionId,
        icon: actionIcon,
        displayName: actionId,
        onClickDown: () => console.log(`Click Down (${actionId})`),
        onClickMove: () => console.log(`Click Move (${actionId})`),
        onClickUp: () => console.log(`Click Up (${actionId})`),
      });
    }
  }
});
