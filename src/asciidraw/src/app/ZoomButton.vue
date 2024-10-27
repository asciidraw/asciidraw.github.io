<script setup lang="ts">
import {LucideZoomIn, LucideZoomOut} from "lucide-vue-next";
import {Separator} from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";

defineEmits<{
  (e: 'zoom-in'): void
  (e: 'zoom-out'): void
}>();
</script>

<template>
  <div class="fixed bg-primary-foreground rounded-lg p-1 bottom-4 right-4 flex flex-col gap-y-1">
    <IconButton :content-props="{ side: 'left' }" @click="$emit('zoom-in')">
      <LucideZoomIn />
      <template #tooltip>Zoom in</template>
    </IconButton>
    <Separator />
    <IconButton :content-props="{ side: 'left' }" @click="$emit('zoom-out')">
      <LucideZoomOut />
      <template #tooltip>Zoom out</template>
    </IconButton>
  </div>
</template>
