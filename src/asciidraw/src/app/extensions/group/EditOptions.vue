<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as styles from "./styles.ts";
import type { GroupData } from ".";
import {Input} from "@/components/ui/input";

defineProps<{
  data: GroupData,
}>();
</script>

<template>
  <div>
    <Label>
      Label
    </Label>
    <Input v-model:model-value.trim="data.label" />
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
