<script setup lang="ts">
import { useRoute } from "vue-router";
import { watch } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideLoaderCircle } from "lucide-vue-next";

const route = useRoute();

watch(() => route.params, () => {
  const rawData = route.params.data;
  console.log(rawData);
}, { immediate: true });
</script>

<template>
  <DefaultLayout class="grid place-content-center p-5">
    <Alert class="max-w-lg">
      <LucideLoaderCircle class="size-4 animate-spin" />
      <AlertTitle>
        {{ $t('share.alert.title') }}
      </AlertTitle>
      <AlertDescription class="text-muted-foreground">
        {{ $t('share.alert.description') }}
      </AlertDescription>
    </Alert>
  </DefaultLayout>
</template>
