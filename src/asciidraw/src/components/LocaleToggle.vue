<script setup lang="ts">
import { LucideLanguages } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import IconButton from "@/components/composed/IconButton.vue";
import { useI18n } from "vue-i18n";
import { setStorageSync } from "@/lib";

// todo: sync locale from storage back to i18n object. vueuse useLocalStorage and syncRef could be combined for that.

const i18n = useI18n();

function setI18n(locale: string) {
  i18n.locale.value = locale;
  setStorageSync('i18n-locale', locale);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <IconButton>
        <LucideLanguages />
        <template #tooltip>{{ $t('components.locale-toggle.tooltip') }}</template>
      </IconButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="locale in $i18n.availableLocales" :key="locale" @click="setI18n(locale)">
        {{ $t(`locale.${locale}`) }}
        <DropdownMenuShortcut v-if="locale === $i18n.locale">&bullet;</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
