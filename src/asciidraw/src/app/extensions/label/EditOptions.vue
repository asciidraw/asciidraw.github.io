<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LabelData } from ".";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const { data } = defineProps<{
  data: LabelData,
}>();

function fitToContent(): void {
  const lines = data.text.split("\n");
  data.width = Math.max(1, lines.reduce((prev, curr) => Math.max(curr.length, prev), 0));
  data.height = Math.max(lines.length);
}
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.label.edit.text.label') }}
    </Label>
    <Textarea v-model:model-value="data.text" class="max-h-[10rem] font-mono" />
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox v-model:checked="data.block" />
    <Label>
      {{ $t('actions.label.edit.block.label') }}
    </Label>
  </div>
  <Button variant="secondary" @click="fitToContent" class="w-full">
    {{ $t('actions.label.edit.fit-to-content') }}
  </Button>
</template>
