<script setup lang="ts">
import { type HTMLAttributes, ref } from "vue";
import { cn } from "@/lib/utils.ts";
import { templateRef } from "@vueuse/core";

const props = defineProps<{
  class?: HTMLAttributes['class']
  multiple?: boolean
  accept?: string
}>();

const emit = defineEmits<{
  fileDrop: [files: FileList]
}>();

const isDragOver = ref(false);
const fileInputRef = templateRef("file-input")

function handleDrop(event: DragEvent) {
  const dt = event.dataTransfer!;
  const files = dt.files;
  handleFiles(files);
}

function handleFiles(files: FileList) {
  emit('fileDrop', files);
}
</script>

<template>
  <div
    :class="cn('text-center border border-dashed cursor-pointer grid place-content-center', props.class)"
    @dragenter.prevent.stop="isDragOver = true"
    @dragover.prevent.stop="isDragOver = true"
    @dragleave.prevent.stop="isDragOver = false"
    @click="fileInputRef.click"
    @drop.prevent.stop="handleDrop"
  >
    <label class="pointer-events-none">
      <slot v-if="!isDragOver" name="idle">
        Drag files here or click to upload
      </slot>
      <slot v-else name="hovering">
        Just drop it
      </slot>
    </label>
    <input ref="file-input" type="file" hidden :multiple="multiple" :accept="accept" />
  </div>
</template>
