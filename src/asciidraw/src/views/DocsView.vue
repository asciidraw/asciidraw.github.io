<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import "@/docs/style.css";
import "@/docs/code-style.css";
import { useRouter } from "vue-router";
import {computed, ref, shallowRef, watch} from "vue";
import {useI18n} from "vue-i18n";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {LucideBookType, LucideSearchX} from "lucide-vue-next";
import {parseFilesToDirectory} from "@/docs/util.ts";
import FileTree from "@/docs/components/FileTree.vue";
import { useEventListener } from "@vueuse/core";
import { Skeleton } from "@/components/ui/skeleton";

const pathPrefix = "/src/docs/"
const markdownFiles = import.meta.glob("@/docs/**/*.md", { import: "default" });

const { locale } = useI18n();

const router = useRouter();
const path = computed(() => router.currentRoute.value.params.path);
const hash = computed(() => router.currentRoute.value.hash);

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

watch([currentMarkdown], () => {
  if (currentMarkdown.value === null || currentMarkdown.value === undefined) return;
  const elementId = hash.value.slice(1);
  if (elementId) {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth" });
  }
}, { flush: "post" });

useEventListener("scroll", () => {
  const md = document.getElementsByClassName("markdown-body").item(0);
  const headings = md?.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings?.forEach((heading) => {
    const rect = heading.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight / 3) {
      router.push({ hash: `#${heading.id}` });
    }
  })
});

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
    <div v-if="currentMarkdown === undefined" class="p-4 markdown-body space-y-4">
      <Skeleton class="h-10 w-full max-w-96" />
      <div class="space-y-2">
        <Skeleton v-for="ignored in 3" class="h-5 last:w-3/5" />
      </div>
      <Skeleton class="h-8 w-full max-w-72" />
      <div class="space-y-2">
        <Skeleton v-for="ignored in 5" class="h-5 last:w-1/5" />
      </div>
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
    <component v-else :is="currentMarkdown" class="p-4" />
  </DefaultLayout>
</template>
