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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const colorsModes = {
  auto: "auto",
  light: "light",
  dark: "dark",
  lightBubblegumPop: "light-bubblegum-pop",
  darkBubblegumPop: "dark-bubblegum-pop",
  lightSteampunkCogs: "light-steampunk-cogs",
  darkSteampunkCogs: "dark-steampunk-cogs",
  lightVintageVinyl: "light-vintage-vinyl",
  darkVintageVinyl: "dark-vintage-vinyl",
  lightMistyHarbor: "light-misty-harbor",
  darkMistyHarbor: "dark-misty-harbor",
  lightZenGarden: "light-zen-garden",
  darkZenGarden: "dark-zen-garden",
  lightWinter: "light-winter",
  darkWinter: "dark-winter",
} as const;

type ColorMode = keyof typeof colorsModes;

const IconMap: Record<ColorMode, LucideIcon | undefined> = {
  auto: LucideSunMoon,
  light: LucideSun,
  dark: LucideMoon,
  lightBubblegumPop: LucideShell,
  darkBubblegumPop: LucideShell,
  lightSteampunkCogs: LucideWind,
  darkSteampunkCogs: LucideWind,
  lightVintageVinyl: LucideCassetteTape,
  darkVintageVinyl: LucideCassetteTape,
  lightMistyHarbor: LucideSailboat,
  darkMistyHarbor: LucideSailboat,
  lightZenGarden: LucideSprout,
  darkZenGarden: LucideSprout,
  lightWinter: LucideSnowflake,
  darkWinter: LucideSnowflake,
}

const preferredDark = usePreferredDark();
const colorMode = useColorMode<ColorMode>({
  initialValue: "auto",
  modes: colorsModes,
  emitAuto: true,  // todo: replace
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
      <DropdownMenuItem
        class="gap-x-1 bg-background text-foreground"
        :class="preferredDark ? 'dark' : 'light'"
        @click="colorMode = 'auto'"
      >
        <component :is="LucideSunMoon" class="text-primary" />
        {{ $t(`components.theme-toggle.mode.auto`) }}
        <div class="w-1" />
        <DropdownMenuShortcut v-if="colorMode === 'auto'">&bullet;</DropdownMenuShortcut>
      </DropdownMenuItem>
      <Tabs :default-value="colorMode.startsWith('light') ? 'light' : 'dark'">
        <TabsList class="w-full grid grid-cols-2">
          <TabsTrigger value="light">
            <LucideSun />
          </TabsTrigger>
          <TabsTrigger value="dark">
            <LucideMoon />
          </TabsTrigger>
        </TabsList>
        <template v-for="scheme in ['light', 'dark']">
          <TabsContent :value="scheme" class="space-y-0.5">
            <template v-for="mode in Object.keys(colorsModes) as ColorMode[]" :key="mode">
              <DropdownMenuItem
                v-if="mode.startsWith(scheme)"
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
          </TabsContent>
        </template>
      </Tabs>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
