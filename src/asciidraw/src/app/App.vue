<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
import {onMounted, provide, ref} from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type {AppContext, AppEvents, Extension, Project} from "@/types";
import {EVENT_DOWNLOAD_PROJECT, EVENT_UPLOAD_PROJECT, INJECTION_KEY_APP, PROJECT_INJECTION_KEY} from "@/symbols.ts";
import {useEventBus, watchDebounced} from "@vueuse/core";
import { loadProjectData, startTextDownload, storeProjectData } from "@/lib";
const extensions: Record<string, Extension> = import.meta.glob("./extensions/*/index.ts", { eager: true, import: 'default' });
import createEmitter from "mitt";

const appContext = ref<AppContext>({
  extensions: [],
  actions: [],
  activeActionId: "",
  events: createEmitter(),
});

for (const extension of Object.values(extensions)) {
  appContext.value.extensions.push(extension);
  extension.setup?.(appContext.value);
  if (extension.on) {
    for (const [eventName, eventHandler] of Object.entries(extension.on)) {
      appContext.value.events.on(eventName as keyof AppEvents, eventHandler);
    }
  }
}
appContext.value.activeActionId = appContext.value.actions[0].id;

onMounted(() => {
  appContext.value.events.emit("mounted", appContext.value);
});

provide(INJECTION_KEY_APP, appContext);

useEventBus(EVENT_DOWNLOAD_PROJECT).on(() => {
  const content = storeProjectData(project.value);
  const filename = `${Date.now()}.json`;
  startTextDownload(content, filename);
});

useEventBus(EVENT_UPLOAD_PROJECT).on((content) => {
  project.value = loadProjectData(content);
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
