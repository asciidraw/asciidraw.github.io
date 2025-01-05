<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { inject } from "vue";
import { INJECTION_KEY_PROJECT } from "@/symbols.ts";


const project = inject(INJECTION_KEY_PROJECT)!;

function purgeProject() {
  localStorage.removeItem("project");
  location.reload();  // currently no better way
  // @ts-expect-error
  project.value = null;
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ $t('app.dialog.purge.title') }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t('app.dialog.purge.description') }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          {{ $t('app.dialog.purge.cancel') }}
        </AlertDialogCancel>
        <AlertDialogAction @click="purgeProject">
          {{ $t('app.dialog.purge.action') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
