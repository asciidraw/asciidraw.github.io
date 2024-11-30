import type {VectorLike} from "@/lib";


export interface CanvasContextState {
  offset: VectorLike
  zoom: number
}


export class CanvasContext {
  private offset: VectorLike
  private zoom: number

  // ---------------------------------------------------------------------------

  constructor(state: CanvasContextState) {
    this.offset = structuredClone(state.offset);
    this.zoom = state.zoom;
  }

  public static createNewState(): CanvasContextState {
    return {
      offset: { x: 0, y: 0 },
      zoom: 10,
    };
  }

  public toJSON(): CanvasContextState {
    return {
      offset: structuredClone(this.offset),
      zoom: this.zoom,
    };
  }

  // ---------------------------------------------------------------------------

  public getOffset(): VectorLike {
    return this.offset;
  }

  public setOffset(offset: VectorLike): void {
    this.offset = structuredClone(offset);
  }

  public getZoom(): number {
    return this.zoom;
  }

  public setZoom(zoom: number): void {
    this.zoom = Math.min(1, zoom);
  }
}
