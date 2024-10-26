<script setup lang="ts">
import {LucideTypeOutline, LucideHouse, LucideInfo, LucideGithub} from "lucide-vue-next";
import {Separator} from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,1fr,auto]">
    <header>
      <div class="flex p-2 gap-x-2">
        <router-link to="/" class="flex">
          <LucideTypeOutline />
          <span>
            AsciiDraw
          </span>
        </router-link>
        <div class="grow" />
        <ThemeToggle />
        <a target="_blank" href="https://github.com/asciidraw/" rel="noopener noreferrer">
          <LucideGithub />
        </a>
      </div>
      <Separator />
    </header>
    <main class="p-1">
      <slot />
    </main>
    <footer>
      <Separator />
      <div class="grid place-content-center p-2">
        <div class="flex gap-x-2 flex-nowrap">
          <router-link to="/"><LucideHouse class="h-4 inline-block" />Home</router-link>
          <Separator orientation="vertical" />
          <router-link to="/about"><LucideInfo class="h-4 inline-block" />About</router-link>
          <Separator orientation="vertical" />
          <a target="_blank" href="https://github.com/asciidraw/asciidraw.github.io" rel="noopener noreferrer"><LucideGithub class="h-4 inline-block" />GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>
