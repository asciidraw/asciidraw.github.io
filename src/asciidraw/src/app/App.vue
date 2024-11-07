<script setup lang="ts">
import AppMenu from "@/app/Menu.vue";
import AppCanvas from "@/app/Canvas.vue";
import ContextMenuHandler from "@/app/AppContextMenuHandler.vue";
</script>

<template>
  <AppMenu />
  <ContextMenuHandler disabled>
    <AppCanvas />
  </ContextMenuHandler>
</template>
