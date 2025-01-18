import { useStorageKeys } from "@/composables/useStorageKeys.ts";

export function useProjectIds() {
  return useStorageKeys({
    filter: (key) => key.startsWith('project-'),
    map: (key) => key.replace(/^project-/, ''),
  });
}
