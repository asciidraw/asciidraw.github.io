<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { Project } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideImageOff, LucidePencilRuler } from "lucide-vue-next";
import { createProjectInStorage } from "@/lib";
import { useRouter } from "vue-router";
import { computed } from "vue";

const exampleProjectsMap = import.meta.glob<Project>("@/assets/example-projects/*.json", { eager: false, import: 'default' });
const exampleProjectImageMap = import.meta.glob<string>("@/assets/example-projects/*.svg", { eager: true, import: 'default', query: '?raw' });
type Loader = typeof exampleProjectsMap[keyof typeof exampleProjectsMap];

const router = useRouter();

function extractName(path: string): string {
  return path.match(/\/([^/]+)\.\w+$/)![1]!;
}

function loadProject(loader: Loader): void {
  loader().then(projectData => {
    const newProjectId = createProjectInStorage(projectData);
    router.push({ name: 'workspace', params: { projectId: newProjectId } });
  });
}

type ExampleProjectInfo = { name: string, loader: Loader, imgSrc?: string };

const exampleProjects = computed<ExampleProjectInfo[]>(() => {
  return Object.entries(exampleProjectsMap).map(([path, loader]) => {
    const name = extractName(path);
    const imgSrc = exampleProjectImageMap[path.replace(/\.json$/, ".svg")];
    return { name, loader, imgSrc };
  });
});
</script>

<template>
  <DefaultLayout>
    <div class="max-w-screen-lg mx-auto space-y-2">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold leading-none tracking-wide text-center">
        {{ $t('example-projects.title') }}
      </h1>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(min(400px,100%),1fr))] gap-4">
        <template v-for="example in exampleProjects" :key="example.name">
          <Card class="aspect-square grid grid-rows-[auto,1fr,auto]">
            <CardHeader>
              <CardTitle>
                {{ $t(`example-projects.names.${example.name}`) }}
              </CardTitle>
            </CardHeader>
            <CardContent class="grid place-items-center">
              <div v-if="example.imgSrc" v-html="example.imgSrc" class="size-full grid place-items-center rounded-md" />
              <LucideImageOff v-else class="size-12" />
            </CardContent>
            <CardFooter class="justify-end">
              <Button @click="loadProject(example.loader)">
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
