<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import "@/docs/style.css";
import {useRoute} from "vue-router";
import {computed, ref, shallowRef, watch} from "vue";
import {useI18n} from "vue-i18n";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {LucideBookType, LucideLoaderCircle, LucideSearchX} from "lucide-vue-next";
import {parseFilesToDirectory} from "@/docs/util.ts";
import FileTree from "@/docs/components/FileTree.vue";

const pathPrefix = "/src/docs/"
const markdownFiles = import.meta.glob("@/docs/**/*.md", { import: "default" });

const { locale } = useI18n();

const route = useRoute();
const path = computed(() => route.params.path);

const currentMarkdown = shallowRef();
const loadingId = ref<number>();

watch([locale, path], () => {
  currentMarkdown.value = undefined;
  let loadId = loadingId.value = Date.now();
  const pathParts: string[] = Array.isArray(path.value) ? path.value : [];
  const prefix = `${pathPrefix}${locale.value}`;
  const pathString = pathParts.length ? "/" + pathParts.join('/') : "";
  const possiblePaths = [
    `${prefix}${pathString}`,
    `${prefix}${pathString}/index.md`,
  ]
  let anyMatch = false;
  for (const path of possiblePaths) {
    let loader = markdownFiles[path];
    if (loader) {
      loader().then(comp => {
        if (loadId === loadingId.value) {
          currentMarkdown.value = comp;
        }
      });
      anyMatch = true;
      break;
    }
  }
  if (!anyMatch)
    currentMarkdown.value = null;
}, { immediate: true });

const markdownFileList = computed(() => {
  return Object.keys(markdownFiles)
    .filter(path => path.startsWith(`${pathPrefix}${locale.value}/`))
    .map(path => path.split("/").slice(4));
});

const directory = computed(() => parseFilesToDirectory(markdownFileList.value.map(p => p.join("/"))));
</script>

<template>
  <DefaultLayout class="grid grid-cols-[auto,minmax(0,1fr)] w-screen">
    <div class="p-2 border-r flex flex-col gap-0.5">
      <router-link :to="{ name: 'docs' }">
        <LucideBookType class="size-10 mx-auto" />
      </router-link>
      <FileTree :directory="directory" :parent-path="[]" />
    </div>
    <div v-if="currentMarkdown === undefined" class="h-full p-4 grid place-content-center">
      <Alert>
        <LucideLoaderCircle class="size-4 animate-spin" />
        <AlertTitle>
          {{ $t('docs.loading') }}
        </AlertTitle>
      </Alert>
    </div>
    <div v-else-if="currentMarkdown === null" class="h-full p-4 grid place-content-center">
      <Alert>
        <LucideSearchX class="size-4" />
        <AlertTitle>
          {{ $t('docs.not-found.title') }}
        </AlertTitle>
        <AlertDescription class="text-muted-foreground">
          {{ $t('docs.not-found.description') }}
        </AlertDescription>
      </Alert>
    </div>
    <component :is="currentMarkdown" class="p-4" />
  </DefaultLayout>
</template>
