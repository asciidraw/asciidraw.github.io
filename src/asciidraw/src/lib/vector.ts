/**
 * vector-like with x and y. Used as parameter in {@link Vector}
 */
export interface VectorLike {
  x: number;
  y: number;
}

/**
 * Class to store a 2D vector and simplify mathematical methods
 */
export class Vector implements VectorLike {
  // ---------------------------------------------------------------------------

  public static serialize(value: Vector) {
    return value.toString();
  }

  public static deserialize(value: string) {
    return Vector.fromString(value);
  }

  // ---------------------------------------------------------------------------

  public x: number;
  public y: number;

  public static copy(vector: VectorLike): Vector {
    return new Vector(vector.x, vector.y);
  }

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toJSON(): VectorLike {
    return { x: this.x, y: this.y };
  }

  toString() {
    return `${this.x}:${this.y}`;
  }

  static fromString(value: string) {
    const split = value.split(":");
    return new Vector(Number(split[0]), Number(split[1]));
  }

  // ---------------------------------------------------------------------------

  /**
   * checks if two vectors are the same
   * @param other vector to compare to
   */
  public equals(other: VectorLike) {
    return other != null && this.x == other.x && this.y == other.y;
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
