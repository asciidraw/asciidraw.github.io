<script setup lang="ts">
import IconButton from "@/components/composed/IconButton.vue";
import { LucideHardDriveUpload } from "lucide-vue-next";
import { useFileDialog } from "@vueuse/core";
import { loadProjectData, StorageType } from "@/lib";
import { inject } from "vue";
import { INJECTION_KEY_PROJECT } from "@/symbols.ts";

const project = inject(INJECTION_KEY_PROJECT)!;

const fileDialog = useFileDialog({ accept: ".asciidraw.github.io,.io,application/json", multiple: false });

fileDialog.onChange((files) => {
  if (files?.length) {
    [...files].forEach(file => {
      file.text().then((data) => {
        switch (file.type) {
          case "application/json":
            project.value = JSON.parse(data);
            break;
          default:
            project.value = loadProjectData(StorageType.file, data);
        }
      });
    });
  }
});
</script>

<template>
  <IconButton @click="fileDialog.open">
    <LucideHardDriveUpload />
    <template #tooltip>{{ $t('app.menu.project.import.project.tooltip') }}</template>
  </IconButton>
</template>
