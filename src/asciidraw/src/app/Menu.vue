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
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

const hidden = ref(false);
</script>

<template>
  <Button variant="ghost" v-if="hidden" @click="hidden = false" class="fixed bg-primary shadow left-4 top-4 z-20 p-2 rounded-full size-10">
    <LucideTypeOutline class="size-10" />
  </Button>
  <div v-else class="fixed bg-primary-foreground shadow left-4 top-4 z-20 max-w-xs p-2 rounded-lg flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <router-link to="/" class="flex">
        <LucideTypeOutline />
        <span>AsciiDraw</span>
      </router-link>
      <div class="min-w-10" />
      <div class="grow" />
      <ThemeToggle />
      <Button variant="ghost" size="icon" @click="hidden = true">
        <Tooltip>
          <TooltipTrigger>
            <LucideCircleChevronLeft class="size-6" />
          </TooltipTrigger>
          <TooltipContent>
            Hide this overly large menu
          </TooltipContent>
        </Tooltip>
      </Button>
    </div>
    <Separator label="Export" />
    <div class="flex gap-x-2">
      <Button variant="ghost" size="icon">
        <Tooltip>
          <TooltipTrigger>
            <LucideArrowDownToLine />
          </TooltipTrigger>
          <TooltipContent>
            Export this graph
          </TooltipContent>
        </Tooltip>
      </Button>
      <Button variant="ghost" size="icon">
        <Tooltip>
          <TooltipTrigger>
            <LucideArrowUpFromLine />
          </TooltipTrigger>
          <TooltipContent>
            Import an existing graph
          </TooltipContent>
        </Tooltip>
      </Button>
      <Button variant="ghost" size="icon">
        <Tooltip>
          <TooltipTrigger>
            <LucideShare2 />
          </TooltipTrigger>
          <TooltipContent>
            Share this graph with other people
          </TooltipContent>
        </Tooltip>
      </Button>
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
