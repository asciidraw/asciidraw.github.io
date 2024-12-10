<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { computed, inject } from "vue";
import { PROJECT_INJECTION_KEY } from "@/symbols.ts";
import { useRouter } from "vue-router";
import { LucideCopy, LucideThumbsUp } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";
import { storeProjectData } from "@/lib";

const project = inject(PROJECT_INJECTION_KEY)!;
const router = useRouter();

const changeLink = computed(() => {
    const stored = storeProjectData(project.value);
    const encoded = btoa(stored);
    const resolved = router.resolve({ name: "share", params: { data: encoded } });
    return new URL(resolved.href, window.location.toString()).href;
});

const { copied: recentlyCopied, copy: copyToClipboard } = useClipboard({ source: changeLink });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ $t('app.dialog.share.title') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('app.dialog.share.description') }}
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <label for="link" class="sr-only">Link</label>
          <Input
            id="link"
            :default-value="changeLink"
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
          <Button type="button" variant="secondary">
            {{ $t('app.dialog.share.close') }}
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
