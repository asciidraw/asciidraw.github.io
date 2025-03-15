<script setup lang="ts">
import { useIsDropAvailable } from "@/composables/useIsDropAvailable.ts";
import { templateRef, useDropZone } from "@vueuse/core";
import { loadProjectsFromFiles } from "@/components/workspace/project-list/project-loader.ts";

const isDropAvailable = useIsDropAvailable();
const uploadDropZoneRef = templateRef("upload-dropzone");

useDropZone(uploadDropZoneRef, {
  multiple: true,
  dataTypes: (types) => types.every(
      (type) => ["", "application/json"].some(allowedType => type === allowedType)
  ),
  onDrop: (files) => {
    loadProjectsFromFiles(files!);
  },
});
</script>

<template>
  <div v-if="isDropAvailable" ref="upload-dropzone" class="border border-dashed h-20 grid place-content-center !mt-2">
    {{ $t('workspace.menu.project.dropzone') }}
  </div>
</template>
