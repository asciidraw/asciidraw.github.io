<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useColorMode, usePreferredDark } from '@vueuse/core'
import {
  LucideSun,
  LucideMoon,
  LucideSunMoon,
  type LucideIcon,
  LucideShell,
  LucideWind,
  LucideCassetteTape, LucideSailboat, LucideSprout, LucideSnowflake
} from "lucide-vue-next";
import IconButton from "@/components/composed/IconButton.vue";

const colorsModes = {
  auto: "auto",
  light: "light",
  dark: "dark",
  bubblegumPop: "bubblegum-pop",
  steampunkCogs: "steampunk-cogs",
  vintageVinyl: "vintage-vinyl",
  mistyHarbor: "misty-harbor",
  zenGarden: "zen-garden",
  winter: "winter",
} as const;

type ColorMode = keyof typeof colorsModes;

const IconMap: Record<ColorMode, LucideIcon | undefined> = {
  auto: LucideSunMoon,
  light: LucideSun,
  dark: LucideMoon,
  bubblegumPop: LucideShell,
  steampunkCogs: LucideWind,
  vintageVinyl: LucideCassetteTape,
  mistyHarbor: LucideSailboat,
  zenGarden: LucideSprout,
  winter: LucideSnowflake,
}

const preferredDark = usePreferredDark();
const colorMode = useColorMode<ColorMode>({
  initialValue: "auto",
  modes: colorsModes,
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <IconButton>
        <div class="grid place-content-center">
          <LucideSun class="col-[1/1] row-[1/1] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LucideMoon class="col-[1/1] row-[1/1] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span class="sr-only">Toggle theme</span>
        </div>
        <template #tooltip>{{ $t('components.theme-toggle.tooltip') }}</template>
      </IconButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="space-y-0.5">
      <template v-for="mode in Object.keys(colorsModes) as ColorMode[]" :key="mode">
        <DropdownMenuItem
          class="gap-x-1 bg-background text-foreground"
          :class="mode === 'auto' ? (preferredDark ? 'dark' : 'light') : colorsModes[mode]"
          @click="colorMode = mode"
        >
          <component :is="IconMap[mode]" class="text-primary" />
          {{ $t(`components.theme-toggle.mode.${mode}`) }}
          <div class="w-1" />
          <DropdownMenuShortcut v-if="colorMode === mode">&bullet;</DropdownMenuShortcut>
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
