<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
import { provide, reactive } from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type { Project } from "@/types";
import {EVENT_DOWNLOAD_PROJECT, PROJECT_INJECTION_KEY} from "@/symbols.ts";
import {useEventBus, watchDebounced} from "@vueuse/core";
import {startTextDownload} from "@/lib";


useEventBus(EVENT_DOWNLOAD_PROJECT).on(() => {
  const content = JSON.stringify(project);
  const filename = `${Date.now()}.json`;
  startTextDownload(content, filename);
});


function loadOrCreateProject(): Project {
  const stored = localStorage.getItem("project");
  return stored === null ? createNewProject() : JSON.parse(stored);
}


const project: Project = reactive(loadOrCreateProject());
provide(PROJECT_INJECTION_KEY, project);


watchDebounced(project, () => {
  localStorage.setItem("project", JSON.stringify(project));
}, { debounce: 500, maxWait: 1000, immediate: true });
</script>

<template>
  <AppMenu />
  <ContextMenuHandler disabled>
    <AppCanvas />
  </ContextMenuHandler>
</template>
