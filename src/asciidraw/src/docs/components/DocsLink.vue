<script setup lang="ts">
import type { RouterLinkProps } from "vue-router";
import { type AnchorHTMLAttributes, computed } from "vue";

const props = defineProps<RouterLinkProps>();

const isExternalLink = computed(() => {
  if (typeof props.to !== "string") return false;
  try { new URL(props.to); return true; }
  catch (e) { return false; }
});
</script>

<template>
  <a v-if="isExternalLink" v-bind="$props as AnchorHTMLAttributes" :href="props.to as string" rel="noopener noreferrer" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="props">
    <slot />
  </router-link>
</template>
