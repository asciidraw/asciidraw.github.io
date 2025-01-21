import type { Project } from "@/types";
import lzString from "lz-string";


export enum StorageType {
  storage,
  file,
  url,
}

export function storeProjectData(type: StorageType, project: Project): string {
  switch (type) {
    case StorageType.storage:
      return lzString.compress(JSON.stringify(project));
    case StorageType.file:
      return lzString.compressToUTF16(JSON.stringify(project));
    case StorageType.url:
      return lzString.compressToBase64(JSON.stringify(project));
  }
}

export function loadProjectData(type: StorageType, stored: string): Project {
  switch (type) {
    case StorageType.storage:
      return JSON.parse(lzString.decompress(stored));
    case StorageType.file:
      return JSON.parse(lzString.decompressFromUTF16(stored));
    case StorageType.url:
      return JSON.parse(lzString.decompressFromBase64(stored));
    default:
      throw new Error("Unknown storage type");
  }
}

/**
 * same as {@link Storage#setItem} but compatible with vueuse useStorage
 * @param key A string containing the name of the key you want to create/ update.
 * @param value A string containing the value you want to give the key you are creating/ updating
 * @param storage
 */
export function setStorageSync(key: string, value: string | null, storage: Storage = localStorage) {
  const oldValue = storage.getItem(key);
  if (value === null) {
    storage.removeItem(key);
  } else {
    storage.setItem(key, value);
  }
  window.dispatchEvent(new StorageEvent('storage', {
    key: key,
    newValue: value,
    oldValue: oldValue,
    storageArea: storage,
  }));
}

export function loadProjectName(projectId: string): string | undefined {
  const stored = localStorage.getItem(`project-${projectId}`)!;
  const project = loadProjectData(StorageType.storage, stored);
  if (project === null) return undefined;
  return project.name;
}

export function setProjectName(projectId: string, newName: undefined | string): void {
  const storageKey = `project-${projectId}`
  const stored = localStorage.getItem(storageKey)!;
  const project = loadProjectData(StorageType.storage, stored);
  project.name = newName?.length ? newName : undefined;
  const packed = storeProjectData(StorageType.storage, project);
  setStorageSync(storageKey, packed);
}
