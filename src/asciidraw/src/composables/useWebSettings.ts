import { useLocalStorage } from "@vueuse/core";
import { computed, type Ref } from "vue";

interface Settings {
  devMode: boolean
  simpleThemeIcon: boolean
  maxCommandHistory: number
}

export const DEFAULT_SETTINGS: Settings = {
  devMode: import.meta.env.DEV,
  simpleThemeIcon: false,
  maxCommandHistory: 3,
};

export const SETTINGS_STORAGE_KEY = 'web-settings';

export function useWebSettings(): Ref<Settings>;
export function useWebSettings<K extends keyof Settings>(setting: K): Ref<Settings[K]>;

export function useWebSettings<Option extends keyof Settings>(setting?: Option) {
  const settings = useLocalStorage(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS, { mergeDefaults: true });

  return setting !== undefined ? computed({
    get: () => settings.value[setting],
    set: (value: Settings[Option]) => settings.value[setting] = value,
  }) : settings;
}
