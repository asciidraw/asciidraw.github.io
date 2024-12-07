import type { Project } from "@/types";


export function storeProjectData(project: Project): string {
  return JSON.stringify(project);
}

export function loadProjectData(stored: string): Project {
  return JSON.parse(stored);
}
