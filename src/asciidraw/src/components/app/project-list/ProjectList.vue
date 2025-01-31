<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { LucideList, LucidePlus } from "lucide-vue-next";
import { createNewProjectId, loadProjectName, setStorageSync, StorageType, storeProjectData } from "@/lib";
import { createNewProject } from "@/app/createNewProject.ts";
import { useRouter } from "vue-router";
import { useProjectIds } from "@/composables/useProjectIds.ts";
import DeleteProjectButton from "@/components/app/project-list/DeleteProjectButton.vue";
import EditProjectNameButton from "@/components/app/project-list/EditProjectNameButton.vue";
import { computed } from "vue";
import DropZone from "@/components/app/project-list/DropZone.vue";
import IconButton from "@/components/composed/IconButton.vue";

defineProps<{
  showLinkToList?: boolean;
}>();

const router = useRouter();

const activeProjectId = computed(() => router.currentRoute.value.params.projectId);

const projectIds = useProjectIds();

function newProject(event: KeyboardEvent) {
  const newProjectId = createNewProjectId();
  setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, createNewProject()));
  if (!(event.ctrlKey || event.shiftKey))
    router.push({ name: "app", params: { projectId: newProjectId } });
}
</script>

<template>
  <template v-for="projectId in projectIds" :key="projectId">
    <div class="flex gap-x-0.5">
      <router-link class="grow truncate" :to="{ name: 'app', params: { projectId } }">
        <Button :variant="(activeProjectId === undefined || activeProjectId === projectId) ? 'secondary' : 'outline'" size="xs" class="w-full justify-start">
          {{ loadProjectName(projectId) ?? projectId }}
        </Button>
      </router-link>
      <EditProjectNameButton :project-id="projectId" />
      <DeleteProjectButton :project-id="projectId" />
    </div>
  </template>
  <div class="flex gap-x-0.5">
    <IconButton variant="outline" size="xs" class="w-full" @click="newProject">
      <LucidePlus />
      <template #tooltip>{{ $t('components.project-list.new.tooltip') }}</template>
    </IconButton>
    <router-link v-if="showLinkToList" :to="{ name: 'app-init' }" class="leading-none">
      <IconButton variant="outline" size="icon" class="size-7">
        <LucideList class="size-full" />
        <template #tooltip>{{ $t('components.project-list.list-link.tooltip') }}</template>
      </IconButton>
    </router-link>
  </div>
  <DropZone />
</template>
