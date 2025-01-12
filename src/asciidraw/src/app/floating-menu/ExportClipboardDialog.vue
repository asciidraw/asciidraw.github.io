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
import { LucideClipboardCopy, LucideClipboardCheck } from "lucide-vue-next";
import { useClipboard } from "@vueuse/core";
import { computed, inject } from "vue";
import { INJECTION_KEY_PROJECT, INJECTION_KEY_RENDERER_MAP } from "@/symbols.ts";

const project = inject(INJECTION_KEY_PROJECT)!;
const renderMap = inject(INJECTION_KEY_RENDERER_MAP)!;

const rendered = computed(() => {
  return "Hello World";
});

const { copy: doCopy, copied: recentlyCopied } = useClipboard({ source: rendered });
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
      <pre class="bg-black min-h-20 max-h-96 overflow-scroll">{{ rendered }}</pre>
      <DialogFooter>
        <Button type="button" variant="default" @click="doCopy()">
          <component :is="recentlyCopied ? LucideClipboardCheck : LucideClipboardCopy" class="size-6" />
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
