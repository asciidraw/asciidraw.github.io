<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRoute} from "vue-router";
import { computed } from "vue";
import { compare_arrays } from "@/lib";
import type { DocsTreeConfig } from "@/docs/config.ts";

defineProps<{
  parentPath: string[]
  treeConfig: DocsTreeConfig,
  pathToTitle: (path: string) => string | undefined,
}>();

const route = useRoute();
const activePath = computed(() => route.params.path as string[] ?? []);
</script>

<template>
  <div class="border-l pl-2 flex flex-col gap-y-0.5">
    <template v-for="[name, subConfig] in Object.entries(treeConfig)" :key="subConfig">
      <router-link :to="{ name: 'docs', params: { path: [...parentPath, name] } }">
        <Button :variant="compare_arrays([...parentPath, name], activePath) ? 'secondary' : 'ghost'" class="w-full justify-start px-2 py-1">
          {{ pathToTitle([...parentPath, name].join("/")) ?? name }}
        </Button>
      </router-link>
      <FileTree :parent-path="[...parentPath, name]" :tree-config="subConfig" :path-to-title="pathToTitle" />
    </template>
  </div>
</template>
