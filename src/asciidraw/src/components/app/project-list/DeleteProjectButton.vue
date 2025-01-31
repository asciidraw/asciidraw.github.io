<script setup lang="ts">
import { LucidePencil, LucideTrash } from "lucide-vue-next";
import { setStorageSync } from "@/lib";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ref } from "vue";
import IconButton from "@/components/composed/IconButton.vue";

const props = defineProps<{
  projectId: string;
}>();

const open = ref(false);

function onClick(event: MouseEvent) {
  event.stopImmediatePropagation();
  if (event.ctrlKey || event.shiftKey)
    deleteProject();
  else
    open.value = true;
}

function deleteProject(): void {
  setStorageSync(`project-${props.projectId}`, null);
}
</script>

<template>
  <AlertDialog v-model:open="open">
    <!-- Note: custom AlertDialogTrigger handling -->
    <IconButton variant="outline" size="icon" @click="onClick" class="size-7">
      <LucideTrash class="size-full" />
      <template #tooltip>{{ $t('components.project-list.delete.tooltip') }}</template>
    </IconButton>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ $t('components.project-list.delete.dialog.title') }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t('components.project-list.delete.dialog.description') }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          {{ $t('dialog-common.cancel') }}
        </AlertDialogCancel>
        <AlertDialogAction @click="deleteProject">
          {{ $t('dialog-common.delete') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
