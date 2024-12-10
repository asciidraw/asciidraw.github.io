<script setup lang="ts">
import {LucideTypeOutline, LucideHouse, LucideInfo, LucideGithub} from "lucide-vue-next";
import {Separator} from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle.vue";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,1fr,auto]">
    <header>
      <div class="flex p-2 gap-x-2">
        <router-link to="/" class="flex">
          <LucideTypeOutline />
          <span>AsciiDraw</span>
        </router-link>
        <div class="grow" />
        <LocaleToggle />
        <Separator orientation="vertical" class="h-6" />
        <ThemeToggle />
        <Separator orientation="vertical" class="h-6" />
        <IconButton>
          <a target="_blank" href="https://github.com/asciidraw/" rel="noopener noreferrer">
            <LucideGithub />
          </a>
          <template #tooltip>{{ $t('layout.header.github.tooltip') }}</template>
        </IconButton>
      </div>
      <Separator />
    </header>
    <main :class="cn('p-1', props.class)">
      <slot />
    </main>
    <footer>
      <Separator />
      <div class="grid place-content-center p-2">
        <div class="flex gap-x-2 flex-nowrap">
          <router-link to="/">
            <LucideHouse class="h-4 inline" /> {{ $t('layout.footer.home') }}
          </router-link>
          <Separator orientation="vertical" />
          <router-link to="/about">
            <LucideInfo class="h-4 inline" /> {{ $t('layout.footer.about') }}
          </router-link>
          <Separator orientation="vertical" />
          <a target="_blank" href="https://github.com/asciidraw/asciidraw.github.io" rel="noopener noreferrer">
            <LucideGithub class="h-4 inline" /> {{ $t('layout.footer.github') }}
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
