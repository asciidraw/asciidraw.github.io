<script setup lang="ts">
import {
  LucideCircleChevronLeft,
  LucideClipboardCopy, LucideEraser,
  LucideHardDriveDownload, LucideHardDriveUpload,
  LucideImageDown,
  LucideShare2,
} from "lucide-vue-next";
import ThemeToggle from "@/components/ThemeToggle.vue";
import {Button} from "@/components/ui/button";
import {inject, ref} from "vue";
import {Separator} from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import {templateRef, useDropZone, useFileDialog } from "@vueuse/core";
import {INJECTION_KEY_APP} from "@/symbols.ts";
import {useIsDropAvailable} from "@/composables/useIsDropAvailable.ts";
import CopyShareLinkDialog from "@/app/floating-menu/CopyShareLinkDialog.vue";
import PurgeProjectDialog from "@/app/floating-menu/PurgeProjectDialog.vue";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import ExportClipboardDialog from "@/app/floating-menu/ExportClipboardDialog.vue";
import ExportImageDialog from "@/app/floating-menu/ExportImageDialog.vue";

const appContext = inject(INJECTION_KEY_APP)!;

const menuIsHidden = ref(false);

const isDropAvailable = useIsDropAvailable();
const uploadDropZoneRef = templateRef("upload-dropzone");
useDropZone(uploadDropZoneRef, {
  onDrop: (files) => {
    files?.forEach(file => file.text().then((content) => appContext.value.events.emit('loadProject', content)))
  },
});

const fileDialog = useFileDialog({ accept: "application/json", multiple: true });

fileDialog.onChange((files) => {
  if (files?.length) {
    [...files].forEach(file => file.text().then((content) => appContext.value.events.emit('loadProject', content)));
  }
});
</script>

<template>
  <Button variant="ghost" v-if="menuIsHidden" @click="menuIsHidden = false" class="fixed bg-primary shadow left-4 top-4 z-20 p-2 rounded-full size-10">
    <AsciiDrawIcon class="size-10" />
  </Button>
  <div v-else class="fixed bg-card border-2 border-border shadow left-4 top-4 max-h-[calc(100vh-2rem)] overflow-y-scroll z-20 max-w-xs p-2 rounded-lg space-y-4">
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
        <IconButton @click="appContext.events.emit('downloadProject', undefined)">
          <LucideHardDriveDownload />
          <template #tooltip>{{ $t('app.menu.project.export.project.tooltip') }}</template>
        </IconButton>
        <CopyShareLinkDialog>
          <IconButton>
            <LucideShare2 />
            <template #tooltip>{{ $t('app.menu.project.export.share.tooltip') }}</template>
          </IconButton>
        </CopyShareLinkDialog>
        <ExportClipboardDialog>
          <IconButton>
            <LucideClipboardCopy />
            <template #tooltip>{{ $t('app.menu.project.export.clipboard.tooltip') }}</template>
          </IconButton>
        </ExportClipboardDialog>
        <ExportImageDialog>
          <IconButton>
            <LucideImageDown />
            <template #tooltip>{{ $t('app.menu.project.export.image.tooltip') }}</template>
          </IconButton>
        </ExportImageDialog>
        <Separator orientation="vertical" class="h-6" />
        <PurgeProjectDialog>
          <IconButton>
            <LucideEraser />
            <template #tooltip>{{ $t('app.menu.project.purge.tooltip') }}</template>
          </IconButton>
        </PurgeProjectDialog>
      </div>
      <div v-if="isDropAvailable" ref="upload-dropzone" class="border border-dashed h-20 grid place-content-center m-2">
        {{ $t('app.menu.project.dropzone') }}
      </div>
    </div>
    <Separator :label="$t('app.menu.actions.label')" />
    <div class="space-y-0.5">
      <template v-for="[actionId, action] in Object.entries(appContext.actions)" :key="action.id">
        <Button :variant="actionId === appContext.activeActionId ? 'secondary' : 'ghost'" size="xs" class="gap-x-2 w-full" @click="appContext.activeActionId = actionId">
          <component v-if="action.icon" :is="action.icon" class="size-6" />
          <div v-else class="size-6 invisible" />
          <p class="grow text-left">{{ $t(action.displayName) }}</p>
        </Button>
      </template>
    </div>
    <template v-if="appContext.extraMenu">
      <Separator label="ELEMENT" />
      <component :is="appContext.extraMenu.component" v-bind="appContext.extraMenu.props" />
    </template>
    <Separator :label="$t('app.menu.help.label')" />
    <p>{{ $t('app.menu.help.text') }}</p>
  </div>
</template>
