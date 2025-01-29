<script setup lang="ts">
import AppMenu from "@/app/floating-menu/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import { type Component, computed, provide, ref } from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type { AppContext, DrawContext, ElementRenderer, Extension } from "@/types";
import {
  INJECTION_KEY_APP,
  INJECTION_KEY_DRAW_CONTEXT,
  INJECTION_KEY_PROJECT,
  INJECTION_KEY_RENDERER_MAP
} from "@/symbols.ts";
import { useLocalStorage, useTitle } from "@vueuse/core";
import { loadProjectData, StorageType, storeProjectData } from "@/lib";
import createEmitter from "mitt";
import { useRoute } from "vue-router";

const extensions: Record<string, Extension> = import.meta.glob("./extensions/*/index.ts", { eager: true, import: 'default' });

const appContext = ref<AppContext>({
  extensions: [],
  actions: {},
  activeActionId: "",
  events: createEmitter(),
});

const rendererMap: Record<string, ElementRenderer> = {};
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
  if (extension.renderer) {
    for (const [elementType, renderer] of Object.entries(extension.renderer)) {
      if (rendererMap.hasOwnProperty(elementType))
        console.warn(`overwriting renderer for ${elementType}`)
      rendererMap[elementType] = renderer;
    }
  }
}

provide(INJECTION_KEY_APP, appContext);
provide(INJECTION_KEY_RENDERER_MAP, rendererMap);

const route = useRoute();

const projectId = computed(() => route.params.projectId ?? null);
const projectStorageKey = computed(() => `project-${projectId.value}`);

const project = useLocalStorage(projectStorageKey, createNewProject, {
  serializer: {
    read: (p) => loadProjectData(StorageType.storage, p),
    write: (p) => storeProjectData(StorageType.storage, p),
  },
  deep: true,
});

const drawContext = ref<DrawContext>({
  offset: { x: 0, y: 0 },
  zoom: 10,
  selectedElements: new Set(),
  scratchElements: [],
});

provide(INJECTION_KEY_DRAW_CONTEXT, drawContext);
provide(INJECTION_KEY_PROJECT, project);

useTitle(() => project.value.name, { titleTemplate: "AsciiDraw - %s" });
</script>

<template>
  <AppMenu />
  <AppCanvas />
  <template v-for="component in additionalComponents">
    <component :is="component" />
  </template>
</template>
