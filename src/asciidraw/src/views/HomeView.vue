<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {LucideTypeOutline} from "lucide-vue-next";
</script>

<template>
  <DefaultLayout>
    <div class="h-[calc(100vh-40px)] grid place-content-center">
      <h1 class="text-center text-4xl">AsciiDraw</h1>
      <LucideTypeOutline class="size-96" />
    </div>
  </DefaultLayout>
</template>
