<script setup lang="ts">
import { useIsDropAvailable } from "@/composables/useIsDropAvailable.ts";
import { templateRef, useDropZone } from "@vueuse/core";
import { createNewProjectId, loadProjectData, setStorageSync, StorageType, storeProjectData } from "@/lib";

const isDropAvailable = useIsDropAvailable();
const uploadDropZoneRef = templateRef("upload-dropzone");

useDropZone(uploadDropZoneRef, {
  multiple: true,
  dataTypes: (types) => types.every(
      (type) => ["", "application/json"].some(allowedType => type === allowedType)
  ),
  onDrop: (files) => {
    files?.forEach(file => {
      file.text().then((data) => {
        let loaded;
        switch (file.type) {
          case "application/json":
            loaded = JSON.parse(data);
            break;
          default:
            loaded = loadProjectData(StorageType.file, data);
            break;
        }
        if (loaded === null) throw Error("Project data is bad");
        const newProjectId = createNewProjectId();
        setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, loaded));
      });
    });
  },
});
</script>

<template>
  <div v-if="isDropAvailable" ref="upload-dropzone" class="border border-dashed h-20 grid place-content-center m-2">
    {{ $t('app.menu.project.dropzone') }}
  </div>
</template>
