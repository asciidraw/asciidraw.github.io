<script setup lang="ts">
import { RouterView } from 'vue-router'
import {TooltipProvider} from "@/components/ui/tooltip";
</script>

<template>
  <TooltipProvider>
    <RouterView />
  </TooltipProvider>
</template>
