<script setup lang="ts">
import type {Directory} from "@/docs/util.ts";
import {Button} from "@/components/ui/button";
import {useRoute} from "vue-router";
import {computed} from "vue";

defineProps<{
  parentPath: string[]
  directory: Directory
}>();

const route = useRoute();
const activePath = computed(() => route.params.path);

function removeSuffix(fn: string) {
  return fn.replace(/\.\w+$/, "");
}
</script>

<template>
  <div class="border-l">
    <div class="flex flex-col">
      <template v-for="file in directory.files" :key="file">
        <router-link v-if="file !== 'index.md'" :to="{ name: 'docs', params: { path: [...parentPath, file] } }">
          <Button :variant="([...parentPath, file].every((element, index) => element === activePath?.[index])) ? 'secondary' : 'ghost'" class="justify-start">
            {{ removeSuffix(file) }}
          </Button>
        </router-link>
      </template>
    </div>
    <template v-for="[name, directory] in Object.entries(directory.directories)" :key="directory">
      <div>
        <router-link :to="{ name: 'docs', params: { path: [...parentPath, name] } }">
          <Button :variant="([...parentPath, name].every((element, index) => element === activePath?.[index])) ? 'secondary' : 'ghost'" class="w-full justify-start">
            {{ name }}
          </Button>
        </router-link>
        <div :style="{ paddingLeft: `${0.5 + (parentPath?.length ?? 0)*0.5}rem` }">
          <FileTree :parent-path="[...parentPath, name]" :directory="directory" />
        </div>
      </div>
    </template>
  </div>
</template>
