
export interface ElementBase {
  id: string
  type: string
}

export interface Project {
  name?: string
  elements: Array<ElementBase & object>
}
