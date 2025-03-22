<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ElementsData } from "@/types";

const { data } = defineProps<{
  data: ElementsData.Label,
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
    <Textarea v-model="data.text" class="max-h-[10rem] font-mono" />
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox v-model="data.block" />
    <Label>
      {{ $t('actions.label.edit.block.label') }}
    </Label>
  </div>
  <div>
    <Label>
      {{ $t('actions.label.edit.alignment.label') }}
    </Label>
    <div class="mx-auto w-fit">
      <RadioGroup class="grid grid-cols-3 gap-3" v-model="data.alignment">
        <RadioGroupItem value="tl" />
        <RadioGroupItem value="tc" />
        <RadioGroupItem value="tr" />
        <RadioGroupItem value="ml" />
        <RadioGroupItem value="mc" />
        <RadioGroupItem value="mr" />
        <RadioGroupItem value="bl" />
        <RadioGroupItem value="bc" />
        <RadioGroupItem value="br" />
      </RadioGroup>
    </div>
  </div>
  <Button variant="secondary" @click="fitToContent" class="w-full">
    {{ $t('actions.label.edit.fit-to-content') }}
  </Button>
</template>
