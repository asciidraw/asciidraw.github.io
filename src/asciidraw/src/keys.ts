import type { InjectionKey } from "vue";
import type { Project } from "@/types";

export const PROJECT_INJECTION_KEY = Symbol() as InjectionKey<Project>;
