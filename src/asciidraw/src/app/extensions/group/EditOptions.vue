<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as styles from "./styles.ts";
import type { GroupData } from ".";
import {Input} from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

defineProps<{
  data: GroupData,
}>();
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.group.edit.label.label') }}
    </Label>
    <Input v-model:model-value.trim="data.label" />
  </div>
  <div>
    <Label>
      {{ $t('actions.group.edit.style.label') }}
    </Label>
    <Select v-model:model-value="data.style">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <template v-for="[styleId, style] in Object.entries(styles)" :key="styleId">
          <SelectItem :value="styleId">
            {{ $t(`actions.group.edit.style.style-names.${styleId}`) }}
            <Badge variant="secondary" class="ml-1">
              <pre>{{ style.topLeft }}Group{{ style.top.repeat(3) }}{{ style.topRight }}</pre>
            </Badge>
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
  </div>
</template>
