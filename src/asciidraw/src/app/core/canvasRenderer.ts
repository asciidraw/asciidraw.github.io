import { Layer, Vector } from "@/lib";
import * as constants from "@/constants.ts";
import type { BoundingBox, DrawContext, VectorLike, SizeLike } from "@/types";


export interface ColorPalette {
  background?: string
  grid: string
  text: string
  highlight: string
  selection: string
}


export class CanvasRenderer {
  private readonly colorPalette: ColorPalette
  private readonly drawContext: DrawContext
  private readonly renderingContext: CanvasRenderingContext2D

  constructor(colorPalette: ColorPalette, drawContext: DrawContext, renderingContext: CanvasRenderingContext2D) {
    this.colorPalette = colorPalette;
    this.drawContext = drawContext;
    this.renderingContext = renderingContext;
  }

  /** zoom normalized */
  get normalZoom(): number {
    return this.drawContext.zoom / 10;
  }

  /**
   * initialises the canvas with transformation, scale, translation, ...
   */
  initCanvas(): void {
    this.renderingContext.setTransform(1, 0, 0, 1, 0, 0);
    if (this.colorPalette.background) {
      this.renderingContext.fillStyle = this.colorPalette.background;
      this.renderingContext.fillRect(0, 0, this.renderingContext.canvas.width, this.renderingContext.canvas.height);
    } else {
      this.renderingContext.clearRect(0, 0, this.renderingContext.canvas.width, this.renderingContext.canvas.height);
    }
    this.renderingContext.scale(this.normalZoom, this.normalZoom);
    this.renderingContext.translate(this.renderingContext.canvas.width / 2 / this.normalZoom, this.renderingContext.canvas.height / 2 / this.normalZoom);
    this.renderingContext.font = constants.FONT;
  }

  /**
   * draws the grid on the canvas
   */
  drawGrid(): void {
    this.renderingContext.lineWidth = 1;
    this.renderingContext.strokeStyle = this.colorPalette.grid;

    const startOffset = this.canvasToCell(new Vector(0, 0))
      .subtract(new Vector(constants.RENDER_PADDING_CELLS, constants.RENDER_PADDING_CELLS));
    const endOffset = this.canvasToCell(new Vector(this.renderingContext.canvas.width, this.renderingContext.canvas.height))
      .add(new Vector(constants.RENDER_PADDING_CELLS, constants.RENDER_PADDING_CELLS));

    this.renderingContext.beginPath();
    for (let i = startOffset.x; i < endOffset.x; i++) {
      const posX = (i * constants.CHARACTER_PIXEL_WIDTH) - this.drawContext.offset.x;
      const startY = -this.renderingContext.canvas.height / 2 / this.normalZoom;
      const endY = this.renderingContext.canvas.height / 2 / this.normalZoom;
      this.renderingContext.moveTo(posX, startY);
      this.renderingContext.lineTo(posX,  endY);
    }
    for (let j = startOffset.y; j < endOffset.y; j++) {
      const posY = (j * constants.CHARACTER_PIXEL_HEIGHT) - this.drawContext.offset.y;
      const startX = -this.renderingContext.canvas.width / 2 / this.normalZoom;
      const endX = this.renderingContext.canvas.width / 2 / this.normalZoom;
      this.renderingContext.moveTo(startX, posY);
      this.renderingContext.lineTo(endX, posY);
    }
    this.renderingContext.stroke();
  }

  /**
   * draws auxiliary lines on the canvas
   * @param width number of characters in between the two auxiliary lines
   */
  drawAuxiliaryLines(width: number): void {
    const posX1 = (-width/2 * constants.CHARACTER_PIXEL_WIDTH) - this.drawContext.offset.x;
    const posX2 = (+width/2 * constants.CHARACTER_PIXEL_WIDTH) - this.drawContext.offset.x;
    const startY = -this.renderingContext.canvas.height / 2 / this.normalZoom;
    const endY = this.renderingContext.canvas.height / 2 / this.normalZoom;

    this.renderingContext.lineWidth = 1;
    this.renderingContext.strokeStyle = this.colorPalette.highlight;
    this.renderingContext.beginPath();
    this.renderingContext.moveTo(posX1, startY);
    this.renderingContext.lineTo(posX1, endY);
    this.renderingContext.moveTo(posX2, startY);
    this.renderingContext.lineTo(posX2, endY);
    this.renderingContext.stroke();
  }

