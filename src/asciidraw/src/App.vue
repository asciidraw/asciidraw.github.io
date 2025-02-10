<script setup lang="ts">
import { TooltipProvider } from "@/components/ui/tooltip";
import { onErrorCaptured } from "vue";
import { Toaster, useToast } from "@/components/ui/toast";

const { toast } = useToast();

onErrorCaptured((error) => {
  toast({
    title: "Critical Error",
    description: `${error.name}: ${error.message}`,
    variant: "destructive",
  });
});
</script>

<template>
  <TooltipProvider>
    <router-view :key="$route.fullPath" />
  </TooltipProvider>
  <Toaster />
</template>
