<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { usePreferredDark } from '@vueuse/core'
import {
  LucideSun,
  LucideMoon,
  LucideSunMoon,
} from "lucide-vue-next";
import IconButton from "@/components/composed/IconButton.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { colorModes, useConfiguredColorMode } from "@/composables/useConfiguredColorMode.ts";

const preferredDark = usePreferredDark();
const { store: colorMode } = useConfiguredColorMode();
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
        :class="preferredDark ? 'dark theme-dark' : 'light theme-light'"
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
        <template v-for="themePrefix in ['light', 'dark']">
          <TabsContent :value="themePrefix" class="mt-0.5 space-y-0.5">
            <template v-for="mode in colorModes" :key="mode.id">
              <DropdownMenuItem
                v-if="mode.id.startsWith(themePrefix)"
                class="gap-x-1 bg-background text-foreground"
                :class="mode.classNames"
                @click="colorMode = mode.id"
              >
                <component :is="mode.icon" class="text-primary" />
                {{ $t(`components.theme-toggle.mode.${mode.id}`) }}
                <div class="w-1" />
                <DropdownMenuShortcut v-if="colorMode === mode.id">&bullet;</DropdownMenuShortcut>
              </DropdownMenuItem>
            </template>
          </TabsContent>
        </template>
      </Tabs>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
