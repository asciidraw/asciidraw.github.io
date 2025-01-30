<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import "@/docs/style.css";
import "@/docs/code-style.css";
import { useRouter } from "vue-router";
import { type Component, computed, ref, shallowRef, watch } from "vue";
import {useI18n} from "vue-i18n";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {LucideBookType, LucideSearchX} from "lucide-vue-next";
import FileTree from "@/docs/components/FileTree.vue";
import { Skeleton } from "@/components/ui/skeleton";
import { docsTreeConfig } from "@/docs/config.ts";
import { useTitle } from "@vueuse/core";

const pathPrefix = "/src/docs/"
interface MarkdownComponent {
  default: Component
  // frontmatter fields can be added here
  title?: string
}
const markdownFiles = import.meta.glob<MarkdownComponent>("@/docs/**/*.md");
const documentTitles = import.meta.glob<string>("@/docs/**/*.md", { eager: true, import: "title" });

const { locale } = useI18n();

const router = useRouter();
const path = computed(() => router.currentRoute.value.params.path);
const hash = computed(() => router.currentRoute.value.hash);

const currentMarkdown = shallowRef<MarkdownComponent | null | undefined>(null);
const loadingId = ref<number>();

watch([locale, path], () => {
  currentMarkdown.value = undefined;
  let loadId = loadingId.value = Date.now();
  const pathParts: string[] = Array.isArray(path.value) ? path.value.filter(e => !!e) : [];
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

watch([hash, currentMarkdown], () => {
  if (currentMarkdown.value === null || currentMarkdown.value === undefined) return;
  const elementId = hash.value.slice(1);
  if (elementId) {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth" });
  }
}, { flush: "post" });

function pathToTitle(path: string): string | undefined {
  return documentTitles[`/src/docs/${locale.value}/${path}/index.md`]
    ?? documentTitles[`/src/docs/${locale.value}/${path}md`];
}

useTitle(() => currentMarkdown.value?.title, { titleTemplate: `AsciiDraw - Docs - %s` });
</script>

<template>
  <DefaultLayout class="grid grid-cols-[auto,minmax(0,1fr)] w-screen">
    <div class="p-2 border-r">
      <div class="space-y-0.5 sticky top-14">
        <router-link :to="{ name: 'docs' }">
          <LucideBookType class="size-10 mx-auto" />
        </router-link>
        <FileTree :treeConfig="docsTreeConfig" :parent-path="[]" :path-to-title="pathToTitle" />
      </div>
    </div>
    <div v-if="currentMarkdown === undefined" class="p-4 markdown-body space-y-4">
      <Skeleton class="h-10 w-full max-w-96" />
      <div class="space-y-2">
        <Skeleton v-for="i in 3" :key="i" class="h-5 last:w-3/5" />
      </div>
      <Skeleton class="h-8 w-full max-w-72" />
      <div class="space-y-2">
        <Skeleton v-for="i in 5" :key="i" class="h-5 last:w-1/5" />
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
    <component v-else :is="currentMarkdown.default" class="p-4" />
  </DefaultLayout>
</template>
