<script setup lang="ts">
import { LucideZoomIn, LucideZoomOut } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import { inject } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT } from "@/symbols.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

defineEmits<{
  (e: 'zoom-in'): void
  (e: 'zoom-out'): void
}>();

const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;

const zoomOptions = [50, 100, 150, 200];
</script>

<template>
  <div data-tour="zoom" class="fixed bg-card border-2 border-border shadow-lg shadow-shadow rounded-lg p-1 bottom-4 right-4 flex gap-x-1">
    <IconButton @click="$emit('zoom-out')">
      <LucideZoomOut class="size-6" />
      <template #tooltip>{{ $t('app.canvas.zoom.out.tooltip') }}</template>
    </IconButton>
    <Separator orientation="vertical" class="h-6 my-auto" />
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          {{ drawContext.zoom * 10 }}%
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" class="flex flex-col gap-y-1 min-w-16">
        <DropdownMenuItem v-for="option in zoomOptions" :key="option" variant="outline" @click="drawContext.zoom = Math.floor(option / 10)" class="justify-end">
          {{ option }}%
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Separator orientation="vertical" class="h-6 my-auto" />
    <IconButton @click="$emit('zoom-in')">
      <LucideZoomIn class="size-6" />
      <template #tooltip>{{ $t('app.canvas.zoom.in.tooltip') }}</template>
    </IconButton>
  </div>
</template>
