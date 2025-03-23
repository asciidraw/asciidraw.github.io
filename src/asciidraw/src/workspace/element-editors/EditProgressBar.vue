<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Badge from "../../components/ui/badge/Badge.vue";
import type { ElementsData } from "@/types";
import { progressBarStyles } from "@/lib/styles";
import { useId } from "@vue/runtime-core";

defineProps<{
  data: ElementsData.ProgressBar,
}>();

const idShowValue = useId();
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.progress-bar.edit.value.label') }}
    </Label>
    <Input type="number" :min="0" :max="100" v-model.number="data.value" class="invalid:border-destructive" />
  </div>
  <div class="flex items-center space-x-2">
    <Checkbox :id="idShowValue" v-model="data.showValue" />
    <Label :for="idShowValue">
      {{ $t('actions.progress-bar.edit.show-value.label') }}
    </Label>
  </div>
  <div>
    <Label>
      {{ $t('actions.progress-bar.edit.style.label') }}
    </Label>
    <Select v-model="data.style">
      <SelectTrigger>
        <SelectValue>
          {{ $t(`actions.progress-bar.edit.style.style-names.${data.style}`) }}
          <Badge variant="secondary" class="ml-1 font-mono">
            <pre>{{ progressBarStyles[data.style].leftWall }}{{ progressBarStyles[data.style].fullBar.repeat(3) }}{{ progressBarStyles[data.style].emptyBar.repeat(2) }}{{ progressBarStyles[data.style].rightWall }}</pre>
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <template v-for="[styleId, style] in Object.entries(progressBarStyles)" :key="styleId">
          <SelectItem :value="styleId">
            {{ $t(`actions.progress-bar.edit.style.style-names.${styleId}`) }}
            <Badge variant="secondary" class="ml-1 font-mono">
              <pre>{{ style.leftWall }}{{ style.fullBar.repeat(3) }}{{ style.emptyBar.repeat(2) }}{{ style.rightWall }}</pre>
            </Badge>
          </SelectItem>
        </template>
      </SelectContent>
    </Select>
  </div>
</template>
