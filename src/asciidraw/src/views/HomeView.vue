<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {Button} from "@/components/ui/button";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
</script>

<template>
  <DefaultLayout>
    <div class="h-full grid place-content-center text-center">
      <p class="text-muted-foreground">{{ $t('home.dev-notice') }}</p>
      <h1 class="text-4xl">AsciiDraw</h1>
      <AsciiDrawIcon class="size-52 sm:size-64 md:size-80 lg:size-96 mx-auto" />
      <router-link to="/app" class="w-fit mx-auto">
        <Button>{{ $t('home.draw') }}</Button>
      </router-link>
    </div>
  </DefaultLayout>
</template>
