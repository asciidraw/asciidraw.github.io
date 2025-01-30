<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { Project } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideCpu, LucidePencilRuler } from "lucide-vue-next";
import { setStorageSync, StorageType, storeProjectData } from "@/lib";
import { v4 as uuid } from "uuid";
import { useRouter } from "vue-router";

const exampleProjectsMap = import.meta.glob<Project>("@/assets/example-projects/*.json");
type Loader = typeof exampleProjectsMap[keyof typeof exampleProjectsMap];

const router = useRouter();

function extractName(path: string): string {
  return path.match(/\/([^/]+)\.\w+$/)![1];
}

function loadProject(loader: Loader): void {
  loader().then(project => {
    const newProjectId = uuid();
    setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, project));
    router.push({ name: 'app', params: { projectId: newProjectId } });
  });
}
</script>

<template>
  <DefaultLayout>
    <div class="max-w-screen-lg mx-auto space-y-2">
      <h1 class="text-4xl font-bold leading-none tracking-wide text-center">
        {{ $t('example-projects.title') }}
      </h1>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        <template v-for="[path, loader] in Object.entries(exampleProjectsMap)" :key="path">
          <Card class="aspect-square grid grid-rows-[auto,1fr,auto]">
            <CardHeader>
              <CardTitle>
                {{ $t(`example-projects.names.${extractName(path)}`) }}
              </CardTitle>
            </CardHeader>
            <CardContent class="grid place-items-center">
              <!-- todo: replace with render? or other preview -->
              <LucideCpu class="size-20" />
            </CardContent>
            <CardFooter class="justify-end">
              <Button @click="loadProject(loader)">
                <LucidePencilRuler class="size-4 mr-1" />
                {{ $t('example-projects.actions.load') }}
              </Button>
            </CardFooter>
          </Card>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>
