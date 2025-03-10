<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {Button} from "@/components/ui/button";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import inCodeSrc from "@/assets/homepage/in-code.png?url";
import inEditorSrc from "@/assets/homepage/in-editor.png?url";
import {
  LucideArrowRight,
  LucideArrowRightLeft,
  LucideBookType, LucideClipboard, LucideImage, LucideList,
  LucidePencilRuler,
  LucideSwatchBook, LucideTangent
} from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import HomePageTourGuide from "@/components/guides/HomePageTourGuide.vue";
</script>

<template>
  <DefaultLayout>
    <template #headerIcons>
      <HomePageTourGuide />
    </template>
    <div class="h-[calc(100vh-16rem)] grid place-content-center gap-1 text-center">
      <p class="text-muted-foreground">{{ $t('home.dev-notice') }}</p>
      <h1 class="text-4xl font-bold leading-none tracking-wide">AsciiDraw</h1>
      <AsciiDrawIcon class="size-52 sm:size-64 md:size-80 lg:size-96 mx-auto" />
      <router-link data-tour="draw-something" :to="{ name: 'app-init', query: { autoRedirect: 'true' } }" class="w-fit mx-auto">
        <Button size="lg" class="text-lg gap-x-0.5 shadow-lg shadow-shadow">
          <LucidePencilRuler />
          {{ $t('home.draw') }}
        </Button>
      </router-link>
    </div>
    <div class="space-y-16 pb-16">
      <div class="grid grid-cols-[repeat(3,1fr)] gap-2 w-fit mx-auto">
        <router-link data-tour="project-list" :to="{ name: 'app-init' }">
          <Button variant="secondary" class="size-full gap-x-0.5 shadow-md shadow-shadow">
            <LucideList class="size-6" />
            {{ $t('home.links.project-list') }}
          </Button>
        </router-link>
        <router-link data-tour="documentation" :to="{ name: 'docs' }">
          <Button variant="secondary" class="size-full gap-x-0.5 shadow-md shadow-shadow">
            <LucideBookType />
            {{ $t('home.links.docs') }}
          </Button>
        </router-link>
        <router-link data-tour="example-projects" :to="{ name: 'example-projects' }">
          <Button variant="secondary" class="size-full gap-x-0.5 shadow-md shadow-shadow">
            <LucideSwatchBook />
            {{ $t('home.links.example-projects') }}
          </Button>
        </router-link>
      </div>
      <div class="grid grid-cols-3 place-items-center gap-5 p-5">
        <img :src="inEditorSrc" alt="In Editor" class="max-h-96 rounded-lg shadow-md shadow-shadow" />
        <div class="grid place-items-center">
          <LucideArrowRight class="size-10" />
          <p class="text-sm sm:text-md md:text-lg lg:text-xl text-center">
            {{ $t('home.in-code.text') }}
          </p>
        </div>
        <img :src="inCodeSrc" alt="In Code" class="max-h-96 rounded-lg shadow-md shadow-shadow" />
      </div>
      <div class="grid place-content-center grid-cols-3 gap-5 p-5">
        <div v-once class="grid place-items-center">
          <div class="h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314 164" fill="currentColor" stroke="currentColor" class="w-full max-h-96 p-2 bg-border rounded-md shadow-md shadow-shadow">
              <text x="4" y="4" font-family="monospace" font-size="16" xml:space="preserve" style="white-space: pre" text-anchor="start" direction="ltr" letter-spacing="normal" font-size-adjust="none">
                <tspan x="4" dy="1.0em">{{ "-- ┌──────────┐     ┌──────────┐" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "-- │ Artist   │     │ Album    │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "-- │          │◂───▸│          │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "-- │ArtistId  │     │AlbumId   │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "-- │Name      │     │Title     │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "-- └──────────┘     │ArtistId  │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "--                  └──────────┘" }}</tspan>
              </text>
            </svg>
            <div class="flex gap-0.5 flex-wrap py-1">
              <Badge v-for="lang in ['SQL', 'Haskell', 'Lua']" variant="secondary" class="shadow-md shadow-shadow">{{ lang }}</Badge>
            </div>
          </div>
        </div>
        <div class="grid place-items-center m-auto">
          <LucideArrowRightLeft class="size-10" />
          <p class="text-sm sm:text-md md:text-lg lg:text-xl text-center">
            {{ $t('home.comment-styles.text') }}
          </p>
        </div>
        <div v-once class="grid place-items-center">
          <div class="h-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314 164" fill="currentColor" stroke="currentColor" class="w-full max-h-96 p-2 bg-border rounded-md shadow-md shadow-shadow">
              <text x="4" y="4" font-family="monospace" font-size="16" xml:space="preserve" style="white-space: pre" text-anchor="start" direction="ltr" letter-spacing="normal" font-size-adjust="none">
                <tspan x="4" dy="1.0em">{{ "// ┌──────────┐     ┌──────────┐" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "// │ Artist   │     │ Album    │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "// │          │◂───▸│          │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "// │ArtistId  │     │AlbumId   │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "// │Name      │     │Title     │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "// └──────────┘     │ArtistId  │" }}</tspan>
                <tspan x="4" dy="1.4em">{{ "//                  └──────────┘" }}</tspan>
              </text>
            </svg>
            <div class="flex gap-0.5 flex-wrap py-1">
              <Badge v-for="lang in ['C/C++', 'Java', 'JavaScript', 'C#', 'Rust', 'PHP']" variant="secondary" class="shadow-md shadow-shadow">{{ lang }}</Badge>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="text-sm sm:text-md md:text-lg lg:text-xl text-center">
          {{ $t('home.export-variants.text') }}
        </p>
        <div class="max-w-screen-md mx-auto grid place-items-center grid-cols-3 gap-5 p-5">
          <div class="size-full grid place-items-center">
            <LucideClipboard class="size-full max-h-16 text-primary" />
            <p class="text-muted-foreground text-sm font-bold">
              {{ $t('home.export-variants.as-text') }}
            </p>
          </div>
          <div class="size-full grid place-items-center">
            <LucideImage class="size-full max-h-16 text-primary" />
            <p class="text-muted-foreground text-sm font-bold">
              {{ $t('home.export-variants.as-image') }}
            </p>
          </div>
          <div class="size-full grid place-items-center">
            <LucideTangent class="size-full max-h-16 text-primary" />
            <p class="text-muted-foreground text-sm font-bold">
              {{ $t('home.export-variants.as-svg') }}
            </p>
          </div>
        </div>
      </div>
      <div class="grid place-items-center">
        <router-link data-tour="draw-something" :to="{ name: 'app-init', query: { autoRedirect: 'true' } }" class="w-fit mx-auto">
          <Button size="lg" class="text-lg gap-x-0.5 shadow-lg shadow-shadow">
            <LucidePencilRuler />
            {{ $t('home.try-out') }}
          </Button>
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>
