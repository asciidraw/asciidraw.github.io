import type { VectorLike } from "@/types";


/**
 * Class to store a 2D vector and simplify mathematical methods
 * @see VectorLike
 */
export class Vector implements VectorLike {

  /**
   * sorts min x,y and max x,y of two vectors so that the first returned vector x is smaller than the second returned vector x.
   * @param a first vector
   * @param b second vector
   */
  public static minMax(a: VectorLike, b: VectorLike): [Vector, Vector] {
    return [
      new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y)),
      new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y)),
    ];
  }

  // ---------------------------------------------------------------------------

  readonly x: number
  readonly y: number

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // ---------------------------------------------------------------------------

  /**
   * checks if two vectors are the same
   * @param other vector to compare to
   */
  public equals(other: null | VectorLike) {
    return other != null && this.x == other.x && this.y == other.y;
  }

  /**
   * checks if two vectors are the same
   * @param first vector to compare
   * @param second vector to compare
   */
  public static equals(first: null | VectorLike, second: null | VectorLike): boolean {
    return first !== null && second !== null && first.x === second.x && first.y === second.y;
  }

  /**
   * adds another vector to this one
   * @param other vector to add
   */
  public add(other: VectorLike) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  /**
   * subtracts another vector from this one
   * @param other vector to subtract
   */
  public subtract(other: VectorLike) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  /**
   * return a normalised vector
   */
  public normalized() {
    const magnitude = this.length();
    if (magnitude === 0) return new Vector(0, 0);
    return new Vector(this.x / magnitude, this.y / magnitude);
  }

  /**
   * returns the length of this vector
   */
  public length() {
    // sqrt(x^2 + y^2)
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  /**
   * scales this vector
   * @param scale factor to multiply x and y with
   */
  public scale(scale: number) {
    return new Vector(this.x * scale, this.y * scale);
  }

  // ---------------------------------------------------------------------------

  /**
   * Move up by value. Defaults to 1.
   * @param value the amount to move
   */
  public up(value = 1) {
    return new Vector(this.x, this.y - value);
  }

  /**
   * Move down by value. Defaults to 1.
   * @param value the amount to move
   */
  public down(value = 1) {
    return new Vector(this.x, this.y + value);
  }

  /**
   * Move left by value. Defaults to 1.
   * @param value the amount to move
   */
  public left(value = 1) {
    return new Vector(this.x - value, this.y);
  }

  /**
   * Move right by value. Defaults to 1.
   * @param value the amount to move
   */
  public right(value = 1) {
    return new Vector(this.x + value, this.y);
  }
}
