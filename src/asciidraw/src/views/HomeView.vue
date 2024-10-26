<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {LucideTypeOutline} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
</script>

<template>
  <DefaultLayout>
    <div class="h-[calc(100vh-40px)] grid place-content-center text-center">
      <p class="text-muted-foreground">Note: This app is under development</p>
      <h1 class="text-4xl">AsciiDraw</h1>
      <LucideTypeOutline class="size-96" />
      <router-link to="/app" class="w-fit mx-auto">
        <Button>
          Draw Something
        </Button>
      </router-link>
    </div>
  </DefaultLayout>
</template>
