<script setup lang="ts">
import WorkspaceMenu from "@/workspace/floating-menu/FloatingMenu.vue";
import WorkspaceCanvas from "@/workspace/WorkspaceCanvas.vue";
import { computed, provide, ref } from "vue";
import { createNewProject, DEFAULT_ACTION } from "@/workspace/core";
import type { DrawContext, WorkspaceContext } from "@/types";
import { INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT, INJECTION_KEY_WORKSPACE } from "@/symbols.ts";
import { useLocalStorage, useTitle } from "@vueuse/core";
import { loadProjectData, StorageType, storeProjectData } from "@/lib";
import createEmitter from "mitt";
import { useRoute } from "vue-router";
import HistorySupport from "@/workspace/HistorySupport.vue";

const workspaceContext = ref<WorkspaceContext>({
  activeActionId: DEFAULT_ACTION,
  events: createEmitter(),
});

provide(INJECTION_KEY_WORKSPACE, workspaceContext);

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
  <HistorySupport />
</template>
