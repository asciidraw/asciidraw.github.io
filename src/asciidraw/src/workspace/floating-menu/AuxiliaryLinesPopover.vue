<script setup lang="ts">
import { LucideEqual, LucideEqualNot } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/composed/IconButton.vue";
import { computed, inject } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT } from "@/symbols.ts";
import { useI18n } from "vue-i18n";
import { StorageSerializers, syncRef, useLocalStorage } from "@vueuse/core";

const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const { t } = useI18n();

const drawContextAuxiliaryLines = computed({
  get: () => drawContext.value.auxiliaryLines,
  set: (value) => { drawContext.value.auxiliaryLines = value },
});
const storageAuxiliaryLines = useLocalStorage<number | undefined>("auxiliary-lines", undefined, { serializer: StorageSerializers.number });
// two-way synced storage and draw-context
syncRef(storageAuxiliaryLines, drawContextAuxiliaryLines);

type Entry = [() => string, undefined | number];

const entries: Entry[] = [
  [() => t('workspace.menu.project.auxiliary-lines.off'), undefined],
  [() => '80', 80],
  [() => '120', 120],
];
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <IconButton>
        <component :is="storageAuxiliaryLines === undefined ? LucideEqualNot : LucideEqual" class="rotate-90" />
        <template #tooltip>{{ $t('workspace.menu.project.auxiliary-lines.tooltip') }}</template>
      </IconButton>
    </PopoverTrigger>
    <PopoverContent class="flex gap-x-2 w-fit">
      <template v-for="[label, value] in entries" :key="value">
        <Button
          :variant="storageAuxiliaryLines === value ? 'secondary' : 'outline'"
          @click="() => { storageAuxiliaryLines = value }"
        >
          {{ label() }}
        </Button>
      </template>
    </PopoverContent>
  </Popover>
</template>
