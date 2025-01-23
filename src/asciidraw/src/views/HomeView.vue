<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {Button} from "@/components/ui/button";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import * as examples from "./examples";
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
    <div>
      <h2 class="text-2xl font-semibold leading-none tracking-tight text-center">
        {{ $t('home.examples.header') }}
      </h2>
      <div class="grid place-items-center grid-cols-2 gap-5 p-5">
        <template v-for="([id, rendered], i) in Object.entries(examples)">
          <div v-if="i % 2 === 0">
            {{ $t(`home.examples.example.${id}`) }}
          </div>
          <pre class="bg-accent rounded-md p-2 leading-none select-all">{{ rendered }}</pre>
          <div v-if="i % 2 === 1">
            {{ $t(`home.examples.example.${id}`) }}
          </div>
        </template>
      </div>
    </div>
  </DefaultLayout>
</template>
