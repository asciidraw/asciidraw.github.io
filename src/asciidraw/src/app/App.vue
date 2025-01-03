<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
import { type Component, onMounted, provide, ref } from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type {AppContext, Extension, Project} from "@/types";
import {INJECTION_KEY_APP, INJECTION_KEY_PROJECT} from "@/symbols.ts";
import {watchDebounced} from "@vueuse/core";
import { loadProjectData, storeProjectData } from "@/lib";
const extensions: Record<string, Extension> = import.meta.glob("./extensions/*/index.ts", { eager: true, import: 'default' });
import createEmitter from "mitt";

const appContext = ref<AppContext>({
  extensions: [],
  actions: [],
  activeActionId: "",
  events: createEmitter(),
});

const additionalComponents: Component[] = [];

for (const extension of Object.values(extensions)) {
  appContext.value.extensions.push(extension);
  extension.setup?.(appContext.value);
  if (extension.on) {
    for (const [eventName, eventHandler] of Object.entries(extension.on)) {
      // @ts-expect-error dynamic assigning
      appContext.value.events.on(eventName, eventHandler);
    }
  }
  if (extension.components)
    additionalComponents.push(...extension.components);
}
appContext.value.activeActionId = appContext.value.actions[0].id;

onMounted(() => {
  appContext.value.events.emit("mounted", appContext.value);
});

provide(INJECTION_KEY_APP, appContext);

function loadOrCreateProject(): Project {
  const stored = localStorage.getItem("project");
  return stored === null ? createNewProject() : loadProjectData(stored);
}


const project = ref(loadOrCreateProject());

watchDebounced(project, () => {
  console.log("saving project data");
  localStorage.setItem("project", storeProjectData(project.value));
}, { debounce: 500, maxWait: 1000, immediate: true, deep: true });

provide(INJECTION_KEY_PROJECT, project);
</script>

<template>
  <AppMenu />
  <ContextMenuHandler>
    <AppCanvas />
  </ContextMenuHandler>
  <template v-for="component in additionalComponents">
    <component :is="component" />
  </template>
</template>
