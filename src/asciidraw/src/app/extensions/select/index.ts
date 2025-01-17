import { defineExtension } from "@/lib";
import { LucideSquareDashedMousePointer } from "lucide-vue-next";

export default defineExtension({
  setup(app) {
    app.actions['select'] = {
      displayName: "actions.select.display-name",
      icon: LucideSquareDashedMousePointer,
    };
  }
});
