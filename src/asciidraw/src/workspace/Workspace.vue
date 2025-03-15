<script setup lang="ts">
import WorkspaceMenu from "@/workspace/floating-menu/FloatingMenu.vue";
import WorkspaceCanvas from "@/workspace/WorkspaceCanvas.vue";
import { type Component, computed, provide, ref } from "vue";
import { createNewProject } from "@/workspace/core";
import type { DrawContext, ElementRenderer, Extension, WorkspaceContext } from "@/types";
import {
  INJECTION_KEY_DRAW_CONTEXT,
  INJECTION_KEY_PROJECT,
  INJECTION_KEY_RENDERER_MAP,
  INJECTION_KEY_WORKSPACE
} from "@/symbols.ts";
import { useLocalStorage, useTitle } from "@vueuse/core";
import { loadProjectData, StorageType, storeProjectData } from "@/lib";
import createEmitter from "mitt";
import { useRoute } from "vue-router";

const extensions: Record<string, Extension> = import.meta.glob("./extensions/*/index.ts", { eager: true, import: 'default' });

const workspaceContext = ref<WorkspaceContext>({
  extensions: [],
  actions: {},
  activeActionId: "",
  events: createEmitter(),
});

const rendererMap: Record<string, ElementRenderer> = {};
const additionalComponents: Component[] = [];

for (const extension of Object.values(extensions)) {
  workspaceContext.value.extensions.push(extension);
  extension.setup?.(workspaceContext.value);
  if (extension.on) {
    for (const [eventName, eventHandler] of Object.entries(extension.on)) {
      // @ts-expect-error dynamic assigning
      workspaceContext.value.events.on(eventName, eventHandler);
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

provide(INJECTION_KEY_WORKSPACE, workspaceContext);
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
  userHighlight: null,
});

provide(INJECTION_KEY_DRAW_CONTEXT, drawContext);
provide(INJECTION_KEY_PROJECT, project);

useTitle(() => project.value.name, { titleTemplate: "AsciiDraw - %s" });
</script>

<template>
  <WorkspaceMenu />
  <WorkspaceCanvas />
  <template v-for="component in additionalComponents">
    <component :is="component" />
  </template>
</template>
