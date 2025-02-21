<script setup lang="ts">
import { useDebouncedRefHistory, useMagicKeys, whenever } from "@vueuse/core";
import { inject, watch } from "vue";
import { INJECTION_KEY_APP, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { registerCommand } from "@/components/command-popup";
import { LucideRedo, LucideUndo } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import { not } from "@vueuse/math";

const app = inject(INJECTION_KEY_APP)!;
const project = inject(INJECTION_KEY_PROJECT)!;

const { t } = useI18n();
const { undo, redo, canUndo, canRedo } = useDebouncedRefHistory(project, { deep: true, debounce: 500, capacity: 1_000 });
const { ctrl_z, ctrl_shift_z, ctrl_y } = useMagicKeys();

whenever(ctrl_z, () => undo());
whenever(ctrl_shift_z, () => undo());
whenever(ctrl_y, () => redo());

app.value.events.on("undo", () => undo());
app.value.events.on("redo", () => redo());

watch(canUndo, (cUndo) => console.log({cUndo}), { immediate: true });
watch(canRedo, (cRedo) => console.log({cRedo}), { immediate: true });

registerCommand({
  group: "workspace",
  id: "undo",
  disabled: not(canUndo),
  icon: LucideUndo,
  label: () => t('commands.workspace.undo'),
  action: () => { undo() },
});
registerCommand({
  group: "workspace",
  id: "redo",
  disabled: not(canRedo),
  icon: LucideRedo,
  label: () => t('commands.workspace.redo'),
  action: () => { redo() },
});
</script>

<template>
</template>
