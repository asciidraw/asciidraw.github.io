<script setup lang="ts">
import {TooltipProvider} from "@/components/ui/tooltip";
import {onErrorCaptured} from "vue";
import { Toaster } from "@/components/ui/toast";

onErrorCaptured((error) => {
  setTimeout(() => alert(`Critical Error (${error.name}: ${error.message})`));
});
</script>

<template>
  <TooltipProvider>
    <router-view :key="$route.fullPath" />
  </TooltipProvider>
  <Toaster />
</template>
