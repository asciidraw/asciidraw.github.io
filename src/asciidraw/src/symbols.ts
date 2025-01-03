import type { InjectionKey, Ref } from "vue";
import type {AppContext, Project} from "@/types";
import type {EventBusKey} from "@vueuse/core";

export const INJECTION_KEY_APP: InjectionKey<Ref<AppContext>> = Symbol();
export const PROJECT_INJECTION_KEY: InjectionKey<Ref<Project>> = Symbol();

export const EVENT_DOWNLOAD_PROJECT: EventBusKey<never> = Symbol();
export const EVENT_UPLOAD_PROJECT: EventBusKey<string> = Symbol();
