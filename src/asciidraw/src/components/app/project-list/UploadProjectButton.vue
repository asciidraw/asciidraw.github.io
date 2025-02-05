<script setup lang="ts">
import IconButton from "@/components/composed/IconButton.vue";
import { LucideHardDriveUpload } from "lucide-vue-next";
import { useFileDialog } from "@vueuse/core";
import { loadProjectsFromFiles } from "@/components/app/project-list/project-loader.ts";

const fileDialog = useFileDialog({ accept: ".asciidraw.github.io,.io,application/json", multiple: false });

fileDialog.onChange((files) => {
  loadProjectsFromFiles([...files!]);
});
</script>

<template>
  <IconButton variant="outline" size="icon" class="size-7" @click="fileDialog.open">
    <LucideHardDriveUpload />
    <template #tooltip>{{ $t('app.menu.project.import.project.tooltip') }}</template>
  </IconButton>
</template>
