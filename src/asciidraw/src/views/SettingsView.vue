<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useWebSettings } from "@/composables/useWebSettings.ts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LucideCircleAlert } from "lucide-vue-next";

const settings = useWebSettings();
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
      <Separator />
      <Alert>
        <Switch v-model="settings.devMode" class="float-right" />
        <AlertTitle>
          Dev-Mode
        </AlertTitle>
        <AlertDescription>
          Shows additional information in some parts of the UI.
        </AlertDescription>
      </Alert>
    </div>
  </DefaultLayout>
</template>
