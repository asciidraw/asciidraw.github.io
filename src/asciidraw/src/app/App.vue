<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
import { provide, ref } from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type { Project } from "@/types";
import {EVENT_DOWNLOAD_PROJECT, EVENT_UPLOAD_PROJECT, PROJECT_INJECTION_KEY} from "@/symbols.ts";
import {useEventBus, watchDebounced} from "@vueuse/core";
import { loadProjectData, startTextDownload, storeProjectData } from "@/lib";


useEventBus(EVENT_DOWNLOAD_PROJECT).on(() => {
  const content = storeProjectData(project.value);
  const filename = `${Date.now()}.json`;
  startTextDownload(content, filename);
});

useEventBus(EVENT_UPLOAD_PROJECT).on((content) => {
  project.value = loadProjectData(content);
  console.log("should rerender")
});


function loadOrCreateProject(): Project {
  const stored = localStorage.getItem("project");
  return stored === null ? createNewProject() : loadProjectData(stored);
}


const project = ref(loadOrCreateProject());

watchDebounced(project, () => {
  console.log("saving project data");
  localStorage.setItem("project", storeProjectData(project.value));
}, { debounce: 500, maxWait: 1000, immediate: true, deep: true });

provide(PROJECT_INJECTION_KEY, project);
</script>

<template>
  <AppMenu />
  <ContextMenuHandler disabled>
    <AppCanvas />
  </ContextMenuHandler>
</template>
