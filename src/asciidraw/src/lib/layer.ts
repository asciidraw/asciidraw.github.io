type Key = `${number}x${number}`

export class Layer {
  private readonly data: Record<Key, string>

  constructor() {
    this.data = {};
  }

  public merge(layer: Layer) {
    for (const [[x, y], char] of layer.entries()) {
      this.set(x, y, char);
    }
  }

  public set(x: number, y: number, char: string): void {
    this.data[this.toKey(x, y)] = char;
  }

  public entries(): Array<[[number, number], string]> {
    return Object.entries(this.data).map(([key, value]) => [this.fromKey(key), value]);
  }

  private toKey(x: number, y: number): Key {
    return `${x}x${y}`;
  }
  private fromKey(key: string): [number, number] {
    const [x, y] = key.split('x').map(v => parseInt(v));
    return [x, y];
  }
}
