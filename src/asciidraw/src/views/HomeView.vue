<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {Button} from "@/components/ui/button";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import * as examples from "@/assets/homepage/examples";
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
        <Button size="lg" class="text-lg gap-x-0.5">
          <LucidePencilRuler />
          {{ $t('home.draw') }}
        </Button>
      </router-link>
    </div>
    <div class="space-y-16 pb-16">
      <div class="grid grid-cols-[repeat(3,1fr)] gap-2 w-fit mx-auto">
        <router-link data-tour="project-list" :to="{ name: 'app-init' }">
          <Button variant="secondary" class="size-full gap-x-0.5">
            <LucideList class="size-6" />
            {{ $t('home.links.project-list') }}
          </Button>
        </router-link>
        <router-link data-tour="documentation" :to="{ name: 'docs' }">
          <Button variant="secondary" class="size-full gap-x-0.5">
            <LucideBookType />
            {{ $t('home.links.docs') }}
          </Button>
        </router-link>
        <router-link data-tour="example-projects" :to="{ name: 'example-projects' }">
          <Button variant="secondary" class="size-full gap-x-0.5">
            <LucideSwatchBook />
            {{ $t('home.links.example-projects') }}
          </Button>
        </router-link>
      </div>
      <div class="grid grid-cols-3 place-items-center gap-5 p-5">
        <img :src="inEditorSrc" alt="In Editor" class="max-h-96 rounded-lg shadow-md shadow-black" />
        <div class="grid place-items-center">
          <LucideArrowRight class="size-10" />
          <p class="text-sm sm:text-md md:text-lg lg:text-xl text-center">
            {{ $t('home.in-code.text') }}
          </p>
        </div>
        <img :src="inCodeSrc" alt="In Code" class="max-h-96 rounded-lg shadow-md shadow-black/50" />
      </div>
      <div class="grid place-items-center grid-cols-3 gap-5 p-5">
        <div>
          <pre class="p-2 bg-border rounded-md shadow-md shadow-black/50 leading-tight tracking-wide text-sm sm:text-md md:text-lg lg:text-xl font-mono">{{ examples.erm_dashed }}</pre>
          <div class="flex gap-0.5 flex-wrap py-1">
            <Badge v-for="lang in ['SQL', 'Haskell', 'Lua']" v-once variant="secondary" class="shadow-black shadow-md">{{ lang }}</Badge>
          </div>
        </div>
        <div class="grid place-items-center">
          <LucideArrowRightLeft class="size-10" />
          <p class="text-sm sm:text-md md:text-lg lg:text-xl text-center">
            {{ $t('home.comment-styles.text') }}
          </p>
        </div>
        <div>
          <pre class="p-2 bg-border rounded-md shadow-md shadow-black/50 leading-tight tracking-wide text-sm sm:text-md md:text-lg lg:text-xl font-mono">{{ examples.erm_slashed }}</pre>
          <div class="flex gap-0.5 flex-wrap py-1">
            <Badge v-for="lang in ['C/C++', 'Java', 'JavaScript', 'C#', 'Rust', 'PHP']" v-once variant="secondary" class="shadow-black shadow-md">{{ lang }}</Badge>
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
          <Button size="lg" class="text-lg gap-x-0.5">
            <LucidePencilRuler />
            {{ $t('home.try-out') }}
          </Button>
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>
