import {type StorageEventLike, useEventListener} from "@vueuse/core";
import {ref, type Ref} from "vue";

export interface UseStorageKeysOptions {
  filter?: (key: string) => boolean
  storage?: Storage
}

type StorageKeys = string[]

export function useStorageKeys(options: UseStorageKeysOptions = {}): Ref<StorageKeys> {
  const {
    filter = undefined,
    storage = localStorage,
  } = options;

  function getKeys(): StorageKeys {
    const allKeys = Object.keys(storage);
    return filter ? allKeys.filter(filter) : allKeys;
  }

  const data = ref<StorageKeys>(getKeys());

  useEventListener(window, 'storage', update);

  function update(event?: StorageEventLike) {
    if (event && event.storageArea !== storage)
      return;

    setTimeout(() => {
      data.value = getKeys();
    });
  }

  useEventListener(window, 'storage', update);

  return data;
}
