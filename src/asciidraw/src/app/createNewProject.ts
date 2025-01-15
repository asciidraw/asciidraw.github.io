import type { Project } from "@/types";


export function createNewProject(): Project {
  return {
    id: Date.now().toString(),
    elements: [],
  };
}
