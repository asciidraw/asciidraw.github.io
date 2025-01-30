<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import IconButton from "@/components/composed/IconButton.vue";
import {
  LucideAlertTriangle,
  LucideBadgeAlert,
  LucideBug,
  LucideClipboardCheck,
  LucideClipboardCopy,
  LucideLightbulb
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@vueuse/core";

const REPO_URL = `https://github.com/${encodeURIComponent(__GIT_REPOSITORY_OWNER__)}/${encodeURIComponent(__GIT_REPOSITORY_NAME__)}`;
const BUILD_TIME = __BUILD_TIME__;
const GIT_BRANCH = __GIT_BRANCH__;
const GIT_COMMIT_HASH = __GIT_COMMIT_HASH__;

const { copy, copied: recentlyCopied } = useClipboard();
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <IconButton>
        <LucideBadgeAlert />
        <template #tooltip>{{ $t('components.issue-dialog.tooltip') }}</template>
      </IconButton>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ $t('components.issue-dialog.title') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('components.issue-dialog.description') }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <LucideAlertTriangle class="size-4 inline-block text-destructive" />
        {{ $t('components.issue-dialog.account-required') }}
      </div>
      <div class="grid grid-cols-2 gap-2">
        <a :href="`${REPO_URL}/issues/new?template=bug-report.yaml`" target="_blank" class="aspect-square">
          <Button variant="outline" class="size-full flex-col">
            <LucideBug class="size-10" />
            {{ $t('components.issue-dialog.bug') }}
          </Button>
        </a>
        <a :href="`${REPO_URL}/issues/new?template=feature-request.yaml`" target="_blank" class="aspect-square">
          <Button variant="outline" class="size-full flex-col">
            <LucideLightbulb class="size-10" />
            {{ $t('components.issue-dialog.feature') }}
          </Button>
        </a>
      </div>
      <div class="grid grid-cols-[auto,1fr] gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
        <label>Build Time</label>
        <p>{{ BUILD_TIME }}</p>
        <label>Branch</label>
        <p>{{ GIT_BRANCH }}</p>
        <label>Commit Hash</label>
        <p>
          {{ GIT_COMMIT_HASH }}
          <IconButton variant="outline" size="icon" class="float-right" @click="() => copy(GIT_COMMIT_HASH)">
            <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-4" />
            <template #tooltip>{{ $t('components.issue-dialog.copy-commit-hash.tooltip') }}</template>
          </IconButton>
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
