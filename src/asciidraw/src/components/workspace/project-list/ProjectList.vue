<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-vue-next";
import { createNewProjectId, loadProjectFromStorage, setStorageSync, StorageType, storeProjectData } from "@/lib";
import { createNewProject } from "@/workspace/createNewProject.ts";
import { useRouter } from "vue-router";
import { useProjectIds } from "@/composables/useProjectIds.ts";
import DeleteProjectButton from "@/components/workspace/project-list/DeleteProjectButton.vue";
import EditProjectNameButton from "@/components/workspace/project-list/EditProjectNameButton.vue";
import { computed } from "vue";
import ProjectDropZone from "@/components/workspace/project-list/ProjectDropZone.vue";
import IconButton from "@/components/composed/IconButton.vue";
import DuplicateProjectButton from "@/components/workspace/project-list/DuplicateProjectButton.vue";
import UploadProjectButton from "@/components/workspace/project-list/UploadProjectButton.vue";
import ProjectListLink from "@/components/workspace/project-list/ProjectListLink.vue";

type FeatureName = "edit-name" | "duplicate" | "delete" | "upload-project" | "list-link"

const props = defineProps<{
  features: FeatureName[]
}>();

function isEnabled(feature: FeatureName): boolean {
  return !props.features.length || props.features.includes(feature);
}

const router = useRouter();

const activeProjectId = computed(() => router.currentRoute.value.params.projectId);

const projectIds = useProjectIds();

function newProject(event: KeyboardEvent) {
  const newProjectId = createNewProjectId();
  setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, createNewProject()));
  if (!(event.ctrlKey || event.shiftKey))
    router.push({ name: "workspace", params: { projectId: newProjectId } });
}
</script>

<template>
  <template v-for="projectId in projectIds" :key="projectId">
    <div class="flex gap-x-0.5">
      <router-link class="grow truncate" :to="{ name: 'workspace', params: { projectId } }">
        <Button :variant="(activeProjectId === undefined || activeProjectId === projectId) ? 'secondary' : 'outline'" size="xs" class="w-full justify-start">
          {{ loadProjectFromStorage(projectId)?.name ?? projectId }}
        </Button>
      </router-link>
      <EditProjectNameButton v-if="isEnabled('edit-name')" :project-id="projectId" />
      <DuplicateProjectButton v-if="isEnabled('duplicate')" :project-id="projectId" />
      <DeleteProjectButton v-if="isEnabled('delete')" :project-id="projectId" />
    </div>
  </template>
  <div class="flex gap-x-0.5">
    <IconButton variant="outline" size="xs" class="w-full" @click="newProject">
      <LucidePlus />
      <template #tooltip>{{ $t('components.project-list.new.tooltip') }}</template>
    </IconButton>
    <UploadProjectButton v-if="isEnabled('upload-project')" />
    <ProjectListLink v-if="isEnabled('list-link')" />
  </div>
  <ProjectDropZone />
</template>
