<script setup lang="ts">
import { TooltipProvider } from "@/components/ui/tooltip";
import { onErrorCaptured } from "vue";
import { Toaster, useToast } from "@/components/ui/toast";
import { CommandPopup } from "@/components/command-popup";
import CommonCommands from "@/components/command-popup/CommonCommands.vue";

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
    <CommandPopup>
      <router-view :key="$route.fullPath" />
      <CommonCommands />
    </CommandPopup>
  </TooltipProvider>
  <Toaster />
</template>
