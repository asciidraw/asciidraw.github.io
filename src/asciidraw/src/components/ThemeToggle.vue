<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useColorMode } from '@vueuse/core'
import {LucideSun, LucideMoon} from "lucide-vue-next";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({ disableTransition: false });
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="p-0 grid place-content-center size-6">
        <LucideMoon class="col-[1/1] row-[1/1] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <LucideSun class="col-[1/1] row-[1/1] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
