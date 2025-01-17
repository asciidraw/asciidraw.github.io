<script setup lang="ts">
import { useMagicKeys, useManualRefHistory, watchDebounced, whenever } from "@vueuse/core";
import { inject, watch } from "vue";
import { INJECTION_KEY_PROJECT } from "@/symbols.ts";

const project = inject(INJECTION_KEY_PROJECT)!;

const { history, commit, undo, redo } = useManualRefHistory(project, { clone: true, capacity: 1_000 });
const { ctrl_z, ctrl_y } = useMagicKeys();

whenever(ctrl_z, () => undo());
whenever(ctrl_y, () => redo());

watch(history, () => console.log({ history: history.value }));
watch(project, () => console.log({ project: project.value }));

// todo: sync/combine with saving in App.vue
watchDebounced(project, () => {
  console.log("Commit");
  commit();
}, { debounce: 500, maxWait: 1000, deep: true });
</script>

<template>
</template>
