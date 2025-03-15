<script setup lang="ts">
import IconButton from "@/components/composed/IconButton.vue";
import { LucideList } from "lucide-vue-next";
</script>

<template>
  <router-link :to="{ name: 'projects' }" class="leading-none">
    <IconButton variant="outline" size="icon" class="size-7">
      <LucideList class="size-full" />
      <template #tooltip>{{ $t('components.project-list.list-link.tooltip') }}</template>
    </IconButton>
  </router-link>
</template>
