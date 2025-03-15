<script setup lang="ts">
import { useDebouncedRefHistory, useMagicKeys, whenever } from "@vueuse/core";
import { inject, watch } from "vue";
import { INJECTION_KEY_APP, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { registerCommand } from "@/components/command-popup";
import { LucideRedo, LucideUndo } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { logicNot } from "@vueuse/math";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";

const app = inject(INJECTION_KEY_APP)!;
const project = inject(INJECTION_KEY_PROJECT)!;

const { t } = useI18n();
const { undo, redo, canUndo, canRedo } = useDebouncedRefHistory(project, { deep: true, debounce: 500, capacity: 1_000 });

defineShortcuts({
  ctrl_z: () => undo(),
  ctrl_shift_z: () => redo(),
  ctrl_y: () => redo(),
});

app.value.events.on("undo", () => undo());
app.value.events.on("redo", () => redo());

registerCommand({
  group: "workspace",
  id: "undo",
  disabled: logicNot(canUndo),
  icon: LucideUndo,
  label: () => t('commands.workspace.undo'),
  action: () => { undo() },
});
registerCommand({
  group: "workspace",
  id: "redo",
  disabled: logicNot(canRedo),
  icon: LucideRedo,
  label: () => t('commands.workspace.redo'),
  action: () => { redo() },
});
</script>

<template>
</template>
