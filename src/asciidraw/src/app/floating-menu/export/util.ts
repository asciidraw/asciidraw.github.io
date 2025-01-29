import { Layer } from "@/lib";

export function findMinMaxOfLayer(layer: Layer): [number, number, number, number] {
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity];
  layer.entries().forEach(([[x, y]]) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  });
  return [minX, minY, maxX, maxY];
}


export enum CharacterType {
  ASCII,
  EXTENDED_ASCII,
  UNICODE,
}

/**
 * detects what type (Ascii, Extended Ascii, Unicode) of characters are in a text
 * @param text text-to check
 * @see CharacterType
 */
export function detectCharacterType(text: string): CharacterType {
  for (const char of text) {
    const codePoint = char.codePointAt(0)!;
    if (codePoint > 255) return CharacterType.UNICODE;
    if (codePoint > 127) return CharacterType.EXTENDED_ASCII;
  }
  return CharacterType.ASCII;
}
