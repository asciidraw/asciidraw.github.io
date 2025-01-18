import type { Project } from "@/types";


export function storeProjectData(project: Project): string {
  return JSON.stringify(project);
}

export function loadProjectData(stored: string): Project {
  return JSON.parse(stored);
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
  const project = loadProjectData(stored);
  return project.name;
}

export function setProjectName(projectId: string, newName: undefined | string): void {
  const storageKey = `project-${projectId}`
  const stored = localStorage.getItem(storageKey)!;
  const project = loadProjectData(stored);
  project.name = newName?.length ? newName : undefined;
  const packed = storeProjectData(project);
  setStorageSync(storageKey, packed);
}
