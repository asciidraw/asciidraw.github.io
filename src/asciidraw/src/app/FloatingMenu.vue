<script setup lang="ts">
import {
  LucideCircleChevronLeft,
  LucideClipboardCopy,
  LucideHardDriveDownload, LucideHardDriveUpload,
  LucideImageDown,
  LucideShare2,
  LucideSquareDashedMousePointer,
  LucideTypeOutline,
} from "lucide-vue-next";
import ThemeToggle from "@/components/ThemeToggle.vue";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
import {Separator} from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import {useEventBus} from "@vueuse/core";
import {EVENT_DOWNLOAD_PROJECT} from "@/symbols.ts";
import {useIsDropAvailable} from "@/composables/useIsDropAvailable.ts";

const menuIsHidden = ref(false);

const isDropAvailable = useIsDropAvailable();

const downloadEvent = useEventBus(EVENT_DOWNLOAD_PROJECT);
</script>

<template>
  <Button variant="ghost" v-if="menuIsHidden" @click="menuIsHidden = false" class="fixed bg-primary shadow left-4 top-4 z-20 p-2 rounded-full size-10">
    <LucideTypeOutline class="size-10" />
  </Button>
  <div v-else class="fixed bg-card border-2 border-border shadow left-4 top-4 z-20 max-w-xs p-2 rounded-lg flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <router-link to="/" class="flex">
        <LucideTypeOutline />
        <span>AsciiDraw</span>
      </router-link>
      <div class="min-w-10" />
      <div class="grow" />
      <LocaleToggle />
      <ThemeToggle />
      <IconButton @click="menuIsHidden = true">
        <LucideCircleChevronLeft class="size-6" />
        <template #tooltip>{{ $t('app.menu.hide.tooltip') }}</template>
      </IconButton>
    </div>
    <Separator :label="$t('app.menu.project.label')" />
    <div>
      <div class="flex gap-x-2">
        <IconButton>
          <LucideHardDriveUpload />
          <template #tooltip>{{ $t('app.menu.project.import.project.tooltip') }}</template>
        </IconButton>
        <Separator orientation="vertical" class="h-6" />
        <IconButton @click="downloadEvent.emit()">
          <LucideHardDriveDownload />
          <template #tooltip>{{ $t('app.menu.project.export.project.tooltip') }}</template>
        </IconButton>
        <IconButton>
          <LucideShare2 />
          <template #tooltip>{{ $t('app.menu.project.export.share.tooltip') }}</template>
        </IconButton>
        <IconButton>
          <LucideClipboardCopy />
          <template #tooltip>{{ $t('app.menu.project.export.clipboard.tooltip') }}</template>
        </IconButton>
        <IconButton>
          <LucideImageDown />
          <template #tooltip>{{ $t('app.menu.project.export.image.tooltip') }}</template>
        </IconButton>
      </div>
      <div v-if="isDropAvailable" class="border border-dashed h-20 grid place-content-center m-2">
        {{ $t('app.menu.project.dropzone') }}
      </div>
    </div>
    <Separator :label="$t('app.menu.actions.label')" />
    <Button variant="ghost" size="xs" class="gap-x-2">
      <LucideSquareDashedMousePointer/>
      <p class="grow text-left">{{ $t('app.menu.actions.select+move') }}</p>
    </Button>
    <Separator :label="$t('app.menu.help.label')" />
    <p>{{ $t('app.menu.help.text') }}</p>
  </div>
</template>
