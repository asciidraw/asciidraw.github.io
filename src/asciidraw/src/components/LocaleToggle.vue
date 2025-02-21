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
import { GB, DE, } from "country-flag-icons/string/3x2";
import { registerCommand } from "@/components/command-popup";
import { h } from "vue";

// todo: sync locale from storage back to i18n object. vueuse useLocalStorage and syncRef could be combined for that.

function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}

const codeToFlag: Record<string, string> = {
  en: svgToDataUrl(GB),
  de: svgToDataUrl(DE),
}

const i18n = useI18n();

function setI18n(locale: string) {
  i18n.locale.value = locale;
  setStorageSync('i18n-locale', locale);
}

i18n.availableLocales.map((locale) => {
  registerCommand({
    group: "locales",
    id: locale,
    icon: h('img', { src: codeToFlag[locale], alt: locale }),
    label: () => i18n.t(`commands.locales.${locale}`),
    action: () => {
      setI18n(locale);
    },
  });
});
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
        <img :src="codeToFlag[locale]" :alt="locale" class="h-4 mr-1" />
        {{ $t(`locale.${locale}`) }}
        <DropdownMenuShortcut v-if="locale === $i18n.locale">&bullet;</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
