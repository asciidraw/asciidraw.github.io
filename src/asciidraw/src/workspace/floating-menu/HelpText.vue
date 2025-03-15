<script setup lang="ts">
import AppTourGuide from "@/components/guides/AppTourGuide.vue";
import { Button } from "@/components/ui/button";
</script>

<template>
  <div>
    <i18n-t keypath="workspace.menu.help.text" tag="p">
      <router-link :to="{ name: 'docs' }">
        <Button variant="link" size="auto">
          {{ $t('workspace.menu.help.docs-link') }}
        </Button>
      </router-link>
      <AppTourGuide />
    </i18n-t>
  </div>
</template>
