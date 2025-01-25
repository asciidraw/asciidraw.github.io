/** string-representation of `{x,y}` coordinates */
type Key = `${number}x${number}`


/**
 * converts a pair of `{x,y}` coordinates to a string to be stored and compared
 * @param x x-coordinate
 * @param y y-coordinate
 */
function toKey(x: number, y: number): Key {
  return `${x}x${y}`;
}

/**
 * converts a key back to its `{x,y}` coordinates
 * @param key
 * @returns `[x, y]`
 */
function fromKey(key: string): [number, number] {
  const [x, y] = key.split('x').map(v => parseInt(v));
  return [x, y];
}


/**
 * represents a mapping between coordinates and a character
 */
export class Layer {
  private readonly data: Record<Key, string>

  constructor() {
    this.data = {};
  }

  /**
   * merges another layer on top and overwriting existing characters when a location matches
   * @param layer
   */
  public merge(layer: Layer): void {
    for (const [[x, y], char] of layer.entries()) {
      this.set(x, y, char);
    }
  }

  /**
   * sets a character at a given location `{x,y}` possibly overwriting and existing character
   * @param x x-coordinate
   * @param y y-coordinate
   * @param character character to set
   */
  public set(x: number, y: number, character: string): void {
    this.data[toKey(x, y)] = character;
  }

  /**
   * returns an array of all entries
   *
   * todo: make iterable
   */
  public entries(): Array<[[number, number], string]> {
    return Object.entries(this.data).map(([key, value]) => [fromKey(key), value]);
  }

  /**
   * checks whether a coordinate is set
   * @param x x-coordinate
   * @param y y-coordinate
   */
  public has(x: number, y: number): boolean {
    return this.data.hasOwnProperty(toKey(x, y));
  }
}
