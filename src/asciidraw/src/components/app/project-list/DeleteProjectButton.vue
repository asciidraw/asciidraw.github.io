<script setup lang="ts">
import { LucideTrash } from "lucide-vue-next";
import { setStorageSync } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const props = defineProps<{
  projectId: string;
  disabled?: boolean
}>();

function deleteProject(): void {
  setStorageSync(`project-${props.projectId}`, null);
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline" size="icon" :disabled="disabled">
        <LucideTrash />
      </Button>
    </AlertDialogTrigger>
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
