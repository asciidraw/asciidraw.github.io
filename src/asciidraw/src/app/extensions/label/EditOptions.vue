<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LabelData } from ".";
import { Button } from "@/components/ui/button";

const { data } = defineProps<{
  data: LabelData,
}>();

function fitToContent(): void {
  const lines = data.text.split("\n");
  data.width = lines.reduce((prev, curr) => Math.max(curr.length, prev), 0)-1;
  data.height = lines.length-1;
}
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.label.edit.text.label') }}
    </Label>
    <Textarea v-model:model-value="data.text" class="max-h-[10rem] font-mono" />
  </div>
  <Button variant="secondary" @click="fitToContent" class="w-full">
    {{ $t('actions.label.edit.fit-to-content') }}
  </Button>
</template>
