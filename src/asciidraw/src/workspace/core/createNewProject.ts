import type { Project } from "@/types";
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
