<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as styles from "./styles.ts";
import type { ProgressBarData } from ".";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

defineProps<{
  data: ProgressBarData,
}>();
</script>

<template>
  <div>
    <Label>Value</Label>
    <Input type="number" min="0" max="100" v-model:model-value.number="data.value" class="invalid:border-destructive" />
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox v-model:checked="data.showValue" />
    <Label>
      Show Value
    </Label>
  </div>
  <div>
    <Label>
      Style
    </Label>
    <Select v-model:model-value="data.style">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <template v-for="styleId in Object.keys(styles)" :key="styleId">
          <SelectItem :value="styleId">
            {{ styleId }}
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
  </div>
</template>
