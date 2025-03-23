<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { ElementsData } from "@/types";
import { groupStyles } from "@/lib/styles";
import type { GroupStyle } from "@/lib/styles/group.ts";

defineProps<{
  data: ElementsData.Group,
}>();

function getStylePreviewText(style: GroupStyle): string {
  return `${style.topLeft}Group${style.top.repeat(3)}${style.topRight}`;
}
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.group.edit.label.label') }}
    </Label>
    <Input v-model.trim="data.label" />
  </div>
  <div>
    <Label>
      {{ $t('actions.group.edit.style.label') }}
    </Label>
    <Select v-model="data.style">
      <SelectTrigger>
        <SelectValue>
          {{ $t(`actions.group.edit.style.style-names.${data.style}`) }}
          <Badge variant="secondary" class="ml-1">
            <pre>{{ getStylePreviewText(groupStyles[data.style]) }}</pre>
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <template v-for="[styleId, style] in Object.entries(groupStyles)" :key="styleId">
          <SelectItem :value="styleId">
            {{ $t(`actions.group.edit.style.style-names.${styleId}`) }}
            <Badge variant="secondary" class="ml-1">
              <pre>{{ getStylePreviewText(style) }}</pre>
            </Badge>
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
  </div>
</template>
