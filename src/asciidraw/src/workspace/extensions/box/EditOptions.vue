<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as styles from "./styles.ts";
import type { BoxData } from ".";
import { Badge } from "@/components/ui/badge";

defineProps<{
  data: BoxData,
}>();
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.box.edit.style.label') }}
    </Label>
    <Select v-model:model-value="data.style">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <template v-for="[styleId, style] in Object.entries(styles)" :key="styleId">
          <SelectItem :value="styleId">
            {{ $t(`actions.box.edit.style.style-names.${styleId}`) }}
            <Badge variant="secondary" class="ml-1">
              <pre>{{ style.topLeft }}{{ style.top.repeat(3) }}{{ style.topRight }}</pre>
            </Badge>
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
  </div>
</template>
