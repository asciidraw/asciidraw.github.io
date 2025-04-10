<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})


function handleValueInputWheel(event: WheelEvent) {
  if (event.target instanceof HTMLInputElement && event.target.type === 'number') {
    const factor = event.shiftKey ? 5 : 1;
    if(event.deltaY < 0) {
      if (event.target.max)
        modelValue.value = Math.min(+modelValue.value! + factor, +event.target.max);
      else
        modelValue.value = +modelValue.value! + factor;
    } else if (event.deltaY > 0) {
      if (event.target.min)
        modelValue.value = Math.max(+modelValue.value! - factor, +event.target.min);
      else
        modelValue.value = +modelValue.value! + factor;
    }
  }
}
</script>

<template>
  <input v-model="modelValue" @wheel.prevent="handleValueInputWheel" :class="cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', props.class)">
</template>

<style scoped>
/* For Chrome, Safari, and Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
