import type { ElementRenderer } from "@/types";
import { boxRenderer } from "./box.ts";
import { groupRenderer } from "./group.ts";
import { labelRenderer } from "./label.ts";
import { progressBarRenderer } from "./progressBar.ts";

export const rendererMap: Record<string, ElementRenderer> = {
  box: boxRenderer,
  group: groupRenderer,
  label: labelRenderer,
  progressBar: progressBarRenderer,
}
