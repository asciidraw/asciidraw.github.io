<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { LucideCopy, LucideThumbsUp, LucideTriangleAlert } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";
import { StorageType, storeProjectData } from "@/lib";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Project } from "@/types";

const { project } = defineProps<{
  project: Project
}>();
const router = useRouter();

const shareLink = computed(() => {
  const stored = storeProjectData(StorageType.url, project);
  const resolved = router.resolve({ name: "share", params: { data: stored } });
  return new URL(resolved.href, window.location.toString()).href;
});

const { copied: recentlyCopied, copy: copyToClipboard } = useClipboard({ source: shareLink });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ $t('workspace.dialog.share.title') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('workspace.dialog.share.description') }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <label for="link" class="sr-only">Link</label>
          <Input
            id="link"
            :default-value="shareLink"
            read-only
          />
        </div>
        <Button type="submit" size="sm" class="px-3" @click="() => copyToClipboard()">
          <span class="sr-only">Copy</span>
          <component :is="recentlyCopied ? LucideThumbsUp : LucideCopy" class="size-4" />
        </Button>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button variant="secondary">
            {{ $t('dialog-common.close') }}
          </Button>
        </DialogClose>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="px-3">
              <LucideTriangleAlert class="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="space-y-1.5">
            <h4 class="text-xl font-semibold leading-none tracking-tight flex gap-2 items-baseline">
              <LucideTriangleAlert class="my-auto size-5 shrink-0 inline" />
              {{ $t('workspace.dialog.share.warning.title') }}
            </h4>
            <p class="text-sm text-muted-foreground text-justify">
              {{ $t('workspace.dialog.share.warning.description') }}
            </p>
          </PopoverContent>
        </Popover>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
