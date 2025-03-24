<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { DEFAULT_SETTINGS, useWebSettings } from "@/composables/useWebSettings.ts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LucideCircleAlert, LucideListRestart } from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <Alert>
        <Switch v-model="settings.simpleThemeIcon" class="float-right" />
        <AlertTitle>
          Simple Theme-Icon
        </AlertTitle>
        <AlertDescription>
          Instead of using the icon of the active theme, there is a simple icon for light vs dark.
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertTitle>
          Command History
        </AlertTitle>
        <AlertDescription>
          Number of recently used commands that should be shown when opening the command-palette. (Use 0 to disable)
        </AlertDescription>
        <div class="relative mt-1">
          <Input type="number" :min="0" v-model.number="settings.maxCommandHistory" class="pr-10 invalid:border-destructive" />
          <Button variant="ghost" class="absolute end-0 inset-y-0 p-2" @click="settings.maxCommandHistory = DEFAULT_SETTINGS.maxCommandHistory">
            <LucideListRestart class="size-6 text-muted-foreground" />
          </Button>
        </div>
      </Alert>
    </div>
  </DefaultLayout>
</template>
