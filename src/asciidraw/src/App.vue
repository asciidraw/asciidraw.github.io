<script setup lang="ts">
import {TooltipProvider} from "@/components/ui/tooltip";
import {onErrorCaptured} from "vue";

onErrorCaptured((error) => {
  setTimeout(() => alert(`Critical Error (${error.name}: ${error.message})`));
});
</script>

<template>
  <TooltipProvider>
    <router-view :key="$route.fullPath" />
  </TooltipProvider>
</template>
