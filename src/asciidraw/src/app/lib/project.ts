import {CanvasContext, type CanvasContextState} from "@/app/lib/canvasContext.ts";


export interface ProjectState {
  id: string
  name: string
  context: CanvasContextState
}


export class Project {
  public readonly id: string
  private name: string
  private context: CanvasContext

  // ---------------------------------------------------------------------------

  constructor(state: ProjectState) {
    this.id = state.id;
    this.name = state.name;
    this.context = new CanvasContext(state.context);
  }

  public static createNewState(name: string): ProjectState {
    return {
      id: Date.now().toString(),
      name: name,
      context: CanvasContext.createNewState(),
    };
  }

  public toJSON(): ProjectState {
    return {
      id: this.id,
      name: this.name,
      context: this.context.toJSON(),
    };
  }

  // ---------------------------------------------------------------------------
}
