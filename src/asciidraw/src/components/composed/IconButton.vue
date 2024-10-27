<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import type {TooltipContentProps} from "radix-vue";

const props = defineProps<{
  contentProps: TooltipContentProps
}>();
</script>

<template>
  <Button variant="ghost" size="icon" v-bind="$props">
    <slot v-if="!$slots.tooltip" />
    <Tooltip v-else>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipContent v-bind="props.contentProps">
        <slot name="tooltip" />
      </TooltipContent>
    </Tooltip>
  </Button>
</template>
