<script setup lang="ts">
import { LucideEqual, LucideEqualNot } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/composed/IconButton.vue";
import { inject } from "vue";
import { INJECTION_KEY_DRAW_CONTEXT } from "@/symbols.ts";
import { useI18n } from "vue-i18n";

const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const { t } = useI18n();

type Entry = [() => string, undefined | number];

const entries: Entry[] = [
  [() => t('app.menu.project.auxiliary-lines.off'), undefined],
  [() => '80', 80],
  [() => '120', 120],
]

</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <IconButton>
        <component :is="drawContext.auxiliaryLines === undefined ? LucideEqualNot : LucideEqual" class="rotate-90" />
        <template #tooltip>{{ $t('app.menu.project.auxiliary-lines.tooltip') }}</template>
      </IconButton>
    </PopoverTrigger>
    <PopoverContent class="flex gap-x-2 w-fit">
      <template v-for="[label, value] in entries" :key="value">
        <Button
          :variant="drawContext.auxiliaryLines === value ? 'secondary' : 'outline'"
          @click="() => { drawContext.auxiliaryLines = value }"
        >
          {{ label() }}
        </Button>
      </template>
    </PopoverContent>
  </Popover>
</template>
