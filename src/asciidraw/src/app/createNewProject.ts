import type { Project } from "@/types";
import { uniqueNamesGenerator, type Config as UniqueNamesGeneratorConfig, adjectives as dictAdjectives, colors as dictColors, animals as dictAnimals } from "unique-names-generator";


const nameGeneratorConfig: UniqueNamesGeneratorConfig = {
  dictionaries: [dictAdjectives, dictColors, dictAnimals],
  style: "capital",
  separator: " ",
}


export function createNewProject(): Project {
  return {
    name: uniqueNamesGenerator(nameGeneratorConfig),
    elements: [],
  };
}
