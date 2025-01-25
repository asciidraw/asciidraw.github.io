
export interface ElementBase {
  /** uuid to identify the element */
  id: string
  /** type of the element. a registered associated {@link ElementRenderer} should exist */
  type: string
  x: number
  y: number
}

export interface Project {
  /** (optional) human identifier for the project */
  name?: string
  /** elements that are in the project */
  elements: Array<ElementBase & object>
}
