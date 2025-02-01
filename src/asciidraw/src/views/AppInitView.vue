<script setup lang="ts">
import { useRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createNewProject } from "@/app/createNewProject.ts";
import { createNewProjectId, setStorageSync, StorageType, storeProjectData } from "@/lib";
import { useProjectIds } from "@/composables/useProjectIds.ts";
import ProjectList from "@/components/app/project-list/ProjectList.vue";

const router = useRouter();

const projectIds = useProjectIds();

if (router.currentRoute.value.query.autoRedirect === 'true') {
  router.replace({ query: { autoRedirect: undefined } });
  if (projectIds.value.length === 0) {
    const newProjectId = createNewProjectId();
    setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, createNewProject()));
    router.push({ name: "app", params: { projectId: newProjectId } });
  } else if (projectIds.value.length === 1) {
    router.push({ name: "app", params: { projectId: projectIds.value[0] } });
  }
}
</script>

<template>
  <DefaultLayout class="grid place-items-center p-5">
    <Card class="w-full max-w-lg">
      <CardHeader>
        <CardTitle>
          {{ $t('app-init.title') }}
        </CardTitle>
        <CardDescription class="text-muted-foreground">
          {{ $t('app-init.description') }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-0.5">
        <ProjectList :features="['edit-name', 'duplicate', 'delete']" />
      </CardContent>
    </Card>
  </DefaultLayout>
</template>
