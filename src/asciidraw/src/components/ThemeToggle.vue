<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useColorMode } from '@vueuse/core'
import {LucideSun, LucideMoon, LucideSunMoon} from "lucide-vue-next";
import IconButton from "@/components/composed/IconButton.vue";

const mode = useColorMode({ initialValue: "auto" });
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
    <DropdownMenuContent align="end">
      <DropdownMenuItem class="gap-x-1" @click="mode = 'light'">
        <LucideSun/> {{ $t('components.theme-toggle.mode.light') }}
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-x-1" @click="mode = 'dark'">
        <LucideMoon/> {{ $t('components.theme-toggle.mode.dark') }}
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-x-1" @click="mode = 'auto'">
        <LucideSunMoon/> {{ $t('components.theme-toggle.mode.system') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
