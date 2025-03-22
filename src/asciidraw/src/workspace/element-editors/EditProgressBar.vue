<script setup lang="ts">
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Badge from "../../components/ui/badge/Badge.vue";
import type { ElementsData } from "@/types";
import { progressBarStyles } from "@/lib/styles";
import { useId } from "@vue/runtime-core";

const props = defineProps<{
  data: ElementsData.ProgressBar,
}>();

const MIN_VALUE = 0;
const MAX_VALUE = 100;

function handleValueInputWheel(event: WheelEvent) {
  const factor = event.shiftKey ? 5 : 1;
  if(event.deltaY < 0) {
    props.data.value = Math.min(props.data.value + factor, MAX_VALUE);
  } else if (event.deltaY > 0) {
    props.data.value = Math.max(props.data.value - factor, MIN_VALUE);
  }
}

const idShowValue = useId();
</script>

<template>
  <div>
    <Label>
      {{ $t('actions.progress-bar.edit.value.label') }}
    </Label>
    <Input type="number" :min="MIN_VALUE" :max="MAX_VALUE" v-model.number="data.value" @wheel.prevent="handleValueInputWheel" class="invalid:border-destructive" />
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
        <SelectValue />
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
