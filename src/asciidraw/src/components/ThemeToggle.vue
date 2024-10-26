<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useColorMode } from '@vueuse/core'
import {LucideSun, LucideMoon, LucideSunMoon} from "lucide-vue-next";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode({ disableTransition: false });
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <Tooltip>
          <TooltipTrigger class="grid place-content-center">
              <LucideSun class="col-[1/1] row-[1/1] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <LucideMoon class="col-[1/1] row-[1/1] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span class="sr-only">Toggle theme</span>
            <TooltipContent>
              Controls the color-scheme of the site
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem class="gap-x-1" @click="mode = 'light'">
        <LucideSun/> Light
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-x-1" @click="mode = 'dark'">
        <LucideMoon/> Dark
      </DropdownMenuItem>
      <DropdownMenuItem class="gap-x-1" @click="mode = 'auto'">
        <LucideSunMoon/> System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
