<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideCircleAlert } from "lucide-vue-next";

</script>

<template>
  <DefaultLayout class="p-2">
    <div class="max-w-screen-md mx-auto space-y-2">
      <Alert variant="warning">
        <LucideCircleAlert class="size-4" />
        <AlertTitle>
          Important
        </AlertTitle>
        <AlertDescription>
          Settings are (as of now) not meant to be accessed.
        </AlertDescription>
      </Alert>
    </div>
  </DefaultLayout>
</template>
