<script setup lang="ts">
import { inject } from "vue";
import { INJECTION_KEY_PROJECT } from "@/symbols.ts";
import { startTextDownload, StorageType, storeProjectData } from "@/lib";
import IconButton from "@/components/composed/IconButton.vue";
import { LucideHardDriveDownload } from "lucide-vue-next";

const project = inject(INJECTION_KEY_PROJECT);

function downloadProject() {
  const content = storeProjectData(StorageType.file, project!.value);
  const filename = `${project!.value.name ?? (Date.now().toString())}.asciidraw.github.io`;
  startTextDownload(content, filename);
}
</script>

<template>
  <IconButton :disabled="project === undefined" @click="downloadProject">
    <LucideHardDriveDownload />
    <template #tooltip>{{ $t('components.download-project.tooltip') }}</template>
  </IconButton>
</template>
