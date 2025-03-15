<script setup lang="ts">
import { useRouter } from "vue-router";
import { registerCommand } from "@/components/command-popup";
import { useI18n } from "vue-i18n";
import { createNewProjectId, setStorageSync, StorageType, storeProjectData } from "@/lib";
import { createNewProject } from "@/app/createNewProject.ts";
import { LucideBookType, LucideFilePlus, LucideHouse, LucideList } from "lucide-vue-next";

const router = useRouter();
const { t } = useI18n();

registerCommand({
  group: "navigation",
  id: "home",
  icon: LucideHouse,
  label: () => t('commands.navigation.home'),
  action: () => {
    router.push({ name: 'home' });
  },
});
registerCommand({
  group: "navigation",
  id: "app-init",
  icon: LucideList,
  label: () => t('commands.navigation.app-init'),
  action: () => {
    router.push({ name: 'app-init' });
  },
});
registerCommand({
  group: "navigation",
  id: "docs",
  icon: LucideBookType,
  label: () => t('commands.navigation.docs'),
  action: () => {
    router.push({ name: 'docs' });
  },
});
registerCommand({
  group: "other",
  id: "new-project",
  icon: LucideFilePlus,
  label: () => t('commands.other.new-project'),
  action: () => {
    const newProjectId = createNewProjectId();
    setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, createNewProject()));
    router.push({ name: "app", params: { projectId: newProjectId } });
  },
});
</script>

<template>
</template>
