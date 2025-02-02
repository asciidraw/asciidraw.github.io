import { createNewProjectId, loadProjectData, setStorageSync, StorageType, storeProjectData } from "@/lib";

export function loadProjectsFromFiles(files: File[]) {
  files.forEach(file => {
    file.text().then((data) => {
      let loaded;
      switch (file.type) {
        case "application/json":
          loaded = JSON.parse(data);
          break;
        default:
          loaded = loadProjectData(StorageType.file, data);
          break;
      }
      if (loaded === null) throw Error("Project data is bad");
      const newProjectId = createNewProjectId();
      setStorageSync(`project-${newProjectId}`, storeProjectData(StorageType.storage, loaded));
    });
  });
}
