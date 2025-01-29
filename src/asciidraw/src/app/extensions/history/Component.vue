<script setup lang="ts">
import { useDebouncedRefHistory, useMagicKeys, whenever } from "@vueuse/core";
import { inject } from "vue";
import { INJECTION_KEY_APP, INJECTION_KEY_PROJECT } from "@/symbols.ts";

const app = inject(INJECTION_KEY_APP)!;
const project = inject(INJECTION_KEY_PROJECT)!;

const { undo, redo } = useDebouncedRefHistory(project, { deep: true, debounce: 500, capacity: 1_000 });
const { ctrl_z, ctrl_shift_z, ctrl_y } = useMagicKeys();

whenever(ctrl_z, () => undo());
whenever(ctrl_shift_z, () => undo());
whenever(ctrl_y, () => redo());

app.value.events.on("undo", () => undo());
app.value.events.on("redo", () => redo());
</script>

<template>
</template>
