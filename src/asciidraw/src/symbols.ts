import type { InjectionKey, Ref } from "vue";
import type { Project } from "@/types";
import type {EventBusKey} from "@vueuse/core";

export const PROJECT_INJECTION_KEY: InjectionKey<Ref<Project>> = Symbol();

export const EVENT_DOWNLOAD_PROJECT: EventBusKey<never> = Symbol();
export const EVENT_UPLOAD_PROJECT: EventBusKey<string> = Symbol();
