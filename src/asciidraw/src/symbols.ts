import type { InjectionKey } from "vue";
import type { Project } from "@/types";
import type {EventBusKey} from "@vueuse/core";

export const PROJECT_INJECTION_KEY: InjectionKey<Project> = Symbol();

export const EVENT_DOWNLOAD_PROJECT: EventBusKey<never> = Symbol();
