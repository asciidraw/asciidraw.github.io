<script setup lang="ts">
import { LucideLanguages } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import IconButton from "@/components/composed/IconButton.vue";
import { useI18n } from "vue-i18n";


const i18n = useI18n();

function setI18n(locale: string) {
  i18n.locale.value = locale;
  localStorage.setItem('i18n-locale', locale);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <IconButton>
        <LucideLanguages />
        <template #tooltip>Controls the language of the site</template>
      </IconButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="locale in $i18n.availableLocales" :key="locale" @click="setI18n(locale)">
        {{ locale }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
