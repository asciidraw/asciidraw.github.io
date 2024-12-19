<script setup lang="ts">
import {
  LucideCircleChevronLeft,
  LucideClipboardCopy,
  LucideHardDriveDownload, LucideHardDriveUpload,
  LucideImageDown,
  LucideShare2,
  LucideSquareDashedMousePointer,
} from "lucide-vue-next";
import ThemeToggle from "@/components/ThemeToggle.vue";
import {Button} from "@/components/ui/button";
import {ref} from "vue";
import {Separator} from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import { templateRef, useDropZone, useEventBus, useFileDialog } from "@vueuse/core";
import {EVENT_DOWNLOAD_PROJECT, EVENT_UPLOAD_PROJECT} from "@/symbols.ts";
import {useIsDropAvailable} from "@/composables/useIsDropAvailable.ts";
import CopyShareLinkDialog from "@/app/CopyShareLinkDialog.vue";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";

const menuIsHidden = ref(false);

const downloadEvent = useEventBus(EVENT_DOWNLOAD_PROJECT);
const uploadEvent = useEventBus(EVENT_UPLOAD_PROJECT);

const isDropAvailable = useIsDropAvailable();
const uploadDropZoneRef = templateRef("upload-dropzone");
useDropZone(uploadDropZoneRef, {
  onDrop: (files) => {
    files?.forEach(file => file.text().then((content) => uploadEvent.emit(content)))
  },
});

const fileDialog = useFileDialog({ accept: "application/json", multiple: true });

fileDialog.onChange((files) => {
  if (files?.length) {
    [...files].forEach(file => file.text().then((content) => uploadEvent.emit(content)));
  }
});
</script>

<template>
  <Button variant="ghost" v-if="menuIsHidden" @click="menuIsHidden = false" class="fixed bg-primary shadow left-4 top-4 z-20 p-2 rounded-full size-10">
    <AsciiDrawIcon class="size-10" />
  </Button>
  <div v-else class="fixed bg-card border-2 border-border shadow left-4 top-4 z-20 max-w-xs p-2 rounded-lg flex flex-col gap-y-4">
    <div class="flex gap-x-2">
      <router-link to="/" class="flex">
        <AsciiDrawIcon />
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
        <IconButton @click="fileDialog.open">
          <LucideHardDriveUpload />
          <template #tooltip>{{ $t('app.menu.project.import.project.tooltip') }}</template>
        </IconButton>
        <Separator orientation="vertical" class="h-6" />
        <IconButton @click="downloadEvent.emit()">
          <LucideHardDriveDownload />
          <template #tooltip>{{ $t('app.menu.project.export.project.tooltip') }}</template>
        </IconButton>
        <CopyShareLinkDialog>
          <IconButton>
            <LucideShare2 />
            <template #tooltip>{{ $t('app.menu.project.export.share.tooltip') }}</template>
          </IconButton>
        </CopyShareLinkDialog>
        <IconButton>
          <LucideClipboardCopy />
          <template #tooltip>{{ $t('app.menu.project.export.clipboard.tooltip') }}</template>
        </IconButton>
        <IconButton>
          <LucideImageDown />
          <template #tooltip>{{ $t('app.menu.project.export.image.tooltip') }}</template>
        </IconButton>
      </div>
      <div v-if="isDropAvailable" ref="upload-dropzone" class="border border-dashed h-20 grid place-content-center m-2">
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
