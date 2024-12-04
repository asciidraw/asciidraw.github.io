<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
import { provide, reactive, watch } from "vue";
import { createNewProject } from "@/app/createNewProject.ts";
import type { Project } from "@/types";
import { PROJECT_INJECTION_KEY } from "@/keys.ts";

const project: Project = reactive(createNewProject());

provide(PROJECT_INJECTION_KEY, project);

watch(project, () => {
  console.log("Project Changed", {...project});
})
</script>

<template>
  <AppMenu />
  <ContextMenuHandler disabled>
    <AppCanvas />
  </ContextMenuHandler>
</template>
