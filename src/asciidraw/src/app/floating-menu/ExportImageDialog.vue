<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideClipboardCopy, LucideClipboardCheck, LucideDownload } from "lucide-vue-next";
import { computedAsync, useClipboardItems, useObjectUrl } from "@vueuse/core";
import { computed, inject, ref } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const project = inject(INJECTION_KEY_PROJECT)!;
const renderMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const imageFormat = "image/png";

const renderedBlob = computedAsync<Blob>(async () => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 100;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "red";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), Math.floor(Math.random() * canvas.width / 2), Math.floor(Math.random() * canvas.height / 2));
  }
  return await new Promise(resolve => canvas.toBlob(blob => resolve(blob!), imageFormat));
}, new Blob());

const imageUrl = useObjectUrl(renderedBlob);

const clipboardItem = computed(() => [new ClipboardItem({ [imageFormat]: renderedBlob.value })]);
const { copy: doCopy, copied: recentlyCopied } = useClipboardItems({ source: clipboardItem });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        {{ $t('app.dialog.export-clipboard.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('app.dialog.export-clipboard.description') }}
      </DialogDescription>
      <img :src="imageUrl" alt="preview" class="w-full bg-accent rounded-sm" />
      <DialogFooter>
        <a :href="imageUrl" :download="`asciidraw.${imageFormat.slice(6)}`">
          <Button type="button">
            <LucideDownload class="size-6" />
          </Button>
        </a>
        <Button type="button" @click="() => doCopy()">
          <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-6" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
