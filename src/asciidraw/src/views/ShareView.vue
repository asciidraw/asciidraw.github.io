<script setup lang="ts">
import { useRouter } from "vue-router";
import { watch } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideLoaderCircle } from "lucide-vue-next";
import { loadProjectData } from "@/lib";

const router = useRouter();

watch(() => router.currentRoute.value.params, () => {
  const rawData = router.currentRoute.value.params.data as string;
  const parsed = loadProjectData(rawData);
  console.warn({parsed, todo: "Process this"});
  router.push({ name: "app" });
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
