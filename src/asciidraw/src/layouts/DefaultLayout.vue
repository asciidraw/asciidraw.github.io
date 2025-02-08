<script setup lang="ts">
import { LucideHouse, LucideInfo, LucideGithub, LucideBookType } from "lucide-vue-next";
import {Separator} from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle.vue";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import IssueDialog from "@/components/IssueDialog.vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();

defineSlots<{
  headerIcons(): any
}>();
</script>

<template>
  <div class="min-h-screen w-screen grid grid-rows-[auto,1fr,auto]">
    <header class="sticky top-0 bg-background">
      <div class="flex p-2 gap-x-2">
        <router-link to="/" class="flex gap-0.5">
          <AsciiDrawIcon />
          <span>AsciiDraw</span>
        </router-link>
        <div class="grow" />
        <template v-if="$slots.headerIcons" v-for="(child, index) in $slots.headerIcons()">
          <component :is="child" />
          <Separator orientation="vertical" class="h-6" />
        </template>
        <IssueDialog />
        <Separator orientation="vertical" class="h-6" />
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
    <footer class="sticky bottom-0 bg-background">
      <Separator />
      <div class="p-2">
        <div class="flex gap-x-2 flex-nowrap justify-evenly xs:justify-center">
          <router-link :to="{ name: 'home' }" class="">
            <LucideHouse class="h-4 inline" />
            <span class="hidden xs:inline">{{ $t('layout.footer.home') }}</span>
          </router-link>
          <Separator orientation="vertical" class="h-6" />
          <router-link :to="{ name: 'docs', params: { path: [''] } }" class="">
            <LucideBookType class="h-4 inline" />
            <span class="hidden xs:inline">{{ $t('layout.footer.docs') }}</span>
          </router-link>
          <Separator orientation="vertical" class="h-6" />
          <router-link :to="{ name: 'about' }" class="">
            <LucideInfo class="h-4 inline" />
            <span class="hidden xs:inline">{{ $t('layout.footer.about') }}</span>
          </router-link>
          <Separator orientation="vertical" class="h-6" />
          <a target="_blank" href="https://github.com/asciidraw/asciidraw.github.io" rel="noopener noreferrer" class="">
            <LucideGithub class="h-4 inline" />
            <span class="hidden xs:inline">{{ $t('layout.footer.github') }}</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
