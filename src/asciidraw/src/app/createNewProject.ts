import type { Project } from "@/types";


export function createNewProject(): Project {
  return {
    id: Date.now().toString(),
    elements: [],
    drawContext: {
      offset: { x: 0, y: 0 },
      zoom: 10,
    },
  };
}
