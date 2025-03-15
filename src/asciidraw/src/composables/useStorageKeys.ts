import { type StorageEventLike, useEventListener } from "@vueuse/core";
import { readonly, ref } from "vue";

export interface UseStorageKeysOptions {
  filter?: (key: string) => boolean
  map?: (key: string) => string
  storage?: Storage
}

type StorageKeys = string[]

export function useStorageKeys(options: UseStorageKeysOptions = {}) {
  const {
    filter = () => true,
    map = (k) => k,
    storage = localStorage,
  } = options;

  function getKeys(): StorageKeys {
    const allKeys = Object.keys(storage);
    return allKeys.filter(filter).map(map);
  }

  const data = ref<StorageKeys>(getKeys());

  function update(event?: StorageEventLike) {
    if (event && event.storageArea !== storage)
      return;

    setTimeout(() => {
      data.value = getKeys();
    });
  }

  useEventListener(window, 'storage', update);

  return readonly(data);
}
