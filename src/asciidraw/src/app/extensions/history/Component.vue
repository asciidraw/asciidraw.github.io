<script setup lang="ts">
import { useDebouncedRefHistory, useMagicKeys, whenever } from "@vueuse/core";
import { inject } from "vue";
import { INJECTION_KEY_APP, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { defineShortcuts } from "@/composables/defineShortcuts.ts";

const app = inject(INJECTION_KEY_APP)!;
const project = inject(INJECTION_KEY_PROJECT)!;

const { undo, redo } = useDebouncedRefHistory(project, { deep: true, debounce: 500, capacity: 1_000 });

defineShortcuts({
  ctrl_z: () => undo(),
  ctrl_shift_z: () => redo(),
  ctrl_y: () => redo(),
});

app.value.events.on("undo", () => undo());
app.value.events.on("redo", () => redo());
</script>

<template>
</template>
