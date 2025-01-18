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
import { loadProjectName, setProjectName } from "@/lib";
import { whenever } from "@vueuse/core";

const props = defineProps<{
  projectId: string;
}>();

const isOpen = ref(false);

whenever(isOpen, () => {
  inputValue.value = loadProjectName(props.projectId) ?? props.projectId;
});

function submit(): void {
  setProjectName(props.projectId, inputValue.value);
  isOpen.value = false;
}

const inputValue = ref<string>("");
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" size="icon">
        <LucidePencil />
      </Button>
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
        <DialogClose>
          <Button variant="secondary">
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
