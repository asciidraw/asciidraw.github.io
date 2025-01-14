<script setup lang="ts">
import { RouterView } from 'vue-router'
import {TooltipProvider} from "@/components/ui/tooltip";
import {onErrorCaptured} from "vue";

onErrorCaptured((error) => {
  alert(`Critical Error (${error.name}: ${error.message})`);
});
</script>

<template>
  <TooltipProvider>
    <RouterView />
  </TooltipProvider>
</template>
