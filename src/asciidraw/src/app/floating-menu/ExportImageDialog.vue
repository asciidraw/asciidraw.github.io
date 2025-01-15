<script setup lang="ts">
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideClipboardCopy, LucideClipboardCheck, LucideDownload } from "lucide-vue-next";
import { computedAsync, useClipboardItems, useObjectUrl } from "@vueuse/core";
import { computed, inject } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";

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

function startDownload() {
  const anchor = document.createElement("a");
  anchor.href = imageUrl.value!;
  anchor.download = `asciidraw.${imageFormat.slice(6)}`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

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
        {{ $t('app.dialog.export-image.title') }}
      </DialogTitle>
      <DialogDescription>
        {{ $t('app.dialog.export-image.description') }}
      </DialogDescription>
      <img :src="imageUrl" alt="preview" class="w-full bg-accent rounded-sm" />
      <DialogFooter>
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            {{ $t('app.dialog.common.close') }}
          </Button>
        </DialogClose>
        <Button type="button" @click="() => startDownload()">
          <LucideDownload class="size-6" />
        </Button>
        <Button type="button" @click="() => doCopy()">
          <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-6" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
