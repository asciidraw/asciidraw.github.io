import type { Project } from "@/types";
import lzString from "lz-string";


/**
 * specifies the storage-methods and thus changes the format
 */
export enum StorageType {
  /** usage: localStorage */
  storage,
  /** usage: file-download */
  file,
  /** usage: in the url */
  url,
}

/**
 * converts a project to a storable string
 * @param type specifies the format
 * @param project data of the project
 * @see StorageType
 * @returns stored project as string
 */
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

/**
 * loads a project back from a stored string
 * @param type format of the stored data
 * @param stored actual stored project
 * @returns loaded {@link Project}
 */
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
 * @param storage storage to use
 */
export function setStorageSync(key: string, value: string | null, storage: Storage = localStorage): void {
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


/**
 * loads the name of a stored project
 * @param projectId id of the project
 * @returns name of the project
 * @returns {@link undefined} if project does not exist or is invalid
 */
export function loadProjectName(projectId: string): string | undefined {
  const stored = localStorage.getItem(`project-${projectId}`)!;
  const project = loadProjectData(StorageType.storage, stored);
  if (project === null) return undefined;
  return project.name;
}

/**
 * sets the name of a project based on its id
 * @param projectId id of the project
 * @param newName new name of the project
 */
export function setProjectName(projectId: string, newName: undefined | string): void {
  const storageKey = `project-${projectId}`
  const stored = localStorage.getItem(storageKey)!;
  const project = loadProjectData(StorageType.storage, stored);
  project.name = newName?.length ? newName : undefined;
  const packed = storeProjectData(StorageType.storage, project);
  setStorageSync(storageKey, packed);
}
