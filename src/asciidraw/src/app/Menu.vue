<script setup lang="ts">
import {
  LucideArrowDownToLine, LucideArrowUpFromLine,
  LucideCircleChevronLeft, LucideShare2, LucideSquareDashedMousePointer,
  LucideTypeOutline
} from "lucide-vue-next";
import ThemeToggle from "@/components/ThemeToggle.vue";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
import {Separator} from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";

const hidden = ref(false);
</script>

<template>
  <Button variant="ghost" v-if="hidden" @click="hidden = false" class="fixed bg-primary shadow left-4 top-4 z-20 p-2 rounded-full size-10">
    <LucideTypeOutline class="size-10" />
  </Button>
  <div v-else class="fixed bg-card border-2 border-border shadow left-4 top-4 z-20 max-w-xs p-2 rounded-lg flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <router-link to="/" class="flex">
        <LucideTypeOutline />
        <span>AsciiDraw</span>
      </router-link>
      <div class="min-w-10" />
      <div class="grow" />
      <LocaleToggle />
      <ThemeToggle />
      <IconButton @click="hidden = true">
        <LucideCircleChevronLeft class="size-6" />
        <template #tooltip>Hide this overly large menu</template>
      </IconButton>
    </div>
    <Separator label="Export" />
    <div class="flex gap-x-2">
      <IconButton>
        <LucideArrowDownToLine />
        <template #tooltip>Export this graph</template>
      </IconButton>
      <IconButton>
        <LucideArrowUpFromLine />
        <template #tooltip>Import an existing graph</template>
      </IconButton>
      <IconButton>
        <LucideShare2 />
        <template #tooltip>Share this graph with other people</template>
      </IconButton>
    </div>
    <Separator label="Elements" />
    <Button variant="ghost" size="xs" class="gap-x-2">
      <LucideSquareDashedMousePointer/>
      <p class="grow text-left">Select & Move</p>
    </Button>
    <Separator label="Help" />
    <p>
      Maybe I put some helpful information here later on. Till then this will stay useless.
    </p>
  </div>
</template>
