import type { ElementsData, Project } from "@/types";
import { createNewElementId } from "@/lib";
import type { VectorLike } from "@/types/rendering.ts";
import {
  adjectives as dictAdjectives,
  animals as dictAnimals,
  colors as dictColors,
  type Config as UniqueNamesGeneratorConfig,
  uniqueNamesGenerator
} from "unique-names-generator";


const nameGeneratorConfig: UniqueNamesGeneratorConfig = {
  dictionaries: [dictAdjectives, dictColors, dictAnimals],
  style: "capital",
  separator: " ",
}


/**
 * creates a new project
 */
export function createNewProject(): Project {
  return {
    name: uniqueNamesGenerator(nameGeneratorConfig),
    elements: [],
  };
}


export function createLabelElement(text: string, pos?: VectorLike, width?: number, height?: number): ElementsData.Label {
  const lines = text.split("\n");
  const altWidth = lines.reduce((prev, curr) => Math.max(curr.length, prev), 0)-1;
  const altHeight = lines.length-1;
  return {
    id: createNewElementId(),
    type: "label",
    x: pos?.x ?? 0,
    y: pos?.y ?? 0,
    width: width ?? altWidth,
    height: height ?? altHeight,
    text: text,
    block: false,
    alignment: "tl",
  }
}
