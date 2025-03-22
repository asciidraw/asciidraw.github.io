import type { Component } from "vue";
import EditBox from "./EditBox.vue";
import EditGroup from "./EditGroup.vue";
import EditLabel from "./EditLabel.vue";
import EditProgressBar from "./EditProgressBar.vue";

export const elementEditorMap: Record<string, Component> = {
  box: EditBox,
  group: EditGroup,
  label: EditLabel,
  progressBar: EditProgressBar,
};
