import type { InjectionKey, Ref } from "vue";
import type {AppContext, Project} from "@/types";
import type {EventBusKey} from "@vueuse/core";

export const INJECTION_KEY_APP: InjectionKey<Ref<AppContext>> = Symbol();
export const INJECTION_KEY_PROJECT: InjectionKey<Ref<Project>> = Symbol();
