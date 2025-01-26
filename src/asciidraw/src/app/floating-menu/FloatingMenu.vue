<script setup lang="ts">
import {
  LucideCircleChevronLeft,
  LucideClipboardCopy,
  LucideHardDriveDownload,
  LucideHardDriveUpload,
  LucideImageDown,
  LucideRedo,
  LucideShare2,
  LucideUndo,
} from "lucide-vue-next";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { Button } from "@/components/ui/button";
import { inject, ref } from "vue";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import { useFileDialog } from "@vueuse/core";
import { INJECTION_KEY_APP, INJECTION_KEY_DRAW_CONTEXT, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import CopyShareLinkDialog from "@/app/floating-menu/CopyShareLinkDialog.vue";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import ExportClipboardDialog from "@/app/floating-menu/ExportClipboardDialog.vue";
import ExportImageDialog from "@/app/floating-menu/ExportImageDialog.vue";
import ProjectList from "@/components/app/project-list/ProjectList.vue";
import { loadProjectData, startTextDownload, StorageType, storeProjectData } from "@/lib";
import AuxiliaryLinesPopover from "@/app/floating-menu/AuxiliaryLinesPopover.vue";
import ElementMenu from "@/app/floating-menu/ElementMenu.vue";


const appContext = inject(INJECTION_KEY_APP)!;
const drawContext = inject(INJECTION_KEY_DRAW_CONTEXT)!;
const project = inject(INJECTION_KEY_PROJECT)!;
const menuIsHidden = ref(false);

function downloadProject() {
  const content = storeProjectData(StorageType.file, project.value);
  const filename = `${project.value.name ?? (Date.now().toString())}.asciidraw.github.io`;
  startTextDownload(content, filename);
}

const fileDialog = useFileDialog({ accept: "application/json", multiple: true });

fileDialog.onChange((files) => {
  if (files?.length) {
    [...files].forEach(file => file.text().then((data) => {
      project.value = loadProjectData(StorageType.file, data);
    }));
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
    <Separator :label="$t('app.menu.project-list.label')" />
    <div class="space-y-0.5">
      <ProjectList />
    </div>
    <Separator :label="$t('app.menu.project.label')" />
    <div>
      <div class="flex justify-between">
        <IconButton @click="fileDialog.open">
          <LucideHardDriveUpload />
          <template #tooltip>{{ $t('app.menu.project.import.project.tooltip') }}</template>
        </IconButton>
        <Separator orientation="vertical" class="h-6" />
        <IconButton @click="downloadProject">
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
        <IconButton @click="() => appContext.events.emit('undo')">
          <LucideUndo />
          <template #tooltip>{{ $t('app.menu.project.undo.tooltip') }}</template>
        </IconButton>
        <IconButton @click="() => appContext.events.emit('redo')">
          <LucideRedo />
          <template #tooltip>{{ $t('app.menu.project.redo.tooltip') }}</template>
        </IconButton>
        <Separator orientation="vertical" class="h-6" />
        <AuxiliaryLinesPopover />
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
    <ElementMenu />
    <Separator :label="$t('app.menu.help.label')" />
    <p>{{ $t('app.menu.help.text') }}</p>
  </div>
</template>
