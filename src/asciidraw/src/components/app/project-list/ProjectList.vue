<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-vue-next";
import { v4 as uuid } from "uuid";
import { loadProjectName, setStorageSync, storeProjectData } from "@/lib";
import { createNewProject } from "@/app/createNewProject.ts";
import { useRouter } from "vue-router";
import { useProjectIds } from "@/composables/useProjectIds.ts";
import DeleteProjectButton from "@/components/app/project-list/DeleteProjectButton.vue";
import EditProjectNameButton from "@/components/app/project-list/EditProjectNameButton.vue";
import { computed } from "vue";

defineProps<{
  allowProjectDeletion?: boolean
}>();

const router = useRouter();

const activeProjectId = computed(() => router.currentRoute.value.params.projectId);

const projectIds = useProjectIds();

function newProject() {
  const newProjectId = uuid();
  setStorageSync(`project-${newProjectId}`, storeProjectData(createNewProject()));
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
      <DeleteProjectButton v-if="allowProjectDeletion" :project-id="projectId" />
    </div>
  </template>
  <Button variant="outline" size="xs" class="w-full" @click="newProject">
    <LucidePlus />
  </Button>
</template>
