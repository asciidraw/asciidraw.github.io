<script setup lang="ts">
import { LucidePencil } from "lucide-vue-next";
import {
  Dialog, DialogClose, DialogContent,
  DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { loadProjectFromStorage, storeProjectToStorage } from "@/lib";
import { whenever } from "@vueuse/core";
import IconButton from "@/components/composed/IconButton.vue";

const props = defineProps<{
  projectId: string;
}>();

const isOpen = ref(false);

whenever(isOpen, () => {
  inputValue.value = loadProjectFromStorage(props.projectId)?.name ?? props.projectId;
});

function submit(): void {
  const project = loadProjectFromStorage(props.projectId)!;
  project.name = inputValue.value.trim() || undefined;
  storeProjectToStorage(props.projectId, project);
  isOpen.value = false;
}

const inputValue = ref<string>("");
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <IconButton variant="outline" size="icon" class="size-7">
        <LucidePencil class="size-full" />
        <template #tooltip>{{ $t('components.project-list.edit-name.tooltip') }}</template>
      </IconButton>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ $t('components.project-list.edit-name.dialog.title') }}
        </DialogTitle>
        <DialogDescription>
          {{ $t('components.project-list.edit-name.dialog.description') }}
        </DialogDescription>
      </DialogHeader>
      <Input v-model.trim="inputValue" @keydown.exact.enter="submit" />
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">
            {{ $t('dialog-common.cancel') }}
          </Button>
        </DialogClose>
        <Button type="submit" @click="submit">
          {{ $t('dialog-common.save') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