  drawHighlights(highlights: BoundingBox[]): void {
    for (const highlightBox of highlights) {
      this.highlight(highlightBox);
    }
  }

  /**
   * draws a layer on the canvas
   * @param layer layer to draw
   */
  drawLayer(layer: Layer): void {
    for (const [[x, y], char] of layer.entries()) {
      this.drawCharacter({ x, y }, char);
    }
  }

  // internal drawing-functions

  highlight(box: BoundingBox, color?: string) {
    if (box.width <= 0 || box.height <= 0) return;
    this.renderingContext.fillStyle = color ?? this.colorPalette.highlight;
    this.renderingContext.fillRect(
      box.x * constants.CHARACTER_PIXEL_WIDTH - this.drawContext.offset.x + 0.5,
      (box.y-1) * constants.CHARACTER_PIXEL_HEIGHT - this.drawContext.offset.y + 0.5,
      box.width * constants.CHARACTER_PIXEL_WIDTH - 1,
      box.height * constants.CHARACTER_PIXEL_HEIGHT - 1,
    );
  }

  drawText(position: VectorLike, text: string) {
    this.renderingContext.fillStyle = this.colorPalette.text;
    let col = 0;
    let row = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      if (char === '\n') {
        col = 0;
        row++;
        continue;
      }

      if (char === ' ') {
        col++;
        continue
      }

      this.drawCharacter({ x: position.x + col, y: position.y + row }, char);
      col++;
    }
  }

  drawCharacter(position: VectorLike, character: string): void {
    this.renderingContext.fillStyle = this.colorPalette.text;
    const canvasX = (position.x * constants.CHARACTER_PIXEL_WIDTH) - this.drawContext.offset.x;
    const canvasY = (position.y * constants.CHARACTER_PIXEL_HEIGHT) - this.drawContext.offset.y - 3;
    this.renderingContext.fillText(character, canvasX, canvasY);
  }

  // converter function who translate between cell, frame and canvas coordinates

  canvasToFrame(screen: VectorLike): Vector {
    return new Vector(
      (screen.x - this.renderingContext.canvas.width / 2) / this.normalZoom + this.drawContext.offset.x,
      (screen.y - this.renderingContext.canvas.height / 2) / this.normalZoom + this.drawContext.offset.y,
    );
  }

  frameToCanvas(frame: VectorLike): Vector {
    return new Vector(
      (frame.x - this.drawContext.offset.x) * this.normalZoom + this.renderingContext.canvas.width / 2,
      (frame.y - this.drawContext.offset.y) * this.normalZoom + this.renderingContext.canvas.height / 2,
    )
  }

  frameToCell(frame: VectorLike): Vector {
    return new Vector(
      Math.round((frame.x - constants.CHARACTER_PIXEL_WIDTH / 2) / constants.CHARACTER_PIXEL_WIDTH),
      Math.round((frame.y + constants.CHARACTER_PIXEL_HEIGHT / 2) / constants.CHARACTER_PIXEL_HEIGHT),
    );
  }

  cellToFrame(cell: VectorLike): Vector {
    return new Vector(
      Math.round(cell.x * constants.CHARACTER_PIXEL_WIDTH),
      Math.round(cell.y * constants.CHARACTER_PIXEL_HEIGHT),
    );
  }

  canvasToCell(screen: VectorLike): Vector {
    return this.frameToCell(this.canvasToFrame(screen));
  }

  cellToCanvas(cell: VectorLike): Vector {
    return this.frameToCanvas(this.cellToFrame(cell));
  }
}
