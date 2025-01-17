<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { loadProjectData, storeProjectData } from "@/lib";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const router = useRouter();

const parsedRouteValue = computed(() => {
  const rawData = router.currentRoute.value.params.data as string;
  const decoded = atob(rawData);
  return loadProjectData(decoded);
});

function importProject() {
  localStorage.setItem("project", storeProjectData(parsedRouteValue.value));
  router.push("/app");
}
</script>

<template>
  <DefaultLayout class="grid place-content-center p-5">
    <Card class="max-w-lg">
      <CardHeader>
        <CardTitle>
          {{ $t('share.title') }}
        </CardTitle>
        <CardDescription class="text-muted-foreground">
          {{ $t('share.description') }}
        </CardDescription>
      </CardHeader>
      <CardFooter class="flex justify-between ">
        <Button variant="secondary" @click="() => $router.push('/')">
          {{ $t('app.dialog.common.cancel') }}
        </Button>
        <Button @click="importProject">
          {{ $t('share.import') }}
        </Button>
      </CardFooter>
    </Card>
  </DefaultLayout>
</template>
