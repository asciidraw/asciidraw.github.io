<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LabelData } from ".";

defineProps<{
  data: LabelData,
}>();
</script>

<template>
  <div>
    <Label>
      Text
    </Label>
    <Textarea v-model:model-value="data.text" class="max-h-[10rem]" />
  </div>
</template>
