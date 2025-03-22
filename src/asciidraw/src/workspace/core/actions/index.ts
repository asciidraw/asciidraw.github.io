import type { Action } from "@/types";
import { createBoxAction } from "@/workspace/core/actions/create-box.ts";
import { createGroupAction } from "@/workspace/core/actions/create-group.ts";
import { createLabelAction } from "@/workspace/core/actions/create-label.ts";
import { createProgressBarAction } from "@/workspace/core/actions/create-progress-bar.ts";
import { moveViewAction } from "@/workspace/core/actions/move-view.ts";
import { selectAndMoveAction } from "@/workspace/core/actions/select+move.ts";


export const actionsMap: Record<string, Action> = {
  createBox: createBoxAction(),
  createGroup: createGroupAction(),
  createLabel: createLabelAction(),
  createProgressBar: createProgressBarAction(),
  moveView: moveViewAction(),
  selectAndMove: selectAndMoveAction(),
};

export const DEFAULT_ACTION = "selectAndMove";
