<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { ElementsData } from "@/types";
import { boxStyles } from "@/lib/styles";

defineProps<{
  data: ElementsData.Box,
}>();
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.box.edit.style.label') }}
    </Label>
    <Select v-model="data.style">
      <SelectTrigger>
        <SelectValue>
          {{ $t(`actions.box.edit.style.style-names.${data.style}`) }}
          <Badge variant="secondary" class="ml-1">
            <pre>{{ boxStyles[data.style].topLeft }}{{ boxStyles[data.style].top.repeat(3) }}{{ boxStyles[data.style].topRight }}</pre>
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <template v-for="[styleId, style] in Object.entries(boxStyles)" :key="styleId">
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
