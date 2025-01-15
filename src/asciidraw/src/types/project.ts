
interface ElementBase {
  id: string
  type: string
}

export interface Project {
  id: string
  elements: Array<ElementBase & object>
}
