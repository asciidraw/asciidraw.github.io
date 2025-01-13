<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as styles from "./styles.ts";
import type { BoxData } from ".";

defineProps<{
  data: BoxData,
}>();
</script>

<template>
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
