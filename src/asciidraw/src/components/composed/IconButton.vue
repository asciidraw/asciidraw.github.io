<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import type {TooltipContentProps} from "radix-vue";

type ComponentProps<T> = /* @vue-ignore */ T extends new () => { $props: infer P } ? Partial<P> : never;

const props = defineProps<ComponentProps<typeof Button> & {
  contentProps?: TooltipContentProps
}>();
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button variant="ghost" size="icon" v-bind="$attrs" v-on="$attrs">
        <slot />
      </Button>
    </TooltipTrigger>
    <TooltipContent v-bind="props.contentProps">
      <slot name="tooltip" />
    </TooltipContent>
  </Tooltip>
</template>
