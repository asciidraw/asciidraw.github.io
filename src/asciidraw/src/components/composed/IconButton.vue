<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import type {TooltipContentProps} from "radix-vue";
import { createReusableTemplate } from "@vueuse/core";

type ButtonProps = /* @vue-ignore */ UndefinedToOptional<InstanceType<typeof Button>['$props']>;

defineOptions({
  inheritAttrs: false,
});
const props = defineProps<ButtonProps & {
  contentProps?: TooltipContentProps
}>();

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
</script>

<template>
  <DefineTemplate>
    <Button variant="ghost" size="icon" v-bind="$attrs">
      <slot />
    </Button>
  </DefineTemplate>

  <ReuseTemplate v-if="!$slots.tooltip" />
  <Tooltip v-else>
    <TooltipTrigger as-child>
      <ReuseTemplate />
    </TooltipTrigger>
    <TooltipContent v-bind="props.contentProps">
      <slot name="tooltip" />
    </TooltipContent>
  </Tooltip>
</template>
