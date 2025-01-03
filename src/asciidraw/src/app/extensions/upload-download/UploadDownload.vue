<script setup lang="ts">
import { inject } from "vue";
import { INJECTION_KEY_APP, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { loadProjectData, startTextDownload, storeProjectData } from "@/lib";

const appContext = inject(INJECTION_KEY_APP)!;
const project = inject(INJECTION_KEY_PROJECT)!;

appContext.value.events.on("loadProject", (content) => {
  project.value = loadProjectData(content);
});

appContext.value.events.on("downloadProject", () => {
  const content = storeProjectData(project.value);
  const filename = `${new Date(Date.now()).toISOString()}.json`;
  startTextDownload(content, filename);
});
</script>

<template>
</template>
