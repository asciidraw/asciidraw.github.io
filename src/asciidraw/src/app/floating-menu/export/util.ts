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
