<script lang="ts" setup>
import type { StepperSeparatorProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { StepperSeparator, useForwardProps } from 'radix-vue'

import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<StepperSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <StepperSeparator
    v-bind="forwarded"
    :class="cn(
      'bg-neutral-100 dark:bg-neutral-800',
      // Disabled
      'group-data-[disabled]:bg-neutral-100 group-data-[disabled]:opacity-50 dark:group-data-[disabled]:bg-neutral-800',
      // Completed
      'group-data-[state=completed]:bg-neutral-900 dark:group-data-[state=completed]:bg-neutral-50',
      props.class,
    )"
  />
</template>
