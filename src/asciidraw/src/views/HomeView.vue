<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {Button} from "@/components/ui/button";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import * as examples from "@/assets/homepage/examples";
import inCodeSrc from "@/assets/homepage/in-code.png?url";
import inEditorSrc from "@/assets/homepage/in-editor.png?url";
import {LucideArrowRight, LucideArrowRightLeft} from "lucide-vue-next";
</script>

<template>
  <DefaultLayout>
    <div class="h-[calc(100vh-10rem)] grid place-content-center text-center">
      <p class="text-muted-foreground">{{ $t('home.dev-notice') }}</p>
      <h1 class="text-4xl font-bold leading-none tracking-wide">AsciiDraw</h1>
      <AsciiDrawIcon class="size-52 sm:size-64 md:size-80 lg:size-96 mx-auto" />
      <router-link :to="{ name: 'app-init' }" class="w-fit mx-auto">
        <Button>{{ $t('home.draw') }}</Button>
      </router-link>
    </div>
    <div class="space-y-16">
      <div class="grid grid-cols-3 place-items-center gap-5 p-5">
        <img :src="inEditorSrc" alt="In Editor" class="max-h-96" />
        <div class="grid place-items-center">
          <LucideArrowRight class="size-10" />
          <p class="text-xl text-center">
            {{ $t('home.in-code.text') }}
          </p>
        </div>
        <img :src="inCodeSrc" alt="In Code" class="max-h-96" />
      </div>
      <div class="grid place-items-center grid-cols-3 gap-5 p-5">
        <pre class="p-2 bg-border rounded-md leading-tight tracking-wide select-all text-xl font-mono">{{ examples.erm_dashed }}</pre>
        <div class="grid place-items-center">
          <LucideArrowRightLeft class="size-10" />
          <p class="text-xl text-center">
            {{ $t('home.comment-styles.text') }}
          </p>
        </div>
        <pre class="p-2 bg-border rounded-md leading-tight tracking-wide select-all text-xl font-mono">{{ examples.erm_slashed }}</pre>
      </div>
    </div>
  </DefaultLayout>
</template>
