import type { Layer } from "@/lib/layer.ts";

interface Indexable {
  id: string
}

type State = string
type CacheIndex = {
  [id: string]: undefined | {  // id of the element
    state: State  // JSON.stringify(element) | used to compare if the element has changed
    layer: Layer  // rendered layer
  }
}

export class LayerCache {
  #cache: CacheIndex

  constructor() {
    this.#cache = {}
  }

  private getState(element: Indexable): State {
    return JSON.stringify(element);
  }

  /**
   * @param indexable element to index
   * @param layer Layer to associate to indexable
   * @see Layer
   */
  set(indexable: Indexable, layer: Layer): void {
    this.#cache[indexable.id] = {
      state: this.getState(indexable),
      layer: layer,
    };
  }

  /**
   * retrieves the stored value from the cache.
   * @param indexable element to identify by
   * @returns Layer if element matches cached state
   * @return null if element is not indexed or deprecated
   * @see Layer
   */
  get(indexable: Indexable): Layer | null {
    const stored = this.#cache[indexable.id];
    if (stored === undefined) return null;
    const state2 = this.getState(indexable);
    if (stored.state !== state2) return null;
    return stored.layer;
  }

  /**
   * removes an entry from the cache
   * @param indexable
   */
  remove(indexable: Indexable): void {
    delete this.#cache[indexable.id];
  }

  /**
   * removes all entries from the cache
   */
  clear(): void {
    this.#cache = {};
  }
}
