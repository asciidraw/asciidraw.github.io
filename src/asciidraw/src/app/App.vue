<script setup lang="ts">
import AppMenu from "@/app/FloatingMenu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/ContextMenuHandler.vue";
</script>

<template>
  <AppMenu />
  <ContextMenuHandler disabled>
    <AppCanvas />
  </ContextMenuHandler>
</template>
