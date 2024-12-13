<script setup lang="ts">
import type {Directory} from "@/docs/util.ts";
import {Button} from "@/components/ui/button";
import {useRoute} from "vue-router";
import { computed } from "vue";
import { compare_arrays } from "@/lib";

defineProps<{
  parentPath: string[]
  directory: Directory
}>();

const route = useRoute();
const activePath = computed(() => route.params.path as string[] ?? []);

function removeSuffix(fn: string) {
  return fn.replace(/\.\w+$/, "");
}
</script>

<template>
  <div class="border-l pl-2 flex flex-col gap-y-0.5">
    <template v-for="file in directory.files" :key="file">
      <router-link v-if="file !== 'index.md'" :to="{ name: 'docs', params: { path: [...parentPath, file] } }">
        <Button :variant="compare_arrays([...parentPath, file], activePath) ? 'secondary' : 'ghost'" class="justify-start px-2 py-1">
          {{ removeSuffix(file) }}
        </Button>
      </router-link>
    </template>
    <template v-for="[name, directory] in Object.entries(directory.directories)" :key="directory">
      <router-link :to="{ name: 'docs', params: { path: [...parentPath, name] } }">
        <Button :variant="compare_arrays([...parentPath, name], activePath) ? 'secondary' : 'ghost'" class="w-full justify-start px-2 py-1">
          {{ name }}
        </Button>
      </router-link>
      <FileTree :parent-path="[...parentPath, name]" :directory="directory" />
    </template>
  </div>
</template>
