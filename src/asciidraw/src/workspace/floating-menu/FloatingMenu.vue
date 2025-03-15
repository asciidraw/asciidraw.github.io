<script setup lang="ts">
import {
  LucideCircleChevronLeft,
  LucideClipboardCopy,
  LucideImageDown,
  LucideRedo,
  LucideShare2,
  LucideTangent,
  LucideUndo,
} from "lucide-vue-next";
import ThemeToggle from "@/components/ThemeToggle.vue";
import { Button } from "@/components/ui/button";
import { inject, ref } from "vue";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/composed/IconButton.vue";
import LocaleToggle from "@/components/LocaleToggle.vue";
import { INJECTION_KEY_WORKSPACE, INJECTION_KEY_PROJECT } from "@/symbols.ts";
import CopyShareLinkDialog from "@/components/workspace/CopyShareLinkDialog.vue";
import AsciiDrawIcon from "@/components/AsciiDrawIcon.vue";
import ExportClipboardDialog from "@/workspace/floating-menu/ExportClipboardDialog.vue";
import ExportImageDialog from "@/workspace/floating-menu/ExportImageDialog.vue";
import ProjectList from "@/components/workspace/project-list/ProjectList.vue";
import AuxiliaryLinesPopover from "@/workspace/floating-menu/AuxiliaryLinesPopover.vue";
import ElementMenu from "@/workspace/floating-menu/ElementMenu.vue";
import DownloadProjectButton from "@/components/workspace/DownloadProjectButton.vue";
import IssueDialog from "@/components/IssueDialog.vue";
import ExportSvgDialog from "@/workspace/floating-menu/ExportSvgDialog.vue";
import HelpText from "@/workspace/floating-menu/HelpText.vue";

const workspace = inject(INJECTION_KEY_WORKSPACE)!;
const project = inject(INJECTION_KEY_PROJECT)!;
const menuIsHidden = ref(false);
</script>

<template>
  <Button variant="ghost" v-if="menuIsHidden" @click="menuIsHidden = false" class="fixed bg-primary shadow left-4 top-4 p-2 rounded-full size-10">
    <AsciiDrawIcon class="size-10" />
  </Button>
  <div v-else data-tour="floating-menu" class="fixed bg-card border-2 border-border shadow-lg shadow-shadow left-4 top-4 max-h-[calc(100vh-2rem)] max-w-xs overflow-y-scroll p-2 rounded-lg space-y-4">
    <div class="flex gap-x-2">
      <router-link to="/" class="flex">
        <AsciiDrawIcon />
        <span>AsciiDraw</span>
      </router-link>
      <div class="min-w-10" />
      <div class="grow" />
      <IssueDialog />
      <LocaleToggle />
      <ThemeToggle />
      <IconButton @click="menuIsHidden = true">
        <LucideCircleChevronLeft class="size-6" />
        <template #tooltip>{{ $t('workspace.menu.hide.tooltip') }}</template>
      </IconButton>
    </div>
    <Separator :label="$t('workspace.menu.project-list.label')" />
    <div data-tour="project-list" class="space-y-0.5">
      <ProjectList :features="['edit-name', 'delete', 'upload-project', 'list-link']" />
    </div>
    <Separator :label="$t('workspace.menu.project.label')" />
    <div data-tour="project-actions">
      <div class="flex justify-between">
        <DownloadProjectButton />
        <CopyShareLinkDialog :project="project">
          <IconButton>
            <LucideShare2 />
            <template #tooltip>{{ $t('workspace.menu.project.export.share.tooltip') }}</template>
          </IconButton>
        </CopyShareLinkDialog>
        <ExportClipboardDialog>
          <IconButton>
            <LucideClipboardCopy />
            <template #tooltip>{{ $t('workspace.menu.project.export.clipboard.tooltip') }}</template>
          </IconButton>
        </ExportClipboardDialog>
        <ExportImageDialog>
          <IconButton>
            <LucideImageDown />
            <template #tooltip>{{ $t('workspace.menu.project.export.image.tooltip') }}</template>
          </IconButton>
        </ExportImageDialog>
        <ExportSvgDialog>
          <IconButton>
            <LucideTangent />
            <template #tooltip>{{ $t('workspace.menu.project.export.svg.tooltip') }}</template>
          </IconButton>
        </ExportSvgDialog>
        <Separator orientation="vertical" class="h-6" />
        <IconButton @click="() => workspace.events.emit('undo')">
          <LucideUndo />
          <template #tooltip>{{ $t('workspace.menu.project.undo.tooltip') }}</template>
        </IconButton>
        <IconButton @click="() => workspace.events.emit('redo')">
          <LucideRedo />
          <template #tooltip>{{ $t('workspace.menu.project.redo.tooltip') }}</template>
        </IconButton>
        <Separator orientation="vertical" class="h-6" />
        <AuxiliaryLinesPopover />
      </div>
    </div>
    <Separator :label="$t('workspace.menu.actions.label')" />
    <div data-tour="tools" class="space-y-0.5">
      <template v-for="[actionId, action] in Object.entries(workspace.actions)" :key="action.id">
        <Button :data-tour="`action-${actionId}`" :variant="actionId === workspace.activeActionId ? 'secondary' : 'ghost'" size="xs" class="gap-x-2 w-full" @click="workspace.activeActionId = actionId">
          <component v-if="action.icon" :is="action.icon" class="size-6" />
          <div v-else class="size-6 invisible" />
          <p class="grow text-left">{{ $t(action.displayName) }}</p>
        </Button>
      </template>
    </div>
    <ElementMenu />
    <Separator :label="$t('workspace.menu.help.label')" />
    <HelpText />
  </div>
</template>
