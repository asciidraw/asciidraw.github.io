<script setup lang="ts">
import { useRouter } from "vue-router";
import { defineCommand } from "@/components/command-popup";
import { useI18n } from "vue-i18n";
import { createNewProjectId, setStorageSync, StorageType, storeProjectData } from "@/lib";
import { createNewProject } from "@/workspace/createNewProject.ts";
import { LucideBookType, LucideFilePlus, LucideHouse, LucideList } from "lucide-vue-next";

const router = useRouter();
const { t } = useI18n();

defineCommand({
  group: "navigation",
  id: "home",
  icon: LucideHouse,
  label: () => t('commands.navigation.home'),
  action: () => {
    router.push({ name: 'home' });
  },
});
defineCommand({
  group: "navigation",
  id: "projects",
  icon: LucideList,
  label: () => t('commands.navigation.projects'),
  action: () => {
    router.push({ name: 'projects' });
  },
});
defineCommand({
  group: "navigation",
  id: "docs",
  icon: LucideBookType,
  label: () => t('commands.navigation.docs'),
  action: () => {
    router.push({ name: 'docs' });
  },
});
defineCommand({
  group: "other",
  id: "new-project",
  icon: LucideFilePlus,
  label: () => t('commands.other.new-project'),
  action: () => {
    const newProjectId = createNewProjectId();
    setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, createNewProject()));
    router.push({ name: "workspace", params: { projectId: newProjectId } });
  },
});
</script>

<template>
</template>
