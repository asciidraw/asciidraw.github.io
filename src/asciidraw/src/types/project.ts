
export interface ElementBase {
  id: string
  type: string
  x: number
  y: number
}

export interface Project {
  name?: string
  elements: Array<ElementBase & object>
}
