<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
import { provide, reactive, watch } from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type { Project } from "@/types";
import { PROJECT_INJECTION_KEY } from "@/keys.ts";


function loadOrCreateProject(): Project {
  const stored = localStorage.getItem("project");
  return stored === null ? createNewProject() : JSON.parse(stored);
}


const project: Project = reactive(loadOrCreateProject());
provide(PROJECT_INJECTION_KEY, project);


watch(project, () => {
  localStorage.setItem("project", JSON.stringify(project));
});
</script>

<template>
  <AppMenu />
  <ContextMenuHandler disabled>
    <AppCanvas />
  </ContextMenuHandler>
</template>
